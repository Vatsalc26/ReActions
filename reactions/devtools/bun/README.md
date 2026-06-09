# Bun ReActions

This folder contains executable recipes for Bun-related developer tasks.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Check Bun Project Health | `/ReAction-check-bun-project-health` | You want a safe report on whether a JavaScript/TypeScript project is ready to use Bun, with static fallback when Bun CLI is missing. |
| Run Bun Test and Diagnose | `/ReAction-run-bun-test-and-diagnose` | You want to run Bun tests when available, diagnose failures, and get a read-only test diagnosis report with static fallback when Bun CLI is missing. |
| Migrate Project to Bun | `/ReAction-migrate-project-to-bun` | You want to safely migrate a JavaScript/TypeScript project to Bun with inspection-first planning, confirmation gates, and verification. |

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

## Future Bun ReActions

Possible future additions:

- `/ReAction-setup-bun-test-runner`
- `/ReAction-convert-node-script-to-bun`
- `/ReAction-bun-build-check`
