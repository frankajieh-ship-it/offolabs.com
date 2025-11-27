# Before/After Gallery — Quick Reference

**TL;DR** - Copy-paste code and usage patterns

---

## 🚀 Quick Start

### Single Card

```typescript
import BeforeAfterCard from '@/components/products/BeforeAfterCard'

<BeforeAfterCard
  label="Modern Living Room"
  beforeImageSrc="/images/living-before.jpg"
  afterImageSrc="/images/living-after.jpg"
  beforeLabel="Before"
  afterLabel="After"
  isConceptOnly={true}
/>
```

### Full Gallery

```typescript
import BeforeAfterGallery from '@/components/sections/products/BeforeAfterGallery'

<BeforeAfterGallery />
```

---

## 📦 Props Reference

### BeforeAfterCard

```typescript
interface BeforeAfterCardProps {
  label: string              // REQUIRED: "Modern Living Room"
  beforeImageSrc: string     // REQUIRED: "/images/before.jpg"
  afterImageSrc: string      // REQUIRED: "/images/after.jpg"
  beforeLabel?: string       // Optional: default "Before"
  afterLabel?: string        // Optional: default "After"
  isConceptOnly?: boolean    // Optional: default true (shows badge)
}
```

**Minimal**:
```typescript
<BeforeAfterCard
  label="My Room"
  beforeImageSrc="/before.jpg"
  afterImageSrc="/after.jpg"
/>
```

**Fully Customized**:
```typescript
<BeforeAfterCard
  label="Luxury Bathroom Renovation"
  beforeImageSrc="/images/bathroom-original.jpg"
  afterImageSrc="/images/bathroom-redesigned.jpg"
  beforeLabel="Original Design"
  afterLabel="AI-Generated Design"
  isConceptOnly={false}  // No concept badge
/>
```

---

## 🎨 Image Setup

### Directory Structure

```
/public/images/
├── placeholders/
│   ├── living-room-before.jpg
│   ├── living-room-after.jpg
│   ├── bedroom-before.jpg
│   ├── bedroom-after.jpg
│   └── ... (etc)
└── renov-ai/  [For real AI renders later]
    ├── luxury-living-before.jpg
    └── luxury-living-after.jpg
```

### Image Specs

- **Size**: 400x400px minimum (square 1:1)
- **Format**: JPG, PNG, or WebP
- **File Size**: < 200KB each (optimized)
- **Quality**: Web-optimized

---

## 🔄 Customizing the Gallery

### Change Transformations

Edit `BeforeAfterGallery.tsx`:

```typescript
const transformations: BeforeAfterItem[] = [
  {
    id: 'custom-room',
    label: 'Your Room Name',
    beforeImageSrc: '/images/your-before.jpg',
    afterImageSrc: '/images/your-after.jpg',
    style: 'Your Style'  // Optional
  },
  // Add more rooms...
]
```

### Change Grid Columns

```typescript
// Default: 2 columns on desktop
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// Change to 3 columns:
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
```

### Update Section Title

```typescript
<h2 className="...">
  Your Custom Title Here
</h2>
```

### Remove Concept Badge

When you have real AI renders:

```typescript
// In BeforeAfterGallery.tsx, change:
isConceptOnly={true}    // Shows "Concept Preview" badge
// To:
isConceptOnly={false}   // No badge
```

---

## 📱 Responsive Design

**Mobile (320px)**:
- Before image stacked on top
- After image below
- Full width

**Tablet (768px)**:
- Before and after side-by-side
- 1 column gallery grid

**Desktop (1024px+)**:
- Before and after side-by-side
- 2 column gallery grid

---

## 🎨 Colors & Styling

### Image Overlays

```
Text: White
Overlay: Gradient to black (bottom)
Font: Bold, small
Position: Bottom-left
```

### Concept Badge

```
Background: Amber 100 / 900/30
Text: Amber 800 / 200
Border: Amber 300 / 700
```

### Card Hover

```
Border: Gray → Primary color
Shadow: shadow-offo-lg
Image: Scale 105%
Duration: 300ms
```

---

## 🖼️ Updating to Real AI Renders

### Step 1: Generate/Acquire Images

Create or generate interior design images:
- Size: 400x400px (square)
- Format: WebP preferred (< 100KB)
- Quality: Professional/high quality

### Step 2: Save to Correct Directory

```bash
/public/images/renov-ai/
├── modern-living-before.jpg
├── modern-living-after.jpg
└── ... (all transformations)
```

### Step 3: Update Paths

```typescript
const transformations = [
  {
    id: 'modern-living',
    label: 'Modern Living Room',
    beforeImageSrc: '/images/renov-ai/modern-living-before.jpg',
    afterImageSrc: '/images/renov-ai/modern-living-after.jpg'
  },
  // ... update all paths
]
```

### Step 4: Remove Concept Badges

```typescript
// Change from:
isConceptOnly={true}

// To:
isConceptOnly={false}
```

### Step 5: Update Copy

Change disclaimer from:
```
"Sample layouts — Real AI renders coming soon"
```

To:
```
"Real AI-generated interior design renders"
```

---

## 🔍 File Locations

| Component | Path |
|-----------|------|
| **BeforeAfterCard** | `app/components/products/BeforeAfterCard.tsx` |
| **BeforeAfterGallery** | `app/components/sections/products/BeforeAfterGallery.tsx` |
| **Images** | `public/images/placeholders/` (then renov-ai/) |
| **Page** | `app/products/renov-ai/page.tsx` |

---

## ✅ Testing

- [ ] Images load without errors
- [ ] Responsive at 320px, 768px, 1024px
- [ ] Hover effects work smoothly
- [ ] Dark mode text is readable
- [ ] Concept badges display correctly
- [ ] No layout shifts when images load
- [ ] Image overlays are visible

---

## 🎯 Common Tasks

### Add a New Room Transformation

```typescript
{
  id: 'powder-room',
  label: 'Elegant Powder Room',
  beforeImageSrc: '/images/placeholders/powder-before.jpg',
  afterImageSrc: '/images/placeholders/powder-after.jpg',
  style: 'Contemporary'
}
```

### Use Custom Labels

```typescript
<BeforeAfterCard
  label="Modern Workspace"
  beforeImageSrc="..."
  afterImageSrc="..."
  beforeLabel="Current Setup"
  afterLabel="Optimized Layout"
/>
```

### Grid with 3 Columns

```typescript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {items.map(item => (
    <BeforeAfterCard key={item.id} {...item} />
  ))}
</div>
```

### Full-Width Cards

```typescript
<div className="grid grid-cols-1 gap-8">
  {items.map(item => (
    <BeforeAfterCard key={item.id} {...item} />
  ))}
</div>
```

---

## 🔗 Integration

In Renov.AI product page:

```typescript
import BeforeAfterGallery from '@/components/sections/products/BeforeAfterGallery'

export default function RenovAiPage() {
  return (
    <ProductPageLayout productName="Renov.AI" productSlug="renov-ai">
      <RenovAiHero />
      <BeforeAfterGallery />  {/* Gallery section */}
      <HowItWorks />
      {/* ... other sections */}
    </ProductPageLayout>
  )
}
```

---

**Status**: Production Ready ✅
**Last Updated**: November 23, 2025
