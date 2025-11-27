# Services Page Analytics Tracking Guide

**Document:** Engineering Notes - Analytics Implementation
**Status:** Ready for Implementation
**Last Updated:** November 23, 2024

---

## Overview

Complete analytics tracking strategy for the `/services` page and services intake form. Implements event-driven tracking using Google Analytics (gtag) to monitor user behavior, conversion funnels, and feature adoption.

---

## Analytics Architecture

### Current Setup
- **Provider:** Google Analytics 4
- **Implementation:** gtag (Global Site Tag)
- **Status:** Already integrated on all pages

### Event Structure
```typescript
gtag('event', 'event_name', {
  property_key: 'property_value',
  another_property: 'another_value'
})
```

---

## Core Events

### 1. Page Load Events

#### `page_view` (Automatic)
- **When:** Page loads
- **Source:** gtag automatic tracking
- **Properties:**
  - `page_title`: "Services - AI Product Development & Consultation | OFFO Labs"
  - `page_location`: "https://offodlabs.com/services"
  - `page_path`: "/services"

**Dashboard View:** Audience → Overview

---

### 2. Section Impression Events

#### `services_intro_viewed`
- **When:** User scrolls ServiceIntroSection into view
- **Implementation:** Intersection Observer in component
- **Properties:**
  ```typescript
  {
    section: 'services_intro',
    section_title: 'What OFFO Labs Offers'
  }
  ```

#### `services_modules_viewed`
- **When:** User scrolls ServiceModules into view
- **Properties:**
  ```typescript
  {
    section: 'services_modules',
    service_count: 3
  }
  ```

#### `case_studies_viewed`
- **When:** User scrolls CaseStudiesSection into view
- **Properties:**
  ```typescript
  {
    section: 'case_studies',
    case_study_count: 4
  }
  ```

#### `services_intake_viewed`
- **When:** User scrolls ServiceIntakeCTA (#intake) into view
- **Currently Implemented:** ✅ Yes
- **Properties:**
  ```typescript
  {
    section: 'services_intake'
  }
  ```

#### `final_cta_viewed`
- **When:** User scrolls FinalCTASection into view
- **Properties:**
  ```typescript
  {
    section: 'final_cta',
    section_title: 'Ready to build with OFFO Labs?'
  }
  ```

**Dashboard View:** Engagement → Events

---

### 3. CTA Interaction Events

#### `hero_cta_clicked`
- **When:** User clicks "Start a Project" or "Request Consultation" in hero
- **Properties:**
  ```typescript
  {
    cta_type: 'primary' | 'secondary',
    cta_label: 'Start a Project' | 'Request Consultation',
    action_type: 'project' | 'consultation',
    section: 'hero'
  }
  ```

#### `service_module_cta_clicked`
- **When:** User clicks CTA in service module card
- **Properties:**
  ```typescript
  {
    cta_label: 'Start a Project' | 'Request Consultation',
    action_type: 'project' | 'consultation',
    service_type: 'product-development' | 'consultation' | 'full-execution',
    service_name: 'AI-Accelerated Product Development', // etc
    module_index: 0 | 1 | 2
  }
  ```

#### `case_study_clicked`
- **When:** User clicks on a case study card
- **Properties:**
  ```typescript
  {
    case_study_name: 'CodeCrack' | 'Renov.AI' | 'Engine Acoustic AI' | 'OFFO AI Systems',
    case_study_index: 0 | 1 | 2 | 3
  }
  ```

#### `final_cta_clicked`
- **When:** User clicks CTA in Final CTA section
- **Properties:**
  ```typescript
  {
    cta_label: 'Start a Project' | 'Request Consultation',
    action_type: 'project' | 'consultation',
    section: 'final_cta'
  }
  ```

---

### 4. Form Interaction Events

#### `intake_form_viewed`
- **When:** Form comes into view (already implemented as `services_intake_viewed`)
- **Properties:**
  ```typescript
  {
    section: 'services_intake'
  }
  ```

#### `intake_field_focused`
- **When:** User focuses on form field (optional, high-frequency)
- **Properties:**
  ```typescript
  {
    field_name: 'name' | 'email' | 'company' | 'serviceType' | 'budget' | 'timeline' | 'description'
  }
  ```

#### `intake_field_filled`
- **When:** User completes a field (optional)
- **Properties:**
  ```typescript
  {
    field_name: 'serviceType' | 'budget' | etc,
    field_value: 'consultation' | 'under-50k' | etc // Only if not sensitive
  }
  ```

#### `intake_service_type_selected`
- **When:** User selects a service type (important)
- **Properties:**
  ```typescript
  {
    service_type: 'product-development' | 'consultation' | 'full-execution' | 'other',
    prefilled: true | false // Was it auto-selected?
  }
  ```

#### `intake_validation_error`
- **When:** Form validation fails on submit attempt
- **Properties:**
  ```typescript
  {
    error_fields: ['name', 'email'], // Array of fields with errors
    error_count: 2,
    user_interaction_count: 1 // How many submit attempts?
  }
  ```

#### `services_intake_submitted`
- **When:** Form submits successfully
- **Currently Implemented:** ✅ Yes
- **Properties:**
  ```typescript
  {
    serviceType: 'product-development' | 'consultation' | 'full-execution' | 'other',
    source: 'services_page',
    company_provided: true | false,
    budget_provided: true | false,
    timeline_provided: true | false
  }
  ```

#### `services_intake_error`
- **When:** Form submission fails (network/server error)
- **Currently Implemented:** ✅ Yes
- **Properties:**
  ```typescript
  {
    error: 'Network timeout' | 'Server error' | 'Invalid response',
    error_type: 'network' | 'validation' | 'server',
    http_status: 500 | 400 | 0 // If known
  }
  ```

#### `intake_success_shown`
- **When:** Success message displays after submission
- **Properties:**
  ```typescript
  {
    submission_id: 'si_1700000000000_abc123', // From response
    display_time: 5000 // How long shown in ms
  }
  ```

---

### 5. Email Delivery Events

#### `confirmation_email_sent`
- **When:** User confirmation email successfully sent
- **Properties:**
  ```typescript
  {
    email_type: 'confirmation',
    recipient_email: '[email protected]',
    email_provider: 'resend' | 'sendgrid' | 'smtp' | 'log-only',
    delivery_time_ms: 1234
  }
  ```

#### `support_email_sent`
- **When:** Internal support notification successfully sent
- **Properties:**
  ```typescript
  {
    email_type: 'internal_notification',
    recipient_email: '[email protected]',
    email_provider: 'resend' | 'sendgrid' | 'smtp' | 'log-only',
    delivery_time_ms: 1234
  }
  ```

#### `email_delivery_failed`
- **When:** Email sending fails
- **Properties:**
  ```typescript
  {
    email_type: 'confirmation' | 'internal_notification',
    email_provider: 'resend' | 'sendgrid' | 'smtp' | 'log-only',
    error_message: 'API rate limit exceeded'
  }
  ```

---

## Implementation Guide

### Step 1: Verify gtag is Loaded

```typescript
// Check in browser console
if (typeof gtag === 'function') {
  console.log('✅ gtag is loaded')
} else {
  console.error('❌ gtag not loaded')
}
```

### Step 2: Add Hero CTA Events

**File:** `app/components/sections/services/HeroSection.tsx`

```typescript
'use client'

import { useScrollTo } from '@/lib/hooks/useScrollTo'
import { useState } from 'react'

export function HeroSection() {
  const scrollTo = useScrollTo()
  const [consultationRequested, setConsultationRequested] = useState(false)

  const handleProjectClick = () => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_cta_clicked', {
        cta_type: 'primary',
        cta_label: 'Start a Project',
        action_type: 'project',
        section: 'hero'
      })
    }
    sessionStorage.removeItem('consultationRequested')
    scrollTo('intake')
  }

  const handleConsultationClick = () => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_cta_clicked', {
        cta_type: 'secondary',
        cta_label: 'Request Consultation',
        action_type: 'consultation',
        section: 'hero'
      })
    }
    setConsultationRequested(true)
    sessionStorage.setItem('consultationRequested', 'true')
    scrollTo('intake')
  }

  return (
    // ... JSX with button handlers
  )
}
```

### Step 3: Add Service Module CTA Events

**File:** `app/components/sections/services/ServiceModules.tsx`

```typescript
const handleCtaClick = (action: 'project' | 'consultation', serviceName: string, serviceIndex: number) => {
  // Track analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'service_module_cta_clicked', {
      cta_label: action === 'project' ? 'Start a Project' : 'Request Consultation',
      action_type: action,
      service_name: serviceName,
      service_type: serviceIndex === 1 ? 'consultation' : 'product-development',
      module_index: serviceIndex
    })
  }

  if (action === 'consultation') {
    sessionStorage.setItem('consultationRequested', 'true')
  } else {
    sessionStorage.removeItem('consultationRequested')
  }
  scrollTo('intake')
}
```

### Step 4: Add Section Impression Events

**Pattern:** Use Intersection Observer

```typescript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Track view
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'section_name_viewed', {
            section: 'section_identifier'
          })
        }
        // Unobserve to avoid duplicate tracking
        observer.unobserve(entry.target)
      }
    })
  })

  const element = document.getElementById('section-id')
  if (element) observer.observe(element)

  return () => observer.disconnect()
}, [])
```

### Step 5: Add Form Events

**File:** `app/components/sections/services/ServicesIntakeForm.tsx`

```typescript
// On service type selection
const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newValue = e.target.value

  // Track
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'intake_service_type_selected', {
      service_type: newValue,
      prefilled: false // or true if from CTA
    })
  }

  setFormData(prev => ({
    ...prev,
    serviceType: newValue
  }))
}

// On validation error
if (!validateForm()) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'intake_validation_error', {
      error_fields: Object.keys(errors),
      error_count: Object.keys(errors).length
    })
  }
  return
}

// On successful submission (already implemented)
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'services_intake_submitted', {
    serviceType: formData.serviceType,
    source: 'services_page'
  })
}
```

---

## Google Analytics Dashboard Setup

### Create Custom Dashboard

1. Go to Google Analytics 4 → Dashboards
2. Create new dashboard: "Services Page Analytics"
3. Add cards:

#### Card 1: Form Submission Funnel
- Type: Exploration → Funnel Analysis
- Events: `services_intake_viewed` → `services_intake_submitted`
- Shows: Conversion rate from viewing form to submission

#### Card 2: CTA Clicks by Type
- Type: Standard → Event count
- Event: `hero_cta_clicked`, `service_module_cta_clicked`, `final_cta_clicked`
- Dimensions: `action_type` (project vs consultation)

#### Card 3: Service Type Distribution
- Type: Standard → User count
- Event: `services_intake_submitted`
- Dimensions: `serviceType`
- Shows: Which services are most popular

#### Card 4: Error Rate
- Type: Standard → Event count
- Event: `intake_validation_error`, `services_intake_error`
- Shows: Form usability issues

#### Card 5: Email Delivery Status
- Type: Standard → Event count
- Events: `confirmation_email_sent`, `email_delivery_failed`
- Shows: Email system reliability

---

## Analytics Queries

### Calculate Form Conversion Rate

```
(Count of services_intake_submitted) / (Count of services_intake_viewed) * 100
```

Expected: 10-20% (industry standard for B2B forms)

### Calculate CTA Effectiveness

```
Count of [cta_name]_clicked / Count of [section]_viewed * 100
```

Compare across hero, service modules, and final CTA.

### Calculate Error Rate

```
Count of intake_validation_error / Count of form_focused * 100
```

Target: < 5% (users shouldn't encounter many validation errors)

---

## Reporting & Insights

### Weekly Report

**Metrics to Monitor:**
- Total page views
- Form submissions (count and rate)
- Most popular service type
- Email delivery status
- Average form completion time

**Action Triggers:**
- Submissions < 5 per week → Content issue or traffic problem
- Error rate > 20% → UX problem with form
- Email failures > 5% → Email provider issue

### Monthly Report

**Analysis:**
- Form submission trend (up/down from previous month?)
- Service type distribution trend
- CTA performance (which button generates most submissions?)
- Device/browser breakdown
- Geographic breakdown

**Recommendations:**
- Optimize underperforming CTAs
- Improve error-prone form fields
- Adjust copy based on popular services

### Quarterly Report

**Strategic Analysis:**
- Long-term trend analysis
- Seasonal patterns
- ROI of different CTAs
- Impact of any design changes
- Competitive benchmarking

---

## Privacy & GDPR Compliance

### Data Collection
- ✅ No PII collected in analytics
- ✅ Form data NOT sent to GA
- ✅ Email addresses NOT logged in analytics
- ✅ Only event names and non-sensitive properties

### User Consent
- Verify Google Consent Mode is enabled
- Users can opt-out of analytics tracking
- Analytics data is anonymized

### Data Retention
- Default: 2 months
- Consider extending to 14 months for better trend analysis
- Configure in GA4 settings

---

## Real User Monitoring (RUM)

### Google Analytics + Web Vitals

GA4 automatically tracks:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

**View in GA4:**
Analytics → Engagement → Web Vitals

### Performance Events to Add

```typescript
// Track form submission response time
const startTime = performance.now()
const response = await fetch('/api/services/intake', { /* ... */ })
const endTime = performance.now()

gtag('event', 'form_submission_time', {
  response_time_ms: Math.round(endTime - startTime),
  response_status: response.status
})
```

---

## Testing Analytics

### Verify Events are Firing

1. Open DevTools
2. Go to Console
3. Type: `gtag('event', 'test_event', { test: 'value' })`
4. Go to GA4 → Realtime
5. Should see event appear within seconds

### Enable DebugView

1. GA4 → Admin → DebugView
2. Add your IP to allowlist
3. Reload page
4. Events appear immediately in DebugView
5. Great for testing without waiting

### Local Testing

```typescript
// Override gtag for development
if (process.env.NODE_ENV === 'development') {
  (window as any).gtag = function(...args: any[]) {
    console.log('[GA Event]', ...args)
  }
}
```

---

## Analytics API & Export

### BigQuery Export

1. GA4 → Admin → BigQuery Links
2. Link to Google Cloud project
3. Raw events automatically exported daily
4. Write custom SQL queries for analysis

### Data Studio Integration

1. Create report connecting to GA4
2. Visualize custom metrics
3. Share with stakeholders

---

## Recommended Events Checklist

Currently Implemented:
- ✅ `services_intake_viewed` (HeroSection, ServiceModules, FinalCTA)
- ✅ `services_intake_submitted`
- ✅ `services_intake_error`

Recommended for Phase 8:
- [ ] `hero_cta_clicked`
- [ ] `service_module_cta_clicked`
- [ ] `final_cta_clicked`
- [ ] `services_intro_viewed`
- [ ] `services_modules_viewed`
- [ ] `case_studies_viewed`
- [ ] `intake_service_type_selected`
- [ ] `intake_validation_error`
- [ ] `confirmation_email_sent`
- [ ] `support_email_sent`

---

## Future Analytics Enhancements

### Phase 8 Recommendations

1. **Session Recording**
   - Integrate LogRocket or FullStory
   - Watch users interact with form
   - Identify UX issues

2. **A/B Testing**
   - Test different CTA copy
   - Test form field order
   - Measure impact on conversion

3. **Heatmaps**
   - Use Hotjar or Inspectlet
   - See where users click/scroll
   - Optimize page layout

4. **Conversion Funnel**
   - Create goal for form submission
   - Track dropoff points
   - Identify optimization opportunities

5. **UTM Tracking**
   - Add campaign UTM parameters
   - Track traffic source attribution
   - Measure marketing effectiveness

---

## Summary

**Key Metrics to Monitor:**
1. Form submission count/rate
2. Service type distribution
3. Error rate
4. Email delivery success
5. CTA performance
6. Web vitals

**Success Criteria:**
- ✅ 5+ submissions per week
- ✅ Error rate < 5%
- ✅ Email delivery > 95%
- ✅ Conversion rate > 10%
- ✅ Page performance > 90 Lighthouse

---

**Document Status:** Ready for Implementation
**Last Updated:** November 23, 2024
