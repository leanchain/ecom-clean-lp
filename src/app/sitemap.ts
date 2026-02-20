import type { MetadataRoute } from "next";

export const dynamic = "force-static";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const routes = [
    "/",
    "/demo",
    "/comparison",
    "/pdp-analyzer",
    "/example-pdp",
    "/optimised-pdp",
    "/privacy-policy",
    "/terms-of-service",
    "/blog",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
