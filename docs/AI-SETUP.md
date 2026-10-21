# AI Tooling Architecture & Setup Guide

**Repository:** `devanshkhetwani.dev`  
**Tools Supported:** Google Antigravity, Cursor, OpenAI Codex, VS Code (GitHub Copilot)  
**Specification Level:** AI-Native Multi-Tool Architecture  

---

## 1. Architectural Overview & Single Source of Truth

This repository is configured to provide identical, deterministic instructions and safety enforcement across four major AI coding assistants without duplicating guidance text.

```
devanshkhetwani.dev/
├── AGENTS.md                                 # Canonical always-on root instructions (<120 lines)
├── .agents/
│   ├── rules/                                # Canonical scoped and contextual rules
│   │   ├── review-tools-discipline.md        # Glob-scoped: project-docs/review-tools/**
│   │   ├── client-review-assets.md           # Glob-scoped: project-docs/client-review/**
│   │   ├── tech-stack-contract.md            # Model-decision: Next.js, GSAP, NWW CMS
│   │   └── safety-discipline.md              # Model-decision: Non-negotiable tool editing rules
│   ├── skills/                               # Canonical procedural runbooks (agentskills.io)
│   │   ├── plan-first/                       # Phased planning workflow
│   │   ├── verify/                           # Verification runbook
│   │   ├── add-feature-in-repo-style/        # Feature styling and boundaries
│   │   ├── codex-cli/                        # Operational Codex CLI skill
│   │   ├── create-nextjs-website/            # Next.js scaffolding
│   │   ├── create-nww-website/               # NWW website lifecycle
│   │   ├── frontend-design/                  # Design aesthetics
│   │   └── nww/                              # Shortcut alias
│   ├── agents/
│   │   └── code-reviewer.md                  # Antigravity read-only subagent
│   └── hooks/
│       ├── lib/policy.mjs                    # Shared pure policy engine
│       ├── edit-guard.mjs                    # PreToolUse command interceptor
│       ├── secret-guard.mjs                  # PreToolUse secret access interceptor
│       ├── verify-gate.mjs                   # Stop gate (disabled by default)
│       └── check-agent-config.mjs            # Read-only drift & integrity validator
├── .cursor/
│   ├── cli.json                              # CLI permissions & command blocks
│   ├── hooks.json                            # beforeShellExecution hook config
│   ├── hooks/cursor-guard.mjs                # Cursor hook adapter
│   ├── agents/code-reviewer.md               # Cursor read-only reviewer subagent
│   └── rules/*.mdc                           # Thin adapters pointing to .agents/rules/*.md
├── .cursorignore                             # AI indexing ignore boundaries
├── .codex/
│   ├── config.toml                           # Codex project configuration (sandbox & approvals)
│   ├── rules/default.rules                   # Starlark prefix rules for execution policy
│   └── agents/code-reviewer.toml             # Codex read-only reviewer subagent
└── .github/
    ├── copilot-instructions.md               # Thin pointer to root AGENTS.md
    ├── instructions/*.instructions.md        # Thin adapters pointing to .agents/rules/*.md
    ├── agents/code-reviewer.agent.md         # Copilot read-only reviewer agent
    └── hooks/
        ├── hooks.json                        # VS Code Local harness hooks config
        └── vscode-guard.mjs                  # VS Code hook adapter
```

---

## 2. Feature Coverage Matrix

| Feature Surface | Google Antigravity | Cursor | OpenAI Codex | VS Code (GitHub Copilot) | Verified URL / Source |
|---|---|---|---|---|---|
| **Root Instructions** | `AGENTS.md` | `AGENTS.md` | `AGENTS.md` | `.github/copilot-instructions.md` | [agents.md](https://agents.md) & [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/copilot-customization) |
| **Nested Instructions** | N/A (Single workspace) | N/A (Single workspace) | N/A (Hierarchical root) | Recommend setting: `chat.useNestedAgentsMdFiles: true` | [VS Code Custom Instructions](https://code.visualstudio.com/docs/copilot/copilot-customization#_nested-instructions) |
| **Scoped Rules** | `.agents/rules/*.md` | `.cursor/rules/*.mdc` | N/A (Codex uses `AGENTS.md` + skills) | `.github/instructions/**/*.instructions.md` | [Cursor Rules](https://docs.cursor.com/context/rules) & [VS Code Targeted Instructions](https://code.visualstudio.com/docs/copilot/copilot-customization#_targeted-instructions) |
| **Agent Skills** | `.agents/skills/` | `.agents/skills/` (native) | `.agents/skills/` (native) | `.agents/skills/` (native) | [Agent Skills Standard](https://agentskills.io) & [VS Code Agent Skills](https://code.visualstudio.com/docs/copilot/agent-skills) |
| **Slash Commands / Workflows** | `.agents/workflows/codex.md` (preserved) | N/A (Migrated to skills) | N/A (Skills used natively) | N/A (Prompt files deprecated in favor of skills) | [VS Code Prompt Deprecation](https://code.visualstudio.com/docs/copilot/prompt-crafting#_prompt-files) |
| **Custom Subagents** | `.agents/agents/code-reviewer.md` | `.cursor/agents/code-reviewer.md` | `.codex/agents/code-reviewer.toml` | `.github/agents/code-reviewer.agent.md` | [Antigravity CLI](https://antigravity.google/docs/cli/features), [Cursor Subagents](https://docs.cursor.com/agent/subagents), [Codex Subagents](https://developers.openai.com/codex/agents/), [VS Code Agents](https://code.visualstudio.com/docs/copilot/custom-agents) |
| **PreToolUse / Shell Hooks** | `.agents/hooks.json` -> `edit-guard.mjs` | `.cursor/hooks.json` -> `cursor-guard.mjs` | `.codex/rules/default.rules` (Starlark) | `.github/hooks/hooks.json` -> `vscode-guard.mjs` | [Antigravity Hooks](https://antigravity.google/docs/hooks), [Cursor Hooks](https://docs.cursor.com/agent/hooks), [Codex Starlark](https://github.com/openai/codex), [VS Code Hooks Reference](https://code.visualstudio.com/docs/agents/reference/hooks-reference.md) |
| **Secret / File Access Guard** | `.agents/hooks.json` -> `secret-guard.mjs` | `.cursorignore` & `.cursor/cli.json` | `.codex/config.toml` & `.codex/rules` | `.github/hooks/hooks.json` PreToolUse guard | [Cursor Permissions](https://docs.cursor.com/agent/permissions), [Codex Sandbox](https://developers.openai.com/codex/) |
| **Stop Verification Gate** | `.agents/hooks.json` -> `verify-gate.mjs` (disabled) | Recommend only (avoids infinite loops) | Recommend only (lacks loop brake) | `.github/hooks/hooks.json` Stop hook (disabled) | [Antigravity Hooks](https://antigravity.google/docs/hooks) & [VS Code Stop Hook Contract](https://code.visualstudio.com/docs/agents/reference/hooks-reference.md#stop) |
| **Ignored Files / Privacy** | `.gitignore` | `.cursorignore` | Respects `.gitignore` | Respects `.gitignore` | [Cursorignore](https://docs.cursor.com/context/ignore-files) |
| **Security Permissions & Sandbox** | Terminal Sandbox & Non-Workspace Deny | `.cursor/cli.json` deny list | `sandbox_mode = "workspace-write"` in `.codex/config.toml` | Workspace trust settings | [Antigravity App Guide](builtin/skills/antigravity_guide/references/app.md) & [Codex Sandbox](https://developers.openai.com/codex/) |
| **Drift Checker** | `.agents/hooks/check-agent-config.mjs` | Shared script | Shared script | Shared script | Standalone Node.js AST validator script |

---

## 3. Files Read by Each Tool

### Google Antigravity
1. `AGENTS.md` (root baseline instructions, loaded always).
2. `.agents/rules/*.md` (discovered dynamically; `glob` rules inject when matching files are opened/active; `model_decision` rules inject when relevant).
3. `.agents/skills/<name>/SKILL.md` (indexed on session start; full skill loaded on demand).
4. `.agents/agents/<name>.md` (subagents available for task delegation).
5. `.agents/hooks.json` (runs lifecycle handlers on `PreToolUse`, `PostToolUse`, `Stop`).

### Cursor
1. `AGENTS.md` (discovered natively as project guidelines).
2. `.cursorignore` (blocks files from indexing, Composer context, and codebase embeddings).
3. `.cursor/rules/*.mdc` (evaluates globs and descriptions, attaching canonical `.agents/rules/*.md` content on demand).
4. `.cursor/agents/*.md` (discovers custom subagents).
5. `.cursor/hooks.json` (executes `beforeShellExecution` scripts with `failClosed: true`).
6. `.cursor/cli.json` (enforces terminal command deny list).
7. `.agents/skills/` (Cursor natively discovers agent skills).

### OpenAI Codex
1. `AGENTS.md` (loads root instructions, concatenated down from Git root).
2. `.agents/skills/` (natively indexes skill descriptions; loads on demand).
3. `.codex/config.toml` (loads project sandbox and approval policies when repo is trusted).
4. `.codex/rules/*.rules` (enforces Starlark execution policy on shell commands).
5. `.codex/agents/*.toml` (loads custom subagents).

### VS Code (GitHub Copilot)
1. `.github/copilot-instructions.md` (points to `AGENTS.md`).
2. `AGENTS.md` (natively supported as project custom instructions).
3. `.github/instructions/**/*.instructions.md` (scopes canonical rules using `applyTo` glob).
4. `.agents/skills/` (auto-discovered alongside `.github/skills/`).
5. `.github/agents/*.agent.md` (registers custom chat agents).
6. `.github/hooks/hooks.json` (Local harness lifecycle hooks).

---

## 4. How to Add or Modify Rules

**Golden Rule:** Always modify the canonical rule first. Never put unique prose into tool adapters.

1. **Add or modify canonical rule**:
   - Create or edit `.agents/rules/<rule-name>.md`.
   - Specify frontmatter trigger (`glob` with `globs: [...]`, or `model_decision` with `description: "..."`).
2. **Add Cursor adapter**:
   - Create `.cursor/rules/<rule-name>.mdc`.
   - Set `globs` (if scoped) or `description` (if model decision). Set `alwaysApply: false`.
   - Point to canonical rule: `Canonical instructions: [rule-name.md](file:///c:/code/personal/devanshkhetwani.dev/.agents/rules/rule-name.md)`.
3. **Add VS Code adapter**:
   - Create `.github/instructions/<rule-name>.instructions.md`.
   - Set `applyTo` glob matching the canonical scope.
   - Point to canonical rule.
4. **Validate drift**:
   - Run `node .agents/hooks/check-agent-config.mjs` to ensure 0 drift and 0 missing adapters.

---

## 5. Manual Verification Steps Per Tool

### Google Antigravity
1. Open the workspace in Antigravity IDE or Antigravity 2.0.
2. In the chat panel, click the **Customizations** icon or run `/hooks` in CLI.
3. Verify that `AGENTS.md` is active and the 4 scoped rules appear in the Rules view.
4. Verify all skills (`plan-first`, `verify`, `add-feature-in-repo-style`, `codex-cli`, `frontend-design`, `nww`, `create-nextjs-website`, `create-nww-website`) appear in the Skills list.
5. In chat, test delegating to the subagent: `@code-reviewer review project-docs/review-tools/build.mjs`.

### Cursor
1. Open the repository in Cursor.
2. Go to **Settings > Cursor Settings > Rules for AI**.
3. Confirm that the 4 `.mdc` rules appear in the project rules list.
4. Open a file in `project-docs/review-tools/` (e.g. `build.mjs`) and open Composer (<kbd>Ctrl+I</kbd> / <kbd>Cmd+I</kbd>). Confirm `review-tools-discipline.mdc` is attached to context.
5. In chat, type `@code-reviewer` to verify subagent delegation.

### OpenAI Codex
1. Open a terminal in the repository root.
2. Trust the project in your user config (`~/.codex/config.toml`):
   ```toml
   [projects."c:/code/personal/devanshkhetwani.dev"]
   trust_level = "trusted"
   ```
3. Run `codex` to open the interactive TUI.
4. Type `/status` to confirm `AGENTS.md` and `.codex/config.toml` were loaded.
5. Type `/skills` to confirm `.agents/skills/` were indexed.
6. Verify execution policy:
   ```bash
   codex execpolicy check --rules .codex/rules/default.rules
   ```

### VS Code (GitHub Copilot)
1. Open the repository in VS Code with the GitHub Copilot Chat extension installed.
2. Ensure the following settings are enabled in your user `settings.json`:
   ```json
   {
     "chat.useNestedAgentsMdFiles": true,
     "chat.agent.hooks.enabled": true
   }
   ```
3. Open Copilot Chat (<kbd>Ctrl+Alt+I</kbd>).
4. Type `@code-reviewer` in the chat box to confirm custom agent discovery.
5. Ask Copilot: *"What package manager does this project use?"* Copilot will cite `AGENTS.md` specifying `pnpm` exclusively.

---

## 6. Recommended Model Context Protocol (MCP) Servers

To maintain strict security and protect developer credentials, **zero MCP servers with credentials are wired into repository files by default**. The following servers are recommended for manual configuration:

| MCP Server | Suggested Scope | Transport | Required Credentials | Purpose | Security & Permission Risk |
|---|---|---|---|---|---|
| **GitHub (`@modelcontextprotocol/server-github`)** | Global / User | Stdio (`npx`) | `GITHUB_PERSONAL_ACCESS_TOKEN` | Query issues, PRs, and GitHub Actions deployments | **High**: Can read private repos, create commits, and trigger workflows if token has write scope. |
| **Vercel (`@vercel/mcp`)** | Global / User | Stdio (`npx`) | `VERCEL_API_TOKEN` | Inspect preview deployments and build logs | **Medium**: Can inspect environment variable metadata and project configurations. |
| **Supabase (`@supabase/mcp-server`)** | Global / User | Stdio (`npx`) | `SUPABASE_ACCESS_TOKEN` | Database schema inspection (if backend expands) | **High**: Can query database tables and execute SQL if admin key is passed. |
| **Context7 (`@upstash/context7-mcp`)** | Workspace / User | Stdio (`npx`) | None | Up-to-date documentation retrieval for Next.js, Tailwind, GSAP | **Low**: Read-only documentation index; zero credential exposure. |

### Where to Configure MCP Servers:
- **Google Antigravity**: In `~/.gemini/config/mcp_config.json`
- **Cursor**: In `~/.cursor/mcp.json` or `.cursor/mcp.json`
- **OpenAI Codex**: In `~/.codex/config.toml` under `[mcp_servers.*]`
- **VS Code**: In `.vscode/mcp.json` (workspace) or user settings

---

## 7. Known Gaps & Unverified Items

1. **Stop Hook Re-entry for Cursor & Codex**:
   - Antigravity supports `decision: "continue"` with max re-entry handling.
   - VS Code Local harness supports `decision: "block"` on `Stop`.
   - Cursor and Codex currently lack safe, native loop brakes on Stop hooks. To protect against runaway loops, Stop hooks remain disabled.
2. **VS Code Nested `AGENTS.md`**:
   - Supported experimentally in VS Code via `"chat.useNestedAgentsMdFiles": true`. This repo currently maintains a single root `AGENTS.md` which is fully supported out of the box.
