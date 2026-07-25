---
name: ecommerce-technical-seo-geo-audit
description: Check crawl access, rendered content, product markup, merchant facts, and answer-source visibility without collapsing them into one score.
version: "0.1"
status: stable
---

# Ecommerce technical SEO and GEO audit

Run this audit when a product or category page has a discovery problem that could involve crawling, rendering, markup, product facts, or citations in AI answers.

## Inputs

- Public product or category URL
- Target market and language
- Priority search queries or buying questions
- Competitor set, when relevant
- Platform and merchant-feed context

## Output

- Source-and-time inventory
- SEO findings and AI-answer findings in separate sections
- Affected page fields or data sources
- Recommended fixes, ranked by confidence
- Retest plan

## Steps

1. Record response status, canonical URL, robots rules, indexability, and rendered output.
2. Parse product, offer, organization, breadcrumb, and review markup.
3. Compare markup with visible content and known catalog values.
4. Check missing buyer information, unsupported claims, merchant identity, and source clarity.
5. When AI visibility matters, run a fixed set of buying questions.
6. Classify findings as technical, content, data, or selection outside the merchant's control.
7. Recommend a small change and define the retest.

## Checks

- Canonical URL, robots rules, and indexability
- `Product` and `Offer` markup
- Product-detail completeness and claim support
- Merchant identity and product consistency
- Citations for the fixed AI question set
- Performance and accessibility issues that block use

## Limits

> **No placement promise**
>
> This audit can find defects and record answer behavior. It cannot promise rankings, rich results, citations, recommendations, or sales.

Any customer-facing edit needs approval. Do not add claims merely to make a page look more complete.

## Retest

Repeat the relevant page checks and the same AI question set after the change. Record exactly what moved and what did not.
