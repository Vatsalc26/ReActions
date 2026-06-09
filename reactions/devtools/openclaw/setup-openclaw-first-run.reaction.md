---
id: setup-openclaw-first-run
name: Setup OpenClaw First Run
version: 0.1.0
description: Safely guide a first-time OpenClaw setup using environment inspection, install planning, confirmation gates, onboarding, local Gateway verification, dashboard verification, and security reminders.
category: devtools
subcategory: openclaw
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_with_confirmation_gates
supported_project_policy: local_machine_or_openclaw_source_checkout
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_install: true
  requires_confirmation_before_remote_script: true
  requires_confirmation_before_onboarding: true
  requires_confirmation_before_daemon_install: true
  requires_confirmation_before_channel_setup: true
  requires_confirmation_before_remote_access: true
  never_print_secrets: true
  never_print_full_config: true
  never_enable_remote_access_by_default: true
  never_connect_public_channels_by_default: true
  never_reset_without_confirmation: true
---

# ReAction: Setup OpenClaw First Run

## Purpose

Safely guide a first-time OpenClaw user from “not set up yet” to a verified local Gateway and first dashboard chat.

This ReAction is for repeated first-run tasks such as:

- check whether the machine is ready for OpenClaw
- check Node version
- choose a safe install path
- install OpenClaw only after confirmation
- run onboarding only after confirmation
- configure a model provider safely
- configure local Gateway defaults
- optionally install the Gateway daemon
- verify `openclaw gateway status`
- open the local dashboard
- confirm the first chat works
- give first-run security reminders
- produce a final setup report

The default path should be:

```txt
Local Gateway + dashboard first.
No public channels.
No remote exposure.
No broad tool access changes.
No secrets printed.
```

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Official Setup Facts To Follow

Follow current official OpenClaw docs and repo behavior.

Known official first-run path:

1. Install OpenClaw.
2. Run onboarding.
3. Verify Gateway status.
4. Open dashboard.
5. Send first message in the Control UI.

Known official commands include:

```json
{ "command": "node", "args": ["--version"] }
{ "command": "openclaw", "args": ["onboard", "--install-daemon"] }
{ "command": "openclaw", "args": ["gateway", "status"] }
{ "command": "openclaw", "args": ["dashboard"] }
```

Official docs indicate Node 24 is recommended and Node 22.19+ is supported.

Official docs show installer options including remote shell scripts. Those must require explicit confirmation because they execute remote code.

Official repo install path includes:

```json
{ "command": "npm", "args": ["install", "-g", "openclaw@latest"] }
```

or:

```json
{ "command": "pnpm", "args": ["add", "-g", "openclaw@latest"] }
```

Official source checkout behavior:

* OpenClaw source checkouts use `pnpm`.
* The source repo is a pnpm workspace.
* Plain `npm install` at the OpenClaw repo root is not a supported source setup.

If the current directory appears to be an OpenClaw source checkout, do not run `npm install`.

---

# Important Scope

This is a first-run setup ReAction.

It may modify the user’s machine only after explicit confirmation.

Possible changes after confirmation:

* install OpenClaw
* run onboarding
* create/update OpenClaw config
* create/update OpenClaw workspace
* install a per-user daemon/service
* start Gateway
* open dashboard

Do not silently perform any of those changes.

Do not set up Telegram, WhatsApp, Discord, Slack, Signal, iMessage, Matrix, Teams, or other channels by default.

Default first-run verification should use local dashboard chat, not a phone/chat channel.

Do not enable remote access, public bind, Tailscale exposure, reverse proxy, or public dashboard by default.

---

# Security Model

Treat OpenClaw as a powerful local assistant and control plane.

Security assumptions:

* one trusted operator boundary per Gateway
* local-only Gateway by default
* smallest access first
* strict secret handling
* no public channels by default
* no remote exposure by default
* no broad tool changes by default
* channel setup requires separate confirmation
* security audit should be recommended after setup

The agent must repeatedly protect these sensitive files and locations:

```txt
~/.openclaw/openclaw.json
~/.openclaw/credentials/
~/.openclaw/secrets.json
~/.openclaw/agents/
~/.openclaw/workspace/
.env
.env.local
auth profiles
channel tokens
provider API keys
OAuth tokens
Gateway tokens/passwords
```

The agent may report whether these files exist, but must not print their raw contents.

Use redacted summaries only.

---

# Execution Modes

## Plan-only mode

Use this mode when:

* OpenClaw is not installed and the user has not confirmed installation
* Node is missing or unsupported
* the user has not confirmed onboarding
* the user is unsure which setup path to choose
* the agent is running in an environment where install commands are unsafe
* the user asks “how should I set this up?”

Plan-only mode should inspect and report without changing anything.

## Guided setup mode

Use this mode only after explicit confirmation.

Guided setup mode may:

* run a confirmed install command
* verify the `openclaw` CLI
* run `openclaw onboard --install-daemon` after confirmation
* verify Gateway status
* open dashboard
* guide first chat
* recommend next security checks

## Source checkout mode

Use this mode when the current directory appears to be the OpenClaw source repository.

Source checkout mode should:

* detect pnpm workspace
* avoid `npm install` at repo root
* use source setup commands only after confirmation
* prefer official source workflow commands
* make clear that source setup is for development, not normal first-time user install

Do not mix global-user install and source checkout setup unless the user asks.

---

# Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for plan-only mode:

* inspect operating system
* inspect current directory
* run safe version commands
* read files safely
* detect OpenClaw CLI availability
* detect whether current directory is OpenClaw source checkout
* produce final report

Additional capabilities for guided setup mode:

* run terminal commands
* read stdout
* read stderr
* detect command failures
* stop on interactive prompts
* ask confirmation
* open local dashboard if supported
* record phase progress
* redact sensitive output

No browser automation is required by default.

Browser/dashboard opening can be user-mediated:

* the agent may run `openclaw dashboard`
* the user can confirm whether the dashboard opened
* the agent should not claim first chat succeeded unless verified by user or observable output

---

# Cross-platform Rules

This ReAction must work across:

* Windows CMD
* Windows PowerShell
* macOS terminal
* Linux shell

Rules:

* Prefer command execution as command + args, not shell strings.
* Do not rely on Unix-only commands like `cat`, `grep`, `sed`, `awk`, `rm`, `ls`, `tail`, or `date`.
* Do not rely on Windows-only commands like `dir`, `type`, or PowerShell-specific syntax.
* Use file-read/list capability to inspect files.
* Use terminal only for runtime/setup/OpenClaw commands.
* Do not pipe output through OS-specific commands.
* Do not print all environment variables.
* Do not print secrets.

Preferred command representation:

```json
{
  "command": "openclaw",
  "args": ["gateway", "status"]
}
```

Remote shell install commands may be shown as options, but must not run without explicit confirmation.

---

# Allowed Commands Before Confirmation

These are safe inspection commands:

```json
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "pnpm", "args": ["--version"] }
{ "command": "bun", "args": ["--version"] }
{ "command": "openclaw", "args": ["--version"] }
{ "command": "openclaw", "args": ["gateway", "status"] }
```

Run `openclaw gateway status` only if OpenClaw is already installed.

If it fails because OpenClaw is missing, continue with setup planning.

---

# Commands Requiring Explicit Confirmation

Installation commands require confirmation:

```json
{ "command": "npm", "args": ["install", "-g", "openclaw@latest"] }
{ "command": "pnpm", "args": ["add", "-g", "openclaw@latest"] }
```

Onboarding requires confirmation:

```json
{ "command": "openclaw", "args": ["onboard", "--install-daemon"] }
```

Dashboard launch requires confirmation or user approval:

```json
{ "command": "openclaw", "args": ["dashboard"] }
```

Security audit may be suggested and optionally run after setup:

```json
{ "command": "openclaw", "args": ["security", "audit"] }
```

Remote shell installer commands require very explicit confirmation and should be avoided when package-manager install is safer for the environment.

Examples of remote script install commands that must not run without explicit confirmation:

```txt
curl -fsSL https://openclaw.ai/install.sh | bash
iwr -useb https://openclaw.ai/install.ps1 | iex
```

Do not run those as shell strings unless the user explicitly confirms the exact command and understands it executes remote code.

---

# Always Forbidden Without Explicit Confirmation

Do not run:

```json
{ "command": "openclaw", "args": ["onboard", "--reset"] }
{ "command": "openclaw", "args": ["onboard", "--reset-scope", "full"] }
{ "command": "openclaw", "args": ["gateway", "reset"] }
{ "command": "openclaw", "args": ["configure"] }
```

Do not connect channels without confirmation.

Do not approve pairing requests without confirmation.

Do not enable remote exposure without confirmation.

Do not edit OpenClaw config files directly without confirmation and a plan.

Do not print config files.

Do not print secrets.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "plan_only | guided_setup | source_checkout | unknown",
  "environment": {
    "os": "",
    "shell": "",
    "nodeAvailable": false,
    "nodeVersion": "",
    "nodeSupported": false,
    "npmAvailable": false,
    "pnpmAvailable": false,
    "bunAvailable": false,
    "openclawAvailable": false,
    "openclawVersion": ""
  },
  "openclaw_context": {
    "sourceCheckoutDetected": false,
    "globalInstallDetected": false,
    "configExists": false,
    "workspaceExists": false,
    "gatewayStatus": "",
    "dashboardOpened": false,
    "firstChatVerified": false
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
    "filesChangedByOpenClaw": [],
    "verificationResults": [],
    "remainingRisks": []
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand First-run Request

## Skill

OpenClaw First-run Request Parsing Skill

## Detailed skill behavior

The agent should determine whether the user wants a plan, a guided install, a source checkout setup, or help with an already-installed OpenClaw instance.

The user may say:

* “set up OpenClaw”
* “install OpenClaw”
* “first time OpenClaw setup”
* “run OpenClaw onboarding”
* “get OpenClaw running”
* “set up OpenClaw from source”
* “open dashboard”
* “connect Telegram after setup”

The agent should normalize the request into:

* `plan-only`
* `guided-first-run`
* `already-installed-verification`
* `source-checkout-setup`
* `channel-setup-requested`

Default to `plan-only` until install/onboarding confirmation is given.

If the user asks for channel setup during first run, the agent should recommend local dashboard first and defer channel setup to a later ReAction unless the user explicitly wants it.

## Rules

* Default to local Gateway + dashboard first.
* Do not set up channels by default.
* Do not enable remote access by default.
* Do not run install commands without confirmation.
* Do not run onboarding without confirmation.
* Do not print or request secrets in chat unless necessary; prefer prompting the user to enter secrets directly into the official CLI wizard.
* If current environment is unclear, ask for clarification.

## Pause conditions

Pause if:

* user wants install but has not confirmed install method
* user wants remote script install
* user wants channel setup
* user wants remote exposure
* user wants reset
* environment cannot run commands and setup was requested

## Exit criteria

Setup intent and safety scope are clear.

## Phase output

```json
{
  "mode": "plan-only | guided-first-run | already-installed-verification | source-checkout-setup | channel-setup-requested",
  "defaultPath": "local-gateway-dashboard-first",
  "requiresConfirmationBeforeChanges": true
}
```

---

# Phase 2: Inspect Environment

## Skill

OpenClaw Environment Readiness Skill

## Detailed skill behavior

The agent should inspect the machine and runtime prerequisites safely.

Check:

```json
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "pnpm", "args": ["--version"] }
{ "command": "bun", "args": ["--version"] }
{ "command": "openclaw", "args": ["--version"] }
```

The agent should determine:

* operating system
* shell/terminal context if available
* Node availability
* Node version
* whether Node is supported
* npm availability
* pnpm availability
* bun availability
* OpenClaw CLI availability
* whether the current directory looks like OpenClaw source checkout

Node guidance:

* Node 24 is recommended.
* Node 22.19+ is supported.
* Below Node 22.19 should block setup execution until Node is upgraded.

Source checkout detection:

Look for signals such as:

* `pnpm-workspace.yaml`
* OpenClaw repository package names
* `extensions/`
* OpenClaw source files
* OpenClaw repo README
* `pnpm-lock.yaml`

If source checkout is detected, do not run global install commands inside that checkout unless user asks.

## Rules

* Use command + args.
* Continue with plan-only mode if OpenClaw CLI is missing.
* Do not install anything in this phase.
* Do not read secret config content.
* Do not print full environment variables.
* Do not fail just because pnpm or bun is missing unless selected setup path requires it.

## Pause conditions

Pause if:

* Node is missing
* Node version is unsupported
* package manager needed for selected install path is missing
* source checkout is detected but user asked for normal global setup from inside it
* command execution is unavailable

## Exit criteria

Environment readiness is known.

## Phase output

```json
{
  "nodeVersion": "",
  "nodeSupported": true,
  "openclawInstalled": false,
  "openclawVersion": "",
  "sourceCheckoutDetected": false,
  "recommendedInstallPath": ""
}
```

---

# Phase 3: Create Install Plan

## Skill

OpenClaw Install Planning Skill

## Detailed skill behavior

The agent should create a setup plan before installing anything.

Choose install path:

1. Already installed:

   * skip install
   * verify CLI and Gateway

2. Normal first-time user:

   * prefer a package-manager global install when appropriate
   * package-manager install is easier to audit than remote script execution

3. Official install script:

   * present only as an option
   * require explicit confirmation
   * explain it executes remote code

4. Source checkout:

   * use pnpm source workflow
   * do not use plain `npm install` at repo root

Potential install commands:

```json
{ "command": "npm", "args": ["install", "-g", "openclaw@latest"] }
{ "command": "pnpm", "args": ["add", "-g", "openclaw@latest"] }
```

Potential source checkout commands after confirmation:

```json
{ "command": "pnpm", "args": ["install"] }
{ "command": "pnpm", "args": ["openclaw", "setup"] }
```

Potential normal onboarding command after confirmation:

```json
{ "command": "openclaw", "args": ["onboard", "--install-daemon"] }
```

The plan should include:

* selected install path
* required commands
* expected prompts
* what files OpenClaw may create
* what secrets the user must enter directly into the wizard
* confirmation required
* risks

## Rules

* Do not install in this phase.
* Do not run onboarding in this phase.
* Prefer local Gateway + dashboard-first setup.
* Do not recommend public channel setup as part of first-run default.
* Do not recommend remote exposure as part of first-run default.
* If Node unsupported, block install execution and recommend Node upgrade first.
* If source checkout, use pnpm only.

## Exit criteria

Install/setup plan is ready.

## Phase output

```json
{
  "installPath": "already-installed | npm-global | pnpm-global | official-script | source-checkout | blocked",
  "commands": [],
  "riskLevel": "low | medium | high",
  "requiresConfirmation": true
}
```

---

# Phase 4: Confirmation Gate for Install and Onboarding

## Skill

Explicit OpenClaw Setup Confirmation Skill

## Detailed skill behavior

Before installing or onboarding, the agent must ask for explicit confirmation.

The confirmation message should summarize:

* install path
* commands to run
* whether remote script execution is involved
* whether daemon install is included
* whether onboarding will prompt for model provider/API key
* what files may be created under OpenClaw home/state/workspace
* what will not be done by default

Default recommended confirmation:

```txt
Proceed with local first-run setup:
- install OpenClaw using the selected package manager if missing
- run onboarding with daemon install
- keep Gateway local
- do not connect chat channels yet
- do not enable remote access
- verify Gateway and dashboard
```

The agent should offer safe options:

1. Plan only
2. Install CLI only
3. Run onboarding without daemon
4. Run onboarding with daemon
5. Verify existing install
6. Source checkout setup
7. Channel setup later

## Rules

* Do not proceed without explicit confirmation.
* Remote script install requires exact-command confirmation.
* Daemon install requires confirmation.
* Channel setup requires separate confirmation.
* Remote access requires separate confirmation.
* Reset requires separate confirmation.

## Exit criteria

User has confirmed allowed setup scope.

## Phase output

```json
{
  "confirmed": true,
  "allowInstall": true,
  "allowRemoteScript": false,
  "allowOnboarding": true,
  "allowDaemonInstall": true,
  "allowChannelSetup": false,
  "allowRemoteAccess": false,
  "allowReset": false
}
```

---

# Phase 5: Apply Install or Source Setup

## Skill

Controlled OpenClaw Install Execution Skill

## Detailed skill behavior

This phase runs only after confirmation.

If OpenClaw is already installed, skip install and record that it was skipped.

If selected install path is npm-global:

```json
{ "command": "npm", "args": ["install", "-g", "openclaw@latest"] }
```

If selected install path is pnpm-global:

```json
{ "command": "pnpm", "args": ["add", "-g", "openclaw@latest"] }
```

If selected path is source checkout:

```json
{ "command": "pnpm", "args": ["install"] }
{ "command": "pnpm", "args": ["openclaw", "setup"] }
```

Do not run remote script installers unless the user explicitly confirmed the exact remote install command.

After install, verify:

```json
{ "command": "openclaw", "args": ["--version"] }
```

If `openclaw` is still not on PATH, report blocked/incomplete with likely PATH guidance.

## Rules

* Apply only confirmed actions.
* Use command + args where possible.
* Stop on install failure.
* Stop on interactive prompts not expected.
* Do not run `npm install` at OpenClaw source repo root.
* Do not print secrets.
* Record commands run.

## Pause conditions

Pause if:

* install fails
* command not found after install
* source checkout needs pnpm but pnpm missing
* remote script install requested but not exact-confirmed
* install prompts for elevated privileges unexpectedly

## Exit criteria

OpenClaw CLI is installed or setup is safely stopped.

## Phase output

```json
{
  "commandsRun": [],
  "openclawAvailable": true,
  "openclawVersion": "",
  "stoppedEarly": false,
  "stopReason": ""
}
```

---

# Phase 6: Run Onboarding

## Skill

OpenClaw Onboarding Execution Skill

## Detailed skill behavior

This phase runs only after explicit onboarding confirmation.

For normal first-run setup with daemon:

```json
{ "command": "openclaw", "args": ["onboard", "--install-daemon"] }
```

For onboarding without daemon, use:

```json
{ "command": "openclaw", "args": ["onboard"] }
```

The onboarding wizard may ask for:

* model provider
* API key or OAuth/manual auth
* default model
* workspace location
* Gateway mode/port/auth
* channels
* daemon
* skills

The agent should guide the user to:

* prefer local Gateway
* prefer loopback bind
* keep Tailscale/remote exposure off for first run
* enter API keys directly into the official CLI wizard, not into chat
* skip chat channels during first run unless user explicitly wants them
* use strongest trusted modern model available for tool-enabled agents
* keep tool policy strict
* use generated token/auth defaults rather than weak human-chosen secrets

The agent should not capture or repeat secrets.

If the wizard reports invalid config or legacy config and asks to run `openclaw doctor`, pause and report.

If the wizard asks for reset, pause and require explicit confirmation.

## Rules

* Do not run onboarding without confirmation.
* Do not run reset unless confirmed.
* Do not print API keys or tokens.
* Do not enable remote access by default.
* Do not connect channels by default.
* Do not approve pairings by default.
* Do not claim onboarding succeeded unless command exits successfully or user confirms.

## Pause conditions

Pause if:

* wizard requests reset
* wizard asks for secrets and the agent cannot provide secure input path
* user wants channel setup
* user wants remote exposure
* onboarding fails
* onboarding requests unsupported configuration

## Exit criteria

Onboarding completed, skipped, or safely stopped.

## Phase output

```json
{
  "onboardingRun": true,
  "daemonRequested": true,
  "onboardingStatus": "passed | failed | skipped | blocked",
  "notes": []
}
```

---

# Phase 7: Verify Gateway

## Skill

OpenClaw Gateway Verification Skill

## Detailed skill behavior

After onboarding, verify the Gateway.

Run:

```json
{ "command": "openclaw", "args": ["gateway", "status"] }
```

Expected good signs:

* Gateway is running
* Gateway is listening locally
* expected default port is shown when applicable
* no obvious auth/config errors

Do not expose raw tokens from output.

If Gateway is not running, provide next checks:

* whether daemon was installed
* whether onboarding completed
* whether config is valid
* whether port is already in use
* whether `openclaw doctor` is needed
* whether foreground debug mode is appropriate

Foreground debug mode may be suggested but should not be run automatically unless user confirms:

```json
{ "command": "openclaw", "args": ["gateway", "--port", "18789", "--verbose"] }
```

## Rules

* Use command + args.
* Redact sensitive output.
* Do not assume failure reason without evidence.
* Do not start foreground server unless user confirms.
* Do not claim success unless status verifies or user confirms.

## Exit criteria

Gateway status is known.

## Phase output

```json
{
  "gatewayStatusCommandRun": true,
  "gatewayRunning": true,
  "gatewayStatusSummary": "",
  "redactedOutputIncluded": false
}
```

---

# Phase 8: Verify Dashboard and First Chat

## Skill

OpenClaw Dashboard First-chat Verification Skill

## Detailed skill behavior

After Gateway verification, open the dashboard if user confirms:

```json
{ "command": "openclaw", "args": ["dashboard"] }
```

The agent should ask the user to confirm:

* dashboard opened
* Control UI loaded
* user can see chat interface
* user sent a simple first message
* AI replied

The agent should not pretend it saw the dashboard unless browser/tooling confirms it.

If browser automation is available and safe, it may verify local dashboard loading, but it should not interact with private messages or secrets.

Recommended first message:

```txt
Hello OpenClaw. Reply with one sentence confirming the dashboard chat works.
```

If dashboard does not open:

* report likely local Gateway or browser issue
* suggest `openclaw gateway status`
* suggest checking local bind/port
* suggest `openclaw doctor`

## Rules

* Do not open dashboard without confirmation.
* Do not send messages to external channels.
* Do not use connected phone/chat channels by default.
* Do not claim first chat works without observation or user confirmation.
* Do not expose chat history.

## Exit criteria

Dashboard and first chat are verified, skipped, or blocked.

## Phase output

```json
{
  "dashboardCommandRun": true,
  "dashboardOpened": true,
  "firstChatVerified": true,
  "verificationSource": "user-confirmed | observed | skipped"
}
```

---

# Phase 9: First-run Security Checklist

## Skill

OpenClaw First-run Security Baseline Skill

## Detailed skill behavior

The agent should give a first-run security checklist after setup.

Recommend:

* keep Gateway local/loopback for first run
* avoid public exposure until the exposure runbook is reviewed
* use pairing/allowlists for DMs
* keep tools minimal until trust is established
* do not connect personal accounts to shared/team runtimes
* do not share one Gateway across mutually untrusted users
* run `openclaw security audit`
* consider `openclaw security audit --deep` after configuration changes
* keep config/credentials private
* only install trusted skills/plugins

The agent may offer to run:

```json
{ "command": "openclaw", "args": ["security", "audit"] }
```

But should ask confirmation before running it.

Do not run `security audit --fix` without explicit confirmation because it changes config.

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
  "securityAuditSuggested": true,
  "securityAuditRun": false
}
```

---

# Phase 10: Final Report

## Skill

OpenClaw First-run Setup Reporting Skill

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

It must not claim dashboard/first chat success unless verified.

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
# OpenClaw First-run Setup Report

Status: complete | blocked | failed | incomplete_data | plan_only
Mode: plan-only | guided-setup | source-checkout

## Environment

- OS: <value or unavailable>
- Node version: <value or unavailable>
- Node supported: yes/no
- OpenClaw installed before setup: yes/no
- OpenClaw version: <value or unavailable>
- Source checkout detected: yes/no

## Setup plan

- Install path: <already-installed/npm-global/pnpm-global/official-script/source-checkout/blocked>
- Local Gateway first: yes/no
- Dashboard first-chat path: yes/no
- Channel setup deferred: yes/no
- Remote access deferred: yes/no

## Commands run

- `<command>`: passed/failed/skipped
- `<command>`: passed/failed/skipped

## Onboarding

- Onboarding run: yes/no
- Daemon install requested: yes/no
- Secrets entered through official wizard: yes/no/not applicable
- Channels configured: none/deferred/<summary>
- Remote exposure enabled: no/yes

## Verification

- OpenClaw CLI: passed/failed/skipped
- Gateway status: passed/failed/skipped
- Dashboard opened: yes/no/skipped
- First chat verified: yes/no/skipped

## Security checklist

- Gateway kept local by default: yes/no/unknown
- No public channels enabled by default: yes/no
- No remote access enabled by default: yes/no
- Sensitive config redacted: yes
- Security audit recommended: yes/no

## Remaining risks

- <risk or none>
- <risk or none>

## Recommended next steps

- Run `/ReAction-check-openclaw-gateway-health`
- Run `/ReAction-run-openclaw-security-audit`
- Set up a channel only after local dashboard works

## Safety notes

- No secrets were printed.
- Full OpenClaw config was not printed.
- No reset was run without confirmation.
- No channels were connected without confirmation.
- No remote access was enabled without confirmation.
```

Rules:

* Use `plan_only` when no install/onboarding was executed.
* Use `complete` only when setup and verification are acceptable.
* Use `incomplete_data` when setup partly completed but dashboard or first chat was not verified.
* Use `blocked` when prerequisites are missing or confirmation is missing.
* Use `failed` when setup was attempted and failed.
* Keep output concise.

---

# Examples

## Example 1: First-time local setup

User:

> Use /ReAction-setup-openclaw-first-run. Set up OpenClaw for me.

Expected:

* inspect Node and OpenClaw availability
* create plan
* ask confirmation
* install if needed
* run onboarding if confirmed
* verify gateway
* open dashboard if confirmed
* guide first chat
* return final report

## Example 2: OpenClaw already installed

User:

> Use /ReAction-setup-openclaw-first-run. I installed OpenClaw, help me finish first run.

Expected:

* skip install
* verify CLI
* run onboarding if needed and confirmed
* verify gateway/dashboard
* return final report

## Example 3: Node unsupported

User:

> Set up OpenClaw.

Expected:

* inspect Node
* if Node is below supported version, block setup execution
* recommend upgrading Node first
* do not install OpenClaw

## Example 4: User wants Telegram immediately

User:

> Set up OpenClaw and Telegram.

Expected:

* recommend local dashboard first
* explain channel setup needs separate confirmation
* do not configure Telegram by default
* after local setup, suggest a future channel setup ReAction

## Example 5: Source checkout

User:

> I cloned openclaw/openclaw, set it up from source.

Expected:

* detect source checkout
* use pnpm workflow only
* do not run npm install at repo root
* ask before running `pnpm install`
* ask before running source setup commands

# End of ReAction
