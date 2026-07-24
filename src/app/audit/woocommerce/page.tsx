import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your WooCommerce Store?",
  description:
    "WooCommerce stores frequently have missing or broken JSON-LD. Beseam audits how AI engines read your product pages and generates targeted fixes.",
  keywords: [
    "WooCommerce AI optimization",
    "ChatGPT WooCommerce",
    "WooCommerce structured data",
    "WooCommerce JSON-LD",
    "WooCommerce schema markup",
  ],
};

const findings: Finding[] = [
  {
    title: "Missing or incomplete JSON-LD product schema",
    severity: "critical",
    description:
      "WooCommerce relies on plugins like Yoast or Rank Math to generate JSON-LD. Many stores have misconfigured or outdated plugins that emit incomplete Product schema - missing brand, GTIN, material, and selling points that AI engines need.",
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
    title: "Conflicting schema from multiple SEO plugins",
    severity: "high",
    description:
      "WooCommerce stores often run multiple plugins that each emit their own schema - Yoast, Rank Math, WooCommerce itself, and theme-level schema. AI engines see conflicting data and pick the wrong values for price, availability, or product type.",
    fix: `// Disable duplicate schema sources - keep one authoritative source
// In functions.php, remove WooCommerce default schema:
remove_action('wp_footer',
  ['WC_Structured_Data', 'output_structured_data'], 10);

// Then ensure your primary SEO plugin (e.g., Rank Math) is the
// single source of Product schema. Audit with:
// https://validator.schema.org/`,
  },
  {
    title: "Variable products emit only parent pricing",
    severity: "high",
    description:
      "WooCommerce variable products often emit the parent product's price range rather than individual variant prices. AI engines tell shoppers a product costs '$29–$89' instead of the specific variant price they asked about.",
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
    title: "Product descriptions are thin or auto-generated",
    severity: "medium",
    description:
      "Many WooCommerce stores use manufacturer-provided descriptions that are short, generic, or duplicated across sites. AI engines have nothing unique to cite when deciding whether to recommend your product over a competitor selling the same item.",
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
  "WooCommerce powers roughly 25% of all online stores, but its approach to structured data is plugin-dependent rather than built-in. This creates the most fragmented schema environment of any major e-commerce platform.",
  "The most common AI readability issue on WooCommerce is conflicting schema from multiple sources. WooCommerce core, your SEO plugin, and your theme may all emit Product schema simultaneously - and they often disagree on price, availability, and product type.",
  "Variable products are another major gap. WooCommerce's default schema for variable products emits a price range rather than per-variant pricing. When a shopper asks ChatGPT 'how much does the red medium cost?', AI can only say '$29–$89' instead of a specific price.",
  "Plugin fragmentation also means that review schema, breadcrumb schema, and FAQ schema may be duplicated or missing depending on which combination of plugins you run. AI engines see the mess and lose confidence in your product data.",
  "Beseam audits your WooCommerce store for all of these issues, identifies which plugins are emitting conflicting data, and generates the specific PHP and schema fixes needed to give AI engines clean, authoritative product information.",
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
      headline="How does AI see your WooCommerce store?"
      description="WooCommerce's plugin-dependent schema creates the most fragmented AI readability profile of any platform. Beseam finds the conflicts and fixes them."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
