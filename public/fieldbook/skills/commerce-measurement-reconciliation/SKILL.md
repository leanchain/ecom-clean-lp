---
name: commerce-measurement-reconciliation
description: Reconcile booked orders, observed customer events, and attributed platform results without treating the three as interchangeable revenue totals.
version: "0.1"
status: stable
---

# Commerce measurement reconciliation

Use this skill when commerce, analytics, and advertising reports disagree and the team needs a transaction-level explanation rather than another dashboard total.

## Required inputs

- Order-ledger export
- Analytics purchase events
- Channel reports
- Period, timezone, and currency rules
- Tax, refund, cancellation, and order-state policy
- Consent and tracking context

## Expected output

- Transaction-level match table
- Missing, duplicate, late, and transformed-event evidence
- Attribution-boundary notes
- Reconciliation rules
- Owner-specific remediation plan

## Workflow

1. Normalize period, timezone, currency, and order states.
2. Choose the commerce ledger for booked orders.
3. Match transaction identifiers across sources.
4. Separate collection loss from expected model differences.
5. Review consent, browser, server, and checkout event coverage.
6. Document attribution windows and modeled conversions.
7. Assign fixes and rerun the reconciliation.

## Checks

- Transaction identifiers
- Currency, tax, shipping, refunds, and cancellations
- Event sequence and deduplication
- Consent and browser coverage
- Attribution windows and identity models

## Boundaries

<Callout type="boundary" title="Do not merge revenue meanings">
Booked, observed, attributed, and modeled values remain separately labeled throughout the output.
</Callout>
