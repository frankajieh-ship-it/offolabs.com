# Shared Product Components — Quick Reference

**TL;DR** - Copy-paste code for common patterns

---

## 🚀 Quick Start

### Import All Shared Components

```typescript
import PageHero from '@/components/products/PageHero'
import Section from '@/components/products/Section'
import ProductNewsletter from '@/components/products/ProductNewsletter'
import ProductPageLayout from '@/components/layouts/ProductPageLayout'
```

---

## 📄 PageHero Component

### Minimal Hero

```typescript
<PageHero
  title="Your Product Name"
  subtitle="One-line description of what it does"
/>
```

### Full-Featured Hero

```typescript
<PageHero
  title="Master Logic Puzzles in Real-Time Duels"
  subtitle="AI-powered code-breaking game"
  description="Challenge yourself with daily puzzles, AI opponents, and ranked competitions"
  badge={{
    text: 'Coming Soon',
    color: 'amber'
  }}
  ctaButtons={[
    {
      label: 'Join Waitlist',
      href: '#newsletter',
      variant: 'primary'
    },
    {
      label: 'Learn More',
      href: '#features',
      variant: 'secondary'
    }
  ]}
  backgroundVariant="gradient"
/>
```

### Props Quick Reference

```typescript
title: string              // REQUIRED
subtitle: string           // REQUIRED
description?: string       // Optional longer text
badge?: {
  text: string
  color?: 'primary' | 'amber' | 'green'  // Default: 'primary'
}
ctaButtons?: Array<{
  label: string
  href: string
  variant: 'primary' | 'secondary'
}>
backgroundVariant?: 'gradient' | 'dots' | 'none'  // Default: 'gradient'
```

---

## 📦 Section Component

### Simple Section

```typescript
<Section>
  <h2 className="text-4xl font-bold mb-12">Your Section Title</h2>
  {/* Your content here */}
</Section>
```

### Section with Variant & ID

```typescript
<Section id="features" variant="alternate">
  <h2 className="text-4xl font-bold">Features</h2>
  <p className="text-gray-600 dark:text-gray-400 mb-12">
    Everything included
  </p>
  {/* Feature grid or content */}
</Section>
```

### With Custom Classes

```typescript
<Section variant="gradient" className="relative">
  <div className="relative z-10">
    {/* Content over gradient */}
  </div>
</Section>
```

### Props Quick Reference

```typescript
children: ReactNode        // REQUIRED
variant?: 'default' | 'alternate' | 'gradient'  // Default: 'default'
id?: string               // For anchor links
className?: string        // Extra Tailwind classes
```

### Variants

- **default**: White/dark background
- **alternate**: Light gray/dark gray background
- **gradient**: Primary gradient background

---

## 📧 ProductNewsletter Component

### Minimal Newsletter

```typescript
<ProductNewsletter
  productName="CodeCrack"
  productSlug="codecrack"
/>
```

### Customized Newsletter

```typescript
<ProductNewsletter
  productName="CodeCrack"
  productSlug="codecrack"
  headline="Join 10,000+ CodeCrack Players"
  subtitle="Get early access to Daily Duels and exclusive cosmetics"
  ctaText="Get Early Access"
  placeholderText="your.email@example.com"
/>
```

### Props Quick Reference

```typescript
productName: string        // REQUIRED - e.g., "CodeCrack"
productSlug: string        // REQUIRED - e.g., "codecrack"
headline?: string          // Auto-generated if not provided
subtitle?: string          // Auto-generated if not provided
ctaText?: string          // Default: "Get Early Access"
placeholderText?: string  // Default: "your@email.com"
```

### Auto-Generated Defaults

If props omitted:
```
Headline: "Join the {productName} Waitlist"
Subtitle: "Be among the first to experience {productName}.
           Early access, exclusive features, and community perks await."
CTA Text: "Get Early Access"
Placeholder: "your@email.com"
```

---

## 🎯 Full Product Page Template

```typescript
import MainLayout from '@/components/layouts/MainLayout'
import ProductPageLayout from '@/components/layouts/ProductPageLayout'
import PageHero from '@/components/products/PageHero'
import Section from '@/components/products/Section'
import FeatureBlocks from '@/components/sections/products/FeatureBlocks'
import ProductNewsletter from '@/components/products/ProductNewsletter'

export const metadata = {
  title: 'Your Product | OFFO Labs',
  description: 'Product description here'
}

export default function ProductPage() {
  return (
    <MainLayout>
      <ProductPageLayout productName="Product Name" productSlug="slug">

        {/* Hero Section */}
        <PageHero
          title="Your Main Headline"
          subtitle="Your subheading"
          badge={{ text: 'Coming Soon', color: 'amber' }}
          ctaButtons={[
            { label: 'Join Waitlist', href: '#newsletter', variant: 'primary' },
            { label: 'Learn More', href: '#features', variant: 'secondary' }
          ]}
        />

        {/* Features Section */}
        <Section id="features" variant="alternate">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Core Features</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Everything you need
            </p>
          </div>
          <FeatureBlocks />
        </Section>

        {/* Newsletter Section */}
        <ProductNewsletter
          productName="Product Name"
          productSlug="slug"
        />

      </ProductPageLayout>
    </MainLayout>
  )
}
```

---

## 🎨 Common Patterns

### Pattern 1: Alternating Sections

```typescript
<PageHero ... />

<Section variant="default">
  Section 1 Content
</Section>

<Section variant="alternate">
  Section 2 Content
</Section>

<Section variant="default">
  Section 3 Content
</Section>

<ProductNewsletter ... />
```

### Pattern 2: With Anchor Links

```typescript
<PageHero
  ctaButtons={[
    { label: 'Features', href: '#features', variant: 'secondary' },
    { label: 'Pricing', href: '#pricing', variant: 'secondary' }
  ]}
/>

<Section id="features">
  {/* Features go here */}
</Section>

<Section id="pricing" variant="alternate">
  {/* Pricing goes here */}
</Section>
```

### Pattern 3: Custom Content Sections

```typescript
<Section variant="gradient">
  <div className="text-center text-white">
    <h2 className="text-5xl font-bold mb-4">Custom Section</h2>
    <p className="text-lg opacity-90">With custom styling</p>
  </div>
</Section>
```

---

## 📱 Component Sizes

**PageHero**:
- Mobile title: 4xl (36px)
- Tablet title: 5xl (48px)
- Desktop title: 6xl (60px)

**Section**:
- All variants: py-12 (mobile) → py-16 (tablet) → py-20 (desktop)
- Container: max-w-7xl (1280px)
- Padding: px-4 → px-6 → px-8

**ProductNewsletter**:
- Form: flex-col (mobile) → flex-row (tablet+)
- Input: Full width on mobile, flex-1 on larger

---

## 🎨 Colors & Styling

### PageHero Button Styles

```
Primary Button:
- Background: OFFO brand gradient
- Hover: shadow-offo-lg

Secondary Button:
- Border: gray-300 dark:gray-700
- Hover: bg-gray-50 dark:bg-gray-800
```

### ProductNewsletter

```
Background: OFFO brand gradient (all backgrounds)
Input: white/90 dark:gray-900/50
Button: white background, primary-600 text
```

---

## ✅ Typical Implementation Checklist

- [ ] Import components
- [ ] Create ProductPageLayout wrapper
- [ ] Add PageHero with title + subtitle
- [ ] Create alternate sections with content
- [ ] Add ProductNewsletter at bottom
- [ ] Test responsive (320px, 768px, 1024px)
- [ ] Test dark mode
- [ ] Check TypeScript errors: `npm run type-check`
- [ ] Check accessibility (keyboard nav)
- [ ] Test email form submission

---

## 🔍 Debugging Tips

**Hero not showing?**
- Check `title` and `subtitle` props are provided
- Check import path is correct

**Section styling wrong?**
- Verify `variant` prop value is correct
- Check if custom `className` conflicts with defaults

**Newsletter not working?**
- Check `/api/newsletter` endpoint exists
- Check console for errors
- Verify email validation

**Dark mode issues?**
- Check `dark:` classes are present
- Run dev server and toggle dark mode in browser

---

## 📊 Files Reference

| Component | Path |
|-----------|------|
| **PageHero** | `app/components/products/PageHero.tsx` |
| **Section** | `app/components/products/Section.tsx` |
| **ProductNewsletter** | `app/components/products/ProductNewsletter.tsx` |
| **ProductPageLayout** | `app/components/layouts/ProductPageLayout.tsx` |

---

## 🎯 Use This For

✅ Building new product pages quickly
✅ Maintaining consistent styling
✅ Reducing code duplication
✅ Training new developers
✅ Reference implementation patterns
✅ Copy-paste starting points

---

**Last Updated**: November 23, 2025
**Status**: Production Ready ✅
