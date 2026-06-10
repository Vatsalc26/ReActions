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

## OpenClaw Peekaboo first-run example

```txt
Use /ReAction-setup-openclaw-peekaboo-first-run.

Set up Peekaboo safely as an OpenClaw ecosystem Native Tool.

Important:
- Follow official OpenClaw and Peekaboo docs.
- Do not click or type by default.
- Do not run agent actions by default.
- Confirm before installing.
- Confirm before opening permission flows.
- Confirm before screenshots.
- Use a safe non-private window for screenshot/UI inspection.
- Do not print secrets, full config, full UI tree, or screenshot contents.
- Explain MCP setup, but do not edit MCP config unless I explicitly confirm.
```

## OpenClaw Peekaboo plan-only example

```txt
Use /ReAction-setup-openclaw-peekaboo-first-run.

Plan how I should install and verify Peekaboo on macOS.

Do not run install commands.
Do not capture screenshots.
Do not edit config.
Just inspect what is safe and give a plan.
```

## OpenClaw Peekaboo permissions health example

```txt
Use /ReAction-check-openclaw-peekaboo-permissions-health.

Run a read-only Peekaboo permissions health check.

Important:
- Follow official Peekaboo docs.
- Do not install anything.
- Do not capture screenshots by default.
- Do not inspect private UI.
- Do not click, type, paste, hotkey, press, scroll, or drag.
- Do not run agent actions.
- Check `peekaboo permissions status`.
- Check `peekaboo permissions status --all-sources`.
- Tell me whether Screen Recording, Accessibility, and Event Synthesizing are ready.
- Tell me if Bridge/local CLI permissions differ.
- Return a readiness matrix for screenshots, UI inspection, MCP, OpenClaw subprocess use, and future background input.
```

## OpenClaw Peekaboo permission grant guidance example

```txt
Use /ReAction-check-openclaw-peekaboo-permissions-health.

Check permissions first.

If Screen Recording or Accessibility is missing, explain what is missing and ask before running any permission grant command.
```

## Hermes Agent first-run setup example

```txt
Use /ReAction-setup-hermes-first-run.

Safely help me set up Hermes Agent for the first time.

Important:
- Inspect environment first.
- Create a setup plan before installing anything.
- Ask before running install commands.
- Ask before running remote install scripts.
- Ask before running provider setup.
- Do not print API keys or tokens.
- Do not print ~/.hermes/.env.
- Do not print full ~/.hermes/config.yaml.
- Do not enable YOLO mode.
- Do not disable approval prompts.
- Do not configure gateway, cron, skills, or MCP yet.
- Verify Hermes doctor, first chat, and session resume.
- Return the final Hermes First-run Setup Report.
```

## Hermes health-check example

```txt
Use /ReAction-check-hermes-agent-health.

Run a read-only Hermes health check.

Important:
- Do not install anything.
- Do not run setup.
- Do not switch providers.
- Do not configure gateway.
- Do not enable YOLO.
- Do not print secrets or full config.
- Check `hermes --version`, `hermes doctor`, provider/model readiness, sessions, and gateway status if safe.
- Return a health report with safe next steps.
```

## Hermes doctor-only example

```txt
Use /ReAction-check-hermes-agent-health.

Only run `hermes doctor` and summarize the warnings/errors.

Do not make any changes.
Do not print secrets.
```

## OpenHands first-run setup example

```txt
Use /ReAction-setup-openhands-first-run.

Safely help me set up OpenHands for the first time.

Important:
- Inspect Node, uv, Docker, and OpenHands first.
- Create a setup plan before installing anything.
- Choose Agent Canvas or CLI setup based on my intent.
- Ask for confirmation before running npm, uv, or Docker install/run commands.
- Ask before running remote installer scripts.
- Do not print API keys, tokens, or local backend keys.
- Do not print full settings or expose ~/.openhands secrets/config/history.
- Keep the server local and do not enable public mode by default.
- Do not bind to 0.0.0.0 by default.
- Do not use always-approve or auto-approval.
- Do not configure MCP or automations (GitHub/Slack/Linear) by default.
- Avoid broad filesystem mounts (do not mount home directory).
- Verify the local Agent Canvas backend or CLI and first safe task.
- Return the final OpenHands First-run Setup Report.
```

## Cline CLI first-run setup example

```txt
Use /ReAction-setup-cline-cli-first-run.

Safely help me set up Cline CLI for the first time.

Important:
- Inspect Node/npm/Cline first.
- Create a setup plan before installing anything.
- Ask before running npm install.
- Ask before running cline auth.
- Ask before launching the TUI.
- Do not print API keys or tokens.
- Do not print full ~/.cline config.
- Keep auto-approve all off.
- Do not configure MCP yet.
- Do not configure hooks/plugins/skills yet.
- Do not configure cron yet.
- Do not run headless automation yet.
- Verify the interactive TUI.
- Verify one safe non-mutating first task.
- Return the final Cline CLI First-run Setup Report.
```

## NCERT Class 8 Science strict-source tutor example

```txt
Use /ReAction-assume-ncert-class-8-science-tutor-responsibility.

I will paste my NCERT Class 8 Science paragraph below.

Explain it in Hinglish like I am a Class 8 student.

Important:
- Answer only from the source I provide.
- Keep it simple.
- Ask one quick check question.
- Give 3 source-grounded practice questions.
- Do not add outside facts.

<source here>
```

## NCERT Class 8 Science source missing example

```txt
Use /ReAction-assume-ncert-class-8-science-tutor-responsibility.

Explain friction to me.

I do not have my textbook page right now.
```

Expected behavior:
The agent should ask the student to share the NCERT source or download the relevant Class 8 Science page/chapter from the official NCERT textbook PDF page or ePathshala before explaining the science concept.

## NCERT Class 8 Science teacher notes example

```txt
Use /ReAction-assume-ncert-class-8-science-tutor-responsibility.

These are my teacher's notes based on NCERT. Explain them simply and help me make a short answer.

<teacher notes here>
```

## NCERT Class 8 Hindi strict-source tutor example

```txt
Use /ReAction-assume-ncert-class-8-hindi-tutor-responsibility.

I will paste my NCERT Class 8 Hindi paragraph below.

Explain it in simple Hindi.

Important:
- Answer only from the source I provide.
- Preserve Hindi text carefully.
- Keep it Class 8 level.
- Ask one quick check question.
- Give 3 source-grounded practice questions.
- Do not add outside summaries or internet facts.

<source here>
```

## NCERT Class 8 Hindi source missing example

```txt
Use /ReAction-assume-ncert-class-8-hindi-tutor-responsibility.

Explain this chapter to me.

I do not have my textbook page right now.
```

Expected behavior:
The agent should ask the student to share the NCERT source, teacher notes, or student notes, or download the relevant Class 8 Hindi material from the official NCERT textbook PDF page or ePathshala before explaining the content.

## NCERT Class 8 Hindi teacher notes example

```txt
Use /ReAction-assume-ncert-class-8-hindi-tutor-responsibility.

These are my teacher's notes based on NCERT. Explain them simply.

<teacher notes here>
```

## NCERT Class 8 English strict-source tutor example

```txt
Use /ReAction-assume-ncert-class-8-english-tutor-responsibility.

I will paste my NCERT Class 8 English paragraph below.

Explain it in simple English.

Important:
- Answer only from the source I provide.
- Keep it Class 8 level.
- Ask one quick check question.
- Give 3 source-grounded practice questions.
- Do not add outside summaries or internet facts.

<source here>
```

## NCERT Class 8 English source missing example

```txt
Use /ReAction-assume-ncert-class-8-english-tutor-responsibility.

Explain this chapter to me.

I do not have my textbook page right now.
```

Expected behavior:
The agent should ask the student to share the NCERT source, teacher notes, or student notes, or download the relevant Class 8 English material from the official NCERT textbook PDF page or ePathshala before explaining the content.

## NCERT Class 8 English teacher notes example

```txt
Use /ReAction-assume-ncert-class-8-english-tutor-responsibility.

These are my teacher's notes based on NCERT. Explain them simply.

<teacher notes here>
```

## NCERT Class 8 Mathematics strict-source tutor example

```txt
Use /ReAction-assume-ncert-class-8-math-tutor-responsibility.

I will paste my NCERT Class 8 Mathematics question below.

Solve it step by step in Hinglish.

Important:
- Answer only from the source I provide.
- Show every step and reasoning.
- Do not give final answer only.
- Check arithmetic carefully.
- Ask one quick check question.
- Give 2 similar practice questions.

<source here>
```

## NCERT Class 8 Mathematics source missing example

```txt
Use /ReAction-assume-ncert-class-8-math-tutor-responsibility.

Explain the pythagorean theorem to me.

I do not have my textbook page right now.
```

Expected behavior:
The agent should ask the student to share the NCERT source, teacher notes, or student notes, or download the relevant Class 8 Mathematics material from the official NCERT textbook PDF page or ePathshala before explaining the content.

## NCERT Class 8 Mathematics teacher notes example

```txt
Use /ReAction-assume-ncert-class-8-math-tutor-responsibility.

These are my teacher's notes based on NCERT. Explain the steps simply.

<teacher notes here>
```

## NCERT Class 8 Social Science strict-source tutor example

```txt
Use /ReAction-assume-ncert-class-8-social-science-tutor-responsibility.

I will paste my NCERT Class 8 Social Science paragraph below.

Explain it in simple Hinglish.

Important:
- Answer only from the source I provide.
- Keep it neutral.
- Do not add political opinions.
- Ask one quick check question.
- Give 3 source-grounded practice questions.

<source here>
```

## NCERT Class 8 Social Science source missing example

```txt
Use /ReAction-assume-ncert-class-8-social-science-tutor-responsibility.

Explain the concept of resources to me.

I do not have my textbook page right now.
```

Expected behavior:
The agent should ask the student to share the NCERT source, teacher notes, or student notes, or download/share the relevant Class 8 Social Science page or chapter from the official NCERT textbook PDF page or ePathshala before explaining the content.

## NCERT Class 8 Social Science teacher notes example

```txt
Use /ReAction-assume-ncert-class-8-social-science-tutor-responsibility.

These are my teacher's notes based on NCERT. Explain the points simply.

<teacher notes here>
```

## NCERT Class 8 Sanskrit strict-source tutor example

```txt
Use /ReAction-assume-ncert-class-8-sanskrit-tutor-responsibility.

I will paste my NCERT Class 8 Sanskrit shloka below.

Explain it in simple Hindi.

Important:
- Answer only from the source I provide.
- Preserve Devanagari.
- Do not invent grammar forms.
- Ask one quick check question.
- Give 3 source-grounded practice questions.

<shloka here>
```

## NCERT Class 8 Sanskrit source missing example

```txt
Use /ReAction-assume-ncert-class-8-sanskrit-tutor-responsibility.

Explain the meaning of this chapter.

I do not have my textbook page right now.
```

Expected behavior:
The agent should ask the student to share the NCERT source, teacher notes, or student notes, or download/share the relevant Class 8 Sanskrit page or chapter from the official NCERT textbook PDF page or ePathshala before explaining the content.

## NCERT Class 8 Sanskrit teacher notes example

```txt
Use /ReAction-assume-ncert-class-8-sanskrit-tutor-responsibility.

These are my teacher's notes based on NCERT. Explain the points simply.

<teacher notes here>
```

## NCERT Class 8 Arts strict-source tutor example

```txt
Use /ReAction-assume-ncert-class-8-arts-tutor-responsibility.

I will paste my NCERT Class 8 Arts activity prompt below.

Suggest a safe plan and list of simple materials.

Important:
- Answer only from the source I provide.
- Keep the steps safe and simple.
- Do not do the drawing/craft for me.
- Ask one quick check question.

<activity prompt here>
```

## NCERT Class 8 Arts source missing example

```txt
Use /ReAction-assume-ncert-class-8-arts-tutor-responsibility.

How do we make a paper mache mask?
```

Expected behavior:
The agent should ask the student to share the NCERT source, teacher notes, or student notes, or download/share the relevant Class 8 Arts page or chapter from the official NCERT textbook page or ePathshala before explaining the content.

## NCERT Class 8 Arts teacher notes example

```txt
Use /ReAction-assume-ncert-class-8-arts-tutor-responsibility.

These are my teacher's notes based on NCERT. Explain the points simply.

<teacher notes here>
```

