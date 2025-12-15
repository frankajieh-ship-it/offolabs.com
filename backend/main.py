"""
main.py

FastAPI application for OFFO Risk Score™ API

Endpoints:
    GET /risk-score/{business_id} - Get risk score for a business
    GET /businesses - List all available business IDs
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Dict, Any, List
from datetime import datetime, timedelta
import os

from scoring_algorithm import compute_offo_risk_score
from data_layer import get_business_metrics, get_all_business_ids, get_30day_trend, get_risk_drivers, get_business_details
from security import (
    verify_token,
    TokenData,
    create_access_token,
    get_current_api_key,
    get_security_info,
    rotate_api_key,
    DEFAULT_KEY_ID,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from pdf_generator import generate_risk_report_pdf


# In-memory cache with TTL
CACHE_TTL_MINUTES = 5
_score_cache: Dict[str, Dict[str, Any]] = {}
_cache_timestamps: Dict[str, datetime] = {}


app = FastAPI(
    title="OFFO Risk Score API",
    description="Risk Intelligence scoring system for businesses",
    version="1.0.0"
)

# Enable CORS for frontend
ALLOWED_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # Production: set CORS_ORIGINS env var
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TrendDataPoint(BaseModel):
    """Model for trend data point"""
    date: str
    score: float


class RiskDriver(BaseModel):
    """Model for risk driver"""
    label: str
    impact: str
    description: str


class RiskScoreResponse(BaseModel):
    """Response model for risk score endpoint"""
    business_id: str
    overall_score: float
    category: str
    components: Dict[str, float]
    weights: Dict[str, float]
    trend_30d: List[TrendDataPoint] = []
    drivers: List[RiskDriver] = []
    recommended_actions: List[str] = []


class BusinessListResponse(BaseModel):
    """Response model for business list endpoint"""
    businesses: list[str]


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "OFFO Risk Score API",
        "version": "1.0.0",
        "status": "operational"
    }


@app.post("/auth/token")
async def get_token(client_id: str = "demo_client"):
    """
    Generate JWT token for authentication (development/demo endpoint).

    In production, this should be replaced with proper OAuth2 flow.

    Args:
        client_id: Client identifier

    Returns:
        Access token and type
    """
    access_token = create_access_token(
        data={"sub": client_id, "scopes": ["read:scores", "read:reports"]}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60  # seconds
    }


def is_cache_valid(business_id: str) -> bool:
    """Check if cached data is still valid."""
    if business_id not in _cache_timestamps:
        return False

    cache_time = _cache_timestamps[business_id]
    expiry_time = cache_time + timedelta(minutes=CACHE_TTL_MINUTES)
    return datetime.now() < expiry_time


def get_cached_score(business_id: str) -> Dict[str, Any] | None:
    """Retrieve cached score if valid."""
    if is_cache_valid(business_id):
        return _score_cache.get(business_id)
    return None


def set_cached_score(business_id: str, data: Dict[str, Any]):
    """Store score in cache with current timestamp."""
    _score_cache[business_id] = data
    _cache_timestamps[business_id] = datetime.now()


@app.get("/risk-score/{business_id}")
async def get_risk_score(
    business_id: str,
    token_data: TokenData = Depends(verify_token)
):
    """
    Calculate and return the OFFO Risk Score for a given business.

    Results are cached for 5 minutes for performance.
    Requires valid JWT Bearer token for authentication.

    Args:
        business_id: Unique identifier for the business
        token_data: Validated token data from authorization header

    Returns:
        RiskScoreResponse with overall score, category, component breakdown, trend, and drivers

    Raises:
        HTTPException: 401 if unauthorized, 404 if business_id not found
    """
    # Check cache first
    cached_data = get_cached_score(business_id)
    if cached_data is not None:
        return cached_data

    # Fetch business metrics
    metrics = get_business_metrics(business_id)

    if metrics is None:
        raise HTTPException(
            status_code=404,
            detail=f"Business ID '{business_id}' not found"
        )

    # Compute risk score
    risk_score = compute_offo_risk_score(metrics)

    # Get 30-day trend
    trend_data = get_30day_trend(business_id, risk_score["overall_score"])

    # Get risk drivers
    drivers = get_risk_drivers(business_id, risk_score["components"])

    # Get business details (employee count, industry, etc.)
    business_details = get_business_details(business_id)
    if business_details is None:
        business_details = {
            "employee_count": None,
            "industry": "Unknown",
            "location": "Unknown",
            "risk_profile": "No profile available"
        }

    # Generate recommended actions based on category
    recommended_actions = generate_recommended_actions(
        risk_score["category"],
        risk_score["components"]
    )

    # Build complete response
    response_data = {
        "business_id": business_id,
        **risk_score,
        "business_details": business_details,
        "trend_30d": trend_data,
        "drivers": drivers,
        "recommended_actions": recommended_actions
    }

    # Cache the result
    set_cached_score(business_id, response_data)

    return response_data


@app.get("/businesses", response_model=BusinessListResponse)
async def list_businesses():
    """
    Get list of all available business IDs.

    Returns:
        BusinessListResponse with list of business IDs
    """
    businesses = get_all_business_ids()
    return {"businesses": businesses}


@app.get("/risk-score/{business_id}/raw")
async def get_raw_metrics(
    business_id: str,
    token_data: TokenData = Depends(verify_token)
):
    """
    Get raw metrics for a business (debug endpoint).
    Requires valid JWT Bearer token for authentication.

    Args:
        business_id: Unique identifier for the business
        token_data: Validated token data from authorization header

    Returns:
        Raw normalized metrics

    Raises:
        HTTPException: 401 if unauthorized, 404 if business_id not found
    """
    metrics = get_business_metrics(business_id)

    if metrics is None:
        raise HTTPException(
            status_code=404,
            detail=f"Business ID '{business_id}' not found"
        )

    return {
        "business_id": business_id,
        "metrics": metrics
    }


@app.get("/risk-score/{business_id}/pdf")
async def export_risk_report_pdf(
    business_id: str,
    token_data: TokenData = Depends(verify_token)
):
    """
    Export comprehensive risk report as PDF.
    Requires valid JWT Bearer token for authentication.

    Args:
        business_id: Unique identifier for the business
        token_data: Validated token data from authorization header

    Returns:
        PDF file as streaming response

    Raises:
        HTTPException: 401 if unauthorized, 404 if business_id not found
    """
    # Get complete risk data
    metrics = get_business_metrics(business_id)

    if metrics is None:
        raise HTTPException(
            status_code=404,
            detail=f"Business ID '{business_id}' not found"
        )

    # Compute risk score
    risk_score = compute_offo_risk_score(metrics)

    # Get additional data
    trend_data = get_30day_trend(business_id, risk_score["overall_score"])
    drivers = get_risk_drivers(business_id, risk_score["components"])
    recommended_actions = generate_recommended_actions(
        risk_score["category"],
        risk_score["components"]
    )

    # Build complete data
    complete_data = {
        "business_id": business_id,
        **risk_score,
        "trend_30d": trend_data,
        "drivers": drivers,
        "recommended_actions": recommended_actions
    }

    # Generate PDF
    pdf_buffer = generate_risk_report_pdf(complete_data)

    # Return as streaming response
    filename = f"OFFO_Risk_Report_{business_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={filename}"
        }
    )


def generate_recommended_actions(category: str, components: Dict[str, float]) -> List[str]:
    """
    Generate recommended actions based on risk category and component scores.
    Actions are sorted by driver severity (lowest scoring components first).

    Args:
        category: Risk category (LOW, MODERATE, HIGH)
        components: Component scores

    Returns:
        List of recommended action strings, sorted by priority
    """
    actions = []

    task_score = components.get("task_adherence_score", 0)
    training_score = components.get("training_score", 0)
    doc_score = components.get("documentation_score", 0)

    # Sort components by score (ascending) to prioritize worst areas
    sorted_components = sorted(
        [
            ("task", task_score),
            ("training", training_score),
            ("documentation", doc_score)
        ],
        key=lambda x: x[1]
    )

    if category == "HIGH":
        actions.append("Initiate immediate remediation plan")

        # Add component-specific actions in order of severity (worst first)
        for component_type, score in sorted_components:
            if component_type == "task" and score < 50:
                actions.append("Address critical task backlog - prioritize overdue items")
            elif component_type == "training" and score < 50:
                actions.append("Complete all required training within 7 days")
            elif component_type == "documentation" and score < 50:
                actions.append("Conduct documentation audit and correction")

        actions.append("Assign dedicated compliance resources")
        actions.append("Implement weekly monitoring and reporting")
        actions.append("Escalate to management for immediate review")

    elif category == "MODERATE":
        actions.append("Review and address areas scoring below 70")

        # Add component-specific actions in order of severity (worst first)
        for component_type, score in sorted_components:
            if component_type == "task" and score < 70:
                actions.append("Improve task completion rate - set clear deadlines")
            elif component_type == "training" and score < 70:
                actions.append("Schedule outstanding training sessions")
            elif component_type == "documentation" and score < 70:
                actions.append("Review documentation processes for accuracy")

        actions.append("Increase monitoring frequency to bi-weekly")
        actions.append("Implement corrective action plans")
        actions.append("Schedule follow-up assessment within 30 days")

    else:  # LOW
        actions.append("Continue current compliance practices")
        actions.append("Maintain regular monitoring and reviews")
        actions.append("Share successful strategies across organization")
        actions.append("Document best practices for future reference")
        actions.append("Conduct quarterly compliance reviews")

    return actions


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
