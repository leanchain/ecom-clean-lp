---
name: feed-pdp-parity-check
description: Compare catalog, storefront, markup, and feed values for the same product, variant, market, and time.
version: "0.1"
status: stable
---

# Feed-to-PDP parity check

Run this check when product details differ across the commerce platform, rendered page, structured data, merchant feed, or channel diagnostic.

## Inputs

- Product and variant record
- Rendered product-page URL
- Market and currency
- Feed row or export, when available
- Channel diagnostic, when available

## Output

- Field-by-field comparison
- Mismatches grouped by source and variant
- Known owner or system of record for each field
- First fix to make
- Retest plan

## Steps

1. Normalize product and variant IDs.
2. Capture each source at a named time.
3. Compare price, availability, title, description, images, identifiers, shipping, and returns.
4. Trace localization and transformation rules.
5. Mark the approved owner or note that ownership is missing.
6. Fix the approved source or the transform that changed it.
7. Check the rendered page and channel separately.

## Checks

- Price and availability by market
- GTIN, MPN, SKU, and variant identity
- Titles and descriptions
- Primary and variant images
- Shipping and return statements
- Visible content against structured data

## Limits

> **Do not guess the product record**
>
> When sources conflict and no owner is known, report the conflict. Frequency and recency are not enough to establish the approved value.

This check does not publish changes, and the sales channel still controls eligibility.
