---
name: product-structured-data-validation
description: Check whether visible product facts, JSON-LD, platform data, and search-specific requirements describe the same product and offer.
version: "0.1"
status: stable
---

# Product structured-data validation

Use this skill after theme changes, app installations, catalog migrations, or diagnostics indicating missing or contradictory product markup.

## Required inputs

- Rendered product-page URL
- Expected product and variant facts
- Target market
- Relevant search or merchant surface
- Recent theme or app changes when available

## Expected output

- Parsed entity graph
- Visible-to-markup comparison
- Duplicate, missing, and contradictory fields
- Owning template or integration hypothesis
- Retest checklist

## Workflow

1. Capture rendered HTML rather than relying only on source templates.
2. Parse all Product, ProductGroup, Offer, Review, and merchant entities.
3. Compare visible and structured facts.
4. Verify product, variant, price, currency, availability, and URL relationships.
5. Trace competing entities to their source.
6. Correct the controlled implementation.
7. Retest the rendered page and external diagnostic.

## Checks

- Product and variant identity
- Offer price, currency, availability, and URL
- ProductGroup relationships
- Reviews and aggregate ratings
- Merchant, shipping, and return-policy relationships
- Duplicate or conflicting entities

## Boundaries

Valid markup does not guarantee a rich result. Markup must not contain facts or reviews that are absent from the visible customer experience.
