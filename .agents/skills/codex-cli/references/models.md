<!--
Source: https://learn.chatgpt.com/docs/models.md
Source: https://learn.chatgpt.com/docs/model-selection.md
Source: https://learn.chatgpt.com/docs/agent-configuration/speed.md
Fetched: 2026-10-21
-->

# Codex Models & Model Selection Reference

Supported AI models, reasoning effort settings, and execution tiers for OpenAI Codex CLI and ChatGPT Work.

## Active Model Catalog

| Model ID | Public Name | Strengths & Primary Use Case | Supported Tiers |
| --- | --- | --- | --- |
| `gpt-6.1-sol` | **GPT-6.1 Sol** | **Recommended for complex coding & agentic loops.** Near-Astra performance at lower cost and higher speed. Best for refactoring, features, and multi-file tasks. | Plus, Pro, Business, Enterprise, Edu |
| `gpt-6-luna` | **GPT-6 Luna** | **Most efficient model.** Optimized for focused coding, high-volume tasks, extraction, documentation, and summarization. | All plans (Free, Go, Plus, Pro, Enterprise) |
| `gpt-6-astra` | **GPT-6 Astra** | **Flagship intelligence.** Most capable for extremely difficult reasoning, autonomous research, and computer use. | Pro ($500), Enterprise, Edu |

### Retired Models
- **`gpt-5.5`**: Retired on **October 14, 2026** for ChatGPT-authenticated sessions. Scripts or configs referencing `gpt-5.5` must be updated to `gpt-6.1-sol` or `gpt-6-luna`.
- Retained during rollout: `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna` remain accessible for legacy compatibility.

## Selecting Models in Codex CLI

### 1. Command-Line Flag (`-m, --model`)
```bash
# Interactive session with GPT-6.1 Sol
codex -m gpt-6.1-sol

# Non-interactive execution with GPT-6 Luna
codex exec -m gpt-6-luna "Generate TypeScript interfaces from schema"
```

### 2. Interactive TUI Slash Command (`/model`)
Type `/model` in the chat composer to open the model picker and select an available model or reasoning effort.

### 3. Persistent Default in `~/.codex/config.toml`
```toml
model = "gpt-6.1-sol"
review_model = "gpt-6.1-sol"
```

## Reasoning Effort & Execution Modes

- **Reasoning Effort:** Can be adjusted in the TUI (`/reasoning` or inside `/model`). Higher effort allocates more reasoning tokens for architectural planning and difficult bug triage.
- **Ultra Mode:** Spawns coordinated subagents to parallelize deep investigations and multi-file refactoring.
- **Fast / Ultrafast Mode:** Toggled with `/fast` in the TUI or configured via plan tiers to decrease time-to-first-token on eligible plans.
