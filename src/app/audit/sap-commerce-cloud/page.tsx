import type { Metadata } from "next";
import PlatformAuditPage from "@/components/beseam/platform-audit-page";
import type { Finding } from "@/components/beseam/sample-findings";

export const metadata: Metadata = {
  title: "How Does AI See Your SAP Commerce Cloud Store?",
  description:
    "SAP Commerce Cloud (Hybris) sites with JSP or Spartacus storefronts often lack structured data. Beseam audits how AI engines read your SAP Commerce pages.",
  keywords: [
    "SAP Commerce Cloud AI optimization",
    "Hybris structured data",
    "SAP Spartacus schema",
    "SAP Commerce JSON-LD",
    "ChatGPT SAP Commerce",
  ],
};

const findings: Finding[] = [
  {
    title: "JSP storefront has no JSON-LD product schema",
    severity: "critical",
    description:
      "SAP Commerce Cloud's legacy Accelerator storefront (JSP-based) does not generate Product JSON-LD. AI engines see rendered HTML but no structured data. Your product catalog is invisible to AI-powered shopping and research tools.",
    fix: `<!-- Add to productLayout1Page.jsp or productDetailPage.jsp -->
<%@ taglib prefix="product" tagdir="/WEB-INF/tags/responsive/product" %>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${fn:escapeXml(product.name)}",
  "description": "${fn:escapeXml(product.summary)}",
  "image": "${product.primaryImage.url}",
  "sku": "${product.code}",
  "brand": {
    "@type": "Brand",
    "name": "${fn:escapeXml(product.manufacturer)}"
  },
  "offers": {
    "@type": "Offer",
    "price": "${product.price.value}",
    "priceCurrency": "${product.price.currencyIso}",
    "availability": "${product.stock.stockLevelStatus.code == 'inStock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}",
    "url": "${canonicalUrl}"
  }
}
</script>`,
  },
  {
    title: "Spartacus SPA renders schema client-side only",
    severity: "critical",
    description:
      "SAP's modern Spartacus storefront (Angular SPA) renders all content via JavaScript. Without server-side rendering (SSR) properly configured, AI crawlers see an empty shell. Even with SSR, Spartacus doesn't include structured data in its default components.",
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
    title: "Classification attributes not in structured data",
    severity: "high",
    description:
      "SAP Commerce's powerful classification system stores rich product attributes (technical specs, materials, compatibility), but these are only rendered in the page UI. AI engines can't parse classification attributes from HTML reliably.",
    fix: `<!-- Add classification attributes as PropertyValue in JSP -->
<c:if test="${not empty product.classifications}">
  "additionalProperty": [
    <c:forEach var="classification" items="${product.classifications}" varStatus="cStatus">
      <c:forEach var="feature" items="${classification.features}" varStatus="fStatus">
        {
          "@type": "PropertyValue",
          "name": "${fn:escapeXml(feature.name)}",
          "value": "${fn:escapeXml(feature.values[0].value)}"
          <c:if test="${not empty feature.unit}">
            ,"unitCode": "${fn:escapeXml(feature.unit.symbol)}"
          </c:if>
        }<c:if test="${!fStatus.last || !cStatus.last}">,</c:if>
      </c:forEach>
    </c:forEach>
  ]
</c:if>`,
  },
  {
    title: "Multi-country catalog with missing hreflang",
    severity: "medium",
    description:
      "SAP Commerce Cloud's multi-country/multi-currency catalog management creates separate URLs per locale. Without proper hreflang annotations and consistent canonical URLs, AI engines may index the wrong market's pricing or see duplicate products.",
    fix: `<!-- Add to head section of master page template -->
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags" %>

<c:forEach var="site" items="${cmsPage.otherLanguagePages}">
  <link rel="alternate"
        hreflang="${site.language.isocode}-${site.country.isocode}"
        href="${site.url}" />
</c:forEach>
<link rel="canonical" href="${canonicalUrl}" />

<!-- For Spartacus: Configure SSR to include hreflang -->
<!-- In your custom page-meta resolver: -->
<!-- Extend PageMetaResolver to emit hreflang link tags -->`,
  },
];

const contextParagraphs = [
  "SAP Commerce Cloud (formerly Hybris) is the dominant enterprise e-commerce platform for large B2B and B2C retailers. Its sophisticated product information management (PIM) and multi-channel capabilities are unmatched — but its structured data output lags far behind.",
  "The critical issue depends on which storefront you use. The legacy Accelerator (JSP) storefront emits zero JSON-LD by default. The modern Spartacus storefront (Angular SPA) renders everything client-side, which most AI crawlers can't process without properly configured server-side rendering.",
  "SAP Commerce's classification system is one of its greatest strengths — storing detailed technical specifications, compatibility data, and material information — but none of this reaches AI engines because it's only rendered as HTML tables.",
  "For enterprise retailers with multi-country catalogs, there's an additional challenge: SAP Commerce generates separate storefronts per locale, but hreflang and canonical tag management across these is often misconfigured, causing AI engines to see conflicting product data.",
  "Beseam audits your SAP Commerce Cloud storefront from the perspective of 13 AI engines, identifies structured data gaps in both JSP and Spartacus implementations, and generates the exact template or component code to make your product catalog AI-readable.",
];

const otherPlatforms = [
  { name: "Salesforce Commerce Cloud", href: "/audit/salesforce-commerce-cloud" },
  { name: "Adobe Commerce (Magento)", href: "/audit/magento" },
  { name: "Shopify", href: "/audit/shopify" },
  { name: "BigCommerce", href: "/audit/bigcommerce" },
  { name: "Headless / Custom", href: "/audit/custom" },
];

export default function SapCommerceCloudAuditPage() {
  return (
    <PlatformAuditPage
      platform="SAP Commerce Cloud"
      headline="How does AI see your SAP Commerce storefront?"
      description="SAP Commerce Cloud (Hybris) stores — whether JSP or Spartacus — have major structured data gaps. AI engines can't read your product catalog. Beseam shows exactly what's missing."
      contextParagraphs={contextParagraphs}
      findings={findings}
      otherPlatforms={otherPlatforms}
    />
  );
}
