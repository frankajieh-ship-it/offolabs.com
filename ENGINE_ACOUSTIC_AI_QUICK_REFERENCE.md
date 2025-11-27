# Engine Acoustic AI — Quick Reference

Fast reference guide for the 4 new Engine Acoustic AI components and page integration.

## Component Overview

| Component | Grid Layout | Key Lines |
|-----------|------------|-----------|
| AcousticDatabaseHighlight | 1 col → 5 cols (lg) | Categories: 10-36, Advantages: 94-106 |
| AccuracyMetrics | 1 col → 4 cols (lg) | Metrics: 12-41, Colors: 43-72 |
| UseCasesSection | 1 col → 2 cols (md) | Use Cases: 11-52 |
| DiagnosticComparison | Full width | Features: 10-51 |

## Quick Imports

```typescript
import AcousticDatabaseHighlight from '@/components/products/AcousticDatabaseHighlight'
import AccuracyMetrics from '@/components/products/AccuracyMetrics'
import DiagnosticComparison from '@/components/products/DiagnosticComparison'
import UseCasesSection from '@/components/products/UseCasesSection'
```

## Quick Usage

```typescript
<AcousticDatabaseHighlight />
<AccuracyMetrics />
<UseCasesSection />
<DiagnosticComparison />
```

## Edit Categories (AcousticDatabaseHighlight)

Edit the `categories` array (lines 10-36) with: name, description, icon

```typescript
{
  name: 'Passenger Vehicles',
  description: 'Sedan, SUV, hatchback, and crossover acoustic signatures',
  icon: <AlertCircle className="w-6 h-6" />,
}
```

## Edit Metrics (AccuracyMetrics)

Edit the `metrics` array (lines 12-41) with: icon, value, label, description, color

```typescript
{
  icon: <Target className="w-8 h-8" />,
  value: '98%+',
  label: 'Diagnostic Accuracy',
  description: 'Across all vehicle makes, models, and conditions',
  color: 'blue'
}
```

Available colors: blue, green, orange, purple

## Edit Use Cases (UseCasesSection)

Edit the `useCases` array (lines 11-52) with: title, description, icon, benefits[]

```typescript
{
  title: 'Fleet Maintenance Managers',
  description: 'Prevent costly breakdowns and reduce unplanned downtime',
  icon: <BarChart3 className="w-8 h-8" />,
  benefits: ['Predictive maintenance schedules', 'Reduce emergency repairs by 60%+', 'Extend vehicle lifespan']
}
```

## Edit Comparison Features (DiagnosticComparison)

Edit the `features` array (lines 10-51) with: feature, oem, engineAcousticAI

```typescript
{
  feature: 'Covers All Makes & Models',
  oem: false,
  engineAcousticAI: true
}
```

## Styling Quick Reference

### Colors
```
Primary Accent: orange (hover states)
Metric Colors: blue, green, orange, purple
Backgrounds: gray-50 (light), gray-900/50 (dark)
Text: gray-600 to gray-900 (with dark: variants)
```

### Spacing
```
Section Baseline: py-12 sm:py-16 lg:py-20
Container Padding: px-4 sm:px-6 lg:px-8
Grid Gaps: gap-6 or gap-8
Card Padding: p-6 or p-8
```

## Icons (from lucide-react)

**AcousticDatabaseHighlight**: Database, TrendingUp, AlertCircle
**AccuracyMetrics**: Target, TrendingUp, Clock, Zap
**UseCasesSection**: Wrench, Users, BarChart3, Shield
**DiagnosticComparison**: CheckCircle2, XCircle

## Page Integration Order

```
PageHero
→ AcousticDatabaseHighlight (database intro)
→ AccuracyMetrics (performance metrics)
→ DatasetsAndCapabilities (existing)
→ HowItWorksAcoustic (existing)
→ EngineAcousticAIFeatures (existing)
→ UseCasesSection (audience personas)
→ UseCasesGrid (existing)
→ DiagnosticComparison (OEM comparison)
→ EngineHealthDiagnostics (existing)
```

## Files

- **Components**: `/app/components/products/`
  - AcousticDatabaseHighlight.tsx
  - AccuracyMetrics.tsx
  - UseCasesSection.tsx
  - DiagnosticComparison.tsx

- **Page**: `/app/products/engine-acoustic-ai/page.tsx`

- **Documentation**:
  - ENGINE_ACOUSTIC_AI_IMPLEMENTATION.md (detailed)
  - ENGINE_ACOUSTIC_AI_QUICK_REFERENCE.md (this file)

## Verify Changes

```bash
npx tsc --noEmit
```

## Performance

- No useState/useEffect
- No API calls
- Static content only
- CSS-only animations (GPU accelerated)

## Support

See ENGINE_ACOUSTIC_AI_IMPLEMENTATION.md for detailed documentation
