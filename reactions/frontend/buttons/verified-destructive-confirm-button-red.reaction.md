---
id: verified-destructive-confirm-button-red
name: Verified Destructive Confirm Button Red
version: 0.1.0
description: Add a verified destructive action button with a red default preset, mandatory confirmation flow, async loading state, success feedback, accessibility requirements, and browser verification.
style_mode: red_destructive_default_with_safe_overrides
component_identity: destructive-confirm-button
default_preset: red
execution_modes:
  - native_agent
  - reaction_runner
supported_project_policy: detect_and_adapt
browser_verification_required_for_success: true
safety:
  pause_on_unsupported_project: true
  pause_on_ambiguous_placement: true
  pause_on_risky_or_wide_file_changes: true
  require_confirmation_flow: true
  verify_before_done: true
---

# ReAction: Verified Destructive Confirm Button Red

## Purpose

Create, reuse, or update a destructive action button in a frontend project.

The default preset is red.

This ReAction is for actions like:

- Delete Project
- Remove User
- Revoke API Key
- Cancel Subscription
- Archive Workspace
- Reset Settings
- Remove Integration

This ReAction is not tied to one framework or one runner. It should be followed by any capable coding agent or LLM provider using whatever file, terminal, and browser tools are available.

The ReAction’s job is to preserve a safe destructive-action contract while allowing project-specific implementation.

The following may vary:

- framework-specific implementation
- file path
- component name if the project has existing conventions
- placement strategy
- trigger button label
- confirmation dialog title/body
- cancel label
- confirm label
- loading label
- success message
- explicit style overrides requested by the user

The following must not vary:

- real button semantics
- destructive action must require confirmation before action
- cancel path must be available
- async loading state after confirmation
- disabled state while loading
- duplicate action prevention while loading
- success feedback after completion
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

# Destructive Button Contract

Every implementation must satisfy this contract.

## Required behavior

The destructive button must:

- use native button semantics or the framework’s accessible button primitive
- be keyboard accessible
- have visible accessible text
- clearly communicate that the action is destructive
- open a confirmation dialog, modal, popover, or equivalent confirmation UI before performing the action
- provide a cancel action
- provide a confirm destructive action
- avoid real external destructive side effects unless explicitly requested and confirmed by the user
- support a loading label after confirmation
- disable itself or the confirm action while loading
- prevent duplicate destructive confirmation while loading
- show success feedback after completion
- preserve focus-visible styling
- preserve focus management if a modal/dialog is used
- be verifiable in browser

## Required confirmation behavior

The destructive action must not run immediately on first click.

The expected flow is:

```txt
Trigger destructive button
→ confirmation UI opens
→ user can cancel safely
→ user can confirm
→ loading state appears
→ success feedback appears
```

The cancel path must be verified.

The confirm path must be verified.

## Required identifiers for verification

If the project supports test IDs or stable selectors, add:

* trigger button selector/test id: `reaction-destructive-trigger-button-red`
* confirmation container selector/test id: `reaction-destructive-confirm-dialog-red`
* cancel button selector/test id: `reaction-destructive-cancel-button-red`
* confirm button selector/test id: `reaction-destructive-confirm-button-red`
* success selector/test id: `reaction-destructive-success-red`

If the project has a different test selector convention, adapt to it while preserving stable selectors for verification.

## Default style preset: red

Default style:

* red/destructive background or red destructive border style
* readable high-contrast text
* visible border or strong contrast boundary
* clear hover state
* clear active/pressed state
* clear focus-visible state
* visible disabled/loading state
* visual styling should communicate danger/destructive intent

Do not create a low-contrast or ambiguous destructive button.

---

# Explicit Style Override Policy

The default visual preset is red.

If the user does not explicitly request style changes, use the red destructive preset or the project’s existing destructive variant.

If the user explicitly requests style changes, apply only those requested overrides while preserving destructive clarity and the confirmation flow.

Examples:

* "make it compact" → reduce size/padding while preserving destructive affordance
* "make it outline instead of filled" → use red outline/destructive outline style
* "make it pill shaped" → use fully rounded shape
* "place it in the danger zone" → place near the settings/account danger area if safely identifiable
* "make it neutral" → pause and confirm because neutral styling may hide destructive intent

Allowed explicit overrides:

* background color
* text color
* font family
* font size
* font weight
* padding
* width
* border color
* border width
* border radius
* shadow
* placement
* compactness

Forbidden overrides:

* removing the confirmation step
* making the destructive action execute on first click
* removing cancel path
* removing loading state
* removing success feedback
* removing disabled state while loading
* removing keyboard accessibility
* making the destructive action visually misleading
* skipping verification
* editing unrelated files
* performing real external destructive side effects without explicit confirmation

If the user asks to skip confirmation, pause and explain that this ReAction requires confirmation for destructive actions.

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
  "destructive_button_spec": {
    "triggerLabel": "",
    "confirmationTitle": "",
    "confirmationBody": "",
    "cancelLabel": "Cancel",
    "confirmLabel": "",
    "loadingLabel": "",
    "successMessage": "",
    "placementRequest": "",
    "styleOverrides": {}
  },
  "implementation_strategy": {
    "reuse_existing_component": false,
    "reuse_existing_dialog": false,
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
    "cancel_path": "",
    "confirm_path": "",
    "console": ""
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand User Request

## Skill

Destructive Action Request Analysis Skill

## Goal

Extract the destructive action requirements and any explicit style overrides from the user's request.

## Required capabilities/tools

Read/parse user input.

## Rules

* ReAction name `/ReAction-verified-destructive-confirm-button-red` is not the button label.
* Extract:

  * `triggerLabel`
  * `confirmationTitle`
  * `confirmationBody`
  * `cancelLabel`
  * `confirmLabel`
  * `loadingLabel`
  * `successMessage`
  * `placementRequest`
  * `styleOverrides`
* If cancel label is missing, use `"Cancel"`.
* If confirm label is missing, derive it from the destructive action.

  * Example: `"Delete Project"` → `"Delete Project"`
  * Example: `"Revoke API Key"` → `"Revoke API Key"`
* If loading label is missing, derive it from the destructive verb.

  * `"Delete Project"` → `"Deleting..."`
  * `"Remove User"` → `"Removing..."`
  * `"Revoke API Key"` → `"Revoking..."`
  * `"Cancel Subscription"` → `"Cancelling..."`
* If success message is missing, derive it from the action.

  * `"Delete Project"` → `"Project deleted"`
  * `"Remove User"` → `"User removed"`
  * `"Revoke API Key"` → `"API key revoked"`
* If confirmation title is missing, derive it.

  * `"Delete Project"` → `"Delete project?"`
* If confirmation body is missing, create a short safe warning.

  * Example: `"This action cannot be undone."`
* If explicit style overrides are provided, preserve them only if they do not hide destructive intent.

## Pause conditions

Pause if:

* no destructive trigger label/action is provided
* no placement request is provided
* the requested action is not clearly destructive
* the user asks to skip confirmation
* the user requests misleading styling that hides destructive intent

## Exit criteria

Spec is fully populated and verified with no missing critical fields.

## Phase output

```json
{
  "triggerLabel": "",
  "confirmationTitle": "",
  "confirmationBody": "",
  "cancelLabel": "Cancel",
  "confirmLabel": "",
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

Inspect the codebase to identify frameworks, tools, styling, component structures, dialog/modal patterns, and likely target paths.

## Required capabilities/tools

Inspect files, search code.

## Rules

Inspect:

* package configuration files
* framework configuration files
* source files
* directory structure
* existing Button components
* existing Dialog/Modal/AlertDialog components
* existing danger zone/settings/account areas
* styling solution
* app entry points and likely target files

Identify:

* framework: React, Next.js, Vue, Svelte, Astro, plain HTML, etc.
* build tool
* language: TypeScript or JavaScript
* styling: Tailwind, CSS modules, plain CSS, MUI, Chakra, shadcn, styled-components, etc.
* component system: existing Button, Dialog, Modal, AlertDialog components
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
  "dialog_system": "",
  "confidence": ""
}
```

---

# Phase 3: Choose Implementation Strategy

## Skill

Destructive Component Implementation Design Skill

## Goal

Determine whether to reuse existing button/dialog primitives, wrap them, create a new project-appropriate component, or inline minimally.

## Required capabilities/tools

Inspect files, search code.

## Rules

* If a project already has a suitable destructive Button variant, prefer reusing or wrapping it.
* If a project already has a Dialog, Modal, ConfirmDialog, or AlertDialog component, prefer using it.
* If the project uses a component library, use the library’s accessible button/dialog primitives.
* If no suitable components exist, create a small reusable destructive confirm button in the project’s component style.
* Inline only if the project has no component structure and the edit is minimal.
* Do not modify global design systems unless necessary.
* Do not rewrite unrelated architecture.
* Do not perform real destructive external effects unless explicitly requested and confirmed.

## Pause conditions

Pause if implementing safely requires too many unrelated file changes.

## Exit criteria

Decision made on strategy with specified targets.

## Phase output

```json
{
  "reuse_existing_component": false,
  "reuse_existing_dialog": false,
  "create_new_component": false,
  "target_files": [],
  "reason": ""
}
```

---

# Phase 4: Reason About Placement

## Skill

Safe Destructive Placement & Layout Skill

## Goal

Resolve the requested placement into a target file and specific anchor in the code.

## Required capabilities/tools

Inspect files, search code, read browser UI/DOM if available.

## Rules

* Inspect target files and/or browser UI.
* Understand the user's placement request and choose the smallest safe edit.
* Prefer existing semantic locations if available.
* Good targets include:

  * danger zone
  * settings footer
  * account settings
  * project settings
  * row actions menu
  * API key card
  * subscription card
* Use anchor-text placement if the user references visible text.
* Use fixed positioning only if the user explicitly asks for screen/corner/floating placement.
* Do not place destructive actions in misleading or accidental-click-prone locations unless explicitly requested and confirmed.

## Pause conditions

Pause if:

* placement could mean multiple things
* the agent cannot find a safe target file
* the requested placement conflicts with project layout
* the placement would make accidental destructive actions likely

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

# Phase 5: Implement Destructive Button Contract

## Skill

Destructive Component Coding & Safety Skill

## Goal

Implement the destructive trigger, confirmation flow, cancel path, confirm path, loading state, success feedback, and placement according to the contract.

## Required capabilities/tools

Edit files.

## Rules

* Implement according to the detected project stack.
* Preserve destructive button contract.
* Apply red/destructive preset by default.
* Apply explicit style overrides only if requested and safe.
* Use minimal edits and preserve unrelated code.
* Do not introduce real external side effects unless explicitly requested and confirmed.
* For demo or unspecified side effects, simulate the destructive action.
* Add stable selectors/test IDs when possible.
* If the project is React:

  * create/reuse component
  * use state for confirmation open/closed
  * use state for loading/success
* If the project is plain HTML:

  * use button element, dialog or accessible confirmation UI, and JS safely
* If the project is Vue/Svelte/etc.:

  * use that framework’s component conventions if the agent knows them confidently
  * otherwise pause

## Required interaction states

The implementation must support:

```txt
idle
confirmation_open
loading
success
```

## Required user paths

The implementation must support and preserve:

```txt
Trigger → Cancel → no destructive action
Trigger → Confirm → Loading → Success
```

## Pause conditions

Pause if confidence is lost or if execution is blocked by syntax errors/unsupported stack constraints.

## Exit criteria

Implementation of destructive confirmation flow and layout insertion completed.

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

Dynamic Browser Testing & Safety Verification Skill

## Goal

Perform functional verification of the destructive button in a rendered browser environment.

## Required capabilities/tools

Open or preview the app in a browser, inspect rendered UI, click/interact with UI, read console errors.

## Rules

Open target route and verify:

* page opens
* destructive trigger button is visible
* trigger button text matches requested label
* placement reasonably matches the request
* style communicates destructive intent
* click trigger opens confirmation UI
* confirmation title/body are visible
* cancel button is visible
* confirm destructive button is visible
* clicking cancel closes the confirmation UI
* cancel path does not show success or perform the action
* reopening and confirming shows loading state
* duplicate confirm click is prevented while loading
* final success feedback appears
* no console errors

If browser capability is unavailable:

* do not claim complete
* report `incomplete_verification`

## Pause conditions

None.

## Exit criteria

Browser interaction verifies the full destructive behavior contract.

## Phase output

```json
{
  "browser": "",
  "cancel_path": "",
  "confirm_path": "",
  "interaction": "",
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
* Include whether the destructive cancel path and confirm path were both verified.

## Exit criteria

Report generated and returned.

## Phase output

```json
{
  "status": "complete | incomplete_verification | blocked | failed",
  "reaction": "verified-destructive-confirm-button-red",
  "project_profile": {},
  "destructive_button": {
    "triggerLabel": "",
    "confirmationTitle": "",
    "confirmationBody": "",
    "cancelLabel": "",
    "confirmLabel": "",
    "loadingLabel": "",
    "successMessage": "",
    "placementRequest": "",
    "stylePreset": "red",
    "styleOverridesApplied": {}
  },
  "implementation_strategy": {},
  "placement_plan": {},
  "changed_files": [],
  "verification": {
    "static_checks": "",
    "browser": "",
    "cancel_path": "",
    "confirm_path": "",
    "interaction": "",
    "console_errors": ""
  },
  "notes": []
}
```

---

# Examples

## Example 1: Delete Project button

User:

Use /ReAction-verified-destructive-confirm-button-red. Add a "Delete Project" button in the project settings danger zone. When confirmed, show "Deleting..." then "Project deleted".

Expected:

* red destructive preset
* danger zone placement
* confirmation flow
* cancel path verified
* confirm path verified
* loading state verified
* success feedback verified
* browser verified

## Example 2: Revoke API key compact button

User:

Use /ReAction-verified-destructive-confirm-button-red. Add a compact "Revoke API Key" button next to the API key card. When confirmed, show "Revoking..." then "API key revoked".

Expected:

* compact destructive button
* confirmation flow
* cancel path verified
* confirm path verified
* browser verified

## Example 3: Missing action label

User:

Use /ReAction-verified-destructive-confirm-button-red. Add it in settings.

Expected:

* pause and ask for the destructive action label

## Example 4: User asks to skip confirmation

User:

Use /ReAction-verified-destructive-confirm-button-red. Add a "Delete Project" button in settings but do not ask for confirmation.

Expected:

* pause or block
* explain that this ReAction requires confirmation for destructive actions

---

# End of ReAction
