# Bun ReActions

This folder contains executable recipes for Bun-related developer tasks.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Check Bun Project Health | `/ReAction-check-bun-project-health` | You want a safe CLI-only report on whether a JavaScript/TypeScript project is ready to use Bun. |

## Notes

`/ReAction-check-bun-project-health` is inspection-first.

It should not migrate a project, delete lockfiles, install dependencies, or rewrite scripts.

It may use:

- `bun --version`
- `bun run`
- `bun test`
- `bun run build`
- `bun run typecheck`
- `bun run lint`

It must not run install/migration commands without explicit user confirmation.

## Future Bun ReActions

Possible future additions:

- `/ReAction-run-bun-test-and-diagnose`
- `/ReAction-migrate-project-to-bun`
- `/ReAction-setup-bun-test-runner`
- `/ReAction-convert-node-script-to-bun`
- `/ReAction-bun-build-check`
