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
