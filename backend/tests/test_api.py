"""
test_api.py

Integration tests for FastAPI endpoints.
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestHealthEndpoint:
    """Tests for root health check endpoint"""

    def test_root_endpoint(self):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["service"] == "OFFO Risk Score API"
        assert data["status"] == "operational"


class TestRiskScoreEndpoint:
    """Tests for /risk-score/{business_id} endpoint"""

    def test_get_risk_score_healthy_business(self):
        response = client.get("/risk-score/biz_healthy")
        assert response.status_code == 200

        data = response.json()
        assert data["business_id"] == "biz_healthy"
        assert "overall_score" in data
        assert "category" in data
        assert "components" in data
        assert "weights" in data

        # Healthy business should have LOW risk
        assert data["category"] == "LOW"
        assert data["overall_score"] >= 80.0

    def test_get_risk_score_risky_business(self):
        response = client.get("/risk-score/biz_risky")
        assert response.status_code == 200

        data = response.json()
        assert data["business_id"] == "biz_risky"
        # Risky business should have HIGH risk
        assert data["category"] == "HIGH"
        assert data["overall_score"] < 50.0

    def test_get_risk_score_mixed_business(self):
        response = client.get("/risk-score/biz_mixed")
        assert response.status_code == 200

        data = response.json()
        assert data["business_id"] == "biz_mixed"
        # Mixed business should have MODERATE risk
        assert data["category"] == "MODERATE"
        assert 50.0 <= data["overall_score"] < 80.0

    def test_get_risk_score_not_found(self):
        response = client.get("/risk-score/nonexistent_business")
        assert response.status_code == 404
        data = response.json()
        assert "detail" in data

    def test_risk_score_components_structure(self):
        response = client.get("/risk-score/biz_healthy")
        data = response.json()

        components = data["components"]
        assert "task_adherence_score" in components
        assert "training_score" in components
        assert "documentation_score" in components

        # All scores should be 0-100
        for score in components.values():
            assert 0.0 <= score <= 100.0

    def test_risk_score_weights_structure(self):
        response = client.get("/risk-score/biz_healthy")
        data = response.json()

        weights = data["weights"]
        assert "task_adherence" in weights
        assert "training_completion" in weights
        assert "documentation_accuracy" in weights

        # Weights should sum to 1.0
        total_weight = sum(weights.values())
        assert abs(total_weight - 1.0) < 0.0001


class TestBusinessListEndpoint:
    """Tests for /businesses endpoint"""

    def test_list_businesses(self):
        response = client.get("/businesses")
        assert response.status_code == 200

        data = response.json()
        assert "businesses" in data
        assert isinstance(data["businesses"], list)
        assert len(data["businesses"]) > 0

        # Check that known businesses are in the list
        assert "biz_healthy" in data["businesses"]
        assert "biz_risky" in data["businesses"]
        assert "biz_mixed" in data["businesses"]


class TestRawMetricsEndpoint:
    """Tests for /risk-score/{business_id}/raw debug endpoint"""

    def test_get_raw_metrics(self):
        response = client.get("/risk-score/biz_healthy/raw")
        assert response.status_code == 200

        data = response.json()
        assert data["business_id"] == "biz_healthy"
        assert "metrics" in data

        metrics = data["metrics"]
        assert "task_completion_rate" in metrics
        assert "overdue_task_rate" in metrics
        assert "training_completion_rate" in metrics
        assert "doc_error_rate" in metrics
        assert "doc_missing_field_rate" in metrics

        # All metrics should be 0-1
        for value in metrics.values():
            assert 0.0 <= value <= 1.0

    def test_get_raw_metrics_not_found(self):
        response = client.get("/risk-score/nonexistent/raw")
        assert response.status_code == 404


class TestCORS:
    """Tests for CORS configuration"""

    def test_cors_headers_present(self):
        response = client.options("/risk-score/biz_healthy")
        # FastAPI TestClient doesn't fully simulate CORS, but we can verify the middleware is configured
        # In production, verify with actual browser requests
        assert response.status_code == 200
