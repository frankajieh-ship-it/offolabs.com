# OFFO Labs - Company Website

A modern, responsive company website built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## Project Structure

```
offo-labs/
├── app/
│   ├── components/
│   │   ├── layouts/          # Layout wrappers
│   │   │   └── MainLayout.tsx
│   │   ├── common/           # Shared components
│   │   │   ├── HeaderNav.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/         # Page sections
│   │   │   └── HeroSection.tsx
│   │   └── ui/               # Reusable UI components
│   ├── api/                  # API routes
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── lib/
│   ├── types/                # TypeScript types
│   ├── constants/            # App constants
│   ├── utils/                # Utility functions
│   └── hooks/                # Custom React hooks
├── public/
│   ├── images/               # Image assets
│   └── fonts/                # Custom fonts
├── styles/                   # Additional styles
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Architecture

### Component Hierarchy

```
RootLayout (app/layout.tsx)
└── MainLayout (app/components/layouts/MainLayout.tsx)
    ├── HeaderNav (app/components/common/HeaderNav.tsx)
    ├── main
    │   └── Page content / sections
    └── Footer (app/components/common/Footer.tsx)
```

### Key Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Mode Support** - Built-in dark mode support
- **TypeScript** - Full type safety
- **Performance** - Optimized with Next.js best practices
- **Accessibility** - WCAG compliant components
- **SEO** - Meta tags and semantic HTML

## Path Aliases

Use these aliases for cleaner imports:

```typescript
import Component from '@/components/Component'
import { constant } from '@/constants'
import type { MyType } from '@/types'
import { useCustomHook } from '@/hooks'
```

## Styling

This project uses:
- **Tailwind CSS** for utility-first styling
- **CSS Modules** for component-scoped styles (when needed)
- **CSS Variables** for theme customization

Color scheme is defined in `tailwind.config.ts` with primary colors and dark mode variants.

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t offo-labs .
docker run -p 3000:3000 offo-labs
```

## Contributing

See CONTRIBUTING.md for guidelines.

## License

MIT License - See LICENSE file for details
