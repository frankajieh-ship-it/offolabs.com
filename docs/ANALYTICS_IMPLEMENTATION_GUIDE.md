# Analytics Implementation Guide

**Document:** FE–SERV–010 (Analytics)
**Status:** Ready for Implementation
**Estimated Effort:** 2-3 hours

This guide details how to implement Google Analytics 4 (GA4) event tracking for the services page intake form.

---

## Overview

Analytics tracking enables us to understand:
- Which CTAs drive the most form submissions
- Where visitors drop off in the form
- Service type preferences
- Email delivery success rates
- Form error patterns

---

## Implementation Architecture

### Tech Stack
- **Analytics Platform:** Google Analytics 4 (GA4)
- **Implementation:** gtag.js (global site tag)
- **Events:** Custom events for intake form actions
- **Tracking ID:** UA-XXXXXXXXX-X or G-XXXXXXXXX

### Event Taxonomy

All events should follow this naming pattern:
```
services_[action]
```

Example: `services_intake_submitted`

---

## Step 1: Set Up Google Analytics

### Prerequisites
- Google Analytics 4 property created
- Tracking ID obtained (e.g., G-XXXXXXXXX)
- Access to GTM (Google Tag Manager) or direct gtag.js setup

### Option A: Using Next.js Google Analytics Package (Recommended)

1. Install package:
```bash
npm install @next/third-parties
```

2. Update `app/layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Option B: Manual gtag.js Setup

1. Add script to `app/layout.tsx`:
```tsx
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"
></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXX');
    `,
  }}
></script>
```

---

## Step 2: Define Custom Events

Create `lib/analytics/events.ts`:

```typescript
/**
 * Analytics event tracking for services page
 */

export interface AnalyticsEvent {
  event: string
  [key: string]: any
}

/**
 * Track when user clicks a CTA button
 */
export function trackCTAClick(ctaType: 'hero' | 'modules' | 'final', action: 'project' | 'consultation') {
  gtag('event', 'services_cta_clicked', {
    cta_location: ctaType,
    cta_action: action,
    page: '/services',
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track when intake form section comes into view
 */
export function trackIntakeSectionViewed() {
  gtag('event', 'services_intake_viewed', {
    section: 'intake_form',
    page: '/services',
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track when user selects a service type
 */
export function trackServiceTypeSelected(serviceType: string) {
  gtag('event', 'services_service_type_selected', {
    service_type: serviceType,
    page: '/services',
  })
}

/**
 * Track when user fills a form field
 */
export function trackFormFieldInteraction(fieldName: string) {
  gtag('event', 'services_form_field_focused', {
    field_name: fieldName,
    page: '/services',
  })
}

/**
 * Track form validation errors
 */
export function trackFormValidationError(fieldName: string, errorMessage: string) {
  gtag('event', 'services_form_validation_error', {
    field_name: fieldName,
    error_message: errorMessage,
    page: '/services',
  })
}

/**
 * Track successful form submission
 */
export function trackFormSubmissionSuccess(data: {
  serviceType: string
  hasCompany: boolean
  hasBudget: boolean
  hasTimeline: boolean
}) {
  gtag('event', 'services_intake_submitted', {
    service_type: data.serviceType,
    has_company: data.hasCompany,
    has_budget: data.hasBudget,
    has_timeline: data.hasTimeline,
    page: '/services',
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track form submission errors
 */
export function trackFormSubmissionError(errorMessage: string) {
  gtag('event', 'services_intake_submission_failed', {
    error_message: errorMessage,
    page: '/services',
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track email delivery status
 */
export function trackEmailDelivery(emailType: 'user_confirmation' | 'support_notification', success: boolean) {
  gtag('event', 'services_email_delivery', {
    email_type: emailType,
    delivery_status: success ? 'success' : 'failed',
    page: '/services',
    timestamp: new Date().toISOString(),
  })
}

/**
 * Declare gtag global
 */
declare function gtag(...args: any[]): void
```

---

## Step 3: Add CTA Click Tracking

Update [HeroSection.tsx](app/components/sections/services/HeroSection.tsx):

```tsx
'use client'

import { useScrollTo } from '@/lib/hooks/useScrollTo'
import { trackCTAClick } from '@/lib/analytics/events'

export function HeroSection() {
  const scrollTo = useScrollTo()

  const handleCtaClick = (action: 'project' | 'consultation') => {
    // Track analytics
    trackCTAClick('hero', action)

    // Set sessionStorage for prefill
    if (action === 'consultation') {
      sessionStorage.setItem('consultationRequested', 'true')
    } else {
      sessionStorage.removeItem('consultationRequested')
    }

    scrollTo('intake')
  }

  return (
    // ... JSX
  )
}
```

Apply same pattern to [ServiceModules.tsx](app/components/sections/services/ServiceModules.tsx) and [FinalCTASection.tsx](app/components/sections/services/FinalCTASection.tsx).

---

## Step 4: Track Section Views

Create `lib/hooks/useIntersectionObserver.ts`:

```tsx
'use client'

import { useEffect, useRef } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  onVisible?: () => void
}

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const { threshold = 0.5, rootMargin = '0px', onVisible } = options
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && onVisible) {
        onVisible()
        // Optional: unobserve after first trigger
        observer.unobserve(entry.target)
      }
    }, { threshold, rootMargin })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin, onVisible])

  return ref
}
```

Update [ServicesIntakeForm.tsx](app/components/sections/services/ServicesIntakeForm.tsx):

```tsx
'use client'

import { useEffect } from 'react'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'
import { trackIntakeSectionViewed, trackFormSubmissionSuccess } from '@/lib/analytics/events'

export default function ServicesIntakeForm() {
  // Track when intake section becomes visible
  const sectionRef = useIntersectionObserver({
    threshold: 0.3,
    onVisible: () => {
      trackIntakeSectionViewed()
    },
  })

  // ... rest of form code

  const handleSubmit = async (e: React.FormEvent) => {
    // ... validation code

    try {
      // ... submission code

      // Track successful submission
      trackFormSubmissionSuccess({
        serviceType: formData.serviceType,
        hasCompany: !!formData.company,
        hasBudget: !!formData.budget,
        hasTimeline: !!formData.timeline,
      })
    } catch (error) {
      // Track error
      trackFormSubmissionError(error.message)
    }
  }

  return (
    <form ref={sectionRef}>
      {/* form fields */}
    </form>
  )
}
```

---

## Step 5: Track Form Field Interactions

Update form field components to track interactions:

```tsx
// In InputText.tsx or similar
export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ onChange, onFocus, ...props }, ref) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Track field focus
      if (props.name) {
        trackFormFieldInteraction(props.name)
      }
      onFocus?.(e)
    }

    return (
      <input
        {...props}
        ref={ref}
        onFocus={handleFocus}
        onChange={onChange}
      />
    )
  }
)
```

---

## Step 6: Track Validation Errors

Update form error handling:

```tsx
// In ServicesIntakeForm.tsx
const handleFieldChange = (fieldName: string, value: string) => {
  setFormData((prev) => ({
    ...prev,
    [fieldName]: value,
  }))

  // Clear error on change
  if (errors[fieldName]) {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: '',
    }))
  }
}

const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.name?.trim()) {
    const msg = 'Name is required'
    newErrors.name = msg
    trackFormValidationError('name', msg)
  }

  if (!formData.email?.trim()) {
    const msg = 'Email is required'
    newErrors.email = msg
    trackFormValidationError('email', msg)
  }

  // ... other validation

  return newErrors
}
```

---

## Step 7: Track Email Delivery

Update [app/api/services/intake/route.ts](app/api/services/intake/route.ts):

```typescript
// In POST handler
export async function POST(request: NextRequest) {
  // ... validation code

  try {
    // Send user confirmation email
    const userEmailResult = await sendUserConfirmationEmail(intakeData)

    // Note: Can't call gtag directly from server, use server events instead
    // This will be handled client-side via response

    if (!userEmailResult.success) {
      console.warn('Failed to send user email:', userEmailResult.error)
    }

    // Send support notification
    const supportEmailResult = await sendSupportNotificationEmail(intakeData)

    if (!supportEmailResult.success) {
      console.warn('Failed to send support email:', supportEmailResult.error)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Services intake form submitted successfully',
        data: {
          id: mockId,
          email: body.email,
          serviceType: body.serviceType,
          submittedAt: new Date().toISOString(),
        },
        emailStatus: {
          userEmail: userEmailResult.success ? 'sent' : 'failed',
          supportEmail: supportEmailResult.success ? 'sent' : 'failed',
        },
      },
      { status: 201 }
    )
  } catch (error) {
    // ... error handling
  }
}
```

Update client-side submission handler:

```tsx
// In ServicesIntakeForm.tsx handleSubmit
const response = await fetch('/api/services/intake', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})

const result = await response.json()

if (result.success) {
  // Track email delivery
  if (result.emailStatus?.userEmail === 'sent') {
    trackEmailDelivery('user_confirmation', true)
  }
  if (result.emailStatus?.supportEmail === 'sent') {
    trackEmailDelivery('support_notification', true)
  }

  trackFormSubmissionSuccess({
    serviceType: formData.serviceType,
    hasCompany: !!formData.company,
    hasBudget: !!formData.budget,
    hasTimeline: !!formData.timeline,
  })
} else {
  trackFormSubmissionError(result.message)
}
```

---

## Step 8: Set Up Google Analytics Dashboard

### 1. Create Custom Event Reports

In Google Analytics 4:
1. Navigate to: Admin → Properties → Custom definitions
2. Create custom metrics:
   - `services_cta_clicked`
   - `services_intake_viewed`
   - `services_intake_submitted`
   - `services_intake_submission_failed`

### 2. Create Custom Dashboard

1. Go to: Reports → Library
2. Create new dashboard: "Services Intake Analysis"
3. Add cards:
   - **CTA Performance**: Count by `cta_location` and `cta_action`
   - **Intake Views**: Count of `services_intake_viewed`
   - **Submission Success Rate**: Successful vs failed submissions
   - **Service Type Distribution**: Count by `service_type`
   - **Validation Error Patterns**: Top 10 error types
   - **Email Delivery Status**: Count by `delivery_status`

### 3. Set Up Conversion Goals

1. Admin → Conversions → New conversion event
2. Create conversion: `services_intake_submitted`
3. Set up conversion value: Optional (can be tied to lead scoring)

---

## Step 9: Testing Analytics Implementation

### Local Testing with DebugView

1. Open DevTools → Application → Cookies
2. Set cookie: `_ga_debug=true` (varies by GA4 setup)
3. Go to Google Analytics → Realtime report
4. Perform actions on services page
5. Verify events appear in Realtime dashboard within 5 seconds

### Using gtag DebugView

```typescript
// Temporarily enable debug view
if (process.env.NODE_ENV === 'development') {
  window['gtag']('config', 'G-XXXXXXXXX', { debug_mode: true })
}
```

### Console Validation

```javascript
// In browser console
// Verify gtag function exists
console.log(typeof gtag)

// Send test event
gtag('event', 'test_event', { test: true })

// Check dataLayer
console.log(window.dataLayer)
```

---

## Step 10: Data Queries & Reporting

### Query Examples (BigQuery)

If exporting GA4 data to BigQuery:

```sql
-- Get daily intake submissions
SELECT
  PARSE_DATE('%Y%m%d', event_date) as date,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) as total_events,
  APPROX_QUANTILES(event_value, 100)[OFFSET(50)] as median_value
FROM `project.dataset.events_*`
WHERE event_name = 'services_intake_submitted'
GROUP BY date
ORDER BY date DESC
```

```sql
-- CTA effectiveness analysis
SELECT
  event_params[SAFE.OFFSET(0)].value.string_value as cta_location,
  event_params[SAFE.OFFSET(1)].value.string_value as cta_action,
  COUNT(*) as clicks
FROM `project.dataset.events_*`
WHERE event_name = 'services_cta_clicked'
GROUP BY cta_location, cta_action
ORDER BY clicks DESC
```

### Data Studio Reports

Create Data Studio dashboard connecting to GA4:
1. Create Data Studio report
2. Add GA4 as data source
3. Create visualizations for:
   - CTA conversion funnel
   - Service type preferences
   - Form completion rate
   - Error rate over time
   - Daily submissions trend

---

## Step 11: Production Rollout

### Pre-Launch Checklist
- [ ] Tracking ID verified in code
- [ ] All events tested in DebugView
- [ ] Events appear in Realtime dashboard
- [ ] Custom events defined in GA4
- [ ] Dashboard created and verified
- [ ] Team has access to GA4 property
- [ ] Data retention policy set (13 months minimum)

### Launch Steps
1. Deploy to production
2. Monitor Realtime dashboard for 24 hours
3. Verify event data flowing correctly
4. Document event taxonomy in team wiki
5. Set up weekly analytics review

---

## Step 12: Ongoing Maintenance

### Weekly Reviews
- [ ] Check for unusual event volumes
- [ ] Review validation error trends
- [ ] Monitor CTA performance

### Monthly Analysis
- [ ] Generate analytics report
- [ ] Identify service type trends
- [ ] Calculate form conversion rates
- [ ] Document insights and recommendations

### Quarterly Deep Dives
- [ ] Analyze full conversion funnels
- [ ] Identify drop-off points
- [ ] Recommend UX improvements
- [ ] Plan A/B tests if applicable

---

## Event Reference

### Complete Event List

| Event | Fired When | Properties | Priority |
|-------|-----------|-----------|----------|
| `services_cta_clicked` | User clicks any CTA button | `cta_location`, `cta_action` | High |
| `services_intake_viewed` | Form section scrolled into view | `section` | High |
| `services_service_type_selected` | User selects service type | `service_type` | Medium |
| `services_form_field_focused` | User focuses on form field | `field_name` | Low |
| `services_form_validation_error` | Validation error occurs | `field_name`, `error_message` | Medium |
| `services_intake_submitted` | Form submitted successfully | `service_type`, `has_company`, `has_budget`, `has_timeline` | High |
| `services_intake_submission_failed` | Form submission fails | `error_message` | High |
| `services_email_delivery` | Email sent/failed | `email_type`, `delivery_status` | Medium |

---

## Troubleshooting

### Events Not Appearing in Analytics

1. **Check tracking ID**
   - Verify GA4 property ID in code
   - Confirm ID matches Google Analytics dashboard

2. **Clear browser cache**
   ```bash
   # Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
   ```

3. **Check consent mode**
   - Verify analytics consent cookie set
   - Check cookie consent implementation

4. **Verify network requests**
   - DevTools → Network tab
   - Search for `google-analytics` or `gtag`
   - Check response status is 200

### Events Appear But with Wrong Values

1. **Check event properties**
   - Verify property values in gtag calls
   - Check for null/undefined values

2. **Event data type mismatch**
   - String properties must be strings
   - Number properties must be numbers

3. **Property name case sensitivity**
   - GA4 property names are case-sensitive
   - Verify exact spelling

---

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [gtag.js Reference](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [GA4 Event Specification](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Data Studio Getting Started](https://support.google.com/datastudio/answer/6283323)

---

**Status:** Ready for Implementation
**Estimated Duration:** 2-3 hours
**Complexity:** Medium
**Dependencies:** Google Analytics 4 account and property
