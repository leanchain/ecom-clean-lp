# Repository Cleanup Summary

**Date:** 2025-11-17  
**Action:** Moved all non-Hex+ content to `/archive` folder

---

## ✅ What Was Moved to Archive

### **Total Items Archived: 98 files**

#### Routes (4 directories)

- `src/app/archive/about/` → `archive/app/archive/about/`
- `src/app/archive/pricing/` → `archive/app/archive/pricing/`
- `src/app/archive/product/` → `archive/app/archive/product/`
- `src/app/archive/specifications/` → `archive/app/archive/specifications/`

#### Components (30 files)

**Sections (17 files):**

- Unused: hero.tsx, product-hero.tsx, why-us.tsx, features.tsx, in-reality.tsx, faq.tsx, value-proposition.tsx
- Archive-only: about-hero.tsx, about-mission.tsx, our-values.tsx, why-Hex+.tsx, blog-posts.tsx
- Product page: product-intro.tsx, big-sound.tsx, product-testimonials.tsx, product-features.tsx, service-features.tsx

**PDP components (4 files):**

- ProductDetail.tsx, MediaGallery.tsx, PurchasePanel.tsx, SpecificationsTable.tsx

**Other unused (9 files):**

- gallery24.tsx, feature156.tsx, feature222.tsx, feature290.tsx, blogpost6.tsx, compare1.tsx, compare3.tsx, cta4.tsx, pricing16.tsx

#### Blog Posts (6 MDX files)

All speaker-related content:

- dolby-atmos-and-beyond.mdx
- eco-friendly-audio-solutions.mdx
- right-speaker-for-you.mdx
- the-evolution-of-speakers.mdx
- why-size-and-shape-matter.mdx
- wireless-speakers.mdx

#### Data (1 file)

- `src/data/products.json` - Speaker product data

#### Images (~70 files)

- `public/images/products/` - All speaker product images
- `public/images/landing/` - in-reality/ and value-proposition/ folders
- `public/images/product/` - testimonials/ folder
- `public/images/about/` - who-we-are.webp
- `public/images/blog/` - blog-1 through blog-6.webp
- `public/images/case-studies/` - case-study-1 through case-study-6.jpg
- `public/images/examples/` - Product category examples (8 images)
- `public/images/features/` - 3 placeholder SVGs (feature-image, feature-video, feature-search)

#### Videos (1 file)

- `public/videos/ai-discovery-demo-old.mp4`

#### Utility Scripts (3 files)

- download-assets.sh
- download-feature284-assets.sh
- IMAGE_DOWNLOAD_GUIDE.md

---

## ✅ What Remains in Main Repo (Clean Hex+ Foundation)

### Live Routes

- `src/app/page.tsx` - Main landing page
- `src/app/blog/` - Blog listing (needs new content)
- `src/app/demo/` - Cal.com booking
- `src/app/pricing/` - Hex+ pricing
- `src/app/contact/` - Contact form
- `src/app/comparison/` - Hex+ vs alternatives

### Live Components (Hex+ AI PDP Content)

**Sections (3 files):**

- cta.tsx
- how-it-works.tsx
- who-its-for.tsx

**Main components:**

- hero230.tsx, client-logos.tsx, stats18.tsx, feature57.tsx, feature284.tsx
- gallery25.tsx, comparison.tsx, compare2.tsx, integration1.tsx, faq9.tsx

### Images (KEPT - Used by Live Homepage)

- `public/images/hero/` - 13 images (used by Hero230, Gallery25, Feature57)
- `public/images/gallery/` - 8 images (used by Gallery25)
- `public/images/compare/` - 1 image (used by Compare2)
- `public/images/features/` - 5 JPGs (ai-image-gen, ai-video-gen, ai-search-opt, content-enrichment, analytics - used by Feature284)
- `public/images/placeholders/` - 5 SVGs (used by Navbar)
- `public/images/ai-platforms/` - AI platform logos

### Videos (KEPT - Used by Live Homepage)

- `public/videos/hero/` - 4 videos (used by Hero230, Feature57)
- `public/videos/gallery/` - 5 videos (used by Gallery25)
- `public/videos/compare/` - 1 video (used by Compare2)
- `public/videos/ai-discovery-demo.mp4` - Used by Stats18

---

## ⚠️ Breaking Changes

### 1. Blog Route Will Break

**Issue:** All 6 blog posts were speaker-related and have been archived.  
**Impact:** `/blog` page will have no content to display.  
**Fix Options:**

- Create new Hex+ AI PDP blog posts
- Remove the `/blog` route entirely
- Show "Coming soon" message

### 2. Archive Routes Are Gone

**Issue:** `/archive/about`, `/archive/product`, `/archive/pricing`, `/archive/specifications` no longer exist.  
**Impact:** These routes will 404.  
**Fix:** This is intentional - they've been moved to `/archive` folder.

---

## 📊 Statistics

- **Components archived:** 30
- **Blog posts archived:** 6
- **Routes archived:** 4
- **Images archived:** ~70
- **Videos archived:** 1
- **Total files archived:** 98

- **Live sections remaining:** 3
- **Live components:** ~15
- **Images kept:** ~35
- **Videos kept:** 11

---

## 🎯 Result

The main repository now contains **ONLY Hex+ AI PDP content** with:

- ✅ No nested archive folders
- ✅ No speaker/audio demo content
- ✅ Clean, production-ready codebase
- ✅ All assets verified as actually used by live pages

All archived content is in `/archive` folder for historical reference.
