// server/src/models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['system', 'alert', 'reminder', 'update', 'message'],
    default: 'system'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    enum: ['email', 'sms', 'push', 'in-app'],
    default: 'in-app'
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed', 'read'],
    default: 'pending'
  },
  metadata: {
    projectId: mongoose.Schema.Types.ObjectId,
    permitId: mongoose.Schema.Types.ObjectId,
    inspectionId: mongoose.Schema.Types.ObjectId,
    link: String,
    data: mongoose.Schema.Types.Mixed
  },
  readAt: Date,
  sentAt: Date
}, {
  timestamps: true
});

// Index for faster queries
notificationSchema.index({ user: 1, status: 1, createdAt: -1 });
notificationSchema.index({ user: 1, readAt: 1 });

export default mongoose.model('Notification', notificationSchema);
