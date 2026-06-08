---
id: verified-secondary-button-neutral
name: Verified Secondary Button Neutral
version: 0.1.0
description: Add a verified secondary action button with a neutral default preset, lower visual emphasis than primary actions, correct button/link semantics, accessibility requirements, disabled state, and browser verification.
style_mode: neutral_secondary_default_with_explicit_overrides
component_identity: secondary-button
default_preset: neutral
execution_modes:
  - native_agent
  - reaction_runner
supported_project_policy: detect_and_adapt
browser_verification_required_for_success: true
safety:
  pause_on_unsupported_project: true
  pause_on_ambiguous_placement: true
  pause_on_missing_action_label: true
  pause_on_risky_or_wide_file_changes: true
  verify_before_done: true
---

# ReAction: Verified Secondary Button Neutral

## Purpose

Create, reuse, or update a secondary action button in a frontend project.

The default preset is neutral.

This ReAction is for lower-emphasis actions like:

- Cancel
- Back
- Maybe later
- Skip
- Learn more
- View details
- Close
- Dismiss
- Edit
- Open
- Reset filters
- Clear search
- Manage
- Configure

This ReAction is not tied to one framework or one runner. It should be followed by any capable coding agent or LLM provider using whatever file, terminal, and browser tools are available.

The ReAction’s job is to preserve a reliable secondary-button contract while allowing project-specific implementation.

The following may vary:

- framework-specific implementation
- file path
- component name if the project has existing conventions
- placement strategy
- button label
- action behavior
- whether the action should be a button or link
- disabled behavior
- explicit style overrides requested by the user

The following must not vary:

- correct button/link semantics
- lower visual emphasis than primary actions
- neutral non-destructive styling
- keyboard accessibility
- focus-visible styling
- clear disabled state when disabled
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

# Secondary Button Contract

Every implementation must satisfy this contract.

## Required behavior

The secondary button must:

- use native button semantics, native link semantics, or the framework’s accessible primitive
- use a real `<button>` for in-page actions
- use a real link or framework route link for navigation actions
- be keyboard accessible
- have visible accessible text
- have lower visual emphasis than primary CTA buttons
- not look destructive unless explicitly reclassified into a destructive ReAction
- not compete visually with the primary action nearby
- preserve focus-visible styling
- have visible hover and active states
- have a visible disabled state when disabled
- support click/navigation behavior requested by the user
- avoid real external side effects unless explicitly requested and confirmed
- be verifiable in browser

## Button vs link decision rule

Use a button when the action changes UI state or performs an in-page action.

Examples:

- Cancel modal
- Dismiss banner
- Reset filters
- Clear search
- Open details panel

Use a link when the action navigates to another page or URL.

Examples:

- Learn more
- View docs
- View details page
- Back to dashboard

If it is unclear whether the action is navigation or in-page behavior, pause and ask.

## Required identifiers for verification

If the project supports test IDs or stable selectors, add:

- secondary action selector/test id: `reaction-secondary-button-neutral`
- optional feedback selector/test id: `reaction-secondary-feedback-neutral`

If the project has a different test selector convention, adapt to it while preserving stable selectors for verification.

## Default style preset: neutral secondary

Default style:

- neutral/gray or project-default secondary style
- lower emphasis than primary button
- readable high-contrast text
- visible border or subtle background
- clear hover state
- clear active/pressed state
- clear focus-visible state
- visible disabled state

Do not create a low-contrast or ambiguous secondary button.

The secondary button must not visually dominate a nearby primary button.

---

# Explicit Style Override Policy

The default visual preset is neutral secondary.

If the user does not explicitly request style changes, use the neutral secondary preset or the project’s existing secondary button style.

If the user explicitly requests style changes, apply only those requested overrides while preserving secondary hierarchy, accessibility, and verification.

Examples:

- "make it outline" → use neutral outline style
- "make it ghost" → use low-emphasis ghost style
- "make it compact" → reduce padding/size while keeping practical click target
- "make it pill shaped" → use fully rounded shape
- "make it look like a link" → use link-style secondary action if semantics fit
- "put it next to the primary button" → place beside the primary action but keep lower emphasis

Allowed explicit overrides:

- background color
- text color
- font family
- font size
- font weight
- padding
- width
- height
- border color
- border width
- border radius
- shadow
- placement
- compactness
- ghost/outline/link-like style

Forbidden overrides:

- making the secondary button visually stronger than the primary CTA
- making a destructive action look neutral
- removing accessible text
- removing keyboard accessibility
- removing focus-visible styling
- using a non-button element for in-page actions without accessible semantics
- using a non-link element for navigation actions without accessible semantics
- making the clickable area too small to use safely
- skipping verification
- editing unrelated files

If the requested action is destructive, prefer `/ReAction-verified-destructive-confirm-button-red`.

If the requested action is primary/create/save/deploy/generate, prefer `/ReAction-verified-async-cta-button-green`.

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
    "routing_system": "",
    "confidence": ""
  },
  "secondary_button_spec": {
    "label": "",
    "actionType": "",
    "actionBehavior": "",
    "href": "",
    "placementRequest": "",
    "disabledState": "",
    "styleOverrides": {}
  },
  "implementation_strategy": {
    "reuse_existing_component": false,
    "create_new_component": false,
    "use_link_semantics": false,
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

Secondary Button Request Analysis Skill

## Goal

Extract the secondary button requirements and any explicit style overrides from the user's request.

## Required capabilities/tools

Read/parse user input.

## Rules

* ReAction name `/ReAction-verified-secondary-button-neutral` is not the button label.
* Extract:

  * `label`
  * `actionType`
  * `actionBehavior`
  * `href`
  * `placementRequest`
  * `disabledState`
  * `styleOverrides`
* Classify action type:

  * `in_page_action`
  * `navigation`
  * `dismissal`
  * `reset`
  * `cancel`
  * `unknown`
* If label is missing, pause and ask.
* If placement request is missing, pause and ask.
* If action behavior is missing but can be safely simulated, use safe demo feedback.
* If navigation is requested but URL/route is missing, pause and ask.
* If action type is destructive, block and recommend destructive confirm ReAction.
* If action type is primary/create/save/deploy/generate, suggest async CTA ReAction unless the user explicitly wants secondary treatment.
* If explicit style overrides are provided, preserve them only if they do not break accessibility or secondary hierarchy.

## Pause conditions

Pause if:

* button label is missing
* placement request is missing
* navigation target is required but missing
* the action type cannot be safely classified
* the requested action conflicts with secondary-button semantics
* the requested styling would make it look primary or destructive

## Exit criteria

Spec is fully populated and verified with no missing critical fields.

## Phase output

```json
{
  "label": "",
  "actionType": "",
  "actionBehavior": "",
  "href": "",
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

Inspect the codebase to identify frameworks, tools, styling, component structures, routing patterns, and likely target paths.

## Required capabilities/tools

Inspect files, search code.

## Rules

Inspect:

* package configuration files
* framework configuration files
* source files
* directory structure
* existing Button components
* existing Link components
* existing secondary/ghost/outline button variants
* existing modal/footer/action-row patterns
* existing routing/navigation patterns
* styling solution
* app entry points and likely target files

Identify:

* framework: React, Next.js, Vue, Svelte, Astro, plain HTML, etc.
* build tool
* language: TypeScript or JavaScript
* styling: Tailwind, CSS modules, plain CSS, MUI, Chakra, shadcn, styled-components, etc.
* component system: existing Button, Link, secondary variants, action rows
* routing system: native anchors, router links, Next Link, React Router Link, etc.
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
  "routing_system": "",
  "confidence": ""
}
```

---

# Phase 3: Choose Implementation Strategy

## Skill

Secondary Button Implementation Design Skill

## Goal

Determine whether to reuse existing button/link primitives, wrap them, create a project-appropriate secondary button, or inline minimally.

## Required capabilities/tools

Inspect files, search code.

## Rules

* If a project already has a suitable secondary Button variant, prefer reusing or wrapping it.
* If a project has a suitable Button component with `secondary`, `outline`, or `ghost` variant, prefer using it.
* If navigation is required, use the project’s link/routing primitive.
* If no suitable components exist, create a small reusable secondary button in the project’s component style.
* Inline only if the project has no component structure and the edit is minimal.
* Do not modify global design systems unless necessary.
* Do not rewrite unrelated architecture.
* Do not make the secondary button visually stronger than nearby primary actions.
* Do not implement destructive behavior in this ReAction.

## Pause conditions

Pause if implementing safely requires too many unrelated file changes.

## Exit criteria

Decision made on strategy with specified targets.

## Phase output

```json
{
  "reuse_existing_component": false,
  "create_new_component": false,
  "use_link_semantics": false,
  "target_files": [],
  "reason": ""
}
```

---

# Phase 4: Reason About Placement

## Skill

Safe Secondary Button Placement & Layout Skill

## Goal

Resolve the requested placement into a target file and specific anchor in the code.

## Required capabilities/tools

Inspect files, search code, read browser UI/DOM if available.

## Rules

* Inspect target files and/or browser UI.
* Understand the user's placement request and choose the smallest safe edit.
* Prefer existing semantic locations if available.
* Good targets include:

  * beside a primary button
  * modal footer
  * form footer
  * card footer
  * settings footer
  * empty state secondary action
  * banner action area
  * header actions
  * onboarding footer
* Use anchor-text placement if the user references visible text.
* Use fixed positioning only if the user explicitly asks for screen/corner/floating placement.
* Do not place secondary actions where they confuse primary/destructive hierarchy.

## Pause conditions

Pause if:

* placement could mean multiple things
* the agent cannot find a safe target file
* the requested placement conflicts with project layout
* the secondary button’s purpose would be unclear in that location

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

# Phase 5: Implement Secondary Button Contract

## Skill

Secondary Button Coding & Hierarchy Skill

## Goal

Implement the secondary button/link, accessibility, disabled state, optional feedback, and placement according to the contract.

## Required capabilities/tools

Edit files.

## Rules

* Implement according to the detected project stack.
* Preserve secondary button contract.
* Apply neutral secondary preset by default.
* Apply explicit style overrides only if requested and safe.
* Use minimal edits and preserve unrelated code.
* Add stable selectors/test IDs when possible.
* Do not introduce real external side effects.
* Use button semantics for in-page actions.
* Use link semantics for navigation.
* If the project is React:

  * create/reuse component
  * use existing Button/Link primitives if available
* If the project is plain HTML:

  * use a button or anchor with correct semantics
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
Click secondary button → requested behavior, navigation, or safe demo feedback
Disabled state → cannot trigger action
```

## Pause conditions

Pause if confidence is lost or if execution is blocked by syntax errors/unsupported stack constraints.

## Exit criteria

Implementation of secondary button behavior and layout insertion completed.

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

Dynamic Browser Testing & Hierarchy Verification Skill

## Goal

Perform functional verification of the secondary button in a rendered browser environment.

## Required capabilities/tools

Open or preview the app in a browser, inspect rendered UI, click/interact with UI, read console errors.

## Rules

Open target route and verify:

* page opens
* secondary button/link is visible
* visible text matches requested label
* placement reasonably matches the request
* semantics match the action:

  * button for in-page action
  * link for navigation
* style matches neutral secondary preset or explicit overrides
* button has lower visual emphasis than nearby primary action if one exists
* focus-visible state is present or reasonably implemented
* click behavior works, navigates, or safe demo feedback appears
* disabled state works if requested
* no console errors

If browser capability is unavailable:

* do not claim complete
* report `incomplete_verification`

## Pause conditions

None.

## Exit criteria

Browser interaction verifies the full secondary button contract.

## Phase output

```json
{
  "browser": "",
  "interaction": "",
  "accessibility": "",
  "hierarchy": "",
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
* Include whether correct semantics, hierarchy, and interaction were verified.

## Exit criteria

Report generated and returned.

## Phase output

```json
{
  "status": "complete | incomplete_verification | blocked | failed",
  "reaction": "verified-secondary-button-neutral",
  "project_profile": {},
  "secondary_button": {
    "label": "",
    "actionType": "",
    "actionBehavior": "",
    "href": "",
    "placementRequest": "",
    "stylePreset": "neutral-secondary",
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
    "hierarchy": "",
    "console_errors": ""
  },
  "notes": []
}
```

---

# Examples

## Example 1: Cancel button

User:

Use /ReAction-verified-secondary-button-neutral. Add a "Cancel" button next to the Save Changes button in the settings footer. It should dismiss the form changes.

Expected:

* neutral secondary button
* lower emphasis than Save Changes
* button semantics
* click behavior or safe demo feedback
* browser verified

## Example 2: Learn more link-style button

User:

Use /ReAction-verified-secondary-button-neutral. Add a "Learn more" secondary action under the pricing text that links to `/docs/pricing`.

Expected:

* link semantics
* neutral/link-style secondary treatment
* navigation target exists or is safely wired
* browser verified

## Example 3: Reset filters button

User:

Use /ReAction-verified-secondary-button-neutral. Add a "Reset filters" button next to the filters toolbar.

Expected:

* button semantics
* neutral secondary style
* reset behavior or safe demo feedback
* browser verified

## Example 4: Destructive action misuse

User:

Use /ReAction-verified-secondary-button-neutral. Add a "Delete Project" button in settings.

Expected:

* block or redirect to `/ReAction-verified-destructive-confirm-button-red`

---

# End of ReAction
