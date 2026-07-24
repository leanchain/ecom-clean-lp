export default function Head() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": baseUrl + "/#organization",
        name: "Beseam",
        url: baseUrl,
        logo: baseUrl + "/favicon/favicon-96x96.png",
        sameAs: ["https://www.linkedin.com/company/beseam/"],
      },
      {
        "@type": "WebSite",
        "@id": baseUrl + "/#website",
        url: baseUrl,
        name: "Beseam",
        publisher: { "@id": baseUrl + "/#organization" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": baseUrl + "/#store-health",
        name: "Beseam Store Health",
        url: baseUrl + "/shopify-store-health",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "An evidence-backed workspace for Shopify discoverability, purchase health and monitoring coverage.",
        publisher: { "@id": baseUrl + "/#organization" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": baseUrl + "/#ai-visibility",
        name: "Beseam AI Visibility",
        url: baseUrl + "/ai-visibility-monitoring",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "AI visibility monitoring for product presence, accuracy, merchant control, citations and competitors across configured answer-engine queries.",
        publisher: { "@id": baseUrl + "/#organization" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
