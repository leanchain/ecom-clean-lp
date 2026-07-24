import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Wix Store?",
  description:
    "Wix stores have auto-generated schema with little merchant control. Beseam audits how ChatGPT, Gemini, and 13 AI engines read your Wix product pages.",
  keywords: [
    "Wix AI optimization",
    "ChatGPT Wix",
    "Wix structured data",
    "Wix e-commerce schema",
    "Wix product pages AI",
  ],
};

const findings: Finding[] = [
  {
    title: "Auto-generated schema omits critical product details",
    severity: "critical",
    description:
      "Wix auto-generates Product schema with basic fields - name, image, price, availability. It does not include brand, material, weight, dimensions, selling points, or any custom attribute you've entered. AI engines see a generic listing with nothing to recommend.",
    fix: `<!-- Wix Velo (formerly Corvid) - Add custom JSON-LD to product pages -->
<!-- In your product page code (Velo Editor): -->

import wixWindow from 'wix-window';

$w.onReady(function () {
  const product = $w('#productPage1').getProduct();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: product.brand || 'Your Brand' },
    sku: product.sku,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Material', value: product.customTextField1 },
      { '@type': 'PropertyValue', name: 'Key Benefit', value: product.customTextField2 },
    ],
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  wixWindow.setPageStructuredData([schema]);
});`,
  },
  {
    title: "Wix renders product content via JavaScript",
    severity: "high",
    description:
      "Wix uses a JavaScript-heavy rendering engine. While Wix does server-render some content for SEO, product pages can have delayed rendering that AI crawlers may not fully execute - leading to incomplete content being indexed.",
    fix: `<!-- Wix SEO Settings - Ensure SSR is enabled -->
<!-- Dashboard > Marketing & SEO > SEO Tools > SEO Patterns -->

<!-- 1. Set product page SEO patterns: -->
<!-- Title: {product.name} - {site.name} -->
<!-- Description: {product.description} (first 160 chars) -->

<!-- 2. Add structured data via Wix SEO panel: -->
<!-- Each product page > SEO tab > Advanced SEO > Structured Data -->

<!-- 3. Verify rendering: -->
<!-- curl -s "https://yourstore.wixsite.com/product-page" | grep "ld+json" -->

<!-- If empty, AI crawlers can't see your structured data -->
<!-- Use Beseam to verify what 13 AI engines actually see -->`,
  },
  {
    title: "Product variants lack individual schema",
    severity: "high",
    description:
      "Wix products with options (size, color) emit a single Offer in the schema with the base price. AI engines can't distinguish between variant prices, so they may quote incorrect pricing when shoppers ask about specific options.",
    fix: `// Wix Velo - Add per-variant Offer schema
import wixWindow from 'wix-window';
import wixStores from 'wix-stores';

$w.onReady(async function () {
  const product = $w('#productPage1').getProduct();
  const variants = await wixStores.getProductVariants(product._id);

  const offers = variants.map(v => ({
    '@type': 'Offer',
    name: Object.values(v.choices).join(' / '),
    price: v.variant.price,
    priceCurrency: v.variant.currency,
    availability: v.variant.inStock
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    offers: offers,
  };

  wixWindow.setPageStructuredData([schema]);
});`,
  },
  {
    title: "Collection pages missing catalog structure",
    severity: "medium",
    description:
      "Wix store category pages display product grids but don't emit ItemList or CollectionPage schema. AI engines can't understand your product catalog hierarchy, making it harder for them to recommend products by category.",
    fix: `<!-- Wix Velo - Add ItemList schema to collection pages -->
<!-- In your Category page code: -->

import wixWindow from 'wix-window';
import wixData from 'wix-data';

$w.onReady(async function () {
  const category = /* get current category name */;
  const products = await wixData.query('Stores/Products')
    .eq('collections', category)
    .find();

  const items = products.items.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: \`https://yourstore.com/product-page/\${p.slug}\`,
  }));

  wixWindow.setPageStructuredData([{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items,
    },
  }]);
});`,
  },
];

const contextParagraphs = [
  "Wix is one of the most popular website builders worldwide, offering drag-and-drop simplicity for creating online stores. However, its closed ecosystem gives you limited control over the structured data that AI engines read.",
  "Wix auto-generates basic Product schema - name, image, price - but omits virtually every product attribute AI engines need to make recommendations: brand, material, size details, selling points, and competitive context. None of your carefully entered product info reaches AI crawlers.",
  "Wix's JavaScript-heavy rendering is another concern. While Wix has improved its server-side rendering for SEO, AI crawlers vary in their ability to execute JavaScript. Some AI engines may only see a partial page, missing key product details.",
  "Wix Velo (the platform's coding environment) does offer some schema control, but it requires developer knowledge and manual implementation per page type - a significant barrier for most Wix users who chose the platform specifically to avoid coding.",
  "Beseam audits your Wix store from the perspective of 13 AI engines, revealing exactly what each engine sees. Even on a platform with limited schema control, knowing your gaps is the first step to fixing them.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "Squarespace", href: "/audit/squarespace" },
  { name: "Square Online", href: "/audit/square-online" },
  { name: "Big Cartel", href: "/audit/big-cartel" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function WixAuditPage() {
  return (
    <PlatformAuditPage
      platform="Wix"
      headline="How does AI see your Wix store?"
      description="Wix makes building beautiful stores easy - but gives you almost no control over what AI engines see. Beseam reveals the gaps."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
