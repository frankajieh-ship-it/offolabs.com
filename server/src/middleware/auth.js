// server/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Project from '../models/Project.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret_change_this');
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export const checkProjectAccess = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.params.projectId;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check if user is owner or team member
    const isOwner = project.owner.toString() === req.user._id.toString();
    const isTeamMember = project.team.some(
      member => member.user.toString() === req.user._id.toString()
    );

    if (!isOwner && !isTeamMember && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
