import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Big Cartel product data audit",
  description:
    "Beseam checks whether your Big Cartel theme emits Product markup at all, then returns each gap with evidence and the Liquid to add to your theme.",
  keywords: [
    "Big Cartel structured data",
    "Big Cartel product schema",
    "Big Cartel theme code",
    "Big Cartel Liquid JSON-LD",
    "Big Cartel store SEO",
  ],
};

const findings: Finding[] = [
  {
    title: "No Product JSON-LD on product pages",
    severity: "critical",
    description:
      "Big Cartel's default themes emit no Product block. A crawler that parses your page finds no price, no currency, no availability and no statement that the page describes something for sale. An assistant assembling a list of shops that sell what you sell has nothing to place you in it with.",
    fix: `<!-- Big Cartel themes are built with Liquid templates -->
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
    title: "Product options carry no price information",
    severity: "high",
    description:
      "Big Cartel options can each hold their own price and sold-out state. With no markup on the page, none of it is readable. A shirt sold in five sizes at three prices reads as an untyped page, so an assistant asked what the XL costs cannot answer and moves to a shop that can.",
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
    title: "No breadcrumb or category markup",
    severity: "medium",
    description:
      "Categories exist in Big Cartel and appear in your navigation, but nothing in the page states the path from store to category to product. A crawler sees a flat set of unrelated URLs, and an assistant cannot tell that your prints and your ceramics are separate lines rather than one pile.",
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
    title: "Images are not attached to the product",
    severity: "medium",
    description:
      "Big Cartel themes usually output product images with weak or missing alt text and no image array in the markup. The extra shots that show scale, texture and the back of the piece are never linked to the product, so an assistant describing it works from the first thumbnail alone.",
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
  "Big Cartel is built for artists and makers, and the trade for its simplicity is markup. Most default themes ship without a Product JSON-LD block, so a product page reaches a crawler as an ordinary page: some text, some images, no price field, no availability field, no product type.",
  "That matters more than it used to. When someone asks ChatGPT or Perplexity for a shop selling hand-thrown mugs, the assistant works from what it can parse. A page that never states it is selling something at a price is hard to include in that answer, however good the work on it is.",
  "The recovery path is short. Big Cartel themes are Liquid, and the theme code editor is reachable from your dashboard on plans that include it. A single JSON-LD block in the product template covers the whole catalog, because that template renders for every product you list.",
  "Beseam fetches your pages as a crawler would, shows the response it received, and lists what is absent from it. Each finding arrives with Liquid written against Big Cartel's own product variables. You paste it into the theme; Beseam has no write access to your store.",
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
      headline="Most Big Cartel themes emit no product markup"
      description="Beseam fetches your Big Cartel product and category pages and reports what structured data the theme actually emits, which is often none. You get the missing fields, the evidence behind each one, and Liquid you can paste into the theme editor yourself."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
