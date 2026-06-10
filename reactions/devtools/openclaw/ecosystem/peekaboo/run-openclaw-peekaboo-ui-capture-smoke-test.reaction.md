---
id: run-openclaw-peekaboo-ui-capture-smoke-test
name: Run OpenClaw Peekaboo UI Capture Smoke Test
version: 0.1.0
description: Safely verify Peekaboo’s screenshot and UI inspection path as an OpenClaw ecosystem Native Tool, using user-approved non-private windows, frontmost/app-targeted capture, optional annotation, JSON inspection, and strict privacy guardrails.
category: devtools
subcategory: openclaw
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_with_confirmation_gates
supported_project_policy: macos_local_machine_with_peekaboo_cli_and_safe_test_window
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_screenshot_capture: true
  requires_confirmation_before_ui_inspection: true
  requires_confirmation_before_annotated_capture: true
  never_click_or_type: true
  never_hotkey_press_paste_scroll_or_drag: true
  never_run_agent_actions: true
  never_edit_mcp_config: true
  never_capture_private_screens_by_default: true
  never_dump_full_ui_tree_by_default: true
  never_print_screenshot_contents: true
  never_print_private_window_titles: true
  never_print_secrets: true
  never_print_full_config: true
  prefer_frontmost_or_app_capture_over_whole_screen: true
---

# ReAction: Run OpenClaw Peekaboo UI Capture Smoke Test

## Trigger

`/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test`

## Purpose

Safely verify Peekaboo’s observation path as an OpenClaw ecosystem Native Tool.

This ReAction tests Peekaboo’s “eyes” only:

```txt
screenshot capture
frontmost/app-targeted capture
UI inspection with `see`
optional annotated UI map
JSON output sanity
```

This ReAction must not test Peekaboo’s “hands”:

```txt
click
type
hotkey
press
paste
scroll
drag
agent action execution
MCP config edits
```

Default success means:

```txt
Peekaboo can capture a user-approved safe window and inspect a user-approved safe app/window without exposing private content.
```

Default success does not mean:

```txt
Desktop automation is safe to run.
Click/type is ready.
MCP is configured.
Agent mode is safe.
```

Those are later ReActions.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Official Facts To Follow

Follow current official Peekaboo docs.

Known official Quickstart flow:

1. Grant/check permissions.
2. Take a screenshot.
3. Inspect the UI.
4. Click/type later.
5. Agent later.
6. MCP optional later.

Known official screenshot commands:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "screen", "--path", "screen.png"] }
{ "command": "peekaboo", "args": ["image", "--mode", "frontmost", "--path", "focused.png"] }
{ "command": "peekaboo", "args": ["image", "--app", "Safari", "--path", "safari.png"] }
```

For this ReAction, prefer safer variants:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "frontmost", "--path", "peekaboo-ui-capture-smoke-test/focused.png"] }
{ "command": "peekaboo", "args": ["image", "--app", "<safe-app-name>", "--path", "peekaboo-ui-capture-smoke-test/app.png"] }
```

Use whole-screen capture only after explicit confirmation.

Known official UI inspection commands:

```json
{ "command": "peekaboo", "args": ["see", "--app", "Safari", "--json"] }
{ "command": "peekaboo", "args": ["see", "--app", "Safari", "--annotate", "--path", "safari.png"] }
```

For this ReAction, use a safe user-approved app:

```json
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--json"] }
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--annotate", "--path", "peekaboo-ui-capture-smoke-test/annotated.png"] }
```

Known official `see` facts:

* `see` returns a structured map of clickable elements.
* Elements have stable IDs.
* Element records include fields like `id`, `role`, `label`, `frame`, and `actions`.
* These IDs can later be passed to action commands.

Known official automation facts:

* Element ID from `peekaboo see` is the most reliable future automation target.
* Label/role/app target is second-best.
* Coordinates are last resort.
* This ReAction must not continue into actual click/type automation.

Known official permission facts:

* Screen Recording is required for capture.
* Accessibility is recommended for reliable UI inspection/control.
* Event Synthesizing matters later for background input such as click/type/hotkey/press/paste, but is not required for this observation-only smoke test.
* Run permission health before this ReAction when possible.

---

# Scope

This ReAction may:

* inspect macOS and Peekaboo CLI availability
* check Peekaboo permissions status
* create a local output directory
* run a user-approved safe frontmost screenshot
* run a user-approved safe app-targeted screenshot
* run a user-approved safe UI inspection with `see --json`
* optionally produce an annotated UI map with `see --annotate`
* summarize output paths and counts safely
* recommend next ReActions

This ReAction must not:

* install Peekaboo
* run permission grant flow unless specifically requested
* click
* type
* hotkey
* press
* paste
* scroll
* drag
* run `peekaboo agent`
* configure MCP
* edit config files
* print secrets
* print full screenshot contents
* dump full UI trees
* inspect private apps/windows

---

# Safe Test Target Policy

Preferred safe targets:

```txt
Finder window showing a harmless folder
TextEdit blank document
Calculator
System Settings only if user approves
a simple local test window
a non-private browser page chosen by user
```

Avoid:

```txt
password managers
banking or payment pages
private chats
email inboxes
medical pages
school/work confidential pages
cloud consoles
API dashboards
terminals with secrets
.env files
private documents
private browser tabs
```

Before capture/inspection, say:

```txt
Please switch to a safe, non-private window. I will not capture or inspect private screens.
```

Ask explicit confirmation:

```txt
May I run a safe frontmost-window screenshot now?
```

Ask explicit confirmation:

```txt
Which safe app should I inspect with `peekaboo see --json`?
```

---

# Commands

## Read-only commands allowed by default

```json
{ "command": "sw_vers", "args": ["-productVersion"] }
{ "command": "which", "args": ["peekaboo"] }
{ "command": "peekaboo", "args": ["--version"] }
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

Optional safe discovery:

```json
{ "command": "peekaboo", "args": ["list", "apps"] }
```

Do not print private app/window names if they look sensitive.

## Commands requiring explicit confirmation

Create output directory:

```bash
mkdir -p peekaboo-ui-capture-smoke-test
```

Safe frontmost screenshot:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "frontmost", "--path", "peekaboo-ui-capture-smoke-test/focused.png"] }
```

Safe app screenshot:

```json
{ "command": "peekaboo", "args": ["image", "--app", "<safe-app-name>", "--path", "peekaboo-ui-capture-smoke-test/app.png"] }
```

Safe UI inspection:

```json
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--json"] }
```

Safe annotated UI map:

```json
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--annotate", "--path", "peekaboo-ui-capture-smoke-test/annotated.png"] }
```

Whole-screen screenshot only after extra confirmation:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "screen", "--path", "peekaboo-ui-capture-smoke-test/screen.png"] }
```

## Always forbidden in this ReAction

```json
{ "command": "peekaboo", "args": ["click", "<target>"] }
{ "command": "peekaboo", "args": ["type", "<text>"] }
{ "command": "peekaboo", "args": ["hotkey", "<keys>"] }
{ "command": "peekaboo", "args": ["press", "<key>"] }
{ "command": "peekaboo", "args": ["paste", "<text>"] }
{ "command": "peekaboo", "args": ["scroll", "<args>"] }
{ "command": "peekaboo", "args": ["drag", "<args>"] }
{ "command": "peekaboo", "args": ["agent", "<task>"] }
{ "command": "peekaboo", "args": ["mcp"] }
{ "command": "peekaboo", "args": ["clean"] }
```

Do not edit:

```txt
~/.peekaboo/config.json
~/.peekaboo/credentials
MCP client config files
```

---

# Output Handling

For screenshots:

* report file path
* report command success/failure
* do not display image by default
* do not OCR
* do not describe private content
* do not upload image

For UI inspection:

* parse enough to know whether it worked
* count elements if safe
* optionally summarize roles
* do not print full JSON by default
* do not print private labels or text
* redact suspicious labels

Allowed summary:

```txt
UI inspection succeeded.
Elements detected: 14
Example safe roles: window, button, text field
Stable element IDs present: yes
```

Forbidden summary:

```txt
Full UI tree:
<all labels and text>
```

---

# Security Model

Protect:

```txt
screenshots
annotated images
UI tree text
app names
window titles
private documents
private messages
emails
password fields
API keys
.env files
MCP configs
Peekaboo config
Peekaboo credentials
logs
snapshot caches
```

If generated files may contain private content, warn:

```txt
The generated screenshot or annotated image may contain visible screen content. Keep it private or delete it when done.
```

Do not delete files automatically.

If user asks for cleanup, require confirmation and only delete the smoke-test output directory.

---

# Required Capabilities

Minimum capabilities:

* inspect operating system
* run safe terminal commands
* read stdout/stderr
* detect command failure
* ask confirmation
* create output directory after confirmation
* run screenshot command after confirmation
* run UI inspection command after confirmation
* parse JSON summary safely
* redact private labels/text
* produce final smoke-test report

Optional capabilities:

* inspect generated file metadata
* summarize role counts
* produce annotated output after confirmation
* recommend safe next ReActions

No browser automation is required.

No click/type capability is required.

No MCP capability is required.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "capture_smoke_test | ui_inspection_smoke_test | full_observation_smoke_test | plan_only | blocked | unknown",
  "environment": {
    "os": "",
    "macosVersion": "",
    "peekabooAvailable": false,
    "peekabooVersion": "",
    "permissionsChecked": false,
    "screenRecording": "granted | missing | unknown",
    "accessibility": "granted | missing | unknown"
  },
  "test_target": {
    "safeWindowConfirmed": false,
    "safeAppName": "",
    "privateScreenRisk": "yes | no | unknown",
    "wholeScreenApproved": false
  },
  "capture": {
    "outputDirCreated": false,
    "frontmostCaptureApproved": false,
    "frontmostCaptureRun": false,
    "frontmostCapturePath": "",
    "appCaptureApproved": false,
    "appCaptureRun": false,
    "appCapturePath": "",
    "screenCaptureRun": false,
    "screenCapturePath": ""
  },
  "ui_inspection": {
    "inspectionApproved": false,
    "inspectionRun": false,
    "inspectionTarget": "",
    "elementsDetected": "unknown",
    "stableIdsDetected": "unknown",
    "fullTreePrinted": false,
    "annotatedApproved": false,
    "annotatedRun": false,
    "annotatedPath": ""
  },
  "safety": {
    "secretsPrinted": false,
    "privateContentPrinted": false,
    "screenshotDisplayed": false,
    "clickOrTypeRun": false,
    "agentRun": false,
    "mcpEdited": false
  },
  "result": {
    "overallStatus": "passed | partial | blocked | failed | unknown",
    "warnings": [],
    "safeNextSteps": [],
    "commandsRun": []
  }
}
```

---

# Phase 1: Understand Smoke-test Request

## Skill

Peekaboo UI Capture Smoke-test Request Parsing Skill

## Behavior

Determine whether the user wants:

* plan-only
* screenshot test only
* UI inspection test only
* annotated UI map test
* full observation smoke test
* troubleshooting a failed screenshot/see command

Default to safe observation smoke test, but do not capture or inspect until confirmed.

## Rules

* Do not install.
* Do not grant permissions.
* Do not capture until confirmed.
* Do not inspect until confirmed.
* Do not click/type.
* Do not run agent.
* Do not edit MCP config.
* If private content may be visible, pause.

## Exit criteria

Smoke-test scope is clear.

---

# Phase 2: Check Environment and Permissions

## Skill

Peekaboo Observation Readiness Skill

## Behavior

Run safe checks:

```json
{ "command": "sw_vers", "args": ["-productVersion"] }
{ "command": "which", "args": ["peekaboo"] }
{ "command": "peekaboo", "args": ["--version"] }
{ "command": "permissions", "args": ["permissions", "status"] }
```

If helpful, also run:

```json
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

If Peekaboo missing:

```txt
Peekaboo CLI was not found. Use /ReAction-setup-openclaw-peekaboo-first-run.
```

If Screen Recording missing:

```txt
Screen Recording appears missing. Use /ReAction-check-openclaw-peekaboo-permissions-health before running capture tests.
```

Do not continue to capture without required permission.

## Exit criteria

Observation readiness is known.

---

# Phase 3: Confirm Safe Target

## Skill

Safe Desktop Target Confirmation Skill

## Behavior

Ask the user to choose a safe test target.

Suggested safe target:

```txt
Finder, Calculator, a blank TextEdit window, or a non-private browser page.
```

Ask:

```txt
Please switch to a safe non-private window. What app should I use for the smoke test?
```

For screenshot:

```txt
May I capture the frontmost safe window and save it to `peekaboo-ui-capture-smoke-test/focused.png`?
```

For UI inspection:

```txt
May I run `peekaboo see --app <safe-app-name> --json` and summarize only counts/roles, not the full UI tree?
```

For annotation:

```txt
May I create an annotated PNG at `peekaboo-ui-capture-smoke-test/annotated.png`?
```

## Exit criteria

Safe target and confirmations are recorded.

---

# Phase 4: Run Safe Screenshot Capture

## Skill

Peekaboo Screenshot Smoke-test Skill

## Behavior

After confirmation:

```bash
mkdir -p peekaboo-ui-capture-smoke-test
```

Then:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "frontmost", "--path", "peekaboo-ui-capture-smoke-test/focused.png"] }
```

If user requests app-targeted capture:

```json
{ "command": "peekaboo", "args": ["image", "--app", "<safe-app-name>", "--path", "peekaboo-ui-capture-smoke-test/app.png"] }
```

Report:

* success/failure
* output path
* file exists if checkable
* do not show image

## Rules

* Frontmost or app-targeted capture preferred.
* Whole-screen capture needs extra confirmation.
* Do not display screenshot.
* Do not OCR screenshot.
* Do not describe private content.

## Exit criteria

Screenshot smoke test passed, failed, or skipped.

---

# Phase 5: Run Safe UI Inspection

## Skill

Peekaboo UI Inspection Smoke-test Skill

## Behavior

After confirmation:

```json
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--json"] }
```

Summarize:

* command success/failure
* whether JSON parsed
* element count if safe
* stable IDs present yes/no
* example safe roles only

Do not dump full JSON.

Do not print private labels.

If labels look private, redact them.

## Rules

* Do not run against private apps.
* Do not print full UI tree.
* Do not click or type.
* Do not pass element IDs to action commands.

## Exit criteria

UI inspection smoke test passed, failed, or skipped.

---

# Phase 6: Optional Annotated UI Map

## Skill

Peekaboo Annotated UI Map Smoke-test Skill

## Behavior

After confirmation:

```json
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--annotate", "--path", "peekaboo-ui-capture-smoke-test/annotated.png"] }
```

Report:

* success/failure
* output path
* warning that annotated image may contain visible UI content

Do not display image by default.

## Exit criteria

Annotated smoke test passed, failed, or skipped.

---

# Phase 7: Diagnose Common Failures

## Skill

Peekaboo Observation Failure Diagnosis Skill

## Behavior

Diagnose failures:

* Peekaboo missing
* unsupported macOS
* Screen Recording missing
* Accessibility missing
* wrong app name
* app not running
* target window hidden/minimized
* private/unsafe target refused
* Bridge/local permission mismatch
* command returns no elements
* JSON parse failure
* output path permission issue
* screenshot file not created
* app has poor accessibility tree

For each issue:

* severity
* likely cause
* safe next step
* recommended follow-up ReAction

Do not fix automatically.

---

# Phase 8: Final Smoke-test Report

## Skill

Peekaboo UI Capture Smoke-test Report Skill

## Behavior

Return:

```md
# OpenClaw Peekaboo UI Capture Smoke-test Report

Status: passed | partial | blocked | failed | unknown

## Commands run

- `sw_vers -productVersion`: pass/fail/not run
- `which peekaboo`: pass/fail/not run
- `peekaboo --version`: pass/fail/not run
- `peekaboo permissions status`: pass/fail/not run
- `peekaboo image --mode frontmost`: pass/fail/not run
- `peekaboo image --app <safe-app>`: pass/fail/not run
- `peekaboo see --app <safe-app> --json`: pass/fail/not run
- `peekaboo see --app <safe-app> --annotate`: pass/fail/not run

## Environment

- OS: <value>
- macOS version: <value or unknown>
- Peekaboo available: yes/no
- Peekaboo version: <value or unknown>
- Screen Recording: granted/missing/unknown
- Accessibility: granted/missing/unknown

## Safe target

- Safe app/window confirmed: yes/no
- Target app: <safe app or redacted>
- Private screen risk: yes/no/unknown
- Whole-screen capture used: yes/no

## Capture result

- Frontmost screenshot captured: yes/no
- App screenshot captured: yes/no
- Screenshot path: <path or none>
- Screenshot displayed: no

## UI inspection result

- UI inspection run: yes/no
- JSON parsed: yes/no/unknown
- Elements detected: <count/unknown>
- Stable element IDs detected: yes/no/unknown
- Full UI tree printed: no
- Annotated image created: yes/no
- Annotated image path: <path or none>

## Safety checks

- Click/type/hotkey/press/paste/scroll/drag run: no
- Agent task run: no
- MCP config edited: no
- Secrets printed: no
- Private UI content printed: no
- Screenshot contents printed: no

## Findings

| Severity | Finding | Safe next step |
|---|---|---|
| info/warn/error | <finding> | <next step> |

## Recommended next ReActions

- `/ReAction-check-openclaw-peekaboo-permissions-health` if permissions blocked capture/inspection.
- `/ReAction-check-openclaw-peekaboo-mcp-health` if user wants MCP integration.
- `/ReAction-audit-openclaw-peekaboo-automation-safety` before click/type/agent automation.
- `/ReAction-run-openclaw-peekaboo-safe-click-type-smoke-test` only after safety audit and explicit confirmation.
```

Do not include raw secrets, screenshot contents, private app content, or full UI trees.

---

# End of ReAction
