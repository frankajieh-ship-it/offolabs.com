# OFFO Launch Platform - Deployment Guide

## 🚀 Production Deployment

### Prerequisites

- MongoDB Atlas account (or MongoDB server)
- Node.js 18+ on production server
- Domain name configured
- SSL certificate (Let's Encrypt recommended)

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   cd server
   # Initialize git if not already
   git init
   git add .
   git commit -m "Initial commit"

   # Push to GitHub
   gh repo create offo-launch-backend --private
   git push origin main
   ```

3. **Connect to Railway**
   - Click "New Project" → "Deploy from GitHub"
   - Select your backend repository
   - Railway will auto-detect Node.js

4. **Set Environment Variables**
   In Railway dashboard → Variables:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   CLIENT_URL=https://your-frontend-domain.com
   ```

5. **Deploy**
   - Railway auto-deploys on push
   - Get your backend URL: `https://your-app.railway.app`

### Option 2: Render

1. **Create Render Account**
   - Visit [render.com](https://render.com)

2. **Create New Web Service**
   - Connect GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   - Add same variables as above

4. **Deploy**
   - Render auto-deploys
   - Get URL: `https://your-app.onrender.com`

### Option 3: Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
cd server
heroku create offo-launch-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your_secret
heroku config:set CLIENT_URL=https://your-domain.com

# Deploy
git push heroku main
```

## Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure**
   - Follow prompts
   - Set environment variables in dashboard:
     ```env
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     NEXT_PUBLIC_DEMO_MODE=false
     ```

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Environment Variables**
   - Set in Netlify dashboard under Site Settings → Environment Variables

### Option 3: Self-Hosted (VPS)

```bash
# On your server (Ubuntu/Debian)
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup
git clone your-repo
cd frontend
npm install
npm run build

# Start with PM2
pm2 start npm --name "offo-frontend" -- start
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/offo
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## MongoDB Atlas Setup (If Not Already Done)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create free M0 cluster

2. **Database Access**
   - Create user with admin privileges
   - Save username and password

3. **Network Access**
   - Add IP: `0.0.0.0/0` (allow from anywhere)
   - Or add specific IPs of your deployment servers

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

## Environment Variables

### Backend (.env)
```env
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/offo-launch
JWT_SECRET=your-super-secret-key-min-32-chars
CLIENT_URL=https://your-frontend-domain.com

# Optional (for full features)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
```

### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_DEMO_MODE=false
```

## Post-Deployment Checklist

### Backend
- [ ] MongoDB connection successful
- [ ] Environment variables set
- [ ] Health endpoint accessible: `GET /api/health`
- [ ] CORS configured for frontend domain
- [ ] SSL certificate installed
- [ ] Logs accessible and monitored

### Frontend
- [ ] API URL points to production backend
- [ ] Demo mode disabled
- [ ] Build successful
- [ ] All routes accessible
- [ ] Assets loading correctly
- [ ] Socket.IO connecting to backend

### Testing
- [ ] User registration works
- [ ] Login works
- [ ] Create project works
- [ ] Real-time updates work
- [ ] File upload works
- [ ] Notifications work

## Monitoring & Maintenance

### Logs

**Backend (Railway):**
- View in Railway dashboard → Deployments → Logs

**Backend (PM2):**
```bash
pm2 logs offo-backend
```

**Frontend (Vercel):**
- View in Vercel dashboard → Deployments → Function Logs

### Health Checks

**Backend:**
```bash
curl https://your-backend-url.com/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-16T...",
  "version": "1.0.0"
}
```

**Frontend:**
```bash
curl https://your-domain.com
```

Should return 200 status code.

### Database Backups

**MongoDB Atlas:**
- Automatic backups enabled by default
- Configure backup schedule in Atlas dashboard
- Test restore process

## Scaling

### Backend Scaling

**Horizontal Scaling:**
- Deploy multiple instances
- Use load balancer (Railway/Render provide this)
- Configure sticky sessions for Socket.IO

**Vertical Scaling:**
- Upgrade server plan on Railway/Render
- Monitor memory and CPU usage

**Database Scaling:**
- Upgrade MongoDB Atlas cluster
- Enable sharding if needed
- Add read replicas

### Frontend Scaling

- Vercel/Netlify handle scaling automatically
- CDN enabled by default
- Static assets cached globally

## Security Checklist

- [ ] Environment variables secured (not in code)
- [ ] JWT secret is strong (32+ characters)
- [ ] HTTPS enabled on all domains
- [ ] CORS restricted to your domain only
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (using Mongoose)
- [ ] XSS protection enabled
- [ ] CSRF tokens if needed

## Rollback Plan

### Backend
```bash
# Railway/Render: Use dashboard to redeploy previous version

# Heroku
heroku releases
heroku rollback v123

# PM2
pm2 list
pm2 restart offo-backend --update-env
```

### Frontend
```bash
# Vercel
vercel rollback

# Netlify
netlify deploy --prod --dir=.next
```

## Cost Estimates (Monthly)

### Free Tier:
- **MongoDB Atlas:** Free (M0 cluster, 512MB)
- **Railway:** $5 credit/month (enough for small apps)
- **Vercel:** Free (hobby plan)
- **Total:** ~$0-5/month

### Production Tier:
- **MongoDB Atlas:** $9-25/month (M10 cluster)
- **Railway/Render:** $7-20/month per service
- **Vercel Pro:** $20/month
- **Total:** ~$40-70/month

## Support

**Issues:**
- Backend logs: Check Railway/Render dashboard
- Frontend logs: Check Vercel dashboard
- MongoDB: Check Atlas monitoring

**Documentation:**
- Backend API: `server/README.md`
- Frontend: `frontend/LAUNCH_PLATFORM.md`
- Quick Start: `QUICK_START.md`

---

**Deployment Status:** Ready for production ✅
**Last Updated:** December 16, 2025
