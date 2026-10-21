<!--
Source: https://learn.chatgpt.com/docs/config-file/config-basic.md
Source: https://learn.chatgpt.com/docs/config-file/config-advanced.md
Source: https://learn.chatgpt.com/docs/config-file/config-reference.md
Source: https://learn.chatgpt.com/docs/config-file/environment-variables.md
Source: https://learn.chatgpt.com/docs/config-file/config-sample.md
Fetched: 2026-10-21
-->

# Codex Configuration Reference (`config.toml` & Environment Variables)

Complete reference for configuring OpenAI Codex CLI, desktop, and extension clients.

## Configuration Precedence Order

When resolving configuration keys, Codex applies settings from highest to lowest precedence:
1. **Command-line flags:** `-c key=value` / `--config key=value` overrides passed at runtime.
2. **Project configuration:** `.codex/config.toml` at repository root (loaded only if project is trusted).
3. **Configuration profiles:** `$CODEX_HOME/<profile>.config.toml` selected via `--profile <profile>`.
4. **User-level configuration:** `$CODEX_HOME/config.toml` (default: `~/.codex/config.toml`).
5. **System / MDM defaults:** System-wide enterprise policy requirements.

*Note: Project-level `.codex/config.toml` cannot override authentication, provider base URLs (`openai_base_url`, `chatgpt_base_url`), profiles, or telemetry.*

## Overriding via Command Line (`-c`)

Use dotted paths to override TOML values at invocation time:
```bash
codex -c model="gpt-6.1-sol"
codex -c 'sandbox_permissions=["disk-full-read-access"]'
codex -c features.prefer_mxc=true
```

## Core `config.toml` Settings

### Model & Context
```toml
# Default model to use for sessions
model = "gpt-6.1-sol"

# Optional model override used specifically for /review
review_model = "gpt-6.1-sol"

# Provider identifier (default: "openai")
model_provider = "openai"

# Context window token size
model_context_window = 200000

# Token threshold that triggers automatic history compaction
model_auto_compact_token_limit = 120000
```

### Sandbox & Approvals
```toml
# Sandbox execution mode: "read-only", "workspace-write", "danger-full-access"
sandbox_mode = "workspace-write"

# Approval policy: "on-request" (default), "never"
# NOTE: "untrusted" is RETIRED and invalid
approval_policy = "on-request"

# Windows sandbox selection: "mxc" (recommended on Win 11), "elevated", "unelevated"
[windows]
sandbox = "mxc"

[features]
prefer_mxc = true
```

### Skills & Tools
```toml
[skills]
# Context token budget for discovering initial skill list (default: 2% of window, up to 10000)
max_context_tokens = 4000
```

### MCP Servers
```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
env = { LOG_LEVEL = "info" }
```

## Public Environment Variables

| Variable | Used By | Default | Description |
| --- | --- | --- | --- |
| `CODEX_HOME` | All clients | `~/.codex` | Root directory for config, auth, sessions, logs, and skills |
| `CODEX_SQLITE_HOME` | State store | `CODEX_HOME` | Storage path for SQLite databases |
| `CODEX_API_KEY` | CLI / exec / SDK | None | Provides an API key for non-interactive execution |
| `CODEX_ACCESS_TOKEN` | CLI / automation | None | Access token for trusted ChatGPT account automation |
| `CODEX_NON_INTERACTIVE` | Install scripts | `false` | Set to `1` or `true` to skip installer prompts |
| `CODEX_INSTALL_DIR` | Install scripts | OS default | Binary install target path |
| `CODEX_CA_CERTIFICATE` | Network / TLS | None | Path to custom PEM CA certificate bundle |
| `SSL_CERT_FILE` | Network / TLS | None | Fallback PEM CA certificate bundle path |
| `RUST_LOG` | CLI diagnostics | `error` | Verbosity filter (e.g. `debug`, `info`, `codex_core=debug`) |

## Project Trust Configuration

Trust settings in `~/.codex/config.toml` determine whether repository `.codex/` configuration and rules are loaded:
```toml
[projects."c:/code/pilots/skills-by-devansh"]
trust_level = "trusted"  # or "untrusted"
```
