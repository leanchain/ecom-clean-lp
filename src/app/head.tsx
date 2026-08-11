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
          "AI product recommendation testing for ecommerce: run buying questions, record the products and competitors named, inspect actionable product evidence, and re-run the same question after an approved change.",
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
