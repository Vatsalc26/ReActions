# Vercel ReActions

This folder contains executable recipes for Vercel-related developer tasks.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Check Vercel Analytics | `/ReAction-check-vercel-analytics` | You want a consistent read-only analytics report for a Vercel project and date range using CLI-only local capabilities or a project-provided analytics adapter. |

## Notes

`/ReAction-check-vercel-analytics` is CLI-only and read-only.

It does not use the browser or Vercel dashboard.

It should not confuse Web Analytics with billing/resource usage.

If a CLI-accessible analytics command or local adapter is unavailable, the ReAction should stop with `blocked` instead of pretending analytics was checked.

## Future Vercel ReActions

Possible future additions:

- `/ReAction-check-vercel-usage`
- `/ReAction-check-vercel-deployment-status`
- `/ReAction-check-vercel-error-logs`
- `/ReAction-check-vercel-env-summary`
