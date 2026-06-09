# OpenClaw ReActions

This folder contains executable recipes for OpenClaw setup, operations, and safety workflows.

OpenClaw can connect messaging channels, model providers, local tools, browser/control surfaces, and host capabilities, so OpenClaw ReActions must be safety-aware by default.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Setup OpenClaw First Run | `/ReAction-setup-openclaw-first-run` | You want to safely guide a first-time OpenClaw setup through install planning, onboarding, Gateway verification, dashboard verification, and first-run security reminders. |

## Recommended first-run flow

1. Use `/ReAction-setup-openclaw-first-run`.
2. Verify the local Gateway and dashboard.
3. Run a security audit.
4. Connect one channel only after local dashboard chat works.
5. Keep remote access off until explicitly needed.

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
