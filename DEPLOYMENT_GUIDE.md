# OFFO Risk Score MVP - Deployment Guide

## Problem: Netlify "Page Not Found" Error

Your Next.js app shows "Page Not Found" on Netlify because:
1. The app uses App Router (`app/` directory) which requires specific build settings
2. Your app depends on a Python backend API that isn't deployed
3. Netlify needs proper configuration for Next.js dynamic routes

## Solution: Two-Part Deployment

### Part 1: Deploy Python Backend to Render.com (Free)

1. **Create a Render account**: Go to https://render.com and sign up

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo OR deploy from local files
   - Settings:
     - **Name**: offo-risk-api
     - **Region**: Choose closest to your users
     - **Branch**: main
     - **Root Directory**: `backend`
     - **Environment**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
     - **Instance Type**: Free

3. **Get your backend URL**: After deployment, you'll get a URL like:
   ```
   https://offo-risk-api.onrender.com
   ```

### Part 2: Deploy Frontend to Vercel (Recommended)

**Why Vercel over Netlify?**
- Built by Next.js creators
- Zero-config Next.js deployment
- Better App Router support
- Free tier includes everything you need

#### Steps:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend**:
   ```bash
   cd C:/Dev/offo-risk-score-mvp/frontend
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Configure environment variable**:
   When prompted or in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://offo-risk-api.onrender.com
   ```

5. **Get your frontend URL**: You'll receive a URL like:
   ```
   https://offo-risk-dashboard.vercel.app
   ```

### Part 3: Update OFFO Simple Website

Once deployed, update the Risk Intelligence Dashboard link in your OFFO website:

```html
<!-- Change this line in C:\Dev\OFFO_ai_simple\index.html -->
<a href="https://offo-risk-dashboard.vercel.app" class="btn btn-primary" target="_blank">
    View Live Dashboard Demo →
</a>
```

---

## Alternative: Deploy Frontend to Netlify (If You Prefer)

If you really want to use Netlify for the frontend:

1. **Update netlify.toml** (already created in root directory):
   ```toml
   [build]
     base = "frontend"
     command = "npm run build"
     publish = "frontend/.next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy to Netlify**:
   - Go to Netlify dashboard
   - Import from Git OR drag/drop frontend folder
   - Build settings should auto-detect from netlify.toml
   - Add environment variable:
     - **Key**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://offo-risk-api.onrender.com`

3. **Important**: Make sure "Base directory" is set to `frontend` in Netlify settings

---

## Testing Your Deployment

After deployment:

1. **Test backend API**:
   ```bash
   curl https://offo-risk-api.onrender.com/risk-score/biz_excellent
   ```

2. **Test frontend**:
   - Visit your deployed URL
   - Click on a business card
   - Verify risk scores load
   - Test PDF export

---

## Troubleshooting

### "Page Not Found" on Netlify
- ✅ Ensure `netlify.toml` exists in root
- ✅ Check "Base directory" is set to `frontend`
- ✅ Verify build command is `npm run build`
- ✅ Publish directory should be `frontend/.next`

### API Errors (401/500)
- ✅ Backend must be deployed first
- ✅ Environment variable `NEXT_PUBLIC_API_URL` must be set
- ✅ Check backend logs in Render dashboard

### Dynamic Routes Not Working
- ✅ Netlify Next.js plugin must be installed
- ✅ Use trailing slashes in next.config.js (already configured)

---

## Quick Start Commands

```bash
# Backend deployment (Render.com)
# Do this manually via Render dashboard

# Frontend deployment (Vercel - Recommended)
cd C:/Dev/offo-risk-score-mvp/frontend
vercel

# Frontend deployment (Netlify - Alternative)
# Do this via Netlify dashboard with netlify.toml in root
```

---

## Cost Breakdown

- **Render (Backend)**: Free tier (750 hours/month)
- **Vercel (Frontend)**: Free tier (unlimited personal projects)
- **Total**: $0/month for demo/MVP

---

## Next Steps

1. Deploy backend to Render.com
2. Get backend URL
3. Deploy frontend to Vercel with backend URL as environment variable
4. Test entire flow
5. Update OFFO simple website link to production URL
6. Push updated OFFO website to Netlify
