# OFFO Labs - Component Development Guide

## Overview

This guide provides examples and best practices for developing components for the OFFO Labs website.

---

## Component Types

### 1. Layout Components
Provide structural wrapper for pages.

**Location**: `app/components/layouts/`

**Example: MainLayout.tsx**
```typescript
import React from 'react'
import HeaderNav from '@/components/common/HeaderNav'
import Footer from '@/components/common/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

---

### 2. Common Components
Reusable components used across multiple pages.

**Location**: `app/components/common/`

**Example: Button.tsx (TODO)**
```typescript
import React from 'react'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all'

  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300',
    outline: 'border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
```

**Usage**:
```typescript
import Button from '@/components/common/Button'

<Button variant="primary" size="lg">
  Get Started
</Button>

<Button variant="secondary">
  Learn More
</Button>

<Button variant="outline" disabled>
  Unavailable
</Button>
```

---

### 3. Section Components
Full-width sections for pages.

**Location**: `app/components/sections/`

**Existing: HeroSection.tsx**
```typescript
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-40 pb-40">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96
          bg-primary-100 dark:bg-primary-900/20
          rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto container-fluid">
        {/* Content */}
      </div>
    </section>
  )
}
```

**Template: FeaturesSection.tsx (TODO)**
```typescript
import React from 'react'
import type { Feature } from '@/types'
import Card from '@/components/common/Card'

interface FeaturesSectionProps {
  title?: string
  description?: string
  features: Feature[]
}

export default function FeaturesSection({
  title = 'Features',
  description = 'Discover what makes us different',
  features,
}: FeaturesSectionProps) {
  return (
    <section className="section-padding bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto container-fluid">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Usage**:
```typescript
import FeaturesSection from '@/components/sections/FeaturesSection'
import { Zap, Shield, Rocket } from 'lucide-react'

<FeaturesSection
  title="Our Features"
  description="Everything you need to succeed"
  features={[
    {
      id: '1',
      title: 'Fast',
      description: 'Lightning quick performance',
      icon: <Zap className="w-8 h-8 text-primary-600" />,
    },
    // ... more features
  ]}
/>
```

---

### 4. UI Components
Small reusable UI building blocks.

**Location**: `app/components/ui/`

**Template: Card.tsx (TODO)**
```typescript
import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverable?: boolean
}

export default function Card({
  children,
  hoverable = true,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900
        rounded-lg border border-gray-200 dark:border-gray-800
        ${hoverable ? 'hover:shadow-lg hover:border-primary-600 transition-all' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
```

**Usage**:
```typescript
import Card from '@/components/ui/Card'

<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

<Card hoverable={false}>
  Static content card
</Card>
```

---

## Component Patterns

### Pattern 1: Client Components with State
```typescript
'use client'  // ← Important for useState, useEffect, etc.

import React, { useState } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### Pattern 2: Server Components (Default)
```typescript
// No 'use client' directive = Server Component

import React from 'react'

export default function StaticComponent() {
  return (
    <div>
      <h1>This is static content</h1>
    </div>
  )
}
```

### Pattern 3: Component with Props
```typescript
'use client'

import React from 'react'

interface ComponentProps {
  title: string
  description?: string
  onAction?: () => void
  children?: React.ReactNode
}

export default function Component({
  title,
  description,
  onAction,
  children,
}: ComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {onAction && <button onClick={onAction}>Action</button>}
      {children}
    </div>
  )
}
```

### Pattern 4: Component with Slots
```typescript
interface LayoutProps {
  header: React.ReactNode
  body: React.ReactNode
  footer?: React.ReactNode
}

export default function Layout({ header, body, footer }: LayoutProps) {
  return (
    <div>
      <div className="border-b">{header}</div>
      <div className="py-8">{body}</div>
      {footer && <div className="border-t mt-8 pt-8">{footer}</div>}
    </div>
  )
}
```

---

## Styling Guidelines

### 1. Responsive Classes
```typescript
// Mobile first approach
className="w-full md:w-1/2 lg:w-1/3"
className="text-lg sm:text-xl lg:text-2xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### 2. Dark Mode
```typescript
// Always support dark mode
className="bg-white dark:bg-gray-900"
className="text-gray-900 dark:text-white"
className="border-gray-200 dark:border-gray-800"
```

### 3. Hover States
```typescript
// Include transition for smooth effects
className="hover:bg-primary-700 transition-colors"
className="hover:shadow-lg hover:scale-105 transition-transform"
className="group hover:text-primary-600 transition-colors"
```

### 4. State-Based Styling
```typescript
// Disabled state
className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}

// Active state
className={`${isActive ? 'bg-primary-600' : 'bg-gray-100'}`}

// Loading state
className={`${isLoading ? 'animate-pulse' : ''}`}
```

---

## TypeScript Best Practices

### 1. Type Props Interface
```typescript
interface Props {
  // Required properties
  title: string

  // Optional properties
  description?: string

  // Optional with default
  size?: 'sm' | 'md' | 'lg'

  // Callbacks
  onSubmit?: (data: FormData) => void

  // React elements
  children?: React.ReactNode
  icon?: React.ReactNode

  // HTML attributes
  className?: string
}
```

### 2. Extend HTML Attributes
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

// This allows you to pass all standard button attributes
<Button type="submit" disabled={false} aria-label="Submit">
  Click me
</Button>
```

### 3. Union Types for Variants
```typescript
type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

// or using enum
enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Outline = 'outline',
}
```

---

## Common Component Checklist

Before marking a component as complete:

- [ ] TypeScript types defined for all props
- [ ] Default props set where appropriate
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Dark mode support implemented
- [ ] Accessibility (aria-labels, semantic HTML)
- [ ] JSDoc comments for props
- [ ] Component tested with various props
- [ ] No console errors/warnings
- [ ] Consistent with design system
- [ ] Performance optimized (no unnecessary re-renders)
- [ ] Error states handled
- [ ] Loading states handled (if needed)

---

## File Naming Conventions

```
✅ GOOD
├── Button.tsx           (Component name matches file)
├── FormInput.tsx        (Compound component names)
├── HeroSection.tsx      (Section naming pattern)
└── useCustomHook.ts     (Hooks with 'use' prefix)

❌ BAD
├── button.tsx           (Should be PascalCase)
├── BUTTON.tsx           (All caps not used)
├── Btn.tsx              (Unclear abbreviations)
└── customHook.ts        (Missing 'use' prefix)
```

---

## Import/Export Patterns

### Default Export
```typescript
// Button.tsx
export default function Button() { }

// Usage
import Button from '@/components/common/Button'
```

### Named Exports (for utilities)
```typescript
// lib/utils/formatting.ts
export function formatDate(date: Date) { }
export function formatCurrency(amount: number) { }

// Usage
import { formatDate, formatCurrency } from '@/utils/formatting'
```

### Type Exports
```typescript
// lib/types/index.ts
export type Feature = {
  id: string
  title: string
}

export interface NavLink {
  href: string
  label: string
}

// Usage
import type { Feature, NavLink } from '@/types'
```

---

## Testing Component Patterns

### Manual Testing Checklist
```markdown
1. Visual Testing
   - [ ] Component renders without errors
   - [ ] All props work correctly
   - [ ] Responsive breakpoints work
   - [ ] Dark mode works

2. Interaction Testing
   - [ ] Click handlers work
   - [ ] Hover states visible
   - [ ] Form inputs receive values
   - [ ] Keyboard navigation works

3. Accessibility Testing
   - [ ] Tab order is logical
   - [ ] Screen reader compatible
   - [ ] Color contrast sufficient
   - [ ] Semantic HTML used

4. Browser Testing
   - [ ] Chrome latest
   - [ ] Firefox latest
   - [ ] Safari latest
   - [ ] Mobile browsers
```

---

## Common Mistakes to Avoid

### ❌ Hardcoded Values
```typescript
// Bad
<div style={{ color: '#0284c7', fontSize: '16px' }}>

// Good
<div className="text-primary-600 text-base">
```

### ❌ Missing Types
```typescript
// Bad
function Button(props) { }

// Good
interface ButtonProps {
  label: string
  onClick: () => void
}

function Button({ label, onClick }: ButtonProps) { }
```

### ❌ Forgot Dark Mode
```typescript
// Bad
<div className="bg-white text-gray-900">

// Good
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### ❌ No Server vs Client Indication
```typescript
// Bad (unclear if it uses hooks)
export default function Component() { }

// Good
'use client'  // Explicitly mark client components

export default function Component() {
  const [state, setState] = useState()
}
```

### ❌ Poor Prop Naming
```typescript
// Bad
<Component d="hello" f={func} />

// Good
<Component description="hello" onSubmit={func} />
```

---

## Performance Tips

### 1. Memoization
```typescript
import React from 'react'

// Memoize component to prevent unnecessary re-renders
const Button = React.memo(function Button({ label }: { label: string }) {
  return <button>{label}</button>
})
```

### 2. Lazy Loading Images
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  loading="lazy"
  width={800}
  height={600}
/>
```

### 3. Code Splitting
```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { loading: () => <p>Loading...</p> }
)
```

---

## Resources for Component Development

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Components](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Ready to build components!** 🚀

Start with Phase 1: Create Button, Card, and Badge components.
