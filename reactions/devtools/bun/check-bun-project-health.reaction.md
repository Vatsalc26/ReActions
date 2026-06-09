---
id: check-bun-project-health
name: Check Bun Project Health
version: 0.1.0
description: Check whether a JavaScript or TypeScript project is Bun-ready using CLI-only safe inspection commands, then produce a consistent Bun project health report.
category: devtools
subcategory: bun
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_only
supported_project_policy: javascript_or_typescript_project
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
safety:
  read_only_by_default: true
  pause_before_install: true
  pause_before_build_or_test_if_expensive: false
  never_delete_lockfiles: true
  never_modify_package_json: true
  never_run_migration: true
  never_print_secrets: true
---

# ReAction: Check Bun Project Health

## Purpose

Check whether a JavaScript or TypeScript project is ready to use Bun.

This ReAction is for repeated checks such as:

- is Bun installed?
- is this project already using Bun?
- does the project have a Bun lockfile?
- what package manager appears to be used?
- what scripts are available?
- can Bun run the project scripts?
- can Bun run tests?
- can Bun build the project?
- are there obvious compatibility or migration blockers?

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

## Important Scope

This is a CLI-only DevTools ReAction.

It must not modify the project by default.

This ReAction is not a Bun migration recipe.

Use this ReAction for inspection and diagnosis.

Do not:

- delete `package-lock.json`
- delete `yarn.lock`
- delete `pnpm-lock.yaml`
- delete `bun.lock`
- delete `bun.lockb`
- modify `package.json`
- run `bun install` without explicit user confirmation
- change scripts
- migrate package managers
- rewrite CI config

A future ReAction may handle migration intentionally:

```txt
/ReAction-migrate-project-to-bun
```

But this ReAction should only check health.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Required capabilities:

- run terminal commands
- inspect current directory
- read files
- read `package.json`
- read lockfile names
- read command stdout/stderr
- parse JSON
- parse text output
- detect package manager signals
- produce final report
- record phase progress

No browser capability is required.

If a capability is missing:

- continue only if safe
- clearly mark which checks could not be completed
- never claim complete if Bun health was not checked

## Cross-platform Rules

This ReAction must work across:

- Windows
- macOS
- Linux

Rules:

- Prefer command execution as command + args, not shell strings.
- Do not rely on Unix-only commands like `cat`, `grep`, `sed`, `awk`, `rm`, `ls`, or `date`.
- Do not rely on Windows-only commands like `dir`, `type`, or PowerShell-specific syntax.
- Use file-read capability to inspect files.
- Use terminal only for Bun/runtime/package-manager commands.
- Do not print all environment variables.
- Do not print tokens or secrets.
- Do not pipe output through OS-specific commands.

Preferred command representation:

```json
{
  "command": "bun",
  "args": ["--version"]
}
```

Shell strings are acceptable only if the runner has no command+args interface.

## Read-only Safety Rules

Allowed commands by default:

```json
{ "command": "bun", "args": ["--version"] }
{ "command": "bun", "args": ["run"] }
{ "command": "bun", "args": ["test"] }
{ "command": "bun", "args": ["run", "build"] }
{ "command": "bun", "args": ["run", "typecheck"] }
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "pnpm", "args": ["--version"] }
{ "command": "yarn", "args": ["--version"] }
```

Use build/test/typecheck commands only when they already exist in `package.json`.

Forbidden by default:

```json
{ "command": "bun", "args": ["install"] }
{ "command": "bun", "args": ["add", "package-name"] }
{ "command": "bun", "args": ["remove", "package-name"] }
{ "command": "npm", "args": ["install"] }
{ "command": "pnpm", "args": ["install"] }
{ "command": "yarn", "args": ["install"] }
```

These commands may change lockfiles or dependencies, so they require explicit user confirmation.

Also forbidden:

- deleting lockfiles
- editing `package.json`
- editing CI files
- editing config files
- changing package manager
- running migration commands

## Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "project_context": {
    "cwd": "",
    "hasPackageJson": false,
    "packageName": "",
    "packageType": "",
    "scripts": {},
    "dependencies": [],
    "devDependencies": [],
    "detectedFrameworks": [],
    "detectedPackageManagers": [],
    "lockfiles": []
  },
  "bun_context": {
    "bunInstalled": false,
    "bunVersion": "",
    "nodeVersion": "",
    "packageManagerSignals": [],
    "alreadyUsingBun": false,
    "bunLockfile": ""
  },
  "checks": {
    "scriptList": "",
    "testResult": "",
    "buildResult": "",
    "typecheckResult": "",
    "compatibilityNotes": []
  },
  "final_status": "not_started"
}
```

## Phase 1: Understand Request

### Skill

Bun Health Request Parsing Skill

### Goal

Understand what kind of Bun health check the user wants.

### Detailed skill behavior

The user may say:

- “check Bun project health”
- “is this repo ready for Bun?”
- “check if this project uses Bun”
- “can I migrate this to Bun?”
- “does Bun work here?”
- “check tests/build with Bun”

Normalize the request into:

- inspection-only health check
- test/build check
- migration-readiness check
- package-manager detection
- compatibility diagnosis

If the user asks to migrate to Bun, explain that this ReAction is read-only and can produce a migration-readiness report, but it will not migrate. A future migration ReAction should handle actual changes.

### Rules

- Default to read-only inspection.
- If the user asks for install/migration, pause before any write command.
- If the current directory is not a JS/TS project, report blocked.
- Do not guess missing project context.

### Pause conditions

Pause if:

- the user asks to run install/migration commands
- the current directory is unclear
- the project has no `package.json`
- the user wants destructive lockfile cleanup
- command execution is unavailable

### Exit criteria

The Bun health-check scope is clear.

### Phase output

```json
{
  "mode": "health-check | migration-readiness | test-build-check",
  "readOnly": true,
  "requiresConfirmation": false
}
```

## Phase 2: Inspect Project Files

### Skill

JavaScript Project Detection Skill

### Goal

Detect project structure and package manager signals without changing files.

### Detailed skill behavior

Inspect the current directory using file-read/list capabilities.

Look for:

- `package.json`
- `bun.lock`
- `bun.lockb`
- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`
- `.npmrc`
- `.yarnrc.yml`
- `bunfig.toml`
- `tsconfig.json`
- framework config files:
  - `next.config.js`
  - `next.config.mjs`
  - `vite.config.ts`
  - `vite.config.js`
  - `astro.config.mjs`
  - `svelte.config.js`
  - `nuxt.config.ts`
  - `remix.config.js`

Read `package.json`.

Extract:

- package name
- `"type"`
- scripts
- dependencies
- devDependencies
- packageManager field
- workspaces field

### Rules

- Use file reads, not OS-specific shell commands.
- Do not edit files.
- Do not infer too strongly from one signal.
- Multiple lockfiles should be reported as a potential package-manager ambiguity.

### Pause conditions

Pause if:

- `package.json` is missing
- file reading is unavailable
- project root is ambiguous

### Exit criteria

Project metadata is collected.

### Phase output

```json
{
  "hasPackageJson": true,
  "packageName": "",
  "scripts": [],
  "lockfiles": [],
  "detectedPackageManagers": [],
  "detectedFrameworks": []
}
```

## Phase 3: Verify Bun Environment

### Skill

Bun CLI Readiness Skill

### Goal

Check whether Bun is installed and available.

### Detailed skill behavior

Run safe version commands.

Use:

```json
{ "command": "bun", "args": ["--version"] }
```

Optionally compare Node/package-manager versions if useful:

```json
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "pnpm", "args": ["--version"] }
{ "command": "yarn", "args": ["--version"] }
```

Missing npm/pnpm/yarn is not a failure unless the project appears to depend on that package manager.

### Rules

- Do not install Bun automatically.
- If Bun is missing, report blocked or incomplete health check.
- Do not run `curl | bash` install commands.
- Do not print environment variables.

### Pause conditions

Pause if:

- terminal command capability is unavailable
- Bun is missing and the user asked to continue with Bun-specific commands

### Exit criteria

Bun availability is known.

### Phase output

```json
{
  "bunInstalled": true,
  "bunVersion": "",
  "nodeVersion": "",
  "otherPackageManagers": {}
}
```

## Phase 4: Detect Bun Usage & Compatibility Signals

### Skill

Bun Compatibility Signal Skill

### Goal

Determine whether the project already uses Bun and identify likely compatibility risks.

### Detailed skill behavior

Check for Bun usage signals:

- `bun.lock`
- `bun.lockb`
- `bunfig.toml`
- packageManager field includes Bun
- scripts explicitly use `bun`
- README mentions Bun commands if easy to inspect

Check for possible compatibility risks:

- many Node-specific scripts
- shell-specific scripts
- postinstall/preinstall hooks
- native dependencies
- custom package manager config
- multiple lockfiles
- old framework versions if obvious
- scripts that assume npm/pnpm/yarn
- CI configs that assume another package manager

Do not overclaim compatibility problems. Report them as “signals to check.”

### Rules

- Do not modify scripts.
- Do not remove lockfiles.
- Do not claim Bun compatibility is guaranteed.
- If multiple lockfiles exist, report ambiguity.
- If scripts use Unix-only commands, mention cross-platform risk.

### Exit criteria

Bun readiness signals and risks are summarized.

### Phase output

```json
{
  "alreadyUsingBun": false,
  "bunSignals": [],
  "packageManagerAmbiguity": [],
  "compatibilityNotes": []
}
```

## Phase 5: Run Safe Bun Checks

### Skill

Safe Bun Check Execution Skill

### Goal

Run safe Bun commands to test project health.

### Detailed skill behavior

First list scripts:

```json
{ "command": "bun", "args": ["run"] }
```

Then, only if scripts exist in `package.json`, run relevant checks:

```json
{ "command": "bun", "args": ["test"] }
{ "command": "bun", "args": ["run", "build"] }
{ "command": "bun", "args": ["run", "typecheck"] }
{ "command": "bun", "args": ["run", "lint"] }
```

Prefer this order:

1. `bun run`
2. `bun test` if tests appear available or user asked
3. `bun run typecheck` if script exists
4. `bun run lint` if script exists
5. `bun run build` if script exists

If commands are likely expensive, still allowed if user asked for project health, but stop on clear failures.

Do not run dev server by default.

Do not run long-running scripts like:

- `dev`
- `start`
- `serve`
- `watch`

unless user explicitly asks.

### Rules

- Run only existing scripts.
- Do not run install commands.
- Do not run dev/start/watch by default.
- Stop on interactive prompts.
- At most one retry for transient failure.
- Capture stdout/stderr safely.
- Do not print secrets from logs.

### Pause conditions

Pause if:

- dependencies are missing and install would be required
- the script is long-running
- the script asks for interactive input
- the command would modify files unexpectedly

### Exit criteria

Safe check results are captured or blockers are known.

### Phase output

```json
{
  "scriptList": "passed | failed | skipped",
  "testResult": "passed | failed | skipped | blocked",
  "typecheckResult": "passed | failed | skipped | blocked",
  "lintResult": "passed | failed | skipped | blocked",
  "buildResult": "passed | failed | skipped | blocked"
}
```

## Phase 6: Diagnose Results

### Skill

Bun Health Diagnosis Skill

### Goal

Turn Bun/project output into a useful diagnosis.

### Detailed skill behavior

Summarize:

- whether Bun is installed
- whether project already uses Bun
- package-manager signals
- scripts available
- test/build/typecheck/lint results
- likely blockers
- compatibility notes
- next recommended action

Common findings:

- Bun missing
- no `package.json`
- multiple lockfiles
- no Bun lockfile
- project uses npm/pnpm/yarn currently
- dependencies not installed
- tests unavailable
- build script missing
- build fails under Bun
- script assumes Node/npm
- script appears long-running
- native dependency may need manual check

### Rules

- Do not invent fixes.
- Separate confirmed failures from possible risks.
- Do not say “Bun compatible” unless checks actually pass.
- Prefer “Bun readiness looks good” over absolute claims.
- Do not suggest deleting lockfiles without user confirmation.

### Exit criteria

Health findings are ready.

### Phase output

```json
{
  "bunReadiness": "ready | mostly-ready | partial | blocked | not-ready",
  "confirmedIssues": [],
  "possibleRisks": [],
  "recommendedNextSteps": []
}
```

## Phase 7: Generate Final Report

### Skill

Consistent Bun Health Reporting Skill

### Goal

Return the same report structure every time.

### Status values

```txt
complete
blocked
failed
incomplete_data
```

### Final report format

```md
# Bun Project Health Report

Status: complete | blocked | failed | incomplete_data
Mode: health-check | migration-readiness | test-build-check

## Project

- Package: <name or unavailable>
- Frameworks detected: <list or unavailable>
- Package manager signals: <list>
- Lockfiles: <list>
- Already using Bun: yes/no/unclear

## Bun Environment

- Bun installed: yes/no
- Bun version: <version or unavailable>
- Node version: <version or unavailable>

## Checks

- Script listing: passed/failed/skipped
- Tests: passed/failed/skipped/blocked
- Typecheck: passed/failed/skipped/blocked
- Lint: passed/failed/skipped/blocked
- Build: passed/failed/skipped/blocked

## Findings

- <confirmed finding>
- <confirmed finding>

## Compatibility notes

- <possible risk>
- <possible risk>

## Recommended next steps

- <next step>
- <next step>

## Safety notes

- No lockfiles were deleted.
- No dependencies were installed.
- No package scripts were modified.
- No migration was performed.
```

Rules:

- Do not call status `complete` if Bun was missing and no checks could run.
- Use `blocked` if there is no `package.json` or Bun is unavailable and Bun commands were required.
- Use `incomplete_data` if some checks were skipped because scripts/dependencies were missing.
- Mention when commands were skipped to avoid modifying the project.
- Keep output concise.

---

# Examples

## Example 1

User:

> Use /ReAction-check-bun-project-health. Check if this repo is Bun-ready.

Expected:

- inspect package.json and lockfiles
- run `bun --version`
- run `bun run`
- run available test/typecheck/build scripts if safe
- report readiness

## Example 2

User:

> Can we migrate this project to Bun?

Expected:

- explain this ReAction does not migrate
- run health/migration-readiness checks
- report blockers and next steps
- do not modify files

## Example 3

User:

> Run Bun tests and tell me why they fail.

Expected:

- run `bun test`
- capture failure output
- summarize failing files/errors
- do not edit code

# End of ReAction
