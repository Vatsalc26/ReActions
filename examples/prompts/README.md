# Example Prompts

Copy these prompts into your coding agent.

ReActions work best when the agent can:

- read files
- edit files
- run commands
- open a browser or terminal when required
- verify before claiming success

## General pattern

```txt
Use <ReAction trigger>.

Task:
<what you want>

Important:
- Follow the ReAction phases.
- Pause if required information is missing.
- Do not skip verification.
- Return the final report.
```

## Frontend button example

```txt
Use /ReAction-verified-destructive-confirm-button-red.

Add a Delete Project button to the danger zone.
Require confirmation before deleting.
Verify the cancel path and confirm path in the browser.
Do not perform a real destructive action.
Return the final report.
```

## Vercel usage example

```txt
Use /ReAction-check-vercel-usage.

Check today's Vercel usage with a daily breakdown.
Use the official Vercel CLI.
Do not check Web Analytics.
Do not run deploy or write commands.
Return the final usage report.
```

## Vercel deployment example

```txt
Use /ReAction-check-vercel-deployment-status.

Check the latest deployment status for the current Vercel project.
Use CLI-only read-only commands.
Do not deploy, redeploy, rollback, promote, or remove anything.
Return the final deployment status report.
```

## Bun project health example

```txt
Use /ReAction-check-bun-project-health.

Check if this JavaScript/TypeScript project is ready to use Bun.

Important:
- Work even if Bun CLI is not installed.
- If Bun CLI is missing, do static-only inspection.
- Do not install dependencies.
- Do not install Bun.
- Do not delete lockfiles.
- Do not modify package.json.
- Run safe Bun checks only if Bun is available.
- Return the final Bun Project Health Report.
```

## Bun test diagnosis example

```txt
Use /ReAction-run-bun-test-and-diagnose.

Run Bun tests and explain any failures.

Important:
- Work even if Bun CLI is not installed.
- If Bun CLI is missing, do static-only test setup inspection.
- Do not install dependencies.
- Do not install Bun.
- Do not update snapshots.
- Do not modify source or test files.
- Return the final Bun Test Diagnosis Report.
```

## Bun migration example

```txt
Use /ReAction-migrate-project-to-bun.

Safely migrate this JavaScript/TypeScript project to Bun.

Important:
- Inspect first.
- Create a migration plan.
- Ask before running bun install.
- Ask before deleting old lockfiles.
- Ask before changing CI.
- Keep old lockfiles until verification passes unless I explicitly confirm removal.
- Verify with available test/typecheck/lint/build scripts.
- Return the final Bun Migration Report.
```

## Bun build check example

```txt
Use /ReAction-bun-build-check.

Check whether this JavaScript/TypeScript project builds with Bun-related build commands.

Important:
- Work even if Bun CLI is not installed.
- If Bun CLI is missing, do static-only build setup inspection.
- Do not install dependencies.
- Do not install Bun.
- Do not modify source, config, or package.json.
- Do not delete lockfiles.
- Do not commit generated build output.
- Return the final Bun Build Check Report.
```

## Bun test runner setup example

```txt
Use /ReAction-setup-bun-test-runner.

Safely add or improve a Bun test setup for this JavaScript/TypeScript project.

Important:
- Inspect first.
- Create a setup plan.
- Ask for confirmation before modifying package.json, creating files, or installing dependencies.
- Preserve existing test setups and scripts, adding additive scripts (like test:bun) if a test script is already present.
- Do not delete existing tests.
- Do not update snapshots.
- Verify the setup by running bun test if Bun is available.
- Return the final Bun Test Runner Setup Report.
```

## Bun GitHub Actions CI example

```txt
Use /ReAction-setup-bun-ci-github-actions.

Safely add GitHub Actions CI for this Bun project.

Important:
- Inspect package.json, bun.lock, and existing workflows first.
- Create a CI plan before editing files.
- Ask before creating or updating workflow files.
- Use oven-sh/setup-bun@v2.
- Use bun ci only if bun.lock exists.
- Use bun install if bun.lock is missing.
- Do not overwrite existing workflows without confirmation.
- Do not modify deployment workflows without confirmation.
- Do not remove npm/pnpm/yarn jobs unless I explicitly confirm.
- Only add commands for scripts that exist.
- Return the final Bun GitHub Actions CI Report.
```

## OpenClaw first-run setup example

```txt
Use /ReAction-setup-openclaw-first-run.

Safely help me set up OpenClaw for the first time.

Important:
- Inspect Node and OpenClaw first.
- Create a setup plan before installing anything.
- Ask before running install commands.
- Ask before running onboarding.
- Keep the Gateway local by default.
- Do not connect channels yet.
- Do not enable remote access.
- Do not print API keys or tokens.
- Do not print full OpenClaw config.
- Verify gateway status and dashboard.
- Return the final OpenClaw First-run Setup Report.
```
