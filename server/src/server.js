// server/src/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import permitRoutes from './routes/permits.js';
import inspectionRoutes from './routes/inspections.js';
import notificationRoutes from './routes/notifications.js';
import integrationRoutes from './routes/integrations.js';
import { initializeSocket } from './services/socketService.js';
import { scheduleTasks } from './services/scheduler.js';
import { getFullHealthReport, requestLogger, responseTimeMonitor } from './utils/monitoring.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging and performance monitoring
app.use(requestLogger(responseTimeMonitor));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/offo-launch')
  .then(() => {
    console.log('📊 MongoDB connected: ✅');
  })
  .catch((err) => {
    console.error('📊 MongoDB connection error:', err.message);
  });

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/permits', permitRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/integrations', integrationRoutes);

// Health check endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/health/detailed', async (req, res) => {
  try {
    const report = await getFullHealthReport(io);
    res.json(report);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.get('/api/health/metrics', (req, res) => {
  res.json({
    responseTime: responseTimeMonitor.getAllMetrics(),
    timestamp: new Date().toISOString()
  });
});

// Initialize Socket.IO
initializeSocket(io);

// Schedule background tasks
scheduleTasks();

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});