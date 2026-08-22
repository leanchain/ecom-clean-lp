# Site proposal — service-led, platform-backed

Premise: the agency is the proof engine; the platform is how it is delivered and how it becomes margin later. The site sells an **engagement**, not a login.

## Positioning line

> We run AI visibility and store health for Shopify brands. Our software finds it, our team fixes it, and you see the before/after.

Not "a self-improving revenue agent". Not a dashboard. A team with an unfair instrument.

## The offer ladder (replaces "book a call" as the only door)

| Rung | What it is | Price | Purpose |
|---|---|---|---|
| 1 | Free AI discovery scan (`/tools/ai-discovery-scan`) | £0 | Live scan using the same check experience as the homepage |
| 2 | **Store teardown** — fixed-fee diagnostic, 5 working days, written findings + prioritised fixes | fixed, published | Qualifies buyers with money; produces case-study material |
| 3 | **Monthly operating retainer** — we run detection + remediation, you approve | published band | The revenue |
| 4 | Platform seat (later) | — | Not sold yet; do not advertise self-serve you cannot support |

Rung 2 is the wedge. Paid diagnostics are the standard agency proof mechanism and they solve the "most companies want proof" problem structurally — every engagement mints a case study.

## Page-level changes

**Homepage.** Hero = the offer and the outcome, secondary CTA = free scan. Cut the nine-products-in-three-systems matrix to `/products`; it reads as enterprise suite and invites integration objections. Add "who we work with / who we don't" (Shopify, £X+ revenue, one brand per category) — scarcity that is true.

**`/work` (new, P0).** The single highest-value missing page. One brand, one metric, one window, one figure, plus the query behind it: signal → evidence → change proposed → what the team shipped → recheck. Anonymised is fine; fabricated is not. `testimonials-section.tsx` and `customer-proof.tsx` already exist and are imported by nobody.

**`/pricing` (new, P0).** Teardown fee and retainer band, plus the negatives that differentiate: no percentage of ad spend, no annual lock, no mid-contract raise. Opacity is the market's live grievance; publishing price is the cheapest trust asset available.

**`/team` replaces `/about`.** Agencies are bought on operators, not on product philosophy. Faces, what each person has shipped, response time, who is in the Slack channel.

**`/store-health-review` → the teardown sales page.** Deliverable list, sample output, 5-day timeline, fee, what you need from them (Shopify + GSC read scopes). Fix the 20 vs 30-minute contradiction and the dead `/api/store-health-review` POST first.

**Keep.** The comparison pages and the `limits[]` / "what Beseam does not claim" blocks — the credibility there is the whole differentiator against AI-washing, and it survives the repositioning intact.

**Delete.** `/audit/**` (20 pages, unsupported "13 AI engines" claim, contradicts the read-only boundary), `/product`, `/reports`, `/example-pdp`.

## Sequence

P0 defects → `/pricing` + `/work` → homepage hero and offer ladder → `/team` → teardown page → cleanup.

## Borrowing from Discovery Loop — what actually transfers

Their page is a numbered essay: **bottleneck → approach → mission → team → what's next**. No screenshots, no pricing, no CTA except careers. It works because the proof *is* the founders — Jeff Dean's résumé is the case study. You do not have that, so copying the format wholesale reproduces the exact defect already diagnosed: nothing between "trust the founder" and "book a call".

**Transfer the voice and the spine, not the evidence-free-ness.**

- Short declarative sentences. No adjectives. "Scientific discovery is bottlenecked." — six words, whole thesis.
- Numbered sections that argue in order rather than a feature grid.
- Name the enemy as a *process*, not a competitor. They attack the sequential human loop, not another lab.
- State the limit out loud ("start with ML", "act as our own first customer"). You already do this well in `limits[]`; it is the same instinct.

**Then diverge:** every section of yours ends in evidence, not ambition. Their section 04 is a résumé; yours is a recheck screenshot.

## The narrative I would actually run

You already own the concept and have not noticed: **Observe → Decide → Act** is a loop. Name it and make it the whole story.

> **01 — The problem.** Commerce decisions run on a quarterly loop. An agency audits, a deck lands, someone ships half of it, nobody rechecks. By the time you know whether it worked, the catalogue, the ads and the assistants have all moved.
>
> **02 — Why now.** Discovery moved into assistants. Checkout mostly did not. Nobody can see what assistants say about their products, so nobody is fixing the product data those answers are built from. That window is open and it will close.
>
> **03 — The approach.** Close the loop. Observe continuously, propose the change with the evidence attached, ship it, recheck. The instrument is ours; the operators are ours; you approve.
>
> **04 — Our first customer is us.** The scan, the comparison pages, the findings on this site were produced by the system. Steal Discovery Loop's dogfooding beat verbatim — it is the cheapest credible proof a pre-logo company has.
>
> **05 — What we will not claim.** Read-only today. No guaranteed lift. One brand per category. `limits[]`, promoted from footnote to argument.
>
> **06 — The work.** One finding, end to end, with the recheck. Then the fee.

`/manifesto` already carries most of this prose. The move is not to write a new essay — it is to promote the manifesto to the homepage and demote the product matrix to `/products`.

## Other angles, if the loop framing does not land

1. **Working in public.** Publish the recheck log — findings shipped, findings that did nothing. A public record of being wrong is proof no competitor will copy, and it fills the case-study gap before you have logos.
2. **The anti-dashboard stance.** "You do not need another dashboard, you need someone to do the work." Aims directly at Triple Whale / Northbeam fatigue and at the agency retainer simultaneously — both already named in the research.
3. **Named scarcity.** One brand per category, published waitlist by category. MagicSpace's "one client per niche" line is doing real work for them and it costs nothing but discipline.
4. **The teardown as content.** Publish teardowns of consenting public stores. It is the offer and the marketing in one artefact — seoroast.com is the same trick.

## What this costs you

Service-led means the site converts to a human, so lead volume drops and lead quality rises; the self-serve platform story goes on ice for two to three quarters. Take that trade only if you intend to actually staff delivery.
