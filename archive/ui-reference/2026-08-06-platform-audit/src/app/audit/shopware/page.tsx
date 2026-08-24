import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Shopware product data audit",
  description:
    "Check what your Shopware 6 Twig storefront emits as JSON-LD. Get an evidence-backed list of schema gaps and a proposed template override.",
  keywords: [
    "Shopware 6 structured data",
    "Shopware product schema",
    "Shopware Twig JSON-LD",
    "Shopware product properties schema",
    "Shopware variant offers",
  ],
};

const findings: Finding[] = [
  {
    title: "Default schema omits identifiers and specifications",
    severity: "critical",
    description:
      "The rendered Product block carries name, description, and price. Manufacturer number, EAN, brand, and the specification detail held against the product are commonly absent. Without identifiers, your listing cannot be matched to the same item sold elsewhere, and a parser treats it as an unknown product.",
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
    title: "Properties never become additionalProperty",
    severity: "high",
    description:
      "Shopware properties are structured, translated, and used for filtering, which makes them the cleanest attribute data in the store. The storefront prints them as a specs list. The JSON-LD does not carry them, so organic cotton or a specific colorway is readable by a person and not by a parser.",
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
    title: "Only the selected variant appears in schema",
    severity: "high",
    description:
      "A variant detail page emits an Offer for the combination currently displayed. The other options, their prices, and their stock status are not in the structured data. A shopper asking whether a size is available gets nothing from the page that could answer it.",
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
    title: "Shopping Experiences pages carry no schema",
    severity: "medium",
    description:
      "Category and landing pages built in Shopping Experiences render product listing and cross-selling blocks with no ItemList schema. The curation your team assembled in the CMS exists as markup only, so nothing states which products the page groups or in what order.",
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
  "Shopware 6 renders product structured data from a Twig block in the storefront bundle, which is more than Shopware 5 gave you. It covers the core commerce fields. Whether manufacturer number, EAN, and brand reach the output depends on your version and how far your theme has overridden that block.",
  "The property system is where Shopware loses the most. Properties drive filtering and faceted search, so color, material, and size are structured, translated, and complete in the admin. They render as a specs list in the storefront and not as additionalProperty in the JSON-LD.",
  "Variants behave the same way. A detail page renders schema for the variant currently selected, so the Offer describes one combination out of the set. Nothing on the page declares the range of options, their prices, or which of them are in stock.",
  "Beseam requests your storefront pages the way a crawler does, parses what the Twig output contains, and compares it against the properties and variants in your catalog. It proposes the theme override. Beseam does not write to your Shopware installation — your team applies it.",
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
      headline="Your Shopware properties stay out of the schema"
      description="Beseam reads the JSON-LD your Shopware 6 storefront renders on product detail and Shopping Experiences pages. You get an evidence-backed list of gaps and a proposed Twig override for your theme to review."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
