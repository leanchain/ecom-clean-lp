import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Saleor product data audit",
  description:
    "Saleor ships an API, not a storefront. Beseam reads what your frontend renders and returns the missing schema as gaps with evidence and code to review.",
  keywords: [
    "Saleor structured data",
    "Saleor storefront JSON-LD",
    "Saleor GraphQL product schema",
    "Saleor headless commerce SEO",
    "Saleor channel pricing schema",
  ],
};

const findings: Finding[] = [
  {
    title: "No JSON-LD until your frontend writes it",
    severity: "critical",
    description:
      "Saleor provides a GraphQL API and no storefront, so the site emits whatever its frontend emits, which is often nothing. Without a Product node, a shopper asking an assistant about price, availability, or materials gets an answer sourced from somewhere other than your store, if at all.",
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
    title: "GraphQL attributes never reach the Product node",
    severity: "high",
    description:
      "Saleor's attribute system holds materials, dimensions, care instructions, and fit. Storefront queries typically request only what the template displays, so those values are neither fetched nor mapped to additionalProperty. The specification detail that decides a purchase never becomes machine-readable.",
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
    title: "Collections render without CollectionPage or ItemList",
    severity: "high",
    description:
      "Saleor exposes collections and categories through the API, but CollectionPage and ItemList markup has to be assembled in the storefront from that response. Most implementations skip it, so category pages state no relationship between the products they list.",
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
    title: "Channel-blind queries emit the wrong price",
    severity: "medium",
    description:
      "Saleor prices per channel, each with its own currency, tax treatment, and availability. A schema generator that omits the channel argument falls back to a default, so the markup quotes a price that does not match what the visitor is shown or charged.",
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
  "Saleor is a GraphQL commerce API. It renders no storefront, so no structured data exists until your React or Next.js frontend writes it. Nothing about the platform is misconfigured — there is simply no default output to inspect, and every schema decision belongs to your team.",
  "The API is a good source to build from. Product attributes, variant pricing, media, and collection hierarchies are all queryable. The gap is usually scope: a storefront query asks for what the page displays, and attributes never rendered visually never make it into a Product node either.",
  "Rendering strategy decides whether any of it is readable. A client-rendered storefront attaches JSON-LD after hydration, so a fetcher reading the first HTML response finds a shell. Server components, SSR, or static generation put the markup in the initial payload where it can be parsed.",
  "Channels complicate correctness. Saleor prices per channel, each with its own currency, tax rules, and availability. A generator that queries without a channel argument, or defaults to the first one, emits a price that is right for some visitors and wrong for the rest.",
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
      headline="Saleor ships an API, not structured data"
      description="Beseam fetches your Saleor storefront the way a crawler does, reads the HTML that actually arrives, and checks it against the product data your GraphQL API already holds. The output is a list of gaps with evidence and TypeScript you can review before merging."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
