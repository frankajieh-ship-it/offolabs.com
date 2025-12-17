# OFFO Launch Platform - Quick Start Guide

Get the OFFO Launch Platform running in 5 minutes!

## Prerequisites

- Node.js 18 or higher ([Download](https://nodejs.org/))
- MongoDB (see options below)
- Git (optional, for cloning)

## Step 1: Choose Your MongoDB Setup

You have 3 options. Pick one:

### Option A: MongoDB Atlas (Recommended - Easiest)

**Free cloud database, no installation needed**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free account
3. Create a free cluster (M0)
4. Create database user (save username/password!)
5. Allow network access from anywhere (0.0.0.0/0)
6. Get your connection string

**Full guide:** See [MONGODB_SETUP.md](server/MONGODB_SETUP.md)

### Option B: Docker (Fastest Local Setup)

```bash
docker run -d --name mongodb-offo -p 27017:27017 -v mongodb-data:/data/db mongo:latest
```

### Option C: Local Installation

**Windows:** Download from [MongoDB.com](https://www.mongodb.com/try/download/community)
**macOS:** `brew install mongodb-community`
**Linux:** See [MONGODB_SETUP.md](server/MONGODB_SETUP.md)

## Step 2: Backend Setup

```bash
# Navigate to server directory
cd C:/Dev/offo-risk-score-mvp/server

# Install dependencies (if not done already)
npm install

# Create .env file from example
cp .env.example .env
```

**Edit `.env` file:**

**For MongoDB Atlas:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/offo-launch?retryWrites=true&w=majority
CLIENT_URL=http://localhost:3000
JWT_SECRET=offo_launch_secret_change_in_production
```

**For Local MongoDB:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/offo-launch
CLIENT_URL=http://localhost:3000
JWT_SECRET=offo_launch_secret_change_in_production
```

**Start the backend:**
```bash
npm run dev
```

**Look for:**
```
📊 MongoDB connected: ✅
🚀 Server running on port 5000
```

## Step 3: Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd C:/Dev/offo-risk-score-mvp/frontend

# Install dependencies (if not done already)
npm install

# Create .env.local file
cp .env.local.example .env.local
```

**Edit `.env.local` file:**

```env
# Connect to backend
NEXT_PUBLIC_API_URL=http://localhost:5000

# Use real backend (not demo mode)
NEXT_PUBLIC_DEMO_MODE=false
```

**Start the frontend:**
```bash
npm run dev
```

**Open browser:**
```
http://localhost:3000
```

## Step 4: Verify Everything Works

### Backend Health Check

Open in browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-16T...",
  "version": "1.0.0"
}
```

### Frontend Check

1. Open `http://localhost:3000`
2. You should see the OFFO platform
3. Navigate to `/launch` to see the Launch dashboard

## Alternative: Demo Mode (No Backend Required)

Want to test the frontend without setting up MongoDB?

**Edit `frontend/.env.local`:**
```env
NEXT_PUBLIC_DEMO_MODE=true
# Remove or comment out NEXT_PUBLIC_API_URL
```

**Start frontend only:**
```bash
cd frontend
npm run dev
```

**Features in Demo Mode:**
- All data stored in browser localStorage
- Pre-populated with sample "Ember & Oak Restaurant" project
- Perfect for UI testing and demonstrations
- No backend or database needed

## Troubleshooting

### MongoDB Connection Failed

```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Solutions:**
1. **MongoDB not running:** Start MongoDB service
2. **Wrong connection string:** Check `.env` MONGODB_URI
3. **Using Atlas:** Verify network access allows your IP
4. **Port conflict:** Ensure port 27017 is available

**Quick fix:** Use Demo Mode instead (see above)

### Backend Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:** Kill the process using port 5000
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or change the port in `server/.env`:
```env
PORT=5001
```

And update `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### Frontend Port Already in Use

```
Error: Port 3000 is already in use
```

**Solution:** Next.js will automatically suggest port 3001
Press `y` to accept, or manually specify:
```bash
npm run dev -- -p 3001
```

### CORS Errors

```
Access-Control-Allow-Origin error
```

**Solution:** Ensure backend `.env` has:
```env
CLIENT_URL=http://localhost:3000
```

And restart the backend server.

## What's Running

After successful setup:

| Service | URL | Description |
|---------|-----|-------------|
| **Backend API** | http://localhost:5000 | Express server with MongoDB |
| **Frontend** | http://localhost:3000 | Next.js React application |
| **API Health** | http://localhost:5000/api/health | Health check endpoint |
| **MongoDB** | localhost:27017 | Database (if local) |

## Next Steps

### 1. Create Your First User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response includes JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create a Project

```bash
# Use the token from login response
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "My Restaurant Launch",
    "type": "restaurant",
    "location": {
      "address": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "zipCode": "94102"
    },
    "targetDate": "2026-03-15"
  }'
```

### 4. Explore the Frontend

1. **Dashboard** → `http://localhost:3000/launch`
2. **Create Project** → Click "New Launch Project"
3. **View Project** → Click on a project to see details
4. **Add Permits** → Use "Add Permit" button
5. **Upload Documents** → Navigate to Documents tab

## Development Workflow

### Working on Backend

```bash
cd server
npm run dev
# Server auto-restarts on file changes (nodemon)
```

**Key files:**
- `src/routes/` - API endpoints
- `src/models/` - Database schemas
- `src/services/` - Business logic
- `src/middleware/` - Auth, validation

### Working on Frontend

```bash
cd frontend
npm run dev
# Browser auto-refreshes on file changes (Fast Refresh)
```

**Key files:**
- `src/services/api.ts` - API calls
- `src/contexts/` - React contexts
- `src/components/` - UI components
- `app/` - Pages and routing

### Testing Real-time Features

1. Open two browser windows side-by-side
2. Login with different users
3. Join the same project
4. Make changes in one window
5. See updates appear in the other window

## Documentation

- **Backend API:** [server/README.md](server/README.md)
- **Frontend Guide:** [frontend/LAUNCH_PLATFORM.md](frontend/LAUNCH_PLATFORM.md)
- **MongoDB Setup:** [server/MONGODB_SETUP.md](server/MONGODB_SETUP.md)
- **Implementation Status:** [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)

## Common Commands

### Backend
```bash
cd server
npm run dev          # Start development server
npm start            # Start production server
npm install          # Install dependencies
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm install          # Install dependencies
```

### MongoDB (if using local)
```bash
# Windows
net start MongoDB
net stop MongoDB

# macOS/Linux
brew services start mongodb-community
brew services stop mongodb-community

# Docker
docker start mongodb-offo
docker stop mongodb-offo
```

## Getting Help

**Issue:** Can't connect to MongoDB
**Solution:** See [MONGODB_SETUP.md](server/MONGODB_SETUP.md)

**Issue:** CORS errors between frontend and backend
**Solution:** Check `CLIENT_URL` in backend `.env`

**Issue:** Want to test UI without backend
**Solution:** Set `NEXT_PUBLIC_DEMO_MODE=true` in frontend `.env.local`

**Issue:** Port conflicts
**Solution:** Change ports in `.env` files

**General Help:** support@offolab.com

## Success! 🎉

You now have:
- ✅ Backend API running on port 5000
- ✅ Frontend app running on port 3000
- ✅ MongoDB connected and ready
- ✅ Real-time Socket.IO updates working
- ✅ Authentication system functional

**Start building!** The OFFO Launch Platform is ready for development.
