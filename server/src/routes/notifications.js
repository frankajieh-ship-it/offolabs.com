// server/src/routes/notifications.js
import express from 'express';
import Notification from '../models/Notification.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/notifications
 * Get all notifications for current user
 */
router.get('/', auth, async (req, res) => {
  try {
    const { status, type, limit = 50, offset = 0 } = req.query;
    const filter = { user: req.user.id };

    if (status) filter.status = status;
    if (type) filter.type = type;

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await Notification.countDocuments(filter);
    const unreadCount = await Notification.countDocuments({
      user: req.user.id,
      readAt: null
    });

    res.json({
      notifications,
      total,
      unreadCount,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/notifications/unread
 * Get unread notifications count
 */
router.get('/unread', auth, async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      user: req.user.id,
      readAt: null
    });

    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/notifications/:id/read
 * Mark notification as read
 */
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    if (!notification.readAt) {
      notification.readAt = new Date();
      notification.status = 'read';
      await notification.save();
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/notifications/read-all
 * Mark all notifications as read
 */
router.patch('/read-all', auth, async (req, res) => {
  try {
    const result = await Notification.updateMany(
      {
        user: req.user.id,
        readAt: null
      },
      {
        $set: {
          readAt: new Date(),
          status: 'read'
        }
      }
    );

    res.json({
      message: 'All notifications marked as read',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/notifications/:id
 * Delete a notification
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/notifications
 * Delete all read notifications for user
 */
router.delete('/', auth, async (req, res) => {
  try {
    const result = await Notification.deleteMany({
      user: req.user.id,
      readAt: { $ne: null }
    });

    res.json({
      message: 'Read notifications deleted',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
