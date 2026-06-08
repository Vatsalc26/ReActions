---
id: verified-async-cta-button-green
name: Verified Async CTA Button Green
version: 0.2.0
description: Add a verified async CTA button with a green default preset to a frontend project, adapting implementation to the project while preserving behavior, accessibility, verification, and explicit user overrides.
style_mode: green_default_with_explicit_overrides
component_identity: async-cta-button
default_preset: green
execution_modes:
  - native_agent
  - reaction_runner
supported_project_policy: detect_and_adapt
browser_verification_required_for_success: true
safety:
  pause_on_unsupported_project: true
  pause_on_ambiguous_placement: true
  pause_on_risky_or_wide_file_changes: true
  verify_before_done: true
---

# ReAction: Verified Async CTA Button Green

## Purpose

Create, reuse, or update an async CTA button in a frontend project.

The default preset is green.

This ReAction is not tied to one framework or one runner. It should be followed by any capable coding agent or LLM provider using whatever file, terminal, and browser tools are available.

The ReAction’s job is to preserve a consistent button contract while allowing project-specific implementation.

The following may vary:
- framework-specific implementation
- file path
- component name if the project has existing conventions
- placement strategy
- label
- loading label
- success message
- explicit style overrides requested by the user

The following must not vary:
- real button semantics
- async behavior
- loading state
- disabled state while loading
- double-click prevention while loading
- success feedback
- accessibility
- verification before claiming success

---

# Execution Modes

This ReAction can be used in two modes: native agent mode or reaction runner mode.

## Tool Capability Mapping

This ReAction describes required capabilities, not provider-specific tool names.

Required capabilities:
- inspect files
- search code
- edit files
- run project commands
- open or preview the app in a browser
- inspect rendered UI
- click/interact with rendered UI
- read console errors if available
- ask the user for missing information
- record phase progress

If the agent has native tools, use them.

If the agent is running through a ReAction runner, use the runner’s equivalent tools.

If a capability is missing:
- continue only if safe
- clearly mark which verification step could not be completed
- never claim full success without browser verification

---

# Button Contract

Every implementation must satisfy this contract.

## Required behavior

The button must:
- use native button semantics or the framework’s accessible button primitive
- be keyboard accessible
- have visible accessible text
- support a label
- support a loading label
- support a success message or success feedback
- start an async action on click
- disable itself while loading
- prevent duplicate clicks while loading
- show loading state while work is in progress
- show success feedback after completion
- preserve focus-visible styling
- avoid real external side effects unless explicitly requested and confirmed

## Required identifiers for verification

If the project supports test IDs or stable selectors, add:
- button selector/test id: `reaction-async-cta-button-green`
- success selector/test id: `reaction-async-cta-success-green`

If the project has a different test selector convention, adapt to it while preserving stable selectors for verification.

## Default style preset: green

Default style:
- green/emerald background
- readable high-contrast text
- visible border or strong contrast boundary
- clear hover state
- clear active/pressed state
- clear focus-visible state
- visible disabled/loading state

Do not create a low-contrast or inaccessible button.

---

# Explicit Style Override Policy

The default visual preset is green.

If the user does not explicitly request style changes, use the green preset.

If the user explicitly requests style changes, apply only those requested overrides.

Examples:
- "make it white instead of green" → use white background while preserving async behavior and verification
- "make it large" → increase size/padding/font size
- "make it pill shaped" → use fully rounded shape
- "make it flat" → remove elevated shadow only if requested

Allowed explicit overrides:
- background color
- text color
- font family
- font size
- font weight
- padding
- width
- border color
- border width
- border radius
- shadow
- placement

Forbidden overrides:
- changing to a non-button element without accessible button semantics
- removing loading state
- removing success feedback
- removing disabled state while loading
- removing keyboard accessibility
- skipping verification
- editing unrelated files

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "project_profile": {
    "framework": "",
    "build_tool": "",
    "language": "",
    "styling": "",
    "component_system": "",
    "confidence": ""
  },
  "button_spec": {
    "label": "",
    "loadingLabel": "",
    "successMessage": "",
    "placementRequest": "",
    "styleOverrides": {}
  },
  "implementation_strategy": {
    "reuse_existing_component": false,
    "create_new_component": false,
    "target_files": [],
    "reason": ""
  },
  "placement_plan": {
    "strategy": "",
    "target_file": "",
    "anchor": "",
    "description": ""
  },
  "changed_files": [],
  "checks": {
    "static": "",
    "browser": "",
    "interaction": "",
    "console": ""
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand User Request

## Skill
Request Analysis & Extraction Skill

## Goal
Extract the button specifications and any explicit style overrides from the user's request.

## Required capabilities/tools
Read/parse user input.

## Rules
- ReAction name `/ReAction-verified-async-cta-button-green` is not the button label.
- Extract: `label`, `loadingLabel`, `successMessage`, `placementRequest`, `styleOverrides`.
- If loading label is missing, derive it from `label`. Example: `"Create Project"` → `"Creating..."`.
- If success message is missing, derive it from `label`. Example: `"Create Project"` → `"Project created"`.
- If explicit style overrides are provided, preserve them.

## Pause conditions
- If no label is provided, pause and ask.
- If no placement request is provided, pause and ask.

## Exit criteria
Spec is fully populated and verified with no missing critical fields.

## Phase output
```json
{
  "label": "",
  "loadingLabel": "",
  "successMessage": "",
  "placementRequest": "",
  "styleOverrides": {}
}
```

---

# Phase 2: Inspect Project and Determine Project Profile

## Skill
Project Discovery & Analysis Skill

## Goal
Inspect the codebase to identify frameworks, tools, styling, component structures, and likely target paths.

## Required capabilities/tools
Inspect files, search code.

## Rules
- Inspect package configuration files (e.g., `package.json`), configuration files (e.g., `vite.config.ts`, `tailwind.config.js`), source files, and directory structure.
- Identify: framework (React, Next.js, Vue, Svelte, Astro, plain HTML, etc.), build tool, language (TypeScript, JavaScript), styling solution (Tailwind, CSS modules, plain CSS, MUI, styled-components, etc.), component systems (existing Button component), and entry point/target files.
- The ReAction may adapt to the project if the agent can safely determine the implementation strategy.
- If the project uses an unsupported or unfamiliar stack, pause instead of guessing.

## Pause conditions
- If the project profile cannot be determined with reasonable confidence, pause and ask.

## Exit criteria
A determined project profile with high confidence.

## Phase output
```json
{
  "framework": "",
  "build_tool": "",
  "language": "",
  "styling": "",
  "component_system": "",
  "confidence": ""
}
```

---

# Phase 3: Choose Implementation Strategy

## Skill
Component Implementation Design Skill

## Goal
Determine whether to reuse an existing component, wrap it, create a new project-appropriate button, or inline it.

## Required capabilities/tools
Inspect files, search code.

## Rules
- If a project already has a suitable Button component, prefer reusing or wrapping it.
- If the project uses a component library, use the library's accessible button primitive.
- If no button component exists, create a small reusable async CTA button in the project's component style.
- Inline only if the project has no component structure and the edit is minimal.
- Do not modify global design systems unless necessary.
- Do not rewrite unrelated architecture.

## Pause conditions
- If implementing safely requires too many unrelated file changes, pause and ask.

## Exit criteria
Decision made on strategy with specified targets.

## Phase output
```json
{
  "reuse_existing_component": false,
  "create_new_component": false,
  "target_files": [],
  "reason": ""
}
```

---

# Phase 4: Reason About Placement

## Skill
Safe Placement & Layout Skill

## Goal
Resolve the requested placement into a target file and specific anchor in the code.

## Required capabilities/tools
Inspect files, search code, read browser UI/DOM.

## Rules
- Inspect target files and/or browser UI.
- Understand the user's placement request and choose the smallest safe edit.
- Prefer existing semantic locations if available.
- Use slots only if the project has slots.
- Use fixed positioning only if the user asks for screen/corner/floating placement.
- Use anchor-text placement if the user references visible text.

## Pause conditions
- Pause if placement could mean multiple things.
- Pause if the agent cannot find a safe target file.
- Pause if the requested placement conflicts with project layout.

## Exit criteria
Concrete placement plan detailing strategy, target file, and anchor.

## Phase output
```json
{
  "strategy": "",
  "target_file": "",
  "anchor": "",
  "description": ""
}
```

---

# Phase 5: Implement Button Contract

## Skill
Component Coding & Styling Skill

## Goal
Implement the button component and integrate it into the target placement according to the button contract.

## Required capabilities/tools
Edit files.

## Rules
- Implement according to the detected project stack.
- Preserve the button contract (semantics, accessibility, async behavior, test IDs/selectors).
- Apply the green preset by default.
- Apply explicit style overrides only if requested.
- Use minimal edits and preserve unrelated code.
- Do not introduce real external side effects.
- If the project is React: create/reuse component, use state for loading/success.
- If the project is plain HTML: use button element and JS safely.
- If the project is Vue/Svelte/etc.: use that framework's component conventions if the agent knows them confidently; otherwise, pause.

## Pause conditions
- Pause if confidence is lost or if execution is blocked by syntax errors/unsupported stack constraints.

## Exit criteria
Implementation of component and layout insertion completed.

## Phase output
```json
{
  "changed_files": []
}
```

---

# Phase 6: Run Static Checks

## Skill
Codebase Verification Skill

## Goal
Verify imports, compiler safety, type compliance, and formatting.

## Required capabilities/tools
Run project commands.

## Rules
- Run project static analysis tools (e.g., build scripts, typecheckers, linters, formatters).
- If checks fail, attempt one minimal repair.
- If still failing after one repair, stop.

## Pause conditions
- None. If checks fail, either repair once or stop and report.

## Exit criteria
Checks pass successfully or no check scripts exist.

## Phase output
```json
{
  "static_checks": ""
}
```

---

# Phase 7: Browser Verification

## Skill
Dynamic Browser Testing Skill

## Goal
Perform functional verification of the button in a rendered browser environment.

## Required capabilities/tools
Open or preview the app in a browser, inspect rendered UI, click/interact with UI, read console errors.

## Rules
- Open target route.
- Verify page opens and button is visible.
- Verify button text matches requested label.
- Verify button placement is correct.
- Verify styling is green preset (or has explicit overrides).
- Click button: verify loading state, duplicate click prevention, and final success feedback.
- Verify no console errors.
- If browser capability is unavailable, do not claim complete; report `incomplete_verification`.

## Pause conditions
- None.

## Exit criteria
Browser interaction verifies the full behavior contract.

## Phase output
```json
{
  "browser": "",
  "interaction": "",
  "console": ""
}
```

---

# Phase 8: Repair Once If Needed

## Skill
Target Diagnosis & Debugging Skill

## Goal
Perform a single repair cycle if browser verification fails.

## Required capabilities/tools
Inspect files, search code, edit files, run commands, browser tools.

## Rules
- Inspect the failure.
- Perform one minimal repair.
- Rerun static checks and browser verification.
- If it fails again, stop and report failure (do not loop).

## Pause conditions
- None.

## Exit criteria
Verification passes after the single repair or execution terminates on failure.

## Phase output
```json
{
  "repaired": false,
  "outcome": ""
}
```

---

# Phase 9: Final Report

## Skill
Verification Reporting Skill

## Goal
Provide a detailed structured final report of the implementation and validation status.

## Required capabilities/tools
Write/format response.

## Rules
- Do not say complete unless static checks and browser verification passed.
- If browser verification could not run, report status `incomplete_verification`.
- If paused, list exactly what information is needed.

## Exit criteria
Report generated and returned.

## Phase output
```json
{
  "status": "complete | incomplete_verification | blocked | failed",
  "reaction": "verified-async-cta-button-green",
  "project_profile": {},
  "button": {
    "label": "",
    "loadingLabel": "",
    "successMessage": "",
    "placementRequest": "",
    "stylePreset": "green",
    "styleOverridesApplied": {}
  },
  "implementation_strategy": {},
  "placement_plan": {},
  "changed_files": [],
  "verification": {
    "static_checks": "",
    "browser": "",
    "interaction": "",
    "console_errors": ""
  },
  "notes": []
}
```

---

# Examples

## Example 1: Default green button

User:
Use /ReAction-verified-async-cta-button-green. Add a "Create Project" button in the lower right corner. When clicked, show "Creating..." then "Project created".

Expected:
- green default preset
- lower-right placement
- async behavior
- browser verified

## Example 2: Explicit style override

User:
Use /ReAction-verified-async-cta-button-green. Add a "Deploy" button below the hero text, make it white and pill shaped. When clicked, show "Deploying..." then "Deployed".

Expected:
- white background override
- pill shape override
- async behavior preserved
- browser verified

## Example 3: Missing label

User:
Use /ReAction-verified-async-cta-button-green. Add it in the navbar.

Expected:
- pause and ask for button label

---

# End of ReAction
