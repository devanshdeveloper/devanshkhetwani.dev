# Design Theory & Visual System Specification

**Project:** Devansh Khetwani — Personal Developer Portfolio  
**Target Domain:** `https://devanshkhetwani.dev`  
**Status:** Pending Gate 2 Human Sign-Off  
**Created:** 2026-10-21  

---

## 1. Pattern Recognition Across Live References

All six client-supplied reference websites were retrieved and inspected live. From this audit, four foundational design patterns emerged that directly inform Devansh Khetwani's personal engineering identity:

1. **Precision Hairline Grids & Tactile Containment (Observed in F13 & Tiny Computer):**
   - Rather than relying on heavy box-shadows, blurry cards, or generic glassmorphism, structure is established using crisp `0.5px` to `1px` hairline boundaries (`border-hairline`) and subtle surface elevation (`bg-surface`, `bg-surface-inset`).
   - Projects and modules feel like physical software tools and tactile instruments.

2. **Dual-Type Hierarchy: High-Legibility Sans + Monospaced Technical Precision (Observed in ByMayo, Unfunny Ket & F13):**
   - Pairing a friendly, highly readable contemporary sans-serif for story narrative with an authentic monospace font (`JetBrains Mono`) for metadata, architecture parameters, dates, and technology tags.
   - Communicates that the author is an active software practitioner who values code precision.

3. **Restrained Neutral Canvas with Singular High-Intent Accent (Observed in F13 & Unfunny Ket):**
   - 90% of the canvas consists of balanced neutrals (deep slates, crisp charcoals, and clean whites/off-whites in light/dark modes).
   - A single, energetic accent color is reserved exclusively for primary conversion CTAs, active route states, and key architectural highlights. Accent colors are never used decoratively on generic backgrounds.

4. **Grounded First-Person Engineering Storytelling (Observed in Unfunny Ket):**
   - Direct, authentic narrative connecting self-learning, business applications, and technical growth.
   - Clean, focused reading column (`max-w-3xl`) where case studies and development milestones take center stage without corporate jargon or agency sales pretense.

---

## 2. Design Direction by Dimension

### A. Layout & Structure
- **Container Architecture:** Standard page wrapper capped at `max-w-5xl` for index/directory grids; reading columns for case studies and blog articles strictly confined to `max-w-3xl` (~70–75 characters per line) for optimal reading comfort.
- **Rhythm & Spacing:** Strict 8-point spatial grid (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- **Tactile Grid Accents:** Optional subtle hairline guides on outer margins to anchor page sections without cluttering content.

### B. Color Direction & Palette Options
Devansh requested 2–3 palette directions with exact HEX values for comparison before final selection at Gate 2:

#### Palette Direction 1 (Recommended — "Precision Slate & Signal Amber")
*Inspired by F13 and Tiny Computer: Confident engineering contrast, warm tactile feel, high recruiter readability.*
- **Light Theme:**
  - Background: `#F8F9FA` (Clean off-white canvas)
  - Surface: `#FFFFFF` (Crisp elevated white panels)
  - Surface Inset / Hover: `#F1F3F5`
  - Border Hairline: `#E2E8F0` (Delicate slate border)
  - Text Primary (Ink): `#0F172A` (Deep slate black — Contrast 15.8:1, AAA)
  - Text Muted: `#64748B` (Medium slate — Contrast 4.9:1, AA)
  - Accent (Signal Amber): `#F59E0B` (Vibrant amber for CTAs & highlights)
  - Accent Foreground: `#000000` (Bold contrast on amber)
- **Dark Theme:**
  - Background: `#0B0F17` (Deep slate noir)
  - Surface: `#131B2A` (Elevated dark slate surface)
  - Surface Inset / Hover: `#1E293B`
  - Border Hairline: `#1E293B`
  - Text Primary: `#F8FAFC` (Clean off-white — Contrast 16.2:1, AAA)
  - Text Muted: `#94A3B8` (Muted slate — Contrast 5.2:1, AA)
  - Accent: `#FBBF24` (Luminous warm amber)
  - Accent Foreground: `#000000`

#### Palette Direction 2 ("Graphite & Kinetic Emerald")
*Inspired by Unfunny Ket and ByMayo: Developer-native, minimal, crisp tech-focused.*
- **Light Canvas:** `#F5F5F7` \| Surface: `#FFFFFF` \| Border: `#E5E5E7` \| Text: `#111827` \| Accent: `#059669` (Emerald Green)
- **Dark Canvas:** `#121214` \| Surface: `#1A1A1E` \| Border: `#27272A` \| Text: `#F4F4F5` \| Accent: `#10B981` (Bright Emerald)

#### Palette Direction 3 ("Editorial Monochrome & Electric Cobalt")
*Inspired by New Material: Modern digital studio, high contrast, editorial framing.*
- **Light Canvas:** `#FAFAFA` \| Surface: `#FFFFFF` \| Border: `#E4E4E7` \| Text: `#18181B` \| Accent: `#2563EB` (Cobalt Blue)
- **Dark Canvas:** `#09090B` \| Surface: `#18181B` \| Border: `#27272A` \| Text: `#FAFAFA` \| Accent: `#3B82F6` (Electric Blue)

### C. Typography Direction
Using Google Fonts via `next/font/google`:
- **Display & Headings:** **`Plus Jakarta Sans`** (Geometric, clean, confident; distinct from generic Inter while preserving elite readability).
- **Body & Case Study Prose:** **`Inter`** (Industry-standard editorial clarity for dense engineering narratives, problem-solution breakdowns, and recruiter review).
- **Code, Numbers & Metadata:** **`JetBrains Mono`** (Crisp tabular numerals, technology badges, timeline dates, and code blocks).

### D. Imagery & Visual Assets
- **Personal Wordmark & Monogram:**
  - *Primary Wordmark:* Typographic "Devansh Khetwani" in `Plus Jakarta Sans` Medium with tight letter-spacing (`tracking-tight`) and a subtle accent period or micro-tag.
  - *Secondary Monogram:* Distinctive geometric "DK" mark enclosed in a rounded hairline container, functional at 16px favicon up to 64px header mark.
- **Project Visuals:** Real screenshots framed in clean browser/desktop viewports with subtle `0.5px` hairline borders. Sensitive customer and financial data strictly redacted.
- **Architecture Diagrams:** Hand-crafted semantic SVG flow diagrams illustrating multi-tenant ERP boundaries, client-side Web Worker PDF pagination, and ISR caching pipelines.
- **Icons:** Lucide React with clean `1.5px` stroke weight.

### E. Motion Direction (`subtle-gsap`)
- **Restraint Rule:** Static by design. No continuous background animations, no scroll hijacking, and no gratuitous entrance fades applied uniformly to every element.
- **Micro-Interactions:** Snappy hover elevation (150ms–200ms) on project cards, smooth button active states, and crisp focus rings.
- **Bold Moment:** One memorable interactive moment: an interactive **Architecture Exploration Drawer** or **Interactive Case Study Filter** where selecting a project dynamically highlights its architectural flow.
- **Accessibility:** Strict `@media (prefers-reduced-motion: reduce)` override disabling transform animations and enforcing instant state changes.

### F. Voice & Tone (Binding Copywriting Rules)
1. **Grounded & Verifiable:** State real responsibilities, actual tech stacks, and factual timelines (started March 2023, BCA Aug 2026, MCA expected Sept 2028).
2. **Individual Engineer Perspective:** Always write in first-person ("I architected", "I evaluated", "I learned"). Never pretend to be an agency or corporate sales team.
3. **Problem-Solution Focused:** Every project case study documents the real business context, technical trade-offs, challenges encountered, and solutions engineered.
4. **Banned Clichés:** Zero instances of "rockstar", "ninja", "10x", "tech wizard", "passionate coder", "world-class", "game-changing", "seamless solutions", or unverified claims of "scalable applications".

---

## 3. Design Tokens (Tailwind CSS Mappings)

### A. Color Tokens (Configured for Direction 1 - Slate & Signal Amber)
```css
:root {
  --bg-canvas: #F8F9FA;
  --bg-surface: #FFFFFF;
  --bg-surface-inset: #F1F3F5;
  --border-hairline: #E2E8F0;
  --text-primary: #0F172A;     /* WCAG AAA: 15.8:1 */
  --text-muted: #64748B;       /* WCAG AA: 4.9:1 */
  --text-faint: #94A3B8;       /* Large text / micro-labels: 3.1:1 */
  --accent: #F59E0B;           /* Primary interactive accent */
  --accent-hover: #D97706;
  --accent-fg: #000000;
  --focus-ring: #F59E0B;
}

[data-theme="dark"] {
  --bg-canvas: #0B0F17;
  --bg-surface: #131B2A;
  --bg-surface-inset: #1E293B;
  --border-hairline: #1E293B;
  --text-primary: #F8FAFC;     /* WCAG AAA: 16.2:1 */
  --text-muted: #94A3B8;       /* WCAG AA: 5.2:1 */
  --text-faint: #64748B;
  --accent: #FBBF24;
  --accent-hover: #F59E0B;
  --accent-fg: #000000;
  --focus-ring: #FBBF24;
}
```

### B. Typography Scale & Hierarchy
- **`display`**: `text-4xl sm:text-5xl font-bold tracking-tight leading-tight` (36px / 48px)
- **`h1`**: `text-3xl sm:text-4xl font-semibold tracking-tight leading-tight` (30px / 36px)
- **`h2`**: `text-2xl sm:text-3xl font-semibold tracking-tight leading-snug` (24px / 30px)
- **`h3`**: `text-xl sm:text-2xl font-medium tracking-normal leading-snug` (20px / 24px)
- **`body-large`**: `text-lg leading-relaxed` (18px)
- **`body`**: `text-base leading-relaxed` (16px — minimum on mobile)
- **`caption`**: `text-sm leading-normal text-muted` (14px)
- **`mono`**: `font-mono text-xs sm:text-sm tracking-wide` (12px / 14px)

*Mobile & Accessibility Guarantee:* All body copy >= 16px. All interactive buttons, links, and navigation items satisfy minimum 44×44px tap targets.

### C. Spacing, Radii & Elevation
- **Spacing Steps:** `8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`
- **Border Radii:**
  - Micro tags / pills: `rounded-full` or `rounded-md` (6px)
  - Cards & Viewports: `rounded-xl` (12px)
  - Modals & Drawers: `rounded-2xl` (16px)
- **Shadow Tokens:**
  - Subtle Surface: `0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)`
  - Elevated Card: `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)`

### D. Dual Motion Tokens (`site/lib/motion.js`)

| Token Name | CSS / Tailwind Curve | GSAP Value | Duration | Purpose |
|---|---|---|---|---|
| **`motion.fast`** | `cubic-bezier(0.16, 1, 0.3, 1)` | `"power2.out"` | `0.15s` | Button hover, tap states, icon shifts |
| **`motion.standard`** | `cubic-bezier(0.2, 0, 0, 1)` | `"power3.out"` | `0.3s` | Card reveal, tab toggle, drawer open |
| **`motion.deliberate`**| `cubic-bezier(0.16, 1, 0.3, 1)` | `"power4.out"` | `0.6s` | Case study hero entrance, bold moment |

---

## 4. What to Avoid (Anti-Patterns)

- **NO Purple SaaS Gradients:** Ban uniform purple/indigo gradients common in AI landing page templates.
- **NO Fake Terminal Windows:** Avoid decorative Linux terminal windows with animated typing that serve no engineering purpose.
- **NO Skill Percentage Bars:** Never display arbitrary bars claiming "React: 95%, Python: 85%". Experience is proven via case studies and architecture decisions.
- **NO Scroll Hijacking or Loading Screens:** Native browser scrolling must remain 100% uninterrupted.
- **NO Low-Contrast Gray Copy:** All body copy strictly satisfies WCAG AA (minimum 4.5:1).
- **NO Uniform Entrance Fades:** Avoid stagger fades applied blindly to every paragraph.

---

## 5. Brand Positioning Alignment

| Brand Personality Dimension | Confirmed Score | Visual Manifestation in Design System |
|---|---|---|
| **Minimal ↔ Maximal** | **3 / 5 (Balanced)** | Clean whitespace with rich, detailed case study content and architecture diagrams. |
| **Corporate ↔ Playful** | **4 / 5 (Personal & Creative)** | Warm typography, bespoke wordmark, authentic first-person storytelling, engaging micro-interactions. |
| **Luxury ↔ Accessible** | **4 / 5 (Accessible & Grounded)** | High-contrast typography, generous line-heights, honest self-taught journey narrative, zero elitist jargon. |
| **Modern ↔ Classic** | **4 / 5 (Modern with Editorial Polish)** | Precision hairline grid layout, clean Grotesk headings, structured case study reading columns. |

---

## 6. Reference Summary & Inspiration Audit

| Website URL | What Client Liked | Key Observed Elements | Carried Into Devansh's Design Direction |
|---|---|---|---|
| [`https://bymayo.co.uk/`](https://bymayo.co.uk/) | Clean typography, dark/light balance | `PP Neue Montreal` + `IBM Plex Mono`, soft `#161819` and `#d6d8d0` tones | Adopted dual sans/mono pairing and balanced dark/light surface elevations. |
| [`https://unfunnyket.com/`](https://unfunnyket.com/) | Authentic tone, focused reading | `max-w-[620px]` column, hairline grid lines, grounded narrative, project dates | Adopted focused reading column, hairline framing, and authentic project timeline structure. |
| [`https://tinycomputer.co/`](https://tinycomputer.co/) | Tactile software feel, clean catalog | Baseline grid, macOS window chrome, panel ring shadows, concise tagline | Adopted tactile card frames for software projects (ERP & PDF generator). |
| [`https://www.f13.com/`](https://www.f13.com/) | Precision graphics, sharp accent | Hairline borders (`0.5px`), modular pill nav, signal amber accent (`#ffcf22`), clean SVG schematics | Adopted hairline border precision, vibrant CTA accent color, and schematic diagram standards. |
| [`https://yevtam.com/`](https://yevtam.com/) | Smooth GSAP interactions, theme switch | MorphSVG transitions, clean theme switcher, dual avatar light/dark | Adopted GSAP token structure, smooth theme toggle, and dual portrait handling. |
| [`https://newmaterial.ai/`](https://newmaterial.ai/) | High-fidelity cards, image treatment | Responsive picture elements, smooth view transitions, tactile hover | Adopted zero-CLS responsive image standards and clean card hover depth. |

---

## 7. Open Gate 2 Decisions

1. **Palette Selection:** Confirm **Direction 1 (Precision Slate & Signal Amber)** as the active palette, or select **Direction 2 (Kinetic Emerald)** or **Direction 3 (Electric Cobalt)**.
2. **Typography Pairing:** Confirm **`Plus Jakarta Sans`** (Headings) + **`Inter`** (Body) + **`JetBrains Mono`** (Code & Metadata).
3. **Brand Mark:** Confirm typographic wordmark "Devansh Khetwani" + secondary rounded monogram "DK".
