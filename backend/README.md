# OFFO Risk Score Backend

Python FastAPI backend for the OFFO Risk Intelligence scoring system.

## Architecture

### Core Modules

#### scoring_algorithm.py
Pure, deterministic scoring engine with no external dependencies.

**Key Functions:**
- `compute_offo_risk_score(raw_metrics)` - Main entry point
- `compute_task_score(metrics)` - Task adherence calculation
- `compute_training_score(metrics)` - Training completion calculation
- `compute_doc_score(metrics)` - Documentation accuracy calculation
- `categorize_risk(score)` - Risk category assignment

**Design Principles:**
- Pure functions - no side effects
- Deterministic - same input always produces same output
- Testable - easily unit tested
- Documented - comprehensive docstrings

#### data_layer.py
Data access abstraction layer.

**Current Implementation:** Dummy data for MVP
**Future:** Replace with Compliance AI database queries

**Functions:**
- `get_business_metrics(business_id)` - Fetch normalized metrics
- `get_all_business_ids()` - List all businesses

**Migration Path:**
```python
# Replace dummy data with real DB queries
def get_business_metrics(business_id: str) -> Optional[Dict[str, float]]:
    # TODO: Query Compliance AI database
    # Example with SQLAlchemy:
    # session.query(BusinessMetrics).filter_by(id=business_id).first()
    pass
```

#### main.py
FastAPI application with REST endpoints.

**Endpoints:**
- `GET /` - Health check
- `GET /risk-score/{business_id}` - Get risk score
- `GET /businesses` - List all businesses
- `GET /risk-score/{business_id}/raw` - Get raw metrics (debug)

## Input Data Format

All metrics must be normalized to [0, 1]:

```python
{
    "task_completion_rate": 0.95,      # 0 = none, 1 = all completed
    "overdue_task_rate": 0.05,         # 0 = none, 1 = all overdue
    "training_completion_rate": 0.92,  # 0 = none, 1 = all completed
    "doc_error_rate": 0.05,            # 0 = none, 1 = all have errors
    "doc_missing_field_rate": 0.03     # 0 = none, 1 = all missing
}
```

## Output Format

```python
{
    "business_id": "biz_healthy",
    "overall_score": 91.5,              # 0-100
    "category": "LOW",                  # LOW/MODERATE/HIGH
    "components": {
        "task_adherence_score": 95.0,   # 0-100
        "training_score": 92.0,          # 0-100
        "documentation_score": 86.0      # 0-100
    },
    "weights": {
        "task_adherence": 0.4,           # 40%
        "training_completion": 0.3,       # 30%
        "documentation_accuracy": 0.3     # 30%
    }
}
```

## Testing

### Run All Tests
```bash
pytest tests/ -v
```

### Run with Coverage
```bash
pytest tests/ -v --cov=. --cov-report=html
```

### Run Specific Test File
```bash
pytest tests/test_scoring_algorithm.py -v
```

### Test Categories

**Unit Tests** (`test_scoring_algorithm.py`):
- Component score calculations
- Risk categorization
- Edge cases and boundaries
- Input validation

**Integration Tests** (`test_api.py`):
- API endpoint functionality
- Error handling
- Response format validation
- CORS configuration

## API Documentation

Once running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Configuration

### Environment Variables
```bash
# Optional - defaults shown
PORT=8000
HOST=0.0.0.0
DEBUG=False
```

### Adjusting Weights

To modify component weights, edit `scoring_algorithm.py`:

```python
TASK_WEIGHT = 0.40        # Default: 40%
TRAINING_WEIGHT = 0.30    # Default: 30%
DOC_WEIGHT = 0.30         # Default: 30%
```

**Important:** Weights must sum to 1.0

### Adjusting Risk Thresholds

To modify risk category thresholds, edit `categorize_risk()`:

```python
def categorize_risk(score: float) -> str:
    if score >= 80:    # Adjust this threshold
        return "LOW"
    if score >= 50:    # Adjust this threshold
        return "MODERATE"
    return "HIGH"
```

## Development

### Adding New Metrics

1. **Update BusinessMetrics dataclass:**
```python
@dataclass
class BusinessMetrics:
    # ... existing fields
    new_metric: float  # Add new field
```

2. **Create scoring function:**
```python
def compute_new_score(metrics: BusinessMetrics) -> float:
    # Implement scoring logic
    pass
```

3. **Update weights:**
```python
NEW_WEIGHT = 0.20
# Adjust other weights to sum to 1.0
```

4. **Update combine_scores():**
```python
def combine_scores(..., new_score: float) -> float:
    combined = (
        # ... existing
        NEW_WEIGHT * new_score
    )
    return clamp_0_100(combined)
```

5. **Add tests:**
```python
def test_new_metric():
    # Test new scoring logic
    pass
```

### Code Style

- Follow PEP 8
- Type hints on all functions
- Docstrings in Google style
- Maximum line length: 100 characters

### Pre-commit Checks
```bash
# Format code
black .

# Check types
mypy .

# Lint
flake8 .

# Run tests
pytest
```

## Performance Considerations

### Current (MVP)
- In-memory dummy data
- Synchronous operations
- No caching

### Production Optimizations

1. **Caching:**
```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def get_business_metrics(business_id: str):
    # Cache frequently accessed businesses
    pass
```

2. **Async Database Queries:**
```python
@app.get("/risk-score/{business_id}")
async def get_risk_score(business_id: str):
    metrics = await async_get_metrics(business_id)
    # ...
```

3. **Connection Pooling:**
```python
from sqlalchemy.ext.asyncio import create_async_engine

engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=40
)
```

## Deployment

### Local Development
```bash
uvicorn main:app --reload --port 8000
```

### Production (Heroku)
```bash
# Procfile
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Production (Docker)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Troubleshooting

### Import Errors
Ensure you're running from the backend directory:
```bash
cd backend
python main.py
```

### Test Failures
Check test output for specific failures:
```bash
pytest tests/ -v -s  # -s shows print statements
```

### API Not Responding
1. Check if port 8000 is available
2. Verify virtual environment is activated
3. Check uvicorn logs for errors

## Next Steps

1. **Replace dummy data** with real Compliance AI queries
2. **Add authentication** (JWT/OAuth)
3. **Implement caching** (Redis)
4. **Add monitoring** (logging, APM)
5. **Set up CI/CD** (GitHub Actions)
6. **Deploy to production** (AWS/GCP/Azure)
