# ⚠️ URGENT: Frontend Auth Integration Required

## Current Status: FRONTEND BROKEN

The backend authorization is now **correctly enforced**, which means the frontend can no longer access `/risk-score/*` endpoints without authentication.

**Current Error:**
```
Unable to Load Risk Scores
Error: Failed to fetch score for biz_healthy
```

---

## Quick Fix Options

### Option 1: Temporarily Disable Auth (For Demo Only - NOT RECOMMENDED)

Remove `token_data: TokenData = Depends(verify_token)` from endpoints temporarily:

```python
# TEMPORARY - Remove this line from main.py endpoints
token_data: TokenData = Depends(verify_token)  # ❌ Remove for demo
```

**Risk:** Exposes all endpoints publicly again.

---

### Option 2: Implement Frontend Auth Integration (RECOMMENDED)

Create authentication service and update all API calls.

**Step 1: Create Auth Service** (`frontend/lib/auth.ts`):

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class AuthService {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  async getToken(): Promise<string> {
    // Check if existing token is still valid
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    // Fetch new token from backend
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token?client_id=demo_client`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to obtain authentication token');
      }

      const data = await response.json();
      this.token = data.access_token;
      // Set expiry 1 minute before actual expiry for safety
      this.tokenExpiry = Date.now() + ((data.expires_in - 60) * 1000);

      return this.token;
    } catch (error) {
      console.error('Token fetch error:', error);
      throw new Error('Authentication service unavailable');
    }
  }

  async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = await this.getToken();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    });

    // If 401, token might have expired - try once more with fresh token
    if (response.status === 401) {
      this.token = null; // Invalidate cached token
      const freshToken = await this.getToken();

      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${freshToken}`
        }
      });
    }

    return response;
  }
}

export const authService = new AuthService();
```

**Step 2: Update `frontend/app/page.tsx`** (Homepage):

```typescript
// Add import
import { authService } from '@/lib/auth';

// Update fetchBusinessScores function
const fetchBusinessScores = async () => {
  setLoading(true);
  setError(null);

  try {
    // Fetch business list (public endpoint)
    const businessList = await fetch(`${API_BASE_URL}/businesses`);
    const { businesses } = await businessList.json();

    // Fetch scores for each business with authentication
    const businessData = await Promise.all(
      businesses.slice(0, 5).map(async (id: string) => {
        try {
          // Use authService for authenticated requests
          const response = await authService.fetchWithAuth(
            `${API_BASE_URL}/risk-score/${id}`
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          return {
            id,
            name: businessMetadata[id as keyof typeof businessMetadata] || id,
            score: Math.round(data.overall_score),
            category: data.category,
            ...getCategoryStyles(data.category),
          };
        } catch (err) {
          console.error(`Failed to fetch score for ${id}:`, err);
          throw err; // Re-throw to be caught by outer catch
        }
      })
    );

    businessData.sort((a, b) => b.score - a.score);
    setBusinesses(businessData);
    setLastUpdated(new Date());
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load data');
  } finally {
    setLoading(false);
  }
};
```

**Step 3: Update `frontend/components/RiskDashboard.tsx`**:

```typescript
// Add import at top
import { authService } from '@/lib/auth';

// Update fetchRiskScore function
const fetchRiskScore = async () => {
  setLoading(true);
  setError(null);

  try {
    // Use authService for authenticated request
    const response = await authService.fetchWithAuth(
      `${API_BASE_URL}/risk-score/${businessId}`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please contact your administrator.');
      }
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    setRiskData(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to fetch risk score');
  } finally {
    setLoading(false);
  }
};

// Update exportToPDF function
const exportToPDF = async () => {
  if (!businessId) return;

  try {
    // Use authService for PDF download
    const response = await authService.fetchWithAuth(
      `${API_BASE_URL}/risk-score/${businessId}/pdf`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please contact your administrator.');
      }
      throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OFFO_Risk_Report_${businessId}_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('PDF export failed:', err);
    alert(err instanceof Error ? err.message : 'Failed to export PDF. Please try again.');
  }
};
```

**Step 4: Create the lib directory and auth file**:

```bash
mkdir frontend/lib
# Then create frontend/lib/auth.ts with the AuthService code above
```

---

## Implementation Checklist

- [ ] Create `frontend/lib/auth.ts` with AuthService class
- [ ] Update `frontend/app/page.tsx` to use `authService.fetchWithAuth()`
- [ ] Update `frontend/components/RiskDashboard.tsx` to use `authService.fetchWithAuth()`
- [ ] Test homepage loads correctly
- [ ] Test dashboard loads correctly
- [ ] Test PDF export works
- [ ] Test error handling for 401 responses
- [ ] Verify token refresh works automatically

---

## Testing After Implementation

```bash
# 1. Start backend (already running with auth enforced)
cd backend && python main.py

# 2. Start frontend
cd frontend && npm run dev

# 3. Open browser to http://localhost:3000

# Expected behavior:
# - Homepage loads business cards successfully
# - Each card shows correct scores
# - Clicking a business opens dashboard
# - Dashboard shows full risk data
# - PDF export button works
# - All requests include Authorization header
```

---

## Current Error Explanation

**Why it's broken:**
1. Backend now requires `Authorization: Bearer <token>` header on all `/risk-score/*` endpoints ✅
2. Frontend is still making requests without auth headers ❌
3. Backend returns 401 Unauthorized
4. Frontend displays generic error message

**What the user sees:**
> "Unable to Load Risk Scores - We're experiencing difficulty connecting to the risk scoring system."

**What's actually happening:**
> Frontend: `GET /risk-score/biz_healthy` (no auth header)
> Backend: `401 {"detail": "Not authenticated"}`
> Frontend: Catches error, shows user-friendly message

---

## Estimated Time to Fix

- **Option 1 (Temporary disable auth):** 5 minutes ⚠️ NOT RECOMMENDED
- **Option 2 (Proper auth integration):** 30-45 minutes ✅ RECOMMENDED

---

## Current State Summary

**Backend:** ✅ Secure, production-ready with JWT enforcement
**Frontend:** ❌ Broken, needs auth integration
**Demo Ready:** ❌ Not until frontend auth is integrated

**Priority:** 🔥 **CRITICAL** - Cannot demo without this fix
