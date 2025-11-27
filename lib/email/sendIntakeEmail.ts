/**
 * Email handler for services intake form submissions
 *
 * This module handles sending emails for intake form submissions.
 * It supports multiple email providers via environment variables.
 *
 * Environment Variables Required:
 * - EMAIL_PROVIDER: 'resend' | 'sendgrid' | 'nodemailer' | 'smtp'
 * - EMAIL_FROM: sender email address
 * - EMAIL_TO_SUPPORT: support team email address
 *
 * Provider-specific:
 * - For Resend: RESEND_API_KEY
 * - For SendGrid: SENDGRID_API_KEY
 * - For SMTP: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 */

interface IntakeEmailData {
  name: string
  email: string
  company?: string
  serviceType: string
  budget?: string
  timeline?: string
  description: string
  source?: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Send intake form confirmation email to user
 */
export async function sendUserConfirmationEmail(data: IntakeEmailData): Promise<EmailResult> {
  try {
    const provider = process.env.EMAIL_PROVIDER || 'log-only'
    const fromEmail = process.env.EMAIL_FROM || 'noreply@offodlabs.com'

    if (provider === 'log-only' || !process.env.RESEND_API_KEY) {
      // Log-only mode for development
      console.log('📧 [DEV MODE] Would send confirmation email to:', data.email)
      return { success: true, messageId: 'dev-mode' }
    }

    // TODO: Implement actual email sending
    // Examples below for different providers:

    if (provider === 'resend') {
      return sendViaResend(data, fromEmail)
    } else if (provider === 'sendgrid') {
      return sendViaSendGrid(data, fromEmail)
    } else if (provider === 'smtp') {
      return sendViaSMTP(data, fromEmail)
    }

    return { success: true, messageId: 'stub-mode' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error sending confirmation email:', message)
    return { success: false, error: message }
  }
}

/**
 * Send internal notification email to support team
 */
export async function sendSupportNotificationEmail(data: IntakeEmailData): Promise<EmailResult> {
  try {
    const provider = process.env.EMAIL_PROVIDER || 'log-only'
    const fromEmail = process.env.EMAIL_FROM || 'noreply@offodlabs.com'
    const supportEmail = process.env.EMAIL_TO_SUPPORT || 'support@offodlabs.com'

    if (provider === 'log-only' || !process.env.RESEND_API_KEY) {
      // Log-only mode for development
      console.log('📧 [DEV MODE] Would send notification email to:', supportEmail)
      console.log('Intake Details:', {
        name: data.name,
        email: data.email,
        company: data.company || 'N/A',
        serviceType: data.serviceType,
        budget: data.budget || 'Not specified',
        timeline: data.timeline || 'Not specified',
        description: data.description.substring(0, 100) + '...',
      })
      return { success: true, messageId: 'dev-mode' }
    }

    // TODO: Implement actual email sending

    if (provider === 'resend') {
      return sendViaResend(data, fromEmail, supportEmail)
    } else if (provider === 'sendgrid') {
      return sendViaSendGrid(data, fromEmail, supportEmail)
    } else if (provider === 'smtp') {
      return sendViaSMTP(data, fromEmail, supportEmail)
    }

    return { success: true, messageId: 'stub-mode' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error sending support notification:', message)
    return { success: false, error: message }
  }
}

/**
 * Helper: Send via Resend (recommended for Vercel)
 * Installation: npm install resend
 * Docs: https://resend.com/docs
 */
async function sendViaResend(
  data: IntakeEmailData,
  fromEmail: string,
  toEmail?: string
): Promise<EmailResult> {
  try {
    // Dynamic import to avoid breaking if resend is not installed
    // @ts-expect-error - resend is an optional dependency
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const recipient = toEmail || data.email
    const subject = toEmail
      ? `New Services Intake: ${data.name} - ${data.serviceType}`
      : 'We received your services inquiry'

    const html = toEmail ? generateSupportEmailHTML(data) : generateUserEmailHTML(data)

    const response = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject,
      html,
    })

    if (response.error) {
      return { success: false, error: response.error.message }
    }

    return { success: true, messageId: response.data?.id }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send via Resend'
    return { success: false, error: message }
  }
}

/**
 * Helper: Send via SendGrid
 * Installation: npm install @sendgrid/mail
 * Docs: https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs
 */
async function sendViaSendGrid(
  data: IntakeEmailData,
  fromEmail: string,
  toEmail?: string
): Promise<EmailResult> {
  try {
    // Dynamic import to avoid breaking if sendgrid is not installed
    // @ts-expect-error - @sendgrid/mail is an optional dependency
    const sgMail = await import('@sendgrid/mail')
    sgMail.default.setApiKey(process.env.SENDGRID_API_KEY || '')

    const recipient = toEmail || data.email
    const subject = toEmail
      ? `New Services Intake: ${data.name} - ${data.serviceType}`
      : 'We received your services inquiry'

    const html = toEmail ? generateSupportEmailHTML(data) : generateUserEmailHTML(data)

    const msg = {
      to: recipient,
      from: fromEmail,
      subject,
      html,
    }

    const response = await sgMail.default.send(msg)
    return { success: true, messageId: response[0].headers['x-message-id'] }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send via SendGrid'
    return { success: false, error: message }
  }
}

/**
 * Helper: Send via SMTP (generic)
 * Installation: npm install nodemailer
 * Docs: https://nodemailer.com/
 */
async function sendViaSMTP(
  data: IntakeEmailData,
  fromEmail: string,
  toEmail?: string
): Promise<EmailResult> {
  try {
    // Dynamic import to avoid breaking if nodemailer is not installed
    // @ts-expect-error - nodemailer is an optional dependency
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const recipient = toEmail || data.email
    const subject = toEmail
      ? `New Services Intake: ${data.name} - ${data.serviceType}`
      : 'We received your services inquiry'

    const html = toEmail ? generateSupportEmailHTML(data) : generateUserEmailHTML(data)

    const response = await transporter.sendMail({
      from: fromEmail,
      to: recipient,
      subject,
      html,
    })

    return { success: true, messageId: response.messageId }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send via SMTP'
    return { success: false, error: message }
  }
}

/**
 * Generate HTML for user confirmation email
 */
function generateUserEmailHTML(data: IntakeEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(to right, #1f2937, #111827); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
    h1 { margin: 0; font-size: 28px; }
    .details { background: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0; }
    .detail-row { margin: 8px 0; }
    .detail-label { font-weight: 600; color: #374151; }
    .detail-value { color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank you for reaching out!</h1>
    </div>
    <div class="content">
      <p>Hi ${escapeHtml(data.name)},</p>

      <p>We've received your services inquiry and appreciate your interest in OFFO Labs. Our team will review your request within 24 hours and get back to you with next steps.</p>

      <div class="details">
        <div class="detail-row">
          <span class="detail-label">Service Type:</span>
          <span class="detail-value">${escapeHtml(formatServiceType(data.serviceType))}</span>
        </div>
        ${data.budget ? `<div class="detail-row"><span class="detail-label">Budget Range:</span><span class="detail-value">${escapeHtml(data.budget)}</span></div>` : ''}
        ${data.timeline ? `<div class="detail-row"><span class="detail-label">Timeline:</span><span class="detail-value">${escapeHtml(data.timeline)}</span></div>` : ''}
      </div>

      <p>In the meantime, if you have any questions, feel free to reach out to us at <strong>support@offodlabs.com</strong>.</p>

      <p>Best regards,<br><strong>The OFFO Labs Team</strong></p>

      <div class="footer">
        <p>© 2024 OFFO Labs. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Generate HTML for internal support notification
 */
function generateSupportEmailHTML(data: IntakeEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 700px; margin: 0 auto; padding: 20px; }
    .header { background: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    h1 { margin: 0; font-size: 24px; }
    .field { margin: 15px 0; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
    .field:last-child { border-bottom: none; }
    .label { font-weight: 700; color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #4b5563; margin-top: 5px; font-size: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Services Intake Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>

      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>

      ${data.company ? `<div class="field"><div class="label">Company</div><div class="value">${escapeHtml(data.company)}</div></div>` : ''}

      <div class="field">
        <div class="label">Service Type</div>
        <div class="value"><strong>${escapeHtml(formatServiceType(data.serviceType))}</strong></div>
      </div>

      ${data.budget ? `<div class="field"><div class="label">Budget Range</div><div class="value">${escapeHtml(data.budget)}</div></div>` : ''}

      ${data.timeline ? `<div class="field"><div class="label">Timeline</div><div class="value">${escapeHtml(data.timeline)}</div></div>` : ''}

      <div class="field">
        <div class="label">Description</div>
        <div class="value">${escapeHtml(data.description).replace(/\n/g, '<br>')}</div>
      </div>

      ${data.source ? `<div class="field"><div class="label">Source</div><div class="value">${escapeHtml(data.source)}</div></div>` : ''}

      <div class="field">
        <div class="label">Submitted</div>
        <div class="value">${new Date().toLocaleString()}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Format service type for display
 */
function formatServiceType(serviceType: string): string {
  const typeMap: Record<string, string> = {
    'product-development': 'AI-Accelerated Product Development',
    'consultation': 'AI Strategy & Systems Consultation',
    'full-execution': 'Full Project Execution & Delivery',
    'other': 'Other / Not Sure',
  }
  return typeMap[serviceType] || serviceType
}

/**
 * Escape HTML entities for safe output
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}