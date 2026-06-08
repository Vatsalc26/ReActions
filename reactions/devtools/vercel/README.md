# Vercel ReActions

This folder contains executable recipes for Vercel-related developer tasks.

## Available ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Check Vercel Analytics | `/ReAction-check-vercel-analytics` | You want a consistent read-only analytics report for a Vercel project and date range using CLI-only local capabilities or a project-provided analytics adapter. |
| Check Vercel Usage | `/ReAction-check-vercel-usage` | You want a consistent read-only usage/cost report using the official `vercel usage` CLI command. |

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

## Future Vercel ReActions

Possible future additions:

- `/ReAction-check-vercel-deployment-status`
- `/ReAction-check-vercel-error-logs`
- `/ReAction-check-vercel-env-summary`
