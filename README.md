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

- Demo 1: coming soon
- Demo 2: coming soon

The demo videos are available locally but were not committed because they are large binary files. They should be uploaded externally and linked here.

## Current Packs

### Frontend / Buttons

- `/ReAction-verified-async-cta-button-green`
- `/ReAction-verified-destructive-confirm-button-red`

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

## Status

Early experimental repo.
