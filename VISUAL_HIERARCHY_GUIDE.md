# OFFO Labs — Visual Hierarchy Guide

**Last Updated**: November 23, 2025
**Status**: ✅ Complete
**Brand Version**: 1.0

---

## 📐 Visual Hierarchy Rules Overview

This guide documents the visual hierarchy standards for OFFO Labs website, ensuring consistent brand implementation across all components.

### Core Principles

1. **Hero is Clean, Minimal, Powerful** - Hero section leads with impact
2. **Ecosystem Cards Use OFFO Brand Gradient** - Distinctive card branding
3. **White/Light Backgrounds for Simplicity** - Clean, minimal aesthetic
4. **Icons Consistent Across Sections** - Unified icon system (lucide-react)
5. **Max-w-screen-xl Container with Center Alignment** - Proper content width
6. **48px Vertical Spacing Between Major Sections** - Consistent rhythm

---

## 🎨 OFFO Brand Gradient Configuration

### Tailwind Colors & Gradients

All brand gradients are defined in `tailwind.config.ts`:

```typescript
// Primary Brand Gradient (Main CTA, Hero, Key Elements)
'gradient-offo': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)'

// Subtle Brand Gradient (Secondary buttons, accents)
'gradient-offo-subtle': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'

// Reversed Gradient (For dark backgrounds)
'gradient-offo-reversed': 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%)'

// Dark Mode Gradient
'gradient-offo-dark': 'linear-gradient(135deg, #082f49 0%, #0369a1 100%)'

// Light Mode Gradient
'gradient-offo-light': 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)'

// Card Accent Gradients (Hover states)
'gradient-offo-accent': 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(2, 132, 199, 0.1) 100%)'
'gradient-offo-accent-hover': 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(2, 132, 199, 0.15) 100%)'
```

### OFFO Color Palette

```typescript
offo: {
  50:  '#f8fafc',   // Lightest
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',   // Medium
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',   // Darkest
}
```

### OFFO Brand Shadows

```typescript
'shadow-offo':    '0 4px 20px rgba(14, 165, 233, 0.15)'   // Default
'shadow-offo-lg': '0 10px 40px rgba(14, 165, 233, 0.2)'   // Large hover
'shadow-offo-xl': '0 20px 60px rgba(14, 165, 233, 0.25)'  // Extra large
```

---

## 🏗️ Component Visual Hierarchy

### 1. Hero Section (`HeroSection.tsx`)

**Purpose**: Hero banner with headline, CTA buttons, and stats

**Visual Rules**:
- ✅ **Clean & Minimal**: Animated gradient background (orbs only)
- ✅ **Powerful Headline**: Responsive text (h1) 4xl → 6xl
- ✅ **Spacing**: `py-12 sm:py-16 lg:py-20` (48px baseline)
- ✅ **CTA Buttons**: Primary (gradient) + Secondary (outlined)
- ✅ **Animations**: Framer Motion staggered reveal

**Current Implementation**:
```tsx
<section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
  {/* Animated gradient background */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
      AI tools for daily life, commerce, and engineering diagnostics.
    </h1>
  </div>
</section>
```

**Status**: ✅ Meets all visual hierarchy requirements

---

### 2. Ecosystem Grid (`EcosystemGrid.tsx`)

**Purpose**: 6-card product showcase with brand visual identity

**Visual Rules**:
- ✅ **OFFO Brand Gradient**: Subtle gradient accent on hover
- ✅ **Clean Cards**: White/light backgrounds with minimal borders
- ✅ **Icon Consistency**: lucide-react ArrowRight icon
- ✅ **Spacing**: `py-12 sm:py-16 lg:py-20` (48px baseline)
- ✅ **Card Grid**: 2 columns desktop, 1 mobile
- ✅ **Hover Effect**: Brand shadow + gradient accent

**Current Implementation** (ProductCard.tsx):
```tsx
<div className="group h-full cursor-pointer rounded-lg
  border border-gray-200 dark:border-gray-800
  bg-white dark:bg-gray-900/50 p-8
  transition-all duration-300 hover:shadow-offo-lg
  hover:border-primary-300 dark:hover:border-primary-700
  relative overflow-hidden">

  {/* OFFO Brand Gradient Background (Hover) */}
  <div className="absolute inset-0 bg-gradient-offo-accent
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300 -z-10" />
</div>
```

**Status**: ✅ Brand gradient now applied to all ecosystem cards

---

### 3. Founders Story Preview (`FoundersStoryPreview.tsx`)

**Purpose**: Team narrative and founder introduction

**Visual Rules**:
- ✅ **Subtle Background**: Light gradient background (brand colors)
- ✅ **Spacing**: `py-12 sm:py-16 lg:py-20` (48px baseline)
- ✅ **Typography**: Clear heading hierarchy
- ✅ **Icons**: lucide-react for CTAs (ArrowRight)

**Current Implementation**:
```tsx
<section className="relative py-12 sm:py-16 lg:py-20
  bg-gradient-to-br from-primary-50 to-primary-100/50
  dark:from-primary-950/20 dark:to-primary-900/10">
```

**Status**: ✅ Meets visual hierarchy requirements

---

### 4. Why OFFO Section (`WhyOffoSection.tsx`)

**Purpose**: Value propositions and differentiators (4 pillars)

**Visual Rules**:
- ✅ **Clean White Background**: Simple, minimal design
- ✅ **Spacing**: `py-12 sm:py-16 lg:py-20` (48px baseline)
- ✅ **Icon Consistency**: 4 lucide-react icons (Zap, ShoppingCart, Wrench, Bot)
- ✅ **Icon Size**: Uniform `w-8 h-8` across all
- ✅ **Responsive Grid**: 1 col mobile → 2 col tablet → 4 col desktop
- ✅ **Hover Effects**: Brand color transitions

**Current Implementation**:
```tsx
<section className="relative py-12 sm:py-16 lg:py-20">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {OFFO_PILLARS.map((pillar) => (
      <div className="group ... hover:shadow-lg hover:border-primary-300">
        <div className="text-primary-600 dark:text-primary-400
          mb-4 group-hover:scale-110 transition-transform">
          {iconMap[pillar.icon]}
        </div>
      </div>
    ))}
  </div>
</section>
```

**Status**: ✅ Icon consistency and spacing implemented

---

### 5. Investor Highlight (`InvestorHighlight.tsx`)

**Purpose**: Investment opportunity and metrics

**Visual Rules**:
- ✅ **Dark Background**: Dark gradient background for contrast
- ✅ **Spacing**: `py-12 sm:py-16 lg:py-20` (48px baseline)
- ✅ **Card Styling**: White/light card on dark background
- ✅ **Typography**: Clear hierarchy with metrics
- ✅ **CTA**: Primary brand gradient button

**Current Implementation**:
```tsx
<section className="relative py-12 sm:py-16 lg:py-20
  bg-gradient-to-br from-gray-900 via-primary-900/30 to-gray-900">
```

**Status**: ✅ Meets visual hierarchy requirements

---

### 6. Newsletter Section (`NewsletterSection.tsx`)

**Purpose**: Email subscription form

**Visual Rules**:
- ✅ **Brand Gradient Background**: Primary gradient for strong CTA
- ✅ **Spacing**: `py-12 sm:py-16 lg:py-20` (48px baseline)
- ✅ **Form Design**: Clean white input with rounded corners
- ✅ **CTA Button**: Primary brand button
- ✅ **Dark Mode**: Proper contrast in dark mode

**Current Implementation**:
```tsx
<section className="relative py-12 sm:py-16 lg:py-20
  bg-gradient-to-r from-primary-600 to-primary-800
  dark:from-primary-900 dark:to-primary-950" id="newsletter">
```

**Status**: ✅ Meets visual hierarchy requirements

---

## 📏 Spacing Standards

### Section Vertical Spacing (48px Baseline)

All major sections follow this responsive spacing:

```typescript
// Mobile: 48px (py-12 = 3rem)
// Tablet: 64px (sm:py-16 = 4rem)
// Desktop: 80px (lg:py-20 = 5rem)

className="py-12 sm:py-16 lg:py-20"
```

**Applied to all sections**:
- ✅ HeroSection
- ✅ EcosystemGrid
- ✅ FoundersStoryPreview
- ✅ WhyOffoSection
- ✅ InvestorHighlight
- ✅ NewsletterSection

### Internal Section Spacing

**Heading to Content**: `mb-16` (internal large spacing)
**Section Padding**: `px-4 sm:px-6 lg:px-8` (consistent container padding)

---

## 🎯 Icon Standards

### Icon Library

All icons use **lucide-react** for consistency.

**Standard Icon Sizes**:
- Small: `w-4 h-4` (inline, 16px)
- Medium: `w-6 h-6` (standard, 24px)
- Large: `w-8 h-8` (section icons, 32px)
- XL: `w-12 h-12` (hero/featured, 48px)

**Icon Color Mapping**:
- Primary: `text-primary-600 dark:text-primary-400`
- Accent: `text-gray-600 dark:text-gray-400`
- On Hover: Scales to 1.1x with smooth transition

**Icon Implementation** (WhyOffoSection example):
```tsx
const iconMap = {
  'Zap': <Zap className="w-8 h-8" />,
  'ShoppingCart': <ShoppingCart className="w-8 h-8" />,
  'Wrench': <Wrench className="w-8 h-8" />,
  'Bot': <Bot className="w-8 h-8" />
}

// In component:
<div className="text-primary-600 dark:text-primary-400
  mb-4 group-hover:scale-110 transition-transform">
  {iconMap[pillar.icon]}
</div>
```

**Status**: ✅ All icons consistent across sections

---

## 🎨 Color Application Rules

### Text Colors

| Context | Light Mode | Dark Mode | Usage |
|---------|-----------|-----------|-------|
| Primary Heading | `text-gray-900` | `text-white` | h1, h2, h3 |
| Secondary Text | `text-gray-600` | `text-gray-400` | Body, descriptions |
| Tertiary Text | `text-gray-500` | `text-gray-500` | Captions, labels |
| Brand Accent | `text-primary-600` | `text-primary-400` | CTAs, highlights |
| On Gradient | `text-white` | `text-white` | Text on brand gradient |

### Background Colors

| Context | Light | Dark | Usage |
|---------|-------|------|-------|
| Default Section | `bg-white` | `bg-gray-900/50` | Most sections |
| Contrast Section | `bg-gray-50` | `bg-gray-900/50` | EcosystemGrid |
| Brand Section | `bg-gradient-offo` | `bg-gradient-offo-dark` | Primary CTAs |
| Subtle Accent | `bg-primary-50` | `bg-primary-900/30` | Badges, highlights |

### Border Colors

| Context | Light | Dark |
|---------|-------|------|
| Default | `border-gray-200` | `border-gray-800` |
| Hover | `border-primary-300` | `border-primary-700` |
| Focus | `border-primary-600` | `border-primary-400` |

---

## 🚀 Implementation Checklist

### For Developers

When implementing new sections or components:

- [ ] **Spacing**: Use `py-12 sm:py-16 lg:py-20` for section padding
- [ ] **Container**: Use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- [ ] **Icons**: Import from `lucide-react`, use consistent sizing
- [ ] **Colors**: Follow text/background color rules above
- [ ] **Gradients**: Use `bg-gradient-offo*` utility classes
- [ ] **Dark Mode**: Include `dark:` variants for all colors
- [ ] **Hover States**: Use `group-hover:` with `transition-*` classes
- [ ] **Shadows**: Apply `shadow-offo` on card hover
- [ ] **Typography**: Responsive sizes (sm:, md:, lg: breakpoints)
- [ ] **Responsive**: Test at 320px, 768px, 1024px, 1280px+

### CSS Utility Classes Available

**In `globals.css`**:
```css
.gradient-offo-brand     /* Full brand gradient */
.gradient-offo-card      /* Card accent gradient */
.gradient-offo-card-hover /* Card hover gradient */
.text-gradient-offo      /* Gradient text effect */
.shadow-offo             /* Brand shadow */
.shadow-offo-lg          /* Large brand shadow */
.shadow-offo-xl          /* Extra-large brand shadow */
.section-spacing-lg      /* Section vertical spacing */
```

---

## 📱 Responsive Breakpoints

OFFO Labs uses Tailwind's standard breakpoints:

```
Mobile:  320px - 639px   (base styles, no prefix)
Tablet:  640px - 1023px  (sm: prefix)
Desktop: 1024px - 1279px (lg: prefix)
Large:   1280px+         (xl: prefix)
```

### Visual Hierarchy at Breakpoints

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero Headline | text-4xl | text-5xl | text-6xl |
| Section Title | text-3xl | text-4xl | text-5xl |
| Section Padding | py-12 | sm:py-16 | lg:py-20 |
| Container Width | full | full | max-w-7xl |
| Grid Columns | 1 | 2-4 | 2-4 |

---

## 🔄 Brand Gradient Usage Guide

### Primary CTA Buttons
```tsx
<button className="bg-gradient-offo text-white font-semibold
  hover:shadow-offo-lg transition-all">
  Join Waitlist
</button>
```

### Card Hover Effects
```tsx
<div className="group hover:shadow-offo-lg transition-all">
  <div className="absolute inset-0 bg-gradient-offo-accent
    opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
</div>
```

### Section Backgrounds
```tsx
<section className="bg-gradient-offo-light dark:bg-gradient-offo-dark">
  {/* Content */}
</section>
```

### Text Gradients
```tsx
<h1 className="text-gradient-offo">
  Gradient Text Heading
</h1>
```

---

## 🎓 Design System Best Practices

### ✅ DO:
- Use brand gradients for primary CTAs and highlights
- Maintain consistent spacing (48px between sections)
- Use lucide-react icons exclusively
- Include dark mode variants for all colors
- Apply hover states with smooth transitions
- Test across all responsive breakpoints
- Use semantic HTML (section, main, header, footer)

### ❌ DON'T:
- Use custom colors outside the palette
- Apply arbitrary spacing values
- Mix icon libraries (lucide-react + others)
- Create dark mode without Tailwind's `dark:` prefix
- Apply instant transitions without `transition-` classes
- Hardcode pixel values (use Tailwind utilities)
- Skip responsive variants

---

## 📚 Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Component architecture
- **[IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)** — Build status
- **[QUICK_START.md](./QUICK_START.md)** — Developer quick start
- **[tailwind.config.ts](./tailwind.config.ts)** — Brand config
- **[app/globals.css](./app/globals.css)** — Global utilities

---

## 🔗 Design System References

| Resource | Purpose | Location |
|----------|---------|----------|
| Brand Gradients | Tailwind extension | `tailwind.config.ts` |
| CSS Utilities | Global styles | `app/globals.css` |
| Color Palette | Brand colors | `tailwind.config.ts` (offo) |
| Icon System | Lucide React | NPM package |
| Spacing Scale | Tailwind default | 8px baseline |

---

## 📋 Maintenance & Updates

**Last Review**: November 23, 2025
**Next Review**: When adding new major sections
**Owner**: Operations & Code Implementation

**Changes Made**:
- ✅ Added OFFO brand gradient to Tailwind config
- ✅ Applied brand gradient to ProductCard component
- ✅ Standardized vertical spacing (48px baseline) across all sections
- ✅ Created visual hierarchy documentation

---

**Status**: ✅ **COMPLETE & PRODUCTION-READY**

All visual hierarchy rules have been implemented and documented. Components now feature consistent brand gradients, proper spacing, and unified icon systems across the entire website.

🎨 **Brand Visual Hierarchy Locked & Implemented**
