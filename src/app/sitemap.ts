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
    ...alternativeRoutes,
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
