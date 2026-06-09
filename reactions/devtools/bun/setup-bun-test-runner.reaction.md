---
id: setup-bun-test-runner
name: Setup Bun Test Runner
version: 0.1.0
description: Safely add or improve a Bun test setup for a JavaScript or TypeScript project using inspection-first planning, confirmation gates, minimal test files, and verification.
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
  requires_confirmation_before_file_changes: true
  requires_confirmation_before_dependency_install: true
  never_replace_existing_test_setup_without_confirmation: true
  never_delete_tests: true
  never_update_snapshots_by_default: true
  never_modify_source_by_default: true
  never_print_secrets: true
---

# ReAction: Setup Bun Test Runner

## Purpose

Safely add or improve a Bun test setup for a JavaScript or TypeScript project.

Use this ReAction when a project has:

- no test script
- no test files
- an incomplete Bun test setup
- a migrated Bun project that needs tests
- a small library or app that needs a minimal Bun test baseline
- a project owner explicitly asking to add Bun tests

Do not use this ReAction just to run existing tests.

For running and diagnosing existing tests, use:

```txt
/ReAction-run-bun-test-and-diagnose
```

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Important Scope

This is a setup ReAction.

It may modify files only after explicit confirmation.

It should usually add the smallest useful Bun test setup.

It should not replace existing test tooling blindly.

It should not delete or rewrite existing tests.

It should not install dependencies without explicit confirmation.

It should not add DOM/component testing dependencies unless the project needs DOM/component tests and the user confirms.

Default safe setup:

* add or update a test script such as `"test": "bun test"`
* add a minimal test file using `bun:test`
* run `bun test`
* report what changed

Optional setup:

* add `bunfig.toml` test config
* add `tests/` folder
* add DOM test setup with happy-dom
* add React Testing Library setup
* add CI guidance

Optional setup requires explicit confirmation when it installs dependencies or changes config.

---

# Execution Modes

## Plan-only mode

Use this mode when:

* Bun CLI is missing
* the user has not confirmed file changes
* existing test setup is complex
* the project already uses Jest/Vitest/Playwright
* package manager state is ambiguous
* the safest setup is unclear

Plan-only mode should inspect files and return a setup plan without changing anything.

## Setup mode

Use this mode only after explicit confirmation.

Setup mode may:

* add or update a test script in `package.json`
* add a minimal Bun test file
* optionally create `tests/`
* optionally add `bunfig.toml` test config
* optionally install dev dependencies only after confirmation
* run `bun test`
* report verification results

Do not enter setup mode silently.

---

# Required Capabilities

This ReAction describes required capabilities, not provider-specific tool names.

Minimum capabilities for plan-only mode:

* inspect current directory
* list files
* read files
* read `package.json`
* parse JSON
* detect test scripts
* detect test files
* detect existing test frameworks
* detect Bun availability
* produce final report

Additional capabilities for setup mode:

* edit files
* create files
* run terminal commands
* read command stdout
* read command stderr
* parse text output
* detect command failures
* stop on interactive prompts
* record file changes
* produce verification report

No browser capability is required by default.

---

# Cross-platform Rules

This ReAction must work across:

* Windows CMD
* Windows PowerShell
* macOS terminal
* Linux shell

Rules:

* Prefer command execution as command + args, not shell strings.
* Do not rely on Unix-only commands like `cat`, `grep`, `sed`, `awk`, `rm`, `ls`, `tail`, or `date`.
* Do not rely on Windows-only commands like `dir`, `type`, or PowerShell-specific syntax.
* Use file-read/list capability to inspect files.
* Use terminal only for Bun/runtime/package-manager/test commands.
* Do not pipe output through OS-specific commands.

Preferred command representation:

```json
{
  "command": "bun",
  "args": ["test"]
}
```

Shell strings are acceptable only if the runner has no command+args interface.

---

# Bun Test Facts To Follow

Use Bun’s built-in test runner.

Default test command:

```json
{ "command": "bun", "args": ["test"] }
```

A minimal Bun test should import from `bun:test`:

```ts
import { expect, test } from "bun:test";

test("example", () => {
  expect(1 + 1).toBe(2);
});
```

Use Bun-discoverable test file names, such as:

```txt
tests/example.test.ts
tests/example.spec.ts
src/example.test.ts
src/example.spec.ts
```

Prefer `tests/example.test.ts` for a new generic setup unless the project already has a different convention.

Do not add DOM testing setup by default.

For DOM/component tests, use a separate confirmation gate because adding happy-dom or React Testing Library may require dev dependencies and configuration.

---

# Safety Rules

## Always forbidden without explicit confirmation

Do not run these unless the user confirms:

```json
{ "command": "bun", "args": ["add", "-d", "@happy-dom/global-registrator"] }
{ "command": "bun", "args": ["add", "-d", "@testing-library/react", "@testing-library/jest-dom"] }
{ "command": "bun", "args": ["install"] }
{ "command": "npm", "args": ["install"] }
{ "command": "pnpm", "args": ["install"] }
{ "command": "yarn", "args": ["install"] }
```

Do not modify these without a plan and confirmation:

```txt
package.json
bunfig.toml
tsconfig.json
tests/*
test/*
__tests__/*
.github/workflows/*
```

## Always forbidden

* Do not delete existing tests.
* Do not delete lockfiles.
* Do not replace Jest/Vitest/Playwright without explicit confirmation.
* Do not update snapshots by default.
* Do not rewrite CI blindly.
* Do not print secrets.
* Do not print full environment variables.
* Do not commit `node_modules`.
* Do not claim setup succeeded unless verification passes or skipped verification is clearly explained.

---

# Working State

Maintain this working state mentally or in runner state:

```json
{
  "user_request": "",
  "execution_mode": "plan_only | setup | unknown",
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
    "detectedTestFrameworks": [],
    "testFiles": [],
    "lockfiles": [],
    "testConfigFiles": []
  },
  "bun_context": {
    "bunInstalled": false,
    "bunAvailableOnPath": false,
    "bunVersion": "",
    "alreadyUsingBun": false
  },
  "setup_plan": {
    "recommended": false,
    "riskLevel": "low | medium | high",
    "requiresConfirmation": true,
    "plannedChanges": [],
    "commands": [],
    "verification": []
  },
  "setup_result": {
    "filesChanged": [],
    "commandsRun": [],
    "verificationResults": [],
    "remainingRisks": []
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand Setup Request

## Skill

Bun Test Setup Request Parsing Skill

## Detailed skill behavior

The agent should determine whether the user wants a plan only or wants the agent to add a Bun test setup.

The user may say:

* “set up Bun tests”
* “add Bun test runner”
* “add a test script”
* “this project has no tests”
* “add example Bun test”
* “make this repo use bun test”
* “set up React component tests with Bun”

The agent should normalize the request into:

* `plan-only`
* `minimal-bun-test-setup`
* `dom-test-setup`
* `react-component-test-setup`
* `ci-guidance-only`

Default to `minimal-bun-test-setup` only after confirmation.

If the user asks for DOM or React component tests, the agent should identify that extra dependencies/config may be needed and require confirmation.

If the user only asks to run tests, redirect to `/ReAction-run-bun-test-and-diagnose`.

## Rules

* Default to plan-only until confirmation.
* Do not assume existing test frameworks should be removed.
* Do not auto-install dependencies.
* Do not update snapshots.
* If Bun is missing, return a setup plan and explain setup verification cannot run yet.
* If the project is not JS/TS, report blocked.

## Pause conditions

- current directory is unclear
- `package.json` is missing
- existing test setup is complex
- user asks to replace existing test framework
- user asks to install dependencies
- user asks for DOM/component setup
- command/file inspection is unavailable

## Exit criteria

Setup intent is clear.

## Phase output

```json
{
  "mode": "plan-only | minimal-bun-test-setup | dom-test-setup | react-component-test-setup | ci-guidance-only",
  "readOnlyUntilConfirmation": true,
  "requiresConfirmationBeforeChanges": true
}
```

---

# Phase 2: Inspect Project and Existing Test Setup

## Skill

JavaScript Test Setup Static Inspection Skill

## Detailed skill behavior

The agent should inspect the project without modifying files.

The agent should look for:

* `package.json`
* `bun.lock`
* `bun.lockb`
* `package-lock.json`
* `pnpm-lock.yaml`
* `yarn.lock`
* `bunfig.toml`
* `tsconfig.json`
* `vitest.config.ts`
* `vitest.config.js`
* `jest.config.js`
* `jest.config.ts`
* `playwright.config.ts`
* `.github/workflows/*`
* test files matching:
  - `*.test.ts`
  - `*.test.tsx`
  - `*.test.js`
  - `*.test.jsx`
  - `*_test.ts`
  - `*_test.tsx`
  - `*_test.js`
  - `*_test.jsx`
  - `*.spec.ts`
  - `*.spec.tsx`
  - `*.spec.js`
  - `*.spec.jsx`
  - `*_spec.ts`
  - `*_spec.tsx`
  - `*_spec.js`
  - `*_spec.jsx`

The agent should read `package.json` and extract:

* package name
* `"type"`
* scripts
* dependencies
* devDependencies
* packageManager field
* workspaces field

Detect test frameworks/tools:

* `bun:test`
* Jest
* Vitest
* Playwright
* Cypress
* Testing Library
* happy-dom
* jsdom
* TypeScript
* tsx

Detect whether `package.json` already has:

* `test`
* `test:bun`
* `test:unit`
* `test:e2e`
* `test:watch`

Detect whether there are no useful tests.

## Rules

* Use file reads, not shell-specific commands.
* Do not edit files.
* Do not delete files.
* Do not infer too strongly from one signal.
* Existing test setup must be preserved unless user confirms changes.
* Missing `package.json` blocks the ReAction.

## Pause conditions

- `package.json` is missing
- file reading is unavailable
- project root is ambiguous
- existing test setup is complex and intended setup is unclear

## Exit criteria

Existing test setup is known.

## Phase output

```json
{
  "packageName": "",
  "scripts": [],
  "detectedTestFrameworks": [],
  "testFiles": [],
  "hasUsefulTestSetup": false,
  "recommendedSetupType": "minimal | dom | react | none"
}
```

---

# Phase 3: Check Bun Availability

## Skill

Bun CLI Availability and Setup Readiness Skill

## Detailed skill behavior

The agent should check whether Bun CLI is available.

Run:

```json
{ "command": "bun", "args": ["--version"] }
```

If Bun exists:

- record version
- setup verification can run after changes

If Bun is missing:

- do not install Bun
- do not run install scripts
- continue plan-only mode
- report that setup files can be planned but verification cannot run until Bun is installed

The agent may also check Node version:

```json
{ "command": "node", "args": ["--version"] }
```

## Rules

- Do not auto-install Bun.
- Do not run `curl | bash`.
- Do not run PowerShell install scripts.
- Missing Bun does not prevent creating a setup plan.
- Missing Bun prevents verification with `bun test`.

## Pause conditions

- user asks to install Bun
- terminal command capability is unavailable and setup verification was requested
- Bun is missing and user wants verified setup now

## Exit criteria

Bun availability is known.

## Phase output

```json
{
  "bunInstalled": true,
  "bunAvailableOnPath": true,
  "bunVersion": "",
  "verificationPossible": true
}
```

---

# Phase 4: Create Setup Plan

## Skill

Safe Bun Test Setup Planning Skill

## Detailed skill behavior

The agent should create a concrete setup plan before modifying files.

The plan should include:

* detected current test setup
* whether existing test setup should be preserved
* planned package.json script changes
* planned test file path
* planned test file content type
* whether dependencies are needed
* whether bunfig.toml is needed
* whether DOM/component testing is requested
* verification command
* risks
* confirmation required

Recommended minimal setup:

1. Add `"test": "bun test"` only if no useful `test` script exists.
2. If a `test` script already exists, prefer adding `"test:bun": "bun test"` instead of replacing it.
3. Add `tests/example.test.ts` when no test files exist.
4. Use `import { expect, test } from "bun:test";`.
5. Run `bun test` if Bun is available.

Example minimal test file:

```ts
import { expect, test } from "bun:test";

test("example", () => {
  expect(1 + 1).toBe(2);
});
```

Optional DOM setup:

* requires confirmation
* may require `@happy-dom/global-registrator`
* may require `bunfig.toml` preload
* should not be added unless the project actually needs DOM tests or user requested it

Optional React Testing Library setup:

* requires confirmation
* may require `@testing-library/react`
* may require `@testing-library/jest-dom`
* should not be added unless user requested React component tests

### Rules

- Do not modify files in this phase.
- Do not run installs in this phase.
- Do not replace existing test scripts without confirmation.
- Prefer additive script names when tests already exist.
- Keep setup minimal by default.
- Do not add DOM setup by default.
- Do not add CI changes by default.
- If risks are high, recommend plan-only first.

### Exit criteria

Setup plan is ready for confirmation.

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

Explicit Bun Test Setup Confirmation Skill

### Detailed skill behavior

Before modifying anything, the agent must ask for explicit confirmation.

The confirmation message should summarize:

- files that may be changed
- scripts that may be added
- test files that may be created
- dependencies that may be installed, if any
- whether existing test setup will be preserved
- verification commands to run

The agent should offer safe options:

1. Plan only
2. Add minimal Bun test setup
3. Add Bun test script only
4. Add example test file only
5. Add DOM test setup
6. Add React component test setup
7. Add CI guidance only

Default recommendation:

```txt
Add minimal Bun test setup and preserve existing test tooling.
```

### Rules

- Do not proceed without user confirmation.
- Do not treat vague approval as permission to install dependencies.
- Dependency installation requires explicit separate confirmation.
- Existing test framework replacement requires explicit separate confirmation.
- CI changes require explicit separate confirmation.

### Exit criteria

User has confirmed the allowed setup scope.

### Phase output

```json
{
  "confirmed": true,
  "allowedChanges": [],
  "allowPackageJsonEdit": true,
  "allowTestFileCreation": true,
  "allowDependencyInstall": false,
  "allowBunfigEdit": false,
  "allowCiUpdate": false,
  "replaceExistingTestSetup": false
}
```

---

## Phase 6: Apply Setup

### Skill

Controlled Bun Test Setup Execution Skill

### Detailed skill behavior

This phase runs only after confirmation.

The agent should apply only the confirmed changes.

Common minimal setup path:

1. Update `package.json`.
2. Add `"test": "bun test"` if no useful `test` script exists.
3. If `test` already exists, add `"test:bun": "bun test"` instead.
4. Add `tests/example.test.ts` only if no test files exist or user confirmed adding a sample.
5. Do not delete existing test files.
6. Do not install dependencies unless explicitly confirmed.
7. Do not edit source files.

For TypeScript projects, prefer `.test.ts`.

For JavaScript-only projects, prefer `.test.js`.

For React/TSX projects, do not add component/DOM tests by default. Add only a basic non-DOM smoke test unless user confirmed DOM setup.

Example TypeScript test:

```ts
import { expect, test } from "bun:test";

test("example", () => {
  expect(1 + 1).toBe(2);
});
```

Example JavaScript test:

```js
import { expect, test } from "bun:test";

test("example", () => {
  expect(1 + 1).toBe(2);
});
```

Optional DOM setup, only if confirmed:

- add preload file such as `test-setup.ts`
- add `[test] preload = ["./test-setup.ts"]` to `bunfig.toml`
- install required dev dependencies only after explicit confirmation

The agent must record every changed file.

### Rules

- Apply only confirmed changes.
- Use stable formatting for JSON.
- Preserve existing scripts.
- Prefer additive changes.
- Do not install dependencies unless confirmed.
- Do not delete tests.
- Do not modify source code.
- Do not rewrite CI without confirmation.
- Record file changes.

### Pause conditions

- package.json parse fails
- a target test file already exists
- adding script would overwrite existing behavior
- dependency install is required but not confirmed
- existing test setup conflicts with requested setup

### Exit criteria

Confirmed setup steps are applied or safely stopped.

### Phase output

```json
{
  "filesChanged": [],
  "scriptsAdded": [],
  "testFilesAdded": [],
  "dependenciesInstalled": [],
  "stoppedEarly": false,
  "stopReason": ""
}
```

---

## Phase 7: Verify Setup

### Skill

Post-setup Bun Test Verification Skill

### Detailed skill behavior

The agent should verify the setup after changes.

Run only if Bun is installed and command execution is available.

Recommended verification:

```json
{ "command": "bun", "args": ["test"] }
```

If the setup added `test:bun`, also acceptable:

```json
{ "command": "bun", "args": ["run", "test:bun"] }
```

The agent should summarize verification as passed, failed, skipped, or blocked.

If Bun is missing, report verification as skipped and explain why.

If verification fails, do not hide it. Report the failure and suggest next steps.

### Rules

- Use command + args.
- Do not install missing dependencies automatically.
- Do not update snapshots.
- Do not modify files to fix failures unless user asks separately.
- Redact sensitive values from output.
- Do not claim success unless test verification passes or skipped verification is clearly explained.

### Exit criteria

Setup verification results are known.

### Phase output

```json
{
  "verificationResults": [
    {
      "command": "bun test",
      "status": "passed | failed | skipped | blocked",
      "summary": ""
    }
  ],
  "setupVerified": true
}
```

---

## Phase 8: Final Report

### Skill

Bun Test Setup Reporting Skill

### Detailed skill behavior

The final report should clearly distinguish between plan-only and completed setup.

It should list:

- what was detected
- what was planned
- what was changed
- what commands ran
- what verification passed/failed
- what remains risky
- whether existing test setup was preserved
- whether dependencies were installed
- whether Bun was available

The report should not claim complete setup if verification failed.

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
# Bun Test Setup Report

Status: complete | blocked | failed | incomplete_data | plan_only
Mode: plan-only | setup

## Project

- Package: <name or unavailable>
- Existing test frameworks: <list or none>
- Existing test scripts: <list or none>
- Existing test files: <count/list or none>
- Bun installed: yes/no
- Bun version: <version or unavailable>

## Setup plan

- Risk level: low/medium/high
- Planned changes:
  - <change>
  - <change>
- Confirmation required: yes/no

## Changes made

- Files changed:
  - <file or none>
- Scripts added:
  - <script or none>
- Test files added:
  - <file or none>
- Dependencies installed:
  - <dependency or none>
- Existing test setup preserved: yes/no

## Verification

- `bun test`: passed/failed/skipped/blocked
- Notes: <summary>

## Remaining risks

- <risk or none>
- <risk or none>

## Recommended next steps

- <next step>
- <next step>

## Safety notes

- No existing tests were deleted.
- No existing test framework was replaced without confirmation.
- No dependencies were installed without confirmation.
- No snapshots were updated.
- No source files were modified unless explicitly confirmed.
- No secrets were printed.
```

Rules:

- Use `plan_only` when no setup was executed.
- Use `complete` only when confirmed setup steps completed and verification is acceptable.
- Use `incomplete_data` when Bun is missing or verification could not fully run.
- Use `blocked` when project inspection or required confirmation is missing.
- Use `failed` when setup was attempted and failed.
- Keep output concise.

---

# Examples

## Example 1: No tests

User:

> Use /ReAction-setup-bun-test-runner. Add Bun tests to this project.

Expected:

- inspect project
- detect no useful tests
- create setup plan
- ask for confirmation
- add `test` script
- add minimal example test
- run `bun test`
- return setup report

## Example 2: Existing Jest setup

User:

> Use /ReAction-setup-bun-test-runner. Add Bun testing.

Expected:

- inspect project
- detect Jest setup
- preserve Jest
- suggest adding `test:bun` instead of replacing `test`
- ask for confirmation
- do not remove Jest

## Example 3: Bun missing

User:

> Use /ReAction-setup-bun-test-runner. Set up Bun tests.

Expected:

- inspect project
- detect Bun missing
- create setup plan
- do not install Bun automatically
- return plan or incomplete setup report
- explain verification requires Bun on PATH

## Example 4: React component tests

User:

> Use /ReAction-setup-bun-test-runner. Add React component tests.

Expected:

- inspect project
- detect React
- explain DOM setup may require happy-dom and Testing Library dependencies
- ask for explicit confirmation before dependency install/config changes
- do not add DOM setup silently

# End of ReAction
