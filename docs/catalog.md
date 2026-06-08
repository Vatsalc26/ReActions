# ReAction Catalog

A ReAction is an executable recipe for coding agents.

This catalog lists the currently available ReActions.

## Frontend / Buttons

| ReAction | Trigger | Purpose |
|---|---|---|
| Verified Async CTA Button Green | `/ReAction-verified-async-cta-button-green` | Add a verified async primary CTA button with loading, success feedback, accessibility, and browser verification. |
| Verified Secondary Button Neutral | `/ReAction-verified-secondary-button-neutral` | Add a lower-emphasis secondary button for cancel, back, skip, learn more, or dismiss actions. |
| Verified Destructive Confirm Button Red | `/ReAction-verified-destructive-confirm-button-red` | Add a destructive red button with mandatory confirmation, cancel path, confirm path, and browser verification. |
| Verified Copy Button Neutral | `/ReAction-verified-copy-button-neutral` | Add a copy-to-clipboard button with copied feedback, failure handling, and accessibility. |
| Verified Icon Button Neutral | `/ReAction-verified-icon-button-neutral` | Add an accessible icon button for settings, search, close, menu, edit, refresh, or more actions. |
| Verified Toggle Button Green | `/ReAction-verified-toggle-button-green` | Add a stateful on/off toggle button with aria-pressed semantics and browser verification. |
| Verified Floating Action Button Green | `/ReAction-verified-floating-action-button-green` | Add a prominent floating quick action button with safe placement and accessibility. |
| Verified Split Button Menu | `/ReAction-verified-split-button-menu` | Add a split button with primary action, menu trigger, secondary actions, and keyboard/menu behavior. |

## DevTools / Vercel

| ReAction | Trigger | Purpose |
|---|---|---|
| Check Vercel Analytics | `/ReAction-check-vercel-analytics` | Check Vercel Web Analytics-style data through CLI-only local capabilities or a project-provided analytics adapter. |
| Check Vercel Usage | `/ReAction-check-vercel-usage` | Check Vercel billing/resource usage and costs through the official `vercel usage` CLI command. |
| Check Vercel Deployment Status | `/ReAction-check-vercel-deployment-status` | Check recent deployment status and health through read-only Vercel CLI commands. |
| Check Vercel Error Logs | `/ReAction-check-vercel-error-logs` | Check bounded Vercel runtime/error logs and produce a redacted diagnosis report. |

## Pack READMEs

- [Frontend Button ReActions](../reactions/frontend/buttons/README.md)
- [Vercel ReActions](../reactions/devtools/vercel/README.md)
