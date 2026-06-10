# OpenClaw Peekaboo ReActions

This folder contains ReActions for Peekaboo as an OpenClaw ecosystem Native Tool.

Peekaboo is a macOS CLI + MCP server for screenshots, UI inspection, and clicks.

These ReActions are normal executable recipes, not Responsibility ReActions.

They help agents safely install, verify, inspect, and use Peekaboo while protecting screenshots, secrets, accessibility data, MCP configs, and desktop UI state.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Setup OpenClaw Peekaboo First Run | `/ReAction-setup-openclaw-peekaboo-first-run` | You want to safely guide first-time Peekaboo setup through install planning, permission checks, first screenshot verification, first UI inspection verification, optional MCP planning, and security reminders. |
| Check OpenClaw Peekaboo Permissions Health | `/ReAction-check-openclaw-peekaboo-permissions-health` | You want to check Screen Recording, Accessibility, Event Synthesizing, Bridge/local source differences, and readiness for screenshots, UI inspection, OpenClaw subprocess use, MCP, and future automation. |
| Run OpenClaw Peekaboo UI Capture Smoke Test | `/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test` | You want to safely verify Peekaboo screenshots and UI inspection using a user-approved non-private window, without clicking, typing, running agents, or editing MCP config. |
| Check OpenClaw Peekaboo MCP Health | `/ReAction-check-openclaw-peekaboo-mcp-health` | You want to verify Peekaboo MCP readiness, stdio launch config, npm/local-binary client setup, permissions, tool exposure, and redacted environment/config safety. |
| Setup OpenClaw Peekaboo MCP Client | `/ReAction-setup-openclaw-peekaboo-mcp-client` | You want to safely configure an MCP client to launch Peekaboo over stdio using the official npm or local-binary config shape, with config backups, redaction, and confirmation gates. |

## Recommended first-run flow

1. Use `/ReAction-setup-openclaw-peekaboo-first-run`.
2. Use `/ReAction-check-openclaw-peekaboo-permissions-health`.
3. Use `/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test`.
4. Use `/ReAction-check-openclaw-peekaboo-mcp-health`.
5. Use `/ReAction-setup-openclaw-peekaboo-mcp-client`.
6. Use `/ReAction-audit-openclaw-peekaboo-automation-safety` before click/type/agent automation.

## Safety defaults

Peekaboo ReActions should:

- treat Peekaboo as a powerful local desktop-control tool
- stay macOS-aware
- avoid screenshots of private screens
- avoid dumping full accessibility trees
- avoid printing secrets
- avoid printing full config
- avoid clicking or typing by default
- avoid actual agent actions by default
- prefer observation before action
- prefer element IDs over labels and coordinates
- use coordinates only as last resort
- require explicit confirmation before MCP config edits
- require explicit confirmation before UI mutation

## Future Peekaboo ReActions

Possible future additions:

- `/ReAction-run-openclaw-peekaboo-safe-click-type-smoke-test`
- `/ReAction-debug-openclaw-peekaboo-element-not-found`
- `/ReAction-check-openclaw-peekaboo-config-and-secrets`
- `/ReAction-check-openclaw-peekaboo-ai-provider-health`
- `/ReAction-run-openclaw-peekaboo-agent-dry-run`
- `/ReAction-check-openclaw-peekaboo-session-resume`
- `/ReAction-debug-openclaw-peekaboo-performance`
- `/ReAction-audit-openclaw-peekaboo-automation-safety`
