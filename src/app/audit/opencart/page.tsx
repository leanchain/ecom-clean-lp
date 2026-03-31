import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your OpenCart Store?",
  description:
    "OpenCart stores often lack structured data entirely. Beseam audits how AI engines read your product pages and generates the schema OpenCart doesn't provide.",
  keywords: [
    "OpenCart AI optimization",
    "ChatGPT OpenCart",
    "OpenCart structured data",
    "OpenCart JSON-LD",
    "OpenCart product schema",
  ],
};

const findings: Finding[] = [
  {
    title: "No built-in Product JSON-LD schema",
    severity: "critical",
    description:
      "OpenCart does not include Product JSON-LD schema in its default installation. AI engines parsing your product pages see raw HTML content but no machine-readable structured data — making your products invisible to AI-powered recommendations.",
    fix: `<!-- Add to catalog/view/theme/yourtheme/template/product/product.twig -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ heading_title }}",
  "description": "{{ meta_description }}",
  "image": "{{ thumb }}",
  "sku": "{{ model }}",
  "brand": {
    "@type": "Brand",
    "name": "{{ manufacturer }}"
  },
  "offers": {
    "@type": "Offer",
    "price": "{{ price_raw }}",
    "priceCurrency": "{{ currency_code }}",
    "availability": "{% if stock_status == 'In Stock' %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
    "url": "{{ canonical }}"
  }
  {% if rating %}
  ,"aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{ rating }}",
    "reviewCount": "{{ reviews | length }}"
  }
  {% endif %}
}
</script>`,
  },
  {
    title: "Product attributes not exposed to AI engines",
    severity: "high",
    description:
      "OpenCart supports product attributes (weight, dimensions, custom fields) but these are only rendered as HTML tables. AI engines can't reliably parse HTML tables for product specifications — they need structured data.",
    fix: `<!-- In product.twig, add attributes as PropertyValue schema -->
{% if attribute_groups %}
  "additionalProperty": [
    {% for group in attribute_groups %}
      {% for attr in group.attribute %}
      {
        "@type": "PropertyValue",
        "name": "{{ attr.name }}",
        "value": "{{ attr.text | striptags }}"
      }{% if not loop.last or not loop.parent.loop.last %},{% endif %}
      {% endfor %}
    {% endfor %}
  ]
{% endif %}`,
  },
  {
    title: "Product options lack per-variant pricing in schema",
    severity: "high",
    description:
      "OpenCart product options (size, color, etc.) can have price modifiers, but there's no schema output for individual option combinations. AI engines see only the base price, not the actual price a shopper would pay for a specific configuration.",
    fix: `<!-- Add option-level Offer schema -->
<!-- In your product controller (catalog/controller/product/product.php): -->

// Build offers array from options
$offers = [];
foreach ($product_options as $option) {
  foreach ($option['product_option_value'] as $value) {
    $price = $base_price;
    if ($value['price_prefix'] == '+') {
      $price += $value['price'];
    } else {
      $price -= $value['price'];
    }
    $offers[] = [
      '@type' => 'Offer',
      'name' => $option['name'] . ': ' . $value['name'],
      'price' => number_format($price, 2, '.', ''),
      'priceCurrency' => $currency_code,
      'availability' => ($value['quantity'] > 0 || !$value['subtract'])
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    ];
  }
}`,
  },
  {
    title: "Category pages have no structured data",
    severity: "medium",
    description:
      "OpenCart category pages display product listings but emit no CollectionPage or ItemList schema. AI engines can't understand your catalog hierarchy or how products relate to categories.",
    fix: `<!-- Add to catalog/view/theme/yourtheme/template/product/category.twig -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{ heading_title }}",
  "description": "{{ meta_description }}",
  "url": "{{ canonical }}",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": {{ products | length }},
    "itemListElement": [
      {% for product in products %}
      {
        "@type": "ListItem",
        "position": {{ loop.index }},
        "url": "{{ product.href }}"
      }{% if not loop.last %},{% endif %}
      {% endfor %}
    ]
  }
}
</script>`,
  },
];

const contextParagraphs = [
  "OpenCart is a free, open-source e-commerce platform used by hundreds of thousands of stores worldwide. It's known for its simplicity and low barrier to entry — but this simplicity extends to its structured data, which is virtually nonexistent by default.",
  "The most critical AI readability issue on OpenCart is the complete absence of Product JSON-LD schema. Unlike Shopify or BigCommerce, OpenCart doesn't generate any structured data out of the box. AI engines see your product pages as plain HTML with no machine-readable product information.",
  "OpenCart's rich attribute system — where you can define custom product specifications like material, weight, dimensions — is only rendered as HTML tables in the browser. AI engines can't reliably extract product attributes from HTML table markup.",
  "The extension marketplace has some schema plugins, but quality varies widely and many are outdated for the latest OpenCart versions. Most stores end up with either no schema or broken schema from an incompatible extension.",
  "Beseam audits your OpenCart store from the perspective of 13 AI engines, identifies the complete schema gap, and generates the exact Twig template code to add comprehensive Product, Collection, and Rating schema to your store.",
];

const otherPlatforms = [
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "PrestaShop", href: "/audit/prestashop" },
  { name: "Adobe Commerce (Magento)", href: "/audit/magento" },
  { name: "Shopware", href: "/audit/shopware" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function OpenCartAuditPage() {
  return (
    <PlatformAuditPage
      platform="OpenCart"
      headline="How does AI see your OpenCart store?"
      description="OpenCart stores have zero structured data by default. AI engines can't see your products at all. Beseam shows you exactly what's missing."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
