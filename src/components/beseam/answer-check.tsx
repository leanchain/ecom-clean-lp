"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  Lock,
  Printer,
  RefreshCw,
  Share2,
  X,
} from "lucide-react";

import type {
  Answer,
  AnswerCheckResult,
  ShownProduct,
} from "@/components/beseam/answer-check-types";
import { ChannelIcon } from "@/components/beseam/channel-icon";
import TrackedLink from "@/components/beseam/tracked-link";
import useAnalytics from "@/hooks/useAnalytics";
import { APP_REGISTER_URL, APP_REPORT_URL } from "@/lib/app-urls";

export type { AnswerCheckResult };

const POLL_MS = 6000;
const MAX_POLLS = 60; // ~6 minutes, then stop asking

const LIVE_STATUSES = new Set(["running", "queued", "validating"]);
const PENDING_PAGE_AUDIT_STATUSES = new Set(["queued", "running"]);

// `awaiting_verification` is not a resting state: the free five-PDP sample keeps
// landing behind it, and its findings only reach the card on a later fetch. Poll
// on the work that is actually outstanding rather than on the status word alone,
// so a still-active progress step can never spin forever.
export function isScanInFlight(result: AnswerCheckResult) {
  return (
    LIVE_STATUSES.has(result.status) ||
    PENDING_PAGE_AUDIT_STATUSES.has(result.page_audits_status ?? "") ||
    result.steps.some((step) => step.state === "active")
  );
}

function faviconHost(raw: string | null | undefined): string | null {
  const value = (raw ?? "").trim().toLowerCase();
  if (!value) return null;
  const host = value
    .replace(/^[a-z]+:\/\//, "")
    .split("/")[0]
    .split("?")[0]
    .split(":")[0]
    .replace(/^www\./, "");
  return host.includes(".") ? host : null;
}

function BrandFavicon({
  domain,
  name,
}: {
  domain?: string | null;
  name: string;
}) {
  const [source, setSource] = useState<"site" | "google" | "fallback">("site");
  // A favicon that is slow, missing, or blocked used to leave an empty bordered
  // square as the first glyph on the result. The initial is drawn immediately
  // and the image only replaces it once it has actually decoded.
  const [loaded, setLoaded] = useState(false);
  const host = faviconHost(domain);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (!host) return null;

  if (source !== "fallback") {
    const src =
      source === "site"
        ? `https://${host}/favicon.ico`
        : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
    return (
      <span
        aria-hidden="true"
        className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center border border-black/14 bg-white font-mono text-[11px] font-semibold text-black/58"
      >
        {loaded ? null : initial}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setSource(source === "site" ? "google" : "fallback")}
          className={`absolute inset-0 h-full w-full object-contain p-0.5 ${loaded ? "" : "opacity-0"}`}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-black/14 bg-white font-mono text-[11px] font-semibold text-black/58"
    >
      {initial}
    </span>
  );
}

const FINDING_RANK: Record<string, number> = {
  blocker: 0,
  high: 1,
  medium: 2,
  low: 3,
  info: 4,
};

function sortedFindings(result: AnswerCheckResult) {
  return [...result.findings].sort(
    (a, b) =>
      (FINDING_RANK[a.severity ?? "medium"] ?? 2) -
      (FINDING_RANK[b.severity ?? "medium"] ?? 2),
  );
}

function findingArea(code: string) {
  if (code.startsWith("seo.")) return "Search & structured data";
  if (code.startsWith("i18n.")) return "Internationalization";
  if (code.startsWith("security.")) return "Trust & delivery";
  if (code.startsWith("geo.")) return "Machine readability";
  return "Product evidence";
}

const RIVAL_LIMIT = 6;

// "Amazon / EverJoy Daily" and "BLOCH Dance US (official)" are the same rival
// showing up twice. Collapse to the brand so the tally means something.
function rivalIdentity(raw: string) {
  const label = raw
    .split("/")[0]
    .replace(/\(.*?\)/g, "")
    .trim();
  return { key: label.toLowerCase(), label };
}

function tallyRivals(answers: Answer[]) {
  const counts = new Map<string, { label: string; count: number }>();
  for (const answer of answers) {
    for (const raw of answer.competitors ?? []) {
      const { key, label } = rivalIdentity(raw);
      if (!key) continue;
      const entry = counts.get(key);
      if (entry) entry.count += 1;
      else counts.set(key, { label, count: 1 });
    }
  }
  // "Bloch" and "BLOCH Dance US" are one rival: fold the longer label into the
  // shorter one it starts with.
  const entries = Array.from(counts.entries()).sort(
    (a, b) => a[0].length - b[0].length,
  );
  const merged: { key: string; label: string; count: number }[] = [];
  for (const [key, value] of entries) {
    const parent = merged.find((item) => key.startsWith(`${item.key} `));
    if (parent) parent.count += value.count;
    else merged.push({ key, ...value });
  }
  return merged.sort((a, b) => b.count - a.count);
}

// Three signals only: green won, red lost, ink in between. Blue is reserved
// for things you can click. The reds are the light-ground signal (#b8441d);
// #e8653a only ever sits on the dark grounds.
// Platform names arrive lowercase from the API. They are proper nouns on the
// card, where every other identifier is set the way its owner writes it.
const PLATFORM_LABELS: Record<string, string> = {
  shopify: "Shopify",
  woocommerce: "WooCommerce",
  bigcommerce: "BigCommerce",
  magento: "Magento",
  squarespace: "Squarespace",
  wix: "Wix",
  prestashop: "PrestaShop",
  generic: "Storefront",
};

function platformLabel(platform: string) {
  const key = platform.trim().toLowerCase();
  return (
    PLATFORM_LABELS[key] ?? platform.charAt(0).toUpperCase() + platform.slice(1)
  );
}

function scoreBand(score: number) {
  if (score >= 70)
    return { label: "Strong", text: "text-[#1a6b43]", fill: "bg-[#1f7a4d]" };
  if (score >= 40)
    return { label: "Mixed", text: "text-[#111318]", fill: "bg-[#111318]" };
  if (score >= 15)
    return { label: "Weak", text: "text-[#b8441d]", fill: "bg-[#d95028]" };
  return {
    label: "Barely visible",
    text: "text-[#b8441d]",
    fill: "bg-[#d95028]",
  };
}

// The card only ever knows the channel's display label, so map it to a mark.
const CHANNEL_BRAND_KEYS: Record<string, string> = {
  chatgpt: "openai_web_search_probe",
  "chatgpt shopping": "openai_web_search_probe",
  "google ai mode": "google_ai_mode_readiness",
  "google shopping": "google_structured_data",
  gemini: "gemini_grounded_probe",
  perplexity: "perplexity_search_probe",
  claude: "claude_web_search_probe",
  "bing (copilot)": "copilot_consumer_observation",
  copilot: "copilot_consumer_observation",
};

function AiVisibilityWorkspace({ result }: { result: AnswerCheckResult }) {
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  if (!scored.length) return null;

  const named = scored.filter((answer) => answer.mentioned === true).length;
  const channels = Array.from(
    new Set(
      scored
        .map((answer) => answer.channel_label)
        .filter((label): label is string => Boolean(label)),
    ),
  );
  const engines = channels.map((channel) => {
    const observations = scored.filter(
      (answer) => answer.channel_label === channel,
    );
    const wins = observations.filter(
      (answer) => answer.mentioned === true,
    ).length;
    return {
      channel,
      wins,
      total: observations.length,
      pct: observations.length
        ? Math.round((wins / observations.length) * 100)
        : 0,
    };
  });
  const rivals = tallyRivals(scored);
  const topRival = rivals[0] ?? null;
  const pct = Math.round((named / scored.length) * 100);
  const questionCount = new Set(
    scored.map((answer) => answer.question).filter(Boolean),
  ).size;

  return (
    <section className="bg-[#fffaf7]">
      <div className="bg-[#fffaf7]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e4ded6] bg-white px-5 py-5 sm:px-6">
          <div>
            <span className="inline-flex items-center border-l-2 border-[#b8441d] pl-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/56">
              Observe · live answer evidence
            </span>
            <h4 className="mt-4 text-[24px] font-semibold tracking-[-0.025em] text-[#111318]">
              What shoppers are being told
            </h4>
            <p className="mt-2 max-w-[66ch] text-[13.5px] leading-relaxed text-[#5f5a55]">
              Verified buyer-question observations, kept with the assistant,
              competing brands, and surfaced products.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 border border-black/18 bg-white px-3 py-1.5 text-[12px] font-semibold text-[#111318]">
            <span
              className="h-2 w-2 rounded-full bg-[#1f7a4d]"
              aria-hidden="true"
            />
            Verified run complete
          </span>
        </div>

        <div className="grid gap-0 border-t border-black/12 bg-white lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="flex flex-col border-b border-black/12 p-5 sm:px-6 lg:border-b-0 lg:border-r">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#5f5a55]">
              Brand appearance
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <span
                className={`text-[46px] font-semibold leading-none tracking-[-0.04em] tabular-nums ${scoreBand(pct).text}`}
              >
                {named}/{scored.length}
              </span>
              {/* scoreBand already computes the word; showing only its colour
                  threw away the one piece of interpretation the code had. */}
              <span
                className={`mb-1 border border-black/14 bg-white px-2.5 py-1 font-mono text-[11px] font-semibold ${scoreBand(pct).text}`}
              >
                {scoreBand(pct).label} · {pct}% of observed answers
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-[12.5px] leading-relaxed text-[#3b3833]">
              {named === scored.length
                ? "Your brand appeared in every observed answer in this run."
                : named === 0
                  ? "Your brand did not appear in any observed answer in this run."
                  : `Your brand was absent from ${scored.length - named} of ${scored.length} observed answers.`}
            </p>

            {topRival && named < scored.length ? (
              <div className="mt-5 border border-black/14 bg-[#fafafa] p-4">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-[#c8891f]"
                    aria-hidden="true"
                  />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a5a12]">
                    Needs attention
                  </p>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#3b3833]">
                  {topRival.label} was the most frequently named alternative in
                  this sample ({topRival.count}×).
                </p>
              </div>
            ) : null}
          </div>

          <div className="p-5 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#5f5a55]">
                By assistant
              </p>
              <span className="font-mono text-[11px] text-[#6f6862]">
                {channels.length}{" "}
                {channels.length === 1 ? "assistant" : "assistants"}
              </span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {engines.map((engine) => (
                <div
                  key={engine.channel}
                  className="border border-black/14 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5 text-[13px] font-semibold text-[#111318]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-black/14 bg-white">
                        <ChannelIcon
                          channel={
                            CHANNEL_BRAND_KEYS[engine.channel.toLowerCase()] ??
                            engine.channel
                          }
                          className="h-4 w-4 opacity-80"
                        />
                      </span>
                      <span className="truncate">{engine.channel}</span>
                    </span>
                    <span className="font-mono text-[12px] text-[#5f5a55]">
                      {engine.wins}/{engine.total}
                    </span>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#efe9e1]">
                    <span
                      className={`block h-full rounded-full ${scoreBand(engine.pct).fill}`}
                      style={{ width: `${Math.max(engine.pct, 1.5)}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-[#5f5a55]">
                    <span>{engine.wins} named you</span>
                    <span>{engine.total - engine.wins} missed you</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <dl className="grid border-t border-[#e4ded6] bg-white sm:grid-cols-3">
          {[
            ["Observed answers", String(scored.length)],
            ["Buyer questions", String(questionCount)],
            ["Rivals named", String(rivals.length)],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`px-5 py-4 sm:px-6 ${index > 0 ? "border-t border-[#e4ded6] sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6f6862]">
                {label}
              </dt>
              <dd className="mt-1.5 text-[18px] font-semibold text-[#111318]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
const OBSERVATION_METHOD_LABEL: Record<
  NonNullable<Answer["observation_method"]>,
  string
> = {
  probe: "Probe",
  live_serp: "Live SERP",
  consumer_sample: "Consumer sample",
  derived: "Derived",
  fallback: "Fallback",
};
function ChannelChip({ channel, answer }: { channel: string; answer: Answer }) {
  const named = answer.mentioned === true;
  const unknown = answer.mentioned === null || Boolean(answer.error);
  const tone = unknown
    ? "border-black/20 bg-black/[0.03] text-black/62"
    : named
      ? "border-[#1f7a4d]/40 bg-[#1f7a4d]/10 text-[#1a6b43]"
      : "border-[#b8441d]/45 bg-[#b8441d]/[0.08] text-[#b8441d]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-[12px] font-medium ${tone}`}
    >
      <ChannelIcon
        channel={CHANNEL_BRAND_KEYS[channel.toLowerCase()] ?? channel}
        className="h-3 w-3 opacity-70"
      />
      {channel}
      {/* The outcome follows the name it belongs to: a mark in front of the
          label reads as a dismiss affordance, not a result. */}
      {unknown ? (
        <span aria-hidden="true">–</span>
      ) : named ? (
        <Check className="h-2.5 w-2.5" aria-hidden="true" />
      ) : (
        <X className="h-2.5 w-2.5" aria-hidden="true" />
      )}
      {answer.observation_method ? (
        <span className="border-l border-current/20 pl-1.5 font-mono text-[11px] font-normal opacity-70">
          {OBSERVATION_METHOD_LABEL[answer.observation_method]}
        </span>
      ) : null}
      <span className="sr-only">
        {unknown ? "no answer" : named ? "named you" : "did not name you"}
      </span>
    </span>
  );
}

function shownProducts(answers: Answer[]) {
  const seen = new Set<string>();
  const tiles: ShownProduct[] = [];
  for (const answer of answers) {
    for (const product of answer.products ?? []) {
      const key = product.title.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      tiles.push(product);
    }
  }
  // Anything of yours that did surface leads the shelf; tiles that carry an
  // image come next, because a shelf of empty boxes says nothing.
  // Every product the assistants surfaced is shown; the shelf scrolls.
  return tiles.sort(
    (a, b) =>
      Number(b.ours) - Number(a.ours) ||
      Number(Boolean(b.image_url)) - Number(Boolean(a.image_url)),
  );
}

// Merchant CDNs refuse hotlinked images (Cross-Origin-Resource-Policy), so the
// image comes back through our own worker instead of straight from the CDN.
function ProductTile({ product }: { product: ShownProduct }) {
  // Stage 1 is the worker proxy (the only thing that beats hotlink blocking).
  // `next dev` does not run the worker, so fall back to the CDN URL there
  // before giving up on the image entirely.
  const [stage, setStage] = useState<"proxy" | "direct" | "none">("proxy");
  const src = !product.image_url
    ? null
    : stage === "proxy"
      ? `/api/product-image?u=${encodeURIComponent(product.image_url)}`
      : stage === "direct"
        ? product.image_url
        : null;

  return (
    <li className="border border-black/12">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#fafafa]">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            loading="lazy"
            onError={() => setStage(stage === "proxy" ? "direct" : "none")}
            className="h-full w-full object-contain mix-blend-multiply"
          />
        ) : (
          <span className="px-2 text-center text-[12px] leading-tight text-black/62">
            {product.merchant ?? "No image"}
          </span>
        )}
        {product.ours ? (
          <span className="absolute left-0 top-0 bg-[#1f7a4d] px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-white">
            yours
          </span>
        ) : null}
      </div>
      <div className="border-t border-black/10 px-2.5 py-2">
        <p className="line-clamp-2 text-[11.5px] font-semibold leading-snug text-[#111318]">
          {product.title}
        </p>
        <p className="mt-1 text-[11px] leading-snug text-black/48">
          {product.merchant ?? "Merchant"}
          {product.price ? ` · ${product.price}` : ""}
        </p>
        {product.url && product.link_live ? (
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex text-[11px] font-semibold text-[#111318] underline decoration-black/24 underline-offset-4 hover:decoration-[#b8441d]"
          >
            Open product →
          </a>
        ) : null}
      </div>
    </li>
  );
}
function InitialScanSummary({ result }: { result: AnswerCheckResult }) {
  const findings = sortedFindings(result);
  const audits = result.page_audits ?? [];
  const pageAuditStatus =
    result.page_audits_status ?? (audits.length ? "complete" : "not_started");
  const pageAuditsInFlight =
    pageAuditStatus === "queued" || pageAuditStatus === "running";
  const catalogFindings = findings.filter(
    (finding) =>
      finding.source !== "page_audit" && finding.source !== "catalog_sample",
  );
  const consistencyFindings = findings.filter(
    (finding) => finding.source === "catalog_sample",
  );
  const evaluatedChecks = audits.reduce(
    (sum, audit) => sum + audit.checks_evaluated,
    0,
  );
  const failedChecks = audits.reduce(
    (sum, audit) => sum + audit.checks_failed,
    0,
  );

  const market = result.brand_evidence?.market ?? null;
  // Rows written before the inventory stage existed come back as `{}` rather
  // than absent. An empty object is truthy, so every `!inventory` guard below
  // would pass and then dereference `inventory.robots`, taking the whole card
  // down with a client-side exception. Treat an incomplete payload as absent.
  const rawInventory = result.site_inventory;
  const inventory =
    rawInventory?.robots &&
    rawInventory.sitemap &&
    rawInventory.search_crawlers &&
    rawInventory.assistant_crawlers
      ? rawInventory
      : undefined;
  const rawCatalog = result.catalog_inventory;
  const catalog =
    rawCatalog &&
    rawCatalog.products_checked != null &&
    rawCatalog.describability
      ? rawCatalog
      : undefined;
  const rawPageTypes = inventory?.page_types ?? {};
  const entityPageTypes = inventory?.entity_page_types ?? rawPageTypes;
  const siteHosts = Object.keys(inventory?.hosts ?? {});
  const localeCount = inventory?.locales?.length ?? 0;
  const entitySuffix = inventory?.urls_capped ? "+" : "";
  const siteProductCount = entityPageTypes.product ?? 0;
  const productCount =
    catalog && !catalog.products_capped
      ? catalog.products_checked
      : siteProductCount || result.products_seen;
  const productCountSuffix =
    catalog && !catalog.products_capped ? "" : entitySuffix;
  // A measured catalog count is the only one allowed to be called a collection.
  // The URL inventory counts collection *URLs*, which includes locale copies, so
  // it routinely exceeds the real number by an order of magnitude — printing it
  // as "1,346 collections" next to "291 products" is a claim the merchant can
  // disprove from memory, and it discredits every other number on the card.
  const collectionsMeasured = catalog?.collections_status === "measured";
  const collectionCount = collectionsMeasured
    ? Number(catalog?.collections_checked ?? 0)
    : (entityPageTypes.collection ?? 0);
  const collectionCountSuffix = collectionsMeasured
    ? catalog?.collections_capped
      ? "+"
      : ""
    : entitySuffix;
  const collectionNoun = collectionsMeasured
    ? "collections"
    : "collection URLs";
  const contentPageCount = entityPageTypes.page ?? 0;
  const articleCount = entityPageTypes.article ?? 0;
  const blogCount = entityPageTypes.blog ?? 0;
  const policyCount = entityPageTypes.policy ?? 0;
  const inventoryUrlLabel = inventory
    ? `${inventory.urls_discovered}${inventory.urls_capped ? "+" : ""} URLs`
    : `${result.products_seen} products sampled`;
  const robotsLabel = !inventory
    ? "Not measured"
    : inventory.robots.status === "rules_found"
      ? "Readable"
      : inventory.robots.status === "open"
        ? "Open"
        : inventory.robots.status === "unavailable"
          ? "Unavailable"
          : "Not measured";
  const sitemapLabel = !inventory
    ? "Not measured"
    : inventory.sitemap.status === "found"
      ? "Found"
      : inventory.sitemap.status === "declared"
        ? "Declared"
        : inventory.sitemap.status === "not_found"
          ? "Not found"
          : "Not measured";
  const crawlerLabel =
    !inventory || inventory.search_crawlers.status !== "measured"
      ? "Not measured"
      : inventory.search_crawlers.blocked > 0
        ? `${inventory.search_crawlers.blocked} blocked`
        : "Open";
  const discoveryFiles = Object.entries(inventory?.discovery_files ?? {});
  const discoveryFilesPresent = discoveryFiles.filter(
    ([, value]) => value.present === true,
  ).length;
  const internalReach = inventory?.internal_reach;
  const internalReachLabel = !internalReach
    ? "Not measured"
    : internalReach.status === "sampled"
      ? `${internalReach.internal_links ?? 0} homepage links · ${internalReach.product_links ?? 0} product · ${internalReach.collection_links ?? 0} collection`
      : internalReach.status === "not_measured"
        ? "Not measured in quick scan"
        : internalReach.status;

  const siteMapRows = (
    [
      ["Product pages", `${productCount}${productCountSuffix}`],
      [
        collectionsMeasured ? "Collections" : "Collection URLs",
        `${collectionCount}${collectionCountSuffix}`,
      ],
      ["Pages", `${contentPageCount}${entitySuffix}`],
      ["Articles", `${articleCount}${entitySuffix}`],
      ["Blogs", `${blogCount}${entitySuffix}`],
      ["Policies", `${policyCount}${entitySuffix}`],
      [
        "Locale URL copies",
        `${inventory?.localized_url_copies ?? 0}${inventory?.urls_capped ? "+" : ""}`,
      ],
    ] as Array<[string, string]>
  ).filter(([, value]) => Number.parseInt(value, 10) > 0);

  const staticAreas = [
    { label: "Search & page signals", domains: ["seo"] },
    { label: "Product & shopping data", domains: ["shopping"] },
    { label: "Content & merchandising", domains: ["aeo", "cro", "geo"] },
    { label: "Trust & purchase confidence", domains: ["eeat", "compliance"] },
    { label: "Markets & localization", domains: ["i18n"] },
    { label: "Technical & security", domains: ["security"] },
  ].map((area) => {
    const counts = audits.reduce(
      (acc, audit) => {
        for (const domain of area.domains) {
          const row = audit.domain_counts?.[domain];
          if (!row) continue;
          acc.evaluated += Number(row.evaluated ?? 0);
          acc.failed += Number(row.failed ?? 0);
          acc.unevaluated += Number(row.unevaluated ?? 0);
        }
        return acc;
      },
      { evaluated: 0, failed: 0, unevaluated: 0 },
    );
    return { ...area, ...counts };
  });

  const Fold = ({
    title,
    summary,
    children,
  }: {
    title: string;
    summary: string;
    children: React.ReactNode;
  }) => (
    <details className="group border-b border-black/14 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-[#111318]">{title}</h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-black/56">
            {summary}
          </p>
        </div>
        <span className="flex min-h-11 shrink-0 items-center gap-2 text-[12px] font-semibold text-[#111318]">
          <span className="group-open:hidden">Details</span>
          <span className="hidden group-open:inline">Close</span>
          <ChevronDown
            className="h-4 w-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-black/12 bg-[#fffaf7]">{children}</div>
    </details>
  );

  const catalogCheckedLabel = catalog
    ? `${catalog.products_checked}${catalog.products_capped ? "+" : ""} products checked`
    : `${result.products_seen} products sampled`;

  return (
    <section className="border-b border-black/14 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/14 bg-[#fffaf7] px-5 py-3.5 sm:px-6">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b8441d]">
            {pageAuditsInFlight
              ? "Observe · first results ready"
              : "Observe complete"}
          </p>
          <p className="mt-1 text-[12px] text-black/52">
            {pageAuditsInFlight
              ? "Store and catalog are ready while representative product pages finish."
              : "You can see where the gaps are. Next, understand what is driving them."}
          </p>
        </div>
        <span className="border border-black/14 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#111318]">
          {pageAuditsInFlight ? "Inspecting pages" : "Observed"}
        </span>
      </div>

      <Fold
        title="Store"
        summary={
          inventory
            ? `${productCount}${productCountSuffix} products · ${collectionCount}${collectionCountSuffix} ${collectionNoun} · ${localeCount ? `${localeCount} locale paths` : (market ?? "primary storefront")} · sitemap ${sitemapLabel.toLowerCase()} · crawler access ${crawlerLabel.toLowerCase()}`
            : `${result.brand ?? result.domain} · ${result.platform ?? "platform unknown"}`
        }
      >
        <div className="grid gap-px bg-black/10 sm:grid-cols-4">
          <div className="bg-white px-5 py-4 sm:px-6">
            <p className="text-[11px] text-black/42">Store</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#111318]">
              {result.brand ?? result.domain}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {result.platform ?? "Storefront"}
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[11px] text-black/42">Public footprint</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#111318]">
              {inventoryUrlLabel}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {inventory?.localized_url_copies
                ? `${inventory.localized_url_copies}+ localized URL copies`
                : "Public URLs discovered"}
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[11px] text-black/42">Locale paths</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#111318]">
              {localeCount || "Primary"}
            </p>
            <p className="mt-0.5 text-[11px] text-black/48">
              {inventory?.locales.length
                ? inventory.locales.join(", ")
                : (market ?? "Primary storefront")}
            </p>
          </div>
          <div className="bg-white px-5 py-4 sm:px-6">
            <p className="text-[11px] text-black/42">Domains</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#111318]">
              {siteHosts.length || 1}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-black/48">
              {siteHosts.join(", ") || result.domain}
            </p>
          </div>
        </div>

        {inventory ? (
          <div className="border-t border-black/10 bg-[#fffaf7] px-5 py-5 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <p className="text-[11px] font-semibold text-[#111318]">
                  What exists
                </p>
                <div className="mt-3 grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-3 lg:grid-cols-2">
                  {siteMapRows.map(([label, count]) => (
                    <div key={label} className="bg-white px-3 py-3">
                      <p className="text-[11px] text-black/44">{label}</p>
                      <p className="mt-1 text-[18px] font-semibold text-[#111318] tabular-nums">
                        {count}
                      </p>
                    </div>
                  ))}
                </div>
                {inventory.urls_capped ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-black/42">
                    Counts with + are lower bounds because the quick URL
                    inventory reached its 5,000-URL cap.
                  </p>
                ) : null}
              </div>

              <div>
                <p className="text-[11px] font-semibold text-[#111318]">
                  Can it be discovered?
                </p>
                <dl className="mt-3 divide-y divide-black/10 border-y border-black/10 bg-white">
                  {[
                    [
                      "robots.txt",
                      robotsLabel,
                      inventory.robots.status === "unavailable",
                    ],
                    [
                      "Sitemap",
                      `${sitemapLabel}${inventory.sitemap.urls_from_sitemap ? ` · ${inventory.sitemap.urls_from_sitemap}${inventory.urls_capped ? "+" : ""} URLs` : ""}`,
                      inventory.sitemap.status === "not_found",
                    ],
                    [
                      "Search crawlers",
                      inventory.search_crawlers.status === "measured"
                        ? `${inventory.search_crawlers.allowed}/${inventory.search_crawlers.total} allowed`
                        : "Not measured",
                      inventory.search_crawlers.blocked > 0,
                    ],
                    [
                      "Assistant crawlers",
                      inventory.assistant_crawlers.status === "measured"
                        ? `${inventory.assistant_crawlers.allowed}/${inventory.assistant_crawlers.total} allowed`
                        : "Not measured",
                      inventory.assistant_crawlers.blocked > 0,
                    ],
                    [
                      "URLs blocked by robots",
                      inventory.robots.blocked_urls == null
                        ? "Not measured"
                        : String(inventory.robots.blocked_urls),
                      Number(inventory.robots.blocked_urls ?? 0) > 0,
                    ],
                    ["Internal reach", internalReachLabel, false],
                    [
                      "Orphan products",
                      internalReach?.orphan_products === "not_measured"
                        ? "Not measured in quick scan"
                        : (internalReach?.orphan_products ?? "Not measured"),
                      false,
                    ],
                    [
                      "Discovery files",
                      discoveryFiles.length
                        ? `${discoveryFilesPresent}/${discoveryFiles.length} found`
                        : "Not measured",
                      false,
                    ],
                    [
                      "Sitemap freshness",
                      inventory.sitemap.dated_urls
                        ? `${inventory.sitemap.dated_urls}${inventory.urls_capped ? "+" : ""} dated URLs`
                        : "No dates exposed",
                      false,
                    ],
                    [
                      "Images in sitemap",
                      inventory.sitemap.image_entries
                        ? `${inventory.sitemap.image_entries}${inventory.urls_capped ? "+" : ""} references`
                        : "No image entries exposed",
                      false,
                    ],
                  ].map(([label, value, warn]) => (
                    <div
                      key={String(label)}
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-3 py-2.5"
                    >
                      <dt className="text-[11px] text-black/50">{label}</dt>
                      <dd
                        className={`text-right text-[11px] font-semibold ${warn ? "text-[#b8441d]" : "text-[#111318]"}`}
                      >
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
                {internalReach?.status === "sampled" ? (
                  <p className="mt-2 text-[11px] leading-relaxed text-black/42">
                    Homepage paths are sampled here. True orphan coverage needs
                    the full internal-link graph.
                  </p>
                ) : null}
                {discoveryFiles.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {discoveryFiles.map(([path, value]) => (
                      <span
                        key={path}
                        className={`border px-2 py-1 text-[11px] ${value.present ? "border-[#1f7a4d]/30 text-[#1f7a4d]" : "border-black/12 text-black/44"}`}
                      >
                        {path} ·{" "}
                        {value.present
                          ? "found"
                          : value.present === false
                            ? "not found"
                            : "not measured"}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Fold>

      <Fold
        title="Catalog"
        summary={
          catalog
            ? `${catalogCheckedLabel} · ${catalog.products_with_gaps} need attention · ${catalog.unavailable_products} unavailable${consistencyFindings.length ? ` · ${consistencyFindings.length} sampled consistency gaps` : ""}`
            : `${catalogFindings.length} catalog ${catalogFindings.length === 1 ? "gap" : "gaps"}`
        }
      >
        {catalog ? (
          <div className="bg-[#fffaf7] px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-[#111318]">
                  Can products be understood and distinguished?
                </p>
                <p className="mt-1 text-[11.5px] text-black/50">
                  {catalogCheckedLabel}
                  {catalog.products_capped
                    ? " · counts below cover the products checked"
                    : ""}
                </p>
              </div>
              <span className="text-[11px] text-black/44">
                {catalog.products_with_gaps} products with at least one gap
              </span>
            </div>

            <div className="mt-4 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">
                  Categories & collections
                </p>
                <p className="mt-2 text-[18px] font-semibold text-[#111318]">
                  {catalog.missing_product_types}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    without category
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.product_type_count ?? 0} product types ·{" "}
                  {collectionCount}
                  {collectionCountSuffix} {collectionNoun} ·{" "}
                  {catalog.missing_tags} without tags
                </p>
                <p className="mt-2 text-[11px] text-black/38">
                  Collection membership:{" "}
                  {catalog.collection_membership?.status === "not_measured"
                    ? "not measured in quick scan"
                    : (catalog.collection_membership?.status ?? "not measured")}
                </p>
                {catalog.top_product_types?.length ? (
                  <p className="mt-2 line-clamp-2 text-[11px] text-black/46">
                    Common product types:{" "}
                    {catalog.top_product_types
                      .slice(0, 4)
                      .map((item) => item.name)
                      .join(" · ")}
                  </p>
                ) : null}
                {catalog.collection_titles?.length ? (
                  <p className="mt-1 line-clamp-2 text-[11px] text-black/46">
                    Collections:{" "}
                    {catalog.collection_titles.slice(0, 4).join(" · ")}
                  </p>
                ) : null}
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">
                  Product identity
                </p>
                <p className="mt-2 text-[18px] font-semibold text-[#111318]">
                  {catalog.missing_identifiers}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    without SKU/barcode
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.placeholder_vendors} brand/vendor gaps ·{" "}
                  {catalog.identifier_conflicts} identifier conflicts
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">
                  Variants & buyer options
                </p>
                <p className="mt-2 text-[18px] font-semibold text-[#111318]">
                  {catalog.multi_variant_products}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    products with variants
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.default_only_options} expose no buyer options ·{" "}
                  {catalog.variant_option_gaps ?? 0} true variant-option gaps ·{" "}
                  {catalog.variant_identifier_gaps} variant ID gaps
                </p>
                {catalog.option_dimensions?.length ? (
                  <p className="mt-2 line-clamp-2 text-[11px] text-black/46">
                    Options:{" "}
                    {catalog.option_dimensions
                      .slice(0, 5)
                      .map((item) => item.name)
                      .join(" · ")}
                  </p>
                ) : null}
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">
                  Product information
                </p>
                <p className="mt-2 text-[18px] font-semibold text-[#111318]">
                  {catalog.describability.strong}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    well described
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.missing_descriptions} missing descriptions ·{" "}
                  {catalog.thin_descriptions} thin · {catalog.missing_images}{" "}
                  without images · {catalog.duplicate_description_products}{" "}
                  duplicate copy
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">
                  Availability
                </p>
                <p
                  className={`mt-2 text-[18px] font-semibold ${catalog.unavailable_products ? "text-[#b8441d]" : "text-[#111318]"}`}
                >
                  {catalog.unavailable_products}{" "}
                  <span className="text-[11px] font-normal text-black/46">
                    unavailable products
                  </span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  {catalog.total_variants} variants across{" "}
                  {catalog.products_checked} checked products
                </p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">
                  Product consistency
                </p>
                {pageAuditsInFlight ? (
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-black/52">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#b8441d]" />
                    Comparing representative PDPs…
                  </div>
                ) : (
                  <p className="mt-2 text-[18px] font-semibold text-[#111318]">
                    {consistencyFindings.length}{" "}
                    <span className="text-[11px] font-normal text-black/46">
                      sampled gaps
                    </span>
                  </p>
                )}
                <p className="mt-1 text-[11px] leading-relaxed text-black/48">
                  Catalog ↔ page data for price, availability, product data and
                  buyer attributes on {audits.length || result.products_seen}{" "}
                  representative PDPs.
                </p>
              </div>
            </div>

            {catalogFindings.length ? (
              <div className="mt-5 border-t border-black/10 pt-4">
                <p className="text-[11px] font-semibold text-[#111318]">
                  What stands out
                </p>
                <ul className="mt-2 divide-y divide-black/10 border-y border-black/10 bg-white px-3">
                  {catalogFindings.map((finding, index) => (
                    <li
                      key={`${finding.code}-${index}`}
                      className="flex items-start justify-between gap-4 py-3"
                    >
                      <div>
                        <p className="text-[11.5px] font-semibold text-[#111318]">
                          {finding.title}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-black/50">
                          {finding.detail}
                        </p>
                      </div>
                      {finding.severity === "high" ||
                      finding.severity === "blocker" ? (
                        <span className="shrink-0 text-[11px] font-semibold uppercase text-[#b8441d]">
                          High
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="bg-white px-5 py-4 text-[12.5px] text-black/54 sm:px-6">
            Catalog-wide detail is limited on this storefront; the
            representative product pages continue below.
          </div>
        )}
      </Fold>

      <Fold
        title="Product pages"
        summary={
          pageAuditsInFlight
            ? `${result.products_seen} representative PDPs · inspection in progress`
            : pageAuditStatus === "failed"
              ? `${result.products_seen} representative PDPs · page inspection could not complete`
              : `${audits.length} representative PDPs · ${evaluatedChecks} measured checks · ${failedChecks} review · ${staticAreas.reduce((sum, area) => sum + area.unevaluated, 0)} not measured`
        }
      >
        {pageAuditsInFlight ? (
          <div className="flex items-start gap-3 bg-white px-5 py-5 sm:px-6">
            <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-[#b8441d]" />
            <div>
              <p className="text-[12.5px] font-semibold text-[#111318]">
                Inspecting {result.products_seen} representative product pages
              </p>
              <p className="mt-1 text-[11.5px] text-black/50">
                Store and catalog evidence is already available above.
                Page-level results will appear here automatically.
              </p>
            </div>
          </div>
        ) : pageAuditStatus === "failed" ? (
          <p className="bg-white px-5 py-4 text-[12px] text-black/54 sm:px-6">
            The Store and Catalog observations are still valid. The
            representative PDP inspection could not complete on this run.
          </p>
        ) : (
          <>
            <div className="border-b border-black/12 bg-[#fffaf7] px-5 py-4 sm:px-6">
              <p className="text-[11px] font-semibold text-[#111318]">
                What the representative pages show
              </p>
              <div className="mt-3 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                {staticAreas.map((area) => (
                  <div key={area.label} className="bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold leading-snug text-[#111318]">
                      {area.label}
                    </p>
                    <div className="mt-2 flex items-baseline justify-between gap-2">
                      <span
                        className={`text-[16px] font-semibold ${area.failed ? "text-[#b8441d]" : "text-[#111318]"}`}
                      >
                        {area.failed} review
                      </span>
                      <span className="text-[11px] text-black/42">
                        {area.evaluated} measured
                        {area.unevaluated
                          ? ` · ${area.unevaluated} not measured`
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ul className="divide-y divide-black/10 bg-white">
              {audits.map((audit, index) => (
                <li
                  key={audit.url}
                  className="grid gap-3 px-5 py-3.5 sm:grid-cols-[28px_minmax(0,1fr)_auto_auto] sm:items-center sm:px-6"
                >
                  <span className="font-mono text-[11px] text-black/38">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold text-[#111318]">
                      {audit.title ?? audit.url}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-black/44">
                      {audit.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] sm:justify-end">
                    {audit.score != null ? (
                      <span className="font-semibold text-[#111318]">
                        Health {Math.round(audit.score)}
                      </span>
                    ) : null}
                    <span
                      className={
                        audit.checks_failed > 0
                          ? "font-semibold text-[#b8441d]"
                          : "text-black/48"
                      }
                    >
                      {audit.checks_failed}/{audit.checks_evaluated} review
                    </span>
                  </div>
                  {audit.report_id ? (
                    <a
                      href={`${APP_REPORT_URL}/${audit.report_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 justify-self-start text-[11.5px] font-semibold text-[#111318] underline decoration-black/18 underline-offset-4 hover:text-[#b8441d] hover:decoration-[#b8441d] sm:justify-self-end"
                    >
                      Inspect PDP{" "}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="justify-self-start text-[11px] text-black/34 sm:justify-self-end">
                      Report unavailable
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </Fold>
    </section>
  );
}

function ScanDisclosure({
  number,
  title,
  summary,
  children,
  defaultOpen = false,
}: {
  number: string;
  title: string;
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      id={`scan-${number}`}
      open={defaultOpen}
      className="group border-b border-black/14 bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-0.5 font-mono text-[11px] font-semibold text-[#b8441d]">
            {number}
          </span>
          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold text-[#111318]">
              {title}
            </h3>
            <p className="mt-1 text-[12.5px] text-black/56">{summary}</p>
          </div>
        </div>
        <span className="flex min-h-11 shrink-0 items-center gap-2 text-[12px] font-semibold text-[#111318]">
          <span className="group-open:hidden">Details</span>
          <span className="hidden group-open:inline">Close</span>
          <ChevronDown
            className="h-4 w-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-black/14 bg-[#fffaf7]">{children}</div>
    </details>
  );
}

function LockedAiStages() {
  const stages = [
    ["01", "What shoppers ask", "The buying questions your store needs to win"],
    [
      "02",
      "What gets chosen",
      "Which brands and products appear when yours do not",
    ],
    [
      "03",
      "Why it happens",
      "Connect the live answers to the evidence you already observed",
    ],
  ] as const;

  return (
    <div
      className="bg-white"
      aria-label="Understand is locked until email verification"
    >
      {stages.map(([number, title, summary]) => (
        <div
          key={number}
          className="flex items-start justify-between gap-5 border-b border-black/12 bg-black/[0.025] px-5 py-4 sm:px-6"
          aria-disabled="true"
        >
          <div className="flex min-w-0 items-start gap-4 opacity-55">
            <span className="mt-0.5 font-mono text-[11px] font-semibold text-black/48">
              {number}
            </span>
            <div>
              <p className="text-[14px] font-semibold text-[#111318]">
                {title}
              </p>
              <p className="mt-1 max-w-[68ch] text-[12.5px] leading-relaxed text-black/56">
                {summary}
              </p>
            </div>
          </div>
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-black/38"
            aria-label="Locked"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      ))}
    </div>
  );
}

function QuestionsDisclosure({ result }: { result: AnswerCheckResult }) {
  return (
    <ScanDisclosure
      number="01"
      title="What shoppers ask"
      summary={`${result.questions.length} buying ${result.questions.length === 1 ? "question" : "questions"} this store needs to win`}
    >
      <ol className="divide-y divide-black/12 bg-white">
        {result.questions.map((question, index) => (
          <li
            key={question}
            className="grid gap-2 px-5 py-3.5 sm:grid-cols-[2rem_minmax(0,1fr)] sm:px-6"
          >
            <span className="font-mono text-[11px] text-black/38">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[13px] leading-relaxed text-[#111318]">
              {question}
            </span>
          </li>
        ))}
      </ol>
    </ScanDisclosure>
  );
}

function VisibilityDisclosure({ result }: { result: AnswerCheckResult }) {
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  const named = scored.filter((answer) => answer.mentioned === true).length;
  const channels = Array.from(
    new Set(
      result.answers
        .map((answer) => answer.channel_label)
        .filter((label): label is string => Boolean(label)),
    ),
  );
  const rivals = tallyRivals(result.answers).slice(0, RIVAL_LIMIT);
  const products = shownProducts(result.answers);
  const rows = result.questions
    .map((question) => ({
      question,
      cells: channels.map(
        (channel) =>
          result.answers.find(
            (answer) =>
              answer.question === question && answer.channel_label === channel,
          ) ?? null,
      ),
    }))
    .filter((row) => row.cells.some(Boolean));

  return (
    <ScanDisclosure
      number="02"
      // The one section that argues the product's case opens on arrival; the
      // rest stay folded. A closed accordion cannot persuade anybody.
      defaultOpen
      title="What gets chosen"
      summary={
        scored.length > 0
          ? `${named}/${scored.length} observed answers chose your brand`
          : "Checking what shoppers are being shown"
      }
    >
      <AiVisibilityWorkspace result={result} />

      {rows.length > 0 || products.length > 0 ? (
        <div
          className={`grid border-t border-black/18 bg-white ${
            // The right column holds the product shelf and nothing else. Most
            // answers carry no products, so keeping the split unconditional
            // left a third of the panel empty while the evidence was squeezed.
            products.length > 0
              ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
              : ""
          }`}
        >
          <div>
            {rivals.length > 0 ? (
              <div className="px-4 py-4 sm:px-5">
                <p className="flex items-center gap-2 text-[12px] font-semibold text-black/62">
                  <span
                    className="h-[3px] w-4 bg-[#b8441d]"
                    aria-hidden="true"
                  />
                  Competitors named when you were not
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-10">
                  {rivals.map((rival) => (
                    <li key={rival.label} className="flex items-center gap-3">
                      <span
                        className="w-[8.5rem] shrink-0 truncate text-[12.5px] text-black/70"
                        title={rival.label}
                      >
                        {rival.label}
                      </span>
                      <span className="h-1 flex-1 bg-black/8">
                        <span
                          className="block h-full bg-[#d95028]"
                          style={{
                            width: `${(rival.count / rivals[0].count) * 100}%`,
                          }}
                        />
                      </span>
                      <span className="w-8 shrink-0 text-right font-mono text-[12px] text-black/62">
                        {rival.count}×
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {rows.length > 0 ? (
              <div className="border-t border-black/12">
                <p className="flex items-center gap-2 px-4 pt-4 text-[12px] font-semibold text-black/62 sm:px-5">
                  <span
                    className="h-[3px] w-4 bg-[#b8441d]"
                    aria-hidden="true"
                  />
                  Question by question
                </p>
                <ul className="mt-3">
                  {rows.map((row) => {
                    const missedIn = row.cells.filter(
                      (cell): cell is Answer =>
                        Boolean(cell) && cell?.mentioned === false,
                    );
                    const instead = Array.from(
                      new Set(
                        missedIn.flatMap((cell) =>
                          (cell.competitors ?? []).map(
                            (raw) => rivalIdentity(raw).label,
                          ),
                        ),
                      ),
                    )
                      .filter(Boolean)
                      .slice(0, 4);

                    return (
                      <li
                        key={row.question}
                        className="border-t border-black/12 px-4 py-3 sm:px-5"
                      >
                        <p className="text-[13px] font-medium leading-snug text-[#111318]">
                          “{row.question}”
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                          {row.cells.map((cell, index) =>
                            cell ? (
                              <ChannelChip
                                key={channels[index]}
                                channel={channels[index]}
                                answer={cell}
                              />
                            ) : null,
                          )}
                          {instead.length ? (
                            <span className="text-[12px] leading-relaxed text-black/62">
                              <span className="font-semibold">
                                Named instead{" "}
                              </span>
                              {instead.join(", ")}
                            </span>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>

          {products.length > 0 ? (
            <aside className="flex flex-col border-t border-black/18 px-4 py-4 sm:px-5 lg:min-h-0 lg:border-l lg:border-t-0">
              <p className="flex items-center gap-2 text-[12px] font-semibold text-black/62">
                <span className="h-[3px] w-4 bg-[#b8441d]" aria-hidden="true" />
                Products the assistants put in front of the shopper
              </p>
              <div className="relative mt-3 flex-1 lg:min-h-0">
                <ul className="grid max-h-[22rem] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:max-h-[26rem] lg:absolute lg:inset-0 lg:max-h-none">
                  {products.map((product) => (
                    <ProductTile key={product.title} product={product} />
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>
      ) : null}
    </ScanDisclosure>
  );
}
function AiAuditDisclosure({ result }: { result: AnswerCheckResult }) {
  const findings = sortedFindings(result);
  const audits = result.page_audits ?? [];
  const reportIdByUrl = new Map(
    audits.flatMap((audit) =>
      audit.report_id ? ([[audit.url, audit.report_id]] as const) : [],
    ),
  );
  const urgent = findings.filter(
    (finding) => finding.severity === "blocker" || finding.severity === "high",
  );
  const grouped = Array.from(
    findings.reduce((map, finding) => {
      const area =
        finding.source === "page_audit"
          ? findingArea(finding.code)
          : "Product evidence";
      const rows = map.get(area) ?? [];
      rows.push(finding);
      map.set(area, rows);
      return map;
    }, new Map<string, typeof findings>()),
  );

  return (
    <ScanDisclosure
      number="03"
      title="Why it happens"
      summary={`${findings.length} observed ${findings.length === 1 ? "gap" : "gaps"}${urgent.length ? ` · ${urgent.length} worth attention first` : ""}`}
    >
      {grouped.length > 0 ? (
        // The track count follows the number of groups. Hardcoding two and three
        // columns painted the grid's own gap colour across every empty track,
        // so a single group rendered as a card beside a grey slab.
        <div
          className={`grid gap-px bg-black/14 ${
            grouped.length === 1
              ? ""
              : grouped.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {grouped.map(([area, areaFindings], areaIndex) => {
            const areaUrgent = areaFindings.filter(
              (finding) =>
                finding.severity === "blocker" || finding.severity === "high",
            ).length;
            return (
              <section
                key={area}
                className={`bg-white p-5 sm:p-6 ${grouped.length > 2 && grouped.length % 3 === 2 && areaIndex === grouped.length - 1 ? "xl:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/46">
                      {area}
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-[#111318]">
                      {areaFindings.length}{" "}
                      {areaFindings.length === 1 ? "issue" : "issues"}
                    </p>
                  </div>
                  {areaUrgent > 0 ? (
                    <span className="border border-black/14 bg-white px-2 py-0.5 text-[11px] font-semibold text-[#b8441d]">
                      {areaUrgent} high
                    </span>
                  ) : null}
                </div>
                <ul className="mt-4 divide-y divide-black/10 border-t border-black/10">
                  {areaFindings.map((finding, index) => (
                    <li
                      key={`${finding.code}-${finding.product ?? index}`}
                      className="py-3 last:pb-0"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        {finding.severity ? (
                          <span
                            className={`${SEVERITY_BADGE} ${SEVERITY_STYLES[finding.severity] ?? SEVERITY_STYLES.low}`}
                          >
                            {finding.severity}
                          </span>
                        ) : null}
                        <span className="text-[12.5px] font-semibold leading-snug text-[#111318]">
                          {finding.title}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11.5px] leading-relaxed text-black/58">
                        {finding.detail}
                      </p>
                      {finding.product || finding.url ? (
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-black/46">
                          {finding.product ? (
                            <span className="truncate">{finding.product}</span>
                          ) : null}
                          {finding.url && reportIdByUrl.get(finding.url) ? (
                            <a
                              href={`${APP_REPORT_URL}/${reportIdByUrl.get(finding.url)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-[#111318] underline decoration-black/24 underline-offset-4 hover:decoration-[#b8441d]"
                            >
                              Inspect PDP →
                            </a>
                          ) : finding.url ? (
                            <a
                              href={finding.url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-black/52 underline decoration-black/18 underline-offset-4 hover:text-[#111318] hover:decoration-[#b8441d]"
                            >
                              Open live page →
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <p className="bg-white px-5 py-4 text-[13px] text-black/58 sm:px-6">
          No audit issues were observed in this sample.
        </p>
      )}

      {audits.length > 0 ? (
        <div className="border-t border-black/18 bg-[#fafafa] px-5 py-4 sm:px-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">
            Pages audited
          </p>
          <ul className="mt-2 divide-y divide-black/10 border-y border-black/10 bg-white">
            {audits.map((audit) => (
              <li
                key={audit.url}
                className="grid gap-2 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
              >
                <span className="min-w-0 truncate text-[12.5px] font-medium text-[#111318]">
                  {audit.title ?? audit.url}
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-black/48">
                    {audit.checks_failed}/{audit.checks_evaluated} flagged
                  </span>
                  {audit.report_id ? (
                    <a
                      href={`${APP_REPORT_URL}/${audit.report_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-[#111318] underline decoration-black/24 underline-offset-4 hover:decoration-[#b8441d]"
                    >
                      Inspect →
                    </a>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ScanDisclosure>
  );
}

export function ResultCard({
  result,
  eyebrow = "Your scan",
  identity,
  identityMeta,
  note,
  continueHref,
  verificationGate,
}: {
  result: AnswerCheckResult;
  eyebrow?: string;
  identity?: string;
  identityMeta?: string;
  note?: string;
  continueHref?: string;
  verificationGate?: React.ReactNode;
}) {
  const answers = result.answers;
  const inFlight = isScanInFlight(result);
  const scored = answers.filter((answer) => answer.mentioned !== null);
  const [shareStatus, setShareStatus] = useState<
    "idle" | "shared" | "copied" | "failed"
  >("idle");

  // Printing a set of collapsed disclosures produces a page with no evidence on
  // it. Open every fold, print, then put the reader's own folds back exactly as
  // they left them.
  const onPrint = () => {
    const folds = Array.from(
      document.querySelectorAll<HTMLDetailsElement>("details"),
    );
    const wasOpen = folds.map((fold) => fold.open);
    folds.forEach((fold) => {
      fold.open = true;
    });
    const restore = () => {
      folds.forEach((fold, index) => {
        fold.open = wasOpen[index];
      });
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
    // Safari never fires `afterprint` from a cancelled dialog; the timeout is
    // the only guarantee the reader's folds come back.
    window.setTimeout(restore, 1000);
  };

  const onShare = async () => {
    const shareUrl = new URL("/scan", window.location.origin);
    shareUrl.searchParams.set("domain", result.domain);
    const title = `${identity ?? result.brand ?? result.domain} · Beseam Observe scan`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl.toString() });
        setShareStatus("shared");
        window.setTimeout(() => setShareStatus("idle"), 1800);
        return;
      } catch (shareError) {
        if (
          shareError instanceof DOMException &&
          shareError.name === "AbortError"
        )
          return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl.toString());
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 1800);
    } catch {
      setShareStatus("failed");
    }
  };

  return (
    <div className="overflow-hidden border border-black/18 bg-white text-left">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/14 bg-white px-5 py-5 sm:px-6">
        <div>
          <span className="inline-flex items-center border-l-2 border-[#b8441d] pl-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/56">
            {eyebrow}
          </span>
          <div className="mt-3 flex items-center gap-3">
            <BrandFavicon
              domain={result.domain}
              name={identity ?? result.brand ?? result.domain}
            />
            <h2 className="text-[22px] font-semibold leading-snug tracking-[-0.02em] text-[#111318]">
              {identity ?? result.brand ?? result.domain}
            </h2>
          </div>
          <p className="mt-1 font-mono text-[11.5px] text-[#5f5a55]">
            {identityMeta ??
              `${result.domain}${result.platform ? ` · ${platformLabel(result.platform)}` : ""}`}
          </p>
        </div>
        {/* Run state and the two ways to keep the scan: share it, or hand a
            printed copy to whoever signs off the fixes. Share used to render
            only while the email gate was on screen, which made it unreachable
            for any scan that never entered that state. */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-2 border border-black/18 bg-white px-3 py-1.5 text-[12px] font-semibold ${inFlight ? "text-[#111318]" : scored.length ? "text-[#111318]" : "text-black/56"}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${inFlight ? "bg-[#111318]" : scored.length ? "bg-[#1f7a4d]" : "bg-[#6f6862]"}`}
              aria-hidden="true"
            />
            {/* Name the stage that is actually outstanding. Reporting "live
                answer check running" over ten finished answers contradicted the
                evidence sitting directly underneath it. */}
            {inFlight
              ? scored.length
                ? "Product pages still inspecting"
                : "Live answer check running"
              : scored.length
                ? "Live evidence complete"
                : "Scan complete"}
          </span>
          <button
            type="button"
            onClick={() => void onShare()}
            className="inline-flex items-center gap-2 border border-black/18 bg-white px-3 py-1.5 text-[12px] font-semibold text-[#111318] transition-colors hover:border-black/32 hover:bg-[#fffaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8441d]/35"
            aria-label="Share this scan"
          >
            {shareStatus === "copied" || shareStatus === "shared" ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span aria-live="polite">
              {shareStatus === "copied"
                ? "Link copied"
                : shareStatus === "shared"
                  ? "Shared"
                  : shareStatus === "failed"
                    ? "Copy failed"
                    : "Share"}
            </span>
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex min-h-11 items-center gap-2 border border-black/18 bg-white px-3 py-1.5 text-[12px] font-semibold text-[#111318] transition-colors hover:border-black/32 hover:bg-[#fffaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8441d]/35"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            Print
          </button>
        </div>
      </div>

      {result.reject_reason ? (
        <p className="px-5 py-4 text-[14px] leading-relaxed text-[#b8441d] sm:px-6">
          {result.reject_reason}
        </p>
      ) : (
        <InitialScanSummary result={result} />
      )}

      {/* Whenever the locked stages are shown, the way to unlock them is shown
          with them. Tying this to `showProgress` meant a settled scan awaiting
          verification rendered three padlocks and no form. */}
      {verificationGate ? (
        <div className="border-b border-black/14 bg-[#fffaf7] px-4 py-5 sm:px-6 sm:py-6">
          <div className="border border-black/18 bg-white p-5 sm:p-6">
            {verificationGate}
          </div>
        </div>
      ) : null}

      {!result.reject_reason ? (
        verificationGate ? (
          <LockedAiStages />
        ) : (
          <>
            <QuestionsDisclosure result={result} />
            <VisibilityDisclosure result={result} />
            <AiAuditDisclosure result={result} />
          </>
        )
      ) : null}

      {/* The way into the product must not depend on a subsystem the visitor did
          not ask about: page audits can sit queued indefinitely, and gating on
          `inFlight` used to delete this block from every completed scan. Answers
          on the card are the only precondition that matters. */}
      {continueHref && scored.length > 0 && !result.reject_reason ? (
        <div className="grid gap-5 border-t border-black/18 bg-[#faf1eb] px-4 py-5 sm:px-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b8441d]">
              Next · Decide
            </p>
            <p className="mt-1 text-[15px] font-semibold text-[#111318]">
              Choose the few changes worth making.
            </p>
            <p className="mt-1 max-w-[58ch] text-[13px] leading-relaxed text-black/64">
              Rank what matters, choose the changes worth making, and keep the
              evidence attached to every decision.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <TrackedLink
              href={continueHref}
              eventName="scan_continue_clicked"
              eventCategory="conversion"
              placement="answer_check_result"
              preserveUtm
              className="group inline-flex min-h-11 items-center justify-center gap-2 bg-[#111318] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#b8441d]"
            >
              Start for free
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
            <TrackedLink
              href="/contact"
              eventName="scan_review_clicked"
              eventCategory="conversion"
              placement="answer_check_result"
              preserveUtm
              className="inline-flex min-h-11 items-center justify-center px-2 text-[13px] font-semibold text-[#111318] underline decoration-black/30 underline-offset-6 hover:decoration-[#b8441d]"
            >
              Prefer a walkthrough? Contact us
            </TrackedLink>
          </div>
        </div>
      ) : null}

      {note ? (
        <p className="border-t border-black/14 px-5 py-3 text-[12px] leading-relaxed text-black/62">
          {note}
        </p>
      ) : null}
    </div>
  );
}

// ── Sample loop showcase ────────────────────────────────────────────────────
// One store moving through the same operating loop used across the product:
// Observe → Understand → Decide → Act → Learn. Evidence and proposals stay
// distinct so a proposed change never reads as something that already shipped.

const SEVERITY_STYLES: Record<string, string> = {
  blocker: "bg-[#b3261e] text-white",
  high: "bg-[#b8441d] text-white",
  medium: "bg-[#e8b13a] text-[#111318]",
  low: "bg-black/12 text-black/70",
};

const SEVERITY_BADGE =
  "mt-0.5 shrink-0 px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em]";

/**
 * The one sentence a merchant repeats to their team, plus the provenance chips
 * that say what that sentence rests on. Salvaged from the retired public audit
 * report: it was the only surface that stated the result in plain words instead
 * of leaving it to be read off the sections below.
 */
function ScanTakeaway({ result }: { result: AnswerCheckResult }) {
  const scored = result.answers.filter((answer) => answer.mentioned !== null);
  const missed = scored.filter((answer) => answer.mentioned === false).length;
  const brand = result.brand || result.domain;
  const wins = Array.from(
    new Set(
      scored
        .filter((answer) => answer.mentioned === true)
        .map((answer) => answer.question)
        .filter((question): question is string => Boolean(question)),
    ),
  );
  const loneWin = wins.length === 1 ? wins[0] : null;
  const assistants = Array.from(
    new Set(
      result.answers
        .map((answer) => answer.channel_label)
        .filter((label): label is string => Boolean(label)),
    ),
  );
  const audits = result.page_audits ?? [];
  const evaluated = audits.reduce(
    (sum, audit) => sum + audit.checks_evaluated,
    0,
  );
  const failed = audits.reduce((sum, audit) => sum + audit.checks_failed, 0);

  const chips = [
    "Public pages only",
    `${result.products_seen} products sampled`,
    result.questions.length
      ? `${result.questions.length} buyer questions`
      : null,
    assistants.length ? assistants.join(" + ") : null,
    // One number only: the deterministic page audit is evidence the answers
    // rest on, not a second scoreboard competing with them.
    evaluated ? `${failed} of ${evaluated} page checks failed` : null,
  ].filter((chip): chip is string => Boolean(chip));

  return (
    <div className="mb-4 border border-black/18 bg-white px-5 py-5">
      <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-black/58">
        <span className="h-[3px] w-4 bg-[#b8441d]" aria-hidden="true" />
        Owner takeaway
      </p>
      <p className="mt-3 text-[18px] font-semibold leading-snug text-[#111318]">
        {scored.length
          ? missed === 0
            ? `${brand} was named in all ${scored.length} assistant answers.`
            : missed === scored.length
              ? `${brand} was named in none of the ${scored.length} assistant answers.`
              : `${brand} was absent from ${missed} of ${scored.length} assistant answers.`
          : isScanInFlight(result)
            ? "The catalog evidence is in. The assistant answers are running now."
            : `This scan shows the public evidence behind how assistants describe ${brand}.`}
      </p>
      {loneWin ? (
        <p className="mt-3 text-[13px] leading-relaxed text-black/62">
          The only win came for “{loneWin}”.
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="inline-flex min-h-8 items-center border border-black/20 bg-white px-3 text-[12px] font-semibold text-black/68"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AnswerCheck({
  placement = "homepage_hero",
  formNote,
}: {
  placement?: string;
  /**
   * Reassurance shown directly under the field. It has to render between the
   * form and the result, or a scanned store pushes it a full card away from the
   * ask it is reassuring.
   */
  formNote?: ReactNode;
}) {
  const { trackEvent } = useAnalytics();
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [result, setResult] = useState<AnswerCheckResult | null>(null);
  const [error, setError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const pollCount = useRef(0);
  const [pollExhausted, setPollExhausted] = useState(false);

  const load = useCallback(async (target: string) => {
    const response = await fetch(
      `/api/answer-check?domain=${encodeURIComponent(target)}`,
    );
    if (!response.ok) return null;
    return (await response.json()) as AnswerCheckResult;
  }, []);

  // A verification click lands back here with ?domain=: show that scan. Failed
  // verification links also land here with a specific, human-readable error.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scanError = params.get("scan_error");
    if (scanError === "missing_token") {
      setError(
        "That verification link is missing its token. Start or continue your scan below.",
      );
    } else if (scanError === "link_used") {
      setError(
        "That verification link is invalid or has already been used. Start the scan again if you need a new link.",
      );
    } else if (scanError === "unavailable") {
      setError(
        "We could not verify that link right now. Try the link from your email again.",
      );
    }

    const fromEmail = params.get("domain");
    if (!fromEmail) return;
    setDomain(fromEmail);
    void load(fromEmail).then((payload) => {
      if (payload) setResult(payload);
    });
  }, [load]);
  // Poll while either the free PDP sample or the verified live probe is running.
  // The budget is finite, so the exhausted case has to say so: silently ceasing
  // to poll leaves a progress row spinning forever with nothing to act on.
  useEffect(() => {
    if (!result || !isScanInFlight(result)) return;
    if (pollCount.current >= MAX_POLLS) {
      setPollExhausted(true);
      return;
    }

    const timer = setTimeout(() => {
      pollCount.current += 1;
      void load(result.domain).then((payload) => {
        if (payload) setResult(payload);
      });
    }, POLL_MS);

    return () => clearTimeout(timer);
  }, [result, load]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setVerificationSent(false);

    const target = domain.trim();
    if (!target) {
      setError("Enter your store domain.");
      return;
    }

    setSubmitting(true);
    trackEvent({
      action: "answer_check_started",
      category: "conversion",
      label: placement,
    });

    try {
      const response = await fetch("/api/answer-check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          domain: target,
          email: null,
          source: placement,
          website,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(
          payload?.detail || payload?.error || "We could not scan that domain.",
        );
        return;
      }

      pollCount.current = 0;
      setPollExhausted(false);
      setResult(payload as AnswerCheckResult);
    } catch {
      setError("The scan service is unavailable right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const onVerificationSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setVerificationError("");

    const address = email.trim();
    if (!address) {
      setVerificationError("Enter your work email.");
      return;
    }
    if (!result) return;

    setVerificationSubmitting(true);
    try {
      const response = await fetch("/api/answer-check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          domain: result.domain,
          email: address,
          source: placement,
          website,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setVerificationError(
          payload?.detail ||
            payload?.error ||
            "We could not send the verification email.",
        );
        return;
      }

      setResult(payload as AnswerCheckResult);
      setVerificationSent(true);
      trackEvent({
        action: "answer_check_verification_requested",
        category: "conversion",
        label: placement,
      });
    } catch {
      setVerificationError(
        "We could not send the verification email right now.",
      );
    } finally {
      setVerificationSubmitting(false);
    }
  };

  const inputClass =
    "h-12 w-full border border-black/22 bg-white px-4 text-left text-[15px] text-[#111318] placeholder:text-black/40 focus:border-[#b8441d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8441d]";

  return (
    <div>
      <form
        id="answer-check-form"
        onSubmit={onSubmit}
        noValidate
        className="mx-auto w-full max-w-3xl border border-black/18 bg-white p-3 sm:p-4"
      >
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <label className="sr-only" htmlFor="answer-check-domain">
              Store domain
            </label>
            <input
              id="answer-check-domain"
              value={domain}
              onChange={(event) => {
                setDomain(event.target.value);
                if (error) setError("");
              }}
              placeholder="yourstore.com"
              aria-invalid={Boolean(error)}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#111318] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#b8441d] disabled:opacity-70"
          >
            {submitting ? "Reading your store…" : "Check my store"}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <label className="sr-only" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>

        <p
          role={error ? "alert" : undefined}
          className={`mt-3 text-[13px] leading-relaxed ${error ? "text-[#b3261e]" : "text-black/62"}`}
        >
          {error}
        </p>
        {/* A failed scan is usually the API being briefly unavailable, so give
            the visitor the retry instead of making them retype the domain. */}
        {error && domain.trim() ? (
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 inline-flex min-h-10 items-center gap-2 border border-black/36 bg-white px-4 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#b8441d] hover:text-[#b8441d] disabled:cursor-wait disabled:opacity-70"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            {submitting ? "Retrying…" : "Try again"}
          </button>
        ) : null}
      </form>

      {formNote}

      {result ? (
        <div className="mx-auto mt-14 max-w-[72rem]">
          <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-black/48">
            <span className="h-px w-8 bg-black/18" aria-hidden="true" />
            Observe · your store
            <span className="h-px w-8 bg-black/18" aria-hidden="true" />
          </div>
          <ScanTakeaway result={result} />
          {/* The poll budget ran out with work still outstanding. Name what did
              finish, so the evidence already on the card is not thrown into
              doubt by one stalled stage. */}
          {pollExhausted ? (
            <div
              role="status"
              className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-black/18 bg-[#fffaf7] px-5 py-4"
            >
              <p className="max-w-[62ch] text-[13px] leading-relaxed text-[#111318]">
                Product-page inspection didn’t finish. Everything else on this
                card is complete and safe to act on.
              </p>
              <button
                type="submit"
                form="answer-check-form"
                disabled={submitting}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-black/36 bg-white px-4 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#b8441d] hover:text-[#b8441d] disabled:cursor-wait disabled:opacity-70"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                {submitting ? "Running…" : "Run it again"}
              </button>
            </div>
          ) : null}
          <ResultCard
            result={result}
            note="A point-in-time observation from public catalog data and public assistant surfaces. Answers can change; Beseam proves impact by rerunning these same questions after each approved fix."
            continueHref={`${APP_REGISTER_URL}?scan_domain=${encodeURIComponent(result.domain)}`}
            verificationGate={
              result.status === "awaiting_verification" ? (
                verificationSent ? (
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 border border-black/14 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#111318]">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#1f7a4d]"
                          aria-hidden="true"
                        />
                        Verification email sent
                      </span>
                    </div>
                    <p className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-[#111318]">
                      One click to continue to Understand
                    </p>
                    <p className="mt-1.5 max-w-[66ch] text-[13px] leading-relaxed text-[#5f5a55]">
                      Check {email.trim()} and continue. We’ll connect what
                      shoppers are being shown with the evidence you already
                      observed, so you can see what is driving the gaps.
                    </p>
                    {/* A sent state with no exit strands anyone who mistyped
                        their address or never received the mail. */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                      <button
                        type="button"
                        onClick={() => setVerificationSent(false)}
                        className="inline-flex min-h-11 items-center font-semibold text-[#111318] underline decoration-black/30 underline-offset-4 transition-colors hover:text-[#b8441d] hover:decoration-[#b8441d]"
                      >
                        Send it again
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail("");
                          setVerificationSent(false);
                        }}
                        className="inline-flex min-h-11 items-center text-[#5f5a55] underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#b8441d] hover:decoration-[#b8441d]"
                      >
                        Use a different address
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onVerificationSubmit} noValidate>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 border border-black/14 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#b8441d]">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#c8891f]"
                          aria-hidden="true"
                        />
                        Next · Understand
                      </span>
                    </div>
                    <p className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-[#111318]">
                      Turn what you observed into a clear next move.
                    </p>
                    <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-[#5f5a55]">
                      See why products are being missed, what shoppers are shown
                      instead, and which gaps are worth acting on first.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-[#5f5a55]">
                      <span className="border border-black/14 bg-white px-2.5 py-1">
                        {result.questions.length} shopper{" "}
                        {result.questions.length === 1
                          ? "question"
                          : "questions"}
                      </span>
                      <span className="border border-black/14 bg-white px-2.5 py-1">
                        ChatGPT
                      </span>
                      <span className="border border-black/14 bg-white px-2.5 py-1">
                        Google AI Mode
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                      <div>
                        <label className="sr-only" htmlFor="answer-check-email">
                          Work email
                        </label>
                        <input
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                            if (verificationError) setVerificationError("");
                          }}
                          placeholder="you@company.com"
                          aria-invalid={Boolean(verificationError)}
                          className={inputClass}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={verificationSubmitting}
                        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#111318] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#b8441d] disabled:opacity-70"
                      >
                        {verificationSubmitting
                          ? "Sending…"
                          : "Continue to Understand"}
                      </button>
                    </div>
                    {/* The one high-stakes ask on the page. Say what the address
                        is for before it is typed, not after. */}
                    <p className="mt-2.5 max-w-[68ch] text-[12px] leading-relaxed text-[#5f5a55]">
                      One verification link, so the paid check runs for a real
                      store owner. No marketing list, no card. See our{" "}
                      <a
                        href="/privacy-policy"
                        className="underline decoration-black/25 underline-offset-2 hover:text-[#b8441d] hover:decoration-[#b8441d]"
                      >
                        privacy policy
                      </a>
                      .
                    </p>
                    {verificationError ? (
                      <p
                        role="alert"
                        className="mt-3 text-[13px] leading-relaxed text-[#b3261e]"
                      >
                        {verificationError}
                      </p>
                    ) : null}
                  </form>
                )
              ) : undefined
            }
          />
        </div>
      ) : null}
    </div>
  );
}
