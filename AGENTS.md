# AGENTS.md — Repository Guidance for AI Assistants

## 1. Purpose & Stack
`devanshkhetwani.dev` is the personal portfolio and digital brand repository for Devansh Khetwani.
- **Review Tools (`project-docs/review-tools`)**: Node.js ESM (`.mjs`), Playwright, `@axe-core/playwright`, local preview server.
- **Target Application (`site/`, per `tech-stack.md`)**: Next.js App Router (RSC by default), JavaScript (`.js`, `.jsx`), Tailwind CSS, GSAP Motion, Lucide React, NWW CMS integration (`SERVER_URL`).
- **Package Manager**: `pnpm` exclusively. Zero npm or yarn in project workspaces. Zero TypeScript (`.ts`, `.tsx`).

## 2. Workspace Map
- `project-docs/`: Client intake, design research, specifications, and review deliverables.
  - `client-review/`: HTML review deliverables, responsive viewport proofs (`proof-desktop.png`, `proof-mobile.png`).
  - `review-tools/`: Playwright verification scripts (`build.mjs`, `check.mjs`, `serve.mjs`).
  - `tech-stack.md`: Binding architectural contract for Next.js website implementation.
- `.agents/`: Canonical AI rules (`rules/`), skills (`skills/`), subagents (`agents/`), and lifecycle hooks (`hooks/`).
- `.github/workflows/`: CI deployment (`deploy-pages.yml`) deploying review deliverables to GitHub Pages.

## 3. Exact Commands Verbatim
- **Review Tools**:
  - Build review bundle: `pnpm --dir project-docs/review-tools build` (or `node project-docs/review-tools/build.mjs`)
  - Run accessibility & layout check: `pnpm --dir project-docs/review-tools check` (or `node project-docs/review-tools/check.mjs`)
  - Local review server: `pnpm --dir project-docs/review-tools preview` (or `node project-docs/review-tools/serve.mjs`)
- **Planned Site (`site/`)**:
  - `pnpm dev` | `pnpm build` | `pnpm lint` | `pnpm check:structure` | `pnpm check:assets` | `pnpm check:all`
- **Agent Configuration Drift Check**:
  - `node .agents/hooks/check-agent-config.mjs`

## 4. Workflow Discipline
- **Inspect Before Changing**: Read existing files before proposing or making edits. Mirror surrounding code style.
- **Report Before Implementing**: Present findings and planned changes to the user before touching code.
- **Scope Discipline**: Make only changes requested. Never refactor untouched code, reformat files unnecessarily, or add unasked features.

## 5. Non-Negotiable Editing Rule
- Create and modify files **ONLY** using native editor tools (`write_to_file`, `replace_file_content`, `multi_replace_file_content`).
- **NEVER** use shell commands, scripts, redirects (`>`, `>>`), heredocs (`<<EOF`), `sed -i`, `perl -pi`, `awk`, or codemods to create or modify repository files.
- The terminal/shell is strictly for read-only inspection, running linters, tests, and builds.

## 6. Forbidden Without Prior Explicit Human Approval
- Adding or upgrading packages, dependencies, or changing lockfiles.
- Running migrations or modifying database schemas.
- Triggering production deployments or modifying CI workflows (`.github/workflows/`).
- Reading, printing, creating, or modifying `.env*` or secret credential files.
- Destructive git operations (`git reset --hard`, `git clean -f`, `git push --force`) or file deletions.

## 7. Verification Definition
- Never claim success without direct evidence.
- Run `node project-docs/review-tools/check.mjs` when editing review tools or review assets.
- For UI deliverables, inspect layout, color contrast (WCAG 2.1 AA/AAA), and capture browser screenshots.
- Assert `git status --short` shows only approved, intentional changes before concluding.

## 8. Definition of Done
A task is done only when: (1) all requested changes are implemented cleanly; (2) verification checks pass with zero regressions; (3) git status shows only approved file changes; and (4) evidence of verification is reported to the user.

## 9. Tool Notes & Architecture
- Canonical instructions live in:
  - Root: `AGENTS.md` (always-on baseline)
  - Scoped rules: `.agents/rules/*.md`
  - Skills: `.agents/skills/<name>/SKILL.md`
  - Subagents: `.agents/agents/code-reviewer.md`
- Tool-specific files (`.cursor/`, `.github/`, `.codex/`) are ultra-thin adapters pointing back to canonical files.
