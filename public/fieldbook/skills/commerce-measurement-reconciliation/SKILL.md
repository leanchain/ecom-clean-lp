---
name: commerce-measurement-reconciliation
description: Match orders, analytics events, and attributed channel results at transaction level before comparing totals.
version: "0.1"
status: stable
---

# Commerce measurement reconciliation

Run this reconciliation when commerce, analytics, and advertising totals disagree and the team needs to know which transactions account for the gap.

## Inputs

- Order-ledger export
- Analytics purchase events
- Channel reports
- Date range, timezone, and currency rules
- Tax, refund, cancellation, and order-state policy
- Consent and tracking setup

## Output

- Transaction-level match table
- Missing, duplicate, late, and transformed events
- Notes on attribution differences
- Reconciliation rules
- Fixes grouped by owner

## Steps

1. Normalize the date range, timezone, currency, and included order states.
2. Use the commerce ledger for booked orders.
3. Match transaction IDs across systems.
4. Distinguish collection loss from normal attribution differences.
5. Check consent, browser, server, and checkout event coverage.
6. Record attribution windows and modeled conversions.
7. Assign fixes and rerun the same reconciliation.

## Checks

- Transaction IDs
- Currency, tax, shipping, refunds, and cancellations
- Event order and deduplication
- Consent and browser coverage
- Attribution windows and identity rules

## Limits

> **Keep the labels honest**
>
> Booked, observed, attributed, and modeled values keep those labels throughout the report.
