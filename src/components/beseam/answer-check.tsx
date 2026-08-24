"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { ArrowRight, Check, ChevronDown, Loader2, Lock, Share2, X } from "lucide-react";

import type {
  Answer,
  AnswerCheckResult,
  ShownProduct,
  Step,
} from "@/components/beseam/answer-check-types";
import { ChannelIcon } from "@/components/beseam/channel-icon";
import TrackedLink from "@/components/beseam/tracked-link";
import { SAMPLE_LOOP } from "@/data/sample-loop";
import { SAMPLE_SCAN } from "@/data/sample-scan";
import useAnalytics from "@/hooks/useAnalytics";

export type { AnswerCheckResult };

const POLL_MS = 6000;
const MAX_POLLS = 60; // ~6 minutes, then stop asking
const APP_REGISTER_URL = "https://app.beseam.com/register";
const APP_REPORT_URL = "https://app.beseam.com/report";

const LIVE_STATUSES = new Set(["running", "queued", "validating"]);

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

function BrandFavicon({ domain, name }: { domain?: string | null; name: string }) {
  const [source, setSource] = useState<"site" | "google" | "fallback">("site");
  const host = faviconHost(domain);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (!host) return null;

  if (source !== "fallback") {
    const src =
      source === "site"
        ? `https://${host}/favicon.ico`
        : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        loading="lazy"
        onError={() => setSource(source === "site" ? "google" : "fallback")}
        className="h-7 w-7 shrink-0 border border-black/14 bg-white object-contain p-0.5"
      />
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

function StepEvidence({
  step,
  result,
}: {
  step: Step;
  result: AnswerCheckResult;
}) {
  if (step.key === "storefront") {
    const evidence = result.brand_evidence;
    const products = evidence?.products.slice(0, 3) ?? [];
    return (
      <div className="grid gap-4 text-[12.5px] leading-relaxed text-black/68 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-[#111318]">Detected store</p>
          <p className="mt-1">
            {result.brand ?? result.domain} · {result.platform ?? "platform unknown"}
            {evidence?.market ? ` · ${evidence.market}` : ""}
          </p>
          <p className="mt-1 text-black/58">
            {result.products_seen} sampled {result.products_seen === 1 ? "product" : "products"}
          </p>
        </div>
        {products.length ? (
          <div>
            <p className="font-semibold text-[#111318]">Sampled products</p>
            <ul className="mt-1 space-y-1">
              {products.map((product) => (
                <li key={product.title} className="truncate">
                  {product.title}
                  {product.price
                    ? ` · ${product.price}${product.currency ? ` ${product.currency}` : ""}`
                    : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  if (step.key === "catalog") {
    const findings = result.findings.filter(
      (finding) => finding.source !== "page_audit",
    );
    return findings.length ? (
      <ul className="space-y-3">
        {findings.slice(0, 3).map((finding, index) => (
          <li key={`${finding.code}-${index}`}>
            <p className="text-[12.5px] font-semibold text-[#111318]">
              {finding.title}
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-black/62">
              {finding.detail}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-[12.5px] text-black/62">
        No catalog-level issues were found in the sampled storefront data.
      </p>
    );
  }

  if (step.key === "pages") {
    const audits = result.page_audits ?? [];
    const evaluated = audits.reduce(
      (sum, audit) => sum + audit.checks_evaluated,
      0,
    );
    const failed = audits.reduce((sum, audit) => sum + audit.checks_failed, 0);
    return audits.length ? (
      <div>
        <p className="text-[12.5px] font-semibold text-[#111318]">
          {failed} of {evaluated} measured page checks need attention
        </p>
        <ul className="mt-2 divide-y divide-black/10">
          {audits.slice(0, 3).map((audit) => (
            <li
              key={audit.url}
              className="flex items-start justify-between gap-4 py-2 first:pt-0 last:pb-0"
            >
              <span className="min-w-0 truncate text-[12px] text-black/66">
                {audit.title ?? audit.url}
              </span>
              <span className="shrink-0 font-mono text-[12px] text-black/58">
                {audit.checks_failed}/{audit.checks_evaluated} flagged
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p className="text-[12.5px] text-black/62">
        No sampled product pages were available to audit.
      </p>
    );
  }

  return null;
}

function StepRow({ step, result }: { step: Step; result?: AnswerCheckResult }) {
  const icon =
    step.state === "done" ? (
      <Check className="h-4 w-4 text-[#1f7a4d]" aria-hidden="true" />
    ) : step.state === "failed" ? (
      <X className="h-4 w-4 text-[#d95028]" aria-hidden="true" />
    ) : step.state === "active" ? (
      <Loader2
        className="h-4 w-4 animate-spin text-black/62"
        aria-hidden="true"
      />
    ) : (
      <span
        className="block h-1.5 w-1.5 translate-x-1 translate-y-1 rounded-full bg-black/25"
        aria-hidden="true"
      />
    );
  const expandable =
    Boolean(result) &&
    step.state === "done" &&
    ["storefront", "catalog", "pages"].includes(step.key);

  if (expandable && result) {
    return (
      <details className="group border-b border-black/12 last:border-b-0">
        <summary className="flex cursor-pointer list-none items-start gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
            {icon}
          </span>
          <span className="flex-1 text-left text-[14px] leading-snug text-black/72">
            {step.label}
            {step.detail ? (
              <span className="mt-1 block text-[12px] text-black/62">
                {step.detail}
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[12px] font-semibold text-black/52">
            Details
            <ChevronDown
              className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </span>
        </summary>
        <div className="border-t border-black/8 bg-black/[0.02] px-5 py-4 pl-12">
          <StepEvidence step={step} result={result} />
        </div>
      </details>
    );
  }

  return (
    <div className="flex items-start gap-3 border-b border-black/12 px-5 py-3 last:border-b-0">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="flex-1 text-left text-[14px] leading-snug text-black/72">
        {step.label}
        {step.detail ? (
          <span className="mt-1 block text-[12px] text-black/62">
            {step.detail}
          </span>
        ) : null}
      </span>
    </div>
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

function DiagnosticWorkspace({
  result,
  aiLocked,
}: {
  result: AnswerCheckResult;
  aiLocked: boolean;
}) {
  const audits = result.page_audits ?? [];
  const catalogFindings = result.findings.filter(
    (finding) => finding.source !== "page_audit",
  );
  const failedChecks = audits.reduce(
    (sum, audit) => sum + audit.checks_failed,
    0,
  );
  const evaluatedChecks = audits.reduce(
    (sum, audit) => sum + audit.checks_evaluated,
    0,
  );
  const urgent = result.findings.filter(
    (finding) => finding.severity === "blocker" || finding.severity === "high",
  );
  const priority = sortedFindings(result)[0] ?? null;
  const needsAttention =
    urgent.length > 0 || failedChecks > 0 || catalogFindings.length > 0;

  const domainCards = [
    {
      label: "Storefront",
      status: catalogFindings.length ? "Needs attention" : "Read",
      warn: catalogFindings.length > 0,
      value: `${result.products_seen} products sampled`,
      detail: `${catalogFindings.length} catalog ${catalogFindings.length === 1 ? "signal" : "signals"}${result.platform ? ` · ${result.platform}` : ""}`,
    },
    {
      label: "Product pages",
      status: failedChecks ? "Needs attention" : "Read",
      warn: failedChecks > 0,
      value: `${audits.length} sampled ${audits.length === 1 ? "PDP" : "PDPs"}`,
      detail: evaluatedChecks
        ? `${failedChecks} of ${evaluatedChecks} measured checks flagged`
        : "No product-page checks were measured",
    },
    {
      label: "Assistant visibility",
      status: aiLocked ? "Verification required" : result.answers.length ? "Complete" : "Running",
      warn: aiLocked,
      value: "ChatGPT + Google AI Mode",
      detail: aiLocked
        ? "Email verification unlocks the live buyer-question check."
        : result.answers.length
          ? `${result.answers.length} assistant observations recorded`
          : "Live buyer-question checks are in progress.",
    },
  ];

  return (
    <section className="border-t border-black/14 bg-[#fafafa]">
      <div className="bg-white">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/14 px-5 py-5 sm:px-6">
          <div>
            <span className="inline-flex items-center border-l-2 border-[#b8441d] pl-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/56">
              Store diagnostic workspace
            </span>
            <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.025em] text-[#172033]">
              {needsAttention ? "Overall: needs attention" : "No major issues found in this sample"}
            </h3>
            <p className="mt-2 max-w-[68ch] text-[13.5px] leading-relaxed text-[#64748b]">
              Public storefront and product-page evidence, kept separate from the verified live assistant run.
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 border border-black/18 bg-white px-3 py-1.5 text-[12px] font-semibold ${
              needsAttention ? "text-[#b8441d]" : "text-[#111318]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${needsAttention ? "bg-amber-500" : "bg-emerald-500"}`}
              aria-hidden="true"
            />
            {needsAttention ? "Degraded" : "Read complete"}
          </span>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <div className="grid border-y border-black/12 lg:grid-cols-3">
            {domainCards.map((card) => (
              <div
                key={card.label}
                className="border-t border-black/12 bg-white p-4 first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                    {card.label}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 border border-black/14 bg-white px-2.5 py-1 text-[11px] font-semibold ${
                      card.warn ? "text-[#b8441d]" : "text-[#111318]"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${card.warn ? "bg-amber-500" : "bg-emerald-500"}`}
                      aria-hidden="true"
                    />
                    {card.status}
                  </span>
                </div>
                <p className="mt-4 text-[16px] font-semibold tracking-[-0.01em] text-[#172033]">
                  {card.value}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#64748b]">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
              Evidence sources
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["Public catalog", `${result.products_seen} products read`, true],
                ["Product pages", `${audits.length} pages audited`, audits.length > 0],
                ["Live assistants", aiLocked ? "Verification required" : result.answers.length ? "Verified run complete" : "Running", !aiLocked],
              ].map(([label, state, fresh]) => (
                <div key={String(label)} className="flex items-center gap-2 border border-black/14 bg-white px-3 py-2.5">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${fresh ? "bg-emerald-500" : "border-[1.5px] border-[#94a3b8] bg-transparent"}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-[#172033]">{label}</p>
                    <p className={`truncate text-[11px] font-semibold ${fresh ? "text-emerald-700" : "text-[#64748b]"}`}>{state}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {priority ? (
            <div className="mt-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                Prioritized issue
              </p>
              <div className="border-t border-black/14 bg-white pt-4 sm:pt-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  {priority.severity ? (
                    <span
                      className={`${SEVERITY_BADGE} ${SEVERITY_STYLES[priority.severity] ?? SEVERITY_STYLES.low}`}
                    >
                      {priority.severity}
                    </span>
                  ) : null}
                  <span className="text-[12px] font-semibold text-[#64748b]">
                    {priority.source === "page_audit" ? findingArea(priority.code) : "Storefront evidence"}
                  </span>
                  <span className="text-[#94a3b8]" aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#64748b]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    Public evidence
                  </span>
                </div>

                <h4 className="mt-3 max-w-[52rem] text-[20px] font-semibold leading-snug tracking-[-0.015em] text-[#172033] sm:text-[22px]">
                  {priority.title}
                </h4>

                <dl className="mt-4 divide-y divide-[#dbe2ec] border-y border-[#dbe2ec]">
                  <div className="grid grid-cols-[7rem_1fr] gap-3 py-2.5 sm:grid-cols-[9rem_1fr]">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#64748b]">Evidence</dt>
                    <dd className="text-[13px] leading-relaxed text-[#475569]">{priority.detail}</dd>
                  </div>
                  {priority.product ? (
                    <div className="grid grid-cols-[7rem_1fr] gap-3 py-2.5 sm:grid-cols-[9rem_1fr]">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#64748b]">Affected</dt>
                      <dd className="text-[13px] font-medium text-[#172033]">{priority.product}</dd>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-[7rem_1fr] gap-3 py-2.5 sm:grid-cols-[9rem_1fr]">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#64748b]">Source</dt>
                    <dd className="text-[13px] text-[#475569]">
                      {priority.source === "page_audit" ? "Deterministic product-page audit" : "Public storefront catalog"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-[#64748b]">
                    {priority.fix_complexity ? <span>Fix complexity: <strong className="font-semibold text-[#172033]">{priority.fix_complexity}</strong></span> : null}
                    <span>Impact not yet measured</span>
                  </div>
                  {priority.url ? (
                    <a
                      href={priority.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-9 items-center font-semibold text-[#172033] underline decoration-[#cbd5e1] underline-offset-4 hover:decoration-[#b8441d]"
                    >
                      Inspect page →
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
function FindingsPanel({ result }: { result: AnswerCheckResult }) {
  const findings = sortedFindings(result);
  if (!findings.length) return null;
  const urgentCount = findings.filter(
    (finding) => finding.severity === "blocker" || finding.severity === "high",
  ).length;

  return (
    <div className="bg-white">
      <details className="group border-b border-black/14 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/48">Findings</p>
            <p className="mt-1 text-[14px] font-semibold text-[#111318]">
              {findings.length} issues{urgentCount > 0 ? ` · ${urgentCount} high priority` : ""}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 text-[12px] font-semibold text-[#111318]">
            Inspect
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </span>
        </summary>

        <div className="border-t border-black/14 bg-[#fafafa]">
          <ol className="divide-y divide-black/12">
            {findings.map((finding, index) => (
              <li
                key={`${finding.code}-${finding.product ?? index}`}
                className="bg-white px-5 py-4 sm:px-6 sm:py-5"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[10.5px] text-[#94a3b8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {finding.severity ? (
                    <span
                      className={`${SEVERITY_BADGE} ${SEVERITY_STYLES[finding.severity] ?? SEVERITY_STYLES.low}`}
                    >
                      {finding.severity}
                    </span>
                  ) : (
                    <span className="border border-black/14 bg-white px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-black/56">
                      catalog
                    </span>
                  )}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#64748b]">
                    {finding.source === "page_audit" ? findingArea(finding.code) : "Storefront evidence"}
                  </span>
                </div>

                <h4 className="mt-3 text-[16px] font-semibold leading-snug text-[#172033]">
                  {finding.title}
                </h4>

                <dl className="mt-3 divide-y divide-[#e5eaf0] border-y border-[#e5eaf0]">
                  <div className="grid grid-cols-[6rem_1fr] gap-3 py-2.5 sm:grid-cols-[8rem_1fr]">
                    <dt className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#94a3b8]">Evidence</dt>
                    <dd className="text-[12.5px] leading-relaxed text-[#475569]">{finding.detail}</dd>
                  </div>
                  {finding.product ? (
                    <div className="grid grid-cols-[6rem_1fr] gap-3 py-2.5 sm:grid-cols-[8rem_1fr]">
                      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#94a3b8]">Affected</dt>
                      <dd className="text-[12.5px] font-medium text-[#172033]">{finding.product}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-[#64748b]">
                  <span>{finding.fix_complexity ? `Fix complexity: ${finding.fix_complexity}` : "Impact not yet measured"}</span>
                  {finding.url ? (
                    <a
                      href={finding.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#172033] underline decoration-[#cbd5e1] underline-offset-4 hover:decoration-[#b8441d]"
                    >
                      Inspect page →
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </details>
    </div>
  );
}
function ProductPageWorkspace({ result }: { result: AnswerCheckResult }) {
  const audits = result.page_audits ?? [];
  if (!audits.length) return null;
  const failed = audits.reduce((sum, audit) => sum + audit.checks_failed, 0);
  const high = audits.reduce(
    (sum, audit) =>
      sum +
      audit.findings.filter(
        (finding) => finding.severity === "blocker" || finding.severity === "high",
      ).length,
    0,
  );

  return (
    <details className="group border-b border-black/14 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/48">
              PDP analyzer
            </p>
            {high > 0 ? (
              <span className="border border-black/14 bg-white px-2 py-0.5 text-[10.5px] font-semibold text-[#b8441d]">
                {high} high priority
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-[14px] font-semibold text-[#111318]">
            {failed} checks flagged across {audits.length} sampled {audits.length === 1 ? "PDP" : "PDPs"}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-2 text-[12px] font-semibold text-[#111318]">
          Inspect
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </span>
      </summary>

      <div className="border-t border-black/14 bg-[#fafafa]">
        {audits.map((audit, auditIndex) => {
          const highFindings = audit.findings.filter(
            (finding) => finding.severity === "blocker" || finding.severity === "high",
          ).length;
          const groups = Array.from(
            audit.findings.reduce((map, finding) => {
              const label = findingArea(finding.code);
              const rows = map.get(label) ?? [];
              rows.push(finding);
              map.set(label, rows);
              return map;
            }, new Map<string, typeof audit.findings>()),
          );

          return (
            <section key={audit.url} className={auditIndex > 0 ? "border-t border-black/18" : ""}>
              <div className="grid gap-4 bg-white px-5 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_8rem_8rem_auto] lg:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-black/48">
                      Product page {String(auditIndex + 1).padStart(2, "0")}
                    </span>
                    {highFindings > 0 ? (
                      <span className="text-[10.5px] font-semibold text-[#b8441d]">
                        {highFindings} high priority
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 truncate text-[14px] font-semibold text-[#111318]">
                    {audit.title ?? audit.url}
                  </p>
                  <p className="mt-1 truncate font-mono text-[10.5px] text-black/42">{audit.url}</p>
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-[#b8441d]">{audit.checks_failed}</p>
                  <p className="text-[10px] uppercase tracking-[0.06em] text-black/48">checks flagged</p>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#111318]">{groups.length} issue areas</p>
                  <p className="mt-0.5 text-[10.5px] text-black/42">{audit.checks_evaluated} measured</p>
                </div>
                <a
                  href={audit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] font-semibold text-[#111318] underline decoration-black/24 underline-offset-4 hover:decoration-[#b8441d]"
                >
                  Open page →
                </a>
              </div>

              {groups.length > 0 ? (
                <div className="border-t border-black/12 px-5 sm:px-6">
                  {groups.map(([label, findings], groupIndex) => (
                    <section
                      key={label}
                      className={`grid gap-3 py-4 md:grid-cols-[11rem_minmax(0,1fr)] ${groupIndex > 0 ? "border-t border-black/12" : ""}`}
                    >
                      <div>
                        <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-black/48">{label}</p>
                        <p className="mt-1 text-[12px] text-black/56">
                          {findings.length} {findings.length === 1 ? "issue" : "issues"}
                        </p>
                      </div>
                      <ul className="divide-y divide-black/10 border-t border-black/10 md:border-t-0">
                        {findings.map((finding, index) => (
                          <li key={`${finding.code}-${index}`} className="py-3 first:pt-0 md:first:pt-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {finding.severity ? (
                                <span className={`${SEVERITY_BADGE} ${SEVERITY_STYLES[finding.severity] ?? SEVERITY_STYLES.low}`}>
                                  {finding.severity}
                                </span>
                              ) : null}
                              <span className="text-[12.5px] font-semibold leading-snug text-[#111318]">{finding.title}</span>
                            </div>
                            <p className="mt-1.5 text-[11.5px] leading-relaxed text-black/58">{finding.detail}</p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              ) : (
                <p className="border-t border-black/12 px-5 py-4 text-[12px] text-black/56 sm:px-6">
                  No observed failures on this sampled page.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </details>
  );
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
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#dbe2ec] bg-white px-5 py-5 sm:px-6">
          <div>
            <span className="inline-flex items-center border-l-2 border-[#b8441d] pl-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black/56">
              Observe · live answer evidence
            </span>
            <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.025em] text-[#172033]">
              What shoppers are being told
            </h3>
            <p className="mt-2 max-w-[66ch] text-[13.5px] leading-relaxed text-[#64748b]">
              Verified buyer-question observations, kept with the assistant, competing brands, and surfaced products.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 border border-black/18 bg-white px-3 py-1.5 text-[12px] font-semibold text-[#111318]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Verified run complete
          </span>
        </div>

        <div className="grid gap-0 border-t border-black/12 bg-white lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="flex flex-col border-b border-black/12 p-5 sm:px-6 lg:border-b-0 lg:border-r">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#64748b]">
              Brand appearance
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <span className={`text-[46px] font-semibold leading-none tracking-[-0.04em] tabular-nums ${scoreBand(pct).text}`}>
                {named}/{scored.length}
              </span>
              <span className="mb-1 border border-black/14 bg-white px-2.5 py-1 font-mono text-[11px] text-black/56">
                {pct}% of observed answers
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-[12.5px] leading-relaxed text-[#475569]">
              {named === scored.length
                ? "Your brand appeared in every observed answer in this run."
                : named === 0
                  ? "Your brand did not appear in any observed answer in this run."
                  : `Your brand was absent from ${scored.length - named} of ${scored.length} observed answers.`}
            </p>

            {topRival && named < scored.length ? (
              <div className="mt-5 border-l-2 border-[#b8441d] bg-[#fafafa] p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-amber-700">
                    Needs attention
                  </p>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#475569]">
                  {topRival.label} was the most frequently named alternative in this sample ({topRival.count}×).
                </p>
              </div>
            ) : null}
          </div>

          <div className="p-5 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#64748b]">
                By assistant
              </p>
              <span className="font-mono text-[10.5px] text-[#94a3b8]">
                {channels.length} {channels.length === 1 ? "assistant" : "assistants"}
              </span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {engines.map((engine) => (
                <div
                  key={engine.channel}
                  className="border border-black/14 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5 text-[13px] font-semibold text-[#172033]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-black/14 bg-white">
                        <ChannelIcon
                          channel={CHANNEL_BRAND_KEYS[engine.channel.toLowerCase()] ?? engine.channel}
                          className="h-4 w-4 opacity-80"
                        />
                      </span>
                      <span className="truncate">{engine.channel}</span>
                    </span>
                    <span className="font-mono text-[12px] text-[#64748b]">
                      {engine.wins}/{engine.total}
                    </span>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e5eaf0]">
                    <span
                      className={`block h-full rounded-full ${scoreBand(engine.pct).fill}`}
                      style={{ width: `${Math.max(engine.pct, 1.5)}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-[#64748b]">
                    <span>{engine.wins} named you</span>
                    <span>{engine.total - engine.wins} missed you</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <dl className="grid border-t border-[#dbe2ec] bg-white sm:grid-cols-3">
          {[
            ["Observed answers", String(scored.length)],
            ["Buyer questions", String(questionCount)],
            ["Rivals named", String(rivals.length)],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`px-5 py-4 sm:px-6 ${index > 0 ? "border-t border-[#dbe2ec] sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#94a3b8]">
                {label}
              </dt>
              <dd className="mt-1.5 text-[18px] font-semibold text-[#172033]">
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
      {unknown ? (
        <span aria-hidden="true">-</span>
      ) : named ? (
        <Check className="h-2.5 w-2.5" aria-hidden="true" />
      ) : (
        <X className="h-2.5 w-2.5" aria-hidden="true" />
      )}
      {channel}
      {answer.observation_method ? (
        <span className="border-l border-current/20 pl-1.5 font-mono text-[10px] font-normal opacity-70">
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
        <p className="mt-1 text-[10.5px] leading-snug text-black/48">
          {product.merchant ?? "Merchant"}
          {product.price ? ` · ${product.price}` : ""}
        </p>
        {product.url && product.link_live ? (
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex text-[10.5px] font-semibold text-[#111318] underline decoration-black/24 underline-offset-4 hover:decoration-[#b8441d]"
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
  const pageAuditStatus = result.page_audits_status ?? (audits.length ? "complete" : "not_started");
  const pageAuditsInFlight = pageAuditStatus === "queued" || pageAuditStatus === "running";
  const catalogFindings = findings.filter((finding) => finding.source !== "page_audit" && finding.source !== "catalog_sample");
  const consistencyFindings = findings.filter((finding) => finding.source === "catalog_sample");
  const evaluatedChecks = audits.reduce((sum, audit) => sum + audit.checks_evaluated, 0);
  const failedChecks = audits.reduce((sum, audit) => sum + audit.checks_failed, 0);

  const market = result.brand_evidence?.market ?? null;
  const inventory = result.site_inventory;
  const catalog = result.catalog_inventory;
  const rawPageTypes = inventory?.page_types ?? {};
  const entityPageTypes = inventory?.entity_page_types ?? rawPageTypes;
  const siteHosts = Object.keys(inventory?.hosts ?? {});
  const localeCount = inventory?.locales.length ?? 0;
  const entitySuffix = inventory?.urls_capped ? "+" : "";
  const siteProductCount = entityPageTypes.product ?? 0;
  const productCount = catalog && !catalog.products_capped
    ? catalog.products_checked
    : siteProductCount || result.products_seen;
  const productCountSuffix = catalog && !catalog.products_capped ? "" : entitySuffix;
  const exactCollectionCount = catalog?.collections_status === "measured" && !catalog.collections_capped
    ? Number(catalog.collections_checked ?? 0)
    : null;
  const collectionCount = exactCollectionCount ?? entityPageTypes.collection ?? 0;
  const collectionCountSuffix = exactCollectionCount == null ? entitySuffix : "";
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
  const crawlerLabel = !inventory || inventory.search_crawlers.status !== "measured"
    ? "Not measured"
    : inventory.search_crawlers.blocked > 0
      ? `${inventory.search_crawlers.blocked} blocked`
      : "Open";
  const discoveryFiles = Object.entries(inventory?.discovery_files ?? {});
  const discoveryFilesPresent = discoveryFiles.filter(([, value]) => value.present === true).length;
  const internalReach = inventory?.internal_reach;
  const internalReachLabel = !internalReach
    ? "Not measured"
    : internalReach.status === "sampled"
      ? `${internalReach.internal_links ?? 0} homepage links · ${internalReach.product_links ?? 0} product · ${internalReach.collection_links ?? 0} collection`
      : internalReach.status === "not_measured"
        ? "Not measured in quick scan"
        : internalReach.status;

  const siteMapRows = ([
    ["Product pages", `${productCount}${productCountSuffix}`],
    ["Collections", `${collectionCount}${collectionCountSuffix}`],
    ["Pages", `${contentPageCount}${entitySuffix}`],
    ["Articles", `${articleCount}${entitySuffix}`],
    ["Blogs", `${blogCount}${entitySuffix}`],
    ["Policies", `${policyCount}${entitySuffix}`],
    ["Locale URL copies", `${inventory?.localized_url_copies ?? 0}${inventory?.urls_capped ? "+" : ""}`],
  ] as Array<[string, string]>).filter(([, value]) => Number.parseInt(value, 10) > 0);

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

  const Fold = ({ title, summary, children }: { title: string; summary: string; children: React.ReactNode }) => (
    <details className="group border-b border-black/14 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-[#111318]">{title}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-black/56">{summary}</p>
        </div>
        <span className="flex shrink-0 items-center gap-2 text-[11.5px] font-semibold text-[#111318]">
          Details
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
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
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#b8441d]">
            {pageAuditsInFlight ? "Observe · first results ready" : "Observe complete"}
          </p>
          <p className="mt-1 text-[12px] text-black/52">
            {pageAuditsInFlight ? "Store and catalog are ready while representative product pages finish." : "You can see where the gaps are. Next, understand what is driving them."}
          </p>
        </div>
        <span className="border border-black/14 bg-white px-2.5 py-1 text-[10.5px] font-semibold text-[#111318]">
          {pageAuditsInFlight ? "Inspecting pages" : "Observed"}
        </span>
      </div>

      <Fold
        title="Store"
        summary={inventory
          ? `${productCount}${productCountSuffix} products · ${collectionCount}${collectionCountSuffix} collections · ${localeCount ? `${localeCount} locale paths` : market ?? "primary storefront"} · sitemap ${sitemapLabel.toLowerCase()} · crawler access ${crawlerLabel.toLowerCase()}`
          : `${result.brand ?? result.domain} · ${result.platform ?? "platform unknown"}`}
      >
        <div className="grid gap-px bg-black/10 sm:grid-cols-4">
          <div className="bg-white px-5 py-4 sm:px-6">
            <p className="text-[10px] text-black/42">Store</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#111318]">{result.brand ?? result.domain}</p>
            <p className="mt-0.5 text-[11px] text-black/48">{result.platform ?? "Storefront"}</p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[10px] text-black/42">Public footprint</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#111318]">{inventoryUrlLabel}</p>
            <p className="mt-0.5 text-[11px] text-black/48">{inventory?.localized_url_copies ? `${inventory.localized_url_copies}+ localized URL copies` : "Public URLs discovered"}</p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="text-[10px] text-black/42">Locale paths</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#111318]">{localeCount || "Primary"}</p>
            <p className="mt-0.5 text-[11px] text-black/48">{inventory?.locales.length ? inventory.locales.join(", ") : market ?? "Primary storefront"}</p>
          </div>
          <div className="bg-white px-5 py-4 sm:px-6">
            <p className="text-[10px] text-black/42">Domains</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#111318]">{siteHosts.length || 1}</p>
            <p className="mt-0.5 truncate text-[11px] text-black/48">{siteHosts.join(", ") || result.domain}</p>
          </div>
        </div>

        {inventory ? (
          <div className="border-t border-black/10 bg-[#fffaf7] px-5 py-5 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <p className="text-[11px] font-semibold text-[#111318]">What exists</p>
                <div className="mt-3 grid grid-cols-2 gap-px border border-black/10 bg-black/10 sm:grid-cols-3 lg:grid-cols-2">
                  {siteMapRows.map(([label, count]) => (
                    <div key={label} className="bg-white px-3 py-3">
                      <p className="text-[10px] text-black/44">{label}</p>
                      <p className="mt-1 text-[18px] font-semibold text-[#111318] tabular-nums">{count}</p>
                    </div>
                  ))}
                </div>
                {inventory.urls_capped ? <p className="mt-2 text-[10.5px] leading-relaxed text-black/42">Counts with + are lower bounds because the quick URL inventory reached its 5,000-URL cap.</p> : null}
              </div>

              <div>
                <p className="text-[11px] font-semibold text-[#111318]">Can it be discovered?</p>
                <dl className="mt-3 divide-y divide-black/10 border-y border-black/10 bg-white">
                  {[
                    ["robots.txt", robotsLabel, inventory.robots.status === "unavailable"],
                    ["Sitemap", `${sitemapLabel}${inventory.sitemap.urls_from_sitemap ? ` · ${inventory.sitemap.urls_from_sitemap}${inventory.urls_capped ? "+" : ""} URLs` : ""}`, inventory.sitemap.status === "not_found"],
                    ["Search crawlers", inventory.search_crawlers.status === "measured" ? `${inventory.search_crawlers.allowed}/${inventory.search_crawlers.total} allowed` : "Not measured", inventory.search_crawlers.blocked > 0],
                    ["Assistant crawlers", inventory.assistant_crawlers.status === "measured" ? `${inventory.assistant_crawlers.allowed}/${inventory.assistant_crawlers.total} allowed` : "Not measured", inventory.assistant_crawlers.blocked > 0],
                    ["URLs blocked by robots", inventory.robots.blocked_urls == null ? "Not measured" : String(inventory.robots.blocked_urls), Number(inventory.robots.blocked_urls ?? 0) > 0],
                    ["Internal reach", internalReachLabel, false],
                    ["Orphan products", internalReach?.orphan_products === "not_measured" ? "Not measured in quick scan" : internalReach?.orphan_products ?? "Not measured", false],
                    ["Discovery files", discoveryFiles.length ? `${discoveryFilesPresent}/${discoveryFiles.length} found` : "Not measured", false],
                    ["Sitemap freshness", inventory.sitemap.dated_urls ? `${inventory.sitemap.dated_urls}${inventory.urls_capped ? "+" : ""} dated URLs` : "No dates exposed", false],
                    ["Images in sitemap", inventory.sitemap.image_entries ? `${inventory.sitemap.image_entries}${inventory.urls_capped ? "+" : ""} references` : "No image entries exposed", false],
                  ].map(([label, value, warn]) => (
                    <div key={String(label)} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-3 py-2.5">
                      <dt className="text-[11px] text-black/50">{label}</dt>
                      <dd className={`text-right text-[11px] font-semibold ${warn ? "text-[#b8441d]" : "text-[#111318]"}`}>{String(value)}</dd>
                    </div>
                  ))}
                </dl>
                {internalReach?.status === "sampled" ? <p className="mt-2 text-[10.5px] leading-relaxed text-black/42">Homepage paths are sampled here. True orphan coverage needs the full internal-link graph.</p> : null}
                {discoveryFiles.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {discoveryFiles.map(([path, value]) => <span key={path} className={`border px-2 py-1 text-[10px] ${value.present ? "border-[#1f7a4d]/30 text-[#1f7a4d]" : "border-black/12 text-black/44"}`}>{path} · {value.present ? "found" : value.present === false ? "not found" : "not measured"}</span>)}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Fold>

      <Fold
        title="Catalog"
        summary={catalog
          ? `${catalogCheckedLabel} · ${catalog.products_with_gaps} need attention · ${catalog.unavailable_products} unavailable${consistencyFindings.length ? ` · ${consistencyFindings.length} sampled consistency gaps` : ""}`
          : `${catalogFindings.length} catalog ${catalogFindings.length === 1 ? "gap" : "gaps"}`}
      >
        {catalog ? (
          <div className="bg-[#fffaf7] px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold text-[#111318]">Can products be understood and distinguished?</p>
                <p className="mt-1 text-[11.5px] text-black/50">{catalogCheckedLabel}{catalog.products_capped ? " · counts below cover the products checked" : ""}</p>
              </div>
              <span className="text-[11px] text-black/44">{catalog.products_with_gaps} products with at least one gap</span>
            </div>

            <div className="mt-4 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">Categories & collections</p>
                <p className="mt-2 text-[18px] font-semibold text-[#111318]">{catalog.missing_product_types} <span className="text-[11px] font-normal text-black/46">without category</span></p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-black/48">{catalog.product_type_count ?? 0} product types · {collectionCount}{collectionCountSuffix} collections · {catalog.missing_tags} without tags</p>
                <p className="mt-2 text-[10px] text-black/38">Collection membership: {catalog.collection_membership?.status === "not_measured" ? "not measured in quick scan" : catalog.collection_membership?.status ?? "not measured"}</p>
                {catalog.top_product_types?.length ? <p className="mt-2 line-clamp-2 text-[10px] text-black/46">Common product types: {catalog.top_product_types.slice(0, 4).map((item) => item.name).join(" · ")}</p> : null}
                {catalog.collection_titles?.length ? <p className="mt-1 line-clamp-2 text-[10px] text-black/46">Collections: {catalog.collection_titles.slice(0, 4).join(" · ")}</p> : null}
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">Product identity</p>
                <p className="mt-2 text-[18px] font-semibold text-[#111318]">{catalog.missing_identifiers} <span className="text-[11px] font-normal text-black/46">without SKU/barcode</span></p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-black/48">{catalog.placeholder_vendors} brand/vendor gaps · {catalog.identifier_conflicts} identifier conflicts</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">Variants & buyer options</p>
                <p className="mt-2 text-[18px] font-semibold text-[#111318]">{catalog.multi_variant_products} <span className="text-[11px] font-normal text-black/46">products with variants</span></p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-black/48">{catalog.default_only_options} expose no buyer options · {catalog.variant_option_gaps ?? 0} true variant-option gaps · {catalog.variant_identifier_gaps} variant ID gaps</p>
                {catalog.option_dimensions?.length ? <p className="mt-2 line-clamp-2 text-[10px] text-black/46">Options: {catalog.option_dimensions.slice(0, 5).map((item) => item.name).join(" · ")}</p> : null}
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">Product information</p>
                <p className="mt-2 text-[18px] font-semibold text-[#111318]">{catalog.describability.strong} <span className="text-[11px] font-normal text-black/46">well described</span></p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-black/48">{catalog.missing_descriptions} missing descriptions · {catalog.thin_descriptions} thin · {catalog.missing_images} without images · {catalog.duplicate_description_products} duplicate copy</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">Availability</p>
                <p className={`mt-2 text-[18px] font-semibold ${catalog.unavailable_products ? "text-[#b8441d]" : "text-[#111318]"}`}>{catalog.unavailable_products} <span className="text-[11px] font-normal text-black/46">unavailable products</span></p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-black/48">{catalog.total_variants} variants across {catalog.products_checked} checked products</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[11px] font-semibold text-[#111318]">Product consistency</p>
                {pageAuditsInFlight ? <div className="mt-2 flex items-center gap-2 text-[11px] text-black/52"><Loader2 className="h-3.5 w-3.5 animate-spin text-[#b8441d]" />Comparing representative PDPs…</div> : <p className="mt-2 text-[18px] font-semibold text-[#111318]">{consistencyFindings.length} <span className="text-[11px] font-normal text-black/46">sampled gaps</span></p>}
                <p className="mt-1 text-[10.5px] leading-relaxed text-black/48">Catalog ↔ page data for price, availability, product data and buyer attributes on {audits.length || result.products_seen} representative PDPs.</p>
              </div>
            </div>

            {catalogFindings.length ? (
              <div className="mt-5 border-t border-black/10 pt-4">
                <p className="text-[11px] font-semibold text-[#111318]">What stands out</p>
                <ul className="mt-2 divide-y divide-black/10 border-y border-black/10 bg-white px-3">
                  {catalogFindings.map((finding, index) => (
                    <li key={`${finding.code}-${index}`} className="flex items-start justify-between gap-4 py-3">
                      <div><p className="text-[11.5px] font-semibold text-[#111318]">{finding.title}</p><p className="mt-1 text-[10.5px] leading-relaxed text-black/50">{finding.detail}</p></div>
                      {finding.severity === "high" || finding.severity === "blocker" ? <span className="shrink-0 text-[9.5px] font-semibold uppercase text-[#b8441d]">High</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="bg-white px-5 py-4 text-[12.5px] text-black/54 sm:px-6">Catalog-wide detail is limited on this storefront; the representative product pages continue below.</div>
        )}
      </Fold>

      <Fold
        title="Product pages"
        summary={pageAuditsInFlight
          ? `${result.products_seen} representative PDPs · inspection in progress`
          : pageAuditStatus === "failed"
            ? `${result.products_seen} representative PDPs · page inspection could not complete`
            : `${audits.length} representative PDPs · ${evaluatedChecks} measured checks · ${failedChecks} review · ${staticAreas.reduce((sum, area) => sum + area.unevaluated, 0)} not measured`}
      >
        {pageAuditsInFlight ? (
          <div className="flex items-start gap-3 bg-white px-5 py-5 sm:px-6"><Loader2 className="mt-0.5 h-4 w-4 animate-spin text-[#b8441d]" /><div><p className="text-[12.5px] font-semibold text-[#111318]">Inspecting {result.products_seen} representative product pages</p><p className="mt-1 text-[11.5px] text-black/50">Store and catalog evidence is already available above. Page-level results will appear here automatically.</p></div></div>
        ) : pageAuditStatus === "failed" ? (
          <p className="bg-white px-5 py-4 text-[12px] text-black/54 sm:px-6">The Store and Catalog observations are still valid. The representative PDP inspection could not complete on this run.</p>
        ) : (
          <>
            <div className="border-b border-black/12 bg-[#fffaf7] px-5 py-4 sm:px-6">
              <p className="text-[11px] font-semibold text-[#111318]">What the representative pages show</p>
              <div className="mt-3 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
                {staticAreas.map((area) => (
                  <div key={area.label} className="bg-white px-3 py-3">
                    <p className="text-[10.5px] font-semibold leading-snug text-[#111318]">{area.label}</p>
                    <div className="mt-2 flex items-baseline justify-between gap-2">
                      <span className={`text-[16px] font-semibold ${area.failed ? "text-[#b8441d]" : "text-[#111318]"}`}>{area.failed} review</span>
                      <span className="text-[9.5px] text-black/42">{area.evaluated} measured{area.unevaluated ? ` · ${area.unevaluated} not measured` : ""}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ul className="divide-y divide-black/10 bg-white">
              {audits.map((audit, index) => (
                <li key={audit.url} className="grid gap-3 px-5 py-3.5 sm:grid-cols-[28px_minmax(0,1fr)_auto_auto] sm:items-center sm:px-6">
                  <span className="font-mono text-[10.5px] text-black/38">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0"><p className="truncate text-[12.5px] font-semibold text-[#111318]">{audit.title ?? audit.url}</p><p className="mt-0.5 truncate text-[10.5px] text-black/44">{audit.url}</p></div>
                  <div className="flex items-center gap-3 text-[10.5px] sm:justify-end">{audit.score != null ? <span className="font-semibold text-[#111318]">Health {Math.round(audit.score)}</span> : null}<span className={audit.checks_failed > 0 ? "font-semibold text-[#b8441d]" : "text-black/48"}>{audit.checks_failed}/{audit.checks_evaluated} review</span></div>
                  {audit.report_id ? <a href={`${APP_REPORT_URL}/${audit.report_id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 justify-self-start text-[11.5px] font-semibold text-[#111318] underline decoration-black/18 underline-offset-4 hover:text-[#b8441d] hover:decoration-[#b8441d] sm:justify-self-end">Inspect PDP <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></a> : <span className="justify-self-start text-[10.5px] text-black/34 sm:justify-self-end">Report unavailable</span>}
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
}: {
  number: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-black/14 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-0.5 font-mono text-[11px] font-semibold text-[#b8441d]">{number}</span>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-[#111318]">{title}</p>
            <p className="mt-1 text-[12.5px] text-black/56">{summary}</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-2 text-[12px] font-semibold text-[#111318]">
          Inspect
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </span>
      </summary>
      <div className="border-t border-black/14 bg-[#fffaf7]">{children}</div>
    </details>
  );
}

function LockedAiStages() {
  const stages = [
    ["01", "What shoppers ask", "The buying questions your store needs to win"],
    ["02", "What gets chosen", "Which brands and products appear when yours do not"],
    ["03", "Why it happens", "Connect the live answers to the evidence you already observed"],
  ] as const;

  return (
    <div className="bg-white" aria-label="Understand is locked until email verification">
      {stages.map(([number, title, summary]) => (
        <div
          key={number}
          className="flex items-start justify-between gap-5 border-b border-black/12 bg-black/[0.025] px-5 py-4 sm:px-6"
          aria-disabled="true"
        >
          <div className="flex min-w-0 items-start gap-4 opacity-55">
            <span className="mt-0.5 font-mono text-[11px] font-semibold text-black/48">{number}</span>
            <div>
              <p className="text-[14px] font-semibold text-[#111318]">{title}</p>
              <p className="mt-1 max-w-[68ch] text-[12.5px] leading-relaxed text-black/56">{summary}</p>
            </div>
          </div>
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-black/38" aria-label="Locked">
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
          <li key={question} className="grid gap-2 px-5 py-3.5 sm:grid-cols-[2rem_minmax(0,1fr)] sm:px-6">
            <span className="font-mono text-[10.5px] text-black/38">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-[13px] leading-relaxed text-[#111318]">{question}</span>
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
            (answer) => answer.question === question && answer.channel_label === channel,
          ) ?? null,
      ),
    }))
    .filter((row) => row.cells.some(Boolean));

  return (
    <ScanDisclosure
      number="02"
      title="What gets chosen"
      summary={
        scored.length > 0
          ? `${named}/${scored.length} observed answers chose your brand`
          : "Checking what shoppers are being shown"
      }
    >
      <AiVisibilityWorkspace result={result} />

      {rows.length > 0 || products.length > 0 ? (
        <div className="grid border-t border-black/18 bg-white lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div>
            {rivals.length > 0 ? (
              <div className="px-4 py-4 sm:px-5">
                <p className="flex items-center gap-2 text-[12px] font-semibold text-black/62">
                  <span className="h-[3px] w-4 bg-[#b8441d]" aria-hidden="true" />
                  Competitors named when you were not
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-10">
                  {rivals.map((rival) => (
                    <li key={rival.label} className="flex items-center gap-3">
                      <span className="w-[8.5rem] shrink-0 truncate text-[12.5px] text-black/70" title={rival.label}>
                        {rival.label}
                      </span>
                      <span className="h-1 flex-1 bg-black/8">
                        <span
                          className="block h-full bg-[#d95028]"
                          style={{ width: `${(rival.count / rivals[0].count) * 100}%` }}
                        />
                      </span>
                      <span className="w-8 shrink-0 text-right font-mono text-[12px] text-black/62">{rival.count}×</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {rows.length > 0 ? (
              <div className="border-t border-black/12">
                <p className="flex items-center gap-2 px-4 pt-4 text-[12px] font-semibold text-black/62 sm:px-5">
                  <span className="h-[3px] w-4 bg-[#b8441d]" aria-hidden="true" />
                  Question by question
                </p>
                <ul className="mt-3">
                  {rows.map((row) => {
                    const missedIn = row.cells.filter(
                      (cell): cell is Answer => Boolean(cell) && cell?.mentioned === false,
                    );
                    const instead = Array.from(
                      new Set(
                        missedIn.flatMap((cell) =>
                          (cell.competitors ?? []).map((raw) => rivalIdentity(raw).label),
                        ),
                      ),
                    )
                      .filter(Boolean)
                      .slice(0, 4);

                    return (
                      <li key={row.question} className="border-t border-black/12 px-4 py-3 sm:px-5">
                        <p className="text-[13px] font-medium leading-snug text-[#111318]">“{row.question}”</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                          {row.cells.map((cell, index) =>
                            cell ? (
                              <ChannelChip key={channels[index]} channel={channels[index]} answer={cell} />
                            ) : null,
                          )}
                          {instead.length ? (
                            <span className="text-[12px] leading-relaxed text-black/62">
                              <span className="font-semibold">Named instead </span>
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
  const urgent = findings.filter((finding) => finding.severity === "blocker" || finding.severity === "high");
  const grouped = Array.from(
    findings.reduce((map, finding) => {
      const area = finding.source === "page_audit" ? findingArea(finding.code) : "Product evidence";
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
        <div className="grid gap-px bg-black/14 sm:grid-cols-2 xl:grid-cols-3">
          {grouped.map(([area, areaFindings], areaIndex) => {
            const areaUrgent = areaFindings.filter(
              (finding) => finding.severity === "blocker" || finding.severity === "high",
            ).length;
            return (
              <section
                key={area}
                className={`bg-white p-5 sm:p-6 ${grouped.length % 3 === 2 && areaIndex === grouped.length - 1 ? "xl:col-span-2" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-black/46">{area}</p>
                    <p className="mt-1 text-[13px] font-semibold text-[#111318]">
                      {areaFindings.length} {areaFindings.length === 1 ? "issue" : "issues"}
                    </p>
                  </div>
                  {areaUrgent > 0 ? (
                    <span className="border border-black/14 bg-white px-2 py-0.5 text-[10.5px] font-semibold text-[#b8441d]">
                      {areaUrgent} high
                    </span>
                  ) : null}
                </div>
                <ul className="mt-4 divide-y divide-black/10 border-t border-black/10">
                  {areaFindings.map((finding, index) => (
                    <li key={`${finding.code}-${finding.product ?? index}`} className="py-3 last:pb-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {finding.severity ? (
                          <span className={`${SEVERITY_BADGE} ${SEVERITY_STYLES[finding.severity] ?? SEVERITY_STYLES.low}`}>
                            {finding.severity}
                          </span>
                        ) : null}
                        <span className="text-[12.5px] font-semibold leading-snug text-[#111318]">{finding.title}</span>
                      </div>
                      <p className="mt-1.5 text-[11.5px] leading-relaxed text-black/58">{finding.detail}</p>
                      {finding.product || finding.url ? (
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] text-black/46">
                          {finding.product ? <span className="truncate">{finding.product}</span> : null}
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
        <p className="bg-white px-5 py-4 text-[13px] text-black/58 sm:px-6">No audit issues were observed in this sample.</p>
      )}

      {audits.length > 0 ? (
        <div className="border-t border-black/18 bg-[#fafafa] px-5 py-4 sm:px-6">
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-black/42">Pages audited</p>
          <ul className="mt-2 divide-y divide-black/10 border-y border-black/10 bg-white">
            {audits.map((audit) => (
              <li key={audit.url} className="grid gap-2 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <span className="min-w-0 truncate text-[12.5px] font-medium text-[#111318]">{audit.title ?? audit.url}</span>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10.5px] text-black/48">{audit.checks_failed}/{audit.checks_evaluated} flagged</span>
                  {audit.report_id ? (
                    <a
                      href={`${APP_REPORT_URL}/${audit.report_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10.5px] font-semibold text-[#111318] underline decoration-black/24 underline-offset-4 hover:decoration-[#b8441d]"
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
  const inFlight =
    LIVE_STATUSES.has(result.status) ||
    result.steps.some((step) => step.state === "active");
  const scored = answers.filter((answer) => answer.mentioned !== null);
  const showProgress = inFlight || answers.length === 0;
  const [shareStatus, setShareStatus] = useState<"idle" | "shared" | "copied" | "failed">("idle");

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
        if (shareError instanceof DOMException && shareError.name === "AbortError") return;
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
            <BrandFavicon domain={result.domain} name={identity ?? result.brand ?? result.domain} />
            <p className="text-[22px] font-semibold leading-snug tracking-[-0.02em] text-[#172033]">
              {identity ?? result.brand ?? result.domain}
            </p>
          </div>
          <p className="mt-1 font-mono text-[11.5px] text-[#64748b]">
            {identityMeta ?? `${result.domain}${result.platform ? ` · ${result.platform}` : ""}`}
          </p>
        </div>
        {verificationGate ? (
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
        ) : (
          <span
            className={`inline-flex items-center gap-2 border border-black/18 bg-white px-3 py-1.5 text-[12px] font-semibold ${inFlight ? "text-[#111318]" : scored.length ? "text-[#111318]" : "text-black/56"}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${inFlight ? "bg-blue-500" : scored.length ? "bg-emerald-500" : "bg-[#94a3b8]"}`}
              aria-hidden="true"
            />
            {inFlight
              ? "Live answer check running"
              : scored.length
                ? "Live evidence complete"
                : "Scan complete"}
          </span>
        )}
      </div>

      {result.reject_reason ? (
        <p className="px-5 py-4 text-[14px] leading-relaxed text-[#b8441d] sm:px-6">{result.reject_reason}</p>
      ) : (
        <InitialScanSummary result={result} />
      )}

      {showProgress && verificationGate ? (
        <div className="border-b border-black/14 bg-[#fffaf7] px-4 py-5 sm:px-6 sm:py-6">
          <div className="border-l-2 border-[#b8441d] bg-white p-5 sm:p-6">{verificationGate}</div>
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

      {continueHref && scored.length > 0 && !inFlight && !result.reject_reason ? (
        <div className="grid gap-5 border-t border-black/18 bg-[#faf1eb] px-4 py-5 sm:px-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#b8441d]">Next · Decide</p>
            <p className="mt-1 text-[15px] font-semibold text-[#111318]">Choose the few changes worth making.</p>
            <p className="mt-1 max-w-[58ch] text-[13px] leading-relaxed text-black/64">
              Rank what matters, choose the changes worth making, and keep the evidence attached to every decision.
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

      {note ? <p className="border-t border-black/14 px-5 py-3 text-[12px] leading-relaxed text-black/62">{note}</p> : null}
    </div>
  );
}

// ── Sample loop showcase ────────────────────────────────────────────────────
// One store moving through the same operating loop used across the product:
// Observe → Understand → Decide → Act → Learn. Evidence and proposals stay
// distinct so a proposed change never reads as something that already shipped.

const LOOP_STAGES = [
  { key: "observe", label: "Observe", tag: "see the evidence" },
  { key: "understand", label: "Understand", tag: "find the cause" },
  { key: "decide", label: "Decide", tag: "choose the change" },
  { key: "act", label: "Act", tag: "publish with control" },
  { key: "learn", label: "Learn", tag: "measure again" },
] as const;

const SEVERITY_STYLES: Record<string, string> = {
  blocker: "bg-[#b3261e] text-white",
  high: "bg-[#b8441d] text-white",
  medium: "bg-[#e8b13a] text-[#111318]",
  low: "bg-black/12 text-black/70",
};

const SEVERITY_BADGE =
  "mt-0.5 shrink-0 px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em]";

function LoopPanelShell({
  eyebrow,
  tag,
  children,
}: {
  eyebrow: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/22 bg-white text-left">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/14 px-4 py-3 sm:px-5">
        <p className="text-[12px] font-semibold text-black/62">{eyebrow}</p>
        <span className="bg-[#111318] px-2 py-0.5 text-[12px] uppercase tracking-[0.06em] text-white">
          {tag}
        </span>
      </div>
      {children}
    </div>
  );
}

function LoopProductRow() {
  const product = SAMPLE_LOOP.product;
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-black/12 bg-[#fafafa]">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-contain mix-blend-multiply"
          />
        ) : null}
      </div>
      <div>
        <p className="text-[13px] font-semibold leading-snug text-[#111318]">
          {product.title}
        </p>
        <p className="mt-0.5 text-[12px] text-black/62">
          This store · <span className="font-mono">{product.price}</span>
        </p>
      </div>
    </div>
  );
}

function UnderstandPanel() {
  const d = SAMPLE_LOOP.diagnose;
  return (
    <LoopPanelShell
      eyebrow="Understand · why this product is being missed"
      tag="evidence"
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div className="border-b border-black/14 px-4 py-4 sm:px-5 lg:border-b-0 lg:border-r">
          <LoopProductRow />
          <div className="mt-5 border-t border-black/14 pt-4">
            <p className="text-[12px] font-semibold text-black/62">
              Product evidence check
            </p>
            <p className="mt-2 font-serif text-[clamp(2.6rem,3vw,3.4rem)] leading-[0.9] tracking-[-0.02em] text-[#b8441d]">
              {d.failedChecks}
              <span className="ml-2 font-mono text-[13px] tracking-normal text-black/62">
                of {d.totalChecks} checks need attention
              </span>
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-black/62">
              {d.source}. The evidence narrows the problem to the fields that matter first.
            </p>
          </div>
        </div>
        <ul className="px-4 py-2 sm:px-5">
          {d.findings.map((finding) => (
            <li
              key={finding.field}
              className="flex items-start gap-3 border-b border-black/10 py-3 last:border-b-0"
            >
              <span
                className={`${SEVERITY_BADGE} ${SEVERITY_STYLES[finding.severity]}`}
              >
                {finding.severity}
              </span>
              <div>
                <p className="font-mono text-[12px] font-semibold text-[#111318]">
                  {finding.field}
                </p>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-black/70">
                  {finding.issue}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-black/14 px-5 py-3 text-[12px] leading-relaxed text-black/62">
        Observe showed the miss. Understand connects it to the strongest page evidence before any change is chosen.
      </p>
    </LoopPanelShell>
  );
}

function DecidePanel() {
  const f = SAMPLE_LOOP.fix;
  return (
    <LoopPanelShell eyebrow="Decide · choose the smallest useful change" tag="proposed">
      <div className="px-4 py-4 sm:px-5">
        <LoopProductRow />
        <div className="mt-5 overflow-hidden border border-black/20">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#111318] px-3 py-2">
            <span className="font-mono text-[12px] text-white/80">
              proposed change · {f.field}
            </span>
            <span className="text-[12px] text-white/72">
              Product page template
            </span>
          </div>
          <div className="overflow-x-auto bg-[#fafafa] py-2">
            {f.diff.map((line) => (
              <div
                key={line.text}
                className={`flex items-start gap-2 px-3 py-0.5 font-mono text-[12px] leading-relaxed ${
                  line.kind === "del"
                    ? "bg-[#b3261e]/[0.07] text-[#8a1f18]"
                    : line.kind === "add"
                      ? "bg-[#1f7a4d]/[0.08] text-[#175c3b]"
                      : "text-black/62"
                }`}
              >
                <span className="w-3 shrink-0 select-none">
                  {line.kind === "del" ? "−" : line.kind === "add" ? "+" : " "}
                </span>
                <span className="whitespace-pre">{line.text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/14 bg-white px-3 py-2.5">
            <span className="text-[12px] font-semibold text-[#111318]">Selected first: {f.field}</span>
            <span className="border border-black/20 px-2 py-1 text-[11px] font-semibold text-black/58">decision only · not published</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[12px] font-semibold text-black/62">
            Also queued from this audit
          </p>
          <ul className="mt-2 divide-y divide-black/10 border border-black/14">
            {f.alsoQueued.map((item) => (
              <li
                key={item.field}
                className="flex items-start gap-3 px-3 py-2.5"
              >
                <span
                  className={`${SEVERITY_BADGE} ${SEVERITY_STYLES[item.severity]}`}
                >
                  {item.severity}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[12px] font-semibold text-[#111318]">
                    {item.field}
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-black/70">
                    {item.change}
                  </p>
                </div>
                <span className="ml-auto mt-0.5 shrink-0 border border-black/20 px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-black/62">
                  proposed
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-black/14 px-5 py-3 text-[12px] leading-relaxed text-black/62">
        Decide ranks the evidence into a small, reviewable change. Nothing has shipped yet.
      </p>
    </LoopPanelShell>
  );
}

function ActPanel() {
  const f = SAMPLE_LOOP.fix;
  const chosen = f.diff.find((line) => line.kind === "add")?.text ?? f.field;
  return (
    <LoopPanelShell eyebrow="Act · put the decision into the store" tag="controlled">
      <div className="px-4 py-4 sm:px-5">
        <LoopProductRow />
        <div className="mt-5 border border-black/18 bg-[#fffaf7] p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/42">Selected change</p>
              <p className="mt-2 font-mono text-[12px] font-semibold text-[#111318]">{f.field}</p>
            </div>
            <span className="border border-[#1f7a4d]/30 bg-white px-2 py-1 text-[11px] font-semibold text-[#1f7a4d]">ready for approval</span>
          </div>
          <div className="mt-4 border-l-2 border-[#1f7a4d] bg-white px-3 py-3 font-mono text-[12px] leading-relaxed text-[#175c3b]">
            + {chosen}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span aria-hidden="true" className="inline-flex items-center bg-[#111318] px-3 py-2 text-[12px] font-semibold text-white">Approve &amp; publish</span>
            <span aria-hidden="true" className="inline-flex items-center border border-black/30 bg-white px-3 py-2 text-[12px] font-semibold text-[#111318]">Keep as draft</span>
            <span className="ml-auto text-[11.5px] text-black/52">nothing ships without approval</span>
          </div>
        </div>
        <div className="mt-4 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-3">
          <div className="bg-white px-3 py-3"><p className="text-[10px] text-black/42">Scope</p><p className="mt-1 text-[12px] font-semibold text-[#111318]">1 field</p></div>
          <div className="bg-white px-3 py-3"><p className="text-[10px] text-black/42">Control</p><p className="mt-1 text-[12px] font-semibold text-[#111318]">Approval required</p></div>
          <div className="bg-white px-3 py-3"><p className="text-[10px] text-black/42">After publish</p><p className="mt-1 text-[12px] font-semibold text-[#111318]">Measure again</p></div>
        </div>
      </div>
      <p className="border-t border-black/14 px-5 py-3 text-[12px] leading-relaxed text-black/62">
        Act is execution with control: approve the selected change, publish it, and keep a clear path to revert.
      </p>
    </LoopPanelShell>
  );
}

function LearnPanel() {
  const v = SAMPLE_LOOP.verify;
  return (
    <LoopPanelShell
      eyebrow="Learn · measure what changed after the action"
      tag="after publish"
    >
      <div className="px-4 py-4 sm:px-5">
        <LoopProductRow />
        <div className="mt-4 border border-black/14 bg-white">
          <div className="flex items-center gap-2 border-b border-black/10 px-4 py-2.5">
            <ChannelIcon channel="ChatGPT" className="h-4 w-4" />
            <span className="text-[12px] font-semibold text-[#111318]">
              ChatGPT
            </span>
            <span className="ml-auto text-[12px] text-black/62">
              Same question · after publish
            </span>
          </div>
          <div className="space-y-4 px-4 py-4">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[#f2f2f2] px-4 py-2.5 text-[13.5px] leading-relaxed text-[#111318]">
                {v.question}
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/12 bg-white">
                <ChannelIcon channel="ChatGPT" className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] leading-relaxed text-[#2a2c33]">
                  {v.answerIntro}
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {v.answerPoints.map((point) => (
                    <li
                      key={point.label}
                      className="flex gap-2 text-[13.5px] leading-relaxed text-[#2a2c33]"
                    >
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-black/40" />
                      <span>
                        <strong className="font-semibold">{point.label}</strong>{" "}
                        : {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[#2a2c33]">
                  {v.answerBridge}
                </p>
                <ol className="mt-3 space-y-2">
                  {v.answerProducts.map((product, index) => (
                    <li
                      key={product.title}
                      className={`flex items-center gap-3 border p-2.5 ${
                        product.ours
                          ? "border-[#1f7a4d]/40 bg-[#1f7a4d]/[0.05]"
                          : "border-black/10 bg-white"
                      }`}
                    >
                      <span className="w-4 shrink-0 font-mono text-[12px] text-black/62">
                        {index + 1}.
                      </span>
                      {product.image_url ? (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-black/10 bg-[#fafafa]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image_url}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-contain mix-blend-multiply"
                          />
                        </span>
                      ) : null}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-[#111318]">
                          {product.title}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-black/62">
                          {product.merchant} ·{" "}
                          <span className="font-mono">{product.price}</span>
                        </span>
                      </span>
                      {product.ours ? (
                        <span className="shrink-0 bg-[#1f7a4d] px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-white">
                          yours
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[#2a2c33]">
                  {v.answerOutro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="border-t border-black/14 px-5 py-3 text-[12px] leading-relaxed text-black/62">
        {v.note}
      </p>
    </LoopPanelShell>
  );
}

function loopTabId(index: number) {
  return `loop-tab-${LOOP_STAGES[index].key}`;
}

function loopPanelId(index: number) {
  return `loop-panel-${LOOP_STAGES[index].key}`;
}

function LoopStage({ index }: { index: number }) {
  if (index === 0)
    return (
      <ResultCard
        result={SAMPLE_SCAN}
        eyebrow="Example scan, real result"
        identity="A dancewear store"
        identityMeta="Shopify · scanned with this form"
        note="The unedited output of one real scan: the store's own buying questions, both assistants, and who got named instead. Enter your domain to get yours."
      />
    );
  if (index === 1) return <UnderstandPanel />;
  if (index === 2) return <DecidePanel />;
  if (index === 3) return <ActPanel />;
  return <LearnPanel />;
}

export function SampleLoopShowcase() {
  const [stage, setStage] = useState(0);
  // Pinning is a desktop-only affordance. Below md the section is ordinary
  // document flow: no tall wrapper, no sticky card, no scroll-driven staging,
  // and all five stages stack so every one is reachable by plain scrolling.
  const [pinned, setPinned] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setPinned(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Scroll-driven (desktop only): the card pins while the tall wrapper scrolls
  // past, and scroll progress through the wrapper selects the scan stage before
  // releasing the section.
  useEffect(() => {
    if (!pinned) {
      setStage(0);
      return;
    }
    const onScroll = () => {
      const node = wrapperRef.current;
      if (!node) return;
      const scrollable = node.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(
        1,
        Math.max(0, -node.getBoundingClientRect().top / scrollable),
      );
      setStage(
        Math.min(
          LOOP_STAGES.length - 1,
          Math.floor(progress * LOOP_STAGES.length),
        ),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  // Selecting a stage has to move the scroll position into that stage's slice
  // of the wrapper, otherwise the next scroll event maps the old position
  // straight back over the choice. It is a no-op when the position is already
  // inside the slice, never runs below md (nothing is pinned there), and jumps
  // instantly when the visitor asked for reduced motion.
  const select = (index: number) => {
    setStage(index);
    const node = wrapperRef.current;
    if (!pinned || !node) return;
    const scrollable = node.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const slice = scrollable / LOOP_STAGES.length;
    const start = node.getBoundingClientRect().top + window.scrollY;
    const sliceStart = start + index * slice;
    if (window.scrollY >= sliceStart && window.scrollY < sliceStart + slice)
      return;
    window.scrollTo({
      top: sliceStart + slice / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = LOOP_STAGES.length - 1;
    const next =
      event.key === "ArrowRight"
        ? stage === last
          ? 0
          : stage + 1
        : event.key === "ArrowLeft"
          ? stage === 0
            ? last
            : stage - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : -1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div ref={wrapperRef} className="h-auto md:h-[300vh]">
      <div className="static md:sticky md:top-20">
        <div
          role="tablist"
          aria-label="Loop stages"
          tabIndex={-1}
          onKeyDown={onTabKeyDown}
          className="mb-4 hidden gap-px border border-black/18 bg-black/18 md:grid md:grid-cols-5"
        >
          {LOOP_STAGES.map((entry, index) => {
            const active = index === stage;
            return (
              <button
                key={entry.key}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={loopTabId(index)}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={loopPanelId(index)}
                tabIndex={active ? 0 : -1}
                onClick={() => select(index)}
                className={`px-3 py-2.5 text-left transition-colors ${
                  active
                    ? "bg-[#111318] text-white"
                    : "bg-white hover:bg-black/5"
                }`}
              >
                <span
                  className={`text-[12px] ${active ? "text-white/72" : "text-black/62"}`}
                >
                  0{index + 1} · {entry.tag}
                </span>
                <span
                  className={`block text-[13px] font-semibold ${active ? "text-white" : "text-[#111318]"}`}
                >
                  {entry.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-12 md:space-y-0">
          {LOOP_STAGES.map((entry, index) => (
            <section
              key={entry.key}
              id={loopPanelId(index)}
              role="tabpanel"
              aria-labelledby={loopTabId(index)}
              className={index === stage ? "md:block" : "md:hidden"}
            >
              <h3 className="mb-3 text-[15px] font-semibold text-[#111318] md:hidden">
                <span className="mr-2 font-mono text-[12px] font-semibold text-black/62">
                  0{index + 1}
                </span>
                {entry.label}: {entry.tag}
              </h3>
              <LoopStage index={index} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnswerCheck({
  placement = "homepage_hero",
}: {
  placement?: string;
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
      setError("That verification link is missing its token. Start or continue your scan below.");
    } else if (scanError === "link_used") {
      setError("That verification link is invalid or has already been used. Start the scan again if you need a new link.");
    } else if (scanError === "unavailable") {
      setError("We could not verify that link right now. Try the link from your email again.");
    }

    const fromEmail = params.get("domain");
    if (!fromEmail) return;
    setDomain(fromEmail);
    void load(fromEmail).then((payload) => {
      if (payload) setResult(payload);
    });
  }, [load]);
  // Poll while either the free PDP sample or the verified live probe is running.
  useEffect(() => {
    const pageAuditsRunning = result?.page_audits_status === "queued" || result?.page_audits_status === "running";
    if (!result || (!LIVE_STATUSES.has(result.status) && !pageAuditsRunning)) return;
    if (pollCount.current >= MAX_POLLS) return;

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
          payload?.detail || payload?.error || "We could not send the verification email.",
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
      setVerificationError("We could not send the verification email right now.");
    } finally {
      setVerificationSubmitting(false);
    }
  };

  const inputClass =
    "h-12 w-full border border-black/22 bg-white px-4 text-left text-[15px] text-[#111318] placeholder:text-black/40 focus:border-[#b8441d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8441d]";

  return (
    <div>
      <form
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
      </form>

      {result ? (
        <div className="mx-auto mt-14 max-w-[72rem]">
          <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-black/48">
            <span className="h-px w-8 bg-black/18" aria-hidden="true" />
            Observe · your store
            <span className="h-px w-8 bg-black/18" aria-hidden="true" />
          </div>
          <ResultCard
            result={result}
            continueHref={`${APP_REGISTER_URL}?scan_domain=${encodeURIComponent(result.domain)}`}
            verificationGate={
              result.status === "awaiting_verification" ? (
                verificationSent ? (
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 border border-black/14 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#111318]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                        Verification email sent
                      </span>
                    </div>
                    <p className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-[#172033]">
                      One click to continue to Understand
                    </p>
                    <p className="mt-1.5 max-w-[66ch] text-[13px] leading-relaxed text-[#64748b]">
                      Check {email.trim()} and continue. We’ll connect what shoppers are being shown with the evidence you already observed, so you can see what is driving the gaps.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onVerificationSubmit} noValidate>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 border border-black/14 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#b8441d]">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                        Next · Understand
                      </span>
                    </div>
                    <p className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-[#172033]">
                      Turn what you observed into a clear next move.
                    </p>
                    <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-[#64748b]">
                      See why products are being missed, what shoppers are shown instead, and which gaps are worth acting on first.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium text-[#64748b]">
                      <span className="border border-black/14 bg-white px-2.5 py-1">3 shopper questions</span>
                      <span className="border border-black/14 bg-white px-2.5 py-1">ChatGPT</span>
                      <span className="border border-black/14 bg-white px-2.5 py-1">Google AI Mode</span>
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
                        {verificationSubmitting ? "Sending…" : "Continue to Understand"}
                      </button>
                    </div>
                    {verificationError ? (
                      <p role="alert" className="mt-3 text-[13px] leading-relaxed text-[#b3261e]">
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
