import type { MetadataRoute } from "next";

import { CATEGORY_BENCHMARKS } from "@/data/category-benchmarks";
import { ECOSYSTEM_RESOURCES } from "@/lib/commerce-fieldbook";
import { COMPARISONS } from "@/lib/comparisons";
import { getAllFieldbookDocuments } from "@/lib/fieldbook-content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";
  const lastModified = new Date();
  const fieldbookDocuments = getAllFieldbookDocuments();

  const routes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    {
      path: "/shopify-store-health",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      path: "/ai-visibility-monitoring",
      changeFrequency: "monthly" as const,
      priority: 0.95,
    },
    {
      path: "/platform",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      path: "/purchase-health",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/discoverability-health",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      path: "/monitoring-coverage",
      changeFrequency: "monthly" as const,
      priority: 0.45,
    },
    {
      path: "/integrations/shopify",
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      path: "/integrations/google-search-console",
      changeFrequency: "monthly" as const,
      priority: 0.55,
    },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/bot", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/manifesto", changeFrequency: "monthly" as const, priority: 0.7 },
    {
      path: "/product-visibility-monitoring",
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      path: "/tools/ai-visibility-scan",
      changeFrequency: "monthly" as const,
      priority: 0.8,
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
    { path: "/resources", changeFrequency: "weekly" as const, priority: 0.85 },
    {
      path: "/resources/problems",
      changeFrequency: "weekly" as const,
      priority: 0.78,
    },
    {
      path: "/resources/skills",
      changeFrequency: "weekly" as const,
      priority: 0.78,
    },
    {
      path: "/resources/playbooks",
      changeFrequency: "weekly" as const,
      priority: 0.76,
    },
    {
      path: "/resources/projects",
      changeFrequency: "monthly" as const,
      priority: 0.72,
    },
    ...ECOSYSTEM_RESOURCES.map((resource) => ({
      path: `/resources/projects/${resource.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...fieldbookDocuments.map((document) => ({
      path: document.href,
      changeFrequency: "monthly" as const,
      priority: document.section === "start-here" ? 0.74 : 0.7,
    })),
    // Listed only once a real run is published: matches the noindex on the
    // page itself while the benchmark set is empty.
    ...(CATEGORY_BENCHMARKS.length > 0
      ? [
          {
            path: "/benchmarks",
            changeFrequency: "weekly" as const,
            priority: 0.88,
          },
        ]
      : []),
    { path: "/compare", changeFrequency: "monthly" as const, priority: 0.75 },
    ...COMPARISONS.map((comparison) => ({
      path: `/compare/${comparison.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const uniqueRoutes = routes.filter(
    (route, index) =>
      routes.findIndex((candidate) => candidate.path === route.path) === index,
  );

  return uniqueRoutes.map(({ path, ...route }) => ({
    url: baseUrl + path,
    lastModified,
    ...route,
  }));
}
