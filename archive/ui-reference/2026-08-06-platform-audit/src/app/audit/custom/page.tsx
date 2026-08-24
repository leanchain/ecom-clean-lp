import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Headless / Custom product data audit",
  description:
    "Custom storefronts emit only the markup you write. Beseam reads what a crawler receives and lists the gaps with evidence and a proposed fix.",
  keywords: [
    "headless commerce structured data",
    "custom storefront JSON-LD",
    "Next.js e-commerce product schema",
    "composable commerce SEO audit",
    "server-side rendering product markup",
  ],
};

const findings: Finding[] = [
  {
    title: "No Product schema in the rendered page",
    severity: "critical",
    description:
      "Custom React, Vue, and Next.js storefronts commonly render product detail from component state with no JSON-LD alongside it. Nothing in the response states the name, price, availability, or brand in a form a parser can read, so the product cannot be quoted accurately in an answer.",
    fix: `// Next.js: Add Product JSON-LD to your PDP page
// app/products/[slug]/page.tsx

export default function ProductPage({ product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map(img => img.url),
    brand: { '@type': 'Brand', name: product.brand },
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Product UI */}
    </>
  );
}`,
  },
  {
    title: "Client-side rendering returns an empty shell",
    severity: "critical",
    description:
      "A single-page app returns markup with no product content and fills it after hydration. A fetcher that does not run JavaScript receives a loading state. The page can be flawless in a browser and still contain nothing readable at the moment it is crawled.",
    fix: `// Use Server-Side Rendering (SSR) or Static Site Generation (SSG)
// to ensure product content is in the initial HTML response.

// Next.js - use generateStaticParams or server components:
export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// Nuxt.js - use useFetch or useAsyncData:
const { data: product } = await useFetch(
  \`/api/products/\${route.params.slug}\`
);

// Verify with: curl -s YOUR_URL | grep 'application/ld+json'
// If empty, AI engines can't see your products.`,
  },
  {
    title: "Meta tags stay generic across every product",
    severity: "high",
    description:
      "Headless storefronts pull product records from a Storefront API, a CMS, or a custom backend, then leave title, description, and canonical at their site-wide defaults. Every product page presents the same summary, so nothing distinguishes one item from the next to anything reading the head.",
    fix: `// Next.js App Router - dynamic metadata
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  return {
    title: \`\${product.title} - Your Store\`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [{ url: product.image, width: 1200, height: 630 }],
      type: 'website',
    },
  };
}

// Also add: canonical URL, product-specific keywords,
// and Twitter card metadata for AI discovery.`,
  },
  {
    title: "BreadcrumbList missing behind visual breadcrumbs",
    severity: "medium",
    description:
      "Custom stores render a breadcrumb trail for people and skip the BreadcrumbList node. Nothing declares which category a product sits in or how deep it is in the hierarchy, so the product is read without the surrounding structure that gives it context.",
    fix: `// Add BreadcrumbList JSON-LD alongside Product schema
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1,
      name: 'Home', item: 'https://yourstore.com/' },
    { '@type': 'ListItem', position: 2,
      name: product.category,
      item: \`https://yourstore.com/\${product.categorySlug}\` },
    { '@type': 'ListItem', position: 3,
      name: product.title,
      item: \`https://yourstore.com/products/\${product.slug}\` },
  ],
};`,
  },
];

const contextParagraphs = [
  "A custom storefront — Next.js, Nuxt, Remix, Hydrogen, or something in-house — emits exactly the markup you wrote and nothing else. No theme adds a Product node behind you. Every schema decision, every field, and every mapping from your backend belongs to your team.",
  "Rendering strategy comes first. A client-rendered app returns an HTML shell and fills it after hydration, so a fetcher that does not execute JavaScript sees an empty page. Server rendering or static generation puts the product content and the JSON-LD in the first response, where it can be parsed.",
  "Server rendering alone is not enough. Plenty of SSR storefronts return complete, correct HTML and still carry no Product, Offer, or BreadcrumbList node. The page reads well to a person and offers a parser no explicit price, availability, brand, or position in the catalogue.",
  "The data source adds a mapping step. Product records live in a Storefront API, a CMS, or your own backend, and none of them generate meta tags or JSON-LD for you. Title, description, canonical, and schema each have to be derived per route from the fetched record.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
];

export default function CustomAuditPage() {
  return (
    <PlatformAuditPage
      platform="Headless / Custom"
      headline="Your framework emits nothing you did not write"
      description="Beseam requests your storefront the way a crawler does, reads the HTML that comes back before any JavaScript runs, and checks it against what a shopper would need to answer. The output is a list of gaps with evidence and a proposed fix your team approves."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
