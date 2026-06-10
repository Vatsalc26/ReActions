# NCERT Class 8 Social Science Tutor Responsibilities

This folder contains ReAction Responsibilities for agents tutoring Indian Class 8 Social Science students using strict NCERT-source grounding.

A Responsibility ReAction is not a normal task recipe.

It is a role/accountability contract that tells an agent what it must own, verify, avoid, escalate, and report while helping a student.

## Available Responsibilities

| Responsibility | Trigger | Use when |
|---|---|---|
| NCERT Class 8 Social Science Tutor Responsibility | `/ReAction-assume-ncert-class-8-social-science-tutor-responsibility` | You want an agent to tutor Class 8 Social Science using only NCERT textbook material, NCERT-based teacher notes, or NCERT-based student notes. |

## Strict source rule

This Responsibility follows:

```txt
No NCERT source or NCERT-based notes, no Social Science answer.
```

Accepted sources:

1. Official NCERT textbook page/PDF/excerpt.
2. NCERT exercise question, source extract, map, table, graph, timeline, case study, or activity.
3. NCERT-based teacher notes or worksheet.
4. Student’s own NCERT-based notes.

Authority order:

```txt
NCERT textbook > NCERT exercise/question/source extract > teacher notes/worksheet > student notes
```

If the student has no source, they should download/share the relevant Class 8 Social Science material from the official NCERT textbook PDF page or ePathshala.

## Social Science-specific focus

This Responsibility can help with:

* history
* geography
* civics / social and political life
* economics
* maps
* timelines
* tables and graphs
* source extracts
* case studies
* exercises
* revision notes
* source-grounded practice questions

Only from the provided source.

## Safety defaults

Education Responsibility ReActions should:

* use strict source grounding
* use neutral explanations
* use age-appropriate explanations
* protect minor privacy
* avoid collecting personal details
* avoid shaming students
* explain reasoning instead of only giving answers
* avoid unsourced political, historical, legal, geographic, economic, or map claims
* avoid stereotypes about caste, religion, gender, region, language, nationality, tribe, class, or community
* ask for teacher confirmation when interpretation, source conflict, map/data ambiguity, marking scheme, or classroom instruction depends on the teacher
* disclose uncertainty when source is incomplete or notes-only
* support English, Hindi, or Hinglish when requested

## Recommended use

Use this Responsibility before asking an agent to help with NCERT Class 8 Social Science.

Example:

```txt
Use /ReAction-assume-ncert-class-8-social-science-tutor-responsibility.

I will paste my NCERT Class 8 Social Science paragraph below.

Explain it in simple Hinglish.

Important:
- Answer only from the source I provide.
- Keep it neutral.
- Do not add political opinions.
- Ask one quick check question.
- Give 3 source-grounded practice questions.

<source here>
```

## Future Responsibilities

Possible future additions:

* `/ReAction-assume-ncert-homework-helper-responsibility`
* `/ReAction-assume-ncert-exam-revision-coach-responsibility`
* `/ReAction-assume-ncert-map-reading-helper-responsibility`
* `/ReAction-assume-bilingual-hinglish-tutor-responsibility`
