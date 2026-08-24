import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Medusa product data audit",
  description:
    "Medusa's Next.js starter emits no JSON-LD. Beseam reads what your storefront actually returns and lists the gaps with evidence and TypeScript to review.",
  keywords: [
    "Medusa structured data",
    "Medusa storefront JSON-LD",
    "Medusa product schema",
    "Medusa headless commerce SEO",
    "Medusa region pricing schema",
  ],
};

const findings: Finding[] = [
  {
    title: "Starter storefront emits no Product JSON-LD",
    severity: "critical",
    description:
      "Medusa's official Next.js starter renders product pages with no Product node at all — no name, price, availability, or images in machine-readable form. Anything reading the page for an answer about your catalogue has to infer it from prose, or skip the product entirely.",
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
    title: "Product metadata never becomes structured data",
    severity: "high",
    description:
      "Medusa products carry a metadata object plus weight and material fields, and teams use them for specifications, care, and compatibility. The API returns all of it and the storefront maps none of it to additionalProperty, so the detail that answers a specification question stays server-side.",
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
    title: "Collection pages lack CollectionPage and ItemList",
    severity: "high",
    description:
      "Medusa collections render as product grids with no CollectionPage or ItemList node. Nothing declares which products belong together or how the catalogue is grouped, so each product page is read without the category context that would place it against its alternatives.",
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
    title: "Region-blind schema quotes the wrong currency",
    severity: "medium",
    description:
      "Medusa calculates price, currency, and tax inclusion per region. Storefront schema that hardcodes a currency or drops the region argument emits figures that hold for one market only. A shopper elsewhere is quoted a price the checkout will not honour.",
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
  "Medusa is a Node.js and TypeScript commerce backend. It returns JSON over REST and renders no HTML, so structured data is entirely a storefront concern. The official Next.js starter includes no JSON-LD, which means a fresh install emits nothing for a parser to read.",
  "The data is available; the mapping is not written. Products carry variants, collections, weight, material, and a free-form metadata object where teams keep specifications. None of that is translated into a Product node by default, so it stays inside the API.",
  "Rendering strategy decides visibility. If the product page fetches client-side, the first HTML response is a shell and any markup appears only after hydration. Server components or static generation put the JSON-LD in the initial payload, where something that does not run JavaScript can still read it.",
  "Regions are the accuracy risk. Medusa varies price, currency, and tax inclusion by region, and prices are calculated per region through the pricing module. A storefront that hardcodes a currency or omits region context emits a price that is wrong for much of the traffic it serves.",
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
      headline="Medusa's starter storefront emits no product schema"
      description="Beseam fetches your Medusa storefront as a crawler would, reads the HTML that arrives, and compares it against the product, variant, and region data your API already returns. You get a list of gaps with evidence and TypeScript to review before it ships."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
