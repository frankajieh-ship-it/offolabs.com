# Backend Deployment - Quick Start Guide

Deploy the OFFO Risk Score API backend for offolab.com in under 10 minutes.

## Prerequisites

- Git repository pushed to GitHub
- Choose a deployment platform (Railway recommended)

## Option 1: Railway (Recommended - Fastest)

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Deploy in 3 Commands
```bash
# Login to Railway
railway login

# Navigate to backend
cd backend

# Initialize and deploy
railway init
railway up
```

### 3. Set Environment Variables
```bash
# Generate and set secret key
railway variables set SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(32))")

# Set CORS origins for your domain
railway variables set CORS_ORIGINS="https://offolab.com,https://www.offolab.com,http://localhost:3000"

# Set token expiry
railway variables set ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 4. Get Your API URL
```bash
railway domain
```

**Example output:** `https://offo-risk-api.up.railway.app`

### 5. Test Deployment
```bash
# Replace with your Railway URL
curl https://offo-risk-api.up.railway.app/

# Should return:
# {"service":"OFFO Risk Score API","version":"1.0.0","status":"operational"}
```

### 6. (Optional) Add Custom Domain
In Railway Dashboard:
1. Select your service
2. Go to Settings → Networking
3. Add custom domain: `api.offolab.com`
4. Update DNS with provided CNAME record

**Done! Your backend is live.**

---

## Option 2: Render (Alternative - Also Easy)

### 1. Connect GitHub
- Go to: https://dashboard.render.com
- Click "New +" → "Web Service"
- Connect your GitHub repository

### 2. Configure Service
- **Name:** `offo-risk-api`
- **Root Directory:** `backend`
- **Environment:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 3. Set Environment Variables
In Render dashboard, add:
- `SECRET_KEY`: Generate with `python -c "import secrets; print(secrets.token_urlsafe(32))"`
- `CORS_ORIGINS`: `https://offolab.com,https://www.offolab.com,http://localhost:3000`
- `ACCESS_TOKEN_EXPIRE_MINUTES`: `30`

### 4. Deploy
Click "Create Web Service" - Render will auto-deploy.

### 5. Get Your URL
Copy from Render dashboard (e.g., `https://offo-risk-api.onrender.com`)

**Done!**

---

## Next Steps

### Update Frontend to Use Production API

**Option A: Environment Variable (Recommended)**

Create or update `frontend/.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

**Option B: Netlify Environment Variables**

In Netlify dashboard:
1. Site Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL` = `https://your-api-url.com`
3. Redeploy frontend

### Test End-to-End

1. **Get auth token:**
```bash
curl -X POST https://your-api-url.com/auth/token?client_id=demo_client
```

2. **Test risk score endpoint:**
```bash
TOKEN="<token-from-above>"
curl -H "Authorization: Bearer $TOKEN" https://your-api-url.com/risk-score/biz_healthy
```

3. **Verify frontend can connect:**
- Visit your frontend at offolab.com
- Navigate to Risk Dashboard
- Should load data from your API

---

## Troubleshooting

### CORS Errors
**Problem:** Browser console shows CORS errors

**Solution:** Verify `CORS_ORIGINS` environment variable includes your frontend domain:
```bash
# Railway
railway variables set CORS_ORIGINS="https://offolab.com,https://www.offolab.com"

# Render
# Update in Render dashboard environment variables
```

### 401 Unauthorized
**Problem:** API returns 401 errors

**Solution:** Ensure you're sending JWT token in Authorization header:
```bash
Authorization: Bearer <your-token>
```

### Backend Not Responding
**Problem:** API URL returns no response

**Solution:**
1. Check deployment logs:
   - Railway: `railway logs`
   - Render: View in dashboard logs tab
2. Verify build succeeded
3. Check for Python errors in logs

### Slow First Request
**Problem:** First API call is very slow

**Note:** Free tiers on Render spin down after inactivity. First request wakes it up (can take 30-60s). Upgrade to paid tier for always-on service.

---

## Deployment Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Environment variables set (`SECRET_KEY`, `CORS_ORIGINS`)
- [ ] API health check working (`/` endpoint)
- [ ] Auth token generation working (`/auth/token`)
- [ ] Risk score endpoint working (`/risk-score/{business_id}`)
- [ ] Frontend environment variable updated (`NEXT_PUBLIC_API_URL`)
- [ ] Frontend redeployed with new API URL
- [ ] End-to-end test successful (frontend → backend)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic on Railway/Render)

---

## Cost

| Platform | Free Tier | Recommended Plan |
|----------|-----------|------------------|
| Railway  | $5 credit/month | ~$5-10/month |
| Render   | 750 hours/month | $7/month (for always-on) |

**Recommendation:** Start with Railway free tier, upgrade if needed.

---

## API Documentation

Once deployed, visit:
- **Swagger UI:** `https://your-api-url.com/docs`
- **ReDoc:** `https://your-api-url.com/redoc`

---

## Support & Resources

- **Full Deployment Guide:** See `backend/DEPLOYMENT.md`
- **Backend README:** See `backend/README.md`
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs

---

## Security Notes

✅ **Implemented:**
- JWT authentication on all protected endpoints
- Environment-based secret key
- CORS restrictions
- HTTPS enforced by platform

⚠️ **Future Enhancements:**
- Rate limiting
- API key rotation
- Database with proper auth
- Monitoring and alerts

---

**Questions?** Check the detailed `backend/DEPLOYMENT.md` guide for more options and troubleshooting.