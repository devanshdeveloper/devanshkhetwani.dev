# Client Discovery Answers & Site Brief

**Project Name:** Devansh Khetwani — Personal Developer Portfolio  
**Recorded Date:** 2026-10-21  
**Status:** Approved at Gate 0 (2026-10-21)  
**CMS Mode:** cms (NWW CMS enabled)  

## 1. Project Identity & Scope
- **Business Offering:** Personal developer portfolio for Devansh Khetwani, full-stack developer and MCA student with experience developing ERP systems, business applications, websites, and browser-based tools using React, Next.js, TypeScript, Node.js, and MongoDB.
- **Target Audience:**
  - *Primary:* Technical recruiters, engineering hiring managers, and software engineering teams evaluating SDE-1 candidates.
  - *Secondary:* Developers, technical collaborators, and potential freelance clients.
- **Primary Conversion Action:**
  - *Primary CTA:* View My Work (project deep-dives and engineering experience)
  - *Secondary CTA:* Contact Me (straightforward recruiter inquiries)
- **Website Type:** 4: Portfolio (Personal engineering portfolio showcasing projects, technical decisions, professional experience, education, technical writing, and development journey).
- **Build Origin:** migration (Redesign and content migration from existing site: https://devansh.nextwebworks.in). Preserve accurate project/personal data, position as individual software engineer, present Next Web Works as freelance experience, keep production apps unaffected, zero fabricated stats.
- **Target Launch Date:** Flexible / Target within 4 weeks (Prioritizing content accuracy, CMS functionality, accessibility, performance, and deployment readiness).

## 2. Branding & Design Direction
- **Brand Assets (Q8):** `none-create` — Create an original typographic wordmark using "Devansh Khetwani". Explore a distinctive "DK" monogram as a secondary mark. Avoid generic code brackets, terminal symbols, or developer clichés. Support light and dark backgrounds. Prioritize typography over elaborate artwork.
- **Color Palette (Q9):** `curate-for-me` — Develop a cohesive, distinctive color system informed by the six references. Avoid predictable developer combos. Confident contrast, expressive accents, neutral foundations. High accessibility/contrast in light/dark. Present 2–3 palette directions with exact HEX values in Stage 2 before finalizing.
- **Typography (Q10):** `google-fonts` — High-quality, commercially usable Google Fonts. Distinctive display typography for personality + highly readable sans-serif for project descriptions/case studies + monospace for tech stack and micro-labels. Explore pairings beyond standard Inter/Geist.
- **Brand Scale (Q11):**
  - Minimal ↔ Maximal: 3/5 (Balanced, selective expressive moments)
  - Corporate ↔ Playful: 4/5 (Personal, creative, confident, professional)
  - Luxury ↔ Accessible: 4/5 toward accessible (Approachable, authentic, grounded)
  - Modern ↔ Classic: 4/5 toward modern (Contemporary with selective editorial influence)
  - *Brand Adjectives:* Curious, inventive, grounded.
  - *Voice Boundary:* Never sounds like an exaggerated agency sales pitch or self-proclaimed expert.
- **Liked References (Q12):**
  1. By Mayo: https://bymayo.co.uk/?ref=onepagelove
  2. Unfunny Ket: https://unfunnyket.com/
  3. Tiny Computer: https://tinycomputer.co/?ref=onepagelove
  4. F13: https://www.f13.com/?ref=onepagelove
  5. Yev Tam: https://yevtam.com/?ref=onepagelove
  6. New Material: https://newmaterial.ai/?ref=onepagelove
  *Creative Directive:* Inspect and analyze all 6 live references before proposing visual direction; identify what works specifically for SDE-1 positioning and build an original identity.
- **Disliked References / Anti-Patterns (Q13):** Zero generic developer templates, purple SaaS gradients, excessive glassmorphism, fake terminal widgets, skill percentage bars, slow 3D/WebGL canvas, scroll hijacking, artificial loading screens, excessive entrance animations, generic stock illustrations, carousels that hide projects, unreadable typography, or fabricated metrics.
- **Motion Preference (Q14):** `subtle-gsap` with selective expressive interactions — Fast, polished micro-interactions, thoughtful typography and hover transitions, max 1 memorable interactive/animated moment. Strict `prefers-reduced-motion` compliance. Core content accessible without JavaScript.
- **Overall Creative Direction:** Balance personality (self-taught developer since March 2023, international client), engineering credibility (ERP systems, production business software, browser-based JSON-configurable PDF generator), and career ambition (SDE-1 candidate). A personal, technically credible space.

## 3. Sitemap & Content Architecture
- **Core Pages (Q15):**
  1. `Home` (`/`): Introduce Devansh Khetwani as a full-stack developer pursuing SDE-1 roles; engineering overview, selected projects, journey snapshot, primary CTA to work.
  2. `Projects` (`/projects`): Directory of real-world engineering work (ERP systems, business apps, browser tools, client projects) with dedicated case study routes (`/projects/[slug]`).
  3. `About` (`/about`): Factual developer journey (started March 2023), education (BCA completed Aug 2026, MCA started Sept 2026), freelance background (Next Web Works), internship at Brihat Infotech (Oct 2024–Jan 2025).
  4. `Writing / Blog` (`/blog`): Technical articles, system architecture breakdowns, implementation decisions, and learnings; powered by NWW CMS with dedicated article routes (`/blog/[slug]`).
  5. `Contact` (`/contact`): Direct contact info + CMS-backed inquiry form for recruiters, hiring managers, and collaborators.
  6. `Credits` (`/credits`): Mandatory attribution for any third-party assets, licenses, or fonts.
  - *Out of Scope:* No agency service packages, pricing tables, or sales funnels.
- **Key Page Sections & Features (Q16):**
  - *Engineering Case Studies:* Problem context, target users/business constraints, personal responsibilities, tech stack, architecture & implementation decisions, challenges & solutions, status (distinguish production vs in-development), evidence-based metrics, screenshots/diagrams/code samples.
  - *Priority Projects:*
    1. Next Web Business (formerly Billdesk) — 1 production customer account with 50+ sub-users.
    2. Next Web Campus (formerly EduManage) — in development, 0 production institutions.
    3. Next Web Agency.
    4. Browser-based JSON-configurable PDF generator — private repo, milestone Dec 2025.
    5. Brihat Infotech internship work — subject to NDA/confidentiality.
    6. Verified projects from existing portfolio.
  - *Accurate Journey Timeline:*
    - March 2023: Began self-learning (Python -> JS, React, Next.js)
    - May 2023: Built first Next.js portfolio
    - Sept 2023: Began serious focused development
    - Nov 2023: First international client (NDA-protected) & founded Next Web Works
    - Oct 2024–Jan 2025: Full-stack developer internship at Brihat Infotech
    - May 2025: Started Next Web Campus
    - Nov 2025: Started Next Web Business
    - Dec 2025: Reported milestone for browser-based PDF generator
    - Aug 2026: Completed BCA
    - Sept 2026: Began MCA (expected completion Sept 2028)
    - *Constraint:* NEVER claim "five years of experience".
  - *Technical Capabilities:* Categorized without arbitrary skill percentage bars or proficiency meters.
  - *Technical Writing Features:* Syntax-highlighted code blocks, responsive layouts, categories/tags, and SEO metadata via NWW CMS.
  - *Resume:* Reserved action; no fake or non-functional download button until final document is supplied.
- **Copywriting Strategy (Q17):** `hybrid` — Factual base from existing portfolio (`devansh.nextwebworks.in`), confirmed journey facts, and questionnaire responses. Agency will draft complete, verbatim, recruiter-focused portfolio copy. *Approval Gate:* Narrative positioning proposal will be submitted and approved before finalizing production copy.
- **Voice & Tone (Q18):** Curious, inventive, grounded. Clear, conversational, confident without exaggeration, technically credible, personal, authentic. Sounds like an individual engineer explaining real work, not a sales agency.
  - *Banned Buzzwords:* "rockstar", "ninja", "10x developer", "tech wizard", "passionate coder", "tech enthusiast", "world-class developer", "cutting-edge solutions", "game-changing technology", "seamless digital experiences", "innovative solutions", "proven expert", ungrounded claims of "scalable applications".
- **Navigation & Social Structure (Q19):**
  - Primary Identity: Devansh Khetwani (personal, not agency)
  - GitHub: https://github.com/devanshdeveloper
  - LinkedIn: https://www.linkedin.com/in/devansh-khetwani
  - Email: devanshkhetwani@gmail.com
  - Resume: Reserved link/action (enabled only when document is finalized)
  - No personal phone numbers displayed by default.
- **Form Endpoints (Q20):** `contact` — Recruiter / general inquiry form submitting to NWW CMS (`/api/website-contact-us/:id/submit`). Fields: Full Name (req), Email (req), Inquiry Type (req: `Job Opportunity`, `Collaboration`, `General Inquiry`), Organization (opt), Message (req). Clear validation, loading/success states, spam prevention. No popups or newsletter gates.

## 4. Imagery & Stock Photography Decisions
- **Primary Source (Q21):** `hybrid` — Prioritize authentic material from development journey and real engineering projects.
  - *Primary Assets:* Personal portrait photo, real UI/dashboard screenshots (ERP systems, business software, browser-based tools), architecture diagrams, code snippets, milestone screenshots.
  - *Secondary Assets:* Selective editorial photography for technical blog covers, abstract geometric/technical CSS/SVG accents, conceptual illustrations.
  - *Asset Hygiene & Security:* Zero fictional ERP dashboards presented as real; zero random programming stock photos representing Devansh's work; intentional styled placeholders until real assets provided; redact all customer data, API keys, credentials, and private info.
- **Rights & Releases Confirmed (Q22):** `yes` (personal assets) — Confirmed for personal portrait, self-owned project screenshots, diagrams, and code samples.
  - *Confidentiality Boundaries:* Zero client screenshots without explicit permission; zero disclosure of Brihat Infotech confidential info; zero private repository code without approval. Uncertain assets remain strictly excluded.
- **Stock Photography Authorized (Q23):** `yes` (limited authorization) — Authorized strictly for conceptual blog covers, article editorial imagery, and subtle background accents. Banned: generic developers typing on laptops, fake teams, stock representing real projects, random AI art. Prefer original CSS/SVG visuals where suitable.
- **Stock Attribution Acknowledged (Q24):** `yes` — Full attribution recorded and presented on the `/credits` page (creator name, source URL, license type, provider, usage restrictions).
- **Stock Provider & Hosting Approved (Q25):** `yes` — Approved providers: Unsplash, Pexels, Pixabay. Locally hosted images downloaded and optimized to WebP via optimizer pipeline (Unsplash hotlinked per API guidelines). Responsive srcset, CLS = 0, descriptive alt text, lazy-loading.
- **Stock Image Count Ceiling (Q26):** `10` — Strict ceiling of at most 10 stock images across the entire site at launch. Prefer fewer if authentic project visuals and code/diagrams suffice.
- **Downloadable Assets (Q27):** `none` — No finalized downloadable files at launch. Resume is actively being finalized; no dummy/empty download buttons or fake whitepapers. Direct PDF download will be activated once final file is supplied.
- **Case Study & Diagram Standards:** Real functionality demonstrated (Next Web Business GST/invoicing, Next Web Campus modules, Next Web Agency CRM, PDF generator output; zero customer data). Architecture diagrams reflect actual implementations only. Strict zero CLS and reduced-motion compliance.

## 5. SEO, Analytics & Compliance
- **Primary Keywords (Q28):**
  - *Primary (Personal Branding):* "Devansh Khetwani", "Devansh Khetwani developer", "Devansh Khetwani portfolio", "Devansh Khetwani full stack developer", "Devansh Khetwani software engineer".
  - *Secondary (Technical & Regional):* "Next.js TypeScript developer India", "MERN stack developer portfolio", "ERP developer portfolio", "Browser-based PDF generator JavaScript", "Full stack developer Indore".
  - *Technical SEO Standards:* Unique page titles & meta descriptions, canonical URLs, XML sitemap (`/sitemap.xml`), robots.txt, OpenGraph & Twitter cards, JSON-LD structured data (`Person`, `WebSite`, `BreadcrumbList`, `BlogPosting`), clean URLs, 301 redirect map for legacy URLs from `devansh.nextwebworks.in`. Zero keyword stuffing or artificial geo-pages.
- **Geographic Focus & Hiring Availability (Q29):** `global-online` with India as primary recruitment market.
  - *Location:* Indore, Madhya Pradesh, India.
  - *Target Roles:* SDE-1, Junior Software Engineer, Full-Stack Engineer, Frontend/Backend roles. Remote within India, on-site/hybrid in Indian tech hubs.
  - *International:* Remote opportunities where hiring eligibility, timezone, and arrangements are compatible (no false claims of universal work authorization).
- **Search Benchmarks / Competitors (Q30):** `none` for specific SEO competitors. 6 design references are visual/experience benchmarks. Independent engineering portfolio benchmarks evaluated for structured data, semantic markup, and clean case study indexing.
- **Production Domain (Q31):** `https://devanshkhetwani.dev` (working primary domain).
  - *Migration Source:* `https://devansh.nextwebworks.in`.
  - *Domain Standards:* Strict HTTPS, single canonical hostname, redirect non-canonical variants, preserve indexed paths with 301 redirects where possible.
  - *Boundary:* Zero interference with active production apps hosted under `nextwebworks.in` (including `webapp.nextwebworks.in`). No DNS changes until fully tested and approved.
- **Analytics & Tracking (Q32):** `ga4` — Google Analytics 4 initialized via environment variable `NEXT_PUBLIC_GA_ID`.
  - *Tracking Scope:* Total page visits, top project case study engagement, traffic sources, primary CTA interactions, outbound GitHub/LinkedIn clicks, form submission success.
  - *Privacy & Performance:* Never send form text/emails to analytics; non-blocking async script; privacy-conscious consent compliance.
- **Legal Entity Details (Q33):** `personal-standard` — Operator identified as "Devansh Khetwani — Individual Software Engineer, India". Concise Privacy Policy covering contact form data collection, NWW CMS processing, analytics cookies, retention/deletion, privacy contact, and accurate `/credits` attribution.
- **Languages (Q34):** `en-US` — Single language throughout. Clear, natural first-person English, consistent technical terminology. Zero artificial localization.
- **Overall SEO Objective:** Establish Devansh Khetwani as a discoverable SDE-1 software engineering candidate with proven full-stack and ERP experience. Primary goal: recruiter & hiring manager evaluation, not agency lead-gen.

## 6. CMS Architecture & Credentials (CMS Mode)
- **CMS Target Instance (Q35):** Base API Host configured via environment variable `SERVER_URL=https://prod-server.nextwebworks.in`. Never hardcoded in client source. Observed endpoint structure: `GET /api/blog/paginate`. The build must verify schema, authentication rules, filtering, pagination, and publication behavior before consuming.
- **CMS Site Key Env Var (Q36):** `confirmed` — Read-only server-side token stored under environment variable `CMS_SITE_KEY`. Strictly server-side only; never exposed via `NEXT_PUBLIC_`, never committed to git, never sent to browser client. The previously inspected dashboard Bearer token is scheduled for rotation/revocation.
- **Revalidate Secret Env Var (Q37):** `confirmed` — On-demand ISR revalidation secret configured under environment variable `REVALIDATE_SECRET`. Authenticates CMS webhook requests to `/api/revalidate` with constant-time hash verification. If webhook is unavailable, fallback to time-based cache refresh.
- **Initial Blog Seeding (Q38):** `3` original technical articles prepared for CMS draft seeding:
  1. *Building a JSON-Configurable PDF Generator in the Browser:* Motivation, client-side PDF generation (`html2canvas`, `jsPDF`), JSON template schema, page-level configuration, pagination algorithms, multi-page rendering, Web Workers for large documents, and engineering takeaways.
  2. *Lessons From Building ERP Applications With MERN:* Education & business ERP architecture, role-based access control (RBAC), MongoDB schema design, inventory & invoicing workflows, S3 asset handling, dev vs production systems, and architectural trade-offs (Next Web Campus vs Business vs Agency).
  3. *From Self-Learning to Real-World Software Engineering:* Starting March 2023 with Python, progression to JS/React/Next.js, first portfolio in May 2023, international client in Nov 2023, founding Next Web Works, Brihat Infotech internship, BCA graduation, MCA enrollment, and SDE-1 career goals. (Strict boundary: zero claims of 5 years experience).
- **Seed Post Publication State (Q39):** `draft` — All 3 initial articles will be seeded in `draft` status so they remain private until Devansh explicitly reviews and publishes them. Prevents unverified claims from going live. Idempotent seeding to avoid duplicate records.
- **Form Submission Alerts (Q40):** `acknowledged` — Recruiter contact notifications are managed inside the NWW CMS dashboard. Submissions hit `/api/website-contact-us/:id/submit` server-side, with full validation and zero exposure of recruiter contact data.

## 7. Governance, Migration & Launch Constraints
- **Migration Inventory & Current Platform (Q41):** `migration` — Controlled content migration and complete portfolio rebuild.
  - *Legacy Portfolio:* `https://devansh.nextwebworks.in` (keep live and unchanged until replacement is fully tested and approved).
  - *New Portfolio:* `https://devanshkhetwani.dev`.
  - *Discovery Protocol:* Crawl/inventory all publicly accessible legacy pages, projects, case studies, images, links, metadata; inspect legacy repo if available.
  - *Reconciliation:* Reconcile all historical facts with this brief. Correct inaccurate project names, outdated education dates, and unverified experience claims.
  - *Scope Separation:* Retiring old personal portfolio does NOT mean shutting down Next Web Works or its hosted applications (`webapp.nextwebworks.in`).
- **Legacy URL Redirects (Q42):** `map-known-routes` — Inventory indexed routes on `devansh.nextwebworks.in` and establish 301 mapping to equivalent destinations on `devanshkhetwani.dev`. Note: cross-domain redirects must be configured on infrastructure receiving requests for the legacy host (e.g. Cloudflare / reverse proxy), without modifying `webapp.nextwebworks.in` or other production apps.
- **Sole Approval Stakeholder (Q43):** **Devansh Khetwani** is the sole decision-maker and final approver for all stage gates (Gate 0 through Gate 11). Explicit approval required at each gate before proceeding. Silence is never interpreted as approval.
- **Post-Launch Ownership & Maintenance (Q44):** Devansh Khetwani (self-maintained developer portfolio). Clean, understandable Next.js App Router codebase with documented environment variables, clear local dev/deployment scripts, and zero secret leakage.
- **Out-of-Scope Confirmation (Q45):** `confirmed` — Strictly out of scope:
  1. *Direct Database Access:* No direct MongoDB connections or credentials from the portfolio; communication strictly via NWW CMS API.
  2. *Production App Disruption:* Zero modifications to `webapp.nextwebworks.in`, unrelated NWW services, or active customer data.
  3. *Agency Commerce Features:* No agency service packages, pricing tables, shopping carts, checkout, payment gateways, or booking calendars.
  4. *Unsupported Claims:* No fabricated clients, testimonials, unverified percentages, or exaggerated experience.
  5. *Confidential Materials:* No disclosure of NDA-protected client materials, unauthorized Brihat Infotech assets, or private repository source code without approval.
  6. *Unauthorized Production Actions:* No production deployments, DNS changes, legacy site removals, or CMS record publishing without explicit approval.

---

## 8. Gate 0 Asset Inventory & Readiness Summary
- **Text & Copy:** `hybrid` strategy confirmed. Factual source material locked in this document. Personal narrative positioning statement to be submitted for approval before writing production copy.
- **Personal Assets:**
  - Portrait photo: To be provided by Devansh (authentic).
  - Project UI screenshots: To be supplied from real apps (Next Web Business, Next Web Campus, Next Web Agency, PDF Generator); customer data redacted.
  - Code & architecture diagrams: Real implementations only.
  - Brand assets: Typographic wordmark "Devansh Khetwani" + secondary "DK" monogram (to be designed in Stage 2).
- **Stock Photography:** Limited authorization approved (max 10 images) strictly for conceptual blog covers / editorial accents. Approved providers: Unsplash, Pexels, Pixabay with full `/credits` attribution.
- **CMS Integration:** `cms` mode confirmed (`SERVER_URL=https://prod-server.nextwebworks.in`, `CMS_SITE_KEY`, `REVALIDATE_SECRET`). 3 technical draft articles prepared for seeding (`PDF Generator`, `ERP Systems`, `March 2023 to SDE-1 Journey`).
- **Domain & Analytics:** Primary domain `https://devanshkhetwani.dev`, GA4 tracking with `NEXT_PUBLIC_GA_ID`.
- **Status:** All 7 batches complete. Awaiting Gate 0 Human Approval to advance to Stage 1 (Tech Stack).
