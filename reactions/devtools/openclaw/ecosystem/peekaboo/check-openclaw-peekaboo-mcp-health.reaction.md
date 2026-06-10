---
id: check-openclaw-peekaboo-mcp-health
name: Check OpenClaw Peekaboo MCP Health
version: 0.1.0
description: Safely verify Peekaboo MCP readiness as an OpenClaw ecosystem Native Tool, covering stdio launch, npm/local-binary client config, tool exposure, permissions, environment variables, and redacted security checks.
category: devtools
subcategory: openclaw
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_read_only_with_confirmation_gates
supported_project_policy: macos_local_machine_with_peekaboo_cli_or_mcp_client_config
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_by_default: true
  requires_confirmation_before_mcp_client_config_read: true
  requires_confirmation_before_mcp_client_config_edit: true
  requires_confirmation_before_starting_mcp_server: true
  requires_confirmation_before_screenshot_or_ui_tool_test: true
  never_edit_mcp_config_by_default: true
  never_start_long_running_mcp_server_without_timeout_or_confirmation: true
  never_click_or_type: true
  never_hotkey_press_paste_scroll_or_drag: true
  never_run_agent_actions: true
  never_capture_private_screens_by_default: true
  never_dump_full_ui_tree_by_default: true
  never_print_screenshot_contents: true
  never_print_private_window_titles: true
  never_print_secrets: true
  never_print_full_config: true
  never_print_credentials_file: true
  never_request_passwords_or_tokens_in_chat: true
---

# ReAction: Check OpenClaw Peekaboo MCP Health

## Trigger

`/ReAction-check-openclaw-peekaboo-mcp-health`

## Purpose

Safely verify Peekaboo MCP readiness as an OpenClaw ecosystem Native Tool.

This ReAction checks whether a user can wire Peekaboo into an MCP client such as Codex, Claude Code, Cursor, or another MCP-capable agent runtime.

This ReAction is not for installing Peekaboo.

This ReAction is not for running desktop automation.

This ReAction is not for editing MCP config by default.

Default success means:

```txt
Peekaboo CLI is available, MCP command help is reachable, MCP transport/config shape is correct, permissions are known, tool exposure is understood, and no secrets/full configs were printed.
```

Default success does not mean:

```txt
The agent clicked or typed.
MCP config was edited.
A screenshot was captured.
A private UI tree was inspected.
An agent task was run.
HTTP/SSE MCP server transport works.
```

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Official Facts To Follow

Follow current official Peekaboo docs.

Known official MCP facts:

* Peekaboo runs as an MCP server over stdio.
* Peekaboo exposes native tools such as `image`, `see`, and `click` to external MCP clients.
* External MCP clients include Codex, Claude Code, Cursor, and similar clients.
* Peekaboo no longer hosts or manages external MCP servers.
* MCP clients should launch `peekaboo mcp` directly.
* Supported/default transport is stdio.
* HTTP/SSE flags may be recognized, but server transports are not implemented yet.
* Most MCP clients can launch Peekaboo through npm or a local binary.

Official npm MCP config:

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

Official local binary MCP config:

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

Official MCP env example shape:

```json
{
  "mcpServers": {
    "peekaboo": {
      "command": "npx",
      "args": ["-y", "@steipete/peekaboo", "mcp"],
      "env": {
        "PEEKABOO_AI_PROVIDERS": "openai/gpt-5.5,anthropic/claude-opus-4-7",
        "PEEKABOO_LOG_LEVEL": "info"
      }
    }
  }
}
```

Common MCP environment variables include:

```txt
PEEKABOO_AI_PROVIDERS
PEEKABOO_LOG_LEVEL
OPENAI_API_KEY
ANTHROPIC_API_KEY
X_AI_API_KEY
XAI_API_KEY
PEEKABOO_OLLAMA_BASE_URL
```

Do not copy real secret values into reports.

Known MCP verification facts:

* Run server manually first with `peekaboo mcp`.
* Show help with `peekaboo mcp --help`.
* Start server with `peekaboo mcp`.
* Explicit stdio transport can use `peekaboo mcp serve --transport stdio`.
* Restart the MCP client and ask it to list available tools or take a screenshot.
* Peekaboo should expose the same native tools that `peekaboo tools` reports.

Known MCP troubleshooting facts:

* Ensure Screen Recording and Accessibility permissions are granted with `peekaboo permissions status`.
* Confirm the client launches Peekaboo with `mcp` or `mcp serve`.
* Confirm stdio transport.
* Use absolute binary paths for local checkouts.
* Confirm the binary is executable.
* Set `PEEKABOO_LOG_LEVEL=debug` while diagnosing startup issues.
* Logs may be used for troubleshooting, but must be redacted.

Known MCP tool facts:

* MCP `image` and `see` share target parsing with the desktop observation pipeline.
* Observation targets can include `screen`, `screen:N`, `frontmost`, `menubar`, PID targets, app names, and app/window names.
* `see` should be called first.
* Element IDs from `see` should be passed to action tools when possible.
* Action tools include `click`, `scroll`, `type`, and `hotkey`.
* `set_value` and `perform_action` are available only when the input strategy supports action invocation.
* `perform_action` can invoke accessibility actions such as `AXPress`, `AXShowMenu`, or `AXIncrement`.

This ReAction must not invoke action tools.

---

# Scope

This ReAction may:

* inspect macOS and Peekaboo CLI availability
* run `peekaboo --version`
* run `peekaboo mcp --help`
* run `peekaboo tools`
* run `peekaboo tools --json` if supported
* run `peekaboo permissions status`
* run `peekaboo permissions status --all-sources`
* inspect MCP config shape after confirmation
* validate that config uses stdio launch
* validate npm launch shape
* validate local binary launch shape
* check whether local binary path is absolute and executable
* check whether env vars are named safely
* check whether secret values are redacted
* recommend safe next steps

This ReAction must not:

* install Peekaboo
* run `brew install`
* run `npx -y @steipete/peekaboo mcp` without confirmation
* start a long-running MCP server by default
* edit MCP config by default
* capture screenshots by default
* call MCP tools against private UI
* click
* type
* hotkey
* press
* paste
* scroll
* drag
* run `peekaboo agent`
* print secrets
* print full configs
* print credentials files
* print screenshots
* dump full UI trees

---

# Safe MCP Health Levels

Classify MCP health:

## Healthy

Use only if:

* Peekaboo CLI exists.
* `peekaboo --version` works.
* `peekaboo mcp --help` works.
* MCP config shape is valid or not needed.
* Transport is stdio.
* Command is either `npx -y @steipete/peekaboo mcp` or an absolute local binary with `args: ["mcp"]`.
* Permissions are sufficient for intended observation tools.
* No secrets/full configs were printed.
* No action tools were executed.

## Partially ready

Use if:

* Peekaboo CLI works.
* MCP help works.
* Config is missing or user has not chosen a client.
* Permissions are partial.
* Tool exposure is understood but client integration has not been tested.
* Event Synthesizing is missing, but user only needs observation tools.
* MCP config uses npm but client restart/list-tools has not been verified.

## Blocked

Use if:

* Not macOS.
* Peekaboo CLI missing.
* `peekaboo mcp --help` fails.
* MCP config command is wrong.
* Transport is HTTP/SSE and user expects working server transport.
* Local binary path is relative, missing, or not executable.
* Screen Recording missing for image/see usage.
* MCP client cannot launch process.
* Secrets would need to be exposed to continue.

## Unknown

Use if:

* User does not approve config inspection.
* Environment cannot run commands.
* MCP client is unavailable.
* Output is ambiguous.
* Client-specific config path is unknown.

---

# Commands

## Read-only commands allowed by default

```json
{ "command": "sw_vers", "args": ["-productVersion"] }
{ "command": "which", "args": ["peekaboo"] }
{ "command": "peekaboo", "args": ["--version"] }
{ "command": "peekaboo", "args": ["mcp", "--help"] }
{ "command": "peekaboo", "args": ["tools"] }
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

Optional read-only command if supported:

```json
{ "command": "peekaboo", "args": ["tools", "--json"] }
```

Do not print the full tools output if it is too large; summarize categories safely.

## Commands requiring explicit confirmation

Starting MCP manually may be long-running. Ask before running:

```json
{ "command": "peekaboo", "args": ["mcp"] }
```

Explicit stdio server start may be long-running. Ask before running and use a timeout/safe termination strategy:

```json
{ "command": "peekaboo", "args": ["mcp", "serve", "--transport", "stdio"] }
```

npm launch may download/execute a package. Ask before running:

```json
{ "command": "npx", "args": ["-y", "@steipete/peekaboo", "mcp", "--help"] }
```

Local binary checks after confirmation:

```bash
test -x /path/to/peekaboo
```

Config reads after confirmation:

```txt
Read MCP client config file only after user confirms path and permission.
Redact secrets before summarizing.
```

Config edits after explicit confirmation only.

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
```

Do not run MCP image/see/action tools against private UI.

Do not edit:

```txt
~/.peekaboo/config.json
~/.peekaboo/credentials
MCP client config files
```

unless the user explicitly confirms the exact edit.

---

# MCP Client Config Safety

The agent may provide config snippets.

The agent must not print existing full config files by default.

If inspecting an existing MCP client config:

* ask the user which client and config path
* read only after confirmation
* redact env values
* summarize only the Peekaboo server entry
* do not print unrelated servers
* do not print tokens
* do not print private paths when unnecessary

Allowed redacted summary:

```txt
MCP server `peekaboo` found.
Command: npx
Args: ["-y", "@steipete/peekaboo", "mcp"]
Transport: stdio
Env keys present: PEEKABOO_AI_PROVIDERS, PEEKABOO_LOG_LEVEL, OPENAI_API_KEY
Env secret values: redacted
```

Forbidden summary:

```txt
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=...
Full mcp.json contents
Full config.json contents
```

If config uses unsupported transport:

```txt
Peekaboo MCP currently supports stdio by default. HTTP/SSE flags may be recognized, but server transports are not implemented yet. Use stdio.
```

If config uses a relative binary path:

```txt
Use an absolute binary path for local checkouts.
```

If config uses `peekaboo mcp` but client cannot find `peekaboo`:

```txt
Use an absolute binary path or confirm the MCP client inherits the same PATH as your shell.
```

---

# Tool Exposure Safety

The agent should classify tools into observation and action groups.

Observation tools:

```txt
image
see
capture
list
tools
```

Action tools:

```txt
click
scroll
type
hotkey
press
paste
drag
set_value
perform_action
menu
dialog
window
space
app
dock
open
```

This ReAction may inspect tool names.

This ReAction must not execute action tools.

If the user wants action tools enabled in MCP:

```txt
Before using action tools, run /ReAction-audit-openclaw-peekaboo-automation-safety.
```

If the user only needs screenshots/UI inspection:

```txt
Prefer observation-only usage first. Use `see` before any action and pass stable element IDs later.
```

---

# Permissions and MCP

MCP readiness depends on permissions.

Check:

```txt
Screen Recording
Accessibility
Event Synthesizing
Bridge/local source mismatch
```

Rules:

* Screen Recording is required for capture.
* Accessibility is recommended for reliable UI inspection/control.
* Event Synthesizing is needed later for background action tools.
* Missing Event Synthesizing is not a blocker for observation-only MCP use.
* `peekaboo permissions status --all-sources` helps diagnose Bridge/local source mismatch.

If permissions are missing:

```txt
Use /ReAction-check-openclaw-peekaboo-permissions-health before MCP tool testing.
```

---

# Required Capabilities

Minimum capabilities:

* inspect operating system
* run safe terminal commands
* detect Peekaboo CLI availability
* detect MCP command availability
* inspect permission status
* inspect tool catalog safely
* ask confirmation before config read/edit
* parse MCP config shape
* redact secrets
* identify stdio vs unsupported transport
* identify npm vs local binary launch
* identify local binary path issues
* identify tool exposure risk
* produce final MCP health report

Optional capabilities:

* inspect MCP client config after confirmation
* test local binary executability
* run a short MCP start probe with timeout after confirmation
* inspect MCP client logs after confirmation and redaction
* provide client-specific config guidance for Codex, Claude Code, Cursor, or other MCP clients

No screenshot capability is required.

No click/type capability is required.

No browser automation is required.

No agent execution capability is required.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "mcp_health_check | config_review | launch_probe | tool_catalog_review | blocked | unknown",
  "environment": {
    "os": "",
    "macosVersion": "",
    "peekabooAvailable": false,
    "peekabooVersion": "",
    "mcpHelpAvailable": false,
    "nodeAvailable": "yes | no | unknown",
    "npxAvailable": "yes | no | unknown"
  },
  "permissions": {
    "statusChecked": false,
    "allSourcesChecked": false,
    "screenRecording": "granted | missing | unknown",
    "accessibility": "granted | missing | unknown",
    "eventSynthesizing": "granted | missing | unknown",
    "bridgeLocalMismatch": "yes | no | unknown"
  },
  "mcp_config": {
    "configInspectionApproved": false,
    "clientName": "",
    "configPath": "",
    "peekabooEntryFound": "yes | no | unknown",
    "command": "",
    "args": [],
    "transport": "stdio | http | sse | unknown",
    "usesNpmPackage": "yes | no | unknown",
    "usesLocalBinary": "yes | no | unknown",
    "localBinaryAbsolute": "yes | no | unknown",
    "localBinaryExecutable": "yes | no | unknown",
    "envKeys": [],
    "secretValuesRedacted": true,
    "configEdited": false
  },
  "tool_exposure": {
    "toolsListed": false,
    "observationToolsPresent": [],
    "actionToolsPresent": [],
    "fullToolsOutputPrinted": false,
    "actionToolsExecuted": false
  },
  "safety": {
    "secretsPrinted": false,
    "fullConfigPrinted": false,
    "credentialsFilePrinted": false,
    "screenshotCaptured": false,
    "uiTreeDumped": false,
    "clickOrTypeRun": false,
    "agentRun": false
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

# Phase 1: Understand MCP-health Request

## Skill

Peekaboo MCP Health Request Parsing Skill

## Behavior

Determine whether the user wants:

* general MCP health check
* npm MCP config review
* local binary MCP config review
* client-specific config review
* launch troubleshooting
* tool catalog review
* permission-related MCP diagnosis
* log-based diagnosis

Default to read-only MCP health check.

## Rules

* Do not edit MCP config by default.
* Do not start long-running MCP server without confirmation.
* Do not run `npx` without confirmation.
* Do not capture screenshots.
* Do not click/type.
* Do not run agent.
* Do not print secrets/full configs.

## Exit criteria

MCP-health scope is clear.

---

# Phase 2: Check Environment and CLI

## Skill

Peekaboo MCP Environment Skill

## Behavior

Run:

```json
{ "command": "sw_vers", "args": ["-productVersion"] }
{ "command": "which", "args": ["peekaboo"] }
```

If Peekaboo exists:

```json
{ "command": "peekaboo", "args": ["--version"] }
{ "command": "peekaboo", "args": ["mcp", "--help"] }
```

Optional:

```json
{ "command": "which", "args": ["node"] }
{ "command": "which", "args": ["npx"] }
```

If Peekaboo missing:

```txt
Peekaboo CLI was not found. Use /ReAction-setup-openclaw-peekaboo-first-run.
```

Do not install.

## Exit criteria

Peekaboo and MCP command availability are known.

---

# Phase 3: Check Permissions for MCP

## Skill

Peekaboo MCP Permission Readiness Skill

## Behavior

Run:

```json
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

Classify:

* observation MCP readiness
* action MCP readiness
* Bridge/local mismatch
* OpenClaw/Node subprocess concern

If Screen Recording is missing:

```txt
MCP screenshot/image tools are likely blocked. Run /ReAction-check-openclaw-peekaboo-permissions-health.
```

If Accessibility is missing:

```txt
MCP UI inspection or later action tools may be unreliable. Run the permissions health ReAction before tool testing.
```

If Event Synthesizing is missing:

```txt
Observation-only MCP use can still be okay, but later background click/type/hotkey/press/paste may fail.
```

## Exit criteria

Permission readiness is known.

---

# Phase 4: Review MCP Config Shape

## Skill

Peekaboo MCP Config Shape Review Skill

## Behavior

Ask before reading config:

```txt
Which MCP client config should I inspect, and may I read only the Peekaboo server entry with secrets redacted?
```

If user provides/pastes config, inspect only relevant `peekaboo` entry.

Valid npm shape:

```json
{
  "command": "npx",
  "args": ["-y", "@steipete/peekaboo", "mcp"]
}
```

Valid local binary shape:

```json
{
  "command": "/absolute/path/to/peekaboo",
  "args": ["mcp"]
}
```

Optional explicit stdio shape may be:

```json
{
  "command": "peekaboo",
  "args": ["mcp", "serve", "--transport", "stdio"]
}
```

Flag issues:

* missing `mcp` arg
* wrong package name
* unsupported HTTP/SSE transport expectation
* relative binary path
* binary not executable
* env secrets printed
* missing permissions
* client PATH mismatch
* action tools exposed without safety plan

Do not edit config.

## Exit criteria

MCP config is valid, invalid, missing, or not inspected.

---

# Phase 5: Review Tool Catalog Safely

## Skill

Peekaboo MCP Tool Catalog Review Skill

## Behavior

Run:

```json
{ "command": "peekaboo", "args": ["tools"] }
```

If supported and useful:

```json
{ "command": "peekaboo", "args": ["tools", "--json"] }
```

Summarize:

* observation tools present
* action tools present
* risk level
* whether tools align with expected MCP capability

Do not execute tools.

Do not print huge full catalog.

Classify:

```txt
Observation tools: image, see, capture/list if present.
Action tools: click, type, hotkey, press, paste, scroll, drag, set_value, perform_action, menu, dialog, window, app, space, dock, open.
```

If action tools are exposed:

```txt
Action tools are powerful. Before using them, run /ReAction-audit-openclaw-peekaboo-automation-safety.
```

## Exit criteria

Tool exposure is understood.

---

# Phase 6: Optional MCP Launch Probe

## Skill

Peekaboo MCP Launch Probe Skill

## Behavior

This is optional and requires explicit confirmation.

Explain that `peekaboo mcp` starts an MCP server over stdio and may be long-running.

If the user confirms, use a safe timeout/supervised launch strategy.

Possible probes:

```json
{ "command": "peekaboo", "args": ["mcp", "--help"] }
```

Already allowed by default.

Long-running probe only after confirmation:

```json
{ "command": "peekaboo", "args": ["mcp"] }
```

or:

```json
{ "command": "peekaboo", "args": ["mcp", "serve", "--transport", "stdio"] }
```

Do not leave the server running.

Do not connect to private UI.

Do not call action tools.

If using npm package check:

```json
{ "command": "npx", "args": ["-y", "@steipete/peekaboo", "mcp", "--help"] }
```

Ask first because this may download/execute the package.

## Exit criteria

Launch probe is skipped, passed, failed, or blocked.

---

# Phase 7: Diagnose Common MCP Problems

## Skill

Peekaboo MCP Troubleshooting Skill

## Behavior

Diagnose common issues:

* Peekaboo not installed
* `peekaboo mcp --help` fails
* MCP config missing
* MCP config points to wrong command
* missing `mcp` argument
* client cannot find `peekaboo` due to PATH mismatch
* local binary path is relative
* local binary is not executable
* npm/npx unavailable
* HTTP/SSE configured despite stdio being supported/default
* Screen Recording missing
* Accessibility missing
* Bridge/local permission mismatch
* environment variables missing
* provider secret env vars not available to MCP process
* API keys printed in config
* logs include secrets
* tool catalog mismatch
* action tools exposed without safety plan

For each issue:

* severity
* likely cause
* safe next step
* recommended follow-up ReAction

Do not fix automatically.

---

# Phase 8: Final MCP Health Report

## Skill

Peekaboo MCP Health Report Skill

## Behavior

Return:

```md
# OpenClaw Peekaboo MCP Health Report

Status: healthy | partially_ready | blocked | unknown

## Commands run

- `sw_vers -productVersion`: pass/fail/not run
- `which peekaboo`: pass/fail/not run
- `peekaboo --version`: pass/fail/not run
- `peekaboo mcp --help`: pass/fail/not run
- `peekaboo permissions status`: pass/fail/not run
- `peekaboo permissions status --all-sources`: pass/fail/not run
- `peekaboo tools`: pass/fail/not run
- MCP config inspection: done/skipped/blocked
- MCP launch probe: pass/fail/not run

## Environment

- OS: <value>
- macOS version: <value or unknown>
- Peekaboo available: yes/no
- Peekaboo version: <value or unknown>
- Node available: yes/no/unknown
- npx available: yes/no/unknown

## Permission readiness

| Permission | Status | MCP impact |
|---|---|---|
| Screen Recording | granted/missing/unknown | Needed for image/screenshot tools. |
| Accessibility | granted/missing/unknown | Recommended for UI inspection/control. |
| Event Synthesizing | granted/missing/unknown | Needed later for background action tools. |

## MCP config

- Config inspected: yes/no
- Client: <name or unknown>
- Peekaboo server entry found: yes/no/unknown
- Launch style: npm/local-binary/other/unknown
- Command: <redacted safe command>
- Args valid: yes/no/unknown
- Transport: stdio/http/sse/unknown
- Uses unsupported server transport: yes/no/unknown
- Env keys present: <keys only, values redacted>
- Secret values redacted: yes/no
- Config edited: no

## Tool exposure

| Tool group | Present? | Notes |
|---|---|---|
| Observation tools | yes/no/unknown | image/see/capture/list/etc. |
| Action tools | yes/no/unknown | click/type/hotkey/scroll/etc. Do not use before safety audit. |
| Accessibility action tools | yes/no/unknown | set_value/perform_action if exposed. |

## Findings

| Severity | Finding | Safe next step |
|---|---|---|
| info/warn/error | <finding> | <next step> |

## Safety checks

- MCP config edited: no
- Screenshots captured: no
- UI tree dumped: no
- Click/type/hotkey/press/paste/scroll/drag run: no
- Agent task run: no
- Secrets printed: no
- Full config printed: no
- Credentials file printed: no

## Recommended next ReActions

- `/ReAction-check-openclaw-peekaboo-permissions-health` if permissions are missing or mismatched.
- `/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test` if MCP observation tools need a safe local CLI baseline.
- `/ReAction-audit-openclaw-peekaboo-automation-safety` before using action tools.
- `/ReAction-run-openclaw-peekaboo-safe-click-type-smoke-test` only after safety audit and explicit confirmation.
```

Do not include raw secrets, screenshot contents, private UI content, full tool dumps, full configs, or credentials files.

---

# End of ReAction
