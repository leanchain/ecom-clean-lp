const STORE_DOMAIN_PATTERN = /^[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+$/i;

export function normalizeStoreDomain(value: string) {
  const domain = value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0]
    .toLowerCase();

  if (!domain) {
    return { error: "Enter your Shopify store domain first." };
  }

  if (domain.includes(" ") || !STORE_DOMAIN_PATTERN.test(domain)) {
    return {
      error: "Use a store domain like yourstore.myshopify.com or example.com.",
    };
  }

  return { domain };
}
