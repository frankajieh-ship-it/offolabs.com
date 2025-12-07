# OFFO Risk Score - System Architecture

## Overview

The OFFO Risk Score system is a full-stack web application that transforms raw compliance metrics into an actionable 0-100 risk score with visual dashboard and PDF reporting capabilities.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│                    (Next.js 14 + React)                     │
│                                                             │
│  ┌──────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │   Business   │  │  RiskDashboard  │  │ PDF Export   │  │
│  │   Selector   │  │   Component     │  │   (jsPDF)    │  │
│  └──────┬───────┘  └────────┬────────┘  └──────────────┘  │
│         │                   │                              │
│         └───────────────────┼──────────────────────────────┘
│                             │
│                     HTTP/JSON (CORS)
│                             │
├─────────────────────────────┼──────────────────────────────┐
│                             │                              │
│                       ┌─────▼──────┐                       │
│                       │   FastAPI  │                       │
│                       │  REST API  │                       │
│                       └─────┬──────┘                       │
│                             │                              │
│                    Backend (Python)                        │
│                                                            │
│    ┌────────────────────────┼────────────────────────┐    │
│    │                        │                        │    │
│    │                        │                        │    │
│ ┌──▼────────┐    ┌─────────▼────────┐    ┌─────────▼───┐ │
│ │   Data    │    │     Scoring      │    │    Utils    │ │
│ │   Layer   │───▶│    Algorithm     │    │  (Clamping) │ │
│ │ (Dummy)   │    │   (Pure Logic)   │    │             │ │
│ └───────────┘    └──────────────────┘    └─────────────┘ │
│                                                            │
│    [Future: Replace with Compliance AI Database]          │
└────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Frontend Layer

#### Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **PDF:** jsPDF

#### Key Components

**`app/page.tsx`**
- Main entry point
- Business selector dropdown
- Layout and header

**`components/RiskDashboard.tsx`**
- Core dashboard component
- API data fetching
- Risk score display
- Component breakdown cards
- Chart visualization
- PDF export functionality
- Error handling

#### Data Flow (Frontend)

```
User Selects Business
        │
        ▼
Update State (businessId)
        │
        ▼
useEffect Triggered
        │
        ▼
Fetch from API: /risk-score/{businessId}
        │
        ▼
Parse JSON Response
        │
        ▼
Update Component State (riskData)
        │
        ▼
Render Dashboard with Charts
```

### Backend Layer

#### Technology Stack
- **Framework:** FastAPI
- **Language:** Python 3.9+
- **Validation:** Pydantic
- **Server:** Uvicorn
- **Testing:** Pytest

#### Key Modules

**`main.py`** - API Application
- FastAPI initialization
- CORS middleware
- Route definitions
- Request/response models
- Error handling

**`scoring_algorithm.py`** - Core Logic
- Pure, deterministic functions
- No external dependencies
- Component score calculations
- Risk categorization
- Fully unit testable

**`data_layer.py`** - Data Access
- Abstraction layer for data retrieval
- Currently: dummy data
- Future: database queries
- Normalized metric output

#### Data Flow (Backend)

```
HTTP Request: GET /risk-score/{business_id}
        │
        ▼
FastAPI Route Handler
        │
        ▼
data_layer.get_business_metrics(business_id)
        │
        ▼
Raw Metrics (normalized 0-1)
        │
        ▼
scoring_algorithm.compute_offo_risk_score(metrics)
        │
        ├─▶ compute_task_score() ────┐
        ├─▶ compute_training_score() ─┤
        ├─▶ compute_doc_score() ──────┤
        │                             │
        └─────────────────────────────┤
                                      ▼
                            combine_scores()
                                      │
                                      ▼
                            categorize_risk()
                                      │
                                      ▼
                        JSON Response with Score
                                      │
                                      ▼
                            Return to Client
```

## Scoring Algorithm Deep Dive

### Input Requirements

All metrics must be normalized to [0, 1]:

```python
{
    "task_completion_rate": float,      # 0 = none, 1 = all
    "overdue_task_rate": float,         # 0 = none, 1 = all
    "training_completion_rate": float,  # 0 = none, 1 = all
    "doc_error_rate": float,            # 0 = none, 1 = all
    "doc_missing_field_rate": float     # 0 = none, 1 = all
}
```

### Calculation Steps

#### 1. Component Scores (0-100 each)

**Task Adherence:**
```
task_score = (0.5 × task_completion_rate + 0.5 × (1 - overdue_rate)) × 100
```
- Higher completion = higher score
- Fewer overdue = higher score

**Training Completion:**
```
training_score = training_completion_rate × 100
```
- Direct proportional relationship

**Documentation Accuracy:**
```
doc_score = (1 - 0.5 × error_rate - 0.5 × missing_rate) × 100
```
- Fewer errors = higher score
- Fewer missing fields = higher score

#### 2. Weighted Combination

```
overall_score = (0.40 × task_score) +
                (0.30 × training_score) +
                (0.30 × doc_score)
```

**Weights:**
- Task Adherence: 40%
- Training: 30%
- Documentation: 30%

#### 3. Risk Categorization

```python
if score >= 80:  return "LOW"
if score >= 50:  return "MODERATE"
else:            return "HIGH"
```

### Example Calculation

**Input:**
```python
{
    "task_completion_rate": 0.95,
    "overdue_task_rate": 0.05,
    "training_completion_rate": 0.92,
    "doc_error_rate": 0.05,
    "doc_missing_field_rate": 0.03
}
```

**Step 1 - Component Scores:**
```
task_score = (0.5 × 0.95 + 0.5 × 0.95) × 100 = 95.0
training_score = 0.92 × 100 = 92.0
doc_score = (1 - 0.5 × 0.05 - 0.5 × 0.03) × 100 = 96.0
```

**Step 2 - Weighted Combination:**
```
overall_score = (0.40 × 95) + (0.30 × 92) + (0.30 × 96)
              = 38 + 27.6 + 28.8
              = 94.4
```

**Step 3 - Categorization:**
```
94.4 >= 80  →  "LOW" risk
```

**Output:**
```json
{
    "overall_score": 94.4,
    "category": "LOW",
    "components": {
        "task_adherence_score": 95.0,
        "training_score": 92.0,
        "documentation_score": 96.0
    }
}
```

## API Specification

### Endpoints

#### GET /
Health check endpoint.

**Response:**
```json
{
    "service": "OFFO Risk Score API",
    "version": "1.0.0",
    "status": "operational"
}
```

#### GET /risk-score/{business_id}
Get risk score for a business.

**Response:**
```json
{
    "business_id": "string",
    "overall_score": 0-100,
    "category": "LOW|MODERATE|HIGH",
    "components": {
        "task_adherence_score": 0-100,
        "training_score": 0-100,
        "documentation_score": 0-100
    },
    "weights": {
        "task_adherence": 0.4,
        "training_completion": 0.3,
        "documentation_accuracy": 0.3
    }
}
```

**Error Responses:**
- `404`: Business ID not found

#### GET /businesses
List all available business IDs.

**Response:**
```json
{
    "businesses": ["biz_healthy", "biz_risky", ...]
}
```

#### GET /risk-score/{business_id}/raw
Debug endpoint for raw metrics.

**Response:**
```json
{
    "business_id": "string",
    "metrics": {
        "task_completion_rate": 0-1,
        "overdue_task_rate": 0-1,
        "training_completion_rate": 0-1,
        "doc_error_rate": 0-1,
        "doc_missing_field_rate": 0-1
    }
}
```

## Security Considerations

### Current (MVP)
- CORS enabled for all origins (`*`)
- No authentication required
- In-memory dummy data (no persistence)

### Production Requirements

1. **Authentication:**
   - Implement JWT-based auth
   - API key authentication for service-to-service
   - Role-based access control (RBAC)

2. **Authorization:**
   - User can only access their own businesses
   - Admin role for full access
   - Audit logging for all requests

3. **CORS:**
   - Restrict to specific frontend domains
   - Configure allowed methods/headers

4. **Rate Limiting:**
   - Prevent abuse and DoS attacks
   - Per-user and global limits

5. **Input Validation:**
   - Already handled by Pydantic
   - Add additional business logic validation

6. **HTTPS:**
   - Enforce TLS in production
   - Redirect HTTP to HTTPS

## Scalability Considerations

### Current Limitations (MVP)
- Synchronous API calls
- No caching
- In-memory data
- Single instance deployment

### Production Scalability

#### Horizontal Scaling
```
           Load Balancer
                │
      ┌─────────┼─────────┐
      │         │         │
    API-1    API-2    API-3
      │         │         │
      └─────────┼─────────┘
                │
           Database Pool
```

#### Caching Strategy
```
Request → Check Redis Cache
              │
        ┌─────┴─────┐
       Hit         Miss
        │            │
     Return     Query DB
      Cache          │
                  Update
                   Cache
                     │
                  Return
```

#### Database Optimization
- Connection pooling
- Read replicas for analytics
- Indexed queries on business_id
- Partitioning by date/business

#### Performance Targets
- API Response Time: < 200ms (p95)
- Throughput: 1000+ req/sec
- Availability: 99.9%
- Cache Hit Rate: > 80%

## Monitoring & Observability

### Metrics to Track

**Application Metrics:**
- Request rate (req/sec)
- Response time (p50, p95, p99)
- Error rate (4xx, 5xx)
- Cache hit/miss ratio

**Business Metrics:**
- Risk score distribution
- Most accessed businesses
- Category breakdown (LOW/MODERATE/HIGH)

**Infrastructure Metrics:**
- CPU/Memory utilization
- Database connection pool
- Network I/O

### Logging Strategy

**Structured Logging:**
```python
{
    "timestamp": "2024-12-05T19:00:00Z",
    "level": "INFO",
    "service": "offo-risk-api",
    "business_id": "biz_healthy",
    "overall_score": 94.4,
    "category": "LOW",
    "duration_ms": 45
}
```

### Alerting

**Critical Alerts:**
- API error rate > 5%
- Response time > 1s (p95)
- Service down

**Warning Alerts:**
- Error rate > 2%
- Response time > 500ms (p95)
- Cache hit rate < 60%

## Testing Strategy

### Backend Testing

**Unit Tests:**
- All scoring functions
- Edge cases and boundaries
- Input validation

**Integration Tests:**
- API endpoints
- Error handling
- Response formats

**Performance Tests:**
- Load testing (1000+ req/sec)
- Stress testing
- Endurance testing

### Frontend Testing

**Component Tests:**
- Dashboard rendering
- Chart display
- Error states

**E2E Tests:**
- Full user flow
- PDF export
- Business switching

## Deployment Architecture

### Development
```
localhost:8000 (Backend)
localhost:3000 (Frontend)
```

### Production
```
api.offo.com (Backend)
├─ Load Balancer
├─ Auto-scaling Group (2-10 instances)
└─ Database (PostgreSQL/MySQL)

dashboard.offo.com (Frontend)
├─ CDN (CloudFront/Cloudflare)
└─ Static Hosting (Vercel/Netlify)
```

## Future Enhancements

### Phase 2: Advanced Features
- Historical trend analysis
- Comparative benchmarking
- Predictive risk modeling
- Automated alerts/notifications

### Phase 3: Integrations
- Slack/Teams notifications
- Email reports (scheduled)
- Webhook support
- API webhooks for score changes

### Phase 4: Analytics
- Custom dashboards
- Drill-down capabilities
- Export to BI tools
- Advanced filtering

## Technology Decisions

### Why FastAPI?
- High performance (async support)
- Automatic API documentation
- Type validation with Pydantic
- Modern Python framework

### Why Next.js?
- Server-side rendering (SEO)
- File-based routing
- Built-in optimization
- Excellent developer experience

### Why Tailwind CSS?
- Utility-first approach
- Rapid development
- Consistent design system
- Small bundle size

### Why Recharts?
- React-friendly
- Responsive by default
- Good documentation
- Active maintenance

## Conclusion

The OFFO Risk Score system provides a solid foundation for risk assessment with a clean architecture, comprehensive testing, and clear upgrade paths for production deployment.
