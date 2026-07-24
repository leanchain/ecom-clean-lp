import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Square Online Store?",
  description:
    "Square Online stores have auto-generated structured data with limited customization. Beseam audits how AI engines read your Square Online product pages.",
  keywords: [
    "Square Online AI optimization",
    "ChatGPT Square Online",
    "Square Online structured data",
    "Square Online schema",
    "Square ecommerce AI readability",
  ],
};

const findings: Finding[] = [
  {
    title: "Auto-generated schema missing key product details",
    severity: "critical",
    description:
      "Square Online generates basic Product schema automatically, but it omits brand, GTIN/MPN identifiers, detailed product specifications, and additional images. AI engines see a minimal product profile when your listing data could tell a much richer story.",
    fix: `<!-- Square Online allows custom code injection via Website > Pages > Page-level code -->
<!-- Add to the product page template's custom code section: -->
<script>
(function() {
  var existing = document.querySelector('script[type="application/ld+json"]');
  if (!existing) return;

  var data = JSON.parse(existing.textContent);
  if (data['@type'] !== 'Product') return;

  // Enrich with data from page elements
  var brand = document.querySelector('.product-brand, [data-brand]');
  if (brand) {
    data.brand = { '@type': 'Brand', 'name': brand.textContent.trim() };
  }

  // Add all product images
  var gallery = document.querySelectorAll('.product-gallery img, .product-image img');
  if (gallery.length > 1) {
    data.image = Array.from(gallery).map(function(img) {
      return img.src || img.getAttribute('data-src');
    }).filter(Boolean);
  }

  // Add full description
  var desc = document.querySelector('.product-description');
  if (desc) {
    data.description = desc.textContent.trim().substring(0, 5000);
  }

  existing.textContent = JSON.stringify(data);
})();
</script>`,
  },
  {
    title: "Item variations not in structured data",
    severity: "high",
    description:
      "Square Online products with variations (sizes, colors) use JavaScript to update pricing dynamically. The schema only contains a single Offer with the base price - AI engines don't see that your product comes in multiple configurations at different price points.",
    fix: `<!-- Enhance schema with variation data -->
<script>
(function() {
  var schema = document.querySelector('script[type="application/ld+json"]');
  if (!schema) return;

  var data = JSON.parse(schema.textContent);
  if (data['@type'] !== 'Product') return;

  // Look for variation selectors
  var selectors = document.querySelectorAll(
    '.product-options select option, .variant-selector option'
  );
  if (selectors.length <= 1) return;

  var prices = [];
  selectors.forEach(function(opt) {
    var priceMatch = opt.textContent.match(/\\$([\\d.]+)/);
    if (priceMatch) prices.push(parseFloat(priceMatch[1]));
  });

  if (prices.length > 0) {
    data.offers = {
      '@type': 'AggregateOffer',
      'lowPrice': Math.min.apply(null, prices).toFixed(2),
      'highPrice': Math.max.apply(null, prices).toFixed(2),
      'priceCurrency': data.offers?.priceCurrency || 'USD',
      'offerCount': prices.length,
      'availability': 'https://schema.org/InStock'
    };
    schema.textContent = JSON.stringify(data);
  }
})();
</script>`,
  },
  {
    title: "No BreadcrumbList schema for navigation",
    severity: "medium",
    description:
      "Square Online renders breadcrumb navigation visually but doesn't include BreadcrumbList schema. AI engines can't understand your store's category hierarchy or how products relate to collections.",
    fix: `<!-- Add BreadcrumbList schema -->
<script>
(function() {
  var breadcrumbs = document.querySelectorAll(
    '.breadcrumb a, .breadcrumbs a, nav[aria-label="breadcrumb"] a'
  );
  if (breadcrumbs.length === 0) return;

  var items = Array.from(breadcrumbs).map(function(a, i) {
    return {
      '@type': 'ListItem',
      'position': i + 1,
      'name': a.textContent.trim(),
      'item': a.href
    };
  });

  var schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items
  };

  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
})();
</script>`,
  },
  {
    title: "Store information not linked to product pages",
    severity: "medium",
    description:
      "Square Online stores with physical locations (common since Square is POS-first) don't connect LocalBusiness schema to their product pages. AI engines can't tell that your products are available for local pickup or associate them with your physical store.",
    fix: `<!-- Add LocalBusiness and product availability schema -->
<script>
(function() {
  var schema = document.querySelector('script[type="application/ld+json"]');
  if (!schema) return;

  var data = JSON.parse(schema.textContent);
  if (data['@type'] !== 'Product') return;

  // Add seller/merchant info
  data.offers = data.offers || {};
  data.offers.seller = {
    '@type': 'LocalBusiness',
    'name': document.querySelector('.store-name, .site-title')?.textContent?.trim() || '',
    'url': window.location.origin
  };

  // Add shipping and pickup availability
  data.offers.availableDeliveryMethod = [
    'https://schema.org/OnSitePickup',
    'https://schema.org/DeliveryModeParcelService'
  ];

  schema.textContent = JSON.stringify(data);
})();
</script>`,
  },
];

const contextParagraphs = [
  "Square Online is Square's e-commerce extension, tightly integrated with the Square POS system used by millions of small and medium businesses. It's designed for brick-and-mortar retailers expanding online - but its structured data implementation reflects its POS-first heritage.",
  "Square Online auto-generates basic Product schema, which puts it ahead of platforms like OpenCart that have none. However, the auto-generated data is minimal: name, price, and availability with few additional details that AI engines expect.",
  "The most unique challenge for Square Online stores is the POS integration gap. Many Square merchants have rich product data in their Square catalog - categories, modifiers, item variations - but this data doesn't fully translate to structured data on the website.",
  "Square Online's template customization is limited compared to platforms like Shopify or WooCommerce, but it does allow custom code injection at the page level. This provides a path to enhance structured data without leaving the platform.",
  "Beseam audits your Square Online store from the perspective of 13 AI engines, identifies gaps between your Square catalog data and what AI engines can actually read, and provides injectable code solutions compatible with Square Online's platform.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "Wix", href: "/audit/wix" },
  { name: "Squarespace", href: "/audit/squarespace" },
  { name: "Big Cartel", href: "/audit/big-cartel" },
  { name: "Ecwid", href: "/audit/ecwid" },
];

export default function SquareOnlineAuditPage() {
  return (
    <PlatformAuditPage
      platform="Square Online"
      headline="How does AI see your Square Online store?"
      description="Square Online's POS-first approach means your online store's structured data is minimal. AI engines can't see your full product catalog. Beseam shows what's invisible."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
