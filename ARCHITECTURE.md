# OFFO Labs — Home Page Architecture

## Overview

This document outlines the component architecture for the OFFO Labs company website home page. The structure is designed for **asynchronous development** with minimal merge conflicts, allowing teams to work independently on isolated components.

## Component Hierarchy

```
MainLayout
├── HeaderNav (common)
├── main (flex-grow container)
│   ├── HeroSection
│   ├── EcosystemGrid
│   ├── FoundersStoryPreview
│   ├── WhyOffoSection
│   ├── InvestorHighlight
│   └── NewsletterSection
└── Footer (common)
```

## Directory Structure

```
app/
├── components/
│   ├── common/           # Shared components (Header, Footer)
│   │   ├── HeaderNav.tsx
│   │   └── Footer.tsx
│   ├── layouts/          # Layout wrappers
│   │   └── MainLayout.tsx
│   └── sections/         # Page sections (isolated, independently deployable)
│       ├── HeroSection.tsx
│       ├── EcosystemGrid.tsx
│       ├── FoundersStoryPreview.tsx
│       ├── WhyOffoSection.tsx
│       ├── NewsletterSection.tsx
│       └── InvestorHighlight.tsx
├── page.tsx              # Home page entry point
└── layout.tsx            # Root layout

lib/
├── types/
│   └── index.ts          # Shared TypeScript interfaces
├── constants/
│   └── index.ts          # Constants and configuration
└── utils/
    └── (utility functions)
```

## Section Components

### 1. **HeroSection** (`app/components/sections/HeroSection.tsx`)
- **Purpose**: Hero banner with headline, CTA buttons, and stats
- **Dependencies**: lucide-react icons
- **Data**: Static content (hardcoded)
- **Styling**: Gradient backgrounds, responsive typography
- **Async Ready**: ✅ No external dependencies

### 2. **EcosystemGrid** (`app/components/sections/EcosystemGrid.tsx`)
- **Purpose**: 6-card grid showcasing key ecosystem features
- **Dependencies**: lucide-react icons
- **Features**: Hover effects, icon animations
- **Data**: Static ecosystem cards array
- **Async Ready**: ✅ No external dependencies

### 3. **FoundersStoryPreview** (`app/components/sections/FoundersStoryPreview.tsx`)
- **Purpose**: Display founder team profiles with photos and bios
- **Dependencies**: lucide-react (ArrowRight)
- **Data**: Founder array with name, title, bio
- **Photo Placeholders**: Ready for image implementation
- **Async Ready**: ✅ Can be extended with image loading

### 4. **WhyOffoSection** (`app/components/sections/WhyOffoSection.tsx`)
- **Purpose**: Value proposition with 6 key differentiators
- **Dependencies**: lucide-react icons
- **Layout**: 2-column (text + grid)
- **Data**: Static values array with icons
- **Async Ready**: ✅ No external dependencies

### 5. **InvestorHighlight** (`app/components/sections/InvestorHighlight.tsx`)
- **Purpose**: Investment metrics and opportunity summary
- **Dependencies**: lucide-react icons
- **Features**:
  - 4-metric grid (Growth, Users, Market, ROI)
  - Content + chart placeholder layout
  - Investor materials CTA
- **Async Ready**: ✅ Chart can be replaced with real data

### 6. **NewsletterSection** (`app/components/sections/NewsletterSection.tsx`)
- **Purpose**: Email subscription form
- **Dependencies**: lucide-react icons
- **Features**:
  - Form state management (React hooks)
  - Submit handler with loading state
  - Success feedback
  - Social proof (avatar placeholders)
- **Async Ready**: ✅ Form handler ready for API integration

## Shared Components

### **MainLayout** (`app/components/layouts/MainLayout.tsx`)
- Wraps all page sections
- Houses HeaderNav and Footer
- Uses flexbox for proper height distribution
- Server component (SSC) for optimal performance

### **HeaderNav** (`app/components/common/HeaderNav.tsx`)
- Navigation bar
- Logo and menu items
- Sticky positioning ready

### **Footer** (`app/components/common/Footer.tsx`)
- Footer section
- Company info, links, social

## Styling & Design System

### Tailwind Configuration
- **Color Palette**: Custom primary colors with dark mode support
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Utilities Used**:
  - Flexbox layouts
  - Grid systems (1/2/3 columns)
  - Gradient backgrounds
  - Responsive padding/margins
  - Dark mode classes

### Design Patterns
- **Card Design**: Rounded corners, borders, hover shadows
- **Gradients**: Primary color gradients with transparency
- **Typography**: Responsive font sizes (sm → lg)
- **Spacing**: Consistent 8px/16px/24px baseline
- **Icons**: lucide-react for consistent icon set

## Development Workflow

### For Team Collaboration

Each section is **completely isolated** — team members can:

1. **Work independently** on their assigned section
2. **Commit changes** without merge conflicts
3. **Test locally** with `npm run dev`
4. **Type-check** with `npm run type-check`

### Adding a New Section

1. Create file: `app/components/sections/NewSection.tsx`
2. Export default component
3. Add import to `app/page.tsx`
4. Add component to JSX tree in page.tsx

### Example: Adding a "Testimonials" Section

```tsx
// app/components/sections/TestimonialsSection.tsx
export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32">
      {/* Your content */}
    </section>
  )
}

// Add to app/page.tsx
import TestimonialsSection from '@/components/sections/TestimonialsSection'

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <EcosystemGrid />
      <FoundersStoryPreview />
      <WhyOffoSection />
      <InvestorHighlight />
      <TestimonialsSection />  {/* ← New section */}
      <NewsletterSection />
    </MainLayout>
  )
}
```

## Data Integration Points

### Ready for Backend Integration
- **FoundersStoryPreview**: Fetch founders from API
- **NewsletterSection**: POST subscription to API
- **InvestorHighlight**: Fetch investment metrics from API
- **EcosystemGrid**: Can be dynamic based on feature toggles

### Future Enhancements
- Image optimization with Next.js Image component
- Form validation libraries (react-hook-form, zod)
- API client (fetch, axios, or tRPC)
- Analytics integration
- SEO metadata per section

## Performance Considerations

### Current Setup
- **Static Generation**: All sections are static by default
- **Bundle Size**: Minimal (lucide-react icons are tree-shaken)
- **Responsive Images**: Placeholder ready for optimization
- **Dark Mode**: CSS media query + Tailwind dark class

### Optimization Opportunities
- Image lazy loading
- Code splitting per section
- Dynamic imports for sections
- Incremental Static Regeneration (ISR)

## Type Safety

### Defined Interfaces (`lib/types/index.ts`)

```tsx
export interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export interface Testimonial {
  id: string
  author: string
  role: string
  content: string
  avatar?: string
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price?: number
}
```

## Build & Deploy

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Type checking
npm run type-check   # Ensure no TypeScript errors

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Technology Stack

- **Framework**: Next.js 14.1.0
- **UI Library**: React 18.3.0
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: lucide-react 0.344.0
- **Language**: TypeScript 5.3.0
- **CSS Processing**: PostCSS 8.4.32

## Git Workflow Recommendations

### Branch Strategy
```
main (production)
├── feature/hero-section (your-name)
├── feature/ecosystem-grid (your-name)
├── feature/newsletter (your-name)
└── ...
```

### Commit Message Format
```
feat(HeroSection): update headline and CTA buttons
feat(NewsletterSection): add form validation
fix(EcosystemGrid): align grid gap on mobile
```

## Accessibility Checklist

- [ ] Semantic HTML (section, main, aside)
- [ ] Alt text for images
- [ ] Color contrast ratios (WCAG AA)
- [ ] Keyboard navigation
- [ ] ARIA labels where needed
- [ ] Focus management
- [ ] Form labels and validation

## Next Steps

1. ✅ Component scaffold complete
2. ⏳ Update assets (images, logos, colors)
3. ⏳ Add real content/copy
4. ⏳ Implement API integrations
5. ⏳ Add animations (Framer Motion, CSS)
6. ⏳ Performance audit
7. ⏳ Deploy to staging/production

---

**Questions?** Check the component files or the main page.tsx to see how sections are composed.