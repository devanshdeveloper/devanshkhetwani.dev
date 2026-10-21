---
name: add-feature-in-repo-style
description: Guide for adding features, section components, or review tools strictly matching the established architectural style, line limits, and conventions of this repository. Use when building new functionality.
---

# Feature Implementation in Repository Style

Guides the creation of new sections, components, or review utilities following established repository standards.

## Architectural Conventions

### 1. Section Component Rules
- Place route-specific sections in `_components/` co-located with their `page.js`.
- File length: **Maximum 250 lines** (hard limit 300).
- Must open with the section identifier: `// section: <id>`.
- Client directives: restrict `'use client'` strictly to interactive leaves (forms, tabs, GSAP animations). Never place on page or layout files.

### 2. Shared Components Rules
- Components reused across 2 or more routes belong in `site/components/`.
- Keep component folder structure flat (no nested `ui/` or `shared/` directories).

### 3. Motion & Animation Rules
- Import animation timing and easing tokens from `site/lib/motion.js`.
- Always wrap animations with `@gsap/react` (`useGSAP`).
- Respect `prefers-reduced-motion` settings.

### 4. Review Utilities Rules
- In `project-docs/review-tools`, write pure ESM (`.mjs`).
- Never introduce CommonJS (`require()`, `module.exports`).
- Run via `pnpm` exclusively.
