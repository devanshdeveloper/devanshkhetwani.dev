---
name: verify
description: Rigorous verification runbook for changes made in this repository. Use when finishing tasks, validating review deliverables, or before claiming a feature is complete.
---

# Verification Runbook

Mandatory multi-point verification protocol before concluding any task in `devanshkhetwani.dev`.

## Verification Steps

### 1. Agent Configuration Integrity
```bash
node .agents/hooks/check-agent-config.mjs
```
- Asserts all scoped rules have matching adapters.
- Confirms valid YAML/JSON/TOML syntax across all agent configuration files.
- Ensures no `.md` files exist in `.cursor/rules/` and no nested folders in `.agents/rules/`.

### 2. Review Tools & Deliverable Quality (when modifying review assets)
```bash
pnpm --dir project-docs/review-tools check
```
- Validates Playwright browser assertions.
- Confirms zero WCAG 2.1 AA/AAA accessibility violations via `@axe-core/playwright`.

### 3. Application Verification (when modifying target Next.js site)
```bash
pnpm check:all
```
- Runs linter, structural component boundary validator, and media budget checks.

### 4. Git Cleanliness & Scope Audit
```bash
git status --short
```
- Prove that only intentional, requested files were created or modified.
- Confirm zero modifications to `.env*`, lockfiles, CI configs, or unrelated source files.
