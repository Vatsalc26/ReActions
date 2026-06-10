# OpenClaw ReActions

This folder contains executable recipes for OpenClaw setup, operations, and safety workflows.

OpenClaw can connect messaging channels, model providers, local tools, browser/control surfaces, and host capabilities, so OpenClaw ReActions must be safety-aware by default.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Setup OpenClaw First Run | `/ReAction-setup-openclaw-first-run` | You want to safely guide a first-time OpenClaw setup through install planning, onboarding, Gateway verification, dashboard verification, and first-run security reminders. |

## Ecosystem Native Tool ReActions

| Tool | ReAction | Trigger | Use when |
|---|---|---|---|
| Peekaboo | Setup OpenClaw Peekaboo First Run | `/ReAction-setup-openclaw-peekaboo-first-run` | You want to safely set up Peekaboo, the OpenClaw ecosystem macOS CLI + MCP tool for screenshots, UI inspection, and clicks. |
| Peekaboo | Check OpenClaw Peekaboo Permissions Health | `/ReAction-check-openclaw-peekaboo-permissions-health` | You want to check Peekaboo macOS permission readiness for screenshots, UI inspection, OpenClaw subprocess use, MCP, and future desktop automation. |
| Peekaboo | Run OpenClaw Peekaboo UI Capture Smoke Test | `/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test` | You want to safely verify screenshot capture and UI inspection with Peekaboo before any click/type/agent automation. |
| Peekaboo | Check OpenClaw Peekaboo MCP Health | `/ReAction-check-openclaw-peekaboo-mcp-health` | You want to verify Peekaboo MCP readiness, stdio transport, npm/local-binary client config, tool exposure, permissions, and redacted config safety. |


## Recommended first-run flow

1. Use `/ReAction-setup-openclaw-first-run`.
2. Verify the local Gateway and dashboard.
3. Run a security audit.
4. Connect one channel only after local dashboard chat works.
5. Keep remote access off until explicitly needed.

For Native Tools such as Peekaboo, verify the OpenClaw Gateway/dashboard separately from the tool. Peekaboo setup does not require OpenClaw Gateway to be running.


## Safety defaults

OpenClaw ReActions should:

- keep Gateway local by default
- avoid remote exposure by default
- avoid channel setup by default
- avoid printing secrets
- avoid printing full config
- avoid reset commands unless explicitly confirmed
- protect `~/.openclaw/openclaw.json`
- protect credentials and auth profiles
- prefer dashboard-first verification before channel setup

## Future OpenClaw ReActions

Possible future additions:

- `/ReAction-check-openclaw-gateway-health`
- `/ReAction-run-openclaw-security-audit`
- `/ReAction-setup-openclaw-telegram-channel`
- `/ReAction-check-openclaw-channel-policy`
- `/ReAction-check-openclaw-sandbox-config`
- `/ReAction-diagnose-openclaw-channel-connection`
- `/ReAction-create-openclaw-skill-safely`
- `/ReAction-audit-openclaw-peekaboo-automation-safety`
