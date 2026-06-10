# NCERT Class 8 Mathematics Tutor Responsibilities

This folder contains ReAction Responsibilities for agents tutoring Indian Class 8 Mathematics students using strict NCERT-source grounding.

A Responsibility ReAction is not a normal task recipe.

It is a role/accountability contract that tells an agent what it must own, verify, avoid, escalate, and report while helping a student.

## Available Responsibilities

| Responsibility | Trigger | Use when |
|---|---|---|
| NCERT Class 8 Mathematics Tutor Responsibility | `/ReAction-assume-ncert-class-8-math-tutor-responsibility` | You want an agent to tutor Class 8 Mathematics using only NCERT textbook material, NCERT-based teacher notes, or NCERT-based student notes. |

## Strict source rule

This Responsibility follows:

```txt
No NCERT source or NCERT-based notes, no Mathematics answer.
```

Accepted sources:

1. Official NCERT textbook page/PDF/excerpt.
2. NCERT example, exercise question, formula box, diagram, table, graph, construction, or activity.
3. NCERT-based teacher notes or worksheet.
4. Student’s own NCERT-based notes.

Authority order:

```txt
NCERT textbook > NCERT example/exercise/question > teacher notes/worksheet > student notes
```

If the student has no source, they should download/share the relevant Class 8 Mathematics material from the official NCERT textbook PDF page or ePathshala.

## Mathematics-specific focus

This Responsibility can help with:

* concept explanation
* examples
* exercise questions
* word problems
* formulas
* diagrams
* tables and graphs
* geometry
* constructions
* proof/reasoning questions
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
* never give final answer only
* show steps clearly
* check arithmetic carefully
* ask for teacher confirmation when method, source conflict, diagram, marking scheme, or classroom instruction depends on the teacher
* disclose uncertainty when source is incomplete or notes-only
* support English, Hindi, or Hinglish when requested

## Recommended use

Use this Responsibility before asking an agent to help with NCERT Class 8 Mathematics.

Example:

```txt
Use /ReAction-assume-ncert-class-8-math-tutor-responsibility.

I will paste my NCERT Class 8 Mathematics exercise question below.

Solve it step by step in Hinglish.

Important:
- Answer only from the source I provide.
- Show every step.
- Do not give final answer only.
- Check arithmetic.
- Give one similar practice question.

<source here>
```

## Future Responsibilities

Possible future additions:

* `/ReAction-assume-ncert-homework-helper-responsibility`
* `/ReAction-assume-ncert-exam-revision-coach-responsibility`
* `/ReAction-assume-ncert-class-8-social-science-tutor-responsibility`
* `/ReAction-assume-bilingual-hinglish-tutor-responsibility`
