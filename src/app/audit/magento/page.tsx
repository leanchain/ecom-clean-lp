import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Adobe Commerce (Magento) Store?",
  description:
    "Adobe Commerce / Magento stores have powerful schema capabilities but critical AI readability gaps. Beseam audits how 13 AI engines read your product pages.",
  keywords: [
    "Magento AI optimization",
    "Adobe Commerce structured data",
    "ChatGPT Magento",
    "Magento schema markup",
    "Adobe Commerce AI readability",
  ],
};

const findings: Finding[] = [
  {
    title: "Default schema outputs minimal product attributes",
    severity: "critical",
    description:
      "Magento's built-in structured data module emits basic Product schema - name, image, price - but omits rich attributes like material, size charts, compatibility, and selling points stored in product attributes. AI engines see a bare listing with nothing to differentiate it.",
    fix: `// app/code/YourModule/view/frontend/templates/product/jsonld.phtml
<?php
$product = $block->getProduct();
$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'Product',
    'name' => $product->getName(),
    'description' => strip_tags($product->getDescription()),
    'brand' => ['@type' => 'Brand', 'name' => $product->getAttributeText('brand')],
    'material' => $product->getAttributeText('material'),
    'additionalProperty' => [],
];
// Add all visible attributes as PropertyValue
foreach ($product->getAttributes() as $attr) {
    if ($attr->getIsVisibleOnFront() && $product->getData($attr->getAttributeCode())) {
        $schema['additionalProperty'][] = [
            '@type' => 'PropertyValue',
            'name' => $attr->getFrontendLabel(),
            'value' => $product->getAttributeText($attr->getAttributeCode())
                       ?: $product->getData($attr->getAttributeCode()),
        ];
    }
}
?>
<script type="application/ld+json">
<?= json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) ?>
</script>`,
  },
  {
    title: "Configurable products show price range, not variant prices",
    severity: "critical",
    description:
      "Magento configurable products display a price range ('From $49.00') in both the UI and schema. AI engines can't tell shoppers the price of a specific size or color - they can only quote the range, which feels unreliable.",
    fix: `// Generate per-variant Offer schema for configurable products
$offers = [];
foreach ($product->getTypeInstance()->getUsedProducts($product) as $child) {
    $offers[] = [
        '@type' => 'Offer',
        'name' => $child->getName(),
        'sku' => $child->getSku(),
        'price' => $child->getFinalPrice(),
        'priceCurrency' => $store->getCurrentCurrencyCode(),
        'availability' => $child->isSaleable()
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        'url' => $product->getProductUrl(),
    ];
}
$schema['offers'] = $offers;`,
  },
  {
    title: "Multi-store views cause canonical and schema conflicts",
    severity: "high",
    description:
      "Magento's multi-store architecture often serves the same product on different store views with different URLs, currencies, and languages. Without proper hreflang and canonical tags, AI engines index duplicate pages and may surface the wrong store view's pricing.",
    fix: `<!-- In catalog_product_view.xml layout, add canonical and hreflang -->
<head>
  <link rel="canonical" href="<?= $block->getProduct()->getProductUrl() ?>" />
  <!-- For each store view: -->
  <link rel="alternate" hreflang="en-us"
        href="https://us.yourstore.com/product-url" />
  <link rel="alternate" hreflang="en-gb"
        href="https://uk.yourstore.com/product-url" />
</head>

<!-- Ensure schema uses the canonical store view's currency -->
"priceCurrency": "<?= $block->getCurrentCurrencyCode() ?>"`,
  },
  {
    title: "Layered navigation pages lack structured data",
    severity: "medium",
    description:
      "Magento's layered navigation generates filtered category pages dynamically, but these pages have no CollectionPage or ItemList schema. AI engines can't understand filtered product sets or category relationships.",
    fix: `// Add ItemList schema to category pages
// app/code/YourModule/view/frontend/templates/category/jsonld.phtml
<?php
$category = $block->getCurrentCategory();
$products = $block->getProductCollection();
$items = [];
foreach ($products as $i => $product) {
    $items[] = [
        '@type' => 'ListItem',
        'position' => $i + 1,
        'url' => $product->getProductUrl(),
    ];
}
$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'CollectionPage',
    'name' => $category->getName(),
    'description' => strip_tags($category->getDescription()),
    'mainEntity' => [
        '@type' => 'ItemList',
        'numberOfItems' => count($items),
        'itemListElement' => $items,
    ],
];
?>
<script type="application/ld+json">
<?= json_encode($schema, JSON_UNESCAPED_SLASHES) ?>
</script>`,
  },
];

const contextParagraphs = [
  "Adobe Commerce (formerly Magento) is one of the most powerful e-commerce platforms, used by mid-market and enterprise brands worldwide. Its attribute system can store hundreds of product properties - but very few of them make it into structured data by default.",
  "The most common AI readability issue on Magento stores is sparse Product schema. Magento's core module outputs name, image, and a basic Offer - but materials, certifications, size guides, and selling points stored in product attributes are invisible to AI engines.",
  "Configurable products compound the problem. Magento's default schema emits a price range ('From $49') rather than individual variant prices. When ChatGPT or Gemini tells a shopper the product 'starts at $49,' it undermines trust and may lose the sale to a competitor whose schema shows the exact price.",
  "Multi-store and multi-language deployments are another challenge. The same product on different store views can have different prices, descriptions, and currencies - and without proper canonical/hreflang tags, AI engines can serve the wrong version.",
  "Beseam audits your Magento store from the AI engine's perspective, identifies exactly which attributes and schema are missing, and generates the PHP and template fixes for your specific Magento version and theme.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
  { name: "Salesforce Commerce Cloud", href: "/audit/salesforce-commerce-cloud" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function MagentoAuditPage() {
  return (
    <PlatformAuditPage
      platform="Adobe Commerce (Magento)"
      headline="How does AI see your Magento store?"
      description="Magento stores have the richest attribute systems in e-commerce - but almost none of that data reaches AI engines. Beseam fixes that."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
