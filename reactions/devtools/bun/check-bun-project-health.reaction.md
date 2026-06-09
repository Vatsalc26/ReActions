---
id: check-bun-project-health
name: Check Bun Project Health
version: 0.1.0
description: Check whether a JavaScript or TypeScript project is Bun-ready using static inspection and optional safe Bun CLI checks, then produce a consistent Bun project health report.
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
  pause_before_build_or_test_if_expensive: false
  never_auto_install_bun: true
  never_delete_lockfiles: true
  never_modify_package_json: true
  never_run_migration: true
  never_print_secrets: true
---

# ReAction: Check Bun Project Health

## Purpose

Check whether a JavaScript or TypeScript project is ready to use Bun.

This ReAction can run with or without the Bun CLI.

If Bun is installed, the agent should perform static inspection and safe Bun CLI checks.

If Bun is not installed, the agent should still perform static inspection and return a partial Bun-readiness report.

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

This is a CLI-capable DevTools ReAction with a static fallback.

It must not modify the project by default.

This ReAction is not a Bun migration recipe.

Use this ReAction for inspection, diagnosis, and readiness reporting.

Do not:

- auto-install Bun
- run `curl | bash`
- run PowerShell install scripts
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

## Execution Modes

### Static-only mode

Use this mode when:

- Bun CLI is missing.
- Bun CLI is unavailable on PATH.
- terminal command execution is unavailable.
- the environment blocks command execution.

In static-only mode, the agent should inspect:

- `package.json`
- lockfiles
- package manager signals
- scripts
- dependencies
- devDependencies
- framework config files
- Bun config files
- workspace fields
- CI/package-manager hints if easy to inspect safely

The final report should clearly say:

```txt
Bun CLI was not available, so runtime checks were skipped.
Static project inspection was completed.
```

The status should usually be `incomplete_data`, unless static inspection itself is blocked.

### Full CLI mode

Use this mode when:

- Bun CLI is installed.
- Bun CLI is available on PATH.
- terminal command execution is available.

In full CLI mode, the agent may run safe Bun commands such as:

- `bun --version`
- `bun run`
- `bun test`
- `bun run typecheck`
- `bun run lint`
- `bun run build`

Only run scripts that already exist in `package.json`.

Do not run install or migration commands.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for static-only mode:

- inspect current directory
- list files
- read files
- read `package.json`
- parse JSON
- detect lockfile names
- produce final report
- record phase progress

Additional capabilities for full CLI mode:

- run terminal commands
- read command stdout
- read command stderr
- parse text output
- detect command failures
- detect long-running scripts
- stop on interactive prompts

No browser capability is required.

If a capability is missing:

- continue only if safe
- clearly mark which checks could not be completed
- never claim full CLI health if Bun commands were not run

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
  "args": ["--version"]
}
```

This works across Windows CMD, PowerShell, macOS, and Linux when the runner executes commands as command + args.

Shell strings are acceptable only if the runner has no command+args interface.

## Read-only Safety Rules

Allowed commands by default:

```json
{ "command": "bun", "args": ["--version"] }
{ "command": "bun", "args": ["run"] }
{ "command": "bun", "args": ["test"] }
{ "command": "bun", "args": ["run", "build"] }
{ "command": "bun", "args": ["run", "typecheck"] }
{ "command": "bun", "args": ["run", "lint"] }
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "pnpm", "args": ["--version"] }
{ "command": "yarn", "args": ["--version"] }
```

Use build/test/typecheck/lint commands only when they already exist in `package.json`.

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
- running global install commands
- running shell install scripts
- running long-running dev servers by default

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
    "bunAvailableOnPath": false,
    "bunVersion": "",
    "nodeVersion": "",
    "packageManagerSignals": [],
    "alreadyUsingBun": false,
    "bunLockfile": ""
  },
  "checks": {
    "staticInspection": "",
    "scriptList": "",
    "testResult": "",
    "buildResult": "",
    "typecheckResult": "",
    "lintResult": "",
    "compatibilityNotes": []
  },
  "final_status": "not_started"
}
```

---

## Phase 1: Understand Request

### Skill

Bun Health Request Parsing Skill

### Detailed skill behavior

The agent should understand whether the user wants a general Bun readiness report, a migration-readiness report, or a test/build check.

The user may say:

- “check Bun project health”
- “is this repo ready for Bun?”
- “check if this project uses Bun”
- “can I migrate this to Bun?”
- “does Bun work here?”
- “check tests/build with Bun”
- “run Bun health without installing anything”

The agent should normalize the request into one of these modes:

- `health-check`
- `migration-readiness`
- `test-build-check`

The agent must treat migration requests carefully. If the user asks to migrate to Bun, the agent should explain that this ReAction can inspect migration readiness, but it will not perform migration or modify files.

The agent should identify whether static-only mode is acceptable. By default, static-only mode is acceptable if Bun CLI is missing, because this ReAction is designed to provide useful partial output without Bun.

### Rules

- Default to read-only inspection.
- Static-only inspection is valid when Bun CLI is unavailable.
- If the user asks for install/migration, pause before any write command.
- If the current directory is not a JS/TS project, report blocked.
- Do not guess missing project context.
- Do not auto-install Bun.

### Pause conditions

Pause if:

- the user asks to install Bun
- the user asks to run install/migration commands
- the current directory is unclear
- the project has no `package.json`
- the user wants destructive lockfile cleanup
- command execution is unavailable and file inspection is also unavailable

### Exit criteria

The Bun health-check scope is clear.

### Phase output

```json
{
  "mode": "health-check | migration-readiness | test-build-check",
  "readOnly": true,
  "staticOnlyAllowed": true,
  "requiresConfirmation": false
}
```

---

## Phase 2: Inspect Project Files

### Skill

JavaScript Project Static Inspection Skill

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

The agent should read `package.json` and extract:

- package name
- package `"type"`
- scripts
- dependencies
- devDependencies
- packageManager field
- workspaces field

The agent should detect package manager signals from lockfiles and package metadata.

The agent should detect framework signals from dependencies and config files.

The agent should record ambiguity if multiple lockfiles exist.

### Rules

- Use file reads, not OS-specific shell commands.
- Do not edit files.
- Do not infer too strongly from one signal.
- Multiple lockfiles should be reported as a potential package-manager ambiguity.
- Missing `package.json` blocks the ReAction because this is for JS/TS projects.

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

---

## Phase 3: Check Bun CLI Availability

### Skill

Bun CLI Availability and Fallback Skill

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
- continue with static inspection and compatibility reporting

The agent may also check Node/package-manager versions when useful:

```json
{ "command": "node", "args": ["--version"] }
{ "command": "npm", "args": ["--version"] }
{ "command": "pnpm", "args": ["--version"] }
{ "command": "yarn", "args": ["--version"] }
```

Missing npm/pnpm/yarn is not a failure unless the project clearly depends on that package manager.

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

- `complete` only if static inspection and requested Bun CLI checks were completed.
- `incomplete_data` if static inspection completed but Bun CLI checks were skipped because Bun is missing.
- `blocked` if neither static inspection nor CLI checks could run.
- `failed` if an unexpected error prevented useful reporting.

### Pause conditions

Pause if:

- terminal command capability is unavailable and the user specifically required CLI checks
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
  "bunVersion": "",
  "nodeVersion": "",
  "otherPackageManagers": {}
}
```

---

## Phase 4: Detect Bun Usage & Compatibility Signals

### Skill

Bun Compatibility Signal Analysis Skill

### Detailed skill behavior

The agent should determine whether the project already uses Bun and identify likely compatibility risks.

This phase must work in both static-only mode and full CLI mode.

The agent should check for Bun usage signals:

- `bun.lock`
- `bun.lockb`
- `bunfig.toml`
- packageManager field includes Bun
- package scripts explicitly use `bun`
- README mentions Bun commands if easy to inspect safely

The agent should check for package-manager ambiguity:

- Bun lockfile plus npm lockfile
- Bun lockfile plus pnpm lockfile
- Bun lockfile plus yarn lockfile
- multiple non-Bun lockfiles

The agent should check for possible compatibility risks:

- scripts that assume `npm`, `pnpm`, or `yarn`
- shell-specific scripts
- postinstall/preinstall hooks
- native dependencies
- custom package manager config
- workspaces/monorepo setup
- CI configs that assume another package manager
- dev/start/watch scripts that may be long-running
- dependencies known to often require Node-specific behavior, if obvious from package names

The agent should be conservative. It should not claim something is broken unless the evidence is direct.

### Rules

- Do not modify scripts.
- Do not remove lockfiles.
- Do not claim Bun compatibility is guaranteed.
- If multiple lockfiles exist, report ambiguity.
- If scripts use Unix-only commands, mention cross-platform risk.
- If Bun is missing, still report static compatibility signals.

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

---

## Phase 5: Run Safe Bun Checks

### Skill

Safe Cross-platform Bun Check Execution Skill

### Detailed skill behavior

This phase runs only in full CLI mode.

If execution mode is static-only, the agent should skip this phase and record:

```txt
Skipped because Bun CLI is not installed or not available on PATH.
```

In full CLI mode, the agent should run safe Bun commands using command + args.

First list available Bun scripts:

```json
{ "command": "bun", "args": ["run"] }
```

Then, only if scripts exist in `package.json`, run relevant checks:

```json
{ "command": "bun", "args": ["test"] }
{ "command": "bun", "args": ["run", "typecheck"] }
{ "command": "bun", "args": ["run", "lint"] }
{ "command": "bun", "args": ["run", "build"] }
```

Prefer this order:

1. `bun run`
2. `bun test` if tests appear available or user asked
3. `bun run typecheck` if script exists
4. `bun run lint` if script exists
5. `bun run build` if script exists

The agent should not run scripts that are likely long-running by default:

- `dev`
- `start`
- `serve`
- `watch`

The agent should not run install commands.

The agent should stop on interactive prompts.

The agent should capture stdout/stderr safely and summarize results.

### Windows/CMD support

The agent must run commands in command + args form, for example:

```json
{ "command": "bun", "args": ["test"] }
```

This avoids shell-specific syntax and works in Windows CMD/PowerShell/macOS/Linux when the runner supports command + args.

Do not use:

```bash
bun test | grep fail
```

Do not use:

```bash
cat package.json
```

Do not use:

```cmd
type package.json
```

### Rules

- Run only existing scripts.
- Do not run install commands.
- Do not run dev/start/watch by default.
- Stop on interactive prompts.
- At most one retry for transient failure.
- Capture stdout/stderr safely.
- Do not print secrets from logs.
- Do not run this phase if Bun CLI is missing.

### Pause conditions

Pause if:

- dependencies are missing and install would be required
- the script is long-running
- the script asks for interactive input
- the command would modify files unexpectedly
- user asks to run install

### Exit criteria

Safe check results are captured or skipped with a clear reason.

### Phase output

```json
{
  "scriptList": "passed | failed | skipped",
  "testResult": "passed | failed | skipped | blocked",
  "typecheckResult": "passed | failed | skipped | blocked",
  "lintResult": "passed | failed | skipped | blocked",
  "buildResult": "passed | failed | skipped | blocked",
  "skipReason": ""
}
```

---

## Phase 6: Diagnose Results

### Skill

Bun Static and CLI Health Diagnosis Skill

### Detailed skill behavior

The agent should combine static inspection and optional CLI results into a useful health diagnosis.

The diagnosis must clearly distinguish:

- confirmed facts
- skipped checks
- possible risks
- recommended next steps

The agent should summarize:

- whether Bun is installed
- whether the project already uses Bun
- package-manager signals
- lockfile state
- scripts available
- test/build/typecheck/lint results if run
- checks skipped because Bun CLI was missing
- likely blockers
- compatibility notes
- next recommended action

Common findings:

- Bun missing
- Bun available
- no `package.json`
- multiple lockfiles
- no Bun lockfile
- project uses npm/pnpm/yarn currently
- dependencies not installed
- tests unavailable
- build script missing
- build fails under Bun
- script assumes Node/npm/pnpm/yarn
- script appears long-running
- native dependency may need manual check
- static-only report completed

### Rules

- Do not invent fixes.
- Separate confirmed failures from possible risks.
- Do not say “Bun compatible” unless relevant checks actually passed.
- Prefer “Bun readiness looks good” over absolute claims.
- Do not suggest deleting lockfiles without user confirmation.
- If Bun CLI is missing, say runtime checks were skipped.

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

---

## Phase 7: Generate Final Report

### Skill

Consistent Bun Health Reporting Skill

### Detailed skill behavior

The final report should use the same structure every time.

It should be useful whether Bun CLI was installed or not.

If Bun CLI was missing, the report should still show static inspection findings and clearly label CLI checks as skipped.

The report should not shame the user or imply failure when Bun is simply not installed. It should say what could be checked and what could not be checked.

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
Mode: static-only | full-cli
Request type: health-check | migration-readiness | test-build-check

## Project

- Package: <name or unavailable>
- Frameworks detected: <list or unavailable>
- Package manager signals: <list>
- Lockfiles: <list>
- Already using Bun: yes/no/unclear

## Bun Environment

- Bun installed: yes/no
- Bun available on PATH: yes/no
- Bun version: <version or unavailable>
- Node version: <version or unavailable>

## Static inspection

- package.json found: yes/no
- scripts found: <list or unavailable>
- Bun signals: <list>
- Package-manager ambiguity: <yes/no + details>

## CLI checks

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

- Use `complete` when static inspection and requested CLI checks completed.
- Use `incomplete_data` when static inspection completed but Bun CLI checks were skipped because Bun was missing.
- Use `blocked` when `package.json` is missing or the project cannot be inspected.
- Use `failed` when unexpected errors prevent useful reporting.
- Mention every skipped check and why it was skipped.
- Keep output concise.

---

# Examples

## Example 1: Bun is installed

User:

> Use /ReAction-check-bun-project-health. Check if this repo is Bun-ready.

Expected behavior:

- inspect package.json and lockfiles
- run `bun --version`
- run `bun run`
- run available test/typecheck/build scripts if safe
- report readiness

Expected status:

```txt
complete
```

or:

```txt
incomplete_data
```

if some scripts are missing or skipped.

## Example 2: Bun is not installed

User:

> Use /ReAction-check-bun-project-health. Check if this repo is Bun-ready.

Expected behavior:

- inspect package.json and lockfiles
- try `bun --version`
- detect Bun missing
- do not install Bun
- continue static-only
- report static readiness and skipped CLI checks

Expected status:

```txt
incomplete_data
```

Expected note:

```txt
Bun CLI was not installed or not available on PATH, so runtime checks were skipped.
Static inspection completed.
```

## Example 3: User asks to migrate

User:

> Can we migrate this project to Bun?

Expected behavior:

- explain this ReAction only checks migration readiness
- inspect static signals
- run Bun checks only if Bun exists
- do not modify files
- do not delete lockfiles
- do not run install

## Example 4: User asks to install Bun

User:

> Install Bun and check the project.

Expected behavior:

- pause before install
- explain install commands are outside this ReAction’s default read-only behavior
- ask for explicit confirmation
- do not run install automatically

# End of ReAction
