import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";
  return {
    rules: [
      {
        userAgent: "BeseamBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: baseUrl + "/sitemap.xml",
    host: baseUrl,
  };
}
