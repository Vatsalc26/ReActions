# Hermes Agent ReActions

This folder contains executable recipes for Hermes Agent setup, operations, and safety workflows.

Hermes Agent can connect local terminal tools, memory, skills, MCP servers, scheduled tasks, providers, and messaging gateways, so Hermes ReActions must be safety-aware by default.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Setup Hermes First Run | `/ReAction-setup-hermes-first-run` | You want to safely guide a first-time Hermes Agent setup through install planning, provider setup, first-chat verification, session verification, and security reminders. |
| Check Hermes Agent Health | `/ReAction-check-hermes-agent-health` | You want to run read-only Hermes diagnostics using `hermes doctor`, provider/model readiness, session checks, gateway status, and redacted security posture checks. |

## Recommended first-run flow

1. Use `/ReAction-setup-hermes-first-run`.
2. Verify a local CLI/TUI chat.
3. Use `/ReAction-check-hermes-agent-health`.
4. Verify `hermes --continue` only when safe/confirmed.
5. Run a security audit if secrets, approvals, gateways, cron, MCP, skills, or remote backends need deeper review.
6. Configure gateway, cron, skills, MCP, or remote backends only after local chat works.

## Safety defaults

Hermes ReActions should:

- keep local CLI/TUI first
- keep approval prompts enabled
- avoid YOLO mode by default
- avoid gateway setup by default
- avoid cron setup by default
- avoid skill installs by default
- avoid MCP setup by default
- avoid remote terminal backends by default
- avoid printing secrets
- avoid printing full config
- protect `~/.hermes/.env`
- protect `~/.hermes/config.yaml`
- protect auth/session/memory files
- prefer provider setup through official Hermes CLI/OAuth flows

## Future Hermes ReActions

Possible future additions:

- `/ReAction-run-hermes-security-audit`
- `/ReAction-setup-hermes-gateway-safely`
- `/ReAction-check-hermes-provider-config`
- `/ReAction-setup-hermes-skills-safely`
- `/ReAction-check-hermes-mcp-config`
- `/ReAction-check-hermes-cron-safety`
- `/ReAction-migrate-openclaw-to-hermes`
