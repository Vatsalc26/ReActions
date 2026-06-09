---
id: setup-bun-ci-github-actions
name: Setup Bun CI GitHub Actions
version: 0.1.0
description: Safely add or update GitHub Actions CI for a Bun-based JavaScript or TypeScript project using inspection-first planning, confirmation gates, workflow generation, and verification.
category: devtools
subcategory: bun
execution_modes:
  - native_agent
  - reaction_runner
interface_mode: file_edit_with_confirmation_gates
supported_project_policy: javascript_or_typescript_project
browser_verification_required_for_success: false
terminal_verification_required_for_success: false
static_verification_required_for_success: true
safety:
  read_only_until_confirmation: true
  requires_confirmation_before_workflow_changes: true
  requires_confirmation_before_deployment_workflow_changes: true
  never_overwrite_existing_workflows_without_confirmation: true
  never_delete_existing_ci_jobs_without_confirmation: true
  never_add_nonexistent_scripts: true
  never_print_secrets: true
---

# ReAction: Setup Bun CI GitHub Actions

## Purpose

Safely add or update GitHub Actions CI for a Bun-based JavaScript or TypeScript project.

Use this ReAction when a user wants:

- GitHub Actions CI for a Bun project
- CI that installs Bun with `oven-sh/setup-bun@v2`
- CI that runs Bun tests
- CI that runs Bun build checks
- CI that runs typecheck/lint scripts when available
- CI that uses `bun ci` when `bun.lock` exists
- CI that uses `bun install` when no Bun lockfile exists
- a safe workflow without overwriting existing deployment pipelines

The output should always follow the same report format.

The goal:

```txt
Same task. Same quality. Any agent.
```

---

# Important Scope

This is a GitHub Actions CI setup ReAction.

It may edit files only after explicit confirmation.

It should inspect existing workflows before changing anything.

It should preserve existing CI unless the user explicitly confirms replacement.

It should not blindly change deployment workflows.

It should not delete npm/pnpm/yarn CI jobs unless explicitly confirmed.

It should not invent project scripts.

It should not run secrets or print secrets.

Default safe setup:

* create `.github/workflows/bun-ci.yml` if no suitable Bun CI exists
* use `actions/checkout@v4`
* use `oven-sh/setup-bun@v2`
* run `bun ci` when `bun.lock` exists
* otherwise run `bun install`
* run available scripts only:

  * `bun test`
  * `bun run typecheck`
  * `bun run lint`
  * `bun run build`

Do not add commands for scripts that do not exist.

---

# Official Bun CI Facts To Follow

Use the official GitHub Action:

```yaml
- uses: oven-sh/setup-bun@v2
```

Use `bun ci` for reproducible CI installs when `bun.lock` exists and is committed.

`bun ci` is equivalent to:

```bash
bun install --frozen-lockfile
```

Use `bun install` when no Bun lockfile exists yet.

Do not use `bun ci` if `bun.lock` is missing.

---

# Execution Modes

## Plan-only mode

Use this mode when:

* the user asks “what CI should we add?”
* existing workflows are complex
* deployment workflows are present
* project package manager state is ambiguous
* Bun lockfile state is unclear
* user has not confirmed file changes

Plan-only mode should inspect files and return a CI setup plan without changing anything.

## Setup mode

Use this mode only after explicit confirmation.

Setup mode may:

* create `.github/workflows/bun-ci.yml`
* update an existing Bun CI workflow
* add safe Bun CI steps
* optionally update existing Node/npm/pnpm/yarn CI only after confirmation
* verify workflow syntax as text
* verify referenced package scripts exist

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
* inspect `.github/workflows`
* parse YAML as text
* detect package manager signals
* detect Bun lockfile
* detect existing scripts
* produce final report

Additional capabilities for setup mode:

* create files
* edit files
* preserve existing workflow content
* validate references
* produce final verification report

Terminal command execution is optional.

No browser capability is required.

---

# Cross-platform Rules

This ReAction must work across:

* Windows CMD
* Windows PowerShell
* macOS terminal
* Linux shell

Rules:

* Prefer file-read/list/edit capabilities for workflow inspection.
* Do not rely on Unix-only commands like `cat`, `grep`, `sed`, `awk`, `rm`, `ls`, `tail`, or `date`.
* Do not rely on Windows-only commands like `dir`, `type`, or PowerShell-specific syntax.
* Do not print all environment variables.
* Do not print secrets.
* Do not pipe output through OS-specific commands.

This ReAction primarily edits YAML files and should not need shell commands.

---

# Safety Rules

## Always forbidden without explicit confirmation

Do not modify these without a plan and confirmation:

```txt
.github/workflows/*.yml
.github/workflows/*.yaml
package.json
bun.lock
package-lock.json
pnpm-lock.yaml
yarn.lock
```

Do not modify deployment workflows without separate explicit confirmation.

Deployment workflows may include names or keywords such as:

```txt
deploy
release
publish
production
vercel
netlify
railway
render
docker
cloudflare
aws
gcp
azure
```

## Always forbidden

* Do not delete workflows.
* Do not overwrite workflows blindly.
* Do not delete existing CI jobs.
* Do not remove npm/pnpm/yarn CI jobs unless explicitly confirmed.
* Do not add commands for scripts that do not exist.
* Do not add fake secrets.
* Do not print repository secrets.
* Do not modify source code.
* Do not rewrite Git history.
* Do not force-push.
* Do not claim CI is verified by GitHub unless the workflow actually ran.

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
    "scripts": {},
    "dependencies": [],
    "devDependencies": [],
    "packageManagerField": "",
    "detectedPackageManagers": [],
    "lockfiles": [],
    "bunLockfile": "",
    "existingWorkflows": [],
    "deploymentWorkflows": [],
    "existingCiWorkflows": [],
    "bunCiExists": false
  },
  "ci_plan": {
    "recommended": false,
    "riskLevel": "low | medium | high",
    "workflowPath": "",
    "installCommand": "",
    "steps": [],
    "requiresConfirmation": true,
    "requiresDeploymentWorkflowConfirmation": false
  },
  "setup_result": {
    "filesChanged": [],
    "workflowCreated": false,
    "workflowUpdated": false,
    "verificationResults": [],
    "remainingRisks": []
  },
  "final_status": "not_started"
}
```

---

# Phase 1: Understand CI Request

## Skill

Bun CI Request Parsing Skill

## Detailed skill behavior

The agent should determine whether the user wants a CI plan only, a new Bun CI workflow, or an update to an existing workflow.

The user may say:

* “add Bun CI”
* “set up GitHub Actions for Bun”
* “make tests run in CI”
* “run bun test on pull requests”
* “add CI for Bun build”
* “replace npm CI with Bun”
* “update existing GitHub Actions for Bun”

The agent should normalize the request into:

* `plan-only`
* `create-new-bun-ci`
* `update-existing-bun-ci`
* `replace-existing-package-manager-ci`
* `deployment-workflow-update`

Default to `create-new-bun-ci` only after confirmation.

If the user asks to replace npm/pnpm/yarn CI, the agent must treat that as higher risk and require explicit confirmation.

If the user asks to change deployment workflows, the agent must require separate explicit confirmation.

## Rules

* Default to plan-only until confirmation.
* Do not assume existing CI should be removed.
* Do not assume deployment CI should be changed.
* Do not create commands for missing scripts.
* If the project is not JS/TS, report blocked.

## Pause conditions

Pause if:

* current directory is unclear
* `package.json` is missing
* existing workflows are complex
* user asks to replace existing CI
* user asks to modify deployment workflows
* file inspection is unavailable

## Exit criteria

CI setup intent is clear.

## Phase output

```json
{
  "mode": "plan-only | create-new-bun-ci | update-existing-bun-ci | replace-existing-package-manager-ci | deployment-workflow-update",
  "readOnlyUntilConfirmation": true,
  "requiresConfirmationBeforeChanges": true
}
```

---

# Phase 2: Inspect Project and Workflows

## Skill

GitHub Actions and Bun Project Static Inspection Skill

## Detailed skill behavior

The agent should inspect the project without modifying files.

The agent should look for:

* `package.json`
* `bun.lock`
* `bun.lockb`
* `package-lock.json`
* `pnpm-lock.yaml`
* `yarn.lock`
* `.github/workflows/*.yml`
* `.github/workflows/*.yaml`

The agent should read `package.json` and extract:

* package name
* scripts
* packageManager field
* workspaces field
* dependencies
* devDependencies

The agent should detect useful scripts:

* `test`
* `test:bun`
* `typecheck`
* `lint`
* `build`
* `check`
* `format:check`

The agent should inspect existing workflow files and detect:

* checkout steps
* setup-node usage
* setup-bun usage
* npm install
* npm ci
* pnpm install
* yarn install
* bun install
* bun ci
* test steps
* build steps
* deployment/publish/release steps
* matrix jobs
* cache steps
* secrets usage

The agent should classify workflows as:

* CI workflow
* deployment workflow
* release workflow
* unknown workflow

## Rules

* Use file reads, not shell-specific commands.
* Do not edit files.
* Do not delete workflows.
* Do not infer too strongly from one keyword.
* Preserve existing workflows unless user confirms changes.
* Missing `.github/workflows` is not a failure; it means create-new workflow is likely appropriate.

## Pause conditions

Pause if:

* `package.json` is missing
* file reading is unavailable
* workflow contents are too complex to safely patch
* deployment workflow changes appear necessary but not confirmed

## Exit criteria

Project scripts and workflow state are known.

## Phase output

```json
{
  "packageName": "",
  "scripts": [],
  "lockfiles": [],
  "bunLockfile": "",
  "existingWorkflows": [],
  "deploymentWorkflows": [],
  "bunCiExists": false,
  "recommendedWorkflowPath": ".github/workflows/bun-ci.yml"
}
```

---

# Phase 3: Choose Safe CI Strategy

## Skill

Bun CI Strategy Planning Skill

## Detailed skill behavior

The agent should create a safe CI strategy based on project state.

Use this install decision:

* If `bun.lock` exists:

  * prefer `bun ci`
* If only `bun.lockb` exists:

  * prefer `bun install` unless project intentionally uses old lockfile behavior
* If no Bun lockfile exists:

  * use `bun install`
* Do not use `bun ci` when `bun.lock` is missing.

Choose steps based on scripts:

* Always include checkout.
* Always include `oven-sh/setup-bun@v2`.
* Include install step.
* Include `bun test` if tests exist or a test script exists.
* Include `bun run typecheck` only if `typecheck` script exists.
* Include `bun run lint` only if `lint` script exists.
* Include `bun run build` only if `build` script exists.

Do not add steps for scripts that do not exist.

Recommended default workflow:

```yaml
name: Bun CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  bun-ci:
    name: Bun CI
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun ci

      - name: Run tests
        run: bun test

      - name: Build
        run: bun run build
```

But adapt it:

* Use `bun install` instead of `bun ci` when no `bun.lock` exists.
* Remove `Run tests` if no tests/test script exist.
* Remove `Build` if no build script exists.
* Add typecheck/lint only when scripts exist.

## Rules

* Do not create fake commands.
* Do not add missing script names.
* Do not rewrite existing CI unless requested.
* Prefer a new workflow over risky modifications when existing workflows are complex.
* Avoid deployment changes unless explicitly confirmed.
* Keep YAML simple and readable.

## Exit criteria

A safe CI plan is ready.

## Phase output

```json
{
  "workflowPath": ".github/workflows/bun-ci.yml",
  "installCommand": "bun ci | bun install",
  "steps": [],
  "riskLevel": "low | medium | high",
  "recommended": true
}
```

---

# Phase 4: Confirmation Gate

## Skill

Explicit GitHub Actions CI Confirmation Skill

## Detailed skill behavior

Before modifying workflow files, the agent must ask for explicit confirmation.

The confirmation message should summarize:

* workflow path to create/update
* whether this is a new workflow or update
* install command selected
* commands to run
* existing workflows that will be preserved
* whether deployment workflows will be untouched
* whether any existing CI jobs will be changed

The agent should offer safe options:

1. Plan only
2. Create new Bun CI workflow
3. Update existing Bun CI workflow
4. Add Bun job beside existing npm/pnpm/yarn jobs
5. Replace existing package-manager CI jobs
6. Modify deployment workflow separately

Default recommendation:

```txt
Create a new Bun CI workflow and leave existing workflows untouched.
```

## Rules

* Do not proceed without user confirmation.
* Do not treat vague approval as permission to overwrite workflows.
* Replacing old CI requires explicit confirmation.
* Deployment workflow changes require explicit separate confirmation.
* Secrets-related changes require explicit separate confirmation.

## Exit criteria

User has confirmed the allowed CI setup scope.

## Phase output

```json
{
  "confirmed": true,
  "allowedChanges": [],
  "allowWorkflowCreation": true,
  "allowWorkflowUpdate": false,
  "allowExistingCiReplacement": false,
  "allowDeploymentWorkflowChanges": false
}
```

---

# Phase 5: Apply CI Workflow

## Skill

Controlled GitHub Actions Workflow Editing Skill

## Detailed skill behavior

This phase runs only after confirmation.

The agent should apply only confirmed changes.

Common safe setup path:

1. Create `.github/workflows/` if missing.
2. Create `.github/workflows/bun-ci.yml`.
3. Use `actions/checkout@v4`.
4. Use `oven-sh/setup-bun@v2`.
5. Add install step:

   * `bun ci` when `bun.lock` exists
   * `bun install` when `bun.lock` is missing
6. Add only existing script checks.
7. Preserve existing workflows.
8. Do not edit deployment workflows unless confirmed.

Example created workflow:

```yaml
name: Bun CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  bun-ci:
    name: Bun CI
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun ci

      - name: Run tests
        run: bun test

      - name: Typecheck
        run: bun run typecheck

      - name: Lint
        run: bun run lint

      - name: Build
        run: bun run build
```

Adapt the workflow to the actual project:

* remove Typecheck if no `typecheck` script exists
* remove Lint if no `lint` script exists
* remove Build if no `build` script exists
* remove Run tests if no tests/test script exists
* use `bun install` if `bun.lock` does not exist

The agent must record every changed file.

## Rules

* Apply only confirmed changes.
* Keep YAML stable and readable.
* Do not overwrite existing workflow files unless confirmed.
* Do not modify deployment workflows unless confirmed.
* Do not add commands for missing scripts.
* Do not add fake secrets.
* Do not edit source code.
* Record changed files.

## Pause conditions

Pause if:

* target workflow already exists and overwrite/update was not confirmed
* workflow content has complex custom behavior
* no safe install command can be selected
* YAML generation would reference missing scripts
* deployment workflow changes are requested but not confirmed

## Exit criteria

Confirmed CI workflow changes are applied or safely stopped.

## Phase output

```json
{
  "filesChanged": [],
  "workflowCreated": true,
  "workflowUpdated": false,
  "installCommand": "",
  "stepsAdded": [],
  "stoppedEarly": false,
  "stopReason": ""
}
```

---

# Phase 6: Verify Workflow

## Skill

Static GitHub Actions Workflow Verification Skill

## Detailed skill behavior

The agent should verify the workflow statically.

The agent should check:

* workflow file exists
* YAML indentation is valid-looking
* `on` block exists
* `jobs` block exists
* job has `runs-on`
* checkout step exists
* `oven-sh/setup-bun@v2` step exists
* install step exists
* `bun ci` is used only when `bun.lock` exists
* `bun install` is used when no `bun.lock` exists
* script commands reference existing package.json scripts
* no deploy/release/publish commands were added accidentally
* no secrets are printed
* workflow path is under `.github/workflows/`
* no generated or unrelated files were changed

If a YAML parser is available, use it. If not, perform structured static checks and report that YAML parser validation was unavailable.

Do not claim the workflow passed in GitHub Actions unless it actually ran.

## Rules

* Do not run GitHub Actions locally unless user explicitly asks and tooling exists.
* Do not claim remote CI passed.
* Do not print secrets.
* Do not invent script validation.
* Clearly report skipped validation.

## Exit criteria

Workflow static verification is complete.

## Phase output

```json
{
  "workflowExists": true,
  "setupBunStepFound": true,
  "installCommandValid": true,
  "scriptReferencesValid": true,
  "deploymentUntouched": true,
  "yamlValidation": "passed | skipped | failed"
}
```

---

# Phase 7: Final Report

## Skill

Bun CI Setup Reporting Skill

## Detailed skill behavior

The final report should clearly distinguish between plan-only and completed setup.

It should list:

* existing workflows detected
* workflow created or updated
* install command selected
* commands included
* scripts skipped because missing
* deployment workflows touched or untouched
* verification results
* remaining risks

The report should not claim CI passed remotely unless GitHub Actions actually ran.

## Status values

```txt
complete
blocked
failed
incomplete_data
plan_only
```

## Final report format

```md
# Bun GitHub Actions CI Report

Status: complete | blocked | failed | incomplete_data | plan_only
Mode: plan-only | setup

## Project

- Package: <name or unavailable>
- Bun lockfile: yes/no
- Existing workflows: <list or none>
- Deployment workflows detected: <list or none>
- Existing Bun CI: yes/no

## CI plan

- Workflow path: <path>
- Install command: `bun ci` | `bun install`
- Planned steps:
  - <step>
  - <step>
- Confirmation required: yes/no

## Changes made

- Files changed:
  - <file or none>
- Workflow created: yes/no
- Workflow updated: yes/no
- Existing workflows preserved: yes/no
- Deployment workflows touched: yes/no

## Workflow checks

- `actions/checkout@v4`: present/missing
- `oven-sh/setup-bun@v2`: present/missing
- Install step: valid/invalid/skipped
- Script references: valid/invalid/skipped
- YAML validation: passed/skipped/failed

## Commands included

- <command>
- <command>

## Commands skipped

- <command>: <reason>
- <command>: <reason>

## Remaining risks

- <risk or none>
- <risk or none>

## Safety notes

- No existing workflows were overwritten without confirmation.
- No deployment workflows were changed without confirmation.
- No old package-manager jobs were removed without confirmation.
- No fake scripts were added.
- No secrets were printed.
- Remote GitHub Actions status was not claimed unless actually observed.
```

Rules:

* Use `plan_only` when no workflow changes were executed.
* Use `complete` only when confirmed workflow changes completed and static verification is acceptable.
* Use `incomplete_data` when some verification could not run.
* Use `blocked` when project inspection or required confirmation is missing.
* Use `failed` when setup was attempted and failed.
* Keep output concise.

---

# Examples

## Example 1: New Bun CI workflow

User:

> Use /ReAction-setup-bun-ci-github-actions. Add Bun CI.

Expected:

* inspect project
* inspect workflows
* detect scripts and lockfile
* create plan
* ask for confirmation
* create `.github/workflows/bun-ci.yml`
* verify workflow statically
* return report

## Example 2: Existing npm CI

User:

> Use /ReAction-setup-bun-ci-github-actions. Add Bun CI beside current CI.

Expected:

* preserve existing npm CI
* create new Bun CI workflow or new Bun job after confirmation
* do not delete npm CI
* report both workflows

## Example 3: Replace pnpm CI

User:

> Replace pnpm GitHub Actions with Bun.

Expected:

* inspect existing workflows
* create replacement plan
* ask explicit confirmation
* do not delete pnpm workflow unless confirmed
* preserve deployment jobs unless separately confirmed

## Example 4: No bun.lock

User:

> Add Bun CI.

Expected:

* detect no `bun.lock`
* use `bun install`, not `bun ci`
* mention that `bun ci` requires committed `bun.lock`

## Example 5: Deployment workflow present

User:

> Update GitHub Actions for Bun.

Expected:

* detect deployment workflow
* avoid changing deployment workflow by default
* suggest adding separate Bun CI workflow
* ask for separate confirmation before touching deployment workflow

# End of ReAction
