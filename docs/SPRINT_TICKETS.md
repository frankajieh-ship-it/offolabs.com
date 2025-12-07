# OFFO Risk Score MVP - Sprint Tickets

72-hour sprint to build and deploy the OFFO Risk Intelligence Dashboard.

---

## EPIC: OFFO Risk Score MVP
**Goal:** Launch a functional risk scoring system that transforms compliance data into actionable risk scores with a visual dashboard.

**Timeline:** 72 hours (3 days)
**Team:** 2-3 developers (1 backend, 1 frontend, 1 full-stack)

---

## Day 1: Backend Foundation

### Ticket #1: Design & Implement Scoring Algorithm
**Priority:** P0 - Critical
**Story Points:** 5
**Assignee:** Backend Dev

**Description:**
Create the core scoring algorithm that transforms compliance metrics into a 0-100 risk score.

**Acceptance Criteria:**
- [ ] `scoring_algorithm.py` implemented with all component score functions
- [ ] Supports three components: Task Adherence (40%), Training (30%), Documentation (30%)
- [ ] Risk categorization logic: LOW (80-100), MODERATE (50-79), HIGH (0-49)
- [ ] All functions have comprehensive docstrings
- [ ] Pure, deterministic functions with no side effects
- [ ] Input metrics validated to be in [0, 1] range

**Technical Notes:**
- Use dataclasses for BusinessMetrics
- Implement `clamp_0_100()` utility for bounds checking
- Round all scores to 1 decimal place

**Dependencies:** None

**Definition of Done:**
- Code complete and documented
- Peer reviewed
- Ready for testing

---

### Ticket #2: Create Data Access Layer
**Priority:** P0 - Critical
**Story Points:** 3
**Assignee:** Backend Dev

**Description:**
Build data layer with dummy data for MVP demonstration.

**Acceptance Criteria:**
- [ ] `data_layer.py` created with `get_business_metrics()` function
- [ ] Returns normalized metrics in [0, 1] range
- [ ] Includes 5 sample businesses (excellent, healthy, mixed, risky, critical)
- [ ] Function returns None for non-existent business IDs
- [ ] `get_all_business_ids()` implemented
- [ ] TODOs added for future DB integration

**Test Data Required:**
- biz_excellent: ~98 score
- biz_healthy: ~85-90 score
- biz_mixed: ~65-70 score
- biz_risky: ~40-45 score
- biz_critical: ~25-30 score

**Dependencies:** None

---

### Ticket #3: Build FastAPI REST API
**Priority:** P0 - Critical
**Story Points:** 5
**Assignee:** Backend Dev

**Description:**
Create FastAPI application with endpoints for risk score retrieval.

**Acceptance Criteria:**
- [ ] `main.py` with FastAPI app initialized
- [ ] GET `/` - Health check endpoint
- [ ] GET `/risk-score/{business_id}` - Returns risk score with all components
- [ ] GET `/businesses` - Lists all available business IDs
- [ ] GET `/risk-score/{business_id}/raw` - Debug endpoint for raw metrics
- [ ] CORS middleware configured for frontend access
- [ ] Pydantic models for request/response validation
- [ ] Proper error handling (404 for not found)
- [ ] API runs on port 8000

**API Response Format:**
```json
{
  "business_id": "string",
  "overall_score": 0-100,
  "category": "LOW|MODERATE|HIGH",
  "components": {...},
  "weights": {...}
}
```

**Dependencies:** Ticket #1, #2

---

### Ticket #4: Write Backend Tests
**Priority:** P0 - Critical
**Story Points:** 5
**Assignee:** Backend Dev

**Description:**
Create comprehensive test suite for scoring algorithm and API endpoints.

**Acceptance Criteria:**
- [ ] `test_scoring_algorithm.py` with unit tests for:
  - Component score calculations
  - Risk categorization
  - Edge cases (0, 100, boundaries)
  - Weights sum to 1.0
- [ ] `test_api.py` with integration tests for:
  - All endpoints
  - Error handling (404s)
  - Response format validation
- [ ] Pytest configuration files
- [ ] 90%+ code coverage achieved
- [ ] All tests passing
- [ ] Tests include scenarios:
  - High compliance → LOW risk
  - Medium compliance → MODERATE risk
  - Low compliance → HIGH risk

**Dependencies:** Ticket #1, #2, #3

---

### Ticket #5: Backend Documentation
**Priority:** P1 - High
**Story Points:** 2
**Assignee:** Backend Dev

**Description:**
Document backend setup, API usage, and scoring algorithm.

**Acceptance Criteria:**
- [ ] `backend/README.md` created with:
  - Setup instructions
  - API documentation
  - Input/output formats
  - Testing guide
- [ ] All functions have docstrings
- [ ] Code comments for complex logic
- [ ] Examples of API requests/responses

**Dependencies:** Ticket #1, #2, #3

---

## Day 2: Frontend Foundation

### Ticket #6: Initialize Next.js Project
**Priority:** P0 - Critical
**Story Points:** 3
**Assignee:** Frontend Dev

**Description:**
Set up Next.js 14 project with TypeScript and Tailwind CSS.

**Acceptance Criteria:**
- [ ] Next.js 14 project initialized in `frontend/`
- [ ] TypeScript configured
- [ ] Tailwind CSS installed and configured
- [ ] Project structure created (app/, components/, public/)
- [ ] `package.json` with all dependencies
- [ ] `tsconfig.json` configured
- [ ] Environment variable setup (`.env.local.example`)
- [ ] Dev server runs on port 3000

**Dependencies:** None

---

### Ticket #7: Create Risk Dashboard Component
**Priority:** P0 - Critical
**Story Points:** 8
**Assignee:** Frontend Dev

**Description:**
Build main RiskDashboard component that displays risk scores and metrics.

**Acceptance Criteria:**
- [ ] `RiskDashboard.tsx` component created
- [ ] Fetches data from API `/risk-score/{business_id}`
- [ ] Displays overall risk score (0-100)
- [ ] Shows risk category with color coding:
  - LOW: Green
  - MODERATE: Yellow
  - HIGH: Red
- [ ] Component breakdown cards for all three metrics
- [ ] Loading state while fetching data
- [ ] Error handling with retry button
- [ ] Responsive design (mobile + desktop)
- [ ] TypeScript interfaces for API data

**Design Requirements:**
- Clean, professional UI
- Clear visual hierarchy
- Accessible color contrasts
- Smooth loading transitions

**Dependencies:** Ticket #6

---

### Ticket #8: Add Data Visualization
**Priority:** P1 - High
**Story Points:** 5
**Assignee:** Frontend Dev

**Description:**
Implement charts to visualize risk score components using Recharts.

**Acceptance Criteria:**
- [ ] Recharts library installed
- [ ] Bar chart showing component scores (Task, Training, Documentation)
- [ ] Color-coded bars based on score ranges (green/yellow/red)
- [ ] Chart displays component weights
- [ ] Responsive chart sizing
- [ ] Tooltip shows detailed information on hover
- [ ] Chart legend included

**Dependencies:** Ticket #7

---

### Ticket #9: Implement Business Selector
**Priority:** P1 - High
**Story Points:** 3
**Assignee:** Frontend Dev

**Description:**
Add dropdown selector to switch between different businesses.

**Acceptance Criteria:**
- [ ] Dropdown component in main page
- [ ] Lists all 5 sample businesses with friendly names
- [ ] Updates dashboard when selection changes
- [ ] Persists selection in component state
- [ ] Styled consistently with overall design

**Business Options:**
- Business A - Excellent
- Business B - Healthy
- Business C - Mixed
- Business D - Risky
- Business E - Critical

**Dependencies:** Ticket #7

---

## Day 3: Polish & Features

### Ticket #10: Add PDF Export Functionality
**Priority:** P1 - High
**Story Points:** 5
**Assignee:** Frontend Dev

**Description:**
Implement PDF export feature for risk reports using jsPDF.

**Acceptance Criteria:**
- [ ] jsPDF library installed
- [ ] "Export PDF" button in dashboard
- [ ] PDF includes:
  - Business ID
  - Overall risk score and category
  - Component breakdown with weights
  - Risk interpretation and recommendations
  - Generated date
- [ ] PDF filename: `offo-risk-report-{businessId}-{timestamp}.pdf`
- [ ] PDF is well-formatted and professional
- [ ] Button has loading state during generation

**Dependencies:** Ticket #7

---

### Ticket #11: Add Risk Interpretation Section
**Priority:** P1 - High
**Story Points:** 3
**Assignee:** Frontend/Full-stack Dev

**Description:**
Create section with contextual recommendations based on risk level.

**Acceptance Criteria:**
- [ ] Risk interpretation card added to dashboard
- [ ] Different content for LOW/MODERATE/HIGH risk
- [ ] LOW risk:
  - Positive reinforcement
  - Continue best practices
- [ ] MODERATE risk:
  - Specific areas to address
  - Monitoring recommendations
- [ ] HIGH risk:
  - Urgent action items
  - Escalation procedures
- [ ] Content is clear and actionable

**Dependencies:** Ticket #7

---

### Ticket #12: End-to-End Testing
**Priority:** P0 - Critical
**Story Points:** 3
**Assignee:** Full-stack Dev / QA

**Description:**
Test complete user flow from frontend to backend.

**Acceptance Criteria:**
- [ ] Backend API running and accessible
- [ ] Frontend connects to backend successfully
- [ ] All 5 sample businesses load correctly
- [ ] Risk scores calculate accurately
- [ ] Charts render properly
- [ ] PDF export works for all businesses
- [ ] Error states work (invalid business ID)
- [ ] Mobile responsive design verified
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

**Test Scenarios:**
1. Load healthy business → verify LOW risk
2. Load risky business → verify HIGH risk
3. Switch between businesses → verify updates
4. Export PDF → verify content
5. Test with invalid business ID → verify 404 handling

**Dependencies:** All previous tickets

---

### Ticket #13: Create Project Documentation
**Priority:** P1 - High
**Story Points:** 3
**Assignee:** Technical Writer / Dev Lead

**Description:**
Write comprehensive project documentation for setup and deployment.

**Acceptance Criteria:**
- [ ] Root `README.md` with:
  - Project overview
  - Architecture diagram
  - Quick start guide
  - API documentation
  - Frontend features
  - Testing instructions
  - Next steps for production
- [ ] `docs/SPRINT_TICKETS.md` (this file)
- [ ] Backend-specific README
- [ ] Frontend setup instructions
- [ ] Definition of Done checklist

**Dependencies:** Ticket #5

---

### Ticket #14: Deploy Backend (Optional - if time permits)
**Priority:** P2 - Medium
**Story Points:** 5
**Assignee:** DevOps / Backend Dev

**Description:**
Deploy backend API to production environment.

**Acceptance Criteria:**
- [ ] Backend deployed to Heroku/Railway/AWS
- [ ] Public URL available
- [ ] CORS configured for production frontend
- [ ] Environment variables set
- [ ] Health check endpoint accessible
- [ ] Production URL documented

**Deployment Options:**
- Heroku (easy, free tier)
- Railway (modern, generous free tier)
- AWS EC2/Lambda (production-grade)

**Dependencies:** Ticket #3, #4

---

### Ticket #15: Deploy Frontend (Optional - if time permits)
**Priority:** P2 - Medium
**Story Points:** 3
**Assignee:** DevOps / Frontend Dev

**Description:**
Deploy frontend dashboard to production.

**Acceptance Criteria:**
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Environment variable set for production API URL
- [ ] Public URL available
- [ ] Build optimized for production
- [ ] Analytics configured (optional)
- [ ] Production URL documented

**Deployment Options:**
- Vercel (recommended for Next.js)
- Netlify (easy deployment)

**Dependencies:** Ticket #6, #7, #14

---

## Definition of Done (Sprint)

### Backend ✅
- [x] Scoring algorithm implemented and tested
- [x] API endpoints functional and documented
- [x] 90%+ test coverage achieved
- [x] Dummy data provides realistic scenarios
- [x] Code peer reviewed

### Frontend ✅
- [x] Dashboard displays all risk metrics
- [x] Charts visualize component breakdown
- [x] PDF export functional
- [x] Responsive design implemented
- [x] Error handling in place

### Documentation ✅
- [x] README with setup instructions
- [x] API documentation complete
- [x] Code comments and docstrings
- [x] Sprint tickets documented

### Optional (Time Permitting)
- [ ] Backend deployed to production
- [ ] Frontend deployed to production
- [ ] End-to-end monitoring configured
- [ ] Analytics tracking added

---

## Sprint Metrics

**Total Story Points:** 61
**Critical Path:** Tickets #1 → #2 → #3 → #6 → #7
**Team Capacity:** 60-75 points over 72 hours

**Velocity Assumptions:**
- Backend dev: 20-25 points/day
- Frontend dev: 20-25 points/day
- Full-stack dev can support either track

**Risk Mitigation:**
- Tickets #14 and #15 (deployment) are optional
- Core MVP (tickets #1-#13) fits within 72 hours
- Parallel backend/frontend development maximizes throughput
