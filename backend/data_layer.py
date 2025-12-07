"""
data_layer.py

Data access layer for retrieving business metrics.
Currently uses dummy data for MVP - replace with real Compliance AI DB queries.
"""

from typing import Dict, Optional, List, Any
from datetime import datetime, timedelta


def get_business_details(business_id: str) -> Optional[Dict[str, Any]]:
    """
    Retrieves business contextual details for a given business ID.

    For MVP: Returns simulated business context data.
    TODO: Replace with real business profile database queries.

    Args:
        business_id: Unique identifier for the business

    Returns:
        Dictionary with business details, or None if not found
        Keys:
            - employee_count: Number of employees
            - industry: Industry sector
            - location: Business location
            - risk_profile: Brief risk context
    """
    business_details = {
        "biz_excellent": {
            "employee_count": 150,
            "industry": "Healthcare Services",
            "location": "Seattle, WA",
            "risk_profile": "Low-risk healthcare provider with strong compliance culture and comprehensive safety programs"
        },
        "biz_healthy": {
            "employee_count": 85,
            "industry": "Manufacturing",
            "location": "Portland, OR",
            "risk_profile": "Well-managed manufacturing facility with established safety protocols and regular training"
        },
        "biz_mixed": {
            "employee_count": 200,
            "industry": "Construction",
            "location": "Denver, CO",
            "risk_profile": "Growing construction company with moderate compliance gaps requiring attention"
        },
        "biz_risky": {
            "employee_count": 45,
            "industry": "Transportation & Logistics",
            "location": "Phoenix, AZ",
            "risk_profile": "High-risk logistics operation with significant compliance challenges and training deficiencies"
        },
        "biz_critical": {
            "employee_count": 120,
            "industry": "Warehousing & Distribution",
            "location": "Las Vegas, NV",
            "risk_profile": "Critical-risk distribution center with major compliance violations and immediate remediation needed"
        }
    }

    return business_details.get(business_id, None)


def get_business_metrics(business_id: str) -> Optional[Dict[str, float]]:
    """
    Retrieves normalized business metrics for a given business ID.

    For MVP: Returns dummy data for demonstration.
    TODO: Replace with real Compliance AI database queries.

    Args:
        business_id: Unique identifier for the business

    Returns:
        Dictionary with normalized metrics [0, 1], or None if not found
        Keys:
            - task_completion_rate
            - overdue_task_rate
            - training_completion_rate
            - doc_error_rate
            - doc_missing_field_rate
    """
    dummy_data = {
        "biz_healthy": {
            "task_completion_rate": 0.95,
            "overdue_task_rate": 0.05,
            "training_completion_rate": 0.92,
            "doc_error_rate": 0.05,
            "doc_missing_field_rate": 0.03,
        },
        "biz_mixed": {
            "task_completion_rate": 0.75,
            "overdue_task_rate": 0.18,
            "training_completion_rate": 0.70,
            "doc_error_rate": 0.12,
            "doc_missing_field_rate": 0.10,
        },
        "biz_risky": {
            "task_completion_rate": 0.45,
            "overdue_task_rate": 0.35,
            "training_completion_rate": 0.40,
            "doc_error_rate": 0.25,
            "doc_missing_field_rate": 0.20,
        },
        "biz_critical": {
            "task_completion_rate": 0.30,
            "overdue_task_rate": 0.55,
            "training_completion_rate": 0.25,
            "doc_error_rate": 0.40,
            "doc_missing_field_rate": 0.35,
        },
        "biz_excellent": {
            "task_completion_rate": 0.98,
            "overdue_task_rate": 0.02,
            "training_completion_rate": 0.99,
            "doc_error_rate": 0.01,
            "doc_missing_field_rate": 0.01,
        }
    }

    return dummy_data.get(business_id, None)


def get_30day_trend(business_id: str, current_score: float) -> List[Dict[str, Any]]:
    """
    Generates 30-day trend data for a business.
    
    For MVP: Returns simulated trend based on current score.
    TODO: Replace with actual historical data from database.
    
    Args:
        business_id: Unique identifier for the business
        current_score: Current risk score to base trend on
        
    Returns:
        List of dictionaries with date and score
    """
    trend_data = []
    today = datetime.now()
    
    # Generate trend based on business type
    if business_id == "biz_excellent":
        # Consistently high, slight improvement
        base_score = 96
        variation = 2
        improvement = 0.1
    elif business_id == "biz_healthy":
        # Good and stable
        base_score = 88
        variation = 3
        improvement = 0.05
    elif business_id == "biz_mixed":
        # Some volatility
        base_score = 65
        variation = 5
        improvement = -0.02
    elif business_id == "biz_risky":
        # Declining trend
        base_score = 45
        variation = 4
        improvement = -0.08
    elif business_id == "biz_critical":
        # Consistently low
        base_score = 30
        variation = 3
        improvement = -0.05
    else:
        base_score = current_score
        variation = 2
        improvement = 0
    
    # Generate 30 data points
    for i in range(30):
        date = today - timedelta(days=29-i)
        # Add some random-looking variation
        score_variation = (i % 7 - 3) * (variation / 3)
        trend_score = base_score + (i * improvement) + score_variation
        
        # Clamp to 0-100
        trend_score = max(0, min(100, trend_score))
        
        trend_data.append({
            "date": date.strftime("%Y-%m-%d"),
            "score": round(trend_score, 1)
        })
    
    return trend_data


def get_risk_drivers(business_id: str, components: Dict[str, float]) -> List[Dict[str, Any]]:
    """
    Identifies key drivers of risk for a business.
    
    For MVP: Returns simulated drivers based on component scores.
    TODO: Replace with actual risk analysis from compliance data.
    
    Args:
        business_id: Unique identifier for the business
        components: Dictionary of component scores
        
    Returns:
        List of risk drivers with label, impact, and description
    """
    drivers = []
    
    task_score = components.get("task_adherence_score", 0)
    training_score = components.get("training_score", 0)
    doc_score = components.get("documentation_score", 0)
    
    # Task Adherence Driver
    if task_score >= 80:
        drivers.append({
            "label": "Task Completion Excellence",
            "impact": "positive",
            "description": f"Strong task adherence with {task_score:.0f}% completion rate. Team consistently meets deadlines."
        })
    elif task_score >= 50:
        drivers.append({
            "label": "Task Completion Concerns",
            "impact": "neutral",
            "description": f"Moderate task adherence at {task_score:.0f}%. Some overdue tasks require attention."
        })
    else:
        drivers.append({
            "label": "Critical Task Backlog",
            "impact": "negative",
            "description": f"Low task completion at {task_score:.0f}%. Significant backlog of overdue tasks."
        })
    
    # Training Driver
    if training_score >= 80:
        drivers.append({
            "label": "Training Compliance Strong",
            "impact": "positive",
            "description": f"Excellent training completion at {training_score:.0f}%. Staff well-prepared."
        })
    elif training_score >= 50:
        drivers.append({
            "label": "Training Gaps Present",
            "impact": "neutral",
            "description": f"Training completion at {training_score:.0f}%. Some required training incomplete."
        })
    else:
        drivers.append({
            "label": "Training Deficiency",
            "impact": "negative",
            "description": f"Low training completion at {training_score:.0f}%. Critical training gaps exist."
        })
    
    # Documentation Driver
    if doc_score >= 80:
        drivers.append({
            "label": "Documentation Quality High",
            "impact": "positive",
            "description": f"Documentation accuracy at {doc_score:.0f}%. Records are complete and accurate."
        })
    elif doc_score >= 50:
        drivers.append({
            "label": "Documentation Needs Improvement",
            "impact": "neutral",
            "description": f"Documentation at {doc_score:.0f}%. Some errors and missing fields detected."
        })
    else:
        drivers.append({
            "label": "Documentation Issues",
            "impact": "negative",
            "description": f"Documentation quality at {doc_score:.0f}%. High error rate and missing information."
        })
    
    return drivers


def get_all_business_ids() -> list[str]:
    """
    Returns list of all available business IDs.

    For MVP: Returns dummy business IDs.
    TODO: Replace with query to get all business IDs from DB.

    Returns:
        List of business ID strings
    """
    return ["biz_healthy", "biz_mixed", "biz_risky", "biz_critical", "biz_excellent"]
