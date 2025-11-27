# OFFO Labs - Quick Setup Guide

## Project Status ✅
**Framework**: Next.js 14
**State**: Foundation Complete - Ready for Development
**Location**: `C:\Dev\OFFO`

## What's Already Done

### ✅ Project Infrastructure
- [x] Complete folder structure
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] Next.js App Router configuration
- [x] Path aliases configured
- [x] ESLint configuration
- [x] Git configuration (.gitignore)

### ✅ Layout & Navigation
- [x] RootLayout with metadata
- [x] MainLayout wrapper component
- [x] HeaderNav (responsive, dark mode)
- [x] Footer (multi-column, dark mode)

### ✅ Pages
- [x] Home page route (/)
- [x] HeroSection with CTA buttons

### ✅ Styling System
- [x] Global CSS with Tailwind
- [x] Color scheme (primary + dark)
- [x] Responsive breakpoints
- [x] Utility classes

### ✅ Documentation
- [x] README.md with project overview
- [x] IMPLEMENTATION_BLUEPRINT.md with detailed specifications
- [x] Component architecture documented

## Quick Start

### 1. Install Dependencies
```bash
cd C:\Dev\OFFO
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit: `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm start
```

## File Structure at a Glance

```
app/
├── components/
│   ├── layouts/
│   │   └── MainLayout.tsx           ← All pages wrap with this
│   ├── common/
│   │   ├── HeaderNav.tsx            ← Sticky navigation bar
│   │   └── Footer.tsx               ← Footer with dark mode
│   ├── sections/
│   │   ├── HeroSection.tsx          ← Homepage hero
│   │   ├── FeaturesSection.tsx      ← (TODO)
│   │   └── ServicesSection.tsx      ← (TODO)
│   └── ui/
│       └── (Reusable UI components) ← (TODO)
├── page.tsx                         ← Home page
├── layout.tsx                       ← Root layout
└── globals.css                      ← Global styles

lib/
├── types/                           ← TypeScript interfaces
├── constants/                       ← App constants
├── utils/                           ← Helper functions
└── hooks/                           ← Custom React hooks
```

## Key Features

### 🎨 Responsive Design
- Mobile-first approach
- Hamburger menu on mobile
- Desktop navigation bar
- All components tested on multiple screen sizes

### 🌙 Dark Mode
All components support dark mode:
```typescript
className="bg-white dark:bg-dark-900"
```

### 📱 Mobile Navigation
- Hamburger icon on mobile
- Smooth open/close animation
- Closes on link click

### 🎯 Type Safety
- Full TypeScript support
- Type definitions in `lib/types/`
- No `any` types allowed

### 🔗 Path Aliases
```typescript
import Component from '@/components/Component'
import { constant } from '@/constants'
import type { Type } from '@/types'
```

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript
```

## Next Development Tasks

### Priority 1: Component Library
- [ ] Button component (variants: primary, secondary, outline)
- [ ] Card component (with hover effects)
- [ ] Badge component (for tags/labels)
- [ ] Input/Form components

### Priority 2: Additional Sections
- [ ] FeaturesSection (3-column feature grid)
- [ ] ServicesSection (service cards with pricing)
- [ ] TestimonialsSection (carousel or grid)
- [ ] CTASection (call-to-action section)

### Priority 3: Pages
- [ ] About page (`/about`)
- [ ] Services page (`/services`)
- [ ] Contact page (`/contact`)
- [ ] Blog page (`/blog`)

### Priority 4: Features
- [ ] Contact form
- [ ] Newsletter subscription
- [ ] Dark mode toggle
- [ ] Smooth scroll behavior

### Priority 5: Optimization
- [ ] Image optimization
- [ ] SEO improvements
- [ ] Analytics setup
- [ ] Performance monitoring

## Component Template

When creating new components, use this template:

```typescript
'use client'  // If using React hooks

import React from 'react'
import type { ComponentProps } from '@/types'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function ComponentName({ children, className }: Props) {
  return (
    <div className={`space-y-4 ${className || ''}`}>
      {children}
    </div>
  )
}
```

## Styling Tips

### Using Tailwind Classes
```typescript
// Good: Responsive classes
<div className="w-full md:w-1/2 lg:w-1/3">

// Good: Dark mode support
<div className="bg-white dark:bg-dark-900">

// Good: Hover states
<button className="hover:bg-primary-700 transition-colors">

// Bad: Hardcoded colors
<div style={{ backgroundColor: '#0284c7' }}>
```

### Using Gradients
```typescript
// Primary gradient
<div className="bg-gradient-primary">

// Text gradient
<h1 className="text-gradient">Title</h1>
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t offo-labs .
docker run -p 3000:3000 offo-labs
```

## Common Issues

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
npm run type-check  # Check all errors
npm run build       # Build and identify issues
```

### Dark Mode Not Working
- Ensure `dark:` prefix is used
- Check `tailwind.config.ts` dark mode setting
- Browser might need refresh

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/component-name

# Make changes and commit
git add .
git commit -m "feat: Add component-name"

# Push to remote
git push -u origin feature/component-name

# Create pull request on GitHub
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev)

## Contact & Support

For questions about the project setup:
1. Check IMPLEMENTATION_BLUEPRINT.md for detailed specs
2. Review existing components for patterns
3. Check git history for similar implementations

---

**Ready to start developing!** 🚀

Next step: `npm install && npm run dev`
