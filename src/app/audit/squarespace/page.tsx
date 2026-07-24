import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Squarespace Store?",
  description:
    "Squarespace stores have limited structured data and restricted schema customization. Beseam audits how AI engines read your product pages and shows you what to fix.",
  keywords: [
    "Squarespace AI optimization",
    "ChatGPT Squarespace",
    "Squarespace structured data",
    "Squarespace product schema",
    "Squarespace e-commerce AI",
  ],
};

const findings: Finding[] = [
  {
    title: "Product schema is auto-generated and minimal",
    severity: "critical",
    description:
      "Squarespace auto-generates Product schema that includes name, price, image, and availability - but omits brand, material, selling points, use cases, and every product detail AI engines need to make confident recommendations. You cannot edit this schema directly.",
    fix: `<!-- Squarespace Code Injection (Settings > Advanced > Code Injection) -->
<!-- Add this to your Product Page's "Page Header Code Injection" -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Your Product Name",
  "brand": { "@type": "Brand", "name": "Your Brand" },
  "description": "Rich, AI-readable description with selling points",
  "material": "Premium organic cotton, 180 GSM",
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Ideal For", "value": "Everyday wear, travel" },
    { "@type": "PropertyValue", "name": "Key Benefit", "value": "Wrinkle-resistant, machine washable" }
  ]
}
</script>

<!-- Note: This creates a second Product schema alongside Squarespace's default.
     Use Beseam to ensure they don't conflict. -->`,
  },
  {
    title: "No control over schema output without code injection",
    severity: "high",
    description:
      "Squarespace doesn't expose schema editing through its visual editor. The only way to modify structured data is via Code Injection - which requires a Business plan or higher and is manual per-page. Most stores never touch it.",
    fix: `<!-- Squarespace Business/Commerce plan required -->
<!-- Settings > Advanced > Code Injection > Footer -->

<!-- Approach 1: Override per-product via page-level injection -->
<!-- Product pages > Settings > Advanced > Page Header Code Injection -->

<!-- Approach 2: Use a Squarespace plugin / third-party service -->
<!-- Beseam can audit and recommend the exact JSON-LD to inject -->

<!-- Approach 3: Use Squarespace's Custom CSS to hide default -->
<!-- and inject corrected schema via global code injection -->

<!-- Verify your schema: -->
<!-- https://validator.schema.org/?url=YOUR_PRODUCT_URL -->`,
  },
  {
    title: "Category/collection pages have zero structured data",
    severity: "high",
    description:
      "Squarespace product category pages display product grids visually but emit no ItemList or CollectionPage schema. AI engines crawling your store cannot discover product-to-category relationships or understand your catalog structure.",
    fix: `<!-- Add to global Code Injection (Footer) with conditional logic -->
<script>
  // Only run on collection/category pages
  if (window.location.pathname.includes('/shop/')) {
    // Extract product links from the page
    const products = document.querySelectorAll('[data-item-id] a[href*="/product/"]');
    const items = Array.from(products).map((el, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: el.href
    }));

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': document.querySelector('h1')?.textContent || 'Products',
      'mainEntity': {
        '@type': 'ItemList',
        'numberOfItems': items.length,
        'itemListElement': items
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
</script>`,
  },
  {
    title: "Product descriptions lack AI-readable structure",
    severity: "medium",
    description:
      "Squarespace product descriptions are freeform rich text. Most stores write marketing-heavy prose that reads well to humans but lacks the specification-dense structure AI engines prefer - bullet-pointed materials, dimensions, care instructions, and comparisons.",
    fix: `<!-- Structure your Squarespace product descriptions for AI readability -->
<!-- In the product editor, format descriptions like this: -->

<p><strong>What makes it different:</strong> The only crossbody bag with a
hidden laptop sleeve and RFID-blocking pocket.</p>

<ul>
  <li><strong>Material:</strong> Full-grain Italian leather, YKK zippers</li>
  <li><strong>Dimensions:</strong> 12" × 9" × 4" - fits laptops up to 13"</li>
  <li><strong>Weight:</strong> 1.2 lbs</li>
  <li><strong>Ideal for:</strong> Daily commuting, travel, weekend trips</li>
</ul>

<p><strong>Compared to similar bags:</strong> 40% lighter than the Bellroy
Classic Backpack with the same laptop protection.</p>

<!-- AI engines extract structured lists and bold labels much better
     than flowing prose. -->`,
  },
];

const contextParagraphs = [
  "Squarespace is known for its beautiful templates and ease of use, making it a popular choice for design-focused e-commerce stores. However, its closed ecosystem means you have very limited control over the structured data AI engines read.",
  "The biggest AI readability issue on Squarespace is that product schema is auto-generated and cannot be edited through the visual editor. Squarespace outputs basic Product schema - name, price, image - but omits brand, material, selling points, and every rich attribute AI engines need to recommend your product.",
  "Unlike open platforms like Shopify or WooCommerce, Squarespace doesn't have a theme file editor or plugin ecosystem for schema. Your only option is Code Injection (available on Business plan and above), which requires manual JSON-LD per product page - impractical for stores with more than a handful of products.",
  "Category and collection pages are another major gap. Squarespace displays product grids beautifully, but emits zero CollectionPage or ItemList schema. AI engines parsing your store see isolated products with no catalog structure.",
  "Beseam audits what AI engines actually see on your Squarespace store, identifies the specific schema gaps, and generates the exact Code Injection snippets you need - or recommends when migrating to a more flexible platform makes sense for AI visibility.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "Wix", href: "/audit/wix" },
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "Big Cartel", href: "/audit/big-cartel" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function SquarespaceAuditPage() {
  return (
    <PlatformAuditPage
      platform="Squarespace"
      headline="How does AI see your Squarespace store?"
      description="Squarespace makes beautiful stores - but locks you out of the structured data AI engines need. Beseam shows you what's missing and how to fix it."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
