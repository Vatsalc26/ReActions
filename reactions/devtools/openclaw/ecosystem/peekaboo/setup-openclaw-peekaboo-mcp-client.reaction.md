---
id: setup-openclaw-peekaboo-mcp-client
name: Setup OpenClaw Peekaboo MCP Client
version: 0.1.0
description: Safely configure an MCP client to launch Peekaboo as an OpenClaw ecosystem Native Tool over stdio, using official npm or local-binary config shapes, permission checks, config backup, redaction, and confirmation gates.
category: devtools
subcategory: openclaw
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_and_config_edit_with_confirmation_gates
supported_project_policy: macos_local_machine_with_peekaboo_cli_or_mcp_client_config
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_config_read: true
  requires_confirmation_before_config_write: true
  requires_confirmation_before_backup_creation: true
  requires_confirmation_before_mcp_launch_probe: true
  requires_confirmation_before_client_restart_guidance: false
  never_edit_mcp_config_without_confirmation: true
  never_overwrite_existing_mcp_servers: true
  never_remove_other_mcp_servers: true
  never_print_full_config: true
  never_print_secrets: true
  never_print_credentials_file: true
  never_request_passwords_or_tokens_in_chat: true
  never_store_api_keys_in_config_by_default: true
  never_capture_screenshots_by_default: true
  never_dump_full_ui_tree_by_default: true
  never_click_or_type: true
  never_hotkey_press_paste_scroll_or_drag: true
  never_run_agent_actions: true
---

# ReAction: Setup OpenClaw Peekaboo MCP Client

## Trigger

`/ReAction-setup-openclaw-peekaboo-mcp-client`

## Purpose

Safely configure an MCP client to launch Peekaboo as an OpenClaw ecosystem Native Tool.

This ReAction turns a verified Peekaboo install into a usable MCP client integration.

It can configure an MCP client such as Codex, Claude Code, Cursor, or another compatible MCP client.

This ReAction is not for installing Peekaboo.

This ReAction is not for clicking, typing, screenshots, or desktop automation.

This ReAction is not for running Peekaboo agent tasks.

Default success means:

```txt
The MCP client has a valid Peekaboo server entry using stdio, either through the official npm launch shape or an absolute local binary path, with secrets redacted, existing config preserved, and permissions/next steps documented.
```

Default success does not mean:

```txt
Action tools were used.
Desktop UI was controlled.
Private screens were captured.
Screenshots were taken.
Agent mode was run.
HTTP/SSE MCP server transport was configured.
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
* Peekaboo exposes native tools such as `image`, `see`, and `click` to MCP clients.
* Peekaboo no longer hosts or manages external MCP servers.
* MCP clients should launch `peekaboo mcp` directly.
* stdio is supported and default.
* HTTP/SSE flags may be recognized, but server transports are not implemented yet.
* Most MCP clients can launch Peekaboo through npm or a local binary.

Official npm config:

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

Official local binary config:

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

Official optional env shape:

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

Common environment keys:

```txt
PEEKABOO_AI_PROVIDERS
PEEKABOO_LOG_LEVEL
OPENAI_API_KEY
ANTHROPIC_API_KEY
X_AI_API_KEY
XAI_API_KEY
PEEKABOO_OLLAMA_BASE_URL
```

Important secret rule:

```txt
Env key names can be shown.
Env values must be redacted.
Do not ask the user to paste API keys into chat.
```

Known official permission facts:

* Screen Recording is required for image/screenshot tools.
* Accessibility is recommended for reliable UI inspection/control.
* Event Synthesizing is needed later for background input delivery for click/type/hotkey/press/paste.
* `peekaboo permissions status` checks selected source.
* `peekaboo permissions status --all-sources` compares Bridge and local CLI sources.

Known official MCP troubleshooting facts:

* Confirm Screen Recording and Accessibility permissions.
* Confirm client launches Peekaboo with `mcp` or `mcp serve`.
* Confirm client uses stdio transport.
* Use absolute binary paths for local checkouts.
* Confirm binary is executable.
* Set `PEEKABOO_LOG_LEVEL=debug` while diagnosing startup issues.
* Do not use HTTP/SSE server transport for working setup.

Known official tool safety facts:

* `see` should be called first.
* Element IDs should be passed to action tools when possible.
* Action tools include click, scroll, type, hotkey, set_value, and perform_action.
* This ReAction must not execute action tools.

---

# Scope

This ReAction may:

* inspect macOS and Peekaboo availability
* check `peekaboo --version`
* check `peekaboo mcp --help`
* check `peekaboo permissions status`
* check `peekaboo permissions status --all-sources`
* check `peekaboo tools`
* help the user choose npm launch or local-binary launch
* ask which MCP client to configure
* inspect existing MCP config only after confirmation
* back up existing MCP config only after confirmation
* add or update the `peekaboo` MCP server entry only after confirmation
* preserve unrelated MCP servers
* redact secrets and env values
* provide restart/list-tools verification steps
* produce a final setup report

This ReAction must not:

* install Peekaboo
* run `brew install`
* run `npx -y @steipete/peekaboo mcp` by default
* start a long-running MCP server by default
* edit MCP config without confirmation
* overwrite unrelated MCP config
* remove other MCP servers
* capture screenshots by default
* call MCP image/see tools by default
* execute click/type/hotkey/scroll/drag/action tools
* run `peekaboo agent`
* print secrets
* print full configs
* print credentials files
* print private screenshots
* print full UI trees

---

# Supported Setup Modes

## npm setup mode

Use this when the user wants the published release:

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

Notes:

* This is the official published-release path.
* It does not require hardcoding a local binary path.
* It may download/execute the npm package when the MCP client starts.
* Do not run the npm launch command directly unless the user confirms.

## local binary setup mode

Use this when the user is developing Peekaboo or testing a checkout:

```json
{
  "mcpServers": {
    "peekaboo": {
      "command": "/absolute/path/to/peekaboo",
      "args": ["mcp"]
    }
  }
}
```

Rules:

* path must be absolute
* binary should exist
* binary should be executable
* do not use a relative path
* do not assume the MCP client inherits shell PATH

## env setup mode

Use only when needed.

Allowed env values:

```json
{
  "env": {
    "PEEKABOO_AI_PROVIDERS": "<provider/model list>",
    "PEEKABOO_LOG_LEVEL": "info"
  }
}
```

For secrets:

```txt
Prefer external environment variables or credentials file.
Do not ask the user to paste keys into chat.
Do not write raw API keys into MCP config unless the user explicitly requests it and understands the risk.
```

## debug setup mode

For troubleshooting, use:

```json
{
  "env": {
    "PEEKABOO_LOG_LEVEL": "debug"
  }
}
```

Do not leave debug logging enabled without noting privacy/log risk.

---

# MCP Client Config Policy

The agent must ask:

```txt
Which MCP client do you want to configure?
```

Supported generic client types:

```txt
Codex
Claude Code
Cursor
other MCP client
```

Then ask:

```txt
Do you want me to inspect and patch the MCP config file, or only give you the config snippet?
```

Do not guess config path when unsafe.

If client config path is known from the user or environment, ask before reading it.

Before writing:

1. read config after confirmation
2. parse JSON
3. check if `mcpServers` exists
4. check if `peekaboo` already exists
5. preserve all unrelated server entries
6. prepare patch
7. show redacted diff/summary
8. ask confirmation to write
9. create backup after confirmation
10. write updated config
11. validate JSON
12. report restart/list-tools steps

Do not overwrite config blindly.

Do not delete other MCP servers.

Do not print full config.

Show only a redacted summary of the `peekaboo` entry.

Allowed summary:

```txt
MCP server `peekaboo` will be added.
Command: npx
Args: ["-y", "@steipete/peekaboo", "mcp"]
Env keys: PEEKABOO_AI_PROVIDERS, PEEKABOO_LOG_LEVEL
Secret values: redacted
Other MCP servers preserved: yes
Backup will be created: yes
```

Forbidden summary:

```txt
Full mcp.json:
...
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=...
```

---

# Commands

## Read-only commands allowed by default

```json
{ "command": "sw_vers", "args": ["-productVersion"] }
{ "command": "which", "args": ["peekaboo"] }
{ "command": "peekaboo", "args": ["--version"] }
{ "command": "peekaboo", "args": ["mcp", "--help"] }
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
{ "command": "peekaboo", "args": ["tools"] }
```

Optional if supported:

```json
{ "command": "peekaboo", "args": ["tools", "--json"] }
```

Do not dump full tool catalog if too large.

Summarize observation vs action tools.

## Commands requiring explicit confirmation

Config read:

```txt
Read MCP client config file only after user confirms the path and permission.
```

Config backup:

```bash
cp <mcp-config-path> <mcp-config-path>.bak.<timestamp>
```

Config write:

```txt
Write only the patched JSON after confirmation.
```

JSON validation:

```bash
node -e "JSON.parse(require('fs').readFileSync('<mcp-config-path>', 'utf8')); console.log('valid json')"
```

Local binary executable check:

```bash
test -x /absolute/path/to/peekaboo
```

Long-running or package-executing probes require confirmation:

```json
{ "command": "npx", "args": ["-y", "@steipete/peekaboo", "mcp", "--help"] }
{ "command": "peekaboo", "args": ["mcp"] }
{ "command": "peekaboo", "args": ["mcp", "serve", "--transport", "stdio"] }
```

Use a timeout/safe termination strategy for long-running server probes.

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
```

This ReAction configures the MCP client entry only.

---

# Tool Exposure Safety

Classify tools:

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

If action tools are exposed:

```txt
Action tools are powerful. Before using them, run /ReAction-audit-openclaw-peekaboo-automation-safety.
```

If the user only needs screenshots/UI inspection:

```txt
Start with observation tools only. Use `see` before any action and pass stable element IDs later.
```

---

# Permission Gate

Before MCP setup, check:

```txt
Screen Recording
Accessibility
Event Synthesizing
Bridge/local source mismatch
```

Rules:

* missing Screen Recording blocks image/screenshot tool usefulness
* missing Accessibility weakens `see` and later control reliability
* missing Event Synthesizing is not a blocker for observation-only MCP
* Event Synthesizing matters later for background input delivery for click/type/hotkey/press/paste
* Bridge/local mismatch can cause MCP client behavior to differ from Terminal behavior

If permissions are missing, setup may still add config, but final report must say:

```txt
MCP config is installed, but observation/action tools may fail until macOS permissions are fixed.
```

---

# Security Model

Protect:

```txt
MCP config files
API keys
OAuth tokens
Peekaboo credentials
Peekaboo config
environment variables
screenshots
UI tree text
private app names
private window titles
logs
agent sessions
```

Redact:

```txt
OPENAI_API_KEY
ANTHROPIC_API_KEY
X_AI_API_KEY
XAI_API_KEY
GROK_API_KEY
GEMINI_API_KEY
MINIMAX_API_KEY
ANTHROPIC_REFRESH_TOKEN
ANTHROPIC_ACCESS_TOKEN
any value that looks like a token/key
```

Do not ask user to paste secrets into chat.

If user pasted secrets, do not repeat them.

Suggest rotating exposed keys if needed.

---

# Required Capabilities

Minimum capabilities:

* inspect operating system
* run safe terminal commands
* detect Peekaboo CLI availability
* detect MCP command availability
* check permissions
* ask confirmation
* parse MCP client config
* preserve unrelated config entries
* generate MCP server config
* create backup after confirmation
* write config after confirmation
* validate JSON after write
* redact secrets
* produce final setup report

Optional capabilities:

* inspect MCP client config path after confirmation
* detect client-specific config conventions
* test local binary executability
* run a short launch probe with timeout after confirmation
* inspect logs after confirmation and redaction
* provide client-specific restart/list-tools instructions

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
  "execution_mode": "snippet_only | config_patch | config_review | local_binary_setup | npm_setup | blocked | unknown",
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
  "mcp_client": {
    "clientName": "",
    "configPath": "",
    "configReadApproved": false,
    "configWriteApproved": false,
    "backupCreated": false,
    "existingPeekabooEntry": "yes | no | unknown",
    "otherServersPreserved": true,
    "setupMode": "npm | local_binary | unknown",
    "command": "",
    "args": [],
    "envKeys": [],
    "secretValuesRedacted": true,
    "transport": "stdio",
    "jsonValidBefore": "yes | no | unknown",
    "jsonValidAfter": "yes | no | unknown"
  },
  "safety": {
    "secretsPrinted": false,
    "fullConfigPrinted": false,
    "credentialsFilePrinted": false,
    "screenshotsCaptured": false,
    "uiTreeDumped": false,
    "clickOrTypeRun": false,
    "agentRun": false
  },
  "result": {
    "overallStatus": "complete | partial | blocked | failed | unknown",
    "warnings": [],
    "safeNextSteps": [],
    "commandsRun": []
  }
}
```

---

# Phase 1: Understand MCP Setup Request

## Skill

Peekaboo MCP Setup Request Parsing Skill

## Behavior

Determine whether the user wants:

* config snippet only
* config review
* config patch
* npm setup
* local binary setup
* Codex config
* Claude Code config
* Cursor config
* other MCP client config
* troubleshooting after config

Default to snippet-only until the user confirms editing.

Ask:

```txt
Which MCP client do you want to configure: Codex, Claude Code, Cursor, or another MCP client?
```

Ask:

```txt
Do you want only the config snippet, or should I patch your MCP config file after showing a redacted summary?
```

## Rules

* Do not edit until confirmed.
* Do not read config until confirmed.
* Do not print full config.
* Do not ask for secret values.
* Do not start MCP server by default.
* Do not run tools.

## Exit criteria

Setup mode and target client are clear.

---

# Phase 2: Check Environment and Peekaboo MCP Availability

## Skill

Peekaboo MCP Setup Environment Skill

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

Optional for npm setup:

```json
{ "command": "which", "args": ["node"] }
{ "command": "which", "args": ["npx"] }
```

If Peekaboo missing:

```txt
Peekaboo CLI was not found. Use /ReAction-setup-openclaw-peekaboo-first-run first.
```

If MCP help fails:

```txt
Peekaboo MCP command is not available or failed. Use /ReAction-check-openclaw-peekaboo-mcp-health before setup.
```

## Exit criteria

Peekaboo MCP availability is known.

---

# Phase 3: Check Permissions

## Skill

Peekaboo MCP Setup Permission Gate Skill

## Behavior

Run:

```json
{ "command": "peekaboo", "args": ["permissions", "status"] }
{ "command": "peekaboo", "args": ["permissions", "status", "--all-sources"] }
```

Summarize:

* Screen Recording
* Accessibility
* Event Synthesizing
* Bridge/local mismatch

Do not block config setup solely because Event Synthesizing is missing.

Block or warn if Screen Recording is missing and the user expects image/screenshot tools.

Warn if Accessibility is missing and user expects `see` or control tools.

## Exit criteria

Permission status is known and reflected in final plan.

---

# Phase 4: Choose MCP Launch Shape

## Skill

Peekaboo MCP Launch Shape Skill

## Behavior

Choose npm or local binary.

For normal users, recommend npm published release:

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

For source checkout/development users, use local binary:

```json
{
  "mcpServers": {
    "peekaboo": {
      "command": "/absolute/path/to/peekaboo",
      "args": ["mcp"]
    }
  }
}
```

If using local binary:

* require absolute path
* check executable after confirmation
* do not use relative path
* warn if client may not inherit shell PATH

If user wants explicit stdio:

```json
{
  "command": "peekaboo",
  "args": ["mcp", "serve", "--transport", "stdio"]
}
```

Do not configure HTTP/SSE.

## Exit criteria

Launch shape is chosen.

---

# Phase 5: Build Redacted MCP Config Entry

## Skill

Peekaboo MCP Config Entry Generation Skill

## Behavior

Build the `peekaboo` server entry.

Minimum npm entry:

```json
{
  "command": "npx",
  "args": ["-y", "@steipete/peekaboo", "mcp"]
}
```

Optional env entry:

```json
{
  "command": "npx",
  "args": ["-y", "@steipete/peekaboo", "mcp"],
  "env": {
    "PEEKABOO_AI_PROVIDERS": "<provider/model list>",
    "PEEKABOO_LOG_LEVEL": "info"
  }
}
```

Do not include raw API key values by default.

If user needs provider keys, say:

```txt
Set provider API keys in your shell, MCP client environment, or `~/.peekaboo/credentials`. Do not paste secrets into chat.
```

## Exit criteria

Config entry is ready for snippet or patch.

---

# Phase 6: Patch MCP Config After Confirmation

## Skill

MCP Config Safe Patch Skill

## Behavior

Only if user chose config patch.

Steps:

1. ask for config path or client
2. ask permission to read config
3. read config
4. parse JSON
5. detect existing `mcpServers`
6. detect existing `peekaboo` entry
7. preserve all unrelated server entries
8. create patched JSON
9. show redacted summary/diff
10. ask permission to write
11. create backup
12. write config
13. validate JSON
14. report exact changed server entry summary

Do not print full config.

If existing `peekaboo` entry exists:

* ask whether to replace/update it
* preserve old entry in backup
* show redacted old/new summary

If JSON invalid:

* do not overwrite
* report blocked
* suggest manual fix or ask for permission to repair

## Exit criteria

Config is patched or blocked safely.

---

# Phase 7: Verify Setup Without Running Tools

## Skill

Peekaboo MCP Setup Verification Skill

## Behavior

Verify safely:

* config JSON valid
* server entry exists
* command shape valid
* args include `mcp`
* transport is stdio
* env secret values redacted
* permissions known
* user knows to restart MCP client
* user knows to list tools in the MCP client

Do not run screenshots.

Do not run action tools.

Optional launch probe after confirmation:

```json
{ "command": "peekaboo", "args": ["mcp", "--help"] }
```

Do not start a long-running server unless user confirms and timeout handling is available.

## Exit criteria

Setup readiness is known.

---

# Phase 8: Final MCP Setup Report

## Skill

Peekaboo MCP Setup Report Skill

## Behavior

Return:

```md
# OpenClaw Peekaboo MCP Client Setup Report

Status: complete | partial | blocked | failed | unknown

## Setup target

- MCP client: <Codex/Claude Code/Cursor/other>
- Setup mode: npm/local-binary/snippet-only/config-patch
- Config path: <path or not provided>
- Config edited: yes/no
- Backup created: yes/no/not needed

## Commands run

- `sw_vers -productVersion`: pass/fail/not run
- `which peekaboo`: pass/fail/not run
- `peekaboo --version`: pass/fail/not run
- `peekaboo mcp --help`: pass/fail/not run
- `peekaboo permissions status`: pass/fail/not run
- `peekaboo permissions status --all-sources`: pass/fail/not run
- JSON validation: pass/fail/not run

## MCP entry

- Server name: `peekaboo`
- Launch style: npm/local-binary
- Command: <safe command summary>
- Args: <safe args summary>
- Transport: stdio
- Env keys: <keys only, values redacted>
- Secret values redacted: yes/no
- Other MCP servers preserved: yes/no/not inspected

## Permission readiness

| Permission | Status | MCP impact |
|---|---|---|
| Screen Recording | granted/missing/unknown | Needed for image/screenshot tools. |
| Accessibility | granted/missing/unknown | Recommended for UI inspection/control. |
| Event Synthesizing | granted/missing/unknown | Needed later for background action tools. |

## Verification steps for user

1. Restart the MCP client.
2. Ask the client to list MCP tools.
3. Confirm Peekaboo tools appear.
4. Test observation tools before action tools.
5. Run `see` before any action and use element IDs.
6. Run `/ReAction-audit-openclaw-peekaboo-automation-safety` before click/type/agent automation.

## Safety checks

- Full config printed: no
- Secrets printed: no
- Credentials file printed: no
- Screenshots captured: no
- UI tree dumped: no
- Click/type/action tools run: no
- Agent task run: no

## Findings

| Severity | Finding | Safe next step |
|---|---|---|
| info/warn/error | <finding> | <next step> |

## Recommended next ReActions

- `/ReAction-check-openclaw-peekaboo-mcp-health` if MCP client does not list tools.
- `/ReAction-run-openclaw-peekaboo-ui-capture-smoke-test` to verify observation locally before using MCP.
- `/ReAction-audit-openclaw-peekaboo-automation-safety` before action tools.
- `/ReAction-run-openclaw-peekaboo-safe-click-type-smoke-test` only after safety audit and explicit confirmation.
```

Do not include raw secrets, screenshot contents, private UI content, full configs, or credentials files.

---

# End of ReAction
