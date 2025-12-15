# OFFO Launch™ Testing Guide

Complete testing checklist for all features we've built.

## 🚀 Quick Start

**Local Development:**
```bash
cd C:/Dev/offo-risk-score-mvp/frontend
npm run dev
```

Server running at: **http://localhost:3002**

**Production:**
Deployed at: **https://offolab.com**

---

## 📋 Testing Checklist

### 1. Launch Dashboard (`/launch`)

**Test:** Main launch list page

**Steps:**
1. Navigate to http://localhost:3002/launch
2. Verify the demo launch "Ember & Oak Restaurant" appears
3. Check readiness score badge (should show **68**)
4. Verify stats display:
   - Days Until Open
   - Permits Approved (2 / 6)
   - Critical Pending
   - Launch Type

**Expected:**
- ✅ Launch card displays with all information
- ✅ Readiness score color-coded (68 = yellow)
- ✅ Click launches to navigate to detail page
- ✅ "New Launch" button visible in header

---

### 2. Launch Detail Page (`/launch/[id]`)

**Test:** Individual launch overview with permits and timeline

**Steps:**
1. Click on "Ember & Oak Restaurant" from dashboard
2. Verify URL: `/launch/launch_001`
3. Check readiness score in header
4. Verify 4 stat cards display correctly
5. Toggle between "Permits" and "Timeline" views

**Desktop View Expected:**
- ✅ Large readiness badge (68)
- ✅ Days until open countdown
- ✅ Permits approved count (2/6)
- ✅ Critical pending count
- ✅ View toggle buttons work
- ✅ Filter dropdown for permit status

**Mobile View Expected (< 768px):**
- ✅ Sticky header with back button
- ✅ Compact stats layout
- ✅ Touch-friendly view toggle
- ✅ Mobile permit cards
- ✅ Full-screen permit details

---

### 3. Permits View

**Test:** Permit cards with different statuses

**Expected Permits:**
1. **Health Department Permit**
   - Status: Inspection Passed (blue)
   - Priority: Critical (red badge)
   - Inspector: Maria Chen
   - Agency: County Health Department

2. **Fire Safety Inspection**
   - Status: Scheduled (purple)
   - Priority: Critical
   - Inspector: John Rodriguez
   - Inspection Date: 7 days from now

3. **Business Operating License**
   - Status: Approved (green ✓)
   - Priority: High

4. **ADA Compliance Certification**
   - Status: Inspection Failed (red)
   - Priority: High
   - Corrective Actions: 3 items listed

5. **Building Occupancy Permit**
   - Status: Application Submitted (yellow)
   - Priority: Critical

6. **Zoning Variance Approval**
   - Status: Approved (green ✓)
   - Priority: High

**Steps:**
1. View all permits in permits tab
2. Click "Show Details" on ADA permit
3. Verify corrective actions display
4. Check inspector notes on Health permit
5. Test status filter dropdown

**Expected:**
- ✅ All 6 permits display correctly
- ✅ Status badges color-coded
- ✅ Priority indicators visible
- ✅ Expandable sections work
- ✅ Dates formatted correctly
- ✅ Filter updates permit list

---

### 4. Timeline View

**Test:** Visual timeline of all permit events

**Steps:**
1. Switch to "Timeline" view
2. Check summary statistics at top
3. Verify upcoming events section
4. Verify past events section

**Expected:**
- ✅ Summary stats show:
  - Completed: 2
  - Upcoming: varies
  - Overdue: varies
- ✅ Events sorted chronologically
- ✅ Color-coded icons for event types
- ✅ Days until/ago calculations
- ✅ Permit type badges display

---

### 5. Mobile Permit View

**Test:** Mobile-optimized interface

**Steps:**
1. Resize browser to mobile (< 768px) OR use device emulator
2. Navigate to `/launch/launch_001`
3. Tap on a permit card
4. Verify full-screen detail view
5. Tap "Back to Permits"
6. Test filter menu

**Expected:**
- ✅ Permit list uses mobile cards
- ✅ Tap opens full-screen detail
- ✅ Back button navigation works
- ✅ Filter menu is collapsible
- ✅ Status dots visible
- ✅ Touch targets are large enough (44x44px minimum)

---

### 6. New Launch Creation (`/launch/new`)

**Test:** Create a new launch with permits

**Steps:**
1. Click "+ New Launch" button
2. Fill in launch details:
   - Name: "Test Restaurant"
   - Location: "Downtown"
   - Address: "123 Test St"
   - Type: Restaurant
   - Target Open Date: Future date
3. Click "Add Permit"
4. Fill permit details
5. Click "Create Launch"

**Expected:**
- ✅ Form validation works (required fields)
- ✅ Can add multiple permits
- ✅ Can remove permits
- ✅ Date picker works
- ✅ Dropdown selects work
- ✅ Redirects to new launch detail on success
- ✅ New launch appears in dashboard
- ✅ Readiness score starts at 0

---

### 7. API Endpoints

**Test:** REST API functionality

**Using Browser Console or Postman:**

```javascript
// GET all launches
fetch('/api/launch')
  .then(r => r.json())
  .then(console.log);

// GET single launch
fetch('/api/launch/launch_001')
  .then(r => r.json())
  .then(console.log);

// GET permits for launch
fetch('/api/launch/launch_001/permits')
  .then(r => r.json())
  .then(console.log);

// UPDATE permit status (with validation)
fetch('/api/launch/launch_001/permits/permit_002', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'inspection_passed',
    inspectorName: 'John Smith'
  })
})
  .then(r => r.json())
  .then(console.log);
```

**Expected:**
- ✅ GET endpoints return correct data
- ✅ PATCH updates localStorage
- ✅ Readiness score recalculates
- ✅ Invalid status transitions return 400 error
- ✅ 404 for non-existent resources

**Test Invalid Transition:**
```javascript
// This should FAIL (can't go from approved to scheduled)
fetch('/api/launch/launch_001/permits/permit_003', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'scheduled' })
})
  .then(r => r.json())
  .then(console.log);
// Expected: { error: "Invalid status transition", allowedTransitions: [] }
```

---

### 8. localStorage Persistence

**Test:** Data persists across page refreshes

**Steps:**
1. Create a new launch
2. Refresh the page (F5)
3. Navigate back to `/launch`
4. Verify your new launch still appears

**Expected:**
- ✅ Demo data loads on first visit
- ✅ New launches persist in localStorage
- ✅ Changes to permits persist
- ✅ Data survives page refresh
- ✅ localStorage key: `offo_launch_data_v1`

**Check localStorage:**
```javascript
// In browser console
const data = localStorage.getItem('offo_launch_data_v1');
console.log(JSON.parse(data));
```

---

### 9. Responsive Design

**Test:** All breakpoints work correctly

**Breakpoints to Test:**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Steps:**
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different device sizes
4. Test in portrait and landscape

**Expected:**
- ✅ Layout adjusts smoothly
- ✅ No horizontal scrolling
- ✅ Buttons remain accessible
- ✅ Text remains readable
- ✅ Cards stack vertically on mobile
- ✅ Grid layouts adapt

---

### 10. Browser Compatibility

**Test on Multiple Browsers:**
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if available)

**Expected:**
- ✅ No console errors
- ✅ Dates format correctly
- ✅ Icons display properly
- ✅ Animations smooth
- ✅ Touch events work (mobile)

---

### 11. Performance Testing

**Test:** Page load and interaction speed

**Using Chrome DevTools > Lighthouse:**
1. Open DevTools
2. Go to Lighthouse tab
3. Run audit for Desktop and Mobile

**Expected Scores:**
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 80

**Check:**
- ✅ First Contentful Paint < 2s
- ✅ Time to Interactive < 3s
- ✅ No layout shifts (CLS < 0.1)
- ✅ Smooth animations (60fps)

---

### 12. Accessibility Testing

**Test:** Keyboard navigation and screen readers

**Keyboard Navigation:**
1. Tab through all interactive elements
2. Press Enter/Space on buttons
3. Test Escape key to close modals

**Expected:**
- ✅ Logical tab order
- ✅ Focus indicators visible
- ✅ All buttons keyboard accessible
- ✅ Dropdowns work with keyboard
- ✅ Skip to content link (if needed)

**Screen Reader:**
- ✅ Descriptive labels on inputs
- ✅ Status messages announced
- ✅ Headings properly structured (h1-h6)
- ✅ Alt text on icons (via aria-label)

---

## 🐛 Bug Reporting

If you find issues, check:

1. **Browser Console** - Look for JavaScript errors
2. **Network Tab** - Check for failed API calls
3. **localStorage** - Verify data structure

**Common Issues:**

**Issue:** "Launch not found"
- **Fix:** Clear localStorage and refresh

**Issue:** Dates showing "Invalid Date"
- **Fix:** Check date format in demo data

**Issue:** Readiness score not updating
- **Fix:** Check permit status in localStorage

**Clear All Data:**
```javascript
// In browser console
localStorage.removeItem('offo_launch_data_v1');
location.reload();
```

---

## ✅ Testing Completion Checklist

Mark each section as you test:

- [ ] 1. Launch Dashboard
- [ ] 2. Launch Detail Page (Desktop)
- [ ] 3. Permits View
- [ ] 4. Timeline View
- [ ] 5. Mobile Permit View
- [ ] 6. New Launch Creation
- [ ] 7. API Endpoints
- [ ] 8. localStorage Persistence
- [ ] 9. Responsive Design
- [ ] 10. Browser Compatibility
- [ ] 11. Performance Testing
- [ ] 12. Accessibility Testing

---

## 🎯 Success Criteria

**MVP is ready when:**
- ✅ All 6 demo permits display correctly
- ✅ Status transitions work with validation
- ✅ Readiness score calculates correctly
- ✅ Mobile view works on phones
- ✅ Can create new launches
- ✅ Data persists in localStorage
- ✅ No console errors
- ✅ Lighthouse score > 80

**You're ready to launch! 🚀**
