# AGENTS.md

This file provides repository guidance for Codex and other agentic coding tools.

## Project Overview

This is a Next.js portfolio site for Majed Sief Alnasr, CX & Product Designer. Treat `PRODUCT.md` and `DESIGN.md` as the source of truth for product intent, brand voice, design tokens, and visual system rules.

## Browser Verification

Use `playwright-cli` as the primary browser automation path for local UI checks, screenshots, snapshots, interaction testing, and Playwright test debugging. If `playwright-cli` is unavailable, blocked, cannot attach to the needed browser/session, or the task specifically needs MCP-native browser tools, fall back to the Playwright MCP browser tools.

## Validation

Prefer the repository scripts before handing work back:

- `pnpm lint`
- `pnpm build`
- `pnpm test:e2e` when browser behavior or routed UI is affected

Preserve unrelated dirty files unless the user explicitly asks to include or revert them.
