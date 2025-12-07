"""
test_scoring_algorithm.py

Unit tests for OFFO Risk Score scoring algorithm.

Test cases:
- High compliance → high score (80–100, LOW risk)
- Medium compliance → moderate score (50–79, MODERATE risk)
- Low compliance → low score (0–49, HIGH risk)
- Edge cases and boundary conditions
"""

import pytest
from scoring_algorithm import (
    compute_offo_risk_score,
    compute_task_score,
    compute_training_score,
    compute_doc_score,
    combine_scores,
    categorize_risk,
    BusinessMetrics,
    clamp_0_100
)


class TestClampFunction:
    """Tests for the clamp_0_100 utility function"""

    def test_clamp_within_range(self):
        assert clamp_0_100(50.0) == 50.0

    def test_clamp_above_max(self):
        assert clamp_0_100(150.0) == 100.0

    def test_clamp_below_min(self):
        assert clamp_0_100(-50.0) == 0.0

    def test_clamp_at_boundaries(self):
        assert clamp_0_100(0.0) == 0.0
        assert clamp_0_100(100.0) == 100.0


class TestRiskCategorization:
    """Tests for risk category assignment"""

    def test_low_risk_category(self):
        assert categorize_risk(80.0) == "LOW"
        assert categorize_risk(90.0) == "LOW"
        assert categorize_risk(100.0) == "LOW"

    def test_moderate_risk_category(self):
        assert categorize_risk(50.0) == "MODERATE"
        assert categorize_risk(65.0) == "MODERATE"
        assert categorize_risk(79.9) == "MODERATE"

    def test_high_risk_category(self):
        assert categorize_risk(0.0) == "HIGH"
        assert categorize_risk(25.0) == "HIGH"
        assert categorize_risk(49.9) == "HIGH"


class TestComponentScores:
    """Tests for individual component score calculations"""

    def test_perfect_task_score(self):
        metrics = BusinessMetrics(
            task_completion_rate=1.0,
            overdue_task_rate=0.0,
            training_completion_rate=0.0,
            doc_error_rate=0.0,
            doc_missing_field_rate=0.0
        )
        score = compute_task_score(metrics)
        assert score == 100.0

    def test_poor_task_score(self):
        metrics = BusinessMetrics(
            task_completion_rate=0.0,
            overdue_task_rate=1.0,
            training_completion_rate=0.0,
            doc_error_rate=0.0,
            doc_missing_field_rate=0.0
        )
        score = compute_task_score(metrics)
        assert score == 0.0

    def test_perfect_training_score(self):
        metrics = BusinessMetrics(
            task_completion_rate=0.0,
            overdue_task_rate=0.0,
            training_completion_rate=1.0,
            doc_error_rate=0.0,
            doc_missing_field_rate=0.0
        )
        score = compute_training_score(metrics)
        assert score == 100.0

    def test_poor_training_score(self):
        metrics = BusinessMetrics(
            task_completion_rate=0.0,
            overdue_task_rate=0.0,
            training_completion_rate=0.0,
            doc_error_rate=0.0,
            doc_missing_field_rate=0.0
        )
        score = compute_training_score(metrics)
        assert score == 0.0

    def test_perfect_doc_score(self):
        metrics = BusinessMetrics(
            task_completion_rate=0.0,
            overdue_task_rate=0.0,
            training_completion_rate=0.0,
            doc_error_rate=0.0,
            doc_missing_field_rate=0.0
        )
        score = compute_doc_score(metrics)
        assert score == 100.0

    def test_poor_doc_score(self):
        metrics = BusinessMetrics(
            task_completion_rate=0.0,
            overdue_task_rate=0.0,
            training_completion_rate=0.0,
            doc_error_rate=1.0,
            doc_missing_field_rate=1.0
        )
        score = compute_doc_score(metrics)
        assert score == 0.0


class TestCompleteScoring:
    """Tests for complete end-to-end scoring"""

    def test_high_compliance_scenario(self):
        """Excellent compliance should yield LOW risk (80-100 score)"""
        metrics = {
            "task_completion_rate": 0.95,
            "overdue_task_rate": 0.05,
            "training_completion_rate": 0.92,
            "doc_error_rate": 0.05,
            "doc_missing_field_rate": 0.03,
        }
        result = compute_offo_risk_score(metrics)

        assert result["overall_score"] >= 80.0
        assert result["overall_score"] <= 100.0
        assert result["category"] == "LOW"
        assert "components" in result
        assert "weights" in result

    def test_medium_compliance_scenario(self):
        """Medium compliance should yield MODERATE risk (50-79 score)"""
        metrics = {
            "task_completion_rate": 0.75,
            "overdue_task_rate": 0.18,
            "training_completion_rate": 0.70,
            "doc_error_rate": 0.12,
            "doc_missing_field_rate": 0.10,
        }
        result = compute_offo_risk_score(metrics)

        assert result["overall_score"] >= 50.0
        assert result["overall_score"] < 80.0
        assert result["category"] == "MODERATE"

    def test_low_compliance_scenario(self):
        """Poor compliance should yield HIGH risk (0-49 score)"""
        metrics = {
            "task_completion_rate": 0.45,
            "overdue_task_rate": 0.35,
            "training_completion_rate": 0.40,
            "doc_error_rate": 0.25,
            "doc_missing_field_rate": 0.20,
        }
        result = compute_offo_risk_score(metrics)

        assert result["overall_score"] >= 0.0
        assert result["overall_score"] < 50.0
        assert result["category"] == "HIGH"

    def test_perfect_compliance(self):
        """Perfect metrics should yield 100 score and LOW risk"""
        metrics = {
            "task_completion_rate": 1.0,
            "overdue_task_rate": 0.0,
            "training_completion_rate": 1.0,
            "doc_error_rate": 0.0,
            "doc_missing_field_rate": 0.0,
        }
        result = compute_offo_risk_score(metrics)

        assert result["overall_score"] == 100.0
        assert result["category"] == "LOW"
        assert result["components"]["task_adherence_score"] == 100.0
        assert result["components"]["training_score"] == 100.0
        assert result["components"]["documentation_score"] == 100.0

    def test_worst_compliance(self):
        """Worst possible metrics should yield 0 score and HIGH risk"""
        metrics = {
            "task_completion_rate": 0.0,
            "overdue_task_rate": 1.0,
            "training_completion_rate": 0.0,
            "doc_error_rate": 1.0,
            "doc_missing_field_rate": 1.0,
        }
        result = compute_offo_risk_score(metrics)

        assert result["overall_score"] == 0.0
        assert result["category"] == "HIGH"

    def test_result_structure(self):
        """Verify the result contains all expected fields"""
        metrics = {
            "task_completion_rate": 0.8,
            "overdue_task_rate": 0.1,
            "training_completion_rate": 0.85,
            "doc_error_rate": 0.08,
            "doc_missing_field_rate": 0.07,
        }
        result = compute_offo_risk_score(metrics)

        assert "overall_score" in result
        assert "category" in result
        assert "components" in result
        assert "weights" in result

        assert "task_adherence_score" in result["components"]
        assert "training_score" in result["components"]
        assert "documentation_score" in result["components"]

        assert "task_adherence" in result["weights"]
        assert "training_completion" in result["weights"]
        assert "documentation_accuracy" in result["weights"]

    def test_weights_sum_to_one(self):
        """Verify that all weights sum to 1.0"""
        metrics = {
            "task_completion_rate": 0.5,
            "overdue_task_rate": 0.5,
            "training_completion_rate": 0.5,
            "doc_error_rate": 0.5,
            "doc_missing_field_rate": 0.5,
        }
        result = compute_offo_risk_score(metrics)

        weights = result["weights"]
        total = sum(weights.values())
        assert abs(total - 1.0) < 0.0001  # Floating point tolerance


class TestEdgeCases:
    """Tests for edge cases and boundary conditions"""

    def test_boundary_low_moderate(self):
        """Test score exactly at 50.0 (LOW/MODERATE boundary)"""
        assert categorize_risk(50.0) == "MODERATE"
        assert categorize_risk(49.999) == "HIGH"

    def test_boundary_moderate_high(self):
        """Test score exactly at 80.0 (MODERATE/HIGH boundary)"""
        assert categorize_risk(80.0) == "LOW"
        assert categorize_risk(79.999) == "MODERATE"

    def test_score_rounding(self):
        """Verify scores are rounded to 1 decimal place"""
        metrics = {
            "task_completion_rate": 0.777,
            "overdue_task_rate": 0.111,
            "training_completion_rate": 0.888,
            "doc_error_rate": 0.123,
            "doc_missing_field_rate": 0.098,
        }
        result = compute_offo_risk_score(metrics)

        # Check all scores have at most 1 decimal place
        assert result["overall_score"] == round(result["overall_score"], 1)
        assert result["components"]["task_adherence_score"] == round(
            result["components"]["task_adherence_score"], 1
        )
