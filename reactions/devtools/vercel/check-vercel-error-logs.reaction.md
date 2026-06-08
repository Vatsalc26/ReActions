---
id: check-vercel-error-logs
name: Check Vercel Error Logs
version: 0.1.0
description: Check Vercel runtime/error logs using CLI-only read-only commands, then produce a consistent log diagnosis report without exposing secrets.
category: devtools
subcategory: vercel
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_only
supported_project_policy: vercel_project_or_deployment_url
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
safety:
  read_only: true
  pause_on_missing_project_or_deployment: true
  pause_on_auth_required: true
  pause_on_ambiguous_deployment: true
  pause_on_sensitive_logs: true
  never_print_tokens: true
  never_print_secrets: true
  never_change_project_settings: true
  never_deploy: true
  never_redeploy: true
  never_promote: true
  never_rollback: true
  never_remove_deployments: true
---

# ReAction: Check Vercel Error Logs

## Purpose

Check Vercel runtime/error logs using CLI-only, read-only commands.

This ReAction is for repeated debugging checks such as:

- check latest deployment errors
- check production deployment logs
- check preview deployment logs
- summarize recent runtime errors
- find likely crash/error cause
- inspect logs for a specific deployment URL
- diagnose failed requests from logs
- extract error patterns without exposing secrets

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

## Important Scope

This is a CLI-only ReAction.

It must not use the browser or Vercel dashboard.

This ReAction is for runtime/error log reading and summarization.

Use:

- `/ReAction-check-vercel-analytics` for Web Analytics-style reporting.
- `/ReAction-check-vercel-usage` for billing/resource usage and costs.
- `/ReAction-check-vercel-deployment-status` for deployment state and health.
- `/ReAction-check-vercel-error-logs` for bounded runtime/error log diagnosis.

Do not confuse these.

This ReAction must not perform write actions.

## Official CLI Commands

This ReAction may use these read-only Vercel CLI commands:

- `vercel logs [deployment-url]`
- `vercel inspect [deployment-id-or-url] --logs`
- `vercel list`
- `vercel list [project-name]`

Use `vercel list` only when a deployment URL was not provided and the agent needs to identify the latest/relevant deployment.

Use `vercel inspect --logs` when useful for deployment-specific log context.

Use `vercel logs` for runtime logs for a selected deployment URL.

Avoid:

`vercel logs [deployment-url] --follow`

unless the user explicitly asks for live streaming logs.

Even if the user asks for live logs, prefer bounded logs for this ReAction. If live logs are truly needed, pause and confirm before using `--follow`.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Required capabilities:

- run terminal commands
- inspect current directory
- read command stdout/stderr
- read .vercel/project.json if present
- parse JSON, table, or text output
- detect errors, warnings, stack traces, HTTP status patterns, and repeated failures
- redact secrets or sensitive values from logs
- ask user for missing project/deployment/scope
- produce a final diagnosis report
- record phase progress

No browser capability is required.

If a capability is missing:

- continue only if safe
- clearly mark which step could not be completed
- never claim complete if logs were not checked

## Cross-platform Rules

This ReAction must work across:

- Windows
- macOS
- Linux

Rules:

- Prefer command execution as command + args, not shell strings.
- Do not rely on Unix-only commands like cat, grep, sed, awk, rm, tail, or date.
- Do not rely on Windows-only commands like dir, type, or PowerShell-specific syntax.
- Use file-read capability to inspect files instead of shell commands.
- Use terminal only for Vercel CLI commands.
- Do not print all environment variables.
- Do not print tokens or secrets.
- Do not pipe logs through OS-specific commands.

Preferred command representation:

```json
{
  "command": "vercel",
  "args": ["logs", "https://my-app-abc.vercel.app"]
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
- read-only logs commands for selected deployment URLs

Allowed examples:

- `{ "command": "vercel", "args": ["--version"] }`
- `{ "command": "vercel", "args": ["whoami"] }`
- `{ "command": "vercel", "args": ["logs", "https://my-app-abc.vercel.app"] }`
- `{ "command": "vercel", "args": ["inspect", "https://my-app-abc.vercel.app", "--logs"] }`
- `{ "command": "vercel", "args": ["list", "my-project"] }`

Forbidden examples:

- `{ "command": "vercel", "args": ["deploy"] }`
- `{ "command": "vercel", "args": ["redeploy"] }`
- `{ "command": "vercel", "args": ["promote"] }`
- `{ "command": "vercel", "args": ["rollback"] }`
- `{ "command": "vercel", "args": ["remove"] }`
- `{ "command": "vercel", "args": ["env", "rm"] }`
- `{ "command": "vercel", "args": ["domains", "rm"] }`
- `{ "command": "vercel", "args": ["logs", "https://my-app-abc.vercel.app", "--follow"] }`

`vercel logs --follow` is forbidden by default because it can stream continuously. It may only be used after explicit user confirmation.

## Sensitive Log Redaction Rules

Logs may contain secrets or private data.

The agent must redact likely sensitive values before including log excerpts in the final report.

Redact values that look like:

- API keys
- access tokens
- auth headers
- cookies
- session IDs
- bearer tokens
- database URLs
- connection strings
- private emails if not necessary
- phone numbers if not necessary
- long random strings
- environment variable values

Use placeholders like:

- `[REDACTED_TOKEN]`
- `[REDACTED_SECRET]`
- `[REDACTED_DATABASE_URL]`
- `[REDACTED_COOKIE]`

Do not include full raw logs in the final report unless the user explicitly asks and the logs are safe.

Prefer summaries and short redacted snippets.

## Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "log_request": {
    "project": "",
    "deploymentUrl": "",
    "target": "",
    "scope": "",
    "timeWindow": "",
    "errorFocus": "",
    "includeLiveFollow": false,
    "requestedDepth": "latest | specific | recent | failure_only"
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
    "inspectLogsCommand": {},
    "logsCommand": {},
    "readOnly": true,
    "expectedOutput": "json | table | text"
  },
  "log_result": {
    "project": "",
    "deploymentUrl": "",
    "target": "",
    "logSource": "",
    "rawOutputType": "",
    "errorCount": "",
    "warningCount": "",
    "topErrorPatterns": [],
    "notableLogLines": [],
    "likelyCause": "",
    "suggestedNextChecks": [],
    "limitations": []
  },
  "final_status": "not_started"
}
```

## Phase 1: Understand Log Request

### Skill

Vercel Log Request Parsing Skill

### Goal

Understand which Vercel logs the user wants and what kind of error diagnosis is needed.

### Detailed skill behavior

The agent should carefully extract the user’s intent from short natural-language requests.

The user may say:

- “check Vercel error logs”
- “check latest deployment logs”
- “why is my Vercel deployment failing?”
- “show runtime errors for project X”
- “check production errors”
- “check this deployment URL logs”
- “find 500 errors”
- “check logs for API route errors”
- “follow live logs”

The agent should normalize this into:

- project
- deployment URL if provided
- target: production, preview, latest, or unknown
- scope/team if provided
- time window if provided
- error focus if provided
- whether live follow was requested
- whether the task is failure-only or general log review

The agent must distinguish log diagnosis from analytics, usage, and deployment changes.

If the user asks about visitors/page views/referrers, redirect to `/ReAction-check-vercel-analytics`.

If the user asks about usage/cost/billing, redirect to `/ReAction-check-vercel-usage`.

If the user asks only for status/health, redirect to or use `/ReAction-check-vercel-deployment-status`.

If the user asks to redeploy, rollback, promote, remove, or change settings, block.

Required capabilities/tools:
- read/parse user input
- ask user for missing project/deployment/scope
- infer current project context in later phase if project is missing

Rules:
- If deployment URL is provided, prefer that specific deployment.
- If no deployment URL is provided, resolve project/latest deployment in later phases.
- If target is missing, default to latest deployment logs.
- If the user asks for “errors,” focus on error-like lines and patterns.
- If the user asks for “live logs” or “follow logs,” pause and confirm before using `--follow`.
- Do not continue if the request asks for deploy/redeploy/promote/rollback/remove.
- Do not guess between multiple projects.

Pause conditions:
- project/deployment is missing and cannot be inferred
- multiple deployments match and safest choice is unclear
- user asks for live streaming logs without confirming continuous behavior
- user asks for a write/change action
- user asks for analytics or usage instead of logs

Exit criteria:
- Log request is clear enough to query safely.

Phase output:
```json
{
  "project": "",
  "deploymentUrl": "",
  "target": "production | preview | latest | unknown",
  "scope": "",
  "timeWindow": "",
  "errorFocus": "",
  "includeLiveFollow": false,
  "requestedDepth": "latest | specific | recent | failure_only"
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
- `{ "command": "vercel", "args": ["logs", "--help"] }`
- `{ "command": "vercel", "args": ["inspect", "--help"] }`
- `{ "command": "vercel", "args": ["list", "--help"] }`

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
- current directory has no Vercel context and user did not provide project/deployment
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
  "safeToQueryLogs": true
}
```

## Phase 3: Resolve Deployment for Logs

### Skill

Deployment Selection Skill

### Goal

Select the correct deployment URL to use for log retrieval.

### Detailed skill behavior

The agent should choose the minimum safe path.

If a deployment URL is provided:

- validate that it looks like a deployment URL
- use it directly for logs/inspect

If no deployment URL is provided but project is known:

- run `vercel list <project-name>`
- select the latest/relevant deployment based on user request
- if target is production/preview and the output makes this clear, use the matching deployment
- if multiple deployments match, pause and ask

If no project is provided but local project context exists:

- run `vercel list`
- select the latest/relevant deployment from the current project

If the latest deployment appears failed or erroring:

- prefer `vercel inspect <deployment> --logs` if that provides better context
- use `vercel logs <deployment-url>` for runtime log lines

Required capabilities/tools:
- run terminal commands
- read stdout/stderr
- parse deployment list output
- ask user when ambiguous

Safe commands:
- `{ "command": "vercel", "args": ["list"] }`
- `{ "command": "vercel", "args": ["list", "<project-name>"] }`

Rules:
- Do not inspect unrelated projects.
- Do not select between multiple plausible deployments without confidence.
- Do not run write commands.
- Do not use shell-specific parsing commands.
- Do not use logs until a deployment URL is selected.

Pause conditions:
- project is ambiguous
- no deployment can be identified
- multiple deployments match the request
- deployment URL is malformed
- permission is denied

Exit criteria:
- A deployment URL or deployment identifier is selected.

Phase output:
```json
{
  "selectedDeployment": "",
  "selectionReason": "",
  "target": "",
  "project": ""
}
```

## Phase 4: Build Safe Log Command Plan

### Skill

Read-only Log Command Planning Skill

### Goal

Build a safe cross-platform command plan to retrieve bounded logs.

### Detailed skill behavior

The agent should build a minimal read-only log plan.

Default log command:
```json
{
  "command": "vercel",
  "args": ["logs", "<deployment-url>"]
}
```

Optional inspect-with-logs command:
```json
{
  "command": "vercel",
  "args": ["inspect", "<deployment-url>", "--logs"]
}
```

Only use live follow after explicit confirmation:
```json
{
  "command": "vercel",
  "args": ["logs", "<deployment-url>", "--follow"]
}
```

For this ReAction, bounded logs are preferred.

Required capabilities/tools:
- construct terminal commands
- validate command args
- ask user if live follow is requested

Rules:
- Use command+args when possible.
- Never include tokens in command args.
- Do not run write commands.
- Do not run `vercel logs --follow` unless explicitly confirmed.
- Do not stream indefinitely.
- Do not query unrelated deployments.
- Do not use shell syntax that breaks on Windows/macOS/Linux.

Pause conditions:
- deployment URL is missing
- deployment selection is ambiguous
- user requested live follow and has not confirmed continuous streaming
- command safety cannot be verified

Exit criteria:
- A safe log command plan is ready.

Phase output:
```json
{
  "logsCommand": {},
  "inspectLogsCommand": {},
  "includeLiveFollow": false,
  "readOnly": true
}
```

## Phase 5: Execute Log Commands

### Skill

Safe CLI Execution Skill

### Goal

Run the selected read-only log commands and capture output safely.

### Detailed skill behavior

The agent should execute only selected read-only commands.

The agent should:
- Run inspect-with-logs command if planned.
- Run logs command if planned.
- Capture stdout and stderr.
- Detect authentication errors.
- Detect permission errors.
- Detect missing deployment errors.
- Detect no-log cases.
- Stop on interactive prompts.
- Avoid continuous streaming unless explicitly confirmed.

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
- Do not run `vercel logs --follow` unless explicitly confirmed.
- If logs contain sensitive-looking values, redact them before reporting.

Common failure cases:
- command not found
- auth required
- permission denied
- deployment not found
- logs unavailable
- output not parseable
- no logs for deployment
- network failure
- command streams indefinitely

Pause conditions:
- auth/login required
- permission denied
- deployment is ambiguous
- command asks for interactive confirmation
- user lacks permission to view logs
- live stream would be needed to continue

Exit criteria:
- Log output is captured or a clear blocked reason is known.

Phase output:
```json
{
  "status": "succeeded | blocked | failed",
  "rawOutputType": "json | table | text | error",
  "logSource": "vercel logs | vercel inspect --logs",
  "errorSummary": ""
}
```

## Phase 6: Parse, Redact, and Diagnose Logs

### Skill

Log Parsing, Redaction & Diagnosis Skill

### Goal

Turn raw Vercel logs into a safe, useful diagnosis report.

### Detailed skill behavior

The agent should parse logs and look for:
- error lines
- warning lines
- stack traces
- HTTP 4xx/5xx patterns
- runtime crashes
- build/runtime mismatch hints
- missing environment variable messages
- module import errors
- database connection errors
- timeout errors
- memory errors
- API route failures
- repeated identical errors
- first error occurrence
- most recent error occurrence

The agent should group repeated errors into patterns.
The agent should extract short redacted snippets only when helpful.
The agent must redact sensitive data before reporting.

Required capabilities/tools:
- parse text output
- identify error/warning patterns
- redact secrets
- summarize repeated patterns
- avoid exposing raw sensitive output

Redaction rules:

Redact:
- bearer tokens
- cookies
- auth headers
- API keys
- private keys
- database URLs
- connection strings
- access tokens
- session IDs
- long random secret-like values
- unnecessary personal data

Use placeholders:
- `[REDACTED_TOKEN]`
- `[REDACTED_SECRET]`
- `[REDACTED_DATABASE_URL]`
- `[REDACTED_COOKIE]`

Rules:
- Do not include full raw logs by default.
- Do not expose secrets.
- Do not invent root causes.
- Separate confirmed facts from likely causes.
- If logs are empty, say logs were empty/unavailable.
- If output is truncated, mention truncation.
- If only warnings appear, do not call them errors.
- If logs are too sensitive, summarize without snippets.

Pause conditions:
- logs appear highly sensitive and cannot be safely summarized
- output is too ambiguous to diagnose
- user confirmation is needed before showing snippets

Exit criteria:
- Logs are parsed, redacted, and summarized.

Phase output:
```json
{
  "errorCount": "",
  "warningCount": "",
  "topErrorPatterns": [],
  "notableLogLines": [],
  "likelyCause": "",
  "suggestedNextChecks": [],
  "limitations": []
}
```

## Phase 7: Generate Final Error Logs Report

### Skill

Consistent Error Log Reporting Skill

### Goal

Give the user the same error-log diagnosis report structure every time.

### Detailed skill behavior

The final report should be concise, consistent, and honest.

It should include:
- status
- project
- deployment URL
- log source
- error count if available
- warning count if available
- top error patterns
- redacted notable snippets
- likely cause
- suggested next checks
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
- Do not call the result `complete` if logs were not checked.
- Use `blocked` if CLI/auth/permission/deployment ambiguity prevents the query.
- Use `incomplete_data` if logs were checked but output was partial or missing key fields.
- Do not claim deployment was changed.
- Do not claim analytics or usage/cost were checked.
- Mention parsing limitations if output was table/text.
- Mention that no deploy/write command was run.

Final report format:
```markdown
# Vercel Error Logs Report

Status: complete | blocked | failed | incomplete_data
Project: <project or unavailable>
Deployment: <deployment-url or unavailable>
Log source: <vercel logs | vercel inspect --logs>

## Summary

- Errors found: <count or unavailable>
- Warnings found: <count or unavailable>
- Most likely issue: <short summary or unavailable>

## Top error patterns

1. <pattern> — <count or frequency if available>
2. ...

## Notable redacted log snippets

```txt
<short redacted snippet>
```

## Suggested next checks

- <next check>
- <next check>

## Notes

- <limitations>
- Sensitive values were redacted.
- No deploy/write command was run.
- No project settings were changed.
```

## Examples

### Example 1: Latest error logs

User:
> Use /ReAction-check-vercel-error-logs. Check latest Vercel error logs.

Expected:
- verify CLI/auth
- resolve latest deployment
- run bounded logs command
- summarize error patterns
- redact sensitive values

### Example 2: Specific deployment URL

User:
> Use /ReAction-check-vercel-error-logs. Check logs for https://my-app-abc.vercel.app.

Expected:
- use provided deployment URL
- run `vercel logs <deployment-url>`
- summarize errors/warnings
- redact secrets

### Example 3: Failed deployment diagnosis

User:
> Use /ReAction-check-vercel-error-logs. Why did my latest deployment fail?

Expected:
- resolve latest deployment
- use inspect/logs as needed
- summarize likely failure cause
- do not redeploy or rollback

### Example 4: API route errors

User:
> Use /ReAction-check-vercel-error-logs. Check API route errors for my production deployment.

Expected:
- resolve production deployment
- read logs
- focus on API route/runtime errors
- summarize relevant patterns

### Example 5: Live logs requested

User:
> Use /ReAction-check-vercel-error-logs. Follow live logs for my deployment.

Expected:
- pause and confirm before using `--follow`
- explain that live logs may stream continuously
- prefer bounded logs unless the user confirms

### Example 6: User asks to fix by redeploying

User:
> Use /ReAction-check-vercel-error-logs. Check logs and redeploy if needed.

Expected:
- block redeploy
- explain this ReAction is read-only
- provide diagnosis only
- suggest a separate verified redeploy ReAction only if intentionally designed later

## End of ReAction
