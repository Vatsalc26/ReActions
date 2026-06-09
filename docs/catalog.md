# ReAction Catalog

Browse executable recipes for coding agents.

A ReAction is a Markdown-defined recipe that tells an AI coding agent how to complete, verify, and report a reusable task.

## At a glance

| Pack | Count | Best for |
|---|---:|---|
| Frontend / Buttons | 8 | Verified, accessible frontend button patterns. |
| DevTools / Vercel | 4 | Read-only Vercel analytics, usage, deployment, and log checks. |
| DevTools / Bun | 1 | Bun runtime, package-manager, test, and build health checks. |

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

## Full catalog

| ReAction | Trigger | Difficulty | Frameworks / platforms | Verification | Related |
|---|---|---|---|---|---|
| [Verified Async CTA Button Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md) | `/ReAction-verified-async-cta-button-green` | intermediate | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md), [Split Button Menu](../reactions/frontend/buttons/verified-split-button-menu.reaction.md), [Destructive Confirm Red](../reactions/frontend/buttons/verified-destructive-confirm-button-red.reaction.md) |
| [Verified Secondary Button Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md) | `/ReAction-verified-secondary-button-neutral` | beginner | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Async CTA Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md), [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) |
| [Verified Destructive Confirm Button Red](../reactions/frontend/buttons/verified-destructive-confirm-button-red.reaction.md) | `/ReAction-verified-destructive-confirm-button-red` | advanced | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md), [Async CTA Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md) |
| [Verified Copy Button Neutral](../reactions/frontend/buttons/verified-copy-button-neutral.reaction.md) | `/ReAction-verified-copy-button-neutral` | intermediate | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md), [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md) |
| [Verified Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) | `/ReAction-verified-icon-button-neutral` | intermediate | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Copy Button Neutral](../reactions/frontend/buttons/verified-copy-button-neutral.reaction.md), [Toggle Button Green](../reactions/frontend/buttons/verified-toggle-button-green.reaction.md), [Split Button Menu](../reactions/frontend/buttons/verified-split-button-menu.reaction.md) |
| [Verified Toggle Button Green](../reactions/frontend/buttons/verified-toggle-button-green.reaction.md) | `/ReAction-verified-toggle-button-green` | intermediate | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md), [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md) |
| [Verified Floating Action Button Green](../reactions/frontend/buttons/verified-floating-action-button-green.reaction.md) | `/ReAction-verified-floating-action-button-green` | advanced | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Async CTA Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md), [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) |
| [Verified Split Button Menu](../reactions/frontend/buttons/verified-split-button-menu.reaction.md) | `/ReAction-verified-split-button-menu` | advanced | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Async CTA Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md), [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md), [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) |
| [Check Vercel Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md) | `/ReAction-check-vercel-analytics` | advanced | Vercel, Next.js, React, Vite, SvelteKit, Nuxt, Astro, Remix | terminal, static | [Usage](../reactions/devtools/vercel/check-vercel-usage.reaction.md), [Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) |
| [Check Vercel Usage](../reactions/devtools/vercel/check-vercel-usage.reaction.md) | `/ReAction-check-vercel-usage` | intermediate | Vercel, Next.js, React, Vite, SvelteKit, Nuxt, Astro, Remix | terminal, static | [Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md), [Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) |
| [Check Vercel Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) | `/ReAction-check-vercel-deployment-status` | intermediate | Vercel, Next.js, React, Vite, SvelteKit, Nuxt, Astro, Remix | terminal, static | [Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md), [Usage](../reactions/devtools/vercel/check-vercel-usage.reaction.md), [Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md) |
| [Check Vercel Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md) | `/ReAction-check-vercel-error-logs` | advanced | Vercel, Next.js, React, Vite, SvelteKit, Nuxt, Astro, Remix | terminal, static, redaction | [Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md), [Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md) |
| [Check Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md) | `/ReAction-check-bun-project-health` | intermediate | Bun, JavaScript, TypeScript, Node.js, React, Next.js, Vite, SvelteKit, Nuxt, Astro, Remix | static, terminal | [Vercel Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md), [Vercel Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md) |

## Frontend / Buttons

Use these ReActions when you want an agent to add or modify frontend button patterns with accessibility and browser verification.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Verified Async CTA Button Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md) | intermediate | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, cta, async, loading-state, success-state |
| [Verified Secondary Button Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md) | beginner | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, secondary, neutral, accessibility |
| [Verified Destructive Confirm Button Red](../reactions/frontend/buttons/verified-destructive-confirm-button-red.reaction.md) | advanced | high | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, destructive, confirmation, danger-zone |
| [Verified Copy Button Neutral](../reactions/frontend/buttons/verified-copy-button-neutral.reaction.md) | intermediate | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, copy, clipboard, feedback |
| [Verified Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) | intermediate | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, icon-button, aria-label, keyboard |
| [Verified Toggle Button Green](../reactions/frontend/buttons/verified-toggle-button-green.reaction.md) | intermediate | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, toggle, stateful, aria-pressed |
| [Verified Floating Action Button Green](../reactions/frontend/buttons/verified-floating-action-button-green.reaction.md) | advanced | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, floating-action-button, fab, responsive |
| [Verified Split Button Menu](../reactions/frontend/buttons/verified-split-button-menu.reaction.md) | advanced | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, split-button, menu, keyboard-navigation |

Pack guide:

* [Frontend Button ReActions README](../reactions/frontend/buttons/README.md)

## DevTools / Vercel

Use these ReActions when you want an agent to inspect Vercel data using CLI-only, read-only workflows.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Check Vercel Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md) | advanced | medium | true | run-commands, read-stdout, read-stderr, inspect-current-directory, read-files, parse-json, parse-text | devtools, vercel, analytics, web-analytics, cli-only |
| [Check Vercel Usage](../reactions/devtools/vercel/check-vercel-usage.reaction.md) | intermediate | low | true | run-commands, read-stdout, read-stderr, inspect-current-directory, read-files, parse-json, parse-text | devtools, vercel, usage, cost, billing, cli-only |
| [Check Vercel Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) | intermediate | low | true | run-commands, read-stdout, read-stderr, inspect-current-directory, read-files, parse-json, parse-text | devtools, vercel, deployment, status, health, cli-only |
| [Check Vercel Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md) | advanced | high | true | run-commands, read-stdout, read-stderr, inspect-current-directory, read-files, parse-json, parse-text | devtools, vercel, logs, errors, debugging, redaction |

Pack guide:

* [Vercel ReActions README](../reactions/devtools/vercel/README.md)

## DevTools / Bun

Use these ReActions when you want an agent to inspect Bun readiness using static inspection and optional CLI checks.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Check Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md) | intermediate | medium | true | inspect-current-directory, read-files, parse-json, parse-text, run-commands, read-stdout, read-stderr | devtools, bun, javascript, typescript, package-manager, health-check, static-fallback |

Pack guide:

- [Bun ReActions README](../reactions/devtools/bun/README.md)

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
