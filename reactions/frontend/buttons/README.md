# Frontend Button ReActions

This folder contains ReActions for common modern frontend button patterns.

Each `.reaction.md` file is a portable, provider-agnostic playbook that an LLM agent or coding agent can follow to add a specific kind of button to a frontend project.

These ReActions are not just style prompts. Each one defines:

- purpose
- execution modes
- required capabilities
- behavior contract
- accessibility requirements
- pause conditions
- static checks
- browser verification
- final report format

## Available Button ReActions

| ReAction | Trigger | Use when |
|---|---|---|
| Verified Async CTA Button Green | `/ReAction-verified-async-cta-button-green` | You need a primary action such as create, save, deploy, generate, continue, or start. |
| Verified Secondary Button Neutral | `/ReAction-verified-secondary-button-neutral` | You need a lower-emphasis action such as cancel, back, maybe later, learn more, view details, skip, dismiss, or reset filters. |
| Verified Destructive Confirm Button Red | `/ReAction-verified-destructive-confirm-button-red` | You need a dangerous action such as delete, remove, revoke, reset, archive, or cancel subscription. |
| Verified Copy Button Neutral | `/ReAction-verified-copy-button-neutral` | You need to copy a value such as an API key, invite link, webhook URL, install command, code snippet, environment variable, or share link. |
| Verified Icon Button Neutral | `/ReAction-verified-icon-button-neutral` | You need a compact icon-only or icon-first action such as settings, search, close, menu, edit, refresh, sidebar toggle, or more actions. |
| Verified Toggle Button Green | `/ReAction-verified-toggle-button-green` | You need a stateful on/off action such as dark mode, notifications, auto-save, favorite, publish, enable integration, or compact mode. |

---

# Choosing the Right Button ReAction

## Use Async CTA for primary actions

Use:

```txt
/ReAction-verified-async-cta-button-green
```

For actions like:

* Create Project
* Save Changes
* Deploy
* Generate
* Continue
* Start Trial
* Connect Account
* Send Invite

This ReAction is for primary actions that often need:

* loading state
* disabled state while loading
* success feedback
* browser verification

---

## Use Secondary Button for lower-emphasis actions

Use:

```txt
/ReAction-verified-secondary-button-neutral
```

For actions like:

* Cancel
* Back
* Maybe later
* Skip
* Learn more
* View details
* Dismiss
* Reset filters

This ReAction is for actions that should not visually compete with the primary CTA.

It should preserve:

* lower visual emphasis
* correct button or link semantics
* keyboard accessibility
* focus-visible state
* disabled state if requested
* browser verification

---

## Use Destructive Confirm for dangerous actions

Use:

```txt
/ReAction-verified-destructive-confirm-button-red
```

For actions like:

* Delete Project
* Remove User
* Revoke API Key
* Reset Settings
* Archive Workspace
* Cancel Subscription

This ReAction requires:

* confirmation flow
* cancel path
* confirm path
* loading state after confirmation
* success feedback
* no accidental destructive action
* browser verification

Do not use a normal secondary or icon button for destructive actions unless a confirmation flow is included.

---

## Use Copy Button for clipboard actions

Use:

```txt
/ReAction-verified-copy-button-neutral
```

For actions like:

* Copy API key
* Copy webhook URL
* Copy invite link
* Copy install command
* Copy code snippet
* Copy environment variable
* Copy share link

This ReAction requires:

* clear copy source
* clipboard behavior
* copied feedback
* failure handling
* sensitive value safety
* browser verification

---

## Use Icon Button for compact UI actions

Use:

```txt
/ReAction-verified-icon-button-neutral
```

For actions like:

* Settings
* Search
* Close
* Open menu
* More actions
* Edit
* Refresh
* Open sidebar
* Toggle panel

This ReAction requires:

* real button semantics
* accessible label
* no ambiguous icon-only controls
* focus-visible state
* keyboard accessibility
* browser verification

If the icon button is destructive, prefer the destructive confirm ReAction.

If the icon button copies a value, prefer the copy button ReAction unless the copy source is clear and icon-only behavior is explicitly requested.

---

## Use Toggle Button for on/off state

Use:

```txt
/ReAction-verified-toggle-button-green
```

For stateful actions like:

* Enable notifications
* Turn on dark mode
* Enable auto-save
* Show sidebar
* Favorite
* Publish/unpublish
* Enable integration
* Compact mode

This ReAction requires:

* on/off state
* `aria-pressed` or equivalent accessible state
* visible active/inactive styling
* keyboard accessibility
* browser verification

---

# Decision Guide

Use this quick guide:

```txt
Is the action primary and async?
→ Use verified-async-cta-button-green

Is the action lower-emphasis or supportive?
→ Use verified-secondary-button-neutral

Is the action dangerous or irreversible?
→ Use verified-destructive-confirm-button-red

Does the action copy a value?
→ Use verified-copy-button-neutral

Is it compact/icon-only?
→ Use verified-icon-button-neutral

Is it an on/off state?
→ Use verified-toggle-button-green
```

If more than one applies, choose the stricter ReAction.

Examples:

```txt
Icon-only delete button
→ destructive confirm button, not generic icon button

Icon-only copy button
→ copy button, with accessible label

Primary save button
→ async CTA button

Cancel beside save button
→ secondary button

Dark mode switch
→ toggle button
```

---

# Completion Rule

A Button ReAction should not claim success unless required verification passes.

Most button ReActions require:

* static checks when available
* rendered browser verification
* interaction verification
* accessibility semantics check
* no console errors

If browser verification cannot run, the final status should be:

```txt
incomplete_verification
```

---

# Future Button ReActions

Possible future additions:

* Verified Floating Action Button Green
* Verified Split Button Menu
* Verified File Upload Button
* Verified OAuth Sign-in Button
* Verified Pagination Button
* Verified Command Palette Trigger Button
* Verified Toolbar Button Group
