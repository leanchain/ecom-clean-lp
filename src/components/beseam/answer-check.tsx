"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { ArrowRight, Check, Loader2, X } from "lucide-react";

import type {
  Answer,
  AnswerCheckResult,
  Finding,
  ShownProduct,
  Step,
} from "@/components/beseam/answer-check-types";
import { ChannelIcon } from "@/components/beseam/channel-icon";
import { SAMPLE_LOOP } from "@/data/sample-loop";
import { SAMPLE_SCAN } from "@/data/sample-scan";
import useAnalytics from "@/hooks/useAnalytics";

export type { AnswerCheckResult };

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
        className="h-4 w-4 animate-spin text-black/62"
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
          <span className="mt-1 block text-[12px] text-black/62">
            {step.detail}
          </span>
        ) : null}
      </span>
    </div>
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

const OBSERVATION_METHOD_LABEL: Record<NonNullable<Answer["observation_method"]>, string> = {
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
        <span aria-hidden="true">—</span>
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
        {product.link_live === false ? (
          <span className="absolute right-0 top-0 bg-[#b8441d] px-1.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-white">
            dead link
          </span>
        ) : null}
      </div>
      <div className="px-2.5 py-2">
        <p className="line-clamp-2 text-[12px] font-medium leading-snug text-[#111318]">
          {product.title}
        </p>
        <p className="mt-1 flex items-baseline justify-between gap-2 text-[12px] text-black/62">
          <span className="truncate">{product.merchant ?? "—"}</span>
          {product.price ? (
            <span className="shrink-0 font-mono text-black/65">
              {product.price}
            </span>
          ) : null}
        </p>
      </div>
    </li>
  );
}

// The deterministic half of the report: no LLM, no email gate. It sits under the
// question list because it explains what could keep these pages out of an
// answer — deliberately not attributed to any single question, because a page
// check cannot prove which answer it cost.
function PageChecks({ result }: { result: AnswerCheckResult }) {
  const audits = result.page_audits ?? [];
  const pageFindings = (result.findings ?? []).filter(
    (finding: Finding) => finding.source === "page_audit",
  );
  if (!audits.length || !pageFindings.length) return null;

  const evaluated = audits.reduce((sum, a) => sum + a.checks_evaluated, 0);
  const failed = audits.reduce((sum, a) => sum + a.checks_failed, 0);
  if (!evaluated) return null;
  // Coverage is printed beside the count: an unmeasured check is never a pass.
  const coverage =
    audits.reduce((sum, a) => sum + a.coverage, 0) / audits.length;

  return (
    <div className="border-t border-black/12 px-4 py-4 sm:px-5">
      <p className="flex items-center gap-2 text-[12px] font-semibold text-black/62">
        <span className="h-[3px] w-4 bg-[#b8441d]" aria-hidden="true" />
        What could keep these pages out of an answer
      </p>
      <p className="mt-2 font-mono text-[12px] text-black/62">
        {failed} of {evaluated} page checks failed across {audits.length}{" "}
        {audits.length === 1 ? "page" : "pages"} · {Math.round(coverage * 100)}%
        of checks could be measured
      </p>
      <ul className="mt-3 grid gap-2">
        {pageFindings.slice(0, 3).map((finding) => (
          <li key={finding.code} className="flex items-start gap-2">
            <span
              className={`${SEVERITY_BADGE} ${SEVERITY_STYLES[finding.severity ?? "low"] ?? SEVERITY_STYLES.low}`}
            >
              {finding.severity ?? "low"}
            </span>
            <span className="text-[12.5px] leading-relaxed text-black/70">
              <span className="font-semibold text-[#111318]">
                {finding.title}
              </span>{" "}
              — {finding.detail}
            </span>
          </li>
        ))}
      </ul>
      {pageFindings.length > 3 ? (
        <p className="mt-3 text-[12px] text-black/62">
          {pageFindings.length - 3} more page findings are in the full report.
        </p>
      ) : null}
    </div>
  );
}

export function ResultCard({
  result,
  eyebrow = "Your scan",
  identity,
  identityMeta,
  note,
}: {
  result: AnswerCheckResult;
  eyebrow?: string;
  identity?: string;
  identityMeta?: string;
  note?: string;
}) {
  const answers = result.answers;
  const inFlight =
    LIVE_STATUSES.has(result.status) ||
    result.steps.some((step) => step.state === "active");
  const scored = answers.filter((answer) => answer.mentioned !== null);
  const named = scored.filter((answer) => answer.mentioned === true).length;
  const score = scored.length ? Math.round((named / scored.length) * 100) : 0;
  const band = scoreBand(score);
  const channels = Array.from(
    new Set(
      answers
        .map((answer) => answer.channel_label)
        .filter((label): label is string => Boolean(label)),
    ),
  );
  const allRivals = tallyRivals(answers);
  const rivals = allRivals.slice(0, RIVAL_LIMIT);
  const engineScores = channels
    .map((channel) => {
      const channelAnswers = answers.filter(
        (answer) =>
          answer.channel_label === channel && answer.mentioned !== null,
      );
      const namedCount = channelAnswers.filter(
        (answer) => answer.mentioned === true,
      ).length;
      return {
        channel,
        named: namedCount,
        total: channelAnswers.length,
        pct: channelAnswers.length
          ? Math.round((namedCount / channelAnswers.length) * 100)
          : 0,
      };
    })
    .filter((engine) => engine.total > 0);
  const products = shownProducts(answers);
  const rows = result.questions
    .map((question) => ({
      question,
      cells: channels.map(
        (channel) =>
          answers.find(
            (answer) =>
              answer.question === question && answer.channel_label === channel,
          ) ?? null,
      ),
    }))
    .filter((row) => row.cells.some(Boolean));

  return (
    <div className="border border-black/22 bg-white text-left">
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 pb-3 pt-3.5 sm:px-5">
        <div>
          <p className="text-[12px] font-semibold text-black/62">{eyebrow}</p>
          <p className="mt-1.5 text-[14px] font-semibold leading-snug text-[#111318]">
            {identity ?? result.brand ?? result.domain}
          </p>
          <p className="mt-0.5 font-mono text-[12px] text-black/62">
            {identityMeta ??
              `${result.domain}${result.platform ? ` · ${result.platform}` : ""}`}
          </p>
        </div>
        {scored.length > 0 ? (
          <div className="text-right">
            <p className="text-[12px] font-semibold text-black/62">
              Questions where you appeared
            </p>
            <p className="mt-1 flex items-baseline justify-end gap-1.5">
              <span
                className={`text-[30px] font-semibold leading-none tracking-[-0.02em] ${band.text}`}
              >
                {named}
              </span>
              <span className="text-[12px] text-black/62">
                / {scored.length}
              </span>
            </p>
          </div>
        ) : null}
      </div>

      {scored.length > 0 ? (
        <div className="h-[3px] w-full bg-black/8">
          <div
            className={`h-full ${band.fill}`}
            style={{ width: `${Math.max(score, 1.5)}%` }}
          />
        </div>
      ) : null}
      <div className="border-b border-black/18" />

      {/* The live read stays visible while it is still working. */}
      {inFlight || answers.length === 0 ? (
        <div className="border-b border-black/18">
          {result.steps.map((step) => (
            <StepRow key={step.key} step={step} />
          ))}
        </div>
      ) : null}

      {result.reject_reason ? (
        <p className="px-5 py-4 text-[14px] leading-relaxed text-[#b8441d]">
          {result.reject_reason}
        </p>
      ) : null}

      {result.findings.length > 0 ? (
        <div className="border-b border-black/18 px-4 py-4 sm:px-5">
          <p className="text-[12px] font-semibold text-[#b8441d]">
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
                <span className="mt-1 block text-black/64">
                  {finding.detail}
                </span>
                {finding.product ? (
                  <span className="mt-1 block text-[12px] text-black/62">
                    {finding.product}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {scored.length > 0 ? (
        <dl className="grid grid-cols-2 border-b border-black/18 sm:grid-cols-4">
          {[
            ["Named you", `${named} of ${scored.length} answers`],
            ["Questions asked", String(result.questions.length)],
            ["Assistants", channels.join(", ") || "—"],
            ["Rivals named instead", String(allRivals.length || 0)],
          ].map(([term, value], index) => (
            <div
              key={term}
              className={`border-black/12 px-4 py-3 sm:px-5 ${index < 2 ? "border-b sm:border-b-0" : ""} ${index % 2 === 0 ? "border-r" : ""} sm:border-r sm:last:border-r-0`}
            >
              <dt className="text-[12px] font-semibold text-black/62">
                {term}
              </dt>
              <dd className="mt-1 text-[13px] font-semibold leading-snug text-black/76">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {rows.length > 0 || products.length > 0 ? (
        <div className="grid border-b border-black/18 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <div>
            {engineScores.length > 0 ? (
              <div className="px-4 py-4 sm:px-5">
                <p className="flex items-center gap-2 text-[12px] font-semibold text-black/62">
                  <span
                    className="h-[3px] w-4 bg-[#b8441d]"
                    aria-hidden="true"
                  />
                  Named you, by assistant
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-10">
                  {engineScores.map((engine) => (
                    <li
                      key={engine.channel}
                      className="flex items-center gap-3"
                    >
                      <span className="flex w-[8.5rem] shrink-0 items-center gap-1.5 truncate text-[12.5px] text-black/70">
                        <ChannelIcon
                          channel={
                            CHANNEL_BRAND_KEYS[engine.channel.toLowerCase()] ??
                            engine.channel
                          }
                          className="h-3 w-3 shrink-0 opacity-70"
                        />
                        <span className="truncate" title={engine.channel}>
                          {engine.channel}
                        </span>
                      </span>
                      <span className="h-1 flex-1 bg-black/8">
                        <span
                          className={`block h-full ${scoreBand(engine.pct).fill}`}
                          style={{ width: `${Math.max(engine.pct, 1.5)}%` }}
                        />
                      </span>
                      <span className="w-14 shrink-0 text-right font-mono text-[12px] text-black/62">
                        {engine.named}/{engine.total}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {rivals.length > 0 ? (
              <div
                className={`px-4 py-4 sm:px-5 ${engineScores.length > 0 ? "border-t border-black/12" : ""}`}
              >
                <p className="flex items-center gap-2 text-[12px] font-semibold text-black/62">
                  <span
                    className="h-[3px] w-4 bg-[#b8441d]"
                    aria-hidden="true"
                  />
                  Who takes the answers you lose
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

            <PageChecks result={result} />
          </div>

          {products.length > 0 ? (
            <aside className="flex flex-col border-t border-black/18 px-4 py-4 sm:px-5 lg:min-h-0 lg:border-l lg:border-t-0">
              <p className="flex items-center gap-2 text-[12px] font-semibold text-black/62">
                <span className="h-[3px] w-4 bg-[#b8441d]" aria-hidden="true" />
                Products the assistants put in front of the shopper
              </p>
              {/* Desktop: the shelf is an absolute overlay so it never sets the
                  row height — it fills whatever the questions column produces
                  and scrolls past that. Mobile keeps a fixed scroll cap. */}
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

      {result.status === "awaiting_verification" ? (
        <p className="border-t border-black/14 px-5 py-3 text-[12px] leading-relaxed text-black/62">
          Final check: we emailed you a link. Click it and we ask the assistants
          your customers&apos; questions.
        </p>
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
// The demo card cycles through the four loop stages for the same store:
// Find (the real scan), Diagnose (a real PDP audit of its product page),
// Fix (the audit's top recommendation, still proposed) and Verify (what runs
// after a publish). Auto-advances until the visitor takes control.

const LOOP_STAGES = [
  { key: "find", label: "Check", tag: "real scan" },
  { key: "diagnose", label: "Diagnose", tag: "real audit" },
  { key: "fix", label: "Fix", tag: "proposed" },
  { key: "verify", label: "Check again", tag: "after publish" },
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

function DiagnosePanel() {
  const d = SAMPLE_LOOP.diagnose;
  return (
    <LoopPanelShell
      eyebrow="Diagnose — the field behind the miss"
      tag="real audit"
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
              {d.source}. These findings are evidence to investigate, not a
              hidden-model ranking score.
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
        The unedited output of one real audit of this product&apos;s live page —
        the same engine that runs inside the loop.
      </p>
    </LoopPanelShell>
  );
}

function FixPanel() {
  const f = SAMPLE_LOOP.fix;
  return (
    <LoopPanelShell eyebrow="Fix — one field, publishable" tag="proposed">
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
          <div className="flex flex-wrap items-center gap-2 border-t border-black/14 bg-white px-3 py-2.5">
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 bg-[#111318] px-3 py-1.5 text-[12px] font-semibold text-white"
            >
              Approve &amp; publish
            </span>
            <span
              aria-hidden="true"
              className="inline-flex items-center border border-black/40 px-3 py-1.5 text-[12px] font-semibold text-[#111318]"
            >
              Revert
            </span>
            <span className="ml-auto text-[12px] text-black/62">
              awaiting approval · nothing ships without it
            </span>
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
        {f.note}
      </p>
    </LoopPanelShell>
  );
}

function VerifyPanel() {
  const v = SAMPLE_LOOP.verify;
  return (
    <LoopPanelShell
      eyebrow="Verify — the answer is the proof"
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
              After the fix publishes
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
                        — {point.text}
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
  if (index === 1) return <DiagnosePanel />;
  if (index === 2) return <FixPanel />;
  return <VerifyPanel />;
}

function SampleLoopShowcase() {
  const [stage, setStage] = useState(0);
  // Pinning is a desktop-only affordance. Below md the section is ordinary
  // document flow: no tall wrapper, no sticky card, no scroll-driven staging,
  // and all four panels stacked so every one of them is reachable by plain
  // scrolling. `pinned` mirrors the same 768px breakpoint the classes use.
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
  // past, and the scroll progress through the wrapper selects the stage —
  // scrolling past the section walks Find → Diagnose → Fix → Verify, then
  // releases.
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
    <div ref={wrapperRef} className="h-auto md:h-[240vh]">
      <div className="static md:sticky md:top-20">
        <div
          role="tablist"
          aria-label="Loop stages"
          tabIndex={-1}
          onKeyDown={onTabKeyDown}
          className="mb-4 hidden gap-px border border-black/18 bg-black/18 md:grid md:grid-cols-4"
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
                {entry.label} — {entry.tag}
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

  const inputClass =
    "h-12 w-full border border-black/40 bg-white px-4 text-left text-[15px] text-[#151515] placeholder:text-black/58 focus:border-[#b8441d] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#b8441d]";

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="mx-auto w-full max-w-3xl">
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
          className={`mt-3 text-[13px] leading-relaxed ${error ? "text-[#b3261e]" : "text-black/62"}`}
        >
          {error}
        </p>
      </form>

      <div className="mx-auto mt-16 max-w-[72rem]">
        <p className="mb-4 text-center text-[12px] font-semibold text-black/62">
          {result
            ? "Your storefront, read live"
            : "A real store, scanned with this form"}
        </p>
        {result ? <ResultCard result={result} /> : <SampleLoopShowcase />}
      </div>
    </div>
  );
}
