# Claude Code Prompt Examples

## Use a ReAction

```txt
Please follow this ReAction:

/ReAction-verified-async-cta-button-green

Task:
Add a "Create Project" button near the primary action area.

Requirements:
- Follow the ReAction phases.
- Preserve accessibility.
- Run checks.
- Verify in browser if available.
- Return the final report.
```

## Check Vercel logs

```txt
Please follow this ReAction:

/ReAction-check-vercel-error-logs

Task:
Check the latest Vercel error logs for this project.

Requirements:
- CLI-only.
- Read-only.
- Redact secrets.
- Do not stream logs indefinitely.
- Do not deploy/redeploy/rollback/promote/remove anything.
```
