# Frankenreview

Agentic code review and research CLI using Gemini through Chrome. Entry points:
`fr` and `frankenreview`.

## Prerequisites

Browser commands require a remote-debugging Chrome session logged into Google AI
Studio. Start one with `fr --start-chrome`. Local commands below need no Chrome.

## Review and chat

    fr -r -m pro --prompt audit --output review.md
    fr -r --json --continue
    fr --open-chat --attach report.txt --prompt "Summarize"
    fr --deep-scan --cycles 3
    fr --research --prompt topic.md --output findings.md
    fr --planner --prompt plan.md
    fr --consolidation

Common review flags: `--path`, `--output`, `--model`/`-m`, `--prompt`,
`--attach`, `--thinking-level`, `--continue`, `--continue-new`, `--json`,
`--prune-changelogs`, and `--verbose`.

## Local repository commands

    fr --dump --path .
    fr --token-eaters
    fr --token-tree
    fr -t                         # token-eaters + token-tree
    fr --self-check [--json]
    fr --secrets

## Config, pruning, and models

    fr -i                         # create .frankenreview/config.yaml & SKILL.md
    fr -gi                        # generate/merge curated .gitignore
    fr --edit-config             # edit effective config ($EDITOR or nano)
    fr --prune-list
    fr --prune-add-dir node_modules
    fr --available-models | fr --fetch-models

`--init` refreshes generated `SKILL.md`, then copies/merges default settings
into the project-local config. Existing config entries are preserved; missing
defaults are added. Edit config directly when acting as an agent, or use
`--edit-config`; keep valid YAML and run `fr --self-check` after changes.
Browser maintenance:
`fr -ds --port 9222` verifies live AI Studio selectors and opens a dedicated
chat, exercises the temporary-chat toggle, sends a deterministic thinking-mode
math prompt through production actions, checks dynamic controls without rerun
or model failover, and cleans up the saved test chat. Temporary chats do not expose Delete
Prompt, so delete-flow validation requires saved-chat mode. Run `fr --help`
for every flag.

Agent loop: `--self-check` → prune/dump → review → read `.frankenreview/review.md`
→ iterate with `-r --continue` → clean up with `--delete-chat`.
