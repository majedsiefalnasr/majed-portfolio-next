---
project_name: "Majed's portfolio"
user_name: "MAJED"
date: "2026-06-09"
sections_completed:
  ["technology_stack", "language_rules", "framework_rules", "testing_rules", "quality_rules", "workflow_rules", "anti_patterns"]
status: "complete"
rule_count: 47
optimized_for_llm: true
---

# Project Context for AI Agents

_Critical rules and patterns AI agents must follow when implementing code in this project. Focuses on unobvious details agents might otherwise miss._

---

## Technology Stack & Versions

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui + Radix UI
- Framer Motion
- MDX (Contentlayer integration planned)
- Vitest (unit), Playwright (e2e)
- pnpm (package manager)
- Vercel (deployment)

---

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

- Path alias: `@/*` maps to project root (e.g. `@/components`, `@/lib`, `@/content`, `@/types`, `@/hooks`)
- Prefer `type` for object shapes; use `interface` only when declaration merging or public extension is required
- No barrel files — use direct imports for clear tree-shaking and dependency tracing
- Prefer string literal unions over enums; use `as const` objects when runtime values are needed
- `any` is banned — use `unknown` first; `any` requires an inline comment explaining why
- Prefer `async/await`; Promise chains only for simple one-line transformations
- Plain `try/catch` for app code; Result-style patterns only where error handling becomes repetitive
- Prefer `undefined` for optional values; use `null` only for intentional empty state from data/content

### Framework-Specific Rules (Next.js + React)

- App Router only — no Pages Router
- Server Components by default; add `"use client"` only for interactivity, browser APIs, state, hooks, or Framer Motion
- Fetch data in Server Components by default; React Query only if client-side async state becomes necessary
- `next/image` and `next/font` are mandatory where applicable
- Site is primarily static/SSG; route handlers added only as needed (contact forms, analytics, integrations)
- Static `export const metadata` for standard pages; `generateMetadata` for dynamic MDX case studies/articles
- One component per file; co-locate tests and local types when useful; shared types in `@/types`
- shadcn/ui primitives live in `@/components/ui`; wrap with domain-specific components when needed
- Simple Framer Motion variants stay in the same file; shared/reusable variants go in `@/lib/animations`
- Global MDX component mapping by default; per-page overrides allowed for special case studies

### Testing Rules (Vitest + Playwright)

- Vitest: pure functions, utilities, and lightweight React component tests using React Testing Library
- Co-locate test files next to source (`Button.test.tsx` beside `Button.tsx`)
- Playwright: full e2e flows; visual regression added later for key portfolio pages
- Required e2e coverage: home page load, case study navigation, project detail pages, MDX article rendering, contact form (when added)
- Avoid mocks where possible; module-level mocks for utilities; MSW only if network/API behavior becomes significant
- No hard coverage threshold — target meaningful coverage for critical logic and user flows
- CI runs Vitest + Playwright on every PR

### Code Quality & Style Rules

- ESLint: Next.js default config with custom rules on top; Prettier for formatting
- Import order: external → internal (`@/*`) → relative → type-only imports
- File naming: Components `PascalCase` (`ProjectCard.tsx`), utilities `kebab-case` (`format-date.ts`), hooks `camelCase` (`useScrollProgress.ts`), routes follow Next.js conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)
- Component name must match filename
- Inline Tailwind utilities preferred; avoid `@apply` unless extracting a repeated design token or base style
- No comments unless explaining WHY something exists or a non-obvious tradeoff
- `console.log` banned in production code; `console.warn`/`console.error` allowed for intentional diagnostics only

### Development Workflow Rules

- Branch naming: `feature/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`
- Commit messages: Conventional Commits (e.g. `feat: add case study detail page`)
- PRs require: clear description, screenshots for UI changes, linked issue when applicable, at least 1 review before merge
- Main branch is `main`; direct push to `main` is not allowed — always use PRs
- Pre-commit hooks: Prettier, ESLint, TypeScript type-check, related Vitest tests when practical
- No versioning/changelog required; lightweight notes only for major public updates

### Critical Don't-Miss Rules

#### Anti-Patterns to Avoid

- **Tailwind v4**: Do not generate a `tailwind.config.js` — Tailwind v4 uses CSS-first config (`@theme` in CSS, not a JS config file)
- **`"use client"`**: Do not add too broadly — it makes the entire subtree client-side; never place on layout-level components
- **Framer Motion**: Do not import directly in Server Components — always wrap in a client boundary component
- **Images**: Do not use raw `<img>` tags — `next/image` is mandatory with explicit `width`/`height` or `fill`
- **Data fetching**: Do not fetch data in `useEffect` — use Server Components or React Query
- **Barrel files**: Do not create `index.ts` re-exports
- **Client Components**: Do not overuse — Server Components are the default
- **Animations**: Do not place animation logic in top-level layouts
- **Content**: Do not hardcode content that belongs in MDX or data files
- **Abstractions**: Do not create abstractions prematurely

#### Security

- Never expose secrets in client bundles
- Store env vars in `.env.local`; never commit `.env*` files
- Sanitize or trust-bound MDX content
- Validate and sanitize contact form input if a form/API route is added

#### Performance

- Server Components by default — minimize client bundle size
- Lazy-load heavy below-fold sections
- Use `next/image` for all images; use `next/font` to prevent layout shift
- Keep Framer Motion usage intentional and lightweight

#### Accessibility

- Always handle accessibility states for interactive elements: buttons, links, dialogs, and forms

---

## Usage Guidelines

**For AI Agents:** Read this file before implementing any code. Follow all rules exactly. When in doubt, prefer the more restrictive option. Update this file if new patterns emerge.

**For Humans:** Keep this file lean and focused on agent needs. Update when technology stack or conventions change. Remove rules that become obvious over time.

Last Updated: 2026-06-09
