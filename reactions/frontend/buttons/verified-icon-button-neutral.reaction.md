---
id: verified-icon-button-neutral
name: Verified Icon Button Neutral
version: 0.1.0
description: Add a verified icon button with a neutral default preset, accessible labeling, keyboard support, disabled state, optional tooltip/feedback, and browser verification.
style_mode: neutral_default_with_explicit_overrides
component_identity: icon-button
default_preset: neutral
execution_modes:
  - native_agent
  - reaction_runner
supported_project_policy: detect_and_adapt
browser_verification_required_for_success: true
safety:
  pause_on_unsupported_project: true
  pause_on_ambiguous_placement: true
  pause_on_missing_accessible_label: true
  pause_on_risky_or_wide_file_changes: true
  verify_before_done: true
---

# ReAction: Verified Icon Button Neutral

## Purpose

Create, reuse, or update an icon button in a frontend project.

The default preset is neutral.

This ReAction is for compact UI actions like:

- Settings
- Search
- Close
- Open menu
- More actions
- Edit
- Refresh
- Open sidebar
- Toggle panel
- View details
- Expand/collapse
- Favorite/star
- Theme switch trigger

This ReAction is not tied to one framework or one runner. It should be followed by any capable coding agent or LLM provider using whatever file, terminal, and browser tools are available.

The ReAction’s job is to preserve a reliable icon-button contract while allowing project-specific implementation.

The following may vary:

- framework-specific implementation
- file path
- component name if the project has existing conventions
- icon library or inline icon strategy
- placement strategy
- icon
- accessible label
- tooltip text
- click behavior
- disabled behavior
- explicit style overrides requested by the user

The following must not vary:

- real button semantics
- accessible label for icon-only button
- keyboard accessibility
- focus-visible styling
- clear disabled state when disabled
- no ambiguous icon-only controls
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

# Icon Button Contract

Every implementation must satisfy this contract.

## Required behavior

The icon button must:

- use native button semantics or the framework’s accessible button primitive
- be keyboard accessible
- have a clear accessible label
- not rely on the icon alone for meaning
- use `type="button"` when applicable
- preserve focus-visible styling
- have visible hover and active states
- have a visible disabled state when disabled
- support click behavior requested by the user
- avoid real external side effects unless explicitly requested and confirmed
- be verifiable in browser

## Accessible label rule

Icon-only buttons must have an accessible label.

Acceptable implementations include:

- `aria-label`
- visually hidden text
- project-approved accessible label pattern
- tooltip plus accessible label

A tooltip alone is not enough if it does not provide an accessible name.

If the user does not provide enough information to determine the label, pause and ask.

## Required identifiers for verification

If the project supports test IDs or stable selectors, add:

- icon button selector/test id: `reaction-icon-button-neutral`
- optional tooltip selector/test id: `reaction-icon-button-tooltip-neutral`
- optional feedback selector/test id: `reaction-icon-button-feedback-neutral`

If the project has a different test selector convention, adapt to it while preserving stable selectors for verification.

## Default style preset: neutral

Default style:

- neutral/gray or project-default icon button style
- readable/high-contrast icon color
- compact square or circular hit area
- minimum practical click target
- visible hover state
- visible active/pressed state
- visible focus-visible state
- visible disabled state

Do not create a low-contrast or inaccessible icon button.

The button should have a reasonable clickable target size. Prefer at least around `36px × 36px`, or follow the project’s existing icon button sizing convention.

---

# Explicit Style Override Policy

The default visual preset is neutral.

If the user does not explicitly request style changes, use the neutral preset or the project’s existing icon button style.

If the user explicitly requests style changes, apply only those requested overrides while preserving accessibility, button semantics, and verification.

Examples:

- "make it compact" → reduce visual size only if the click target remains practical
- "make it circular" → use a circular icon button shape
- "make it ghost" → use transparent/ghost style while preserving focus and hover
- "make it filled" → use a filled neutral style
- "use a gear icon" → use a settings/gear icon if available
- "icon-only settings button" → add accessible label such as `"Open settings"`

Allowed explicit overrides:

- icon
- background color
- text/icon color
- icon size
- font size
- padding
- width
- height
- border color
- border width
- border radius
- shadow
- placement
- tooltip text
- compactness

Forbidden overrides:

- removing accessible label
- making icon-only action ambiguous
- removing keyboard accessibility
- removing focus-visible styling
- using a non-button element without accessible button semantics
- making the clickable area too small to use safely
- skipping verification
- editing unrelated files
- using destructive styling/action without confirmation when the action is destructive

If the requested icon button performs a destructive action, prefer `/ReAction-verified-destructive-confirm-button-red` instead, or require a confirmation flow.

If the requested icon button copies a value, prefer `/ReAction-verified-copy-button-neutral` unless the user specifically wants an icon-only copy button and the copy source is clear.

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
    "icon_system": "",
    "confidence": ""
  },
  "icon_button_spec": {
    "icon": "",
    "accessibleLabel": "",
    "tooltipText": "",
    "clickBehavior": "",
    "placementRequest": "",
    "disabledState": "",
    "styleOverrides": {}
  },
  "implementation_strategy": {
    "reuse_existing_component": false,
    "reuse_existing_icon": false,
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

Icon Button Request Analysis Skill

## Goal

Extract the icon button requirements and any explicit style overrides from the user's request.

## Required capabilities/tools

Read/parse user input.

## Rules

* ReAction name `/ReAction-verified-icon-button-neutral` is not the button label.
* Extract:

  * `icon`
  * `accessibleLabel`
  * `tooltipText`
  * `clickBehavior`
  * `placementRequest`
  * `disabledState`
  * `styleOverrides`
* If the user provides a visible/contextual action like `"settings button"`, derive:

  * icon: settings/gear
  * accessible label: `"Open settings"` or project-appropriate equivalent
* If the user asks for a close button, derive:

  * icon: close/x
  * accessible label: `"Close"`
* If the user asks for a menu button, derive:

  * icon: menu
  * accessible label: `"Open menu"`
* If tooltip text is missing, use accessible label as tooltip only if the project has a tooltip pattern.
* If explicit style overrides are provided, preserve them only if they do not break accessibility.

## Pause conditions

Pause if:

* the icon/action is missing
* the accessible label cannot be derived
* placement request is missing
* the requested action is destructive and no confirmation flow is included
* the click behavior is unclear and cannot be safely simulated
* the requested icon cannot be implemented safely with existing assets or simple inline SVG

## Exit criteria

Spec is fully populated and verified with no missing critical fields.

## Phase output

```json
{
  "icon": "",
  "accessibleLabel": "",
  "tooltipText": "",
  "clickBehavior": "",
  "placementRequest": "",
  "disabledState": "",
  "styleOverrides": {}
}
```

---

# Phase 2: Inspect Project and Determine Project Profile

## Skill

Project Discovery & Analysis Skill

## Goal

Inspect the codebase to identify frameworks, tools, styling, component structures, icon systems, and likely target paths.

## Required capabilities/tools

Inspect files, search code.

## Rules

Inspect:

* package configuration files
* framework configuration files
* source files
* directory structure
* existing Button/IconButton components
* existing Tooltip components
* existing icon libraries or inline SVG patterns
* existing toolbar/nav/action areas
* styling solution
* app entry points and likely target files

Identify:

* framework: React, Next.js, Vue, Svelte, Astro, plain HTML, etc.
* build tool
* language: TypeScript or JavaScript
* styling: Tailwind, CSS modules, plain CSS, MUI, Chakra, shadcn, styled-components, etc.
* component system: existing Button, IconButton, Tooltip, Dropdown, Menu components
* icon system: lucide, heroicons, material icons, custom SVG, inline SVG, etc.
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
  "icon_system": "",
  "confidence": ""
}
```

---

# Phase 3: Choose Implementation Strategy

## Skill

Icon Component Implementation Design Skill

## Goal

Determine whether to reuse existing icon button primitives, wrap them, create a project-appropriate icon button, or inline minimally.

## Required capabilities/tools

Inspect files, search code.

## Rules

* If a project already has a suitable IconButton component, prefer reusing or wrapping it.
* If a project has a suitable Button component with icon support, prefer using it.
* If a project has a Tooltip component and tooltip is appropriate, prefer using it.
* If a project uses an icon library, use the existing icon library.
* If no icon library exists, use a small inline SVG only if it is safe and clear.
* If no suitable components exist, create a small reusable icon button in the project’s component style.
* Inline only if the project has no component structure and the edit is minimal.
* Do not modify global design systems unless necessary.
* Do not rewrite unrelated architecture.
* Do not create an icon-only button without an accessible name.

## Pause conditions

Pause if implementing safely requires too many unrelated file changes.

## Exit criteria

Decision made on strategy with specified targets.

## Phase output

```json
{
  "reuse_existing_component": false,
  "reuse_existing_icon": false,
  "create_new_component": false,
  "target_files": [],
  "reason": ""
}
```

---

# Phase 4: Reason About Placement

## Skill

Safe Icon Button Placement & Layout Skill

## Goal

Resolve the requested placement into a target file and specific anchor in the code.

## Required capabilities/tools

Inspect files, search code, read browser UI/DOM if available.

## Rules

* Inspect target files and/or browser UI.
* Understand the user's placement request and choose the smallest safe edit.
* Prefer existing semantic locations if available.
* Good targets include:

  * navbar
  * header actions
  * toolbar
  * card actions
  * row actions
  * modal header
  * panel header
  * search input area
  * settings area
  * sidebar trigger area
* Use anchor-text placement if the user references visible text.
* Use fixed positioning only if the user explicitly asks for screen/corner/floating placement.
* Do not place icon buttons where the action or meaning is unclear.

## Pause conditions

Pause if:

* placement could mean multiple things
* the agent cannot find a safe target file
* the requested placement conflicts with project layout
* the icon button’s purpose would be unclear in that location

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

# Phase 5: Implement Icon Button Contract

## Skill

Icon Button Coding & Accessibility Skill

## Goal

Implement the icon button, accessible label, optional tooltip/feedback, disabled state, and placement according to the contract.

## Required capabilities/tools

Edit files.

## Rules

* Implement according to the detected project stack.
* Preserve icon button contract.
* Apply neutral preset by default.
* Apply explicit style overrides only if requested and safe.
* Use minimal edits and preserve unrelated code.
* Add stable selectors/test IDs when possible.
* Do not introduce real external side effects.
* Do not use ambiguous icons without accessible labels.
* If the project is React:

  * create/reuse component
  * use existing icon/button primitives if available
  * use inline SVG only if no icon system exists
* If the project is plain HTML:

  * use a button element, accessible label, and safe JavaScript behavior
* If the project is Vue/Svelte/etc.:

  * use that framework’s component conventions if the agent knows them confidently
  * otherwise pause

## Required interaction states

The implementation should support the relevant states for the requested action:

```txt
idle
hover
focus-visible
active
disabled
optional feedback
```

## Required user paths

The implementation must support and preserve:

```txt
Keyboard focus → visible focus state
Click icon button → requested behavior or safe demo feedback
Disabled state → cannot trigger action
```

## Pause conditions

Pause if confidence is lost or if execution is blocked by syntax errors/unsupported stack constraints.

## Exit criteria

Implementation of icon button behavior and layout insertion completed.

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

Dynamic Browser Testing & Accessibility Verification Skill

## Goal

Perform functional verification of the icon button in a rendered browser environment.

## Required capabilities/tools

Open or preview the app in a browser, inspect rendered UI, click/interact with UI, read console errors.

## Rules

Open target route and verify:

* page opens
* icon button is visible
* icon button has accessible label
* placement reasonably matches the request
* style matches neutral preset or explicit overrides
* focus-visible state is present or reasonably implemented
* click behavior works or safe demo feedback appears
* disabled state works if requested
* tooltip appears if tooltip was implemented and is verifiable
* no console errors

If browser capability is unavailable:

* do not claim complete
* report `incomplete_verification`

## Pause conditions

None.

## Exit criteria

Browser interaction verifies the full icon button contract.

## Phase output

```json
{
  "browser": "",
  "interaction": "",
  "accessibility": "",
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
* Include whether accessible label and interaction were verified.

## Exit criteria

Report generated and returned.

## Phase output

```json
{
  "status": "complete | incomplete_verification | blocked | failed",
  "reaction": "verified-icon-button-neutral",
  "project_profile": {},
  "icon_button": {
    "icon": "",
    "accessibleLabel": "",
    "tooltipText": "",
    "clickBehavior": "",
    "placementRequest": "",
    "stylePreset": "neutral",
    "styleOverridesApplied": {}
  },
  "implementation_strategy": {},
  "placement_plan": {},
  "changed_files": [],
  "verification": {
    "static_checks": "",
    "browser": "",
    "interaction": "",
    "accessibility": "",
    "console_errors": ""
  },
  "notes": []
}
```

---

# Examples

## Example 1: Settings icon button

User:

Use /ReAction-verified-icon-button-neutral. Add a settings icon button in the navbar. It should open settings.

Expected:

* neutral icon button
* settings/gear icon
* accessible label such as "Open settings"
* navbar placement
* click behavior or safe demo feedback
* browser verified

## Example 2: Close icon button

User:

Use /ReAction-verified-icon-button-neutral. Add a close icon button in the modal header.

Expected:

* neutral icon button
* close/x icon
* accessible label "Close"
* modal header placement
* browser verified

## Example 3: Icon-only more actions button

User:

Use /ReAction-verified-icon-button-neutral. Add an icon-only more actions button in the table row actions area.

Expected:

* icon-only button has accessible label
* action is clear from label/context
* browser verified

## Example 4: Missing action

User:

Use /ReAction-verified-icon-button-neutral. Add an icon button in the header.

Expected:

* pause and ask what the icon/action should be

---

# End of ReAction
