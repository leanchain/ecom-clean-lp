import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Medusa Store?",
  description:
    "Medusa headless commerce stores have no built-in structured data. Beseam audits how AI engines read your Medusa-powered storefront and generates the schema you need.",
  keywords: [
    "Medusa AI optimization",
    "ChatGPT Medusa",
    "Medusa JS structured data",
    "Medusa headless commerce schema",
    "Medusa product JSON-LD",
  ],
};

const findings: Finding[] = [
  {
    title: "No structured data in Medusa starter storefronts",
    severity: "critical",
    description:
      "Medusa's official Next.js starter storefront does not include any Product JSON-LD schema. The product pages render beautifully for users but AI engines see no structured product data - no price, no availability, no product type.",
    fix: `// In your Medusa Next.js storefront:
// Create src/lib/schema.ts

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { Region } from "@medusajs/medusa";

export function generateProductSchema(
  product: PricedProduct,
  region: Region,
  baseUrl: string
) {
  const cheapestVariant = product.variants
    ?.sort((a, b) => (a.calculated_price ?? 0) - (b.calculated_price ?? 0))[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description?.slice(0, 5000),
    image: product.images?.map((img) => img.url) || [],
    sku: cheapestVariant?.sku || product.id,
    brand: product.collection ? {
      "@type": "Brand",
      name: product.collection.title,
    } : undefined,
    offers: product.variants?.map((variant) => ({
      "@type": "Offer",
      sku: variant.sku,
      name: variant.title,
      price: ((variant.calculated_price ?? 0) / 100).toFixed(2),
      priceCurrency: region.currency_code.toUpperCase(),
      availability: variant.inventory_quantity && variant.inventory_quantity > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: \`\${baseUrl}/products/\${product.handle}\`,
    })),
  };
}

// In your product page (e.g., app/products/[handle]/page.tsx):
// import { generateProductSchema } from "@/lib/schema";
//
// <script type="application/ld+json"
//   dangerouslySetInnerHTML={{
//     __html: JSON.stringify(generateProductSchema(product, region, baseUrl))
//   }}
// />`,
  },
  {
    title: "Product metadata and custom attributes not in schema",
    severity: "high",
    description:
      "Medusa products have a metadata field (JSON key-value pairs) where stores often keep specifications, materials, and other attributes. This metadata is accessible via the API but never appears in structured data on the storefront.",
    fix: `// Map Medusa product metadata to PropertyValue schema
export function mapMetadataToProperties(
  metadata: Record<string, string> | null
): Array<{ "@type": "PropertyValue"; name: string; value: string }> {
  if (!metadata) return [];

  // Filter out internal keys (starting with underscore)
  return Object.entries(metadata)
    .filter(([key]) => !key.startsWith("_"))
    .map(([key, value]) => ({
      "@type": "PropertyValue" as const,
      name: key.replace(/_/g, " ").replace(/\\b\\w/g, (c) => c.toUpperCase()),
      value: String(value),
    }));
}

// Add custom fields via Medusa's Custom Attributes plugin:
// If using product type attributes:
export function mapProductTypeAttributes(product: PricedProduct) {
  // Access via product.type and custom attributes
  const attrs: Array<{ "@type": "PropertyValue"; name: string; value: string }> = [];

  if (product.weight) {
    attrs.push({
      "@type": "PropertyValue",
      name: "Weight",
      value: \`\${product.weight}g\`,
    });
  }
  if (product.material) {
    attrs.push({
      "@type": "PropertyValue",
      name: "Material",
      value: product.material,
    });
  }

  return attrs;
}`,
  },
  {
    title: "Collection pages have no CollectionPage schema",
    severity: "high",
    description:
      "Medusa's collection pages (product groupings) render as product grids in the storefront but include no CollectionPage or ItemList structured data. AI engines can't navigate your catalog hierarchy or understand product groupings.",
    fix: `// lib/schema.ts - Add collection schema
import { ProductCollection } from "@medusajs/medusa";

export function generateCollectionSchema(
  collection: ProductCollection,
  products: PricedProduct[],
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.metadata?.description as string || "",
    url: \`\${baseUrl}/collections/\${collection.handle}\`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: \`\${baseUrl}/products/\${product.handle}\`,
        name: product.title,
      })),
    },
  };
}

// In your collection page component:
// <script type="application/ld+json"
//   dangerouslySetInnerHTML={{
//     __html: JSON.stringify(
//       generateCollectionSchema(collection, products, baseUrl)
//     )
//   }}
// />`,
  },
  {
    title: "Multi-region pricing shows wrong currency in schema",
    severity: "medium",
    description:
      "Medusa supports multiple regions with different currencies and tax settings. Storefronts that generate schema often hardcode a single currency or use the wrong region's pricing, causing AI engines to display inaccurate prices.",
    fix: `// Ensure region-aware pricing in your schema
// Access the current region from your middleware or context:

import { getRegion } from "@/lib/data";

export async function generateRegionAwareSchema(
  product: PricedProduct,
  countryCode: string,
  baseUrl: string
) {
  const region = await getRegion(countryCode);
  if (!region) return null;

  // Medusa calculates prices per region via pricing module
  // Ensure your product query includes region_id:
  // GET /store/products/:id?region_id=reg_xxx

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    offers: product.variants?.map((variant) => ({
      "@type": "Offer",
      price: ((variant.calculated_price ?? 0) / 100).toFixed(2),
      priceCurrency: region.currency_code.toUpperCase(),
      // Include tax info for EU compliance
      priceSpecification: {
        "@type": "PriceSpecification",
        price: ((variant.calculated_price ?? 0) / 100).toFixed(2),
        priceCurrency: region.currency_code.toUpperCase(),
        valueAddedTaxIncluded: region.includes_tax,
      },
    })),
  };
}`,
  },
];

const contextParagraphs = [
  "Medusa is an open-source headless commerce platform built with Node.js and TypeScript. It's the leading Node.js alternative to Saleor, offering a modular architecture that developers love. Its official starter uses Next.js for the storefront.",
  "Like all headless platforms, Medusa's core challenge for AI readability is architectural: the backend provides a REST API but no HTML output. Any structured data must be implemented in your frontend code. Medusa's official Next.js starter includes zero JSON-LD.",
  "Medusa's product model supports variants, collections, and a flexible metadata system (JSON key-value pairs), but translating this API data to rich structured data is left entirely to the storefront developer - and it's rarely done.",
  "The multi-region system is a standout Medusa feature, but it complicates structured data: prices, currencies, and tax inclusion vary by region, and your schema needs to reflect the correct region's pricing for SE crawlers and AI engines.",
  "Beseam audits your Medusa storefront from the perspective of 13 AI engines, identifies the complete absence of structured data in your Next.js (or custom) storefront, and provides TypeScript utility functions you can drop directly into your codebase.",
];

const otherPlatforms = [
  { name: "Saleor", href: "/audit/saleor" },
  { name: "Headless / Custom", href: "/audit/custom" },
  { name: "Shopify", href: "/audit/shopify" },
  { name: "Shopware", href: "/audit/shopware" },
  { name: "WooCommerce", href: "/audit/woocommerce" },
];

export default function MedusaAuditPage() {
  return (
    <PlatformAuditPage
      platform="Medusa"
      headline="How does AI see your Medusa storefront?"
      description="Medusa's headless architecture means your Next.js storefront has zero structured data by default. AI engines can't see your products. Beseam shows what's missing."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
