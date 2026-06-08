---
id: check-vercel-analytics
name: Check Vercel Analytics
version: 0.1.0
description: Check Vercel Web Analytics for a project and date range using CLI-only read-only commands or a local analytics adapter, then produce a consistent analytics report.
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
  pause_on_missing_date_range: false
  pause_on_missing_analytics_adapter: true
  pause_on_auth_required: true
  never_print_tokens: true
  never_change_project_settings: true
  never_deploy: true
---

# ReAction: Check Vercel Analytics

## Purpose

Check Vercel Web Analytics for a project using CLI-only, read-only commands.

This ReAction is for repeated analytics checks such as:

- today
- yesterday
- a specific date
- last 7 days
- this week
- a named Vercel project

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

## Important Scope

This is a CLI-only ReAction.

It must not use the browser or Vercel dashboard.

This ReAction is for Vercel Web Analytics-style reporting, such as:

- visitors
- page views
- top pages
- top referrers
- top countries or regions
- top devices, browsers, or operating systems
- custom events, if available

This ReAction is not for Vercel billing/resource usage.

If the available command only returns billing/resource usage, do not call it Web Analytics.

Do not silently fall back to `vercel usage`.

`vercel usage` is for usage/cost reporting, not Web Analytics visitors/page views.

## CLI Adapter Contract

Because a stable official Vercel Web Analytics CLI command may not exist in every environment, this ReAction uses a CLI adapter contract.

The agent should look for analytics data in this order:

1. A native Vercel CLI analytics command, if available in the installed CLI.
2. A local project script that wraps Vercel Analytics access.
3. A configured environment command name.
4. A local analytics adapter script documented in the project.

Acceptable command shapes may look like:

```bash
vercel analytics --project <project> --from <YYYY-MM-DD> --to <YYYY-MM-DD> --json
```

or:

```bash
npm run vercel:analytics -- --project <project> --from <YYYY-MM-DD> --to <YYYY-MM-DD> --json
```

or:

```bash
pnpm vercel:analytics -- --project <project> --from <YYYY-MM-DD> --to <YYYY-MM-DD> --json
```

or:

```bash
node scripts/vercel-analytics-report.mjs --project <project> --from <YYYY-MM-DD> --to <YYYY-MM-DD> --json
```

The exact command may vary by project, but it must be read-only and must return machine-readable or clearly parseable analytics output.

If no analytics-capable CLI command or adapter exists, stop with status:

```txt
blocked
```

Do not invent an adapter.
Do not install packages.
Do not create tokens.
Do not open the browser.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Required capabilities:

- run terminal commands
- inspect current directory
- read files
- read package.json
- read .vercel/project.json if present
- read environment variable names without printing secret values
- parse JSON, table, or text output
- ask user for missing project/date/scope
- produce a final report
- record phase progress

No browser capability is required.

If a capability is missing:

- continue only if safe
- clearly mark which step could not be completed
- never claim complete if analytics data was not fetched

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
- Use runner/native date handling for today, yesterday, and date ranges.
- Use terminal only for Vercel CLI, package manager, Node, or adapter commands.
- Do not print all environment variables.
- Do not print tokens or secrets.

Preferred command representation:

```json
{
  "command": "vercel",
  "args": ["--version"]
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
- help commands
- auth identity checks
- read-only analytics commands
- read-only project context commands
- read-only package scripts clearly intended for analytics

Allowed examples:

- `{ "command": "vercel", "args": ["--version"] }`
- `{ "command": "vercel", "args": ["whoami"] }`
- `{ "command": "vercel", "args": ["help"] }`
- `{ "command": "vercel", "args": ["analytics", "--help"] }`

Forbidden examples:

- `{ "command": "vercel", "args": ["deploy"] }`
- `{ "command": "vercel", "args": ["promote"] }`
- `{ "command": "vercel", "args": ["rollback"] }`
- `{ "command": "vercel", "args": ["remove"] }`
- `{ "command": "vercel", "args": ["env", "rm"] }`
- `{ "command": "vercel", "args": ["domains", "rm"] }`

## Expected Analytics Output Contract

A valid analytics adapter should ideally return JSON shaped like:

```json
{
  "project": "my-project",
  "from": "2026-06-08",
  "to": "2026-06-08",
  "timezone": "Asia/Kolkata",
  "metrics": {
    "visitors": 123,
    "pageViews": 456,
    "bounceRate": 42.1
  },
  "topPages": [
    {
      "path": "/",
      "views": 200,
      "visitors": 150
    }
  ],
  "topReferrers": [
    {
      "source": "google.com",
      "visitors": 40
    }
  ],
  "topCountries": [
    {
      "country": "India",
      "visitors": 90
    }
  ],
  "topDevices": [
    {
      "device": "mobile",
      "visitors": 70
    }
  ],
  "customEvents": []
}
```

If the adapter returns different JSON, the agent should map fields conservatively.

If the adapter returns table/text output, the agent should summarize cautiously and report parsing limitations.

## Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "analytics_request": {
    "project": "",
    "dateRangeText": "",
    "from": "",
    "to": "",
    "timezone": "",
    "metricsRequested": []
  },
  "cli_context": {
    "os": "",
    "cwd": "",
    "vercelCliInstalled": false,
    "authenticated": false,
    "userOrTeam": "",
    "projectContext": "",
    "analyticsCommandAvailable": false,
    "analyticsCommandSource": ""
  },
  "adapter_discovery": {
    "nativeVercelAnalytics": false,
    "packageScript": "",
    "localAdapter": "",
    "envCommandConfigured": false
  },
  "command_plan": {
    "command": "",
    "args": [],
    "readOnly": true,
    "expectedOutput": "json | table | text"
  },
  "analytics_result": {
    "visitors": "",
    "pageViews": "",
    "bounceRate": "",
    "topPages": [],
    "topReferrers": [],
    "topCountries": [],
    "topDevices": [],
    "customEvents": [],
    "limitations": []
  },
  "final_status": "not_started"
}
```

## Phase 1: Understand Analytics Request

### Skill

Analytics Request Parsing Skill

### Goal

Understand what analytics the user wants and normalize the project and date range.

### Detailed skill behavior

The agent should carefully extract the user’s intent from short natural-language requests.

The user may say:

- “check analytics today”
- “check Vercel analytics for project X”
- “analytics for yesterday”
- “analytics for 2026-06-07”
- “last 7 days for my docs site”
- “how did project X do today?”

The agent should normalize this into:

- project
- from date
- to date
- timezone
- requested metrics
- scope/team if provided

The agent must distinguish Web Analytics from billing/resource usage.

If the user asks about visitors, page views, referrers, top pages, countries, browsers, devices, or custom events, treat it as Web Analytics.

If the user asks about cost, billed usage, bandwidth cost, function cost, or billing usage, pause and redirect to a different ReAction such as `/ReAction-check-vercel-usage`.

Required capabilities/tools:
- read/parse user input
- get current date
- infer local timezone if available
- ask user for missing project/date/scope

Rules:
- If no date is given, use today.
- If no timezone is given, use the user/local timezone if available.
- If no metrics are specified, request a standard analytics summary.
- If no project is provided, try to infer the project from local Vercel project context in a later phase.
- If no project can be inferred, pause and ask.
- Do not guess between multiple possible projects.
- Do not continue if the request is for billing/resource usage.
- Do not continue if the request asks for a write/change action.

Standard analytics summary:

The standard report should include, when available:
- visitors
- page views
- bounce rate
- top pages
- top referrers
- top countries/regions
- top devices/browsers
- custom events

Pause conditions:
- project is missing and cannot be inferred
- date range is ambiguous
- user asks for billing/resource usage instead of Web Analytics
- user asks for a write/change action
- user asks to deploy, change settings, or alter billing

Exit criteria:
- Analytics request is clear and normalized.

Phase output:
```json
{
  "project": "",
  "from": "YYYY-MM-DD",
  "to": "YYYY-MM-DD",
  "timezone": "",
  "metricsRequested": [
    "visitors",
    "page_views",
    "top_pages",
    "top_referrers",
    "top_countries",
    "top_devices"
  ]
}
```

## Phase 2: Verify CLI Environment

### Skill

CLI Readiness Skill

### Goal

Confirm the local machine can run safe Vercel CLI commands.

### Detailed skill behavior

The agent should verify the local CLI environment without making changes.

The agent should:

- Check whether vercel is available.
- Check Vercel CLI version.
- Check whether the user is authenticated.
- Identify the current user/team context if available.
- Inspect the current project context if `.vercel/project.json` exists.
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

Read `.vercel/project.json` using file-read capability if present.
Read `package.json` using file-read capability if needed.

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
- the terminal command capability is unavailable

Exit criteria:
- Vercel CLI/auth/project context is known or a clear blocker is known.

Phase output:
```json
{
  "vercelCliInstalled": true,
  "authenticated": true,
  "projectContext": "",
  "userOrTeam": "",
  "safeToDiscoverAdapter": true
}
```

## Phase 3: Discover Analytics Adapter

### Skill

Analytics Adapter Discovery Skill

### Goal

Find a CLI-accessible, read-only way to retrieve Vercel Web Analytics for the requested project and date range.

### Detailed skill behavior

The agent should discover analytics access in this order:

1. Check whether the installed Vercel CLI exposes an analytics command.
2. Check whether the current project has a package script for analytics reporting.
3. Check whether the project has a local analytics adapter script.
4. Check whether the runner exposes a configured analytics command.
5. If none exists, stop with `blocked`.

The agent must not invent a command.
The agent must not use `vercel usage` as Web Analytics.
The agent must not install packages, create tokens, open the browser, or modify files.

Required capabilities/tools:
- run terminal command
- read command stdout/stderr
- read package.json
- inspect local files
- ask user if adapter choice is ambiguous

Safe discovery commands:

Preferred command+args format:
- `{ "command": "vercel", "args": ["analytics", "--help"] }`

Safe package/script inspection should use file-read capability instead of OS-specific shell commands.

Look for package scripts named:
- `vercel:analytics`
- `analytics:vercel`
- `check:vercel-analytics`
- `analytics`

Only use scripts that clearly describe read-only analytics reporting.

Look for local adapter files named:
- `scripts/vercel-analytics-report.mjs`
- `scripts/check-vercel-analytics.mjs`
- `tools/vercel-analytics-report.mjs`
- `tools/check-vercel-analytics.mjs`

Rules:
- Use only read-only discovery.
- Do not run deploy, env, domain, billing, rollback, remove, or promote commands.
- Do not print tokens or secret environment values.
- Do not use shell-specific commands like `grep`, `cat`, `dir`, or `type`.
- Do not assume macOS/Linux/Windows shell behavior.
- Prefer command+args over shell strings.
- If a candidate script includes write/deploy/remove behavior, reject it.
- If a candidate adapter cannot target project/date range, reject it.
- If no analytics-capable adapter exists, stop with `blocked`.
- If the only available command is `vercel usage`, reject it for this ReAction.

Pause conditions:
- multiple analytics adapters exist and the safest choice is unclear
- an adapter requires authentication setup
- an adapter requires a token that is not already configured safely
- the only available command is `vercel usage`
- command safety cannot be determined
- the user must choose between multiple teams/projects

Exit criteria:
- A safe analytics adapter is selected, or the ReAction has a clear blocked reason.

Phase output:
```json
{
  "analyticsCommandAvailable": true,
  "analyticsCommandSource": "native | package_script | local_adapter | configured_command",
  "selectedAdapter": "",
  "supportsJson": true,
  "blockedReason": ""
}
```

## Phase 4: Build Safe Analytics Command

### Skill

Read-only Command Construction Skill

### Goal

Build a cross-platform, read-only command for the requested project/date range.

### Detailed skill behavior

The agent should construct a command using the selected analytics adapter.

The command should include:
- project
- from date
- to date
- timezone if adapter supports it
- JSON output flag if adapter supports it

The agent should build the command using command+args form when possible.
The command should never include a token or secret value as a visible argument.

Native-style example:
```json
{
  "command": "vercel",
  "args": [
    "analytics",
    "--project",
    "my-project",
    "--from",
    "2026-06-08",
    "--to",
    "2026-06-08",
    "--json"
  ]
}
```

Package-script example:
```json
{
  "command": "npm",
  "args": [
    "run",
    "vercel:analytics",
    "--",
    "--project",
    "my-project",
    "--from",
    "2026-06-08",
    "--to",
    "2026-06-08",
    "--json"
  ]
}
```

Local-adapter example:
```json
{
  "command": "node",
  "args": [
    "scripts/vercel-analytics-report.mjs",
    "--project",
    "my-project",
    "--from",
    "2026-06-08",
    "--to",
    "2026-06-08",
    "--json"
  ]
}
```

Required capabilities/tools:
- construct terminal command
- validate command args
- ask user if project/scope/date remains unclear

Rules:
- Use command+args when possible.
- Never include tokens in command args.
- Never print secret values.
- Do not query outside the requested date range.
- Do not run billing/resource usage commands unless user requested usage/cost.
- Do not run any command with write behavior.
- Do not use shell syntax that breaks on Windows/macOS/Linux.
- Prefer JSON output.
- If JSON is unavailable, set expected output to table/text and report parsing limitations later.

Pause conditions:
- selected adapter cannot target the requested project
- selected adapter cannot target the requested date range
- selected adapter requires unsafe token passing
- command safety cannot be verified
- project or team scope is still ambiguous

Exit criteria:
- A safe analytics command is ready.

Phase output:
```json
{
  "command": "",
  "args": [],
  "expectedOutput": "json",
  "readOnly": true
}
```

## Phase 5: Execute Analytics Command

### Skill

Safe CLI Execution Skill

### Goal

Run the analytics command and capture output safely.

### Detailed skill behavior

The agent should execute only the selected read-only analytics command.

The agent should:
- Run the command.
- Capture stdout and stderr.
- Detect authentication errors.
- Detect permission errors.
- Detect missing project errors.
- Detect analytics-not-enabled errors.
- Detect no-data cases.
- Detect parseability of output.
- Stop on interactive prompts.

The agent should not retry repeatedly.
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
- Do not run fallback commands that were rejected earlier.
- Do not run `vercel usage` as a fallback.

Common failure cases:
- command not found
- analytics command not available
- auth required
- project not found
- analytics not enabled
- permission denied
- date range unsupported
- no analytics data for period
- output not parseable

Pause conditions:
- auth/login required
- permission denied
- project is ambiguous
- analytics is not enabled and requires dashboard setup
- command asks for interactive confirmation
- adapter requires a missing token or setup step

Exit criteria:
- Analytics output is captured or a clear blocked reason is known.

Phase output:
```json
{
  "status": "succeeded | blocked | failed",
  "rawOutputType": "json | table | text | error",
  "errorSummary": ""
}
```

## Phase 6: Parse Analytics Output

### Skill

Analytics Parsing Skill

### Goal

Turn CLI output into a consistent analytics report.

### Detailed skill behavior

The agent should normalize raw analytics output into a predictable shape.
The agent should support JSON first.
If JSON is unavailable, it may parse clearly structured table/text output, but must mention limitations.
The agent should map common field names conservatively.

Field mapping examples:
- `visitors`, `uniqueVisitors`, `unique_visitors` → `visitors`
- `pageViews`, `views`, `page_views` → `page views`
- `bounceRate`, `bounce_rate` → `bounce rate`
- `referrers`, `topReferrers`, `sources` → `top referrers`
- `countries`, `regions`, `geo` → `top countries/regions`
- `devices`, `browsers`, `os` → `devices/browsers`

The agent should preserve unavailable metrics as unavailable instead of inventing values.

Required capabilities/tools:
- parse JSON
- parse simple tables/text if needed
- normalize fields
- detect missing metrics

Rules:
- Do not invent missing metrics.
- Do not overclaim precision.
- If data is empty, say whether it appears to be no traffic or unavailable data.
- If output is text/table, summarize cautiously and mention limitations.
- Do not expose private project/team identifiers unnecessarily.
- Do not expose raw sensitive output.
- Preserve only user-relevant analytics facts.

Pause conditions:
- Pause only if the output is too ambiguous to summarize safely.

Exit criteria:
- Analytics output is normalized.

Phase output:
```json
{
  "visitors": "",
  "pageViews": "",
  "bounceRate": "",
  "topPages": [],
  "topReferrers": [],
  "topCountries": [],
  "topDevices": [],
  "customEvents": [],
  "limitations": []
}
```

## Phase 7: Generate Final Analytics Report

### Skill

Consistent Analytics Reporting Skill

### Goal

Give the user the same report structure every time.

### Detailed skill behavior

The final report should be concise, consistent, and honest.

It should include:
- status
- project
- period
- source command type
- visitors
- page views
- top pages
- top referrers
- geography if available
- devices/browsers if available
- custom events if available
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
- Do not call the result `complete` if no analytics data was fetched.
- Use `blocked` if no CLI analytics adapter exists.
- Use `incomplete_data` if analytics was fetched but some metrics were missing.
- Do not claim Web Analytics if the command returned billing/resource usage.
- Mention parsing limitations if output was table/text.
- Mention that no deploy/write command was run.

Final report format:
```markdown
# Vercel Analytics Report

Status: complete | blocked | failed | incomplete_data
Project: <project>
Period: <from> to <to>
Source: CLI-only via <native command | package script | local adapter>

## Summary

- Visitors: <value or unavailable>
- Page views: <value or unavailable>
- Bounce rate: <value or unavailable>

## Top pages

1. <path> — <views> views, <visitors> visitors
2. ...

## Top referrers

1. <source> — <visitors>
2. ...

## Geography

- <country/region>: <value>

## Devices / Browsers

- <device/browser>: <value>

## Custom events

- <event>: <value>

## Notes

- <limitations>
- No deploy/write command was run.
- No project settings were changed.
```

## Examples

### Example 1: Today

User:
> Use /ReAction-check-vercel-analytics. Check project my-portfolio analytics for today.

Expected:
- resolve today
- verify CLI/auth
- discover analytics adapter
- run read-only analytics command
- summarize visitors/page views/top pages/referrers
- report clearly

### Example 2: Yesterday

User:
> Use /ReAction-check-vercel-analytics. Check project launch-page analytics for yesterday.

Expected:
- resolve yesterday
- run analytics query
- report same structure

### Example 3: Specific date

User:
> Use /ReAction-check-vercel-analytics. Check project docs-site analytics for 2026-06-07.

Expected:
- use exact date
- run analytics query
- report same structure

### Example 4: No analytics adapter

User:
> Use /ReAction-check-vercel-analytics. Check project my-app analytics for today.

Expected:
- verify Vercel CLI exists
- discover no analytics-capable CLI command or adapter
- stop with blocked
- explain that a CLI-accessible Web Analytics adapter is needed
- do not fall back to vercel usage

### Example 5: User asks for usage/cost

User:
> Use /ReAction-check-vercel-analytics. Check today’s Vercel cost.

Expected:
- pause or redirect to `/ReAction-check-vercel-usage`
- explain that analytics and usage/cost are different

## End of ReAction
