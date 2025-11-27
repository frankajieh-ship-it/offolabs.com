# OFFO Labs - Website Implementation Blueprint

## Project Overview

OFFO Labs is a modern company website showcasing innovative technology solutions. The site is built with Next.js 14, React 18, TypeScript, and Tailwind CSS for maximum performance, maintainability, and scalability.

## 1. Architecture Overview

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4 + PostCSS
- **Icons**: Lucide React
- **Package Manager**: npm

### Project Structure

```
C:\Dev\OFFO/
├── app/
│   ├── api/                    # API routes (future)
│   ├── components/
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx          # Primary layout wrapper
│   │   ├── common/
│   │   │   ├── HeaderNav.tsx           # Navigation header
│   │   │   └── Footer.tsx              # Footer section
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx         # Hero banner
│   │   │   ├── FeaturesSection.tsx     # (TODO)
│   │   │   ├── ServicesSection.tsx     # (TODO)
│   │   │   └── CTASection.tsx          # (TODO)
│   │   └── ui/
│   │       ├── Button.tsx              # (TODO)
│   │       ├── Card.tsx                # (TODO)
│   │       └── Badge.tsx               # (TODO)
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page route /
│   └── globals.css             # Global styles
├── lib/
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── constants/
│   │   └── index.ts            # App constants
│   ├── utils/
│   │   └── (utilities)         # Helper functions
│   └── hooks/
│       └── (custom hooks)      # Reusable React hooks
├── public/
│   ├── images/                 # Image assets
│   └── fonts/                  # Custom fonts
├── styles/                     # Additional CSS
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── postcss.config.js
```

## 2. Page Route Architecture

### Home Page (/)
**File**: `app/page.tsx`

```
┌─────────────────────────────────────┐
│        Root Layout (HTML/Body)      │
├─────────────────────────────────────┤
│        MainLayout Wrapper           │
├─────────────────────────────────────┤
│      HeaderNav (Sticky)             │
├─────────────────────────────────────┤
│          Main Content               │
│  ┌─────────────────────────────────┐│
│  │     HeroSection                 ││
│  │ - Headline + Subheading         ││
│  │ - CTA Buttons                   ││
│  │ - Stats Grid                    ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  FeaturesSection (TODO)         ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  ServicesSection (TODO)         ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  CTASection (TODO)              ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│          Footer                     │
│  - Links | Social | Copyright       │
└─────────────────────────────────────┘
```

## 3. Component Specifications

### 3.1 Layout Components

#### MainLayout.tsx
- **Purpose**: Primary wrapper for all pages
- **Props**: `{ children: React.ReactNode }`
- **Structure**: Flexbox column with min-height: screen
- **Children**: HeaderNav, main (with children), Footer
- **Usage**: Wrap page content in `app/page.tsx`

### 3.2 Common Components

#### HeaderNav.tsx
**Features**:
- Sticky positioning (z-50)
- Responsive design (hamburger menu on mobile)
- Logo + brand name
- Navigation links (About, Services, Solutions, Contact)
- "Get Started" CTA button
- Dark mode support

**Props**: None (standalone)

**State**:
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false)
```

**Responsive Breakpoints**:
- Mobile: Hamburger menu
- Desktop (md+): Full navigation bar

#### Footer.tsx
**Features**:
- Dark background (dark-900)
- Four-column layout (1 brand + 3 link sections)
- Social media icons (Twitter, LinkedIn, GitHub)
- Copyright year (auto-calculated)
- Responsive grid

**Sections**:
1. Brand column (logo + description)
2. Product links
3. Company links
4. Legal links

**Dark footer styling**:
- `bg-dark-900` background
- `text-gray-400` text with hover states
- Border divider before copyright section

### 3.3 Section Components

#### HeroSection.tsx (COMPLETED)
**Features**:
- Background gradients (animated blobs)
- Badge with status indicator
- Main headline with gradient text
- Subheading (max-width: 3xl)
- Dual CTA buttons (Primary + Secondary)
- Stats grid (3 columns)
- Responsive typography

**Color Scheme**:
- Primary gradient: `from-primary-600 to-primary-500`
- Background blobs: `primary-100/dark-900`
- Gradient text: `.text-gradient` utility

**Layout**:
- Center-aligned text
- 6xl heading on desktop, 4xl on mobile
- Padding: `pt-20 pb-20` (mobile), `pt-40 pb-40` (desktop)

#### FeaturesSection.tsx (TODO)
**Planned Structure**:
```
┌────────────────────────────────┐
│      Section Title             │
│      Section Description       │
├────────────────────────────────┤
│  Feature Grid (2-3 columns)    │
│  ┌──────────┐ ┌──────────┐    │
│  │ Icon     │ │ Icon     │    │
│  │ Title    │ │ Title    │    │
│  │ Desc     │ │ Desc     │    │
│  └──────────┘ └──────────┘    │
└────────────────────────────────┘
```

**Props**:
```typescript
interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}
```

#### ServicesSection.tsx (TODO)
**Planned Features**:
- Service cards with pricing
- 3-column layout
- Hover effects
- Features list per service

#### CTASection.tsx (TODO)
**Planned Features**:
- Strong headline
- Brief description
- Primary CTA button
- Background accent

## 4. Styling System

### Tailwind Configuration

**Primary Colors**:
```typescript
primary: {
  50: '#f0f9ff',
  100: '#e0f2fe',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  900: '#082f49',
}
```

**Dark Colors**:
```typescript
dark: {
  50: '#f9fafb',
  100: '#f3f4f6',
  900: '#111827',
}
```

### Utility Classes (globals.css)

- `.container-fluid` - Responsive padding
- `.section-padding` - Standard section spacing
- `.gradient-primary` - Primary gradient background
- `.text-gradient` - Gradient text effect

### Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 5. Component Development Guidelines

### TypeScript Best Practices

```typescript
// Typed component props
interface ComponentProps {
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

export default function Component({ children }: ComponentProps) {
  // Component body
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HeaderNav.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useNavigation.ts`)
- **Types**: PascalCase (e.g., `NavLink`, `Feature`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `SITE_NAME`)

### File Organization

- One component per file
- Related types in `lib/types/`
- Constants in `lib/constants/`
- Utilities in `lib/utils/`
- Styles in component or `styles/`

### Dark Mode

All components should support dark mode:

```typescript
// Good
<div className="bg-white dark:bg-dark-900 text-gray-900 dark:text-white">

// Bad
<div className="bg-white text-gray-900">
```

## 6. Next Steps & Development Roadmap

### Phase 1: Core Components (COMPLETED)
- [x] Project setup & configuration
- [x] Layout system (MainLayout)
- [x] HeaderNav component
- [x] Footer component
- [x] HeroSection component

### Phase 2: Additional Sections (PENDING)
- [ ] FeaturesSection component
- [ ] ServicesSection component
- [ ] CTASection component
- [ ] TestimonialsSection component

### Phase 3: UI Components (PENDING)
- [ ] Button component (variants)
- [ ] Card component
- [ ] Badge component
- [ ] Form components

### Phase 4: Pages & Content (PENDING)
- [ ] About page
- [ ] Services page
- [ ] Blog/Resources page
- [ ] Contact page

### Phase 5: Advanced Features (PENDING)
- [ ] Newsletter subscription
- [ ] Contact form with API
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Performance optimizations

### Phase 6: Deployment (PENDING)
- [ ] Environment setup
- [ ] Vercel deployment
- [ ] Domain configuration
- [ ] CI/CD pipeline

## 7. Getting Started

### Installation & Setup

```bash
# Navigate to project
cd C:\Dev\OFFO

# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Development Workflow

1. Create feature branch
2. Develop components in respective folders
3. Test responsive design (mobile, tablet, desktop)
4. Verify dark mode functionality
5. Check TypeScript compilation
6. Commit with clear messages

### Building Components

When adding new components:

1. Create file in appropriate folder
2. Export typed component as default export
3. Add component-specific imports
4. Support dark mode with `dark:` prefix
5. Use Tailwind for styling
6. Add JSDoc comments for props

## 8. Path Aliases Reference

```typescript
// Instead of: import Component from '../../../components/Component'
// Use:
import Component from '@/components/Component'

// Available aliases:
@/app/*          // app directory
@/components/*   // app/components
@/lib/*          // lib directory
@/types/*        // lib/types
@/utils/*        // lib/utils
@/constants/*    // lib/constants
@/hooks/*        // lib/hooks
```

## 9. Git & Version Control

### Commit Message Format

```
feat: Add HeroSection component
fix: Correct footer dark mode colors
docs: Update README with new structure
refactor: Simplify HeaderNav logic
style: Adjust spacing in MainLayout
```

### Branching Strategy

```
main/master          → Production-ready
develop              → Integration branch
feature/xxx          → Feature development
bugfix/xxx           → Bug fixes
```

## 10. Quality Checklist

Before pushing code:

- [ ] TypeScript compilation succeeds (`npm run type-check`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Component works on mobile, tablet, desktop
- [ ] Dark mode is supported
- [ ] Accessibility standards met (semantic HTML, ARIA labels)
- [ ] No console errors/warnings
- [ ] Component is documented with types
- [ ] Imports use path aliases
- [ ] No hardcoded text (use constants/i18n where needed)

---

**Project Lead**: Engineering Team
**Last Updated**: November 23, 2024
**Status**: In Development
