---
id: bun-build-check
name: Bun Build Check
version: 0.1.0
description: Check whether a JavaScript or TypeScript project can build with Bun-related build commands, diagnose failures, and produce a consistent build report with static fallback when Bun CLI is missing.
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
  read_only_source_by_default: true
  supports_static_only_mode: true
  supports_bun_cli_mode: true
  allows_generated_build_output: true
  never_commit_generated_output: true
  never_auto_install_bun: true
  never_install_dependencies: true
  never_modify_source_by_default: true
  never_modify_package_json: true
  never_delete_lockfiles: true
  never_run_migration: true
  never_print_secrets: true
---

# ReAction: Bun Build Check

## Purpose

Check whether a JavaScript or TypeScript project can build successfully with Bun-related build commands.

This ReAction can run with or without Bun CLI.

If Bun is installed, the agent should run safe build checks and diagnose failures.

If Bun is not installed, the agent should inspect build setup statically and return a partial build-readiness report.

This ReAction is for repeated tasks such as:

- check if a project builds with Bun
- run a Bun build script
- diagnose Bun build failures
- detect missing build scripts
- detect framework-specific build commands
- detect bundler entrypoint issues
- detect TypeScript/build separation issues
- detect import/resolve errors
- detect generated output location
- suggest next checks without editing code

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

## Important Scope

This is a CLI-capable DevTools ReAction with static fallback.

It is diagnostic by default.

It does not fix build failures automatically.

Do not:

* auto-install Bun
* install dependencies
* run `bun install`
* run `bun add`
* run `npm install`
* run `pnpm install`
* run `yarn install`
* delete lockfiles
* edit source files
* edit config files
* edit `package.json`
* migrate package managers
* rewrite CI config
* commit generated build output

Build commands may generate output directories. That is allowed when running existing project build scripts, but generated output should not be committed.

## Execution Modes

### Static-only mode

Use this mode when:

* Bun CLI is missing.
* Bun CLI is unavailable on PATH.
* terminal command execution is unavailable.
* the environment blocks command execution.

In static-only mode, the agent should inspect:

* `package.json`
* build scripts
* framework config files
* Bun config files
* TypeScript config files
* lockfiles
* package-manager signals
* likely build output directories
* dependencies and devDependencies
* existing build tools

The final report should clearly say:

```txt
Bun CLI was not available, so build commands were not run.
Static build setup inspection was completed.
```

The status should usually be `incomplete_data`, unless static inspection itself is blocked.

## Full CLI mode

Use this mode when:

* Bun CLI is installed.
* Bun CLI is available on PATH.
* terminal command execution is available.

In full CLI mode, the agent may run safe commands such as:

* `bun --version`
* `bun run`
* `bun run build`
* `bun run typecheck`
* `bun build <entry> --outdir <dir>` only when the entrypoint and output directory are clearly known or explicitly requested

Prefer existing project scripts over inventing raw `bun build` commands.

Do not run install or migration commands.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for static-only mode:

- inspect current directory
- list files
- read files
- read `package.json`
- parse JSON
- detect build scripts
- detect framework config files
- detect lockfile names
- produce final report
- record phase progress

Additional capabilities for full CLI mode:

- run terminal commands
- read command stdout
- read command stderr
- parse text output
- detect command failures
- detect generated output
- detect long-running scripts
- stop on interactive prompts

No browser capability is required by default.

If a capability is missing:

- continue only if safe
- clearly mark which checks could not be completed
- never claim build success if build commands were not run

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
- Use terminal only for Bun/runtime/package-manager/build commands.
- Do not print all environment variables.
- Do not print tokens or secrets.
- Do not pipe output through OS-specific commands.

Preferred command representation:

```json
{
  "command": "bun",
  "args": ["run", "build"]
}
```

This works across Windows CMD, PowerShell, macOS, and Linux when the runner executes commands as command + args.

Shell strings are acceptable only if the runner has no command+args interface.

## Read-only Source Safety Rules

Allowed commands by default:

```json
{ "command": "bun", "args": ["--version"] }
{ "command": "bun", "args": ["run"] }
{ "command": "bun", "args": ["run", "build"] }
{ "command": "bun", "args": ["run", "typecheck"] }
{ "command": "bun", "args": ["run", "lint"] }
{ "command": "node", "args": ["--version"] }
```

Use `bun run build`, `bun run typecheck`, and `bun run lint` only when those scripts already exist in `package.json`.

Raw `bun build` commands are allowed only when:

- the user explicitly requested a raw Bun build check, or
- the project has an obvious build entrypoint and output directory, or
- the ReAction can safely propose the command as a plan instead of running it

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
- editing config files
- editing `package.json`
- changing package manager
- running migration commands
- running global install commands
- running shell install scripts
- running long-running dev servers
- committing generated output

If the user asks to fix build failures, this ReAction may produce a diagnosis and suggested fix plan, but should not edit files unless the user explicitly asks for a follow-up implementation task.

## Sensitive Output Rules

Build output may include secrets or private data.

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
    "detectedFrameworks": [],
    "detectedPackageManagers": [],
    "lockfiles": [],
    "buildConfigs": [],
    "possibleOutputDirs": []
  },
  "bun_context": {
    "bunInstalled": false,
    "bunAvailableOnPath": false,
    "bunVersion": "",
    "alreadyUsingBun": false
  },
  "build_plan": {
    "command": "",
    "args": [],
    "reason": "",
    "mayGenerateOutput": true,
    "readOnlySource": true
  },
  "build_result": {
    "status": "",
    "exitCode": "",
    "failedFiles": [],
    "errorPatterns": [],
    "redactedSnippets": [],
    "generatedOutputs": [],
    "likelyCause": "",
    "suggestedNextChecks": []
  },
  "final_status": "not_started"
}
```

---

## Phase 1: Understand Build Request

### Skill

Bun Build Request Parsing Skill

### Detailed skill behavior

The agent should understand whether the user wants a general build check, a Bun-specific build check, a framework build check through Bun, or a diagnosis of existing build output.

The user may say:

- “check Bun build”
- “run bun build”
- “does this build with Bun?”
- “why is Bun build failing?”
- “run bun run build”
- “check build without changing files”
- “analyze this build error”

The agent should normalize the request into one of these modes:

- `build-check`
- `raw-bun-build-check`
- `framework-build-check`
- `static-build-setup-diagnosis`
- `diagnose-existing-build-output`

If the user gives existing build failure output, the agent may diagnose that output without rerunning build commands.

If the user asks to fix the build, the agent should explain that this ReAction diagnoses build failures and returns a fix plan. It should not edit files unless explicitly asked in a separate follow-up.

The agent should identify whether static-only mode is acceptable. By default, static-only mode is acceptable if Bun CLI is missing.

### Rules

- Default to diagnostic behavior.
- Static-only inspection is valid when Bun CLI is unavailable.
- If the user asks for install or code edits, pause before write actions.
- If the current directory is not a JS/TS project, report blocked.
- Do not guess missing project context.
- Do not auto-install Bun.
- Do not claim type safety from build alone.

### Pause conditions

Pause if:

- the user asks to install Bun
- the user asks to install dependencies
- the user asks to edit files as part of this ReAction
- the current directory is unclear
- the project has no `package.json`
- command execution is unavailable and file inspection is also unavailable

### Exit criteria

The build diagnosis scope is clear.

### Phase output

```json
{
  "mode": "build-check | raw-bun-build-check | framework-build-check | static-build-setup-diagnosis | diagnose-existing-build-output",
  "readOnlySource": true,
  "staticOnlyAllowed": true,
  "requiresConfirmation": false
}
```

---

## Phase 2: Inspect Build Setup

### Skill

JavaScript Build Setup Static Inspection Skill

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
- `tsconfig.build.json`
- framework config files:
  - `next.config.js`
  - `next.config.mjs`
  - `vite.config.ts`
  - `vite.config.js`
  - `astro.config.mjs`
  - `svelte.config.js`
  - `nuxt.config.ts`
  - `remix.config.js`
- bundler config files:
  - `rollup.config.js`
  - `rollup.config.mjs`
  - `webpack.config.js`
  - `esbuild.config.js`
  - `rspack.config.js`
  - `vite.config.*`
- likely entrypoints:
  - `src/index.ts`
  - `src/index.tsx`
  - `src/main.ts`
  - `src/main.tsx`
  - `index.ts`
  - `index.tsx`
  - `app.ts`
  - `server.ts`

The agent should read `package.json` and extract:

- package name
- package type
- scripts
- dependencies
- devDependencies
- packageManager field

The agent should detect build-related scripts such as:

- `build`
- `build:bun`
- `typecheck`
- `lint`
- `prebuild`
- `postbuild`

The agent should detect framework signals from dependencies and config files.

The agent should detect likely output directories:

- `dist`
- `build`
- `.next`
- `out`
- `.svelte-kit`
- `.nuxt`
- `public/build`

### Rules

- Use file reads, not OS-specific shell commands.
- Do not edit files.
- Do not delete build output.
- Do not infer too strongly from one signal.
- Missing `package.json` blocks the ReAction because this is for JS/TS projects.
- Missing build script should produce a diagnosis, not an invented command by default.

### Pause conditions

- `package.json` is missing
- file reading is unavailable
- project root is ambiguous

### Exit criteria

Build setup metadata is collected.

### Phase output

```json
{
  "hasPackageJson": true,
  "scripts": [],
  "buildScripts": [],
  "detectedFrameworks": [],
  "buildConfigs": [],
  "possibleEntrypoints": [],
  "possibleOutputDirs": []
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
- continue with static build setup diagnosis

The agent may check Node version if useful:

```json
{ "command": "node", "args": ["--version"] }
```

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

- `complete` only if static inspection and requested Bun build command completed.
- `incomplete_data` if static inspection completed but Bun build was skipped because Bun CLI is missing.
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

## Phase 4: Build Safe Build Command Plan

### Skill

Safe Bun Build Command Planning Skill

### Detailed skill behavior

The agent should build the minimum safe command needed to check the project build.

If execution mode is static-only, the agent should skip command planning and record:

```txt
Skipped because Bun CLI is not installed or not available on PATH.
```

If `package.json` has a Bun-specific build script such as:

```json
"build:bun": "bun build ..."
```

prefer:

```json
{ "command": "bun", "args": ["run", "build:bun"] }
```

If `package.json` has a normal build script, prefer:

```json
{ "command": "bun", "args": ["run", "build"] }
```

If the user explicitly asked for raw `bun build`, and an entrypoint/output directory are known, use:

```json
{ "command": "bun", "args": ["build", "<entrypoint>", "--outdir", "<output-dir>"] }
```

If the project has no build script and no clear entrypoint, do not invent a command. Return a plan and ask for the entrypoint or intended output directory.

The agent should treat typechecking separately:

- `bun run build` may not typecheck.
- `bun run typecheck` should be run separately only if script exists.
- Do not claim TypeScript correctness from build success alone.

### Rules

- Use command + args.
- Prefer existing scripts.
- Do not use shell pipes.
- Do not run install commands.
- Do not run dev/start/watch scripts.
- Do not run raw `bun build` unless entrypoint/output are clear.
- Do not update config files.
- Do not run commands outside project root.
- Use the most focused safe command for the request.

### Pause conditions

Pause if:

- no build script exists
- raw Bun build entrypoint is unclear
- multiple possible build commands exist and safest choice is unclear
- the only available build command would install dependencies or mutate source/config
- the command is long-running or interactive
- user asks to fix build during this ReAction

### Exit criteria

A safe build command plan is ready or clearly skipped.

### Phase output

```json
{
  "command": "bun",
  "args": ["run", "build"],
  "reason": "Run existing project build script with Bun",
  "readOnlySource": true,
  "mayGenerateOutput": true,
  "skipped": false,
  "skipReason": ""
}
```

---

## Phase 5: Execute Build Check

### Skill

Safe Cross-platform Bun Build Execution Skill

### Detailed skill behavior

This phase runs only in full CLI mode.

If execution mode is static-only, the agent should skip this phase and record:

```txt
Skipped because Bun CLI is not installed or not available on PATH.
```

In full CLI mode, the agent should run only the selected build command.

The agent should:

1. Run the command with command + args.
2. Capture stdout.
3. Capture stderr.
4. Capture exit status if available.
5. Detect build success or failure.
6. Detect generated output directories if easy and safe.
7. Detect import/resolve errors.
8. Detect missing dependency errors.
9. Detect syntax/transform errors.
10. Detect TypeScript-related build errors.
11. Detect framework build errors.
12. Detect environment variable errors.
13. Stop on interactive prompts.
14. Avoid rerunning repeatedly.

At most one retry is allowed only when the failure is clearly transient and does not require user input.

### Windows/CMD support

The agent must run commands in command + args form, for example:

```json
{ "command": "bun", "args": ["run", "build"] }
```

This avoids shell-specific syntax and works in Windows CMD/PowerShell/macOS/Linux when the runner supports command + args.

Do not use:

- `bun run build | grep fail`
- `cat package.json`
- `type package.json`

### Rules

- Run only the selected Bun build command.
- Do not install dependencies.
- Do not edit files.
- Do not delete generated output.
- Do not retry more than once.
- Do not respond to interactive prompts automatically.
- Do not expose secrets from output.
- Do not paste full raw logs by default.
- Do not commit generated build output.

### Common failure cases

- Bun command not found
- no build script found
- missing dependency
- import/resolve error
- TypeScript syntax/transform issue
- framework-specific build error
- ESM/CJS compatibility issue
- missing environment variable
- invalid config
- missing entrypoint
- unsupported loader/file type
- permission/file path issue
- output directory issue
- memory/timeout issue
- build output too large or truncated

### Pause conditions

Pause if:

- dependencies are missing and install would be required
- command asks for interactive input
- user asks to fix build automatically
- logs appear highly sensitive
- build command would mutate source/config

### Exit criteria

Build output is captured or skipped with a clear reason.

### Phase output

```json
{
  "status": "passed | failed | skipped | blocked",
  "exitCode": "",
  "rawOutputType": "text | error | unavailable",
  "generatedOutputs": [],
  "skipReason": "",
  "outputCaptured": true
}
```

---

## Phase 6: Optional Typecheck/Lint Verification

### Skill

Build-adjacent Verification Skill

### Detailed skill behavior

The agent should check whether build-adjacent verification is available.

If `package.json` has a `typecheck` script, the agent may run:

```json
{ "command": "bun", "args": ["run", "typecheck"] }
```

If `package.json` has a `lint` script, the agent may run:

```json
{ "command": "bun", "args": ["run", "lint"] }
```

This phase is optional and should not block the core build check unless the user explicitly asked for typecheck/lint.

The agent must distinguish build success from typecheck success.

If build passed but typecheck failed, final report should say:

```txt
Build passed, but typecheck failed.
```

If build passed and no typecheck script exists, final report should say:

```txt
Build passed. Typecheck was not verified because no typecheck script was found.
```

### Rules

- Only run scripts that exist in package.json.
- Do not install dependencies.
- Do not edit files.
- Do not treat missing typecheck script as failure.
- Do not claim type safety unless typecheck passed.
- Skip this phase in static-only mode.

### Exit criteria

Build-adjacent verification results are known or skipped.

### Phase output

```json
{
  "typecheckResult": "passed | failed | skipped | blocked",
  "lintResult": "passed | failed | skipped | blocked",
  "notes": []
}
```

---

## Phase 7: Parse and Diagnose Build Output

### Skill

Bun Build Failure Parsing and Diagnosis Skill

### Detailed skill behavior

The agent should turn build output into a useful diagnosis.

The agent should look for:

- missing dependency errors
- unresolved imports
- syntax errors
- TypeScript transform errors
- typecheck errors if typecheck was run
- framework-specific errors
- bundler config errors
- missing environment variables
- ESM/CJS compatibility errors
- output directory errors
- unsupported loader/file type errors
- first meaningful error
- repeated error patterns
- most likely root cause

The agent should separate confirmed evidence from likely causes.

The agent should include short redacted snippets only when helpful.

If build passes, the agent should summarize that no failure diagnosis was needed.

If build was skipped because Bun is missing, the agent should diagnose only static setup and list what could not be verified.

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
- If no build script is found, do not call build passed.
- If only static inspection was possible, say no runtime build diagnosis was performed.
- If missing dependencies are detected, recommend installing only after user confirmation.

### Exit criteria

Build output or static setup is diagnosed.

### Phase output

```json
{
  "failedFiles": [],
  "errorPatterns": [],
  "redactedSnippets": [],
  "likelyCause": "",
  "suggestedNextChecks": [],
  "limitations": []
}
```

---

## Phase 8: Generate Final Report

### Skill

Consistent Bun Build Check Reporting Skill

### Detailed skill behavior

The final report should use the same structure every time.

It should be useful whether build ran, failed, passed, or was skipped because Bun CLI was missing.

If Bun CLI was missing, the report should clearly label CLI checks as skipped and provide static build setup findings.

If build failed, the report should identify the most useful failure evidence and suggest next checks.

If build passed, the report should say build passed and include what command was run.

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
# Bun Build Check Report

Status: complete | blocked | failed | incomplete_data
Mode: static-only | full-cli
Request type: build-check | raw-bun-build-check | framework-build-check | static-build-setup-diagnosis | diagnose-existing-build-output

## Project

- Package: <name or unavailable>
- Frameworks detected: <list or unavailable>
- Build scripts: <list or unavailable>
- Build configs: <list or unavailable>
- Possible output dirs: <list or unavailable>

## Bun Environment

- Bun installed: yes/no
- Bun available on PATH: yes/no
- Bun version: <version or unavailable>

## Command

- Command run: `<command or skipped>`
- Exit status: <passed/failed/skipped/blocked>
- Reason skipped: <reason or none>
- Generated output detected: <list or unavailable>

## Verification

- Build: passed/failed/skipped/blocked
- Typecheck: passed/failed/skipped/blocked
- Lint: passed/failed/skipped/blocked

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
- No source or config files were modified.
- No package scripts were modified.
- No lockfiles were deleted.
- Generated build output was not committed.
- Sensitive values were redacted.
```

Rules:

- Use `complete` if requested build ran and diagnosis/reporting completed.
- Use `incomplete_data` if static inspection completed but Bun CLI was missing.
- Use `blocked` if `package.json` is missing or project cannot be inspected.
- Use `failed` if unexpected errors prevent useful reporting.
- Mention every skipped check and why it was skipped.
- Keep output concise.

---

# Examples

## Example 1: Bun installed, build passes

User:

> Use /ReAction-bun-build-check. Check if this project builds.

Expected behavior:

- inspect build setup
- run `bun --version`
- run safe build command
- optionally run typecheck/lint if scripts exist
- report passing build

Expected status:

```txt
complete
```

## Example 2: Bun installed, build fails

User:

> Use /ReAction-bun-build-check. Why is build failing?

Expected behavior:

- run safe build command
- capture output
- identify errors
- summarize likely cause
- suggest next checks
- do not edit code

Expected status:

```txt
complete
```

## Example 3: Bun missing

User:

> Use /ReAction-bun-build-check. Check build.

Expected behavior:

- inspect package.json and build setup
- try `bun --version`
- detect Bun missing
- do not install Bun
- skip build command
- return static-only diagnosis

Expected status:

```txt
incomplete_data
```

Expected note:

```txt
Bun CLI was not installed or not available on PATH, so build commands were skipped.
Static build setup inspection completed.
```

## Example 4: No build script

User:

> Use /ReAction-bun-build-check.

Expected behavior:

- inspect package.json
- detect no build script
- do not invent a raw build command unless entrypoint is obvious or user confirms
- return blocked or incomplete_data with suggested next command

## Example 5: User asks to fix build

User:

> Use /ReAction-bun-build-check. Run build and fix it.

Expected behavior:

- run and diagnose build if safe
- do not edit files automatically
- return a suggested fix plan
- ask for confirmation or separate implementation task before editing

# End of ReAction
