#!/bin/bash

# Script to apply frontend auth integration
# This fixes the frontend to work with the newly enforced JWT authentication

echo "Applying frontend auth integration..."

# Backup original files
cp frontend/app/page.tsx frontend/app/page.tsx.backup
cp frontend/components/RiskDashboard.tsx frontend/components/RiskDashboard.tsx.backup

echo "✅ Backups created"

# Instructions for manual updates
echo ""
echo "========================================="
echo "MANUAL UPDATE REQUIRED"
echo "========================================="
echo ""
echo "UPDATE 1: frontend/app/page.tsx"
echo "--------------------------------"
echo ""
echo "1. Add import at line 5:"
echo "   import { authService } from '@/lib/auth';"
echo ""
echo "2. Replace line 49:"
echo "   FROM: const response = await fetch(\`\${API_BASE_URL}/risk-score/\${id}\`);"
echo "   TO:   const response = await authService.fetchWithAuth(\`\${API_BASE_URL}/risk-score/\${id}\`);"
echo ""
echo ""
echo "UPDATE 2: frontend/components/RiskDashboard.tsx"
echo "------------------------------------------------"
echo ""
echo "1. Add import after line 4:"
echo "   import { authService } from '@/lib/auth';"
echo ""
echo "2. Replace line 43:"
echo "   FROM: const response = await fetch(\`\${API_BASE_URL}/risk-score/\${businessId}\`);"
echo "   TO:   const response = await authService.fetchWithAuth(\`\${API_BASE_URL}/risk-score/\${businessId}\`);"
echo ""
echo "3. Replace line 63:"
echo "   FROM: const response = await fetch(\`\${API_BASE_URL}/risk-score/\${businessId}/pdf\`);"
echo "   TO:   const response = await authService.fetchWithAuth(\`\${API_BASE_URL}/risk-score/\${businessId}/pdf\`);"
echo ""
echo ""
echo "========================================="
echo "After making these changes:"
echo "1. Save both files"
echo "2. Frontend will hot-reload automatically"
echo "3. Test at http://localhost:3000"
echo "========================================="
echo ""
echo "Auth service is ready at: frontend/lib/auth.ts"
echo "Backend is running with JWT enforcement"
echo ""
