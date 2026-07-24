import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Shopify Store?",
  description:
    "Shopify stores have critical AI readability gaps. Beseam audits how ChatGPT, Gemini, and 13 AI engines read your product pages - and generates fixes.",
  keywords: [
    "Shopify AI optimization",
    "ChatGPT Shopify",
    "AI product pages Shopify",
    "Shopify schema markup",
    "Shopify structured data",
  ],
};

const findings: Finding[] = [
  {
    title: "Product schema missing key selling points",
    severity: "critical",
    description:
      "Shopify's default Product schema includes name, price, and availability - but omits selling points, materials, fit details, and competitive differentiators. AI engines see a bare product listing with no reason to recommend it over competitors.",
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
    title: "AI reads wrong price due to variant schema",
    severity: "critical",
    description:
      "Shopify themes often emit a single Product schema with the first variant's price. AI engines report this price for all variants, telling shoppers the wrong price for the product they're actually looking at.",
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
    title: "Missing review aggregate - AI can't cite ratings",
    severity: "high",
    description:
      "Most Shopify review apps inject stars visually but don't add AggregateRating schema. AI engines can't see your 4.8-star rating, so they can't mention it when recommending products.",
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
    title: "Collection pages have no structured data",
    severity: "medium",
    description:
      "Shopify collection pages list products visually but emit zero structured data. AI engines crawling your store can't discover product relationships, categories, or collection context - they see each product in isolation.",
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
  "Shopify is the most popular e-commerce platform, powering millions of stores. Its default themes handle basic product schema - name, price, availability - but they leave massive gaps that AI engines can't work around.",
  "The most common issue we find on Shopify stores is incomplete Product schema. Shopify's Liquid templates emit minimal structured data that lacks the selling points, materials, fit details, and competitive context that AI engines need to confidently recommend a product.",
  "Variant pricing is another blind spot. Most Shopify themes emit a single price in the schema - typically the first variant's price - which means AI engines like ChatGPT report incorrect pricing when shoppers ask about specific sizes or colors.",
  "Review apps are a third gap. Shopify's ecosystem has dozens of review apps that display stars beautifully in the browser, but many don't inject AggregateRating schema. AI engines literally can't see your ratings, so they can't mention them in recommendations.",
  "Beseam audits your Shopify store from the perspective of 13 AI engines, finds these exact gaps, generates schema and content fixes, and publishes them directly to your store - with rollback protection on every change.",
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
      headline="How does AI see your Shopify store?"
      description="Shopify handles the basics - but AI engines need more than basics to recommend your products. Beseam finds the gaps and fixes them."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
