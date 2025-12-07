# OFFO Risk Score MVP - Setup Checklist

Use this checklist to verify your development environment is properly configured.

## ✅ Pre-Development Checklist

### System Requirements
- [ ] Python 3.9 or higher installed
  ```bash
  python --version  # Should show 3.9+
  ```
- [ ] Node.js 18 or higher installed
  ```bash
  node --version  # Should show v18+
  ```
- [ ] npm installed
  ```bash
  npm --version
  ```
- [ ] Git installed (optional but recommended)
  ```bash
  git --version
  ```

### Backend Setup
- [ ] Navigate to backend directory
  ```bash
  cd /c/Dev/offo-risk-score-mvp/backend
  ```
- [ ] Create virtual environment
  ```bash
  python -m venv venv
  ```
- [ ] Activate virtual environment
  ```bash
  # Windows
  venv\Scripts\activate

  # Mac/Linux
  source venv/bin/activate
  ```
- [ ] Install dependencies
  ```bash
  pip install -r requirements.txt
  ```
- [ ] Verify FastAPI installation
  ```bash
  python -c "import fastapi; print(fastapi.__version__)"
  ```
- [ ] Start API server
  ```bash
  python main.py
  ```
- [ ] Verify API is running at http://localhost:8000
  ```bash
  curl http://localhost:8000/
  ```
- [ ] Check Swagger docs at http://localhost:8000/docs
- [ ] Run tests
  ```bash
  pytest tests/ -v
  ```
- [ ] Verify all tests pass ✅

### Frontend Setup
- [ ] Open NEW terminal (keep backend running)
- [ ] Navigate to frontend directory
  ```bash
  cd /c/Dev/offo-risk-score-mvp/frontend
  ```
- [ ] Install dependencies
  ```bash
  npm install
  ```
- [ ] Create environment file
  ```bash
  cp .env.local.example .env.local
  ```
- [ ] Verify .env.local contains:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:8000
  ```
- [ ] Start development server
  ```bash
  npm run dev
  ```
- [ ] Verify frontend is running at http://localhost:3000
- [ ] Open http://localhost:3000 in browser
- [ ] Verify dashboard loads without errors

### Integration Testing
- [ ] Both backend (8000) and frontend (3000) are running
- [ ] Select "Business B - Healthy" from dropdown
- [ ] Verify score displays (~91)
- [ ] Verify category shows "LOW RISK" in green
- [ ] Verify charts render correctly
- [ ] Select "Business D - Risky" from dropdown
- [ ] Verify score displays (~42)
- [ ] Verify category shows "HIGH RISK" in red
- [ ] Click "Export PDF" button
- [ ] Verify PDF downloads successfully
- [ ] Open PDF and verify content is correct

## 🔧 Troubleshooting Checklist

### Backend Issues

#### Port 8000 already in use
- [ ] Check what's using port 8000
  ```bash
  # Windows
  netstat -ano | findstr :8000

  # Mac/Linux
  lsof -i :8000
  ```
- [ ] Kill the process or use different port

#### Module not found errors
- [ ] Verify virtual environment is activated
  ```bash
  which python  # Should point to venv
  ```
- [ ] Reinstall dependencies
  ```bash
  pip install -r requirements.txt
  ```

#### Tests failing
- [ ] Check Python version (must be 3.9+)
- [ ] Ensure all dependencies installed
- [ ] Run with verbose output
  ```bash
  pytest tests/ -v -s
  ```

### Frontend Issues

#### npm install fails
- [ ] Clear npm cache
  ```bash
  npm cache clean --force
  ```
- [ ] Delete node_modules and retry
  ```bash
  rm -rf node_modules
  npm install
  ```

#### Cannot connect to backend
- [ ] Verify backend is running
  ```bash
  curl http://localhost:8000/
  ```
- [ ] Check .env.local has correct API URL
- [ ] Look for CORS errors in browser console

#### Charts not displaying
- [ ] Check browser console for errors
- [ ] Verify Recharts is installed
  ```bash
  npm list recharts
  ```
- [ ] Clear browser cache and reload

#### PDF export not working
- [ ] Verify jsPDF is installed
  ```bash
  npm list jspdf
  ```
- [ ] Check browser console for errors
- [ ] Try in different browser

## 📝 Development Workflow Checklist

### Before Starting Work
- [ ] Pull latest changes (if using Git)
- [ ] Activate virtual environment (backend)
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Verify both running correctly

### During Development
- [ ] Write code in small, testable chunks
- [ ] Run tests frequently
- [ ] Check for TypeScript errors (frontend)
- [ ] Verify API responses in Swagger docs
- [ ] Test in browser regularly

### Before Committing (if using Git)
- [ ] All backend tests pass
  ```bash
  cd backend && pytest tests/ -v
  ```
- [ ] Frontend builds without errors
  ```bash
  cd frontend && npm run build
  ```
- [ ] No console errors in browser
- [ ] Code formatted and linted
- [ ] Meaningful commit message

## 🎯 Team Onboarding Checklist

### Day 1: Setup
- [ ] Clone/download project
- [ ] Review main README.md
- [ ] Complete system requirements setup
- [ ] Get backend running
- [ ] Get frontend running
- [ ] Run all tests successfully

### Day 1: Understanding
- [ ] Read QUICKSTART.md
- [ ] Read ARCHITECTURE.md
- [ ] Review SPRINT_TICKETS.md
- [ ] Explore code structure
- [ ] Test all API endpoints in Swagger
- [ ] Test all features in dashboard

### Day 2: Development
- [ ] Pick first ticket from sprint backlog
- [ ] Set up development branch (if using Git)
- [ ] Start coding
- [ ] Write tests for new code
- [ ] Document changes

## 🚀 Deployment Checklist (Optional)

### Backend Deployment
- [ ] Environment variables configured
- [ ] Database connection (when replacing dummy data)
- [ ] CORS configured for production frontend URL
- [ ] HTTPS/SSL certificate
- [ ] Health check endpoint working
- [ ] Error tracking configured (Sentry)
- [ ] Logging configured
- [ ] Deploy to Heroku/Railway/AWS
- [ ] Verify production API responding

### Frontend Deployment
- [ ] Environment variable set (NEXT_PUBLIC_API_URL)
- [ ] Production build successful
  ```bash
  npm run build
  ```
- [ ] Deploy to Vercel/Netlify
- [ ] Verify production site loading
- [ ] Test all features in production
- [ ] Check mobile responsiveness

### Post-Deployment
- [ ] API documentation accessible
- [ ] All endpoints working
- [ ] PDF export working
- [ ] Charts rendering
- [ ] Error tracking active
- [ ] Monitoring dashboards set up

## ✅ Quick Verification Commands

```bash
# Backend health
curl http://localhost:8000/

# Get a risk score
curl http://localhost:8000/risk-score/biz_healthy

# List all businesses
curl http://localhost:8000/businesses

# Run backend tests
cd backend && pytest tests/ -v

# Build frontend
cd frontend && npm run build

# Check TypeScript
cd frontend && npx tsc --noEmit
```

## 📞 Getting Help

If you encounter issues:

1. **Check documentation**
   - Main README.md
   - QUICKSTART.md
   - Backend README.md

2. **Review error messages carefully**
   - Check terminal output
   - Check browser console
   - Check test output

3. **Verify setup**
   - Rerun this checklist
   - Ensure all prerequisites met
   - Check versions match requirements

4. **Common solutions**
   - Restart servers
   - Clear caches (npm/pip)
   - Reinstall dependencies
   - Check ports aren't blocked

---

**Once all items checked:** ✅ You're ready to start development!

**Next step:** Review SPRINT_TICKETS.md and start with Ticket #1
