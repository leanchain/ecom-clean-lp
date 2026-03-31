import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Shift4Shop Store?",
  description:
    "Shift4Shop (formerly 3dcart) stores have basic schema with significant gaps. Beseam audits how AI engines read your Shift4Shop product pages and what's missing.",
  keywords: [
    "Shift4Shop AI optimization",
    "ChatGPT Shift4Shop",
    "Shift4Shop structured data",
    "3dcart schema",
    "Shift4Shop product JSON-LD",
  ],
};

const findings: Finding[] = [
  {
    title: "Default Product schema missing brand and identifiers",
    severity: "critical",
    description:
      "Shift4Shop generates Product schema with name, price, and availability, but omits brand, GTIN/MPN, detailed specifications, and multiple product images. AI engines can identify your product exists but can't differentiate it from competitors or verify its authenticity.",
    fix: `<!-- Shift4Shop allows template editing via Design > Template Editor -->
<!-- Edit product.html template to add enhanced schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[product_name]",
  "description": "[long_description_text]",
  "image": [
    "[large_image]"
    [ASSIGN]additionalImages[/ASSIGN]
  ],
  "sku": "[catalogid]",
  "mpn": "[product_mpn]",
  "brand": {
    "@type": "Brand",
    "name": "[manufacturer_name]"
  },
  "offers": {
    "@type": "Offer",
    "price": "[product_price_raw]",
    "priceCurrency": "[store_currency]",
    "availability": "[IF instock]https://schema.org/InStock[ELSE]https://schema.org/OutOfStock[/IF]",
    "url": "[product_url]",
    "priceValidUntil": "[sale_end_date]",
    "seller": {
      "@type": "Organization",
      "name": "[store_name]"
    }
  }
  [IF product_review_count > 0]
  ,"aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[product_review_average]",
    "reviewCount": "[product_review_count]"
  }
  [/IF]
}
</script>`,
  },
  {
    title: "Product options lack variant-level schema",
    severity: "high",
    description:
      "Shift4Shop supports complex product options with price adjustments, but the structured data reflects only the base product price. AI engines don't know that a Large size costs $5 more or that the Premium version has different availability.",
    fix: `<!-- Add option-level pricing via template variables -->
<!-- In product.html, add after the main product schema: -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[product_name]",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "[product_price_low]",
    "highPrice": "[product_price_high]",
    "priceCurrency": "[store_currency]",
    "offerCount": "[option_count]",
    "availability": "[IF instock]https://schema.org/InStock[ELSE]https://schema.org/OutOfStock[/IF]"
  }
}
</script>

<!-- Note: Shift4Shop's template language has limited access to
     individual option prices. For full variant schema, use the
     REST API to pre-compute option pricing on the server side. -->`,
  },
  {
    title: "Extra fields and custom attributes not in schema",
    severity: "high",
    description:
      "Shift4Shop's extra fields (up to 30 custom fields per product) contain valuable product data — dimensions, materials, certifications — but none of this appears in structured data. AI engines miss the detailed attributes that make your products findable.",
    fix: `<!-- Add extra fields as PropertyValue schema -->
<!-- Edit product.html template: -->
"additionalProperty": [
  [IF extra_field_1]
  {
    "@type": "PropertyValue",
    "name": "[extra_field_1_label]",
    "value": "[extra_field_1]"
  },
  [/IF]
  [IF extra_field_2]
  {
    "@type": "PropertyValue",
    "name": "[extra_field_2_label]",
    "value": "[extra_field_2]"
  },
  [/IF]
  [IF extra_field_3]
  {
    "@type": "PropertyValue",
    "name": "[extra_field_3_label]",
    "value": "[extra_field_3]"
  }
  [/IF]
]`,
  },
  {
    title: "Category pages missing ItemList schema",
    severity: "medium",
    description:
      "Shift4Shop category pages list products with names and prices but don't include CollectionPage or ItemList structured data. AI engines can't systematically browse your catalog hierarchy or understand product groupings.",
    fix: `<!-- Edit category.html template to add collection schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "[category_name]",
  "description": "[category_description]",
  "url": "[category_url]",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      [PRODUCTS]
      {
        "@type": "ListItem",
        "position": [product_position],
        "url": "[product_url]",
        "name": "[product_name]"
      }[IF !last],[/IF]
      [/PRODUCTS]
    ]
  }
}
</script>`,
  },
];

const contextParagraphs = [
  "Shift4Shop (formerly 3dcart) is a hosted e-commerce platform that became free for U.S. merchants through Shift4 Payments. It offers robust features including unlimited products, built-in SEO tools, and over 100 free themes — but its structured data implementation has gaps.",
  "The platform generates basic Product schema by default, which is better than platforms that produce none. However, the auto-generated schema misses brand information, product identifiers (GTIN, MPN), and the rich custom attributes stored in Shift4Shop's extra fields system.",
  "One of Shift4Shop's strengths is its template editing system, which gives you direct access to HTML templates using platform-specific variables. This means you can enhance structured data more easily than on fully closed platforms like Square Online.",
  "Shift4Shop's extra fields feature — allowing up to 30 custom attributes per product — is underutilized from an AI readability perspective. Merchants often store dimensions, materials, and compatibility data here, but none of it reaches AI engines through structured data.",
  "Beseam audits your Shift4Shop store from the perspective of 13 AI engines, identifies the gaps between your product data and what AI engines can actually read, and generates template code using Shift4Shop's native variables to maximize AI readability.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
  { name: "Volusion", href: "/audit/volusion" },
  { name: "Square Online", href: "/audit/square-online" },
  { name: "WooCommerce", href: "/audit/woocommerce" },
];

export default function Shift4ShopAuditPage() {
  return (
    <PlatformAuditPage
      platform="Shift4Shop"
      headline="How does AI see your Shift4Shop store?"
      description="Shift4Shop generates basic structured data but misses brand info, product identifiers, and your custom attributes. Beseam shows exactly what AI engines can't see."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
