---
id: check-vercel-usage
name: Check Vercel Usage
version: 0.1.0
description: Check Vercel billing/resource usage for a date range using the official Vercel CLI, then produce a consistent read-only usage and cost report.
category: devtools
subcategory: vercel
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_only
supported_project_policy: vercel_account_or_team_scope
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
safety:
  read_only: true
  pause_on_missing_date_range: false
  pause_on_auth_required: true
  pause_on_ambiguous_scope: true
  never_print_tokens: true
  never_change_project_settings: true
  never_change_billing_settings: true
  never_deploy: true
---

# ReAction: Check Vercel Usage

## Purpose

Check Vercel billing/resource usage using the official Vercel CLI.

This ReAction is for repeated usage checks such as:

- today
- yesterday
- a specific date
- last 7 days
- this month
- current billing period
- a custom date range
- a specific Vercel team/scope

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

## Important Scope

This is a CLI-only ReAction.

It must not use the browser or Vercel dashboard.

This ReAction is for Vercel usage/cost/resource reporting, such as:

- service usage
- effective cost
- billed cost
- per-service breakdown
- daily/weekly/monthly usage breakdown
- grand total for the selected period

This ReAction is not for Vercel Web Analytics.

If the user asks about visitors, page views, top pages, referrers, countries, browsers, devices, or custom events, pause and redirect to:

`/ReAction-check-vercel-analytics`

Do not call usage/cost data “analytics.”

## Official CLI Command

This ReAction uses the official Vercel CLI command:

`vercel usage`

Supported command forms include:

- `vercel usage`
- `vercel usage --from <YYYY-MM-DD> --to <YYYY-MM-DD>`
- `vercel usage --from <YYYY-MM-DD> --to <YYYY-MM-DD> --breakdown daily --format json`

The ReAction should prefer JSON output:

`vercel usage --format json`

When using date ranges:

- `--from` and `--to` must be used together.
- `--from` is interpreted as midnight in Los Angeles/Pacific time.
- `--to` is interpreted as end of day, 23:59:59, in Los Angeles/Pacific time.
- `--breakdown` can be daily, weekly, or monthly.
- JSON output includes period, context, services, totals, and charge count.
- With breakdown mode, JSON includes a breakdown array and grand total.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Required capabilities:

- run terminal commands
- inspect current directory
- read command stdout/stderr
- parse JSON output
- parse table/text output if JSON is unavailable
- get current date
- ask user for missing date/scope
- produce a final report
- record phase progress

No browser capability is required.

If a capability is missing:

- continue only if safe
- clearly mark which step could not be completed
- never claim complete if usage data was not fetched

## Cross-platform Rules

This ReAction must work across:

- Windows
- macOS
- Linux

Rules:

- Prefer command execution as command + args, not shell strings.
- Do not rely on Unix-only commands like cat, grep, sed, awk, rm, or date.
- Do not rely on Windows-only commands like dir, type, or PowerShell-specific syntax.
- Use runner/native date handling for today, yesterday, and date ranges.
- Use terminal only for Vercel CLI commands.
- Do not print all environment variables.
- Do not print tokens or secrets.

Preferred command representation:

```json
{
  "command": "vercel",
  "args": ["usage", "--from", "2026-06-08", "--to", "2026-06-08", "--breakdown", "daily", "--format", "json"]
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
- read-only usage commands

Allowed examples:

- `{ "command": "vercel", "args": ["--version"] }`
- `{ "command": "vercel", "args": ["whoami"] }`
- `{ "command": "vercel", "args": ["usage", "--help"] }`
- `{ "command": "vercel", "args": ["usage", "--format", "json"] }`

Forbidden examples:

- `{ "command": "vercel", "args": ["deploy"] }`
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
  "usage_request": {
    "dateRangeText": "",
    "from": "",
    "to": "",
    "breakdown": "",
    "scope": "",
    "timezoneNote": ""
  },
  "cli_context": {
    "os": "",
    "cwd": "",
    "vercelCliInstalled": false,
    "authenticated": false,
    "userOrTeam": "",
    "scope": "",
    "scopeConfidence": ""
  },
  "command_plan": {
    "command": "",
    "args": [],
    "readOnly": true,
    "expectedOutput": "json"
  },
  "usage_result": {
    "period": "",
    "context": "",
    "services": [],
    "totals": {},
    "breakdown": [],
    "grandTotal": {},
    "chargeCount": "",
    "limitations": []
  },
  "final_status": "not_started"
}
```

## Phase 1: Understand Usage Request

### Skill

Vercel Usage Request Parsing Skill

### Goal

Understand what usage/cost data the user wants and normalize the date range, breakdown, and scope.

### Detailed skill behavior

The agent should carefully extract the user’s intent from short natural-language requests.

The user may say:

- “check Vercel usage today”
- “check Vercel cost for yesterday”
- “usage for last 7 days”
- “billing usage this month”
- “usage for team X”
- “daily Vercel usage for project/account X”

The agent should normalize this into:

- from date
- to date
- breakdown
- scope/team if provided
- whether the user wants current billing period or a custom range

The agent must distinguish usage/cost from Web Analytics.

If the user asks about visitors, page views, referrers, top pages, countries, browsers, devices, or custom events, treat that as Web Analytics and redirect to `/ReAction-check-vercel-analytics`.

Required capabilities/tools:
- read/parse user input
- get current date
- infer local timezone if available
- ask user for missing date/scope

Rules:
- If no date is given, use current billing period.
- If user says today, use today’s date for both `--from` and `--to`.
- If user says yesterday, use yesterday’s date for both `--from` and `--to`.
- If user asks for last 7 days, calculate from/to dates.
- If user asks for daily report, use `--breakdown daily`.
- If user asks for weekly or monthly report, use `--breakdown weekly` or `--breakdown monthly`.
- If user provides a scope/team, preserve it.
- If scope is ambiguous, pause and ask.
- Mention that Vercel date boundaries are interpreted in Los Angeles/Pacific time when using `--from` and `--to`.
- Do not continue if the request is for Web Analytics.
- Do not continue if the request asks for a write/change action.

Pause conditions:
- date range is ambiguous
- scope/team is ambiguous
- user asks for Web Analytics instead of usage/cost
- user asks to change billing settings
- user asks to deploy, change settings, or alter resources

Exit criteria:
- Usage request is clear and normalized.

Phase output:
```json
{
  "from": "YYYY-MM-DD",
  "to": "YYYY-MM-DD",
  "breakdown": "daily | weekly | monthly | none",
  "scope": "",
  "timezoneNote": ""
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
- Identify the current user/team context if available.
- Avoid exposing tokens, secrets, or full environment dumps.

The agent should not attempt to log in automatically.
The agent should not run interactive setup commands.

Required capabilities/tools:
- run terminal commands
- read stdout/stderr
- ask user if login or scope is missing

Safe commands:

Use command+args format when possible:
- `{ "command": "vercel", "args": ["--version"] }`
- `{ "command": "vercel", "args": ["whoami"] }`
- `{ "command": "vercel", "args": ["usage", "--help"] }`

Rules:
- Do not run `vercel login` automatically.
- Do not print tokens.
- Do not run `env`, `printenv`, `set`, or any equivalent full environment dump.
- Do not run deploy/write commands.
- Do not inspect unrelated directories.
- If the user is not authenticated, pause and ask the user to log in manually.

Pause conditions:
- Vercel CLI is missing
- user is not authenticated
- scope/team is ambiguous
- terminal command capability is unavailable
- the user does not have permission to view usage

Exit criteria:
- Vercel CLI/auth/scope context is known or a clear blocker is known.

Phase output:
```json
{
  "vercelCliInstalled": true,
  "authenticated": true,
  "userOrTeam": "",
  "scope": "",
  "safeToQueryUsage": true
}
```

## Phase 3: Build Safe Usage Command

### Skill

Read-only Usage Command Construction Skill

### Goal

Build a cross-platform, read-only vercel usage command for the requested date range.

### Detailed skill behavior

The agent should construct the safest official Vercel CLI command.

If no date range is requested:
```json
{
  "command": "vercel",
  "args": ["usage", "--format", "json"]
}
```

If a date range is requested:
```json
{
  "command": "vercel",
  "args": ["usage", "--from", "YYYY-MM-DD", "--to", "YYYY-MM-DD", "--format", "json"]
}
```

If breakdown is requested:
```json
{
  "command": "vercel",
  "args": ["usage", "--from", "YYYY-MM-DD", "--to", "YYYY-MM-DD", "--breakdown", "daily", "--format", "json"]
}
```

If scope is provided and required:
```json
{
  "command": "vercel",
  "args": ["usage", "--scope", "<scope>", "--from", "YYYY-MM-DD", "--to", "YYYY-MM-DD", "--breakdown", "daily", "--format", "json"]
}
```

Required capabilities/tools:
- construct terminal command
- validate command args
- ask user if scope/date remains unclear

Rules:
- Use command+args when possible.
- Never include tokens in command args.
- Prefer JSON output with `--format json`.
- Use `--from` and `--to` together.
- Use `--breakdown` only when requested or helpful.
- Use only daily, weekly, or monthly for breakdown.
- Do not query outside the requested date range.
- Do not run any command with write behavior.
- Do not use shell syntax that breaks on Windows/macOS/Linux.

Pause conditions:
- scope/team is still ambiguous
- date range cannot be normalized
- command safety cannot be verified

Exit criteria:
- A safe usage command is ready.

Phase output:
```json
{
  "command": "vercel",
  "args": [],
  "expectedOutput": "json",
  "readOnly": true
}
```

## Phase 4: Execute Usage Command

### Skill

Safe CLI Execution Skill

### Goal

Run the usage command and capture output safely.

### Detailed skill behavior

The agent should execute only the selected read-only usage command.

The agent should:
- Run the command.
- Capture stdout and stderr.
- Detect authentication errors.
- Detect permission errors.
- Detect invalid date range errors.
- Detect invalid scope errors.
- Detect no-data cases.
- Detect JSON parseability.
- Stop on interactive prompts.

At most one retry is allowed only when the failure is clearly transient and does not require user input.

Required capabilities/tools:
- run terminal command
- read stdout/stderr
- detect command failure
- ask user when blocked

Rules:
- Run only the selected read-only command.
- Do not echo secrets.
- Do not retry more than once.
- Do not respond to interactive prompts automatically.
- If the command asks for login, token, confirmation, setup, or dashboard action, pause.
- Do not run fallback write commands.

Common failure cases:
- command not found
- auth required
- permission denied
- invalid scope
- invalid date range
- JSON output unavailable
- network failure
- no usage data for period
- output not parseable

Pause conditions:
- auth/login required
- permission denied
- scope is ambiguous
- command asks for interactive confirmation
- user lacks permission to view usage

Exit criteria:
- Usage output is captured or a clear blocked reason is known.

Phase output:
```json
{
  "status": "succeeded | blocked | failed",
  "rawOutputType": "json | table | text | error",
  "errorSummary": ""
}
```

## Phase 5: Parse Usage Output

### Skill

Vercel Usage Parsing Skill

### Goal

Turn Vercel CLI output into a consistent usage/cost report.

### Detailed skill behavior

The agent should parse JSON output first.

Expected JSON fields may include:
- `period`
- `context`
- `services`
- `totals`
- `chargeCount`
- `breakdown`
- `grandTotal`

The agent should normalize raw output into:
- period
- context/scope
- total usage
- effective cost
- billed cost
- service rows
- top services by billed cost
- top services by effective cost
- breakdown rows if available
- limitations

If JSON is unavailable, parse clearly structured table/text output cautiously and mention limitations.

Required capabilities/tools:
- parse JSON
- parse simple tables/text if needed
- normalize fields
- detect missing metrics

Rules:
- Do not invent missing costs.
- Do not overclaim precision.
- If data is empty, say whether it appears to be no usage or unavailable data.
- If output is text/table, summarize cautiously and mention limitations.
- Do not expose private account/team identifiers unnecessarily.
- Do not expose raw sensitive output.
- Preserve only user-relevant usage facts.

Pause conditions:
- Pause only if output is too ambiguous to summarize safely.

Exit criteria:
- Usage output is normalized.

Phase output:
```json
{
  "period": "",
  "context": "",
  "services": [],
  "totals": {},
  "breakdown": [],
  "grandTotal": {},
  "chargeCount": "",
  "limitations": []
}
```

## Phase 6: Generate Final Usage Report

### Skill

Consistent Usage Reporting Skill

### Goal

Give the user the same usage/cost report structure every time.

### Detailed skill behavior

The final report should be concise, consistent, and honest.

It should include:
- status
- period
- scope/context
- total usage/cost summary
- top services by cost
- service breakdown
- time breakdown if requested
- limitations
- Pacific-time date note if date range was used
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
- Do not call the result `complete` if no usage data was fetched.
- Use `blocked` if CLI/auth/permission/scope prevents the query.
- Use `incomplete_data` if usage was fetched but some expected totals are missing.
- Do not claim Web Analytics visitors/page views were checked.
- Mention parsing limitations if output was table/text.
- Mention that no deploy/write command was run.
- Mention Pacific-time date interpretation when `--from`/`--to` were used.

Final report format:
```markdown
# Vercel Usage Report

Status: complete | blocked | failed | incomplete_data
Period: <from> to <to | current billing period>
Scope: <scope/context or unavailable>
Source: CLI-only via `vercel usage`

## Summary

- Total usage: <value or unavailable>
- Effective cost: <value or unavailable>
- Billed cost: <value or unavailable>
- Charge count: <value or unavailable>

## Top services

1. <service> — usage: <usage>, effective cost: <cost>, billed cost: <cost>
2. ...

## Breakdown

- <date/week/month>: <summary>

## Notes

- <limitations>
- Date ranges are interpreted using Vercel CLI date behavior.
- No deploy/write command was run.
- No project or billing settings were changed.
```

## Examples

### Example 1: Current billing period

User:
> Use /ReAction-check-vercel-usage. Check my Vercel usage.

Expected:
- verify CLI/auth
- run `vercel usage --format json`
- summarize usage/cost by service
- report clearly

### Example 2: Today

User:
> Use /ReAction-check-vercel-usage. Check today’s Vercel usage.

Expected:
- resolve today
- run `vercel usage --from YYYY-MM-DD --to YYYY-MM-DD --breakdown daily --format json`
- report usage/cost
- mention Pacific-time date interpretation

### Example 3: Yesterday

User:
> Use /ReAction-check-vercel-usage. Check yesterday’s Vercel cost.

Expected:
- resolve yesterday
- run date range query
- summarize usage/cost

### Example 4: Last 7 days

User:
> Use /ReAction-check-vercel-usage. Check Vercel usage for the last 7 days with daily breakdown.

Expected:
- calculate range
- use `--breakdown daily`
- summarize daily usage and top services

### Example 5: User asks for Web Analytics

User:
> Use /ReAction-check-vercel-usage. How many visitors did my site get today?

Expected:
- pause or redirect to `/ReAction-check-vercel-analytics`
- explain that usage/cost and Web Analytics are different

## End of ReAction
