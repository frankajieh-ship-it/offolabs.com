# Phase 1 & 2 Implementation Guide

**Quick Reference for Developers**
**Status:** Ready to Build
**Sprint:** Q4 2024

---

## Quick Start

### Phase 1 (Parallel Work) — Est. 10-14 hours

```
SH–SERV–001 (2-3 hrs)  ─┐
                        ├─ Ready to start immediately
SH–SERV–002 (6-8 hrs)  ─┤
                        │
SH–SERV–003 (2-3 hrs)  ─┘

Then: Continue to Phase 2
```

### Phase 2 (Sequential) — Est. 6-9 hours

```
FE–SERV–001 (1-2 hrs)  [START] ─┐
                                 ├─ Need FE–001 to exist
FE–SERV–002 (3-4 hrs)  [AFTER 001 + SH–003] ─┤
                                 │
FE–SERV–003 (2-3 hrs)  [AFTER 001] ─┘
```

---

## Phase 1: Shared Components

### 1️⃣ SH–SERV–001 — ServiceCard

**What:** Card component for displaying services/offerings
**Where:** `app/components/common/ServiceCard.tsx`
**Used by:** Services page, product pages, and any card-based layouts

**Start with:**

```tsx
'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  tag: string
  href: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  tag,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tag */}
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mb-4">
          {tag}
        </div>

        {/* Link Arrow */}
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
```

**Checklist:**
- [ ] Icon rendered with background circle
- [ ] Hover state increases shadow
- [ ] Arrow animates on hover
- [ ] Entire card is clickable
- [ ] Dark mode contrast good
- [ ] Responsive padding
- [ ] TypeScript no errors

---

### 2️⃣ SH–SERV–002 — Form Input Components

**What:** 6 reusable form input components
**Where:** `app/components/ui/`
**Files:**
- `FormFieldWrapper.tsx`
- `InputText.tsx`
- `Textarea.tsx`
- `RadioGroup.tsx`
- `MultiSelect.tsx`
- `SegmentedControl.tsx`
- `index.ts` (barrel export)

**Start with FormFieldWrapper:**

```tsx
'use client'

interface FormFieldWrapperProps {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  children: React.ReactNode
}

export function FormFieldWrapper({
  label,
  error,
  helperText,
  required,
  children,
}: FormFieldWrapperProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  )
}
```

**Then InputText:**

```tsx
'use client'

import { forwardRef } from 'react'
import { FormFieldWrapper } from './FormFieldWrapper'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
  helperText?: string
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, error, required, helperText, ...props }, ref) => (
    <FormFieldWrapper label={label} error={error} required={required} helperText={helperText}>
      <input
        ref={ref}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
        {...props}
      />
    </FormFieldWrapper>
  )
)
InputText.displayName = 'InputText'
```

**Follow same pattern for:**
- Textarea
- RadioGroup (render radio options)
- MultiSelect (render checkboxes or tags)
- SegmentedControl (render button group)

**Checklist:**
- [ ] All 6 components created
- [ ] All have label, error, helperText support
- [ ] Error state styling (red border)
- [ ] Dark mode support
- [ ] Keyboard navigation works
- [ ] TypeScript strict
- [ ] Can compose together
- [ ] Barrel export works

---

### 3️⃣ SH–SERV–003 — useScrollTo Hook

**What:** Hook for smooth scrolling with sticky header offset
**Where:** `lib/hooks/useScrollTo.ts`

**Implementation:**

```tsx
'use client'

import { useCallback } from 'react'

interface ScrollOptions {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  inline?: ScrollLogicalPosition
  offset?: number
  focus?: boolean
}

export function useScrollTo() {
  return useCallback((elementId: string, options: ScrollOptions = {}) => {
    const element = document.getElementById(elementId)
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`)
      return
    }

    // Calculate sticky header offset
    const stickyOffset = options.offset ?? calculateStickyHeaderOffset()

    // Scroll with offset
    const elementTop = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: elementTop - stickyOffset,
      behavior: options.behavior ?? 'smooth',
    })

    // Focus element for accessibility
    if (options.focus !== false) {
      element.focus({ preventScroll: true })
    }
  }, [])
}

function calculateStickyHeaderOffset(): number {
  // Find all sticky/fixed elements
  let offset = 0
  const stickyElements = document.querySelectorAll('[class*="sticky"], [class*="fixed"]')

  stickyElements.forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top === 0) {
      offset += rect.height
    }
  })

  return offset + 16 // 16px extra padding
}
```

**Usage:**

```tsx
import { useScrollTo } from '@/lib/hooks/useScrollTo'

function MyComponent() {
  const scrollTo = useScrollTo()

  return (
    <button onClick={() => scrollTo('intake')}>
      Get Started
    </button>
  )
}
```

**Checklist:**
- [ ] Scrolls to element by ID
- [ ] Handles sticky headers automatically
- [ ] Smooth animation
- [ ] Focus management
- [ ] No errors on missing element
- [ ] TypeScript strict

---

## Phase 2: Page Build

### 1️⃣ FE–SERV–001 — /services Route

**What:** Create `/services` page with section placeholders
**Where:** `app/services/page.tsx`

**Template:**

```tsx
import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'

export const metadata: Metadata = {
  title: 'Services - AI Product Development & Consultation | OFFO Labs',
  description: 'AI-accelerated product development, consultation, and full-cycle project execution.',
  keywords: ['AI development', 'product development', 'AI consultation', 'MVP'],
}

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* 1. Hero Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                [PLACEHOLDER: Hero Section]
              </h1>
            </div>
          </div>
        </section>

        {/* 2. Intro Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">[PLACEHOLDER: Intro Section]</h2>
          </div>
        </section>

        {/* 3. Services Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">[PLACEHOLDER: Services Section]</h2>
          </div>
        </section>

        {/* 4. Case Studies Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">[PLACEHOLDER: Case Studies]</h2>
          </div>
        </section>

        {/* 5. Intake Form Section (with ID for scroll target) */}
        <section id="intake" className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">[PLACEHOLDER: Intake Form]</h2>
          </div>
        </section>

        {/* 6. Final CTA Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold">[PLACEHOLDER: Final CTA]</h2>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
```

**Checklist:**
- [ ] Route `/services` loads
- [ ] All 6 section placeholders exist
- [ ] Proper spacing between sections
- [ ] Metadata is correct
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] `id="intake"` on intake section

---

### 2️⃣ FE–SERV–002 — Hero Section

**What:** Build hero with both CTAs scrolling to #intake
**Where:** `app/components/sections/services/HeroSection.tsx`

**Template:**

```tsx
'use client'

import { useScrollTo } from '@/lib/hooks/useScrollTo'
import { useState } from 'react'

export function HeroSection() {
  const scrollTo = useScrollTo()
  const [consultationRequested, setConsultationRequested] = useState(false)

  const handleConsultationClick = () => {
    setConsultationRequested(true)
    scrollTo('intake')
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            AI-Powered Development,<br />Consultation & Product Acceleration
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We help founders, businesses, and creators turn ideas into production-ready
            products — faster than any traditional dev team.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('intake')}
              className="inline-block px-8 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Project
            </button>

            <button
              onClick={handleConsultationClick}
              className="inline-block px-8 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Update `/services/page.tsx`:**

```tsx
import { HeroSection } from '@/components/sections/services/HeroSection'

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <HeroSection />
        {/* Rest of sections... */}
      </div>
    </MainLayout>
  )
}
```

**Checklist:**
- [ ] Hero displays with gradient background
- [ ] Copy is correct
- [ ] Both CTAs render
- [ ] Clicking CTA scrolls to #intake
- [ ] Smooth scroll animation
- [ ] Responsive on mobile (buttons stack)
- [ ] Hover states work
- [ ] `consultationRequested` state works

---

### 3️⃣ FE–SERV–003 — Intro Section

**What:** Build intro section with copy and bullets
**Where:** `app/components/sections/services/IntroSection.tsx`

**Template:**

```tsx
'use client'

export function IntroSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What OFFO Labs Offers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              OFFO Labs isn't just building its own products — we help clients build theirs.
            </p>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Using the same internal AI-orchestrated development pipeline powering CodeCrack,
            Renov.AI, Engine Acoustic AI, and the OFFO AI ecosystem, we deliver real-world,
            production-ready applications at record speed.
          </p>

          <ul className="space-y-3">
            {[
              'Idea through production in weeks, not months',
              'AI-first architecture from day one',
              'Production-ready code and systems',
              'End-to-end ownership and delivery',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

**Update `/services/page.tsx`:**

```tsx
import { HeroSection } from '@/components/sections/services/HeroSection'
import { IntroSection } from '@/components/sections/services/IntroSection'

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <HeroSection />
        <IntroSection />
        {/* Rest of sections... */}
      </div>
    </MainLayout>
  )
}
```

**Checklist:**
- [ ] Heading displays
- [ ] Copy is readable
- [ ] Bullets render with checkmarks
- [ ] Responsive on mobile
- [ ] Dark mode works
- [ ] Proper spacing
- [ ] No TypeScript errors

---

## Testing Checklist

### Phase 1:

- [ ] All form components render without errors
- [ ] Dark mode works for all components
- [ ] Keyboard navigation functional
- [ ] Error states display correctly
- [ ] Can compose all components together in a form
- [ ] useScrollTo scrolls to target elements
- [ ] ServiceCard displays properly
- [ ] TypeScript: `tsc --noEmit` passes

### Phase 2:

- [ ] `/services` page loads
- [ ] Hero displays with proper styling
- [ ] Both CTAs work (scroll to #intake)
- [ ] Intro section displays
- [ ] All sections are responsive (mobile, tablet, desktop)
- [ ] Dark mode throughout
- [ ] Scroll animation is smooth
- [ ] Header doesn't overlap content when scrolling
- [ ] Accessibility: Tab navigation works
- [ ] TypeScript: `tsc --noEmit` passes

---

## Common Pitfalls

### ❌ Don't:
- Hardcode colors (use Tailwind classes)
- Forget dark mode `dark:` prefixes
- Make components non-reusable (avoid page-specific styling)
- Forget TypeScript types
- Skip accessibility (proper labels, focus states)
- Use `any` types
- Forget to test on mobile

### ✅ Do:
- Use Tailwind classes consistently
- Test dark mode
- Make components composable
- Use TypeScript strict mode
- Test keyboard navigation
- Use semantic HTML
- Test on real mobile devices

---

## Estimated Timelines

| Task | Est. Time | Difficulty |
|------|-----------|-----------|
| SH–001 ServiceCard | 2-3 hrs | Easy |
| SH–002 Form Components | 6-8 hrs | Medium |
| SH–003 useScrollTo | 2-3 hrs | Medium |
| FE–001 /services Route | 1-2 hrs | Easy |
| FE–002 Hero Section | 3-4 hrs | Medium |
| FE–003 Intro Section | 2-3 hrs | Easy |
| **Total** | **16-23 hrs** | **Medium** |

---

## Questions During Implementation?

- **Component styling:** Check existing sections in `/about`, `/careers` as reference
- **TypeScript help:** Run `tsc --noEmit` to catch errors early
- **Dark mode issues:** Always test both light and dark themes
- **Accessibility:** Use NVDA (Windows), JAWS, or VoiceOver (Mac) to test

---

**Ready to build!** 🚀

Questions? Check the detailed tickets in `ENGINEERING_TICKETS_PHASE_1_2.md`