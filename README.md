# Beseam — Store Health + AI Visibility for Shopify

This is the canonical public marketing site for [beseam.com](https://beseam.com).
It presents two equal, connected product stories:

- Store Health: technical discoverability, purchase paths and monitoring-source freshness.
- AI Visibility (GEO): answer-engine visibility, product accuracy, merchant control, citations and competitors.

Both workspaces keep the underlying evidence and observation time visible. The
primary conversion route is `/store-health-review`; the free AI visibility scan
remains available at `/tools/ai-visibility-scan`.

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
