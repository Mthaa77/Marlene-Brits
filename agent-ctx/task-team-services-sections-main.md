# Task: Team & Services Sections for Marlene Brits Attorneys

## Summary
Created two premium section components for the law firm website:

### 1. TeamSection.tsx (`/src/components/sections/TeamSection.tsx`)
- **id="team"** anchor for navigation
- Section header with "Our Team" gold accent + subtitle
- Large portrait cards with gradient placeholder (initials fallback)
- Marlene Brits featured as founder with larger card, badge, and horizontal layout on desktop
- Elegant hover effects: card lifts, gold border glow, top accent line
- Expandable bio with smooth AnimatePresence animation
- Qualifications as gold-bordered tags, Admissions as charcoal tags
- LinkedIn and email contact links
- Framer-motion scroll-triggered staggered animations
- Light warm gray background with subtle dot pattern

### 2. ServicesSection.tsx (`/src/components/sections/ServicesSection.tsx`)
- **id="services"** anchor for navigation
- Dark charcoal background (`bg-charcoal`) with white text
- Section header with "Practice Areas" gold accent + subtitle
- 2-column grid (1 on mobile) of glass morphism service cards
- Each card: Lucide icon in gold, shortTitle, tagline, description (clamped), features with gold dots
- Hover: gold border, slight scale, reveal more features, "Learn more" indicator
- Featured section for top 3 services (Conveyancing, Deceased Estates, Estate Planning) with detailed layout
- "Book a Consultation" gold gradient CTA button
- Background decorative elements: gradient orbs, subtle grid pattern
- Framer-motion staggered scroll animations
- Static `PracticeIcon` component to satisfy lint rule `react-hooks/static-components`

### Data Files (already existed)
- `/src/data/team.ts` - 3 team members with full bio, qualifications, admissions, expertise, memberships
- `/src/data/services.ts` - 8 practice areas with full details

### Page Integration
- Updated `src/app/page.tsx` to render both sections

### Lint Status
- All errors resolved
- `react-hooks/static-components` rule satisfied by using static `PracticeIcon` wrapper component
