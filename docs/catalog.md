# ReAction Catalog

Browse executable recipes for coding agents.

A ReAction is a Markdown-defined recipe that tells an AI coding agent how to complete, verify, and report a reusable task.

## At a glance

| Pack | Count | Best for |
|---|---:|---|
| Frontend / Buttons | 8 | Verified, accessible frontend button patterns. |
| DevTools / Vercel | 4 | Read-only Vercel analytics, usage, deployment, and log checks. |
| DevTools / Bun | 6 | Bun runtime, package-manager, test, build, migration, test setup, and CI workflows with safety gates. |
| DevTools / OpenClaw | 1 | First-run setup, Gateway operations, security audit, and channel safety workflows. |
| DevTools / Hermes Agent | 2 | First-run setup, local chat verification, provider setup, session verification, and safety workflows. |
| DevTools / OpenHands | 1 | First-run setup, local Agent Canvas or CLI verification, provider setup, sandbox safety, and security workflows. |
| DevTools / Cline | 1 | Cline CLI first-run setup, TUI verification, permissions review, MCP safety, and automation workflows. |
| Responsibilities / Education India NCERT | 7 | Strict-source role/accountability contracts for safe, NCERT-grounded tutoring and student support. |

## How to use a ReAction

Copy a trigger into your coding agent:

```txt
Use /ReAction-verified-async-cta-button-green.

Task:
Add a "Create Project" button to the hero action area.

Important:
- Follow the ReAction phases.
- Pause if required information is missing.
- Verify before claiming success.
- Return the final report.
```

## Full catalog

| ReAction | Trigger | Difficulty | Frameworks / platforms | Verification | Related |
|---|---|---|---|---|---|
| [Verified Async CTA Button Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md) | `/ReAction-verified-async-cta-button-green` | intermediate | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md), [Split Button Menu](../reactions/frontend/buttons/verified-split-button-menu.reaction.md), [Destructive Confirm Red](../reactions/frontend/buttons/verified-destructive-confirm-button-red.reaction.md) |
| [Verified Secondary Button Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md) | `/ReAction-verified-secondary-button-neutral` | beginner | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Async CTA Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md), [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) |
| [Verified Destructive Confirm Button Red](../reactions/frontend/buttons/verified-destructive-confirm-button-red.reaction.md) | `/ReAction-verified-destructive-confirm-button-red` | advanced | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md), [Async CTA Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md) |
| [Verified Copy Button Neutral](../reactions/frontend/buttons/verified-copy-button-neutral.reaction.md) | `/ReAction-verified-copy-button-neutral` | intermediate | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md), [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md) |
| [Verified Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) | `/ReAction-verified-icon-button-neutral` | intermediate | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Copy Button Neutral](../reactions/frontend/buttons/verified-copy-button-neutral.reaction.md), [Toggle Button Green](../reactions/frontend/buttons/verified-toggle-button-green.reaction.md), [Split Button Menu](../reactions/frontend/buttons/verified-split-button-menu.reaction.md) |
| [Verified Toggle Button Green](../reactions/frontend/buttons/verified-toggle-button-green.reaction.md) | `/ReAction-verified-toggle-button-green` | intermediate | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md), [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md) |
| [Verified Floating Action Button Green](../reactions/frontend/buttons/verified-floating-action-button-green.reaction.md) | `/ReAction-verified-floating-action-button-green` | advanced | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Async CTA Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md), [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) |
| [Verified Split Button Menu](../reactions/frontend/buttons/verified-split-button-menu.reaction.md) | `/ReAction-verified-split-button-menu` | advanced | React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Astro, Solid, Angular, Vanilla JS | static, browser, accessibility | [Async CTA Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md), [Secondary Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md), [Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) |
| [Check Vercel Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md) | `/ReAction-check-vercel-analytics` | advanced | Vercel, Next.js, React, Vite, SvelteKit, Nuxt, Astro, Remix | terminal, static | [Usage](../reactions/devtools/vercel/check-vercel-usage.reaction.md), [Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) |
| [Check Vercel Usage](../reactions/devtools/vercel/check-vercel-usage.reaction.md) | `/ReAction-check-vercel-usage` | intermediate | Vercel, Next.js, React, Vite, SvelteKit, Nuxt, Astro, Remix | terminal, static | [Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md), [Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) |
| [Check Vercel Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) | `/ReAction-check-vercel-deployment-status` | intermediate | Vercel, Next.js, React, Vite, SvelteKit, Nuxt, Astro, Remix | terminal, static | [Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md), [Usage](../reactions/devtools/vercel/check-vercel-usage.reaction.md), [Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md) |
| [Check Vercel Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md) | `/ReAction-check-vercel-error-logs` | advanced | Vercel, Next.js, React, Vite, SvelteKit, Nuxt, Astro, Remix | terminal, static, redaction | [Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md), [Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md) |
| [Check Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md) | `/ReAction-check-bun-project-health` | intermediate | Bun, JavaScript, TypeScript, Node.js, React, Next.js, Vite, SvelteKit, Nuxt, Astro, Remix | static, terminal | [Vercel Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md), [Vercel Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md) |
| [Run Bun Test and Diagnose](../reactions/devtools/bun/run-bun-test-and-diagnose.reaction.md) | `/ReAction-run-bun-test-and-diagnose` | intermediate | Bun, JavaScript, TypeScript, Node.js, React, Next.js, Vite, SvelteKit, Nuxt, Astro, Remix | static, terminal, redaction | [Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md), [Vercel Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md) |
| [Migrate Project to Bun](../reactions/devtools/bun/migrate-project-to-bun.reaction.md) | `/ReAction-migrate-project-to-bun` | advanced | Bun, JavaScript, TypeScript, Node.js, React, Next.js, Vite, SvelteKit, Nuxt, Astro, Remix | static, terminal, redaction | [Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md), [Run Bun Test and Diagnose](../reactions/devtools/bun/run-bun-test-and-diagnose.reaction.md) |
| [Bun Build Check](../reactions/devtools/bun/bun-build-check.reaction.md) | `/ReAction-bun-build-check` | intermediate | Bun, JavaScript, TypeScript, Node.js, React, Next.js, Vite, SvelteKit, Nuxt, Astro, Remix | static, terminal, redaction | [Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md), [Run Bun Test and Diagnose](../reactions/devtools/bun/run-bun-test-and-diagnose.reaction.md), [Migrate Project to Bun](../reactions/devtools/bun/migrate-project-to-bun.reaction.md) |
| [Setup Bun Test Runner](../reactions/devtools/bun/setup-bun-test-runner.reaction.md) | `/ReAction-setup-bun-test-runner` | advanced | Bun, JavaScript, TypeScript, Node.js, React, Next.js, Vite, SvelteKit, Nuxt, Astro, Remix | static, terminal, redaction | [Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md), [Run Bun Test and Diagnose](../reactions/devtools/bun/run-bun-test-and-diagnose.reaction.md), [Migrate Project to Bun](../reactions/devtools/bun/migrate-project-to-bun.reaction.md) |
| [Setup Bun CI GitHub Actions](../reactions/devtools/bun/setup-bun-ci-github-actions.reaction.md) | `/ReAction-setup-bun-ci-github-actions` | advanced | Bun, GitHub Actions, JavaScript, TypeScript, Node.js, React, Next.js, Vite, SvelteKit, Nuxt, Astro, Remix | static, redaction | [Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md), [Run Bun Test and Diagnose](../reactions/devtools/bun/run-bun-test-and-diagnose.reaction.md), [Bun Build Check](../reactions/devtools/bun/bun-build-check.reaction.md), [Migrate Project to Bun](../reactions/devtools/bun/migrate-project-to-bun.reaction.md) |
| [Setup OpenClaw First Run](../reactions/devtools/openclaw/setup-openclaw-first-run.reaction.md) | `/ReAction-setup-openclaw-first-run` | advanced | OpenClaw, Node.js, npm, pnpm, Bun, macOS, Linux, Windows, WSL2 | static, terminal, manual-review, redaction | [Setup Hermes First Run](../reactions/devtools/hermes/setup-hermes-first-run.reaction.md), [Setup OpenHands First Run](../reactions/devtools/openhands/setup-openhands-first-run.reaction.md) |
| [Setup Hermes First Run](../reactions/devtools/hermes/setup-hermes-first-run.reaction.md) | `/ReAction-setup-hermes-first-run` | advanced | Hermes Agent, Python, uv, Node.js, Git, Linux, macOS, Windows, WSL2, Termux | static, terminal, manual-review, redaction | [Setup OpenClaw First Run](../reactions/devtools/openclaw/setup-openclaw-first-run.reaction.md), [Setup OpenHands First Run](../reactions/devtools/openhands/setup-openhands-first-run.reaction.md), [Setup Cline CLI First Run](../reactions/devtools/cline/setup-cline-cli-first-run.reaction.md), [Check Hermes Agent Health](../reactions/devtools/hermes/check-hermes-agent-health.reaction.md) |
| [Check Hermes Agent Health](../reactions/devtools/hermes/check-hermes-agent-health.reaction.md) | `/ReAction-check-hermes-agent-health` | intermediate | Hermes Agent, Doctor, Provider, Model, Sessions, Gateway Status, Read-only, Secret Redaction | static, terminal, manual-review, secret-redaction-check, read-only-safety-check, doctor-output-review | [Setup Hermes First Run](../reactions/devtools/hermes/setup-hermes-first-run.reaction.md) |
| [Setup OpenHands First Run](../reactions/devtools/openhands/setup-openhands-first-run.reaction.md) | `/ReAction-setup-openhands-first-run` | advanced | OpenHands, Agent Canvas, OpenHands CLI, Python, uv, Node.js, npm, Docker, macOS, Linux, Windows, WSL2 | static, terminal, manual-review, redaction | [Setup Hermes First Run](../reactions/devtools/hermes/setup-hermes-first-run.reaction.md), [Setup OpenClaw First Run](../reactions/devtools/openclaw/setup-openclaw-first-run.reaction.md), [Setup Cline CLI First Run](../reactions/devtools/cline/setup-cline-cli-first-run.reaction.md) |
| [Setup Cline CLI First Run](../reactions/devtools/cline/setup-cline-cli-first-run.reaction.md) | `/ReAction-setup-cline-cli-first-run` | advanced | Cline, Cline CLI, Node.js, npm, Windows, macOS, Linux, WSL2 | static, terminal, manual-review, redaction | [Setup OpenHands First Run](../reactions/devtools/openhands/setup-openhands-first-run.reaction.md), [Setup Hermes First Run](../reactions/devtools/hermes/setup-hermes-first-run.reaction.md) |
| [Assume NCERT Class 8 Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-science/assume-ncert-class-8-science-tutor-responsibility.reaction.md) | `/ReAction-assume-ncert-class-8-science-tutor-responsibility` | advanced | Education, India, NCERT, Class 8, Science, Teacher Notes, Student Notes, English, Hindi, Hinglish | static, manual-review, safety-check, source-awareness, teacher-escalation-check | [Assume NCERT Class 8 Hindi Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-hindi/assume-ncert-class-8-hindi-tutor-responsibility.reaction.md), [Assume NCERT Class 8 English Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-english/assume-ncert-class-8-english-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Mathematics Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-math/assume-ncert-class-8-math-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Social Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-social-science/assume-ncert-class-8-social-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Sanskrit Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/assume-ncert-class-8-sanskrit-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Arts Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-arts/assume-ncert-class-8-arts-tutor-responsibility.reaction.md) |
| [Assume NCERT Class 8 Hindi Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-hindi/assume-ncert-class-8-hindi-tutor-responsibility.reaction.md) | `/ReAction-assume-ncert-class-8-hindi-tutor-responsibility` | advanced | Education, India, NCERT, Class 8, Hindi, Devanagari, Teacher Notes, Student Notes, Hinglish | static, manual-review, safety-check, source-awareness, teacher-escalation-check, devanagari-preservation | [Assume NCERT Class 8 Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-science/assume-ncert-class-8-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 English Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-english/assume-ncert-class-8-english-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Mathematics Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-math/assume-ncert-class-8-math-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Social Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-social-science/assume-ncert-class-8-social-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Sanskrit Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/assume-ncert-class-8-sanskrit-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Arts Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-arts/assume-ncert-class-8-arts-tutor-responsibility.reaction.md) |
| [Assume NCERT Class 8 English Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-english/assume-ncert-class-8-english-tutor-responsibility.reaction.md) | `/ReAction-assume-ncert-class-8-english-tutor-responsibility` | advanced | Education, India, NCERT, Class 8, English, Literature, Grammar, Writing, Teacher Notes, Student Notes, Hinglish | static, manual-review, safety-check, source-awareness, teacher-escalation-check, quoted-text-preservation | [Assume NCERT Class 8 Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-science/assume-ncert-class-8-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Hindi Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-hindi/assume-ncert-class-8-hindi-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Mathematics Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-math/assume-ncert-class-8-math-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Social Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-social-science/assume-ncert-class-8-social-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Sanskrit Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/assume-ncert-class-8-sanskrit-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Arts Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-arts/assume-ncert-class-8-arts-tutor-responsibility.reaction.md) |
| [Assume NCERT Class 8 Mathematics Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-math/assume-ncert-class-8-math-tutor-responsibility.reaction.md) | `/ReAction-assume-ncert-class-8-math-tutor-responsibility` | advanced | Education, India, NCERT, Class 8, Mathematics, Step-by-step Solving, Geometry, Word Problems, Teacher Notes, Student Notes, Hinglish | static, manual-review, safety-check, source-awareness, teacher-escalation-check, step-by-step-verification, arithmetic-check | [Assume NCERT Class 8 Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-science/assume-ncert-class-8-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Hindi Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-hindi/assume-ncert-class-8-hindi-tutor-responsibility.reaction.md), [Assume NCERT Class 8 English Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-english/assume-ncert-class-8-english-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Social Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-social-science/assume-ncert-class-8-social-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Sanskrit Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/assume-ncert-class-8-sanskrit-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Arts Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-arts/assume-ncert-class-8-arts-tutor-responsibility.reaction.md) |
| [Assume NCERT Class 8 Social Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-social-science/assume-ncert-class-8-social-science-tutor-responsibility.reaction.md) | `/ReAction-assume-ncert-class-8-social-science-tutor-responsibility` | advanced | Education, India, NCERT, Class 8, Social Science, History, Geography, Civics, Economics, Teacher Notes, Student Notes, Hinglish | static, manual-review, safety-check, source-awareness, teacher-escalation-check, neutrality-check, sensitive-topic-check, map-data-sufficiency-check | [Assume NCERT Class 8 Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-science/assume-ncert-class-8-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Hindi Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-hindi/assume-ncert-class-8-hindi-tutor-responsibility.reaction.md), [Assume NCERT Class 8 English Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-english/assume-ncert-class-8-english-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Mathematics Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-math/assume-ncert-class-8-math-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Sanskrit Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/assume-ncert-class-8-sanskrit-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Arts Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-arts/assume-ncert-class-8-arts-tutor-responsibility.reaction.md) |
| [Assume NCERT Class 8 Sanskrit Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/assume-ncert-class-8-sanskrit-tutor-responsibility.reaction.md) | `/ReAction-assume-ncert-class-8-sanskrit-tutor-responsibility` | advanced | Education, India, NCERT, Class 8, Sanskrit, Teacher Notes, Student Notes, Hindi, English, Hinglish | static, manual-review, safety-check, source-awareness, teacher-escalation-check, devanagari-preservation-check, grammar-precision-check | [Assume NCERT Class 8 Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-science/assume-ncert-class-8-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Hindi Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-hindi/assume-ncert-class-8-hindi-tutor-responsibility.reaction.md), [Assume NCERT Class 8 English Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-english/assume-ncert-class-8-english-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Mathematics Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-math/assume-ncert-class-8-math-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Social Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-social-science/assume-ncert-class-8-social-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Arts Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-arts/assume-ncert-class-8-arts-tutor-responsibility.reaction.md) |
| [Assume NCERT Class 8 Arts Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-arts/assume-ncert-class-8-arts-tutor-responsibility.reaction.md) | `/ReAction-assume-ncert-class-8-arts-tutor-responsibility` | advanced | Education, India, NCERT, Class 8, Arts, Art Education, Teacher Notes, Student Notes, Hindi, English, Hinglish | static, manual-review, safety-check, source-awareness, teacher-escalation-check, creative-integrity-check, practical-safety-check | [Assume NCERT Class 8 Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-science/assume-ncert-class-8-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Hindi Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-hindi/assume-ncert-class-8-hindi-tutor-responsibility.reaction.md), [Assume NCERT Class 8 English Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-english/assume-ncert-class-8-english-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Mathematics Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-math/assume-ncert-class-8-math-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Social Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-social-science/assume-ncert-class-8-social-science-tutor-responsibility.reaction.md), [Assume NCERT Class 8 Sanskrit Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/assume-ncert-class-8-sanskrit-tutor-responsibility.reaction.md) |

## Frontend / Buttons

Use these ReActions when you want an agent to add or modify frontend button patterns with accessibility and browser verification.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Verified Async CTA Button Green](../reactions/frontend/buttons/verified-async-cta-button-green.reaction.md) | intermediate | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, cta, async, loading-state, success-state |
| [Verified Secondary Button Neutral](../reactions/frontend/buttons/verified-secondary-button-neutral.reaction.md) | beginner | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, secondary, neutral, accessibility |
| [Verified Destructive Confirm Button Red](../reactions/frontend/buttons/verified-destructive-confirm-button-red.reaction.md) | advanced | high | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, destructive, confirmation, danger-zone |
| [Verified Copy Button Neutral](../reactions/frontend/buttons/verified-copy-button-neutral.reaction.md) | intermediate | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, copy, clipboard, feedback |
| [Verified Icon Button Neutral](../reactions/frontend/buttons/verified-icon-button-neutral.reaction.md) | intermediate | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, icon-button, aria-label, keyboard |
| [Verified Toggle Button Green](../reactions/frontend/buttons/verified-toggle-button-green.reaction.md) | intermediate | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, toggle, stateful, aria-pressed |
| [Verified Floating Action Button Green](../reactions/frontend/buttons/verified-floating-action-button-green.reaction.md) | advanced | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, floating-action-button, fab, responsive |
| [Verified Split Button Menu](../reactions/frontend/buttons/verified-split-button-menu.reaction.md) | advanced | medium | false | read-files, edit-files, inspect-components, run-commands, browser-preview, browser-interaction, accessibility-check | frontend, button, split-button, menu, keyboard-navigation |

Pack guide:

* [Frontend Button ReActions README](../reactions/frontend/buttons/README.md)

## DevTools / Vercel

Use these ReActions when you want an agent to inspect Vercel data using CLI-only, read-only workflows.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Check Vercel Analytics](../reactions/devtools/vercel/check-vercel-analytics.reaction.md) | advanced | medium | true | run-commands, read-stdout, read-stderr, inspect-current-directory, read-files, parse-json, parse-text | devtools, vercel, analytics, web-analytics, cli-only |
| [Check Vercel Usage](../reactions/devtools/vercel/check-vercel-usage.reaction.md) | intermediate | low | true | run-commands, read-stdout, read-stderr, inspect-current-directory, read-files, parse-json, parse-text | devtools, vercel, usage, cost, billing, cli-only |
| [Check Vercel Deployment Status](../reactions/devtools/vercel/check-vercel-deployment-status.reaction.md) | intermediate | low | true | run-commands, read-stdout, read-stderr, inspect-current-directory, read-files, parse-json, parse-text | devtools, vercel, deployment, status, health, cli-only |
| [Check Vercel Error Logs](../reactions/devtools/vercel/check-vercel-error-logs.reaction.md) | advanced | high | true | run-commands, read-stdout, read-stderr, inspect-current-directory, read-files, parse-json, parse-text | devtools, vercel, logs, errors, debugging, redaction |

Pack guide:

* [Vercel ReActions README](../reactions/devtools/vercel/README.md)

## DevTools / Bun

Use these ReActions when you want an agent to inspect Bun readiness, add Bun tests, run Bun tests, diagnose build failures, safely migrate projects to Bun, and add GitHub Actions CI.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Check Bun Project Health](../reactions/devtools/bun/check-bun-project-health.reaction.md) | intermediate | medium | true | inspect-current-directory, read-files, parse-json, parse-text, run-commands, read-stdout, read-stderr | devtools, bun, javascript, typescript, package-manager, health-check, static-fallback |
| [Run Bun Test and Diagnose](../reactions/devtools/bun/run-bun-test-and-diagnose.reaction.md) | intermediate | medium | true | inspect-current-directory, read-files, parse-json, parse-text, run-commands, read-stdout, read-stderr | devtools, bun, test, test-runner, diagnosis, static-fallback, redaction |
| [Migrate Project to Bun](../reactions/devtools/bun/migrate-project-to-bun.reaction.md) | advanced | high | false | inspect-current-directory, read-files, edit-files, parse-json, parse-text, run-commands, read-stdout, read-stderr | devtools, bun, migration, package-manager, lockfiles, confirmation-gates |
| [Bun Build Check](../reactions/devtools/bun/bun-build-check.reaction.md) | intermediate | medium | true | inspect-current-directory, read-files, parse-json, parse-text, run-commands, read-stdout, read-stderr | devtools, bun, build, bundler, diagnosis, static-fallback, redaction |
| [Setup Bun Test Runner](../reactions/devtools/bun/setup-bun-test-runner.reaction.md) | advanced | high | false | inspect-current-directory, read-files, edit-files, parse-json, parse-text, run-commands, read-stdout, read-stderr | devtools, bun, test-runner, test-setup, confirmation-gates, redaction |
| [Setup Bun CI GitHub Actions](../reactions/devtools/bun/setup-bun-ci-github-actions.reaction.md) | advanced | high | false | inspect-current-directory, read-files, edit-files, parse-json, parse-yaml, parse-text | devtools, bun, github-actions, ci, workflow, confirmation-gates |

Pack guide:

- [Bun ReActions README](../reactions/devtools/bun/README.md)

## DevTools / OpenClaw

Use these ReActions when you want an agent to set up, inspect, or harden OpenClaw workflows with confirmation gates and secret redaction.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Setup OpenClaw First Run](../reactions/devtools/openclaw/setup-openclaw-first-run.reaction.md) | advanced | high | false | inspect-current-directory, read-files, run-commands, read-stdout, read-stderr, ask-confirmation, redact-secrets | devtools, openclaw, first-run, setup, onboarding, gateway, dashboard, security |

Pack guide:

- [OpenClaw ReActions README](../reactions/devtools/openclaw/README.md)

## DevTools / Hermes Agent

Use these ReActions when you want an agent to set up, inspect, or harden Hermes Agent workflows with confirmation gates and secret redaction.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Setup Hermes First Run](../reactions/devtools/hermes/setup-hermes-first-run.reaction.md) | advanced | high | false | inspect-current-directory, read-files, run-commands, read-stdout, read-stderr, ask-confirmation, redact-secrets | devtools, hermes, first-run, setup, provider-setup, cli, tui, doctor, security |
| [Check Hermes Agent Health](../reactions/devtools/hermes/check-hermes-agent-health.reaction.md) | intermediate | high | true | inspect-command-availability, run-read-only-terminal-commands, interpret-hermes-doctor, check-provider-model-status, check-session-resume, check-gateway-status-read-only, redact-secrets, produce-health-report | devtools, hermes, hermes-agent, health-check, doctor, provider, model, sessions, gateway-status, read-only, security, secret-redaction, local-cli-first |

Pack guide:

- [Hermes Agent ReActions README](../reactions/devtools/hermes/README.md)

## DevTools / OpenHands

Use these ReActions when you want an agent to set up, inspect, or harden OpenHands workflows with confirmation gates and secret redaction.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Setup OpenHands First Run](../reactions/devtools/openhands/setup-openhands-first-run.reaction.md) | advanced | high | false | inspect-current-directory, read-files, run-commands, read-stdout, read-stderr, ask-confirmation, open-local-dashboard, redact-secrets | devtools, openhands, first-run, setup, local-backend, provider-setup, docker, security |

Pack guide:

- [OpenHands ReActions README](../reactions/devtools/openhands/README.md)

## DevTools / Cline

Use these ReActions when you want an agent to set up, inspect, or harden Cline CLI workflows with confirmation gates and secret redaction.

| ReAction | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Setup Cline CLI First Run](../reactions/devtools/cline/setup-cline-cli-first-run.reaction.md) | advanced | high | false | inspect-current-directory, read-files, run-commands, read-stdout, read-stderr, ask-confirmation, redact-secrets | devtools, cline, cline-cli, first-run, setup, authentication, tui, provider-setup, auto-approve, security |

Pack guide:

- [Cline ReActions README](../reactions/devtools/cline/README.md)

## Responsibilities / Education India NCERT

Use these ReAction Responsibilities when you want an agent to assume a strict-source tutoring or student-support accountability contract.

Responsibility ReActions define what the agent must own, verify, avoid, escalate, and report while helping a user.

| ReAction Responsibility | Difficulty | Safety Level | Read Only | Capabilities | Tags |
|---|---|---|---|---|---|
| [Assume NCERT Class 8 Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-science/assume-ncert-class-8-science-tutor-responsibility.reaction.md) | advanced | high | true | identify-source-presence, classify-source-type, detect-source-sufficiency, read-provided-source, explain-from-source-only, generate-source-grounded-practice-questions, identify-unsafe-experiments, identify-teacher-escalation-cases | responsibilities, education, india, ncert, class-8, science, strict-source, student-safety |
| [Assume NCERT Class 8 Hindi Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-hindi/assume-ncert-class-8-hindi-tutor-responsibility.reaction.md) | advanced | high | true | identify-source-presence, classify-source-type, detect-source-sufficiency, read-provided-source, preserve-devanagari, explain-from-source-only, generate-source-grounded-practice-questions, identify-teacher-escalation-cases | responsibilities, education, india, ncert, class-8, hindi, strict-source, devanagari, student-safety |
| [Assume NCERT Class 8 English Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-english/assume-ncert-class-8-english-tutor-responsibility.reaction.md) | advanced | high | true | identify-source-presence, classify-source-type, detect-source-sufficiency, read-provided-source, preserve-quoted-text, explain-from-source-only, generate-source-grounded-practice-questions, identify-teacher-escalation-cases | responsibilities, education, india, ncert, class-8, english, strict-source, literature, grammar, writing, student-safety |
| [Assume NCERT Class 8 Mathematics Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-math/assume-ncert-class-8-math-tutor-responsibility.reaction.md) | advanced | high | true | identify-source-presence, classify-source-type, detect-source-sufficiency, read-provided-source, preserve-equations-and-symbols, explain-from-source-only, solve-step-by-step, check-arithmetic, identify-teacher-escalation-cases | responsibilities, education, india, ncert, class-8, mathematics, strict-source, step-by-step, student-safety |
| [Assume NCERT Class 8 Social Science Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-social-science/assume-ncert-class-8-social-science-tutor-responsibility.reaction.md) | advanced | high | true | identify-source-presence, classify-source-type, detect-source-sufficiency, classify-social-science-content-area, understand-user-question, ask-clarifying-questions, read-provided-source, preserve-quoted-text, explain-from-source-only, generate-source-grounded-practice-questions, check-understanding, identify-teacher-escalation-cases, identify-sensitive-topic-risks, identify-map-data-insufficiency, redact-personal-data, final-report | responsibilities, education, india, ncert, class-8, social-science, strict-source, neutrality, student-safety |
| [Assume NCERT Class 8 Sanskrit Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/assume-ncert-class-8-sanskrit-tutor-responsibility.reaction.md) | advanced | high | true | identify-source-presence, classify-source-type, detect-source-sufficiency, understand-user-question, ask-clarifying-questions, read-provided-source, preserve-devanagari, explain-from-source-only, translate-source-only, explain-grammar-only, generate-source-grounded-practice-questions, check-understanding, identify-teacher-escalation-cases, identify-sensitive-content-risks, redact-personal-data, final-report | responsibilities, education, india, ncert, class-8, sanskrit, strict-source, devanagari, student-safety |
| [Assume NCERT Class 8 Arts Tutor Responsibility](../reactions/responsibilities/education/india/ncert/class-8-arts/assume-ncert-class-8-arts-tutor-responsibility.reaction.md) | advanced | high | true | identify-source-presence, classify-source-type, detect-source-sufficiency, classify-arts-content-area, understand-user-question, ask-clarifying-questions, read-provided-source, explain-from-source-only, generate-source-grounded-planning-steps, generate-source-grounded-reflection-questions, check-understanding, identify-teacher-escalation-cases, identify-practical-activity-safety-risks, identify-sensitive-content-risks, redact-personal-data, final-report | responsibilities, education, india, ncert, class-8, arts, art-education, strict-source, teacher-notes, student-notes, homework-help, exam-revision, student-safety, minor-privacy, teacher-escalation, hinglish |

Pack guides:

- [NCERT Class 8 Mathematics Tutor Responsibilities README](../reactions/responsibilities/education/india/ncert/class-8-math/README.md)
- [NCERT Class 8 English Tutor Responsibilities README](../reactions/responsibilities/education/india/ncert/class-8-english/README.md)
- [NCERT Class 8 Hindi Tutor Responsibilities README](../reactions/responsibilities/education/india/ncert/class-8-hindi/README.md)
- [NCERT Class 8 Science Tutor Responsibilities README](../reactions/responsibilities/education/india/ncert/class-8-science/README.md)
- [NCERT Class 8 Social Science Tutor Responsibilities README](../reactions/responsibilities/education/india/ncert/class-8-social-science/README.md)
- [NCERT Class 8 Sanskrit Tutor Responsibilities README](../reactions/responsibilities/education/india/ncert/class-8-sanskrit/README.md)
- [NCERT Class 8 Arts Tutor Responsibilities README](../reactions/responsibilities/education/india/ncert/class-8-arts/README.md)

## Source of truth

The machine-readable index is:

```txt
reactions.json
```

When adding a new ReAction:

1. Add the `.reaction.md` file.
2. Add it to `reactions.json`.
3. Add it to this catalog.
4. Update the relevant pack README.
5. Run the validator.

## Catalog maintenance note

Future ReActions must be added to both `reactions.json` and this catalog to ensure discoverability and index synchronization.

## Validate

```bash
node scripts/validate-reactions-index.mjs
```
