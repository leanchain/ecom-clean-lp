"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { ArrowRight, Check, Loader2, X } from "lucide-react";

import useAnalytics from "@/hooks/useAnalytics";

type StepState = "pending" | "active" | "done" | "failed" | "skipped";

type Step = {
  key: string;
  label: string;
  state: StepState;
  detail: string | null;
};

type Finding = {
  code: string;
  title: string;
  detail: string;
  product: string | null;
};

type Answer = {
  question: string | null;
  channel_label: string | null;
  mentioned: boolean | null;
  competitors: string[];
  error: string | null;
};

export type AnswerCheckResult = {
  domain: string;
  status: string;
  brand: string | null;
  platform: string | null;
  reject_reason: string | null;
  steps: Step[];
  findings: Finding[];
  questions: string[];
  answers: Answer[];
  products_seen: number;
};

const POLL_MS = 6000;
const MAX_POLLS = 60; // ~6 minutes, then stop asking

const LIVE_STATUSES = new Set(["running", "queued", "validating"]);

function StepRow({ step }: { step: Step }) {
  const icon =
    step.state === "done" ? (
      <Check className="h-4 w-4 text-[#1f7a4d]" aria-hidden="true" />
    ) : step.state === "failed" ? (
      <X className="h-4 w-4 text-[#d95028]" aria-hidden="true" />
    ) : step.state === "active" ? (
      <Loader2
        className="h-4 w-4 animate-spin text-[#3154ff]"
        aria-hidden="true"
      />
    ) : (
      <span
        className="block h-1.5 w-1.5 translate-x-1 translate-y-1 rounded-full bg-black/25"
        aria-hidden="true"
      />
    );

  return (
    <div className="flex items-start gap-3 border-b border-black/12 px-5 py-3 last:border-b-0">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="flex-1 text-left text-[14px] leading-snug text-black/72">
        {step.label}
        {step.detail ? (
          <span className="mt-1 block text-[12px] text-black/45">
            {step.detail}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function ResultCard({ result }: { result: AnswerCheckResult }) {
  const missed = result.answers.filter((a) => a.mentioned === false);
  const named = result.answers.filter((a) => a.mentioned === true);
  const competitors = Array.from(
    new Set(result.answers.flatMap((a) => a.competitors ?? [])),
  ).slice(0, 4);

  return (
    <div className="border border-black/22 bg-[#f7f5ee] text-left shadow-[0_24px_70px_rgba(17,19,24,0.12)]">
      <div className="flex items-start justify-between gap-4 border-b border-black/18 px-5 py-4">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Your scan
          </p>
          <p className="mt-2 text-[15px] font-semibold leading-snug text-[#111318]">
            {result.brand ?? result.domain}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-black/42">
          {result.domain}
        </span>
      </div>

      <div className="border-b border-black/18">
        {result.steps.map((step) => (
          <StepRow key={step.key} step={step} />
        ))}
      </div>

      {result.reject_reason ? (
        <p className="px-5 py-4 text-[14px] leading-relaxed text-[#d95028]">
          {result.reject_reason}
        </p>
      ) : null}

      {result.findings.length > 0 ? (
        <div className="border-b border-black/18 px-5 py-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d95028]">
            What a channel sees today
          </p>
          <ul className="mt-3 space-y-3">
            {result.findings.slice(0, 4).map((finding, index) => (
              <li
                key={`${finding.code}-${index}`}
                className="text-[13px] leading-relaxed"
              >
                <span className="font-semibold text-black/78">
                  {finding.title}
                </span>
                <span className="mt-1 block text-black/56">
                  {finding.detail}
                </span>
                {finding.product ? (
                  <span className="mt-1 block font-mono text-[11px] text-black/40">
                    {finding.product}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {result.answers.length > 0 ? (
        <>
          <dl className="grid sm:grid-cols-2">
            {[
              ["Questions asked", String(result.questions.length)],
              [
                "Answers that named you",
                `${named.length} of ${result.answers.length}`,
              ],
              ["Answers that did not", String(missed.length)],
              [
                "Named instead",
                competitors.length ? competitors.join(", ") : "—",
              ],
            ].map(([term, value], index) => (
              <div
                key={term}
                className={`border-b border-black/14 px-5 py-4 ${index % 2 === 0 ? "sm:border-r" : ""}`}
              >
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-black/42">
                  {term}
                </dt>
                <dd className="mt-2 text-[13px] font-semibold leading-snug text-black/70">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {missed[0]?.question ? (
            <div className="px-5 py-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
                Example question you lost
              </p>
              <p className="mt-2 text-[14px] leading-snug text-[#111318]">
                “{missed[0].question}”
                <span className="mt-1 block text-[12px] text-black/45">
                  Asked on {missed[0].channel_label}
                </span>
              </p>
            </div>
          ) : null}
        </>
      ) : null}

      {result.status === "awaiting_verification" ? (
        <p className="border-t border-black/14 px-5 py-3 text-[12px] leading-relaxed text-black/52">
          Final check: we emailed you a link. Click it and we ask the assistants
          your customers&apos; questions.
        </p>
      ) : null}
    </div>
  );
}

export default function AnswerCheck({
  demo,
  placement = "homepage_hero",
}: {
  demo: React.ReactNode;
  placement?: string;
}) {
  const { trackEvent } = useAnalytics();
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [result, setResult] = useState<AnswerCheckResult | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const pollCount = useRef(0);

  const load = useCallback(async (target: string) => {
    const response = await fetch(
      `/api/answer-check?domain=${encodeURIComponent(target)}`,
    );
    if (!response.ok) return null;
    return (await response.json()) as AnswerCheckResult;
  }, []);

  // A verification click lands back here with ?domain= — show that scan.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromEmail = params.get("domain");
    if (!fromEmail) return;
    void load(fromEmail).then((payload) => {
      if (payload) setResult(payload);
    });
  }, [load]);

  // Keep polling while the probe is still running.
  useEffect(() => {
    if (!result || !LIVE_STATUSES.has(result.status)) return;
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
          email: email.trim() || null,
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

  const inputClass =
    "h-12 w-full border border-black/22 bg-white px-4 text-left text-[15px] text-[#151515] outline-none placeholder:text-black/38 focus:border-[#3154ff]";

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="mx-auto w-full max-w-3xl">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto]">
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
          <div>
            <label className="sr-only" htmlFor="answer-check-email">
              Work email
            </label>
            <input
              id="answer-check-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@yourbrand.com"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#111318] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#3154ff] disabled:opacity-70"
          >
            {submitting ? "Reading your store…" : "Scan my store free"}
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
          className={`mt-3 text-[13px] leading-relaxed ${error ? "text-[#b3261e]" : "text-black/50"}`}
        >
          {error ||
            "We read your live storefront first. The assistant questions run after you confirm by email."}
        </p>
      </form>

      <div className="mx-auto mt-16 max-w-[72rem]">
        <p className="mb-4 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
          {result
            ? "Your storefront, read live"
            : "One question, followed from miss to fix"}
        </p>
        {result ? <ResultCard result={result} /> : demo}
      </div>
    </div>
  );
}
