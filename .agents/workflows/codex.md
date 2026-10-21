---
description: Run my exact prompt through Codex CLI in the terminal.
---

# `/codex` Workflow

Run the user's prompt through OpenAI Codex CLI (`codex exec`) non-interactively in the workspace root without modification, using safe piping and verified defaults.

## Execution Procedure

When invoked as `/codex <prompt>`:

### 1. Extract Prompt Verbatim
- Capture everything following `/codex ` as the raw prompt.
- **NEVER** rewrite, summarize, rephrase, expand, translate, or modify the prompt in any way.
- If the prompt is empty, ask the user for the prompt and stop execution immediately:
  > "Please provide a prompt to run through Codex: `/codex <your prompt>`"

### 2. Prepare Safe Stdin Execution
To prevent quotes, backticks, dollar signs (`$`), and newlines from corrupting or undergoing shell expansion:
- Write the exact prompt bytes to a temporary file in the local scratch/temp directory (e.g. `$env:TEMP\codex_prompt_<id>.txt` on Windows or `/tmp/codex_prompt_<id>.txt` on Unix).
- Stream the prompt into `codex exec -` using stdin.

**PowerShell (Windows):**
```powershell
Get-Content -Raw -Encoding UTF8 "$env:TEMP\codex_prompt.txt" | codex exec -
```

**Bash / Zsh (macOS / Linux):**
```bash
cat "/tmp/codex_prompt.txt" | codex exec -
```

### 3. Safety & Sandbox Constraints
- Execute from the current workspace root.
- Use default sandbox (`read-only` for non-interactive `exec`) and default approval settings (`on-request`).
- **NEVER** add flags that bypass approvals or sandboxing (such as `--dangerously-bypass-approvals-and-sandbox`, `--sandbox danger-full-access`, or `--dangerously-bypass-hook-trust`) unless the user explicitly requested them in their prompt.
- If the user prompt specifically instructs Codex to edit, create, or refactor files, include `--sandbox workspace-write` only if the user explicitly requested file modifications.
- **Do not modify any project files directly.** All edits must be performed strictly by Codex.

### 4. Report Execution Results
After the command completes, present a clear, structured summary containing:
1. **Command Executed:** Show the exact command and the verbatim prompt passed to Codex.
2. **Exit Status:** Exit code (`0` for success or non-zero).
3. **Codex Output:** The final agent message returned by Codex on `stdout`.
4. **Git Repository Status:**
   - Run `git status --short` to show any modified or untracked files.
   - Run `git diff --stat` to show lines added/removed.
5. Clean up the temporary prompt file.

### 5. Failure Handling & Triage
If Codex exits with a non-zero status or error:
- Display the exact stderr/error message.
- Consult [.agents/skills/codex-cli/references/troubleshooting.md](.agents/skills/codex-cli/references/troubleshooting.md).
- Suggest exactly **one** concrete fix based on verified failure modes:
  - *Authentication:* Run `codex login`.
  - *Sandboxing:* Check Windows MXC status with `codex -c windows.sandbox=mxc sandbox ...` or install `bubblewrap` on Linux.
  - *Model/Setting deprecation:* Verify model in `~/.codex/config.toml` is not retired `gpt-5.5` and approval policy is not retired `untrusted`.
  - *Git repository:* Initialize git repository or add `--skip-git-repo-check`.
- **NEVER** automatically retry with weaker safety settings or bypassed sandboxes.
