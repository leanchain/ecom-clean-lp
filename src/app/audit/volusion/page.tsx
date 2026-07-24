import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Volusion Store?",
  description:
    "Volusion stores have limited structured data with no easy way to customize schema output. Beseam audits how AI engines read your Volusion product pages.",
  keywords: [
    "Volusion AI optimization",
    "ChatGPT Volusion",
    "Volusion structured data",
    "Volusion JSON-LD",
    "Volusion product schema",
  ],
};

const findings: Finding[] = [
  {
    title: "Minimal default Product schema with missing fields",
    severity: "critical",
    description:
      "Volusion generates a basic Product schema but omits critical fields: brand, SKU, GTIN, detailed descriptions, and product images beyond the primary thumbnail. AI engines get a skeleton of your product data instead of the complete picture.",
    fix: `<!-- Volusion's template system is limited - use footer HTML injection -->
<!-- In Marketing > SEO > Header/Footer Tags, add to Footer: -->
<script>
(function() {
  // Enhance existing schema or create new one
  var existingSchema = document.querySelector('script[type="application/ld+json"]');
  var product = existingSchema ? JSON.parse(existingSchema.textContent) : {};

  // Add missing fields from page content
  if (product['@type'] === 'Product') {
    product.brand = product.brand || {
      '@type': 'Brand',
      'name': document.querySelector('.product-brand')?.textContent?.trim() || ''
    };
    product.sku = product.sku ||
      document.querySelector('[itemprop="sku"]')?.textContent?.trim() || '';

    // Add all product images
    var images = document.querySelectorAll('.product-image img, .gallery img');
    if (images.length > 1) {
      product.image = Array.from(images).map(function(img) { return img.src; });
    }

    existingSchema.textContent = JSON.stringify(product);
  }
})();
</script>`,
  },
  {
    title: "No AggregateRating or Review schema",
    severity: "high",
    description:
      "Volusion's built-in product reviews do not generate Review or AggregateRating schema. When customers leave reviews, AI engines can't see the ratings - meaning your highly-rated products have no structured credibility signal.",
    fix: `<!-- Add via Footer HTML injection in Volusion admin -->
<script>
(function() {
  var ratingEl = document.querySelector('.product-rating, .review-stars');
  var reviewCount = document.querySelector('.review-count');
  if (!ratingEl || !reviewCount) return;

  var schema = document.querySelector('script[type="application/ld+json"]');
  if (!schema) return;

  var data = JSON.parse(schema.textContent);
  if (data['@type'] === 'Product') {
    var rating = parseFloat(ratingEl.getAttribute('data-rating') ||
      ratingEl.textContent.match(/[\\d.]+/)?.[0] || '0');
    var count = parseInt(reviewCount.textContent.match(/\\d+/)?.[0] || '0');

    if (rating > 0 && count > 0) {
      data.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': rating.toFixed(1),
        'reviewCount': count,
        'bestRating': '5',
        'worstRating': '1'
      };
    }
    schema.textContent = JSON.stringify(data);
  }
})();
</script>`,
  },
  {
    title: "Category pages lack CollectionPage schema",
    severity: "medium",
    description:
      "Volusion category pages display product grids but include no structured data at all - no CollectionPage, no ItemList, no product references. AI engines can't understand your catalog organization or browse your products systematically.",
    fix: `<!-- Category page schema via Footer injection (only on category pages) -->
<script>
(function() {
  // Only run on category pages
  if (!document.querySelector('.category-products, .product-list')) return;

  var products = document.querySelectorAll('.product-item, .product-card');
  if (products.length === 0) return;

  var items = Array.from(products).map(function(el, i) {
    var link = el.querySelector('a[href]');
    var name = el.querySelector('.product-name, .product-title');
    return {
      '@type': 'ListItem',
      'position': i + 1,
      'url': link ? link.href : '',
      'name': name ? name.textContent.trim() : ''
    };
  });

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': document.querySelector('h1')?.textContent?.trim() || document.title,
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': items.length,
      'itemListElement': items
    }
  };

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
})();
</script>`,
  },
  {
    title: "Product variants not reflected in Offer schema",
    severity: "medium",
    description:
      "Volusion product options (size, color, etc.) change the price dynamically via JavaScript, but the structured data only reflects the base product price. AI engines show an inaccurate price that may differ from what shoppers actually pay.",
    fix: `<!-- Enhance product schema with option pricing -->
<script>
(function() {
  var schema = document.querySelector('script[type="application/ld+json"]');
  if (!schema) return;

  var data = JSON.parse(schema.textContent);
  if (data['@type'] !== 'Product') return;

  // Check for option dropdowns
  var options = document.querySelectorAll('.product-options select, .product-options .option-swatch');
  if (options.length === 0) return;

  // If there are options, convert single Offer to AggregateOffer
  var basePrice = parseFloat(data.offers?.price || '0');
  data.offers = {
    '@type': 'AggregateOffer',
    'lowPrice': basePrice.toFixed(2),
    'highPrice': basePrice.toFixed(2), // Will be updated if we can detect price range
    'priceCurrency': data.offers?.priceCurrency || 'USD',
    'availability': data.offers?.availability || 'https://schema.org/InStock',
    'offerCount': options.length
  };

  schema.textContent = JSON.stringify(data);
})();
</script>`,
  },
];

const contextParagraphs = [
  "Volusion is one of the original hosted e-commerce platforms, powering online stores since 2002. While it has modernized over the years, its structured data implementation remains minimal compared to newer platforms like Shopify or BigCommerce.",
  "The biggest challenge with Volusion is its limited template customization. Unlike open-source platforms where you can freely edit templates to add JSON-LD, Volusion restricts access to core template files. Your main option for adding structured data is the header/footer HTML injection in the admin panel.",
  "Volusion's default Product schema covers the basics - name, price, availability - but omits brand information, detailed product descriptions, additional images, and customer review data. AI engines get a bare-bones view of your products.",
  "For stores that have invested in Volusion's product review system, the lack of AggregateRating schema is a significant missed opportunity. Reviews are visible to shoppers but invisible to AI engines that could use them to recommend your products.",
  "Beseam audits your Volusion store from the perspective of 13 AI engines, identifies the structured data gaps that Volusion's platform creates, and provides injectable code solutions that work within Volusion's template constraints.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
  { name: "Shift4Shop", href: "/audit/shift4shop" },
  { name: "Square Online", href: "/audit/square-online" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function VolusionAuditPage() {
  return (
    <PlatformAuditPage
      platform="Volusion"
      headline="How does AI see your Volusion store?"
      description="Volusion's closed templates make adding structured data difficult. AI engines see minimal product information. Beseam identifies the gaps and gives you injectable fixes."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
