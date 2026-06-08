---
id: check-vercel-deployment-status
name: Check Vercel Deployment Status
version: 0.1.0
description: Check recent Vercel deployment status using CLI-only read-only commands, then produce a consistent deployment health report.
category: devtools
subcategory: vercel
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_only
supported_project_policy: vercel_project_or_named_project
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
safety:
  read_only: true
  pause_on_missing_project: true
  pause_on_auth_required: true
  pause_on_ambiguous_deployment: true
  pause_on_logs_requested_for_sensitive_project: true
  never_print_tokens: true
  never_change_project_settings: true
  never_deploy: true
  never_redeploy: true
  never_promote: true
  never_rollback: true
  never_remove_deployments: true
---

# ReAction: Check Vercel Deployment Status

## Purpose

Check recent Vercel deployment status using CLI-only, read-only commands.

This ReAction is for repeated deployment checks such as:

- latest production deployment status
- latest preview deployment status
- latest deployment for a project
- status of a specific deployment URL
- whether the last deployment succeeded or failed
- basic failure diagnosis when status is failed
- optional runtime/build log check when explicitly needed

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

## Important Scope

This is a CLI-only ReAction.

It must not use the browser or Vercel dashboard.

This ReAction is for deployment status, not analytics or usage.

Use:

- `/ReAction-check-vercel-analytics` for Web Analytics-style reporting.
- `/ReAction-check-vercel-usage` for billing/resource usage and costs.
- `/ReAction-check-vercel-deployment-status` for deployment state and health.

Do not confuse these.

## Official CLI Commands

This ReAction may use these read-only Vercel CLI commands:

- `vercel list`
- `vercel list <project-name>`
- `vercel inspect <deployment-id-or-url>`
- `vercel inspect <deployment-id-or-url> --logs`
- `vercel logs <deployment-url>`

Use `vercel logs` only when needed for failure diagnosis or when the user asks for logs.

Do not use write commands.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Required capabilities:

- run terminal commands
- inspect current directory
- read command stdout/stderr
- read .vercel/project.json if present
- parse JSON, table, or text output
- ask user for missing project/deployment/scope
- produce a final report
- record phase progress

No browser capability is required.

If a capability is missing:

- continue only if safe
- clearly mark which step could not be completed
- never claim complete if deployment status was not checked

## Cross-platform Rules

This ReAction must work across:

- Windows
- macOS
- Linux

Rules:

- Prefer command execution as command + args, not shell strings.
- Do not rely on Unix-only commands like cat, grep, sed, awk, rm, or date.
- Do not rely on Windows-only commands like dir, type, or PowerShell-specific syntax.
- Use file-read capability to inspect files instead of shell commands.
- Use terminal only for Vercel CLI commands.
- Do not print all environment variables.
- Do not print tokens or secrets.

Preferred command representation:

```json
{
  "command": "vercel",
  "args": ["list"]
}
```

Shell strings are acceptable only if the runner has no command+args interface.

## Read-only Safety Rules

The agent must not run commands that:

- deploy
- redeploy
- promote
- rollback
- remove deployments
- change domains
- change environment variables
- change project settings
- change billing settings
- create tokens
- print tokens or secrets

Allowed command types:

- version checks
- auth identity checks
- help commands
- read-only deployment list commands
- read-only deployment inspect commands
- read-only logs commands when necessary

Allowed examples:

- `{ "command": "vercel", "args": ["--version"] }`
- `{ "command": "vercel", "args": ["whoami"] }`
- `{ "command": "vercel", "args": ["list"] }`
- `{ "command": "vercel", "args": ["list", "my-project"] }`
- `{ "command": "vercel", "args": ["inspect", "https://my-app-abc.vercel.app"] }`
- `{ "command": "vercel", "args": ["logs", "https://my-app-abc.vercel.app"] }`

Forbidden examples:

- `{ "command": "vercel", "args": ["deploy"] }`
- `{ "command": "vercel", "args": ["redeploy"] }`
- `{ "command": "vercel", "args": ["promote"] }`
- `{ "command": "vercel", "args": ["rollback"] }`
- `{ "command": "vercel", "args": ["remove"] }`
- `{ "command": "vercel", "args": ["env", "rm"] }`
- `{ "command": "vercel", "args": ["domains", "rm"] }`

## Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "deployment_request": {
    "project": "",
    "deploymentUrl": "",
    "target": "",
    "scope": "",
    "includeLogs": false,
    "requestedDepth": "latest | specific | recent"
  },
  "cli_context": {
    "os": "",
    "cwd": "",
    "vercelCliInstalled": false,
    "authenticated": false,
    "userOrTeam": "",
    "projectContext": "",
    "scopeConfidence": ""
  },
  "command_plan": {
    "listCommand": {},
    "inspectCommand": {},
    "logsCommand": {},
    "readOnly": true,
    "expectedOutput": "json | table | text"
  },
  "deployment_result": {
    "project": "",
    "deploymentUrl": "",
    "target": "",
    "status": "",
    "createdAt": "",
    "age": "",
    "creator": "",
    "branch": "",
    "commit": "",
    "domains": [],
    "inspectSummary": "",
    "logSummary": "",
    "limitations": []
  },
  "final_status": "not_started"
}
```

## Phase 1: Understand Deployment Request

### Skill

Deployment Status Request Parsing Skill

### Goal

Understand what deployment status the user wants.

### Detailed skill behavior

The agent should carefully extract the user’s intent from short natural-language requests.

The user may say:

- “check latest Vercel deployment”
- “check production deployment status”
- “check preview deployment”
- “check deployment for project X”
- “check this deployment URL”
- “why did my last Vercel deployment fail?”
- “show logs for the failed deployment”

The agent should normalize this into:

- project
- deployment URL if provided
- target: production, preview, or unknown
- scope/team if provided
- whether logs are requested
- whether to inspect latest or a specific deployment

The agent must distinguish deployment status from analytics and usage.

If the user asks about visitors/page views/referrers, redirect to `/ReAction-check-vercel-analytics`.

If the user asks about usage/cost/billing, redirect to `/ReAction-check-vercel-usage`.

Required capabilities/tools:
- read/parse user input
- ask user for missing project/deployment/scope
- infer current project context in later phase if project is missing

Rules:
- If deployment URL is provided, prefer inspecting that specific deployment.
- If project is provided but no deployment URL is provided, list recent deployments and inspect the most relevant latest deployment.
- If no project is provided, try to infer current project from local Vercel context in a later phase.
- If target is missing, default to latest deployment unless user specifically asks for production or preview.
- If logs are requested, use logs only for the selected deployment.
- Do not continue if the request asks for deploy/redeploy/promote/rollback/remove.
- Do not guess between multiple projects.

Pause conditions:
- project is missing and cannot be inferred
- multiple deployments match the request and safest choice is unclear
- user asks for a write/change action
- user asks to deploy, redeploy, promote, rollback, or remove a deployment
- user asks for analytics or usage instead of deployment status

Exit criteria:
- Deployment request is clear enough to query safely.

Phase output:
```json
{
  "project": "",
  "deploymentUrl": "",
  "target": "production | preview | latest | unknown",
  "scope": "",
  "includeLogs": false,
  "requestedDepth": "latest | specific | recent"
}
```

## Phase 2: Verify CLI Environment

### Skill

Vercel CLI Readiness Skill

### Goal

Confirm the local machine can run safe Vercel CLI commands.

### Detailed skill behavior

The agent should verify the CLI environment without making changes.

The agent should:

- Check whether vercel is available.
- Check Vercel CLI version.
- Check whether the user is authenticated.
- Identify current user/team context if available.
- Inspect current project context if `.vercel/project.json` exists.
- Avoid exposing tokens, secrets, or full environment dumps.

The agent should not attempt to log in automatically.
The agent should not run interactive setup commands.

Required capabilities/tools:
- run terminal commands
- read stdout/stderr
- inspect current directory
- read files
- ask user if login or project context is missing

Safe commands:

Use command+args format when possible:
- `{ "command": "vercel", "args": ["--version"] }`
- `{ "command": "vercel", "args": ["whoami"] }`
- `{ "command": "vercel", "args": ["list", "--help"] }`
- `{ "command": "vercel", "args": ["inspect", "--help"] }`

Read `.vercel/project.json` using file-read capability if present.

Rules:
- Do not run `vercel login` automatically.
- Do not print tokens.
- Do not run `env`, `printenv`, `set`, or any equivalent full environment dump.
- Do not run deploy/write commands.
- Do not inspect unrelated directories.
- Do not modify `.vercel/` config.
- If the user is not authenticated, pause and ask the user to log in manually.

Pause conditions:
- Vercel CLI is missing
- user is not authenticated
- project/team scope is ambiguous
- current directory has no Vercel context and user did not provide project
- terminal command capability is unavailable

Exit criteria:
- Vercel CLI/auth/project context is known or a clear blocker is known.

Phase output:
```json
{
  "vercelCliInstalled": true,
  "authenticated": true,
  "projectContext": "",
  "userOrTeam": "",
  "safeToQueryDeployments": true
}
```

## Phase 3: Build Safe Deployment Query Plan

### Skill

Read-only Deployment Command Planning Skill

### Goal

Build a safe cross-platform command plan to list and/or inspect deployments.

### Detailed skill behavior

The agent should choose the minimum commands needed.

If a deployment URL is provided:
```json
{
  "command": "vercel",
  "args": ["inspect", "<deployment-url>"]
}
```

If no deployment URL is provided but project is known:
```json
{
  "command": "vercel",
  "args": ["list", "<project-name>"]
}
```

If no project is provided but local project context exists:
```json
{
  "command": "vercel",
  "args": ["list"]
}
```

After selecting the latest/relevant deployment from `vercel list`, inspect it:
```json
{
  "command": "vercel",
  "args": ["inspect", "<deployment-url-or-id>"]
}
```

Use logs only if requested or if the inspected deployment appears failed and a short diagnosis is needed:
```json
{
  "command": "vercel",
  "args": ["logs", "<deployment-url>"]
}
```

Required capabilities/tools:
- construct terminal commands
- validate command args
- ask user if project/deployment/scope remains unclear

Rules:
- Use command+args when possible.
- Never include tokens in command args.
- Do not run write commands.
- Do not run `vercel logs --follow` unless explicitly requested, because it may stream indefinitely.
- Prefer non-follow logs for a bounded report.
- Do not query unrelated projects.
- Do not inspect multiple deployments unless needed to choose the requested one.
- Do not use shell syntax that breaks on Windows/macOS/Linux.

Pause conditions:
- project/scope is still ambiguous
- deployment URL is malformed
- multiple deployments match and safest choice is unclear
- command safety cannot be verified

Exit criteria:
- A safe deployment query plan is ready.

Phase output:
```json
{
  "listCommand": {},
  "inspectCommand": {},
  "logsCommand": {},
  "includeLogs": false,
  "readOnly": true
}
```

## Phase 4: Execute Deployment Commands

### Skill

Safe CLI Execution Skill

### Goal

Run the selected read-only deployment commands and capture output safely.

### Detailed skill behavior

The agent should execute only the selected read-only commands.

The agent should:
- Run list command if needed.
- Capture stdout/stderr.
- Select the latest or requested deployment.
- Run inspect command.
- Run logs command only if allowed by the plan.
- Detect authentication errors.
- Detect permission errors.
- Detect missing project or deployment errors.
- Stop on interactive prompts.

At most one retry is allowed only when the failure is clearly transient and does not require user input.

Required capabilities/tools:
- run terminal command
- read stdout/stderr
- detect command failure
- ask user when blocked

Rules:
- Run only read-only commands.
- Do not echo secrets.
- Do not retry more than once.
- Do not respond to interactive prompts automatically.
- Do not run deploy/redeploy/promote/rollback/remove as fallback.
- Do not run `vercel logs --follow` unless explicitly requested.

Common failure cases:
- command not found
- auth required
- permission denied
- invalid project
- deployment not found
- output not parseable
- logs unavailable
- network failure

Pause conditions:
- auth/login required
- permission denied
- project is ambiguous
- deployment is ambiguous
- command asks for interactive confirmation
- user lacks permission to view deployment status

Exit criteria:
- Deployment output is captured or a clear blocked reason is known.

Phase output:
```json
{
  "status": "succeeded | blocked | failed",
  "rawOutputType": "json | table | text | error",
  "selectedDeployment": "",
  "errorSummary": ""
}
```

## Phase 5: Parse Deployment Status

### Skill

Deployment Status Parsing Skill

### Goal

Turn Vercel CLI output into a consistent deployment status report.

### Detailed skill behavior

The agent should parse `vercel list`, `vercel inspect`, and optional `vercel logs` output into normalized fields.

Normalize:
- project
- deployment URL
- target/environment
- deployment status
- age/created time
- branch
- commit if available
- creator if available
- domains if available
- failure reason if available
- log summary if logs were checked
- limitations

If output is not machine-readable, parse conservatively and report limitations.

Required capabilities/tools:
- parse JSON/table/text output
- normalize fields
- detect missing fields

Rules:
- Do not invent missing values.
- Do not overclaim precision.
- If status is failed, summarize known failure clues only.
- If logs are unavailable, say so.
- Do not expose sensitive logs unnecessarily.
- Do not include secrets from logs.
- Preserve only user-relevant deployment facts.

Pause conditions:
- Pause only if output is too ambiguous to summarize safely.

Exit criteria:
- Deployment status is normalized.

Phase output:
```json
{
  "project": "",
  "deploymentUrl": "",
  "target": "",
  "status": "",
  "createdAt": "",
  "age": "",
  "creator": "",
  "branch": "",
  "commit": "",
  "domains": [],
  "inspectSummary": "",
  "logSummary": "",
  "limitations": []
}
```

## Phase 6: Generate Final Deployment Report

### Skill

Consistent Deployment Reporting Skill

### Goal

Give the user the same deployment status report structure every time.

### Detailed skill behavior

The final report should be concise, consistent, and honest.

It should include:
- status
- project
- deployment URL
- target/environment
- deployment status
- created/age
- branch/commit if available
- domains if available
- failure/log summary if available
- limitations
- assurance that no write commands were run

The final report should not include secrets, tokens, or unnecessary private account details.

Required capabilities/tools:
- Write final response.

Status values:
- `complete`
- `blocked`
- `failed`
- `incomplete_data`

Rules:
- Do not call the result `complete` if no deployment status was checked.
- Use `blocked` if CLI/auth/permission/scope prevents the query.
- Use `incomplete_data` if deployment status was checked but some fields were unavailable.
- Do not claim analytics or usage/cost were checked.
- Mention parsing limitations if output was table/text.
- Mention that no deploy/write command was run.

Final report format:
```markdown
# Vercel Deployment Status Report

Status: complete | blocked | failed | incomplete_data
Project: <project or unavailable>
Deployment: <deployment-url or unavailable>
Target: <production | preview | unknown>

## Deployment

- Status: <ready | building | error | canceled | unavailable>
- Created: <timestamp or unavailable>
- Age: <value or unavailable>
- Branch: <branch or unavailable>
- Commit: <commit or unavailable>
- Creator: <creator or unavailable>

## Domains / URLs

- <url>

## Diagnosis

- <failure summary or "No failure details found">

## Notes

- <limitations>
- No deploy/write command was run.
- No project settings were changed.
```

## Examples

### Example 1: Latest deployment

User:
> Use /ReAction-check-vercel-deployment-status. Check my latest Vercel deployment.

Expected:
- verify CLI/auth
- list recent deployments
- select latest
- inspect selected deployment
- report status

### Example 2: Production deployment

User:
> Use /ReAction-check-vercel-deployment-status. Check production deployment for project my-app.

Expected:
- list deployments for my-app
- select relevant production deployment if identifiable
- inspect it
- report status

### Example 3: Specific deployment URL

User:
> Use /ReAction-check-vercel-deployment-status. Check https://my-app-abc.vercel.app.

Expected:
- inspect that deployment URL
- report status

### Example 4: Failed deployment with logs

User:
> Use /ReAction-check-vercel-deployment-status. Check why my latest Vercel deployment failed.

Expected:
- list latest deployment
- inspect it
- include bounded logs if needed
- summarize failure clues
- do not stream logs indefinitely

### Example 5: User asks to redeploy

User:
> Use /ReAction-check-vercel-deployment-status. Redeploy the failed deployment.

Expected:
- block the write action
- explain this ReAction is read-only
- suggest a separate verified redeploy ReAction only if intentionally designed later

## End of ReAction
