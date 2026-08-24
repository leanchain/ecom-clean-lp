import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Volusion product data audit",
  description:
    "Beseam reads what your Volusion pages emit — Product schema, ratings, category markup — and returns a list of gaps with evidence and a proposed fix.",
  keywords: [
    "Volusion structured data",
    "Volusion product schema",
    "Volusion JSON-LD",
    "Volusion schema markup",
    "Volusion SEO audit",
  ],
};

const findings: Finding[] = [
  {
    title: "Product schema omits brand and identifiers",
    severity: "critical",
    description:
      "Volusion's default Product node carries name, price, and availability. Brand, SKU, GTIN, and images beyond the primary thumbnail are absent. An assistant asked to compare your product against a competitor has no manufacturer, no identifier to match against a catalogue, and one image to work from.",
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
    title: "Ratings render as stars, not markup",
    severity: "high",
    description:
      "Volusion's built-in reviews display as stars in the page body and produce no Review or AggregateRating node. The rating a shopper weighs most heavily is invisible to anything parsing the markup, so it cannot be quoted back when someone asks whether the product is well reviewed.",
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
    title: "Category pages carry no structured data",
    severity: "medium",
    description:
      "Volusion category pages render a product grid with no CollectionPage node, no ItemList, and no references to the products shown. Nothing describes how the catalogue is organised, so each product page stands alone with no category context around it.",
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
    title: "Option pricing missing from Offer schema",
    severity: "high",
    description:
      "Volusion product options adjust price through JavaScript after load, while the emitted Offer keeps the base price. A shopper asking about a specific size or colour gets a figure that does not match checkout, and the mismatch surfaces after they have decided to buy.",
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
  "Volusion is a hosted platform from the early 2000s. Its product template emits a Product node with name, price, and availability. Brand, SKU, GTIN, secondary images, and review data are absent, so anything answering a question about your product has the label and little else.",
  "Template access is the constraint. Volusion does not expose the core product template for direct editing, so schema additions usually go through the header and footer HTML injection under Marketing > SEO. That code runs in the browser, after the initial HTML, so a fetcher that does not execute JavaScript never sees it.",
  "Options are the second gap. Size and colour selections adjust price through JavaScript, while the emitted schema keeps the base price. An AI assistant reading the page quotes a figure the shopper will not see at checkout.",
  "Reviews collected in Volusion's built-in system render as stars in the browser and nothing in the markup. There is no AggregateRating node, so the rating a shopper trusts is unavailable to anything reading the page programmatically.",
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
      headline="Volusion emits a skeleton Product schema"
      description="Beseam reads the JSON-LD, meta tags, and HTML your Volusion storefront returns, then checks it against what a shopper or an AI assistant would need to answer. Each gap arrives with evidence and a proposed fix your team approves."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
