import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Squarespace product data audit",
  description:
    "Beseam reads the Product and collection markup Squarespace emits, then returns the gaps, the evidence, and the code injection needed to close them.",
  keywords: [
    "Squarespace structured data",
    "Squarespace product schema",
    "Squarespace code injection",
    "Squarespace commerce SEO",
    "Squarespace product page markup",
  ],
};

const findings: Finding[] = [
  {
    title: "Generated Product schema carries no brand or specifics",
    severity: "critical",
    description:
      "Squarespace emits name, price, image and availability, then stops. There is no brand, material, dimension or use-case field in the output and no editor control to add one. An assistant comparing three linen shirts has nothing from you beyond a price, so it ranks on whoever supplied detail.",
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
    title: "Code injection is the only override path",
    severity: "high",
    description:
      "Structured data is not exposed in the Squarespace editor. Changing it means code injection, which needs a Business plan or higher and is applied by hand, page by page. Stores with more than a few products rarely do it, so the generated minimum is what assistants read across the catalog.",
    fix: `<!-- Squarespace Business/Commerce plan required -->
<!-- Settings > Advanced > Code Injection > Footer -->

<!-- Approach 1: Override per-product via page-level injection -->
<!-- Product pages > Settings > Advanced > Page Header Code Injection -->

<!-- Approach 2: Use a Squarespace plugin / third-party service -->
<!-- Beseam can audit and recommend the exact JSON-LD to inject -->

<!-- Approach 3: Merge, don't duplicate. Squarespace's own Product -->
<!-- block stays in the page and CSS cannot remove it, since JSON-LD -->
<!-- is never rendered. Read it first, then add only what it lacks. -->

<!-- Verify your schema: -->
<!-- https://validator.schema.org/?url=YOUR_PRODUCT_URL -->`,
  },
  {
    title: "Shop pages emit no collection markup",
    severity: "high",
    description:
      "Squarespace category pages render a product grid with no CollectionPage or ItemList block. Nothing in the markup states which products belong to which category. An assistant answering a category-shaped question has to infer your catalog one page at a time, and usually stops before it gets there.",
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
    title: "Descriptions read as prose, not specification",
    severity: "medium",
    description:
      "Squarespace product descriptions are freeform rich text, and most read as marketing paragraphs. Materials, dimensions, weight and care sit inside sentences rather than on labelled lines. An assistant asked whether the bag fits a 13-inch laptop cannot answer from prose it has to interpret, so it skips your product.",
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

<p><strong>Compared to similar bags:</strong> [your own verified
comparison here, with the measurement it came from]</p>

<!-- AI engines extract structured lists and bold labels much better
     than flowing prose. -->`,
  },
];

const contextParagraphs = [
  "Squarespace emits Product schema on commerce pages without being asked: name, image, price, availability. The visual editor has no field for the rest. Brand, material, dimensions, care instructions and the reasons someone should buy this one stay inside your description text, where they are prose rather than markup.",
  "The only override is code injection, which sits behind a Business or Commerce plan and is applied per page or site-wide. Adding a second Product block alongside the generated one can leave two conflicting descriptions of the same item, so read what is already on the page before you inject anything.",
  "Shop and category pages are the wider gap. Squarespace renders the grid but emits no CollectionPage or ItemList markup. An assistant asked which shops sell linen aprons meets your products one at a time, with nothing in the page saying they belong to a category or to each other.",
  "Beseam fetches your pages, parses what Squarespace actually emitted, and lists what is missing against the catalog you already maintain. Each item carries the response it came from and a snippet for code injection. Beseam is read-only; nothing reaches your site until someone on your team applies it.",
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
      headline="Squarespace generates your product schema; you cannot edit it"
      description="Beseam reads the JSON-LD on your Squarespace product and shop pages the way an assistant would, then returns each gap with the evidence behind it and the code injection snippet that closes it. You decide whether to paste it in."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
