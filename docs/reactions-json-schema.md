# reactions.json Schema

`reactions.json` is the machine-readable index for the ReActions repository.

It powers discovery, catalog pages, validation, and future runners.

## Required fields

Each ReAction entry must include:

| Field | Type | Purpose |
|---|---|---|
| id | string | Stable ReAction identifier. |
| name | string | Human-readable name. |
| trigger | string | Copyable trigger, starting with `/ReAction-`. |
| category | string | Broad category such as `frontend` or `devtools`. |
| subcategory | string | Pack or subgroup such as `buttons` or `vercel`. |
| path | string | Path to the `.reaction.md` file. |
| summary | string | Short description. |
| difficulty | string | `beginner`, `intermediate`, or `advanced`. |
| estimated_context_tokens | string | Rough context size estimate. |
| supported_frameworks | string[] | Frameworks/platforms where the ReAction is useful. |
| capabilities | string[] | Required agent/runner capabilities. |
| verification | string[] | Required verification types. |
| safety_level | string | `low`, `medium`, or `high`. |
| read_only | boolean | Whether the ReAction avoids writes. |
| tags | string[] | Search/discovery tags. |
| related_reactions | object[] | Cross-links to related ReActions. |

## Related ReActions

Each related ReAction entry should look like:

```json
{
  "id": "check-vercel-error-logs",
  "relationship": "next-step"
}
```

Allowed relationships:

* `alternative`
* `use-with`
* `next-step`
* `do-not-confuse-with`
* `prerequisite`

## Validation

Run:

```bash
node scripts/validate-reactions-index.mjs
```
