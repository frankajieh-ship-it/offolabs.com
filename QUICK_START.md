# OFFO Labs — Quick Start Guide

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ installed
- Git configured
- Text editor/IDE (VS Code recommended)

### 2. Initial Setup

```bash
cd C:\Dev\OFFO
npm install
npm run dev
```

Visit: **http://localhost:3000**

## 📁 What You Have

```
6 Complete Section Components:
├── HeroSection           → Hero banner, CTAs, stats
├── EcosystemGrid        → 6-card feature showcase
├── FoundersStoryPreview → Team profiles
├── WhyOffoSection       → Value propositions
├── InvestorHighlight    → Investment metrics
└── NewsletterSection    → Email subscription form
```

All assembled in `app/page.tsx` and wrapped with `MainLayout` + `HeaderNav` + `Footer`

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run type-check       # Validate TypeScript
npm run lint             # Check code style

# Production
npm run build            # Build for production
npm run start            # Run production server

# Quick checks
npm run build            # Full build test
npm run type-check       # Type safety check
```

## ✏️ Edit Content

Each section is in `app/components/sections/`:

### Update Text
Open any `.tsx` file and edit the text directly. Hot reload applies instantly.

```tsx
// Example: Change headline in HeroSection
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
  Your New Headline Here  ← Edit this
</h1>
```

### Update Colors
Dark mode: `dark:` prefix
Light mode: Regular classes

```tsx
<div className="bg-blue-100 dark:bg-blue-900">
  Light blue on light, dark blue on dark
</div>
```

### Add/Remove Sections from Homepage

Edit `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <EcosystemGrid />
      {/* Comment out to hide: */}
      {/* <NewsletterSection /> */}
    </MainLayout>
  )
}
```

## 🎨 Styling Quick Reference

### Responsive Classes
```
sm:  640px+    (tablets)
md:  768px+    (small laptops)
lg:  1024px+   (desktops)
```

### Example: Different sizes at different breakpoints
```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive headline
</h1>
```

### Dark Mode
```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Switches colors in dark mode
</div>
```

## 🔗 File Locations

| What | Where |
|------|-------|
| **Homepage** | `app/page.tsx` |
| **Section components** | `app/components/sections/` |
| **Common components** | `app/components/common/` |
| **Layout wrapper** | `app/components/layouts/MainLayout.tsx` |
| **Global styles** | `app/globals.css` |
| **Config** | `tailwind.config.ts`, `tsconfig.json` |

## 🚨 If Something Breaks

1. **Type Error**: `npm run type-check`
2. **Build Error**: `npm run build`
3. **Lint Error**: `npm run lint`
4. **Still stuck**: Delete `.next` folder and rebuild

```bash
rm -rf .next
npm run build
```

## 📝 Adding New Content

### Example: Add a new section

**Step 1**: Create file `app/components/sections/BlogSection.tsx`

```tsx
export default function BlogSection() {
  return (
    <section className="py-20 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold">Latest Blog Posts</h2>
        {/* Your content */}
      </div>
    </section>
  )
}
```

**Step 2**: Update `app/page.tsx`

```tsx
import BlogSection from '@/components/sections/BlogSection'

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <BlogSection />  {/* ← Added */}
      <NewsletterSection />
    </MainLayout>
  )
}
```

**Step 3**: Test

```bash
npm run dev              # See it live
npm run type-check       # Validate types
npm run build            # Test production build
```

## 🎯 Next Actions

1. **Update copy**: Edit text in each section
2. **Add images**: Replace placeholder divs with actual images
3. **Connect APIs**: Newsletter, investor data, etc.
4. **Customize colors**: Update Tailwind config
5. **Add animations**: Consider Framer Motion
6. **Deploy**: Vercel, Netlify, or your hosting

## 📚 Documentation

- **Full Architecture**: See `ARCHITECTURE.md`
- **Implementation Status**: See `IMPLEMENTATION_STATUS.md`
- **TypeScript Types**: See `lib/types/index.ts`
- **Constants**: See `lib/constants/index.ts`

## 🆘 Help

Check error messages:
- TypeScript error → `npm run type-check`
- Build error → `npm run build`
- Lint error → `npm run lint`
- Not sure → See `ARCHITECTURE.md`

---

## 💡 Pro Tips

1. **Keep sections isolated** - Don't import between sections
2. **Use Tailwind** - Everything is styled with Tailwind classes
3. **Dark mode** - Test with `dark:` classes
4. **Responsive** - Always include sm:, md:, lg: variants
5. **Components are SSR-ready** - Use 'use client' only if needed (like NewsletterSection)

## 🎉 You're Ready!

```bash
npm run dev              # Start building
# Visit http://localhost:3000
# Edit files and see changes instantly
```

Happy coding! 🚀
