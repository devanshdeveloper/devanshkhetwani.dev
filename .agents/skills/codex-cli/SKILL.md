---
name: codex-cli
description: Run, configure, automate, or troubleshoot the OpenAI Codex CLI (codex-cli). Use when invoking interactive TUI sessions, running non-interactive scripts via codex exec, selecting models, configuring sandbox permissions and approvals, managing AGENTS.md, rules, MCP servers, or lifecycle hooks.
---

# Codex CLI (`codex-cli`)

A guide for executing, scripting, and configuring the OpenAI Codex CLI (`codex-cli 0.163.0`).

## Core Invocations

### 1. Interactive TUI Mode
Launches the full-screen terminal UI for interactive pairing:
```bash
codex [OPTIONS] [PROMPT]
```
- Open clean session: `codex`
- Open with task prompt: `codex "Explore this codebase and plan next steps"`
- Use `/` for slash commands (`/model`, `/permissions`, `/plan`, `/goal`, `/review`, `/diff`, `/compact`, `/status`).

### 2. Non-Interactive Execution Mode (`codex exec`)
Automates tasks in scripts, agent workflows, and CI/CD pipelines without opening the TUI:
```bash
codex exec [OPTIONS] [PROMPT]
codex e [OPTIONS] [PROMPT]  # Short alias
```
- **Stream behavior:** Only the final agent message is written to `stdout`. Progress, thoughts, and logs stream to `stderr`.
- **Default sandbox:** Runs in `read-only` mode by default. Pass `--sandbox workspace-write` when file edits are required.

## Key Flags Reference

| Purpose | Flag | Allowed Values / Examples |
| --- | --- | --- |
| **Model** | `-m, --model <MODEL>` | `gpt-6.1-sol` (recommended), `gpt-6-luna`, `gpt-6-astra` |
| **Sandbox** | `-s, --sandbox <MODE>` | `read-only` (default for exec), `workspace-write`, `danger-full-access` |
| **Approvals** | `-a, --ask-for-approval <POLICY>` | `on-request` (default), `never` *(Note: `untrusted` is retired)* |
| **Auto-Review** | `--approve-for-me` | Routes approvals through auto-reviewer with `workspace-write` |
| **Working Directory** | `-C, --cd <DIR>` | Target repository or folder root |
| **Extra Write Dirs** | `--add-dir <DIR>` | Writable paths alongside primary workspace |
| **Output File** | `-o, --output-last-message <FILE>` | Write final response text to file |
| **JSON Events** | `--json` | Stream all lifecycle events as JSONL on `stdout` |
| **Config Override** | `-c, --config <key=value>` | `-c model="gpt-6.1-sol"`, `-c features.prefer_mxc=true` |
| **Git Bypass** | `--skip-git-repo-check` | Permit running outside a Git repository |
| **Ephemeral** | `--ephemeral` | Run without saving sessions to `$CODEX_HOME` |

## Safe Multi-Line & Special-Character Prompt Passing

To prevent quotes (`"`, `'`), backticks (`` ` ``), variable expansions (`$VAR`), and newlines from breaking in bash or PowerShell, **pipe instructions directly to stdin** using `-`:

### Bash / Linux / macOS:
```bash
cat <<'EOF' | codex exec -
Review the following function and fix the race condition:
function sync() { ... }
EOF
```

### PowerShell (Windows):
```powershell
# Write raw prompt to temporary file and stream via stdin:
Get-Content -Raw -Encoding UTF8 prompt.tmp | codex exec -
```

*Note: If both a prompt argument and piped stdin are provided, Codex treats the argument as the instruction and appends stdin inside `<stdin>` context.*

## Common Failures & Quick Fixes

- **Auth Error:** Run `codex login` (or `codex login --device-auth` for headless setups). Check status with `codex login status`.
- **`gpt-5.5` Error:** `gpt-5.5` retired October 14, 2026. Switch to `gpt-6.1-sol` or `gpt-6-luna`.
- **`approval_policy = 'untrusted'` Error:** Setting is retired. Use `sandbox_mode = "read-only"` and `approval_policy = "on-request"`.
- **Permission Denied in `codex exec`:** `codex exec` defaults to `read-only`. Add `--sandbox workspace-write` to permit edits.
- **Git Repository Required:** Initialize Git (`git init`) or pass `--skip-git-repo-check`.
- **Windows Sandbox Check:** Verify with `codex -c windows.sandbox=mxc sandbox --permission-profile :workspace -- cmd.exe /d /c echo MXC_OK`.

## Modular References

- [Commands Reference](references/commands.md) — All subcommands and CLI options.
- [Slash Commands Reference](references/slash-commands.md) — TUI slash commands and shortcuts.
- [Non-Interactive Mode](references/non-interactive.md) — `codex exec` scripting, JSONL, and pipelines.
- [Config Reference](references/config.md) — `config.toml` structure, variables, and precedence.
- [Permissions & Sandboxing](references/permissions-sandbox.md) — Sandbox boundaries and OS enforcement.
- [AGENTS.md & Rules](references/agents-md-and-rules.md) — Instructions layering and `.rules` syntax.
- [MCP, Skills & Hooks](references/mcp-skills-hooks.md) — MCP tools, skills standard, and lifecycle hooks.
- [Models Reference](references/models.md) — Model tiers, GPT-6.1 Sol, and Luna.
- [Troubleshooting](references/troubleshooting.md) — Diagnostics and fixes for known issues.
