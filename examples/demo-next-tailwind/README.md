# ReActions Next.js + Tailwind Demo

A tiny demo project for testing frontend ReActions.

Use this when you want to try Button ReActions in a real frontend app.

## Try it in 2 minutes

```bash
cd examples/demo-next-tailwind
npm install
npm run dev
```

Then ask your coding agent:

```txt
Use /ReAction-verified-async-cta-button-green.
Add a "Create Project" button to the hero section.
When clicked, show "Creating..." then "Project created".
Verify it in the browser.
```

Or:

```txt
Use /ReAction-verified-destructive-confirm-button-red.
Add a Delete Workspace button to the danger zone.
Require confirmation before the destructive action.
Verify cancel and confirm paths in the browser.
```

## Purpose

This demo exists so people can quickly test ReActions without bringing their own app.

It intentionally contains:

- hero section
- action area
- settings card
- danger zone
- footer area

These give agents realistic places to insert buttons.

## Notes

- Do not commit `node_modules`.
- This demo is intentionally minimal.
