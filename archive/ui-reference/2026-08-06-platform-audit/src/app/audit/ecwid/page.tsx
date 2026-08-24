import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Ecwid product data audit",
  description:
    "Beseam fetches your Ecwid pages without running scripts, shows what a crawler actually receives, and returns each gap with a server-side fix to apply.",
  keywords: [
    "Ecwid structured data",
    "Ecwid product schema",
    "Ecwid by Lightspeed SEO",
    "Ecwid JSON-LD server rendering",
    "Ecwid Instant Site markup",
  ],
};

const findings: Finding[] = [
  {
    title: "Served HTML may contain no product data",
    severity: "critical",
    description:
      "The Ecwid widget builds the catalog in the browser. A client that fetches the URL without executing scripts can receive the host page and an empty container: no product name, no price, no description. An assistant asked about that product has nothing on the page to read.",
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
    title: "Variations live only in widget state",
    severity: "high",
    description:
      "Options and combinations, and the price, image and stock attached to each, exist in the widget's JavaScript state. Nothing opens a dropdown on a crawler's behalf. An assistant reporting your price reports one number, or none, for a product you sell at several.",
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
    title: "Instant Site offers no injection point",
    severity: "high",
    description:
      "Ecwid's hosted Instant Site emits its own meta tags and gives you nowhere to add JSON-LD. There is no theme file, no header injection and no override. Whatever it emits is what an assistant reads, and filling in every product field is the only lever you have left.",
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
    title: "Category pages emit no collection markup",
    severity: "medium",
    description:
      "Ecwid category pages are drawn client-side and carry no CollectionPage or ItemList block. Nothing states which products sit in which category. An assistant asked for a shop that stocks a whole category cannot see that you stock it, only that a URL exists.",
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
  "Ecwid, now Ecwid by Lightspeed, adds a store to a site you already have. The catalog arrives as a JavaScript widget, which is what makes it quick to install and hard to read. Fetch the page with scripts off and you often get the host page and an empty container.",
  "Ecwid does prerender for some crawlers and some hosting setups, and its WordPress plugin renders server-side. Coverage is uneven across custom sites and Instant Site, and it is not safe to assume a given client gets the rendered version. Checking costs one request, so make the request.",
  "Instant Site is the tightest case. It generates meta tags but offers no injection point for your own JSON-LD, so the schema you get is the schema you keep. Embedding Ecwid on a site whose markup you control is the practical route to fixing most of what turns up here.",
  "Where you control the host page, Ecwid's REST API returns products, combinations and categories, and you can render JSON-LD server-side from it. Beseam shows which fields are missing from the served HTML and what the API already holds. The rendering change is yours to make; Beseam only reads.",
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
      headline="Your Ecwid catalog lives inside a JavaScript widget"
      description="Beseam requests your Ecwid pages the way a crawler does, with and without JavaScript, and reports the difference. You get the product data missing from the served HTML, the evidence, and a server-side fix using Ecwid's API for someone on your team to apply."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
