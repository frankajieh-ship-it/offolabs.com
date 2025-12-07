# OFFO Risk Score™ MVP

A comprehensive Risk Intelligence scoring system that transforms Compliance AI behavioral data into actionable risk scores.

## Overview

The OFFO Risk Score system evaluates businesses on a 0-100 scale across three key compliance dimensions:
- **Task Adherence** (40% weight)
- **Training Completion** (30% weight)
- **Documentation Accuracy** (30% weight)

### Risk Categories

- **80-100**: LOW Risk - Excellent compliance
- **50-79**: MODERATE Risk - Some gaps requiring attention
- **0-49**: HIGH Risk - Immediate action required

## Project Structure

```
offo-risk-score-mvp/
├── backend/                    # Python FastAPI backend
│   ├── main.py                # FastAPI application & endpoints
│   ├── scoring_algorithm.py   # Core scoring logic
│   ├── data_layer.py          # Data access (currently dummy data)
│   ├── requirements.txt       # Python dependencies
│   └── tests/                 # Pytest test suite
│       ├── test_scoring_algorithm.py
│       └── test_api.py
├── frontend/                  # Next.js/React frontend
│   ├── app/                   # Next.js app directory
│   ├── components/            # React components
│   │   └── RiskDashboard.tsx # Main dashboard component
│   ├── package.json
│   └── tsconfig.json
└── docs/                      # Additional documentation
```

## Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the API server:**
   ```bash
   python main.py
   ```

   API will be available at `http://localhost:8000`

5. **Run tests:**
   ```bash
   pytest tests/ -v
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

   Dashboard will be available at `http://localhost:3000`

## API Endpoints

### GET /risk-score/{business_id}

Get the OFFO Risk Score for a specific business.

**Example Request:**
```bash
curl http://localhost:8000/risk-score/biz_healthy
```

**Example Response:**
```json
{
  "business_id": "biz_healthy",
  "overall_score": 91.5,
  "category": "LOW",
  "components": {
    "task_adherence_score": 95.0,
    "training_score": 92.0,
    "documentation_score": 86.0
  },
  "weights": {
    "task_adherence": 0.4,
    "training_completion": 0.3,
    "documentation_accuracy": 0.3
  }
}
```

### GET /businesses

List all available business IDs.

### GET /risk-score/{business_id}/raw

Get raw normalized metrics for debugging (values between 0-1).

## Dummy Data

For MVP demonstration, the system includes 5 sample businesses:

- `biz_excellent` - Near-perfect compliance (score ~98)
- `biz_healthy` - Good compliance (score ~85-90)
- `biz_mixed` - Average compliance (score ~65-70)
- `biz_risky` - Poor compliance (score ~40-45)
- `biz_critical` - Very poor compliance (score ~25-30)

## Scoring Algorithm

### Input Metrics

All input metrics must be normalized to [0, 1]:

- `task_completion_rate` - Proportion of tasks completed (1 = all completed)
- `overdue_task_rate` - Proportion of tasks overdue (1 = all overdue)
- `training_completion_rate` - Proportion of training completed (1 = all completed)
- `doc_error_rate` - Proportion of documentation with errors (1 = all have errors)
- `doc_missing_field_rate` - Proportion of docs with missing fields (1 = all missing)

### Calculation Steps

1. **Task Adherence Score** = 50% × completion_rate + 50% × (1 - overdue_rate)
2. **Training Score** = training_completion_rate × 100
3. **Documentation Score** = (1 - 0.5×error_rate - 0.5×missing_rate) × 100
4. **Overall Score** = 40% × Task + 30% × Training + 30% × Documentation

## Frontend Features

- **Real-time Risk Dashboard** - Visual display of risk scores
- **Interactive Charts** - Component breakdown visualization using Recharts
- **PDF Export** - One-click export of risk reports using jsPDF
- **Business Selector** - Switch between different businesses
- **Risk Interpretation** - Contextual recommendations based on risk level

## Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v --cov=.
```

Test coverage includes:
- Component score calculations
- Risk categorization boundaries
- Edge cases and boundary conditions
- API endpoint responses
- Error handling

### Test Scenarios Covered

- High compliance → LOW risk (80-100)
- Medium compliance → MODERATE risk (50-79)
- Low compliance → HIGH risk (0-49)
- Perfect scores (100)
- Worst scores (0)
- Boundary conditions (exactly 50, exactly 80)

## Next Steps for Production

### Backend

1. **Database Integration**
   - Replace `data_layer.py` dummy data with real Compliance AI DB queries
   - Add database connection pooling
   - Implement caching layer (Redis)

2. **Authentication & Authorization**
   - Add JWT/OAuth authentication
   - Implement role-based access control
   - Secure API endpoints

3. **Performance**
   - Add request rate limiting
   - Implement async database queries
   - Add API response caching

4. **Monitoring**
   - Add logging (structured logging)
   - Implement error tracking (Sentry)
   - Add performance monitoring (APM)

### Frontend

1. **Features**
   - Historical trend analysis
   - Drill-down into component details
   - Comparative analysis across businesses
   - Alert thresholds and notifications

2. **UX Improvements**
   - Loading states and skeletons
   - Error boundaries
   - Responsive mobile design
   - Accessibility improvements (WCAG 2.1)

3. **Production Build**
   - Environment-specific configs
   - Build optimization
   - CDN deployment
   - Analytics integration

## 72-Hour MVP Sprint Plan

### Day 1 (Backend)
- [x] Design scoring algorithm
- [x] Implement scoring_algorithm.py
- [x] Create data_layer.py with dummy data
- [x] Build FastAPI endpoints
- [x] Write comprehensive tests
- [x] Test API with curl/Postman

### Day 2 (Frontend Foundation)
- [x] Set up Next.js project
- [x] Create RiskDashboard component
- [x] Implement API integration
- [x] Add basic styling with Tailwind
- [x] Create business selector

### Day 3 (Polish & Deploy)
- [x] Add data visualization (charts)
- [x] Implement PDF export
- [x] Add risk interpretation logic
- [x] Documentation
- [ ] Deploy backend (Heroku/Railway/AWS)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] End-to-end testing

## Definition of Done

### Backend
- [x] Scoring algorithm implemented and tested
- [x] API endpoints functional
- [x] 90%+ test coverage
- [x] API documentation
- [x] Dummy data provides realistic scenarios

### Frontend
- [x] Dashboard displays all risk metrics
- [x] Charts visualize component breakdown
- [x] PDF export working
- [x] Responsive design
- [x] Error handling implemented

### Documentation
- [x] README with setup instructions
- [x] API documentation
- [x] Code comments and docstrings
- [x] Test documentation

## Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation
- **Pytest** - Testing framework
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **jsPDF** - PDF generation

## License

Proprietary - OFFO Risk Score™

## Contact

For questions or support, contact the development team.
