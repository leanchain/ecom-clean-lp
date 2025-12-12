# Beseam - AI Media Studio

Beseam is an AI Media Studio for AI Search Optimised Product Detail Pages

- [Demo](https://sonic-nextjs-template.vercel.app/)
- [Documentation](https://docs.shadcnblocks.com/templates/getting-started)

## Screenshot

![Beseam AI Media Studio screenshot](./public/og-image.png)

## Getting Started

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Nextjs 15 / App Router
- Tailwind 4
- shadcn/ui

## Deploy on Cloudflare

This project exports a static Next.js site (`output: "export"` in `next.config.ts`) and serves it
from a Cloudflare Worker using [`@cloudflare/kv-asset-handler`](main.js). To deploy:

1. Build the static export:

```bash
npm run build
```

2. Authenticate `wrangler` if you haven't already:

```bash
npx wrangler login
```

3. Deploy the Worker + static assets defined in `wrangler.jsonc`:

```bash
npx wrangler deploy
```

The worker entry point is `main.js`, and the `out` directory is published as the static assets namespace.
