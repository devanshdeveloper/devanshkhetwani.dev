---
trigger: glob
globs:
  - "project-docs/review-tools/**/*.{js,mjs,json}"
description: "Engineering standards, testing discipline, and execution conventions for review tools."
---

# Review Tools Discipline (`project-docs/review-tools`)

## 1. Environment & Package Standards
- Runtime: Node.js with native ECMAScript Modules (`"type": "module"`).
- Package Manager: `pnpm` exclusively. Run commands from `project-docs/review-tools` or via `pnpm --dir project-docs/review-tools <command>`.
- Dependencies: `@axe-core/playwright` (accessibility audit engine) and `playwright` (browser test runner).
- Do not introduce CommonJS (`require()`, `module.exports`).

## 2. Core Scripts & Usage
- `build.mjs`: Bundles and compiles review assets.
  - Command: `node project-docs/review-tools/build.mjs`
- `check.mjs`: Automated accessibility check against WCAG 2.1 AA/AAA standards and layout assertion runner.
  - Command: `node project-docs/review-tools/check.mjs`
- `serve.mjs`: Local preview HTTP server for manual visual inspection.
  - Command: `node project-docs/review-tools/serve.mjs`

## 3. Modification & Verification Rules
- Always verify accessibility (`check.mjs`) after editing review tools or review page templates.
- Maintain zero violations for critical and serious WCAG rules.
- Ensure headless browser operations clean up browser instances in `finally` blocks.
