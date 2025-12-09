# Deploy OFFO Risk Dashboard to Production - QUICK GUIDE

**Status**: ✅ Code pushed to GitHub
**Repository**: https://github.com/frankajieh-ship-it/offolabs.com
**Latest Commit**: Add updated OFFO logo for dashboard (Dec 9, 2025)

---

## 🚀 Quick Deploy Options

You have **2 deployment options**. Choose ONE:

### ✅ Option 1: Vercel (RECOMMENDED - Fastest & Best for Next.js)

**Why Vercel**:
- Built by Next.js creators
- Zero-config deployment
- Free tier perfect for your needs
- Automatic deployments on git push
- Best performance for Next.js apps

#### Steps:

1. **Login to Vercel**:
   ```bash
   cd C:\Dev\offo-risk-score-mvp\frontend
   npx vercel login
   ```
   - Opens browser for authentication
   - Use GitHub, GitLab, or email to sign in

2. **Deploy to Production**:
   ```bash
   npx vercel --prod
   ```
   - Follow the prompts:
     - Set up and deploy: **Yes**
     - Which scope: Choose your account
     - Link to existing project: **No** (first time) or **Yes** (if exists)
     - Project name: `offo-risk-dashboard` (or your choice)
     - Directory: `./` (current directory is frontend)
     - Override settings: **No**

3. **Get Your Live URL**:
   - Vercel will give you a production URL like:
     ```
     https://offo-risk-dashboard.vercel.app
     ```
   - OR your custom domain if configured

4. **Done!** 🎉
   - Your dashboard is now live
   - Auto-deploys on every git push to master
   - View deployment logs at https://vercel.com/dashboard

---

### ✅ Option 2: Netlify (Alternative - Already Configured)

**Why Netlify**:
- You already have `netlify.toml` configured
- Also free tier
- Good for static sites

#### Steps:

1. **Go to Netlify Dashboard**:
   - Visit: https://app.netlify.com
   - Sign in with GitHub

2. **Import from Git**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select repository: `frankajieh-ship-it/offolabs.com`
   - Branch: `master`

3. **Configure Build Settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next` or `frontend/out`
   - Netlify should auto-detect from `netlify.toml` in root

4. **Add Environment Variables** (if backend needed):
   - Go to: Site settings → Environment variables
   - Add:
     - **Key**: `NEXT_PUBLIC_API_URL`
     - **Value**: Your backend URL (if deployed)

5. **Deploy**:
   - Click "Deploy site"
   - Wait ~2-3 minutes for build

6. **Get Your Live URL**:
   - You'll get a URL like:
     ```
     https://offo-risk-dashboard.netlify.app
     ```
   - Can customize subdomain in settings

---

## 🔥 FASTEST Option: Vercel GitHub Integration

**If you want automatic deployments on every push**:

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `frankajieh-ship-it/offolabs.com`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Click "Deploy"
6. Done! Every future git push will auto-deploy

---

## 📊 Current Project Status

### ✅ Completed:
- [x] Frontend updated on localhost:3000
- [x] Logo added (`Logo/ChatGPT Image Dec 7, 2025, 09_41_30 AM.png`)
- [x] Changes committed to git
- [x] Pushed to GitHub (master branch)
- [x] Repository: https://github.com/frankajieh-ship-it/offolabs.com

### ⏳ Pending:
- [ ] Deploy frontend to production (Vercel or Netlify)
- [ ] Deploy backend to Render.com (if API needed)
- [ ] Verify live deployment

---

## 🎯 Recommended Deployment Path

**For quickest results**:

1. **NOW**: Deploy to Vercel via GitHub (no CLI needed)
   - Go to https://vercel.com/new
   - Import repository
   - Select `frontend` directory
   - Deploy (2 minutes)

2. **LATER** (if you need backend API):
   - Deploy Python backend to Render.com
   - Add `NEXT_PUBLIC_API_URL` to Vercel environment variables
   - Redeploy frontend

---

## 🔍 Current App Status

**What's on localhost:3000**:
- OFFO Risk Intelligence Dashboard
- Business risk assessment tool
- Demo mode with sample businesses
- PDF export functionality
- Enterprise dashboard link

**Live URL** (after deployment):
- Will be available at Vercel or Netlify URL
- You can add custom domain later

---

## ⚡ Quick Command Reference

### Vercel Deployment:
```bash
# From C:\Dev\offo-risk-score-mvp\frontend

# Login (first time only)
npx vercel login

# Deploy to production
npx vercel --prod

# Check deployment status
npx vercel ls

# View logs
npx vercel logs
```

### Git Commands (if you make more changes):
```bash
# From C:\Dev\offo-risk-score-mvp

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub (triggers auto-deploy if connected)
git push origin master
```

---

## 🎬 Next Steps After Deployment

1. **Test Live Site**:
   - Visit your deployed URL
   - Click through all business cards
   - Test PDF export
   - Check enterprise dashboard link

2. **Update Main OFFO Website**:
   - Update link in `C:\Dev\OFFO_ai_simple\index.html`
   - Point to your new production URL

3. **Share**:
   - Your live dashboard will be ready to share!

---

## 📞 Need Help?

**Deployment Issues**:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com

**Build Errors**:
- Check build logs in Vercel/Netlify dashboard
- Ensure `package.json` is in `frontend/` directory
- Verify Next.js version compatibility

---

**Created**: December 9, 2025
**Repository**: https://github.com/frankajieh-ship-it/offolabs.com
**Next**: Choose deployment option above and deploy! 🚀

---

## 🎯 TLDR - Deploy in 2 Minutes

**Absolute fastest method**:

1. Go to: https://vercel.com/new
2. Click "Import" → Select your GitHub repo
3. Root Directory: `frontend`
4. Click "Deploy"
5. Get your live URL
6. Done! ✅

**That's it. Vercel handles everything else automatically.**