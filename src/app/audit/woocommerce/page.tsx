import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "WooCommerce product data audit",
  description:
    "Check the JSON-LD your WooCommerce plugins and theme emit on product pages. Get an evidence-backed list of conflicts and gaps, plus a proposed fix.",
  keywords: [
    "WooCommerce structured data",
    "WooCommerce JSON-LD",
    "WooCommerce product schema",
    "WooCommerce variable product pricing",
    "WooCommerce schema conflicts",
  ],
};

const findings: Finding[] = [
  {
    title: "Product JSON-LD incomplete or missing",
    severity: "critical",
    description:
      "WooCommerce leaves most structured data to plugins. When one is misconfigured, outdated, or scoped to the wrong post type, product pages ship without brand, SKU, GTIN, or a usable description. An assistant reading the page has no identifier to match your product against the same item elsewhere.",
    fix: `// functions.php - Add complete Product JSON-LD
add_action('wp_head', function() {
  if (!is_product()) return;
  global $product;
  $schema = [
    '@context' => 'https://schema.org',
    '@type' => 'Product',
    'name' => $product->get_name(),
    'description' => wp_strip_all_tags($product->get_description()),
    'brand' => ['@type' => 'Brand', 'name' => $product->get_attribute('brand')],
    'sku' => $product->get_sku(),
    'offers' => [
      '@type' => 'Offer',
      'price' => $product->get_price(),
      'priceCurrency' => get_woocommerce_currency(),
      'availability' => $product->is_in_stock()
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    ],
  ];
  echo '<script type="application/ld+json">'
    . wp_json_encode($schema, JSON_UNESCAPED_SLASHES)
    . '</script>';
});`,
  },
  {
    title: "Core, SEO plugin, and theme disagree",
    severity: "high",
    description:
      "WooCommerce core, Yoast or Rank Math, and the theme can each output Product schema on the same page. When their price or availability values differ, a parser has no rule for choosing, and the value repeated back to a shopper may be the stale one.",
    fix: `// Disable duplicate schema sources - keep one authoritative source
// In functions.php, remove WooCommerce default schema:
remove_action('wp_footer',
  ['WC_Structured_Data', 'output_structured_data'], 10);

// Then ensure your primary SEO plugin (e.g., Rank Math) is the
// single source of Product schema. Audit with:
// https://validator.schema.org/`,
  },
  {
    title: "Variable products emit a price range",
    severity: "high",
    description:
      "Default schema for a variable product carries the parent's range instead of an Offer per variation. A shopper asking about one size gets a span like $29–$89 back from an assistant, with no way to confirm the price of the combination they actually want.",
    fix: `// Add per-variation Offer schema
add_filter('woocommerce_structured_data_product_offer', function($offer, $product) {
  if ($product->is_type('variable')) {
    $variations = $product->get_available_variations();
    $offers = array_map(function($v) use ($product) {
      $variation = wc_get_product($v['variation_id']);
      return [
        '@type' => 'Offer',
        'name' => implode(' / ', $v['attributes']),
        'price' => $variation->get_price(),
        'priceCurrency' => get_woocommerce_currency(),
        'availability' => $variation->is_in_stock()
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      ];
    }, $variations);
    return $offers;
  }
  return $offer;
}, 10, 2);`,
  },
  {
    title: "Descriptions duplicated from the manufacturer",
    severity: "medium",
    description:
      "Supplier copy pasted into the product description appears word for word on every retailer selling the same item. Nothing on your page is unique to you, so an assistant choosing between identical listings has no basis for naming your store rather than another.",
    fix: `<!-- Add rich, AI-readable content to product descriptions -->
<!-- In your product editor, include: -->

<!-- 1. Unique selling proposition (first sentence) -->
<!-- 2. Key specifications in a structured list -->
<!-- 3. Use case / who this is for -->
<!-- 4. What makes it different from competitors -->

<!-- Example: -->
<p>The TrailRunner Pro 3 is built for ultra-distance runners
who need cushioning that lasts past mile 50.</p>
<ul>
  <li>32mm stack height with carbon fiber plate</li>
  <li>Vibram Megagrip outsole for wet trail traction</li>
  <li>195g per shoe (men's size 9)</li>
</ul>
<p>Unlike the Hoka Speedgoat, the TrailRunner Pro 3 uses a
wider toe box and rockered geometry designed specifically
for 100-mile races.</p>`,
  },
];

const contextParagraphs = [
  "WooCommerce ships its own structured data class, most stores add Yoast or Rank Math on top, and the theme injects whatever it injects. Each writes Product schema. Nothing arbitrates between them, so one product page can carry several JSON-LD blocks that disagree on price, availability, or type.",
  "Variable products are the second recurring problem. Core emits the parent's price range rather than an Offer per variation, so the structured data answers with a span where the shopper asked about one combination. An assistant can only repeat the span, which reads as evasive.",
  "Identifiers go missing next. Brand, GTIN, and MPN usually sit in product attributes or a plugin's custom fields, and the default schema does not map them across. Without identifiers, your listing cannot be matched to the same item sold elsewhere, so the page stands alone.",
  "Beseam requests your product pages the way a crawler does, parses each JSON-LD block separately, and reports which source emitted which value. It proposes the PHP or plugin configuration change. Beseam does not edit WordPress — your developer applies the fix.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function WooCommerceAuditPage() {
  return (
    <PlatformAuditPage
      platform="WooCommerce"
      headline="Four plugins, four versions of your product"
      description="Beseam reads every JSON-LD block your WooCommerce stack renders — core, SEO plugin, and theme — and shows where they disagree. The output is an evidence-backed list of gaps and a proposed fix, not an automatic change."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
