# Ecom Clean LP - Archive

This folder contains archived components, routes, and assets from the original Sonic speaker template that are no longer needed for the live Fisca AI PDP product.

**Archived:** 2025-11-17

---

## 📦 Contents

### Routes (`app/`)

- **archive/about/** - Old about page with speaker content
- **archive/product/** - Product detail page template (speaker-focused)
- **archive/pricing/** - Old pricing page
- **archive/specifications/** - Product specifications page

### Components (`components/`)

**Unused sections (NOT imported anywhere):**

- `sections/hero.tsx` - "Immersive Sound, Simplified"
- `sections/product-hero.tsx` - "Redefining Portable Audio"
- `sections/why-us.tsx` - "60K+ Units Sold" speaker stats
- `sections/features.tsx` - "The Perfect Sound, Anywhere"
- `sections/in-reality.tsx` - Speaker image carousel
- `sections/faq.tsx` - Speaker FAQs
- `sections/value-proposition.tsx` - Portable speakers value prop

**Archive-only sections (used ONLY by `/archive/about`):**

- `sections/about-hero.tsx`
- `sections/about-mission.tsx`
- `sections/our-values.tsx`
- `sections/why-Fisca.tsx` ← Has correct Fisca copy
- `sections/blog-posts.tsx`

**Product page sections (used ONLY by `/archive/product`):**

- `sections/product-intro.tsx` - Animated "SONIC" text
- `sections/big-sound.tsx` - "Big Sound, Wherever You Are"
- `sections/product-testimonials.tsx` - Bluetooth speaker testimonials
- `sections/product-features.tsx` - Speaker features
- `sections/service-features.tsx` - Joke/placeholder copy

**PDP components:**

- `pdp/ProductDetail.tsx` - Product detail layout (hardcoded speaker description)
- `pdp/MediaGallery.tsx`
- `pdp/PurchasePanel.tsx`
- `pdp/SpecificationsTable.tsx`

**Unused components:**

- `gallery24.tsx` - "We don't Believe in talk" gallery
- `feature156.tsx` - "Build better software with shadcn/ui blocks"
- `feature222.tsx` - Case studies (TechCorp, GreenTech, etc.)
- `feature290.tsx` - "Hi Gxuri, Ready to build something cool?"
- `blogpost6.tsx` - Unused blog post layout
- `compare1.tsx`, `compare3.tsx` - Unused comparison components
- `cta4.tsx` - Unused CTA component
- `pricing16.tsx` - Unused pricing component

### Blog Posts (`blog/`)

All 6 blog posts are speaker-related:

- `dolby-atmos-and-beyond.mdx` - "Dolby Atmos and the Future of Immersive Audio"
- `eco-friendly-audio-solutions.mdx` - "Eco-Friendly Audio Solutions"
- `right-speaker-for-you.mdx` - "Finding the Right Speaker for You"
- `the-evolution-of-speakers.mdx` - Speaker evolution
- `why-size-and-shape-matter.mdx` - Speaker design
- `wireless-speakers.mdx` - Wireless speaker technology

### Data (`data/`)

- `products.json` - 4 "Fisca Light - Premium Smart Soundbar" products with speaker specs

### Images (`public/images/`)

- **products/** - Speaker product images (main-product.webp, product-1 through product-8, feature-1, feature-2)
- **landing/** - in-reality/ and value-proposition/ folders
- **product/** - testimonials/ folder (user-1 through user-4)
- **about/** - who-we-are.webp
- **blog/** - blog-1 through blog-6.webp
- **case-studies/** - case-study-1 through case-study-6.jpg
- **examples/** - Product category examples (beauty, fashion, health, home, kids, outdoor, pets, tech)
- **features/** - feature-image.svg, feature-video.svg, feature-search.svg (generic placeholders)

### Videos (`public/videos/`)

- `ai-discovery-demo-old.mp4` - Old version of AI discovery demo

### Utility Scripts

- `download-assets.sh` - Downloads speaker product images, case studies, etc.
- `download-feature284-assets.sh` - Downloads feature images
- `IMAGE_DOWNLOAD_GUIDE.md` - Guide for downloading external assets

---

## 🎯 Why These Were Archived

All content in this archive is related to the original **Sonic speaker template** and is not relevant to the **Fisca AI PDP product**. The main repository now contains only Fisca-specific content for AI-powered product detail page generation.

---

## 📋 PDP Template Reference

The `/app/archive/product` route contains a working product detail page template that can be referenced for future PDP implementations. It includes:

- Product media gallery
- Purchase panel with pricing
- Specifications table
- Product intro section
- Testimonials section
- Feature highlights

---

## ⚠️ Note

These files are kept for historical reference and potential template reuse. They are not part of the live Fisca product and should not be imported into active code.
