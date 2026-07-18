const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function getUtmValues(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const value = params.get(key);
      return value ? [[key, value]] : [];
    }),
  );
}

export function getMarketingProperties(placement: string, destination: string) {
  if (typeof window === "undefined")
    return { page: "", placement, destination };
  return {
    page: window.location.pathname,
    placement,
    destination,
    ...getUtmValues(),
  };
}

export function withCurrentUtm(destination: string) {
  if (typeof window === "undefined") return destination;
  const target = new URL(destination, window.location.origin);
  const incoming = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = incoming.get(key);
    if (value && !target.searchParams.has(key))
      target.searchParams.set(key, value);
  }
  return target.origin === window.location.origin
    ? target.pathname + target.search + target.hash
    : target.toString();
}
