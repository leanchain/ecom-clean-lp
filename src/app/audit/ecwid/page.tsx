import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Ecwid Store?",
  description:
    "Ecwid stores embedded on websites render entirely via JavaScript, making products invisible to AI crawlers. Beseam audits how AI engines read your Ecwid store.",
  keywords: [
    "Ecwid AI optimization",
    "ChatGPT Ecwid",
    "Ecwid structured data",
    "Ecwid by Lightspeed schema",
    "Ecwid product JSON-LD",
  ],
};

const findings: Finding[] = [
  {
    title: "JavaScript-rendered store invisible to AI crawlers",
    severity: "critical",
    description:
      "Ecwid stores are embedded via JavaScript widget that renders the entire product catalog client-side. Most AI crawlers don't execute JavaScript, so they see only the host page content and none of your products, prices, or descriptions.",
    fix: `<!-- Ecwid provides an SEO-friendly catalog (Instant Site or SEO-optimized embedding) -->
<!-- 1. Enable SEO-friendly URLs in Ecwid admin: -->
<!-- Settings > General > SEO > Enable clean URLs -->

<!-- 2. Use the Ecwid SSR/SEO integration for your host site: -->
<!-- For WordPress: Install the Ecwid plugin which handles server-side rendering -->
<!-- For custom sites, use Ecwid's Server-Side Rendering API: -->
<script>
// In your server code, fetch product data via Ecwid REST API
// GET https://app.ecwid.com/api/v3/{storeId}/products/{productId}
// Then render JSON-LD server-side:
</script>

<!-- Server-side template example: -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{product.name}}",
  "description": "{{product.description}}",
  "image": "{{product.imageUrl}}",
  "sku": "{{product.sku}}",
  "brand": {
    "@type": "Brand",
    "name": "{{product.brand}}"
  },
  "offers": {
    "@type": "Offer",
    "price": "{{product.price}}",
    "priceCurrency": "{{store.currency}}",
    "availability": "{{product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}}"
  }
}
</script>`,
  },
  {
    title: "Product variations exist only in JavaScript state",
    severity: "high",
    description:
      "Ecwid product options and combinations (size, color, material) live entirely in the JavaScript widget state. AI engines can't interact with dropdowns or see variation-specific pricing, images, or availability.",
    fix: `<!-- Use Ecwid REST API to build server-side variant schema -->
<!-- GET /api/v3/{storeId}/products/{id}?responseFields=combinations -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{product.name}}",
  "offers": [
    {{#each product.combinations}}
    {
      "@type": "Offer",
      "sku": "{{this.sku}}",
      "name": "{{../product.name}} - {{this.options.map(o => o.value).join(', ')}}",
      "price": "{{this.price || ../product.price}}",
      "priceCurrency": "{{../../store.currency}}",
      "availability": "{{this.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}}"
    }{{#unless @last}},{{/unless}}
    {{/each}}
  ]
}
</script>`,
  },
  {
    title: "Ecwid Instant Site has no customizable structured data",
    severity: "high",
    description:
      "Ecwid's Instant Site (free hosted storefront) generates basic meta tags but offers no way to customize or enhance structured data. You can't add custom JSON-LD or modify the schema output. AI engines see minimal product information.",
    fix: `<!-- For Instant Site users: migrate product schema via external approach -->
<!-- Option 1: Use a custom domain with your own hosting -->
<!-- Option 2: Embed Ecwid on WordPress/Wix where you control the markup -->

<!-- If using Instant Site, the only option is Ecwid's built-in SEO: -->
<!-- 1. Go to Ecwid Admin > Settings > SEO -->
<!-- 2. Enable all SEO features -->
<!-- 3. Fill in complete product descriptions (Ecwid uses these for meta) -->
<!-- 4. Add all product attributes in the Ecwid product editor -->

<!-- For best AI readability, embed Ecwid on a platform you control
     and use server-side rendering to output JSON-LD -->`,
  },
  {
    title: "Category and collection pages have no schema",
    severity: "medium",
    description:
      "Ecwid category pages are entirely JavaScript-rendered with no server-side HTML. AI engines see zero structured data for your product collections, meaning your catalog hierarchy and product relationships are invisible.",
    fix: `<!-- Server-side render category page schema using Ecwid API -->
<!-- GET /api/v3/{storeId}/categories/{categoryId} -->
<!-- GET /api/v3/{storeId}/products?category={categoryId} -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{category.name}}",
  "description": "{{category.description}}",
  "url": "{{category.url}}",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": {{products.total}},
    "itemListElement": [
      {{#each products.items}}
      {
        "@type": "ListItem",
        "position": {{@index + 1}},
        "url": "{{this.url}}",
        "name": "{{this.name}}"
      }{{#unless @last}},{{/unless}}
      {{/each}}
    ]
  }
}
</script>`,
  },
];

const contextParagraphs = [
  "Ecwid (now Ecwid by Lightspeed) is an embeddable e-commerce solution that lets you add a full online store to any existing website. With over 100,000 active stores, it's popular for businesses that want to add shopping to an existing site without rebuilding.",
  "The fundamental AI readability challenge with Ecwid is its architecture: the entire store is a JavaScript widget. When AI crawlers visit your page, they see your host website's content and an empty div where your store should be. No products, no prices, no structured data.",
  "Ecwid does offer SEO-friendly URLs and server-side rendering for some hosting platforms (notably WordPress via their plugin), but many Ecwid stores are embedded on custom sites or use Instant Site where these features don't apply or are limited.",
  "For stores using Ecwid's Instant Site (their free hosted storefront), there's virtually no way to customize structured data. The platform generates basic meta tags but offers no code injection points for custom JSON-LD.",
  "Beseam audits your Ecwid store from the perspective of 13 AI engines, identifies what they can and can't see through the JavaScript rendering layer, and provides server-side solutions using Ecwid's REST API to make your products AI-readable.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "Square Online", href: "/audit/square-online" },
  { name: "Wix", href: "/audit/wix" },
  { name: "Big Cartel", href: "/audit/big-cartel" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function EcwidAuditPage() {
  return (
    <PlatformAuditPage
      platform="Ecwid"
      headline="How does AI see your Ecwid store?"
      description="Ecwid renders your entire store via JavaScript. AI crawlers see an empty page. Beseam identifies what's invisible and shows you how to fix it."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
