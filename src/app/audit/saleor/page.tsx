import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Saleor Storefront?",
  description:
    "Saleor headless commerce stores depend entirely on frontend implementation for structured data. Beseam audits how AI engines read your Saleor storefront.",
  keywords: [
    "Saleor AI optimization",
    "ChatGPT Saleor",
    "Saleor structured data",
    "Saleor headless commerce schema",
    "Saleor GraphQL product schema",
  ],
};

const findings: Finding[] = [
  {
    title: "No structured data unless explicitly implemented",
    severity: "critical",
    description:
      "Saleor is a headless commerce platform - it provides a GraphQL API but no storefront. This means zero structured data unless your frontend explicitly generates it. If your React/Next.js storefront doesn't include JSON-LD, AI engines see no product information at all.",
    fix: `// In your Next.js storefront (e.g., saleor-storefront or custom):
// Create a component that generates JSON-LD from Saleor's GraphQL data

// lib/schema.ts
import type { ProductDetailsFragment } from "@/saleor/graphql";

export function generateProductSchema(product: ProductDetailsFragment) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription || product.description?.replace(/<[^>]*>/g, "").slice(0, 5000),
    image: product.media?.map((m) => m.url) || [],
    sku: product.variants?.[0]?.sku || product.id,
    brand: product.productType?.name ? {
      "@type": "Brand",
      name: product.productType.name,
    } : undefined,
    offers: product.variants?.map((variant) => ({
      "@type": "Offer",
      sku: variant.sku,
      name: variant.name,
      price: variant.pricing?.price?.gross?.amount,
      priceCurrency: variant.pricing?.price?.gross?.currency,
      availability: variant.quantityAvailable && variant.quantityAvailable > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    })),
  };
}

// In your product page component:
// <script type="application/ld+json"
//   dangerouslySetInnerHTML={{__html: JSON.stringify(generateProductSchema(product))}}
// />`,
  },
  {
    title: "Product attributes from GraphQL not in frontend schema",
    severity: "high",
    description:
      "Saleor's attribute system (stored in the GraphQL API) contains rich product specifications - materials, dimensions, care instructions. But headless storefronts typically only query what they display, and rarely map attributes to PropertyValue schema.",
    fix: `// Extend your GraphQL query to include attributes:
// query ProductDetails($slug: String!) {
//   product(slug: $slug) {
//     attributes {
//       attribute { name slug }
//       values { name value }
//     }
//   }
// }

// Then map to schema:
export function mapAttributesToSchema(
  attributes: Array<{
    attribute: { name: string };
    values: Array<{ name: string; value?: string }>;
  }>
) {
  return attributes
    .filter((attr) => attr.values.length > 0)
    .map((attr) => ({
      "@type": "PropertyValue" as const,
      name: attr.attribute.name,
      value: attr.values.map((v) => v.name || v.value).join(", "),
    }));
}

// Add to your product schema:
// additionalProperty: mapAttributesToSchema(product.attributes)`,
  },
  {
    title: "Collection and category pages lack structured data",
    severity: "high",
    description:
      "Saleor collections and categories exist in the GraphQL API but your storefront must explicitly build CollectionPage and ItemList schema from the API response. Most headless storefronts skip this entirely.",
    fix: `// lib/schema.ts - Add collection schema generator
import type { CollectionDetailsFragment } from "@/saleor/graphql";

export function generateCollectionSchema(
  collection: CollectionDetailsFragment,
  products: Array<{ name: string; slug: string }>,
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.seoDescription || collection.description?.replace(/<[^>]*>/g, ""),
    url: \`\${baseUrl}/collections/\${collection.slug}\`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: \`\${baseUrl}/products/\${product.slug}\`,
        name: product.name,
      })),
    },
  };
}

// In your collection page:
// <script type="application/ld+json"
//   dangerouslySetInnerHTML={{
//     __html: JSON.stringify(
//       generateCollectionSchema(collection, products, process.env.NEXT_PUBLIC_URL!)
//     )
//   }}
// />`,
  },
  {
    title: "Checkout channel pricing not reflected in schema",
    severity: "medium",
    description:
      "Saleor's multi-channel architecture means product prices vary by channel (currency, tax, availability). Your storefront schema must use the correct channel's pricing, but many implementations accidentally output the default channel's prices regardless of the viewer's context.",
    fix: `// Ensure you're using channel-specific pricing in schema
// Your GraphQL query MUST include the channel parameter:

// query ProductDetails($slug: String!, $channel: String!) {
//   product(slug: $slug, channel: $channel) {
//     pricing {
//       priceRange {
//         start { gross { amount currency } }
//         stop { gross { amount currency } }
//       }
//     }
//     variants {
//       pricing(channel: $channel) {
//         price { gross { amount currency } }
//       }
//     }
//   }
// }

// Schema should use channel-aware pricing:
export function getChannelAwareOffers(product: ProductDetailsFragment) {
  const priceRange = product.pricing?.priceRange;
  if (!priceRange) return undefined;

  return {
    "@type": "AggregateOffer" as const,
    lowPrice: priceRange.start?.gross?.amount,
    highPrice: priceRange.stop?.gross?.amount,
    priceCurrency: priceRange.start?.gross?.currency,
    offerCount: product.variants?.length || 1,
  };
}`,
  },
];

const contextParagraphs = [
  "Saleor is an open-source, headless e-commerce platform built with Python (Django) and GraphQL. It's gained significant traction among developers building custom storefronts with React, Next.js, and other modern frameworks.",
  "The fundamental AI readability challenge with Saleor is inherent to headless commerce: since Saleor provides only an API (no storefront), structured data is entirely the frontend developer's responsibility. If your storefront doesn't generate JSON-LD, AI engines see nothing.",
  "Saleor's GraphQL API is actually well-suited for building rich structured data - it exposes detailed product attributes, variant pricing, collection hierarchies, and media. The problem is that most frontend implementations focus on visual rendering and overlook schema generation.",
  "The multi-channel architecture adds another layer of complexity. Saleor manages different pricing, currencies, and availability per channel, and your structured data must reflect the correct channel's data - not just the default or first channel.",
  "Beseam audits your Saleor storefront from the perspective of 13 AI engines, identifies what's missing from your client-side rendered pages, and provides ready-to-use TypeScript utility functions that map Saleor's GraphQL schema to Product JSON-LD.",
];

const otherPlatforms = [
  { name: "Medusa", href: "/audit/medusa" },
  { name: "Headless / Custom", href: "/audit/custom" },
  { name: "Shopify", href: "/audit/shopify" },
  { name: "Shopware", href: "/audit/shopware" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
];

export default function SaleorAuditPage() {
  return (
    <PlatformAuditPage
      platform="Saleor"
      headline="How does AI see your Saleor storefront?"
      description="Saleor's headless architecture means zero structured data unless your frontend builds it. AI engines can't see your products. Beseam shows what's missing and gives you the code."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
