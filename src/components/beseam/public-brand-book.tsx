"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Copy,
  Database,
  ExternalLink,
  MapPin,
  Printer,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import type {
  AnswerCheckResult,
  BrandEvidenceProduct,
} from "@/components/beseam/answer-check-types";
import AuditReportNav from "@/components/beseam/audit-report-nav";
import { BookReviewCta } from "@/components/beseam/book-review-cta";

const STOP_WORDS = new Set([
  "what",
  "which",
  "where",
  "with",
  "without",
  "from",
  "that",
  "this",
  "best",
  "value",
  "works",
  "helps",
  "women",
  "stronger",
  "thicker",
  "buy",
  "for",
  "and",
  "the",
  "can",
  "in",
  "is",
  "a",
]);

function words(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function vocabulary(questions: string[], products: BrandEvidenceProduct[]) {
  const counts = new Map<string, number>();
  for (const token of [
    ...questions.flatMap(words),
    ...products.flatMap((product) => words(product.title)),
  ]) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([token]) => token);
}

function intentFor(question: string) {
  const lower = question.toLowerCase();
  if (/where|near me|in switzerland|locally/.test(lower)) {
    return {
      label: "Local availability",
      reason:
        "Tests whether the brand can be discovered when a shopper names a market and is ready to buy.",
    };
  }
  if (
    /best value|kit|bundle|worth the money|under \$|under €|under chf/.test(
      lower,
    )
  ) {
    return {
      label: "Value and bundle choice",
      reason:
        "Tests comparison at the point where a shopper is choosing an offer, set, or price-value tradeoff.",
    };
  }
  if (/without|minoxidil-free|natural|no /.test(lower)) {
    return {
      label: "Constraint-led alternative",
      reason:
        "Tests whether the catalog expresses a decisive constraint clearly enough to qualify for the answer.",
    };
  }
  if (
    /itchy|shedding|thinning|dry|sensitive|loss|problem|concern/.test(lower)
  ) {
    return {
      label: "Problem and suitability",
      reason:
        "Tests whether product evidence connects a shopper’s stated problem to a suitable recommendation.",
    };
  }
  if (/best|compare|which/.test(lower)) {
    return {
      label: "Category comparison",
      reason:
        "Tests broad discovery before the shopper knows which brand or product to choose.",
    };
  }
  return {
    label: "Recommendation intent",
    reason:
      "Tests whether the public catalog contains enough evidence for an assistant to recommend a product.",
  };
}

function matchingProducts(question: string, products: BrandEvidenceProduct[]) {
  const queryWords = new Set(words(question));
  const ranked = products
    .map((product) => ({
      product,
      score: words(product.title).filter((word) => queryWords.has(word)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return {
    strongestScore: ranked[0]?.score ?? 0,
    titles: ranked.slice(0, 2).map((item) => item.product.title),
  };
}

function formatPrice(product: BrandEvidenceProduct) {
  if (!product.price) return null;
  return [product.price, product.currency].filter(Boolean).join(" ");
}

export default function PublicBrandBook({
  defaultDomain = "vediclab.com",
}: {
  defaultDomain?: string;
}) {
  const [domain, setDomain] = useState(defaultDomain);
  const [result, setResult] = useState<AnswerCheckResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const load = useCallback(async (target: string) => {
    const response = await fetch(
      `/api/answer-check?domain=${encodeURIComponent(target)}`,
    );
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(
        payload?.detail ||
          payload?.error ||
          "This brand evidence is not available yet.",
      );
    }
    setResult(payload as AnswerCheckResult);
    setError("");
  }, []);

  useEffect(() => {
    const requested =
      new URLSearchParams(window.location.search).get("domain")?.trim() ||
      defaultDomain;
    setDomain(requested);
    void load(requested).catch((reason: unknown) => {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not load brand evidence.",
      );
    });
  }, [defaultDomain, load]);

  const brand = result?.brand || domain;
  const evidence = result?.brand_evidence;
  const products = useMemo(
    () => evidence?.products ?? [],
    [evidence?.products],
  );
  const categoryVocabulary = useMemo(
    () => vocabulary(result?.questions ?? [], products),
    [products, result?.questions],
  );
  const buyingMoments = useMemo(
    () =>
      Array.from(
        new Set(
          (result?.questions ?? []).map(
            (question) => intentFor(question).label,
          ),
        ),
      ),
    [result?.questions],
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-[#fafafa] text-[#111318]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 pb-14 pt-12 sm:px-8 sm:pb-18 sm:pt-16 lg:px-10">
          <AuditReportNav domain={domain} active="brand-book" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.7fr)] lg:items-end">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.13em] text-[#b8441d]">
                Public brand book · query provenance
              </p>
              <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.8rem,5.7vw,5.5rem)] font-normal leading-[0.96] tracking-[-0.035em]">
                Why these questions belong to {brand}.
              </h1>
              <p className="mt-7 max-w-3xl text-[17px] leading-[1.72] text-black/68">
                This is the evidence layer behind the audit: the public
                products, category vocabulary, market context, and buying
                moments used to frame the five unbranded questions. It is
                designed to make every query inspectable, not merely
                plausible-sounding.
              </p>
            </div>

            <aside className="border-l-4 border-[#b8441d] bg-white px-5 py-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-black/58">
                What this proves
              </p>
              <p className="mt-3 text-[18px] font-semibold leading-snug">
                The questions test real category demand signals present in the
                public storefront.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-black/62">
                They do not name {brand}, because the audit measures whether an
                assistant discovers the brand before the shopper already knows
                it.
              </p>
            </aside>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex min-h-8 items-center gap-2 border border-black/20 bg-white px-3 text-[12px] font-semibold text-black/68">
              <Database className="h-3.5 w-3.5" aria-hidden="true" />
              {products.length || result?.products_seen || 0} public products
            </span>
            <span className="inline-flex min-h-8 items-center gap-2 border border-black/20 bg-white px-3 text-[12px] font-semibold text-black/68">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {evidence?.market ||
                "Market inferred only when public evidence supports it"}
            </span>
            <span className="inline-flex min-h-8 items-center border border-black/20 bg-white px-3 text-[12px] font-semibold text-black/68">
              {result?.questions.length || 0} traceable questions
            </span>
            <button
              type="button"
              onClick={copyLink}
              className="ml-auto inline-flex min-h-9 items-center gap-2 border border-black/36 bg-white px-3 text-[12px] font-semibold transition-colors hover:border-[#b8441d] hover:text-[#b8441d]"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {copied ? "Link copied" : "Copy page link"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-9 items-center gap-2 border border-black/36 bg-white px-3 text-[12px] font-semibold transition-colors hover:border-[#b8441d] hover:text-[#b8441d]"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              Print
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[92rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        {error ? (
          <div className="border border-[#b8441d]/40 bg-white px-5 py-5">
            <p className="text-[14px] font-semibold text-[#b8441d]">{error}</p>
            <button
              type="button"
              onClick={() => void load(domain).catch(() => undefined)}
              className="mt-4 inline-flex min-h-10 items-center gap-2 bg-[#111318] px-4 text-[13px] font-semibold text-white hover:bg-[#b8441d]"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              Try again
            </button>
          </div>
        ) : !result ? (
          <div className="flex min-h-64 items-center justify-center border border-black/18 bg-white">
            <RefreshCw
              className="h-5 w-5 animate-spin text-black/50"
              aria-hidden="true"
            />
            <span className="ml-3 text-[14px] text-black/62">
              Loading the evidence ledger…
            </span>
          </div>
        ) : (
          <div className="space-y-12">
            <section className="grid border border-black/18 bg-white lg:grid-cols-3">
              {[
                {
                  label: "Observed category vocabulary",
                  values: categoryVocabulary,
                  body: "Repeated words across product titles and the generated buying questions.",
                },
                {
                  label: "Buying moments covered",
                  values: buyingMoments,
                  body: "Distinct commercial decisions rather than five rewrites of the same prompt.",
                },
                {
                  label: "Evidence sources",
                  values: evidence?.sources ?? ["Public storefront"],
                  body: "No customer data, analytics account, or store login was used.",
                },
              ].map((group, index) => (
                <div
                  key={group.label}
                  className={`px-5 py-6 sm:px-6 ${index > 0 ? "border-t border-black/14 lg:border-l lg:border-t-0" : ""}`}
                >
                  <p className="text-[12px] font-semibold text-[#b8441d]">
                    {group.label}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.values.map((value) => (
                      <span
                        key={value}
                        className="border border-black/16 bg-[#fafafa] px-2.5 py-1 text-[12px] font-medium text-black/72"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-black/58">
                    {group.body}
                  </p>
                </div>
              ))}
            </section>

            <section>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-[#b8441d]">
                    Question ledger
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3.4rem)] font-normal leading-[1.02] tracking-[-0.025em]">
                    Every query has a job.
                  </h2>
                </div>
                <p className="max-w-xl text-[14px] leading-relaxed text-black/62">
                  The questions stay unbranded and recommendation-answerable,
                  then spread across comparison, constraints, suitability,
                  locality, and value.
                </p>
              </div>

              <ol className="mt-7 border border-black/18 bg-white">
                {result.questions.map((question, index) => {
                  const intent = intentFor(question);
                  const matched = matchingProducts(question, products);
                  return (
                    <li
                      key={question}
                      className="grid gap-4 border-b border-black/12 px-5 py-5 last:border-b-0 sm:px-6 lg:grid-cols-[3rem_minmax(0,1.15fr)_minmax(18rem,0.85fr)]"
                    >
                      <span className="font-mono text-[12px] font-semibold text-[#b8441d]">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-[16px] font-semibold leading-snug">
                          “{question}”
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {words(question)
                            .slice(0, 6)
                            .map((word) => (
                              <span
                                key={word}
                                className="border border-black/14 bg-[#fafafa] px-2 py-0.5 font-mono text-[11px] text-black/58"
                              >
                                {word}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="border-l-2 border-[#b8441d] pl-4">
                        <p className="text-[12px] font-semibold text-[#b8441d]">
                          {intent.label}
                        </p>
                        <p className="mt-2 text-[13px] leading-relaxed text-black/64">
                          {intent.reason}
                        </p>
                        {matched.strongestScore >= 2 ? (
                          <p className="mt-2 text-[12px] leading-relaxed text-black/52">
                            Strong title overlap: {matched.titles.join(", ")}.
                          </p>
                        ) : (
                          <p className="mt-2 text-[12px] leading-relaxed text-[#b8441d]">
                            No close product-title match in the public sample.
                            The category connection currently depends on prose
                            rather than a clearly structured product label.
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-[#b8441d]">
                  Public product evidence
                </p>
                <h2 className="mt-3 font-display text-[clamp(2rem,3vw,3.2rem)] font-normal leading-[1.02] tracking-[-0.025em]">
                  The catalog language behind the test.
                </h2>
                <div className="mt-6 border border-black/18 bg-white">
                  {products.map((product) => (
                    <div
                      key={`${product.title}-${product.url}`}
                      className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-black/12 px-5 py-4 last:border-b-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold">
                          {product.title}
                        </p>
                        <p className="mt-1 text-[12px] text-black/52">
                          {product.attributes.length
                            ? `Structured attributes: ${product.attributes.join(", ")}`
                            : "No meaningful structured attributes exposed in the sample"}
                        </p>
                      </div>
                      {formatPrice(product) ? (
                        <span className="font-mono text-[12px] text-black/60">
                          {formatPrice(product)}
                        </span>
                      ) : null}
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.05em] ${
                          product.available === false
                            ? "text-[#b8441d]"
                            : "text-[#1f7a4d]"
                        }`}
                      >
                        {product.available === false
                          ? "Unavailable"
                          : "Publicly listed"}
                      </span>
                      {product.url ? (
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${product.title}`}
                          className="inline-flex h-9 w-9 items-center justify-center border border-black/18 hover:border-[#b8441d] hover:text-[#b8441d]"
                        >
                          <ExternalLink
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <aside className="border border-black/18 bg-white px-5 py-6 sm:px-6">
                <p className="text-[12px] font-semibold text-[#b8441d]">
                  Catalog conditions that affect the questions
                </p>
                <ul className="mt-4 space-y-5">
                  {(evidence?.catalog_signals ?? []).map((signal) => (
                    <li key={`${signal.title}-${signal.product}`}>
                      <p className="text-[14px] font-semibold leading-snug">
                        {signal.title}
                      </p>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-black/60">
                        {signal.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </aside>
            </section>

            <section className="grid border border-black/18 bg-[#111318] text-white lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.55fr)]">
              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/56">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Interpretation boundary
                </div>
                <h2 className="mt-4 max-w-[26ch] font-display text-[clamp(2rem,3vw,3.2rem)] font-normal leading-[1.03] tracking-[-0.025em]">
                  This page explains relevance. It does not pretend to be
                  search-volume data.
                </h2>
                <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-white/64">
                  The audit asks commercially valid questions supported by
                  public storefront evidence. It does not claim exact monthly
                  demand, customer demographics, or private conversion
                  performance. Those require analytics and search-demand data
                  beyond a public audit.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-3 border-t border-white/14 px-6 py-8 lg:border-l lg:border-t-0">
                <Link
                  href={`/audit-report?domain=${encodeURIComponent(domain)}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/30 px-5 text-[14px] font-semibold hover:border-white"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Return to assistant results
                </Link>
                <BookReviewCta
                  location="public_brand_book"
                  label={`Review the ${brand} evidence`}
                  className="bg-white text-[#111318] hover:bg-[#e8653a] hover:text-white"
                />
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
