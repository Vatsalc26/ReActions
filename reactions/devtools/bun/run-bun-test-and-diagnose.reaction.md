---
id: run-bun-test-and-diagnose
name: Run Bun Test and Diagnose
version: 0.1.0
description: Run Bun tests when available, diagnose failures, and produce a consistent read-only test diagnosis report with static fallback when Bun CLI is missing.
category: devtools
subcategory: bun
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_only_with_static_fallback
supported_project_policy: javascript_or_typescript_project
browser_verification_required_for_success: false
terminal_verification_required_for_success: false
static_verification_required_for_success: true
safety:
  read_only_by_default: true
  supports_static_only_mode: true
  supports_bun_cli_mode: true
  pause_before_install: true
  never_auto_install_bun: true
  never_install_dependencies: true
  never_update_snapshots_by_default: true
  never_modify_source_by_default: true
  never_delete_lockfiles: true
  never_modify_package_json: true
  never_print_secrets: true
---

# ReAction: Run Bun Test and Diagnose

## Purpose

Run Bun tests when Bun CLI is available, diagnose failures, and produce a consistent test diagnosis report.

This ReAction can run with or without Bun CLI.

If Bun is installed, the agent should run safe Bun test commands and diagnose the output.

If Bun is not installed, the agent should still inspect test setup statically and return a partial diagnosis.

This ReAction is for repeated tasks such as:

- run `bun test`
- explain why Bun tests failed
- identify failing test files
- identify assertion failures
- identify runtime/import/type errors from test output
- detect missing dependencies or setup issues
- summarize likely causes
- suggest next checks
- avoid changing code unless explicitly asked

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

## Important Scope

This is a CLI-capable DevTools ReAction with a static fallback.

It is read-only by default.

This ReAction diagnoses test failures. It does not fix them automatically.

Do not:

* auto-install Bun
* run `curl | bash`
* install dependencies
* run `bun install`
* run `bun add`
* run `npm install`
* run `pnpm install`
* run `yarn install`
* delete lockfiles
* edit test files
* edit source files
* edit `package.json`
* update snapshots
* migrate package managers
* rewrite CI config

A future ReAction may handle fixes intentionally, but this ReAction should only run and diagnose tests unless the user explicitly asks for edits.

## Execution Modes

### Static-only mode

Use this mode when:

* Bun CLI is missing.
* Bun CLI is unavailable on PATH.
* terminal command execution is unavailable.
* the environment blocks command execution.

In static-only mode, the agent should inspect:

* `package.json`
* test scripts
* test files
* test-related dependencies
* Bun lockfiles
* package-manager lockfiles
* Bun config files
* framework config files
* likely test runner setup

The final report should clearly say:

```txt
Bun CLI was not available, so `bun test` was not run.
Static test setup inspection was completed.
```

The status should usually be `incomplete_data`, unless static inspection itself is blocked.

### Full CLI mode

Use this mode when:

* Bun CLI is installed.
* Bun CLI is available on PATH.
* terminal command execution is available.

In full CLI mode, the agent may run:

* `bun --version`
* `bun test`
* `bun test <specific-file>` only if user requested a specific file
* existing test-related scripts via `bun run <script>` only when safer/more appropriate

Do not run install or migration commands.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for static-only mode:

- inspect current directory
- list files
- read files
- read `package.json`
- parse JSON
- detect test files
- detect test dependencies
- detect lockfile names
- produce final report
- record phase progress

Additional capabilities for full CLI mode:

- run terminal commands
- read command stdout
- read command stderr
- parse text output
- detect command failures
- detect test failure patterns
- stop on interactive prompts

No browser capability is required.

If a capability is missing:

- continue only if safe
- clearly mark which checks could not be completed
- never claim tests were run if Bun commands were not run

## Cross-platform Rules

This ReAction must work across:

- Windows CMD
- Windows PowerShell
- macOS terminal
- Linux shell

Rules:

- Prefer command execution as command + args, not shell strings.
- Do not rely on Unix-only commands like `cat`, `grep`, `sed`, `awk`, `rm`, `ls`, `tail`, or `date`.
- Do not rely on Windows-only commands like `dir`, `type`, or PowerShell-specific syntax.
- Use file-read/list capability to inspect files.
- Use terminal only for Bun/runtime/package-manager commands.
- Do not print all environment variables.
- Do not print tokens or secrets.
- Do not pipe output through OS-specific commands.

Preferred command representation:

```json
{
  "command": "bun",
  "args": ["test"]
}
```

This works across Windows CMD, PowerShell, macOS, and Linux when the runner executes commands as command + args.

Shell strings are acceptable only if the runner has no command+args interface.

## Read-only Safety Rules

Allowed commands by default:

```json
{ "command": "bun", "args": ["--version"] }
{ "command": "bun", "args": ["test"] }
{ "command": "bun", "args": ["test", "<specific-test-file>"] }
{ "command": "bun", "args": ["run", "<existing-test-script>"] }
{ "command": "node", "args": ["--version"] }
```

Use `bun test <specific-test-file>` only if the user requests a specific file or the failure diagnosis needs a focused rerun.

Use `bun run <existing-test-script>` only when the script exists in `package.json` and appears test-related.

Forbidden by default:

```json
{ "command": "bun", "args": ["install"] }
{ "command": "bun", "args": ["add", "package-name"] }
{ "command": "bun", "args": ["remove", "package-name"] }
{ "command": "npm", "args": ["install"] }
{ "command": "pnpm", "args": ["install"] }
{ "command": "yarn", "args": ["install"] }
```

Also forbidden by default:

- deleting lockfiles
- editing source files
- editing test files
- editing `package.json`
- updating snapshots
- changing package manager
- running migration commands
- running global install commands
- running shell install scripts
- running long-running dev servers

If the user asks to fix tests, this ReAction may produce a diagnosis and suggested fix plan, but should not edit files unless the user explicitly asks for an implementation ReAction or follow-up edit.

## Sensitive Output Rules

Test output may include secrets or private data.

The agent must redact likely sensitive values before including output snippets in the final report.

Redact values that look like:

- API keys
- access tokens
- auth headers
- cookies
- session IDs
- bearer tokens
- database URLs
- private keys
- connection strings
- long random secret-like values
- private emails if not necessary

Use placeholders like:

```txt
[REDACTED_TOKEN]
[REDACTED_SECRET]
[REDACTED_DATABASE_URL]
[REDACTED_COOKIE]
```

Do not paste full raw logs by default.

Prefer short redacted snippets and summaries.

## Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "static_only | full_cli | unknown",
  "project_context": {
    "cwd": "",
    "hasPackageJson": false,
    "packageName": "",
    "scripts": {},
    "dependencies": [],
    "devDependencies": [],
    "testFiles": [],
    "testDependencies": [],
    "detectedFrameworks": [],
    "detectedPackageManagers": [],
    "lockfiles": []
  },
  "bun_context": {
    "bunInstalled": false,
    "bunAvailableOnPath": false,
    "bunVersion": "",
    "alreadyUsingBun": false
  },
  "test_plan": {
    "command": "",
    "args": [],
    "reason": "",
    "readOnly": true
  },
  "test_result": {
    "status": "",
    "rawOutputType": "",
    "exitCode": "",
    "failedFiles": [],
    "failedTests": [],
    "errorPatterns": [],
    "redactedSnippets": [],
    "likelyCause": "",
    "suggestedNextChecks": []
  },
  "final_status": "not_started"
}
```

---

## Phase 1: Understand Test Request

### Skill

Bun Test Request Parsing Skill

### Detailed skill behavior

The agent should understand whether the user wants all Bun tests run, a specific test file run, or only a diagnosis of existing test setup.

The user may say:

- “run Bun tests”
- “diagnose Bun test failure”
- “why is bun test failing?”
- “run this specific test file”
- “check if tests work with Bun”
- “analyze Bun test setup without running commands”

The agent should normalize the request into one of these modes:

- `run-all-tests`
- `run-specific-test`
- `static-test-setup-diagnosis`
- `diagnose-existing-failure-output`

If the user gives existing failure output, the agent may diagnose that output without rerunning tests.

If the user asks to fix tests, the agent should explain that this ReAction diagnoses failures and returns a fix plan. It should not edit files unless explicitly asked in a separate follow-up.

The agent should identify whether static-only mode is acceptable. By default, static-only mode is acceptable if Bun CLI is missing.

### Rules

- Default to read-only diagnosis.
- Static-only inspection is valid when Bun CLI is unavailable.
- If the user asks for install or code edits, pause before write actions.
- If the current directory is not a JS/TS project, report blocked.
- Do not guess missing project context.
- Do not auto-install Bun.
- Do not update snapshots unless explicitly confirmed.

### Pause conditions

Pause if:

- the user asks to install Bun
- the user asks to install dependencies
- the user asks to update snapshots
- the user asks to edit files as part of this ReAction
- the current directory is unclear
- the project has no `package.json`
- command execution is unavailable and file inspection is also unavailable

### Exit criteria

The test diagnosis scope is clear.

### Phase output

```json
{
  "mode": "run-all-tests | run-specific-test | static-test-setup-diagnosis | diagnose-existing-failure-output",
  "readOnly": true,
  "staticOnlyAllowed": true,
  "specificTestFile": "",
  "requiresConfirmation": false
}
```

---

## Phase 2: Inspect Test Setup

### Skill

JavaScript Test Setup Static Inspection Skill

### Detailed skill behavior

The agent should inspect the project without running shell-specific commands and without modifying files.

The agent should use file-listing and file-reading capabilities to inspect the current directory.

The agent should look for:

- `package.json`
- `bun.lock`
- `bun.lockb`
- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`
- `bunfig.toml`
- `tsconfig.json`
- test files:
  - `*.test.ts`
  - `*.test.tsx`
  - `*.test.js`
  - `*.test.jsx`
  - `*.spec.ts`
  - `*.spec.tsx`
  - `*.spec.js`
  - `*.spec.jsx`
- test directories:
  - `test/`
  - `tests/`
  - `__tests__/`
- config files:
  - `vitest.config.ts`
  - `vitest.config.js`
  - `jest.config.js`
  - `jest.config.ts`
  - `playwright.config.ts`
  - `next.config.js`
  - `next.config.mjs`
  - `vite.config.ts`
  - `vite.config.js`

The agent should read `package.json` and extract:

- package name
- scripts
- dependencies
- devDependencies
- packageManager field

The agent should detect test-related dependencies such as:

- `bun`
- `jest`
- `vitest`
- `playwright`
- `@testing-library/*`
- `happy-dom`
- `jsdom`
- `typescript`
- `tsx`

The agent should detect whether `bun test` appears plausible.

### Rules

- Use file reads, not OS-specific shell commands.
- Do not edit files.
- Do not infer too strongly from one signal.
- Missing test files does not always mean no tests; report uncertainty.
- Missing `package.json` blocks the ReAction because this is for JS/TS projects.

### Pause conditions

Pause if:

- `package.json` is missing
- file reading is unavailable
- project root is ambiguous

### Exit criteria

Test setup metadata is collected.

### Phase output

```json
{
  "hasPackageJson": true,
  "scripts": [],
  "testFiles": [],
  "testDependencies": [],
  "detectedTestRunners": [],
  "lockfiles": []
}
```

---

## Phase 3: Check Bun CLI Availability

### Skill

Bun CLI Availability and Static Fallback Skill

### Detailed skill behavior

The agent should check whether Bun CLI is available, but the ReAction must still continue in static-only mode if Bun is missing.

The agent should try:

```json
{ "command": "bun", "args": ["--version"] }
```

If the command succeeds:

- record Bun as installed
- record the version
- use full CLI mode

If the command fails because Bun is not found:

- record Bun as not installed or not available on PATH
- switch to static-only mode
- do not auto-install Bun
- do not run install scripts
- continue with static test setup diagnosis

The agent may check Node version if useful:

```json
{ "command": "node", "args": ["--version"] }
```

Missing Node is not always a failure for Bun, but it may be useful context.

### Rules

- Do not install Bun automatically.
- Do not run `curl | bash`.
- Do not run PowerShell install scripts.
- Do not open browser install pages.
- If Bun is missing, continue in static-only mode.
- Do not print environment variables.
- Do not treat missing Bun as a total failure if static inspection was possible.

### Status guidance

Use:

- `complete` only if static inspection and requested Bun test command completed.
- `incomplete_data` if static inspection completed but Bun test was skipped because Bun CLI is missing.
- `blocked` if neither static inspection nor CLI checks could run.
- `failed` if an unexpected error prevented useful reporting.

### Pause conditions

Pause if:

- terminal command capability is unavailable and the user specifically required CLI execution
- Bun is missing and the user asks to install Bun
- the environment gives an unclear interactive prompt

### Exit criteria

Bun availability is known and execution mode is selected.

### Phase output

```json
{
  "executionMode": "static_only | full_cli",
  "bunInstalled": true,
  "bunAvailableOnPath": true,
  "bunVersion": ""
}
```

---

## Phase 4: Build Safe Test Command Plan

### Skill

Safe Bun Test Command Planning Skill

### Detailed skill behavior

The agent should build the minimum safe command needed to run the requested tests.

If execution mode is static-only, the agent should skip command planning and record:

```txt
Skipped because Bun CLI is not installed or not available on PATH.
```

If the user requested all tests, default to:

```json
{ "command": "bun", "args": ["test"] }
```

If the user requested a specific file, use:

```json
{ "command": "bun", "args": ["test", "<specific-test-file>"] }
```

If `package.json` has a Bun-specific test script, such as:

```json
"test:bun": "bun test"
```

the agent may use:

```json
{ "command": "bun", "args": ["run", "test:bun"] }
```

The agent should not use package-manager scripts that call `npm`, `pnpm`, or `yarn` unless the user specifically asked to compare behavior. This ReAction is about Bun tests.

The agent should not run Playwright/browser E2E tests by default if they are likely long-running or require browsers. It should report that E2E tests were skipped unless explicitly requested.

### Rules

- Use command + args.
- Do not use shell pipes.
- Do not run install commands.
- Do not run dev/start/watch scripts.
- Do not update snapshots.
- Do not run browser/E2E tests unless explicitly requested.
- Do not run commands outside the project root.
- Use the most focused safe command for the request.

### Pause conditions

Pause if:

- the requested test file does not exist
- multiple possible test commands exist and safest choice is unclear
- the only available test command would install dependencies or mutate files
- the test command is long-running or interactive
- user asks to update snapshots

### Exit criteria

A safe test command plan is ready or clearly skipped.

### Phase output

```json
{
  "command": "bun",
  "args": ["test"],
  "reason": "Run all Bun tests",
  "readOnly": true,
  "skipped": false,
  "skipReason": ""
}
```

---

## Phase 5: Execute Bun Test

### Skill

Safe Cross-platform Bun Test Execution Skill

### Detailed skill behavior

This phase runs only in full CLI mode.

If execution mode is static-only, the agent should skip this phase and record:

```txt
Skipped because Bun CLI is not installed or not available on PATH.
```

In full CLI mode, the agent should run only the selected test command.

The agent should:

1. Run the command with command + args.
2. Capture stdout.
3. Capture stderr.
4. Capture exit status if available.
5. Detect failed tests.
6. Detect runtime/import errors.
7. Detect missing dependencies.
8. Detect TypeScript/transpile errors.
9. Detect snapshot mismatch messages.
10. Detect no-test-found cases.
11. Stop on interactive prompts.
12. Avoid rerunning repeatedly.

At most one retry is allowed only when the failure is clearly transient and does not require user input.

### Windows/CMD support

The agent must run commands in command + args form, for example:

```json
{ "command": "bun", "args": ["test"] }
```

This avoids shell-specific syntax and works in Windows CMD/PowerShell/macOS/Linux when the runner supports command + args.

Do not use:

- `bun test | grep fail`
- `cat package.json`
- `type package.json`

### Rules

- Run only the selected Bun test command.
- Do not install dependencies.
- Do not update snapshots.
- Do not edit files.
- Do not retry more than once.
- Do not respond to interactive prompts automatically.
- Do not expose secrets from output.
- Do not paste full raw logs by default.

### Common failure cases

- Bun command not found
- no tests found
- failed assertion
- import/resolve error
- missing dependency
- TypeScript syntax/type transform issue
- ESM/CJS compatibility issue
- missing environment variable
- snapshot mismatch
- timeout
- permission/file path issue
- test setup file missing
- DOM APIs unavailable
- `jest` globals not supported as expected
- output too large or truncated

### Pause conditions

Pause if:

- dependencies are missing and install would be required
- command asks for interactive input
- user asks to update snapshots
- logs appear highly sensitive
- test command would mutate files

### Exit criteria

Test output is captured or skipped with a clear reason.

### Phase output

```json
{
  "status": "passed | failed | skipped | blocked",
  "exitCode": "",
  "rawOutputType": "text | error | unavailable",
  "skipReason": "",
  "outputCaptured": true
}
```

---

## Phase 6: Parse and Diagnose Test Output

### Skill

Bun Test Failure Parsing and Diagnosis Skill

### Detailed skill behavior

The agent should turn Bun test output into a useful diagnosis.

The agent should look for:

- failing test file names
- failing test names
- assertion errors
- expected vs received values
- stack traces
- import resolution errors
- missing module errors
- syntax errors
- TypeScript transform errors
- unsupported API errors
- environment variable errors
- snapshot mismatches
- timeout errors
- DOM/runtime environment issues
- repeated error patterns
- first meaningful error
- most likely root cause

The agent should separate confirmed evidence from likely causes.

The agent should include short redacted snippets only when helpful.

If tests pass, the agent should summarize that no failure diagnosis was needed.

If tests were skipped because Bun is missing, the agent should diagnose only static setup and list what could not be verified.

### Redaction behavior

Before including snippets, redact:

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

```txt
[REDACTED_TOKEN]
[REDACTED_SECRET]
[REDACTED_DATABASE_URL]
[REDACTED_COOKIE]
```

### Rules

- Do not include full raw logs by default.
- Do not expose secrets.
- Do not invent root causes.
- Separate confirmed facts from likely causes.
- If output is truncated, mention truncation.
- If no tests are found, do not call tests passed.
- If only static inspection was possible, say no runtime diagnosis was performed.
- If missing dependencies are detected, recommend installing only after user confirmation.

### Exit criteria

Test output or static setup is diagnosed.

### Phase output

```json
{
  "failedFiles": [],
  "failedTests": [],
  "errorPatterns": [],
  "redactedSnippets": [],
  "likelyCause": "",
  "suggestedNextChecks": [],
  "limitations": []
}
```

---

## Phase 7: Generate Final Report

### Skill

Consistent Bun Test Diagnosis Reporting Skill

### Detailed skill behavior

The final report should use the same structure every time.

It should be useful whether Bun tests ran, failed, passed, or were skipped because Bun CLI was missing.

If Bun CLI was missing, the report should clearly label CLI checks as skipped and provide static test setup findings.

If tests failed, the report should identify the most useful failure evidence and suggest next checks.

If tests passed, the report should say tests passed and include what command was run.

The report should not include secrets, full raw logs, or unnecessary private data.

### Status values

```txt
complete
blocked
failed
incomplete_data
```

### Final report format

```md
# Bun Test Diagnosis Report

Status: complete | blocked | failed | incomplete_data
Mode: static-only | full-cli
Request type: run-all-tests | run-specific-test | static-test-setup-diagnosis | diagnose-existing-failure-output

## Project

- Package: <name or unavailable>
- Test files detected: <count/list or unavailable>
- Test-related dependencies: <list or unavailable>
- Test scripts: <list or unavailable>

## Bun Environment

- Bun installed: yes/no
- Bun available on PATH: yes/no
- Bun version: <version or unavailable>

## Command

- Command run: `<command or skipped>`
- Exit status: <passed/failed/skipped/blocked>
- Reason skipped: <reason or none>

## Result

- Tests passed: yes/no/unavailable
- Failed files: <list or none>
- Failed tests: <list or none>
- Error patterns: <list or none>

## Diagnosis

- Most likely issue: <short summary or unavailable>
- Evidence:
  - <short redacted evidence>
  - <short redacted evidence>

## Suggested next checks

- <next check>
- <next check>

## Safety notes

- No dependencies were installed.
- No Bun install was attempted.
- No source or test files were modified.
- No snapshots were updated.
- Sensitive values were redacted.
```

Rules:

- Use `complete` if requested tests ran and diagnosis/reporting completed.
- Use `incomplete_data` if static inspection completed but Bun CLI was missing.
- Use `blocked` if `package.json` is missing or project cannot be inspected.
- Use `failed` if unexpected errors prevent useful reporting.
- Mention every skipped check and why it was skipped.
- Keep output concise.

---

# Examples

## Example 1: Bun installed, tests pass

User:

> Use /ReAction-run-bun-test-and-diagnose. Run Bun tests.

Expected behavior:

- inspect test setup
- run `bun --version`
- run `bun test`
- report passing tests

Expected status:

```txt
complete
```

## Example 2: Bun installed, tests fail

User:

> Use /ReAction-run-bun-test-and-diagnose. Why is bun test failing?

Expected behavior:

- run `bun test`
- capture output
- identify failing files/tests/errors
- summarize likely cause
- suggest next checks
- do not edit code

Expected status:

```txt
complete
```

## Example 3: Bun missing

User:

> Use /ReAction-run-bun-test-and-diagnose. Run Bun tests.

Expected behavior:

- inspect package.json and test files
- try `bun --version`
- detect Bun missing
- do not install Bun
- skip `bun test`
- return static-only diagnosis

Expected status:

```txt
incomplete_data
```

Expected note:

```txt
Bun CLI was not installed or not available on PATH, so `bun test` was skipped.
Static test setup inspection completed.
```

## Example 4: User asks to fix tests

User:

> Use /ReAction-run-bun-test-and-diagnose. Run Bun tests and fix failures.

Expected behavior:

- run and diagnose tests
- do not edit files automatically
- return a suggested fix plan
- ask for confirmation or a separate implementation ReAction before editing

## Example 5: User asks to update snapshots

User:

> Use /ReAction-run-bun-test-and-diagnose. Update snapshots if needed.

Expected behavior:

- pause before snapshot updates
- explain snapshot updates modify files
- do not update snapshots without explicit confirmation

# End of ReAction
