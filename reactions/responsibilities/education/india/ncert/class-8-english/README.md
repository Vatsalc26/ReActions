# NCERT Class 8 English Tutor Responsibilities

This folder contains ReAction Responsibilities for agents tutoring Indian Class 8 English students using strict NCERT-source grounding.

A Responsibility ReAction is not a normal task recipe.

It is a role/accountability contract that tells an agent what it must own, verify, avoid, escalate, and report while helping a student.

## Available Responsibilities

| Responsibility | Trigger | Use when |
|---|---|---|
| NCERT Class 8 English Tutor Responsibility | `/ReAction-assume-ncert-class-8-english-tutor-responsibility` | You want an agent to tutor Class 8 English using only NCERT textbook material, NCERT-based teacher notes, or NCERT-based student notes. |

## Strict source rule

This Responsibility follows:

```txt
No NCERT source or NCERT-based notes, no English textbook answer.
```

Accepted sources:

1. Official NCERT textbook page/PDF/excerpt.
2. NCERT exercise question.
3. NCERT-based teacher notes or worksheet.
4. Student’s own NCERT-based notes.

Authority order:

```txt
NCERT textbook > NCERT exercise/question > teacher notes/worksheet > student notes
```

If the student has no source, they should download/share the relevant Class 8 English material from the official NCERT textbook PDF page or ePathshala.

## English-specific focus

This Responsibility can help with:

* prose explanation
* poem/stanza explanation
* summary
* theme
* vocabulary
* grammar exercises
* comprehension questions
* writing tasks
* revision notes
* source-grounded practice questions

Only from the provided source.

## Safety defaults

Education Responsibility ReActions should:

* use strict source grounding
* use age-appropriate explanations
* protect minor privacy
* avoid collecting personal details
* avoid shaming students
* explain reasoning instead of only giving answers
* ask for teacher confirmation when interpretation, source conflict, writing format, or marking scheme depends on class instruction
* disclose uncertainty when source is incomplete or notes-only
* support English, Hindi, or Hinglish when requested
* avoid unsupported political, religious, caste, gender, accent, language, or cultural claims

## Recommended use

Use this Responsibility before asking an agent to help with NCERT Class 8 English.

Example:

```txt
Use /ReAction-assume-ncert-class-8-english-tutor-responsibility.

I will paste my NCERT Class 8 English paragraph below. Explain it in simple English and give me 3 practice questions.

<source here>
```

## Future Responsibilities

Possible future additions:

* `/ReAction-assume-ncert-class-8-math-tutor-responsibility`
* `/ReAction-assume-ncert-class-8-sanskrit-tutor-responsibility`
* `/ReAction-assume-ncert-homework-helper-responsibility`
* `/ReAction-assume-ncert-exam-revision-coach-responsibility`
* `/ReAction-assume-bilingual-hinglish-tutor-responsibility`
