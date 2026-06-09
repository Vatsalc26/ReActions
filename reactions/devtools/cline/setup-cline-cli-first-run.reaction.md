---
id: setup-cline-cli-first-run
name: Setup Cline CLI First Run
version: 0.1.0
description: Safely guide a first-time Cline CLI setup using environment inspection, install planning, confirmation gates, authentication, TUI verification, first-task verification, and security reminders.
category: devtools
subcategory: cline
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_with_confirmation_gates
supported_project_policy: local_machine_or_cline_source_checkout
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_install: true
  requires_confirmation_before_auth: true
  requires_confirmation_before_provider_setup: true
  requires_confirmation_before_first_task: true
  requires_confirmation_before_project_config_changes: true
  requires_confirmation_before_mcp_setup: true
  requires_confirmation_before_hook_setup: true
  requires_confirmation_before_plugin_setup: true
  requires_confirmation_before_skill_install: true
  requires_confirmation_before_cron_setup: true
  never_print_secrets: true
  never_print_full_config: true
  never_enable_auto_approve_all_by_default: true
  never_run_headless_by_default: true
  never_configure_mcp_by_default: true
  never_configure_hooks_by_default: true
  never_configure_plugins_by_default: true
  never_install_skills_by_default: true
  never_configure_cron_by_default: true
---

# ReAction: Setup Cline CLI First Run

## Purpose

Safely guide a first-time Cline CLI user from “not set up yet” to a verified interactive Cline terminal session.

This ReAction is for repeated first-run tasks such as:

- check whether the machine is ready for Cline CLI
- check Node.js and npm
- install Cline CLI only after confirmation
- run `cline auth` only after confirmation
- launch Cline TUI
- verify account/provider/model configuration
- run one safe first task
- keep auto-approve all off by default
- explain where Cline stores global and project configuration
- give first-run security reminders
- produce a final setup report

Default first-run recommendation:

```txt
Interactive Cline TUI first.
Plan/Act review enabled.
Auto-approve all off.
No MCP servers yet.
No hooks yet.
No plugins yet.
No skills yet.
No cron/scheduling yet.
No headless automation yet.
No secrets printed.
```

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Official Setup Facts To Follow

Follow current official Cline docs and the official cline/cline repository.

Known Cline install facts:

* Cline is available as an IDE extension, CLI, SDK, and Kanban workflow.
* This ReAction focuses on the CLI path.
* Cline CLI is for terminal workflows, both interactive and automation.
* Node.js 20+ is required for CLI setup.
* Node.js 22 is recommended.
* CLI install command:

```json
{ "command": "npm", "args": ["install", "-g", "cline"] }
```

* Authentication command:

```json
{ "command": "cline", "args": ["auth"] }
```

* Interactive run command:

```json
{ "command": "cline", "args": [] }
```

* Explicit TUI mode:

```json
{ "command": "cline", "args": ["-i"] }
```

* Task command:

```json
{ "command": "cline", "args": ["your task"] }
```

Known TUI facts:

* `cline` launches the interactive terminal UI.
* `cline -i` explicitly launches TUI mode.
* `Tab` toggles Plan/Act mode.
* `Shift+Tab` toggles auto-approve all.
* `/settings`, `/model`, `/account`, `/mcp`, `/compact`, `/undo`, `/clear`, `/history`, `/help`, and `/quit` are available TUI commands.
* TUI is appropriate when the user wants collaboration and approvals.
* Headless mode is for automation and should not be the first-run default.

Known config facts:

* Global Cline config lives under `~/.cline/`.
* Project config lives under `.cline/` at the repository root.
* Provider/API configuration can live under `~/.cline/data/settings/providers.json`.
* Global settings can live under `~/.cline/data/settings/global-settings.json`.
* MCP settings can live under `~/.cline/data/settings/cline_mcp_settings.json`.
* Global sessions can live under `~/.cline/data/sessions/`.
* Rules, hooks, skills, agents, plugins, and cron can exist globally under `~/.cline/`.
* Project-level rules, hooks, skills, agents, plugins, and cron can exist under `.cline/`.
* Secrets must never be committed.
* Hooks and plugins can execute code and must be reviewed like executable artifacts.

---

# Important Scope

This is a first-run setup ReAction.

It may modify the user’s machine only after explicit confirmation.

Possible changes after confirmation:

* install Cline CLI globally
* run Cline auth flow
* create or update `~/.cline/`
* create or update provider settings
* create Cline session data
* run a first safe task in a selected workspace

Do not silently perform any of those changes.

Do not configure MCP servers by default.

Do not configure hooks by default.

Do not configure plugins by default.

Do not install skills by default.

Do not configure cron/scheduling by default.

Do not configure agent teams/subagents by default.

Do not run headless automation by default.

Do not create project `.cline/` files by default unless the user explicitly asks.

First success means:

```txt
Cline CLI/TUI launches, account/provider/model setup is verified, and one safe first interaction works.
```

Not:

```txt
MCP configured.
Hooks installed.
Plugins installed.
Skills installed.
Cron configured.
Auto-approve enabled.
Headless automation working.
```

Those come later.

---

# Security Model

Treat Cline CLI as a powerful coding-agent runtime.

Security assumptions:

* local interactive TUI first
* smallest workspace first
* explicit account/provider setup
* approval review remains enabled
* auto-approve all remains off
* no MCP by default
* no hooks by default
* no plugins by default
* no skills by default
* no cron by default
* no headless automation by default
* no full config printing
* no secret printing

Protect these files and locations:

```txt
~/.cline/
~/.cline/data/settings/providers.json
~/.cline/data/settings/global-settings.json
~/.cline/data/settings/cline_mcp_settings.json
~/.cline/data/sessions/
~/.cline/data/db/
~/.cline/data/workflows/
~/.cline/rules/
~/.cline/hooks/
~/.cline/skills/
~/.cline/agents/
~/.cline/plugins/
~/.cline/cron/
~/Documents/Cline/
.cline/
.env
.env.local
provider API keys
Cline account tokens
MCP server tokens
GitHub tokens
cloud provider credentials
```

The agent may report whether these files exist, but must not print raw contents.

Use redacted summaries only.

---

# Execution Modes

## Plan-only mode

Use this mode when:

* Cline CLI is not installed and the user has not confirmed installation
* Node.js is missing
* Node.js version is below 20
* npm is missing
* user has not confirmed auth
* user has not confirmed first task
* source checkout is detected
* user asks “how should I set this up?”

Plan-only mode should inspect and report without changing anything.

## Guided CLI setup mode

Use this mode only after explicit confirmation.

Guided setup mode may:

* run confirmed install command
* verify Cline CLI availability
* run `cline auth`
* launch `cline` or `cline -i`
* guide provider/account/model verification
* run one safe first task only after confirmation
* return report

## Already installed verification mode

Use this mode when Cline CLI is already installed.

This mode should:

* verify `cline --version` if supported
* verify `cline auth` state or account state through official CLI/TUI flow
* launch TUI
* verify account/provider/model
* run a first safe interaction after confirmation

## Source checkout mode

Use this mode when the current directory appears to be the Cline source repository.

Source checkout mode should:

* detect repo files such as `package.json`, `pnpm-lock.yaml`, `turbo.json`, `packages/`, `apps/`, or repository README mentioning Cline
* avoid global install commands inside the checkout unless user asks
* use official contributor setup only after confirmation
* make clear that source setup is for development, not normal first-time CLI use

---

# Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for plan-only mode:

* inspect operating system
* inspect current directory
* run safe version commands
* detect Node.js availability
* detect npm availability
* detect Cline CLI availability
* detect source checkout
* read files safely
* produce final report

Additional capabilities for guided setup mode:

* run terminal commands
* read stdout
* read stderr
* detect command failures
* stop on interactive prompts
* ask confirmation
* guide user through auth/provider setup
* redact sensitive output
* record phase progress

No browser automation is required by default.

Auth may open browser/device-code flows. The agent should guide the user to complete those flows directly in the official Cline CLI/browser flow and should not ask the user to paste secrets into chat.

---

# Cross-platform Rules

This ReAction must work across:

* Windows CMD
* Windows PowerShell
* macOS terminal
* Linux shell
* WSL2

Rules:

* Prefer command execution as command + args, not shell strings.
* Do not rely on Unix-only commands like `cat`, `grep`, `sed`, `awk`, `rm`, `ls`, `tail`, or `date`.
* Do not rely on Windows-only commands like `dir`, `type`, or PowerShell-specific syntax.
* Use file-read/list capability to inspect files.
* Use terminal only for runtime/setup/Cline commands.
* Do not pipe output through OS-specific commands.
* Do not print all environment variables.
* Do not print secrets.

Preferred command representation:

```json
{
  "command": "cline",
  "args": ["-i"]
}
```

---

# Allowed Commands Before Confirmation

These are safe inspection commands:

```json
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "cline", "args": ["--version"] }
{ "command": "cline", "args": ["--help"] }
```

Run Cline inspection commands only if Cline is already installed.

If `cline` is missing, continue with setup planning.

---

# Commands Requiring Explicit Confirmation

Installation requires confirmation:

```json
{ "command": "npm", "args": ["install", "-g", "cline"] }
```

Authentication requires confirmation:

```json
{ "command": "cline", "args": ["auth"] }
```

Interactive TUI launch requires confirmation:

```json
{ "command": "cline", "args": [] }
```

or:

```json
{ "command": "cline", "args": ["-i"] }
```

First task requires confirmation:

```json
{ "command": "cline", "args": ["Reply with one sentence confirming Cline CLI is working. Do not modify files."] }
```

Project config changes require confirmation:

```txt
.cline/rules/*
.cline/skills/*
.cline/hooks/*
.cline/agents/*
.cline/plugins/*
.cline/cron/*
.clineignore
```

MCP setup requires separate confirmation.

Hooks/plugins/skills setup requires separate confirmation.

Cron/scheduling setup requires separate confirmation.

Headless automation requires separate confirmation.

---

# Always Forbidden Without Explicit Confirmation

Do not enable:

```txt
auto-approve all
headless automation
MCP servers
hooks
plugins
skills
cron/scheduling
agent teams
subagents
workflow automation
```

Do not instruct the user to toggle auto-approve all as part of first-run setup.

Do not press or instruct `Shift+Tab` to enable auto-approve all.

Do not edit provider settings directly without confirmation.

Do not print:

```txt
~/.cline/data/settings/providers.json
~/.cline/data/settings/global-settings.json
~/.cline/data/settings/cline_mcp_settings.json
provider API keys
Cline account tokens
MCP server tokens
session data
full global config
full project config
```

Do not run destructive first tasks.

Do not run file-modifying first tasks unless the user selected a safe test workspace and explicitly confirms.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "plan_only | guided_cli_setup | already_installed_verification | source_checkout | unknown",
  "environment": {
    "os": "",
    "shell": "",
    "nodeAvailable": false,
    "nodeVersion": "",
    "nodeSupported": false,
    "npmAvailable": false,
    "npmVersion": "",
    "clineAvailable": false,
    "clineVersion": ""
  },
  "cline_context": {
    "sourceCheckoutDetected": false,
    "globalConfigExists": false,
    "projectConfigExists": false,
    "providerConfigDetected": false,
    "mcpConfigDetected": false,
    "hooksDetected": false,
    "pluginsDetected": false,
    "skillsDetected": false,
    "cronDetected": false,
    "authVerified": false,
    "tuiVerified": false,
    "firstTaskVerified": false
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
    "filesChangedByCline": [],
    "verificationResults": [],
    "remainingRisks": []
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand First-run Request

## Skill

Cline CLI First-run Request Parsing Skill

## Detailed skill behavior

The agent should determine whether the user wants a plan, a guided CLI install, help authenticating, verification of an existing install, or source checkout setup.

The user may say:

* “set up Cline CLI”
* “install Cline CLI”
* “first time Cline setup”
* “run Cline in terminal”
* “set up Cline auth”
* “open Cline TUI”
* “configure Cline provider”
* “set up MCP too”
* “enable auto approve”
* “run Cline headless”
* “set up Cline from source”

Normalize the request into:

* `plan-only`
* `guided-cli-first-run`
* `already-installed-verification`
* `auth-provider-setup-requested`
* `source-checkout-setup`
* `mcp-setup-requested`
* `headless-automation-requested`
* `auto-approve-requested`

Default to `plan-only` until install/auth/first-task confirmation is given.

If the user asks for MCP, hooks, plugins, skills, cron, headless, or auto-approve during first run, recommend interactive CLI/TUI first and defer advanced setup to later ReActions unless explicitly confirmed.

## Rules

* Default to interactive CLI/TUI first.
* Do not set up MCP by default.
* Do not set up hooks/plugins/skills by default.
* Do not configure cron by default.
* Do not run headless by default.
* Do not enable auto-approve all by default.
* Do not run install commands without confirmation.
* Do not run auth/provider setup without confirmation.
* Do not ask user to paste secrets into chat.
* Prefer official auth/config flows.
* If current environment is unclear, ask for clarification.

## Pause conditions

Pause if:

* user wants install but has not confirmed install method
* user wants auto-approve all
* user wants MCP setup
* user wants hooks/plugins/skills setup
* user wants cron setup
* user wants headless automation
* environment cannot run commands and setup was requested
* Node.js is missing or unsupported
* npm is missing

## Exit criteria

Setup intent and safety scope are clear.

## Phase output

```json
{
  "mode": "plan-only | guided-cli-first-run | already-installed-verification | auth-provider-setup-requested | source-checkout-setup | mcp-setup-requested | headless-automation-requested | auto-approve-requested",
  "defaultPath": "interactive-tui-first",
  "requiresConfirmationBeforeChanges": true
}
```

---

# Phase 2: Inspect Environment

## Skill

Cline CLI Environment Readiness Skill

## Detailed skill behavior

The agent should inspect the machine and prerequisites safely.

Check available runtimes/tools:

```json
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "cline", "args": ["--version"] }
```

Optionally:

```json
{ "command": "cline", "args": ["--help"] }
```

Determine:

* operating system
* shell/terminal context if available
* Node availability
* Node version
* whether Node is 20+
* whether Node 22+ is present or only Node 20/21
* npm availability
* npm version
* Cline CLI availability
* Cline CLI version if command supports it
* whether current directory looks like Cline source checkout
* whether current directory has project `.cline/` config

Source checkout detection:

Look for signals such as:

* Cline repo README
* `package.json` mentioning Cline workspaces
* `pnpm-lock.yaml`
* `turbo.json`
* `packages/`
* `apps/`
* `src/`
* Cline extension/CLI package names

Project config detection:

Look for project-level paths:

```txt
.cline/
.cline/rules/
.cline/skills/
.cline/hooks/
.cline/agents/
.cline/plugins/
.cline/cron/
.clineignore
```

Do not read secret provider config content.

Do not print contents of global config files.

## Rules

* Use command + args.
* Continue with plan-only mode if Cline CLI is missing.
* Do not install anything in this phase.
* Do not read secret config content.
* Do not print environment variables.
* Node below 20 blocks CLI install execution.
* Node 20+ is acceptable.
* Node 22+ is preferred/recommended.
* Missing npm blocks CLI install execution.

## Pause conditions

Pause if:

* Node is missing
* Node is below 20
* npm is missing
* source checkout is detected but user asked for normal global setup from inside it
* command execution is unavailable

## Exit criteria

Environment readiness is known.

## Phase output

```json
{
  "nodeVersion": "",
  "nodeSupported": true,
  "nodeRecommended": true,
  "npmAvailable": true,
  "clineInstalled": false,
  "clineVersion": "",
  "sourceCheckoutDetected": false,
  "projectClineConfigDetected": false,
  "recommendedInstallPath": "npm-global | already-installed | source-checkout | blocked"
}
```

---

# Phase 3: Create Install/Auth Plan

## Skill

Cline CLI Install and Auth Planning Skill

## Detailed skill behavior

The agent should create a setup plan before installing or authenticating.

Choose setup path:

1. Already installed:

   * skip install
   * verify CLI
   * run auth/account/model verification

2. Normal first-time CLI user:

   * install globally with npm
   * run `cline auth`
   * launch interactive TUI
   * verify account/model
   * run one safe first interaction

3. Source checkout:

   * use official contributor/dev setup only after confirmation
   * do not install globally from inside repo unless user asks

Potential install command:

```json
{ "command": "npm", "args": ["install", "-g", "cline"] }
```

Potential auth command:

```json
{ "command": "cline", "args": ["auth"] }
```

Potential launch command:

```json
{ "command": "cline", "args": ["-i"] }
```

Potential safe first non-mutating task:

```json
{
  "command": "cline",
  "args": ["Reply with one sentence confirming Cline CLI is working. Do not modify files."]
}
```

The plan should include:

* selected setup path
* commands to run
* expected prompts
* what files Cline may create
* where config may be stored
* what secrets must be entered only through official auth/provider flows
* confirmation required
* security notes

## Rules

* Do not install in this phase.
* Do not run auth in this phase.
* Do not run TUI in this phase.
* Do not run first task in this phase.
* Prefer interactive TUI first.
* Do not recommend headless automation as first-run default.
* Do not recommend auto-approve all.
* Do not recommend MCP/hooks/plugins/skills/cron until base TUI works.

## Exit criteria

Install/auth/setup plan is ready.

## Phase output

```json
{
  "installPath": "already-installed | npm-global | source-checkout | blocked",
  "authPath": "cline-auth | existing-auth | blocked",
  "commands": [],
  "riskLevel": "low | medium | high",
  "requiresConfirmation": true
}
```

---

# Phase 4: Confirmation Gate

## Skill

Explicit Cline CLI Setup Confirmation Skill

## Detailed skill behavior

Before installing, authenticating, launching, or running a first task, the agent must ask for explicit confirmation.

The confirmation message should summarize:

* install path
* exact commands to run
* whether auth/browser flow may open
* whether provider/account setup is involved
* what files may be created under `~/.cline`
* whether a first task will be run
* whether the first task is mutating or non-mutating
* what will not be done by default

Default recommended confirmation:

```txt
Proceed with safe Cline CLI first-run setup:
- install Cline CLI if missing
- run `cline auth`
- launch interactive TUI
- keep auto-approve all off
- do not configure MCP
- do not configure hooks/plugins/skills
- do not configure cron
- do not run headless automation
- verify one safe first interaction
```

Offer safe options:

1. Plan only
2. Install CLI only
3. Run auth only
4. Launch TUI only
5. Verify existing install
6. Run one non-mutating first task
7. Source checkout setup
8. Advanced MCP/hooks/plugins/cron later

## Rules

* Do not proceed without explicit confirmation.
* Install requires confirmation.
* Auth requires confirmation.
* First task requires confirmation.
* Auto-approve all requires separate confirmation and should not be part of first-run default.
* MCP setup requires separate confirmation.
* Hooks/plugins/skills setup requires separate confirmation.
* Cron setup requires separate confirmation.
* Project `.cline/` changes require separate confirmation.

## Exit criteria

User has confirmed allowed setup scope.

## Phase output

```json
{
  "confirmed": true,
  "allowInstall": true,
  "allowAuth": true,
  "allowTuiLaunch": true,
  "allowFirstTask": true,
  "allowProjectConfigChanges": false,
  "allowMcpSetup": false,
  "allowHooks": false,
  "allowPlugins": false,
  "allowSkills": false,
  "allowCron": false,
  "allowAutoApproveAll": false,
  "allowHeadless": false
}
```

---

# Phase 5: Apply Install

## Skill

Controlled Cline CLI Install Execution Skill

## Detailed skill behavior

This phase runs only after confirmation.

If Cline CLI is already installed, skip install and record that it was skipped.

If selected install path is npm-global:

```json
{ "command": "npm", "args": ["install", "-g", "cline"] }
```

After install, verify:

```json
{ "command": "cline", "args": ["--version"] }
```

or:

```json
{ "command": "cline", "args": ["--help"] }
```

If `cline` is still not on PATH, report blocked/incomplete with likely PATH guidance.

## Rules

* Apply only confirmed actions.
* Use command + args.
* Stop on install failure.
* Stop on unexpected prompts.
* Do not run global install inside Cline source checkout unless confirmed.
* Do not print secrets.
* Record commands run.

## Pause conditions

Pause if:

* install fails
* command not found after install
* Node/npm prerequisites are missing
* permissions/elevation needed unexpectedly
* PATH update required

## Exit criteria

Cline CLI is installed or setup is safely stopped.

## Phase output

```json
{
  "commandsRun": [],
  "clineAvailable": true,
  "clineVersion": "",
  "stoppedEarly": false,
  "stopReason": ""
}
```

---

# Phase 6: Authenticate / Configure Account

## Skill

Cline Auth and Provider Setup Skill

## Detailed skill behavior

This phase runs only after explicit auth confirmation.

Run:

```json
{ "command": "cline", "args": ["auth"] }
```

The auth flow may open a browser or prompt for sign-in/account/provider setup.

The agent should guide the user to:

* complete auth through official Cline flow
* avoid pasting tokens/API keys into chat
* configure provider/model through official UI/TUI commands when needed
* use `/account` to verify account state if in TUI
* use `/model` to verify active model if in TUI
* use `/settings` only to inspect settings, not to weaken safety
* keep auto-approve all off

Do not capture or repeat secrets.

If auth fails, suggest:

```json
{ "command": "cline", "args": ["auth"] }
```

again only after user confirmation, or suggest official troubleshooting.

## Rules

* Do not run auth without confirmation.
* Do not print API keys or tokens.
* Do not print provider config files.
* Do not configure multiple providers by default.
* Do not configure MCP in this phase.
* Do not configure hooks/plugins/skills/cron in this phase.
* Do not enable auto-approve all.

## Pause conditions

Pause if:

* auth flow requests a secret and no secure input path exists
* browser/device flow requires user action
* selected provider/model is unclear
* auth command fails
* user wants to paste secrets into chat

## Exit criteria

Auth/account/provider state is configured or setup is safely stopped.

## Phase output

```json
{
  "authRun": true,
  "authStatus": "configured | failed | skipped | blocked",
  "providerModelVerified": true,
  "notes": []
}
```

---

# Phase 7: Verify Interactive TUI

## Skill

Cline TUI First-run Verification Skill

## Detailed skill behavior

After install/auth, verify interactive TUI.

Run after confirmation:

```json
{ "command": "cline", "args": ["-i"] }
```

or:

```json
{ "command": "cline", "args": [] }
```

The agent should verify:

* TUI starts
* active model is visible
* workspace/branch status is visible when applicable
* Plan/Act state is visible
* auto-approve all status is visible and not enabled
* `/help` is available
* `/model` can be used to verify model
* `/account` can be used to verify account
* user can exit safely with `/quit`

The agent should ask the user to confirm if the runner cannot observe the TUI directly.

## Rules

* Do not enable auto-approve all.
* Do not tell the user to press `Shift+Tab`.
* Do not configure MCP.
* Do not configure hooks/plugins/skills/cron.
* Do not run file-mutating tasks yet.
* Do not claim TUI works unless observed or user-confirmed.

## Pause conditions

Pause if:

* TUI fails to start
* auth/provider error appears
* terminal is non-interactive
* auto-approve all appears enabled
* workspace is unsafe or unclear

## Exit criteria

TUI is verified, skipped, or blocked.

## Phase output

```json
{
  "tuiStarted": true,
  "accountVisible": true,
  "modelVisible": true,
  "autoApproveAllOff": true,
  "verificationSource": "observed | user-confirmed | skipped"
}
```

---

# Phase 8: Verify First Safe Task

## Skill

Cline First-task Verification Skill

## Detailed skill behavior

After TUI works, verify one safe first task.

Default non-mutating first task:

```txt
Reply with one sentence confirming Cline CLI is working. Do not modify files.
```

Use this when workspace safety is unclear.

Optional safe mutating first task only if the user confirms and a safe test workspace is selected:

```txt
Create a file named cline-hello.txt with the text "Hello from Cline", then explain what you changed.
```

The agent should verify:

* Cline understands the task
* Cline asks for approval before actions when needed
* no auto-approve all is enabled
* file changes only happen if the user confirmed a mutating test
* result is observable or user-confirmed

## Rules

* Prefer non-mutating task.
* Do not run first task in the user’s home directory.
* Do not run destructive tasks.
* Do not modify real project files unless explicitly confirmed.
* Do not use auto-approve all.
* Do not run headless by default.
* Do not claim first task worked unless observed or user-confirmed.

## Pause conditions

Pause if:

* workspace is unclear
* task would mutate important files
* Cline tries to run risky shell commands
* approval behavior is not visible
* auth/provider error occurs
* model does not respond

## Exit criteria

First safe task is verified, skipped, or blocked.

## Phase output

```json
{
  "firstTaskAttempted": true,
  "firstTaskType": "non-mutating | safe-test-file | skipped",
  "firstTaskVerified": true,
  "approvalBehaviorObserved": true,
  "verificationSource": "observed | user-confirmed | skipped"
}
```

---

# Phase 9: First-run Security Checklist

## Skill

Cline First-run Security Baseline Skill

## Detailed skill behavior

Give a first-run security checklist after setup.

Recommend:

* keep auto-approve all off
* use Plan mode before Act mode for non-trivial tasks
* keep first tasks small
* use a safe test workspace before real projects
* review approvals carefully
* avoid MCP until the base CLI works
* avoid hooks/plugins until reviewed
* avoid skills until trusted
* avoid cron/scheduling until base CLI works
* avoid headless automation until interactive workflow is understood
* keep provider secrets out of chat
* do not commit `.cline/` files that contain secrets
* commit only project `.cline/` rules/skills/hooks that are intended to be team-shared
* review hooks/plugins like executable code
* consider `.clineignore` for sensitive files
* consider `CLINE_COMMAND_PERMISSIONS` for shell command restrictions

Suggested future ReActions:

```txt
/ReAction-check-cline-cli-health
/ReAction-review-cline-permissions-and-auto-approve
/ReAction-setup-cline-project-rules
/ReAction-check-cline-mcp-config
/ReAction-review-cline-hooks-and-plugins
/ReAction-setup-cline-headless-task-safely
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

# Phase 10: Final Report

## Skill

Cline CLI First-run Setup Reporting Skill

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

It must not claim first task success unless verified.

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
# Cline CLI First-run Setup Report

Status: complete | blocked | failed | incomplete_data | plan_only
Mode: plan-only | guided-cli-setup | already-installed-verification | source-checkout

## Environment

- OS: <value or unavailable>
- Node version: <value or unavailable>
- Node supported: yes/no
- Node recommended version present: yes/no
- npm available: yes/no
- Cline installed before setup: yes/no
- Cline version: <value or unavailable>
- Source checkout detected: yes/no
- Project `.cline/` detected: yes/no

## Setup plan

- Install path: <already-installed/npm-global/source-checkout/blocked>
- Auth path: <cline-auth/existing-auth/blocked>
- Interactive TUI first: yes/no
- Auto-approve all avoided: yes/no
- MCP setup deferred: yes/no
- Hooks/plugins/skills deferred: yes/no
- Cron/headless deferred: yes/no

## Commands run

- `<command>`: passed/failed/skipped
- `<command>`: passed/failed/skipped

## Auth/provider

- Auth run: yes/no
- Auth configured: yes/no/unknown
- Provider/model verified: yes/no/unknown
- Secrets entered through official Cline flow: yes/no/not applicable
- Secrets printed in report: no

## Verification

- CLI available: passed/failed/skipped
- TUI started: passed/failed/skipped
- Account/model visible: passed/failed/skipped
- Auto-approve all off: passed/failed/skipped
- First safe task: passed/failed/skipped

## Security checklist

- Auto-approve all avoided: yes/no
- Headless automation avoided: yes/no
- MCP setup deferred: yes/no
- Hooks/plugins/skills deferred: yes/no
- Cron setup deferred: yes/no
- Sensitive config redacted: yes
- `.cline/` team-sharing warning provided: yes/no

## Remaining risks

- <risk or none>
- <risk or none>

## Recommended next steps

- Run `/ReAction-check-cline-cli-health`
- Run `/ReAction-review-cline-permissions-and-auto-approve`
- Add MCP/hooks/plugins/skills only after base CLI/TUI works

## Safety notes

- No secrets were printed.
- Full Cline config was not printed.
- Auto-approve all was not enabled.
- MCP servers were not configured without confirmation.
- Hooks/plugins/skills were not configured without confirmation.
- Cron/scheduling was not configured without confirmation.
- Headless automation was not configured without confirmation.
```

Rules:

* Use `plan_only` when no install/auth/setup was executed.
* Use `complete` only when setup and verification are acceptable.
* Use `incomplete_data` when setup partly completed but TUI or first task was not verified.
* Use `blocked` when prerequisites or confirmation are missing.
* Use `failed` when setup was attempted and failed.
* Keep output concise.

---

# Examples

## Example 1: First-time Cline CLI setup

User:

> Use /ReAction-setup-cline-cli-first-run. Set up Cline CLI for me.

Expected:

* inspect Node/npm/Cline
* create plan
* ask confirmation
* install if confirmed
* run auth if confirmed
* launch TUI if confirmed
* verify model/account
* verify first safe interaction
* return report

## Example 2: Cline already installed

User:

> Use /ReAction-setup-cline-cli-first-run. I already installed Cline.

Expected:

* skip install
* verify CLI
* run auth if needed and confirmed
* launch TUI
* verify account/model
* verify first safe interaction
* return report

## Example 3: Node unsupported

User:

> Set up Cline CLI.

Expected:

* inspect Node
* if Node is below 20, block setup execution
* recommend upgrading Node first
* do not install Cline

## Example 4: User wants MCP immediately

User:

> Set up Cline CLI and MCP.

Expected:

* recommend CLI/TUI first
* explain MCP setup needs separate confirmation
* do not configure MCP by default
* after local setup, suggest future MCP ReAction

## Example 5: User wants auto-approve all

User:

> Set up Cline and turn on auto-approve all.

Expected:

* do not enable auto-approve all as first-run default
* explain it allows actions with reduced review
* proceed only with safe confirmation-based setup

## Example 6: Source checkout

User:

> I cloned cline/cline, set it up from source.

Expected:

* detect source checkout
* switch to source-checkout mode
* do not run global install inside repo
* recommend official contributor setup
* ask before running source setup commands

# End of ReAction
