# Beseam — Store Health for Shopify

This is the canonical public marketing site for [beseam.com](https://beseam.com).
It presents one product story: technical discoverability, purchase health and
monitoring-source freshness in an evidence-backed Store Health workspace.

The free AI visibility scanner remains available as a secondary tool at
`/tools/ai-visibility-scan`. The primary conversion route is
`/store-health-review`.

## Local validation

Use Bun, matching the repository lockfile:

```bash
bun install
bun run format
bun run lint
bun run build
```

The production build is a static Next.js export in `out/`.

## Cloudflare deployment

`main.js` serves the static export through the Workers Assets binding, handles
legacy redirects, and accepts the same-origin Store Health Review fallback form.

Before deployment:

1. Confirm that the Worker named `beseam` owns `beseam.com`.
2. Authenticate Wrangler for the intended Cloudflare account.
3. Enable Email Sending for the zone and verify `website@beseam.com`.
4. Confirm that `contact@beseam.com` is an allowed destination.
5. Set the public analytics and Cal.com values in the deployment environment.
6. Run `bun run build`, then `npx wrangler deploy`.

The email binding is declared as `REVIEW_EMAIL` in `wrangler.jsonc`. If it is
unavailable, the form returns an error rather than showing a false success.
