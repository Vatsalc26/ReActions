---
id: verified-copy-button-neutral
name: Verified Copy Button Neutral
version: 0.1.0
description: Add a verified copy button with a neutral default preset, clipboard behavior, copied feedback, failure handling, accessibility requirements, and browser verification.
style_mode: neutral_default_with_explicit_overrides
component_identity: copy-button
default_preset: neutral
execution_modes:
  - native_agent
  - reaction_runner
supported_project_policy: detect_and_adapt
browser_verification_required_for_success: true
safety:
  pause_on_unsupported_project: true
  pause_on_ambiguous_placement: true
  pause_on_missing_copy_source: true
  pause_on_risky_or_wide_file_changes: true
  verify_before_done: true
---

# ReAction: Verified Copy Button Neutral

## Purpose

Create, reuse, or update a copy button in a frontend project.

The default preset is neutral.

This ReAction is for common copy actions like:

- Copy API Key
- Copy Invite Link
- Copy Webhook URL
- Copy Install Command
- Copy Code Snippet
- Copy Environment Variable
- Copy Transaction ID
- Copy Email Address
- Copy Share Link

This ReAction is not tied to one framework or one runner. It should be followed by any capable coding agent or LLM provider using whatever file, terminal, and browser tools are available.

The ReAction’s job is to preserve a reliable copy-button contract while allowing project-specific implementation.

The following may vary:

- framework-specific implementation
- file path
- component name if the project has existing conventions
- placement strategy
- copy source/value
- button label
- copied label
- failure label/message
- style overrides explicitly requested by the user

The following must not vary:

- real button semantics
- accessible copy action
- clipboard/copy behavior
- copied feedback
- failure handling when copy is unavailable or fails
- keyboard accessibility
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

# Copy Button Contract

Every implementation must satisfy this contract.

## Required behavior

The copy button must:

- use native button semantics or the framework’s accessible button primitive
- be keyboard accessible
- have visible accessible text or a clear accessible label
- copy a clearly defined source value
- avoid copying an undefined, empty, or ambiguous value unless the user explicitly requested that behavior
- show copied feedback after a successful copy
- show failure feedback if the copy action fails
- avoid logging sensitive copied values in final reports
- preserve focus-visible styling
- be verifiable in browser

## Required copy behavior

The expected flow is:

```txt
Copy button visible
→ user clicks copy button
→ copy action attempts to copy the source value
→ success feedback appears if copy succeeds
→ failure feedback appears if copy fails
```

If the browser Clipboard API is available, prefer it.

If the Clipboard API is unavailable, use a safe project-appropriate fallback only if the agent can implement it confidently.

If neither reliable copy method is available, pause or report incomplete verification.

## Required identifiers for verification

If the project supports test IDs or stable selectors, add:

* copy button selector/test id: `reaction-copy-button-neutral`
* copy source selector/test id if source is rendered: `reaction-copy-source-neutral`
* copied success selector/test id: `reaction-copy-success-neutral`
* copy failure selector/test id: `reaction-copy-failure-neutral`

If the project has a different test selector convention, adapt to it while preserving stable selectors for verification.

## Default style preset: neutral

Default style:

* neutral/gray or project-default secondary style
* readable high-contrast text
* visible border or strong contrast boundary
* clear hover state
* clear active/pressed state
* clear focus-visible state
* visible copied/success feedback
* visible failure feedback

Do not create a low-contrast or ambiguous copy button.

---

# Explicit Style Override Policy

The default visual preset is neutral.

If the user does not explicitly request style changes, use the neutral preset or the project’s existing secondary/ghost button style.

If the user explicitly requests style changes, apply only those requested overrides while preserving copy behavior, accessibility, feedback, and verification.

Examples:

* "make it compact" → reduce padding/size while preserving accessibility
* "make it icon-only" → require accessible label and ideally tooltip or visible context
* "make it outline" → use neutral outline style
* "make it green" → apply green visual override only if requested
* "place it next to the API key" → place beside the API key value if safely identifiable

Allowed explicit overrides:

* background color
* text color
* icon usage
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

* removing accessible label
* removing copied feedback
* removing failure handling
* copying an ambiguous value
* copying a sensitive value and exposing it in logs/reports
* skipping verification
* editing unrelated files
* making an icon-only button without accessible text/label

If the user asks for an icon-only copy button but does not provide accessible label context, add a safe accessible label derived from the copy target.

---

# Sensitive Value Policy

Copy buttons often appear near secrets such as API keys, tokens, webhook secrets, and environment variables.

Rules:

* Do not invent real secrets.
* Do not print secret values in the final report.
* If copying a sensitive value already present in the UI, reference it as "configured source value" or "masked source value" in reports.
* If creating a demo copy value, use safe placeholder values.
* If the requested copy value is sensitive and not already present, pause and ask whether to use a placeholder or connect to an existing source.

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
  "copy_button_spec": {
    "buttonLabel": "",
    "copySourceDescription": "",
    "copyValue": "",
    "copiedLabel": "",
    "failureLabel": "",
    "placementRequest": "",
    "isSensitive": false,
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
    "copy_behavior": "",
    "console": ""
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand User Request

## Skill

Copy Action Request Analysis Skill

## Goal

Extract the copy button requirements and any explicit style overrides from the user's request.

## Required capabilities/tools

Read/parse user input.

## Rules

* ReAction name `/ReAction-verified-copy-button-neutral` is not the button label.
* Extract:

  * `buttonLabel`
  * `copySourceDescription`
  * `copyValue` if explicitly provided
  * `copiedLabel`
  * `failureLabel`
  * `placementRequest`
  * `isSensitive`
  * `styleOverrides`
* If button label is missing, derive it from the copy target when safe.

  * `"copy API key"` → `"Copy API key"`
  * `"copy invite link"` → `"Copy invite link"`
  * `"copy install command"` → `"Copy command"`
* If copied label is missing, use `"Copied"`.
* If failure label is missing, use `"Copy failed"`.
* If placement is missing, pause and ask.
* If copy source/value is missing or ambiguous, pause and ask.
* If the copy value appears sensitive, do not expose it in the final report.
* If explicit style overrides are provided, preserve them only if they do not break accessibility or feedback.

## Pause conditions

Pause if:

* no copy target/source is provided
* placement request is missing
* the copy source could refer to multiple values
* the user asks to copy a secret value that is not present or safely provided
* icon-only styling is requested but no accessible label can be inferred

## Exit criteria

Spec is fully populated and verified with no missing critical fields.

## Phase output

```json
{
  "buttonLabel": "",
  "copySourceDescription": "",
  "copyValue": "",
  "copiedLabel": "Copied",
  "failureLabel": "Copy failed",
  "placementRequest": "",
  "isSensitive": false,
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

Inspect:

* package configuration files
* framework configuration files
* source files
* directory structure
* existing Button components
* existing IconButton components
* existing Toast/Feedback components
* existing copy button patterns
* existing clipboard helpers
* styling solution
* app entry points and likely target files

Identify:

* framework: React, Next.js, Vue, Svelte, Astro, plain HTML, etc.
* build tool
* language: TypeScript or JavaScript
* styling: Tailwind, CSS modules, plain CSS, MUI, Chakra, shadcn, styled-components, etc.
* component system: existing Button, IconButton, Toast, CopyButton components
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
  "feedback_system": "",
  "confidence": ""
}
```

---

# Phase 3: Choose Implementation Strategy

## Skill

Copy Component Implementation Design Skill

## Goal

Determine whether to reuse existing button/copy/feedback primitives, wrap them, create a new project-appropriate component, or inline minimally.

## Required capabilities/tools

Inspect files, search code.

## Rules

* If a project already has a suitable CopyButton component, prefer reusing or wrapping it.
* If a project has a suitable Button or IconButton component, prefer using it.
* If a project has a Toast or Feedback component, prefer using it for copied/failure feedback.
* If no suitable components exist, create a small reusable copy button in the project’s component style.
* Inline only if the project has no component structure and the edit is minimal.
* Do not modify global design systems unless necessary.
* Do not rewrite unrelated architecture.
* Do not create a copy button that silently fails.
* Do not expose sensitive values in logs.

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

Safe Copy Button Placement & Layout Skill

## Goal

Resolve the requested placement into a target file and specific anchor in the code.

## Required capabilities/tools

Inspect files, search code, read browser UI/DOM if available.

## Rules

* Inspect target files and/or browser UI.
* Understand the user's placement request and choose the smallest safe edit.
* Prefer existing semantic locations if available.
* Good targets include:

  * next to an API key
  * beside a code block
  * beside a command
  * inside a share/invite link card
  * inside a webhook URL card
  * inside an input with a copyable value
  * in a table row action area
  * near a displayed ID or token
* Use anchor-text placement if the user references visible text.
* Use fixed positioning only if the user explicitly asks for screen/corner/floating placement.
* Do not place the copy button where the copy source is unclear.

## Pause conditions

Pause if:

* placement could mean multiple things
* the agent cannot find a safe target file
* the requested placement conflicts with project layout
* the copy source near the placement is ambiguous

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

# Phase 5: Implement Copy Button Contract

## Skill

Copy Component Coding & Feedback Skill

## Goal

Implement the copy button, copy source, copied feedback, failure feedback, and placement according to the contract.

## Required capabilities/tools

Edit files.

## Rules

* Implement according to the detected project stack.
* Preserve copy button contract.
* Apply neutral preset by default.
* Apply explicit style overrides only if requested and safe.
* Use minimal edits and preserve unrelated code.
* Add stable selectors/test IDs when possible.
* Do not introduce real external side effects.
* Do not log copied sensitive values.
* If the project is React:

  * create/reuse component
  * use state for idle/copied/error feedback if needed
  * use `navigator.clipboard.writeText` when available
  * add a safe fallback only if implemented confidently
* If the project is plain HTML:

  * use a button element and safe JavaScript copy behavior
* If the project is Vue/Svelte/etc.:

  * use that framework’s component conventions if the agent knows them confidently
  * otherwise pause

## Required interaction states

The implementation must support:

```txt
idle
copying or attempting
copied
error
```

## Required user paths

The implementation must support and preserve:

```txt
Click copy → Copied feedback
Copy failure → Failure feedback
```

## Pause conditions

Pause if confidence is lost or if execution is blocked by syntax errors/unsupported stack constraints.

## Exit criteria

Implementation of copy behavior and layout insertion completed.

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

Dynamic Browser Testing & Clipboard Verification Skill

## Goal

Perform functional verification of the copy button in a rendered browser environment.

## Required capabilities/tools

Open or preview the app in a browser, inspect rendered UI, click/interact with UI, read clipboard if available, read console errors.

## Rules

Open target route and verify:

* page opens
* copy button is visible
* copy button text/label matches requested label
* placement reasonably matches the request
* style matches neutral preset or explicit overrides
* copy source exists and is not ambiguous
* click copy button
* copied feedback appears
* if clipboard-read capability is available, verify clipboard content matches expected copy value
* if clipboard-read capability is unavailable, verify copied feedback and mark clipboard content verification as unavailable
* verify no console errors
* verify failure state if the implementation includes a controllable failure path

If browser capability is unavailable:

* do not claim complete
* report `incomplete_verification`

## Pause conditions

None.

## Exit criteria

Browser interaction verifies the full copy behavior contract.

## Phase output

```json
{
  "browser": "",
  "copy_behavior": "",
  "clipboard_content": "",
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
* If clipboard content could not be read but copied feedback was verified, report clipboard content verification as unavailable instead of pretending it passed.
* If the copied value is sensitive, do not print it in the final report.
* If paused, list exactly what information is needed.

## Exit criteria

Report generated and returned.

## Phase output

```json
{
  "status": "complete | incomplete_verification | blocked | failed",
  "reaction": "verified-copy-button-neutral",
  "project_profile": {},
  "copy_button": {
    "buttonLabel": "",
    "copySourceDescription": "",
    "copyValueDescription": "",
    "copiedLabel": "",
    "failureLabel": "",
    "placementRequest": "",
    "stylePreset": "neutral",
    "styleOverridesApplied": {},
    "isSensitive": false
  },
  "implementation_strategy": {},
  "placement_plan": {},
  "changed_files": [],
  "verification": {
    "static_checks": "",
    "browser": "",
    "copy_behavior": "",
    "clipboard_content": "",
    "console_errors": ""
  },
  "notes": []
}
```

---

# Examples

## Example 1: Copy install command

User:

Use /ReAction-verified-copy-button-neutral. Add a "Copy command" button next to the install command. It should copy `npm install reactions`.

Expected:

* neutral copy button
* command source is clear
* click copies command
* copied feedback appears
* browser verified

## Example 2: Copy API key

User:

Use /ReAction-verified-copy-button-neutral. Add a "Copy API key" button next to the masked API key card.

Expected:

* neutral copy button
* sensitive value is not printed in final report
* copied feedback appears
* browser verified
* clipboard content verification is performed only if safe and available

## Example 3: Icon-only copy button

User:

Use /ReAction-verified-copy-button-neutral. Add an icon-only copy button next to the webhook URL.

Expected:

* icon-only button has accessible label
* copy source is webhook URL
* copied feedback appears
* browser verified

## Example 4: Missing copy source

User:

Use /ReAction-verified-copy-button-neutral. Add a copy button in the settings page.

Expected:

* pause and ask what value/source should be copied

---

# End of ReAction
