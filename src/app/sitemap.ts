import type { MetadataRoute } from "next";

import { COMPARISONS } from "@/lib/comparisons";
import { FIELD_PROBLEMS, FIELD_SKILLS } from "@/lib/commerce-fieldbook";

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
      path: "/ai-visibility-monitoring",
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
    { path: "/manifesto", changeFrequency: "monthly" as const, priority: 0.75 },
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
    {
      path: "/resources",
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
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
      path: "/resources/projects",
      changeFrequency: "monthly" as const,
      priority: 0.72,
    },
    ...FIELD_PROBLEMS.map((problem) => ({
      path: `/resources/problems/${problem.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...FIELD_SKILLS.map((skill) => ({
      path: `/resources/skills/${skill.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      path: "/compare",
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    ...COMPARISONS.map((comparison) => ({
      path: `/compare/${comparison.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ].map(({ path, ...route }) => ({
    url: baseUrl + path,
    lastModified,
    ...route,
  }));
}
