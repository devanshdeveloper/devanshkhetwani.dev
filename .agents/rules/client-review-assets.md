---
trigger: glob
globs:
  - "project-docs/client-review/**/*.{html,css,png,webp}"
description: "Guidelines and verification requirements for client review HTML pages and visual proof assets."
---

# Client Review Deliverables & Assets (`project-docs/client-review`)

## 1. Asset & Delivery Scope
- `project-docs/client-review/` hosts static HTML deliverables presented to the client during milestone review gates.
- Output is deployed automatically to GitHub Pages via `.github/workflows/deploy-pages.yml` on push to `main`.
- Deliverables include:
  - `index.html`: Review hub portal.
  - `gate-2-design-theory/`: Design direction review pages.
  - `credits.html`: Typography and media attribution.
  - Responsive proofs: `proof-desktop.png` (1440px viewport) and `proof-mobile.png` (390px viewport).

## 2. Design & Accessibility Standards
- **Typography**: All web fonts must be self-hosted in `assets/fonts/` (no third-party runtime render-blocking Google Font requests).
- **Color Contrast**: Must strictly meet or exceed WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text).
- **Visual Proofs**: Any layout or style adjustment requires regenerating high-fidelity viewport proof screenshots.
- **Attribution**: All photography, fonts, and third-party references must be credited in `credits.html`.
