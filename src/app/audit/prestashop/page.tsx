import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your PrestaShop Store?",
  description:
    "PrestaShop stores have configurable schema but most run defaults that leave critical AI readability gaps. Beseam audits and generates targeted fixes.",
  keywords: [
    "PrestaShop AI optimization",
    "ChatGPT PrestaShop",
    "PrestaShop structured data",
    "PrestaShop schema markup",
    "PrestaShop SEO AI",
  ],
};

const findings: Finding[] = [
  {
    title: "Default Product schema misses rich attributes",
    severity: "critical",
    description:
      "PrestaShop's built-in schema module outputs basic Product JSON-LD — name, description, image, price, and availability. Custom features, materials, selling points, and product-specific attributes stored in your catalog are not included in the schema output.",
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
    title: "Combination/variant pricing not reflected in schema",
    severity: "high",
    description:
      "PrestaShop products with combinations (size/color variants) emit schema with only the default combination's price. AI engines can't provide accurate pricing for specific variants when shoppers ask.",
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
    title: "Module conflicts create duplicate schema",
    severity: "high",
    description:
      "PrestaShop's module ecosystem often results in multiple SEO modules emitting their own schema — the core module, third-party SEO modules, and theme-level schema can all conflict, giving AI engines contradictory product data.",
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
    title: "Multi-language stores miss hreflang and localized schema",
    severity: "medium",
    description:
      "PrestaShop's multi-language feature serves product pages in different languages under the same URL with a language prefix. Without proper hreflang tags and localized schema, AI engines may index the wrong language version or mix languages in recommendations.",
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
  "PrestaShop is one of the most popular open-source e-commerce platforms, particularly in Europe and Latin America. It powers over 300,000 stores and offers full control over structured data through its module and template system.",
  "The most common AI readability problem on PrestaShop is that the default schema output is basic. PrestaShop's core emits Product schema with name, price, and availability — but your carefully configured product features, materials, and attributes are stored in the database without ever appearing in structured data.",
  "Module conflicts are another frequent issue. PrestaShop's marketplace has dozens of SEO and schema modules, and stores that install multiple modules end up with duplicate or conflicting structured data. AI engines see two different prices or availability statuses and lose confidence in your data.",
  "Multi-language deployments add complexity. PrestaShop handles multiple languages well in the admin, but the schema output often defaults to the primary language regardless of which language the user (or AI crawler) is viewing.",
  "Beseam audits your PrestaShop store across 118+ AI readability checks, identifies schema conflicts from multiple modules, and generates the exact PHP and Smarty template fixes for your specific setup.",
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
      headline="How does AI see your PrestaShop store?"
      description="PrestaShop gives you full schema control — but most stores run the defaults. Beseam finds what's missing and generates the fixes."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
