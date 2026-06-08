# ReAction Quality Checklist

A ReAction is an executable recipe for coding agents.

Use this checklist before adding or changing a `.reaction.md` file.

## Identity

- [ ] The ReAction has a clear `id`.
- [ ] The file name matches the id.
- [ ] The trigger starts with `/ReAction-`.
- [ ] The purpose is clear in the first section.
- [ ] The ReAction solves one reusable task, not many unrelated tasks.

## Portability

- [ ] The ReAction is provider-agnostic.
- [ ] It does not assume one LLM provider.
- [ ] It does not assume one runner.
- [ ] It describes capabilities instead of tool-specific names.
- [ ] It supports native-agent mode and runner mode where relevant.

## Capabilities

- [ ] Required capabilities are listed.
- [ ] File inspection/search/edit requirements are clear.
- [ ] Command/static-check requirements are clear.
- [ ] Browser/runtime verification requirements are clear.
- [ ] Missing capability behavior is defined.

## Contract

- [ ] The ReAction defines what must not vary.
- [ ] The ReAction defines what may vary.
- [ ] The core behavior contract is explicit.
- [ ] Accessibility requirements are explicit where relevant.
- [ ] Safety requirements are explicit where relevant.

## Phases

- [ ] The ReAction is sequential and phase-based.
- [ ] Each phase has a goal.
- [ ] Each phase has rules.
- [ ] Each phase has pause conditions.
- [ ] Each phase has exit criteria.
- [ ] Each phase has expected output.

## Pause Conditions

- [ ] Missing user information causes pause, not guessing.
- [ ] Ambiguous placement causes pause, not guessing.
- [ ] Unsupported project type causes pause, not unsafe edits.
- [ ] Risky/wide file changes cause pause.
- [ ] Destructive or sensitive actions have extra safety rules.

## Verification

- [ ] Static checks are requested when available.
- [ ] Browser verification is required when relevant.
- [ ] Interaction behavior is verified.
- [ ] Accessibility semantics are verified where possible.
- [ ] Console/runtime errors are checked where possible.
- [ ] The ReAction does not claim success without required verification.

## Repair Behavior

- [ ] Repair behavior is limited.
- [ ] One repair attempt max is preferred.
- [ ] Infinite loops are forbidden.
- [ ] Failures are reported clearly.

## Final Report

- [ ] Final report format is defined.
- [ ] Status values are clear.
- [ ] Changed files are reported.
- [ ] Verification results are reported.
- [ ] Incomplete verification is not called complete.

## Good ReAction Rule

A good ReAction should be:

```txt
human-readable
agent-followable
provider-agnostic
capability-based
safety-aware
verification-driven
```
