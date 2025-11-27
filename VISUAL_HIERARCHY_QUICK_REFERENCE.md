# OFFO Labs — Visual Hierarchy Quick Reference

**TL;DR** - Everything you need for consistent brand implementation

---

## 🎯 The 6 Visual Hierarchy Rules

1. **Hero is Clean, Minimal, Powerful** → Use animated gradients + clear hierarchy
2. **Ecosystem Cards Use OFFO Brand Gradient** → Add `bg-gradient-offo-accent` on hover
3. **White/Light Background for Simplicity** → `bg-white dark:bg-gray-900/50`
4. **Icons Consistent Across Sections** → Use lucide-react only, size `w-8 h-8`
5. **Max-w-screen-xl Container & Center Alignment** → `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
6. **48px Vertical Spacing Between Sections** → `py-12 sm:py-16 lg:py-20`

---

## 🎨 Brand Gradients (Copy-Paste Ready)

### Primary Brand Gradient (CTAs, Hero)
```tsx
className="bg-gradient-offo text-white"
// Result: #0ea5e9 → #0284c7 → #0369a1
```

### Card Hover Gradient
```tsx
<div className="absolute inset-0 bg-gradient-offo-accent
  opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
```

### Gradient Text
```tsx
className="text-gradient-offo"
```

### Dark Mode Gradient
```tsx
className="dark:bg-gradient-offo-dark"
```

---

## 🏗️ Section Template

Copy this for new sections:

```tsx
export default function NewSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl
            font-bold text-gray-900 dark:text-white">
            Your Heading
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your description
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cards, content, etc. */}
        </div>
      </div>
    </section>
  )
}
```

---

## 🎨 Color Palette Cheat Sheet

### Text Colors
| Purpose | Light | Dark |
|---------|-------|------|
| Headings | `text-gray-900` | `text-white` |
| Body | `text-gray-600` | `text-gray-400` |
| Labels | `text-gray-500` | `text-gray-500` |
| Brand | `text-primary-600` | `text-primary-400` |
| On Gradient | `text-white` | `text-white` |

### Background Colors
| Purpose | Light | Dark |
|---------|-------|------|
| Default | `bg-white` | `bg-gray-900/50` |
| Contrast | `bg-gray-50` | `bg-gray-900/50` |
| Subtle | `bg-primary-50` | `bg-primary-900/30` |
| Brand | `bg-gradient-offo` | `bg-gradient-offo-dark` |

### Border Colors
| State | Light | Dark |
|-------|-------|------|
| Normal | `border-gray-200` | `border-gray-800` |
| Hover | `border-primary-300` | `border-primary-700` |
| Focus | `border-primary-600` | `border-primary-400` |

---

## 🏷️ Spacing Cheat Sheet

```tsx
// Section vertical spacing (ALWAYS use this)
className="py-12 sm:py-16 lg:py-20"

// Section horizontal spacing (ALWAYS use this)
className="px-4 sm:px-6 lg:px-8"

// Section content container (ALWAYS use this)
className="max-w-7xl mx-auto"

// Internal spacing
className="mb-16"     // Large gap
className="mb-12"     // Medium gap
className="mb-8"      // Small gap
className="space-y-4" // Repeated spacing
```

---

## 📱 Responsive Breakpoints

```tsx
// Mobile first! Base classes apply to all sizes
<div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  // 2xl at mobile, 3xl at 640px+, 4xl at 768px+, 5xl at 1024px+
</div>

// Grid columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
// 1 col mobile → 2 col tablet → 4 col desktop
```

---

## 🎯 Icons Quick Reference

```tsx
import {
  Zap, ShoppingCart, Wrench, Bot,
  ArrowRight, ChevronDown, Menu, X
} from 'lucide-react'

// Standard sizes
<Icon className="w-4 h-4" />      // Small (16px)
<Icon className="w-6 h-6" />      // Medium (24px)
<Icon className="w-8 h-8" />      // Large (32px)
<Icon className="w-12 h-12" />    // XL (48px)

// With colors
<Icon className="text-primary-600 dark:text-primary-400" />

// With hover animation
<Icon className="group-hover:scale-110 transition-transform" />
```

---

## 🎬 Interactive States

```tsx
// Hover effect with brand shadow
<div className="group hover:shadow-offo-lg transition-all">
  <div className="group-hover:text-primary-600 transition-colors">
    Text that changes color on hover
  </div>
</div>

// Gradient background on hover
<div className="group">
  <div className="absolute inset-0 bg-gradient-offo-accent
    opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
</div>

// Icon animation on hover
<Icon className="group-hover:translate-x-1 transition-transform" />
```

---

## 🔧 Common Component Patterns

### Card Component
```tsx
<div className="group rounded-lg border border-gray-200 dark:border-gray-800
  bg-white dark:bg-gray-900/50 p-8 transition-all duration-300
  hover:shadow-offo-lg hover:border-primary-300 dark:hover:border-primary-700
  relative overflow-hidden cursor-pointer">

  {/* Brand gradient overlay */}
  <div className="absolute inset-0 bg-gradient-offo-accent
    opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

  {/* Content */}
  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
    Card Title
  </h3>
</div>
```

### Button Component
```tsx
<button className="px-8 py-3 rounded-lg bg-gradient-offo text-white
  font-semibold hover:shadow-offo-lg transition-all
  flex items-center space-x-2">
  <span>Button Text</span>
  <ArrowRight className="w-4 h-4" />
</button>
```

### Section Header
```tsx
<div className="text-center space-y-4 mb-16">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold
    text-gray-900 dark:text-white">
    Section Title
  </h2>
  <p className="text-lg text-gray-600 dark:text-gray-400
    max-w-2xl mx-auto">
    Section description
  </p>
</div>
```

---

## ✅ Developer Checklist (Before Committing)

- [ ] Used `py-12 sm:py-16 lg:py-20` for section spacing?
- [ ] Added `dark:` variants for all colors?
- [ ] Used only lucide-react icons?
- [ ] Applied responsive breakpoints (sm:, md:, lg:)?
- [ ] Used `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for container?
- [ ] Added `transition-*` classes for interactive states?
- [ ] Verified on mobile (320px), tablet (768px), desktop (1024px)?
- [ ] No hardcoded pixel values (use Tailwind utilities)?
- [ ] No custom colors (use color palette)?
- [ ] No mixing icon libraries?

---

## 🎨 Gradient Selector

| Use Case | Gradient | Example |
|----------|----------|---------|
| **Primary Button** | `bg-gradient-offo` | CTA buttons, "Join" buttons |
| **Card Hover** | `bg-gradient-offo-accent` | Product cards, feature cards |
| **Dark Section** | `bg-gradient-offo-dark` | Dark backgrounds |
| **Light Section** | `bg-gradient-offo-light` | Light section backgrounds |
| **Text Gradient** | `text-gradient-offo` | Headlines, brand text |
| **Subtle Accent** | `bg-gradient-offo-subtle` | Badges, highlights |

---

## 🚀 Copy-Paste Examples

### Full Hero Button
```tsx
<button className="px-8 py-3 rounded-lg bg-gradient-offo text-white
  font-semibold hover:shadow-offo-lg transition-all flex items-center
  space-x-2 group">
  <span>Join Waitlist</span>
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</button>
```

### Full Product Card
```tsx
<Link href={product.href}>
  <div className="group h-full cursor-pointer rounded-lg border
    border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8
    transition-all duration-300 hover:shadow-offo-lg
    hover:border-primary-300 dark:hover:border-primary-700
    relative overflow-hidden">

    <div className="absolute inset-0 bg-gradient-offo-accent
      opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
      {product.title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
      {product.description}
    </p>
  </div>
</Link>
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Gradient not showing | Add `bg-` prefix, not just class name |
| Text not visible on gradient | Use `text-white` or `text-gray-900` |
| Dark mode not working | Add `dark:` variant for every class |
| Icon wrong size | Use `w-8 h-8` (standard), not custom sizes |
| Spacing looks wrong | Check you used `py-12 sm:py-16 lg:py-20` |
| Color too bright | Use `-400` or `-500` variants instead of `-600` |
| Hover effect not smooth | Add `transition-all duration-300` to parent |

---

## 📚 Full References

- **[VISUAL_HIERARCHY_GUIDE.md](./VISUAL_HIERARCHY_GUIDE.md)** — Full guide (150+ lines)
- **[tailwind.config.ts](./tailwind.config.ts)** — All colors & gradients
- **[app/globals.css](./app/globals.css)** — All CSS utilities
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Component structure

---

**Keep this tab open while developing! 🚀**
