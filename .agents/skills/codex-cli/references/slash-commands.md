<!--
Source: https://learn.chatgpt.com/docs/reference/slash-commands.md
Source: https://learn.chatgpt.com/docs/developer-commands.md
Fetched: 2026-10-21
-->

# Codex CLI Slash Commands & Interactive Controls

Interactive controls and slash commands available in the Codex Terminal User Interface (TUI).

## Using Slash Commands

In the interactive TUI composer:
1. Type `/` to open the slash command popup menu.
2. Filter by typing the command name (e.g., `/model`, `/status`).
3. Press `Tab` while Codex is running to queue a slash command or follow-up prompt for the next turn.

## Complete Slash Commands Reference

| Slash Command | Description |
| --- | --- |
| `/permissions` | Change what Codex can do without asking (e.g. switch between Auto and Read Only) |
| `/model` | Choose active model (`gpt-6.1-sol`, `gpt-6-luna`, `gpt-6-astra`) and reasoning effort |
| `/fast` | Toggle model Fast tier on/off when available |
| `/plan` | Switch to plan mode to design execution steps before implementing |
| `/goal` | Set, edit, pause, resume, view, or clear a persistent task goal |
| `/review` | Review uncommitted changes or compare against a base branch |
| `/diff` | Show Git diff, including newly created untracked files |
| `/compact` | Compact/summarize the current chat transcript to free context tokens |
| `/copy` | Copy latest completed Codex response text to clipboard (shortcut: `Ctrl+O`) |
| `/status` | Display session ID, active model, approval policy, writable roots, and token limits |
| `/usage` | View ChatGPT account daily, weekly, or cumulative token usage and rate limits |
| `/skills` | Browse, inspect, and invoke local agent skills (can also type `$`) |
| `/mcp` | List active MCP tools and servers (add `verbose` for detailed server info) |
| `/plugins` | Browse installed and discoverable plugins |
| `/hooks` | Inspect, trust, or disable lifecycle hooks |
| `/init` | Generate an `AGENTS.md` scaffold in current working directory |
| `/clear` | Clear terminal screen and reset chat context |
| `/new` | Start a fresh chat inside the same local workspace |
| `/resume` | Resume a saved chat from session history |
| `/fork` | Fork current session into a new chat or Git worktree |
| `/archive` | Archive current session to remove from active picker |
| `/delete` | Permanently delete current session transcript |
| `/rename` | Rename current chat session |
| `/export` | Export conversation as Markdown to file or clipboard |
| `/recap` | Generate a quick summary of current conversation without compacting context |
| `/cd` | Change session working directory |
| `/pwd`, `/cwd` | Print current session working directory |
| `/worktree` | Start or continue chat in a managed Git worktree |
| `/ps` | Show running background terminal processes and recent output |
| `/stop` | Stop all background terminal processes started by session |
| `/app` | Transfer active CLI chat to ChatGPT Desktop App (macOS/Windows) |
| `/side`, `/btw` | Open ephemeral side chat without polluting main transcript |
| `/raw` | Toggle raw scrollback formatting for easier copying |
| `/tui` | Choose between scrollback or fullscreen transcript mode for next launch |
| `/theme` | Preview and choose syntax-highlighting theme |
| `/statusline` | Customize and reorder footer status indicators |
| `/title` | Customize terminal tab/window title items |
| `/vim` | Toggle Vim navigation mode in composer |
| `/keymap` | View and customize keyboard shortcuts |
| `/mention` | Attach a file or folder path to the chat (or type `@`) |
| `/approve` | Approve one retry of a denied action when automatic review is enabled |
| `/setup-default-sandbox` | Configure elevated Windows sandbox (Windows only) |
| `/import` | Import Cursor or Claude Code setup, projects, and chats |
| `/feedback` | Submit feedback and logs to Codex maintainers |
| `/logout` | Sign out and clear stored local credentials |
| `/quit`, `/exit` | Exit the interactive CLI session |

## Interactive Keyboard Shortcuts

- `@`: Search files in workspace and insert relative path.
- `$`: Browse and invoke an agent skill.
- `!`: Prefix a line to run a shell command directly under active sandbox/approvals.
- `Ctrl+R`: Search past prompt history.
- `Ctrl+O`: Copy last completed agent response to clipboard.
- `Tab`: Queue follow-up prompt or slash command while Codex is executing.
- `Enter`: Inject new instruction into currently executing turn.
- `Esc Esc`: Edit previous prompt and fork chat from that point.
- `Ctrl+C`: Interrupt active turn or exit.
