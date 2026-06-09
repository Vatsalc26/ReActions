---
id: migrate-project-to-bun
name: Migrate Project to Bun
version: 0.1.0
description: Safely migrate a JavaScript or TypeScript project to Bun using inspection-first planning, explicit confirmation gates, controlled file changes, and post-migration verification.
category: devtools
subcategory: bun
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: cli_with_confirmation_gates
supported_project_policy: javascript_or_typescript_project
browser_verification_required_for_success: false
terminal_verification_required_for_success: true
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_install: true
  requires_confirmation_before_lockfile_removal: true
  requires_confirmation_before_ci_changes: true
  never_delete_lockfiles_without_confirmation: true
  never_modify_package_json_without_plan: true
  never_claim_success_without_verification: true
  never_print_secrets: true
---

# ReAction: Migrate Project to Bun

## Purpose

Safely migrate a JavaScript or TypeScript project to Bun.

This ReAction is for repeated tasks such as:

- migrate an npm project to Bun
- migrate a pnpm project to Bun
- migrate a Yarn project to Bun
- add Bun as the project package manager
- create a Bun lockfile
- update project docs to use Bun commands
- verify tests/build after migration

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

## Important Scope

This is a migration ReAction.

Unlike read-only Bun health checks, this ReAction may modify files after explicit user confirmation.

However, it must always inspect and plan first.

Do not immediately run migration commands.

Do not immediately delete old lockfiles.

Do not immediately rewrite package scripts.

Do not immediately rewrite CI.

Safe migration means:

1. inspect
2. plan
3. ask for confirmation
4. apply limited changes
5. verify
6. report

## Execution Modes

### Plan-only mode

Use this mode when:

* the user asks “can this be migrated?”
* Bun CLI is missing
* the user has not confirmed file changes
* the project has package-manager ambiguity
* migration risks are unclear

Plan-only mode should inspect files and return a migration plan without changing anything.

### Migration mode

Use this mode only after explicit user confirmation.

Migration mode may:

* run `bun install`
* create `bun.lock`
* update README commands
* optionally update CI commands
* optionally remove old lockfiles only after explicit confirmation
* verify with tests/build/typecheck/lint where available

Do not enter migration mode silently.

## Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for plan-only mode:

- inspect current directory
- list files
- read files
- read `package.json`
- parse JSON
- detect lockfiles
- detect package manager
- detect scripts
- detect CI config files
- produce final report

Additional capabilities for migration mode:

- edit files
- run terminal commands
- read command stdout
- read command stderr
- parse text output
- detect command failures
- stop on interactive prompts
- record file changes
- produce final verification report

No browser capability is required by default.

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
- Use terminal only for package-manager/runtime commands.
- Do not pipe output through OS-specific commands.

Preferred command representation:

```json
{
  "command": "bun",
  "args": ["install"]
}
```

Shell strings are acceptable only if the runner has no command+args interface.

## Safety Rules

### Always forbidden without explicit confirmation

Do not run these unless the user confirms migration mode:

```json
{ "command": "bun", "args": ["install"] }
{ "command": "bun", "args": ["add", "package-name"] }
{ "command": "bun", "args": ["remove", "package-name"] }
```

Do not delete or rename these without explicit confirmation:

```txt
package-lock.json
pnpm-lock.yaml
yarn.lock
bun.lock
bun.lockb
```

Do not modify these without a plan:

```txt
package.json
README.md
.github/workflows/*
.env*
.npmrc
.yarnrc.yml
bunfig.toml
```

### Always forbidden

* Do not commit `node_modules`.
* Do not print secrets.
* Do not print full environment variables.
* Do not rewrite Git history.
* Do not force-push.
* Do not claim migration succeeded if install/test/build failed.
* Do not hide failed verification.

## Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "plan_only | migration | unknown",
  "project_context": {
    "cwd": "",
    "hasPackageJson": false,
    "packageName": "",
    "packageType": "",
    "scripts": {},
    "dependencies": [],
    "devDependencies": [],
    "packageManagerField": "",
    "workspaces": false,
    "detectedFrameworks": [],
    "detectedPackageManagers": [],
    "lockfiles": [],
    "ciFiles": [],
    "docsFiles": []
  },
  "bun_context": {
    "bunInstalled": false,
    "bunAvailableOnPath": false,
    "bunVersion": "",
    "alreadyUsingBun": false
  },
  "migration_plan": {
    "recommended": false,
    "riskLevel": "low | medium | high",
    "requiresConfirmation": true,
    "plannedChanges": [],
    "commands": [],
    "verification": []
  },
  "migration_result": {
    "filesChanged": [],
    "commandsRun": [],
    "verificationResults": [],
    "remainingRisks": []
  },
  "final_status": "not_started"
}
```

---

## Phase 1: Understand Migration Request

### Skill

Bun Migration Request Parsing Skill

### Detailed skill behavior

The agent should determine whether the user wants a migration plan only or an actual migration.

The user may say:

- “migrate this project to Bun”
- “can this project use Bun?”
- “replace npm with Bun”
- “move from pnpm to Bun”
- “switch package manager to Bun”
- “make this repo Bun-ready”

The agent should normalize the request into:

- `plan-only`
- `migration-with-confirmation`
- `verification-after-migration`

If the user asks generally whether migration is possible, start in plan-only mode.

If the user clearly asks to migrate, still inspect and present a migration plan before making changes.

The agent should not run install or delete lockfiles during this phase.

### Rules

- Default to plan-only until confirmation.
- Do not assume the user wants old lockfiles deleted.
- Do not assume CI should be rewritten.
- Do not auto-install Bun.
- If Bun is missing, provide a plan and pause before install guidance.
- If the project is not JS/TS, report blocked.

### Pause conditions

- current directory is unclear
- `package.json` is missing
- user asks to delete lockfiles immediately
- user asks to force migration despite unresolved risks
- command/file inspection is unavailable

### Exit criteria

Migration intent is clear.

### Phase output

```json
{
  "mode": "plan-only | migration-with-confirmation | verification-after-migration",
  "readOnlyUntilConfirmation": true,
  "requiresConfirmationBeforeChanges": true
}
```

---

## Phase 2: Inspect Project and Package Manager

### Skill

Package Manager and Project Static Inspection Skill

### Detailed skill behavior

The agent should inspect the project without modifying files.

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
- workspace/monorepo files
- framework config files
- CI files under `.github/workflows/`
- README or docs with package-manager commands

The agent should read `package.json` and extract:

- package name
- `"type"`
- scripts
- dependencies
- devDependencies
- packageManager field
- workspaces field
- preinstall/postinstall scripts

The agent should detect current package manager from:

- lockfiles
- packageManager field
- CI commands
- README commands
- scripts
- package-manager config files

The agent should detect ambiguity if multiple lockfiles exist.

### Rules

- Use file reads, not shell-specific commands.
- Do not edit files.
- Do not delete files.
- Do not infer too strongly from one signal.
- Multiple lockfiles must be reported as ambiguity.
- Preinstall/postinstall scripts must be flagged as migration risk.

### Pause conditions

- `package.json` is missing
- file reading is unavailable
- project root is ambiguous

### Exit criteria

Project and package-manager state is known.

### Phase output

```json
{
  "packageName": "",
  "detectedPackageManagers": [],
  "primaryPackageManager": "",
  "lockfiles": [],
  "packageManagerField": "",
  "scripts": [],
  "ciFiles": [],
  "migrationRisks": []
}
```

---

## Phase 3: Check Bun Availability

### Skill

Bun CLI Availability and Migration Readiness Skill

### Detailed skill behavior

The agent should check whether Bun CLI is available.

Run:

```json
{ "command": "bun", "args": ["--version"] }
```

If Bun exists:

- record version
- continue planning with CLI availability

If Bun is missing:

- do not install Bun
- do not run install scripts
- continue plan-only mode
- report that migration commands cannot run until Bun is installed

The agent may also check Node version:

```json
{ "command": "node", "args": ["--version"] }
```

### Rules

- Do not auto-install Bun.
- Do not run `curl | bash`.
- Do not run PowerShell install scripts.
- Missing Bun does not prevent creating a migration plan.
- Missing Bun prevents actual migration execution.

### Pause conditions

- user asks to install Bun
- terminal command capability is unavailable and migration execution was requested
- Bun is missing and user wants actual migration now

### Exit criteria

Bun availability is known.

### Phase output

```json
{
  "bunInstalled": true,
  "bunAvailableOnPath": true,
  "bunVersion": "",
  "migrationExecutionPossible": true
}
```

---

## Phase 4: Create Migration Plan

### Skill

Safe Bun Migration Planning Skill

### Detailed skill behavior

The agent should create a concrete migration plan before modifying anything.

The plan should include:

- detected current package manager
- lockfiles present
- whether Bun is already used
- whether Bun CLI is available
- files likely to change
- commands likely to run
- verification commands
- risks
- confirmation required

Recommended migration commands, only after confirmation:

```json
{ "command": "bun", "args": ["install"] }
```

Optional verification commands:

```json
{ "command": "bun", "args": ["test"] }
{ "command": "bun", "args": ["run", "typecheck"] }
{ "command": "bun", "args": ["run", "lint"] }
{ "command": "bun", "args": ["run", "build"] }
```

Only run verification scripts that exist in `package.json`.

The plan may suggest README updates such as:

```txt
npm install  -> bun install
npm run dev  -> bun run dev
npm test     -> bun test
npm run build -> bun run build
```

But only update docs after user confirmation.

The plan may suggest CI updates, but CI changes require separate confirmation.

The plan should not automatically delete old lockfiles. It may recommend keeping old lockfiles initially or removing them only after verification passes.

### Rules

- Do not modify files in this phase.
- Do not run `bun install` in this phase.
- Do not delete lockfiles in this phase.
- Keep old lockfiles until user confirms removal.
- CI edits require explicit confirmation.
- README/docs edits require confirmation but are safer than lockfile deletion.
- If risks are high, recommend plan-only first.

### Exit criteria

Migration plan is ready for confirmation.

### Phase output

```json
{
  "recommended": true,
  "riskLevel": "low | medium | high",
  "plannedChanges": [],
  "commands": [],
  "verification": [],
  "requiresConfirmation": true
}
```

---

## Phase 5: Confirmation Gate

### Skill

Explicit Migration Confirmation Skill

### Detailed skill behavior

Before modifying anything, the agent must ask for explicit confirmation.

The confirmation message should summarize:

- files that may be changed
- commands that may be run
- whether lockfiles will be kept or removed
- whether CI will be changed
- verification commands to run

The agent should offer safe options:

1. Plan only
2. Migrate and keep old lockfiles
3. Migrate and remove old lockfiles after verification
4. Update docs only
5. Update CI only after separate confirmation

Default recommendation:

```txt
Migrate and keep old lockfiles until verification passes.
```

### Rules

- Do not proceed without user confirmation.
- Do not treat vague approval as permission to delete lockfiles.
- Lockfile deletion requires explicit separate confirmation.
- CI rewrite requires explicit separate confirmation.
- Snapshot updates or test fixes are outside this ReAction unless separately requested.

### Exit criteria

User has confirmed the allowed migration scope.

### Phase output

```json
{
  "confirmed": true,
  "allowedChanges": [],
  "allowInstall": true,
  "allowDocsUpdate": true,
  "allowCiUpdate": false,
  "allowOldLockfileRemoval": false
}
```

---

## Phase 6: Apply Migration

### Skill

Controlled Bun Migration Execution Skill

### Detailed skill behavior

This phase runs only after confirmation.

The agent should apply only the confirmed changes.

Common safe migration path:

1. Run `bun install`.
2. Confirm `bun.lock` exists.
3. Do not delete old lockfiles unless separately confirmed.
4. Update README/docs commands if confirmed.
5. Update packageManager field only if confirmed and appropriate.
6. Update CI only if separately confirmed.
7. Do not modify source code unless needed and confirmed.

Suggested packageManager field format, if user confirms:

```json
"packageManager": "bun@<detected-version>"
```

The agent must record every changed file.

The agent must stop if install fails.

### Rules

- Use command + args.
- Do not run install without confirmation.
- Do not delete lockfiles without confirmation.
- Do not edit CI without confirmation.
- Do not edit source files by default.
- Stop on interactive prompts.
- Stop on install failure.
- Record file changes.

### Pause conditions

- `bun install` fails
- Bun CLI is missing
- install asks interactive questions
- lockfile deletion requested but not explicitly confirmed
- CI changes are requested but unclear

### Exit criteria

Confirmed migration steps are applied or safely stopped.

### Phase output

```json
{
  "commandsRun": [],
  "filesChanged": [],
  "stoppedEarly": false,
  "stopReason": ""
}
```

---

## Phase 7: Verify Migration

### Skill

Post-migration Bun Verification Skill

### Detailed skill behavior

The agent should verify the migration after changes.

Run only scripts that exist in `package.json`.

Recommended order:

1. `bun --version`
2. `bun run`
3. `bun test` if tests exist or test script exists
4. `bun run typecheck` if script exists
5. `bun run lint` if script exists
6. `bun run build` if script exists

Do not run long-running scripts by default:

- `dev`
- `start`
- `serve`
- `watch`

The agent should summarize each verification command as passed, failed, skipped, or blocked.

If verification fails, do not hide it. Report the failure and suggest next steps.

### Rules

- Do not claim success unless verification passes or skipped checks are clearly explained.
- Do not install extra packages to fix verification failures.
- Do not modify source files to fix failures unless user asks separately.
- Do not update snapshots unless user explicitly confirms.
- Redact sensitive values from output.

### Exit criteria

Migration verification results are known.

### Phase output

```json
{
  "verificationResults": [
    {
      "command": "",
      "status": "passed | failed | skipped | blocked",
      "summary": ""
    }
  ],
  "migrationVerified": true
}
```

---

## Phase 8: Final Report

### Skill

Bun Migration Reporting Skill

### Detailed skill behavior

The final report should clearly distinguish between plan-only and completed migration.

It should list:

- what was detected
- what was planned
- what was changed
- what commands ran
- what verification passed/failed
- what remains risky
- whether old lockfiles were kept or removed
- whether CI was changed
- whether docs were updated

The report should not claim complete migration if verification failed.

### Status values

```txt
complete
blocked
failed
incomplete_data
plan_only
```

### Final report format

```md
# Bun Migration Report

Status: complete | blocked | failed | incomplete_data | plan_only
Mode: plan-only | migration

## Project

- Package: <name or unavailable>
- Current package manager: <npm/pnpm/yarn/bun/unclear>
- Lockfiles detected: <list>
- Bun installed: yes/no
- Bun version: <version or unavailable>

## Migration plan

- Risk level: low/medium/high
- Planned changes:
  - <change>
  - <change>
- Confirmation required: yes/no

## Changes made

- Files changed:
  - <file or none>
- Commands run:
  - <command or none>
- Old lockfiles removed: yes/no
- Docs updated: yes/no
- CI updated: yes/no

## Verification

- `bun --version`: passed/failed/skipped
- `bun run`: passed/failed/skipped
- `bun test`: passed/failed/skipped
- `bun run typecheck`: passed/failed/skipped
- `bun run lint`: passed/failed/skipped
- `bun run build`: passed/failed/skipped

## Remaining risks

- <risk or none>
- <risk or none>

## Recommended next steps

- <next step>
- <next step>

## Safety notes

- No lockfiles were deleted without confirmation.
- No CI files were changed without confirmation.
- No source files were modified unless explicitly confirmed.
- No secrets were printed.
```

Rules:

- Use `plan_only` when no migration was executed.
- Use `complete` only when confirmed migration steps completed and verification is acceptable.
- Use `incomplete_data` when Bun is missing or verification could not fully run.
- Use `blocked` when project inspection or required confirmation is missing.
- Use `failed` when migration was attempted and failed.
- Keep output concise.

---

# Examples

## Example 1: Plan only

User:

> Use /ReAction-migrate-project-to-bun. Can this project migrate to Bun?

Expected:

- inspect project
- check Bun availability
- create migration plan
- do not modify files
- return `plan_only`

## Example 2: Migration requested

User:

> Use /ReAction-migrate-project-to-bun. Migrate this npm project to Bun.

Expected:

- inspect project
- create plan
- ask for confirmation
- run `bun install` only after confirmation
- keep old lockfiles unless removal is explicitly confirmed
- verify with available scripts
- return migration report

## Example 3: Bun missing

User:

> Use /ReAction-migrate-project-to-bun. Migrate this to Bun.

Expected:

- inspect project
- detect Bun missing
- do not install Bun automatically
- return plan and blocked/incomplete status
- explain migration execution requires Bun on PATH

## Example 4: User asks to delete old lockfiles

User:

> Migrate to Bun and delete package-lock.json.

Expected:

- inspect project
- create plan
- ask explicit confirmation for lockfile deletion
- only delete after migration and verification if confirmed

# End of ReAction
