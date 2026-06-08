---
id: verified-toggle-button-green
name: Verified Toggle Button Green
version: 0.1.0
description: Add a verified toggle button with a green active preset, neutral inactive state, aria-pressed semantics, visible on/off states, keyboard support, optional persistence, and browser verification.
style_mode: green_active_neutral_inactive_with_explicit_overrides
component_identity: toggle-button
default_preset: green-active
execution_modes:
  - native_agent
  - reaction_runner
supported_project_policy: detect_and_adapt
browser_verification_required_for_success: true
safety:
  pause_on_unsupported_project: true
  pause_on_ambiguous_placement: true
  pause_on_missing_toggle_purpose: true
  pause_on_risky_or_wide_file_changes: true
  verify_before_done: true
---

# ReAction: Verified Toggle Button Green

## Purpose

Create, reuse, or update a toggle button in a frontend project.

The default preset is green when active/on and neutral when inactive/off.

This ReAction is for stateful on/off controls like:

- Enable notifications
- Turn on dark mode
- Enable auto-save
- Show sidebar
- Hide sidebar
- Favorite/star item
- Publish/unpublish
- Enable integration
- Activate feature
- Compact mode
- Mute/unmute
- Pin/unpin

This ReAction is not tied to one framework or one runner. It should be followed by any capable coding agent or LLM provider using whatever file, terminal, and browser tools are available.

The ReAction’s job is to preserve a reliable toggle-button contract while allowing project-specific implementation.

The following may vary:

- framework-specific implementation
- file path
- component name if the project has existing conventions
- placement strategy
- toggle purpose
- on/off labels
- initial state
- click behavior
- persistence behavior
- explicit style overrides requested by the user

The following must not vary:

- real button semantics or accessible toggle primitive
- `aria-pressed` or project-equivalent accessible pressed state
- clear on/off visual state
- keyboard accessibility
- focus-visible styling
- state changes when activated
- disabled behavior when disabled
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
- read clipboard if available
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

# Toggle Button Contract

Every implementation must satisfy this contract.

## Required behavior

The toggle button must:

- use native button semantics or the framework’s accessible toggle/button primitive
- be keyboard accessible
- have visible accessible text or a clear accessible label
- expose the current pressed/on state using `aria-pressed` when using a button
- have a clearly visible inactive/off state
- have a clearly visible active/on state
- change state when activated
- support an initial state
- support disabled behavior if requested
- preserve focus-visible styling
- avoid real external side effects unless explicitly requested and confirmed
- be verifiable in browser

## Required toggle behavior

The expected default flow is:

```txt
Toggle button visible
→ initial state is visible
→ user clicks toggle
→ pressed/on state changes
→ visual state changes
→ user clicks again
→ pressed/off state returns
```

If the user requests persistence, use an existing project persistence pattern when available.

If no persistence pattern exists, pause before adding storage or explain that the toggle will be local UI state only.

## Required identifiers for verification

If the project supports test IDs or stable selectors, add:

* toggle button selector/test id: `reaction-toggle-button-green`
* optional state label selector/test id: `reaction-toggle-state-green`
* optional feedback selector/test id: `reaction-toggle-feedback-green`

If the project has a different test selector convention, adapt to it while preserving stable selectors for verification.

## Default style preset: green active / neutral inactive

Default inactive/off style:

* neutral/gray or project-default secondary style
* readable high-contrast text
* visible border or strong contrast boundary
* clear hover state
* clear active/pressed state
* clear focus-visible state

Default active/on style:

* green/emerald background or project-approved success/active style
* readable high-contrast text
* clear active/on visual indication
* clear focus-visible state
* clear disabled state if disabled

Do not create a low-contrast or ambiguous toggle button.

---

# Explicit Style Override Policy

The default visual preset is green active and neutral inactive.

If the user does not explicitly request style changes, use the green-active / neutral-inactive preset or the project’s existing toggle style.

If the user explicitly requests style changes, apply only those requested overrides while preserving accessibility, state semantics, and verification.

Examples:

* "make it compact" → reduce padding/size while keeping practical click target
* "make it pill shaped" → use rounded-full shape
* "make active state blue" → active/on state uses blue instead of green
* "show only an icon" → require accessible label and clear active/inactive state
* "start enabled" → initial pressed state is true
* "persist the setting" → use existing persistence pattern if available, otherwise pause

Allowed explicit overrides:

* active color
* inactive color
* text/icon color
* icon usage
* font family
* font size
* font weight
* padding
* width
* height
* border color
* border width
* border radius
* shadow
* placement
* compactness
* initial state
* persistence behavior

Forbidden overrides:

* removing accessible label
* removing `aria-pressed` or equivalent state semantics
* making on/off states visually indistinguishable
* removing keyboard accessibility
* removing focus-visible styling
* using a non-button element without accessible toggle semantics
* making the clickable area too small to use safely
* skipping verification
* editing unrelated files
* adding persistence/storage without user request or project precedent

If the requested toggle performs a destructive action, prefer `/ReAction-verified-destructive-confirm-button-red` or require confirmation.

If the requested toggle copies a value, prefer `/ReAction-verified-copy-button-neutral`.

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
    "toggle_system": "",
    "confidence": ""
  },
  "toggle_button_spec": {
    "togglePurpose": "",
    "onLabel": "",
    "offLabel": "",
    "accessibleLabel": "",
    "initialState": "",
    "clickBehavior": "",
    "placementRequest": "",
    "disabledState": "",
    "persistence": "",
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
    "accessibility": "",
    "console": ""
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand User Request

## Skill

Toggle Button Request Analysis Skill

## Goal

Extract the toggle button requirements and any explicit style overrides from the user's request.

## Required capabilities/tools

Read/parse user input.

## Rules

* ReAction name `/ReAction-verified-toggle-button-green` is not the button label.
* Extract:

  * `togglePurpose`
  * `onLabel`
  * `offLabel`
  * `accessibleLabel`
  * `initialState`
  * `clickBehavior`
  * `placementRequest`
  * `disabledState`
  * `persistence`
  * `styleOverrides`
* If the user provides a toggle purpose like `"enable notifications"`, derive:

  * onLabel: `"Notifications on"` or project-appropriate equivalent
  * offLabel: `"Notifications off"` or project-appropriate equivalent
  * accessibleLabel: `"Toggle notifications"`
* If the user says `"dark mode toggle"`, derive:

  * onLabel: `"Dark mode on"`
  * offLabel: `"Dark mode off"`
  * accessibleLabel: `"Toggle dark mode"`
* If initial state is missing, default to off/inactive unless the surrounding project state indicates otherwise.
* If persistence is requested, preserve that request but do not invent a persistence system without project precedent.
* If explicit style overrides are provided, preserve them only if they do not break accessibility or state clarity.

## Pause conditions

Pause if:

* the toggle purpose is missing
* the accessible label cannot be derived
* placement request is missing
* the requested on/off behavior is ambiguous
* the user requests persistence but no safe project persistence pattern is found
* the requested action is destructive and no confirmation flow is included

## Exit criteria

Spec is fully populated and verified with no missing critical fields.

## Phase output

```json
{
  "togglePurpose": "",
  "onLabel": "",
  "offLabel": "",
  "accessibleLabel": "",
  "initialState": "",
  "clickBehavior": "",
  "placementRequest": "",
  "disabledState": "",
  "persistence": "",
  "styleOverrides": {}
}
```

---

# Phase 2: Inspect Project and Determine Project Profile

## Skill

Project Discovery & Analysis Skill

## Goal

Inspect the codebase to identify frameworks, tools, styling, component structures, state patterns, and likely target paths.

## Required capabilities/tools

Inspect files, search code.

## Rules

Inspect:

* package configuration files
* framework configuration files
* source files
* directory structure
* existing Button/Toggle/Switch components
* existing settings controls
* existing state management patterns
* existing persistence patterns if persistence is requested
* styling solution
* app entry points and likely target files

Identify:

* framework: React, Next.js, Vue, Svelte, Astro, plain HTML, etc.
* build tool
* language: TypeScript or JavaScript
* styling: Tailwind, CSS modules, plain CSS, MUI, Chakra, shadcn, styled-components, etc.
* component system: existing Button, Toggle, Switch, segmented controls, settings rows
* state system: local state, global store, context, signals, forms, etc.
* persistence system: localStorage, cookies, backend settings, existing project helper
* target files and routes

The ReAction may adapt to the project if the agent can safely determine the implementation strategy.

If the project uses an unsupported or unfamiliar stack, pause instead of guessing.

## Pause conditions

Pause if the project profile cannot be determined with reasonable confidence.

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
  "state_system": "",
  "persistence_system": "",
  "confidence": ""
}
```

---

# Phase 3: Choose Implementation Strategy

## Skill

Toggle Component Implementation Design Skill

## Goal

Determine whether to reuse existing toggle/switch primitives, wrap them, create a project-appropriate toggle button, or inline minimally.

## Required capabilities/tools

Inspect files, search code.

## Rules

* If a project already has a suitable Toggle, Switch, or segmented-button component, prefer reusing or wrapping it.
* If a project has a suitable Button component, use it with `aria-pressed`.
* If a project uses a component library, use its accessible toggle/switch primitive when appropriate.
* If no suitable components exist, create a small reusable toggle button in the project’s component style.
* Inline only if the project has no component structure and the edit is minimal.
* Do not modify global design systems unless necessary.
* Do not rewrite unrelated architecture.
* Do not create a toggle without accessible state semantics.
* Do not add persistence unless requested and safely supported.

## Pause conditions

Pause if implementing safely requires too many unrelated file changes.

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

Safe Toggle Placement & Layout Skill

## Goal

Resolve the requested placement into a target file and specific anchor in the code.

## Required capabilities/tools

Inspect files, search code, read browser UI/DOM if available.

## Rules

* Inspect target files and/or browser UI.
* Understand the user's placement request and choose the smallest safe edit.
* Prefer existing semantic locations if available.
* Good targets include:

  * settings row
  * preferences panel
  * toolbar
  * navbar
  * sidebar
  * card action area
  * feature flag area
  * notification settings
  * theme settings
  * integration settings
* Use anchor-text placement if the user references visible text.
* Use fixed positioning only if the user explicitly asks for screen/corner/floating placement.
* Do not place toggle buttons where the state or purpose is unclear.

## Pause conditions

Pause if:

* placement could mean multiple things
* the agent cannot find a safe target file
* the requested placement conflicts with project layout
* the toggle button’s purpose would be unclear in that location

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

# Phase 5: Implement Toggle Button Contract

## Skill

Toggle Button Coding & Accessibility Skill

## Goal

Implement the toggle button, accessible pressed state, visual on/off states, optional persistence, disabled state, and placement according to the contract.

## Required capabilities/tools

Edit files.

## Rules

* Implement according to the detected project stack.
* Preserve toggle button contract.
* Apply green active / neutral inactive preset by default.
* Apply explicit style overrides only if requested and safe.
* Use minimal edits and preserve unrelated code.
* Add stable selectors/test IDs when possible.
* Do not introduce real external side effects.
* Do not use ambiguous labels or icons without accessible state.
* If the project is React:

  * create/reuse component
  * use existing toggle/switch/button primitives if available
  * use state for pressed/on value if needed
  * use `aria-pressed` for button-style toggles
* If the project is plain HTML:

  * use a button element, `aria-pressed`, and safe JavaScript behavior
* If the project is Vue/Svelte/etc.:

  * use that framework’s component conventions if the agent knows them confidently
  * otherwise pause

## Required interaction states

The implementation should support:

```txt
off
on
hover
focus-visible
active
disabled
optional persisted
```

## Required user paths

The implementation must support and preserve:

```txt
Initial state visible
Keyboard focus → visible focus state
Click toggle → on state
Click toggle again → off state
Disabled state → cannot toggle
```

## Pause conditions

Pause if confidence is lost or if execution is blocked by syntax errors/unsupported stack constraints.

## Exit criteria

Implementation of toggle button behavior and layout insertion completed.

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

* Run available project static analysis tools:

  * build
  * typecheck
  * lint
  * format check
* Use whatever commands exist in the project.
* If checks fail, attempt one minimal repair.
* If still failing after one repair, stop.

## Pause conditions

None. If checks fail, either repair once or stop and report.

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

Dynamic Browser Testing & State Verification Skill

## Goal

Perform functional verification of the toggle button in a rendered browser environment.

## Required capabilities/tools

Open or preview the app in a browser, inspect rendered UI, click/interact with UI, read console errors.

## Rules

Open target route and verify:

* page opens
* toggle button is visible
* toggle button has accessible label
* toggle button exposes state via `aria-pressed` or equivalent accessible state
* initial state matches requested/default state
* placement reasonably matches the request
* inactive style is visible and distinguishable
* click changes to active/on state
* active style is visible and distinguishable
* click again returns to inactive/off state
* disabled state works if requested
* persistence works if requested and implemented
* no console errors

If browser capability is unavailable:

* do not claim complete
* report `incomplete_verification`

## Pause conditions

None.

## Exit criteria

Browser interaction verifies the full toggle button contract.

## Phase output

```json
{
  "browser": "",
  "interaction": "",
  "accessibility": "",
  "state": "",
  "console": ""
}
```

---

# Phase 8: Repair Once If Needed

## Skill

Target Diagnosis & Debugging Skill

## Goal

Perform a single repair cycle if static checks or browser verification fails.

## Required capabilities/tools

Inspect files, search code, edit files, run commands, browser tools.

## Rules

* Inspect the failure.
* Perform one minimal repair.
* Rerun static checks and browser verification.
* If it fails again, stop and report failure.
* Do not loop indefinitely.

## Pause conditions

None.

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

* Do not say complete unless static checks and browser verification passed.
* If browser verification could not run, report status `incomplete_verification`.
* If paused, list exactly what information is needed.
* Include whether accessible label, state semantics, and on/off interaction were verified.

## Exit criteria

Report generated and returned.

## Phase output

```json
{
  "status": "complete | incomplete_verification | blocked | failed",
  "reaction": "verified-toggle-button-green",
  "project_profile": {},
  "toggle_button": {
    "togglePurpose": "",
    "onLabel": "",
    "offLabel": "",
    "accessibleLabel": "",
    "initialState": "",
    "clickBehavior": "",
    "placementRequest": "",
    "stylePreset": "green-active-neutral-inactive",
    "styleOverridesApplied": {},
    "persistence": ""
  },
  "implementation_strategy": {},
  "placement_plan": {},
  "changed_files": [],
  "verification": {
    "static_checks": "",
    "browser": "",
    "interaction": "",
    "accessibility": "",
    "state": "",
    "console_errors": ""
  },
  "notes": []
}
```

---

# Examples

## Example 1: Notifications toggle

User:

Use /ReAction-verified-toggle-button-green. Add an "Enable notifications" toggle in the notification settings area. Start disabled.

Expected:

* neutral inactive state
* green active state after click
* `aria-pressed` or equivalent state semantics
* accessible label
* on/off interaction verified in browser

## Example 2: Dark mode toggle

User:

Use /ReAction-verified-toggle-button-green. Add a dark mode toggle in the navbar. Start off.

Expected:

* toggle has accessible label such as "Toggle dark mode"
* state changes on click
* browser verified
* persistence only if requested or project already has a theme persistence pattern

## Example 3: Favorite toggle

User:

Use /ReAction-verified-toggle-button-green. Add a favorite toggle to the card actions area.

Expected:

* toggle state visible
* accessible label such as "Toggle favorite"
* on/off behavior verified

## Example 4: Missing purpose

User:

Use /ReAction-verified-toggle-button-green. Add a toggle button in settings.

Expected:

* pause and ask what setting or state the toggle controls

---

# End of ReAction
