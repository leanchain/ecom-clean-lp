# Landing site proposal — after the manifesto rewrite

Basis: web research on 2025–26 DTC/ecom operator pains and AI-tool buying criteria, plus a route-by-route audit of this repo. Claim rules from `.agents/product-marketing.md` apply throughout (no vendor-blog stats, no guaranteed lift).

## The one-line verdict

The writing is unusually honest and the comparison pages are genuinely good. What is missing is everything a skeptical operator checks **after** they believe you: proof, price, data handling, and a way in that is not a sales call.

---

## P0 — broken, fix first (hours)

| # | Defect | Location | Fix |
|---|---|---|---|
| 1 | Booking page says **30-minute** review; all nine site CTAs promise **20 minutes** | `src/app/store-health-review/page.tsx:8`, `review-content.tsx:30,277,307,316` | Standardise on 20. |
| 2 | Fallback form POSTs to `/api/store-health-review` — **no `src/app/api` directory exists**. The only non-calendar conversion path always fails. | `review-content.tsx:88` | Add the route, or drop the form and keep Cal.com only. |
| 3 | Third contact address (`contact@beseam.com`) appears only in the form-failure path; `/about` uses `pankaj@beseam.com` | `review-content.tsx:108` | One address. |
| 4 | `/#observe` anchor does not exist (verified against rendered HTML: `#foundation` and `#advertising` do). Navbar "Observe" tile + footer Behavior/Reliability links scroll to the top of the homepage. | `navbar.tsx:19`, `footer.tsx:11,12` | Add `id="observe"` to the Observe system section. |
| 5 | `/audit/*` (20 pages) still builds and is indexable behind the host redirect; repeats an unsupported **"13 AI engines"** stat in 11 files, uses banned words (`AI-powered`, `powerful`), and claims Beseam "publishes them directly to your store — with rollback protection", which `marketing-pages.ts:390` explicitly disclaims (read-only). | `src/app/audit/**` | Delete the directory. It is the largest claim-risk surface on the site. |
| 6 | Nav CTA label drops a word: "Book a 20-minute review" vs the canonical "Book a 20-minute commerce review" | `navbar.tsx:117,156` | Align. |

## P1 — the four pages that decide the sale (days)

Ranked by how often the research showed them blocking a purchase.

1. **Proof.** Nothing on the site sits between "trust the founder" and "book a call". `testimonials-section.tsx` and `customer-proof.tsx` exist and are imported by nobody. Operators' stated bar: *one brand, one metric, one window, one figure, plus the query behind it.* Ship a single evidence page — one real finding, anonymised if needed: signal → evidence → proposed change → what the team did → recheck result. Honest framing beats a logo wall you cannot fill yet. Ask Dancing Queens for the naming rights.
2. **Pricing / access.** Absent. `pricing-section.tsx` exists, `id="pricing"`, zero importers. Opaque pricing and mid-contract hikes are a live grievance in this market (Triple Whale's 67% mid-contract raise is quoted around by operators). The positioning doc already has a model — Foundation included, per-store enablement, credits for generation, media spend stays with Google/Meta. Publish it, plus the negatives: **no percentage of ad spend, no annual lock**.
3. **Security & data handling.** You ask for Shopify and Search Console OAuth and offer only a privacy policy and terms. Needed: exact scopes read, what is stored and for how long, where it is hosted, sub-processors, deletion/export, and the current read-only boundary. One page, no design budget required.
4. **Onboarding / time-to-value.** Nothing says what happens after signing: which connectors, how long to the first finding, what the team must do. Give it a number and a sequence.

## P2 — homepage restructure (days)

- **Hero subcopy is category language.** "A self-improving revenue agent that observes commerce from the outside…" describes the product, not the visitor's Monday. Replace with the reconciliation moment now used on the manifesto: platform says one number, ad accounts another, analytics a third. Keep the headline — it works.
- **Give the scan its own front door.** `/tools/ai-discovery-scan` is the canonical self-serve entry point. A cold visitor should be able to reach it directly from the main acquisition journey rather than through a legacy visibility-scan URL.
- **Nine products in three systems reads as an enterprise suite** and works against the "we are not another dashboard" argument, while raising the integration-burden objection. Lead with one wedge (AI Visibility is the most differentiated and the only one with a self-serve tool) and move the full matrix to a `/products` page — the URL is free once the stub is deleted.
- **Wrong competitive set on the homepage.** "Compare the operating model" lists Google Analytics, Hotjar, VWO. DTC operators compare against Triple Whale, Northbeam, Polar, Lifetimely — and against their agency retainer. `/compare/triple-whale` already exists; surface it, and add "vs your agency's monthly audit".
- **Move the first-month promise up.** It is the strongest risk-reversal on the site and currently sits below three long product sections.
- **Add the AI-discovery stance from the manifesto** as a short homepage block: discovery is moving into assistants, checkout mostly is not, fix the product data assistants read. This is a defensible position while competitors overclaim, and in-chat checkout has already retreated once.

## P3 — cleanup (hours)

- **Delete:** `/product` (stub, 301'd), `/reports` (fetches `http://localhost:8123`, renders "Waiting for live audits…" in production, old design system), `/example-pdp` (orphan), `/audit/**` (see P0-5).
- **Merge:** `/monitoring-coverage` → `/shopify-store-health`; `/integrations/google-search-console` → `/discoverability-health`. Each pair argues ~80% the same thing.
- **De-duplicate the detail-page template.** All seven `MarketingDetailPage` routes share one hard-coded closing CTA — "Start with your store - and how AI sees it." (`marketing-detail-page.tsx:329`) — which is wrong on Purchase Health, Monitoring Coverage and both integration pages, and one identical `PIPELINE` block (`:8-27`) that fills the middle third of every page. Make both props.
- **Two taxonomies are live at once.** The homepage and navbar sell Observe / Decide / Act and Foundation / Analytics / Optimization; the detail pages sell Store Health / Discoverability / Purchase. Pick one and rename the other.
- `source of truth` at `marketing-pages.ts:502` — banned-adjacent; use "system of record".
- Two comparison slugs reuse the same screenshot (`optimization.webp` for vwo and amplitude, `revenue-overview.webp` for contentsquare and triple-whale), which undercuts "real Beseam evidence".
- Hardcoded "reviewed 25 July 2026" on `/compare` (`page.tsx:64`) will rot silently — derive it or diarise it.

## What I would not change

- The comparison pages. Cited sources, explicit `notAReplacementFor`, real screenshots — this is the most credible asset on the site.
- The `limits[]` / "what Beseam does not claim" blocks on the detail pages. Rare, and exactly what the research says defuses AI-washing scepticism.
- The first-month promise wording. It commits to the diagnosis, not the lift — which is the only honest version of that offer.

## Sequence

P0 (one sitting) → proof page + pricing page (the two that most often end the conversation) → homepage hero and scan CTA → security and onboarding pages → P3 cleanup.
