# Technical Stack Specification

**Project:** Devansh Khetwani — Personal Developer Portfolio  
**Target Domain:** `https://devanshkhetwani.dev`  
**Status:** Pending Gate 1 Human Sign-Off  
**Created:** 2026-10-21  

---

## 1. Core Architecture & Runtime

| Layer | Selection | Rationale & Constraint |
|---|---|---|
| **Framework** | **Next.js (App Router)** | Latest stable App Router (`site/app/`). React Server Components (RSC) by default; `'use client'` strictly restricted to interactive leaves. |
| **Package Manager** | **`pnpm` exclusively** | All scripts and builds run via `pnpm` (`pnpm dev`, `pnpm build`, `pnpm check:all`). No npm or yarn in `site/`. |
| **Language** | **JavaScript (`.js`, `.jsx`)** | Strict JS-only convention per agency standard. Zero TypeScript (`.ts`, `.tsx`) or `tsconfig.json`. |
| **Styling** | **Tailwind CSS** | Utility-first CSS using semantic tokens configured in `tailwind.config.js` and `site/app/globals.css`. |
| **Animation Engine** | **GSAP (GreenSock)** | `@gsap/react` (`useGSAP`) and ScrollTrigger. Motion tokens imported from `site/lib/motion.js`. Mandatory `prefers-reduced-motion` compliance. |
| **Icon System** | **Lucide React (`lucide-react`)** | Consistent, tree-shakeable SVG icon set. |
| **Build Output** | **Standalone Container (`standalone`)** | `output: 'standalone'` in `next.config.js` for lightweight Docker and containerized deployment readiness. |

---

## 2. Directory Structure Conventions (`site/`)

All application code is contained strictly within the `site/` workspace directory:

```
site/
├── app/
│   ├── _components/             # Route-specific section components (<=250 lines)
│   ├── projects/
│   │   ├── [slug]/
│   │   │   ├── _components/
│   │   │   └── page.js          # Case study thin page orchestrator (<=80 lines)
│   │   ├── _components/
│   │   └── page.js              # Projects directory page (<=80 lines)
│   ├── about/
│   │   ├── _components/
│   │   └── page.js
│   ├── blog/
│   │   ├── [slug]/
│   │   │   ├── _components/
│   │   │   └── page.js          # CMS article thin page orchestrator (<=80 lines)
│   │   ├── _components/
│   │   └── page.js
│   ├── contact/
│   │   ├── _components/
│   │   └── page.js
│   ├── credits/
│   │   └── page.js              # Asset attribution page
│   ├── api/
│   │   └── revalidate/
│   │       └── route.js         # On-demand ISR revalidation handler
│   ├── AGENTS.md                # Scoped agent rules for routes & pages
│   ├── globals.css              # Tailwind base + semantic theme tokens
│   ├── layout.js                # Root layout (Nav, Footer, Google Fonts, metadataBase)
│   ├── not-found.js             # Custom 404 handler
│   ├── robots.js                # Dynamic robots.txt
│   └── sitemap.js               # Dynamic XML sitemap
├── components/
│   ├── AGENTS.md                # Scoped agent rules for shared UI components
│   ├── motion/                  # Client animation wrapper components
│   ├── Nav.js                   # Shared navigation header (reused across 2+ pages)
│   ├── Footer.js                # Shared site footer (reused across 2+ pages)
│   ├── ResponsiveImage.js       # Pre-optimized responsive picture component
│   └── JsonLd.js                # Structured data script generator
├── lib/
│   ├── AGENTS.md                # Scoped agent rules for utilities
│   ├── cms/
│   │   ├── client.js            # Server-side NWW CMS data fetching & error handling
│   │   └── revalidation.js      # Tag generator & secret verification
│   ├── motion.js                # Exported GSAP & CSS duration/easing tokens
│   └── utils.js                 # Helper utilities (cn class merge, formatting)
├── content/
│   ├── AGENTS.md                # Scoped agent rules for content objects
│   ├── shared/                  # Shared copy (nav.js, footer.js)
│   ├── site-settings.js         # Global metadata & social profile URLs
│   └── <slug>.js                # Verbatim static page copy objects
├── public/
│   └── assets/                  # Optimized WebP images & manifest.json
├── scripts/
│   ├── check-structure.mjs      # File size and colocation validator
│   ├── check-assets.mjs         # Image budget and manifest validator
│   └── make-placeholders.mjs    # Neutral SVG placeholder generator
├── assets-optimize.config.md    # Persisted asset optimizer flags and rationale
├── AGENTS.md                    # Root agent guidelines (<=150 lines)
├── package.json
└── tailwind.config.js
```

---

## 3. Strict File, Line & Architecture Boundaries

To ensure clean modularity and reliable agent maintenance:
1. **Thin Page Server Components (`page.js`):**
   - **Maximum 80 lines.**
   - Pure orchestrator: fetches data, defines metadata, and renders section components sequentially.
2. **Section Components (`_components/*.js`):**
   - **Maximum 250 lines** (hard limit 300).
   - Co-located in route `_components/`.
   - Every section file must open with its section comment identifier: `// section: <id>`.
3. **Flat Shared Components Rule:**
   - Any UI element reused across **2 or more pages** (or global shell elements like `Nav`, `Footer`) lives in flat `site/components/`. No nested `ui/` or `shared/` directories.
4. **Server vs. Client Boundaries:**
   - Default to **React Server Components (RSC)** for all pages, layouts, and static sections.
   - `'use client'` strictly restricted to leaf components needing browser events (`useState`, `onClick`, form submit) or GSAP animation triggers. Never placed on `page.js` or `layout.js`.
5. **Config & Content Files:**
   - Maximum 500 lines. Larger content sets must be modularized into section objects.

---

## 4. CMS Backend Architecture & Security Contract

| Item | Specification | Security Boundary |
|---|---|---|
| **Operational Mode** | `cms` (NWW CMS enabled) | Manages dynamic blog posts and contact inquiries. Case studies live in version-controlled structured content. |
| **API Host** | `SERVER_URL=https://prod-server.nextwebworks.in` | Read from environment variable; never hardcoded in client source. |
| **Authentication** | `CMS_SITE_KEY` | Read-only server-side Bearer token passed via `Authorization: Bearer ${CMS_SITE_KEY}`. Strictly server-side only; never prefixed with `NEXT_PUBLIC_` or exposed to browser. |
| **On-Demand ISR Revalidation** | `POST /api/revalidate` with `REVALIDATE_SECRET` | Webhook triggered on CMS publish/update. Validates secret via constant-time hash comparison; triggers `revalidateTag('cms:blog')`. Fallback interval: 60s during staging, 3600s in production. |
| **Contact Form Endpoint** | `/api/website-contact-us/:id/submit` | Form submits to local Next.js Route Handler or server action, which validates payload and proxies to NWW CMS. Zero recruiter PII exposed publicly. |
| **Initial Seeding** | 3 technical articles seeded in `draft` status | 1. *JSON PDF Generator* <br>2. *MERN ERP Systems* <br>3. *March 2023 to SDE-1 Journey* |

---

## 5. Media Pipeline & Asset Optimization

- **Optimizer Pipeline:** Bundled script `scripts/assets-optimizer/index.js` processes raw images from `assets-source/` into `site/public/assets/` as responsive WebP with manifest generation.
- **Image Component:** `site/components/ResponsiveImage.js` renders native HTML5 `<picture>` / `<img>` with pre-computed `srcset`, `sizes`, and intrinsic aspect ratios (Zero Cumulative Layout Shift: CLS = 0).
- **Strict Byte Budgets:**
  - LCP Hero Image: **<= 100 KB**
  - Section Content Images: **<= 60 KB**
  - SVG Icons & Illustrations: **<= 5 KB**
  - Stock Photo Ceiling: **Maximum 10 images** at launch across the site.
- **Attribution:** Automated generation of photographer / source credits on `/credits`.

---

## 6. Typography & Design System Setup

- **Display & Headings:** High-personality Google Font (e.g. *Plus Jakarta Sans* or *Outfit* via `next/font/google`).
- **Body & Case Studies:** High-readability sans-serif (e.g. *Inter* via `next/font/google`).
- **Code & Tech Specs:** Monospaced font (e.g. *JetBrains Mono* via `next/font/google`).
- **Tailwind Tokens:** Explicit semantic palette tokens (`bg-surface`, `text-primary`, `accent`, etc.) mapped to CSS variables supporting light/dark accessibility.

---

## 7. Verification & Quality Assurance Scripts

The following scripts will be wired into `site/package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "check:structure": "node scripts/check-structure.mjs",
  "check:assets": "node scripts/check-assets.mjs",
  "check:all": "pnpm lint && pnpm check:structure && pnpm check:assets"
}
```

- **`check:structure`**: Asserts thin page components (<=80 lines), section components (<=250 lines), first-line `// section: <id>`, and flat components directory.
- **`check:assets`**: Asserts all referenced assets exist in `public/assets/`, match manifest hashes, and meet byte budget thresholds.
- **`check:all`**: Comprehensive pre-flight gate check requiring clean lint, clean structure, and clean asset checks before build sign-off.

---

## 8. Gate 1 Binding Agreement
Upon explicit approval, this specification becomes the **binding technical contract** for all downstream pipeline stages (Stage 2 Design Theory through Stage 11 Handover).
