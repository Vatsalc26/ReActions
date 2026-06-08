---
id: verified-split-button-menu
name: Verified Split Button Menu
version: 0.1.0
description: Add a verified split button with a primary action, secondary menu actions, accessible menu behavior, keyboard support, open/close state, optional async primary action, and browser verification.
style_mode: primary_plus_menu_default_with_explicit_overrides
component_identity: split-button-menu
default_preset: primary-with-neutral-menu
execution_modes:
  - native_agent
  - reaction_runner
supported_project_policy: detect_and_adapt
browser_verification_required_for_success: true
safety:
  pause_on_unsupported_project: true
  pause_on_ambiguous_primary_action: true
  pause_on_missing_menu_actions: true
  pause_on_ambiguous_placement: true
  pause_on_risky_or_wide_file_changes: true
  verify_before_done: true
---

# ReAction: Verified Split Button Menu

## Purpose

Create, reuse, or update a split button menu in a frontend project.

A split button combines:

- one primary visible action
- one adjacent menu trigger
- a menu of related secondary actions

This ReAction is for compound action patterns like:

- Save + Save as draft / Save and close
- Export + Export as CSV / PDF / JSON
- Deploy + Deploy preview / Deploy production
- Create + Create project / team / workspace
- Share + Copy link / Invite user / Send email
- Publish + Schedule / Publish now / Save draft
- Download + Download image / PDF / CSV
- Run + Run once / Schedule / Dry run

This ReAction is not tied to one framework or one runner. It should be followed by any capable coding agent or LLM provider using whatever file, terminal, and browser tools are available.

The ReAction’s job is to preserve a reliable split-button contract while allowing project-specific implementation.

The following may vary:

- framework-specific implementation
- file path
- component name if the project has existing conventions
- primary action label
- primary action behavior
- menu trigger label/icon
- menu action labels
- menu action behaviors
- placement strategy
- loading behavior
- disabled behavior
- explicit style overrides requested by the user

The following must not vary:

- real button semantics or accessible button/menu primitives
- primary action and menu trigger must be separate controls
- menu open/close state
- accessible menu behavior
- keyboard accessibility
- focus-visible styling
- menu item selection behavior
- outside click or escape closes menu when applicable
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
- keyboard-interact with rendered UI if available
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

# Split Button Contract

Every implementation must satisfy this contract.

## Required behavior

The split button must:

- use native button semantics or the framework’s accessible button/menu primitives
- have a primary action button
- have a separate menu trigger button
- clearly identify the primary action
- clearly expose secondary menu actions
- support menu open/close state
- be keyboard accessible
- preserve focus-visible styling
- have visible hover and active states
- have visible disabled state when disabled
- allow selecting menu items
- avoid real external side effects unless explicitly requested and confirmed
- be verifiable in browser

## Primary action behavior

The primary action must be directly invokable without opening the menu.

If the primary action is async, it should support:

- loading state
- disabled state while loading
- duplicate action prevention while loading
- success or feedback state

If the primary action is destructive, stop and prefer `/ReAction-verified-destructive-confirm-button-red` or require a confirmation flow.

## Menu behavior

The menu trigger must:

- open the menu
- close the menu when clicked again if appropriate
- expose an accessible name such as `"More save actions"` or `"More export options"`
- indicate expanded/collapsed state if the project convention supports it
- not be the same clickable target as the primary action

The menu must:

- contain the requested secondary actions
- use accessible menu/listbox/dropdown/popover semantics appropriate for the project
- support mouse interaction
- support keyboard interaction when the project/tooling allows verification
- close on item selection unless project convention says otherwise
- close on Escape and/or outside click when using a popover/menu pattern

## Required identifiers for verification

If the project supports test IDs or stable selectors, add:

- split button container selector/test id: `reaction-split-button-menu`
- primary action selector/test id: `reaction-split-primary-button`
- menu trigger selector/test id: `reaction-split-menu-trigger`
- menu container selector/test id: `reaction-split-menu`
- menu item selector/test id prefix: `reaction-split-menu-item`
- optional feedback selector/test id: `reaction-split-feedback`

If the project has a different test selector convention, adapt to it while preserving stable selectors for verification.

## Default style preset: primary with neutral menu

Default style:

- primary action uses project primary style or green/primary action style
- menu trigger visually attaches to or aligns with primary action
- menu trigger has lower or equal emphasis than primary action
- menu uses neutral surface/background
- readable high-contrast text
- clear hover state for menu items
- clear focus-visible state
- clear disabled state if disabled
- border/radius/shadow appropriate for dropdown menus

Do not create a low-contrast, ambiguous, or inaccessible split button.

---

# Explicit Style Override Policy

The default visual preset is primary action plus neutral menu.

If the user does not explicitly request style changes, use the project’s existing primary/dropdown/menu styles when available.

If the user explicitly requests style changes, apply only those requested overrides while preserving accessibility, menu behavior, and verification.

Examples:

- "make it compact" → reduce padding/size while keeping practical click targets
- "make it green" → use green primary action
- "make the menu neutral" → use neutral menu surface
- "use a chevron icon" → use chevron/down icon if available
- "make it full width" → full-width group only if layout supports it
- "put it in the toolbar" → place in toolbar action area if safe

Allowed explicit overrides:

- primary color
- menu surface color
- text/icon color
- icon usage
- font size
- font weight
- padding
- width
- border color
- border width
- border radius
- shadow/elevation
- placement
- compactness
- full-width behavior

Forbidden overrides:

- merging primary action and menu trigger into one ambiguous button
- removing accessible names
- removing keyboard accessibility
- removing focus-visible styling
- making menu items inaccessible
- making the primary action destructive without confirmation
- skipping verification
- editing unrelated files
- adding real external side effects without explicit confirmation

If the split button is mainly destructive, use `/ReAction-verified-destructive-confirm-button-red`.

If it is only a simple primary action with no menu, use `/ReAction-verified-async-cta-button-green`.

If it is only a secondary action, use `/ReAction-verified-secondary-button-neutral`.

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
    "menu_system": "",
    "icon_system": "",
    "confidence": ""
  },
  "split_button_spec": {
    "primaryLabel": "",
    "primaryBehavior": "",
    "menuTriggerLabel": "",
    "menuActions": [],
    "loadingBehavior": "",
    "disabledState": "",
    "placementRequest": "",
    "styleOverrides": {}
  },
  "implementation_strategy": {
    "reuse_existing_button": false,
    "reuse_existing_menu": false,
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
    "primary_action": "",
    "menu_behavior": "",
    "keyboard": "",
    "console": ""
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand User Request

## Skill

Split Button Request Analysis Skill

## Goal

Extract the split button requirements and any explicit style overrides from the user's request.

## Required capabilities/tools

Read/parse user input.

## Rules

* ReAction name `/ReAction-verified-split-button-menu` is not the primary label.
* Extract:

  * `primaryLabel`
  * `primaryBehavior`
  * `menuTriggerLabel`
  * `menuActions`
  * `loadingBehavior`
  * `disabledState`
  * `placementRequest`
  * `styleOverrides`
* If menu trigger label is missing, derive from the primary action:

  * `"Save"` → `"More save actions"`
  * `"Export"` → `"More export options"`
  * `"Deploy"` → `"More deploy options"`
* If the menu actions are missing, pause and ask.
* If primary label is missing, pause and ask.
* If placement request is missing, pause and ask.
* If primary behavior is missing but can be safely simulated, use safe demo feedback.
* If menu item behavior is missing but can be safely simulated, use safe demo feedback.
* If any action is destructive, require confirmation or redirect to destructive ReAction.

## Pause conditions

Pause if:

* primary action is missing
* menu actions are missing
* placement request is missing
* the user only requested a normal button, not a split/menu button
* action behavior is dangerous or destructive without confirmation
* menu items are ambiguous or duplicate

## Exit criteria

Spec is fully populated and verified with no missing critical fields.

## Phase output

```json
{
  "primaryLabel": "",
  "primaryBehavior": "",
  "menuTriggerLabel": "",
  "menuActions": [],
  "loadingBehavior": "",
  "disabledState": "",
  "placementRequest": "",
  "styleOverrides": {}
}
```

---

# Phase 2: Inspect Project and Determine Project Profile

## Skill

Project Discovery & Analysis Skill

## Goal

Inspect the codebase to identify frameworks, tools, styling, component structures, menu/dropdown systems, icon systems, and likely target paths.

## Required capabilities/tools

Inspect files, search code.

## Rules

Inspect:

* package configuration files
* framework configuration files
* source files
* directory structure
* existing Button components
* existing Dropdown/Menu/Popover components
* existing SplitButton components
* existing Toolbar/ActionRow components
* existing icon libraries or inline SVG patterns
* styling solution
* app entry points and likely target files

Identify:

* framework: React, Next.js, Vue, Svelte, Astro, plain HTML, etc.
* build tool
* language: TypeScript or JavaScript
* styling: Tailwind, CSS modules, plain CSS, MUI, Chakra, shadcn, styled-components, etc.
* component system: existing Button, Dropdown, Menu, Popover, SplitButton components
* menu system: existing menu/dropdown/popup pattern
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
  "menu_system": "",
  "icon_system": "",
  "confidence": ""
}
```

---

# Phase 3: Choose Implementation Strategy

## Skill

Split Button Implementation Design Skill

## Goal

Determine whether to reuse existing button/menu primitives, wrap them, create a project-appropriate split button, or inline minimally.

## Required capabilities/tools

Inspect files, search code.

## Rules

* If a project already has a suitable SplitButton component, prefer reusing or wrapping it.
* If a project has suitable Button and Menu/Dropdown/Popover components, prefer using them.
* If a project uses a component library, use its accessible menu/dropdown primitives when appropriate.
* If no suitable components exist, create a small reusable split button in the project’s component style.
* Inline only if the project has no component structure and the edit is minimal.
* Do not modify global design systems unless necessary.
* Do not rewrite unrelated architecture.
* Do not create inaccessible custom menus if a project has better primitives.
* Do not implement destructive menu actions without confirmation.

## Pause conditions

Pause if implementing safely requires too many unrelated file changes.

## Exit criteria

Decision made on strategy with specified targets.

## Phase output

```json
{
  "reuse_existing_button": false,
  "reuse_existing_menu": false,
  "create_new_component": false,
  "target_files": [],
  "reason": ""
}
```

---

# Phase 4: Reason About Placement

## Skill

Safe Split Button Placement & Layout Skill

## Goal

Resolve the requested placement into a target file and specific anchor in the code.

## Required capabilities/tools

Inspect files, search code, read browser UI/DOM if available.

## Rules

* Inspect target files and/or browser UI.
* Understand the user's placement request and choose the smallest safe edit.
* Prefer existing semantic locations if available.
* Good targets include:

  * toolbar
  * header actions
  * form footer
  * card footer
  * export area
  * deployment panel
  * table action area
  * command area
  * document editor toolbar
* Use anchor-text placement if the user references visible text.
* Use fixed positioning only if explicitly requested.
* Do not place split buttons where the primary/menu action relationship is unclear.

## Pause conditions

Pause if:

* placement could mean multiple things
* the agent cannot find a safe target file
* the requested placement conflicts with project layout
* the split button’s purpose would be unclear in that location

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

# Phase 5: Implement Split Button Contract

## Skill

Split Button Coding & Menu Accessibility Skill

## Goal

Implement the primary button, menu trigger, menu actions, open/close behavior, optional loading state, accessibility, and placement according to the contract.

## Required capabilities/tools

Edit files.

## Rules

* Implement according to the detected project stack.
* Preserve split button contract.
* Apply project primary + neutral menu style by default.
* Apply explicit style overrides only if requested and safe.
* Use minimal edits and preserve unrelated code.
* Add stable selectors/test IDs when possible.
* Do not introduce real external side effects.
* If the project is React:

  * create/reuse component
  * use existing Button/Menu primitives if available
  * use state for menu open/closed if needed
  * use state for safe demo feedback if needed
* If the project is plain HTML:

  * use real buttons and safe JavaScript menu behavior
* If the project is Vue/Svelte/etc.:

  * use that framework’s component conventions if the agent knows them confidently
  * otherwise pause

## Required interaction states

The implementation should support:

```txt
idle
primary_loading_if_async
menu_closed
menu_open
menu_item_selected
focus-visible
disabled
optional feedback
```

## Required user paths

The implementation must support and preserve:

```txt
Click primary action → primary action/feedback
Click menu trigger → menu opens
Click menu trigger again or Escape/outside click → menu closes
Click menu item → item action/feedback and menu closes
Keyboard focus → visible focus state
Disabled state → cannot trigger action
```

## Pause conditions

Pause if confidence is lost or if execution is blocked by syntax errors/unsupported stack constraints.

## Exit criteria

Implementation of split button behavior and layout insertion completed.

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

Dynamic Browser Testing & Menu Verification Skill

## Goal

Perform functional verification of the split button and menu behavior in a rendered browser environment.

## Required capabilities/tools

Open or preview the app in a browser, inspect rendered UI, click/interact with UI, keyboard-interact if available, read console errors.

## Rules

Open target route and verify:

* page opens
* split button container is visible
* primary button is visible
* primary label matches requested label
* menu trigger is visible and has accessible name
* placement reasonably matches the request
* primary click works or safe demo feedback appears
* menu trigger opens the menu
* menu items are visible
* menu items match requested actions
* selecting a menu item works or safe demo feedback appears
* menu closes after selection when appropriate
* Escape closes menu if keyboard interaction is available
* outside click closes menu if implemented and verifiable
* focus-visible states are present or reasonably implemented
* disabled state works if requested
* no console errors

If browser capability is unavailable:

* do not claim complete
* report `incomplete_verification`

## Pause conditions

None.

## Exit criteria

Browser interaction verifies the full split button menu contract.

## Phase output

```json
{
  "browser": "",
  "primary_action": "",
  "menu_behavior": "",
  "keyboard": "",
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
* Include whether primary action, menu behavior, keyboard behavior, and accessibility were verified.

## Exit criteria

Report generated and returned.

## Phase output

```json
{
  "status": "complete | incomplete_verification | blocked | failed",
  "reaction": "verified-split-button-menu",
  "project_profile": {},
  "split_button": {
    "primaryLabel": "",
    "primaryBehavior": "",
    "menuTriggerLabel": "",
    "menuActions": [],
    "loadingBehavior": "",
    "placementRequest": "",
    "stylePreset": "primary-with-neutral-menu",
    "styleOverridesApplied": {},
    "disabledState": ""
  },
  "implementation_strategy": {},
  "placement_plan": {},
  "changed_files": [],
  "verification": {
    "static_checks": "",
    "browser": "",
    "primary_action": "",
    "menu_behavior": "",
    "keyboard": "",
    "accessibility": "",
    "console_errors": ""
  },
  "notes": []
}
```

---

# Examples

## Example 1: Export split button

User:

Use /ReAction-verified-split-button-menu. Add an "Export" split button in the report toolbar. Primary action exports CSV. Menu actions: Export PDF, Export JSON, Copy share link.

Expected:

* primary Export action
* menu trigger
* menu contains PDF, JSON, Copy share link
* accessible menu behavior
* browser verified

## Example 2: Save split button

User:

Use /ReAction-verified-split-button-menu. Add a "Save" split button in the editor footer. Primary action saves changes. Menu actions: Save as draft, Save and close.

Expected:

* primary Save action
* menu actions
* safe demo feedback or project action
* browser verified

## Example 3: Deploy split button

User:

Use /ReAction-verified-split-button-menu. Add a "Deploy" split button in the deployment panel. Menu actions: Deploy preview, Deploy production, Dry run.

Expected:

* primary Deploy action
* menu actions
* no real deployment unless explicitly confirmed
* browser verified

## Example 4: Missing menu actions

User:

Use /ReAction-verified-split-button-menu. Add a Save split button in the footer.

Expected:

* pause and ask what menu actions should be included

---

# End of ReAction
