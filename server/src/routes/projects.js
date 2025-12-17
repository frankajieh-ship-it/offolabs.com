// server/src/routes/projects.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';
import Permit from '../models/Permit.js';
import { auth, checkProjectAccess } from '../middleware/auth.js';

const router = express.Router();

// Get all projects for user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { 'team.user': req.user.id }
      ]
    }).populate('owner', 'name email')
      .populate('team.user', 'name email role')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new project
router.post('/', auth, [
  body('name').notEmpty().trim(),
  body('location.address').notEmpty(),
  body('targetDate').isISO8601()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = new Project({
      ...req.body,
      owner: req.user.id,
      metadata: {
        createdBy: req.user.id,
        lastModifiedBy: req.user.id
      }
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get project details with all related data
router.get('/:id', auth, checkProjectAccess, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email phone')
      .populate('team.user', 'name email role avatar')
      .populate('metadata.createdBy', 'name')
      .populate('metadata.lastModifiedBy', 'name');

    const permits = await Permit.find({ project: req.params.id })
      .sort({ priority: 1, createdAt: -1 });

    const stats = {
      totalPermits: permits.length,
      approved: permits.filter(p => p.status === 'approved').length,
      pending: permits.filter(p => ['draft', 'submitted', 'under_review'].includes(p.status)).length,
      critical: permits.filter(p => p.priority === 'critical').length,
      overdue: permits.filter(p =>
        p.timeline.estimatedApprovalDate &&
        new Date(p.timeline.estimatedApprovalDate) < new Date() &&
        p.status !== 'approved'
      ).length
    };

    res.json({ project, permits, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put('/:id', auth, checkProjectAccess, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        'metadata.lastModifiedBy': req.user.id,
        'metadata.lastModifiedAt': new Date()
      },
      { new: true, runValidators: true }
    );

    // Emit real-time update
    req.app.get('io').to(`project:${req.params.id}`).emit('project:updated', project);

    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add team member
router.post('/:id/team', auth, checkProjectAccess, [
  body('userId').notEmpty(),
  body('role').notEmpty()
], async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.team.push({
      user: req.body.userId,
      role: req.body.role,
      permissions: req.body.permissions || ['view']
    });

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
