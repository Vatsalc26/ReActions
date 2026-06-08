# ReActions

ReActions are Markdown-defined, skill-led workflows for LLM agents.

A ReAction describes how an agent should complete a reusable task through phases, skills, tool/capability usage, pause conditions, verification, and final reporting.

ReActions are designed to be portable across:

- native coding agents
- LLM providers
- local model runners
- browser-enabled agents
- custom ReAction runners

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
