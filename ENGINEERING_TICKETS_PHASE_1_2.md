# OFFO Labs Engineering Tickets — Phase 1 & 2

**Scope:** Services Page Infrastructure & Shared Components
**Status:** Planning
**Sprint:** Q4 2024

---

## Table of Contents

1. [Phase 1: Shared Components & Utilities](#phase-1-shared-components--utilities)
2. [Phase 2: Page Skeleton & Hero](#phase-2-page-skeleton--hero)
3. [Dependency Graph](#dependency-graph)
4. [Definition of Done](#definition-of-done)

---

## Phase 1: Shared Components & Utilities

### SH–SERV–001 — ServiceCard Component

**Priority:** Medium
**Effort:** 2-3 hours
**Blockers:** None
**Blocked By:** None

**Description:**

Create a reusable `<ServiceCard>` component for displaying service offerings. Used by multiple pages (Services, Products) to show features in a consistent card format.

**Acceptance Criteria:**

- [ ] Component accepts `title`, `description`, `icon`, `tag`, `href` as props
- [ ] Hover state shows subtle shadow increase and border color change
- [ ] Responsive padding (different on mobile vs desktop)
- [ ] Icon rendered in top-left with background circle (color-coded)
- [ ] Tag displayed as small badge below description
- [ ] Arrow icon on hover that animates to the right
- [ ] Link is the entire card (cursor: pointer on hover)
- [ ] Accessible: proper heading hierarchy, link focus states
- [ ] Dark mode support with proper contrast
- [ ] TypeScript interfaces for all props
- [ ] Storybook story created (if Storybook exists)

**Definition of Done:**

Component can be imported and used in any section:
```tsx
<ServiceCard
  icon={<Rocket />}
  title="Product Development"
  description="Build MVPs and production apps..."
  tag="Weeks, not months"
  href="/services/product-development"
/>
```

**Files to Create:**

- `app/components/common/ServiceCard.tsx`

**Files to Update:**

- None

**Notes:**

- Should follow existing card styling patterns from the codebase
- Use Tailwind for styling (no CSS modules)
- Reuse color scheme from design system

---

### SH–SERV–002 — Form Input Subcomponents

**Priority:** High
**Effort:** 6-8 hours
**Blockers:** None
**Blocked By:** None

**Description:**

Create a comprehensive set of reusable form input components with built-in validation states, error messages, labels, and accessibility. These components will be used across all form-heavy pages.

**Components to Build:**

#### 1. FormFieldWrapper

**Purpose:** Container for all form fields with consistent spacing and error display

**Props:**
```typescript
interface FormFieldWrapperProps {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}
```

**Features:**
- Label with optional required indicator (*)
- Error message in red below input
- Helper text below input (only shown if no error)
- Proper spacing between label and input
- Accessibility: proper htmlFor linking
- Dark mode support

#### 2. InputText

**Purpose:** Text input (email, password, URL, etc.) with validation states

**Props:**
```typescript
interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
  helperText?: string
}
```

**Features:**
- All standard HTML input attributes
- Built-in error styling (red border, error icon)
- Focus ring animation
- Placeholder support
- Dark mode support
- Accessibility: proper label association

**Variants:**
- `type="text"` — Standard text
- `type="email"` — Email with browser validation
- `type="password"` — Hidden text input
- `type="url"` — URL with browser validation
- `type="tel"` — Telephone number
- `type="number"` — Numeric input

#### 3. Textarea

**Purpose:** Multi-line text input with validation states

**Props:**
```typescript
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  required?: boolean
  helperText?: string
  maxLength?: number
  showCharCount?: boolean
}
```

**Features:**
- All standard HTML textarea attributes
- Optional character counter
- Fixed height (no resize handle)
- Error styling consistent with InputText
- Dark mode support
- Row count customization

#### 4. RadioGroup

**Purpose:** Mutually exclusive choice selection

**Props:**
```typescript
interface RadioGroupProps {
  name: string
  label?: string
  options: Array<{ value: string; label: string; description?: string }>
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  vertical?: boolean // Default: true
}
```

**Features:**
- Vertical or horizontal layout
- Optional description per option
- Error styling
- Keyboard navigation (arrow keys)
- Accessibility: proper label associations
- Dark mode support

**Example:**
```tsx
<RadioGroup
  name="serviceType"
  label="Choose a service"
  options={[
    { value: 'dev', label: 'Development', description: 'Build your MVP' },
    { value: 'consult', label: 'Consultation', description: 'Plan your strategy' }
  ]}
  value={selected}
  onChange={setSelected}
/>
```

#### 5. MultiSelect

**Purpose:** Select multiple options from a list

**Props:**
```typescript
interface MultiSelectProps {
  name: string
  label?: string
  options: Array<{ value: string; label: string }>
  value: string[]
  onChange: (values: string[]) => void
  error?: string
  required?: boolean
  placeholder?: string
  maxSelections?: number
}
```

**Features:**
- Checkbox-based or tag-based UI (implement both)
- Option search/filter
- Max selections limit
- Clear all button
- Error styling
- Dark mode support

#### 6. SegmentedControl

**Purpose:** Single choice selection with button-like UI

**Props:**
```typescript
interface SegmentedControlProps {
  name: string
  label?: string
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}
```

**Features:**
- Visual segmented button layout
- Active state highlighting
- Smooth transition between options
- Keyboard navigation
- Dark mode support

**Example:**
```tsx
<SegmentedControl
  name="budget"
  label="Budget Range"
  options={[
    { value: 'under-50k', label: 'Under $50K' },
    { value: '50k-100k', label: '$50K–$100K' },
    { value: 'over-100k', label: '$100K+' }
  ]}
  value={budget}
  onChange={setBudget}
/>
```

**Acceptance Criteria for All Components:**

- [ ] All components accept label, error, required, helperText props
- [ ] Error state shows red border and error message
- [ ] Focus states visible with ring effect
- [ ] Keyboard navigation fully supported
- [ ] Dark mode support (all variants)
- [ ] Proper accessibility attributes (aria-*, htmlFor, etc.)
- [ ] TypeScript strict mode compliance
- [ ] Zero prop drilling (self-contained)
- [ ] Can be composed together in forms
- [ ] Storybook stories for all variants
- [ ] Unit tests for validation and interaction

**Definition of Done:**

All form components can be imported and used together:
```tsx
<FormFieldWrapper label="Service Type" error={errors.service}>
  <RadioGroup
    name="service"
    options={[...]}
    value={service}
    onChange={setService}
  />
</FormFieldWrapper>

<FormFieldWrapper label="Email" required>
  <InputText
    type="email"
    placeholder="your@email.com"
    value={email}
    onChange={handleChange}
  />
</FormFieldWrapper>

<FormFieldWrapper label="Experience" required>
  <Textarea
    placeholder="Tell us about your experience..."
    value={bio}
    onChange={handleChange}
  />
</FormFieldWrapper>

<FormFieldWrapper label="Interested In" required>
  <MultiSelect
    options={[...]}
    value={interests}
    onChange={setInterests}
  />
</FormFieldWrapper>

<FormFieldWrapper label="Timeline">
  <SegmentedControl
    options={[...]}
    value={timeline}
    onChange={setTimeline}
  />
</FormFieldWrapper>
```

**Files to Create:**

- `app/components/ui/FormFieldWrapper.tsx`
- `app/components/ui/InputText.tsx`
- `app/components/ui/Textarea.tsx`
- `app/components/ui/RadioGroup.tsx`
- `app/components/ui/MultiSelect.tsx`
- `app/components/ui/SegmentedControl.tsx`
- `app/components/ui/index.ts` (barrel export)

**Optional (If using Storybook):**

- `app/components/ui/__stories__/FormFieldWrapper.stories.tsx`
- `app/components/ui/__stories__/InputText.stories.tsx`
- (etc. for all components)

**Notes:**

- Use Tailwind CSS for styling
- Follow existing color/spacing conventions
- Icon usage: lucide-react
- Ensure high accessibility (WCAG AA minimum)
- TypeScript: no `any` types

---

### SH–SERV–003 — Scroll-To Hook & Utilities

**Priority:** High
**Effort:** 2-3 hours
**Blockers:** None
**Blocked By:** None

**Description:**

Create a custom hook for smooth scrolling to elements with sticky header offset handling. This hook will be used by CTAs throughout the site to scroll to #intake or other form sections.

**Hook: useScrollTo**

**Purpose:** Scroll to an element by ID with automatic offset calculation for sticky headers

**Signature:**
```typescript
function useScrollTo(): (elementId: string, options?: ScrollOptions) => void

interface ScrollOptions {
  behavior?: 'smooth' | 'auto'
  block?: 'start' | 'center' | 'end' | 'nearest'
  inline?: 'start' | 'center' | 'end' | 'nearest'
  offset?: number // pixels to offset (e.g., for sticky header)
  focus?: boolean // set focus on element after scroll
}
```

**Features:**

- [ ] Smooth scroll animation (default)
- [ ] Automatic sticky header offset detection
  - Check for fixed/sticky header elements
  - Calculate total height of sticky elements
  - Apply offset automatically
- [ ] Option to manually set offset
- [ ] Optional focus on target element (accessibility)
- [ ] Handles missing elements gracefully (console warning)
- [ ] Can be called multiple times without issues
- [ ] Works with any element ID

**Acceptance Criteria:**

- [ ] Can scroll to any element by ID
- [ ] Automatically detects and offsets for sticky header
- [ ] Smooth scrolling is default behavior
- [ ] Can override scroll behavior via options
- [ ] Focus management (optional)
- [ ] Error handling for missing elements
- [ ] TypeScript strict mode

**Definition of Done:**

Hook can be used in any component:
```tsx
import { useScrollTo } from '@/lib/hooks/useScrollTo'

function ServiceCTA() {
  const scrollTo = useScrollTo()

  return (
    <button onClick={() => scrollTo('intake')}>
      Get Started
    </button>
  )
}
```

**Implementation Notes:**

- Detect sticky header by checking for `position: sticky` or `position: fixed`
- Use element.scrollIntoView() as the base
- Add polyfill for older browsers if needed
- No external dependencies beyond what's already in project

**Files to Create:**

- `lib/hooks/useScrollTo.ts`

**Files to Update:**

- `lib/hooks/index.ts` (if it exists, add export)

---

## Phase 2: Page Skeleton & Hero

### FE–SERV–001 — Create Route: /services

**Priority:** High
**Effort:** 1-2 hours
**Blockers:** None
**Blocked By:** SH–SERV–003 (useScrollTo hook)

**Description:**

Create the `/services` route with basic page structure. All sections will be stubs/placeholders that will be built out in subsequent phases.

**Acceptance Criteria:**

- [ ] Route `/services` exists and loads
- [ ] Uses `<MainLayout>` wrapper
- [ ] Page structure includes placeholders for all sections:
  1. Hero section
  2. Intro section
  3. Services section
  4. Case studies section
  5. Intake form section
  6. Final CTA section
- [ ] All placeholder sections are responsive
- [ ] Page metadata (title, description) is set
- [ ] Dark mode support
- [ ] No TypeScript errors
- [ ] Mobile menu (if header requires) works correctly

**Definition of Done:**

Navigating to `/services` shows:
- Proper page header in navigation
- Hero section placeholder
- 5 section placeholders below
- Proper spacing between sections
- Mobile responsive layout

**Files to Create:**

- `app/services/page.tsx`

**Files to Update:**

- `app/components/common/HeaderNav.tsx` (add Services link if not already present)

**Content for Page:**

```tsx
export const metadata: Metadata = {
  title: 'Services - AI Product Development & Consultation | OFFO Labs',
  description: 'AI-accelerated product development, consultation, and full-cycle project execution.',
  keywords: ['AI development', 'product development', 'AI consultation', 'MVP'],
}

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Sections go here */}
      </div>
    </MainLayout>
  )
}
```

**Notes:**

- Use existing spacing rhythm (48px vertical sections)
- Follow existing page patterns from /about, /careers, etc.
- Create basic placeholder sections with proper heading hierarchy

---

### FE–SERV–002 — Build Services Page Hero

**Priority:** High
**Effort:** 3-4 hours
**Blockers:** SH–SERV–003
**Blocked By:** FE–SERV–001

**Description:**

Build the hero section for `/services` with compelling copy and dual CTAs. Both CTAs should scroll to the intake form section (#intake).

**Hero Section Requirements:**

**Structure:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   AI-Powered Development,                       │
│   Consultation & Product Acceleration          │
│                                                 │
│   We help founders, businesses, and creators    │
│   turn ideas into production-ready products     │
│   faster than any traditional dev team.         │
│                                                 │
│   [Start a Project]  [Request Consultation]    │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Acceptance Criteria:**

- [ ] Hero section has dark gradient background (consistent with /careers, /about)
- [ ] Large, bold heading (h1) with proper typography
- [ ] Subheading explaining the value proposition
- [ ] Two CTAs:
  1. "Start a Project" (primary button, white)
  2. "Request Consultation" (secondary button, bordered)
- [ ] Both CTAs scroll to #intake using useScrollTo hook
- [ ] Smooth scroll animation
- [ ] Responsive on mobile (stacked buttons)
- [ ] Proper padding/spacing on all sides
- [ ] Dark mode support (already dark, but verify text contrast)
- [ ] Optional: Hero has subtle gradient or background pattern

**Acceptance Criteria (Interactive):**

- [ ] Clicking "Start a Project" → scrolls to #intake smoothly
- [ ] Clicking "Request Consultation" → scrolls to #intake smoothly
- [ ] Both buttons have proper hover states
- [ ] Accessibility: buttons are keyboard accessible, proper focus states

**State Management (Frontend):**

Add optional `consultationRequested` flag to track if user came from consultation CTA:
```typescript
// In page or context (state only, no API call yet)
const [consultationRequested, setConsultationRequested] = useState(false)

// Helpers
const handleConsultationClick = () => {
  setConsultationRequested(true)
  scrollTo('intake')
}
```

This flag can be used later to prefill form fields or show different messaging.

**Definition of Done:**

Hero section fully functional:
- Page loads with hero visible
- Both CTAs scroll to intake form
- Responsive on mobile
- No broken styles
- Proper TypeScript types

**Files to Create:**

- `app/components/sections/services/HeroSection.tsx` (or update if placeholder exists)

**Files to Update:**

- `app/services/page.tsx` (import and use HeroSection)

**Copy (Provided):**

Heading:
> AI-Powered Development, Consultation & Product Acceleration

Subheading:
> We help founders, businesses, and creators turn ideas into production-ready products — faster than any traditional dev team.

**Design Notes:**

- Use existing hero pattern from `/careers` as reference
- Gradient background: from-gray-900 to-gray-800
- Text color: white
- Button styling: consistent with site design system
- Padding: py-16 sm:py-24 lg:py-32

---

### FE–SERV–003 — Build Intro Section

**Priority:** High
**Effort:** 2-3 hours
**Blockers:** None (can proceed in parallel)
**Blocked By:** FE–SERV–001

**Description:**

Build the intro section that explains what OFFO Labs offers. Simple, clean layout with left-aligned copy and optional right-side visual element.

**Section Layout:**

```
Intro Section (White/Light background)
┌─────────────────────────────────────────────────┐
│  What OFFO Labs Offers                          │
│                                                 │
│  OFFO Labs isn't just building its own          │
│  products — we help clients build theirs.       │
│                                                 │
│  Using the same internal AI-orchestrated        │
│  development pipeline powering CodeCrack,       │
│  Renov.AI, Engine Acoustic AI, and the OFFO     │
│  AI ecosystem, we deliver real-world,           │
│  production-ready applications at record        │
│  speed.                                         │
│                                                 │
│  • Idea through production in weeks...          │
│  • AI-first architecture from day one...        │
│  • Production-ready code and systems...         │
│  • End-to-end ownership and delivery...         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Acceptance Criteria:**

- [ ] Section has light background (white or gray-50)
- [ ] Max-width container (consistent with site)
- [ ] Clear heading (h2)
- [ ] Body copy with good readability
- [ ] Bullet point list (4-5 items)
- [ ] Responsive on mobile (single column)
- [ ] Dark mode support
- [ ] Proper spacing/padding
- [ ] Optional: Right-side visual element (diagram, image, or empty space)

**Content (Provided):**

Heading:
> What OFFO Labs Offers

Subheading:
> OFFO Labs isn't just building its own products — we help clients build theirs.

Body Copy:
> Using the same internal AI-orchestrated development pipeline powering CodeCrack, Renov.AI, Engine Acoustic AI, and the OFFO AI ecosystem, we deliver real-world, production-ready applications at record speed.

Bullet Points:
- Idea through production in weeks, not months
- AI-first architecture from day one
- Production-ready code and systems
- End-to-end ownership and delivery

**Definition of Done:**

Intro section displays with proper styling:
- Visible on `/services` page
- Proper spacing from hero above
- Responsive on mobile
- Dark mode works
- All text readable with good contrast

**Files to Create:**

- `app/components/sections/services/IntroSection.tsx`

**Files to Update:**

- `app/services/page.tsx` (import and use IntroSection)

**Design Notes:**

- Use existing section spacing pattern (py-16 sm:py-24 lg:py-32)
- Follow typography conventions from existing sections
- Bullet points can use ✓ icons or simple dashes
- Consider two-column layout on desktop, single on mobile

---

## Dependency Graph

```
┌─────────────────────────────────────────────┐
│  Phase 1: Shared Components & Utilities     │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────┐                   │
│  │  SH–SERV–001        │  (Independent)    │
│  │  ServiceCard        │                   │
│  └─────────────────────┘                   │
│           ▲                                 │
│           │ (Used in FE–SERV–004, 008)     │
│           │                                 │
│  ┌──────────────────────────┐              │
│  │  SH–SERV–002             │              │
│  │  Form Input Components   │              │
│  └──────────────────────────┘              │
│           ▲                                 │
│           │ (Used in FE–SERV–005)          │
│           │                                 │
│  ┌─────────────────────────┐               │
│  │  SH–SERV–003            │               │
│  │  useScrollTo Hook       │               │
│  └─────────────────────────┘               │
│           ▲                                 │
│           │ (Used in FE–SERV–002)          │
│           │                                 │
└─────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│  Phase 2: Page Skeleton & Hero               │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─────────────────────────┐                │
│  │  FE–SERV–001            │  (Start here) │
│  │  Create /services Route │                │
│  └─────────────────────────┘                │
│           │                                  │
│           ├──────────────────────────────┐   │
│           │                              │   │
│           ▼                              ▼   │
│  ┌──────────────────┐      ┌──────────────────┐
│  │  FE–SERV–002     │      │  FE–SERV–003     │
│  │  Hero Section    │      │  Intro Section   │
│  │  (Needs SH–003)  │      │  (Can parallelize)
│  └──────────────────┘      └──────────────────┘
│
└──────────────────────────────────────────────┘
```

**Parallel Work Paths:**

1. **Path A (Foundations):**
   - SH–SERV–001 (ServiceCard) — Can start immediately
   - SH–SERV–002 (Form Components) — Can start immediately
   - SH–SERV–003 (useScrollTo) — Can start immediately

2. **Path B (Page Build — depends on Path A):**
   - FE–SERV–001 (Route) — Can start after foundations
   - FE–SERV–002 (Hero) — Can start after FE–001 + SH–003
   - FE–SERV–003 (Intro) — Can start after FE–001

---

## Definition of Done

### Phase 1 Complete When:

✅ **SH–SERV–001 (ServiceCard)**
- Component is importable and usable
- Displays with icon, title, description, tag, link
- Hover states work
- Dark mode works
- TypeScript strict

✅ **SH–SERV–002 (Form Inputs)**
- All 6 components created and tested
- Can be composed together in forms
- Error states display properly
- Keyboard navigation works
- Accessibility passes WCAG AA
- Dark mode support

✅ **SH–SERV–003 (useScrollTo Hook)**
- Hook is importable
- Scrolls to element by ID
- Handles sticky header offsets
- No console errors

**Acceptance:** Any team member can build a form page using SH–002 components. Any CTA can scroll to intake using SH–003.

### Phase 2 Complete When:

✅ **FE–SERV–001 (/services Route)**
- Route exists and is responsive
- All section placeholders present
- Page loads without errors
- Metadata is correct

✅ **FE–SERV–002 (Hero Section)**
- Hero displays with proper styling
- Both CTAs scroll to #intake smoothly
- Responsive on mobile
- Accessibility works

✅ **FE–SERV–003 (Intro Section)**
- Section displays below hero
- Copy is readable
- Responsive on mobile
- Dark mode works

**Acceptance:** `/services` page exists with hero and intro sections. Clicking any CTA scrolls smoothly to intake form location (#intake). Page is fully responsive and accessible.

---

## Implementation Order

### Week 1 (Foundations):
1. SH–SERV–001 — ServiceCard (2-3 hrs)
2. SH–SERV–002 — Form Components (6-8 hrs)
3. SH–SERV–003 — useScrollTo Hook (2-3 hrs)

**Total: 10-14 hours**

### Week 2 (Page Build):
1. FE–SERV–001 — /services Route (1-2 hrs)
2. FE–SERV–002 — Hero Section (3-4 hrs)
3. FE–SERV–003 — Intro Section (2-3 hrs)

**Total: 6-9 hours**

---

## Questions for Clarification

Before starting, clarify:

1. **Form Components - Build approach:**
   - Should we use Headless UI for more complex components (MultiSelect)?
   - Or pure Tailwind + React hooks?

2. **ServiceCard - Visual design:**
   - Should card have an image/media area?
   - How prominent should the icon be?
   - Any specific animation on hover?

3. **useScrollTo - Sticky header:**
   - Should it auto-detect sticky headers or require manual config?
   - What's the target header height (for manual offset)?

4. **Page structure:**
   - Are all 6 sections (hero, intro, services, cases, intake, final CTA) going in Phase 2?
   - Or just hero + intro in Phase 2?

---

## Success Metrics

After Phase 1 & 2:

- [ ] Zero TypeScript compilation errors
- [ ] All components have storybook stories (if applicable)
- [ ] 80%+ code coverage on shared components
- [ ] Page loads in <2s on 3G
- [ ] Lighthouse score ≥ 90 (performance), ≥ 95 (accessibility)
- [ ] Mobile responsive (tested on actual devices)
- [ ] Dark mode fully functional
- [ ] Keyboard navigation works throughout

---

## Notes

- **Reusability First:** Build components for _all_ forms, not just services
- **Documentation:** Add inline JSDoc comments for all components
- **Testing:** Include unit tests for validation logic
- **Accessibility:** Test with screen reader (NVDA, JAWS, VoiceOver)
- **Performance:** Lazy-load heavy components if needed

---

**Created:** November 23, 2024
**Status:** Ready for Sprint Planning
**Total Estimated Effort:** 16-23 hours