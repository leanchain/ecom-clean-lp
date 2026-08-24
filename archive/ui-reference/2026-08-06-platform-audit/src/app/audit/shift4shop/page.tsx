import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Shift4Shop product data audit",
  description:
    "Beseam reads the Product, option, and category markup Shift4Shop templates emit and returns the gaps with evidence and template code to review.",
  keywords: [
    "Shift4Shop structured data",
    "Shift4Shop product schema",
    "3dcart schema markup",
    "Shift4Shop template editor JSON-LD",
    "Shift4Shop extra fields SEO",
  ],
};

const findings: Finding[] = [
  {
    title: "Product schema omits brand and identifiers",
    severity: "critical",
    description:
      "Shift4Shop's generated Product node covers name, price, and availability but leaves out brand, GTIN, MPN, specifications, and images beyond the first. An assistant can confirm the product exists and cannot tell it apart from a near-identical listing elsewhere, or match it to a manufacturer catalogue.",
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
    title: "Option pricing absent from Offer schema",
    severity: "high",
    description:
      "Shift4Shop options carry price adjustments and their own availability, but the emitted Offer reflects only the base product. A shopper told the large size costs the base price finds a different number at checkout, and the correction lands at the worst possible moment.",
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
    title: "Extra fields never reach structured data",
    severity: "high",
    description:
      "Shift4Shop gives each product a set of extra fields, and merchants fill them with dimensions, materials, compatibility, and certifications. None of it is mapped to additionalProperty, so the specification detail that answers a buying question sits in the admin and nowhere a parser can reach.",
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
    title: "Category pages have no ItemList markup",
    severity: "medium",
    description:
      "Shift4Shop category pages list products with names and prices in HTML but emit no CollectionPage or ItemList node. Nothing states how the catalogue is grouped, so a product is read in isolation rather than as part of a category with siblings and a hierarchy.",
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
  "Shift4Shop, formerly 3dcart, emits a Product node by default with name, price, and availability. That is more than several hosted platforms manage. What it leaves out is brand, GTIN and MPN, secondary images, and the specification data merchants actually keep in the catalogue.",
  "Template access is where Shift4Shop is better placed than most hosted platforms. Design > Template Editor exposes product.html and category.html with platform variables, so schema can be authored server-side and arrives in the first HTML response rather than being injected by a script after load.",
  "Extra fields are the largest untapped source. Merchants use them for dimensions, materials, compatibility, and certifications. None of it reaches the markup, so an AI assistant answering a specification question has nothing to read and falls back to whatever the prose happens to mention.",
  "Options are the accuracy risk. Shift4Shop options carry price adjustments, but the emitted Offer reflects the base product only. The template language has limited access to individual option prices, so a correct AggregateOffer usually needs values precomputed through the REST API.",
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
      headline="Shift4Shop schema stops at name and price"
      description="Beseam reads the JSON-LD your Shift4Shop templates emit on product and category pages and compares it against what a shopper or an AI assistant needs to answer a question. You get a list of gaps with evidence and template code to review, not an automatic edit."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
