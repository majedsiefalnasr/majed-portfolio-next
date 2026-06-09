---
stepsCompleted: [1, 2, 3]
inputDocuments: []
session_topic: 'Convert portfolio design into production-ready Next.js code'
session_goals: 'Analyze portfolio screens (Home, Who am I, Case Studies, Case Study Detail, Blog), define page structure and reusable components, create implementation plan, identify animations and responsive behavior, prepare ordered dev tasks'
selected_approach: 'ai-recommended'
techniques_used: ['Morphological Analysis', 'SCAMPER Method', 'Decision Tree Mapping']
ideas_generated: 34
technique_execution_complete: true
---

# Brainstorming Session Results

**User:** MAJED
**Date:** 2026-06-09

## Session Overview

**Topic:** Convert portfolio design into production-ready Next.js 16 + React 19 + TypeScript code
**Goals:** Page structure, reusable components, animation/responsive specs, ordered dev tasks

**Stack:**
Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui + Radix UI, Framer Motion, MDX, Vitest + Playwright, pnpm, Vercel

**Design Sources (Primary — Figma):**
- Home: node `111:5926`
- Case Studies: node `211:3961`
- Case Study Detail: node `267:1198`
- Blog: node `235:1731`
- Who Am I: node `248:1122`
- File key: `tH3JfGN8l848pKW7JAwnuB`

**Project Context:**
- Owner: Majed Sief Alnasr
- Focus: CX Design, UX/UI Design, Product Design, Consulting
- Style: Minimal, elegant, editorial, Apple-level attention to detail
- Goal: Premium, modern, highly performant portfolio — production-ready

---

## Technique Selection

**Approach:** AI-Recommended Techniques

- **Morphological Analysis** — systematic parameter mapping across all pages and component dimensions
- **SCAMPER Method** — optimise component set (combine, eliminate, reuse across pages)
- **Decision Tree Mapping** — ordered dev tasks with dependencies and server/client boundary decisions

---

## Technique Execution Results

### Phase 1: Morphological Analysis — Component Inventory

Analysed all 5 Figma screens. 20 components identified across all pages.

**Key structural observation:** The design uses a consistent conversational rhythm — avatar + question headline + body paragraph — as the intro pattern for nearly every section site-wide.

**Global observations:**
- Background: warm cream (`~#F5F0E8`) used consistently across all pages
- Typography: editorial large headlines, readable body, consistent scale
- The `ContactCTA` + `Footer` appear on every page but should NOT be in `layout.tsx` — use `PageFooterSections` composed explicitly per page template
- Only true globals in `layout.tsx`: `NavBar`, `Footer`, font loading

**Raw component inventory (pre-SCAMPER):**

| # | Component | Pages | Notes |
|---|---|---|---|
| 1 | `NavBar` | All | Logo, nav links, "Let's Talk" CTA |
| 2 | `HeroSection` | Home, Who Am I | Large headline, bio, avatar, 2 CTAs |
| 3 | `SectionIntro` | All (×8–10) | Avatar pill + question headline + body — most reused pattern |
| 4 | `CaseStudyCard` | Home, Case Studies, Who Am I | Cover image, title, tags, metrics, description |
| 5 | `DeviceMockup` | Home, Case Study Detail | Device frame + screenshot, carousel arrows |
| 6 | `DesignPhilosophyGrid` | Home | 3-col pastel cards, icon + title + copy |
| 7 | `ProcessSteps` | Home | 4-step flow: Discovery → Design → Dev → Delivery |
| 8 | `ServicesGrid` | Home | 4 service cards, hover state |
| 9 | `TestimonialBlock` | Home, Case Studies | Pull-quote, avatar, name, role |
| 10 | `BlogCard` | Home, Blog | Cover image, category, date, title, excerpt |
| 11 | `NewsletterCTA` | Blog, Who Am I, others | Email input + subscribe, form state |
| 12 | `ContactCTA` | All pages (pre-footer) | Avatar speech bubble + large email CTA |
| 13 | `Footer` | All | Social links, copyright |
| 14 | `CaseStudyDetailHeader` | Case Study Detail | Breadcrumb, title, metadata, hero mockup |
| 15 | `CaseStudyContent` | Case Study Detail | MDX long-form: text, image galleries, sections |
| 16 | `NextCaseStudyTeaser` | Case Study Detail | "Next case →" preview card |
| 17 | `BlogGrid` | Blog | 3-col grid of BlogCards + pagination |
| 18 | `MetricsRow` | Home Hero, CaseStudyCard | Stat blocks: number + label |
| 19 | `AvatarPill` | All (inline) | Circular avatar, `next/image` |
| 20 | `ScrollReveal` | All sections | Framer Motion scroll-triggered wrapper |

---

### Phase 2: SCAMPER — Optimised Component Set

**S — Substitute**
- Introduce `Section` layout primitive (`max-w`, padding, optional `id`) — replaces raw `<section>` wrappers everywhere
- Replace standalone `AvatarPill` with inline `next/image` + Tailwind `rounded-full` — no component needed

**C — Combine**
- `CaseStudyCard` → single component, `variant="featured" | "grid"` + optional `label` prop
- `BlogCard` → single component, `variant="featured" | "grid"`
- `NewsletterCTA` + `ContactCTA` → composed into `PageFooterSections`, included explicitly per page
- `MetricsRow` → inlined as sub-pattern inside `HeroSection` and `CaseStudyCard`; not exported standalone
- `NextCaseStudyTeaser` → eliminated; render `CaseStudyCard variant="featured" label="Next case →"` instead

**A — Adapt**
- `ScrollReveal` wrapper → eliminated; apply Framer Motion `whileInView` + shared variants from `@/lib/animations` directly on elements
- `ProcessSteps` → pure CSS responsive: horizontal on desktop (`md:`), vertical timeline on mobile — no JS breakpoint detection

**M — Modify**
- `DeviceMockup` → slot/children component; accepts screenshot, video, or interactive embed — not coupled to a specific media type
- `DesignPhilosophyGrid` → data driven from `@/data/philosophy.ts`; content editable without touching component code

**P — Put to other uses**
- `CaseStudyCard variant="grid"` reused on Who Am I "proof of capability" section — zero extra code
- `BlogCard variant="featured"` reused in Home "Insights" section

**E — Eliminate**
- `AvatarPill` — inline `next/image` + Tailwind at usage sites
- `ScrollReveal` — inline Framer Motion variants
- `NextCaseStudyTeaser` — covered by `CaseStudyCard` with `label` prop
- `MetricsRow` (standalone) — inlined in parent components

**R — Reverse**
- Build **mobile-first**: Tailwind `md:` / `lg:` scale-up, not desktop-first retrofitting
- **MDX drives page structure**: frontmatter declares layout variant and metadata; page component reads and renders — content is source of truth for Case Study Detail and Blog

---

### Phase 3: Decision Tree Mapping

#### Server vs Client Boundaries

**Rule:** isolate `"use client"` to the smallest possible subtree — animated wrapper atoms, not full sections.

| Component | Boundary | Reason |
|---|---|---|
| `NavBar` | **Client** | Mobile menu toggle needs state |
| `Footer` | Server | Pure static markup |
| `HeroSection` | Server | Static render; extract `HeroAnimatedElements` client sub-component for animated headline/CTA only |
| `Section` | Server | Layout primitive, no behaviour |
| `SectionIntro` | Server | Static markup, no interactivity |
| `CaseStudyCard` | Server | Static data render; hover via CSS only |
| `BlogCard` | Server | Static data render; hover via CSS only |
| `DeviceMockup` | **Client** | Carousel index state |
| `DesignPhilosophyGrid` | Server | Static data |
| `ProcessSteps` | Server | Static render; extract `MotionStep` client wrapper per step for scroll reveal only |
| `ServicesGrid` | Server | Static data; hover via CSS |
| `TestimonialBlock` | Server | Static quote render |
| `BlogGrid` | Server | Static list render |
| `CaseStudyDetailHeader` | Server | Static metadata render |
| `CaseStudyContent` | Server | MDX render (client sub-components mapped as needed) |
| `NewsletterCTA` | **Client** | Form input + submit state |
| `ContactCTA` | Server | Static email display |
| `PageFooterSections` | Server | Composes server + client children — no directive needed |

#### Dependency Graph

```
layout.tsx
  ├── NavBar (client)
  ├── [page slot]
  └── Footer (server)

Every page template
  └── PageFooterSections (server)
        ├── ContactCTA (server)
        └── NewsletterCTA (client)

Shared atoms composed inside sections
  ├── Section (server)
  ├── SectionIntro (server)
  ├── CaseStudyCard (server)
  ├── BlogCard (server)
  ├── DeviceMockup (client)
  └── TestimonialBlock (server)

Animation sub-components (client, minimal)
  ├── HeroAnimatedElements
  └── MotionStep

Data layer
  ├── @/data/philosophy.ts
  ├── @/data/services.ts
  ├── @/data/case-studies.ts
  └── @/content/**/*.mdx (frontmatter = source of truth)
```

---

## Final Implementation Plan

### Recommended Route Structure

```txt
app/
├── page.tsx
├── who-am-i/
│   └── page.tsx
├── case-studies/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── sitemap.ts
├── robots.ts
└── layout.tsx
```

### Recommended Content Structure

```txt
content/
├── blog/
│   ├── article-1.mdx
│   └── article-2.mdx
└── case-studies/
    ├── zidney.mdx
    └── project-2.mdx
```

### TIER 0 — Foundation _(blocks everything)_

1. Tailwind CSS v4 `@theme` tokens — colour palette, typography scale, spacing
2. SEO foundation — Metadata API defaults, Open Graph, Twitter Cards, JSON-LD Person schema
3. `@/lib/animations.ts` — shared Framer Motion variants (`fadeUp`, `fadeIn`, `staggerContainer`)
4. `@/data/*.ts` — static data files: `philosophy.ts`, `services.ts`, `case-studies.ts`
5. Shared type architecture:
   - `types/blog.ts`
   - `types/case-study.ts`
   - `types/service.ts`
   - `types/testimonial.ts`
   - `types/index.ts`

### TIER 1 — Layout Shell _(blocks all pages)_

5. `app/layout.tsx` — root layout, `next/font`, default metadata
6. `NavBar` — mobile menu (client), "Let's Talk" CTA
7. `Footer` — social links, copyright (server)
8. `Section` — layout primitive: max-width, padding, optional `id`
9. `SectionIntro` — exported reusable: avatar + headline + body

### TIER 2 — Shared Components _(blocks page assembly)_

10. `CaseStudyCard` — `variant="featured" | "grid"`, `label?` prop
11. `BlogCard` — `variant="featured" | "grid"`
12. `DeviceMockup` — slot/children, carousel arrows (client)
13. `TestimonialBlock` — quote, author, role props
14. `HeroSection` (server) + `HeroAnimatedElements` (client sub)
15. `ProcessSteps` (server) + `MotionStep` (client sub per step)
16. `ServicesGrid` — data from `@/data/services.ts`
17. `DesignPhilosophyGrid` — data from `@/data/philosophy.ts`
18. `NewsletterCTA` — email input + submit (client)
19. `ContactCTA` — email CTA (server)
20. `PageFooterSections` — composes `ContactCTA` + `NewsletterCTA`

### TIER 3 — MDX Pipeline _(required before Case Study Detail)_

21. MDX setup — `@next/mdx` or `next-mdx-remote`, config in `next.config.ts`
22. Frontmatter schema — `CaseStudy` and `BlogPost` types aligned with `@/types`
23. Custom MDX components map — `DeviceMockup`, `ImageGallery`, `MetricBlock`, etc.
24. Placeholder content — 1 case study MDX + 1 blog post MDX for dev testing

### TIER 4 — Pages _(in order of complexity)_

25. **Blog page** — `BlogGrid` + `BlogCard grid` + `PageFooterSections`
26. **Who Am I page** — `HeroSection` + multiple `SectionIntro` sections + `CaseStudyCard grid` + `PageFooterSections`
27. **Case Studies page** — `CaseStudyCard` grid + `TestimonialBlock` + `PageFooterSections`
28. **Home page** — all shared components assembled; most complex; validates full component integration
29. **Case Study Detail page** — MDX render + `CaseStudyDetailHeader` + `CaseStudyContent` + `DeviceMockup` + `PageFooterSections`

### TIER 5 — Polish _(after all pages ship)_

30. Responsive audit — mobile-first check across all pages and breakpoints
31. Animation pass — `whileInView` variants applied consistently, timing tuned
32. Accessibility pass — focus states, `aria-label`, dialog/form roles, keyboard navigation
33. Performance pass — image optimisation, bundle size analysis, Lighthouse audit
34. Playwright e2e suite — home load, case study navigation, blog grid, MDX article render, contact form
35. SEO audit — validate metadata, sitemap, robots, JSON-LD, Open Graph previews

---

## Key Decisions & Rationale

| Decision | Rationale |
|---|---|
| `NavBar` + `Footer` in `layout.tsx` only | True globals — appear on every route including future 404 |
| `PageFooterSections` explicit per page | `ContactCTA` may not apply to all future routes; explicit beats implicit |
| `SectionIntro` exported component | Appears 8–10× site-wide; single source prevents markup drift |
| Server Components by default | Minimise client bundle; `"use client"` only where state/animation truly requires it |
| `HeroSection` stays Server | Framer Motion isolated to `HeroAnimatedElements` sub-component |
| `ProcessSteps` stays Server | `MotionStep` client wrapper per step; full component stays server |
| MDX before Case Study Detail | Detail page has hard dependency on MDX pipeline and frontmatter types |
| Mobile-first Tailwind | Prevents late-stage responsive retrofitting on an editorial scroll-heavy design |
| Data files in `@/data/*.ts` | Content editable without touching component code; no CMS needed initially |
| `CaseStudyCard` label prop | Covers `NextCaseStudyTeaser` use case; eliminates a component |
| Dedicated type files | Better scalability than a single large `types/index.ts` file |
| SEO from the beginning | Avoid retrofitting metadata, schema, sitemap, and social previews later |
| Components grouped by responsibility | Easier scaling as the portfolio grows with blog and case studies |

---

## Component File Map

```
@/components/
  ui/
  layout/
    NavBar.tsx          (client)
    Footer.tsx
    Section.tsx
    PageFooterSections.tsx
  cards/
    CaseStudyCard.tsx
    BlogCard.tsx
  shared/
    SectionIntro.tsx
    TestimonialBlock.tsx
    NewsletterCTA.tsx   (client)
    ContactCTA.tsx
  motion/
    HeroAnimatedElements.tsx   (client)
    MotionStep.tsx             (client)
    DeviceMockup.tsx           (client)
  sections/
    HeroSection.tsx
    ProcessSteps.tsx
    ServicesGrid.tsx
    DesignPhilosophyGrid.tsx
    BlogGrid.tsx
    CaseStudyDetailHeader.tsx
    CaseStudyContent.tsx
  mdx/
    mdx-components.tsx

@/data/
  philosophy.ts
  services.ts
  case-studies.ts

@/types/
  blog.ts
  case-study.ts
  service.ts
  testimonial.ts
  index.ts

@/lib/
  animations.ts

@/content/
  case-studies/
    zidney.mdx
  blog/
    sample-post.mdx

app/
  layout.tsx
  page.tsx
  who-am-i/page.tsx
  case-studies/page.tsx
  case-studies/[slug]/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  sitemap.ts
  robots.ts
```

---

_Session complete. 34 tasks across 5 tiers. Ready to begin implementation starting with Tier 0._
