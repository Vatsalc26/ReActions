# ReAction Preview Format

A preview file describes examples that can later be used to generate screenshots, videos, or store cards for a ReAction.

Preview files are optional for now.

Recommended file name:

```txt
<reaction-id>.preview.json
```

Example:

```txt
verified-async-cta-button-green.preview.json
```

## Purpose

A preview file should answer:

* What examples should be shown?
* Which example is the primary preview?
* What prompt should be used?
* What screenshot or video should represent the result?
* What behavior should be visible?

## Example

```json
{
  "reactionId": "verified-async-cta-button-green",
  "reactionFile": "reactions/frontend/buttons/verified-async-cta-button-green.reaction.md",
  "category": "frontend",
  "subcategory": "buttons",
  "primaryScreenshot": "examples/frontend/buttons/verified-async-cta-button-green/screenshots/default-green.png",
  "examples": [
    {
      "id": "default-green",
      "title": "Default green CTA button",
      "previewType": "default_preset",
      "isPrimary": true,
      "prompt": "Use /ReAction-verified-async-cta-button-green. Add a \"Create Project\" button in the lower right corner. When clicked, show \"Creating...\" then \"Project created\".",
      "screenshot": "examples/frontend/buttons/verified-async-cta-button-green/screenshots/default-green.png",
      "description": "Default green preset with async loading and success feedback."
    },
    {
      "id": "white-pill-override",
      "title": "White pill override",
      "previewType": "style_override",
      "isPrimary": false,
      "prompt": "Use /ReAction-verified-async-cta-button-green. Add a \"Deploy\" button below the hero text, make it white and pill shaped. When clicked, show \"Deploying...\" then \"Deployed\".",
      "screenshot": "examples/frontend/buttons/verified-async-cta-button-green/screenshots/white-pill-override.png",
      "description": "Explicit white background and pill-shape override while preserving async behavior."
    }
  ]
}
```

## Rules

* Use one primary preview.
* Label overrides clearly.
* Do not make override previews look like the default preset.
* Keep prompts realistic.
* Keep screenshots/videos outside git if they are large.
* Prefer GitHub Release assets for large videos.
