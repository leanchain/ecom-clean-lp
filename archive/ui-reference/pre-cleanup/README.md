# Pre-cleanup UI reference

Snapshot of UI/source files removed during the 2026-08-22 landing cleanup.

This directory is **reference material only**:

- not imported by the live Next.js application
- not a source of routes
- not included in the production bundle
- preserved so useful patterns can be inspected and selectively rebuilt with current real data

Strong reference pieces include:

- `src/components/pdp-analyzer.tsx` — section scoring, priority/urgency, PDP diagnostic presentation
- `src/components/reports-table.tsx` — dense audit/report summary patterns
- `src/components/chat-widget.tsx` — old chat interaction
- `src/components/sections/ai-test-preview.tsx` — AI test preview presentation
- `src/components/sections/dashboard-scroll.tsx` — dashboard/product storytelling
- `src/components/example-pdp.tsx` and `optimised-pdp.tsx` — product-page before/after concepts
- `src/app/tools/ai-visibility-scan/*` — previous scan landing/form flow

Do not re-import these wholesale. Copy the interaction/content pattern into live components and ground it in current data.
