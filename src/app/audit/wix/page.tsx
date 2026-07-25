import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Wix product data audit",
  description:
    "Beseam reads the schema Wix emits on your product and category pages, then returns a list of gaps with evidence and a proposed fix for each.",
  keywords: [
    "Wix structured data",
    "Wix product schema",
    "Wix Velo JSON-LD",
    "Wix store SEO audit",
    "Wix product page markup",
  ],
};

const findings: Finding[] = [
  {
    title: "Auto-generated schema omits your product attributes",
    severity: "critical",
    description:
      "Wix emits name, image, price and availability. Brand, material, weight, dimensions and the selling points you entered in product fields are not in the markup. An assistant comparing your product against three others has nothing from you to tell them apart, so it has little reason to prefer yours.",
    fix: `<!-- Wix Velo (formerly Corvid) - Add custom JSON-LD to product pages -->
<!-- In your product page code (Velo Editor): -->

import wixSeo from 'wix-seo';

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

  wixSeo.setStructuredData([schema]);
});`,
  },
  {
    title: "Crawlers may receive less than the browser",
    severity: "medium",
    description:
      "Wix renders much of the storefront in JavaScript and server-renders for search crawlers, but coverage varies by page and by client. An assistant that fetches the URL without running scripts can get markup with no product body, so it answers from your title alone.",
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
<!-- Use Beseam to compare this output with what assistants receive -->`,
  },
  {
    title: "Variants share one price in the markup",
    severity: "high",
    description:
      "A Wix product with size or colour options emits one Offer at the base price. Ask an assistant what the extra-large costs and it repeats that single number. The shopper arrives expecting one price, meets another at checkout, and the order is the thing you lose.",
    fix: `// Wix Velo — Add per-variant Offer schema
import wixSeo from 'wix-seo';
import { getProductVariants } from 'backend/products.web';
// backend/products.web.js wraps wix-stores-backend getProductVariants()

$w.onReady(async function () {
  const product = $w('#productPage1').getProduct();
  const variants = await getProductVariants(product._id);

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

  await wixSeo.setStructuredData([schema]);
});`,
  },
  {
    title: "Category pages carry no catalog structure",
    severity: "medium",
    description:
      "Wix category pages show a product grid and emit no ItemList or CollectionPage markup. An assistant asked which shops sell a whole category cannot see that a category by that name exists on your store, so it never reaches the products inside it.",
    fix: `<!-- Wix Velo - Add ItemList schema to collection pages -->
<!-- In your Category page code: -->

import wixSeo from 'wix-seo';
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

  wixSeo.setStructuredData([{
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
  "Wix builds and injects Product schema for you. The visual editor exposes no field for it, so name, image, price and availability go out as Wix decides, while the brand, material, dimensions and selling points you typed into product fields usually do not travel with them.",
  "The override path is Velo, Wix's code environment. Its SEO API can replace a page's structured data, but the work runs per page type and needs a developer. Most merchants chose Wix to avoid that, so the default markup is what assistants end up reading.",
  "Products with options ship a single offer at the base price. When a shopper asks ChatGPT or Perplexity what the large costs, the assistant answers from the only price in the markup, which is often not the price the shopper would pay.",
  "Beseam fetches the same pages a crawler does, compares the emitted markup against the catalog data you already hold, and lists what is missing. Each gap arrives with the response it came from and a proposed change. Someone on your team applies it; Beseam does not write to Wix.",
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
      headline="Wix auto-generates product schema you cannot edit directly"
      description="Beseam fetches your Wix product and category pages and reads the JSON-LD Wix emits. You get a ranked list of gaps, the evidence behind each one, and a fix to approve — Beseam does not change your store."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
