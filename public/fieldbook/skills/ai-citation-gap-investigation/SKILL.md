---
name: ai-citation-gap-investigation
description: Compare a fixed set of buying questions, cited pages, merchant attribution, product facts, and competing products.
version: "0.1"
status: emerging
---

# AI citation-gap investigation

Run this investigation when AI shopping answers omit a product, cite a competitor, or state the merchant's facts incorrectly.

## Inputs

- Fixed question set
- Named model or answer system
- Products and markets
- Timestamped answers
- Relevant competitors
- Merchant-owned product sources

## Output

- Product-visibility and citation table
- Incorrect or unsupported statements
- Patterns in cited sources
- Merchant-owned pages or data that may need work
- Retest plan

## Steps

1. Group questions by buying intent.
2. Record answers, citations, merchant attribution, and competing products.
3. Compare cited pages with merchant-owned product facts.
4. Compare absent products with the products the system selected.
5. Write a testable explanation involving content, catalog data, or entity identity.
6. Change one merchant-controlled source when there is a sound reason.
7. Run the same questions again and record the difference.

## Checks

- Whether the product appears
- Accuracy of product facts
- Merchant attribution
- Cited pages
- Competing products
- Market, model, and timestamp consistency

## Limits

> **A retest is a snapshot**
>
> A retest can show that an answer changed under the same conditions. It cannot establish durable placement, search ranking, or revenue impact.
