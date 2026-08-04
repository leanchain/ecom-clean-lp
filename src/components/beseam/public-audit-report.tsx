"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Copy, Printer, RefreshCw, ShieldCheck } from "lucide-react";

import { ResultCard } from "@/components/beseam/answer-check";
import type { AnswerCheckResult } from "@/components/beseam/answer-check-types";
import BookReviewCta from "@/components/beseam/book-review-cta";

const POLL_MS = 6000;
const MAX_POLLS = 60;
const LIVE_STATUSES = new Set(["running", "queued", "validating"]);

export default function PublicAuditReport({
  defaultDomain = "vediclab.com",
}: {
  defaultDomain?: string;
}) {
  const [domain, setDomain] = useState(defaultDomain);
  const [result, setResult] = useState<AnswerCheckResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const pollCount = useRef(0);

  const load = useCallback(async (target: string) => {
    const response = await fetch(
      `/api/answer-check?domain=${encodeURIComponent(target)}`,
    );
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(
        payload?.detail || payload?.error || "This audit is not available yet.",
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
      setError(reason instanceof Error ? reason.message : "Could not load audit.");
    });
  }, [defaultDomain, load]);

  useEffect(() => {
    if (!result || !LIVE_STATUSES.has(result.status)) return;
    if (pollCount.current >= MAX_POLLS) return;

    const timer = window.setTimeout(() => {
      pollCount.current += 1;
      void load(result.domain).catch(() => undefined);
    }, POLL_MS);
    return () => window.clearTimeout(timer);
  }, [load, result]);

  const brand = result?.brand || domain;
  const scored = useMemo(
    () => result?.answers.filter((answer) => answer.mentioned !== null) ?? [],
    [result],
  );
  const named = scored.filter((answer) => answer.mentioned === true).length;
  const missed = scored.length - named;
  const namedQuestions = Array.from(
    new Set(
      scored
        .filter((answer) => answer.mentioned === true)
        .map((answer) => answer.question)
        .filter((question): question is string => Boolean(question)),
    ),
  );
  const loneWinQuestion = namedQuestions.length === 1 ? namedQuestions[0] : null;
  const assistants = Array.from(
    new Set(
      result?.answers
        .map((answer) => answer.channel_label)
        .filter((label): label is string => Boolean(label)) ?? [],
    ),
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
        <div className="mx-auto max-w-[92rem] px-5 pb-14 pt-14 sm:px-8 sm:pb-18 sm:pt-18 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-end">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.13em] text-[#b8441d]">
                Public AI shopping audit · live evidence
              </p>
              <h1 className="mt-5 max-w-[17ch] font-display text-[clamp(2.8rem,6vw,5.8rem)] font-normal leading-[0.96] tracking-[-0.035em]">
                What shoppers&apos; assistants say about {brand}.
              </h1>
              <p className="mt-7 max-w-3xl text-[17px] leading-[1.72] text-black/68">
                We read the public catalog, wrote the buying questions that matter
                for this category, and asked ChatGPT and Google AI Mode which
                products they would put in front of a shopper. No store login and
                no private data were used.
              </p>
            </div>

            <div className="border-l-4 border-[#b8441d] bg-white px-5 py-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-black/58">
                Owner takeaway
              </p>
              <p className="mt-3 text-[18px] font-semibold leading-snug">
                {scored.length > 0
                  ? `${brand} was absent from ${missed} of ${scored.length} assistant answers.`
                  : result?.status === "running"
                    ? "The catalog evidence is complete. The assistant answers are running now."
                    : "This report shows the machine-readable evidence behind recommendation wins and misses."}
              </p>
              {loneWinQuestion ? (
                <p className="mt-3 text-[13px] leading-relaxed text-black/62">
                  The only win came for “{loneWinQuestion}” — evidence that
                  explicit local intent is working while broader category
                  discovery is not.
                </p>
              ) : null}
              <p className="mt-3 text-[13px] leading-relaxed text-black/62">
                The commercial opportunity is to fix the exact catalog fields
                behind the misses, publish them reversibly, and rerun the same
                questions.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            {[
              "Public pages only",
              result ? `${result.products_seen} products sampled` : "Live catalog read",
              result ? `${result.questions.length} buyer questions` : "Buyer questions",
              assistants.length ? assistants.join(" + ") : "ChatGPT + Google AI Mode",
            ].map((label) => (
              <span
                key={label}
                className="inline-flex min-h-8 items-center border border-black/20 bg-white px-3 text-[12px] font-semibold text-black/68"
              >
                {label}
              </span>
            ))}
            <button
              type="button"
              onClick={copyLink}
              className="ml-auto inline-flex min-h-9 items-center gap-2 border border-black/36 bg-white px-3 text-[12px] font-semibold transition-colors hover:border-[#b8441d] hover:text-[#b8441d]"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {copied ? "Link copied" : "Copy share link"}
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

      <section className="mx-auto max-w-[92rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
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
        ) : result ? (
          <ResultCard
            result={result}
            eyebrow="Public recommendation audit"
            identity={result.brand || result.domain}
            identityMeta={`${result.domain} · ${result.platform || "storefront"} · prepared 4 August 2026`}
            note="This audit is a point-in-time observation from public catalog data and public assistant surfaces. Recommendations can change; Beseam verifies impact by rerunning the same questions after each approved fix."
          />
        ) : (
          <div className="flex min-h-64 items-center justify-center border border-black/18 bg-white">
            <RefreshCw className="h-5 w-5 animate-spin text-black/50" aria-hidden="true" />
            <span className="ml-3 text-[14px] text-black/62">Loading the public audit…</span>
          </div>
        )}
      </section>

      <section className="border-y border-black/18 bg-white">
        <div className="mx-auto grid max-w-[92rem] gap-0 px-5 sm:px-8 lg:grid-cols-3 lg:px-10">
          {[
            [
              "01",
              "Identity",
              "Make every public product record say VEDIC LAB—not a placeholder vendor—so assistants can connect products to the brand cleanly.",
            ],
            [
              "02",
              "Matchability",
              "Turn concern, ingredients, routine step, suitability and evidence into consistent fields instead of asking a model to infer them from prose.",
            ],
            [
              "03",
              "Proof",
              "Publish the approved fixes, then rerun these exact questions and show whether recommendation share moved.",
            ],
          ].map(([number, title, body], index) => (
            <div
              key={title}
              className={`py-8 lg:px-8 lg:py-10 ${index > 0 ? "border-t border-black/14 lg:border-l lg:border-t-0" : ""}`}
            >
              <p className="font-mono text-[12px] font-semibold text-[#b8441d]">{number}</p>
              <h2 className="mt-3 text-[18px] font-semibold">{title}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-black/64">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111318] text-white">
        <div className="mx-auto grid max-w-[92rem] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/58">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Owner review
            </div>
            <h2 className="mt-4 max-w-[25ch] font-display text-[clamp(2rem,3.4vw,3.4rem)] font-normal leading-[1.03] tracking-[-0.025em]">
              Turn this audit into the first three reversible fixes.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/66">
              In 20 minutes, we will walk through the fields behind the misses,
              show what would change on the store, and agree on the questions that
              prove whether the work paid off.
            </p>
          </div>
          <BookReviewCta
            location="public_audit_report"
            label={`Review the ${brand} fix plan`}
            className="bg-white text-[#111318] hover:bg-[#e8653a] hover:text-white"
          />
        </div>
      </section>
    </div>
  );
}
