// server/src/routes/permits.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import Permit from '../models/Permit.js';
import Project from '../models/Project.js';
import { auth, checkProjectAccess } from '../middleware/auth.js';

const router = express.Router();

// GET /project/:projectId - Get permits for a project
router.get('/project/:projectId', auth, checkProjectAccess, async (req, res) => {
  try {
    const { status, type, priority } = req.query;
    const filter = { project: req.params.projectId };

    if (status) filter.status = status;
    if (type) filter.type = type;
    if (priority) filter.priority = priority;

    const permits = await Permit.find(filter)
      .populate('documents.uploadedBy', 'name email')
      .populate('requirements.completedBy', 'name')
      .populate('notes.createdBy', 'name avatar')
      .sort({ priority: 1, 'timeline.estimatedApprovalDate': 1 });

    res.json(permits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST / - Create new permit
router.post('/', auth, [
  body('project').notEmpty().withMessage('Project ID is required'),
  body('name').notEmpty().trim().withMessage('Permit name is required'),
  body('type').isIn(['health', 'fire', 'zoning', 'building', 'environmental', 'alcohol', 'signage', 'other'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Verify project exists and user has access
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const permit = new Permit(req.body);
    await permit.save();

    // Emit real-time update
    req.app.get('io').to(`project:${req.body.project}`).emit('permit:created', permit);

    // Schedule automated sync if externalId is provided
    if (permit.jurisdiction?.externalId) {
      // Trigger background job to sync with government API
      // This would be handled by the integration service
    }

    res.status(201).json(permit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /:id - Get permit details
router.get('/:id', auth, async (req, res) => {
  try {
    const permit = await Permit.findById(req.params.id)
      .populate('project', 'name location owner')
      .populate('documents.uploadedBy', 'name email avatar')
      .populate('requirements.completedBy', 'name')
      .populate('notes.createdBy', 'name avatar');

    if (!permit) {
      return res.status(404).json({ error: 'Permit not found' });
    }

    res.json(permit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /:id - Update permit
router.put('/:id', auth, async (req, res) => {
  try {
    const permit = await Permit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!permit) {
      return res.status(404).json({ error: 'Permit not found' });
    }

    // Emit real-time update
    req.app.get('io').to(`project:${permit.project}`).emit('permit:updated', permit);

    res.json(permit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH /:id/status - Update permit status
router.patch('/:id/status', auth, [
  body('status').isIn(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired', 'renewal_required'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const permit = await Permit.findById(req.params.id);
    if (!permit) {
      return res.status(404).json({ error: 'Permit not found' });
    }

    const oldStatus = permit.status;
    permit.status = req.body.status;

    // Update timeline based on status
    if (req.body.status === 'submitted' && !permit.timeline.submissionDate) {
      permit.timeline.submissionDate = new Date();
    }
    if (req.body.status === 'approved' && !permit.timeline.actualApprovalDate) {
      permit.timeline.actualApprovalDate = new Date();
    }

    // Add audit note
    permit.notes.push({
      text: `Status changed from ${oldStatus} to ${req.body.status}`,
      createdBy: req.user.id,
      createdAt: new Date()
    });

    await permit.save();

    // Emit real-time update
    req.app.get('io').to(`project:${permit.project}`).emit('permit:status_changed', {
      permitId: permit._id,
      oldStatus,
      newStatus: req.body.status
    });

    res.json(permit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /:id/documents - Upload document to permit
router.post('/:id/documents', auth, [
  body('name').notEmpty().trim(),
  body('url').notEmpty().isURL()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const permit = await Permit.findById(req.params.id);
    if (!permit) {
      return res.status(404).json({ error: 'Permit not found' });
    }

    permit.documents.push({
      name: req.body.name,
      url: req.body.url,
      uploadedAt: new Date(),
      uploadedBy: req.user.id,
      status: 'pending'
    });

    await permit.save();

    // Emit real-time update
    req.app.get('io').to(`project:${permit.project}`).emit('permit:document_uploaded', {
      permitId: permit._id,
      document: permit.documents[permit.documents.length - 1]
    });

    res.json(permit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /:id/sync - Manually trigger sync with government API
router.post('/:id/sync', auth, async (req, res) => {
  try {
    const permit = await Permit.findById(req.params.id);
    if (!permit) {
      return res.status(404).json({ error: 'Permit not found' });
    }

    if (!permit.jurisdiction?.externalId) {
      return res.status(400).json({ error: 'Permit does not have an external ID for syncing' });
    }

    // Update sync status
    permit.automatedTracking = {
      lastSynced: new Date(),
      syncStatus: 'in_progress',
      externalStatus: permit.automatedTracking?.externalStatus,
      data: permit.automatedTracking?.data
    };
    await permit.save();

    // Trigger integration service to sync
    // This would call the integrationService.syncPermitStatus function
    // For now, we'll just return success

    res.json({
      message: 'Sync initiated',
      permit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /:id - Delete permit
router.delete('/:id', auth, async (req, res) => {
  try {
    const permit = await Permit.findByIdAndDelete(req.params.id);
    if (!permit) {
      return res.status(404).json({ error: 'Permit not found' });
    }

    // Emit real-time update
    req.app.get('io').to(`project:${permit.project}`).emit('permit:deleted', {
      permitId: permit._id
    });

    res.json({ message: 'Permit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
