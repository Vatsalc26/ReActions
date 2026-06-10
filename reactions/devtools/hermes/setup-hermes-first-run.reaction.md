---
id: setup-hermes-first-run
name: Setup Hermes First Run
version: 0.1.0
description: Safely guide a first-time Hermes Agent setup using environment inspection, install planning, confirmation gates, provider setup, first-chat verification, session verification, and security reminders.
category: devtools
subcategory: hermes
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_with_confirmation_gates
supported_project_policy: local_machine_or_hermes_source_checkout
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_install: true
  requires_confirmation_before_remote_script: true
  requires_confirmation_before_provider_auth: true
  requires_confirmation_before_gateway_setup: true
  requires_confirmation_before_skill_install: true
  requires_confirmation_before_mcp_setup: true
  requires_confirmation_before_cron_setup: true
  never_print_secrets: true
  never_print_full_config: true
  never_enable_yolo_mode: true
  never_disable_approvals: true
  never_connect_messaging_platforms_by_default: true
  never_enable_remote_backends_by_default: true
  never_run_reset_without_confirmation: true
---

# ReAction: Setup Hermes First Run

## Purpose

Safely guide a first-time Hermes Agent user from “not set up yet” to a verified local CLI or TUI chat.

This ReAction is for repeated first-run tasks such as:

- check whether the machine is ready for Hermes Agent
- choose a safe install path
- install Hermes only after confirmation
- run the setup wizard only after confirmation
- configure a model/provider safely
- protect secrets and provider tokens
- verify `hermes doctor`
- verify `hermes` or `hermes --tui` starts
- verify a normal first chat works
- verify session resume works
- give first-run security reminders
- produce a final setup report

The default first-run path should be:

```txt
Local CLI/TUI chat first.
No messaging gateway yet.
No cron yet.
No MCP servers yet.
No skill installs yet.
No YOLO mode.
No approval disabling.
No remote terminal backend yet.
No secrets printed.
```

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Official Setup Facts To Follow

Follow current official Hermes Agent docs and the official NousResearch/hermes-agent repository.

Known first-run path:

1. Install Hermes Agent.
2. Run `hermes setup` or `hermes model`.
3. Choose a provider/model.
4. Run a real first chat with `hermes` or `hermes --tui`.
5. Verify the model/provider responds.
6. Verify sessions can resume with `hermes --continue`.
7. Only then add gateway, cron, skills, MCP servers, voice, or remote backends.

Known commands include:

```json
{ "command": "hermes", "args": ["setup"] }
{ "command": "hermes", "args": ["setup", "--portal"] }
{ "command": "hermes", "args": ["model"] }
{ "command": "hermes", "args": ["doctor"] }
{ "command": "hermes", "args": [] }
{ "command": "hermes", "args": ["--tui"] }
{ "command": "hermes", "args": ["--continue"] }
{ "command": "hermes", "args": ["gateway", "setup"] }
{ "command": "hermes", "args": ["gateway", "status"] }
```

## Provider-neutral First-run Stance

This ReAction should stay provider-neutral by default.

`hermes setup --portal` is a useful fast path for users who want the Nous Portal/OAuth setup experience, but it must not be treated as the only recommended path.

The agent should present setup options neutrally:

```txt
1. `hermes setup` for the standard setup wizard.
2. `hermes model` for bring-your-own provider/model configuration.
3. `hermes setup --portal` for users who explicitly want the Nous Portal quick path.
```

Default success is still:

```txt
A plain local Hermes CLI/TUI chat works reliably.
```

Not:

```txt
Gateway connected.
Tools configured.
Skills installed.
MCP configured.
Cron enabled.
Remote backend enabled.
```

Gateway, tools, skills, MCP, cron, and remote backends should remain follow-up workflows after local chat is verified.

Official install options include:

Linux / macOS / WSL2 / Termux:

```txt
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

Windows PowerShell:

```txt
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

These execute remote scripts and require explicit confirmation.

Hermes stores:

```txt
Secrets and tokens: ~/.hermes/.env
Non-secret config: ~/.hermes/config.yaml
```

Do not print either file in full.

Official docs mention `hermes setup --portal` as a fast path for Nous Portal OAuth/provider setup. Use it only after confirmation.

Official repo contributor setup uses source checkout commands such as:

```json
{ "command": "./setup-hermes.sh", "args": [] }
{ "command": "uv", "args": ["venv", ".venv", "--python", "3.11"] }
{ "command": "uv", "args": ["pip", "install", "-e", ".[all,dev]"] }
```

Source checkout setup is for development, not normal first-time user installation.

---

# Important Scope

This is a first-run setup ReAction.

It may modify the user’s machine only after explicit confirmation.

Possible changes after confirmation:

* run Hermes installer
* create or update `~/.hermes/`
* create or update `~/.hermes/config.yaml`
* create or update `~/.hermes/.env`
* run `hermes setup`
* run `hermes setup --portal`
* run `hermes model`
* authenticate provider/OAuth
* start Hermes CLI/TUI
* verify session resume

Do not silently perform any of those changes.

Do not set up Telegram, Discord, Slack, WhatsApp, Signal, Email, Home Assistant, Microsoft Teams, or other gateway channels by default.

Do not enable scheduled cron tasks by default.

Do not install skills by default.

Do not configure MCP servers by default.

Do not enable Docker, SSH, Modal, Daytona, or other non-local terminal backends by default unless the user asks.

First success means:

```txt
A normal local Hermes CLI/TUI chat works.
```

Not:

```txt
Gateway connected.
Cron configured.
Skills installed.
MCP configured.
```

Those come later.

---

# Security Model

Treat Hermes Agent as a powerful personal AI runtime.

Security assumptions:

* one trusted operator boundary per Hermes profile
* smallest capability first
* local CLI/TUI first
* gateway later
* cron later
* skills later
* MCP later
* remote backends later
* strict secret handling
* approvals remain enabled
* YOLO mode remains disabled
* do not weaken command approval or hardline blocklist behavior

Protect these files and locations:

```txt
~/.hermes/.env
~/.hermes/config.yaml
~/.hermes/auth.json
~/.hermes/skills/
~/.hermes/sessions/
~/.hermes/profiles/
~/.hermes/memory/
~/.hermes/hermes-agent/
.env
.env.local
provider API keys
OAuth tokens
gateway tokens
MCP server tokens
GitHub/Copilot tokens
Claude/OpenAI/OpenRouter/Nous Portal credentials
```

The agent may report whether these files exist, but must not print raw secret values.

Use redacted summaries only.

---

# Execution Modes

## Plan-only mode

Use this mode when:

* Hermes is not installed and the user has not confirmed installation
* the user has not confirmed remote installer execution
* the user has not confirmed provider setup
* the user is unsure which setup path to choose
* the environment cannot safely run install commands
* source checkout is detected
* the user asks “how should I set this up?”

Plan-only mode should inspect and report without changing anything.

## Guided setup mode

Use this mode only after explicit confirmation.

Guided setup mode may:

* run a confirmed install command
* verify `hermes` CLI availability
* run `hermes setup` or `hermes setup --portal`
* run `hermes model`
* run `hermes doctor`
* start `hermes` or `hermes --tui`
* ask the user to verify first chat
* verify `hermes --continue`
* recommend next security checks

## Already installed verification mode

Use this mode when Hermes is already installed.

This mode should:

* verify `hermes --version`
* run `hermes doctor`
* verify model/provider config through `hermes model` if needed
* verify first chat
* verify resume

## Source checkout mode

Use this mode when the current directory appears to be the Hermes Agent source repository.

Source checkout mode should:

* detect repo files like `pyproject.toml`, `setup-hermes.sh`, `hermes_bootstrap.py`, `hermes_cli/`, `agent/`, `tools/`, or `uv.lock`
* avoid global install commands inside the source checkout unless user asks
* use official developer setup commands only after confirmation
* make clear that source setup is for development, not normal first-time user install

---

# Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for plan-only mode:

* inspect operating system
* inspect current directory
* run safe version commands
* read files safely
* detect Hermes CLI availability
* detect source checkout
* produce final report

Additional capabilities for guided setup mode:

* run terminal commands
* read stdout
* read stderr
* detect command failures
* stop on interactive prompts
* ask confirmation
* guide user through provider auth
* redact sensitive output
* record phase progress

No browser automation is required by default.

Provider OAuth may open browser/device-code flows. The agent should guide the user to complete those flows directly in the official CLI/browser and should not ask the user to paste secrets into chat.

---

# Cross-platform Rules

This ReAction must work across:

* Windows CMD
* Windows PowerShell
* macOS terminal
* Linux shell
* WSL2
* Termux, when supported by official docs

Rules:

* Prefer command execution as command + args, not shell strings.
* Do not rely on Unix-only commands like `cat`, `grep`, `sed`, `awk`, `rm`, `ls`, `tail`, or `date`.
* Do not rely on Windows-only commands like `dir`, `type`, or PowerShell-specific syntax.
* Use file-read/list capability to inspect files.
* Use terminal only for runtime/setup/Hermes commands.
* Do not pipe output through OS-specific commands.
* Do not print all environment variables.
* Do not print secrets.

Preferred command representation:

```json
{
  "command": "hermes",
  "args": ["doctor"]
}
```

Remote shell install commands may be shown as options, but must not run without explicit confirmation.

---

# Allowed Commands Before Confirmation

These are safe inspection commands:

```json
{ "command": "git", "args": ["--version"] }
{ "command": "python", "args": ["--version"] }
{ "command": "python3", "args": ["--version"] }
{ "command": "uv", "args": ["--version"] }
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "pnpm", "args": ["--version"] }
{ "command": "hermes", "args": ["--version"] }
{ "command": "hermes", "args": ["doctor"] }
```

Run `hermes doctor` only if Hermes is already installed.

If `hermes` is missing, continue with setup planning.

---

# Commands Requiring Explicit Confirmation

Installation commands require confirmation.

Remote script installer examples:

```txt
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

Do not run these without exact confirmation because they execute remote code.

Setup/provider commands require confirmation:

```json
{ "command": "hermes", "args": ["setup"] }
{ "command": "hermes", "args": ["setup", "--portal"] }
{ "command": "hermes", "args": ["model"] }
```

Gateway setup requires separate confirmation:

```json
{ "command": "hermes", "args": ["gateway", "setup"] }
```

Skills setup requires separate confirmation:

```json
{ "command": "hermes", "args": ["skills", "browse"] }
{ "command": "hermes", "args": ["skills", "install", "<source/path>"] }
```

MCP setup requires separate confirmation.

Cron setup requires separate confirmation.

---

# Always Forbidden Without Explicit Confirmation

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

Do not disable dangerous command approval.

Do not disable destructive slash confirmations.

Do not connect gateways without confirmation.

Do not install skills without confirmation.

Do not configure MCP servers without confirmation.

Do not add cron tasks without confirmation.

Do not expose tokens.

Do not print full config.

Do not run reset/clear/delete session commands without confirmation.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "plan_only | guided_setup | already_installed_verification | source_checkout | unknown",
  "environment": {
    "os": "",
    "shell": "",
    "gitAvailable": false,
    "pythonAvailable": false,
    "pythonVersion": "",
    "uvAvailable": false,
    "nodeAvailable": false,
    "nodeVersion": "",
    "npmAvailable": false,
    "pnpmAvailable": false,
    "hermesAvailable": false,
    "hermesVersion": ""
  },
  "hermes_context": {
    "sourceCheckoutDetected": false,
    "globalInstallDetected": false,
    "configExists": false,
    "envExists": false,
    "providerConfigured": false,
    "doctorStatus": "",
    "firstChatVerified": false,
    "sessionResumeVerified": false
  },
  "setup_plan": {
    "recommended": false,
    "riskLevel": "low | medium | high",
    "installPath": "",
    "commands": [],
    "confirmationRequired": true,
    "securityNotes": []
  },
  "setup_result": {
    "commandsRun": [],
    "filesChangedByHermes": [],
    "verificationResults": [],
    "remainingRisks": []
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand First-run Request

## Skill

Hermes First-run Request Parsing Skill

## Detailed skill behavior

The agent should determine whether the user wants a plan, a guided install, a source checkout setup, provider configuration, or help with an already-installed Hermes instance.

The user may say:

* “set up Hermes”
* “install Hermes Agent”
* “first time Hermes setup”
* “run Hermes setup”
* “get Hermes running”
* “configure Hermes provider”
* “run Hermes with Nous Portal”
* “set up Hermes from source”
* “connect Telegram after setup”

The agent should normalize the request into:

* `plan-only`
* `guided-first-run`
* `already-installed-verification`
* `source-checkout-setup`
* `provider-setup-requested`
* `gateway-setup-requested`

Default to `plan-only` until install/setup/provider confirmation is given.

If the user asks for gateway setup during first run, recommend local CLI/TUI chat first and defer gateway setup to a later ReAction unless the user explicitly confirms gateway setup.

## Rules

* Default to local CLI/TUI first.
* Do not set up messaging gateways by default.
* Do not enable cron by default.
* Do not install skills by default.
* Do not configure MCP servers by default.
* Do not enable remote backends by default.
* Do not run install commands without confirmation.
* Do not run provider auth/setup without confirmation.
* Do not print or request secrets in chat unless necessary; prefer prompting the user to enter secrets directly into Hermes CLI/OAuth flows.
* If current environment is unclear, ask for clarification.

## Pause conditions

Pause if:

* user wants install but has not confirmed install method
* user wants remote script install
* user wants gateway setup
* user wants cron setup
* user wants YOLO mode
* user wants approval prompts disabled
* user wants reset/delete/clear
* environment cannot run commands and setup was requested

## Exit criteria

Setup intent and safety scope are clear.

## Phase output

```json
{
  "mode": "plan-only | guided-first-run | already-installed-verification | source-checkout-setup | provider-setup-requested | gateway-setup-requested",
  "defaultPath": "local-cli-tui-first",
  "requiresConfirmationBeforeChanges": true
}
```

---

# Phase 2: Inspect Environment

## Skill

Hermes Environment Readiness Skill

## Detailed skill behavior

The agent should inspect the machine and prerequisites safely.

Check available runtimes/tools:

```json
{ "command": "git", "args": ["--version"] }
{ "command": "python", "args": ["--version"] }
{ "command": "python3", "args": ["--version"] }
{ "command": "uv", "args": ["--version"] }
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "pnpm", "args": ["--version"] }
{ "command": "hermes", "args": ["--version"] }
```

The agent should determine:

* operating system
* shell/terminal context if available
* Git availability
* Python availability
* uv availability
* Node availability
* npm availability
* pnpm availability
* Hermes CLI availability
* whether the current directory looks like Hermes Agent source checkout

Source checkout detection:

Look for signals such as:

* `pyproject.toml`
* `uv.lock`
* `setup-hermes.sh`
* `hermes_bootstrap.py`
* `hermes_cli/`
* `agent/`
* `tools/`
* `gateway/`
* `README.md` mentioning Hermes Agent

If source checkout is detected, do not run global installer commands inside the checkout unless user asks.

## Rules

* Use command + args.
* Continue with plan-only mode if Hermes CLI is missing.
* Do not install anything in this phase.
* Do not read secret config content.
* Do not print environment variables.
* Do not fail just because optional tooling is missing.
* Missing Git matters for script installer/source checkout.
* Missing Hermes means setup planning should continue.

## Pause conditions

Pause if:

* Git is missing and selected install path requires it
* source checkout is detected but user asked for normal global setup from inside it
* command execution is unavailable
* OS/platform is unsupported or unclear

## Exit criteria

Environment readiness is known.

## Phase output

```json
{
  "gitAvailable": true,
  "pythonVersion": "",
  "uvAvailable": true,
  "nodeVersion": "",
  "hermesInstalled": false,
  "hermesVersion": "",
  "sourceCheckoutDetected": false,
  "recommendedInstallPath": ""
}
```

---

# Phase 3: Create Install and Provider Plan

## Skill

Hermes Install and Provider Planning Skill

## Detailed skill behavior

The agent should create a setup plan before installing or configuring anything.

Choose setup path:

1. Already installed:

   * skip install
   * verify CLI
   * run `hermes doctor`
   * configure provider if needed

2. Normal first-time user:

   * recommend official Desktop installer on macOS/Windows when appropriate
   * otherwise present official CLI installer options
   * remote script install requires explicit confirmation

3. Nous Portal first-run:

   * `hermes setup --portal`
   * use only after confirmation
   * useful for users who want the Nous Portal/OAuth quick path
   * not required for provider-neutral first-run success

4. Bring-your-own provider:

   * `hermes model`
   * user enters provider keys/OAuth directly into Hermes flow
   * do not ask user to paste secrets into chat
   * keep this path equally valid with portal setup

5. Source checkout:

   * use official developer setup
   * `./setup-hermes.sh` path after confirmation
   * manual uv path after confirmation
   * make clear it is for development

Potential install commands:

Linux/macOS/WSL2/Termux remote installer:

```txt
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

Windows PowerShell remote installer:

```txt
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

Potential setup commands after install:

```json
{ "command": "hermes", "args": ["setup"] }
{ "command": "hermes", "args": ["setup", "--portal"] }
{ "command": "hermes", "args": ["model"] }
{ "command": "hermes", "args": ["doctor"] }
```

The plan should include:

* selected install path
* provider setup path
* expected prompts
* what files Hermes may create
* what secrets the user must enter directly into official Hermes/OAuth flow
* confirmation required
* security notes

## Rules

* Do not install in this phase.
* Do not run setup/model wizard in this phase.
* Prefer local CLI/TUI first.
* Do not recommend messaging gateway as first success path.
* Do not recommend cron as first success path.
* Do not recommend skills or MCP until base chat works.
* If source checkout, use official developer setup path.

## Exit criteria

Install/provider/setup plan is ready.

## Phase output

```json
{
  "installPath": "already-installed | desktop-installer | linux-macos-wsl-script | windows-powershell-script | source-checkout | blocked",
  "providerPath": "nous-portal | hermes-model | existing-provider | custom-endpoint | blocked",
  "commands": [],
  "riskLevel": "low | medium | high",
  "requiresConfirmation": true
}
```

---

# Phase 4: Confirmation Gate for Install and Provider Setup

## Skill

Explicit Hermes Setup Confirmation Skill

## Detailed skill behavior

Before installing or running setup/provider commands, the agent must ask for explicit confirmation.

The confirmation message should summarize:

* install path
* exact commands to run
* whether remote script execution is involved
* whether `hermes setup`, `hermes setup --portal`, or `hermes model` will be run
* what files may be created under `~/.hermes`
* what secrets the user should enter only into official Hermes/OAuth flow
* what will not be done by default

Default recommended confirmation:

```txt
Proceed with local first-run setup:
- install Hermes using the selected official path if missing
- configure provider using `hermes setup` or `hermes model`
- keep approval prompts enabled
- do not enable YOLO mode
- do not connect messaging gateways yet
- do not configure cron yet
- do not install skills yet
- verify first local chat
```

The agent should offer safe options:

1. Plan only
2. Install CLI only
3. Run `hermes setup`
4. Run `hermes setup --portal`
5. Run `hermes model`
6. Verify existing install
7. Source checkout setup
8. Gateway setup later

## Rules

* Do not proceed without explicit confirmation.
* Remote script install requires exact-command confirmation.
* Provider setup requires confirmation.
* Gateway setup requires separate confirmation.
* Cron setup requires separate confirmation.
* Skills setup requires separate confirmation.
* MCP setup requires separate confirmation.
* Reset/clear/delete requires separate confirmation.

## Exit criteria

User has confirmed allowed setup scope.

## Phase output

```json
{
  "confirmed": true,
  "allowInstall": true,
  "allowRemoteScript": true,
  "allowProviderSetup": true,
  "allowPortalSetup": false,
  "allowGatewaySetup": false,
  "allowCronSetup": false,
  "allowSkillInstall": false,
  "allowMcpSetup": false,
  "allowYolo": false,
  "allowDisableApprovals": false
}
```

---

# Phase 5: Apply Install or Source Setup

## Skill

Controlled Hermes Install Execution Skill

## Detailed skill behavior

This phase runs only after confirmation.

If Hermes is already installed, skip install and record that it was skipped.

For Linux/macOS/WSL2/Termux official remote installer, run only after exact confirmation:

```txt
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

For Windows PowerShell official remote installer, run only after exact confirmation:

```txt
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

For source checkout setup after confirmation:

```json
{ "command": "./setup-hermes.sh", "args": [] }
```

or manual developer path after confirmation:

```json
{ "command": "uv", "args": ["venv", ".venv", "--python", "3.11"] }
{ "command": "uv", "args": ["pip", "install", "-e", ".[all,dev]"] }
```

After install, verify:

```json
{ "command": "hermes", "args": ["--version"] }
```

If `hermes` is still not on PATH, report blocked/incomplete with likely PATH guidance.

## Rules

* Apply only confirmed actions.
* Use command + args where possible.
* Stop on install failure.
* Stop on unexpected prompts.
* Do not run source setup unless source checkout setup is selected.
* Do not print secrets.
* Record commands run.

## Pause conditions

Pause if:

* install fails
* command not found after install
* source checkout setup requires uv but uv missing
* remote script install requested but not exact-confirmed
* install prompts for elevated privileges unexpectedly

## Exit criteria

Hermes CLI is installed or setup is safely stopped.

## Phase output

```json
{
  "commandsRun": [],
  "hermesAvailable": true,
  "hermesVersion": "",
  "stoppedEarly": false,
  "stopReason": ""
}
```

---

# Phase 6: Configure Provider

## Skill

Hermes Provider Configuration Skill

## Detailed skill behavior

This phase runs only after explicit provider setup confirmation.

Use one of:

```json
{ "command": "hermes", "args": ["setup"] }
{ "command": "hermes", "args": ["setup", "--portal"] }
{ "command": "hermes", "args": ["model"] }
```

Provider setup may ask for:

* OAuth login
* device code flow
* API key
* custom endpoint URL
* model name
* context length
* auxiliary model settings
* tool gateway choices

The agent should guide the user to:

* choose one provider first
* avoid complex routing/fallback until base chat works
* enter secrets only into the official CLI/browser/OAuth flow
* avoid pasting API keys into chat
* verify the selected model meets Hermes requirements
* keep config minimal until chat works

Do not capture or repeat secrets.

If the provider command fails, recommend:

```json
{ "command": "hermes", "args": ["doctor"] }
{ "command": "hermes", "args": ["model"] }
```

## Rules

* Do not run provider setup without confirmation.
* Do not print API keys or tokens.
* Do not print `~/.hermes/.env`.
* Do not print full `~/.hermes/config.yaml`.
* Do not configure multiple providers/fallback chains by default.
* Do not enable tool gateway extras unless the user chose that path.

## Pause conditions

Pause if:

* provider flow requests a secret and there is no secure input path
* OAuth/device login requires user action
* selected provider lacks a usable model
* setup command fails
* custom endpoint verification fails

## Exit criteria

Provider is configured or setup is safely stopped.

## Phase output

```json
{
  "providerSetupRun": true,
  "providerStatus": "configured | failed | skipped | blocked",
  "notes": []
}
```

---

# Phase 7: Run Doctor

## Skill

Hermes Doctor Verification Skill

## Detailed skill behavior

Run:

```json
{ "command": "hermes", "args": ["doctor"] }
```

The agent should summarize:

* environment OK
* config OK
* provider/auth OK
* missing dependencies
* path issues
* browser/tool dependency issues
* gateway issues, if shown
* warnings vs blockers

Do not include secrets from output.

If doctor flags missing config:

* recommend `hermes model`
* recommend `hermes setup`
* do not manually edit config unless user asks

If doctor flags path issue:

* recommend reload shell or fix PATH
* do not modify shell profile without confirmation

## Rules

* Redact sensitive output.
* Do not claim setup complete if doctor has blocking errors.
* Distinguish warnings from blockers.
* Do not run destructive fixes automatically.

## Exit criteria

Doctor result is known.

## Phase output

```json
{
  "doctorRun": true,
  "doctorStatus": "passed | warnings | failed | skipped",
  "blockers": [],
  "warnings": []
}
```

---

# Phase 8: Verify First Chat

## Skill

Hermes First-chat Verification Skill

## Detailed skill behavior

After install/provider setup/doctor, verify a normal local chat.

Preferred command:

```json
{ "command": "hermes", "args": ["--tui"] }
```

Fallback:

```json
{ "command": "hermes", "args": [] }
```

The agent should ask the user to send a simple, verifiable first prompt:

```txt
Reply with one sentence confirming Hermes is working.
```

or:

```txt
Summarize the current directory in three bullets.
```

The agent should verify:

* Hermes starts
* banner shows model/provider
* user can send message
* Hermes replies without provider/auth error
* tool use is not required for basic success
* conversation continues for at least one turn

The agent must not claim first chat succeeded unless observed or user-confirmed.

## Rules

* Do not enable YOLO.
* Do not configure gateway.
* Do not configure cron.
* Do not install skills.
* Do not change tools unless user asks.
* Do not send private data in first prompt.
* Do not claim success without verification.

## Pause conditions

Pause if:

* Hermes exits with provider/auth error
* first chat never receives response
* CLI/TUI fails to start
* terminal is non-interactive
* user cannot complete OAuth/provider flow

## Exit criteria

First chat is verified, skipped, or blocked.

## Phase output

```json
{
  "firstChatAttempted": true,
  "firstChatVerified": true,
  "verificationSource": "user-confirmed | observed | skipped",
  "notes": []
}
```

---

# Phase 9: Verify Session Resume

## Skill

Hermes Session Persistence Verification Skill

## Detailed skill behavior

After first chat works, verify session resume if possible.

Run:

```json
{ "command": "hermes", "args": ["--continue"] }
```

or note that `hermes -c` is equivalent when appropriate.

The agent should verify:

* recent session is found
* session resumes
* no profile mismatch
* no session storage error

If resume fails, suggest:

```json
{ "command": "hermes", "args": ["sessions", "list"] }
```

only if available and safe.

Do not read or print session contents.

## Rules

* Do not print session logs.
* Do not expose private conversation content.
* Do not delete/reset sessions.
* Do not run destructive slash commands.
* If no session exists, report skipped/incomplete instead of failure.

## Exit criteria

Session resume is verified, skipped, or blocked.

## Phase output

```json
{
  "sessionResumeAttempted": true,
  "sessionResumeVerified": true,
  "notes": []
}
```

---

# Phase 10: First-run Security Checklist

## Skill

Hermes First-run Security Baseline Skill

## Detailed skill behavior

The agent should give a first-run security checklist after setup.

Recommend:

* keep approvals enabled
* do not use `--yolo` for first-run setup
* do not set `approvals.mode: off`
* keep cron headless approvals denied by default
* keep destructive slash confirmations enabled
* use local CLI/TUI before gateway
* configure gateway only after local chat works
* configure tools intentionally with `hermes tools`
* use Docker/remote isolation only when understood
* add MCP servers only after reviewing their env/secrets
* install skills only from trusted sources
* avoid printing `~/.hermes/.env`
* avoid sharing `~/.hermes/config.yaml` without redaction
* run `hermes doctor` after changes

The agent may suggest future ReActions:

```txt
/ReAction-check-hermes-agent-health
/ReAction-run-hermes-security-audit
/ReAction-setup-hermes-gateway-safely
/ReAction-setup-hermes-skills-safely
```

## Rules

* Do not run fix commands automatically.
* Do not print config.
* Do not print credentials.
* Keep checklist practical.
* Clearly separate completed checks from recommended next checks.

## Exit criteria

Security checklist is reported.

## Phase output

```json
{
  "securityChecklistProvided": true,
  "nextReactionsSuggested": true
}
```

---

# Phase 11: Final Report

## Skill

Hermes First-run Setup Reporting Skill

## Detailed skill behavior

The final report should clearly distinguish:

* planned setup
* completed setup
* skipped actions
* commands run
* verification results
* remaining risks
* next ReActions to run

It must not include secrets.

It must not include full config.

It must not claim first chat/session success unless verified.

## Status values

```txt
complete
blocked
failed
incomplete_data
plan_only
```

## Final report format

```md
# Hermes First-run Setup Report

Status: complete | blocked | failed | incomplete_data | plan_only
Mode: plan-only | guided-setup | already-installed-verification | source-checkout

## Environment

- OS: <value or unavailable>
- Git available: yes/no
- Python version: <value or unavailable>
- uv available: yes/no
- Node version: <value or unavailable>
- Hermes installed before setup: yes/no
- Hermes version: <value or unavailable>
- Source checkout detected: yes/no

## Setup plan

- Install path: <already-installed/desktop-installer/linux-macos-wsl-script/windows-powershell-script/source-checkout/blocked>
- Provider setup path: <nous-portal/hermes-model/existing-provider/custom-endpoint/blocked>
- Local CLI/TUI first: yes/no
- Gateway setup deferred: yes/no
- Cron setup deferred: yes/no
- Skills setup deferred: yes/no
- MCP setup deferred: yes/no

## Commands run

- `<command>`: passed/failed/skipped
- `<command>`: passed/failed/skipped

## Provider/configuration

- Provider setup run: yes/no
- Provider configured: yes/no/unknown
- Secrets entered through official Hermes/OAuth flow: yes/no/not applicable
- Secrets printed in report: no

## Verification

- Hermes CLI: passed/failed/skipped
- `hermes doctor`: passed/warnings/failed/skipped
- First chat: passed/failed/skipped
- Session resume: passed/failed/skipped

## Security checklist

- Approval prompts kept enabled: yes/no/unknown
- YOLO mode avoided: yes/no
- Gateway deferred by default: yes/no
- Cron deferred by default: yes/no
- Skills deferred by default: yes/no
- MCP deferred by default: yes/no
- Sensitive config redacted: yes

## Remaining risks

- <risk or none>
- <risk or none>

## Recommended next steps

- Run `/ReAction-check-hermes-agent-health`
- Run `/ReAction-run-hermes-security-audit`
- Set up gateway only after local chat works

## Safety notes

- No secrets were printed.
- Full Hermes config was not printed.
- YOLO mode was not enabled.
- Approval prompts were not disabled.
- No gateway was configured without confirmation.
- No cron jobs were configured without confirmation.
- No skills were installed without confirmation.
- No MCP servers were configured without confirmation.
```

Rules:

* Use `plan_only` when no install/provider setup was executed.
* Use `complete` only when setup and verification are acceptable.
* Use `incomplete_data` when setup partly completed but first chat/session was not verified.
* Use `blocked` when prerequisites or confirmation are missing.
* Use `failed` when setup was attempted and failed.
* Keep output concise.

Recommended follow-up after first successful local chat:

```txt
/ReAction-check-hermes-agent-health
```

Use the health-check ReAction for `hermes doctor`, provider/model verification, session checks, gateway status checks, and redacted config/security review.

Do not expand first-run setup into a full health/audit workflow.

---

# Examples

## Example 1: First-time local setup

User:

> Use /ReAction-setup-hermes-first-run. Set up Hermes Agent for me.

Expected:

* inspect environment
* create plan
* ask confirmation
* install if confirmed
* run provider setup if confirmed
* run doctor
* verify first chat
* verify resume
* return final report

## Example 2: Hermes already installed

User:

> Use /ReAction-setup-hermes-first-run. I installed Hermes, help me finish setup.

Expected:

* skip install
* verify CLI
* run `hermes doctor`
* run `hermes model` or `hermes setup` if needed and confirmed
* verify first chat
* return final report

## Example 3: User wants gateway immediately

User:

> Set up Hermes Agent and Telegram.

Expected:

* recommend local CLI/TUI first
* explain gateway setup needs separate confirmation
* do not configure Telegram by default
* after local setup, suggest a future gateway ReAction

## Example 4: User wants YOLO

User:

> Set up Hermes and turn on YOLO mode.

Expected:

* refuse to enable YOLO as part of first-run setup
* explain first-run setup keeps approvals enabled
* proceed with safe setup only if user accepts

## Example 5: Source checkout

User:

> I cloned NousResearch/hermes-agent, set it up from source.

Expected:

* detect source checkout
* use official developer setup path
* ask before running `./setup-hermes.sh`
* do not run remote installer inside the repo
* do not treat source checkout setup as normal user install

# End of ReAction
