// server/src/routes/inspections.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import Inspection from '../models/Inspection.js';
import Permit from '../models/Permit.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/inspections/permit/:permitId
 * Get all inspections for a specific permit
 */
router.get('/permit/:permitId', auth, async (req, res) => {
  try {
    const inspections = await Inspection.find({ permit: req.params.permitId })
      .populate('attendees.user', 'name email phone avatar')
      .sort({ scheduledDate: -1 });

    res.json(inspections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/inspections/:id
 * Get single inspection details
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id)
      .populate('permit', 'name type project')
      .populate('attendees.user', 'name email phone avatar');

    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    res.json(inspection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/inspections
 * Create new inspection
 */
router.post('/', auth, [
  body('permit').notEmpty().withMessage('Permit ID is required'),
  body('type').notEmpty().withMessage('Inspection type is required'),
  body('scheduledDate').isISO8601().withMessage('Valid scheduled date is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Verify permit exists
    const permit = await Permit.findById(req.body.permit).populate('project');
    if (!permit) {
      return res.status(404).json({ error: 'Permit not found' });
    }

    // Create inspection
    const inspection = new Inspection({
      ...req.body,
      status: 'scheduled'
    });

    await inspection.save();

    // Emit real-time update
    req.app.get('io').to(`project:${permit.project._id}`).emit('inspection:created', {
      inspection,
      permitId: permit._id
    });

    res.status(201).json(inspection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * PUT /api/inspections/:id
 * Update inspection
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('permit');

    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    // Get permit to emit to correct project room
    const permit = await Permit.findById(inspection.permit._id);

    // Emit real-time update
    req.app.get('io').to(`project:${permit.project}`).emit('inspection:updated', inspection);

    res.json(inspection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * PATCH /api/inspections/:id/status
 * Update inspection status
 */
router.patch('/:id/status', auth, [
  body('status').isIn(['scheduled', 'in_progress', 'completed', 'passed', 'failed', 'cancelled', 'rescheduled'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const inspection = await Inspection.findById(req.params.id).populate('permit');
    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    const oldStatus = inspection.status;
    inspection.status = req.body.status;

    // Set actualDate when status is completed, passed, or failed
    if (['completed', 'passed', 'failed'].includes(req.body.status) && !inspection.actualDate) {
      inspection.actualDate = new Date();
    }

    await inspection.save();

    // Get permit to emit to correct project room
    const permit = await Permit.findById(inspection.permit._id);

    // Emit real-time update
    req.app.get('io').to(`project:${permit.project}`).emit('inspection:status_changed', {
      inspectionId: inspection._id,
      permitId: permit._id,
      oldStatus,
      newStatus: req.body.status
    });

    res.json(inspection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /api/inspections/:id/checklist
 * Add or update checklist item
 */
router.post('/:id/checklist', auth, [
  body('item').notEmpty().withMessage('Checklist item is required'),
  body('status').isIn(['pending', 'pass', 'fail', 'na']).withMessage('Valid status is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const inspection = await Inspection.findById(req.params.id);
    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    inspection.checklist.push({
      ...req.body,
      timestamp: new Date()
    });

    await inspection.save();

    res.json(inspection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /api/inspections/:id/findings
 * Add inspection finding
 */
router.post('/:id/findings', auth, [
  body('description').notEmpty().withMessage('Finding description is required'),
  body('severity').isIn(['critical', 'major', 'minor']).withMessage('Valid severity is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const inspection = await Inspection.findById(req.params.id).populate('permit');
    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    inspection.findings.push({
      ...req.body,
      status: 'open'
    });

    await inspection.save();

    // Get permit to emit to correct project room
    const permit = await Permit.findById(inspection.permit._id);

    // Emit real-time update for critical findings
    if (req.body.severity === 'critical') {
      req.app.get('io').to(`project:${permit.project}`).emit('inspection:critical_finding', {
        inspectionId: inspection._id,
        permitId: permit._id,
        finding: inspection.findings[inspection.findings.length - 1]
      });
    }

    res.json(inspection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * PATCH /api/inspections/:id/findings/:findingId
 * Update finding status
 */
router.patch('/:id/findings/:findingId', auth, [
  body('status').isIn(['open', 'in_progress', 'resolved']).withMessage('Valid status is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const inspection = await Inspection.findById(req.params.id);
    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    const finding = inspection.findings.id(req.params.findingId);
    if (!finding) {
      return res.status(404).json({ error: 'Finding not found' });
    }

    finding.status = req.body.status;
    if (req.body.correctiveAction) {
      finding.correctiveAction = req.body.correctiveAction;
    }

    await inspection.save();

    res.json(inspection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /api/inspections/:id/attendees
 * Add attendee to inspection
 */
router.post('/:id/attendees', auth, [
  body('user').notEmpty().withMessage('User ID is required'),
  body('role').notEmpty().withMessage('Role is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const inspection = await Inspection.findById(req.params.id);
    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    inspection.attendees.push({
      user: req.body.user,
      role: req.body.role,
      confirmed: false
    });

    await inspection.save();

    res.json(inspection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/inspections/:id
 * Delete inspection
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id).populate('permit');
    if (!inspection) {
      return res.status(404).json({ error: 'Inspection not found' });
    }

    const permit = await Permit.findById(inspection.permit._id);

    await inspection.deleteOne();

    // Emit real-time update
    req.app.get('io').to(`project:${permit.project}`).emit('inspection:deleted', {
      inspectionId: inspection._id,
      permitId: permit._id
    });

    res.json({ message: 'Inspection deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
