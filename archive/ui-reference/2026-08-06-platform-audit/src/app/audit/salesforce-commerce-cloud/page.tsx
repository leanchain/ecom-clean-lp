import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "Salesforce Commerce Cloud product data audit",
  description:
    "Beseam checks what your SFCC storefront's ISML and SFRA templates emit as structured data, then returns the gaps with evidence and a proposed fix.",
  keywords: [
    "SFCC structured data",
    "SFCC JSON-LD",
    "SFRA product schema",
    "ISML template schema",
    "Salesforce B2C Commerce product markup",
  ],
};

const findings: Finding[] = [
  {
    title: "SFRA emits Microdata, not JSON-LD",
    severity: "critical",
    description:
      "The SFRA product detail page carries itemprop attributes for name, price, and availability, and little else. There is no JSON-LD block with images, brand, GTIN, condition, or shipping terms. An assistant asked to compare your product against a competitor has a name and a number to work with.",
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
    title: "Variation masters carry no per-variant offers",
    severity: "high",
    description:
      "A variation master renders with the base price and one availability state. Per-variant price, SKU, and stock arrive through a Product-Variation call fired on swatch click. Nothing in the crawled response separates the cheapest variant from the most expensive, so an assistant quotes one price for the whole range.",
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
    title: "Cross-sells load after the initial response",
    severity: "high",
    description:
      "Content slots, Einstein recommendation carousels, and Page Designer regions are commonly hydrated by AJAX. A crawler stores the empty container. Bundles, accessories, and merchandised collection copy — the parts that answer what else a shopper needs with this item — never reach the assistant.",
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
    title: "Multi-site canonicals point at the wrong site",
    severity: "medium",
    description:
      "One instance serving several sites and locales often emits canonical URLs built from the wrong site ID, and hreflang sets covering only some locales. The same product then exists at several addresses with different prices, and an assistant has no basis for choosing the one that applies.",
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
  "Salesforce B2C Commerce runs on ISML templates and, in most implementations, the SFRA reference architecture. SFRA ships Microdata attributes on the product detail page — itemprop for name, price, and availability — and no JSON-LD. Anything beyond that came from a cartridge someone on your team wrote.",
  "Variation masters are the usual break. The PDP renders the master, and variant price, SKU, and stock arrive through a Product-Variation call. An assistant reading the served page sees the master's price and one availability state, so it answers with the wrong number for the size a shopper asked about.",
  "Content slots, Einstein recommendations, and Page Designer components are often fetched after the first response, so a crawler gets empty containers where cross-sells belong. Multi-site instances add canonical URLs built from the wrong site ID and hreflang sets that skip locales, which makes one product look like several.",
  "Beseam reads the storefront the way an assistant does and reports what it found. It does not write to your cartridges or deploy anything. Each finding carries the response that produced it and a proposed ISML or controller change for your team to review.",
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
      headline="SFCC storefronts emit less schema than your catalog holds"
      description="Beseam reads the HTML your SFCC storefront actually serves: the Microdata and JSON-LD your ISML templates emit, and what the SFRA controllers leave out. You get a ranked list of gaps with the evidence behind each, and a proposed template change your team reviews before it ships."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
