import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";
  const lastModified = new Date();
  return [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    {
      path: "/shopify-store-health",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/purchase-health",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      path: "/discoverability-health",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      path: "/monitoring-coverage",
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      path: "/integrations/shopify",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/integrations/google-search-console",
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    {
      path: "/store-health-review",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/tools/ai-visibility-scan",
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      path: "/privacy-policy",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      path: "/terms-of-service",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ].map(({ path, ...route }) => ({
    url: baseUrl + path,
    lastModified,
    ...route,
  }));
}
