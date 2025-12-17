// server/src/services/notificationService.js
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import Notification from '../models/Notification.js';
import Permit from '../models/Permit.js';
import Inspection from '../models/Inspection.js';

class NotificationService {
  constructor() {
    // Email transporter (only initialize if SMTP configured)
    if (process.env.SMTP_HOST) {
      this.emailTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });
    }

    // Twilio client (only initialize if configured)
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    }
  }

  async sendEmailNotification(user, subject, html, type = 'system') {
    if (!this.emailTransporter) {
      console.warn('Email transporter not configured');
      return false;
    }

    try {
      // Save to database
      const notification = new Notification({
        user: user._id,
        type,
        title: subject,
        content: html,
        channel: 'email',
        status: 'pending'
      });
      await notification.save();

      // Send email
      await this.emailTransporter.sendMail({
        from: `"OFFO Launch" <${process.env.SMTP_FROM || 'noreply@offolaunch.com'}>`,
        to: user.email,
        subject,
        html
      });

      notification.status = 'sent';
      notification.sentAt = new Date();
      await notification.save();

      console.log(`Email sent to ${user.email}: ${subject}`);
      return true;
    } catch (error) {
      console.error('Email notification failed:', error.message);
      return false;
    }
  }

  async sendSMSNotification(user, message) {
    if (!user.phone || !user.preferences?.smsNotifications) {
      return false;
    }

    if (!this.twilioClient) {
      console.warn('Twilio client not configured');
      return false;
    }

    try {
      await this.twilioClient.messages.create({
        body: `OFFO Alert: ${message}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone
      });

      // Save to database
      await Notification.create({
        user: user._id,
        type: 'alert',
        title: 'SMS Alert',
        content: message,
        channel: 'sms',
        status: 'sent',
        sentAt: new Date()
      });

      console.log(`SMS sent to ${user.phone}`);
      return true;
    } catch (error) {
      console.error('SMS notification failed:', error.message);
      return false;
    }
  }

  async sendInAppNotification(user, title, content, metadata = {}) {
    try {
      const notification = await Notification.create({
        user: user._id,
        type: metadata.type || 'system',
        title,
        content,
        channel: 'in-app',
        status: 'sent',
        sentAt: new Date(),
        metadata
      });

      console.log(`In-app notification created for user ${user._id}`);
      return notification;
    } catch (error) {
      console.error('In-app notification failed:', error.message);
      return null;
    }
  }

  async sendPermitStatusUpdate(permit, oldStatus, newStatus) {
    try {
      // Get project and team members
      const permitWithProject = await Permit.findById(permit._id).populate({
        path: 'project',
        populate: {
          path: 'team.user owner',
          select: 'email name phone preferences'
        }
      });

      if (!permitWithProject || !permitWithProject.project) {
        console.warn('Permit or project not found for notification');
        return;
      }

      const project = permitWithProject.project;
      const teamMembers = project.team.map(member => member.user);

      // Add owner if not already in team
      if (project.owner && !teamMembers.find(m => m._id.equals(project.owner._id))) {
        teamMembers.push(project.owner);
      }

      for (const member of teamMembers) {
        if (!member) continue;

        // In-app notification for all
        await this.sendInAppNotification(
          member,
          `Permit Status Updated: ${permit.name}`,
          `Status changed from ${oldStatus} to ${newStatus}`,
          {
            type: 'update',
            projectId: project._id,
            permitId: permit._id,
            link: `/projects/${project._id}/permits/${permit._id}`
          }
        );

        // Email notification if enabled
        if (member.preferences?.emailNotifications) {
          await this.sendEmailNotification(
            member,
            `Permit Status Updated: ${permit.name}`,
            `
              <h3>Permit Status Change</h3>
              <p><strong>Project:</strong> ${project.name}</p>
              <p><strong>Permit:</strong> ${permit.name}</p>
              <p><strong>Status Changed:</strong> ${oldStatus} → ${newStatus}</p>
              <p><a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/projects/${project._id}/permits/${permit._id}">View Details</a></p>
            `,
            'update'
          );
        }

        // SMS for critical status changes
        if (member.preferences?.smsNotifications && ['rejected', 'expired'].includes(newStatus)) {
          await this.sendSMSNotification(
            member,
            `Critical: ${permit.name} status changed to ${newStatus}`
          );
        }
      }

      console.log(`Permit status update notifications sent for permit ${permit._id}`);
    } catch (error) {
      console.error('Failed to send permit status notifications:', error.message);
    }
  }

  async sendInspectionReminder(inspection) {
    try {
      // Get inspection details with attendees
      const inspectionWithDetails = await Inspection.findById(inspection._id)
        .populate('permit')
        .populate('attendees.user', 'email name phone preferences');

      if (!inspectionWithDetails) {
        console.warn('Inspection not found for reminder');
        return;
      }

      for (const attendee of inspectionWithDetails.attendees) {
        if (!attendee.user) continue;

        const scheduledDate = new Date(inspectionWithDetails.scheduledDate).toLocaleString();

        // In-app notification
        await this.sendInAppNotification(
          attendee.user,
          `Upcoming Inspection: ${inspectionWithDetails.type}`,
          `Scheduled for ${scheduledDate}`,
          {
            type: 'reminder',
            inspectionId: inspectionWithDetails._id,
            link: `/inspections/${inspectionWithDetails._id}`
          }
        );

        // Email notification if enabled
        if (attendee.user.preferences?.emailNotifications) {
          await this.sendEmailNotification(
            attendee.user,
            `Upcoming Inspection: ${inspectionWithDetails.type}`,
            `
              <h3>Inspection Reminder</h3>
              <p><strong>Type:</strong> ${inspectionWithDetails.type}</p>
              <p><strong>Date:</strong> ${scheduledDate}</p>
              <p><strong>Location:</strong> ${inspectionWithDetails.location?.address || 'TBD'}</p>
              <p><strong>Inspector:</strong> ${inspectionWithDetails.inspector?.name || 'TBD'}</p>
              <p><a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/inspections/${inspectionWithDetails._id}">View Details</a></p>
            `,
            'reminder'
          );
        }
      }

      console.log(`Inspection reminder sent for inspection ${inspection._id}`);
    } catch (error) {
      console.error('Failed to send inspection reminder:', error.message);
    }
  }
}

export default new NotificationService();
