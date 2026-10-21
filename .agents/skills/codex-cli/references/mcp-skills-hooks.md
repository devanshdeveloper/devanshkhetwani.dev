<!--
Source: https://learn.chatgpt.com/docs/build-skills.md
Source: https://learn.chatgpt.com/docs/hooks.md
Source: https://learn.chatgpt.com/docs/extend/mcp.md
Fetched: 2026-10-21
-->

# Codex Skills, MCP & Lifecycle Hooks Reference

How to extend Codex with reusable skills, Model Context Protocol (MCP) integrations, and lifecycle hooks.

## 1. Agent Skills

Skills package instructions, templates, and scripts following the open agent skills standard (`agentskills.io`).

### File Structure
```
my-skill/
├── SKILL.md        # Required: YAML frontmatter + instructions
├── scripts/        # Optional: Executable helper scripts
├── references/     # Optional: Additional documentation
└── assets/         # Optional: Static resources / templates
```

### `SKILL.md` Format
```markdown
---
name: my-skill
description: Detailed description of when and why the agent should trigger this skill.
---

Instructions for Codex to follow when this skill is activated.
```

### Discovery Locations
Codex discovers local skills from these paths:
- Repository root & CWD: `$CWD/.agents/skills`, `$REPO_ROOT/.agents/skills`
- User home: `$HOME/.agents/skills`
- System/Admin: `/etc/codex/skills`
- System-bundled: Prepackaged skills shipped with Codex (e.g. `skill-creator`, `plan`)

### Progressive Disclosure
To preserve model context, Codex initially indexes only skill names and descriptions (using up to `skills.max_context_tokens`, 2% of context window default). The full `SKILL.md` body is loaded only when the skill is selected explicitly (via `$skill-name` or `/skills`) or matched implicitly based on description.

## 2. Model Context Protocol (MCP)

MCP enables Codex to communicate with external servers for tools, data, and context.

### Supported Transports
- **STDIO Servers:** Local subprocess commands communicating over stdio.
- **Streamable HTTP Servers:** Remote HTTP endpoints supporting Bearer tokens, OAuth (CIMD/DCR), or first-party ChatGPT session tokens.

### Adding an MCP Server via CLI
```bash
# Add STDIO server
codex mcp add context7 -- npx -y @upstash/context7-mcp

# Add with environment variables
codex mcp add my-db --env DB_HOST=localhost -- python -m my_db_mcp

# Inspect and manage
codex mcp list
codex mcp remove <server-name>
codex mcp login <server-name>  # OAuth servers
```

### Adding in `~/.codex/config.toml`
```toml
[mcp_servers.my-server]
command = "node"
args = ["./mcp-server.js"]
env = { DEBUG = "true" }
```
*Note: The deprecated `codex mcp-server` command has been removed in favor of `codex app-server`.*

## 3. Lifecycle Hooks

Hooks run automated validation, logging, or transformations at specific points during a conversation turn.

### Hook Discovery Locations
- User hooks: `~/.codex/hooks.json` or `[hooks]` table in `~/.codex/config.toml`
- Repository hooks: `<repo>/.codex/hooks.json` or `<repo>/.codex/config.toml` (trusted repos only)

### Conversation Lifecycle Events
- **During Turn:** `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `UserPromptSubmit`, `SubagentStop`, `Stop`
- **Interrupt:** `Interrupt`
- **Session Boundaries:** `SessionStart`, `SubagentStart`, `SessionEnd`

### Hook Trust Model
Non-managed hooks must be reviewed and trusted before execution:
- View and trust hooks via the `/hooks` command in the interactive TUI.
- In automation pipelines, `--dangerously-bypass-hook-trust` allows pre-vetted hooks to run without stored manual trust.
