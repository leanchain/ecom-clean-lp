import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your BigCommerce Store?",
  description:
    "BigCommerce has better built-in schema than most platforms, but still has critical AI readability gaps. Beseam audits and fixes them.",
  keywords: [
    "BigCommerce AI optimization",
    "ChatGPT BigCommerce",
    "BigCommerce structured data",
    "BigCommerce schema markup",
    "BigCommerce product pages AI",
  ],
};

const findings: Finding[] = [
  {
    title: "Built-in schema lacks selling points and differentiators",
    severity: "critical",
    description:
      "BigCommerce includes decent Product schema out of the box — name, price, availability, SKU — but omits the contextual selling points, use cases, and competitive positioning that AI engines need to confidently recommend your product.",
    fix: `<!-- BigCommerce Stencil: Extend Product schema in product.html -->
<script type="application/ld+json">
{
  "@type": "Product",
  "name": "{{product.title}}",
  "description": "{{product.description}}",
  "brand": { "@type": "Brand", "name": "{{product.brand.name}}" },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Key Benefit",
      "value": "{{product.custom_fields.key_benefit}}"
    },
    {
      "@type": "PropertyValue",
      "name": "Ideal For",
      "value": "{{product.custom_fields.ideal_for}}"
    }
  ]
}
</script>`,
  },
  {
    title: "Custom fields not surfaced in structured data",
    severity: "high",
    description:
      "BigCommerce's custom fields feature is powerful for storing product attributes, but these fields are not included in the default schema output. AI engines can't see size charts, material composition, warranty info, or any custom attribute you've carefully entered.",
    fix: `// In your Stencil theme's product.html template,
// loop through custom fields and add to schema:
"additionalProperty": [
  {{#each product.custom_fields}}
  {
    "@type": "PropertyValue",
    "name": "{{name}}",
    "value": "{{value}}"
  }{{#unless @last}},{{/unless}}
  {{/each}}
]`,
  },
  {
    title: "Multi-storefront schema conflicts",
    severity: "medium",
    description:
      "BigCommerce's multi-storefront feature can cause schema inconsistencies when the same product exists across storefronts with different pricing, availability, or descriptions. AI engines may surface the wrong storefront's data.",
    fix: `<!-- Ensure canonical URLs point to the correct storefront -->
<link rel="canonical" href="{{product.url}}" />

<!-- Verify schema URLs match the current storefront -->
<!-- In product schema, use the storefront-specific URL: -->
"url": "{{settings.store_url}}{{product.url}}",
"offers": {
  "url": "{{settings.store_url}}{{product.url}}"
}`,
  },
  {
    title: "Category pages missing ItemList schema",
    severity: "medium",
    description:
      "BigCommerce category pages display products visually but don't include ItemList or CollectionPage schema. AI engines can't understand product relationships or category context when crawling your store.",
    fix: `<!-- Add to category.html in Stencil theme -->
<script type="application/ld+json">
{
  "@type": "CollectionPage",
  "name": "{{category.name}}",
  "description": "{{category.description}}",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": {{category.products.length}},
    "itemListElement": [
      {{#each category.products}}
      {
        "@type": "ListItem",
        "position": {{@index}},
        "url": "{{../settings.store_url}}{{url}}"
      }{{#unless @last}},{{/unless}}
      {{/each}}
    ]
  }
}
</script>`,
  },
];

const contextParagraphs = [
  "BigCommerce has better built-in structured data than most e-commerce platforms. Product schema includes name, price, availability, SKU, and images out of the box — which gives it a head start on AI readability.",
  "However, BigCommerce's default schema stops at the basics. The custom fields that make your products unique — materials, certifications, warranty terms, care instructions — are stored in BigCommerce but never surfaced in structured data. AI engines can't see them.",
  "The Stencil theme engine gives you full control over schema output, but most stores use default templates that haven't been optimized for AI readability. This means your competitors on the same platform could be getting recommended over you simply because their theme emits richer data.",
  "Multi-storefront deployments add another layer of complexity. When the same product lives on multiple storefronts with different pricing or descriptions, AI engines can surface inconsistent information — recommending a product at the wrong price or from the wrong region.",
  "Beseam audits your BigCommerce store across all 118+ AI readability checks, identifies the specific schema gaps in your Stencil templates, and generates the exact code fixes needed for your theme.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function BigCommerceAuditPage() {
  return (
    <PlatformAuditPage
      platform="BigCommerce"
      headline="How does AI see your BigCommerce store?"
      description="BigCommerce has solid defaults — but AI engines need more than defaults to recommend your products over competitors. Beseam bridges the gap."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
