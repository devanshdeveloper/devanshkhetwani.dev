<!--
Source: https://learn.chatgpt.com/docs/agent-configuration/agents-md.md
Source: https://learn.chatgpt.com/docs/agent-configuration/rules.md
Fetched: 2026-10-21
-->

# Codex AGENTS.md & Rules Reference

Guidance on configuring project-wide custom instructions with `AGENTS.md` and fine-grained execution policies with `.rules` files.

## AGENTS.md Custom Instructions

Codex loads `AGENTS.md` before executing any task to understand developer agreements, tech stacks, and repo standards.

### Discovery & Precedence Chain

When launching a session, Codex builds an instruction chain in this exact order:
1. **Global scope:** In `$CODEX_HOME` (`~/.codex`):
   - Reads `AGENTS.override.md` if present; otherwise reads `AGENTS.md`. Only the first non-empty file is loaded.
2. **Project scope:** Walks down the directory tree from the repository root (Git root) to the current working directory ($CWD):
   - In each directory along the path, checks for `AGENTS.override.md`, then `AGENTS.md`. Includes at most one file per directory.
3. **Concatenation & Layering:**
   - Files are joined from the root down with blank lines.
   - Files located closer to `$CWD` appear later in the prompt and override higher-level guidance.
   - Total discovery cap is controlled by `project_doc_max_bytes` (32 KiB default).

### Example AGENTS.md
```markdown
# Repository Guidelines

## Tech Stack
- Next.js 15, Tailwind CSS, TypeScript

## Workflow Rules
- Always run `npm test` after modifying source code.
- Prefer `pnpm` for package operations.
- Never delete migrations or modify locked configuration without confirmation.
```

## Execution Policy Rules (`.rules` files)

Rules files let administrators and developers specify which shell commands Codex can run outside the sandbox without prompting for human approval.

### Rules Locations
- Global user rules: `~/.codex/rules/*.rules` (default: `~/.codex/rules/default.rules`)
- Project-local rules: `<repo>/.codex/rules/*.rules` (loaded only when repo `.codex/` is trusted)

### `prefix_rule()` Syntax
Rules are defined using Starlark/Python-like syntax:

```python
prefix_rule(
    # Command prefix elements (list of strings or unions of strings)
    pattern = ["gh", "pr", ["view", "list"]],

    # Decision when matched: "allow", "prompt", or "forbidden"
    decision = "allow",

    # Human-readable justification surfaced in prompts or logs
    justification = "Viewing PRs is read-only and safe",

    # Inline tests for rule verification
    match = [
        "gh pr view 123",
        "gh pr list --state open",
    ],
    not_match = [
        "gh pr close 123",
        "gh repo delete",
    ]
)
```

### Decision Precedence
When multiple rules match a command, Codex always enforces the **most restrictive** decision:
$$\text{forbidden} > \text{prompt} > \text{allow}$$

- `allow`: Runs command outside sandbox without prompting.
- `prompt`: Prompts user before executing.
- `forbidden`: Blocks command unconditionally.

### Validating Rules
Validate syntax and matches using the preview checker:
```bash
codex execpolicy check --rules ~/.codex/rules/default.rules --pretty
```
Codex also safely parses shell command chains (`&&`, `||`, `;`, `|`) with tree-sitter, evaluating each individual command against the rules table.
