<!--
Source: https://learn.chatgpt.com/docs/reference/troubleshooting.md
Source: https://learn.chatgpt.com/docs/windows/windows-sandbox.md
Source: https://learn.chatgpt.com/docs/windows/wsl.md
Fetched: 2026-10-21
-->

# Codex Troubleshooting & Diagnostic Guide

Solutions for common operational errors, sandboxing blocks, authentication issues, and diagnostic workflows.

## Diagnostic Commands

When investigating unexpected behavior, use the built-in diagnostic tools first:
- `codex doctor`: Verifies installation integrity, credentials, Git status, terminal support, and background daemon health.
- `codex login status`: Checks authentication status without starting an interactive session (returns `0` if authenticated).
- `codex debug models`: Dumps model catalog visible to the client.
- `codex debug prompt-input`: Prints loaded instruction files (`AGENTS.md`, overrides) as JSON.

## Common Failures & Verified Fixes

### 1. Authentication & Session Errors
- **Symptom:** `Unauthorized`, expired token, or prompt to sign in.
- **Fix:** Run `codex login`. On headless/remote machines, run `codex login --device-auth`. To reset corrupt credentials, run `codex logout` followed by `codex login`.

### 2. "Model not found" or "gpt-5.5 retired"
- **Symptom:** Model error referencing `gpt-5.5`.
- **Cause:** `gpt-5.5` was officially retired on October 14, 2026 for ChatGPT-authenticated sessions.
- **Fix:** Update `model` in `~/.codex/config.toml` or pass `-m gpt-6.1-sol` (or `-m gpt-6-luna`).

### 3. "approval_policy = 'untrusted' is unsupported"
- **Symptom:** Codex fails to launch with an error citing `untrusted`.
- **Cause:** The `untrusted` approval policy has been retired.
- **Fix:** Remove `approval_policy = "untrusted"` from `config.toml`. Use `sandbox_mode = "read-only"` and `approval_policy = "on-request"`.

### 4. "Git repository required" in `codex exec`
- **Symptom:** `codex exec` exits immediately complaining that the directory is not a Git repo.
- **Cause:** By default, non-interactive mode requires a Git repository to prevent untracked file destruction.
- **Fix:** Initialize a Git repository (`git init`) or pass `--skip-git-repo-check`.

### 5. Windows Sandbox Failures
- **Symptom:** Command execution blocked or sandboxing fails to initialize on Windows.
- **Fix:**
  - On Windows 11 (build 26100+), verify Microsoft Execution Containers (MXC):
    ```powershell
    codex -c windows.sandbox=mxc sandbox --permission-profile :workspace -- cmd.exe /d /c echo MXC_OK
    ```
  - If MXC is unavailable, configure the elevated legacy sandbox via `/setup-default-sandbox` or set fallback in `config.toml`:
    ```toml
    [windows]
    sandbox = "elevated"
    ```

### 6. Linux / WSL2 Sandbox Errors (`bwrap: No such file or directory`)
- **Symptom:** Command sandboxing fails on Linux or WSL2.
- **Cause:** Missing `bubblewrap` package.
- **Fix:** Install `bubblewrap`:
  ```bash
  sudo apt install bubblewrap   # Ubuntu / Debian / WSL2
  sudo dnf install bubblewrap   # Fedora
  ```

### 7. Lifecycle Hook Blocked / "Hooks require review"
- **Symptom:** Codex prints startup warnings about untrusted hooks.
- **Fix:** Open an interactive session and run `/hooks` to inspect and trust changed hooks. In automation, pass `--dangerously-bypass-hook-trust` if sources are verified.

### 8. File Edit Blocked in Non-Interactive Mode
- **Symptom:** `codex exec` reports write permission denied.
- **Cause:** `codex exec` defaults to a `read-only` sandbox.
- **Fix:** Pass `--sandbox workspace-write` (or `--approve-for-me` for automatic review).
