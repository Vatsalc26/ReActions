# Vercel ReActions

This folder contains executable recipes for Vercel-related developer tasks.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Check Vercel Analytics | `/ReAction-check-vercel-analytics` | You want a consistent read-only analytics report for a Vercel project and date range using CLI-only local capabilities or a project-provided analytics adapter. |
| Check Vercel Usage | `/ReAction-check-vercel-usage` | You want a consistent read-only usage/cost report using the official `vercel usage` CLI command. |
| Check Vercel Deployment Status | `/ReAction-check-vercel-deployment-status` | You want a consistent read-only deployment status report using Vercel CLI commands like `vercel list`, `vercel inspect`, and optionally bounded `vercel logs`. |
| Check Vercel Error Logs | `/ReAction-check-vercel-error-logs` | You want a consistent read-only error-log diagnosis report using Vercel CLI commands like `vercel logs` and `vercel inspect --logs`. |

## Notes

`/ReAction-check-vercel-analytics` is CLI-only and read-only.

It does not use the browser or Vercel dashboard.

It should not confuse Web Analytics with billing/resource usage.

If a CLI-accessible analytics command or local adapter is unavailable, the ReAction should stop with `blocked` instead of pretending analytics was checked.

## Usage vs Analytics

Use `/ReAction-check-vercel-usage` for billing/resource usage and costs.

Use `/ReAction-check-vercel-analytics` for Web Analytics-style reporting such as visitors, page views, top pages, referrers, countries, devices, browsers, and custom events.

Do not confuse these two:

- `vercel usage` = usage/cost/resource consumption
- Web Analytics = visitors/page views/product analytics

## Deployment status

Use `/ReAction-check-vercel-deployment-status` for recent deployment state and health.

It is read-only and CLI-only.

It may use:

- `vercel list`
- `vercel inspect`
- `vercel logs` only when needed or requested

It must not use:

- `vercel deploy`
- `vercel redeploy`
- `vercel promote`
- `vercel rollback`
- `vercel remove`

## Error logs

Use `/ReAction-check-vercel-error-logs` for bounded runtime/error log diagnosis.

It is read-only and CLI-only.

It may use:

- `vercel logs [deployment-url]`
- `vercel inspect [deployment-id-or-url] --logs`
- `vercel list` only when needed to find the relevant deployment

It must not use:

- `vercel deploy`
- `vercel redeploy`
- `vercel promote`
- `vercel rollback`
- `vercel remove`

It should avoid `vercel logs --follow` unless the user explicitly confirms live streaming logs.

## Future Vercel ReActions

Possible future additions:

- `/ReAction-check-vercel-env-summary`
