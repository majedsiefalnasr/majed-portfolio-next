---
name: Majed Sief Alnasr Portfolio
description: A warm studio-desk portfolio for a CX & product designer — sand paper, sticky-note accents, monochrome controls.
colors:
  kraft-sand: "#f2eee4"
  soft-paper: "#faf7f0"
  ink-black: "#1a1a1a"
  true-black: "#000000"
  pure-paper: "#ffffff"
  warm-body: "#686868"
  faint-graphite: "#999999"
  paper-inverse: "#e6e6e6"
  sticky-note-yellow: "#ffd21e"
  highlighter-peach: "#ffe7ca"
  highlighter-mint: "#c5f2d1"
  highlighter-sky: "#c4e3ff"
  highlighter-blush: "#fdcfcf"
  highlighter-amber: "#f7d98a"
  accent-violet: "#c9bdf5"
  accent-plum: "#382c5a"
  accent-blush: "#f7d7da"
  marigold: "#f5b13f"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  subtitle:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.3
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  large: "16px"
  pill: "1000px"
spacing:
  section-y: "clamp(4rem, 8vw, 6rem)"
  section-x: "1.25rem"
  card-lg: "3rem"
  card-md: "2rem"
  card-sm: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.true-black}"
    textColor: "{colors.pure-paper}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.pure-paper}"
  button-secondary:
    backgroundColor: "{colors.kraft-sand}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "50px"
  card-surface:
    backgroundColor: "{colors.soft-paper}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.large}"
    padding: "{spacing.card-md}"
  tag-pill:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
  badge-sticky:
    backgroundColor: "{colors.sticky-note-yellow}"
    textColor: "{colors.true-black}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
---

# Design System: Majed Sief Alnasr Portfolio

## 1. Overview

**Creative North Star: "The Warm Studio Desk"**

This is a designer's workspace rendered as a website: a sheet of warm kraft-sand
paper, monochrome tools laid out with care, and playful sticky notes and hand-drawn
doodles pinned where they help. The warmth is real (the paper ground, the rounded
yellow badges with emoji, the conversational question-headlines) but it sits on top
of disciplined type and a quiet, near-black control set. Approachable on the surface,
exacting underneath: the same promise the work makes.

The system is light, flat, and roomy. Surfaces rest as flat planes separated by tone
and hairline rings, never by heavy borders or drop shadows. Depth is a *response*, not
a default: a card lifts only when you reach for it. Personality lives in a small, named
set of moves (the question-as-headline rhythm with its word-by-word rising answer, the
avatar in the nav, draggable work tickers, the yellow sticky-note badge with a doodle
arrow), not in decoration sprinkled everywhere.

It explicitly rejects the generic AI/SaaS template (tracked eyebrows on every section,
identical icon-heading-text card grids, hero-metric blocks), cold corporate consulting
chrome, and loud Dribbble maximalism where motion buries the work. The work is always
the loudest thing on the page.

**Key Characteristics:**
- Warm kraft-sand paper ground (#f2eee4), not white, not cream-neutral filler.
- A single type family (Geist) carrying the whole hierarchy through weight and scale.
- Monochrome ink/paper controls; color is reserved for small pastel accents.
- Flat at rest, lift on hover. Hairline `ring-ink/5` instead of borders.
- Conversational rhythm: questions as section headlines, answered by plain supporting
  lines that rise in word by word (TextIntro). The avatar lives in the nav.
- Drag-enabled tickers (hero work strip, capability chips) that drift slowly and
  scrub under the pointer, Framer-style.
- Signature playfulness: sticky-note-yellow pill badges with emoji + doodle SVGs.

## 2. Colors

A warm, paper-toned ground with a strictly monochrome control layer and four soft
pastel highlighters used as gentle, optional accents.

### Primary
- **Kraft Sand** (#f2eee4): The body ground for the entire site. Warm, low-chroma
  paper, not white. This is the desk the work sits on; it carries the warmth so the
  controls don't have to.
- **Ink Black** (#1a1a1a): The default text color and the near-black used on titles
  and primary surfaces. The system's "ink".
- **True Black** (#000000): Reserved for the primary button fill and the highest-
  contrast marks. One notch darker than Ink Black for buttons that must read as solid.

### Secondary
- **Soft Paper** (#faf7f0): The raised-surface color for cards and panels. A touch
  brighter and cleaner than the sand ground, so a card reads as a sheet laid on the
  desk.
- **Sticky-Note Yellow** (#ffd21e): The signature accent. Used only on the small
  rotated pill badges ("Who Am I? 👋", "What's next?") and nowhere as a fill at scale.
  Its rarity is the point.

### Tertiary
The four pastel highlighters. Soft, desaturated, optional. Use as tonal tints behind
small marks (philosophy chips, illustration fills), never as body-text backgrounds and
never to carry meaning on their own.
- **Highlighter Peach** (#ffe7ca)
- **Highlighter Mint** (#c5f2d1)
- **Highlighter Sky** (#c4e3ff)
- **Highlighter Blush** (#fdcfcf)

### Neutral
- **Warm Body** (#686868): Secondary body copy and supporting text on the sand ground.
  Watch this one: it is the contrast-critical token (see the Contrast rule).
- **Faint Graphite** (#999999): Tertiary labels, dates, "subtle" metadata only. Never
  body copy.
- **Pure Paper** (#ffffff): Text on dark fills (primary buttons) and the rare true-white
  inset.
- **Paper Inverse** (#e6e6e6): Text and titles on dark/inverse surfaces.

### Named Rules
**The Monochrome Control Rule.** Every interactive control (buttons, nav, tags) is
ink-on-paper or paper-on-ink. Color never enters the control layer. The pastels and the
yellow are *marks on the page*, not UI states. This is what keeps the calm.

**The Contrast Rule.** Warm Body (#686868) on Kraft Sand (#f2eee4) is the single most
likely accessibility failure. Body text must clear 4.5:1 (push toward 7:1 where the
design allows); Faint Graphite (#999999) is for large or non-essential text only, never
running body copy. When in doubt, move toward Ink Black, never toward Faint Graphite.

## 3. Typography

**Display / Body Font:** Geist (with `ui-sans-serif, system-ui, sans-serif`)
**Label / Mono Font:** Geist Mono (with `ui-monospace, monospace`)

**Character:** One humanist-geometric family does the whole job. Hierarchy comes from
weight (600 for every heading, 400 for prose) and a fluid `clamp()` scale, not from a
second display face. Geist is neutral enough to stay out of the work's way and modern
enough to read as crafted. Mono appears only as a quiet labelling voice, never as
"developer" costume.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 6vw, 4.5rem)`, lh 1.05, tracking -0.02em): Hero
  headline only ("Design that makes your product click."). One per page.
- **Headline** (600, `clamp(2rem, 4.5vw, 3.25rem)`, lh 1.1): Page-level H1s outside the
  hero.
- **Title** (600, `clamp(1.5rem, 3vw, 2.25rem)`, lh 1.2): Section question-headlines and
  featured card titles.
- **Subtitle** (600, `clamp(1.25rem, 2vw, 1.5rem)`, lh 1.3): Card titles in grids, H3s.
- **Lead** (400, `clamp(1.125rem, 1.5vw, 1.375rem)`, lh 1.6): The supporting paragraph
  under a section headline.
- **Body** (400, 1rem, lh 1.6): Running copy. Capped at the `max-w-prose` measure
  (~65ch). Color is Warm Body or Ink Black, never Faint Graphite.
- **Label** (Geist Mono, 500, 0.875rem): Sparingly, for metadata. Note: the optional
  uppercase tracked eyebrow exists in `SectionIntro` but is deliberately left OFF by
  default; the question-headline carries the rhythm instead.

### Named Rules
**The One-Family Rule.** Geist (+ Geist Mono for labels) is the entire typographic
system. Do not introduce a display serif or a second sans "for contrast". Contrast is
weight and scale.

**The Question-Headline Rule.** Sections lead with a conversational question in Title
size ("Why does his design approach work?"), answered by a plain lead-size supporting
line with key phrases in ink-dark `<strong>`, not by a tracked all-caps eyebrow. The
eyebrow trope is forbidden as section scaffolding.

**Balance & Pretty Rule.** Headings use `text-wrap: balance`; long prose uses
`text-wrap: pretty`. Both are already wired into the shared components; keep them.

## 4. Elevation

Flat by default, tonal by structure. The system conveys depth through three layers of
warm tone (Kraft Sand ground → Soft Paper surface → Pure Paper inset) and a hairline
`ring-1 ring-ink/5` outline, not through resting shadows. Shadows exist only as a
*response to interaction*. A card is a flat sheet until you hover it, then it lifts.

### Shadow Vocabulary
- **Hover lift, standard** (`box-shadow` via Tailwind `shadow-lg`): Service and grid
  cards on hover. Paired with a 300ms transition.
- **Hover lift, featured** (`box-shadow` via Tailwind `shadow-xl`): The featured case-
  study card on hover. A slightly stronger lift for the page's primary object.

### Named Rules
**The Flat-At-Rest Rule.** No element carries a drop shadow at rest. If a surface needs
separation while static, it gets a tone change (Sand → Paper) and a `ring-ink/5`
hairline, never a shadow. Shadows are reserved for hover and focus states. If a card
looks lifted before you touch it, the shadow is wrong.

**Figma-faithful exceptions.** Two elements carry a soft resting shadow because the
Figma source treats them as objects sitting *on* the desk, not flat sheets *in* it: the
**sticky-note badges** (`shadow-sm`) and the browser-chrome screenshot inside the case
showcase. Everywhere else, flat-at-rest still holds.

## 5. Components

### Buttons
*Calm, confident, monochrome.* The CTA is the quietest-looking, most certain element on
the page.
- **Shape:** Full pill (`rounded-pill`, 1000px), fixed height 50px, horizontal padding
  1.75rem (`px-7`), text 0.875rem / weight 500.
- **Primary:** True Black fill (#000000), Pure Paper text. Hover dims to ~90% opacity
  (reads as Ink Black). Used for the main action ("See My Work", "Let's talk").
- **Secondary:** No fill; `border-ink/15` hairline, Ink Black text, hover fills to
  `ink/5`. Used as the companion action beside a primary.
- **Focus:** `focus-visible:outline-2 outline-offset-2 outline-ink`. Always visible,
  never removed.

### Tags / Chips
- **Style:** Pill (`rounded-pill`), `bg-ink/10` tonal fill, Ink Black text, 0.75rem,
  weight 500, padding `0.25rem 0.75rem`. Used for case-study topic tags. Monochrome,
  no color.

### Cards / Containers
*Sheets laid on the desk.* Used deliberately for case studies, services, and blog
covers, not as a universal layout reflex.
- **Corner Style:** `rounded-large` (16px).
- **Background:** Soft Paper (#faf7f0). Inner image wells use the Kraft Sand ground.
- **Border:** Hairline `ring-1 ring-ink/5`, no hard border.
- **Shadow Strategy:** Flat at rest; `shadow-lg` / `shadow-xl` on hover only (see
  Elevation). Cover images scale to 1.03 on `group-hover` over 500ms.
- **Internal Padding:** 1.5rem (compact) to 3rem (featured), via the card spacing scale.

### Navigation
- **Style:** Sticky top bar, height 72px, `bg-background/80` with
  `backdrop-blur-md` and a `border-ink/5` bottom hairline. `z-50`.
- **Layout:** Avatar (44px circle, `ring-ink/10`) beside the styled wordmark —
  **Majed** bold + *Sief Alnasr.* regular, uppercase — with the role ("CX & Product
  Designer") as a small Warm-Body subline (hidden on the smallest screens). Right side:
  the "Let's talk" primary pill and a circular menu button. The page links (Who am I /
  Work / Blog) live behind the menu button at *every* breakpoint, not just
  mobile; the button opens a Soft-Paper dropdown panel.
- **States:** Inactive links Warm Body, active link Ink Black. Panel closes on link
  click, Escape, and outside pointer-down.

### Section Intro (signature pattern)
The conversational unit that opens nearly every section: a bold question headline
(`text-balance`, question scale) whose words rise in one by one from a masked
baseline, answered by a plain lead-size supporting line that rises the same way once
the question lands (`TextIntro` behind `SectionIntro`). Key phrases sit in ink-dark
`<strong>`; punctuation after an emphasized phrase stays glued to it. No bubble, no
avatar, no eyebrow: the rising text itself is how the page talks to the visitor.
Reduced motion renders everything immediately.

### Hero (Home)
Status pill (green availability dot + "CX & Product Designer · Available for
projects"), Display-size value-prop headline, a warm one-line introduction with the 👋
wave, primary + secondary pill CTAs with the "What's next?" sticky doodle, then a
full-bleed **work ticker** of project shots (mixed landscape/portrait, `rounded-large`,
hairline rings). The "Who am I?" page keeps the original avatar-in-halo hero
(`AvatarHero`) — home leads with the work, that page leads with the person.

### Draggable Ticker (`Marquee`)
The shared motion primitive behind the hero work strip and the capability chips: two
copies of the content on a rAF-driven track that drifts at ~35–45px/s, wraps
seamlessly, and scrubs directly under pointer drag, with the release fling decaying
back into the drift. Runs only while on screen. Reduced motion stops the drift: chips
recenter as a static wrapped cloud, imagery stays a draggable cropped row.

### Capability Chips
"What does he actually do?" as two chip rows drifting in opposite directions with an
edge fade mask. Each chip: Soft-Paper pill, hairline ring, lucide icon + label in Ink.
Data-driven from `data/capabilities.ts`.

### Reach-Out Steps
The engagement journey ("What happens if I reach out?") as three tilted Soft-Paper
sheets (alternating ±1–2°) with mono step numerals, joined by hand-drawn doodle
arrows. Cards straighten and lift on hover; mobile stacks them without connectors. A
real ordered sequence, so the numerals earn their place.

### FAQ Accordion
Native `<details>/<summary>` styled as Soft-Paper sheets with a plus icon that turns
into a close mark (`rotate-45`). Expansion animates via scoped
`interpolate-size: allow-keywords` + `::details-content` transitions (instant where
unsupported, and under reduced motion). Copy lives in `data/faq.ts`.

### About
"Who's behind the work?" two-column: bio lead, two honest stat cards (Soft Paper,
hairline ring), "More about me" secondary CTA beside the social icon row; portrait on
the graph-paper white panel to the right (the same grid the avatar frame used).

### Case Showcase (signature pattern)
The featured-case presentation (`CaseStudyShowcase`): a Soft-Paper panel with centered
**dashed-outline** topic tags, the project wordmark in uppercase, a 3-up stat row
(value over muted label), and the product screenshot in browser chrome over a green
glow. Distinct from the compact `CaseStudyCard` grid item.

### Approach Carousel
The **design-approach** principles as violet / plum / blush / amber / mint sheets
sized to their content: a tonal icon chip up top, title and description anchored at
the base (`DesignApproachCarousel`).

**The Slider Geometry Rule.** Every slider shares the blog carousel's geometry: a
full-bleed scroll-snap row whose active card aligns to the content box
(`px-[max(1.25rem,calc(50vw-30.625rem))]` + matching `scroll-px`), with neighboring
cards bleeding to both viewport edges.

**The Controls-At-The-End Rule.** Every slider (approach, blog, case gallery) puts
its circular prev/next buttons (`CarouselButton`) at the end of the row, right-aligned
to the content box — never centered. A leading CTA may sit at the start of the same
row (blog).

### Pricing Cards
"What does working together cost?" as two engagement shapes side by side: the
per-project quote on Soft Paper with a hairline ring, the monthly partnership as the
featured **ink card** (paper-on-ink, the one large dark surface in the system).
Check-list features, baseline-aligned price + period, pill CTA per card (inverse fill
on the ink card), and one quiet reassurance line below instead of fine print. Copy
and rates live in `data/pricing.ts`.

### Marquee Contact (signature pattern)
The pre-footer email rendered oversized and full-bleed, bleeding off the right edge with
a faint ghost layer behind it (`ContactCTA`). The one place display type intentionally
exceeds the usual heading ceiling; it is a decorative wordmark, not a heading.

### Sticky-Note Badge (signature accent)
A small rotated pill in Sticky-Note Yellow (#ffd21e) with True Black text, often paired
with an emoji and a hand-drawn doodle SVG (e.g. `hero/arrows.svg`). Examples: the
"Who Am I? 👋" badge on the who-am-i avatar frame, the "What's next?" badge by the
hero CTAs. Use sparingly as marginalia; it is the system's wink, and it stops being
charming if repeated.

## 6. Do's and Don'ts

### Do:
- **Do** keep Kraft Sand (#f2eee4) as the body ground and Soft Paper (#faf7f0) for
  raised surfaces. The warmth lives in the paper.
- **Do** carry the full type hierarchy with Geist weight + scale alone (600 headings,
  400 prose). One family.
- **Do** keep controls monochrome (ink-on-paper / paper-on-ink). Color is for marks,
  not UI.
- **Do** open sections with a question-headline answered by a plain rising supporting
  line (key phrases in ink-dark bold). No bubbles, no eyebrows.
- **Do** keep surfaces flat at rest and lift them only on hover (`shadow-lg` /
  `shadow-xl`, 300ms).
- **Do** verify Warm Body (#686868) on Kraft Sand clears 4.5:1, pushing toward AAA 7:1;
  move toward Ink Black when close.
- **Do** use the sticky-note-yellow badge sparingly, as a deliberate wink with emoji +
  doodle.

### Don't:
- **Don't** ship the generic AI/SaaS template: no tracked uppercase eyebrow above every
  section, no identical icon-heading-text card grids, no hero-metric block.
- **Don't** put a colored `border-left`/`border-right` stripe on cards, callouts, or
  list items. Use the hairline `ring-ink/5` or a tone change.
- **Don't** use gradient text or `background-clip: text`. Emphasis is weight and size.
- **Don't** introduce a second type family or a display serif "for contrast".
- **Don't** let any element carry a resting drop shadow. Flat at rest; lift on hover.
- **Don't** use Faint Graphite (#999999) for running body copy, and never rely on the
  pastel highlighters alone to carry meaning (pair with text or icon for color-blind
  visitors).
- **Don't** drift toward cold corporate consulting chrome or loud Dribbble maximalism.
  The work stays the loudest thing on the page.
