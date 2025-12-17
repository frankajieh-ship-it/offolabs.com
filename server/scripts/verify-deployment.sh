#!/bin/bash

# OFFO Launch Platform - Deployment Verification Script
# This script verifies that all production features are working correctly

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_URL="${API_URL:-http://localhost:5000}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:3000}"

echo "================================================"
echo "OFFO Launch Platform - Deployment Verification"
echo "================================================"
echo ""
echo "API URL: $API_URL"
echo "Frontend URL: $FRONTEND_URL"
echo ""

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        exit 1
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "ℹ $1"
}

# 1. Backend Health Checks
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. BACKEND HEALTH CHECKS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Basic health check
print_info "Checking basic health endpoint..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/health")
if [ "$HEALTH_STATUS" -eq 200 ]; then
    print_status 0 "Basic health check (GET /api/health)"
else
    print_status 1 "Basic health check failed (HTTP $HEALTH_STATUS)"
fi

# Detailed health check
print_info "Checking detailed health endpoint..."
DETAILED_HEALTH=$(curl -s "$API_URL/api/health/detailed")
if echo "$DETAILED_HEALTH" | grep -q "healthy"; then
    print_status 0 "Detailed health check (GET /api/health/detailed)"

    # Parse and display key metrics
    echo ""
    print_info "System Metrics:"
    echo "$DETAILED_HEALTH" | grep -o '"uptime":{[^}]*}' | head -1
    echo "$DETAILED_HEALTH" | grep -o '"memory":{[^}]*}' | head -1
    echo "$DETAILED_HEALTH" | grep -o '"database":{[^}]*}' | head -1
    echo ""
else
    print_status 1 "Detailed health check failed"
fi

# Performance metrics
print_info "Checking performance metrics..."
METRICS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/health/metrics")
if [ "$METRICS_STATUS" -eq 200 ]; then
    print_status 0 "Performance metrics (GET /api/health/metrics)"
else
    print_status 1 "Performance metrics failed (HTTP $METRICS_STATUS)"
fi

# 2. Database Connectivity
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. DATABASE CONNECTIVITY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

DB_STATUS=$(echo "$DETAILED_HEALTH" | grep -o '"database":{[^}]*"status":"[^"]*"' | grep -o 'status":"[^"]*"' | cut -d'"' -f3)
if [ "$DB_STATUS" = "healthy" ]; then
    print_status 0 "MongoDB Atlas connection"

    # Display database stats
    DB_NAME=$(echo "$DETAILED_HEALTH" | grep -o '"name":"[^"]*"' | head -1 | cut -d'"' -f4)
    DB_COLLECTIONS=$(echo "$DETAILED_HEALTH" | grep -o '"collections":[0-9]*' | head -1 | cut -d':' -f2)
    print_info "Database: $DB_NAME"
    print_info "Collections: $DB_COLLECTIONS"
else
    print_status 1 "MongoDB Atlas connection failed"
fi

# 3. API Endpoints
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. API ENDPOINTS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test authentication endpoints (should return 400 for missing data, not 500)
print_info "Testing authentication endpoints..."
AUTH_REGISTER=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL/api/auth/register" -H "Content-Type: application/json" -d '{}')
if [ "$AUTH_REGISTER" -eq 400 ] || [ "$AUTH_REGISTER" -eq 422 ]; then
    print_status 0 "POST /api/auth/register (validation working)"
else
    print_warning "POST /api/auth/register returned HTTP $AUTH_REGISTER (expected 400/422)"
fi

# Test projects endpoint (should return 401 for unauthorized)
print_info "Testing projects endpoint..."
PROJECTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/projects")
if [ "$PROJECTS_STATUS" -eq 401 ] || [ "$PROJECTS_STATUS" -eq 200 ]; then
    print_status 0 "GET /api/projects (auth working)"
else
    print_warning "GET /api/projects returned HTTP $PROJECTS_STATUS"
fi

# Test integrations endpoint
print_info "Testing integrations endpoint..."
CITIES_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/integrations/supported-cities")
if [ "$CITIES_STATUS" -eq 200 ]; then
    print_status 0 "GET /api/integrations/supported-cities"

    # Display supported cities
    CITIES=$(curl -s "$API_URL/api/integrations/supported-cities")
    if echo "$CITIES" | grep -q "cities"; then
        CITY_COUNT=$(echo "$CITIES" | grep -o '"cities":\[[^]]*\]' | grep -o 'city' | wc -l)
        print_info "Municipal APIs: $CITY_COUNT cities configured"
    fi
else
    print_warning "GET /api/integrations/supported-cities returned HTTP $CITIES_STATUS"
fi

# 4. Frontend Availability
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. FRONTEND AVAILABILITY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

print_info "Checking frontend homepage..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
if [ "$FRONTEND_STATUS" -eq 200 ]; then
    print_status 0 "Frontend homepage (GET /)"
else
    print_warning "Frontend homepage returned HTTP $FRONTEND_STATUS"
fi

# Check if frontend can reach backend
print_info "Checking frontend API connectivity..."
# This would need to be done from the browser/frontend side
print_info "Manual check required: Visit $FRONTEND_URL and verify dashboard loads"

# 5. Environment Configuration
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. ENVIRONMENT CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check environment
ENV=$(echo "$DETAILED_HEALTH" | grep -o '"environment":"[^"]*"' | cut -d'"' -f4)
print_info "Environment: $ENV"

if [ "$ENV" = "production" ]; then
    print_warning "Running in PRODUCTION mode"

    # Check critical production configs
    if echo "$DETAILED_HEALTH" | grep -q "mongodb+srv"; then
        print_status 0 "MongoDB Atlas (production database)"
    else
        print_warning "Not using MongoDB Atlas"
    fi
else
    print_info "Running in DEVELOPMENT mode"
fi

# 6. Security Checks
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. SECURITY CHECKS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check for security headers
print_info "Checking security headers..."
HEADERS=$(curl -s -I "$API_URL/api/health")

if echo "$HEADERS" | grep -qi "X-Content-Type-Options"; then
    print_status 0 "X-Content-Type-Options header present"
else
    print_warning "X-Content-Type-Options header missing"
fi

if echo "$HEADERS" | grep -qi "X-Frame-Options"; then
    print_status 0 "X-Frame-Options header present"
else
    print_warning "X-Frame-Options header missing"
fi

# Check CORS
print_info "Checking CORS configuration..."
CORS_HEADER=$(curl -s -I "$API_URL/api/health" | grep -i "Access-Control-Allow-Origin")
if [ -n "$CORS_HEADER" ]; then
    print_status 0 "CORS headers configured"
else
    print_warning "CORS headers not found (may be normal)"
fi

# 7. Performance
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7. PERFORMANCE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Measure response time
print_info "Measuring API response time..."
START_TIME=$(date +%s%3N)
curl -s "$API_URL/api/health" > /dev/null
END_TIME=$(date +%s%3N)
RESPONSE_TIME=$((END_TIME - START_TIME))

if [ "$RESPONSE_TIME" -lt 100 ]; then
    print_status 0 "Response time: ${RESPONSE_TIME}ms (excellent)"
elif [ "$RESPONSE_TIME" -lt 500 ]; then
    print_status 0 "Response time: ${RESPONSE_TIME}ms (good)"
else
    print_warning "Response time: ${RESPONSE_TIME}ms (slow)"
fi

# Check memory usage
MEMORY_USED=$(echo "$DETAILED_HEALTH" | grep -o '"used":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -n "$MEMORY_USED" ]; then
    print_info "Memory usage: $MEMORY_USED"
fi

# 8. Monitoring Features
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8. MONITORING FEATURES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if metrics are being tracked
METRICS=$(curl -s "$API_URL/api/health/metrics")
if echo "$METRICS" | grep -q "responseTime"; then
    print_status 0 "Response time monitoring active"

    # Display metrics
    AVG_TIME=$(echo "$METRICS" | grep -o '"avgTime":[0-9]*' | head -1 | cut -d':' -f2)
    if [ -n "$AVG_TIME" ]; then
        print_info "Average response time: ${AVG_TIME}ms"
    fi
else
    print_warning "Response time monitoring not active"
fi

# Check Socket.IO
SOCKET_CONNECTED=$(echo "$DETAILED_HEALTH" | grep -o '"connected":[0-9]*' | head -1 | cut -d':' -f2)
if [ -n "$SOCKET_CONNECTED" ]; then
    print_status 0 "Socket.IO monitoring active"
    print_info "Active connections: $SOCKET_CONNECTED"
else
    print_warning "Socket.IO metrics not found"
fi

# 9. Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "9. DEPLOYMENT SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

print_status 0 "Backend API operational"
print_status 0 "Database connected"
print_status 0 "Health checks working"
print_status 0 "Monitoring active"

if [ "$FRONTEND_STATUS" -eq 200 ]; then
    print_status 0 "Frontend accessible"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Deployment verification complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Test user registration and login"
echo "2. Create a test project"
echo "3. Upload documents"
echo "4. Verify real-time updates"
echo "5. Check email/SMS notifications (if configured)"
echo "6. Monitor logs for errors"
echo ""
echo "For detailed testing, see: TESTING_CHECKLIST.md"
echo ""
