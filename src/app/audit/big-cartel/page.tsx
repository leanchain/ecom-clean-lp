import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Big Cartel Store?",
  description:
    "Big Cartel stores have extremely limited structured data with no template-level customization. Beseam audits how AI engines read your Big Cartel product pages.",
  keywords: [
    "Big Cartel AI optimization",
    "ChatGPT Big Cartel",
    "Big Cartel structured data",
    "Big Cartel product schema",
    "Big Cartel SEO",
  ],
};

const findings: Finding[] = [
  {
    title: "No Product JSON-LD schema at all",
    severity: "critical",
    description:
      "Big Cartel does not generate any Product JSON-LD schema on product pages. AI engines see your product pages as generic web pages with no structured product information - no price, no availability, no product type. Your products are invisible to AI-powered shopping and recommendation engines.",
    fix: `<!-- Big Cartel themes use Twig-like template syntax -->
<!-- Edit your theme's product.html to add JSON-LD: -->
<!-- Go to Account > Design > Edit Theme > Code Editor -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.name }}",
  "description": "{{ product.description | strip_html | truncate: 5000 }}",
  "image": "{{ product.image.url | product_image_url: '1000x1000' }}",
  "url": "{{ product.url | full_url }}",
  "offers": {
    "@type": "Offer",
    "price": "{{ product.default_price | money_without_currency }}",
    "priceCurrency": "{{ shop.currency }}",
    "availability": "{% if product.status == 'active' %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
    "seller": {
      "@type": "Organization",
      "name": "{{ shop.name }}"
    }
  }
}
</script>`,
  },
  {
    title: "Product options have no structured data",
    severity: "high",
    description:
      "Big Cartel supports product options (size, color) with different prices, but since there's no structured data at all, AI engines can't see any variation information. A t-shirt available in 5 sizes at different prices is just an unnamed HTML page to AI.",
    fix: `<!-- Add option-aware schema in product.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.name }}",
  "description": "{{ product.description | strip_html }}",
  "image": "{{ product.image.url | product_image_url: '1000x1000' }}",
  "offers": [
    {% for option in product.options %}
    {
      "@type": "Offer",
      "name": "{{ option.name }}",
      "price": "{{ option.price | money_without_currency }}",
      "priceCurrency": "{{ shop.currency }}",
      "availability": "{% if option.sold_out %}https://schema.org/SoldOut{% else %}https://schema.org/InStock{% endif %}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>`,
  },
  {
    title: "No breadcrumb or category schema",
    severity: "medium",
    description:
      "Big Cartel's category system is limited to artist-defined categories, but even these don't generate any structured data. AI engines can't understand how your products are organized or navigate your catalog by category.",
    fix: `<!-- Add BreadcrumbList in product.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "{{ shop.name }}",
      "item": "{{ '/' | full_url }}"
    },
    {% if product.category %}
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{{ product.category.name }}",
      "item": "{{ product.category.url | full_url }}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{ product.name }}",
      "item": "{{ product.url | full_url }}"
    }
    {% else %}
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{{ product.name }}",
      "item": "{{ product.url | full_url }}"
    }
    {% endif %}
  ]
}
</script>`,
  },
  {
    title: "Product images lack structured alt text and gallery schema",
    severity: "medium",
    description:
      "Big Cartel themes often output product images without alt text or structured image data. Big Cartel supports up to 5 product images, but AI engines can't associate these images with the product or understand what they depict.",
    fix: `<!-- Enhance image output in product.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.name }}",
  "image": [
    {% for image in product.images %}
    "{{ image.url | product_image_url: '1000x1000' }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>

<!-- Also ensure img tags have proper alt text: -->
{% for image in product.images %}
  <img src="{{ image.url | product_image_url: '1000x1000' }}"
       alt="{{ product.name }}{% if forloop.index > 1 %} - Image {{ forloop.index }}{% endif %}"
       loading="{% if forloop.first %}eager{% else %}lazy{% endif %}" />
{% endfor %}`,
  },
];

const contextParagraphs = [
  "Big Cartel is an e-commerce platform built specifically for artists, makers, and independent creators. With free plans supporting up to 5 products and paid plans for up to 500, it's the go-to platform for small-scale creative commerce.",
  "The most critical issue: Big Cartel generates zero Product JSON-LD schema. Unlike Shopify, BigCommerce, or even Squarespace which include some structured data automatically, Big Cartel products are completely invisible to AI engines from a structured data perspective.",
  "The good news is that Big Cartel's theme system (based on Twig-like templates) is relatively easy to customize. If you're on a paid plan with code editing access, you can add Product JSON-LD directly to your theme templates.",
  "For artists and makers, AI readability is becoming increasingly important as tools like ChatGPT, Perplexity, and Google's AI overview start recommending products. Without structured data, your handmade goods won't surface in any AI-powered shopping experience.",
  "Beseam audits your Big Cartel store from the perspective of 13 AI engines, identifies the complete absence of structured data, and generates the exact Twig template code to add Product, Breadcrumb, and Collection schema to your store.",
];

const otherPlatforms = [
  { name: "Shopify", href: "/audit/shopify" },
  { name: "Squarespace", href: "/audit/squarespace" },
  { name: "Wix", href: "/audit/wix" },
  { name: "Square Online", href: "/audit/square-online" },
  { name: "Ecwid", href: "/audit/ecwid" },
];

export default function BigCartelAuditPage() {
  return (
    <PlatformAuditPage
      platform="Big Cartel"
      headline="How does AI see your Big Cartel store?"
      description="Big Cartel generates zero structured data. Your handmade products are completely invisible to AI engines. Beseam shows what's missing and how to fix it."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
