import type { MetadataRoute } from "next";

import { getAlternativeSlugs } from "@/lib/alternatives";

export const dynamic = "force-static";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const alternativeRoutes = getAlternativeSlugs().map((slug) => {
    const normalized = slug.replace(/\.mdx?$/, "");
    return `/alternatives/${normalized}`;
  });

  const routes = [
    "/",
    "/about",
    "/demo",
    "/alternatives",
    "/compare",
    "/comparison",
    "/pdp-analyzer",
    "/example-pdp",
    "/optimised-pdp",
    "/privacy-policy",
    "/terms-of-service",
    "/audit/shopify",
    "/audit/woocommerce",
    "/audit/bigcommerce",
    "/audit/custom",
    "/audit/magento",
    "/audit/squarespace",
    "/audit/wix",
    "/audit/prestashop",
    "/audit/opencart",
    "/audit/salesforce-commerce-cloud",
    "/audit/sap-commerce-cloud",
    "/audit/volusion",
    "/audit/square-online",
    "/audit/ecwid",
    "/audit/shift4shop",
    "/audit/big-cartel",
    "/audit/drupal-commerce",
    "/audit/shopware",
    "/audit/saleor",
    "/audit/medusa",
    ...alternativeRoutes,
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
