# Beseam Store Health marketing validation

Date: 2026-07-18

## Automated checks

- Prettier: pass on all changed marketing source files.
- ESLint: pass with 0 errors and 0 warnings.
- TypeScript: `bunx tsc --noEmit` passed.
- Production build: passed; 117/117 static pages generated.
- Static marketing validator: 12 routes exported; canonical metadata, JSON-LD, CTA labels, claim exclusions, internal links, accessibility basics and redirects verified.
- Git whitespace check: passed.

## Responsive browser checks

No horizontal overflow and no clipped headings, paragraphs, links or buttons at 375, 430, 768, 1024, 1440 and 1920 pixels.

## Lighthouse mobile

Audited from the production static export through a temporary gzip-enabled Nginx container, using Lighthouse 13.4.0 mobile throttling.

- Performance: 94
- Accessibility: 100
- Best practices: 100
- SEO: 100
- First Contentful Paint: 1.2 s
- Largest Contentful Paint: 3.0 s
- Total Blocking Time: 10 ms
- Cumulative Layout Shift: 0
- Speed Index: 1.2 s

## Artifacts

- `homepage-1440.png`
- `homepage-430.png`
- `homepage-dark-1440.png`
- `hero-crop-1440.png`
- `product-section-1440.png`
- `booking-page-1440.png`
- `before-after-comparison.png`
- `lighthouse-mobile.html`
- `lighthouse-mobile.json`
- `build-output.txt`
