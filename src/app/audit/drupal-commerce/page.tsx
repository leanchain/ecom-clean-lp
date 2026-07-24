import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Drupal Commerce Store?",
  description:
    "Drupal Commerce sites depend on contributed modules for structured data. Beseam audits how AI engines read your Drupal Commerce product pages and finds the gaps.",
  keywords: [
    "Drupal Commerce AI optimization",
    "ChatGPT Drupal Commerce",
    "Drupal Commerce structured data",
    "Drupal Commerce JSON-LD",
    "Drupal product schema",
  ],
};

const findings: Finding[] = [
  {
    title: "No Product schema without contributed modules",
    severity: "critical",
    description:
      "Drupal Commerce core does not include any Product JSON-LD. Without installing and configuring modules like Schema.org Metatag or JSON-LD Schema, your product pages have zero structured data. AI engines see content pages, not product pages.",
    fix: `// Install and configure the Schema.org Metatag module
// Run in your Drupal root:
// composer require drupal/schema_metatag

// Then enable it:
// drush en schema_metatag schema_product_metatag

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
    title: "Product variations not reflected in schema",
    severity: "high",
    description:
      "Drupal Commerce's variation system (where each color/size is a separate variation entity) is powerful for store management but invisible to AI. Even with Schema.org modules installed, variations are typically not mapped to individual Offer entities in the structured data.",
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
    title: "Custom product fields not exposed as structured data",
    severity: "high",
    description:
      "Drupal's Field API lets you add unlimited custom fields to products (materials, dimensions, compatibility, certifications), but these are only rendered as HTML. Even with schema modules installed, custom fields require manual mapping that's often skipped.",
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
    title: "Taxonomy-based categories lack CollectionPage schema",
    severity: "medium",
    description:
      "Drupal Commerce uses taxonomy terms for product categories. While Drupal's Views module generates category listing pages, these don't include CollectionPage or ItemList schema. AI engines can't understand your product catalog hierarchy.",
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
  "Drupal Commerce is the e-commerce framework built on Drupal CMS, powering complex product catalogs for retailers, distributors, and B2B businesses. Its flexibility is unmatched - but this means structured data requires intentional configuration that's often overlooked.",
  "The core issue is that Drupal Commerce core provides zero Product schema out of the box. Unlike hosted platforms that auto-generate at least basic structured data, Drupal Commerce depends entirely on contributed modules (like Schema.org Metatag) that must be installed, enabled, and configured.",
  "Drupal Commerce's variation system - where product variations are separate entities with their own prices, SKUs, and stock levels - is architecturally sophisticated but creates a structured data challenge. Most schema solutions only map the default variation, not all options.",
  "The irony of Drupal Commerce is that it stores more detailed product data than almost any other platform (thanks to the Field API), but less of it reaches AI engines. Custom fields for materials, dimensions, certifications, and compatibility data stay locked in the Drupal database.",
  "Beseam audits your Drupal Commerce store from the perspective of 13 AI engines, identifies the structured data gaps in your specific Drupal configuration, and provides Twig template code and module configurations to make your product data AI-readable.",
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
      headline="How does AI see your Drupal Commerce store?"
      description="Drupal Commerce stores have zero structured data without contributed modules. AI engines can't see your rich product attributes. Beseam identifies every gap."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
