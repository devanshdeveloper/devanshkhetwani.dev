<!--
Source: https://learn.chatgpt.com/docs/permission-modes.md
Source: https://learn.chatgpt.com/docs/permissions.md
Source: https://learn.chatgpt.com/docs/sandboxing.md
Source: https://learn.chatgpt.com/docs/agent-approvals-security.md
Source: https://learn.chatgpt.com/docs/windows/windows-sandbox.md
Source: https://learn.chatgpt.com/docs/windows/wsl.md
Fetched: 2026-10-21
-->

# Codex Permissions, Approvals & Sandboxing

How sandboxing, approval policies, and security controls interact across local and automated executions.

## Two-Layer Security Architecture

Codex controls security using two independent layers working in unison:
1. **Sandbox Mode (Technical Boundary):** Dictates what spawned processes are physically permitted to access (filesystem paths, network sockets).
2. **Approval Policy (Decision Flow):** Dictates when Codex must stop and ask a human for approval before performing an action or crossing boundaries.

## Sandbox Modes (`-s, --sandbox`)

| Mode | Behavior | Use Case |
| --- | --- | --- |
| `read-only` | Commands can read files but cannot modify files anywhere. Network is blocked by default. | Code review, repo analysis, default for `codex exec`. |
| `workspace-write` | Writes permitted only within the repository working directory (and any `--add-dir` directories). Network blocked by default. | Routine development, automated bugfixes, standard interactive mode. |
| `danger-full-access` | Unrestricted filesystem and system access. Bypasses OS sandboxing. | External isolated containers or CI VMs only. |

*Safety rule: To allow writes to secondary paths, prefer `--add-dir <DIR>` instead of switching to `danger-full-access`.*

## Approval Policies (`-a, --ask-for-approval`)

| Policy | Behavior |
| --- | --- |
| `on-request` | Model autonomously decides when to ask for user approval (e.g. before running potentially risky or out-of-boundary actions). |
| `never` | Never prompt the user. If an action fails or is blocked by sandbox, the error is immediately returned to the model. |

### Retired Setting Warning
> `approval_policy = "untrusted"` has been **RETIRED**. Configuring `untrusted` can cause Codex to fail to start. To run with strict read-only safety, use:
> ```toml
> sandbox_mode = "read-only"
> approval_policy = "on-request"
> ```

## Automatic Review (`--approve-for-me`)

When `--approve-for-me` is enabled, approvals that would normally prompt the user are routed through an automated reviewer agent within the `workspace-write` sandbox. If the reviewer denies an action, the denial can be retried in the interactive TUI using `/approve`.

## Platform-Specific Sandbox Implementations

### Windows (Native PowerShell)
Codex supports three sandbox models on Windows:
1. **`mxc` (Microsoft Execution Containers):** Recommended on Windows 11 (24H2 build 26100+ or 25H2 build 26200+). Uses native kernel process isolation without needing admin rights or firewall rules. Enable via:
   ```toml
   [features]
   prefer_mxc = true
   ```
   Or test via: `codex -c windows.sandbox=mxc sandbox --permission-profile :workspace -- cmd.exe /d /c echo MXC_OK`
2. **`elevated`:** Legacy fallback requiring administrator-approved setup via `/setup-default-sandbox`. Commands execute unprivileged.
3. **`unelevated`:** Legacy fallback without elevation. Has weaker network isolation and cannot deny specific read paths.

### Linux & WSL2
- Uses `bubblewrap` (`bwrap`) unprivileged namespaces.
- Requires `bubblewrap` package installed:
  ```bash
  sudo apt install bubblewrap   # Debian/Ubuntu
  sudo dnf install bubblewrap   # Fedora
  ```

### macOS
- Uses Apple Seatbelt framework out-of-the-box. Access to protected personal directories (Desktop, Downloads, Music) prompts native macOS permission dialogs.

## Network Access Controls

By default, command execution within the sandbox runs **offline** (no network access).
- Live web search in interactive mode is enabled separately via `--search` (uses Responses API, without giving the sandbox direct socket access).
- Commands needing outbound internet require either explicit human approval under `on-request` or a defined `.rules` policy.
