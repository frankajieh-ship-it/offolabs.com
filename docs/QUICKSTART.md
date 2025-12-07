# OFFO Risk Score - Quick Start Guide

Get the OFFO Risk Score MVP running in under 5 minutes.

## Prerequisites

- Python 3.9+ installed
- Node.js 18+ and npm installed
- Git (optional)

## Setup in 3 Steps

### Step 1: Backend Setup (2 minutes)

Open a terminal and run:

```bash
# Navigate to backend
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# OR on Mac/Linux:
# python3 -m venv venv
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
python main.py
```

**Verify:** Open http://localhost:8000/docs in your browser. You should see the API documentation.

**Test API:**
```bash
curl http://localhost:8000/risk-score/biz_healthy
```

### Step 2: Frontend Setup (2 minutes)

Open a NEW terminal (keep backend running) and run:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment config
cp .env.local.example .env.local

# Start development server
npm run dev
```

**Verify:** Open http://localhost:3000 in your browser. You should see the Risk Dashboard.

### Step 3: Test It Out

1. **Select a business** from the dropdown:
   - Business A - Excellent (should show LOW risk, ~98 score)
   - Business D - Risky (should show HIGH risk, ~40 score)

2. **View the dashboard:**
   - Overall risk score and category
   - Component breakdown (Task, Training, Documentation)
   - Visual charts
   - Risk interpretation

3. **Export a PDF:**
   - Click "Export PDF" button
   - PDF should download with full report

## What You Should See

### Healthy Business (biz_healthy)
- **Score:** ~91
- **Category:** LOW RISK (green)
- **Components:**
  - Task Adherence: ~95
  - Training: ~92
  - Documentation: ~86

### Risky Business (biz_risky)
- **Score:** ~42
- **Category:** HIGH RISK (red)
- **Components:**
  - Task Adherence: ~55
  - Training: ~40
  - Documentation: ~25

## API Endpoints

Once running, test these endpoints:

### Get Risk Score
```bash
curl http://localhost:8000/risk-score/biz_healthy
```

### List All Businesses
```bash
curl http://localhost:8000/businesses
```

### Get Raw Metrics (Debug)
```bash
curl http://localhost:8000/risk-score/biz_healthy/raw
```

### Interactive API Docs
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Available Test Businesses

| Business ID | Expected Score | Risk Category | Description |
|------------|---------------|---------------|-------------|
| biz_excellent | ~98 | LOW | Near-perfect compliance |
| biz_healthy | ~91 | LOW | Good compliance |
| biz_mixed | ~68 | MODERATE | Average compliance |
| biz_risky | ~42 | HIGH | Poor compliance |
| biz_critical | ~28 | HIGH | Critical issues |

## Running Tests

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

Expected: All tests should pass ✅

### With Coverage Report
```bash
pytest tests/ -v --cov=. --cov-report=html
open htmlcov/index.html  # View coverage report
```

## Troubleshooting

### Backend won't start

**Error:** `Port 8000 already in use`
- **Solution:** Kill process on port 8000 or change port:
  ```bash
  # Windows
  netstat -ano | findstr :8000
  taskkill /PID <pid> /F

  # Mac/Linux
  lsof -ti:8000 | xargs kill -9
  ```

**Error:** `Module not found`
- **Solution:** Ensure virtual environment is activated and dependencies installed:
  ```bash
  pip install -r requirements.txt
  ```

### Frontend won't start

**Error:** `npm command not found`
- **Solution:** Install Node.js from https://nodejs.org/

**Error:** `ECONNREFUSED` when fetching data
- **Solution:** Ensure backend is running on port 8000:
  ```bash
  curl http://localhost:8000/
  ```

**Error:** Dependencies won't install
- **Solution:** Clear npm cache and retry:
  ```bash
  npm cache clean --force
  npm install
  ```

### Charts not displaying

**Solution:** Check browser console for errors. Ensure:
- Recharts installed: `npm install recharts`
- No CORS errors (backend CORS should be configured)

### PDF export not working

**Solution:** Ensure jsPDF is installed:
```bash
cd frontend
npm install jspdf
```

## Next Steps

Now that everything is running:

1. **Explore the code:**
   - Backend: `backend/scoring_algorithm.py` - Core scoring logic
   - Frontend: `frontend/components/RiskDashboard.tsx` - Main UI

2. **Run tests:**
   - Backend: `pytest tests/ -v`
   - See test coverage and scenarios

3. **Modify scoring weights:**
   - Edit `backend/scoring_algorithm.py`
   - Adjust `TASK_WEIGHT`, `TRAINING_WEIGHT`, `DOC_WEIGHT`

4. **Add new test data:**
   - Edit `backend/data_layer.py`
   - Add new businesses to `dummy_data` dict

5. **Read full documentation:**
   - Main README: `../README.md`
   - Backend docs: `backend/README.md`
   - Sprint tickets: `docs/SPRINT_TICKETS.md`

## Quick Commands Reference

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python main.py
pytest tests/ -v

# Frontend
cd frontend
npm install
npm run dev
npm run build

# Both
# Terminal 1: cd backend && python main.py
# Terminal 2: cd frontend && npm run dev
```

## What's Next?

The MVP is running! To productionize:

1. Replace dummy data with real Compliance AI database
2. Add authentication (JWT/OAuth)
3. Deploy to production (Vercel + Heroku/Railway)
4. Add monitoring and logging
5. Implement caching (Redis)

See `README.md` for full production roadmap.

---

**Need Help?** Check the main README.md or open an issue.
