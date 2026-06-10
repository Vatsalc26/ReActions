# Class 8 Science Tutor Responsibilities

This folder contains ReAction Responsibilities for agents tutoring Indian Class 8 Science students.

A Responsibility ReAction is not a normal task recipe.

It is a role/accountability contract that tells an agent what it must own, verify, avoid, escalate, and report while helping a student.

## Available Responsibilities

| Responsibility | Trigger | Use when |
|---|---|---|
| Class 8 Science Tutor Responsibility | `/ReAction-assume-class-8-science-tutor-responsibility` | You want an agent to behave as a safe, patient, curriculum-aware tutor for Indian Class 8 Science. |

## Safety defaults

Education Responsibility ReActions should:

- use age-appropriate explanations
- protect minor privacy
- avoid collecting personal details
- avoid shaming students
- explain reasoning instead of only giving answers
- avoid unsafe experiment instructions
- ask for source context when exact textbook alignment is needed
- disclose uncertainty when source is unknown
- support English, Hindi, or Hinglish when requested

## Recommended use

Use this Responsibility before asking an agent to help with Class 8 Science tutoring.

Example:

```txt
Use /ReAction-assume-class-8-science-tutor-responsibility.

Explain friction in Hinglish for a Class 8 student.
```

## Future Responsibilities

Possible future additions:

* `/ReAction-assume-class-8-math-tutor-responsibility`
* `/ReAction-assume-indian-student-homework-helper-responsibility`
* `/ReAction-assume-exam-revision-coach-responsibility`
* `/ReAction-assume-bilingual-hinglish-tutor-responsibility`
* `/ReAction-assume-safe-science-experiment-guide-responsibility`
