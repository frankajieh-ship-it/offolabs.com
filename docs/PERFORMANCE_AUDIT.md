# Services Page Performance Audit Guide

**Document:** QA–SERV–002
**Status:** Ready for Testing
**Last Updated:** November 23, 2024

---

## Overview

Complete performance audit guide for `/services` page. Ensures page meets OFFO Labs' performance standards (Lighthouse 90+ targets).

## Web Vitals Overview

### Core Web Vitals (Google's Key Metrics)

1. **Largest Contentful Paint (LCP)** - Page load speed
   - Target: ≤ 2.5 seconds
   - Measures: When main content appears

2. **First Input Delay (FID)** - Responsiveness
   - Target: ≤ 100 milliseconds
   - Measures: Response to user interactions

3. **Cumulative Layout Shift (CLS)** - Visual stability
   - Target: ≤ 0.1
   - Measures: Unexpected layout changes

### Additional Metrics

4. **First Contentful Paint (FCP)** - First element appears
   - Target: ≤ 1.8 seconds

5. **Time to Interactive (TTI)** - Page is interactive
   - Target: ≤ 3.8 seconds

---

## Lighthouse Audit Procedure

### Step 1: Setup
```bash
# Ensure you're on the production build
npm run build

# Start production server
npm start

# Or use Vercel preview deployment
```

### Step 2: Open Chrome DevTools
1. Open Chrome DevTools (F12 or Cmd+Opt+I)
2. Go to "Lighthouse" tab
3. Select "Mobile" for mobile audit

### Step 3: Run Audit
1. Click "Analyze page load"
2. Wait for audit to complete (1-2 minutes)
3. Note scores in all categories

### Step 4: Review Results

#### Performance (Target: 90+)
- **Focus areas:**
  - Largest Contentful Paint (LCP)
  - Cumulative Layout Shift (CLS)
  - First Input Delay (FID)
- **Check for:**
  - Unoptimized images
  - Render-blocking JavaScript
  - Unsized content causing layout shifts

#### Accessibility (Target: 90+)
- **Common issues:**
  - Missing labels on form inputs
  - Insufficient color contrast
  - Missing alt text on images
- **Verify:**
  - All interactive elements keyboard accessible
  - ARIA attributes properly used
  - Form labels associated with inputs

#### Best Practices (Target: 90+)
- **Check for:**
  - Use of deprecated APIs
  - Missing HTTPS
  - Cross-origin resource sharing (CORS) issues
  - Outdated libraries

#### SEO (Target: 90+)
- **Verify:**
  - Meta tags present
  - Mobile viewport configured
  - Structured data (schema.org)
  - Mobile usability

---

## Performance Checklist

### Critical Performance Issues (Blockers)

- [ ] LCP > 4 seconds
- [ ] CLS > 0.25
- [ ] Performance score < 50
- [ ] Form submission takes > 2 seconds
- [ ] Page doesn't load on slow 3G network

### High Priority Issues

- [ ] LCP > 2.5 seconds
- [ ] CLS > 0.1
- [ ] Accessibility score < 90
- [ ] Form errors take > 500ms to appear
- [ ] Email send takes > 5 seconds (API response)

### Medium Priority Issues

- [ ] Cumulative layout shift > 0.05
- [ ] Performance score < 90
- [ ] SEO score < 90
- [ ] Rendering took > 1 second

### Low Priority Issues

- [ ] Best Practices score < 90
- [ ] Unused CSS
- [ ] Unoptimized images
- [ ] Slow third-party scripts

---

## Performance Optimization Guide

### Images

#### Current Status
- Service cards use Lucide icons (lightweight, already optimized)
- No large images currently on page

#### If Adding Images
```tsx
// DO: Use Next.js Image component
import Image from 'next/image'

<Image
  src="/images/services.jpg"
  alt="Services overview"
  width={800}
  height={600}
  priority // Only for above-the-fold images
  quality={75} // Balance quality and file size
/>

// DON'T: Use <img> tag
<img src="/images/services.jpg" /> // No! Not optimized
```

### JavaScript Bundle Size

#### Current Status
```
Expected bundle size:
- Pages: < 100KB (gzipped)
- Form components: < 50KB (gzipped)
- Hooks: < 10KB (gzipped)
```

#### Optimization Strategies
1. **Code Splitting**
   - Form components loaded on demand
   - Heavy libraries split from main bundle

2. **Tree Shaking**
   - Remove unused code
   - Use ES6 imports/exports

3. **Dynamic Imports**
   ```tsx
   // Load form only when needed
   const Form = dynamic(() => import('@/components/ServicesIntakeForm'), {
     loading: () => <div>Loading...</div>
   })
   ```

### CSS Size

#### Current Status
- Using Tailwind CSS (production build only includes used classes)
- Expected: ~50-100KB gzipped

#### Verification
1. Open DevTools → Network
2. Filter for CSS files
3. Check size of `_next/static/css/` files
4. Should be minimal (unused styles purged)

### Font Loading

#### Current Status
- Using system fonts (no web font downloads)
- No blocking font loads

#### If Adding Custom Fonts
```css
/* Use font-display: swap for better performance */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* Don't block rendering */
}
```

### Third-Party Scripts

#### Current Third-Parties
- Google Analytics (gtag)
- Vercel Analytics (auto-instrumented)
- No other external scripts

#### Performance Impact Assessment
- GA script: ~60KB (async, non-blocking)
- Verify in DevTools Network tab

---

## Network Performance Testing

### Test 1: Simulate Slow 3G

**In Chrome DevTools:**
1. Open Network tab
2. Click "Throttling" dropdown (next to "Offline")
3. Select "Slow 3G"
4. Reload page
5. Measure load time

**Expected Results:**
- Page loads in under 10 seconds on Slow 3G
- Form remains usable
- Critical content visible before full load

### Test 2: Simulate 4G LTE

**In Chrome DevTools:**
1. Select "4G" from throttling dropdown
2. Reload page
3. Measure load time

**Expected Results:**
- Page loads in under 3 seconds
- All sections visible quickly
- Smooth interactions

### Test 3: CPU Throttling

**In Chrome DevTools:**
1. Open Performance tab
2. Click settings ⚙️
3. Enable CPU throttling (6x slowdown)
4. Record while scrolling page
5. Check for jank/stuttering

**Expected Results:**
- Smooth 60 FPS scrolling
- No jank or stuttering
- Form interactions responsive even with CPU throttling

---

## Form-Specific Performance Tests

### Test: Form Input Responsiveness

```bash
1. Open page on Slow 3G
2. Scroll to form
3. Start typing in "Name" field
4. Measure response time to validation
```

**Expected:**
- Validation feedback within 100ms
- No lag while typing
- Smooth error clearing

### Test: Form Submission Speed

```bash
1. Fill out complete form
2. Click Submit
3. Measure time from click to response
```

**Expected:**
- Loading state visible immediately
- Response within 2 seconds (API + email)
- Success message within 3 seconds

### Test: Email Delivery Performance

```bash
1. Submit form at exactly HH:MM:SS
2. Note timestamp in email received
3. Calculate total time
```

**Expected:**
- User confirmation email: < 2 minutes
- Support notification: < 2 minutes
- Both emails within same minute (ideal)

---

## Lighthouse Report Interpretation

### Performance Score Breakdown

| Score | Status | Action |
|-------|--------|--------|
| 90-100 | ✅ Excellent | Maintain |
| 80-89 | ⚠️ Good | Monitor |
| 50-79 | 🔴 Needs Work | Optimize |
| < 50 | ❌ Poor | Critical fixes needed |

### Common Performance Issues & Fixes

#### Issue: Large Images
**Symptom:** "Properly size images" warning
**Fix:**
```tsx
// Use Next.js Image with optimization
<Image
  src={image}
  alt="desc"
  width={800}
  height={600}
  quality={75}
/>
```

#### Issue: Unoptimized Images
**Symptom:** "Use modern image formats" warning
**Fix:** Use WebP format, Next.js auto-converts

#### Issue: Render-Blocking JavaScript
**Symptom:** "Eliminate render-blocking resources"
**Fix:**
```tsx
// Use async/defer
<script async src="analytics.js"></script>
<script defer src="vendor.js"></script>
```

#### Issue: Unused CSS
**Symptom:** "Unused CSS" warning
**Fix:** Tailwind automatically purges unused (already done)

#### Issue: Layout Shifts
**Symptom:** High CLS score (> 0.1)
**Fix:**
```tsx
// Set explicit sizes for images
<Image width={100} height={100} /> // Good
<img /> // Bad - causes shift

// Use containers with set heights
<div style={{ minHeight: '200px' }}>
  {content}
</div>
```

---

## Accessibility Performance

### Lighthouse Accessibility Audit

**Expected Score:** 90+

**Run Audit:**
1. DevTools → Lighthouse
2. Select "Accessibility"
3. Run audit
4. Fix any issues

**Common Issues & Fixes:**

| Issue | Fix |
|-------|-----|
| Missing form labels | Add `<label htmlFor="fieldId">` |
| Low color contrast | Increase contrast ratio to 4.5:1 |
| Missing alt text | Add descriptive alt text to images |
| Keyboard navigation broken | Use semantic HTML, test with Tab key |

---

## SEO Performance

### Lighthouse SEO Audit

**Expected Score:** 90+

**Checklist:**
- [ ] Meta tags present (title, description)
- [ ] Mobile viewport configured
- [ ] No "Unplayable content" (Flash, etc.)
- [ ] Structured data (schema.org) implemented
- [ ] robots.txt and sitemap.xml exist

### Schema Markup for Services Page

```tsx
// Add to page metadata
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'OFFO Labs',
  'url': 'https://offodlabs.com',
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'US'
  },
  'offers': [
    {
      '@type': 'Offer',
      'name': 'AI-Accelerated Product Development',
      'description': '...'
    },
    // ... other services
  ]
}
```

---

## Best Practices Audit

### Lighthouse Best Practices

**Expected Score:** 90+

**Checklist:**
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] No deprecated APIs used
- [ ] No console errors
- [ ] Password inputs are secure
- [ ] Cross-origin resources use CORS

---

## Monitoring & Continuous Performance

### Production Monitoring Setup

#### Google Analytics
- Already integrated
- Tracks Core Web Vitals automatically
- Dashboard: Analytics → Engagement → Web Vitals

#### Vercel Analytics
- Automatically enabled
- Dashboard: Vercel → Analytics
- Tracks real user metrics

#### Set Up Alerts
1. Go to Vercel dashboard
2. Project settings → Analytics
3. Set up alerts for:
   - LCP > 2.5s
   - CLS > 0.1
   - Performance score < 90

### Regular Audits

**Weekly:**
- [ ] Run Lighthouse audit (mobile)
- [ ] Check Performance score
- [ ] Check any errors in logs

**Monthly:**
- [ ] Full Lighthouse audit (desktop & mobile)
- [ ] Review all 4 categories
- [ ] Analyze trends

**Quarterly:**
- [ ] Full performance review
- [ ] Identify optimization opportunities
- [ ] Plan improvements

---

## Performance Regression Prevention

### Before Deployment

1. **Run Local Audit**
   ```bash
   npm run build
   npm start
   # Open Lighthouse → Analyze
   ```

2. **Check Key Metrics**
   - LCP < 2.5s
   - CLS < 0.1
   - Performance > 90

3. **Code Review Checklist**
   - [ ] No large bundles added
   - [ ] No unoptimized images
   - [ ] No render-blocking scripts
   - [ ] No layout shift issues

### Post-Deployment

1. Monitor real user metrics
2. Check analytics dashboard
3. Investigate any anomalies
4. Document findings

---

## Performance Targets Summary

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Largest Contentful Paint | ≤ 2.5s | TBD | TBD |
| First Input Delay | ≤ 100ms | TBD | TBD |
| Cumulative Layout Shift | ≤ 0.1 | TBD | TBD |
| Lighthouse Performance | ≥ 90 | TBD | TBD |
| Lighthouse Accessibility | ≥ 90 | TBD | TBD |
| Lighthouse Best Practices | ≥ 90 | TBD | TBD |
| Lighthouse SEO | ≥ 90 | TBD | TBD |
| Form Load Time | ≤ 500ms | TBD | TBD |
| Form Submit Time | ≤ 2s | TBD | TBD |
| Email Delivery | ≤ 2 min | TBD | TBD |

---

## Tools & Resources

### Local Testing Tools
- Chrome DevTools (built-in)
- Lighthouse CI (npm install -g @lhci/cli)
- WebPageTest (https://www.webpagetest.org)

### Cloud Testing Tools
- Vercel Analytics (included)
- Google PageSpeed Insights (https://pagespeed.web.dev)
- GTmetrix (https://gtmetrix.com)

### Monitoring Services
- Sentry (error tracking)
- LogRocket (session replay)
- New Relic (APM)

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| QA Lead | TBD | TBD | ☐ |
| Product Manager | TBD | TBD | ☐ |
| Engineering Lead | TBD | TBD | ☐ |

---

**Document Status:** Ready for Auditing
**Last Updated:** November 23, 2024
