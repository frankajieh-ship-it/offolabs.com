# OFFO Launch Platform - Production Setup Guide

## 🚀 Complete Production Configuration

This guide covers all production features:
- CI/CD Pipeline
- Monitoring & Analytics
- Database Backups
- Municipal API Integrations
- Performance Monitoring

---

## 1. CI/CD Pipeline Setup

### GitHub Actions

**Files Created:**
- `.github/workflows/backend-ci.yml` - Backend testing & deployment
- `.github/workflows/frontend-ci.yml` - Frontend testing & deployment

### Required Secrets

Add these to your GitHub repository (Settings → Secrets → Actions):

```
# Backend Deployment
RAILWAY_TOKEN=<your-railway-token>
MONGODB_URI_TEST=<test-database-uri>

# Frontend Deployment
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_API_URL=<your-backend-url>

# Optional: Slack Notifications
SLACK_WEBHOOK=<your-slack-webhook-url>
```

### How to Get Tokens:

**Railway:**
```bash
# Login to Railway
npm i -g @railway/cli
railway login
railway whoami  # Get your token from ~/.railway/config.json
```

**Vercel:**
```bash
# Login to Vercel
npm i -g vercel
vercel login
vercel whoami  # Shows your team/org ID
# Get project ID from vercel.json or dashboard
```

---

## 2. PM2 Monitoring Setup

### Install PM2

```bash
npm install -g pm2
```

### Start Application

```bash
cd server
pm2 start ecosystem.config.js --env production
```

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs

# Monitor CPU/Memory
pm2 monit

# Restart
pm2 restart offo-launch-backend

# Stop
pm2 stop offo-launch-backend

# Save current state
pm2 save

# Auto-start on system boot
pm2 startup
```

### PM2 Monitoring Dashboard

```bash
# Install PM2 monitoring (optional)
pm2 install pm2-server-monit

# Web dashboard
pm2 web
# Access at http://localhost:9615
```

---

## 3. Database Backup Setup

### Manual Backup

```bash
cd server/scripts
chmod +x backup-db.sh
./backup-db.sh
```

### Automated Backups (Cron)

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /path/to/server/scripts && ./backup-db.sh >> /var/log/mongodb-backup.log 2>&1

# Weekly backup on Sunday at 3 AM
0 3 * * 0 cd /path/to/server/scripts && ./backup-db.sh >> /var/log/mongodb-backup.log 2>&1
```

### Restore from Backup

```bash
cd server/scripts
chmod +x restore-db.sh
./restore-db.sh backups/offo-launch-backup-20251216_120000.tar.gz
```

### Upload Backups to S3 (Optional)

```bash
# Install AWS CLI
pip install awscli

# Configure AWS
aws configure

# Modify backup-db.sh to uncomment S3 upload lines
```

---

## 4. Analytics Setup

### Google Analytics

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create new property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add to Environment**
   ```env
   # Frontend .env.production
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Add Analytics Component**
   Already created in `src/components/Analytics.tsx`

   Add to `app/layout.tsx`:
   ```tsx
   import { Analytics } from '@/src/components/Analytics';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### Mixpanel (Optional)

1. **Create Mixpanel Project**
   - Go to [Mixpanel](https://mixpanel.com/)
   - Create project
   - Get Project Token

2. **Add to Environment**
   ```env
   NEXT_PUBLIC_MIXPANEL_TOKEN=your-mixpanel-token
   ```

### Sentry Error Tracking (Optional)

1. **Create Sentry Project**
   - Go to [Sentry](https://sentry.io/)
   - Create project for Next.js
   - Get DSN

2. **Add to Environment**
   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   ```

---

## 5. Municipal API Integration

### API Keys Required

Get API keys for cities you want to support:

1. **San Francisco**
   - Sign up at [SF Open Data](https://data.sfgov.org/login)
   - Create App Token

2. **Chicago**
   - Sign up at [Chicago Data Portal](https://data.cityofchicago.org/login)
   - Create App Token

3. **New York**
   - Sign up at [NYC Open Data](https://data.cityofnewyork.us/login)
   - Create App Token

4. **Los Angeles**
   - Contact LA County Public Health
   - Request API access

5. **Houston**
   - Sign up at [Houston GIS](https://cohgis-mycity.opendata.arcgis.com/)
   - Get API token

### Add to Backend .env

```env
# Municipal API Keys
SF_GOV_API_KEY=your-sf-api-key
CHICAGO_API_KEY=your-chicago-api-key
NYC_API_KEY=your-nyc-api-key
LA_HEALTH_API_KEY=your-la-api-key
LA_HEALTH_API_URL=https://api.lapublichealth.org
HOUSTON_API_KEY=your-houston-api-key
```

### Test Municipal APIs

```bash
# In server directory
node -e "
const { municipalAPI } = require('./src/services/municipalAPIs.js');
municipalAPI.getSupportedCities().then(cities => {
  console.log('Supported cities:', cities);
});
"
```

---

## 6. Monitoring Dashboard Setup

### Health Check Endpoint

Already created at `GET /api/health/detailed`

Add this route to your server:

```javascript
// In server.js or a new routes file
import { getFullHealthReport, responseTimeMonitor } from './utils/monitoring.js';

app.get('/api/health/detailed', async (req, res) => {
  const report = await getFullHealthReport(io);
  res.json(report);
});

app.get('/api/health/metrics', (req, res) => {
  res.json({
    responseTime: responseTimeMonitor.getAllMetrics(),
    timestamp: new Date().toISOString()
  });
});
```

### Access Monitoring

```bash
# Health check
curl http://localhost:5000/api/health

# Detailed metrics
curl http://localhost:5000/api/health/detailed

# Response time metrics
curl http://localhost:5000/api/health/metrics
```

### Set Up Uptime Monitoring

**Option 1: UptimeRobot (Free)**
1. Go to [UptimeRobot](https://uptimerobot.com/)
2. Add HTTP(s) monitor
3. URL: `https://your-backend-url.com/api/health`
4. Check interval: 5 minutes

**Option 2: Pingdom**
1. Go to [Pingdom](https://www.pingdom.com/)
2. Add uptime check
3. Configure alerts

---

## 7. Performance Monitoring

### Enable Request Logging

Already configured in `monitoring.js`. Add to your server:

```javascript
import { requestLogger, responseTimeMonitor } from './utils/monitoring.js';

// Add before your routes
app.use(requestLogger(responseTimeMonitor));
```

### Monitor Slow Requests

Automatically logs requests >1000ms to console.

### Database Query Monitoring

Add to mongoose queries:

```javascript
mongoose.set('debug', process.env.NODE_ENV === 'development');
```

---

## 8. SSL/HTTPS Setup

### Using Let's Encrypt (Recommended)

```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Configure Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 9. Environment Variables Checklist

### Backend Production

```env
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<min-32-chars-random-string>
CLIENT_URL=https://your-domain.com

# Optional - Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@offolaunch.com

TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Optional - Municipal APIs
SF_GOV_API_KEY=...
CHICAGO_API_KEY=...
NYC_API_KEY=...
LA_HEALTH_API_KEY=...
HOUSTON_API_KEY=...

# Optional - Monitoring
SENTRY_DSN=...
LOG_LEVEL=info
```

### Frontend Production

```env
# Required
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_DEMO_MODE=false

# Optional - Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MIXPANEL_TOKEN=...
NEXT_PUBLIC_SENTRY_DSN=...

# Optional - Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

---

## 10. Deployment Checklist

### Pre-Deployment

- [ ] All environment variables set
- [ ] MongoDB Atlas IP whitelist configured
- [ ] SSL certificates installed
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Analytics setup (optional)
- [ ] Municipal API keys obtained (optional)

### Post-Deployment

- [ ] Health check returns 200
- [ ] Can login/register
- [ ] Real-time updates work
- [ ] File uploads work
- [ ] Database backups running
- [ ] Monitoring dashboard accessible
- [ ] Analytics tracking (check GA)
- [ ] Error tracking works (Sentry)

---

## 11. Scaling Checklist

### When to Scale

- Response time >500ms average
- CPU usage >70% sustained
- Memory usage >80%
- Database connections maxed out

### Scaling Options

**Horizontal (Recommended):**
- Deploy multiple backend instances
- Use load balancer (Railway/Render provides this)
- Enable sticky sessions for Socket.IO

**Vertical:**
- Upgrade server plan
- Increase MongoDB cluster tier
- Add more RAM/CPU

**Database:**
- Upgrade Atlas cluster (M10 → M20)
- Enable sharding
- Add read replicas
- Implement Redis caching

---

## 12. Troubleshooting

### CI/CD Pipeline Issues

**Failed tests:**
- Check GitHub Actions logs
- Run tests locally first
- Verify test database connection

**Deploy failed:**
- Check deployment platform logs
- Verify environment variables
- Check disk space

### Monitoring Issues

**PM2 not starting:**
```bash
pm2 logs
pm2 restart ecosystem.config.js
```

**Health check failing:**
```bash
# Check MongoDB connection
mongosh <your-connection-string>

# Check server logs
pm2 logs offo-launch-backend
```

### Backup Issues

**Backup script fails:**
- Check MongoDB connection string
- Verify disk space
- Check write permissions

---

## 13. Maintenance Schedule

### Daily
- [ ] Check error logs
- [ ] Monitor response times
- [ ] Check disk space

### Weekly
- [ ] Review analytics
- [ ] Check database size
- [ ] Test backup restore
- [ ] Review slow queries

### Monthly
- [ ] Update dependencies
- [ ] Review security alerts
- [ ] Database optimization
- [ ] Review and archive old data

---

## Support

**Documentation:**
- Main: [README.md](README.md)
- Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- API: [server/README.md](server/README.md)

**Contact:** support@offolab.com

---

**Production Status:** Ready for deployment ✅
**Last Updated:** December 16, 2025
