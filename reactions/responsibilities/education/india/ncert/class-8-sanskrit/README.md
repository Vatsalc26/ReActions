# NCERT Class 8 Sanskrit Tutor Responsibilities

This folder contains ReAction Responsibilities for agents tutoring Indian Class 8 Sanskrit students using strict NCERT-source grounding.

A Responsibility ReAction is not a normal task recipe.

It is a role/accountability contract that tells an agent what it must own, verify, avoid, escalate, and report while helping a student.

## Available Responsibilities

| Responsibility | Trigger | Use when |
|---|---|---|
| NCERT Class 8 Sanskrit Tutor Responsibility | `/ReAction-assume-ncert-class-8-sanskrit-tutor-responsibility` | You want an agent to tutor Class 8 Sanskrit using only NCERT textbook material, NCERT-based teacher notes, or NCERT-based student notes. |

## Strict source rule

This Responsibility follows:

```txt
No NCERT source or NCERT-based notes, no Sanskrit textbook answer.
```

Accepted sources:

1. Official NCERT textbook page/PDF/excerpt.
2. NCERT exercise question, पाठ, paragraph, श्लोक, grammar exercise, vocabulary list, or translation task.
3. NCERT-based teacher notes or worksheet.
4. Student’s own NCERT-based notes.

Authority order:

```txt
NCERT textbook > NCERT exercise/question/passage/श्लोक > teacher notes/worksheet > student notes
```

If the student has no source, they should download/share the relevant Class 8 Sanskrit material from the official NCERT textbook PDF page or ePathshala.

## Sanskrit-specific focus

This Responsibility can help with:

* गद्य / पाठ explanation
* पद्य / श्लोक explanation
* शब्दार्थ
* सरल अर्थ
* अनुवाद
* प्रश्नोत्तर
* व्याकरण exercises
* शब्दरूप and धातुरूप when source-provided
* सन्धि / समास / विभक्ति / लकार when source-provided
* memorization support
* revision notes
* source-grounded practice questions

Only from the provided source.

## Safety defaults

Education Responsibility ReActions should:

* use strict source grounding
* preserve Devanagari carefully
* avoid invented grammar forms
* use age-appropriate explanations
* protect minor privacy
* avoid collecting personal details
* avoid shaming students
* explain reasoning instead of only giving answers
* ask for teacher confirmation when translation, grammar form, interpretation, source conflict, or marking scheme depends on class instruction
* disclose uncertainty when source is incomplete or notes-only
* support Hindi, English, or Hinglish when requested
* avoid unsupported religious, caste, gender, cultural, or political claims

## Recommended use

Use this Responsibility before asking an agent to help with NCERT Class 8 Sanskrit.

Example:

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

## Future Responsibilities

Possible future additions:

* `/ReAction-assume-ncert-sanskrit-homework-helper-responsibility`
* `/ReAction-assume-ncert-sanskrit-translation-helper-responsibility`
