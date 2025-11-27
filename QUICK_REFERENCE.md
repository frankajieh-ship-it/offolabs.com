# OFFO Labs Product Pages — Quick Reference Guide

**Last Updated**: November 23, 2025
**Status**: ✅ Production Ready
**Total Pages**: 11 (all static)

---

## 🚀 Quick Start

### Check Build Status
```bash
cd C:\Dev\OFFO
npm run build
```

### Start Development Server
```bash
npm run dev
# Visit http://localhost:3000
```

### Run Tests
```bash
npm run lint
```

---

## 📍 Product Pages Quick Links

### CodeCrack — Logic Puzzle Arena
**URL**: `/products/codecrack`
**Components**: 6 sections
**Key Feature**: Chess-style rating system, free-to-play

**Sections**:
1. Hero + CTAs
2. Game loop explanation (3 steps)
3. 4 core features
4. Screenshots gallery
5. Pricing/monetization
6. Download CTAs

**Edit**: `app/components/sections/products/` folder

---

### Renov.AI — AI Interior Design
**URL**: `/products/renov-ai`
**Components**: 5 sections
**Key Feature**: Before/after transformations, 3 user segments

**Sections**:
1. Hero + value prop
2. Before/after gallery
3. 4-step workflow
4. Feature highlights
5. User segments (3)

**Edit**: `app/components/sections/products/` folder

---

## 🔧 Common Updates

### Change Hero Headline
**File**: `app/components/sections/products/CodeCrackHero.tsx` (line 44)
```tsx
title="CodeCrack — The Logic Puzzle Arena"
```

### Change CTA Button Text
**File**: Same hero file (line 50)
```tsx
label: 'Join CodeCrack Waitlist'
```

### Update Feature Lists
**File**: `app/components/sections/products/FeatureBlocks.tsx` (line 16)
```tsx
const CODECRACK_FEATURES: Feature[] = [...]
```

### Change Pricing Tiers
**File**: `app/components/sections/products/MonetizationSection.tsx` (line 14)
```tsx
const tiers: PricingTier[] = [...]
```

### Update Before/After Gallery
**File**: `app/components/sections/products/BeforeAfterGallery.tsx` (line 12)
```tsx
const transformations: BeforeAfterItem[] = [...]
```

### Change How It Works Steps
**File**: `app/components/sections/products/HowItWorks.tsx` (line 4)
```tsx
const steps = [...]
```

---

## 📁 File Structure Quick Reference

```
app/
├── products/
│   ├── page.tsx                    Products listing
│   ├── [slug]/page.tsx             Dynamic product template
│   ├── codecrack/page.tsx          CodeCrack page
│   └── renov-ai/page.tsx           Renov.AI page
│
└── components/
    ├── layouts/
    │   ├── MainLayout.tsx          App shell
    │   └── ProductPageLayout.tsx   Product wrapper
    │
    ├── common/
    │   ├── HeaderNav.tsx
    │   ├── Footer.tsx
    │   └── ProductCard.tsx
    │
    └── sections/products/
        ├── CodeCrackHero.tsx
        ├── GameDescription.tsx
        ├── FeatureBlocks.tsx
        ├── ScreenshotsSection.tsx
        ├── MonetizationSection.tsx
        ├── StoreCTASection.tsx
        ├── RenovAiHero.tsx
        ├── BeforeAfterGallery.tsx
        ├── HowItWorks.tsx
        ├── FeaturesSection.tsx
        └── TargetUsersSection.tsx
```

---

## 🎨 Color Reference

### CodeCrack
- Primary: Blue (`from-blue-600 to-blue-800`)
- Accent: Primary blue
- Icons: Lucide-react blue set

### Renov.AI
- Primary: Purple (`from-purple-600 to-pink-600`)
- Accents:
  - Homeowners: Blue
  - Designers: Purple
  - Contractors: Amber/Green

---

## 📊 Component Reference

### CodeCrackHero
- **File**: `app/components/sections/products/CodeCrackHero.tsx`
- **Props**: `onWaitlistClick?: () => void`
- **Output**: Hero with gradient background, 2 CTAs
- **Key**: Uses PageHero wrapper component

### GameDescription
- **File**: `app/components/sections/products/GameDescription.tsx`
- **Output**: 3-step game loop + 4 highlights
- **Icons**: Brain, Zap, Trophy, Users
- **Grid**: Responsive 1-2-4 columns

### FeatureBlocks
- **File**: `app/components/sections/products/FeatureBlocks.tsx`
- **Data**: `CODECRACK_FEATURES` array
- **Output**: 4 feature cards with icons
- **Icons**: Calendar, Zap, Trophy, Palette

### HowItWorks
- **File**: `app/components/sections/products/HowItWorks.tsx`
- **Data**: `steps` array (4 items)
- **Output**: 4-step workflow with connectors
- **Icons**: Upload, Sparkles, Eye, Download

### MonetizationSection
- **File**: `app/components/sections/products/MonetizationSection.tsx`
- **Data**: `tiers` array (3 pricing tiers)
- **Output**: Pricing grid with feature lists
- **Key**: Pro tier marked as "Most Popular"

### StoreCTASection
- **File**: `app/components/sections/products/StoreCTASection.tsx`
- **Output**: Download buttons + stats + waitlist CTA
- **Stores**: App Store, Google Play, Web

### BeforeAfterGallery
- **File**: `app/components/sections/products/BeforeAfterGallery.tsx`
- **Data**: `transformations` array
- **Output**: Before/after image gallery
- **Images**: Uses Next.js Image component

### FeaturesSection
- **File**: `app/components/sections/products/FeaturesSection.tsx`
- **Data**: `features` array (4 items)
- **Output**: Feature cards with gradients
- **Icons**: Palette, Zap, Share2, Lock

### TargetUsersSection
- **File**: `app/components/sections/products/TargetUsersSection.tsx`
- **Data**: `users` array (3 segments)
- **Output**: User segment cards with benefits
- **Icons**: Home, Briefcase, Hammer

---

## 🚢 Deployment Checklist

Before deploying:
- [ ] Run `npm run build` - all passing?
- [ ] Check all images replaced (no placeholders)?
- [ ] Verify all CTA links work?
- [ ] Test on mobile, tablet, desktop?
- [ ] Check dark mode on all pages?
- [ ] Verify SEO metadata correct?
- [ ] Analytics events tracking?
- [ ] Product team sign-off?

Then:
```bash
npm run build        # Build for production
npm run export       # Export static HTML (if needed)
# Deploy to hosting
```

---

## 🔗 Related Documentation

- **Full CodeCrack Guide**: `CODECRACK_PRODUCT_PAGE_IMPLEMENTATION.md`
- **Full Renov.AI Guide**: `RENOV_AI_PRODUCT_PAGE_IMPLEMENTATION.md`
- **Complete Summary**: `PRODUCT_PAGES_COMPLETE_SUMMARY.md`
- **Session Summary**: `SESSION_COMPLETION_SUMMARY.md`

---

## 💡 Tips & Tricks

### Quick Image Replacement
Replace placeholder images:
```
/images/placeholders/living-room-before.jpg  → your-image.jpg
/images/placeholders/living-room-after.jpg   → your-image.jpg
```

### Add New Feature
In `FeatureBlocks.tsx`:
```tsx
{
  title: 'New Feature',
  description: 'Feature description',
  icon: <YourIcon className="w-8 h-8" />,
  tag: 'Optional tag'
}
```

### Change CTA Link
```tsx
href: '/your-new-path'  // Change destination
```

### Update Copy
Find and replace in the specific component file. Build to verify changes.

### Debug Build Issues
```bash
npm run build 2>&1 | grep -i error
# Shows errors if any
```

---

## ❓ FAQ

**Q: How do I change the hero image?**
A: Update the `backgroundVariant` prop in CodeCrackHero (line 48).

**Q: How do I add more features?**
A: Add items to the `CODECRACK_FEATURES` or `features` arrays in the respective component.

**Q: How do I change colors?**
A: Update the Tailwind classes (e.g., `from-blue-600` to `from-purple-600`).

**Q: How do I test locally?**
A: Run `npm run dev` and visit `http://localhost:3000/products/codecrack`.

**Q: How do I see dark mode?**
A: Most browsers have a dark mode toggle in dev tools. Test both modes.

**Q: Is the build production-ready?**
A: Yes! All 11 pages pass TypeScript, ESLint, and production build checks.

---

## 🆘 Troubleshooting

**Build fails with TypeScript error:**
- Check `app/components/sections/products/` for type issues
- Run `npm run build` to see full error details

**Page doesn't display correctly:**
- Check that all components are imported correctly
- Verify image paths exist
- Clear `.next` folder and rebuild

**Images aren't showing:**
- Place images in `public/images/` folder
- Update paths in component files
- Check file names match exactly (case-sensitive)

**Dark mode not working:**
- Check that `dark:` classes are added to all elements
- Verify `darkMode: 'class'` in tailwind config
- Check HTML has `dark` class on root element

---

## 📞 Quick Links

- **Homepage**: `/`
- **Products**: `/products`
- **CodeCrack**: `/products/codecrack`
- **Renov.AI**: `/products/renov-ai`
- **Investors**: `/investors`

---

**Status**: 🟢 Production Ready
**Last Build**: ✅ All 11 pages generated
**Next Step**: Deploy to production
