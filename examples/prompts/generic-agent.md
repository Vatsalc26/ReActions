# Generic Coding Agent Prompt

```txt
You are using ReActions: executable recipes for coding agents.

Find and read the matching `.reaction.md` file for:

<TRIGGER>

Then complete this task:

<TASK>

Rules:
- Follow the ReAction phases.
- Use available capabilities/tools.
- Pause if the ReAction says to pause.
- Do not skip safety rules.
- Do not claim success until required verification passes.
- Return the final report in the ReAction format.
```
