import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "BigCommerce product data audit",
  description:
    "Check what your Stencil templates emit on BigCommerce product and category pages. Get an evidence-backed list of schema gaps and a proposed theme fix.",
  keywords: [
    "BigCommerce structured data",
    "BigCommerce product schema",
    "Stencil theme schema",
    "BigCommerce custom fields schema",
    "BigCommerce category ItemList",
  ],
};

const findings: Finding[] = [
  {
    title: "Schema covers commerce fields, not product detail",
    severity: "critical",
    description:
      "Out of the box BigCommerce covers name, price, availability, and SKU. What the product is for, who it suits, and how it differs from the near-identical listing beside it appears nowhere in the structured data, so a parser has product identity without product substance.",
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
    title: "Custom fields absent from structured data",
    severity: "high",
    description:
      "Custom fields hold the size chart, material composition, warranty term, and compatibility notes your team entered. The default schema output ignores them. A shopper asking an assistant whether the item fits their setup gets no answer from your page, even though the answer is in your catalog.",
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
    title: "Multi-storefront pages resolve to wrong data",
    severity: "medium",
    description:
      "The same product across storefronts can differ in price, currency, and availability. If canonical tags or schema URLs point at another storefront, a crawler collects values from a store the shopper is not on, and the price quoted back does not match the one at checkout.",
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
    title: "Category pages carry no ItemList schema",
    severity: "medium",
    description:
      "Category templates render products as markup with no ItemList or CollectionPage schema. Nothing declares which products belong to the category or their order, so the grouping your merchandising team maintains is not available to anything reading the page programmatically.",
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
  "BigCommerce emits more structured data by default than most platforms. Product name, price, availability, SKU, and images are handled without theme work, which removes a class of problem other platforms leave to the merchant.",
  "The default stops at commerce fields. Custom fields — material, certification, warranty term, compatibility — are stored against the product and rendered into a specs table, not into the JSON-LD. Stencil can emit them through Handlebars, but a stock theme does not, and the two look identical in a browser.",
  "Multi-storefront adds a resolution problem. The same product can carry different prices, descriptions, and availability per storefront. If canonical tags or schema URLs point at another storefront, a crawler collects data belonging to a store the shopper cannot buy from.",
  "Beseam requests your storefront pages the way a crawler does, compares the rendered schema against the fields your catalog holds, and reports the difference with the template involved. It proposes the Stencil change. Beseam does not deploy to your theme.",
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
      headline="Your custom fields never reach the schema"
      description="Beseam reads the JSON-LD your Stencil theme renders across product, category, and storefront templates. You get an evidence-backed list of gaps and a proposed Handlebars change your team reviews before applying."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
