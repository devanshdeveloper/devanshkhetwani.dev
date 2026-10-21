<!--
Source: https://learn.chatgpt.com/docs/non-interactive-mode.md
Source: https://learn.chatgpt.com/docs/developer-commands.md
Fetched: 2026-10-21
-->

# Codex CLI Non-Interactive Mode (`codex exec`)

A complete reference for running Codex non-interactively in scripts, CI/CD pipelines, and automated agent workflows.

## Basic Syntax

```bash
codex exec [OPTIONS] [PROMPT]
codex e [OPTIONS] [PROMPT]  # Short alias
```

## Stream Behavior (stdout vs stderr)

- `stdout`: Emits **only the final agent response message**. This makes it clean and safe to pipe into files, downstream commands, or markdown formatters.
- `stderr`: Streams progress events, reasoning status, and logs while Codex runs.
- Exit status: Returns `0` on success, non-zero on failure.

```bash
codex exec "Summarize this repository and list 3 key components" > summary.md
```

## Safe Prompt Passing (Stdin & Files)

Passing prompts containing newlines, quotes, backticks, or variable characters (`$`, `\`, `"`, `'`) directly via command line flags can cause shell expansion errors. Use stdin or file piping to guarantee verbatim input:

### 1. Read Entire Prompt from Stdin with `-`
When `-` is passed as the prompt argument (or prompt argument is omitted while piping), Codex reads the entire instruction from stdin:

**Bash / Linux / macOS:**
```bash
cat prompt.txt | codex exec -
# or via heredoc / file descriptor:
codex exec - < prompt.txt
```

**PowerShell (Windows):**
```powershell
Get-Content -Raw -Encoding UTF8 prompt.txt | codex exec -
```

### 2. Prompt Instruction + Stdin Context
If a prompt argument is supplied *and* stdin is piped, Codex treats the argument as the instruction and appends stdin content inside a `<stdin>` context block:
```bash
npm test 2>&1 | codex exec "Diagnose failing tests and suggest minimal patch"
```

## Key Flags for Automation

| Flag | Purpose | Default |
| --- | --- | --- |
| `-s, --sandbox <MODE>` | Sandbox policy: `read-only`, `workspace-write`, `danger-full-access` | `read-only` |
| `-a, --ask-for-approval <POLICY>` | Approval policy: `on-request`, `never` | `on-request` |
| `--approve-for-me` | Route approvals through automatic review using workspace-write | Off |
| `-m, --model <MODEL>` | Model selection (`gpt-6.1-sol`, `gpt-6-luna`, `gpt-6-astra`) | Config default |
| `-C, --cd <DIR>` | Working directory for the execution | Current directory |
| `--add-dir <DIR>` | Grant write access to additional directory | None |
| `--json` | Stream all lifecycle events as JSON Lines (JSONL) on `stdout` | Off |
| `-o, --output-last-message <FILE>` | Write final agent response to specified file | None |
| `--output-schema <SCHEMA.json>` | Force final response to conform to JSON Schema | None |
| `--ephemeral` | Run without saving session files or history to disk | Off |
| `--skip-git-repo-check` | Allow running outside a Git repository | Off |
| `--worktree` | Execute session inside a temporary Git worktree | Off |
| `--ignore-user-config` | Do not load `~/.codex/config.toml` | Off |
| `--ignore-rules` | Do not load `.rules` files | Off |

## Structured JSONL Stream (`--json`)

When `--json` is enabled, `stdout` produces newline-delimited JSON objects:
- Event types: `thread.started`, `turn.started`, `item.started`, `item.completed`, `turn.completed`, `turn.failed`, `error`.
- Item types: `agent_message`, `reasoning`, `command_execution`, `file_change`, `mcp_tool_call`, `web_search`.

```bash
codex exec --json "Analyze repo dependencies" | jq .
```

## Resuming Non-Interactive Sessions

Non-interactive workflows can be chained across multiple commands using `resume`:
```bash
# Stage 1: Analyze
codex exec "Analyze race conditions in src/auth.ts"

# Stage 2: Fix based on previous analysis
codex exec resume --last "Apply the race condition fix"
```
Or target a specific session ID:
```bash
codex exec resume <SESSION_ID> "Verify the changes pass unit tests"
```

## Authentication in Automation

1. **ChatGPT Pro/Plus/Team/Enterprise Account (Local CLI):**
   Inherits credentials stored by `codex login`. No API keys required.
2. **API Key (CI / Headless Runner):**
   Pass `CODEX_API_KEY` inline for the invocation:
   ```bash
   CODEX_API_KEY=$KEY codex exec "Lint and fix files"
   ```
3. **Access Token:**
   Pass `CODEX_ACCESS_TOKEN` for trusted enterprise runners.
