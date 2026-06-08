---
id: verified-floating-action-button-green
name: Verified Floating Action Button Green
version: 0.1.0
description: Add a verified floating action button with a green default preset, safe fixed/floating placement, accessible label, optional icon/label behavior, responsive layout rules, and browser verification.
style_mode: green_default_with_explicit_overrides
component_identity: floating-action-button
default_preset: green
execution_modes:
  - native_agent
  - reaction_runner
supported_project_policy: detect_and_adapt
browser_verification_required_for_success: true
safety:
  pause_on_unsupported_project: true
  pause_on_ambiguous_action: true
  pause_on_ambiguous_placement: true
  pause_on_missing_accessible_label: true
  pause_on_risky_or_wide_file_changes: true
  verify_before_done: true
---

# ReAction: Verified Floating Action Button Green

## Purpose

Create, reuse, or update a floating action button in a frontend project.

The default preset is green.

This ReAction is for prominent floating quick actions like:

- Create
- Add item
- New task
- Compose
- Start chat
- Quick add
- Upload
- Create project
- Add note
- New message
- Open command action
- Start recording

This ReAction is not tied to one framework or one runner. It should be followed by any capable coding agent or LLM provider using whatever file, terminal, and browser tools are available.

The ReAction’s job is to preserve a reliable floating-action-button contract while allowing project-specific implementation.

The following may vary:

- framework-specific implementation
- file path
- component name if the project has existing conventions
- icon library or inline icon strategy
- placement strategy
- button label
- accessible label
- tooltip text
- click behavior
- responsive behavior
- explicit style overrides requested by the user

The following must not vary:

- real button semantics or accessible button primitive
- accessible label
- safe floating/fixed placement
- keyboard accessibility
- focus-visible styling
- visible active/hover/disabled states
- not covering critical UI
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
- inspect responsive viewport if available
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

# Floating Action Button Contract

Every implementation must satisfy this contract.

## Required behavior

The floating action button must:

- use native button semantics or the framework’s accessible button primitive
- be keyboard accessible
- have visible accessible text or a clear accessible label
- not rely on icon alone for meaning
- use `type="button"` when applicable
- preserve focus-visible styling
- have visible hover and active states
- have visible disabled state when disabled
- support the click behavior requested by the user
- avoid real external side effects unless explicitly requested and confirmed
- be placed in a safe floating/fixed position
- avoid covering primary content, nav, cookie banners, chat widgets, form submit areas, or other important UI
- be verifiable in browser

## Floating placement behavior

The floating button may be:

- fixed to viewport
- sticky inside a panel
- floating inside a layout container
- positioned near a relevant work area

Use fixed viewport placement only when the user asks for screen/corner/floating placement or when the app clearly uses floating actions.

Common fixed placements:

- bottom right
- bottom left
- top right
- top left

Default fixed placement if user says only "floating action button":

- bottom right on desktop
- bottom right with safe mobile offset on mobile

Do not place the button in a way that hides critical UI.

## Required identifiers for verification

If the project supports test IDs or stable selectors, add:

- floating action button selector/test id: `reaction-floating-action-button-green`
- optional tooltip selector/test id: `reaction-floating-action-tooltip-green`
- optional feedback selector/test id: `reaction-floating-action-feedback-green`

If the project has a different test selector convention, adapt to it while preserving stable selectors for verification.

## Default style preset: green

Default style:

- green/emerald background or project-approved primary/success style
- readable high-contrast text or icon
- circular or rounded-full shape by default
- visible border or strong contrast boundary if needed
- clear hover state
- clear active/pressed state
- clear focus-visible state
- clear disabled state
- elevated/floating shadow or project-approved elevation
- practical click/tap target size

Prefer a practical target size around `48px × 48px` or larger unless the project has a different standard.

Do not create a low-contrast or inaccessible floating button.

---

# Explicit Style Override Policy

The default visual preset is green.

If the user does not explicitly request style changes, use the green floating preset or the project’s existing floating action style.

If the user explicitly requests style changes, apply only those requested overrides while preserving accessibility, placement safety, and verification.

Examples:

- "make it bottom right" → use safe fixed bottom-right placement
- "make it bottom left" → use safe fixed bottom-left placement
- "make it circular" → use rounded-full/circular shape
- "show only a plus icon" → require accessible label such as "Create item"
- "show icon and label" → use extended FAB style
- "make it white" → apply white style override while preserving contrast and focus state
- "hide on mobile" → only if explicitly requested and verified

Allowed explicit overrides:

- placement
- icon
- visible label
- accessible label
- tooltip text
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
- shadow/elevation
- compactness
- responsive behavior

Forbidden overrides:

- removing accessible label
- making icon-only action ambiguous
- removing keyboard accessibility
- removing focus-visible styling
- using a non-button element without accessible button semantics
- making the clickable area too small to use safely
- placing it over important content
- skipping verification
- editing unrelated files
- using destructive action without confirmation
- using copy behavior without clear source

If the floating action is destructive, prefer `/ReAction-verified-destructive-confirm-button-red` or require confirmation.

If the floating action copies a value, prefer `/ReAction-verified-copy-button-neutral` unless the source is clear and the user specifically wants a floating copy action.

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
    "layout_system": "",
    "confidence": ""
  },
  "floating_action_button_spec": {
    "action": "",
    "visibleLabel": "",
    "accessibleLabel": "",
    "icon": "",
    "tooltipText": "",
    "clickBehavior": "",
    "placementRequest": "",
    "responsiveBehavior": "",
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
    "css_positioning": "",
    "description": ""
  },
  "changed_files": [],
  "checks": {
    "static": "",
    "browser": "",
    "interaction": "",
    "accessibility": "",
    "placement": "",
    "console": ""
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand User Request

## Skill

Floating Action Request Analysis Skill

## Goal

Extract the floating action button requirements and any explicit style/placement overrides from the user's request.

## Required capabilities/tools

Read/parse user input.

## Rules

* ReAction name `/ReAction-verified-floating-action-button-green` is not the button label.
* Extract:

  * `action`
  * `visibleLabel`
  * `accessibleLabel`
  * `icon`
  * `tooltipText`
  * `clickBehavior`
  * `placementRequest`
  * `responsiveBehavior`
  * `disabledState`
  * `styleOverrides`
* If the user provides an action like `"create task"` or `"add item"`, derive:

  * icon: plus/add if available
  * accessible label: `"Create task"` or `"Add item"`
* If the user asks for icon-only, accessible label is required.
* If visible label is missing but icon-only behavior is implied, derive accessible label from the action.
* If placement is missing, default to bottom-right only if the user clearly asked for a floating action button. Otherwise pause.
* If click behavior is missing but can be safely simulated, use safe demo feedback.
* If explicit style overrides are provided, preserve them only if they do not break accessibility or placement safety.

## Pause conditions

Pause if:

* the action is missing
* accessible label cannot be derived
* placement request is ambiguous
* click behavior is unclear and cannot be safely simulated
* the requested action is destructive and no confirmation flow is included
* requested placement would likely cover important UI
* requested icon cannot be implemented safely with existing assets or simple inline SVG

## Exit criteria

Spec is fully populated and verified with no missing critical fields.

## Phase output

```json
{
  "action": "",
  "visibleLabel": "",
  "accessibleLabel": "",
  "icon": "",
  "tooltipText": "",
  "clickBehavior": "",
  "placementRequest": "",
  "responsiveBehavior": "",
  "disabledState": "",
  "styleOverrides": {}
}
```

---

# Phase 2: Inspect Project and Determine Project Profile

## Skill

Project Discovery & Analysis Skill

## Goal

Inspect the codebase to identify frameworks, tools, styling, component structures, icon systems, layout patterns, and likely target paths.

## Required capabilities/tools

Inspect files, search code.

## Rules

Inspect:

* package configuration files
* framework configuration files
* source files
* directory structure
* existing Button/IconButton/FAB components
* existing Tooltip components
* existing icon libraries or inline SVG patterns
* existing layout shell/root app files
* existing floating elements such as chat widgets, cookie banners, toasts, command triggers
* styling solution
* app entry points and likely target files

Identify:

* framework: React, Next.js, Vue, Svelte, Astro, plain HTML, etc.
* build tool
* language: TypeScript or JavaScript
* styling: Tailwind, CSS modules, plain CSS, MUI, Chakra, shadcn, styled-components, etc.
* component system: existing Button, IconButton, FloatingActionButton, Tooltip components
* icon system: lucide, heroicons, material icons, custom SVG, inline SVG, etc.
* layout system: app shell, root layout, page component, dashboard shell, etc.
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
  "layout_system": "",
  "confidence": ""
}
```

---

# Phase 3: Choose Implementation Strategy

## Skill

Floating Action Component Implementation Design Skill

## Goal

Determine whether to reuse existing FAB/button/icon primitives, wrap them, create a project-appropriate floating action button, or inline minimally.

## Required capabilities/tools

Inspect files, search code.

## Rules

* If a project already has a suitable FloatingActionButton/FAB component, prefer reusing or wrapping it.
* If a project has a suitable Button or IconButton component, prefer using it with floating placement.
* If a project has a Tooltip component and tooltip is appropriate, prefer using it.
* If a project uses an icon library, use the existing icon library.
* If no icon library exists, use a small inline SVG only if safe and clear.
* If no suitable components exist, create a small reusable floating action button in the project’s component style.
* Inline only if the project has no component structure and the edit is minimal.
* Do not modify global design systems unless necessary.
* Do not rewrite unrelated architecture.
* Do not create an icon-only floating button without an accessible name.
* Do not place the button over important UI.

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

# Phase 4: Reason About Floating Placement

## Skill

Safe Floating Placement & Layout Skill

## Goal

Resolve the requested floating placement into a target file, insertion location, and safe positioning rules.

## Required capabilities/tools

Inspect files, search code, read browser UI/DOM if available.

## Rules

* Inspect target files and/or browser UI.
* Understand the user's placement request and choose the smallest safe edit.
* Prefer existing app shell/root layout locations for global floating buttons.
* Prefer page-level target files for page-specific floating buttons.
* Use fixed viewport positioning when the user asks for corner/screen/floating placement.
* Use sticky/container placement when the user asks for a floating action inside a panel or section.
* Avoid overlapping:

  * navigation bars
  * bottom nav
  * cookie banners
  * chat widgets
  * toast containers
  * form submit bars
  * important content
* Use safe offsets from edges.
* Consider mobile viewport behavior if browser tools allow it.

Common positioning suggestions:

* bottom right: bottom and right safe offsets
* bottom left: bottom and left safe offsets
* top right: top and right safe offsets
* top left: top and left safe offsets

Do not hardcode to one framework or CSS system. Use the project’s styling approach.

## Pause conditions

Pause if:

* placement could mean multiple things
* the agent cannot find a safe target file
* the requested placement conflicts with project layout
* the button would cover important UI
* the floating button’s purpose would be unclear in that location

## Exit criteria

Concrete placement plan detailing strategy, target file, anchor, and positioning.

## Phase output

```json
{
  "strategy": "",
  "target_file": "",
  "anchor": "",
  "css_positioning": "",
  "description": ""
}
```

---

# Phase 5: Implement Floating Action Button Contract

## Skill

Floating Action Button Coding & Accessibility Skill

## Goal

Implement the floating action button, accessible label, optional icon/tooltip/feedback, safe placement, responsive behavior, and interaction according to the contract.

## Required capabilities/tools

Edit files.

## Rules

* Implement according to the detected project stack.
* Preserve floating action button contract.
* Apply green preset by default.
* Apply explicit style overrides only if requested and safe.
* Use minimal edits and preserve unrelated code.
* Add stable selectors/test IDs when possible.
* Do not introduce real external side effects.
* Do not use ambiguous icons without accessible labels.
* If the project is React:

  * create/reuse component
  * use existing button/icon primitives if available
  * use inline SVG only if no icon system exists
* If the project is plain HTML:

  * use a button element, accessible label, and safe JavaScript behavior
* If the project is Vue/Svelte/etc.:

  * use that framework’s component conventions if the agent knows them confidently
  * otherwise pause

## Required interaction states

The implementation should support relevant states:

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
Click floating action → requested behavior or safe demo feedback
Disabled state → cannot trigger action
Responsive viewport → placement remains safe
```

## Pause conditions

Pause if confidence is lost or if execution is blocked by syntax errors/unsupported stack constraints.

## Exit criteria

Implementation of floating action behavior and layout insertion completed.

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

Dynamic Browser Testing, Placement & Accessibility Verification Skill

## Goal

Perform functional and placement verification of the floating action button in a rendered browser environment.

## Required capabilities/tools

Open or preview the app in a browser, inspect rendered UI, click/interact with UI, inspect responsive viewport if available, read console errors.

## Rules

Open target route and verify:

* page opens
* floating action button is visible
* button has accessible label
* placement reasonably matches the request
* button appears above content but does not cover important UI
* style matches green preset or explicit overrides
* focus-visible state is present or reasonably implemented
* click behavior works or safe demo feedback appears
* disabled state works if requested
* responsive viewport placement remains safe if available
* no console errors

If browser capability is unavailable:

* do not claim complete
* report `incomplete_verification`

## Pause conditions

None.

## Exit criteria

Browser interaction verifies the full floating action button contract.

## Phase output

```json
{
  "browser": "",
  "interaction": "",
  "accessibility": "",
  "placement": "",
  "responsive": "",
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
* Include whether accessible label, interaction, placement, and responsive safety were verified.

## Exit criteria

Report generated and returned.

## Phase output

```json
{
  "status": "complete | incomplete_verification | blocked | failed",
  "reaction": "verified-floating-action-button-green",
  "project_profile": {},
  "floating_action_button": {
    "action": "",
    "visibleLabel": "",
    "accessibleLabel": "",
    "icon": "",
    "tooltipText": "",
    "clickBehavior": "",
    "placementRequest": "",
    "responsiveBehavior": "",
    "stylePreset": "green",
    "styleOverridesApplied": {},
    "disabledState": ""
  },
  "implementation_strategy": {},
  "placement_plan": {},
  "changed_files": [],
  "verification": {
    "static_checks": "",
    "browser": "",
    "interaction": "",
    "accessibility": "",
    "placement": "",
    "responsive": "",
    "console_errors": ""
  },
  "notes": []
}
```

---

# Examples

## Example 1: Create task FAB

User:

Use /ReAction-verified-floating-action-button-green. Add a floating "Create task" button in the bottom right corner. Use a plus icon and show "Task action opened" when clicked.

Expected:

- green floating action button
- bottom-right safe placement
- plus icon or visible label
- accessible label such as "Create task"
- click behavior or safe demo feedback
- browser verified

## Example 2: Compose message FAB

User:

Use /ReAction-verified-floating-action-button-green. Add a circular compose button in the bottom right of the inbox page.

Expected:

- green circular floating action button
- accessible label such as "Compose message"
- safe placement that does not cover inbox content
- browser verified

## Example 3: Extended FAB

User:

Use /ReAction-verified-floating-action-button-green. Add an extended floating button labeled "Quick add" at the bottom left.

Expected:

- green extended floating action button
- visible label
- safe bottom-left placement
- browser verified

## Example 4: Missing action

User:

Use /ReAction-verified-floating-action-button-green. Add a floating button at the bottom right.

Expected:

- pause and ask what action the floating button should perform

---

# End of ReAction
