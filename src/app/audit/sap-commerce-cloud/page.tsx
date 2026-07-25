import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "SAP Commerce Cloud product data audit",
  description:
    "Beseam checks what your Accelerator JSP or Spartacus storefront emits as structured data and returns the gaps with evidence and a proposed fix.",
  keywords: [
    "SAP Commerce Cloud structured data",
    "Hybris product schema",
    "Spartacus JSON-LD",
    "SAP Commerce Accelerator markup",
    "Hybris classification attributes schema",
  ],
};

const findings: Finding[] = [
  {
    title: "Accelerator JSP emits no product JSON-LD",
    severity: "critical",
    description:
      "The legacy Accelerator storefront renders name, price, and stock into HTML and stops there. No JSON-LD block is generated. An assistant answering a question about your catalog has to infer price and availability from layout, and on discounted lines it will sometimes read the struck-through list price as current.",
    fix: `<!-- Add to productLayout1Page.jsp or productDetailPage.jsp -->
<%@ taglib prefix="product" tagdir="/WEB-INF/tags/responsive/product" %>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "\${fn:escapeXml(product.name)}",
  "description": "\${fn:escapeXml(product.summary)}",
  "image": "\${product.primaryImage.url}",
  "sku": "\${product.code}",
  "brand": {
    "@type": "Brand",
    "name": "\${fn:escapeXml(product.manufacturer)}"
  },
  "offers": {
    "@type": "Offer",
    "price": "\${product.price.value}",
    "priceCurrency": "\${product.price.currencyIso}",
    "availability": "\${product.stock.stockLevelStatus.code == 'inStock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}",
    "url": "\${canonicalUrl}"
  }
}
</script>`,
  },
  {
    title: "Spartacus needs SSR before anything is readable",
    severity: "critical",
    description:
      "Spartacus is an Angular SPA. Without server-side rendering configured, or with a cold SSR cache, a crawler receives an app shell. With SSR working, the default components still emit no product schema, so the page renders correctly for people and carries nothing structured for an assistant.",
    fix: `// Create a custom Spartacus component for JSON-LD
// src/app/product/product-schema.component.ts
import { Component, OnInit } from '@angular/core';
import { CurrentProductService } from '@spartacus/storefront';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-product-schema',
  template: '',
})
export class ProductSchemaComponent implements OnInit {
  constructor(
    private currentProduct: CurrentProductService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.currentProduct.getProduct().subscribe((product) => {
      if (!product) return;
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.summary,
        image: product.images?.PRIMARY?.url,
        sku: product.code,
        offers: {
          '@type': 'Offer',
          price: product.price?.value,
          priceCurrency: product.price?.currencyIso,
        },
      };
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      this.document.head.appendChild(script);
    });
  }
}`,
  },
  {
    title: "Classification attributes stay in the spec table",
    severity: "high",
    description:
      "Classification features — dimensions, material, voltage, compatibility, with units attached — reach the page as a spec table and nothing more. A shopper asking an assistant whether a part fits their model gets a hedged answer, because the attribute that would settle it was never exposed as data.",
    fix: `<!-- Add classification attributes as PropertyValue in JSP -->
<c:if test="\${not empty product.classifications}">
  "additionalProperty": [
    <c:forEach var="classification" items="\${product.classifications}" varStatus="cStatus">
      <c:forEach var="feature" items="\${classification.features}" varStatus="fStatus">
        {
          "@type": "PropertyValue",
          "name": "\${fn:escapeXml(feature.name)}",
          "value": "\${fn:escapeXml(feature.values[0].value)}"
          <c:if test="\${not empty feature.unit}">
            ,"unitCode": "\${fn:escapeXml(feature.unit.symbol)}"
          </c:if>
        }<c:if test="\${!fStatus.last || !cStatus.last}">,</c:if>
      </c:forEach>
    </c:forEach>
  ]
</c:if>`,
  },
  {
    title: "Country sites disagree on price and canonical",
    severity: "medium",
    description:
      "A base site per country produces a URL per market. Where hreflang is partial and canonicals point at the default site, one product exists at several addresses in several currencies. An assistant has no way to tell which market's price applies, and will sometimes quote the wrong one.",
    fix: `<!-- Add to head section of master page template -->
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags" %>

<c:forEach var="site" items="\${cmsPage.otherLanguagePages}">
  <link rel="alternate"
        hreflang="\${site.language.isocode}-\${site.country.isocode}"
        href="\${site.url}" />
</c:forEach>
<link rel="canonical" href="\${canonicalUrl}" />

<!-- For Spartacus: Configure SSR to include hreflang -->
<!-- In your custom page-meta resolver: -->
<!-- Extend PageMetaResolver to emit hreflang link tags -->`,
  },
];

const contextParagraphs = [
  "SAP Commerce Cloud, still Hybris to most of the people running it, ships two storefronts. The Accelerator JSP templates render product data into HTML with no JSON-LD block. Spartacus renders through Angular, so without SSR configured and warm, a crawler receives an app shell and no product at all.",
  "Even with SSR working, the out-of-the-box Spartacus components emit no schema. Adding it means a custom component or a PageMetaResolver extension. Teams often assume the SEO module already covers it, and find out otherwise only when they check what the storefront actually returned.",
  "The classification system is where the loss hurts. Classification attributes hold technical specs, materials, compatibility, and units, and the storefront renders them as a table. An assistant asked whether a part fits a specific model has to guess from table markup rather than read a typed property.",
  "Beseam reads the responses your storefront serves — JSP or Spartacus, per base site and locale — and reports the gaps with the evidence for each. It does not deploy to your instance. The output is a template or component change your developers review and ship themselves.",
];

const otherPlatforms = [
  {
    name: "Salesforce Commerce Cloud",
    href: "/audit/salesforce-commerce-cloud",
  },
  { name: "Adobe Commerce (Magento)", href: "/audit/magento" },
  { name: "Shopify", href: "/audit/shopify" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function SapCommerceCloudAuditPage() {
  return (
    <PlatformAuditPage
      platform="SAP Commerce Cloud"
      headline="Spartacus and Accelerator both ship without product JSON-LD"
      description="Beseam reads what your SAP Commerce storefront returns to a crawler, whether that is a rendered Accelerator JSP or a Spartacus SSR response, and lists the structured-data gaps with the evidence for each. The output is a proposed template or component change, not an edit to your codebase."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
