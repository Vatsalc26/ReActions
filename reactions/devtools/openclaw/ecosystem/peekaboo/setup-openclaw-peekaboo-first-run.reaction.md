---
id: setup-openclaw-peekaboo-first-run
name: Setup OpenClaw Peekaboo First Run
version: 0.1.0
description: Safely guide a first-time OpenClaw ecosystem Peekaboo setup through install planning, macOS permission checks, first screenshot verification, first UI inspection verification, optional MCP planning, and security reminders.
category: devtools
subcategory: openclaw
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_with_confirmation_gates
supported_project_policy: macos_local_machine_or_peekaboo_source_checkout
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_install: true
  requires_confirmation_before_permission_grant_flow: true
  requires_confirmation_before_screenshot_capture: true
  requires_confirmation_before_ui_inspection: true
  requires_confirmation_before_mcp_config_edit: true
  requires_confirmation_before_agent_run: true
  requires_confirmation_before_click_or_type: true
  never_click_or_type_by_default: true
  never_run_agent_actions_by_default: true
  never_capture_private_screens_by_default: true
  never_print_screenshot_contents_without_confirmation: true
  never_print_secrets: true
  never_print_full_config: true
  never_request_passwords_or_tokens_in_chat: true
  never_type_passwords_or_tokens: true
  never_click_destructive_controls: true
  never_send_messages_or_submit_forms_without_confirmation: true
  never_make_purchases_or_payments: true
  never_modify_mcp_client_config_without_confirmation: true
---

# ReAction: Setup OpenClaw Peekaboo First Run

## Trigger

`/ReAction-setup-openclaw-peekaboo-first-run`

## Purpose

Safely guide a first-time Peekaboo setup as part of the OpenClaw ecosystem Native Tools pack.

Peekaboo is a macOS automation toolkit and Native Tool that can:

- capture pixels
- inspect the accessibility tree
- drive input
- expose tools through MCP
- run a local agent loop

Because Peekaboo can see and control the user’s desktop, this ReAction must be safety-aware by default.

The default first-run success target is:

```txt
Peekaboo CLI is installed or detected, permissions are checked, a safe screenshot works, a safe UI inspection works, and the user understands the next MCP/automation steps.
```

Default first-run success does not mean:

```txt
MCP client config edited.
Actual clicks performed.
Text typed into real apps.
Agent task executed against the desktop.
Secrets inspected.
Private screens captured.
```

Those are later workflows.

The output should always follow the same final report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Official Setup Facts To Follow

Follow the current official OpenClaw and Peekaboo docs.

Known official OpenClaw ecosystem fact:

* OpenClaw lists Peekaboo under Native Tools.
* Native Tools are CLI utilities that give an agent hands on the host machine.
* Peekaboo is listed as a macOS CLI + MCP server for screenshots, UI inspection, and clicks.

Known official Peekaboo overview facts:

* Peekaboo is macOS-focused.
* Peekaboo captures pixels.
* Peekaboo reads the macOS accessibility tree.
* Peekaboo drives input.
* Peekaboo ships an agent runtime.
* Peekaboo ships an MCP server.

Known official install facts:

* Homebrew is the recommended CLI install path.
* Official Homebrew command:

```json
{ "command": "brew", "args": ["install", "steipete/tap/peekaboo"] }
```

* Verify with:

```json
{ "command": "peekaboo", "args": ["--version"] }
```

* Update Homebrew install with:

```json
{ "command": "brew", "args": ["upgrade", "steipete/tap/peekaboo"] }
```

* npm is the MCP-client launch path.
* Official npm MCP launch command:

```json
{ "command": "npx", "args": ["-y", "@steipete/peekaboo", "mcp"] }
```

* Mac app release includes the menu-bar app, visualizer, permission flows, and a bundled CLI.
* Source build requires macOS 15.0+ and Swift 6.2+.
* Source build uses a recursive clone and pnpm workflow.

Known official source build path:

```json
{ "command": "git", "args": ["clone", "--recurse-submodules", "https://github.com/openclaw/Peekaboo.git"] }
{ "command": "pnpm", "args": ["install"] }
{ "command": "pnpm", "args": ["run", "build:cli"] }
{ "command": "pnpm", "args": ["run", "build:swift:all"] }
```

Only use source build path for contributors or users explicitly working from a Peekaboo source checkout.

Known official verification commands:

```json
{ "command": "peekaboo", "args": ["--version"] }
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["list", "apps"] }
```

Known official permission facts:

* macOS 15.0+ is required for core automation APIs.
* Screen Recording is required.
* Accessibility is recommended.
* Event Synthesizing enables background input for click/type/hotkey/press/paste.
* Permissions can be checked with:

```json
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

* Permission grant instructions can be opened with:

```json
{ "command": "peekaboo", "args": ["permissions", "grant"] }
```

* Event Synthesizing can be requested with:

```json
{ "command": "peekaboo", "args": ["permissions", "request-event-synthesizing"] }
```

Known official quickstart facts:

* First grant/check permissions.
* Then take a screenshot.
* Then inspect the UI.
* Then click/type.
* Then run an agent.
* MCP wiring is optional.

Known official screenshot commands include:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "screen", "--path", "screen.png"] }
{ "command": "peekaboo", "args": ["image", "--mode", "frontmost", "--path", "focused.png"] }
{ "command": "peekaboo", "args": ["image", "--app", "Safari", "--path", "safari.png"] }
```

Known official UI inspection commands include:

```json
{ "command": "peekaboo", "args": ["see", "--app", "Safari", "--json"] }
{ "command": "peekaboo", "args": ["see", "--app", "Safari", "--annotate", "--path", "safari.png"] }
```

Known official automation facts:

* Element ID from `peekaboo see` is the most reliable target.
* Label/role/app query is second-best.
* Coordinates are last resort.
* Background delivery is default when target process is known.
* Foreground delivery focuses the target first and should be used when required.
* Background input needs Event Synthesizing permission for the sender shown by `peekaboo permissions status`.

Known official MCP facts:

* Peekaboo runs as an MCP server over stdio.
* MCP clients can launch Peekaboo with npm or a local binary.
* MCP exposes tools such as image, see, click, scroll, type, hotkey, set_value, and perform_action.
* `see` should be called first and element IDs should be passed to action tools when possible.
* stdio is the supported/default transport.
* HTTP/SSE flags may be recognized, but server transports are not implemented yet.

Known official configuration facts:

* Peekaboo resolves settings in this order:

  1. command-line arguments
  2. environment variables
  3. credentials file
  4. config file
  5. built-in defaults
* Credentials can live in `~/.peekaboo/credentials`.
* Config can live in `~/.peekaboo/config.json`.
* Environment variables include provider settings, default save path, log level, log file path, CLI binary path, and daemon socket settings.

Known official agent facts:

* `peekaboo agent` hands a natural-language task to Peekaboo’s agent service.
* The agent command can run with `--dry-run` to emit planned steps without invoking tools.
* The agent command supports `--max-steps`.
* The agent command supports provider/model override.
* The agent command supports `--resume`, `--resume-session`, and `--list-sessions`.
* Dry-run is useful for understanding plans without touching the UI.

Known official CLI facts:

* `peekaboo --version` shows embedded build/commit metadata.
* `peekaboo tools` lists the MCP/agent tool catalog.
* Most commands support JSON output.
* `peekaboo clean` removes snapshot caches and supports dry-run.
* Do not clean/delete caches during first-run setup.

---

# Important Scope

This is a first-run setup ReAction for the OpenClaw ecosystem Peekaboo tool.

It may modify the user’s machine only after explicit confirmation.

Possible changes after confirmation:

* install Peekaboo through Homebrew
* open permission grant instructions
* run permission request flow
* create a safe first-run output directory
* capture a user-approved safe screenshot
* run user-approved UI inspection
* optionally show MCP config snippet
* optionally edit MCP client config only after explicit confirmation

Do not silently perform any of those changes.

Do not click, type, hotkey, press, paste, scroll, drag, run `peekaboo agent`, or edit MCP config by default.

Default first-run verification should stop after:

```txt
CLI detected.
Permissions checked.
Safe screenshot works.
Safe UI inspection works.
```

Actual UI automation should be a later ReAction.

Recommended later ReActions:

```txt
/ReAction-check-openclaw-peekaboo-permissions-health
/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test
/ReAction-run-openclaw-peekaboo-safe-click-type-smoke-test
/ReAction-check-openclaw-peekaboo-mcp-health
/ReAction-audit-openclaw-peekaboo-automation-safety
```

---

# Security Model

Treat Peekaboo as a powerful desktop-control tool.

Peekaboo can observe and interact with local apps.

The agent must protect:

```txt
screenshots
window titles
accessibility tree text
active app names
private browser pages
private messages
emails
documents
password fields
tokens
API keys
credentials files
MCP config files
agent sessions
snapshot caches
logs
```

The agent may report whether files exist, but must not print raw secrets.

Sensitive locations include:

```txt
~/.peekaboo/credentials
~/.peekaboo/config.json
/tmp/peekaboo-mcp.log
.env
.env.local
MCP client config files
screenshots generated during testing
annotated UI maps generated during testing
snapshot caches
agent session metadata
```

Use redacted summaries only.

Allowed examples:

```txt
~/.peekaboo/config.json exists: yes
~/.peekaboo/credentials exists: yes
provider credentials present: yes, redacted
screenshot path created: ./peekaboo-first-run/focused.png
```

Forbidden examples:

```txt
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
full credentials file
full config file
private screenshot contents
full accessibility tree from a private app
private chat contents
```

---

# Safe First-run Defaults

Use these defaults:

```txt
macOS only.
Plan first.
Confirm before install.
Confirm before opening permission flows.
Confirm before screenshots.
Confirm before UI inspection.
Use a safe non-private window.
Prefer frontmost safe window screenshot over whole-screen screenshot.
Prefer `peekaboo see` inspection over clicking.
Do not click/type by default.
Do not run `peekaboo agent` by default.
Do not configure MCP by default.
Do not print secrets.
Do not print full configs.
```

Preferred safe first-run test target:

```txt
A non-private Finder window, TextEdit empty document, or other harmless local window chosen by the user.
```

Avoid first-run screenshots of:

```txt
password managers
private chats
email inboxes
banking sites
medical pages
private documents
school/work confidential pages
cloud consoles
terminal with secrets
.env files
API dashboards
```

If the user’s screen may contain private content, say:

```txt
Please switch to a safe, non-private window before we run a screenshot or UI inspection.
```

---

# Execution Modes

## Plan-only mode

Use this mode when:

* user has not confirmed installation
* user is not on macOS
* macOS version is unsupported or unknown
* Homebrew is missing and user has not confirmed install path
* user is unsure which install path to choose
* user is running in a remote/headless environment
* permissions are missing and user has not confirmed opening permission flow
* screenshot capture is not yet approved
* the agent is running in an environment where desktop capture is unsafe

Plan-only mode should inspect and report without changing anything.

## Guided install mode

Use this mode only after explicit confirmation.

Guided install mode may:

* run Homebrew install
* verify `peekaboo --version`
* check permissions
* open permission grant instructions
* run safe first screenshot after approval
* run safe first UI inspection after approval
* produce final setup report

## MCP planning mode

Use this mode when the user wants MCP integration.

MCP planning mode may:

* explain npm MCP launch
* provide config snippet
* check whether user wants Codex, Claude Code, Cursor, or another MCP client
* inspect existing MCP config only after confirmation
* edit MCP config only after explicit confirmation

Do not edit MCP config by default.

## Source checkout mode

Use this mode when the current directory appears to be a Peekaboo source checkout.

Source checkout mode should:

* detect repository markers
* detect pnpm workspace
* avoid Homebrew install inside the source repo unless the user asks
* use source build path only after confirmation
* make clear that source setup is for development, not normal first-time user install

Do not mix Homebrew global install and source checkout build unless the user asks.

---

# Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for plan-only mode:

* inspect operating system
* inspect current directory
* run safe version commands
* detect macOS version
* detect Homebrew availability
* detect Peekaboo CLI availability
* detect whether current directory is a Peekaboo source checkout
* produce final report

Additional capabilities for guided install mode:

* run terminal commands
* read stdout
* read stderr
* detect command failures
* stop on interactive prompts
* ask confirmation
* redact sensitive output
* create a safe first-run output directory
* run screenshot command after confirmation
* run UI inspection command after confirmation

Optional capabilities:

* inspect MCP client config after confirmation
* edit MCP client config after explicit confirmation
* read generated screenshot path metadata without exposing contents
* inspect generated JSON/annotation metadata with redaction

No browser automation is required by default.

Do not require OpenClaw Gateway to be running for Peekaboo first-run setup.

OpenClaw Gateway integration can be a later ReAction.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "plan_only | guided_install | mcp_planning | source_checkout | blocked | unknown",
  "environment": {
    "os": "",
    "macosVersion": "",
    "macosSupported": "yes | no | unknown",
    "homebrewAvailable": false,
    "nodeAvailable": false,
    "npmAvailable": false,
    "pnpmAvailable": false,
    "peekabooAvailable": false,
    "peekabooVersion": "",
    "sourceCheckoutDetected": false
  },
  "permissions": {
    "statusChecked": false,
    "screenRecording": "granted | missing | unknown",
    "accessibility": "granted | missing | unknown",
    "eventSynthesizing": "granted | missing | unknown",
    "allSourcesChecked": false,
    "bridgeHostDetected": "yes | no | unknown"
  },
  "first_run_checks": {
    "safeWindowConfirmed": false,
    "screenshotApproved": false,
    "screenshotCaptured": false,
    "screenshotPath": "",
    "uiInspectionApproved": false,
    "uiInspectionRun": false,
    "uiInspectionPath": "",
    "listAppsRun": false,
    "mcpPlanningRequested": false,
    "mcpConfigEdited": false,
    "agentDryRunRequested": false,
    "agentActualRun": false,
    "clickOrTypeRun": false
  },
  "security": {
    "secretsPrinted": false,
    "fullConfigPrinted": false,
    "privateScreenRisk": "yes | no | unknown",
    "destructiveUiActionRisk": "yes | no | unknown",
    "mcpConfigRisk": "yes | no | unknown",
    "privateScreenshotGenerated": "yes | no | unknown"
  },
  "result": {
    "overallStatus": "complete | partial | blocked | failed | unknown",
    "warnings": [],
    "nextReactions": [],
    "commandsRun": []
  }
}
```

---

# Phase 1: Understand Request and Choose Mode

## Skill

Peekaboo First-run Request Classification Skill

## Behavior

Determine whether the user wants:

* install planning
* actual install
* permission check
* first screenshot
* first UI inspection
* MCP setup
* source build
* OpenClaw ecosystem catalog entry only
* troubleshooting

Default to plan-only until confirmation.

## Rules

* Do not install immediately.
* Do not capture immediately.
* Do not click or type.
* Do not edit MCP config.
* Do not run agent tasks.
* If user is not on macOS, explain that Peekaboo is macOS-focused and stop.
* If user is remote/headless, explain that screenshot/UI automation may not work safely.

## Pause conditions

Pause if:

* operating system is not macOS
* user has not confirmed install
* user has not confirmed screenshot capture
* user has not confirmed UI inspection
* requested action would click/type/submit/delete/pay/send
* private content may be visible

## Exit criteria

Execution mode is selected.

---

# Phase 2: Inspect Environment

## Skill

Peekaboo Environment Inspection Skill

## Behavior

Run safe inspection commands.

Suggested commands:

```json
{ "command": "sw_vers", "args": ["-productVersion"] }
{ "command": "which", "args": ["brew"] }
{ "command": "which", "args": ["peekaboo"] }
{ "command": "peekaboo", "args": ["--version"] }
{ "command": "which", "args": ["node"] }
{ "command": "node", "args": ["--version"] }
{ "command": "which", "args": ["npm"] }
{ "command": "npm", "args": ["--version"] }
```

Run `peekaboo --version` only if `peekaboo` exists.

For source checkout detection, inspect current directory for likely Peekaboo repository files. Do not assume a checkout unless evidence is present.

## Rules

* Do not install.
* Do not modify files.
* Do not print environment variables.
* Do not read credentials.
* Do not run source build commands.

## Exit criteria

Environment readiness is known.

---

# Phase 3: Plan or Perform Install

## Skill

Peekaboo Install Planning Skill

## Behavior

If Peekaboo is already installed:

* skip install
* record version
* continue to permission check

If not installed, present official setup choices:

```txt
1. Homebrew install for normal CLI users.
2. npm/npx launch for MCP clients.
3. Mac app release for visualizer and permission flows.
4. Source build for contributors.
```

Recommended first-run path:

```txt
Homebrew CLI install first, then permissions, screenshot, and UI inspection.
```

Run Homebrew install only after explicit confirmation:

```json
{ "command": "brew", "args": ["install", "steipete/tap/peekaboo"] }
```

Verify:

```json
{ "command": "peekaboo", "args": ["--version"] }
```

## Rules

* Do not run remote shell scripts.
* Do not build from source unless user explicitly wants contributor setup.
* Do not run `pnpm install` unless in confirmed source checkout mode.
* Do not edit shell profiles unless user confirms.
* Do not force MCP setup during first run.

## Exit criteria

Peekaboo CLI is installed/detected, or setup is blocked with a clear reason.

---

# Phase 4: Check Permissions

## Skill

Peekaboo macOS Permission Check Skill

## Behavior

Run:

```json
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

Interpret:

* Screen Recording
* Accessibility
* Event Synthesizing
* Bridge host vs local CLI process

If missing permissions, explain:

* Screen Recording is required.
* Accessibility is recommended.
* Event Synthesizing enables background input for click/type/hotkey/press/paste.
* Open permission grant instructions only after confirmation.

Command after confirmation:

```json
{ "command": "peekaboo", "args": ["permissions", "grant"] }
```

Event Synthesizing request after confirmation:

```json
{ "command": "peekaboo", "args": ["permissions", "request-event-synthesizing"] }
```

If OpenClaw or a Node/subprocess runner has different host permissions, mention checking all sources.

## Rules

* Do not force users to grant permissions.
* Do not proceed to screenshots if Screen Recording is missing.
* Do not proceed to click/type if Accessibility/Event Synthesizing is missing.
* Do not click/type during first-run setup anyway.

## Exit criteria

Permission status is known and next step is clear.

---

# Phase 5: Run Safe Screenshot Smoke Test

## Skill

Peekaboo Safe Screenshot Verification Skill

## Behavior

Before screenshot:

1. Ask the user to switch to a safe, non-private window.
2. Ask confirmation to capture.
3. Prefer frontmost-window capture over whole-screen capture.

Create a safe output directory if needed:

```bash
mkdir -p peekaboo-first-run
```

Preferred command:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "frontmost", "--path", "peekaboo-first-run/focused.png"] }
```

Fallback command only if user confirms:

```json
{ "command": "peekaboo", "args": ["image", "--mode", "screen", "--path", "peekaboo-first-run/screen.png"] }
```

Do not display or upload the screenshot unless the user explicitly asks.

Report only path and success status.

## Rules

* Do not capture private screens.
* Do not capture whole screen by default.
* Do not upload screenshot.
* Do not print OCR/extracted contents.
* Do not analyze sensitive screenshot content.
* Do not capture password managers, private chats, banking, cloud consoles, or terminals with secrets.

## Exit criteria

A safe screenshot is captured or the reason it cannot be captured is known.

---

# Phase 6: Run Safe UI Inspection Smoke Test

## Skill

Peekaboo Safe UI Inspection Verification Skill

## Behavior

Before UI inspection:

1. Confirm safe target app/window.
2. Ask permission to inspect.
3. Prefer a harmless app chosen by user.

Preferred command pattern:

```json
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--json"] }
```

Optional annotated output after confirmation:

```json
{ "command": "peekaboo", "args": ["see", "--app", "<safe-app-name>", "--annotate", "--path", "peekaboo-first-run/annotated.png"] }
```

Summarize success without dumping full UI tree.

Allowed summary:

```txt
UI inspection succeeded.
Elements found: <count if safe>.
Example roles found: button/text field/window.
```

Forbidden output:

```txt
Full accessibility tree from a private app.
Private document text.
Private messages.
Email subjects.
Tokens shown in terminal.
```

## Rules

* Do not run against private apps.
* Do not dump full JSON by default.
* Redact labels that look private.
* Do not click or type.
* Do not use coordinates.
* Do not perform actions.

## Exit criteria

UI inspection works or failure reason is known.

---

# Phase 7: MCP Planning Only

## Skill

Peekaboo MCP Planning Skill

## Behavior

If the user wants MCP integration, explain official MCP options.

Published npm MCP launch:

```json
{
  "mcpServers": {
    "peekaboo": {
      "command": "npx",
      "args": ["-y", "@steipete/peekaboo", "mcp"]
    }
  }
}
```

Local binary MCP launch for development:

```json
{
  "mcpServers": {
    "peekaboo": {
      "command": "/path/to/peekaboo",
      "args": ["mcp"]
    }
  }
}
```

Explain:

* MCP uses stdio.
* MCP exposes image, see, click, scroll, type, hotkey, and related tools.
* Call `see` first and pass element IDs when possible.
* Do not expose tools broadly without understanding risk.

Do not edit MCP client config unless the user explicitly confirms:

```txt
Which client should I update, and may I edit its MCP config file?
```

## Rules

* Do not ask user to paste provider keys.
* Do not print existing MCP config with secrets.
* Do not configure HTTP/SSE transport.
* Do not enable action tools without user understanding the risk.
* Do not connect MCP during first-run unless explicitly requested.

## Exit criteria

MCP path is explained or configured only after explicit confirmation.

---

# Phase 8: Agent Dry-run Planning Only

## Skill

Peekaboo Agent Dry-run Planning Skill

## Behavior

Actual `peekaboo agent` execution should not be part of default first-run setup.

If the user specifically asks to test the agent, use dry-run first.

Command pattern:

```json
{ "command": "peekaboo", "args": ["agent", "<safe task>", "--dry-run", "--max-steps", "5"] }
```

Only use a harmless task.

Example safe dry-run task:

```txt
Describe the visible controls in the frontmost safe test window.
```

Do not run an actual agent task that invokes tools unless the user explicitly confirms after reviewing dry-run.

## Rules

* Prefer `--dry-run`.
* Cap max steps.
* Do not run against private apps.
* Do not let agent click/type by default.
* Do not let agent submit forms, send messages, delete files, make purchases, or change settings.
* Do not use audio/microphone flags during first-run setup.

## Exit criteria

Agent dry-run is skipped, planned, or safely completed.

---

# Phase 9: Security and Privacy Review

## Skill

Peekaboo First-run Security Review Skill

## Behavior

Check whether first-run created or touched sensitive surfaces.

Review:

* screenshots generated
* annotated images generated
* config existence
* credentials existence
* logs path if known
* MCP config risk
* private screen risk
* whether any click/type/agent actual run occurred

Safe metadata only.

Do not print raw config/credentials/logs/screenshots.

If generated screenshots may contain private content, recommend deleting them manually or with a separate confirmed cleanup step.

Do not run cleanup by default.

If cleanup is requested, prefer dry-run if command supports it.

## Rules

* Never print secrets.
* Never print full config.
* Never print screenshot contents.
* Never print full UI tree.
* Never print full logs.
* Never clean/delete without confirmation.

## Exit criteria

Security posture is summarized.

---

# Phase 10: Final Setup Report

## Skill

Consistent Peekaboo First-run Report Skill

## Behavior

Return this final report:

```md
# OpenClaw Peekaboo First-run Report

Status: complete | partial | blocked | failed

## Environment

- OS: <value>
- macOS supported: yes/no/unknown
- Homebrew available: yes/no
- Node/npm available: yes/no
- Peekaboo available: yes/no
- Peekaboo version: <value or unknown>
- Source checkout detected: yes/no

## Install path

- Path used: Homebrew / npm MCP / Mac app / source checkout / existing install / none
- Install performed: yes/no
- Install confirmed by user: yes/no/not needed

## Permissions

- `peekaboo permissions status`: passed/failed/not run
- `peekaboo permissions status --all-sources`: passed/failed/not run
- Screen Recording: granted/missing/unknown
- Accessibility: granted/missing/unknown
- Event Synthesizing: granted/missing/unknown
- Bridge/local source mismatch: yes/no/unknown

## First-run checks

- `peekaboo --version`: passed/failed/not run
- `peekaboo list apps`: passed/failed/not run
- Safe screenshot captured: yes/no
- Screenshot path: <path or none>
- UI inspection run: yes/no
- Annotated output path: <path or none>
- MCP configured: yes/no
- Agent dry-run executed: yes/no
- Actual click/type executed: no

## Safety checks

- Private screen avoided: yes/no/unknown
- Secrets printed: no/yes
- Full config printed: no/yes
- Full UI tree printed: no/yes
- Actual UI mutation avoided: yes/no
- MCP config edited only after confirmation: yes/no/not applicable

## Findings

| Severity | Finding | Safe next step |
|---|---|---|
| info/warn/error | <finding> | <next step> |

## Recommended next ReActions

- `/ReAction-check-openclaw-peekaboo-permissions-health`
- `/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test`
- `/ReAction-check-openclaw-peekaboo-mcp-health`
- `/ReAction-audit-openclaw-peekaboo-automation-safety`
```

Do not include raw secrets, private screenshot contents, full UI trees, or full configs.

---

# End of ReAction
