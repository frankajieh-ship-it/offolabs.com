# OFFO Risk Score MVP - Testing Guide

## 🚀 Quick Start

### 1. Start Backend (Terminal 1)
```bash
cd /c/Dev/offo-risk-score-mvp/backend
python -m venv venv
venv\Scripts\activate  # Windows
# OR: source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python main.py
```

**Expected Output:**
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 2. Start Frontend (Terminal 2)
```bash
cd /c/Dev/offo-risk-score-mvp/frontend
npm install
npm run dev
```

**Expected Output:**
```
 ✓ Ready in 16.4s
 Local:   http://localhost:3000
```

## ✅ Backend Testing

### Test 1: Health Check
```bash
curl http://localhost:8000/
```

**Expected Response:**
```json
{
  "service": "OFFO Risk Score API",
  "version": "1.0.0",
  "status": "operational"
}
```

### Test 2: Get Risk Score (Healthy Business)
```bash
curl http://localhost:8000/risk-score/biz_healthy
```

**Expected Response:**
```json
{
  "business_id": "biz_healthy",
  "overall_score": 91.5,
  "category": "LOW",
  "components": {
    "task_adherence_score": 95.0,
    "training_score": 92.0,
    "documentation_score": 86.0
  },
  "weights": {
    "task_adherence": 0.4,
    "training_completion": 0.3,
    "documentation_accuracy": 0.3
  },
  "trend_30d": [
    {"date": "2024-11-06", "score": 88.0},
    {"date": "2024-11-07", "score": 88.5},
    ...
  ],
  "drivers": [
    {
      "label": "Task Completion Excellence",
      "impact": "positive",
      "description": "Strong task adherence with 95% completion rate..."
    },
    ...
  ],
  "recommended_actions": [
    "Continue current compliance practices",
    "Maintain regular monitoring and reviews",
    ...
  ]
}
```

### Test 3: Get Risk Score (Risky Business)
```bash
curl http://localhost:8000/risk-score/biz_risky
```

**Expected:**
- `overall_score`: ~42
- `category`: "HIGH"
- Multiple negative impact drivers
- Urgent recommended actions

### Test 4: List All Businesses
```bash
curl http://localhost:8000/businesses
```

**Expected Response:**
```json
{
  "businesses": [
    "biz_healthy",
    "biz_mixed",
    "biz_risky",
    "biz_critical",
    "biz_excellent"
  ]
}
```

### Test 5: Get Raw Metrics
```bash
curl http://localhost:8000/risk-score/biz_healthy/raw
```

**Expected Response:**
```json
{
  "business_id": "biz_healthy",
  "metrics": {
    "task_completion_rate": 0.95,
    "overdue_task_rate": 0.05,
    "training_completion_rate": 0.92,
    "doc_error_rate": 0.05,
    "doc_missing_field_rate": 0.03
  }
}
```

### Test 6: API Documentation
Visit: http://localhost:8000/docs

**Should see:**
- Swagger UI with all endpoints
- Interactive API testing interface
- Full request/response schemas

### Test 7: Error Handling
```bash
curl http://localhost:8000/risk-score/invalid_business
```

**Expected Response:**
```json
{
  "detail": "Business ID 'invalid_business' not found"
}
```

**Status Code:** 404

## ✅ Frontend Testing

### Test 1: Homepage
**URL:** http://localhost:3000

**Should see:**
- ✅ "OFFO Risk Intelligence Dashboard" header
- ✅ 5 business cards in a grid
- ✅ Each card shows business name and expected risk
- ✅ "View Dashboard →" link on each card
- ✅ 3 feature cards (Risk Scoring, Trend Analysis, Action Plans)
- ✅ Blue info banner about MVP mode

**Interactions:**
- Hover over business cards → border changes to blue
- Cards should be clickable

### Test 2: Healthy Business Dashboard
**URL:** http://localhost:3000/risk/biz_healthy

**Should see:**

**Header:**
- ✅ Business ID: biz_healthy
- ✅ GREEN "LOW RISK" badge
- ✅ "Export PDF" button

**Risk Score Gauge (Left Top):**
- ✅ Speedometer with colored arc (green zone)
- ✅ Needle pointing to ~91
- ✅ Large score number: 91.5
- ✅ "LOW RISK" badge below gauge
- ✅ Legend showing risk zones

**30-Day Trend (Right Top):**
- ✅ Line chart with 30 data points
- ✅ Upward trending or stable line
- ✅ "Improving" indicator with ↑ icon
- ✅ Point difference shown (+X points)
- ✅ Hover tooltip shows date and score

**Component Breakdown (Middle):**
- ✅ 3 cards showing scores
- ✅ Task Adherence: ~95
- ✅ Training: ~92
- ✅ Documentation: ~86
- ✅ Weights displayed (40%, 30%, 30%)

**Drivers of Risk (Bottom Left):**
- ✅ 3 driver cards
- ✅ All should be GREEN (positive)
- ✅ Checkmark icons
- ✅ "Positive: 3" in summary

**Recommended Actions (Bottom Right):**
- ✅ "Maintain Excellence" header
- ✅ ~5 numbered action items
- ✅ Maintenance-focused actions
- ✅ Total actions count

### Test 3: Risky Business Dashboard
**URL:** http://localhost:3000/risk/biz_risky

**Should see:**

**Header:**
- ✅ Business ID: biz_risky
- ✅ RED "HIGH RISK" badge

**Risk Score Gauge:**
- ✅ Needle pointing to ~42 (red zone)
- ✅ Score: 42.0
- ✅ "HIGH RISK" badge (red)

**30-Day Trend:**
- ✅ Declining trend line
- ✅ "Declining" indicator with ↓ icon
- ✅ Negative point difference

**Drivers of Risk:**
- ✅ Mix of yellow and red cards
- ✅ X icons for negative drivers
- ✅ "Negative: 2+" in summary

**Recommended Actions:**
- ✅ "Urgent Action Required" header (red)
- ✅ ~7-8 action items
- ✅ First 2 have "!" high-priority badge
- ✅ Urgent alert at bottom

### Test 4: Mixed Business Dashboard
**URL:** http://localhost:3000/risk/biz_mixed

**Should see:**
- ✅ YELLOW "MODERATE RISK" badge
- ✅ Score: ~68
- ✅ Mix of positive/neutral drivers
- ✅ "Improvement Needed" in actions

### Test 5: All Businesses
Test each URL:
- http://localhost:3000/risk/biz_excellent (~98, LOW)
- http://localhost:3000/risk/biz_healthy (~91, LOW)
- http://localhost:3000/risk/biz_mixed (~68, MODERATE)
- http://localhost:3000/risk/biz_risky (~42, HIGH)
- http://localhost:3000/risk/biz_critical (~28, HIGH)

### Test 6: PDF Export
**Steps:**
1. Go to any business dashboard
2. Click "Export PDF" button
3. Print dialog should open
4. Select "Save as PDF" or "Print to PDF"

**Expected:**
- All dashboard content visible in print preview
- Colors preserved
- Proper page breaks

### Test 7: Responsive Design
**Test at different widths:**
- **Desktop (1920px):** 2-column grid layout
- **Tablet (768px):** Stacked components
- **Mobile (375px):** Single column, readable text

### Test 8: Error Handling
**URL:** http://localhost:3000/risk/invalid_business

**Should see:**
- Custom 404 page OR
- Error message: "Business ID 'invalid_business' not found"

## 🎯 Component-Specific Tests

### RiskScoreGauge Component
- [ ] Needle animates when score changes
- [ ] Colors match risk level (green/yellow/red)
- [ ] Score displays accurately
- [ ] Category badge shows correct text
- [ ] Tick marks are visible and labeled

### TrendLine30d Component
- [ ] 30 data points rendered
- [ ] Trend direction calculated correctly
- [ ] Tooltip shows on hover
- [ ] Reference lines at 50 and 80
- [ ] Chart is responsive

### DriversOfRisk Component
- [ ] 3 driver cards displayed
- [ ] Impact colors correct (green/yellow/red)
- [ ] Icons match impact type
- [ ] Summary counts accurate
- [ ] Descriptions are clear

### RecommendedActions Component
- [ ] Actions match risk category
- [ ] High-priority items marked for HIGH risk
- [ ] Numbered items for standard priority
- [ ] Total count displayed
- [ ] Alert shown for HIGH risk

## 🐛 Debugging Checklist

### Backend Issues

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <pid> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

**Module not found:**
```bash
pip install -r requirements.txt
```

**Import errors:**
```bash
# Make sure you're in backend directory
cd backend
python main.py
```

### Frontend Issues

**Port 3000 in use:**
```bash
# Kill process on 3000
# Windows: Task Manager
# Mac/Linux: lsof -ti:3000 | xargs kill -9
```

**Cannot connect to backend:**
1. Check backend is running on port 8000
2. Check `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`
3. Check browser console for CORS errors

**Charts not displaying:**
1. Open browser console (F12)
2. Look for Recharts errors
3. Verify `npm install recharts` ran successfully

**Components not found:**
1. Check imports use `@/components/...`
2. Verify tsconfig.json has paths configured
3. Restart dev server: Ctrl+C, then `npm run dev`

## 📊 Expected Scores by Business

| Business ID | Overall Score | Category | Trend | Top Driver Impact |
|------------|---------------|----------|-------|------------------|
| biz_excellent | ~98 | LOW | ↑ Improving | Positive |
| biz_healthy | ~91 | LOW | ↑ Stable/Improving | Positive |
| biz_mixed | ~68 | MODERATE | → Stable/Declining | Neutral |
| biz_risky | ~42 | HIGH | ↓ Declining | Negative |
| biz_critical | ~28 | HIGH | ↓ Declining | Negative |

## ✅ Acceptance Criteria

### Backend ✅
- [ ] All 5 businesses return valid scores
- [ ] Scores match expected ranges
- [ ] `trend_30d` has 30 data points
- [ ] `drivers` has 3 items
- [ ] `recommended_actions` has 4-8 items
- [ ] 404 for invalid business IDs
- [ ] API docs accessible at /docs

### Frontend ✅
- [ ] Homepage displays 5 business cards
- [ ] All business links work
- [ ] Gauge displays correct score
- [ ] Trend chart shows 30 days
- [ ] Drivers show correct impacts
- [ ] Actions are category-appropriate
- [ ] PDF export works
- [ ] No console errors
- [ ] Responsive on mobile

## 🎉 Success Criteria

**MVP is successful if:**
1. ✅ All 5 businesses load without errors
2. ✅ Scores accurately reflect business metrics
3. ✅ Visual components render correctly
4. ✅ Trends show realistic patterns
5. ✅ Drivers identify key issues
6. ✅ Actions are helpful and specific
7. ✅ PDF export produces readable output
8. ✅ No blocking bugs or errors

## 📞 Getting Help

**If tests fail:**
1. Check backend logs for errors
2. Check browser console for frontend errors
3. Verify both servers are running
4. Check file paths and imports
5. Review [ENHANCED_FEATURES.md](ENHANCED_FEATURES.md)
6. Review [QUICKSTART.md](docs/QUICKSTART.md)

---

**Ready to test?** Start both servers and follow the checklist above!
