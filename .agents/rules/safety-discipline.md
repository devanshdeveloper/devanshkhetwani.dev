---
trigger: model_decision
description: "Non-negotiable safety guardrails: editor-only tool edits, forbidden actions, and evidence-based verification."
---

# Safety Discipline & Engineering Guardrails

## 1. Non-Negotiable Tool Editing Rule
- All file creation and modifications must be performed **exclusively** using native editor tools (`write_to_file`, `replace_file_content`, `multi_replace_file_content`).
- Never use shell scripts, output redirects (`>`, `>>`), heredocs, `sed -i`, `perl -pi`, `awk`, or codemods to modify files.
- The terminal is reserved strictly for read-only inspection, running linters, tests, and builds.

## 2. Forbidden Without Prior Explicit Approval
- Modifying dependencies, adding packages, or altering lockfiles (`pnpm-lock.yaml`, `skills-lock.json`).
- Modifying CI/CD pipelines (`.github/workflows/deploy-pages.yml`).
- Touching secrets or environment files (`.env*`).
- Destructive git operations (`git reset --hard`, `git clean -f`, `git push --force`) or file deletions.

## 3. Evidence-Based Verification Standard
- Never claim a task is complete without running verification commands.
- For review tools: run `node project-docs/review-tools/check.mjs`.
- For agent configuration: run `node .agents/hooks/check-agent-config.mjs`.
- Run `git status --short` before concluding to ensure zero unapproved or unintended file modifications.
