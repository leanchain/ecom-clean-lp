# Landing UI reference library

Historical UI kept deliberately outside the live application graph so useful patterns are easy to inspect without creating dead production code or routes.

## Snapshots

- `pre-cleanup/` — the large 2026-08-22 cleanup snapshot: PDP analyzer, report table, chat widget, AI preview, dashboard scroll, old scan UI and supporting primitives.
- `2026-08-22-pre-update/` — a small immediately-prior UI snapshot.
- `2026-08-06-platform-audit/` — platform audit pages, before/after slider, ROI/video/tryout patterns.
- `2026-07-25-store-health/` — store-health, proof, pricing, trust, buyer journey, visibility and workspace components.

## Rules

These files are reference material only. Do not import them directly into the live app. Rebuild the useful interaction or visual pattern in current components and ground it in current data/contracts.
