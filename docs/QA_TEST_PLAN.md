# Services Page QA Test Plan

**Document:** QA–SERV–001
**Status:** Ready for Testing
**Last Updated:** November 23, 2024

---

## Overview

Comprehensive QA test plan for the `/services` page and services intake form.

## Test Environments

- **Development:** `localhost:3000`
- **Staging:** TBD
- **Production:** `https://offodlabs.com/services`

---

## Section 1: Form Behavior Validation

### 1.1 Required Fields Validation

#### Test Case: All Required Fields Empty
- Navigate to `/services`
- Scroll to intake form
- Click "Submit Intake Form" button without filling any fields
- **Expected:**
  - Form does NOT submit
  - Error appears for all required fields: name, email, serviceType, description
  - Form auto-scrolls to first error
  - All error messages are visible and descriptive
  - Errors use red text/icons for visibility

#### Test Case: Submit with Only Name
- Fill: Name field only
- Leave empty: Email, Service Type, Description
- Click submit
- **Expected:**
  - Form does NOT submit
  - Errors appear for: email, serviceType, description
  - Name error is cleared
  - Focus/scroll behavior works correctly

#### Test Case: Submit with Invalid Email
- Fill: Name, invalid email (e.g., "notanemail", "user@", "@domain.com")
- Fill: Service Type, Description (20+ chars)
- Click submit
- **Expected:**
  - Form does NOT submit
  - Email error: "Please enter a valid email address"
  - Other fields are highlighted as required
  - User can correct email and resubmit

### 1.2 Optional Fields Validation

#### Test Case: Submit with Required Fields Only
- Fill: Name, Valid Email, Service Type, Description (20+ chars)
- Leave empty: Company, Budget, Timeline
- Click submit
- **Expected:**
  - Form submits successfully
  - No errors for empty optional fields
  - Success message displays
  - Email sent to user and support team

#### Test Case: Fill Company but Not Budget/Timeline
- Fill all required fields
- Fill: Company name
- Leave empty: Budget, Timeline
- Click submit
- **Expected:**
  - Form submits successfully
  - Company data is included in submission

### 1.3 Description Length Validation

#### Test Case: Description Too Short
- Fill: Name, Email, Service Type
- Description: "Too short" (9 characters)
- Click submit
- **Expected:**
  - Form does NOT submit
  - Error: "Description must be at least 20 characters"
  - Character count displayed or helper text visible

#### Test Case: Description Exactly 20 Characters
- Description: "This is twenty chars!" (exactly 20)
- Fill all other required fields
- Click submit
- **Expected:**
  - Form submits successfully
  - Exactly 20 chars is acceptable

#### Test Case: Description Very Long
- Description: 5000+ character text
- Fill other required fields
- Click submit
- **Expected:**
  - Form submits successfully
  - Long text is preserved in email
  - No character limit exceeded errors

### 1.4 Real-Time Error Clearing

#### Test Case: Error Clearing on Input
- Submit form to trigger errors
- Start typing in the "Name" field
- **Expected:**
  - Name error immediately clears
  - Other errors remain visible
  - Focus stays in input field

#### Test Case: Multiple Field Error Clearing
- Trigger all errors
- Fill each required field one by one
- **Expected:**
  - Each field's error clears as user types
  - No stale errors remain after fixing

### 1.5 Form State Recovery

#### Test Case: User Fills Form → Error → Fixes → Resubmits
- Fill form with incomplete data
- Submit → errors appear
- Fill missing required field
- Submit again
- **Expected:**
  - No data loss
  - Form submits successfully
  - All previously-entered data is preserved

---

## Section 2: Prefill & Context Behavior

### 2.1 Hero CTA Prefill

#### Test Case: Click "Request Consultation" in Hero
- Load `/services`
- Click "Request Consultation" button in hero
- **Expected:**
  - Smooth scroll to #intake form
  - Form loads with Service Type = "consultation"
  - "AI Strategy & Systems Consultation" is selected
  - User can change if needed
  - sessionStorage contains 'consultationRequested'

#### Test Case: Click "Start a Project" in Hero
- Load `/services`
- Click "Start a Project" button in hero
- **Expected:**
  - Smooth scroll to #intake form
  - Service Type field is empty (no prefill)
  - User must select a service type
  - sessionStorage is cleared

### 2.2 Service Modules CTA Prefill

#### Test Case: "Request Consultation" Button in Consultation Module
- Scroll to Service Modules section
- Click "Request Consultation" in "AI Strategy & Systems Consultation" card
- **Expected:**
  - Smooth scroll to form
  - Service Type prefilled as "consultation"
  - sessionStorage set correctly

#### Test Case: "Start a Project" in Each Module
- Click "Start a Project" in each of the 3 service modules
- **Expected:**
  - Each scroll to #intake
  - No prefill (empty service type)
  - sessionStorage cleared

### 2.3 Final CTA Prefill

#### Test Case: Bottom CTA Band - "Request Consultation"
- Scroll to bottom of page
- Click "Request Consultation" in Final CTA section
- **Expected:**
  - Scroll to #intake with prefill
  - Service Type = "consultation"
  - sessionStorage set correctly

#### Test Case: Bottom CTA Band - "Start a Project"
- Click "Start a Project" in Final CTA section
- **Expected:**
  - Scroll to #intake without prefill
  - Service Type empty

### 2.4 Prefill Across Page Navigation

#### Test Case: Navigate Back to Page After Prefill
- Click "Request Consultation" → prefill works
- User closes form or navigates away
- Returns to `/services` via browser back button
- **Expected:**
  - Prefill does NOT persist
  - Fresh form state
  - sessionStorage is cleared

---

## Section 3: Form Submission

### 3.1 Successful Submission

#### Test Case: Submit Valid Form
- Fill all required fields correctly
- Click "Submit Intake Form"
- **Expected:**
  - Loading spinner appears briefly
  - Button text: "Submitting..."
  - No errors
  - Success message displays
  - Message: "Intake form submitted successfully!"
  - Secondary message: "We'll review your request and get back to you within 24 hours."
  - Form fields clear after 5 seconds
  - Success message fades away
  - Form ready for new submission

#### Test Case: Success Message Disappears
- Submit valid form
- Wait 5 seconds
- **Expected:**
  - Success message disappears automatically
  - Form is cleared and ready for new input
  - Submit button re-enabled

### 3.2 Error Handling

#### Test Case: Network Error During Submission
- Fill valid form
- Simulate offline (DevTools → Network → Offline)
- Click submit
- **Expected:**
  - Error message displays
  - Error text shows network/server error message
  - Button re-enables
  - User can retry after going online

#### Test Case: Server Error (5xx)
- Fill valid form
- Server returns 500 error (simulate with fetch mock)
- **Expected:**
  - Error message displays
  - User-friendly error: "Error submitting form" + specific message
  - Button re-enables
  - Form data is preserved

#### Test Case: Validation Error (400)
- API rejects with validation error
- **Expected:**
  - Error message displays
  - Form data is preserved
  - User can fix and retry

### 3.3 Loading State

#### Test Case: Loading State Visibility
- Submit form
- Quickly check for loading indicator
- **Expected:**
  - Button text changes to "Submitting..."
  - Spinner animation is visible
  - Button is disabled (cannot double-submit)
  - Visual feedback is clear

#### Test Case: Double-Submit Prevention
- Start form submission
- Immediately click submit button again
- **Expected:**
  - Only one request is sent
  - Button remains disabled during submission
  - No duplicate submissions

---

## Section 4: Email Delivery Validation

### 4.1 User Confirmation Email

#### Test Case: User Receives Confirmation Email
- Submit form with valid email
- Check inbox of submitted email address
- **Expected:**
  - Email arrives within 1 minute
  - Subject: "We received your services inquiry"
  - From: noreply@offodlabs.com (or configured sender)
  - Email contains:
    - Greeting with user's name
    - Confirmation message
    - Service type selected
    - Budget (if provided)
    - Timeline (if provided)
    - Support contact information
    - "24 hours" response promise

#### Test Case: Email HTML Rendering
- Receive confirmation email
- View in multiple email clients (Gmail, Outlook, Apple Mail, etc.)
- **Expected:**
  - Responsive HTML renders correctly
  - Colors match OFFO Labs branding
  - Links are clickable
  - Text is readable
  - No broken formatting

### 4.2 Internal Support Notification

#### Test Case: Support Team Receives Notification
- Submit form as user
- Check support team inbox (support@offodlabs.com)
- **Expected:**
  - Email arrives within 1 minute
  - Subject: "New Services Intake: [Name] - [Service Type]"
  - Email contains all form data:
    - Name, email, company (if provided)
    - Service type (readable format)
    - Budget (if provided)
    - Timeline (if provided)
    - Full description
    - Submission timestamp
    - Source (services_page)

#### Test Case: Email Data Privacy
- Verify PII is handled safely
- **Expected:**
  - No sensitive data in email subject lines
  - Email content is secure
  - HTML entities escaped properly (no injection)

---

## Section 5: Cross-Device & Responsive Testing

### 5.1 Desktop Browsers

#### Test on Chrome/Edge (Latest)
- Load `/services`
- Navigate through all sections
- Interact with form
- **Expected:**
  - All sections render correctly
  - Form fields responsive
  - Buttons clickable and accessible
  - Scroll behavior smooth
  - No layout shifts

#### Test on Firefox (Latest)
- Same test as above
- **Expected:**
  - Consistent behavior with Chrome
  - Form submission works
  - Styling consistent

#### Test on Safari (Latest)
- Same test as above
- **Expected:**
  - No webkit-specific issues
  - Form works correctly
  - Scroll animations smooth

### 5.2 Tablet/iPad Testing

#### Test on iPad (Landscape & Portrait)
- Load `/services`
- All sections should be readable
- Form should be usable
- **Expected:**
  - Responsive grid layouts (2-column on wide, 1-column on narrow)
  - Buttons have adequate touch targets (min 44x44px)
  - Form inputs are appropriately sized
  - Service cards stack properly
  - Text is readable (no tiny fonts)

#### Test on Android Tablet
- Same tests as iPad
- **Expected:**
  - Consistent behavior
  - Form submission works
  - Scroll performance is good

### 5.3 Mobile Phone Testing

#### Test on iPhone (Latest 3 Models)
- 12/13 Mini (5.4" small screen)
- 14/15 (6.1" standard)
- 14/15 Pro Max (6.7" large)
- **Expected for all:**
  - Single-column layout
  - CTA buttons stack vertically
  - Form is fully usable one-handed
  - No horizontal scrolling
  - Text sizes appropriate
  - Touch targets adequate (44x44px minimum)
  - Service cards stack and scroll smoothly

#### Test on Android Phones
- Google Pixel (latest)
- Samsung Galaxy (latest)
- Other Android phones
- **Expected:**
  - Single-column layout
  - All interactions work
  - Form submission successful
  - No browser-specific issues

### 5.4 Viewport Size Edge Cases

#### Test at 320px Wide (Old phones)
- **Expected:**
  - Content doesn't overflow
  - Text remains readable
  - Buttons remain clickable

#### Test at 1920px+ (Large monitors)
- **Expected:**
  - Content doesn't stretch too wide
  - max-width containers enforce proper layout
  - Spacing looks good

---

## Section 6: Accessibility Testing

### 6.1 Keyboard Navigation

#### Test Case: Tab Through Form
- Load page
- Use Tab key to navigate through all form fields
- **Expected:**
  - Focus order is logical (top to bottom)
  - Focus indicator is visible (blue ring)
  - All inputs are reachable
  - No keyboard traps

#### Test Case: Submit with Keyboard
- Tab to submit button
- Press Enter
- **Expected:**
  - Form submits
  - No errors
  - Same behavior as mouse click

#### Test Case: Scroll Links with Keyboard
- Tab through page
- Focus on CTA buttons
- Press Enter on scroll buttons
- **Expected:**
  - Smooth scroll to #intake
  - Form receives focus

### 6.2 Screen Reader Testing

#### Test with NVDA (Windows) / JAWS
- Load `/services`
- Navigate using screen reader
- **Expected:**
  - All headings announced with level (H1, H2, etc.)
  - Form labels associated with inputs
  - Error messages announced
  - Button purposes are clear
  - Success/error states announced

#### Test with VoiceOver (Mac/iOS)
- Same tests as NVDA
- **Expected:**
  - Consistent announcements
  - Form is fully usable

### 6.3 Color Contrast

#### Lighthouse Accessibility Audit
- Run Lighthouse in Chrome DevTools
- Check "Accessibility" report
- **Expected:**
  - All text meets WCAG AA contrast ratios (4.5:1 for body text, 3:1 for large text)
  - Success message green/text contrast adequate
  - Error message red/text contrast adequate
  - Dark mode colors have sufficient contrast

### 6.4 ARIA & Labels

#### Form Field Labels
- **Expected:**
  - Each input has associated `<label>` with `htmlFor`
  - Error messages linked with `aria-invalid`
  - Helper text associated with `aria-describedby`
  - Required fields marked with `aria-required`

#### Buttons
- **Expected:**
  - Button purposes are clear from text
  - Loading state communicated (e.g., "Submitting...")
  - No generic "Click here" text

---

## Section 7: Dark Mode Testing

### 7.1 Dark Mode Toggle
- Enable dark mode in system settings (or page dark mode toggle if exists)
- Load `/services`
- **Expected:**
  - All sections render with dark colors
  - Text remains readable
  - Contrast ratios maintain WCAG standards
  - Forms are usable
  - No unreadable text on dark backgrounds

### 7.2 Dark Mode Form
- Fill form in dark mode
- Submit
- **Expected:**
  - Form fields visible
  - Labels readable
  - Error text visible
  - Success message visible
  - Button colors appropriate for dark theme

---

## Section 8: Analytics Tracking Validation

### 8.1 Page View Events
- Load `/services`
- Open browser console → Application → Cookies/localStorage
- **Expected:**
  - Google Analytics loaded
  - gtag function available
  - page_view event sent

### 8.2 Intake Viewed Event
- Scroll to intake form section
- **Expected:**
  - `services_intake_viewed` event fired
  - Property: `section: 'services_intake'`
  - Visible in Google Analytics

### 8.3 Form Submission Event
- Submit valid form
- **Expected:**
  - `services_intake_submitted` event fired
  - Properties: `serviceType`, `source: 'services_page'`
  - Visible in analytics within 1-2 seconds

### 8.4 Form Error Event
- Submit invalid form
- **Expected:**
  - `services_intake_error` event fired
  - Property: `error: (error message)`
  - Visible in analytics

---

## Test Execution Checklist

### Pre-Test Setup
- [ ] Clear browser cache
- [ ] Disable browser extensions (ad blockers, etc.)
- [ ] Ensure email accounts are accessible
- [ ] Document browser versions
- [ ] Document OS versions
- [ ] Set up analytics debugging

### Daily Smoke Tests (5 minutes)
- [ ] Load `/services` page
- [ ] Scroll through all sections
- [ ] Click one CTA button → verify scroll
- [ ] Submit form with valid data → verify success message
- [ ] Check inbox for confirmation email

### Comprehensive Test (2-3 hours)
- [ ] Run through all test cases in this document
- [ ] Test on minimum 3 device types (desktop, tablet, mobile)
- [ ] Test on minimum 3 browsers
- [ ] Document any failures
- [ ] Take screenshots of issues

### Sign-Off Criteria
- [ ] All test cases pass
- [ ] No critical bugs
- [ ] Email delivery confirmed
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passes (Lighthouse 90+)
- [ ] Performance audit passes (Lighthouse 90+)
- [ ] Approvals from: Designer, Product, Engineering

---

## Bug Reporting Template

When filing a bug, include:

```
**Title:** [Component] Brief description

**Severity:** Critical / High / Medium / Low

**Environment:**
- Browser: [Name] v[Version]
- Device: [Type/Model]
- OS: [Name] v[Version]

**Reproduction Steps:**
1. ...
2. ...
3. ...

**Expected Result:**
...

**Actual Result:**
...

**Screenshots/Video:**
[Attach if applicable]

**Additional Notes:**
...
```

---

## Performance Benchmarks

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint (FCP) | < 2s | TBD |
| Largest Contentful Paint (LCP) | < 2.5s | TBD |
| Cumulative Layout Shift (CLS) | < 0.1 | TBD |
| Time to Interactive (TTI) | < 3s | TBD |
| Lighthouse Performance | 90+ | TBD |
| Lighthouse Accessibility | 90+ | TBD |

---

## Known Issues & Limitations

(To be filled during testing)

- Issue 1: ...
- Issue 2: ...

---

## Sign-Off

| Role | Name | Date | Approved |
|------|------|------|----------|
| QA Lead | TBD | TBD | ☐ |
| Product Manager | TBD | TBD | ☐ |
| Engineering Lead | TBD | TBD | ☐ |

---

**Document Status:** Ready for Testing
**Last Updated:** November 23, 2024
