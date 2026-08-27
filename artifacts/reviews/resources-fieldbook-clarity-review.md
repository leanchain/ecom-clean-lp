# /resources (Commerce Fieldbook) — clarity review for non-technical brand owners

Scope reviewed: `src/app/resources/**`, all 22 `content/fieldbook/**` MDX docs, `src/lib/commerce-fieldbook.ts` (47 ecosystem resources), navigation/shell/document components.

## What's already working

- Top-level IA is genuinely plain-language: `/resources`, `/resources/problems`, `/resources/skills`, `/resources/playbooks` headers and section blurbs ("Give each team a role, an order of work...") read fine for a founder with no technical background.
- Problem titles are already symptom-first, in the owner's own words ("Our feed and product page disagree", "Checkout fails for only some visitors") — matches PRODUCT.md's goal of letting a merchant "arrive through a problem they can name."
- `difficulty` (beginner/intermediate/advanced) already exists on Problems frontmatter — good signal, just not surfaced on Skills/Playbooks cards.
- Evidence vocabulary (Observed/Attributed/Modeled/Hypothesis/Verified) is applied consistently — do not touch, it's load-bearing per PRODUCT.md.

## The actual gap

Every Problem, Skill, and Playbook doc follows the same shape: a plain-language title/summary/symptoms section, then a "What to capture / Steps / Checks" body written for whoever executes the work — and that body assumes technical fluency with no bridge sentence:

- Jargon used without definition, repeatedly, across docs: **JSON-LD, canonical URL, GTIN/MPN/SKU, robots rules, consent state, attribution window, `Product`/`Offer`/`ProductGroup` entities, PDP, deduplication logic, indexability**.
- Skills explicitly declare `worksWith: Claude, Coding agents, QA teams` — correct that a founder shouldn't run these personally, but nothing tells the founder *what to do with the page* (forward it to a developer? paste it into an AI agent? both are true, neither is said).
- No glossary page exists anywhere in `/resources`, despite ~10 recurring technical terms and acronyms (GEO, AEO, CRO also appear in search-index keywords with no definition on any visible page).
- A non-technical owner opening e.g. "Feed-to-PDP parity check" lands on "GTIN, MPN, SKU, and variant identity" as the second thing they read, with no plain-language framing above it.

This is a **framing gap, not a wrong-audience problem** — the technical depth is doing real work for the dev/agent audience PRODUCT.md defines as one of the two co-equal users. Rewriting the execution steps into plain language would blunt the exact precision that makes a skill usable by a developer or coding agent, and would work against the "hand to someone else" job-to-be-done PRODUCT.md calls out for the ecommerce-lead persona.

## Recommended fix (preserves technical accuracy, adds a plain-language bridge)

1. **"Who does this" line on every Problem/Skill/Playbook header** — one sentence stating whether the owner can read this alone, needs to forward it, or should hand it to an AI coding agent. Small change to `fieldbook-document-header.tsx` + one new frontmatter field.
2. **Glossary page** (`/resources/start-here/glossary` or similar) covering the ~10 recurring terms in plain English, linked from `FieldbookShell`'s Start Here nav group and from the terms themselves on first use per doc (via the existing `Callout`/MDX component pattern, not a new one).
3. **Surface `difficulty` on Skills/Playbooks cards** the way it already shows on Problems — cheap, reuses existing frontmatter pattern.

## Content gap — direct answer to "is there any other resource I should add"

Cross-checked the 4 domains PRODUCT.md defines (Discovery, Store, Behavior, Revenue) against the 5 Problems / 6 Skills / 5 Playbooks that exist:

- **Biggest gap: onsite search & merchandising/recommendations.** PRODUCT.md names this as part of the "Store" domain explicitly ("onsite search, merchandising, product pages, recommendations"), and it's one of the most common owner-named complaints ("customers can't find products in my own search bar", "recommendations don't make sense") — there is currently zero Problem/Skill/Playbook for it.
- **Performance / Core Web Vitals.** `lighthouse`, `web-vitals`, and `k6` are already cataloged in Projects and referenced as tags on the purchase-friction skill, but no Problem doc owns "my site is slow / conversion drops on mobile" as its own named symptom — it's currently buried inside checkout-failure triage.
- **Glossary** (see above) — also literally a missing resource, not just a clarity fix.
- Lower priority / likely deliberately excluded: accessibility-as-its-own-problem (WCAG/axe-core exist in Projects but aren't a named symptom doc) and security/privacy (OWASP ASVS/WSTG cataloged, no matching Problem) — both plausible but more sensitive/compliance-flavored, worth a deliberate call rather than a default add.
