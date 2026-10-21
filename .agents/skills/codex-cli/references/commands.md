<!--
Source: https://learn.chatgpt.com/docs/codex/cli.md
Source: https://learn.chatgpt.com/docs/developer-commands.md
Fetched: 2026-10-21
-->

# Codex CLI Commands Reference

Complete command reference for the OpenAI Codex CLI (`codex-cli 0.163.0`), verified against official documentation.

## Global Options

These options apply to `codex` and propagate to subcommands:

| Flag | Alias | Description |
| --- | --- | --- |
| `--model <MODEL>` | `-m` | Model to use (e.g., `gpt-6.1-sol`, `gpt-6-luna`, `gpt-6-astra`) |
| `--config <key=value>` | `-c` | Override configuration from `~/.codex/config.toml` (parsed as TOML) |
| `--profile <NAME>` | `-p` | Layer `$CODEX_HOME/<name>.config.toml` on top of user config |
| `--sandbox <MODE>` | `-s` | Sandbox policy: `read-only`, `workspace-write`, `danger-full-access` |
| `--ask-for-approval <POLICY>` | `-a` | Human approval policy: `on-request`, `never` |
| `--approve-for-me` | | Route approvals through automatic review using workspace-write sandbox |
| `--cd <DIR>` | `-C` | Working directory root for the agent |
| `--add-dir <DIR>` | | Additional directory allowed for writes alongside primary workspace |
| `--image <FILE>...` | `-i` | Attach image(s) to prompt |
| `--search` | | Enable live web search via Responses `web_search` tool |
| `--oss` | | Use open-source model provider |
| `--local-provider <PROVIDER>` | | Local OSS provider (`lmstudio` or `ollama`) |
| `--strict-config` | | Error out if unrecognized fields exist in `config.toml` |
| `--no-alt-screen` | | Disable alternate screen mode (inline TUI mode) |
| `--no-daemon` | | Run without shared background app-server daemon |
| `--dangerously-bypass-approvals-and-sandbox` | | Skip confirmation prompts and sandbox (EXTREMELY DANGEROUS) |
| `--dangerously-bypass-hook-trust` | | Run hooks without requiring persisted trust verification |
| `--version` | `-V` | Print version |
| `--help` | `-h` | Print help |

## CLI Commands

### 1. `codex` (Interactive TUI)
Launches the full-screen terminal user interface. If no prompt is passed, opens an interactive chat composer.
```bash
codex
codex "Explore this codebase and summarize architecture"
```

### 2. `codex exec` (Non-Interactive, Alias: `codex e`)
Runs Codex non-interactively for scripting and CI pipelines. Progress streams to `stderr`; only the final agent message prints to `stdout`.
```bash
codex exec "Run test suite and summarize failures"
codex exec -  # Reads full prompt from stdin
```

### 3. `codex review`
Runs non-interactive code review against changes.
- Target flags: `--uncommitted` (uncommitted working tree diff), `--base <BRANCH>` (diff against branch), `--commit <HASH>` (diff of specific commit).
- Cannot combine target flags with custom prompt.
```bash
codex review --uncommitted
codex review --base main
```

### 4. `codex login` & `codex logout`
- `codex login`: Opens browser for ChatGPT OAuth authentication.
- `codex login --device-auth`: Remote/headless terminal login via verification code.
- `codex login status`: Exits with `0` when credentials are valid.
- `codex logout`: Removes saved credentials.

### 5. `codex resume` & `codex fork`
- `codex resume`: Resumes a saved interactive session. Use `--last` for most recent in CWD, `--all` to search all sessions.
- `codex fork <SESSION_ID>`: Forks a saved session into a new chat or worktree (`--worktree`).

### 6. `codex queue`
Queues a follow-up text message into an existing session thread:
```bash
codex queue --thread <SESSION_ID> --message "Run remaining checks"
```

### 7. `codex archive`, `unarchive`, `delete`
- `codex archive <SESSION>`: Hides session from active picker without deleting transcript.
- `codex unarchive <SESSION>`: Restores archived session.
- `codex delete <SESSION>`: Permanently removes session transcript. Use `--force` with UUID.

### 8. `codex mcp`
Manages Model Context Protocol servers in `config.toml`:
- `codex mcp add <name> -- <stdio-command>`
- `codex mcp list`
- `codex mcp remove <name>`
- `codex mcp login <name>` (for OAuth-based HTTP servers)

### 9. `codex plugin` & `codex plugin marketplace`
Manages plugins and plugin marketplace sources:
- `codex plugin list`, `codex plugin add <id>`, `codex plugin remove <id>`
- `codex plugin marketplace add <owner/repo>`
- `codex plugin marketplace list`

### 10. `codex doctor`
Runs a diagnostic check on installation, config, authentication, runtime, Git, terminal, and thread health.

### 11. `codex apply` (Alias: `codex a`)
Applies the latest diff produced by a Codex Cloud task to the local working tree using `git apply`.

### 12. `codex cloud`
Interacts with Codex Cloud tasks:
- `codex cloud`: Interactive picker
- `codex cloud exec <prompt>`: Submits task to cloud
- `codex cloud list [--json]`: Lists recent tasks

### 13. `codex sandbox`
Runs an arbitrary command under the exact sandbox profile Codex uses internally:
```powershell
codex -c windows.sandbox=mxc sandbox --permission-profile :workspace -- cmd.exe /d /c echo MXC_OK
```

### 14. `codex features`
Inspects, enables, or disables feature flags stored in `config.toml`:
- `codex features list`
- `codex features enable <feature>`
- `codex features disable <feature>`

### 15. `codex debug`
Developer debugging tools:
- `codex debug models`: Outputs model catalog JSON (`--bundled` to skip remote refresh).
- `codex debug prompt-input`: Emits prompt instruction discovery list as JSON.
- `codex debug app-server send-message-v2`: Tests app-server V2 thread/turn protocol.

### 16. `codex app-server` & `codex remote-control`
Runs the local app-server daemon protocol or enables remote control pairing.
- Note: `codex mcp-server` has been removed. Use `codex app-server`.

## Deprecated & Retired Options
- `approval_policy = "untrusted"` is retired and no longer supported. Use `sandbox_mode = "read-only"` and `approval_policy = "on-request"`.
- `--full-auto` flag is removed. Use `--sandbox workspace-write` or `--approve-for-me`.
