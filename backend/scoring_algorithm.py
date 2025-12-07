"""
scoring_algorithm.py

OFFO Risk Score™ MVP

Transforms Compliance AI behavioral data into a 0–100 risk score with category:
- 80–100: Low Risk
- 50–79:  Moderate Risk
- 0–49:   High Risk
"""

from dataclasses import dataclass
from typing import Dict, Any

# Weighting factors for each component
TASK_WEIGHT = 0.40
TRAINING_WEIGHT = 0.30
DOC_WEIGHT = 0.30


@dataclass
class BusinessMetrics:
    """
    Normalized business compliance metrics.
    All values should be in range [0, 1].
    """
    # Task adherence
    task_completion_rate: float         # 0–1 (1 = all tasks completed)
    overdue_task_rate: float           # 0–1 (1 = all overdue)

    # Training completion
    training_completion_rate: float    # 0–1 (1 = all training completed)

    # Documentation accuracy
    doc_error_rate: float              # 0–1 (1 = lots of errors)
    doc_missing_field_rate: float      # 0–1 (1 = lots of missing fields)


def clamp_0_100(x: float) -> float:
    """
    Clamps a value to the range [0, 100].

    Args:
        x: Input value to clamp

    Returns:
        Value clamped between 0 and 100
    """
    return max(0.0, min(100.0, x))


def compute_task_score(metrics: BusinessMetrics) -> float:
    """
    Calculates task adherence score.

    Higher task_completion_rate = higher score.
    Higher overdue_task_rate = lower score.

    Args:
        metrics: BusinessMetrics containing task-related data

    Returns:
        Task adherence score in range [0, 100]
    """
    completion_component = metrics.task_completion_rate   # good
    overdue_component = 1.0 - metrics.overdue_task_rate   # good if fewer overdue
    raw = 0.5 * completion_component + 0.5 * overdue_component
    return clamp_0_100(raw * 100)


def compute_training_score(metrics: BusinessMetrics) -> float:
    """
    Calculates training completion score.

    Directly proportional to training_completion_rate.

    Args:
        metrics: BusinessMetrics containing training data

    Returns:
        Training score in range [0, 100]
    """
    return clamp_0_100(metrics.training_completion_rate * 100)


def compute_doc_score(metrics: BusinessMetrics) -> float:
    """
    Calculates documentation accuracy score.

    More errors/missing fields → lower score.

    Args:
        metrics: BusinessMetrics containing documentation data

    Returns:
        Documentation score in range [0, 100]
    """
    accuracy = 1.0 - 0.5 * metrics.doc_error_rate - 0.5 * metrics.doc_missing_field_rate
    return clamp_0_100(accuracy * 100)


def combine_scores(task_score: float, training_score: float, doc_score: float) -> float:
    """
    Combines component scores into overall risk score using weighted average.

    Args:
        task_score: Task adherence score [0, 100]
        training_score: Training completion score [0, 100]
        doc_score: Documentation accuracy score [0, 100]

    Returns:
        Combined overall score in range [0, 100]
    """
    combined = (
        TASK_WEIGHT * task_score +
        TRAINING_WEIGHT * training_score +
        DOC_WEIGHT * doc_score
    )
    return clamp_0_100(combined)


def categorize_risk(score: float) -> str:
    """
    Categorizes risk level based on overall score.

    Args:
        score: Overall risk score [0, 100]

    Returns:
        Risk category: "LOW", "MODERATE", or "HIGH"
    """
    if score >= 80:
        return "LOW"
    if score >= 50:
        return "MODERATE"
    return "HIGH"


def compute_offo_risk_score(raw_metrics: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main entrypoint for OFFO Risk Score calculation.

    Expects normalized metrics in [0,1].

    Args:
        raw_metrics: Dictionary containing:
            - task_completion_rate: float [0, 1]
            - overdue_task_rate: float [0, 1]
            - training_completion_rate: float [0, 1]
            - doc_error_rate: float [0, 1]
            - doc_missing_field_rate: float [0, 1]

    Returns:
        Dictionary containing:
            - overall_score: float [0, 100]
            - category: str ("LOW", "MODERATE", "HIGH")
            - components: dict with individual scores
            - weights: dict with weight factors used
    """
    metrics = BusinessMetrics(
        task_completion_rate=raw_metrics["task_completion_rate"],
        overdue_task_rate=raw_metrics["overdue_task_rate"],
        training_completion_rate=raw_metrics["training_completion_rate"],
        doc_error_rate=raw_metrics["doc_error_rate"],
        doc_missing_field_rate=raw_metrics["doc_missing_field_rate"],
    )

    task_score = compute_task_score(metrics)
    training_score = compute_training_score(metrics)
    doc_score = compute_doc_score(metrics)
    overall_score = combine_scores(task_score, training_score, doc_score)
    category = categorize_risk(overall_score)

    return {
        "overall_score": round(overall_score, 1),
        "category": category,
        "components": {
            "task_adherence_score": round(task_score, 1),
            "training_score": round(training_score, 1),
            "documentation_score": round(doc_score, 1),
        },
        "weights": {
            "task_adherence": TASK_WEIGHT,
            "training_completion": TRAINING_WEIGHT,
            "documentation_accuracy": DOC_WEIGHT,
        }
    }
