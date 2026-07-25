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
  ["/alternatives", { pathname: "/compare" }],
  ["/comparison", { pathname: "/compare" }],
  ["/old", { pathname: "/" }],
]);

const LEAD_SOURCES = new Set([
  "ai_visibility_scan",
  "platform_audit",
  "store_health_review",
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

async function readLead(request, url, forcedSource) {
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin && !ALLOWED_ORIGINS.has(origin)) {
    return { response: json({ error: "Origin not allowed." }, 403) };
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 8000)
    return { response: json({ error: "Request is too large." }, 413) };

  const raw = await request.text();
  if (raw.length > 8000)
    return { response: json({ error: "Request is too large." }, 413) };

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return { response: json({ error: "Invalid request." }, 400) };
  }

  // Honeypot: real people leave this hidden field empty.
  if (clean(body.website, 200)) return { response: json({ ok: true }) };

  const source = forcedSource || clean(body.source, 60);
  if (!LEAD_SOURCES.has(source)) {
    return { response: json({ error: "Unknown lead source." }, 400) };
  }

  const email = clean(body.email, 200).toLowerCase();
  if (!validEmail(email)) {
    return { response: json({ error: "Enter a valid work email." }, 400) };
  }

  return {
    lead: {
      source,
      email,
      name: clean(body.name, 100),
      store: clean(body.store, 300),
      message: clean(body.message, 2000),
      utm:
        body.utm && typeof body.utm === "object"
          ? Object.fromEntries(
              Object.entries(body.utm)
                .filter(
                  ([key, value]) =>
                    UTM_KEYS.has(key) && typeof value === "string",
                )
                .map(([key, value]) => [key, clean(value, 200)]),
            )
          : {},
    },
  };
}

let sendPulseToken = null;

async function getSendPulseToken(env, force) {
  if (
    !force &&
    sendPulseToken &&
    sendPulseToken.expiresAt > Date.now() + 60_000
  ) {
    return sendPulseToken.token;
  }

  const response = await fetch("https://api.sendpulse.com/oauth/access_token", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: env.SENDPULSE_CLIENT_ID,
      client_secret: env.SENDPULSE_CLIENT_SECRET,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload || !payload.access_token) {
    throw new Error("SendPulse token request failed: " + response.status);
  }

  sendPulseToken = {
    token: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in || 3600) * 1000,
  };
  return sendPulseToken.token;
}

/**
 * Adds the contact to the configured SendPulse address book.
 * Variables beyond Name must already exist in that address book.
 */
async function addLeadToSendPulse(env, lead) {
  if (
    !env.SENDPULSE_CLIENT_ID ||
    !env.SENDPULSE_CLIENT_SECRET ||
    !env.SENDPULSE_ADDRESS_BOOK_ID
  ) {
    throw new Error("SendPulse is not configured for this environment.");
  }

  const variables = { Source: lead.source };
  if (lead.name) variables.Name = lead.name;
  if (lead.store) variables.Store = lead.store;
  if (lead.message) variables.Message = lead.message.slice(0, 500);
  if (lead.utm.utm_source) variables.UtmSource = lead.utm.utm_source;
  if (lead.utm.utm_medium) variables.UtmMedium = lead.utm.utm_medium;
  if (lead.utm.utm_campaign) variables.UtmCampaign = lead.utm.utm_campaign;

  const send = async (token) =>
    fetch(
      "https://api.sendpulse.com/addressbooks/" +
        env.SENDPULSE_ADDRESS_BOOK_ID +
        "/emails",
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "content-type": "application/json",
        },
        body: JSON.stringify({ emails: [{ email: lead.email, variables }] }),
      },
    );

  let response = await send(await getSendPulseToken(env, false));
  if (response.status === 401) {
    sendPulseToken = null;
    response = await send(await getSendPulseToken(env, true));
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok || (payload && payload.result === false)) {
    throw new Error("SendPulse rejected the contact: " + response.status);
  }
}

async function submitScanLead(lead, env) {
  try {
    await addLeadToSendPulse(env, lead);
  } catch (error) {
    console.error("[lead] SendPulse capture failed", lead.source, error);
    return json({ error: "We could not store your email right now." }, 502);
  }

  return json({ ok: true }, 202);
}

async function submitReview(lead, env) {
  const { name, email, store, message, utm } = lead;

  if (name.length < 2 || store.length < 4) {
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

  // The booking email is the record that matters; a SendPulse outage must not
  // fail a review request that has already been delivered.
  try {
    await addLeadToSendPulse(env, lead);
  } catch (error) {
    console.error("[lead] SendPulse capture failed for review request", error);
  }

  return json({ ok: true }, 202);
}

function legacyRedirect(url) {
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const target =
    LEGACY_PATHS.get(pathname) ||
    (pathname.startsWith("/alternatives/")
      ? { pathname: "/compare/" + pathname.slice("/alternatives/".length) }
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

    if (request.method === "POST" && url.pathname === "/api/lead") {
      const parsed = await readLead(request, url, null);
      if (parsed.response) return parsed.response;
      return parsed.lead.source === "store_health_review"
        ? submitReview(parsed.lead, env)
        : submitScanLead(parsed.lead, env);
    }

    // Legacy endpoint kept for anything still posting the old shape.
    if (
      request.method === "POST" &&
      url.pathname === "/api/store-health-review"
    ) {
      const parsed = await readLead(request, url, "store_health_review");
      if (parsed.response) return parsed.response;
      return submitReview(parsed.lead, env);
    }

    if (request.method === "GET" || request.method === "HEAD") {
      const redirect = legacyRedirect(url);
      if (redirect) return redirect;
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
