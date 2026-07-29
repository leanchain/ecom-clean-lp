# Beseam — Store Health + AI Visibility for Shopify

This is the canonical public marketing site for [beseam.com](https://beseam.com).
It presents two equal, connected product stories:

- Store Health: technical discoverability, purchase paths and monitoring-source freshness.
- AI Visibility (GEO): answer-engine visibility, product accuracy, merchant control, citations and competitors.

Both workspaces keep the underlying evidence and observation time visible. The
primary conversion route is `/store-health-review`; the free AI visibility scan
remains available at `/tools/ai-visibility-scan`.

## Local development

```bash
npm run dev            # worker on :7002 in front of next dev on :7003
```

The free scan, the product-image proxy, and the verification link live in the
Cloudflare Worker (`main.js`), so `next dev` alone answers them with
"The scan service is unavailable right now." `npm run dev` therefore runs both:
Wrangler serves `/api/*` and `/scan/verify`, and hands everything else to Next,
so hot reload still works.

It points at a local API on `http://localhost:8123/api`. Override with:

```bash
LOCAL_API_BASE=https://api.beseam.com/api npm run dev   # scan against production
LP_PORT=7012 LP_NEXT_PORT=7013 npm run dev              # different ports
npm run dev:next-only                                   # Next alone, no /api/*
```

## Local validation

Use Bun, matching the repository lockfile:

```bash
bun install
bunx prettier --check src
bunx tsc --noEmit
bun run build
```

The production build is a static Next.js export in `out/`.

## Cloudflare deployment

`main.js` serves the static export through the Workers Assets binding, handles
legacy redirects, and accepts the same-origin review fallback form.

Before deployment:

1. Confirm that the Worker named `beseam` owns `beseam.com`.
2. Authenticate Wrangler for the intended Cloudflare account.
3. Enable Email Sending for the zone and verify `website@beseam.com`.
4. Confirm that `contact@beseam.com` is an allowed destination.
5. Set the public analytics and Cal.com values in the deployment environment.
6. Run `bun run build`, then `npx wrangler deploy`.

The email binding is declared as `REVIEW_EMAIL` in `wrangler.jsonc`. If it is
unavailable, the form returns an error rather than showing a false success.
