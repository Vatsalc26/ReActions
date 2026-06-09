---
id: setup-openhands-first-run
name: Setup OpenHands First Run
version: 0.1.0
description: Safely guide a first-time OpenHands setup using environment inspection, install planning, confirmation gates, Agent Canvas or CLI setup, local verification, first-task verification, and security reminders.
category: devtools
subcategory: openhands
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_or_browser_with_confirmation_gates
supported_project_policy: local_machine_or_openhands_source_checkout
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_install: true
  requires_confirmation_before_remote_script: true
  requires_confirmation_before_docker_run: true
  requires_confirmation_before_llm_auth: true
  requires_confirmation_before_public_mode: true
  requires_confirmation_before_mcp_setup: true
  requires_confirmation_before_automation_setup: true
  never_print_secrets: true
  never_print_full_config: true
  never_enable_public_mode_by_default: true
  never_bind_to_all_interfaces_by_default: true
  never_use_always_approve_by_default: true
  never_mount_home_directory_by_default: true
  never_configure_mcp_by_default: true
  never_configure_automations_by_default: true
---

# ReAction: Setup OpenHands First Run

## Purpose

Safely guide a first-time OpenHands user from “not set up yet” to a verified local OpenHands session.

This ReAction is for repeated first-run tasks such as:

- check whether the machine is ready for OpenHands
- choose Agent Canvas or CLI setup
- choose npm, uv, Docker, binary, cloud, or source-checkout path
- install OpenHands only after confirmation
- configure LLM/provider safely
- verify local Agent Canvas backend or CLI
- run a safe first task
- verify conversation/session state
- give first-run security reminders
- produce a final setup report

Default first-run recommendation:

```txt
Agent Canvas local setup first when the user wants a browser UI.
CLI setup first when the user wants terminal-only usage.
Localhost only.
No public mode.
No remote backend.
No MCP servers yet.
No automations yet.
No auto-approval.
No broad filesystem mount.
No secrets printed.
```

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Official Setup Facts To Follow

Follow current official OpenHands docs and the official OpenHands/OpenHands repository.

OpenHands has multiple ways to run:

* Agent Canvas
* CLI
* SDK
* Local GUI
* Cloud
* Enterprise

For first-time local users, this ReAction should support two primary paths:

1. Agent Canvas first-run setup
2. CLI first-run setup

Agent Canvas facts:

* Agent Canvas is the recommended browser-based local UI.
* Agent Canvas can run agents and automations locally or in the cloud.
* Agent Canvas can be installed via npm or Docker.
* npm install requires Node.js 22.12 or later, npm, and uv.
* npm install command:

```json
{ "command": "npm", "args": ["install", "-g", "@openhands/agent-canvas"] }
```

* Run command:

```json
{ "command": "agent-canvas", "args": [] }
```

* Agent Canvas defaults to localhost port 8000.
* `--public` enables public mode and requires `LOCAL_BACKEND_API_KEY`.
* `LOCAL_BACKEND_API_KEY` is required for public mode and should be treated as a secret.
* `OH_SECRET_KEY` protects stored settings and secrets and should be treated as a secret.
* First UI setup includes choosing an agent, checking backend, setting up LLM, and starting from a proven workflow.
* The OpenHands agent is selected by default in Agent Canvas first-time setup.
* Local backend defaults to local machine / loopback.
* LLM setup can use direct provider keys or OpenHands Cloud API key.
* Settings, secrets, and conversation history persist under OpenHands data directories.

CLI facts:

* CLI install recommended path uses uv.
* CLI install command:

```json
{ "command": "uv", "args": ["tool", "install", "openhands", "--python", "3.12"] }
```

* CLI run command:

```json
{ "command": "openhands", "args": [] }
```

* Windows CLI users should use WSL.
* First CLI run prompts for LLM provider and API key.
* OpenHands Cloud login command:

```json
{ "command": "openhands", "args": ["login"] }
```

* CLI can start with a task:

```json
{ "command": "openhands", "args": ["-t", "Create a Python script that prints Hello from OpenHands."] }
```

* CLI can resume conversations:

```json
{ "command": "openhands", "args": ["--resume"] }
{ "command": "openhands", "args": ["--resume", "--last"] }
```

* CLI can run headless, but headless mode requires a task or file.
* CLI supports `--always-approve`, but this must not be used by default.
* CLI supports `--llm-approve`, but this should be treated as advanced behavior, not first-run default.
* CLI config and history live under `~/.openhands`.

Web/server facts:

* `openhands web` exposes CLI through browser.
* `openhands serve` launches the full GUI server using Docker.
* Web interface can bind to hosts/ports.
* Binding to `0.0.0.0` or exposing to the network must require explicit confirmation.
* Exposed interfaces provide powerful OpenHands capabilities and need security controls.

Source checkout facts:

* OpenHands source checkout is for development, not normal first-time user setup.
* The repo contains Python, TypeScript, Docker, uv, pyproject, frontend, backend, containers, and development docs.
* If source checkout is detected, do not run global install or random package commands inside the source checkout without confirmation.
* Do not use the source repo path as the user’s project workspace unless explicitly requested.

---

# Important Scope

This is a first-run setup ReAction.

It may modify the user’s machine only after explicit confirmation.

Possible changes after confirmation:

* install Agent Canvas globally with npm
* install OpenHands CLI with uv
* run Agent Canvas
* run OpenHands CLI
* create or update `~/.openhands`
* configure LLM settings through official UI/CLI
* create conversation history
* optionally run Docker image
* optionally mount a selected project folder

Do not silently perform any of those changes.

Do not set up MCP servers by default.

Do not set up automations by default.

Do not connect GitHub, Slack, Linear, Jira, or other services by default.

Do not start public mode by default.

Do not expose OpenHands server to the network by default.

Do not mount the entire home directory by default.

First success means one of:

```txt
Agent Canvas opens locally, backend is healthy, LLM is configured, and a first safe prompt can be started.
```

or:

```txt
OpenHands CLI starts locally, LLM is configured, and a first safe task is completed or user-confirmed.
```

Not:

```txt
Public server exposed.
MCP connected.
Automation configured.
Cloud workspace connected.
Repository monitor enabled.
Slack digest running.
```

Those come later.

---

# Security Model

Treat OpenHands as a powerful coding-agent runtime.

Security assumptions:

* local-only first
* smallest workspace first
* explicit provider/key setup
* no public exposure by default
* no all-interface bind by default
* no auto-approval by default
* no broad filesystem mount by default
* no MCP servers by default
* no automations by default
* no secret printing
* no full config printing
* no cloud login unless user chooses it

Protect these files and locations:

```txt
~/.openhands/
~/.openhands/settings.json
~/.openhands/agent_settings.json
~/.openhands/cli_config.json
~/.openhands/mcp.json
~/.openhands/conversations/
~/.openhands/secrets/
.env
.env.local
LLM_API_KEY
LLM_BASE_URL
LOCAL_BACKEND_API_KEY
OH_SECRET_KEY
OpenHands Cloud API keys
provider API keys
MCP server tokens
GitHub/Slack/Linear/Jira tokens
```

The agent may report whether these files exist, but must not print raw contents.

Use redacted summaries only.

---

# Execution Modes

## Plan-only mode

Use this mode when:

* OpenHands is not installed and the user has not confirmed installation
* Agent Canvas prerequisites are missing
* CLI prerequisites are missing
* user has not chosen Agent Canvas or CLI
* user has not confirmed provider setup
* user is unsure which setup path to choose
* environment cannot safely run install commands
* source checkout is detected
* user asks “how should I set this up?”

Plan-only mode should inspect and report without changing anything.

## Agent Canvas setup mode

Use this mode only after explicit confirmation.

Agent Canvas setup may:

* install `@openhands/agent-canvas` with npm
* run `agent-canvas`
* verify local URL on port 8000
* guide first-time UI wizard
* verify local backend health
* guide LLM provider setup
* guide first conversation
* return report

Do not use `--public` by default.

Do not set `LOCAL_BACKEND_API_KEY` in chat.

Do not set `OH_SECRET_KEY` in chat.

Do not mount broad paths.

## CLI setup mode

Use this mode only after explicit confirmation.

CLI setup may:

* install `openhands` using uv
* run `openhands --version`
* run `openhands login` only if user chooses OpenHands Cloud auth
* run `openhands`
* guide LLM provider setup
* run first safe task if user confirms
* verify resume if appropriate
* return report

Do not use `--always-approve`.

Do not use `--headless` for first-run unless user requested automation.

Do not use `--override-with-envs` unless user explicitly chose temporary environment variable setup.

## Docker setup mode

Use this mode only after explicit confirmation.

Docker setup may:

* verify Docker is installed and running
* create a selected persistence directory
* create a selected projects directory
* run the official Agent Canvas Docker image
* mount only the selected project root or projects directory
* verify local URL on port 8000
* return report

Do not mount the entire home directory.

Do not expose beyond localhost by default.

Do not run with public mode unless explicitly confirmed.

## Source checkout mode

Use this mode when current directory appears to be OpenHands source.

Source checkout mode should:

* detect repo files like `pyproject.toml`, `uv.lock`, `frontend/`, `openhands/`, `containers/`, `docker-compose.yml`, `config.template.toml`
* avoid random install commands
* refer to official development docs
* require confirmation before running source dev commands
* make clear that source checkout setup is for contributors, not normal first-time users

---

# Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for plan-only mode:

* inspect operating system
* inspect current directory
* run safe version commands
* read files safely
* detect OpenHands CLI availability
* detect Agent Canvas availability
* detect Docker availability
* detect uv availability
* detect Node/npm availability
* detect WSL when on Windows
* detect OpenHands source checkout
* produce final report

Additional capabilities for setup modes:

* run terminal commands
* read stdout
* read stderr
* detect command failures
* stop on interactive prompts
* ask confirmation
* open local browser/dashboard if supported
* guide user through provider auth
* redact sensitive output
* record phase progress

Browser automation is optional.

If browser automation is unavailable, the agent should ask the user to confirm whether Agent Canvas opened and whether the first prompt worked.

---

# Cross-platform Rules

This ReAction must work across:

* macOS terminal
* Linux shell
* Windows PowerShell for Agent Canvas npm/Docker path
* WSL2 for OpenHands CLI path
* Docker Desktop on macOS/Windows
* Docker Engine on Linux

Rules:

* Prefer command execution as command + args, not shell strings.
* Do not rely on Unix-only commands like `cat`, `grep`, `sed`, `awk`, `rm`, `ls`, `tail`, or `date`.
* Do not rely on Windows-only commands like `dir`, `type`, or PowerShell-specific syntax.
* Use file-read/list capability to inspect files.
* Use terminal only for runtime/setup/OpenHands commands.
* Do not pipe output through OS-specific commands.
* Do not print all environment variables.
* Do not print secrets.

Preferred command representation:

```json
{
  "command": "agent-canvas",
  "args": ["--info"]
}
```

Shell strings are acceptable only when a documented installer requires shell syntax and the user explicitly confirms the exact command.

---

# Allowed Commands Before Confirmation

These are safe inspection commands:

```json
{ "command": "git", "args": ["--version"] }
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "uv", "args": ["--version"] }
{ "command": "python", "args": ["--version"] }
{ "command": "python3", "args": ["--version"] }
{ "command": "docker", "args": ["--version"] }
{ "command": "docker", "args": ["info"] }
{ "command": "openhands", "args": ["--version"] }
{ "command": "agent-canvas", "args": ["--version"] }
{ "command": "agent-canvas", "args": ["--info"] }
```

Run `docker info` only when Docker setup is being considered.

If a command is missing, continue with setup planning.

---

# Commands Requiring Explicit Confirmation

Installation commands require confirmation:

```json
{ "command": "npm", "args": ["install", "-g", "@openhands/agent-canvas"] }
{ "command": "uv", "args": ["tool", "install", "openhands", "--python", "3.12"] }
{ "command": "uv", "args": ["tool", "upgrade", "openhands", "--python", "3.12"] }
```

Remote executable installer commands require exact-command confirmation:

```txt
curl -fsSL https://install.openhands.dev/install.sh | sh
```

Run commands require confirmation:

```json
{ "command": "agent-canvas", "args": [] }
{ "command": "openhands", "args": [] }
{ "command": "openhands", "args": ["login"] }
{ "command": "openhands", "args": ["-t", "Create a Python script that prints Hello from OpenHands."] }
```

Docker run commands require confirmation because they start a container and mount directories.

Public/network mode requires separate explicit confirmation:

```json
{ "command": "agent-canvas", "args": ["--public"] }
{ "command": "openhands", "args": ["web", "--host", "0.0.0.0"] }
```

MCP configuration requires separate confirmation:

```json
{ "command": "openhands", "args": ["mcp", "add"] }
{ "command": "openhands", "args": ["mcp", "enable"] }
```

---

# Always Forbidden Without Explicit Confirmation

Do not run:

```json
{ "command": "openhands", "args": ["--always-approve"] }
{ "command": "openhands", "args": ["acp", "--always-approve"] }
{ "command": "openhands", "args": ["web", "--host", "0.0.0.0"] }
{ "command": "agent-canvas", "args": ["--public"] }
```

Do not configure:

```txt
MCP servers
GitHub automations
Slack automations
Linear automations
Jira automations
repository monitors
PR review bots
public backends
remote VM backends
cloud backend connections
```

unless explicitly requested and confirmed.

Do not mount:

```txt
/
~
entire user home directory
system directories
SSH key directories
cloud credential directories
password manager exports
```

Do not print:

```txt
LLM_API_KEY
LOCAL_BACKEND_API_KEY
OH_SECRET_KEY
OpenHands Cloud API key
provider API keys
MCP tokens
GitHub tokens
Slack tokens
full ~/.openhands config
conversation history
```

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "plan_only | agent_canvas_setup | cli_setup | docker_setup | source_checkout | unknown",
  "environment": {
    "os": "",
    "shell": "",
    "isWindows": false,
    "wslAvailable": false,
    "gitAvailable": false,
    "nodeAvailable": false,
    "nodeVersion": "",
    "nodeSupportedForAgentCanvas": false,
    "npmAvailable": false,
    "uvAvailable": false,
    "pythonAvailable": false,
    "pythonVersion": "",
    "dockerAvailable": false,
    "dockerRunning": false,
    "openhandsAvailable": false,
    "openhandsVersion": "",
    "agentCanvasAvailable": false,
    "agentCanvasVersion": ""
  },
  "openhands_context": {
    "sourceCheckoutDetected": false,
    "homeConfigExists": false,
    "settingsFilesDetected": [],
    "conversationsDetected": false,
    "mcpConfigDetected": false,
    "agentCanvasRunning": false,
    "cliFirstTaskVerified": false,
    "agentCanvasFirstPromptVerified": false
  },
  "setup_plan": {
    "recommended": false,
    "riskLevel": "low | medium | high",
    "path": "agent_canvas | cli | docker | source_checkout | cloud | blocked",
    "commands": [],
    "confirmationRequired": true,
    "securityNotes": []
  },
  "setup_result": {
    "commandsRun": [],
    "filesChangedByOpenHands": [],
    "verificationResults": [],
    "remainingRisks": []
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand First-run Request

## Skill

OpenHands First-run Request Parsing Skill

## Detailed skill behavior

The agent should determine whether the user wants Agent Canvas, CLI, Docker, Cloud, or source-checkout setup.

The user may say:

* “set up OpenHands”
* “install OpenHands”
* “first time OpenHands setup”
* “set up Agent Canvas”
* “set up OpenHands CLI”
* “run OpenHands locally”
* “run OpenHands in Docker”
* “start OpenHands web UI”
* “configure OpenHands provider”
* “set up OpenHands from source”
* “connect GitHub automation after setup”

Normalize the request into:

* `plan-only`
* `agent-canvas-first-run`
* `cli-first-run`
* `docker-agent-canvas-first-run`
* `openhands-cloud-guidance`
* `source-checkout-setup`
* `automation-setup-requested`
* `mcp-setup-requested`

Default recommendation:

```txt
Agent Canvas local first-run for browser UI users.
CLI first-run for terminal-only users.
```

If user asks for automations or MCP during first run, recommend basic local first-run first and defer automations/MCP to later ReActions unless the user explicitly confirms.

## Rules

* Default to local-only.
* Do not set up public mode.
* Do not configure MCP by default.
* Do not configure automations by default.
* Do not run install commands without confirmation.
* Do not run provider/auth setup without confirmation.
* Do not ask user to paste secrets into chat.
* Prefer official UI/CLI settings flows for keys.
* If current environment is unclear, ask for clarification.

## Pause conditions

Pause if:

* user wants install but has not confirmed install method
* user wants public mode
* user wants `--always-approve`
* user wants MCP setup
* user wants automation setup
* user wants cloud login but does not understand account/API-key flow
* environment cannot run commands and setup was requested

## Exit criteria

Setup intent and safety scope are clear.

## Phase output

```json
{
  "mode": "plan-only | agent-canvas-first-run | cli-first-run | docker-agent-canvas-first-run | openhands-cloud-guidance | source-checkout-setup | automation-setup-requested | mcp-setup-requested",
  "defaultPath": "local-first",
  "requiresConfirmationBeforeChanges": true
}
```

---

# Phase 2: Inspect Environment

## Skill

OpenHands Environment Readiness Skill

## Detailed skill behavior

The agent should inspect the machine and prerequisites safely.

Check available runtimes/tools:

```json
{ "command": "git", "args": ["--version"] }
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "uv", "args": ["--version"] }
{ "command": "python", "args": ["--version"] }
{ "command": "python3", "args": ["--version"] }
{ "command": "docker", "args": ["--version"] }
{ "command": "openhands", "args": ["--version"] }
{ "command": "agent-canvas", "args": ["--version"] }
```

If Docker path is considered, also run after confirmation or if safe:

```json
{ "command": "docker", "args": ["info"] }
```

Determine:

* operating system
* shell/terminal context if available
* whether Windows requires WSL for CLI path
* Git availability
* Node availability and version
* whether Node is 22.12 or later for Agent Canvas npm setup
* npm availability
* uv availability
* Python availability
* Docker availability
* Docker running state if needed
* OpenHands CLI availability
* Agent Canvas availability
* whether current directory looks like OpenHands source checkout

Source checkout detection:

Look for signals such as:

* `pyproject.toml`
* `uv.lock`
* `poetry.lock`
* `config.template.toml`
* `docker-compose.yml`
* `frontend/`
* `openhands/`
* `containers/`
* `openhands-ui/`
* `agent-server`
* `README.md` mentioning OpenHands

If source checkout is detected, do not run global installers inside the checkout unless the user asks.

## Rules

* Use command + args.
* Continue with plan-only mode if OpenHands/Agent Canvas is missing.
* Do not install anything in this phase.
* Do not read secret config content.
* Do not print environment variables.
* Do not fail just because optional tooling is missing.
* Missing Node matters for Agent Canvas npm path.
* Missing uv matters for CLI path.
* Missing Docker matters only for Docker path or `openhands serve`.

## Pause conditions

Pause if:

* Windows user wants CLI but WSL is unavailable
* selected path requires Node 22.12+ and Node is missing/too old
* selected path requires uv and uv is missing
* selected path requires Docker and Docker is missing/not running
* source checkout is detected but user asked for normal global setup inside it
* command execution is unavailable

## Exit criteria

Environment readiness is known.

## Phase output

```json
{
  "nodeVersion": "",
  "nodeSupportedForAgentCanvas": true,
  "npmAvailable": true,
  "uvAvailable": true,
  "dockerAvailable": true,
  "dockerRunning": true,
  "openhandsInstalled": false,
  "agentCanvasInstalled": false,
  "sourceCheckoutDetected": false,
  "recommendedSetupPath": "agent_canvas | cli | docker | cloud | source_checkout | blocked"
}
```

---

# Phase 3: Create Setup Plan

## Skill

OpenHands Install and First-run Planning Skill

## Detailed skill behavior

Create a setup plan before installing or configuring anything.

Choose path:

1. Agent Canvas npm path:

   * best for browser UI and local full-stack setup
   * requires Node 22.12+, npm, uv
   * command: `npm install -g @openhands/agent-canvas`
   * run: `agent-canvas`
   * verify localhost 8000

2. CLI uv path:

   * best for terminal users
   * Windows CLI users should use WSL
   * command: `uv tool install openhands --python 3.12`
   * run: `openhands`
   * configure provider on first run

3. Docker Agent Canvas path:

   * best for sandboxed containerized setup
   * requires Docker installed and running
   * mount selected projects directory only
   * persist settings in selected `.openhands` directory
   * verify localhost 8000

4. OpenHands Cloud guidance:

   * no local install
   * user signs in through official cloud UI
   * do not collect API keys in chat
   * good for quick hosted testing

5. Source checkout:

   * contributor/developer path
   * use official development docs
   * do not treat as normal first-run user install

Plan must include:

* selected path
* commands to run
* prerequisites
* expected prompts
* what files/directories may be created
* what secrets user must enter directly into UI/CLI
* what will not happen by default
* confirmation required
* risk level

## Rules

* Do not install in this phase.
* Do not run Agent Canvas or OpenHands in this phase.
* Do not configure LLM in this phase.
* Do not recommend public mode.
* Do not recommend auto-approve.
* Do not recommend MCP or automations until base first-run works.
* If source checkout, use official development path only.

## Exit criteria

Setup plan is ready.

## Phase output

```json
{
  "setupPath": "agent_canvas_npm | cli_uv | docker_agent_canvas | cloud_guidance | source_checkout | blocked",
  "commands": [],
  "riskLevel": "low | medium | high",
  "requiresConfirmation": true,
  "willKeepLocalOnly": true,
  "willAvoidAutoApproval": true
}
```

---

# Phase 4: Confirmation Gate

## Skill

Explicit OpenHands Setup Confirmation Skill

## Detailed skill behavior

Before installing or launching anything, the agent must ask for explicit confirmation.

The confirmation message should summarize:

* setup path
* exact commands to run
* whether Docker will be used
* which directories may be mounted
* whether provider setup will be done through UI/CLI
* what files may be created under `~/.openhands`
* what secrets the user should enter only into official OpenHands UI/CLI
* what will not be done by default

Default recommended confirmation:

```txt
Proceed with local first-run setup:
- install only the selected OpenHands path
- keep server local
- do not use public mode
- do not bind to all interfaces
- do not use always-approve
- do not configure MCP yet
- do not configure automations yet
- verify first local session
```

Offer safe options:

1. Plan only
2. Install Agent Canvas with npm
3. Install OpenHands CLI with uv
4. Run Agent Canvas through Docker
5. Use OpenHands Cloud only
6. Verify existing install
7. Source checkout setup
8. MCP/automation setup later

## Rules

* Do not proceed without explicit confirmation.
* Remote script install requires exact-command confirmation.
* Docker run requires confirmation.
* Public mode requires separate confirmation.
* MCP setup requires separate confirmation.
* Automation setup requires separate confirmation.
* Auto-approval requires separate confirmation and should not be part of first-run default.

## Exit criteria

User has confirmed allowed setup scope.

## Phase output

```json
{
  "confirmed": true,
  "allowInstall": true,
  "allowDockerRun": false,
  "allowProviderSetup": true,
  "allowPublicMode": false,
  "allowBindAllInterfaces": false,
  "allowMcpSetup": false,
  "allowAutomationSetup": false,
  "allowAlwaysApprove": false
}
```

---

# Phase 5: Apply Install

## Skill

Controlled OpenHands Install Execution Skill

## Detailed skill behavior

This phase runs only after confirmation.

If selected path is Agent Canvas npm:

```json
{ "command": "npm", "args": ["install", "-g", "@openhands/agent-canvas"] }
```

Then verify:

```json
{ "command": "agent-canvas", "args": ["--version"] }
{ "command": "agent-canvas", "args": ["--info"] }
```

If selected path is CLI uv:

```json
{ "command": "uv", "args": ["tool", "install", "openhands", "--python", "3.12"] }
```

Then verify:

```json
{ "command": "openhands", "args": ["--version"] }
```

If selected path is Docker:

* create selected persistence directory only if confirmed
* create selected projects directory only if confirmed
* run official image with selected mounts only
* do not mount broad paths
* do not expose beyond localhost by default

If selected path is cloud guidance:

* do not install locally
* provide official cloud login guidance
* do not collect API keys in chat

If selected path is source checkout:

* stop and provide official development setup plan
* run source dev commands only after separate confirmation

## Rules

* Apply only confirmed actions.
* Use command + args where possible.
* Stop on install failure.
* Stop on unexpected prompts.
* Do not run remote installer unless exact-confirmed.
* Do not print secrets.
* Record commands run.

## Pause conditions

Pause if:

* install fails
* command not found after install
* required runtime missing
* Docker not running
* permissions/elevation needed unexpectedly
* PATH update required
* source checkout selected but required dev tooling missing

## Exit criteria

Selected OpenHands entrypoint is installed or setup is safely stopped.

## Phase output

```json
{
  "commandsRun": [],
  "agentCanvasAvailable": true,
  "openhandsAvailable": true,
  "version": "",
  "stoppedEarly": false,
  "stopReason": ""
}
```

---

# Phase 6: Configure LLM / Provider

## Skill

OpenHands Provider Configuration Skill

## Detailed skill behavior

This phase runs only after explicit provider setup confirmation.

Agent Canvas provider setup:

* open Agent Canvas locally
* use first-time setup wizard
* choose OpenHands agent unless user chooses another ACP agent
* confirm local backend is connected
* open Settings > LLM
* select provider/model
* enter API key directly into UI
* do not paste API key into chat
* save settings

CLI provider setup:

* run `openhands`
* allow first-run CLI prompt to configure LLM provider and API key
* optionally run `openhands login` if user chooses OpenHands Cloud
* do not paste API key into chat
* do not print settings file

Environment variable override setup:

* only if user explicitly requests temporary environment-based setup
* use `LLM_API_KEY`, `LLM_MODEL`, and optionally `LLM_BASE_URL`
* remind user that environment override is temporary when using override mode
* do not print secrets

## Rules

* Do not run provider setup without confirmation.
* Do not print API keys.
* Do not print full settings files.
* Do not configure multiple providers by default.
* Do not configure MCP servers here.
* Do not configure automations here.
* Do not enable public mode here.

## Pause conditions

Pause if:

* provider flow requests a secret and no secure input path exists
* user wants to paste a secret into chat
* selected provider/model is unclear
* provider setup fails
* cloud login requires browser action

## Exit criteria

Provider is configured or setup is safely stopped.

## Phase output

```json
{
  "providerSetupRun": true,
  "providerStatus": "configured | failed | skipped | blocked",
  "secretHandling": "entered-in-official-ui-or-cli | not-needed | blocked",
  "notes": []
}
```

---

# Phase 7: Verify Local Session

## Skill

OpenHands First-session Verification Skill

## Detailed skill behavior

Verify the chosen OpenHands path.

Agent Canvas verification:

1. Run `agent-canvas` after confirmation.
2. Confirm it starts on local port 8000.
3. Confirm backend health in UI.
4. Confirm the OpenHands agent is selected.
5. Confirm LLM provider/model is configured.
6. Start a safe first prompt.

Safe first prompt:

```txt
Create a file named openhands-hello.txt with the text "Hello from OpenHands", then explain what you changed.
```

CLI verification:

1. Run `openhands` after confirmation.
2. Confirm CLI starts.
3. Confirm provider/model is configured.
4. Run or manually enter a safe first task.

Safe first CLI task:

```json
{ "command": "openhands", "args": ["-t", "Create a file named openhands-hello.txt with the text Hello from OpenHands, then explain what you changed."] }
```

Only run the first task inside a clearly selected test workspace, not the user’s whole home directory.

If user does not want file creation, use a non-mutating prompt:

```txt
Reply with one sentence confirming OpenHands is working. Do not modify files.
```

## Rules

* Do not run first task in an unsafe workspace.
* Do not mount broad directories.
* Do not use `--always-approve`.
* Do not use public mode.
* Do not configure MCP.
* Do not configure automations.
* Do not claim success without observation or user confirmation.
* If browser/UI cannot be observed, ask user to confirm.

## Pause conditions

Pause if:

* workspace is unclear
* user does not want file changes
* agent tries to access broad filesystem
* provider/auth error occurs
* backend is unhealthy
* UI cannot connect to backend
* CLI fails to start

## Exit criteria

First local OpenHands session is verified, skipped, or blocked.

## Phase output

```json
{
  "entrypoint": "agent-canvas | openhands-cli | docker-agent-canvas | cloud",
  "localSessionStarted": true,
  "providerConfigured": true,
  "firstPromptVerified": true,
  "verificationSource": "observed | user-confirmed | skipped",
  "notes": []
}
```

---

# Phase 8: Optional Resume / Persistence Verification

## Skill

OpenHands Persistence Verification Skill

## Detailed skill behavior

Verify that settings and conversations persist where appropriate.

For CLI, optionally run:

```json
{ "command": "openhands", "args": ["--resume"] }
```

or:

```json
{ "command": "openhands", "args": ["--resume", "--last"] }
```

Only do this after first session exists and user confirms.

For Agent Canvas:

* confirm settings are saved
* confirm backend reconnect works after refresh
* confirm conversation remains visible if applicable

Do not print conversation history.

Do not inspect raw conversation files.

## Rules

* Do not print conversation history.
* Do not expose settings files.
* Do not delete or reset conversations.
* Do not run destructive commands.
* If no session exists, report skipped instead of failure.

## Exit criteria

Persistence/resume status is known or skipped.

## Phase output

```json
{
  "persistenceCheckAttempted": true,
  "persistenceVerified": true,
  "notes": []
}
```

---

# Phase 9: First-run Security Checklist

## Skill

OpenHands First-run Security Baseline Skill

## Detailed skill behavior

Give a first-run security checklist after setup.

Recommend:

* keep OpenHands local until base setup works
* do not use public mode unless required
* do not bind to all interfaces unless required
* set strong `LOCAL_BACKEND_API_KEY` before public/network exposure
* set/protect `OH_SECRET_KEY` when appropriate
* keep `--always-approve` off for first-run usage
* use the smallest workspace mount possible
* avoid mounting home directory
* avoid adding MCP servers until reviewed
* avoid automations until base setup works
* avoid GitHub/Slack/Linear/Jira connections until needed
* protect `~/.openhands`
* do not share settings/config files without redaction
* run a future health check ReAction
* run a future sandbox/security ReAction

Suggested future ReActions:

```txt
/ReAction-check-openhands-agent-health
/ReAction-check-openhands-sandbox-config
/ReAction-run-openhands-security-check
/ReAction-setup-openhands-mcp-safely
/ReAction-setup-openhands-github-pr-review-automation
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

OpenHands First-run Setup Reporting Skill

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

It must not claim first session success unless verified.

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
# OpenHands First-run Setup Report

Status: complete | blocked | failed | incomplete_data | plan_only
Mode: plan-only | agent-canvas | cli | docker | cloud | source-checkout

## Environment

- OS: <value or unavailable>
- Windows WSL needed: yes/no/not applicable
- Node version: <value or unavailable>
- npm available: yes/no
- uv available: yes/no
- Python version: <value or unavailable>
- Docker available: yes/no
- Docker running: yes/no/not checked
- OpenHands CLI installed before setup: yes/no
- Agent Canvas installed before setup: yes/no
- Source checkout detected: yes/no

## Setup plan

- Setup path: <agent-canvas-npm/cli-uv/docker-agent-canvas/cloud/source-checkout/blocked>
- Local-only first: yes/no
- Public mode deferred: yes/no
- MCP setup deferred: yes/no
- Automations deferred: yes/no
- Auto-approval avoided: yes/no

## Commands run

- `<command>`: passed/failed/skipped
- `<command>`: passed/failed/skipped

## Provider/configuration

- Provider setup run: yes/no
- Provider configured: yes/no/unknown
- Secrets entered through official UI/CLI: yes/no/not applicable
- Secrets printed in report: no

## Verification

- Entrypoint started: passed/failed/skipped
- Local backend/UI: passed/failed/skipped
- CLI session: passed/failed/skipped
- First safe prompt: passed/failed/skipped
- Persistence/resume: passed/failed/skipped

## Security checklist

- Public mode avoided: yes/no
- All-interface bind avoided: yes/no
- Auto-approval avoided: yes/no
- Broad filesystem mount avoided: yes/no
- MCP setup deferred: yes/no
- Automations deferred: yes/no
- Sensitive config redacted: yes

## Remaining risks

- <risk or none>
- <risk or none>

## Recommended next steps

- Run `/ReAction-check-openhands-agent-health`
- Run `/ReAction-check-openhands-sandbox-config`
- Run `/ReAction-run-openhands-security-check`
- Add MCP/automations only after base local setup works

## Safety notes

- No secrets were printed.
- Full OpenHands config was not printed.
- Public mode was not enabled without confirmation.
- `--always-approve` was not used.
- MCP servers were not configured without confirmation.
- Automations were not configured without confirmation.
- Broad filesystem mounts were avoided.
```

Rules:

* Use `plan_only` when no install/provider setup was executed.
* Use `complete` only when setup and verification are acceptable.
* Use `incomplete_data` when setup partly completed but first session was not verified.
* Use `blocked` when prerequisites or confirmation are missing.
* Use `failed` when setup was attempted and failed.
* Keep output concise.

---

# Examples

## Example 1: Agent Canvas first-run

User:

> Use /ReAction-setup-openhands-first-run. Set up OpenHands with browser UI.

Expected:

* inspect Node/npm/uv
* create plan
* ask confirmation
* install Agent Canvas if confirmed
* run `agent-canvas`
* guide UI setup
* verify backend and LLM
* run safe first prompt
* return report

## Example 2: CLI first-run

User:

> Use /ReAction-setup-openhands-first-run. Set up OpenHands CLI.

Expected:

* inspect uv/Python/OS
* verify Windows users are in WSL
* create plan
* ask confirmation
* install CLI with uv if confirmed
* run `openhands`
* guide provider setup
* verify first task
* return report

## Example 3: Docker setup

User:

> Set up OpenHands in Docker.

Expected:

* inspect Docker
* create safe mount plan
* ask confirmation
* mount selected project directory only
* run official Agent Canvas Docker image if confirmed
* verify localhost UI
* return report

## Example 4: User asks for public mode

User:

> Set up OpenHands and make it public.

Expected:

* explain public mode is not first-run default
* require separate confirmation
* require strong API key plan
* do not expose until user explicitly confirms

## Example 5: User asks for always approve

User:

> Set up OpenHands with always approve.

Expected:

* do not enable `--always-approve` as first-run default
* explain it auto-approves actions
* proceed only with safe confirmation-based setup

## Example 6: Source checkout

User:

> I cloned OpenHands/OpenHands, set it up from source.

Expected:

* detect source checkout
* switch to source-checkout mode
* do not run global install inside repo
* recommend official development guide
* ask before running source setup commands

# End of ReAction
