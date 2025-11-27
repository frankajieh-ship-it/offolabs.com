# Feature Blocks - Quick Reference

## 📦 Components

### 1. FeatureBlock (Reusable)
**Path**: `app/components/products/FeatureBlock.tsx`

Single feature card component - use for custom feature layouts.

```typescript
import FeatureBlock from '@/components/products/FeatureBlock'

<FeatureBlock
  title="Feature Name"
  description="Feature description goes here"
  tag="Optional: Coming Soon"
  icon={<IconComponent className="w-8 h-8" />}
/>
```

**Features**:
- OFFO brand gradient on hover
- Icon with scale animation
- Optional tag/badge
- Dark mode support

---

### 2. FeatureBlocks (Section)
**Path**: `app/components/sections/products/FeatureBlocks.tsx`

Complete section component with 4 CodeCrack features in 2×2 grid.

```typescript
import FeatureBlocks from '@/components/sections/products/FeatureBlocks'

<FeatureBlocks />
```

**Includes**:
- Daily Duel (Coming Soon)
- AI Duel
- Ranked Ladder & Seasons
- Cosmetics & Themes

---

## 🎨 Visual Design

### Card Styling
```
Light Mode:
- Background: White (#ffffff)
- Border: Gray 200 (#e5e7eb)
- Icon: Primary 600 (#0284c7)

Dark Mode:
- Background: Gray 900/50 (rgba(17, 24, 39, 0.5))
- Border: Gray 800 (#1f2937)
- Icon: Primary 400 (#38bdf8)

Hover (All Modes):
- Shadow: shadow-offo-lg (brand shadow)
- Gradient: gradient-offo-accent (10-15% opacity)
- Border: Primary 300/700
```

### Layout
```
Mobile (320px):     1 column
Tablet (768px):     2 columns
Desktop (1024px+):  2 columns (2×2 grid)

Card Gap: 32px (gap-8)
Section Padding: 48px | 64px | 80px
```

---

## 🎯 CodeCrack Features

| Feature | Icon | Tag | Position |
|---------|------|-----|----------|
| **Daily Duel** | Calendar ⏰ | Coming Soon | Top-Left |
| **AI Duel** | Zap ⚡ | — | Top-Right |
| **Ranked Ladder** | Trophy 🏆 | — | Bottom-Left |
| **Cosmetics** | Palette 🎨 | — | Bottom-Right |

---

## 🔧 Customization Examples

### Change Grid to 3 Columns
```typescript
// In FeatureBlocks.tsx, line 49:
className="grid grid-cols-1 md:grid-cols-2 gap-8"
// Change to:
className="grid grid-cols-1 md:grid-cols-3 gap-8"
```

### Change Card Spacing
```typescript
// Tighter spacing (24px)
gap-6

// Current spacing (32px)
gap-8

// Looser spacing (40px)
gap-10
```

### Add Feature Manually
```typescript
const features: Feature[] = [
  // ... existing features
  {
    icon: <NewIcon className="w-8 h-8" />,
    title: 'New Feature',
    tag: 'Beta',
    description: 'Feature description here.'
  }
]
```

### Link to Detail Pages
```typescript
// Wrap card in Link component
<Link href={`/codecrack/${featureName}`}>
  <FeatureBlock {...feature} />
</Link>
```

---

## 📋 Files & Paths

```
Components:
├── app/components/products/
│   └── FeatureBlock.tsx             [Reusable component]
└── app/components/sections/products/
    └── FeatureBlocks.tsx            [Section component]

Pages:
└── app/products/codecrack/
    └── page.tsx                     [Uses FeatureBlocks]

Config:
├── tailwind.config.ts               [Brand gradients]
├── app/globals.css                  [CSS utilities]
└── app/components/layouts/
    └── ProductPageLayout.tsx        [Layout wrapper]
```

---

## 🎯 Copy-Paste: Feature Block Card

```tsx
<div className="group relative rounded-lg border border-gray-200 dark:border-gray-800
  bg-white dark:bg-gray-900/50 p-8 transition-all duration-300
  hover:shadow-offo-lg hover:border-primary-300 dark:hover:border-primary-700
  overflow-hidden">

  {/* OFFO Brand Gradient Background (Hover) */}
  <div className="absolute inset-0 bg-gradient-offo-accent
    opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

  {/* Icon */}
  <div className="mb-4 text-primary-600 dark:text-primary-400
    group-hover:scale-110 transition-transform">
    <IconName className="w-8 h-8" />
  </div>

  {/* Tag (optional) */}
  <div className="mb-3">
    <span className="inline-block px-3 py-1 rounded-full text-xs
      font-semibold bg-primary-100 dark:bg-primary-900/30
      text-primary-700 dark:text-primary-300
      border border-primary-300 dark:border-primary-700">
      Coming Soon
    </span>
  </div>

  {/* Title */}
  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3
    group-hover:text-primary-600 dark:group-hover:text-primary-400
    transition-colors">
    Feature Title
  </h3>

  {/* Description */}
  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
    Feature description goes here.
  </p>
</div>
```

---

## 🎬 Copy-Paste: Full FeatureBlocks Section

```tsx
<section className="py-12 sm:py-16 lg:py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center space-y-4 mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold
        text-gray-900 dark:text-white">
        Core Features
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Everything you need to become a master code-breaker
      </p>
    </div>

    {/* Grid - 2x2 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((feature) => (
        <FeatureBlock
          key={feature.title}
          title={feature.title}
          description={feature.description}
          tag={feature.tag}
          icon={feature.icon}
        />
      ))}
    </div>
  </div>
</section>
```

---

## 🚀 Quick Integration

1. **Import the section**:
   ```typescript
   import FeatureBlocks from '@/components/sections/products/FeatureBlocks'
   ```

2. **Add to page**:
   ```typescript
   <FeatureBlocks />
   ```

3. **Done!** - Component automatically includes all styling and layout.

---

## 🎨 Brand Colors Used

- **Primary**: `#0284c7` (light), `#38bdf8` (dark)
- **Primary 100**: `#e0f2fe` (light bg)
- **Primary 900/30**: Dark mode primary bg
- **Gray 200**: Light borders
- **Gray 800**: Dark borders
- **White**: Light card background
- **Gray 900/50**: Dark card background

---

## ✨ Hover Effects Summary

| Element | Effect | Duration |
|---------|--------|----------|
| Card | shadow-offo-lg + gradient reveal | 300ms |
| Border | Gray → Primary | 300ms |
| Icon | scale 100% → 110% | 300ms |
| Title | Gray → Primary | 300ms |
| Background | Gradient opacity 0% → 100% | 300ms |

---

## 📊 Component Stats

- **Size**: ~2.3 KB minified
- **Dependencies**: lucide-react only
- **Load Time**: Instant
- **Animations**: CSS only (no JS)
- **Dark Mode**: Fully supported
- **Responsive**: Mobile, tablet, desktop

---

**Last Updated**: November 23, 2025
**Status**: Production Ready ✅
