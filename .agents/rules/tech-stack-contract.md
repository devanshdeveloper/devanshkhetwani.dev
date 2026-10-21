---
trigger: model_decision
description: "Binding architectural contract for Next.js App Router, thin components, GSAP motion, and NWW CMS integration."
---

# Technical Stack Specification & Architectural Contract

Governs all implementation work for the target Next.js portfolio application (`site/` workspace per `project-docs/tech-stack.md`).

## 1. Core Framework & Language Boundaries
- **Framework**: Next.js App Router (`site/app/`).
- **Language**: Strict JavaScript (`.js`, `.jsx`). Zero TypeScript (`.ts`, `.tsx`) or `tsconfig.json`.
- **Package Manager**: `pnpm` exclusively.
- **Styling**: Tailwind CSS with semantic tokens defined in `tailwind.config.js` and `site/app/globals.css`.
- **Animation**: GSAP (`@gsap/react`, ScrollTrigger). Motion tokens imported from `site/lib/motion.js`. Mandatory `prefers-reduced-motion` compliance.
- **Icons**: Lucide React (`lucide-react`).

## 2. Line Limits & Modularity
- **Thin Page Server Components (`page.js`)**: Maximum 80 lines. Pure orchestrators: fetch data, define metadata, render section components.
- **Section Components (`_components/*.js`)**: Maximum 250 lines (hard ceiling 300). Must open with `// section: <id>`.
- **Flat Shared Components**: UI reused across 2+ pages lives directly in `site/components/`. No nested folders.
- **Server vs Client Boundaries**: RSC by default. `'use client'` strictly restricted to interactive leaves. Never on `page.js` or `layout.js`.

## 3. NWW CMS Backend Contract
- **Endpoint**: Read from `SERVER_URL=https://prod-server.nextwebworks.in`. Never hardcode.
- **Authentication**: `CMS_SITE_KEY` read-only server Bearer token. Never prefix with `NEXT_PUBLIC_` or expose to browser.
- **Revalidation**: `POST /api/revalidate` with `REVALIDATE_SECRET` using constant-time hash comparison.
