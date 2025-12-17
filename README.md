# OFFO Launch Platform

**Transforming restaurant launches from chaos to clarity**

A comprehensive permit and inspection management platform that helps restaurant owners navigate the complex process of launching a new location. Track permits, schedule inspections, collaborate with teams, and stay compliant with municipal requirements.

---

## 🚀 Features

### Core Platform
- ✅ **Project Management** - Create and track multiple restaurant launch projects
- ✅ **Permit Tracking** - Manage all permits (health, fire, building, zoning, business license)
- ✅ **Inspection Scheduling** - Schedule and track inspection appointments
- ✅ **Document Management** - Upload and organize required documents
- ✅ **Real-Time Collaboration** - Socket.IO for live updates across teams
- ✅ **Multi-Channel Notifications** - Email, SMS, and in-app alerts
- ✅ **Dashboard Analytics** - Visual insights into permit status and timelines

### Advanced Features
- ✅ **Municipal API Integration** - Sync with 5 major US cities (SF, Chicago, LA, Houston, NYC)
- ✅ **CI/CD Pipeline** - Automated testing and deployment with GitHub Actions
- ✅ **Production Monitoring** - PM2, health checks, performance metrics
- ✅ **Database Backups** - Automated MongoDB backups with retention
- ✅ **Analytics** - Google Analytics, Mixpanel, Sentry integration
- ✅ **Dual-Mode Operation** - Demo mode (localStorage) + Production mode (backend API)

---

## 📋 Quick Links

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | Get running in 5 minutes |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide |
| [PRODUCTION_SETUP.md](PRODUCTION_SETUP.md) | Advanced production features |
| [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) | Complete testing guide |
| [FINAL_STATUS.md](FINAL_STATUS.md) | Implementation summary |
| [COMPLETE_IMPLEMENTATION.md](COMPLETE_IMPLEMENTATION.md) | Comprehensive overview |

---

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js 18+ with Express.js 5.2.1
- MongoDB with Mongoose ODM
- Socket.IO 4.8.1 for real-time updates
- JWT authentication
- Nodemailer + Twilio for notifications
- PM2 for process management

**Frontend:**
- Next.js 14 (App Router)
- TypeScript 5.3.3
- Tailwind CSS 3.4.0
- React Query for server state
- Axios for HTTP requests
- Recharts for visualizations

**Infrastructure:**
- MongoDB Atlas (database)
- Railway/Render (backend hosting)
- Vercel (frontend hosting)
- GitHub Actions (CI/CD)
- PM2 (production monitoring)

---

## 📁 Project Structure

```
offo-risk-score-mvp/
├── server/                                 # Backend (Node.js/Express)
│   ├── src/
│   │   ├── models/                        # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   ├── Permit.js
│   │   │   ├── Inspection.js
│   │   │   └── Notification.js
│   │   ├── routes/                        # API routes
│   │   │   ├── auth.js
│   │   │   ├── projects.js
│   │   │   ├── permits.js
│   │   │   ├── inspections.js
│   │   │   ├── notifications.js
│   │   │   └── integrations.js
│   │   ├── services/
│   │   │   ├── notificationService.js    # Email/SMS
│   │   │   ├── municipalAPIs.js          # City integrations
│   │   │   ├── socketService.js          # Socket.IO
│   │   │   └── scheduler.js              # Background jobs
│   │   ├── middleware/
│   │   │   ├── auth.js                   # JWT validation
│   │   │   └── validation.js             # Input validation
│   │   ├── utils/
│   │   │   └── monitoring.js             # Health checks
│   │   └── server.js                     # Main entry point
│   ├── scripts/
│   │   ├── backup-db.sh                  # Database backup
│   │   └── restore-db.sh                 # Database restore
│   ├── ecosystem.config.js               # PM2 configuration
│   ├── .env                              # Development config
│   ├── .env.production                   # Production config
│   └── package.json
│
├── frontend/                              # Frontend (Next.js)
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts                    # API client
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx           # Authentication
│   │   │   └── SocketContext.tsx         # Real-time
│   │   ├── components/
│   │   │   ├── DocumentUpload.tsx        # File upload
│   │   │   ├── StatsGrid.tsx             # Dashboard stats
│   │   │   ├── TimelineChart.tsx         # Timeline viz
│   │   │   ├── Providers.tsx             # Context wrapper
│   │   │   └── Analytics.tsx             # Analytics
│   │   ├── types/
│   │   │   └── index.ts                  # TypeScript types
│   │   └── utils/
│   │       └── analytics.ts              # Analytics utils
│   ├── app/
│   │   ├── page.tsx                      # Dashboard
│   │   ├── new/page.tsx                  # Create project
│   │   ├── [launchId]/
│   │   │   ├── page.tsx                  # Project details
│   │   │   └── permits/page.tsx          # Permits view
│   │   ├── layout.tsx                    # Root layout
│   │   └── globals.css                   # Global styles
│   ├── .env.local                        # Development config
│   ├── .env.production                   # Production config
│   └── package.json
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml                # Backend CI/CD
│       └── frontend-ci.yml               # Frontend CI/CD
│
└── docs/                                  # Documentation
    ├── README.md                         # This file
    ├── QUICK_START.md                    # Setup guide
    ├── DEPLOYMENT.md                     # Deploy guide
    ├── PRODUCTION_SETUP.md               # Production features
    ├── TESTING_CHECKLIST.md              # Testing guide
    └── COMPLETE_IMPLEMENTATION.md        # Full overview
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd offo-risk-score-mvp
```

### 2. Backend Setup

```bash
cd server
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3000`

### 4. Access the Platform

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Demo Mode:** Works without backend using localStorage
**Production Mode:** Requires backend running

---

## 📊 API Documentation

### Base URL
- Development: `http://localhost:5000`
- Production: `https://your-api.com`

### Authentication

All protected routes require JWT token in `Authorization: Bearer <token>` header.

```bash
# Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

# Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Key Endpoints

**Projects:**
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Permits:**
- `GET /api/permits/project/:projectId` - Get permits
- `POST /api/permits` - Create permit
- `PUT /api/permits/:id` - Update permit
- `POST /api/permits/:id/sync` - Sync with government
- `POST /api/permits/:id/documents` - Upload document

**Inspections:**
- `GET /api/inspections/permit/:permitId` - Get inspections
- `POST /api/inspections` - Schedule inspection
- `PATCH /api/inspections/:id/status` - Update status

**Monitoring:**
- `GET /api/health` - Basic health check
- `GET /api/health/detailed` - Detailed system health
- `GET /api/health/metrics` - Performance metrics

See [server/README.md](server/README.md) for complete API documentation.

---

## 🔄 Real-Time Features

### Socket.IO Events

**Server → Client:**
- `permit:updated` - Permit changes
- `permit:created` - New permit
- `inspection:created` - New inspection
- `inspection:status_changed` - Status update
- `project:updated` - Project changes
- `project:user:joined` - User joined

**Client → Server:**
- `project:join` - Join project room
- `project:leave` - Leave project room
- `permit:comment` - Send comment

---

## 🏙️ Municipal API Integration

Integrated with 5 major US cities:

1. **San Francisco, CA** - Health Department permits & inspections
2. **Chicago, IL** - Business licenses & inspections
3. **Los Angeles, CA** - Health department food facilities
4. **Houston, TX** - Building permits & inspections
5. **New York, NY** - Restaurant grades & inspections

Configure API keys in `.env`:
```env
SF_GOV_API_KEY=your-key
CHICAGO_API_KEY=your-key
NYC_API_KEY=your-key
LA_HEALTH_API_KEY=your-key
HOUSTON_API_KEY=your-key
```

---

## 📧 Notifications

### Email (Nodemailer)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@offolaunch.com
```

### SMS (Twilio)

```env
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
```

Notifications are sent for:
- Permit status changes
- Inspection reminders
- Document approvals
- Team invitations

---

## 🔒 Security

- ✅ JWT authentication with expiry
- ✅ Password hashing (bcrypt, 12 rounds)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation (express-validator)
- ✅ XSS protection
- ✅ MongoDB injection prevention
- ✅ Environment variable security
- ✅ HTTPS enforcement (production)

---

## 📈 Monitoring & Analytics

### Health Checks

```bash
# Basic health
curl http://localhost:5000/api/health

# Detailed metrics
curl http://localhost:5000/api/health/detailed

# Performance metrics
curl http://localhost:5000/api/health/metrics
```

### PM2 Monitoring

```bash
pm2 start ecosystem.config.js --env production
pm2 monit     # Real-time monitoring
pm2 logs      # View logs
pm2 web       # Web dashboard on :9615
```

### Analytics

- **Google Analytics** - Pageviews and custom events
- **Mixpanel** - User behavior tracking (optional)
- **Sentry** - Error tracking (optional)

Configure in `.env.production`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MIXPANEL_TOKEN=your-token
NEXT_PUBLIC_SENTRY_DSN=https://...
```

---

## 🗄️ Database Backups

### Automated Backups

```bash
cd server/scripts

# Manual backup
./backup-db.sh

# Automated (add to crontab)
0 2 * * * cd /path/to/server/scripts && ./backup-db.sh
```

### Restore

```bash
./restore-db.sh backups/offo-launch-backup-20251216_120000.tar.gz
```

Backups are:
- Compressed (tar.gz)
- Retained for 7 days
- Can upload to S3 (optional)

---

## 🚀 Deployment

### Recommended Stack (Free Tier)

- **Backend:** Railway ($0-5/month)
- **Frontend:** Vercel (Free)
- **Database:** MongoDB Atlas (Free M0)
- **Total:** $0-5/month

### Production Stack

- **Backend:** Railway/Render ($7-20/month)
- **Frontend:** Vercel Pro ($20/month)
- **Database:** MongoDB Atlas M10 ($9-25/month)
- **Total:** $40-115/month

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions.

---

## 🧪 Testing

Run the complete test suite:

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for comprehensive testing guide.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICK_START.md](QUICK_START.md) | 5-minute setup guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment |
| [PRODUCTION_SETUP.md](PRODUCTION_SETUP.md) | CI/CD, monitoring, backups |
| [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) | Complete testing guide |
| [FINAL_STATUS.md](FINAL_STATUS.md) | Implementation status |
| [COMPLETE_IMPLEMENTATION.md](COMPLETE_IMPLEMENTATION.md) | Full feature list |
| [server/README.md](server/README.md) | Complete API docs |
| [server/MONGODB_SETUP.md](server/MONGODB_SETUP.md) | Database setup |
| [frontend/LAUNCH_PLATFORM.md](frontend/LAUNCH_PLATFORM.md) | Frontend architecture |

---

## 🛠️ Development

### Backend Development

```bash
cd server
npm run dev          # Start dev server
npm run lint         # Run linter
npm test             # Run tests
```

### Frontend Development

```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run linter
npx tsc --noEmit     # Type check
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub (triggers CI/CD)
git push origin feature/your-feature

# Create pull request
gh pr create
```

---

## 🔮 Roadmap

### Phase 2
- [ ] Mobile app (React Native)
- [ ] Advanced search & filtering
- [ ] Bulk operations
- [ ] Email templates
- [ ] PDF export

### Phase 3
- [ ] Multi-language support
- [ ] White-label solution
- [ ] Stripe integration
- [ ] Advanced reporting
- [ ] AI recommendations

### Phase 4
- [ ] API marketplace
- [ ] Third-party integrations
- [ ] Custom workflows
- [ ] Audit logs
- [ ] Compliance scoring

---

## 📞 Support

**Documentation:** Check the docs/ directory first

**Issues:** Report bugs at GitHub Issues

**Contact:** support@offolab.com

---

## 📄 License

Proprietary - OFFO LAB

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query)

---

## 📊 Project Stats

- **50+ files** created
- **25+ API endpoints** implemented
- **10+ React components** built
- **5 city integrations** configured
- **3 notification channels** active
- **100% core features** complete

---

**🎯 Status:** Production Ready ✅

**Built with ❤️ by OFFO LAB**

*Transforming restaurant launches from chaos to clarity*

---

**Version:** 1.0.0
**Last Updated:** December 16, 2025
**License:** Proprietary - OFFO LAB
