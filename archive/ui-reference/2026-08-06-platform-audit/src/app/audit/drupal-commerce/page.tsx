import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Drupal Commerce product data audit",
  description:
    "Drupal Commerce core emits no product schema. Beseam checks what your modules and Twig templates actually output and returns gaps with a proposed fix.",
  keywords: [
    "Drupal Commerce structured data",
    "Drupal Commerce product schema",
    "Schema.org Metatag Drupal",
    "Drupal Commerce variations JSON-LD",
    "Drupal Commerce Twig schema",
  ],
};

const findings: Finding[] = [
  {
    title: "No product schema without a contributed module",
    severity: "critical",
    description:
      "Drupal Commerce core renders product entities as content, with no JSON-LD. Until Schema.org Metatag or an equivalent is installed and mapped, a crawler sees a node with a heading and a price field. Nothing on the page states that it describes a purchasable product.",
    fix: `// Install and configure the Schema.org Metatag module
// Run in your Drupal root:
// composer require drupal/schema_metatag

// Then enable it:
// drush en schema_metatag schema_product

// Configure at: /admin/config/search/metatag
// Add Product schema mapping for Commerce Product entity type:
// - name → Product title
// - description → Product body field
// - image → Product image field
// - sku → Product SKU
// - brand → Product brand field

// Alternatively, create a custom module with a Twig template:
// File: modules/custom/product_schema/templates/product-schema.html.twig

{# product-schema.html.twig #}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.title.value }}",
  "description": "{{ product.body.value|striptags|slice(0, 5000) }}",
  "image": "{{ file_url(product.field_images.entity.uri.value) }}",
  "sku": "{{ product.variations.0.entity.sku.value }}",
  "brand": {
    "@type": "Brand",
    "name": "{{ product.field_brand.entity.name.value }}"
  },
  "offers": {
    "@type": "Offer",
    "price": "{{ product.variations.0.entity.price.0.number }}",
    "priceCurrency": "{{ product.variations.0.entity.price.0.currency_code }}",
    "availability": "https://schema.org/InStock",
    "url": "{{ url('entity.commerce_product.canonical', {'commerce_product': product.id()}) }}"
  }
}
</script>`,
  },
  {
    title: "Only the default variation reaches the offer",
    severity: "high",
    description:
      "Commerce product variations are separate entities, each with its own SKU, price, and stock level. Standard mappings expose the default variation only. A product selling across a range of prices publishes one of them, and a shopper quoted that figure meets a different total at checkout.",
    fix: `{# Enhanced product-schema.html.twig with all variations #}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.title.value }}",
  "description": "{{ product.body.value|striptags }}",
  "image": "{{ file_url(product.field_images.entity.uri.value) }}",
  "sku": "{{ product.variations.0.entity.sku.value }}",
  "offers": [
    {% for variation in product.variations %}
    {
      "@type": "Offer",
      "sku": "{{ variation.entity.sku.value }}",
      "name": "{{ variation.entity.title.value }}",
      "price": "{{ variation.entity.price.0.number }}",
      "priceCurrency": "{{ variation.entity.price.0.currency_code }}",
      "availability": "{% if variation.entity.field_stock.value > 0 %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}"
    }{% if not loop.last %},{% endif %}
    {% endfor %}
  ]
}
</script>`,
  },
  {
    title: "Custom fields need a mapping nobody wrote",
    severity: "high",
    description:
      "Field API lets you attach material, dimensions, certification, and compatibility fields to a product type. Schema modules do not map them for you; each needs an explicit mapping to a schema property. A skipped mapping is silent — the field renders on the page and appears nowhere in the data.",
    fix: `{# Map custom fields as PropertyValue #}
"additionalProperty": [
  {% if product.field_material.value %}
  {
    "@type": "PropertyValue",
    "name": "Material",
    "value": "{{ product.field_material.value }}"
  },
  {% endif %}
  {% if product.field_weight.value %}
  {
    "@type": "PropertyValue",
    "name": "Weight",
    "value": "{{ product.field_weight.value }}",
    "unitCode": "{{ product.field_weight_unit.value }}"
  },
  {% endif %}
  {% if product.field_dimensions.value %}
  {
    "@type": "PropertyValue",
    "name": "Dimensions",
    "value": "{{ product.field_dimensions.value }}"
  }
  {% endif %}
]

// Also configure via Schema.org Metatag admin UI:
// /admin/config/search/metatag/commerce_product
// Map each custom field to the appropriate schema property`,
  },
  {
    title: "Views category pages carry no ItemList",
    severity: "medium",
    description:
      "Taxonomy-driven catalog pages built with Views output rows of teasers and no CollectionPage or ItemList markup. Nothing states what the category holds or in what order. A crawler mapping your catalog has to discover products individually rather than read the listing that already groups them.",
    fix: `{# Add to views template: views-view--product-catalog.html.twig #}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{ term.name.value }}",
  "description": "{{ term.description.value|striptags }}",
  "url": "{{ url('entity.taxonomy_term.canonical', {'taxonomy_term': term.id()}) }}",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": {{ rows|length }},
    "itemListElement": [
      {% for row in rows %}
      {
        "@type": "ListItem",
        "position": {{ loop.index }},
        "url": "{{ row.content['#url'] }}",
        "name": "{{ row.content['#title'] }}"
      }{% if not loop.last %},{% endif %}
      {% endfor %}
    ]
  }
}
</script>`,
  },
];

const contextParagraphs = [
  "Drupal Commerce core emits no Product JSON-LD. Structured data comes from contributed modules, Schema.org Metatag most often, which have to be installed, mapped field by field, and re-checked whenever the product type changes. Sites that skipped a mapping usually do not know which one.",
  "Variations are the second problem. Each variation is its own entity with a price, SKU, and stock level, but most mappings resolve only the default variation. The page then publishes one offer for a product that sells at several prices, and an assistant repeats that single number.",
  "The Field API is the reason to run Drupal Commerce and the reason it loses the most. Fields for material, tolerance, certification, and compatibility render through the display mode as HTML. Unless someone mapped each one to a schema property, none of it is machine-readable.",
  "Beseam reads the site as it is served, names the field or mapping that is missing, and proposes the Twig or Metatag change. It does not install modules, edit your theme, or alter configuration. Every finding comes with the response that produced it.",
];

const otherPlatforms = [
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "Adobe Commerce (Magento)", href: "/audit/magento" },
  { name: "Shopware", href: "/audit/shopware" },
  { name: "PrestaShop", href: "/audit/prestashop" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function DrupalCommerceAuditPage() {
  return (
    <PlatformAuditPage
      platform="Drupal Commerce"
      headline="Drupal Commerce emits no product schema by default"
      description="Beseam reads the pages your Drupal Commerce site serves, checks which product fields and variations reach the JSON-LD your modules produce, and reports the gaps with evidence. The output is Twig and module configuration your team reviews, not a change to your site."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
