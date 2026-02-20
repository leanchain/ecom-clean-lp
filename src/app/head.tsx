export default function Head() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Beseam",
        url: baseUrl,
        logo: `${baseUrl}/favicon/favicon-96x96.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Beseam",
        publisher: { "@id": `${baseUrl}/#organization` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
