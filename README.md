# ReActions

**ReActions are executable recipes for coding agents.**

A ReAction is a Markdown-defined recipe that tells an AI coding agent how to implement and verify a reusable task.

Instead of asking every model to invent its own approach, a ReAction gives the agent a repeatable recipe with:

- phases
- skills
- required capabilities
- pause conditions
- safety rules
- verification rules
- final reporting

The goal:

```txt
Same task. Same quality. Any agent.
```

## Demos

These early demos show ReActions being used with a coding/browser agent.

- [Demo 1: Destructive Confirm Button Red](https://github.com/Vatsalc26/ReActions/releases/download/v0.1-demo/demo-1-destructive-confirm-button-red.mp4)
- [Demo 2: Destructive button back to Green Submit / Async CTA](https://github.com/Vatsalc26/ReActions/releases/download/v0.1-demo/demo-2-destructive-to-green-submit-button.mp4)

The videos are stored as GitHub Release assets so the repository stays lightweight.

## Current Packs

### Frontend / Buttons

The first pack is focused on modern frontend button patterns:

- `/ReAction-verified-async-cta-button-green`
- `/ReAction-verified-secondary-button-neutral`
- `/ReAction-verified-destructive-confirm-button-red`
- `/ReAction-verified-copy-button-neutral`
- `/ReAction-verified-icon-button-neutral`
- `/ReAction-verified-toggle-button-green`
- `/ReAction-verified-floating-action-button-green`
- `/ReAction-verified-split-button-menu`

See [`reactions/frontend/buttons/README.md`](reactions/frontend/buttons/README.md) for the button decision guide.

### DevTools / Vercel

- `/ReAction-check-vercel-analytics`
- `/ReAction-check-vercel-usage`
- `/ReAction-check-vercel-deployment-status`
- `/ReAction-check-vercel-error-logs`

See [`reactions/devtools/vercel/README.md`](reactions/devtools/vercel/README.md) for Vercel ReActions.

## Repository Structure

```txt
reactions/
  frontend/
    buttons/
      *.reaction.md

docs/
  reaction-format.md
```

## What is a `.reaction.md` file?

A `.reaction.md` file is a reusable agent playbook.

It should include:

* purpose
* execution modes
* required capabilities
* contract/invariants
* phases
* skills
* tool/capability guidance
* pause conditions
* verification rules
* final report format

## Button ReActions Pack

The button pack will grow slowly.

Planned direction:

### Core Buttons

* Verified Async CTA Button Green
* Verified Destructive Confirm Button Red
* Verified Secondary Button Neutral

### Utility Buttons

* Verified Copy Button Neutral
* Verified Icon Button Neutral
* Verified Toggle Button Green

### Advanced Buttons

* Verified Floating Action Button Green
* Verified Split Button Menu
* Verified File Upload Button
* Verified OAuth Sign-in Button

## How to contribute

This project is early and feedback is welcome.

Good contributions include:

- improving an existing ReAction
- adding missing pause conditions
- improving accessibility requirements
- improving browser verification requirements
- adding example prompts
- adding preview metadata
- creating new ReActions for common frontend patterns
- testing ReActions with different coding agents

Look for issues labeled:

```txt
good first issue
```

A good ReAction should be:

* human-readable
* agent-followable
* provider-agnostic
* capability-based
* safety-aware
* verification-driven

## Project docs

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
