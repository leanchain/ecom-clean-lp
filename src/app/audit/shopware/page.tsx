import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Shopware Store?",
  description:
    "Shopware stores have improving structured data support but still miss key product details. Beseam audits how AI engines read your Shopware product pages.",
  keywords: [
    "Shopware AI optimization",
    "ChatGPT Shopware",
    "Shopware structured data",
    "Shopware 6 JSON-LD",
    "Shopware product schema",
  ],
};

const findings: Finding[] = [
  {
    title: "Default Product schema missing rich attributes",
    severity: "critical",
    description:
      "Shopware 6 includes a basic Product schema with name, price, and description, but omits brand, manufacturer part numbers, product properties, and detailed specifications. AI engines see a basic product listing instead of the rich product data stored in your Shopware backend.",
    fix: `{# Override in theme: views/storefront/page/product-detail/index.html.twig #}
{% block page_product_detail_structured_data %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ page.product.translated.name }}",
  "description": "{{ page.product.translated.description|striptags|slice(0, 5000) }}",
  "image": [
    {% for media in page.product.media %}
    "{{ media.media.url }}"{% if not loop.last %},{% endif %}
    {% endfor %}
  ],
  "sku": "{{ page.product.productNumber }}",
  "mpn": "{{ page.product.manufacturerNumber }}",
  "gtin13": "{{ page.product.ean }}",
  "brand": {
    "@type": "Brand",
    "name": "{{ page.product.manufacturer.translated.name }}"
  },
  "offers": {
    "@type": "Offer",
    "price": "{{ page.product.calculatedPrice.totalPrice }}",
    "priceCurrency": "{{ page.header.activeCurrency.isoCode }}",
    "availability": "{% if page.product.availableStock > 0 %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
    "url": "{{ seoUrl('frontend.detail.page', { productId: page.product.id }) }}"
  }
  {% if page.product.ratingAverage %}
  ,"aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{ page.product.ratingAverage }}",
    "reviewCount": "{{ page.reviews.total }}"
  }
  {% endif %}
}
</script>
{% endblock %}`,
  },
  {
    title: "Product properties not mapped to schema",
    severity: "high",
    description:
      "Shopware 6's property system (color, material, size, etc.) stores rich filterable attributes, but they don't appear in the Product structured data. AI engines can't see that your product is made of organic cotton or available in specific colors.",
    fix: `{# Add product properties as PropertyValue #}
{% if page.product.properties|length > 0 %}
"additionalProperty": [
  {% for property in page.product.sortedProperties %}
    {% for option in property.options %}
    {
      "@type": "PropertyValue",
      "name": "{{ property.translated.name }}",
      "value": "{{ option.translated.name }}"
    }{% if not loop.last or not loop.parent.loop.last %},{% endif %}
    {% endfor %}
  {% endfor %}
]
{% endif %}`,
  },
  {
    title: "Variant products lack per-variant Offer schema",
    severity: "high",
    description:
      "Shopware 6 variant products (parent + child products with different options) generate schema only for the currently displayed variant. AI engines can't see the full range of options, prices, and availability across all variants.",
    fix: `{# Add all variant offers if this is a parent product #}
{% if page.product.childCount > 0 %}
"offers": [
  {% for variant in page.product.children %}
  {
    "@type": "Offer",
    "sku": "{{ variant.productNumber }}",
    "name": "{{ variant.translated.name ?? page.product.translated.name }}
      {% for option in variant.options %} {{ option.translated.name }}{% endfor %}",
    "price": "{{ variant.calculatedPrice.totalPrice }}",
    "priceCurrency": "{{ page.header.activeCurrency.isoCode }}",
    "availability": "{% if variant.availableStock > 0 %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}"
  }{% if not loop.last %},{% endif %}
  {% endfor %}
]
{% endif %}

{# Note: For Shopware 6, you may need to load children via
   a custom subscriber or CMS element to have all variants
   available in the template context #}`,
  },
  {
    title: "Shopping Experiences (CMS) pages lack structured data",
    severity: "medium",
    description:
      "Shopware 6's Shopping Experiences (the CMS page builder) creates rich landing pages and category layouts, but these CMS pages have no structured data. Product listing CMS blocks, cross-selling elements, and curated collections are invisible to AI.",
    fix: `{# Override category listing CMS element to add ItemList schema #}
{# Theme: views/storefront/element/cms-element-product-listing.html.twig #}

{% block element_product_listing %}
  {{ parent() }}

  {% if searchResult.elements|length > 0 %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "{{ page.cmsPage.translated.name ?? page.header.navigation.active.translated.name }}",
    "numberOfItems": {{ searchResult.total }},
    "itemListElement": [
      {% for product in searchResult.elements %}
      {
        "@type": "ListItem",
        "position": {{ loop.index }},
        "url": "{{ seoUrl('frontend.detail.page', { productId: product.id }) }}",
        "name": "{{ product.translated.name }}"
      }{% if not loop.last %},{% endif %}
      {% endfor %}
    ]
  }
  </script>
  {% endif %}
{% endblock %}`,
  },
];

const contextParagraphs = [
  "Shopware is one of Europe's leading e-commerce platforms, with Shopware 6 gaining rapid adoption for its modern architecture (Symfony + Vue.js admin, Twig storefront). It powers thousands of B2C and B2B stores, particularly in Germany, Austria, and the Netherlands.",
  "Shopware 6 includes basic Product schema by default — a significant improvement over Shopware 5. However, the auto-generated schema omits manufacturer numbers (MPN), EAN/GTIN identifiers, brand information, and the rich product properties that Shopware stores in its property system.",
  "One of Shopware's greatest strengths — its flexible property and variant system — is also its structured data weakness. Properties used for filtering and faceted search don't appear in the schema, and variant products only show the current variant's data to AI engines.",
  "Shopware 6's Shopping Experiences (CMS) feature creates beautiful, customizable category and landing pages, but the CMS blocks that display products don't include any structured data. A curated product collection built in the CMS is invisible to AI crawlers.",
  "Beseam audits your Shopware 6 store from the perspective of 13 AI engines, identifies what's missing from your theme's structured data output, and generates Twig template overrides that work with Shopware's theme inheritance system.",
];

const otherPlatforms = [
  { name: "PrestaShop", href: "/audit/prestashop" },
  { name: "Adobe Commerce (Magento)", href: "/audit/magento" },
  { name: "WooCommerce", href: "/audit/woocommerce" },
  { name: "OpenCart", href: "/audit/opencart" },
  { name: "Shopify", href: "/audit/shopify" },
];

export default function ShopwareAuditPage() {
  return (
    <PlatformAuditPage
      platform="Shopware"
      headline="How does AI see your Shopware store?"
      description="Shopware 6 generates basic schema but misses your product properties, variants, and CMS content. AI engines see a fraction of your product data. Beseam shows the full picture."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
