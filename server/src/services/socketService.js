// server/src/services/socketService.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function initializeSocket(io) {
  // Authentication middleware for Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret_change_this');
      const user = await User.findById(decoded.id);

      if (!user || !user.isActive) {
        return next(new Error('Invalid user'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id} (User: ${socket.user.name})`);

    // Join user-specific room
    socket.join(`user:${socket.user.id}`);

    // Join project rooms
    socket.on('project:join', (projectId) => {
      socket.join(`project:${projectId}`);
      console.log(`User ${socket.user.name} joined project room: ${projectId}`);
    });

    // Leave project rooms
    socket.on('project:leave', (projectId) => {
      socket.leave(`project:${projectId}`);
      console.log(`User ${socket.user.name} left project room: ${projectId}`);
    });

    // Real-time permit comments
    socket.on('permit:comment', async (data) => {
      const { permitId, projectId, comment } = data;

      const message = {
        id: Date.now().toString(),
        permitId,
        userId: socket.user.id,
        userName: socket.user.name,
        userAvatar: socket.user.avatar,
        comment,
        timestamp: new Date()
      };

      // Broadcast to all users in the project room
      io.to(`project:${projectId}`).emit('permit:comment:new', message);
    });

    // Typing indicator for permit comments
    socket.on('permit:typing', (data) => {
      const { permitId, projectId, isTyping } = data;

      socket.to(`project:${projectId}`).emit('permit:typing:update', {
        permitId,
        userId: socket.user.id,
        userName: socket.user.name,
        isTyping
      });
    });

    // Project live updates (presence)
    socket.on('project:presence', (projectId) => {
      io.to(`project:${projectId}`).emit('project:user:joined', {
        userId: socket.user.id,
        userName: socket.user.name,
        userAvatar: socket.user.avatar,
        timestamp: new Date()
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id} (User: ${socket.user.name})`);

      // Notify project rooms about user leaving
      const rooms = Array.from(socket.rooms).filter(room => room.startsWith('project:'));
      rooms.forEach(room => {
        const projectId = room.replace('project:', '');
        io.to(room).emit('project:user:left', {
          userId: socket.user.id,
          userName: socket.user.name,
          timestamp: new Date()
        });
      });
    });

    // Error handling
    socket.on('error', (error) => {
      console.error(`Socket error for user ${socket.user.name}:`, error);
    });
  });

  return io;
}

// Helper function to emit notifications to specific users
export function emitToUser(io, userId, event, data) {
  io.to(`user:${userId}`).emit(event, data);
}

// Helper function to emit updates to project rooms
export function emitToProject(io, projectId, event, data) {
  io.to(`project:${projectId}`).emit(event, data);
}
