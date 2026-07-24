import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Headless / Custom Store?",
  description:
    "Headless and custom-built e-commerce stores often have zero structured data. Beseam audits AI readability and generates the schema your framework won't.",
  keywords: [
    "headless commerce AI optimization",
    "custom e-commerce structured data",
    "Next.js e-commerce schema",
    "headless Shopify AI",
    "composable commerce AI readability",
  ],
};

const findings: Finding[] = [
  {
    title: "No Product schema - AI sees raw HTML only",
    severity: "critical",
    description:
      "Headless and custom stores built with React, Next.js, or Vue often render product data entirely in JavaScript. AI engines that parse HTML see an empty page with no structured data, no product name, and no price - making it impossible to recommend anything.",
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
    title: "Client-side rendering hides content from AI crawlers",
    severity: "critical",
    description:
      "Single-page apps (SPAs) that rely on client-side rendering show AI crawlers a loading spinner or empty shell. Even if your product data loads perfectly in a browser, AI engines that don't execute JavaScript see nothing.",
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
    title: "API-driven content with no meta tags",
    severity: "high",
    description:
      "Headless stores fetch product data from APIs (Shopify Storefront, Commerce.js, Medusa, etc.) but often forget to set meta tags dynamically. AI engines see generic site-wide meta titles and descriptions instead of product-specific content.",
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
    title: "Breadcrumb and navigation schema missing",
    severity: "medium",
    description:
      "Custom stores often implement visual breadcrumbs but skip BreadcrumbList schema. AI engines can't understand your site hierarchy - they don't know which category a product belongs to or how products relate to each other.",
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
  "Headless and custom-built e-commerce stores - whether powered by Next.js, Nuxt, Remix, Hydrogen, or fully custom frameworks - offer total design freedom. But that freedom comes with a cost: your framework doesn't generate structured data for you.",
  "The most critical issue is that many headless stores render product content entirely in JavaScript. AI engines that parse the initial HTML response see an empty page - no product name, no price, no schema. Your products are completely invisible to AI recommendations.",
  "Even stores using SSR (Server-Side Rendering) often miss structured data because developers focus on visual output and forget to add JSON-LD. The page looks perfect in a browser, but AI engines see HTML without any machine-readable product information.",
  "API-driven architectures add another challenge. Product data lives in Shopify Storefront API, Sanity, Contentful, or a custom backend - but none of these sources automatically generate the meta tags and schema that AI engines need to discover and understand your products.",
  "Beseam works with any stack. Paste your store URL, and we audit what AI engines actually see - regardless of whether you're running Shopify Hydrogen, a headless WooCommerce setup, or a fully custom React storefront. You get specific fixes for your exact rendering approach.",
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
      headline="How does AI see your headless store?"
      description="Your framework gives you full control - but it also means AI readability is entirely on you. Beseam shows you what's missing."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
