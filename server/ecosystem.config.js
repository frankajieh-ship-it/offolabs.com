// PM2 Ecosystem Configuration for OFFO Launch Platform
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'offo-launch-backend',
      script: 'src/server.js',
      instances: 'max', // Use all CPU cores
      exec_mode: 'cluster',

      // Environment variables
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },

      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      log_file: './logs/combined.log',

      // Performance
      max_memory_restart: '500M',
      min_uptime: '10s',
      max_restarts: 10,

      // Monitoring
      autorestart: true,
      watch: false, // Set to true in development
      ignore_watch: ['node_modules', 'logs', '.git'],

      // Advanced features
      merge_logs: true,
      time: true,

      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,

      // Health check
      exp_backoff_restart_delay: 100,

      // Environment-specific settings
      node_args: '--max-old-space-size=2048'
    }
  ],

  // Deployment configuration
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-server-ip'],
      ref: 'origin/main',
      repo: 'git@github.com:your-username/offo-launch.git',
      path: '/var/www/offo-launch',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-deploy-local': 'echo "Deploying to production..."'
    },
    staging: {
      user: 'deploy',
      host: ['staging-server-ip'],
      ref: 'origin/develop',
      repo: 'git@github.com:your-username/offo-launch.git',
      path: '/var/www/offo-launch-staging',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env staging'
    }
  }
};
