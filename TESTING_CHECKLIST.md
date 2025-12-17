# OFFO Launch Platform - Testing Checklist

## 🧪 Pre-Production Testing Guide

Complete this checklist before deploying to production.

---

## 1. Backend Testing

### Database Connection
- [ ] MongoDB Atlas connection successful
- [ ] Test database credentials work
- [ ] IP whitelist configured (0.0.0.0/0 or specific IPs)
- [ ] Database indexes created automatically
- [ ] Connection pooling working

```bash
# Test MongoDB connection
cd server
npm run dev

# Should see:
# ✅ Mongoose connected to MongoDB
# 📊 MongoDB connected: ✅
```

### API Endpoints

**Authentication:**
- [ ] POST /api/auth/register - Creates new user
- [ ] POST /api/auth/login - Returns JWT token
- [ ] GET /api/auth/me - Returns current user (with valid token)

**Projects:**
- [ ] GET /api/projects - Lists all projects
- [ ] POST /api/projects - Creates new project
- [ ] GET /api/projects/:id - Gets project details
- [ ] PUT /api/projects/:id - Updates project
- [ ] DELETE /api/projects/:id - Deletes project

**Permits:**
- [ ] GET /api/permits/project/:projectId - Gets permits for project
- [ ] POST /api/permits - Creates new permit
- [ ] PUT /api/permits/:id - Updates permit
- [ ] POST /api/permits/:id/sync - Syncs with government API
- [ ] POST /api/permits/:id/documents - Uploads document

**Inspections:**
- [ ] GET /api/inspections/permit/:permitId - Gets inspections
- [ ] POST /api/inspections - Schedules inspection
- [ ] PATCH /api/inspections/:id/status - Updates status

**Notifications:**
- [ ] GET /api/notifications - Gets all notifications
- [ ] GET /api/notifications/unread - Gets unread count
- [ ] PATCH /api/notifications/:id/read - Marks as read
- [ ] PATCH /api/notifications/read-all - Marks all as read
- [ ] DELETE /api/notifications/:id - Deletes notification

**Municipal Integrations:**
- [ ] POST /api/integrations/sync/:city - Syncs with city API
- [ ] GET /api/integrations/supported-cities - Lists supported cities

**Monitoring:**
- [ ] GET /api/health - Basic health check
- [ ] GET /api/health/detailed - Detailed system health
- [ ] GET /api/health/metrics - Performance metrics

### Socket.IO Events

**Server → Client:**
- [ ] permit:updated - Permit changes broadcast
- [ ] permit:created - New permit notification
- [ ] permit:comment:new - New comment notification
- [ ] inspection:created - New inspection scheduled
- [ ] inspection:status_changed - Inspection status updated
- [ ] project:updated - Project changes
- [ ] project:user:joined - User joined project

**Client → Server:**
- [ ] project:join - Join project room
- [ ] project:leave - Leave project room
- [ ] permit:comment - Send comment

### Notification Services

**Email (Nodemailer):**
- [ ] SMTP configuration valid
- [ ] Test email sends successfully
- [ ] Email templates render correctly
- [ ] Graceful degradation if SMTP not configured

```bash
# Test email notification
curl -X POST http://localhost:5000/api/test/email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test","body":"Test email"}'
```

**SMS (Twilio):**
- [ ] Twilio credentials valid
- [ ] Test SMS sends successfully
- [ ] Phone number format validation
- [ ] Graceful degradation if Twilio not configured

**In-App:**
- [ ] Notifications saved to database
- [ ] Real-time notification delivery via Socket.IO
- [ ] Unread count updates correctly

### Background Jobs

- [ ] Permit sync runs every 6 hours
- [ ] Inspection alerts run hourly
- [ ] Expiry checks run daily
- [ ] Jobs log execution status

---

## 2. Frontend Testing

### Pages & Navigation

- [ ] `/` - Dashboard loads correctly
- [ ] `/new` - Create project form works
- [ ] `/[launchId]` - Project details page loads
- [ ] `/[launchId]/permits` - Permits page loads
- [ ] All navigation links work
- [ ] Back button navigation works

### Components

**DocumentUpload:**
- [ ] Drag & drop works
- [ ] File type validation (PDF, images)
- [ ] File size validation (max 10MB)
- [ ] Progress bar displays
- [ ] Upload completes successfully
- [ ] Error handling displays

**StatsGrid:**
- [ ] All 5 metrics display correctly
- [ ] Icons render properly
- [ ] Color coding correct
- [ ] Responsive on mobile

**TimelineChart:**
- [ ] Chart renders with data
- [ ] Months grouped correctly
- [ ] Bars show approved vs pending
- [ ] Tooltip displays on hover
- [ ] Responsive on mobile

**Providers:**
- [ ] QueryClient initialized
- [ ] AuthContext provides user state
- [ ] SocketContext connects to server
- [ ] Toast notifications work

### Contexts

**AuthContext:**
- [ ] Login sets token and user
- [ ] Logout clears token and user
- [ ] Token persists in localStorage
- [ ] Protected routes check authentication
- [ ] Expired tokens handled

**SocketContext:**
- [ ] Connects when authenticated
- [ ] Disconnects when logged out
- [ ] Event listeners registered
- [ ] Toast notifications on events
- [ ] Reconnection on disconnect

### Dual-Mode Operation

**Demo Mode (NEXT_PUBLIC_DEMO_MODE=true):**
- [ ] Works without backend
- [ ] Data stored in localStorage
- [ ] CRUD operations work
- [ ] File uploads simulated
- [ ] No API errors

**Production Mode (NEXT_PUBLIC_DEMO_MODE=false):**
- [ ] Connects to backend API
- [ ] Authentication required
- [ ] Real-time updates work
- [ ] File uploads to server
- [ ] Error messages display

### Analytics

- [ ] Google Analytics tracks pageviews
- [ ] Custom events tracked:
  - [ ] Project created
  - [ ] Permit synced
  - [ ] Document uploaded
  - [ ] Inspection scheduled
- [ ] Mixpanel events (if configured)
- [ ] Sentry error tracking (if configured)

---

## 3. Integration Testing

### Authentication Flow

- [ ] Register new user → Success
- [ ] Login with credentials → Receive token
- [ ] Access protected route → Authorized
- [ ] Logout → Token cleared
- [ ] Access protected route → Redirected to login

### Project Lifecycle

1. [ ] Create new project
2. [ ] Add team members
3. [ ] Create permits for project
4. [ ] Upload documents
5. [ ] Schedule inspections
6. [ ] Receive notifications
7. [ ] Update permit status
8. [ ] View dashboard analytics

### Real-Time Collaboration

1. [ ] User A creates project
2. [ ] User B joins project
3. [ ] User A updates permit
4. [ ] User B sees update in real-time
5. [ ] Both users see notifications
6. [ ] Comments appear instantly

### Municipal API Integration

**San Francisco:**
- [ ] Fetch permit by number
- [ ] Get inspections for facility
- [ ] Parse response correctly
- [ ] Handle API errors

**Chicago:**
- [ ] Fetch business license
- [ ] Get inspection data
- [ ] Handle rate limiting

**Other Cities:**
- [ ] Test LA, Houston, NYC APIs
- [ ] Verify data mapping
- [ ] Error handling

---

## 4. Performance Testing

### Backend Performance

- [ ] Response time <100ms average (local)
- [ ] Response time <500ms average (production)
- [ ] Database queries <50ms
- [ ] Socket.IO connections: 100+ concurrent
- [ ] File upload: 10MB in <10 seconds
- [ ] Memory usage stable (<500MB)
- [ ] No memory leaks after 1000 requests

```bash
# Load testing with autocannon
npm install -g autocannon
autocannon -c 100 -d 30 http://localhost:5000/api/health
```

### Frontend Performance

- [ ] First load <3s
- [ ] Navigation <200ms
- [ ] Bundle size <500KB
- [ ] Lighthouse score >90
- [ ] No console errors
- [ ] No memory leaks

```bash
# Build and analyze
cd frontend
npm run build
npm run analyze  # If configured
```

### Database Performance

- [ ] Indexes created automatically
- [ ] Queries use indexes (check explain)
- [ ] Connection pool size adequate
- [ ] No slow queries (>100ms)

---

## 5. Security Testing

### Authentication & Authorization

- [ ] JWT tokens expire correctly
- [ ] Refresh token flow (if implemented)
- [ ] Password hashing (bcrypt, 12 rounds)
- [ ] Protected routes require authentication
- [ ] CORS only allows CLIENT_URL
- [ ] No sensitive data in logs

### Input Validation

- [ ] SQL injection prevention (Mongoose)
- [ ] XSS protection (helmet)
- [ ] File upload validation
- [ ] Request size limits
- [ ] Rate limiting (if configured)

### Environment Security

- [ ] No .env files committed
- [ ] JWT_SECRET is strong (32+ chars)
- [ ] MongoDB credentials secured
- [ ] API keys not exposed to frontend
- [ ] HTTPS enforced in production

---

## 6. CI/CD Testing

### GitHub Actions

**Backend Workflow:**
- [ ] Triggers on push to main/develop
- [ ] Runs tests successfully
- [ ] Linter passes
- [ ] Builds without errors
- [ ] Deploys to Railway/Render
- [ ] Slack notification sent (if configured)

**Frontend Workflow:**
- [ ] Triggers on push to main/develop
- [ ] TypeScript compiles
- [ ] Linter passes
- [ ] Build succeeds
- [ ] Deploys to Vercel
- [ ] Slack notification sent (if configured)

### Secrets Configuration

- [ ] RAILWAY_TOKEN set
- [ ] VERCEL_TOKEN set
- [ ] MONGODB_URI_TEST set
- [ ] NEXT_PUBLIC_API_URL set
- [ ] SLACK_WEBHOOK set (optional)

---

## 7. Monitoring & Logging

### PM2 Monitoring

- [ ] PM2 starts application
- [ ] Cluster mode uses all CPU cores
- [ ] Auto-restart on crash
- [ ] Logs written to files
- [ ] `pm2 monit` shows metrics
- [ ] `pm2 web` dashboard accessible

### Health Checks

- [ ] /api/health returns 200
- [ ] /api/health/detailed shows all metrics
- [ ] System uptime tracked
- [ ] Memory usage monitored
- [ ] Database health checked
- [ ] Socket.IO connections counted

### Error Tracking

- [ ] Errors logged to console
- [ ] Sentry captures errors (if configured)
- [ ] Error rate monitored
- [ ] 500 errors trigger alerts

---

## 8. Backup & Recovery

### Database Backups

- [ ] Manual backup script works
- [ ] Backups compressed (tar.gz)
- [ ] Backups stored in /backups
- [ ] Old backups deleted (7 day retention)
- [ ] S3 upload works (if configured)

```bash
cd server/scripts
./backup-db.sh
# Check backups directory
ls -lh backups/
```

### Restore Testing

- [ ] Restore script works
- [ ] Data integrity verified
- [ ] Application works after restore

```bash
cd server/scripts
./restore-db.sh backups/offo-launch-backup-YYYYMMDD_HHMMSS.tar.gz
```

---

## 9. Mobile Responsiveness

- [ ] Dashboard responsive on mobile
- [ ] Forms usable on mobile
- [ ] Navigation menu works on mobile
- [ ] Charts render correctly
- [ ] Touch interactions work
- [ ] No horizontal scrolling

### Test Devices

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)
- [ ] Desktop (1920x1080)

---

## 10. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] No console errors
- [ ] Features work consistently

---

## 11. Deployment Verification

### Backend (Railway/Render)

- [ ] Environment variables set
- [ ] Build succeeds
- [ ] Server starts without errors
- [ ] MongoDB connects
- [ ] Health endpoint accessible
- [ ] HTTPS works
- [ ] Logs accessible

### Frontend (Vercel/Netlify)

- [ ] Build succeeds
- [ ] Environment variables set
- [ ] Site loads correctly
- [ ] API calls work
- [ ] Real-time updates work
- [ ] HTTPS works
- [ ] Custom domain configured (optional)

### DNS Configuration

- [ ] A record points to server
- [ ] CNAME for www subdomain
- [ ] SSL certificate valid
- [ ] No mixed content warnings

---

## 12. User Acceptance Testing

### User Flows

**Restaurant Owner:**
1. [ ] Register account
2. [ ] Create new restaurant launch
3. [ ] Add required permits
4. [ ] Upload documents
5. [ ] Track permit status
6. [ ] Receive notifications
7. [ ] View dashboard analytics

**Team Member:**
1. [ ] Accept invitation
2. [ ] View assigned projects
3. [ ] Update permit status
4. [ ] Add comments
5. [ ] Schedule inspections
6. [ ] Receive alerts

**Admin:**
1. [ ] View all projects
2. [ ] Manage users
3. [ ] View system health
4. [ ] Access analytics
5. [ ] Generate reports

---

## 13. Documentation Review

- [ ] README.md complete
- [ ] QUICK_START.md accurate
- [ ] DEPLOYMENT.md up to date
- [ ] API documentation (server/README.md) complete
- [ ] All environment variables documented
- [ ] Architecture diagrams (if applicable)
- [ ] Troubleshooting guide

---

## 14. Final Production Checklist

### Before Launch

- [ ] All tests passing
- [ ] Security audit complete
- [ ] Performance benchmarks met
- [ ] Backups configured
- [ ] Monitoring active
- [ ] Analytics configured
- [ ] Documentation complete
- [ ] Team trained
- [ ] Support process defined

### Launch Day

- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Run smoke tests
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Verify backups
- [ ] Test notifications
- [ ] Document any issues

### Post-Launch (Week 1)

- [ ] Monitor daily active users
- [ ] Check error rates
- [ ] Review performance metrics
- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] Update documentation
- [ ] Plan next sprint

---

## Testing Tools

### Recommended Tools

```bash
# API Testing
npm install -g newman  # Postman CLI
npm install -g autocannon  # Load testing

# Frontend Testing
npm install -g lighthouse  # Performance audit
npm install -g @lhci/cli  # Lighthouse CI

# Database Testing
mongosh  # MongoDB shell
```

### Test Data

Create test data for different scenarios:
- [ ] 10 sample projects
- [ ] 50 sample permits
- [ ] 100 sample inspections
- [ ] 20 sample users
- [ ] Various permit statuses
- [ ] Different cities/locations

---

## Bug Tracking Template

When issues are found:

```markdown
**Issue:** [Brief description]
**Severity:** Critical / High / Medium / Low
**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected:** [What should happen]
**Actual:** [What actually happens]
**Environment:** Development / Staging / Production
**Browser/Device:** [If frontend issue]
**Error Logs:** [Paste relevant logs]
**Screenshots:** [If applicable]
**Fix:** [Once resolved]
```

---

## Success Criteria

✅ All critical tests passing
✅ No blocking bugs
✅ Performance benchmarks met
✅ Security audit passed
✅ Documentation complete
✅ Team approval received
✅ Production deployment successful

---

**Testing Status:** Ready for systematic testing
**Last Updated:** December 16, 2025
**Version:** 1.0.0
