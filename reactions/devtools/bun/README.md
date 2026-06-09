# Bun ReActions

This folder contains executable recipes for Bun-related developer tasks.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Check Bun Project Health | `/ReAction-check-bun-project-health` | You want a safe report on whether a JavaScript/TypeScript project is ready to use Bun, with static fallback when Bun CLI is missing. |
| Run Bun Test and Diagnose | `/ReAction-run-bun-test-and-diagnose` | You want to run Bun tests when available, diagnose failures, and get a read-only test diagnosis report with static fallback when Bun CLI is missing. |
| Migrate Project to Bun | `/ReAction-migrate-project-to-bun` | You want to safely migrate a JavaScript/TypeScript project to Bun with inspection-first planning, confirmation gates, and verification. |
| Bun Build Check | `/ReAction-bun-build-check` | You want to check whether a project builds with Bun-related build commands and diagnose build failures with static fallback when Bun CLI is missing. |
| Setup Bun Test Runner | `/ReAction-setup-bun-test-runner` | You want to safely add or improve a Bun test setup for a JavaScript/TypeScript project with inspection-first planning, confirmation gates, and verification. |
| Setup Bun CI GitHub Actions | `/ReAction-setup-bun-ci-github-actions` | You want to safely add or update GitHub Actions CI for Bun with workflow inspection, confirmation gates, and static verification. |

## Notes

`/ReAction-check-bun-project-health` is inspection-first.

It can run in two modes:

1. Static-only mode:
   - Bun CLI is missing or unavailable.
   - The ReAction inspects files and reports partial readiness.

2. Full CLI mode:
   - Bun CLI is installed.
   - The ReAction can run safe Bun checks.

It should not migrate a project, delete lockfiles, install dependencies, or rewrite scripts.

It may use:

- `bun --version`
- `bun run`
- `bun test`
- `bun run build`
- `bun run typecheck`
- `bun run lint`

It must not run install/migration commands without explicit user confirmation.

## Test diagnosis

Use `/ReAction-run-bun-test-and-diagnose` when you want an agent to run `bun test` safely and explain failures.

It can run in two modes:

1. Static-only mode:
   - Bun CLI is missing or unavailable.
   - The ReAction inspects test setup and reports what could not be verified.

2. Full CLI mode:
   - Bun CLI is installed.
   - The ReAction can run safe Bun test commands.

It must not:

- install Bun
- install dependencies
- modify source files
- modify test files
- update snapshots
- delete lockfiles
- change package scripts

## Migration

Use `/ReAction-migrate-project-to-bun` when you want an agent to safely migrate a project to Bun.

This ReAction is not read-only after confirmation, but it is inspection-first.

It must:

- inspect before changing files
- create a migration plan
- ask before running `bun install`
- ask before deleting old lockfiles
- ask before changing CI
- verify after migration

Recommended flow:

1. Run `/ReAction-check-bun-project-health`.
2. Run `/ReAction-run-bun-test-and-diagnose`.
3. Run `/ReAction-migrate-project-to-bun`.

Safety defaults:

- keep old lockfiles until verification passes
- do not rewrite CI automatically
- do not claim success unless verification is clear

## Build checks

Use `/ReAction-bun-build-check` when you want an agent to check whether a project builds with Bun-related commands.

It can run in two modes:

1. Static-only mode:
   - Bun CLI is missing or unavailable.
   - The ReAction inspects build setup and reports what could not be verified.

2. Full CLI mode:
   - Bun CLI is installed.
   - The ReAction can run safe build checks.

It must not:

- install Bun
- install dependencies
- modify source files
- modify config files
- modify package.json
- delete lockfiles
- migrate package managers
- commit generated build output

## Test runner setup

Use `/ReAction-setup-bun-test-runner` when you want an agent to safely add or improve Bun tests in a project.

This ReAction is not read-only after confirmation, but it is inspection-first.

It must:

- inspect the project before making any changes
- create a setup plan
- ask for confirmation before modifying package.json, creating test files, or installing dependencies
- preserve existing test setups and scripts, adding additive scripts (like `test:bun`) if a default test script is already present
- never delete existing test files or update snapshots by default
- verify the new setup by running `bun test` (if Bun is installed)

Safety defaults:

- do not install dependencies unless explicitly confirmed
- do not remove Jest/Vitest/Playwright without explicit confirmation
- do not modify source code

## GitHub Actions CI

Use `/ReAction-setup-bun-ci-github-actions` when you want an agent to safely add or update GitHub Actions CI for a Bun project.

Recommended flow:

1. Run `/ReAction-check-bun-project-health`.
2. Run `/ReAction-run-bun-test-and-diagnose`.
3. Run `/ReAction-bun-build-check`.
4. Run `/ReAction-setup-bun-ci-github-actions`.

This ReAction may edit workflow files only after confirmation.

It should use:

- `actions/checkout@v4`
- `oven-sh/setup-bun@v2`
- `bun ci` when `bun.lock` exists
- `bun install` when `bun.lock` is missing
- project scripts only when they exist

It must not:

- overwrite existing workflows without confirmation
- modify deployment workflows without confirmation
- delete old npm/pnpm/yarn CI jobs without confirmation
- add commands for scripts that do not exist
- print secrets

## Future Bun ReActions

Possible future additions:

- `/ReAction-convert-node-script-to-bun`
