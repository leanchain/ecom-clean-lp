import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "OpenCart product data audit",
  description:
    "OpenCart ships no Product JSON-LD. Beseam checks what your theme and extensions emit, and returns the gaps with evidence and a proposed Twig fix.",
  keywords: [
    "OpenCart structured data",
    "OpenCart product schema",
    "OpenCart JSON-LD",
    "OpenCart Twig template schema",
    "OpenCart product options pricing",
  ],
};

const findings: Finding[] = [
  {
    title: "No Product JSON-LD in the default theme",
    severity: "critical",
    description:
      "OpenCart's stock templates emit no structured data for products. Price, stock status, and model are present as text only. An assistant answering a question about availability has to read a phrase out of a div, and it will read it wrong on themes that translate or restyle that label.",
    fix: `<!-- Add to catalog/view/theme/yourtheme/template/product/product.twig -->
<!-- The default controller only exposes formatted values, so assign
     price_raw, currency_code and review_count in
     catalog/controller/product/product.php before using them here. -->
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
    "reviewCount": "{{ review_count }}"
  }
  {% endif %}
}
</script>`,
  },
  {
    title: "Attributes render as a table, not data",
    severity: "high",
    description:
      "Attribute groups appear as a two-column table inside a tab. Weight, dimensions, material, and compatibility never appear as typed properties. When a shopper asks an assistant whether something fits, the fact that would answer it is on the page but not in a form the assistant can rely on.",
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
    title: "Option price modifiers absent from any schema",
    severity: "high",
    description:
      "OpenCart option values add to or subtract from the base price. The page shows the base, and nothing describes what a specific configuration costs. An assistant quotes the base figure, the shopper configures the product, and the total in the cart does not match what they were told.",
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
    title: "Category pages carry no ItemList",
    severity: "medium",
    description:
      "Category and manufacturer pages list products with no CollectionPage or ItemList markup. A crawler reading your catalog gets a page of links and no statement of what the category contains, so your range is discovered one product at a time rather than as a set.",
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
  "OpenCart's default themes render product pages with no JSON-LD. The data is on the page — model, price, stock status, description — but only as markup a parser has to infer from. Nothing states that this is a product, that this number is the price, or that it is in stock.",
  "Attributes are the second loss. The attribute groups you set up in the admin arrive as a table under a tab. Weight, dimensions, material, and compatibility are exactly the fields a shopper asks an assistant about, and they are the hardest to read reliably out of table markup.",
  "Options make pricing unreliable. Option values carry price prefixes that add to or subtract from the base, so the figure at the top of the page is often not what a configured product costs, and no markup describes any specific configuration.",
  "Schema extensions exist, but versions drift across OpenCart 3 and 4 and several are unmaintained, so stores end up with nothing or with malformed JSON-LD. Beseam reads the served pages, reports what it found with the evidence, and proposes the template change. It does not modify your store.",
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
      headline="OpenCart ships without product structured data"
      description="Beseam reads the HTML your OpenCart storefront returns for products, categories, and configured options, and reports what a parser can and cannot extract. The output is a list of gaps with the response that proves each one, plus the Twig changes your developer applies."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
