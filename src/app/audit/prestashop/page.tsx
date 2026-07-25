import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "PrestaShop product data audit",
  description:
    "Beseam checks the Product JSON-LD your PrestaShop theme and modules emit, finds conflicts and gaps, and returns evidence with a proposed fix.",
  keywords: [
    "PrestaShop structured data",
    "PrestaShop product schema",
    "PrestaShop JSON-LD module",
    "PrestaShop combinations schema",
    "PrestaShop Smarty template schema",
  ],
};

const findings: Finding[] = [
  {
    title: "Product features never reach the schema block",
    severity: "critical",
    description:
      "The core theme prints name, description, image, price, and availability. Everything you configured as a feature or attribute — material, capacity, certification, compatibility — stays in the database. An assistant comparing your product against a competitor has the name and the price, and no reason to prefer yours.",
    fix: `// Override ProductController or use a custom module
// modules/yourmodule/override/controllers/front/ProductController.php

public function initContent()
{
    parent::initContent();
    $product = $this->product;
    $features = $product->getFrontFeatures($this->context->language->id);

    $additionalProperties = [];
    foreach ($features as $feature) {
        $additionalProperties[] = [
            '@type' => 'PropertyValue',
            'name' => $feature['name'],
            'value' => $feature['value'],
        ];
    }

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Product',
        'name' => $product->name,
        'brand' => ['@type' => 'Brand', 'name' => $product->manufacturer_name],
        'sku' => $product->reference,
        'gtin13' => $product->ean13,
        'additionalProperty' => $additionalProperties,
    ];

    $this->context->smarty->assign('richSchema', json_encode($schema));
}`,
  },
  {
    title: "Combination prices missing from the offer block",
    severity: "high",
    description:
      "PrestaShop emits one offer built from the default combination. A catalog with size or capacity ranges therefore publishes a single price for a product that sells across a wide band. A shopper told one number by an assistant and shown another in the cart is a shopper who leaves.",
    fix: `// Add per-combination Offer schema
$combinations = $product->getAttributeCombinations($this->context->language->id);
$offers = [];
$grouped = [];

foreach ($combinations as $combo) {
    $grouped[$combo['id_product_attribute']]['attrs'][] =
        $combo['group_name'] . ': ' . $combo['attribute_name'];
    $grouped[$combo['id_product_attribute']]['price'] = $combo['price'];
    $grouped[$combo['id_product_attribute']]['quantity'] = $combo['quantity'];
}

foreach ($grouped as $id => $data) {
    $offers[] = [
        '@type' => 'Offer',
        'name' => implode(' / ', $data['attrs']),
        'price' => Product::getPriceStatic($product->id, true, $id),
        'priceCurrency' => $this->context->currency->iso_code,
        'availability' => $data['quantity'] > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
    ];
}

$schema['offers'] = $offers;`,
  },
  {
    title: "Several modules print schema on one page",
    severity: "high",
    description:
      "The core block, an SEO module, a rich-snippet module, and a theme override can each emit their own script tag. The page then carries contradictory prices and availability for the same product. Contradiction is worse than absence: a parser that cannot reconcile the two may discard both.",
    fix: `// 1. Identify all schema sources
// Check: Back Office > Modules > Search "schema" or "structured data"
// Common culprits: SEO Expert, Google Rich Snippets, theme modules

// 2. Disable all but one authoritative source
// Keep ONLY your primary SEO module's schema output

// 3. Verify with schema validator:
// https://validator.schema.org/?url=YOUR_PRODUCT_URL

// 4. In your theme's product.tpl, check for duplicate script tags:
// grep -r "application/ld+json" themes/your-theme/templates/

// Remove any hardcoded schema in template files if using a module`,
  },
  {
    title: "Language versions share one schema block",
    severity: "medium",
    description:
      "PrestaShop serves each language under its own URL prefix, but the emitted description and offer often stay in the shop's default language, and hreflang alternates are frequently incomplete. An assistant answering in French can quote your English copy, or treat the two URLs as two separate products.",
    fix: `<!-- In your theme's head section (themes/your-theme/templates/_partials/head.tpl) -->
{foreach $languages as $language}
  <link rel="alternate"
        hreflang="{$language.iso_code}"
        href="{$link->getProductLink($product, null, null, null, $language.id)}" />
{/foreach}
<link rel="alternate" hreflang="x-default"
      href="{$link->getProductLink($product, null, null, null, $defaultLanguage)}" />

<!-- Ensure schema description matches the current language -->
<!-- Use Smarty variable: {$product.description|strip_tags|truncate:500} -->`,
  },
];

const contextParagraphs = [
  "PrestaShop 1.7 and 8 emit Product JSON-LD from the core theme, covering name, description, image, price, and availability. The features and attributes you configured in the back office — material, capacity, compatibility — live in the feature tables and never reach the schema block.",
  "Combinations are the second gap. The emitted offer carries the default combination's price and stock. A shopper asking an assistant what the large costs gets the price of whichever combination happens to be default, which on discounted ranges is often the cheapest one.",
  "Module stacking causes the messiest failures. The core block, an SEO module, a rich-snippet module, and a theme override can each print a script tag on the same page. A parser then sees two prices and two availability values for one product, with no rule for choosing.",
  "Beseam reads the pages as they are served, in each active language, and reports what it found. It does not install modules, edit templates, or change your shop. Each finding names the source that emitted it and comes with a proposed override for your developer to review.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "Adobe Commerce (Magento)", href: "/audit/magento" },
  { name: "OpenCart", href: "/audit/opencart" },
  { name: "Shopware", href: "/audit/shopware" },
];

export default function PrestaShopAuditPage() {
  return (
    <PlatformAuditPage
      platform="PrestaShop"
      headline="Your PrestaShop modules disagree about price and stock"
      description="Beseam reads every JSON-LD block your PrestaShop pages emit, from the core theme, your template, and each installed module, then reports where they conflict, where combinations are missing, and where fields are empty. You get the evidence and a proposed override, not an automatic edit."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
