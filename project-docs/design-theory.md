# Design theory — reference-led Gate 2 revision

**Project:** Devansh Khetwani, personal developer portfolio  
**Date:** 2026-10-21  
**Status:** Awaiting client choice; no palette approved.  
**Review:** `client-review/gate-2-design-theory/index.html`  
**Authority:** Approved intake and tech stack, followed by the user's request for fresh concepts and correction that the previous designs did not match the references.

## 1. Pattern recognition

The earlier proposals used wide hero layouts and large display typography. The reference-led revision instead adopts the references' actual content widths, personal introductions, restrained hierarchy, and compact project presentation.

All six live landing pages were recaptured on 2026-10-21. The capture helper now scrolls slowly and records middle and bottom viewport screenshots in addition to the full-page image. Files are in `design-references/<domain>/`.

- ByMayo: a compact centered profile, approximately 500px reading column, mixed type in a modest opening, a full-width grid-backed software shelf, and quiet links.
- Unfunny Ket: a narrow narrative, a small personal identity, marginal links, understated project and experience entries, and dates.
- Tiny Computer: a serif opening, spacious software presentation, and concise monospaced writing entries. The fresh middle viewport now provides evidence for the writing list even though the full-page capture still hides animated content below the opening.
- Yev Tam: a centered personal introduction, generous surrounding space, compact top controls, and a tactile navigation dock.
- F13: precise linework, information graphics, and restrained structure. The refreshed capture reveals additional graphics after slower scrolling.
- New Material: selective depth and spacing around grouped content. Viewport evidence is used where full-page capture does not faithfully represent scroll-dependent sections.

Captured third-party material is internal reference evidence only. All portfolio text, icons, and the DK mark are original. Motion cannot be fully assessed from screenshots, and capture success alone is not treated as proof of visual completeness.

## 2. Design direction by dimension

| Candidate | Reference anchor | Concrete layout translation |
|---|---|---|
| **Maker’s Desk** | ByMayo, supported by Tiny Computer | 560px centered profile; a 36px sans / 42px serif opening; a grid-backed, two-group product shelf; 16px project entries and a compact chronology. |
| **Engineering Notes** | Unfunny Ket | 580px reading column within 620px guide rails; a 24px narrative H1; small identity artwork; marginal social links; project entries with dates and minimal enclosure. |
| **Personal Canvas** | Yev Tam, with New Material / F13 restraint | A centered introduction spanning the first viewport, a 94px original identity seal, a 52px headline, a functional icon dock, then a 760px work-and-journey section. |

**Layout:** Each concept has its own reading pace and composition. Mobile gutters are 20px, guide rails and marginalia disappear on narrow screens, and the dock stays within a 320px viewport. No fixed navigation obscures content.

**Typography:** DM Sans carries headings and body copy. Maker’s Desk contrasts its opening with Instrument Serif. IBM Plex Mono is limited to small dates and technical metadata. Fonts are locally hosted for offline review; Stage 9 can use the same Google Font families through `next/font/google`.

**Imagery and identity:** The wordmark uses Devansh's full name. An original outlined DK is the secondary identity. App-like icons represent invoices, education, documents, writing, contact, and a personal profile. They are symbols, not screenshots or official product logos. No fictional portrait or dashboard is used. A real portrait can replace the identity seal when supplied.

**Content sequence:** Introduction → selected work → experience/education → writing drafts → direct email. Maker’s Desk introduces project categories through its shelf; Engineering Notes puts most emphasis on continuous reading; Personal Canvas uses the dock to navigate to fully visible sections below.

**Motion:** Content is visible immediately. Only the Maker’s Desk shelf and Personal Canvas dock respond to hover with a small transform; the project notes use native disclosures. Reduced-motion preferences disable transitions and smooth scrolling. No global entrance animation or artificial loading state.

**Voice:** Individual, factual, and plain. Production claims are limited to one Next Web Business customer account with 50+ sub-users. Next Web Campus remains in development with zero production institutions. Writing remains draft. The final case-study narrative and copy require Gate 6 review.

## 3. Design tokens

Semantic CSS keys are `bg`, `surface`, `soft`, `text`, `muted`, `accent`, `onAccent`, and `line`. The complete proposals follow. Decorative lines do not convey essential information; focus rings use the accent color.

### Maker’s Desk

| Token | Light | Dark |
|---|---|---|
| `bg` | #DADDD5 | #20251F |
| `surface` | #E7E9E2 | #2A3228 |
| `soft` | #E0E4DA | #313B2E |
| `text` | #272C28 | #EFF1E8 |
| `muted` | #555D54 | #BBC2B6 |
| `accent` | #843C25 | #E3A47E |
| `onAccent` | #FFFFFF | #302117 |
| `line` | #BBC2B6 | #4D5B46 |

### Engineering Notes

| Token | Light | Dark |
|---|---|---|
| `bg` | #F6F6F8 | #1D2027 |
| `surface` | #FFFFFF | #272B34 |
| `soft` | #E8EAF0 | #303641 |
| `text` | #26282E | #E8EBF2 |
| `muted` | #626570 | #B9C0CF |
| `accent` | #883659 | #EBA5C4 |
| `onAccent` | #FFFFFF | #351D29 |
| `line` | #DFE1E8 | #454D5C |

### Personal Canvas

| Token | Light | Dark |
|---|---|---|
| `bg` | #F4F5F2 | #172823 |
| `surface` | #FFFFFF | #223A32 |
| `soft` | #E4E9E2 | #2C453A |
| `text` | #28302C | #EBF1E8 |
| `muted` | #5B655F | #B8CABC |
| `accent` | #1B6657 | #A7D5C1 |
| `onAccent` | #FFFFFF | #1B322A |
| `line` | #CCD4CC | #4C695A |

### Type, spacing, and shape

| Role | Desktop | Mobile |
|---|---|---|
| Maker’s Desk H1 | 36px DM Sans / 42px Instrument Serif | 24–27px / 30–34px |
| Engineering Notes H1 | 24px, 1.55 line height | 22px |
| Personal Canvas H1 | 52px, 1.08 line height | 34–46px fluid |
| Section heading | 13px quiet label, or 20–25px heading | Same hierarchy |
| Project title | 16–20px | 16–18px |
| Body | 16px, 1.65 line height | 16px |
| Opening paragraph | 22px where used | 20px |
| Secondary intro | 15–16px in this prototype | 15–16px; raise body-like text to 16px before production |
| Caption / date | 11–13px | 11–13px |

Spatial rhythm: 8, 16, 24, 32, 40, 48, and 64px, with optical 4px half-steps. Reading widths are 560px, 580px, and 760px by concept. Avoid expanding all pages to a generic 1200px content grid.

Panel radii are purposeful: 19px icon tiles, 28–42px category enclosures, 24px dock, 8px text fields. Paper/identity details use thin borders. Shadows appear only on tactile icons and the dock: inset highlight plus a small `0 3px 5px #00000012` shadow, or `0 12px 28px #0000000c` for the dock.

Future asset ratios: project images 4:3 where appropriate, portrait 4:5, blog cover 16:9. Preserve real UI screenshot aspect ratios instead of hiding important details through forced crops. Production icons may use Lucide at 1.5px stroke; the concept icons are original SVGs with explicit accessible link labels.

### Contrast and interaction

`client-review/gate-2-design-theory/_checks/contrast.json` records 60 token pairings across three concepts and both themes: main, muted, and accent text on canvas/surface/soft, plus action text on accent. All exceed 4.5:1. Native buttons, disclosure controls, and dock links use at least 44px target height. The automated accessibility results are in `_checks/qa.json`.

### Dual motion tokens

| Token | CSS curve | GSAP value | Duration | Use |
|---|---|---|---|---|
| `motion-fast` | `--ease-fast: cubic-bezier(0.215,0.61,0.355,1)` | `power2.out` | 0.18s | Shelf hover response |
| `motion-standard` | `--ease-standard: cubic-bezier(0.165,0.84,0.44,1)` | `power3.out` | 0.20s | Dock hover response |
| `motion-deliberate` | `--ease-deliberate: cubic-bezier(0.23,1,0.32,1)` | `power4.out` | 0.40s | Reserved for one approved interaction, not used in this preview |

CSS curves approximate the GSAP eases perceptually. Duration variables are `--duration-fast:180ms`, `--duration-standard:200ms`, and `--duration-deliberate:400ms`. Reduced-motion duration is zero. Export the selected tokens to `site/lib/motion.js` at Stage 9. This static review does not load GSAP.

## 4. What to avoid

- Large generic portfolio headlines, broad hero-and-card compositions, and oversized contact sections that change the reference character.
- Treating color selection as a substitute for matching proportions, density, and navigation behavior.
- Reusing third-party graphics, portrait imagery, text, source code, or brand marks.
- Fake terminals, invented skill percentages, scroll hijacking, repeated entrance animations, and heavy WebGL scenes.
- Fabricated architecture, customer metrics, screenshots, testimonials, or experience duration. Self-learning began in March 2023.
- Presenting a draft article as published or offering an unavailable resume download.

## 5. Brand positioning

The approved scale remains balanced (3/5 minimal–maximal), personal and creative (4/5 corporate–playful), accessible (4/5 toward accessible), and modern (4/5 modern–classic). Curiosity appears in the work and learning narrative, inventiveness in original icon and identity details, and groundedness in restrained type and truthful project status.

The choices are deliberately personal portfolios rather than agency presentations. Next Web Works appears as freelance experience.

## 6. Open decisions and delivery

- Select Maker’s Desk, Engineering Notes, or Personal Canvas, or request a revision. Palette, typography, and identity treatment are included in the selection.
- No Gate 2 approval has been inferred. Stage 3 has not begun.
- Portrait, real project screenshots, Next Web Agency release status, detailed case-study evidence, and final resume remain later inputs. Their absence does not require fabricated assets for visual review.
- Preview and verification helpers now live in `.agents/skills/create-nww-website/scripts/client-review/`. Project-specific HTML/CSS stays in `project-docs/client-review/`. Supplementary Gate 2 plans and reports live in `gate-2-design-theory/_checks/`.
- The user requested removal of the obsolete `project-docs/review-tools` folder. Automatic command review rejected both the guarded and the literal recursive removal with “blocked by policy”; that folder remains and is no longer used.
- Local preview only. No publishing, CMS changes, or new email notification in this revision.
- Browser verification covers 320, 390, 768, 1024, and 1440px; light/dark scans on desktop and mobile; keyboard disclosure operation; offline file loading without JavaScript; theme persistence; clipboard fallback; local links; and asset errors. Automated WCAG A/AA scans report no violations. This is a prototype check, not a full production accessibility audit.

## 7. Reference summary

| Reference | Evidence used | Adopted qualities |
|---|---|---|
| https://bymayo.co.uk/ | Fresh full-page capture | Compact profile, mixed heading typography, restrained software shelf, whitespace. |
| https://unfunnyket.com/ | Fresh full-page capture | Narrative introduction, narrow reading column, dated experience, marginal links. |
| https://tinycomputer.co/ | Opening and fresh middle/bottom viewport captures | Editorial type and concise writing list. Full-page image alone remains incomplete. |
| https://www.f13.com/ | Fresh full-page and viewport captures | Restrained lines, clear information grouping, original symbolic graphics. |
| https://yevtam.com/ | Fresh single-viewport capture | Centered personal introduction, compact controls, tactile dock. |
| https://newmaterial.ai/ | Fresh full-page and viewport captures | Selective depth and generous grouping, without reusing image assets. |

Raw evidence and capture metadata remain in `project-docs/design-references/`. The client-facing review uses original visuals only.

