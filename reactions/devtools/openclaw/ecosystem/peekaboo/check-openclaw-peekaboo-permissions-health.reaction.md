---
id: check-openclaw-peekaboo-permissions-health
name: Check OpenClaw Peekaboo Permissions Health
version: 0.1.0
description: Run a read-only macOS permission health check for Peekaboo as an OpenClaw ecosystem Native Tool, covering Screen Recording, Accessibility, Event Synthesizing, Bridge/local source differences, and safe next steps.
category: devtools
subcategory: openclaw
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_read_only_with_confirmation_gates
supported_project_policy: macos_local_machine_with_peekaboo_cli
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_by_default: true
  requires_confirmation_before_permission_grant_flow: true
  requires_confirmation_before_event_synthesizing_request: true
  requires_confirmation_before_screenshot_capture: true
  requires_confirmation_before_ui_inspection: true
  never_click_or_type_by_default: true
  never_hotkey_press_paste_or_scroll_by_default: true
  never_run_agent_actions_by_default: true
  never_edit_mcp_config_by_default: true
  never_capture_private_screens_by_default: true
  never_print_private_ui_tree: true
  never_print_secrets: true
  never_print_full_config: true
  never_request_passwords_or_tokens_in_chat: true
---

# ReAction: Check OpenClaw Peekaboo Permissions Health

## Trigger

`/ReAction-check-openclaw-peekaboo-permissions-health`

## Purpose

Run a safe, read-only permission health check for Peekaboo as an OpenClaw ecosystem Native Tool.

Use this after:

```txt
/ReAction-setup-openclaw-peekaboo-first-run
```

or when a user reports that Peekaboo screenshots, UI inspection, MCP, OpenClaw subprocess use, or click/type automation is not working.

This ReAction focuses on macOS permissions and permission source mismatch.

Default success means:

```txt
Peekaboo CLI is available, macOS version is compatible or known, Screen Recording status is known, Accessibility status is known, Event Synthesizing status is known, Bridge/local source differences are checked, and safe next steps are provided.
```

Default success does not mean:

```txt
Actual screenshots captured.
Actual UI tree dumped.
Actual clicks typed.
Agent actions executed.
MCP config edited.
Permissions force-granted.
```

Those are separate workflows or require explicit confirmation.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Official Permission Facts To Follow

Follow the current official Peekaboo docs.

Known official permission facts:

* Peekaboo is macOS-focused.
* macOS 15.0+ is required for core automation APIs.
* Screen Recording is required.
* Accessibility is recommended.
* Event Synthesizing is optional but enables background input delivery for process-targeted `click`, `type`, `hotkey`, `press`, and `paste`.
* `peekaboo permissions status` checks the selected permission source.
* `peekaboo permissions status --all-sources` compares all permission sources.
* `peekaboo permissions grant` shows or opens permission grant instructions.
* `peekaboo permissions request-event-synthesizing` requests Event Synthesizing permission.
* `peekaboo permissions status` prints a `Source:` line.
* If the source is Peekaboo Bridge, permissions are checked on the selected host app.
* If OpenClaw, Node, or another subprocess runner has permissions but the Bridge host does not, permissions may appear mismatched.
* `--all-sources` should be used to compare Bridge host and local CLI side by side.
* For OpenClaw or other Node/subprocess runners, the local runner and Bridge host permission sources can differ.
* `peekaboo see --mode screen --screen-index 0 --no-remote --capture-engine cg --json` may help bypass Bridge for local capture when the caller already has Screen Recording.
* Quickstart requires permission checks before screenshots, UI inspection, clicking/typing, agent runs, or MCP wiring.
* MCP troubleshooting also starts with confirming Screen Recording and Accessibility permissions.

Do not invent additional permission names.

Do not claim a permission is granted unless command output supports it.

---

# Scope

This ReAction may inspect:

* macOS version
* Peekaboo CLI availability
* Peekaboo version
* permission status
* all-sources permission status
* Bridge host vs local CLI process source
* whether Screen Recording is granted
* whether Accessibility is granted
* whether Event Synthesizing is granted
* whether OpenClaw/Node/subprocess runner mismatch may be involved
* whether permissions are sufficient for capture, inspection, MCP, and future automation

This ReAction must not:

* install Peekaboo
* run `brew install`
* edit MCP config
* capture screenshots by default
* dump UI trees by default
* run `click`, `type`, `hotkey`, `press`, `paste`, `scroll`, or `drag`
* run `peekaboo agent`
* run `peekaboo clean`
* print secrets
* print full config
* inspect private windows

---

# Commands

## Read-only commands allowed by default

Run only when relevant:

```json
{ "command": "sw_vers", "args": ["-productVersion"] }
{ "command": "which", "args": ["peekaboo"] }
{ "command": "peekaboo", "args": ["--version"] }
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

Optional read-only command when diagnosing app targeting, and only if needed:

```json
{ "command": "peekaboo", "args": ["list", "apps"] }
```

Do not print sensitive app/window titles if they look private.

## Commands requiring explicit confirmation

Do not run unless the user explicitly confirms:

```json
{ "command": "peekaboo", "args": ["permissions", "grant"] }
{ "command": "peekaboo", "args": ["permissions", "request-event-synthesizing"] }
```

Use `permissions grant` only to show/open permission instructions.

Use `request-event-synthesizing` only if the user wants background click/type/hotkey/press/paste readiness.

## Screenshot/UI inspection commands requiring explicit confirmation

These are not part of default permission health.

Use only if the user asks to verify permissions with a smoke test:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "frontmost", "--path", "peekaboo-permissions-health/focused.png"] }
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--json"] }
```

Before these commands:

* ask the user to switch to a safe non-private window
* ask explicit confirmation
* do not dump screenshot contents
* do not dump full UI tree

## Always forbidden by default

Do not run:

```json
{ "command": "peekaboo", "args": ["click", "<target>"] }
{ "command": "peekaboo", "args": ["type", "<text>"] }
{ "command": "peekaboo", "args": ["hotkey", "<keys>"] }
{ "command": "peekaboo", "args": ["press", "<key>"] }
{ "command": "peekaboo", "args": ["paste", "<text>"] }
{ "command": "peekaboo", "args": ["scroll", "<args>"] }
{ "command": "peekaboo", "args": ["drag", "<args>"] }
{ "command": "peekaboo", "args": ["agent", "<task>"] }
{ "command": "peekaboo", "args": ["clean"] }
```

Do not edit MCP configs.

Do not edit `~/.peekaboo/config.json`.

Do not print `~/.peekaboo/credentials`.

---

# Security Model

Treat Peekaboo permissions as high-risk because they enable screen observation and desktop interaction.

Protect:

```txt
screenshots
accessibility tree text
active app names
window titles
private documents
private chats
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

Allowed reporting examples:

```txt
Screen Recording: granted
Accessibility: missing
Event Synthesizing: unknown
Source: Peekaboo Bridge
All sources checked: yes
Bridge/local mismatch: possible
```

Forbidden reporting examples:

```txt
Full private UI tree
Private email subjects
Chat contents
Password manager window text
Full config file
Credentials file
API keys
```

---

# Permission Meaning

## Screen Recording

Required for capture and multi-app automation.

If missing:

```txt
Screen Recording is missing. Peekaboo screenshot/capture and many UI inspection paths may fail. Run `peekaboo permissions grant` only if you want to open the official grant instructions.
```

## Accessibility

Recommended for reliable window focus, menu interaction, dialog control, and desktop automation.

If missing:

```txt
Accessibility is missing. Peekaboo may still capture, but UI interaction, focus, menu, and dialog operations may be unreliable.
```

## Event Synthesizing

Needed for background input delivery for process-targeted `click`, `type`, `hotkey`, `press`, and `paste`.

If missing:

```txt
Event Synthesizing is missing or unknown. That is okay for screenshot/UI inspection. It matters later if you want background click/type/hotkey/press/paste automation.
```

Do not treat missing Event Synthesizing as a failure for read-only screenshot/UI inspection workflows.

---

# OpenClaw / Node / Bridge Source Handling

OpenClaw and other Node/subprocess runners can create permission source confusion.

The ReAction must check:

```txt
What does `peekaboo permissions status` list as Source?
Does `--all-sources` show different results for Bridge host and local CLI?
Is the command being run from Terminal, an editor, OpenClaw, Node, or another subprocess runner?
```

If `status` says Peekaboo Bridge:

```txt
Permissions are being checked on the selected Peekaboo Bridge host. If OpenClaw or another runner launches Peekaboo, you may need to compare Bridge and local CLI permissions with `peekaboo permissions status --all-sources`.
```

If local CLI has Screen Recording but Bridge does not:

```txt
The local CLI appears more ready than the Bridge host. Grant permissions to the Bridge host, or use a local/no-remote capture path only where appropriate.
```

If Bridge has permissions but local CLI does not:

```txt
The Bridge host appears more ready than the local CLI. Commands launched directly from this shell may still fail unless this shell/editor also has the required macOS permission.
```

Do not run workaround commands automatically.

Only suggest them.

---

# Health Classification

Classify results:

## Healthy

Use only if:

* Peekaboo CLI exists
* version is readable
* macOS version is supported or not contradicted
* Screen Recording is granted
* Accessibility is granted or clearly not needed for the requested read-only workflow
* all-sources check does not reveal blocking mismatch
* no secrets/private UI data were printed

## Partially ready

Use if:

* Peekaboo CLI exists
* Screen Recording granted
* Accessibility missing
* Event Synthesizing missing
* Bridge/local mismatch may affect OpenClaw/MCP
* screenshots may work but future click/type automation may fail

## Blocked

Use if:

* not macOS
* macOS version unsupported
* Peekaboo CLI missing
* Screen Recording missing and user wants screenshot/UI inspection
* permissions command fails
* private screen risk prevents safe testing
* command output indicates permission denial

## Unknown

Use if:

* commands could not run
* user did not approve checks
* permission output is ambiguous
* environment is remote/headless

---

# Required Capabilities

Minimum capabilities:

* inspect operating system
* run safe terminal commands
* read stdout/stderr
* detect command failure
* parse permission output
* identify permission source
* compare all-sources output
* classify health status
* ask confirmation
* redact secrets/private UI text
* produce final report

Optional capabilities:

* run safe screenshot test after confirmation
* run safe UI inspection after confirmation
* inspect generated output paths without printing contents
* provide MCP-specific permission guidance
* provide OpenClaw/subprocess runner guidance

No browser automation is required.

No install capability is required.

No click/type capability is required.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "permission_health_check | grant_guidance | event_synthesizing_request | screenshot_permission_test | ui_inspection_permission_test | blocked | unknown",
  "environment": {
    "os": "",
    "macosVersion": "",
    "macosSupported": "yes | no | unknown",
    "peekabooAvailable": false,
    "peekabooVersion": "",
    "runningFrom": "terminal | editor | openclaw | node_subprocess | mcp_client | unknown"
  },
  "permissions": {
    "statusCommandRun": false,
    "allSourcesCommandRun": false,
    "sourceLine": "",
    "screenRecording": "granted | missing | denied | unknown",
    "accessibility": "granted | missing | denied | unknown",
    "eventSynthesizing": "granted | missing | denied | unknown",
    "bridgeHostDetected": "yes | no | unknown",
    "localCliDetected": "yes | no | unknown",
    "bridgeLocalMismatch": "yes | no | unknown"
  },
  "readiness": {
    "captureReady": "yes | partial | no | unknown",
    "uiInspectionReady": "yes | partial | no | unknown",
    "mcpObservationReady": "yes | partial | no | unknown",
    "backgroundInputReady": "yes | partial | no | unknown",
    "openclawRunnerReady": "yes | partial | no | unknown"
  },
  "safety": {
    "privateScreenRisk": "yes | no | unknown",
    "screenshotCaptured": false,
    "uiTreeDumped": false,
    "clickOrTypeRun": false,
    "agentRun": false,
    "secretsPrinted": false,
    "fullConfigPrinted": false
  },
  "result": {
    "overallStatus": "healthy | partially_ready | blocked | unknown",
    "warnings": [],
    "safeNextSteps": [],
    "commandsRun": []
  }
}
```

---

# Phase 1: Understand Permission-health Request

## Skill

Peekaboo Permission-health Request Parsing Skill

## Behavior

Determine whether the user wants:

* full permission health check
* Screen Recording check only
* Accessibility check only
* Event Synthesizing readiness
* OpenClaw runner mismatch diagnosis
* MCP readiness diagnosis
* screenshot permission smoke test
* UI inspection permission smoke test
* grant instructions

Default to read-only permission health check.

## Rules

* Do not install Peekaboo.
* Do not open permission grant instructions without confirmation.
* Do not request Event Synthesizing without confirmation.
* Do not capture screenshots without confirmation.
* Do not run UI inspection without confirmation.
* Do not click/type/hotkey/press/paste.
* Do not edit configs.

## Exit criteria

Permission-health scope is clear.

---

# Phase 2: Check Environment and CLI

## Skill

Peekaboo Environment and CLI Skill

## Behavior

Run:

```json
{ "command": "sw_vers", "args": ["-productVersion"] }
{ "command": "which", "args": ["peekaboo"] }
```

If Peekaboo exists, run:

```json
{ "command": "peekaboo", "args": ["--version"] }
```

If Peekaboo is missing:

```txt
Peekaboo CLI was not found. Use /ReAction-setup-openclaw-peekaboo-first-run.
```

Do not install.

## Exit criteria

Environment and CLI availability are known.

---

# Phase 3: Run Permission Status

## Skill

Peekaboo Permission Status Skill

## Behavior

Run:

```json
{ "command": "peekaboo", "args": ["permissions", "status"] }
```

Parse:

* Source line
* Screen Recording
* Accessibility
* Event Synthesizing
* any warnings or instructions

Do not run permission grant flow automatically.

## Exit criteria

Primary permission status is known.

---

# Phase 4: Run All-sources Permission Comparison

## Skill

Peekaboo All-sources Permission Comparison Skill

## Behavior

Run:

```json
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

Compare:

* selected source
* Peekaboo Bridge host
* local CLI process
* any other listed sources
* Screen Recording differences
* Accessibility differences
* Event Synthesizing differences

Detect:

```txt
Bridge has permissions but local CLI does not.
Local CLI has permissions but Bridge does not.
Both missing required permission.
Both ready.
Ambiguous output.
```

## Rules

* Do not print private paths if sensitive.
* Do not print unrelated environment data.
* Summarize clearly.

## Exit criteria

Bridge/local source mismatch is known.

---

# Phase 5: Classify Readiness by Use Case

## Skill

Peekaboo Permission Readiness Classification Skill

## Behavior

Classify readiness for:

```txt
Capture screenshots
Inspect UI with see
Use with OpenClaw or Node/subprocess runner
Use as MCP server
Use future click/type/hotkey/press/paste automation
```

Use rules:

* Capture usually requires Screen Recording.
* UI inspection is better with Accessibility.
* Background input requires Event Synthesizing.
* OpenClaw/subprocess use may need matching permissions for the selected host/source.
* MCP observation still needs Screen Recording and Accessibility to work reliably.
* Missing Event Synthesizing is not a blocker for observation-only workflows.

## Exit criteria

Readiness matrix is ready.

---

# Phase 6: Optional Permission Grant Guidance

## Skill

Peekaboo Permission Grant Guidance Skill

## Behavior

If a required permission is missing, explain next step.

Ask before running:

```json
{ "command": "peekaboo", "args": ["permissions", "grant"] }
```

Ask before running:

```json
{ "command": "peekaboo", "args": ["permissions", "request-event-synthesizing"] }
```

Do not imply the agent can grant permissions silently.

The user may need to approve permissions in macOS System Settings.

## Exit criteria

Grant guidance is given or skipped.

---

# Phase 7: Optional Safe Smoke Tests

## Skill

Peekaboo Permission Smoke Test Skill

## Behavior

Only if the user explicitly asks.

For screenshot permission test:

1. Ask user to switch to a safe non-private window.
2. Create output directory if confirmed.
3. Run:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "frontmost", "--path", "peekaboo-permissions-health/focused.png"] }
```

For UI inspection permission test:

1. Ask user to choose a safe app.
2. Run:

```json
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--json"] }
```

Summarize success without dumping private content.

## Rules

* No screenshots by default.
* No full UI tree by default.
* No private apps.
* No clicking.
* No typing.
* No agent.
* No MCP config edits.

## Exit criteria

Optional smoke tests are skipped or completed safely.

---

# Phase 8: Diagnose Common Permission Problems

## Skill

Peekaboo Permission Troubleshooting Skill

## Behavior

Diagnose common issues:

* not on macOS
* macOS version too old
* Peekaboo not installed
* Screen Recording missing
* Accessibility missing
* Event Synthesizing missing
* Bridge source mismatch
* OpenClaw/Node subprocess lacks permissions
* Terminal has permissions but editor/runner does not
* MCP client launches Peekaboo from a different host
* background input fails because Event Synthesizing is missing
* foreground mode may be needed later
* user expects click/type readiness but only observation permissions are granted
* user expects screenshot but whole-screen capture is blocked
* user is running in remote/headless environment

For each issue, provide:

* finding
* severity
* likely cause
* safe next step

Do not run fixes automatically.

---

# Phase 9: Final Permission Health Report

## Skill

Peekaboo Permission Health Report Skill

## Behavior

Return:

```md
# OpenClaw Peekaboo Permissions Health Report

Status: healthy | partially_ready | blocked | unknown

## Commands run

- `sw_vers -productVersion`: pass/fail/not run
- `which peekaboo`: pass/fail/not run
- `peekaboo --version`: pass/fail/not run
- `peekaboo permissions status`: pass/fail/not run
- `peekaboo permissions status --all-sources`: pass/fail/not run
- optional screenshot test: pass/fail/not run
- optional UI inspection test: pass/fail/not run

## Environment

- OS: <value>
- macOS version: <value or unknown>
- macOS supported: yes/no/unknown
- Peekaboo available: yes/no
- Peekaboo version: <value or unknown>
- Running from: terminal/editor/OpenClaw/Node/MCP/unknown

## Permission status

| Permission | Status | Why it matters |
|---|---|---|
| Screen Recording | granted/missing/unknown | Required for capture and multi-app automation. |
| Accessibility | granted/missing/unknown | Recommended for reliable focus, menus, dialogs, and UI control. |
| Event Synthesizing | granted/missing/unknown | Needed later for background click/type/hotkey/press/paste. |

## Source comparison

- Selected source: <value>
- Bridge host detected: yes/no/unknown
- Local CLI detected: yes/no/unknown
- Bridge/local mismatch: yes/no/unknown
- OpenClaw/subprocess concern: yes/no/unknown

## Readiness matrix

| Use case | Ready? | Notes |
|---|---|---|
| Screenshots / image capture | yes/partial/no/unknown | <note> |
| UI inspection with `see` | yes/partial/no/unknown | <note> |
| OpenClaw/Node subprocess runner | yes/partial/no/unknown | <note> |
| MCP observation tools | yes/partial/no/unknown | <note> |
| Future background click/type/hotkey | yes/partial/no/unknown | <note> |

## Findings

| Severity | Finding | Safe next step |
|---|---|---|
| info/warn/error | <finding> | <next step> |

## Safety checks

- Screenshot captured: yes/no
- Full UI tree printed: yes/no
- Click/type/hotkey/press/paste run: no
- Agent task run: no
- Secrets printed: no
- Full config printed: no

## Recommended next ReActions

- `/ReAction-setup-openclaw-peekaboo-first-run` if Peekaboo is missing.
- `/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test` if permissions look ready and the user wants a capture test.
- `/ReAction-check-openclaw-peekaboo-mcp-health` if the user wants MCP client integration.
- `/ReAction-audit-openclaw-peekaboo-automation-safety` before click/type/agent automation.
```

Do not include raw secrets, private screenshot contents, full UI trees, or full configs.

---

# End of ReAction
