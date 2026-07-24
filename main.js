const ALLOWED_ORIGINS = new Set([
  "https://beseam.com",
  "https://www.beseam.com",
]);

const LEGACY_PATHS = new Map([
  ["/demo", { pathname: "/store-health-review" }],
  ["/product", { pathname: "/shopify-store-health" }],
  ["/scan", { pathname: "/tools/ai-visibility-scan" }],
  ["/free-scan", { pathname: "/tools/ai-visibility-scan" }],
  ["/ai-visibility-scan", { pathname: "/tools/ai-visibility-scan" }],
  ["/pdp-analyzer", { pathname: "/tools/ai-visibility-scan" }],
  ["/example-pdp", { pathname: "/tools/ai-visibility-scan" }],
  ["/optimised-pdp", { pathname: "/tools/ai-visibility-scan" }],
  ["/reports", { pathname: "/tools/ai-visibility-scan" }],
  ["/alternatives", { pathname: "/shopify-store-health" }],
  ["/compare", { pathname: "/shopify-store-health" }],
  ["/comparison", { pathname: "/shopify-store-health" }],
  ["/old", { pathname: "/" }],
]);

const UTM_KEYS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function submitReview(request, env, url) {
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ error: "Origin not allowed." }, 403);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 8000)
    return json({ error: "Request is too large." }, 413);

  const raw = await request.text();
  if (raw.length > 8000) return json({ error: "Request is too large." }, 413);

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (clean(body.website, 200)) return json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const store = clean(body.store, 300);
  const message = clean(body.message, 2000);
  const utm =
    body.utm && typeof body.utm === "object"
      ? Object.fromEntries(
          Object.entries(body.utm)
            .filter(
              ([key, value]) => UTM_KEYS.has(key) && typeof value === "string",
            )
            .map(([key, value]) => [key, clean(value, 200)]),
        )
      : {};

  if (name.length < 2 || !validEmail(email) || store.length < 4) {
    return json(
      { error: "Name, work email and Shopify store URL are required." },
      400,
    );
  }

  if (!env.REVIEW_EMAIL) {
    return json({ error: "Review requests are temporarily unavailable." }, 503);
  }

  const textBody = [
    "New Store Health Review request",
    "",
    "Name: " + name,
    "Work email: " + email,
    "Shopify store: " + store,
    "Message: " + (message || "Not provided"),
    "",
    "Attribution:",
    JSON.stringify(utm, null, 2),
  ].join("\n");

  const htmlBody =
    "<h1>New Store Health Review request</h1>" +
    "<p><strong>Name:</strong> " +
    escapeHtml(name) +
    "</p><p><strong>Work email:</strong> " +
    escapeHtml(email) +
    "</p><p><strong>Shopify store:</strong> " +
    escapeHtml(store) +
    "</p><p><strong>Message:</strong><br>" +
    escapeHtml(message || "Not provided").replaceAll("\n", "<br>") +
    "</p><p><strong>Attribution:</strong><br><code>" +
    escapeHtml(JSON.stringify(utm)) +
    "</code></p>";

  try {
    await env.REVIEW_EMAIL.send({
      to: "contact@beseam.com",
      from: "website@beseam.com",
      replyTo: email,
      subject: "Store Health Review request - " + store,
      text: textBody,
      html: htmlBody,
    });
  } catch {
    return json({ error: "Review request could not be delivered." }, 502);
  }

  return json({ ok: true }, 202);
}

function legacyRedirect(url) {
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const target =
    LEGACY_PATHS.get(pathname) ||
    (pathname.startsWith("/audit/")
      ? { pathname: "/tools/ai-visibility-scan" }
      : pathname.startsWith("/alternatives/")
        ? { pathname: "/shopify-store-health" }
        : null);
  if (!target) return null;

  const destination = new URL(url);
  destination.pathname = target.pathname;
  destination.hash = target.hash || "";
  return Response.redirect(destination.toString(), 301);
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (
      request.method === "POST" &&
      url.pathname === "/api/store-health-review"
    ) {
      return submitReview(request, env, url);
    }

    if (request.method === "GET" || request.method === "HEAD") {
      const redirect = legacyRedirect(url);
      if (redirect) return redirect;
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
