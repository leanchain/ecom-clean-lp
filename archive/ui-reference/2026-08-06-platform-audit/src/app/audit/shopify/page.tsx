import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Shopify product data audit",
  description:
    "See what ChatGPT and other AI assistants read from your Shopify product pages. Get an evidence-backed list of schema gaps and a proposed fix.",
  keywords: [
    "Shopify structured data",
    "Shopify product schema",
    "Shopify variant pricing schema",
    "Shopify JSON-LD audit",
    "Shopify collection schema",
  ],
};

const findings: Finding[] = [
  {
    title: "Product schema omits your selling points",
    severity: "critical",
    description:
      "Shopify's default Product schema carries name, price, and availability. The material, fit, care, and compatibility detail that decides a purchase sits in metafields and never reaches the JSON-LD. An assistant comparing your product with a near-identical competitor has no attribute to prefer it on.",
    fix: `// Shopify Liquid: Add selling points to Product schema
<script type="application/ld+json">
{
  "@type": "Product",
  "name": "{{ product.title }}",
  "description": "{{ product.description | strip_html | escape }}",
  "brand": { "@type": "Brand", "name": "{{ product.vendor }}" },
  "material": "{{ product.metafields.custom.material }}",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Selling Point",
      "value": "{{ product.metafields.custom.selling_point }}"
    }
  ]
}
</script>`,
  },
  {
    title: "One price in schema, many variants",
    severity: "critical",
    description:
      "Themes commonly render a single Offer built from the first or selected variant, so the schema states one price for a product sold at several. A shopper asking an assistant about a specific size or color can be quoted a price that does not apply to that variant.",
    fix: `// Add Offer schema for each variant
"offers": [
  {% for variant in product.variants %}
  {
    "@type": "Offer",
    "name": "{{ variant.title }}",
    "price": "{{ variant.price | money_without_currency }}",
    "priceCurrency": "{{ shop.currency }}",
    "availability": "{% if variant.available %}InStock{% else %}OutOfStock{% endif %}",
    "url": "{{ shop.url }}{{ variant.url }}"
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]`,
  },
  {
    title: "Ratings render as stars, not AggregateRating",
    severity: "high",
    description:
      "Review apps often inject stars through a JavaScript widget and add nothing to the product's JSON-LD. Your rating and review count are readable by a shopper on the page and missing from the structured data an assistant parses, so it cannot repeat them.",
    fix: `// Add AggregateRating to Product schema
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "{{ product.metafields.reviews.rating.value }}",
  "reviewCount": "{{ product.metafields.reviews.count }}",
  "bestRating": "5",
  "worstRating": "1"
}`,
  },
  {
    title: "Collection pages emit no structured data",
    severity: "medium",
    description:
      "Shopify collection templates list products in markup without ItemList or CollectionPage schema. Nothing states which products belong to the collection or in what order, so a crawler treats each product page as unrelated and the merchandising behind the collection is lost.",
    fix: `// Add ItemList schema to collection pages
<script type="application/ld+json">
{
  "@type": "ItemList",
  "name": "{{ collection.title }}",
  "description": "{{ collection.description | strip_html | escape }}",
  "numberOfItems": {{ collection.products_count }},
  "itemListElement": [
    {% for product in collection.products limit: 50 %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "url": "{{ shop.url }}{{ product.url }}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>`,
  },
];

const contextParagraphs = [
  "Shopify's default themes emit Product schema from Liquid: name, price, availability, image. That is enough for a rich result and not much else. Materials, fit, compatibility, and the reasons someone would choose this product over a near-identical one usually live in metafields the template never renders.",
  "Variant pricing is where it gets expensive. Many themes render a single Offer using the selected or first variant, so the schema advertises one price for a product sold at several. An assistant quoting that page can name a price the shopper cannot actually buy at.",
  "Review apps are the third recurring gap. Plenty of them draw stars in the DOM through a JavaScript widget without adding AggregateRating to the product's JSON-LD. The rating is visible to a human on the page and absent from the machine-readable data an assistant reads.",
  "Beseam fetches your storefront the way a crawler does, compares what the templates emit against what your catalog holds, and reports the difference. It proposes the Liquid and schema change. Beseam does not write to your store — a person on your team applies it.",
];

const otherPlatforms = [
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function ShopifyAuditPage() {
  return (
    <PlatformAuditPage
      platform="Shopify"
      headline="What Shopify's default schema leaves out"
      description="Beseam reads the JSON-LD your Shopify theme renders on product, variant, and collection templates. You get an evidence-backed list of gaps and a proposed fix your team reviews before anything changes."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
