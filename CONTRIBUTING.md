# Contributing to ReActions

ReActions are executable recipes for coding agents.

Good contributions include:

- new `.reaction.md` files
- improvements to existing ReActions
- clearer pause conditions
- better verification rules
- examples and demos
- docs improvements

## A good ReAction should include

- clear purpose
- supported execution modes
- required capabilities
- contract/invariants
- sequential phases
- pause conditions
- static checks
- browser/runtime verification where relevant
- final report format

## Current focus

The first pack is:

```txt
Frontend Button ReActions
```

Good first contributions:

* improve an existing button ReAction
* add examples
* add preview metadata
* add docs
* add another common frontend button pattern

## Before opening a PR

Please check:

- [ReAction quality checklist](docs/reaction-quality-checklist.md)
- `node scripts/validate-reactions-index.mjs`

If you add a new ReAction:

1. Add the `.reaction.md` file.
2. Update `reactions.json`.
3. Update the relevant pack README.
4. Run the validation script.
