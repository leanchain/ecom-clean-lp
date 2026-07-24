import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your Salesforce Commerce Cloud Store?",
  description:
    "Salesforce Commerce Cloud sites often rely on ISML templates with minimal schema output. Beseam audits how AI engines read your SFCC storefront and shows what's missing.",
  keywords: [
    "Salesforce Commerce Cloud AI optimization",
    "SFCC structured data",
    "SFCC JSON-LD",
    "Salesforce B2C Commerce schema",
    "ChatGPT Salesforce Commerce",
  ],
};

const findings: Finding[] = [
  {
    title: "ISML templates emit minimal Product schema",
    severity: "critical",
    description:
      "Salesforce Commerce Cloud ISML templates include only basic Microdata by default - product name and price. AI engines need complete JSON-LD with images, brand, availability, reviews, and detailed descriptions to surface your products accurately.",
    fix: `<!-- Add to product/productDetails.isml -->
<isscript>
  var product = pdict.product;
  var schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.shortDescription ? product.shortDescription.markup : "",
    "image": product.images.large[0] ? product.images.large[0].absURL : "",
    "sku": product.ID,
    "mpn": product.manufacturerSKU || product.ID,
    "brand": {
      "@type": "Brand",
      "name": product.brand || ""
    },
    "offers": {
      "@type": "Offer",
      "price": product.price.sales ? product.price.sales.value : product.price.list.value,
      "priceCurrency": product.price.sales ? product.price.sales.currency : product.price.list.currency,
      "availability": product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": URLUtils.abs("Product-Show", "pid", product.ID).toString()
    }
  };
</isscript>
<script type="application/ld+json"><isprint value="\${JSON.stringify(schema)}" encoding="off" /></script>`,
  },
  {
    title: "Variation groups lack per-variant schema",
    severity: "high",
    description:
      "SFCC variation groups (e.g., color/size) generate a single page with JavaScript-driven swatches. AI engines can't trigger these interactions - they only see the master product's base price and attributes, missing all variant-level data.",
    fix: `<!-- Add AggregateOffer for all variants in productDetails.isml -->
<isscript>
  var variants = product.variationModel.variants;
  var offers = [];
  for (var i = 0; i < variants.length; i++) {
    var v = variants[i];
    offers.push({
      "@type": "Offer",
      "sku": v.ID,
      "name": v.ID,
      "price": v.price.sales ? v.price.sales.value : v.price.list.value,
      "priceCurrency": session.currency.currencyCode,
      "availability": v.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock"
    });
  }
  schema.offers = offers;
</isscript>`,
  },
  {
    title: "Content slots and Einstein recommendations invisible to AI",
    severity: "high",
    description:
      "SFCC's content slots and Einstein AI recommendations are loaded dynamically via AJAX. AI engines see empty placeholder divs where your cross-sell and upsell content should be. Related products and curated collections are completely invisible.",
    fix: `<!-- Server-side render related products in template -->
<!-- In productDetails.isml, add related products as schema -->
<isscript>
  var recommendations = product.recommendations;
  if (recommendations && recommendations.length > 0) {
    var relatedProducts = [];
    for (var i = 0; i < Math.min(recommendations.length, 10); i++) {
      relatedProducts.push({
        "@type": "Product",
        "name": recommendations[i].name,
        "url": URLUtils.abs("Product-Show", "pid", recommendations[i].ID).toString()
      });
    }
    schema.isRelatedTo = relatedProducts;
  }
</isscript>`,
  },
  {
    title: "Multi-site architecture creates canonical and hreflang issues",
    severity: "medium",
    description:
      "SFCC's multi-site architecture (different locales, brands on one instance) often generates conflicting canonical URLs and missing hreflang tags. AI engines may index the wrong locale or see duplicate products across sites, diluting your structured data authority.",
    fix: `<!-- Ensure proper hreflang and canonical in htmlHead.isml -->
<isscript>
  var sites = dw.system.Site.getAllSites();
  var currentSite = dw.system.Site.getCurrent();
  var currentProduct = pdict.product;
</isscript>

<link rel="canonical" href="\${URLUtils.abs('Product-Show', 'pid', currentProduct.ID)}" />

<isloop items="\${sites}" var="site">
  <isif condition="\${site.ID !== currentSite.ID && site.status === dw.system.Site.SITE_STATUS_ONLINE}">
    <link rel="alternate"
          hreflang="\${site.defaultLocale}"
          href="\${URLUtils.abs('Product-Show', 'pid', currentProduct.ID).toString().replace(currentSite.httpsHostName, site.httpsHostName)}" />
  </isif>
</isloop>`,
  },
];

const contextParagraphs = [
  "Salesforce Commerce Cloud (formerly Demandware) powers some of the world's largest retail brands. Its enterprise-grade infrastructure delivers fast, scalable storefronts - but its ISML templating system outputs minimal structured data by default.",
  "The core issue for AI readability is that SFCC's reference architecture (SFRA) includes only basic Microdata attributes, not the comprehensive JSON-LD that modern AI engines expect. This means your carefully merchandised product data stays locked in the SFCC backend where AI can't access it.",
  "Einstein recommendations, content slots, and A/B test variations - all powered by AJAX - are invisible to AI crawlers. The dynamic personalization that makes SFCC powerful for shoppers creates a blank page for machines.",
  "For enterprises running multiple brands or locales on a single SFCC instance, there's an added challenge: conflicting canonical URLs and hreflang gaps that confuse AI engines about which version of a product is authoritative.",
  "Beseam audits your Salesforce Commerce Cloud storefront from the perspective of 13 AI engines, identifies gaps in your ISML template output, and generates the exact code changes for your SFRA cartridge to maximize AI readability.",
];

const otherPlatforms = [
  { name: "SAP Commerce Cloud", href: "/audit/sap-commerce-cloud" },
  { name: "Adobe Commerce (Magento)", href: "/audit/magento" },
  { name: "Shopify", href: "/audit/shopify" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function SalesforceCommerceCloudAuditPage() {
  return (
    <PlatformAuditPage
      platform="Salesforce Commerce Cloud"
      headline="How does AI see your SFCC storefront?"
      description="Salesforce Commerce Cloud's ISML templates emit minimal structured data. AI engines can't see your product attributes, variants, or recommendations. Beseam shows what's missing."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
