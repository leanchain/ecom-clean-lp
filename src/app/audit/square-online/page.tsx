import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Square Online product data audit",
  description:
    "Beseam reads what Square Online emits on your product pages, compares it against your Square catalog, and returns each gap with a proposed fix.",
  keywords: [
    "Square Online structured data",
    "Square Online product schema",
    "Square Online SEO audit",
    "Square catalog website data",
    "Square Online custom code",
  ],
};

const findings: Finding[] = [
  {
    title: "Catalog detail does not reach the page",
    severity: "critical",
    description:
      "Square Online emits Product schema automatically, but a thin one: no brand, no GTIN or MPN, no item attributes, and usually one image. The rest of the detail sits in your Square catalog and stops there. An assistant matching a shopper's query to a product identifier has nothing to match on.",
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
    title: "Variations collapse into a single base price",
    severity: "high",
    description:
      "Sizes and colours are applied in JavaScript after the page loads, while the markup keeps one Offer at the base price. An assistant quotes that price for every variation. The shopper meets a different number in the cart, and the abandoned checkout is yours.",
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
    title: "No breadcrumb markup for category structure",
    severity: "medium",
    description:
      "Breadcrumbs are drawn on the page but never emitted as BreadcrumbList. Nothing tells a crawler that this product sits under this category under this store, so an assistant handling a category-level question cannot place your product and answers from a competitor who supplied the structure.",
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
    title: "Pickup and store location missing from offers",
    severity: "medium",
    description:
      "Square is a point-of-sale system first, and many merchants sell from a counter as well as online. The product markup names no seller and no delivery method, so an assistant asked where to buy something today nearby cannot tell that you have it in stock down the road.",
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
  "Square Online starts from the Square catalog, so the item data is usually already good: variations, modifiers, categories, images, locations. The website emits a much smaller subset of it. Name, price and availability travel across. Brand, GTIN, item attributes and the second through fifth images often do not.",
  "Variations are the sharpest version of this. The page updates its price in JavaScript when a shopper picks a size, but the markup holds one Offer at the base price. An assistant reading that page repeats the base number for every size, including the ones that cost more.",
  "Square merchants usually have a counter as well as a site. Nothing in the product markup says the item can be collected today at a named address, so an assistant answering a near-me question has no reason in the page to send anyone to you rather than to a listing that said so.",
  "Square Online allows custom code on paid plans, applied per page or site-wide, which is the route to adding what is missing. Beseam fetches the page, shows what Square emitted, and hands you the snippet. Applying it stays with you; Beseam does not write to the site.",
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
      headline="Your Square catalog is richer than your product pages"
      description="Beseam reads the JSON-LD Square Online emits on product and category pages and compares it against the item data in your Square catalog. You get the fields that never made it across, the evidence, and code to add where your plan allows."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
