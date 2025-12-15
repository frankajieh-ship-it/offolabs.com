# Backend Deployment Guide

This guide covers deploying the OFFO Risk Score backend API to production for offolab.com.

## Deployment Options

### Option 1: Railway (Recommended - Free Tier Available)

Railway offers a generous free tier and automatic deployments from Git.

#### Steps:

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

4. **Initialize Railway project:**
   ```bash
   railway init
   ```

5. **Set environment variables:**
   ```bash
   railway variables set SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(32))")
   railway variables set CORS_ORIGINS="https://offolab.com,https://www.offolab.com"
   railway variables set ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

6. **Deploy:**
   ```bash
   railway up
   ```

7. **Get your API URL:**
   ```bash
   railway domain
   ```

8. **Set custom domain (optional):**
   - Go to Railway dashboard
   - Select your service
   - Add custom domain: `api.offolab.com`

### Option 2: Render (Free Tier Available)

Render provides free hosting with automatic SSL.

#### Steps:

1. **Push code to GitHub** (if not already done)

2. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com

3. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `offo-risk-score-mvp` repository

4. **Configure Service:**
   - Name: `offo-risk-api`
   - Root Directory: `backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

5. **Set Environment Variables:**
   - `SECRET_KEY`: Generate with `python -c "import secrets; print(secrets.token_urlsafe(32))"`
   - `CORS_ORIGINS`: `https://offolab.com,https://www.offolab.com`
   - `ACCESS_TOKEN_EXPIRE_MINUTES`: `30`

6. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically deploy

7. **Get your API URL:**
   - Copy the URL from Render dashboard (e.g., `https://offo-risk-api.onrender.com`)

8. **Set custom domain:**
   - In Render dashboard, go to Settings → Custom Domain
   - Add: `api.offolab.com`
   - Update DNS records as instructed

### Option 3: Heroku

Heroku is reliable but has no free tier as of November 2022.

#### Steps:

1. **Install Heroku CLI:**
   ```bash
   # Windows
   scoop install heroku-cli
   # Or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku app:**
   ```bash
   cd backend
   heroku create offo-risk-api
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(32))")
   heroku config:set CORS_ORIGINS="https://offolab.com,https://www.offolab.com"
   heroku config:set ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

6. **Set custom domain:**
   ```bash
   heroku domains:add api.offolab.com
   ```

### Option 4: Docker + Cloud Run (GCP)

For containerized deployment with auto-scaling.

#### Steps:

1. **Build Docker image:**
   ```bash
   cd backend
   docker build -t offo-risk-api .
   ```

2. **Test locally:**
   ```bash
   docker run -p 8000:8000 \
     -e SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(32))") \
     -e CORS_ORIGINS="http://localhost:3000" \
     offo-risk-api
   ```

3. **Push to Google Container Registry:**
   ```bash
   gcloud auth configure-docker
   docker tag offo-risk-api gcr.io/YOUR_PROJECT_ID/offo-risk-api
   docker push gcr.io/YOUR_PROJECT_ID/offo-risk-api
   ```

4. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy offo-risk-api \
     --image gcr.io/YOUR_PROJECT_ID/offo-risk-api \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars SECRET_KEY=your-secret-key \
     --set-env-vars CORS_ORIGINS="https://offolab.com,https://www.offolab.com"
   ```

## Post-Deployment Configuration

### 1. Update Frontend Environment Variables

After deployment, update the frontend to use your production API URL:

**File: `frontend/.env.local`** (create if doesn't exist)
```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

Or for Netlify, set in dashboard:
- Go to Site Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_URL` = `https://your-api-domain.com`

### 2. DNS Configuration

If using custom domain `api.offolab.com`:

**Add DNS Records:**
| Type  | Name | Value                          | TTL  |
|-------|------|--------------------------------|------|
| CNAME | api  | your-deployment-domain.com     | 3600 |

Or if using A records (some providers):
| Type | Name | Value        | TTL  |
|------|------|--------------|------|
| A    | api  | x.x.x.x      | 3600 |

### 3. SSL/TLS Certificate

Most platforms (Railway, Render, Heroku, Cloud Run) automatically provision SSL certificates. Verify:
- Visit `https://api.offolab.com/`
- Should see valid SSL certificate

### 4. Testing the Deployment

**Test health endpoint:**
```bash
curl https://api.offolab.com/
```

Expected response:
```json
{
  "service": "OFFO Risk Score API",
  "version": "1.0.0",
  "status": "operational"
}
```

**Get auth token:**
```bash
curl -X POST https://api.offolab.com/auth/token?client_id=demo_client
```

**Test risk score endpoint:**
```bash
TOKEN="<token-from-above>"
curl -H "Authorization: Bearer $TOKEN" https://api.offolab.com/risk-score/biz_healthy
```

### 5. Monitor Logs

**Railway:**
```bash
railway logs
```

**Render:**
- View in Render Dashboard → Logs tab

**Heroku:**
```bash
heroku logs --tail
```

**Cloud Run:**
```bash
gcloud run logs tail offo-risk-api
```

## Security Checklist

- [ ] `SECRET_KEY` environment variable set (not using default)
- [ ] `CORS_ORIGINS` restricted to production domains only
- [ ] HTTPS enabled (SSL certificate active)
- [ ] API endpoints require authentication (JWT tokens)
- [ ] No sensitive data in logs
- [ ] Rate limiting configured (future enhancement)

## Performance Optimization

### Enable Caching

Consider adding Redis for caching (future enhancement):

```python
# Example with Redis
import redis
from functools import wraps

redis_client = redis.from_url(os.getenv("REDIS_URL"))

def cache_response(ttl=300):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{args}:{kwargs}"
            cached = redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
            result = await func(*args, **kwargs)
            redis_client.setex(cache_key, ttl, json.dumps(result))
            return result
        return wrapper
    return decorator
```

### Database Connection Pooling

When replacing dummy data with real database:

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine(
    os.getenv("DATABASE_URL"),
    pool_size=20,
    max_overflow=40,
    pool_pre_ping=True
)

async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)
```

## Troubleshooting

### Issue: CORS errors in browser
**Solution:** Verify `CORS_ORIGINS` environment variable includes your frontend domain

### Issue: 401 Unauthorized errors
**Solution:** Ensure JWT token is being sent in Authorization header: `Bearer <token>`

### Issue: Slow response times
**Solution:**
1. Check server region (should be close to users)
2. Implement caching (Redis)
3. Add database connection pooling
4. Monitor with APM tool (e.g., New Relic, DataDog)

### Issue: Container crashes
**Solution:**
1. Check logs for errors
2. Verify all dependencies in requirements.txt
3. Test Docker image locally first
4. Ensure sufficient memory allocation

## Monitoring & Alerts

### Recommended Tools

1. **Uptime Monitoring:**
   - UptimeRobot (free): https://uptimerobot.com
   - Pingdom
   - Better Uptime

2. **Error Tracking:**
   - Sentry (free tier): https://sentry.io
   - Rollbar
   - Bugsnag

3. **Performance Monitoring:**
   - New Relic
   - DataDog
   - Google Cloud Monitoring (if using GCP)

### Setup Sentry (Example)

```bash
pip install sentry-sdk[fastapi]
```

```python
# Add to main.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    integrations=[FastApiIntegration()],
    traces_sample_rate=0.1,
)
```

## Scaling Considerations

### Horizontal Scaling

Most platforms support automatic scaling:

**Railway:**
- Auto-scales based on traffic
- Configure in `railway.json`

**Render:**
- Upgrade to paid plan for auto-scaling
- Configure in dashboard

**Cloud Run:**
- Auto-scales by default (0 to N instances)
- Configure min/max instances

### Database Scaling

When moving to production database:

1. **Use connection pooling** (see above)
2. **Add read replicas** for read-heavy workloads
3. **Implement caching layer** (Redis/Memcached)
4. **Use database indexes** on frequently queried fields

## Cost Estimates

| Platform    | Free Tier | Paid (Starter) | Notes |
|-------------|-----------|----------------|-------|
| Railway     | $5 free credit/month | ~$5-10/month | Best value |
| Render      | 750 hours/month | $7/month | Spins down on inactivity (free tier) |
| Heroku      | None | $7/month | Reliable, no free tier |
| Cloud Run   | 2M requests/month free | Pay per use | Best for variable traffic |

## Next Steps

1. Choose deployment platform (Railway recommended)
2. Deploy backend following steps above
3. Update frontend environment variables with API URL
4. Test end-to-end integration
5. Set up monitoring and alerts
6. Configure custom domain (optional)
7. Plan for database migration (replace dummy data)

## Support

For deployment issues:
- Railway: https://railway.app/discord
- Render: https://render.com/docs
- Heroku: https://help.heroku.com
- Cloud Run: https://cloud.google.com/run/docs
