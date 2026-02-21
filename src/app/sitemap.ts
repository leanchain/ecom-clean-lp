import type { MetadataRoute } from "next";

import { getBlogSlugs } from "@/lib/blog";

export const dynamic = "force-static";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const blogRoutes = getBlogSlugs().map((slug) => {
    const normalized = slug.replace(/\.mdx?$/, "");
    return `/blog/${normalized}`;
  });

  const routes = [
    "/",
    "/about",
    "/demo",
    "/comparison",
    "/pdp-analyzer",
    "/example-pdp",
    "/optimised-pdp",
    "/privacy-policy",
    "/terms-of-service",
    "/blog",
    ...blogRoutes,
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
