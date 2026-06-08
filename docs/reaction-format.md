# ReAction Format

A ReAction is a Markdown playbook for LLM agents.

It should be readable by humans and executable by agents.

## Recommended File Name

```txt
<reaction-id>.reaction.md
```

Example:

```txt
verified-async-cta-button-green.reaction.md
```

## Recommended Structure

A ReAction should include:

1. Frontmatter metadata
2. Purpose
3. Execution modes
4. Tool/capability mapping
5. Contract or invariants
6. Working state
7. Sequential phases
8. Pause conditions
9. Verification rules
10. Final report format

## Execution Modes

A ReAction should support both:

### Native Agent Mode

The coding agent already has file, terminal, and browser tools.

### Runner Mode

A ReAction runner provides tools for the LLM.

## Capabilities

ReActions should describe required capabilities instead of provider-specific tool names.

Examples:

* inspect files
* search code
* edit files
* run project commands
* open browser
* inspect browser
* click UI
* read console errors
* ask user
* report progress

## Completion Rule

A ReAction should not claim success unless required verification passes.

If browser verification is required but unavailable, the final status should be:

```txt
incomplete_verification
```
