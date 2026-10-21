---
name: plan-first
description: Enforce structured step-by-step planning before undertaking any feature, refactor, or complex task in this repository. Use when beginning non-trivial work or when the user asks for a plan.
---

# Plan-First Discipline

Enforces structured, phased planning before executing code modifications.

## Procedure

1. **Understand Objectives & Boundaries**:
   - Review user requirements and relevant design contracts (`project-docs/tech-stack.md`, `project-docs/client-answers.md`).
   - Identify affected components, files, and constraints.

2. **Audit Current State**:
   - Inspect existing implementation using read-only tools (`view_file`, `grep_search`, `list_dir`).
   - Verify existing tests and checks pass prior to introducing changes.

3. **Formulate Step-by-Step Plan**:
   - Break work down into discrete, reviewable phases.
   - Outline exact files to create, modify, or inspect.
   - Define concrete verification criteria for each phase.

4. **Seek Alignment**:
   - Present the plan clearly to the user.
   - Stop and wait for user sign-off before modifying repository files.
