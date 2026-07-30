"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { ArrowRight, Check, Loader2, X } from "lucide-react";

import type {
  Answer,
  AnswerCheckResult,
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
        className="h-4 w-4 animate-spin text-black/55"
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
          <span className="mt-1 block text-[12px] text-black/60">
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
// for things you can click.
function scoreBand(score: number) {
  if (score >= 70)
    return { label: "Strong", text: "text-[#1a6b43]", fill: "bg-[#1f7a4d]" };
  if (score >= 40)
    return { label: "Mixed", text: "text-[#111318]", fill: "bg-[#111318]" };
  if (score >= 15)
    return { label: "Weak", text: "text-[#c04524]", fill: "bg-[#d95028]" };
  return {
    label: "Barely visible",
    text: "text-[#c04524]",
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

function ChannelChip({ channel, answer }: { channel: string; answer: Answer }) {
  const named = answer.mentioned === true;
  const unknown = answer.mentioned === null || Boolean(answer.error);
  const tone = unknown
    ? "border-black/14 bg-black/[0.03] text-black/60"
    : named
      ? "border-[#1f7a4d]/40 bg-[#1f7a4d]/10 text-[#1a6b43]"
      : "border-[#d95028]/35 bg-[#d95028]/10 text-[#c04524]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${tone}`}
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
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#f4f1e9]">
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
          <span className="px-2 text-center font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-black/45">
            {product.merchant ?? "no image"}
          </span>
        )}
        {product.ours ? (
          <span className="absolute left-0 top-0 bg-[#1f7a4d] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
            yours
          </span>
        ) : null}
        {product.link_live === false ? (
          <span className="absolute right-0 top-0 bg-[#d95028] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
            dead link
          </span>
        ) : null}
      </div>
      <div className="px-2.5 py-2">
        <p className="line-clamp-2 text-[12px] font-medium leading-snug text-[#111318]">
          {product.title}
        </p>
        <p className="mt-1 flex items-baseline justify-between gap-2 text-[10.5px] text-black/62">
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

function ResultCard({
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
    <div className="border border-black/22 bg-white text-left shadow-[0_24px_70px_rgba(17,19,24,0.12)]">
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 pb-3 pt-3.5 sm:px-5">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60">
            {eyebrow}
          </p>
          <p className="mt-1.5 text-[14px] font-semibold leading-snug text-[#111318]">
            {identity ?? result.brand ?? result.domain}
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-black/62">
            {identityMeta ??
              `${result.domain}${result.platform ? ` · ${result.platform}` : ""}`}
          </p>
        </div>
        {scored.length > 0 ? (
          <div className="text-right">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60">
              Answer visibility score
            </p>
            <p className="mt-1 flex items-baseline justify-end gap-1.5">
              <span
                className={`text-[30px] font-semibold leading-none tracking-[-0.03em] ${band.text}`}
              >
                {score}
              </span>
              <span className="text-[12px] text-black/50">/ 100</span>
              <span
                className={`ml-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] ${band.text}`}
              >
                {band.label}
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
        <p className="px-5 py-4 text-[14px] leading-relaxed text-[#d95028]">
          {result.reject_reason}
        </p>
      ) : null}

      {result.findings.length > 0 ? (
        <div className="border-b border-black/18 px-4 py-4 sm:px-5">
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
                <span className="mt-1 block text-black/64">
                  {finding.detail}
                </span>
                {finding.product ? (
                  <span className="mt-1 block font-mono text-[11px] text-black/60">
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
              <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/60">
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
            {rows.length > 0 ? (
              <div>
                <p className="flex items-center gap-2 px-4 pt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60 sm:px-5">
                  <span
                    className="h-[3px] w-4 bg-[#e8653a]"
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
                            <span className="text-[11.5px] leading-relaxed text-black/62">
                              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-black/58">
                                named instead{" "}
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

            {rivals.length > 0 ? (
              <div className="border-t border-black/12 px-4 py-4 sm:px-5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60">
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
                      <span className="w-7 shrink-0 text-right font-mono text-[10px] text-black/60">
                        {rival.count}×
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {products.length > 0 ? (
            <aside className="flex flex-col border-t border-black/18 px-4 py-4 sm:px-5 lg:min-h-0 lg:border-l lg:border-t-0">
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60">
                <span className="h-[3px] w-4 bg-[#e8653a]" aria-hidden="true" />
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
  { key: "find", label: "Find", tag: "real scan" },
  { key: "diagnose", label: "Diagnose", tag: "real audit" },
  { key: "fix", label: "Fix", tag: "proposed" },
  { key: "verify", label: "Verify", tag: "after publish" },
] as const;

const SEVERITY_STYLES: Record<string, string> = {
  blocker: "bg-[#b3261e] text-white",
  high: "bg-[#d95028] text-white",
  medium: "bg-[#e8b13a] text-[#111318]",
  low: "bg-black/12 text-black/70",
};

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
    <div className="border border-black/22 bg-white text-left shadow-[0_24px_70px_rgba(17,19,24,0.12)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/14 px-4 py-3 sm:px-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60">
          {eyebrow}
        </p>
        <span className="bg-[#111318] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white">
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
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-black/12 bg-[#f4f1e9]">
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
        <p className="mt-0.5 font-mono text-[10.5px] text-black/62">
          This store · {product.price}
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
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60">
              Answer-readiness score
            </p>
            <p className="mt-2 font-serif text-[clamp(2.6rem,3vw,3.4rem)] leading-[0.9] tracking-[-0.03em] text-[#c04e26]">
              {d.score}
              <span className="ml-2 font-mono text-[13px] tracking-normal text-black/55">
                /100 · {d.grade}
              </span>
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-black/62">
              {d.failedChecks} of {d.totalChecks} checks failed. {d.source}.
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
                className={`mt-0.5 shrink-0 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] ${SEVERITY_STYLES[finding.severity]}`}
              >
                {finding.severity}
              </span>
              <div>
                <p className="font-mono text-[11px] font-semibold text-[#111318]">
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
            <span className="font-mono text-[10px] text-white/80">
              proposed change · {f.field}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
              product page template
            </span>
          </div>
          <div className="overflow-x-auto bg-[#fafaf7] py-2">
            {f.diff.map((line) => (
              <div
                key={line.text}
                className={`flex items-start gap-2 px-3 py-0.5 font-mono text-[11.5px] leading-relaxed ${
                  line.kind === "del"
                    ? "bg-[#b3261e]/[0.07] text-[#8a1f18]"
                    : line.kind === "add"
                      ? "bg-[#1f7a4d]/[0.08] text-[#175c3b]"
                      : "text-black/55"
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
              className="inline-flex items-center border border-black/25 px-3 py-1.5 text-[12px] font-semibold text-[#111318]"
            >
              Revert
            </span>
            <span className="ml-auto font-mono text-[10px] text-black/50">
              awaiting approval · nothing ships without it
            </span>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60">
            Also queued from this audit
          </p>
          <ul className="mt-2 divide-y divide-black/10 border border-black/14">
            {f.alsoQueued.map((item) => (
              <li
                key={item.field}
                className="flex items-start gap-3 px-3 py-2.5"
              >
                <span
                  className={`mt-0.5 shrink-0 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] ${SEVERITY_STYLES[item.severity]}`}
                >
                  {item.severity}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-semibold text-[#111318]">
                    {item.field}
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-black/70">
                    {item.change}
                  </p>
                </div>
                <span className="ml-auto mt-0.5 shrink-0 border border-black/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-black/55">
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
            <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em] text-black/50">
              after the fix publishes
            </span>
          </div>
          <div className="space-y-4 px-4 py-4">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[#f1efe9] px-4 py-2.5 text-[13.5px] leading-relaxed text-[#111318]">
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
                      <span className="w-4 shrink-0 font-mono text-[11px] text-black/45">
                        {index + 1}.
                      </span>
                      {product.image_url ? (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-black/10 bg-[#f4f1e9]">
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
                        <span className="mt-0.5 block font-mono text-[10.5px] text-black/60">
                          {product.merchant} · {product.price}
                        </span>
                      </span>
                      {product.ours ? (
                        <span className="shrink-0 bg-[#1f7a4d] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-white">
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

function SampleLoopShowcase() {
  const [stage, setStage] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Scroll-driven: the card pins while the tall wrapper scrolls past, and the
  // scroll progress through the wrapper selects the stage — scrolling past the
  // section walks Find → Diagnose → Fix → Verify, then releases.
  useEffect(() => {
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
  }, []);

  // Clicking a tab scrolls to that stage's slice of the wrapper so the scroll
  // position and the selected stage stay in agreement.
  const jumpTo = (index: number) => {
    const node = wrapperRef.current;
    if (!node) return;
    const scrollable = node.offsetHeight - window.innerHeight;
    const top = node.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + ((index + 0.5) / LOOP_STAGES.length) * scrollable,
      behavior: "smooth",
    });
  };

  return (
    <div ref={wrapperRef} className="h-[280vh]">
      <div className="sticky top-20">
        <div
          role="tablist"
          aria-label="Loop stages"
          className="mb-4 grid grid-cols-2 gap-px border border-black/18 bg-black/18 sm:grid-cols-4"
        >
          {LOOP_STAGES.map((entry, index) => {
            const active = index === stage;
            return (
              <button
                key={entry.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => jumpTo(index)}
                className={`px-3 py-2.5 text-left transition-colors ${
                  active
                    ? "bg-[#111318] text-white"
                    : "bg-white hover:bg-black/5"
                }`}
              >
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.1em] ${active ? "text-white/60" : "text-black/45"}`}
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

        {stage === 0 ? (
          <ResultCard
            result={SAMPLE_SCAN}
            eyebrow="Example scan, real result"
            identity="A dancewear store"
            identityMeta="Shopify · scanned with this form"
            note="The unedited output of one real scan: the store's own buying questions, both assistants, and who got named instead. Enter your domain to get yours."
          />
        ) : stage === 1 ? (
          <DiagnosePanel />
        ) : stage === 2 ? (
          <FixPanel />
        ) : (
          <VerifyPanel />
        )}
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
    "h-12 w-full border border-black/22 bg-white px-4 text-left text-[15px] text-[#151515] outline-none placeholder:text-black/45 focus:border-[#c04e26]";

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
            className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#111318] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#c04e26] disabled:opacity-70"
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
          {error ||
            "We read your live storefront first. The assistant questions run after you confirm by email."}
        </p>
      </form>

      <div className="mx-auto mt-16 max-w-[72rem]">
        <p className="mb-4 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
          {result
            ? "Your storefront, read live"
            : "A real store, scanned with this form"}
        </p>
        {result ? <ResultCard result={result} /> : <SampleLoopShowcase />}
      </div>
    </div>
  );
}
