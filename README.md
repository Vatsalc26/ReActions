# ReActions

<p align="center">
  <strong>Executable recipes for coding agents.</strong>
</p>

<p align="center">
  Same task. Same quality. Any agent.
</p>

<p align="center">
  <a href="#quick-start">Quick start</a>
  ·
  <a href="docs/catalog.md">Catalog</a>
  ·
  <a href="#demos">Demos</a>
  ·
  <a href="#project-docs">Docs</a>
  ·
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-early%20experiment-yellow">
  <img alt="Format" src="https://img.shields.io/badge/format-.reaction.md-blue">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="Agents" src="https://img.shields.io/badge/agents-provider--agnostic-purple">
</p>

ReActions are Markdown-defined recipes that tell AI coding agents how to implement, inspect, verify, and report reusable tasks.

Instead of asking every model to invent its own approach, a ReAction gives the agent a repeatable recipe with phases, required capabilities, pause conditions, safety rules, verification rules, and final reporting.

## Quick start

Use a ReAction by giving it to a coding agent that can read files, edit files, run commands, and verify results.

Example:

```txt
Use /ReAction-verified-destructive-confirm-button-red.
Add a Delete Project button to the danger zone.
Require confirmation before the destructive action.
Verify the cancel path and confirm path in the browser.
```

The agent should:

1. Read the matching `.reaction.md` file.
2. Follow the phases.
3. Pause when required information is missing.
4. Use available tools/capabilities.
5. Verify before claiming success.
6. Return the final report.

ReActions can be used by native coding agents or by custom runners.

## Try it in 2 minutes

Clone the repo:

```bash
git clone https://github.com/Vatsalc26/ReActions.git
cd ReActions
```

Open the demo project:

```bash
cd examples/demo-next-tailwind
npm install
npm run dev
```

Then ask your coding agent:

```txt
Use /ReAction-verified-async-cta-button-green.
Add a "Create Project" button to the hero action area.
When clicked, show "Creating..." then "Project created".
Verify it in the browser.
```

Demo project: [`examples/demo-next-tailwind`](examples/demo-next-tailwind)

## Demos

Early demos showing ReActions being used with a coding/browser agent:

| Demo | What it shows |
|---|---|
| [Demo 1: Destructive Confirm Button Red](https://github.com/Vatsalc26/ReActions/releases/download/v0.1-demo/demo-1-destructive-confirm-button-red.mp4) | A destructive button ReAction with confirmation behavior. |
| [Demo 2: Destructive button back to Green Submit / Async CTA](https://github.com/Vatsalc26/ReActions/releases/download/v0.1-demo/demo-2-destructive-to-green-submit-button.mp4) | Switching button behavior/style using a different ReAction. |

The videos are stored as GitHub Release assets so the repository stays lightweight.

## ReAction Catalog

For the full browseable catalog with file links, safety notes, and verification notes, see [`docs/catalog.md`](docs/catalog.md).

### Frontend / Buttons

| ReAction | Trigger | Use when |
|---|---|---|
| Verified Async CTA Button Green | `/ReAction-verified-async-cta-button-green` | You need a primary async action such as create, save, deploy, generate, continue, or start. |
| Verified Secondary Button Neutral | `/ReAction-verified-secondary-button-neutral` | You need a lower-emphasis action such as cancel, back, learn more, skip, or dismiss. |
| Verified Destructive Confirm Button Red | `/ReAction-verified-destructive-confirm-button-red` | You need a dangerous action such as delete, remove, revoke, reset, archive, or cancel subscription. |
| Verified Copy Button Neutral | `/ReAction-verified-copy-button-neutral` | You need to copy an API key, invite link, command, code snippet, webhook URL, or share link. |
| Verified Icon Button Neutral | `/ReAction-verified-icon-button-neutral` | You need a compact icon-only or icon-first action such as settings, search, close, menu, edit, refresh, or more actions. |
| Verified Toggle Button Green | `/ReAction-verified-toggle-button-green` | You need a stateful on/off action such as notifications, dark mode, auto-save, favorite, publish, or enable integration. |
| Verified Floating Action Button Green | `/ReAction-verified-floating-action-button-green` | You need a prominent floating quick action such as create, add item, compose, quick add, or new task. |
| Verified Split Button Menu | `/ReAction-verified-split-button-menu` | You need a primary action with related secondary menu actions such as export formats, save options, deploy targets, or share actions. |

See [`reactions/frontend/buttons/README.md`](reactions/frontend/buttons/README.md) for the button decision guide.

### DevTools / Vercel

| ReAction | Trigger | Use when |
|---|---|---|
| Check Vercel Analytics | `/ReAction-check-vercel-analytics` | You want a read-only Web Analytics-style report through CLI-only local capabilities or a project-provided analytics adapter. |
| Check Vercel Usage | `/ReAction-check-vercel-usage` | You want a read-only usage/cost report using the official `vercel usage` CLI command. |
| Check Vercel Deployment Status | `/ReAction-check-vercel-deployment-status` | You want a read-only deployment health/status report using Vercel CLI commands. |
| Check Vercel Error Logs | `/ReAction-check-vercel-error-logs` | You want a read-only runtime/error log diagnosis report without exposing secrets. |

See [`reactions/devtools/vercel/README.md`](reactions/devtools/vercel/README.md) for Vercel ReActions.

### DevTools / Bun

| ReAction | Trigger | Use when |
|---|---|---|
| Check Bun Project Health | `/ReAction-check-bun-project-health` | You want a safe report on whether a JavaScript/TypeScript project is ready to use Bun, with static fallback when Bun CLI is missing. |
| Run Bun Test and Diagnose | `/ReAction-run-bun-test-and-diagnose` | You want to run Bun tests when available, diagnose failures, and get a read-only report with static fallback when Bun CLI is missing. |
| Migrate Project to Bun | `/ReAction-migrate-project-to-bun` | You want to safely migrate a JavaScript/TypeScript project to Bun with planning, confirmation gates, and verification. |
| Bun Build Check | `/ReAction-bun-build-check` | You want to check whether a project builds with Bun-related build commands and diagnose build failures. |
| Setup Bun Test Runner | `/ReAction-setup-bun-test-runner` | You want to safely add or improve a Bun test setup with planning, minimal tests, confirmation gates, and verification. |
| Setup Bun CI GitHub Actions | `/ReAction-setup-bun-ci-github-actions` | You want to safely add or update GitHub Actions CI for Bun with workflow inspection, confirmation gates, and static verification. |

See [`reactions/devtools/bun/README.md`](reactions/devtools/bun/README.md) for Bun ReActions.

### DevTools / OpenClaw

| ReAction | Trigger | Use when |
|---|---|---|
| Setup OpenClaw First Run | `/ReAction-setup-openclaw-first-run` | You want to safely guide a first-time OpenClaw setup through install planning, onboarding, Gateway verification, dashboard verification, and security reminders. |

See [`reactions/devtools/openclaw/README.md`](reactions/devtools/openclaw/README.md) for OpenClaw ReActions.

## What a ReAction contains

A `.reaction.md` file is an agent-readable recipe.

A good ReAction defines:

| Section | Purpose |
|---|---|
| Purpose | What reusable task the agent should complete. |
| Required capabilities | What tools/capabilities the agent or runner needs. |
| Safety rules | What the agent must never do. |
| Contract | What must stay true across implementations. |
| Phases | The ordered steps the agent should follow. |
| Skills | The detailed behavior needed inside each phase. |
| Pause conditions | When the agent must stop and ask instead of guessing. |
| Verification | Static, browser, terminal, or runtime checks required before success. |
| Final report | The consistent output format after execution. |

## Repository structure

```txt
examples/
  demo-next-tailwind/
  prompts/

reactions/
  frontend/
    buttons/
      *.reaction.md
      README.md

  devtools/
    vercel/
      *.reaction.md
      README.md
    bun/
      *.reaction.md
      README.md
    openclaw/
      *.reaction.md
      README.md

docs/
  catalog.md
  reaction-format.md
  reaction-quality-checklist.md
  reaction-preview-format.md

scripts/
  validate-reactions-index.mjs

reactions.json
CONTRIBUTING.md
LICENSE
```

## How to contribute

This project is intentionally early. Issues, test reports, and small improvements are welcome.

Good contributions include:

- improving an existing ReAction
- adding missing pause conditions
- improving accessibility requirements
- improving browser verification requirements
- adding example prompts
- adding preview metadata
- creating new ReActions for common frontend patterns
- testing ReActions with different coding agents

Good first places to contribute:

- improve an existing ReAction
- test a ReAction with another coding agent
- add examples
- improve verification rules
- add preview metadata
- add another common ReAction to an existing pack

Look for issues labeled:

```txt
good first issue
```

## Design principles

ReActions should be:

- human-readable
- agent-followable
- provider-agnostic
- capability-based
- safety-aware
- verification-driven

A ReAction should not claim success unless its required verification passes.

## Project docs

- [ReAction Catalog](docs/catalog.md)
- [Example prompts](examples/prompts/README.md)
- [reactions.json schema](docs/reactions-json-schema.md)
- [ReAction format](docs/reaction-format.md)
- [ReAction quality checklist](docs/reaction-quality-checklist.md)
- [ReAction preview format](docs/reaction-preview-format.md)
- [Contributing](CONTRIBUTING.md)

## Validate the ReActions index

Run:

```bash
node scripts/validate-reactions-index.mjs
```

## Status

Early experimental repo.
