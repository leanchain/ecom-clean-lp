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
        "@id": baseUrl + "/#beseam",
        name: "Beseam",
        url: baseUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Beseam is an AI commerce control plane: visibility into where AI shopping agents find or skip your products, catalog and store-health fixes, campaign readiness, and the analytics, behavior, and proof data to know what worked.",
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
