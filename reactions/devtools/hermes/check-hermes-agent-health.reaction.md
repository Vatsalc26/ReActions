---
id: check-hermes-agent-health
name: Check Hermes Agent Health
version: 0.1.0
description: Run a read-only Hermes Agent health check using CLI availability, doctor output, provider/model status, session resume, gateway status, and redacted security posture checks.
category: devtools
subcategory: hermes
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_read_only_with_confirmation_gates
supported_project_policy: local_machine_or_hermes_source_checkout
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_by_default: true
  requires_confirmation_before_any_mutation: true
  never_print_secrets: true
  never_print_full_config: true
  never_enable_yolo_mode: true
  never_disable_approvals: true
  never_run_install_commands: true
  never_run_setup_by_default: true
  never_run_reset_without_confirmation: true
  never_delete_sessions_without_confirmation: true
  never_connect_gateway_by_default: true
  never_configure_cron_by_default: true
  never_install_skills_by_default: true
  never_configure_mcp_by_default: true
---

# ReAction: Check Hermes Agent Health

## Trigger

`/ReAction-check-hermes-agent-health`

## Purpose

Run a safe, read-only health check for an existing Hermes Agent setup.

This ReAction is a follow-up to:

```txt
/ReAction-setup-hermes-first-run
```

Use this after a user has installed Hermes or believes Hermes is installed.

This ReAction checks whether Hermes is healthy enough for normal local CLI/TUI usage.

Default success means:

```txt
Hermes CLI is available, `hermes doctor` is understandable, provider/model status is known, a local chat path is ready or already verified, session resume is known, and no obvious security posture issue is detected.
```

Default success does not mean:

```txt
Gateway configured.
Cron configured.
Skills installed.
MCP configured.
Remote backend enabled.
YOLO mode enabled.
```

Those are separate follow-up workflows.

---

# Scope

This is a diagnostic ReAction.

It may inspect:

* operating system and shell context
* Hermes CLI availability
* Hermes version
* `hermes doctor`
* provider/model status through safe Hermes commands
* first local chat readiness
* session resume state
* gateway status only as read-only status
* source checkout signals
* existence of Hermes config/secret/session files without printing them
* security posture warnings

It must not modify the user’s system unless the user explicitly asks and confirms a separate fix.

---

# Commands

## Read-only commands allowed by default

Run only when relevant:

```json
{ "command": "hermes", "args": ["--version"] }
{ "command": "hermes", "args": ["doctor"] }
{ "command": "hermes", "args": ["model"] }
{ "command": "hermes", "args": ["sessions", "list"] }
{ "command": "hermes", "args": ["--continue"] }
{ "command": "hermes", "args": ["gateway", "status"] }
```

Important:

* Run `hermes --continue` only if the user is okay with opening/resuming a session.
* If `hermes --continue` may enter an interactive chat, explain first and ask whether they want to test resume.
* Run `hermes gateway status` only as a read-only check.
* Do not run `hermes gateway setup`.
* Do not run `hermes setup`.
* Do not run `hermes setup --portal`.
* Do not run `hermes model` as a mutating provider switch. Use it only as a status/inspection path if safe in the installed CLI behavior. If it appears interactive or mutating, stop and ask.

## Commands requiring explicit confirmation

Do not run unless the user explicitly asks for a fix:

```json
{ "command": "hermes", "args": ["setup"] }
{ "command": "hermes", "args": ["setup", "--portal"] }
{ "command": "hermes", "args": ["model"] }
{ "command": "hermes", "args": ["gateway", "setup"] }
{ "command": "hermes", "args": ["skills", "install", "<source/path>"] }
```

Do not run installer commands in this ReAction.

If Hermes is not installed, report:

```txt
Hermes CLI was not found. Use /ReAction-setup-hermes-first-run.
```

## Always forbidden by default

Do not run:

```json
{ "command": "hermes", "args": ["--yolo"] }
{ "command": "hermes", "args": ["chat", "--yolo"] }
{ "command": "hermes", "args": ["config", "set", "approvals.mode", "off"] }
{ "command": "hermes", "args": ["config", "set", "approvals.cron_mode", "approve"] }
```

Do not instruct the user to type:

```txt
/yolo
```

Do not print full contents of:

```txt
~/.hermes/.env
~/.hermes/config.yaml
~/.hermes/auth.json
~/.hermes/sessions/
~/.hermes/memory/
.env
.env.local
```

Only report redacted summaries.

---

# Security Model

Treat Hermes Agent as a powerful local AI runtime.

Health checks must protect:

```txt
provider API keys
OAuth tokens
gateway tokens
MCP tokens
GitHub/Copilot tokens
Claude/OpenAI/OpenRouter/Nous Portal credentials
session contents
memory contents
private prompts
local file paths where sensitive
```

The agent may report whether important files exist.

The agent must not print raw secret values.

Use redacted summaries only.

Allowed examples:

```txt
~/.hermes/.env exists: yes
~/.hermes/config.yaml exists: yes
provider token present: yes, redacted
gateway token present: unknown / not inspected
```

Forbidden examples:

```txt
OPENAI_API_KEY=...
NOUS_API_KEY=...
full config.yaml contents
full auth.json contents
full session transcript
```

---

# Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities:

* inspect operating system
* run safe terminal commands
* read stdout/stderr
* detect command failure
* detect interactive prompts
* redact secrets
* detect Hermes CLI availability
* interpret `hermes doctor` output
* interpret provider/model readiness
* check session resume safely
* check gateway status read-only
* inspect file existence without printing contents
* produce final health report

No browser automation is required.

No installation capability is required.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "health_check | resume_test | provider_check | gateway_status_check | blocked | unknown",
  "environment": {
    "os": "",
    "shell": "",
    "hermesAvailable": false,
    "hermesVersion": "",
    "sourceCheckoutDetected": false
  },
  "hermes_health": {
    "doctorRun": false,
    "doctorStatus": "not_run | pass | warn | fail | unknown",
    "doctorFindings": [],
    "providerStatusKnown": false,
    "providerReady": false,
    "modelStatusKnown": false,
    "modelReady": false,
    "firstChatReady": "yes | no | unknown",
    "sessionResumeChecked": false,
    "sessionResumeStatus": "pass | warn | fail | not_run | unknown",
    "gatewayStatusChecked": false,
    "gatewayStatus": "not_configured | configured | running | stopped | error | unknown"
  },
  "security_posture": {
    "configExists": false,
    "envExists": false,
    "authExists": false,
    "sessionsExist": false,
    "secretsPrinted": false,
    "fullConfigPrinted": false,
    "approvalsLikelyEnabled": "yes | no | unknown",
    "yoloDetected": "yes | no | unknown",
    "remoteBackendDetected": "yes | no | unknown",
    "gatewayTokensDetected": "yes | no | unknown"
  },
  "result": {
    "overallStatus": "healthy | needs_attention | blocked | unknown",
    "recommendedNextReaction": "",
    "warnings": [],
    "fixesSuggested": [],
    "commandsRun": []
  }
}
```

---

# Phase 1: Understand Health-check Request

## Skill

Hermes Health-check Request Parsing Skill

## Behavior

Determine what the user wants:

* full health check
* doctor-only check
* provider/model check
* session resume check
* gateway status check
* “Hermes is broken” troubleshooting
* “after first run, what now?” check

Default to read-only health check.

If user asks to fix something, separate diagnosis from mutation.

## Rules

* Do not install Hermes.
* Do not run setup.
* Do not change provider.
* Do not configure gateway.
* Do not delete/reset sessions.
* Ask before running interactive chat/resume commands.
* Keep local CLI health as primary target.

## Exit criteria

Health-check scope is clear.

---

# Phase 2: Inspect Hermes Availability

## Skill

Hermes CLI Availability Skill

## Behavior

Check whether Hermes CLI is available.

Use:

```json
{ "command": "hermes", "args": ["--version"] }
```

If command is missing:

* report blocked
* recommend `/ReAction-setup-hermes-first-run`
* do not attempt install

If command exists:

* record version
* proceed to doctor

## Exit criteria

Hermes CLI availability is known.

---

# Phase 3: Run Doctor

## Skill

Hermes Doctor Interpretation Skill

## Behavior

Run:

```json
{ "command": "hermes", "args": ["doctor"] }
```

Capture:

* pass/warn/fail status
* provider/model issues
* config issues
* auth issues
* tool/runtime issues
* gateway warnings
* permissions warnings
* environment warnings

Do not paste raw output if it contains secrets.

Summarize findings.

## Rules

* Redact tokens and paths if sensitive.
* Do not fix automatically.
* Separate warnings from failures.
* If doctor suggests setup, recommend next step.

## Exit criteria

Doctor result is summarized.

---

# Phase 4: Check Provider and Model Readiness

## Skill

Hermes Provider/Model Health Skill

## Behavior

Determine provider/model readiness using safe Hermes output.

Possible command:

```json
{ "command": "hermes", "args": ["model"] }
```

Use this only if it can inspect status safely.

If it opens an interactive flow or appears mutating, stop and ask before continuing.

Check:

* provider configured
* model configured
* authentication likely present
* provider errors
* missing token
* bad endpoint
* invalid model
* unknown provider

## Rules

* Do not ask the user to paste secrets.
* Do not print provider tokens.
* Do not switch models without confirmation.
* Do not force Nous Portal.
* Keep provider-neutral stance.

## Exit criteria

Provider/model readiness is known or marked unknown.

---

# Phase 5: Check Local Chat and Session Resume

## Skill

Hermes Local Chat Readiness Skill

## Behavior

First success target is local CLI/TUI chat.

Ask the user before entering an interactive chat.

Possible checks:

```json
{ "command": "hermes", "args": [] }
{ "command": "hermes", "args": ["--tui"] }
{ "command": "hermes", "args": ["--continue"] }
{ "command": "hermes", "args": ["sessions", "list"] }
```

Prefer non-invasive checks first:

```json
{ "command": "hermes", "args": ["sessions", "list"] }
```

Use `hermes --continue` only with confirmation because it may resume an interactive session.

## Rules

* Do not expose prior session contents.
* Do not print full session transcript.
* Do not delete sessions.
* Do not reset memory.
* Do not run interactive commands without warning.

## Exit criteria

Session resume status is known or deferred.

---

# Phase 6: Check Gateway Status Read-only

## Skill

Hermes Gateway Status Read-only Skill

## Behavior

Gateway should be checked only as status, not configured.

Run if relevant:

```json
{ "command": "hermes", "args": ["gateway", "status"] }
```

Report:

* not configured
* configured
* running
* stopped
* error
* unknown

Do not treat unconfigured gateway as failure if local chat works.

Gateway is later.

## Rules

* Do not run `hermes gateway setup`.
* Do not connect Telegram, Discord, Slack, WhatsApp, Signal, Email, Home Assistant, Teams, or other channels.
* Do not print gateway tokens.
* Do not ask for gateway secrets.

## Exit criteria

Gateway status is known or marked not checked.

---

# Phase 7: Redacted Config and Security Posture Check

## Skill

Hermes Security Posture Skill

## Behavior

Inspect only safe metadata:

* whether `~/.hermes/.env` exists
* whether `~/.hermes/config.yaml` exists
* whether `~/.hermes/auth.json` exists
* whether sessions directory exists
* whether obvious secrets were printed accidentally
* whether approval settings appear unsafe, if visible without printing full config
* whether YOLO/remote backend/gateway tokens appear likely, if visible without printing secrets

Do not print raw file contents.

Use file existence/read capabilities carefully.

If a file read is needed, read only small targeted metadata and redact.

## Rules

* Never print full config.
* Never print full `.env`.
* Never print full `auth.json`.
* Never print session contents.
* Never print memory contents.
* Never print tokens.
* Do not change permissions automatically.

## Exit criteria

Security posture summary is ready.

---

# Phase 8: Diagnose Common First-run Mistakes

## Skill

Hermes First-run Mistake Diagnosis Skill

## Behavior

Detect common issues:

* Hermes not on PATH
* `hermes doctor` fails
* provider not configured
* wrong model/provider selected
* token missing or expired
* portal/OAuth flow incomplete
* user tried gateway before local chat
* source checkout confused with normal install
* approvals disabled
* YOLO requested
* gateway configured but base chat broken
* cron/skills/MCP added too early
* secrets exposed in logs
* session resume not working

For each issue, provide:

* finding
* severity
* likely cause
* safe next step
* whether another ReAction should handle it

Do not run fixes automatically.

## Exit criteria

Common issue diagnosis is complete.

---

# Phase 9: Final Health Report

## Skill

Hermes Health Report Skill

## Behavior

Return a concise, structured report.

Use:

```md
# Hermes Agent Health Report

Status: healthy | needs_attention | blocked | unknown

## Commands run

- `hermes --version`: pass/fail/not run
- `hermes doctor`: pass/warn/fail/not run
- `hermes model`: pass/warn/fail/not run
- `hermes sessions list`: pass/warn/fail/not run
- `hermes --continue`: pass/warn/fail/not run
- `hermes gateway status`: pass/warn/fail/not run

## Health summary

- Hermes CLI available: yes/no
- Hermes version: <version or unknown>
- Doctor status: pass/warn/fail/unknown
- Provider configured: yes/no/unknown
- Model configured: yes/no/unknown
- Local chat ready: yes/no/unknown
- Session resume checked: yes/no
- Gateway status: not configured/configured/running/stopped/error/unknown

## Findings

| Severity | Finding | Safe next step |
|---|---|---|
| info/warn/error | <finding> | <next step> |

## Security posture

- Secrets printed: no/yes
- Full config printed: no/yes
- `.env` exists: yes/no/unknown
- `config.yaml` exists: yes/no/unknown
- Auth/session files found: yes/no/unknown
- Approvals likely enabled: yes/no/unknown
- YOLO detected: yes/no/unknown
- Gateway tokens exposed: no/yes/unknown

## Recommended next ReAction

- `/ReAction-setup-hermes-first-run` if Hermes is missing or setup is incomplete
- `/ReAction-run-hermes-security-audit` if secrets, approvals, gateway, cron, MCP, or remote backends need deeper review
- `/ReAction-setup-hermes-gateway-safely` only after local chat works
```

## Rules

* Do not include raw secrets.
* Do not include full configs.
* Do not include full session transcripts.
* Do not claim healthy if doctor failed.
* Do not claim gateway readiness is required for local health.
* Keep local CLI/TUI first.
