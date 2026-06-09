# Cline ReActions

This folder contains executable recipes for Cline CLI setup, operations, permissions, MCP, rules, hooks, plugins, skills, and safety workflows.

Cline can read files, edit files, run terminal commands, use MCP servers, use hooks/plugins/skills, and run headless automation, so Cline ReActions must be safety-aware by default.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Setup Cline CLI First Run | `/ReAction-setup-cline-cli-first-run` | You want to safely guide a first-time Cline CLI setup through Node/npm checks, install planning, authentication, TUI verification, first-task verification, and security reminders. |

## Recommended first-run flow

1. Use `/ReAction-setup-cline-cli-first-run`.
2. Verify interactive TUI first.
3. Verify account/provider/model.
4. Run one safe non-mutating first task.
5. Run a CLI health check.
6. Review permissions and auto-approve settings.
7. Configure MCP, hooks, plugins, skills, cron, or headless automation only after base CLI works.

## Safety defaults

Cline ReActions should:

- keep interactive TUI first
- keep auto-approve all off by default
- avoid headless automation by default
- avoid MCP setup by default
- avoid hooks by default
- avoid plugins by default
- avoid skill installs by default
- avoid cron/scheduling by default
- avoid printing secrets
- avoid printing full config
- protect `~/.cline/`
- protect `~/.cline/data/settings/providers.json`
- protect MCP settings and session data
- protect project `.cline/` files that contain sensitive rules or executable behavior
- review hooks/plugins like executable code

## Future Cline ReActions

Possible future additions:

- `/ReAction-check-cline-cli-health`
- `/ReAction-review-cline-permissions-and-auto-approve`
- `/ReAction-setup-cline-project-rules`
- `/ReAction-check-cline-mcp-config`
- `/ReAction-review-cline-hooks-and-plugins`
- `/ReAction-setup-cline-headless-task-safely`
- `/ReAction-create-cline-safe-task-plan`
- `/ReAction-review-cline-session-before-commit`
