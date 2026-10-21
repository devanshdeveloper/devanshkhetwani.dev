# Design Reference Sources & Capture Audit

> **Usage Notice:** All third-party HTML, text, and screenshots saved in this directory are external reference material collected solely for internal design analysis and benchmarking. Their text, markup, code, and images must never be reused, copied, or incorporated into the client's website.

**Recorded Date:** 2026-10-21  
**Project:** Devansh Khetwani — Personal Developer Portfolio  
**Purpose:** Internal design discussion, visual benchmarking, and client visual review package.  
**Scope:** Landing Pages Only (`project-docs/design-references/<domain>/`)  

---

## 1. Landing-Page Capture Inventory

| Domain | Site Name | Source URL | Captured Files | Viewport | Status & Notes |
|---|---|---|---|---|---|
| `bymayo.co.uk` | By Mayo | `https://bymayo.co.uk/?ref=onepagelove` | `page.html` (59.2 KB)<br>`content.md` (0.7 KB)<br>`screenshot-full-1440.png` (125.4 KB)<br>`capture.json` (0.8 KB) | 1440 × 1223 px | **Complete & Verified**: Clean typography, apps feed, soft dark/light contrast. `?ref=onepagelove` stripped. |
| `unfunnyket.com` | Unfunny Ket | `https://unfunnyket.com/` | `page.html` (34.7 KB)<br>`content.md` (2.5 KB)<br>`screenshot-full-1440.png` (232.3 KB)<br>`capture.json` (0.7 KB) | 1440 × 1597 px | **Complete & Verified**: Focused reading column, hairline timeline grid, authentic narrative. |
| `tinycomputer.co` | Tiny Computer | `https://tinycomputer.co/?ref=onepagelove` | `page.html` (830.0 KB)<br>`content.md` (1.6 KB)<br>`screenshot-full-1440.png` (113.7 KB)<br>`capture.json` (0.8 KB) | 1440 × 3367 px | **Complete & Verified**: Minimal software studio canvas, baseline typography, Boardwalk preview window. |
| `f13.com` | F13 | `https://www.f13.com/?ref=onepagelove` | `page.html` (333.6 KB)<br>`content.md` (6.4 KB)<br>`screenshot-full-1440.png` (293.3 KB)<br>`capture.json` (0.7 KB) | 1440 × 3603 px | **Complete & Verified**: Hairline borders (`0.5px`), pill navigation, signal amber accents (`#ffcf22`), and SVG schematics. |
| `yevtam.com` | Yev Tam | `https://yevtam.com/?ref=onepagelove` | `page.html` (111.0 KB)<br>`content.md` (12.3 KB)<br>`screenshot-full-1440.png` (202.2 KB)<br>`capture.json` (0.7 KB) | 1440 × 900 px | **Complete & Verified**: Single-viewport layout, centered avatar portrait, dock navigation. |
| `newmaterial.ai` | New Material | `https://newmaterial.ai/?ref=onepagelove` | `page.html` (392.2 KB)<br>`content.md` (7.4 KB)<br>`screenshot-full-1440.png` (676.0 KB)<br>`capture.json` (0.7 KB) | 1440 × 3187 px | **Complete & Verified**: High-fidelity floating cards, responsive team grid, and contact section. |

---

## 2. Capture Environment & Compliance

- **Engine:** Playwright / Chromium (Google Chrome channel)
- **Viewport Config:** 1440px desktop width with full-page scroll capture
- **Render Mode:** Rendered DOM post-hydration saved verbatim to `page.html`
- **Markdown Mode:** Verbatim stripped text preserving headings and links, excluding scripts/styles/SVGs/tracking
- **Integrity:** Zero faked or fabricated content; zero external assets mirrored
- **Storage Scope:** Confined to `project-docs/design-references/` in project repository; never stored in skills catalog
