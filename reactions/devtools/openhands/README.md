# OpenHands ReActions

This folder contains executable recipes for OpenHands setup, operations, sandboxing, and safety workflows.

OpenHands can run coding agents with terminal access, file access, browser/UI access, Docker backends, MCP servers, cloud connections, and automations, so OpenHands ReActions must be safety-aware by default.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Setup OpenHands First Run | `/ReAction-setup-openhands-first-run` | You want to safely guide a first-time OpenHands setup through Agent Canvas or CLI install planning, provider setup, local verification, first-task verification, and security reminders. |

## Recommended first-run flow

1. Use `/ReAction-setup-openhands-first-run`.
2. Verify local Agent Canvas or CLI first.
3. Verify the first safe task.
4. Run a health check.
5. Check sandbox/public-mode safety.
6. Configure MCP servers or automations only after local setup works.

## Safety defaults

OpenHands ReActions should:

- keep setup local-first
- avoid public mode by default
- avoid binding to all interfaces by default
- avoid `--always-approve` by default
- avoid broad filesystem mounts
- avoid MCP setup by default
- avoid automations by default
- avoid printing secrets
- avoid printing full config
- protect `~/.openhands`
- protect provider API keys
- protect `LOCAL_BACKEND_API_KEY`
- protect `OH_SECRET_KEY`
- use official UI/CLI setup flows for secrets

## Future OpenHands ReActions

Possible future additions:

- `/ReAction-check-openhands-agent-health`
- `/ReAction-check-openhands-sandbox-config`
- `/ReAction-run-openhands-security-check`
- `/ReAction-setup-openhands-mcp-safely`
- `/ReAction-setup-openhands-github-pr-review-automation`
- `/ReAction-setup-openhands-local-backend`
- `/ReAction-diagnose-openhands-provider-config`
- `/ReAction-review-openhands-agent-task`
