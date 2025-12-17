// Monitoring & Health Check Utilities
// Comprehensive monitoring for production systems

import mongoose from 'mongoose';
import os from 'os';

/**
 * System Health Check
 */
export const getSystemHealth = () => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();

  return {
    status: 'healthy',
    uptime: {
      seconds: Math.floor(uptime),
      formatted: formatUptime(uptime)
    },
    memory: {
      used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100)
    },
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system
    },
    platform: {
      type: os.platform(),
      release: os.release(),
      arch: os.arch(),
      cpus: os.cpus().length
    }
  };
};

/**
 * Database Health Check
 */
export const getDatabaseHealth = async () => {
  try {
    const state = mongoose.connection.readyState;
    const stateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    // Get database stats if connected
    let stats = null;
    if (state === 1) {
      const db = mongoose.connection.db;
      stats = await db.stats();
    }

    return {
      status: state === 1 ? 'healthy' : 'unhealthy',
      state: stateMap[state],
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      stats: stats ? {
        collections: stats.collections,
        documents: stats.objects,
        dataSize: `${Math.round(stats.dataSize / 1024 / 1024)}MB`,
        storageSize: `${Math.round(stats.storageSize / 1024 / 1024)}MB`,
        indexes: stats.indexes,
        indexSize: `${Math.round(stats.indexSize / 1024 / 1024)}MB`
      } : null
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message
    };
  }
};

/**
 * API Response Time Monitoring
 */
export class ResponseTimeMonitor {
  constructor() {
    this.metrics = new Map();
  }

  recordRequest(route, duration) {
    if (!this.metrics.has(route)) {
      this.metrics.set(route, {
        count: 0,
        totalTime: 0,
        minTime: Infinity,
        maxTime: 0
      });
    }

    const metric = this.metrics.get(route);
    metric.count++;
    metric.totalTime += duration;
    metric.minTime = Math.min(metric.minTime, duration);
    metric.maxTime = Math.max(metric.maxTime, duration);
  }

  getMetrics(route) {
    const metric = this.metrics.get(route);
    if (!metric) return null;

    return {
      count: metric.count,
      avgTime: Math.round(metric.totalTime / metric.count),
      minTime: Math.round(metric.minTime),
      maxTime: Math.round(metric.maxTime)
    };
  }

  getAllMetrics() {
    const result = {};
    for (const [route, metric] of this.metrics.entries()) {
      result[route] = {
        count: metric.count,
        avgTime: Math.round(metric.totalTime / metric.count),
        minTime: Math.round(metric.minTime),
        maxTime: Math.round(metric.maxTime)
      };
    }
    return result;
  }

  reset() {
    this.metrics.clear();
  }
}

/**
 * Request Logging Middleware
 */
export const requestLogger = (monitor) => {
  return (req, res, next) => {
    const start = Date.now();

    // Log response
    res.on('finish', () => {
      const duration = Date.now() - start;
      const route = `${req.method} ${req.route?.path || req.path}`;

      monitor.recordRequest(route, duration);

      // Log slow requests (>1000ms)
      if (duration > 1000) {
        console.warn(`[SLOW] ${route} took ${duration}ms`);
      }

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${res.statusCode}] ${route} - ${duration}ms`);
      }
    });

    next();
  };
};

/**
 * Error Rate Monitoring
 */
export class ErrorRateMonitor {
  constructor() {
    this.errors = [];
    this.maxErrors = 1000; // Keep last 1000 errors
  }

  recordError(error, context = {}) {
    this.errors.push({
      timestamp: new Date(),
      message: error.message,
      stack: error.stack,
      context
    });

    // Keep only last maxErrors
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }
  }

  getErrorRate(timeWindow = 60000) { // Default 1 minute
    const now = Date.now();
    const recentErrors = this.errors.filter(
      err => now - err.timestamp.getTime() < timeWindow
    );

    return {
      count: recentErrors.length,
      rate: (recentErrors.length / (timeWindow / 1000)).toFixed(2), // errors per second
      recent: recentErrors.slice(-10) // Last 10 errors
    };
  }

  clear() {
    this.errors = [];
  }
}

/**
 * Socket.IO Monitoring
 */
export const getSocketMetrics = (io) => {
  if (!io) return { error: 'Socket.IO not initialized' };

  const sockets = io.sockets.sockets;
  const rooms = io.sockets.adapter.rooms;

  return {
    connected: sockets.size,
    rooms: rooms.size,
    roomDetails: Array.from(rooms.entries()).map(([name, sockets]) => ({
      name,
      users: sockets.size
    }))
  };
};

/**
 * Comprehensive Health Check Endpoint
 */
export const getFullHealthReport = async (io) => {
  const [systemHealth, dbHealth] = await Promise.all([
    getSystemHealth(),
    getDatabaseHealth()
  ]);

  return {
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV,
    system: systemHealth,
    database: dbHealth,
    socket: io ? getSocketMetrics(io) : { error: 'Not available' },
    overall: dbHealth.status === 'healthy' && systemHealth.status === 'healthy'
      ? 'healthy'
      : 'degraded'
  };
};

/**
 * Utility Functions
 */
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.join(' ') || '0m';
}

// Create singleton instances
export const responseTimeMonitor = new ResponseTimeMonitor();
export const errorRateMonitor = new ErrorRateMonitor();
