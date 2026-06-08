# ReAction Catalog

Browse the currently available ReActions.

A ReAction is an executable Markdown recipe for coding agents. Each ReAction defines the task, required capabilities, safety rules, pause conditions, verification steps, and final report format.

## At a glance

| Pack | Count | Best for |
|---|---:|---|
| Frontend / Buttons | 8 | Adding verified, accessible frontend button patterns. |
| DevTools / Vercel | 4 | Checking Vercel analytics, usage, deployments, and logs through read-only CLI workflows. |

## How to use a ReAction

Copy a trigger into your coding agent:

```txt
Use /ReAction-verified-async-cta-button-green.

Task:
Add a "Create Project" button to the hero action area.

Important:
- Follow the ReAction phases.
- Pause if required information is missing.
- Verify before claiming success.
- Return the final report.
```

## Frontend / Buttons

Use these ReActions when you want an agent to add or modify frontend button patterns with accessibility and browser verification.

| Name                                    | Trigger                                             | File                                                                                                                                       | Use when                                                                                                                              | Verification                   |
| --------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Verified Async CTA Button Green         | `/ReAction-verified-async-cta-button-green`         | [`verified-async-cta-button-green.reaction.md`](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md)                 | You need a primary async action such as create, save, deploy, generate, continue, or start.                                           | Browser verification required. |
| Verified Secondary Button Neutral       | `/ReAction-verified-secondary-button-neutral`       | [`verified-secondary-button-neutral.reaction.md`](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md)             | You need a lower-emphasis action such as cancel, back, learn more, skip, or dismiss.                                                  | Browser verification required. |
| Verified Destructive Confirm Button Red | `/ReAction-verified-destructive-confirm-button-red` | [`verified-destructive-confirm-button-red.reaction.md`](../reactions/frontend/buttons/verified-destructive-confirm-button-red.reaction.md) | You need a dangerous action such as delete, remove, revoke, reset, archive, or cancel subscription.                                   | Browser verification required. |
| Verified Copy Button Neutral            | `/ReAction-verified-copy-button-neutral`            | [`verified-copy-button-neutral.reaction.md`](../reactions/frontend/buttons/verified-copy-button-neutral.reaction.md)                       | You need to copy an API key, invite link, command, code snippet, webhook URL, or share link.                                          | Browser verification required. |
| Verified Icon Button Neutral            | `/ReAction-verified-icon-button-neutral`            | [`verified-icon-button-neutral.reaction.md`](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md)                       | You need a compact icon-only or icon-first action such as settings, search, close, menu, edit, refresh, or more actions.              | Browser verification required. |
| Verified Toggle Button Green            | `/ReAction-verified-toggle-button-green`            | [`verified-toggle-button-green.reaction.md`](../reactions/frontend/buttons/verified-toggle-button-green.reaction.md)                       | You need a stateful on/off action such as notifications, dark mode, auto-save, favorite, publish, or enable integration.              | Browser verification required. |
| Verified Floating Action Button Green   | `/ReAction-verified-floating-action-button-green`   | [`verified-floating-action-button-green.reaction.md`](../reactions/frontend/buttons/verified-floating-action-button-green.reaction.md)     | You need a prominent floating quick action such as create, add item, compose, quick add, or new task.                                 | Browser verification required. |
| Verified Split Button Menu              | `/ReAction-verified-split-button-menu`              | [`verified-split-button-menu.reaction.md`](../reactions/frontend/buttons/verified-split-button-menu.reaction.md)                           | You need a primary action with related secondary menu actions such as export formats, save options, deploy targets, or share actions. | Browser verification required. |

Pack guide:

* [Frontend Button ReActions README](../reactions/frontend/buttons/README.md)

## DevTools / Vercel

Use these ReActions when you want an agent to inspect Vercel data using CLI-only, read-only workflows.

| Name                           | Trigger                                    | File                                                                                                                    | Use when                                                                                                            | Safety                                                    |
| ------------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Check Vercel Analytics         | `/ReAction-check-vercel-analytics`         | [`check-vercel-analytics.reaction.md`](../reactions/devtools/vercel/check-vercel-analytics.reaction.md)                 | You want Web Analytics-style reporting through CLI-only local capabilities or a project-provided analytics adapter. | Read-only. Stops if no analytics adapter exists.          |
| Check Vercel Usage             | `/ReAction-check-vercel-usage`             | [`check-vercel-usage.reaction.md`](../reactions/devtools/vercel/check-vercel-usage.reaction.md)                         | You want billing/resource usage and cost reporting through the official `vercel usage` CLI command.                 | Read-only. Does not check Web Analytics.                  |
| Check Vercel Deployment Status | `/ReAction-check-vercel-deployment-status` | [`check-vercel-deployment-status.reaction.md`](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) | You want recent deployment status and health through Vercel CLI commands.                                           | Read-only. Does not deploy, promote, rollback, or remove. |
| Check Vercel Error Logs        | `/ReAction-check-vercel-error-logs`        | [`check-vercel-error-logs.reaction.md`](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md)               | You want bounded runtime/error log diagnosis with secret redaction.                                                 | Read-only. Redacts sensitive values.                      |

Pack guide:

* [Vercel ReActions README](../reactions/devtools/vercel/README.md)

## Source of truth

The machine-readable index is:

```txt
reactions.json
```

When adding a new ReAction:

1. Add the `.reaction.md` file.
2. Add it to `reactions.json`.
3. Add it to this catalog.
4. Update the relevant pack README.
5. Run the validator.

## Catalog maintenance note

Future ReActions must be added to both `reactions.json` and this catalog to ensure discoverability and index synchronization.

## Validate

```bash
node scripts/validate-reactions-index.mjs
```
