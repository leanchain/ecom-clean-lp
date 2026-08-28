# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences of comparable weight. The site has to work for both without splitting into two products.

- **DTC founder / owner-operator.** Runs a Shopify store alone or with one or two people. Buys the tool themselves, makes the catalog and product-page fixes themselves, and judges the product on whether orders move.
- **Ecommerce lead at a mid-market brand.** Owns the storefront P&L and has a developer, agency, or merchandising team to execute. Needs evidence they can hand to someone else — a boss, a dev, a merchandiser — and defend.

The shared job: find out why products are not being found, chosen, or bought, and get a change they can justify making.

## Product Purpose

Beseam continuously watches how shoppers find, choose, and buy, connects the evidence around the strongest opportunities, proposes supported changes for brand-owner approval, applies approved changes, and measures what changed in behavior, conversion, orders, and revenue.

It is not a replacement for Shopify, analytics, ad platforms, or other systems of record. It works across them and keeps source evidence attached through the operating loop: **Observe → Understand → Act → Learn**.

Success is a merchant making a change they can defend, and being able to see afterwards whether it moved anything.

## Positioning

Evidence stays attached to the claim. Beseam observes what AI shopping assistants and the storefront actually show, separates observed facts from hypotheses and likely causes, requires explicit brand-owner approval before any customer-facing change, and re-measures the same questions after the change.

What a neighboring product could not truthfully copy: the loop is closed and the evidence is preserved end to end — the same buying questions that exposed a gap are the ones rerun to measure what changed after the fix. No single opaque score stands in for the evidence.

## Operating Context

- **Four connected domains.** Discovery (AI shopping answers, search, feeds, pre-visit product-discovery signals); Store (onsite search, merchandising, product pages, recommendations, catalog evidence); Behavior (shopper journeys, friction, checkout); Revenue (conversion, orders, attribution, impact evidence).
- **Commercial boundary (confirmed).** The store and catalog observation is free and anonymous. Continuing to the AI-answer check requires a verified work email. Fixing, publishing, and monitoring are paid. The marketing site also carries a "30 days free" promise into the app.
- **Surfaces.** Marketing site at `beseam.com` (this project); product app at `app.beseam.com`; API at `api.beseam.com`; a public crawler documented at `/bot`.
- **Product review path.** A 20-minute store review is bookable through Cal.com ("Sessions Beseam", Zoom) to show how Beseam follows a real store finding through the product loop; it is not a managed-service engagement.
- **The Fieldbook.** `/resources` publishes problems, skills, playbooks, and ecosystem projects as an editorial layer — a merchant can arrive through a problem they can name rather than through the product.
- **Machine readers are a real audience.** `llms.txt`, `llms-full.txt`, `agents.md`, `robots.txt`, and the sitemap are maintained deliberately; assistants reading the site are treated as visitors, which is consistent with what the product measures.

## Capabilities and Constraints

- Public scan reads only public storefront data — no store login, no private data.
- AI-answer observations are point-in-time samples across ChatGPT and Google AI Mode. They do not reveal hidden model ranking logic.
- Not every capability or data source is enabled for every store.
- Beseam does not claim an exact cause when the evidence supports only correlation or a hypothesis.
- No recommendation, traffic, conversion, or revenue outcome is guaranteed.
- Vocabulary that is load-bearing and should not be casually reworded: **Observe, Understand, Act, Learn**; **observed** vs **hypothesis**; **evidence**; **reversible** changes; **the same questions, rerun**.

## Brand Commitments

- Name: **Beseam**. Crawler: **BeseamBot**.
- Built in Switzerland; the footer says so.
- Voice: plain, specific, and measured. States what was observed and what it does not know. Avoids hype, guaranteed outcomes, and single-score simplifications.
- Contact identity: `pankaj@beseam.com`, `contact@beseam.com`.

## Evidence on Hand

Confirmed available to cite:

- **Published benchmark runs.** `src/data/category-benchmarks.ts` — a dated run (`askedOn: 2026-08-19`) across ChatGPT, Gemini, and Google AI Mode, 15 questions and 47 completed answers, surfaced at `/benchmarks`. Real and repeatable.
- **Live scan output.** The product's own result on any real domain is citable proof, and is the only proof that regenerates on demand.
- **Named customers / logos.** Logo assets exist at `public/logos/clients/` (amazon, arcadis, frieslandcampina, google, gust, ing, minibrew, quatt, rsm, tue, uu, uva, vodafone).
- **Testimonials.** Portrait assets exist at `public/images/testimonials/` (bettina, sharon). Team and advisor portraits at `public/images/about/` (pankaj-kumar, bettina-gimenez, fabrizio-metzler).

Open — confirm before publishing:

- The client logo set reads as prior-career and institutional credibility (banks, telcos, universities) rather than Beseam merchant customers, and no code currently renders it. **Whether each logo may be framed as a Beseam customer is unconfirmed.** Do not present them as customers until that is settled; "where the team has worked" is the safe framing until then.
- Testimonial images exist but no attributed quote text lives in the repository. The words must come from the user; do not write them.

Must not be fabricated: customer names, quotes, store counts, pricing, case-study numbers, benchmark results not produced by an actual run.

## Product Principles

1. **Preserve the source evidence.** Never collapse it into one opaque score, and keep freshness visible.
2. **Separate observed from inferred.** A fact and a likely cause never wear the same styling, the same verb, or the same confidence.
3. **Answer the commercial question, not all of them.** Decide what deserves attention rather than producing the longest list of findings.
4. **The brand owner approves anything shoppers will see.** Every customer-facing change requires explicit approval before Beseam applies it, and supported changes stay reversible.
5. **Close the loop or it did not happen.** Re-measure the same signals after an action; the proof is the rerun, not the promise.
