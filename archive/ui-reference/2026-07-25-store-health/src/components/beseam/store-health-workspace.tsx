import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Status primitives (shared by hero panel + evidence compositions)   */
/* ------------------------------------------------------------------ */

export type Tone = "positive" | "warn" | "negative" | "neutral";

const TONE_DOT: Record<Tone, string> = {
  positive: "bg-emerald-500",
  warn: "bg-amber-500",
  negative: "bg-red-500",
  // hollow ring = "no data" reads as explicitly NOT healthy
  neutral: "border-[1.5px] border-muted-foreground/50 bg-transparent",
};

const TONE_TEXT: Record<Tone, string> = {
  positive: "text-emerald-700 dark:text-emerald-400",
  warn: "text-amber-700 dark:text-amber-400",
  negative: "text-red-700 dark:text-red-400",
  neutral: "text-muted-foreground",
};

export function StatusDot({
  tone,
  className,
}: {
  tone: Tone;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block h-2 w-2 shrink-0 rounded-full",
        TONE_DOT[tone],
        className,
      )}
    />
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface px-2.5 py-1 text-[13px] font-semibold",
        TONE_TEXT[tone],
      )}
    >
      <StatusDot tone={tone} />
      {children}
    </span>
  );
}

const SEVERITY_STYLES: Record<string, { tone: Tone; cls: string }> = {
  Critical: {
    tone: "negative",
    cls: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  },
  High: {
    tone: "warn",
    cls: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  },
  Medium: {
    tone: "warn",
    cls: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
  },
  Low: {
    tone: "neutral",
    cls: "bg-muted text-muted-foreground",
  },
};

export function SeverityTag({ severity }: { severity: string }) {
  const style = SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.Low;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[12px] font-bold uppercase tracking-wide",
        style.cls,
      )}
    >
      <StatusDot tone={style.tone} />
      {severity}
    </span>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-rule bg-panel shadow-[0_1px_2px_rgba(16,16,26,0.04),0_8px_28px_-18px_rgba(16,16,26,0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Issue detail card (hero row + evidence-section compositions)        */
/* ------------------------------------------------------------------ */

export type Evidence = { label: string; value: string };
export type MetaItem = { label: string; value: string };

export function IssueCard({
  severity,
  domain,
  source,
  sourceTone = "positive",
  title,
  evidence,
  meta,
  action,
  deepLink,
  impactNote = "Impact not yet calculated.",
  className,
}: {
  severity: string;
  domain: string;
  source: string;
  sourceTone?: Tone;
  title: string;
  evidence: Evidence[];
  meta: MetaItem[];
  action?: string;
  deepLink?: string;
  impactNote?: string;
  className?: string;
}) {
  return (
    <div className={cn("bg-panel", className)}>
      <div className="flex flex-wrap items-center gap-2.5">
        <SeverityTag severity={severity} />
        <span className="text-[13px] font-semibold text-muted-foreground">
          {domain}
        </span>
        <span aria-hidden className="text-muted-foreground/40">
          &middot;
        </span>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground">
          <StatusDot tone={sourceTone} />
          {source}
        </span>
      </div>

      <h4 className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-ink md:text-[22px]">
        {title}
      </h4>

      <dl className="mt-4 divide-y divide-rule border-y border-rule">
        {evidence.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 sm:grid-cols-[9rem_1fr]"
          >
            <dt className="editorial-label text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-[15px] leading-relaxed text-foreground">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
        {meta.map((item) => (
          <div key={item.label}>
            <div className="editorial-label text-muted-foreground">
              {item.label}
            </div>
            <div className="mt-0.5 text-[15px] font-medium text-ink">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {action ? (
        <p className="mt-4 rounded-xl border border-rule bg-surface px-3.5 py-3 text-[15px] leading-relaxed text-foreground">
          <span className="editorial-label mr-2 text-muted-foreground">
            Recommended action
          </span>
          {action}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[13px] italic text-muted-foreground">
          {impactNote}
        </span>
        {deepLink ? (
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary">
            {deepLink}
            <span aria-hidden>&rarr;</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Monitoring coverage strip                                          */
/* ------------------------------------------------------------------ */

type CoverageSource = { name: string; state: string; tone: Tone };

const COVERAGE: CoverageSource[] = [
  { name: "Shopify", state: "Fresh", tone: "positive" },
  { name: "Tracker", state: "Fresh", tone: "positive" },
  { name: "Crawl", state: "Fresh", tone: "positive" },
  { name: "Search Console", state: "Stale", tone: "warn" },
  { name: "PDP verification", state: "Not configured", tone: "neutral" },
  { name: "Revenue Guard", state: "Not configured", tone: "neutral" },
];

function CoverageChip({ source }: { source: CoverageSource }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-rule bg-surface px-2.5 py-2">
      <StatusDot tone={source.tone} className="mt-px" />
      <div className="min-w-0">
        <div className="truncate text-[14px] font-medium text-ink">
          {source.name}
        </div>
        <div
          className={cn("text-[13px] font-semibold", TONE_TEXT[source.tone])}
        >
          {source.state}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Domain card                                                        */
/* ------------------------------------------------------------------ */

function DomainCard({
  name,
  status,
  tone,
  issues,
  lastChecked,
  summary,
}: {
  name: string;
  status: string;
  tone: Tone;
  issues: number;
  lastChecked: string;
  summary: string;
}) {
  return (
    <div className="rounded-xl border border-rule bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="editorial-label text-muted-foreground">{name}</span>
        <StatusPill tone={tone}>{status}</StatusPill>
      </div>
      <p className="mt-3 text-[14.5px] leading-relaxed text-foreground">
        {summary}
      </p>
      <div className="mt-3 flex items-center gap-3 text-[13px] text-muted-foreground">
        <span className="font-semibold text-ink">
          {issues} active {issues === 1 ? "issue" : "issues"}
        </span>
        <span aria-hidden>&middot;</span>
        <span>Last checked {lastChecked}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Store Health workspace (hero + evidence visual)                    */
/* ------------------------------------------------------------------ */

export function StoreHealthWorkspace({ className }: { className?: string }) {
  return (
    <Panel className={cn("overflow-hidden", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Example Store Health workspace
        </span>
        <StatusPill tone="warn">Degraded</StatusPill>
      </div>

      <div className="px-5 py-5 md:px-6 md:py-6">
        <p className="text-[15px] leading-relaxed text-foreground">
          <span className="font-semibold text-ink">Overall: Degraded.</span>{" "}
          Active issues in Discoverability and Purchase; Search Console data is
          stale.
        </p>

        {/* Domain cards */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <DomainCard
            name="Discoverability"
            status="Degraded"
            tone="warn"
            issues={1}
            lastChecked="2h ago"
            summary="1 issue affecting how this store is crawled and indexed."
          />
          <DomainCard
            name="Purchase"
            status="Degraded"
            tone="warn"
            issues={1}
            lastChecked="12m ago"
            summary="1 issue affecting the checkout experience on mobile."
          />
        </div>

        {/* Coverage strip */}
        <div className="mt-6">
          <div className="editorial-label mb-2 text-muted-foreground">
            Monitoring coverage
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {COVERAGE.map((source) => (
              <CoverageChip key={source.name} source={source} />
            ))}
          </div>
        </div>

        {/* Prioritized issue */}
        <div className="mt-6">
          <div className="editorial-label mb-2 text-muted-foreground">
            Prioritized issue
          </div>
          <div className="rounded-xl border border-rule bg-surface p-4 md:p-5">
            <IssueCard
              severity="High"
              domain="Purchase"
              source="Tracker · Fresh"
              sourceTone="positive"
              title="Payment-error signals increased on mobile sessions"
              evidence={[
                { label: "Sessions", value: "34 mobile-Safari" },
                { label: "Signal", value: "payment_error" },
                {
                  label: "Change",
                  value:
                    "Correlated with a theme publish ~3h ago · requires verification",
                },
              ]}
              meta={[
                { label: "Owner", value: "Development" },
                { label: "First seen", value: "~3h ago" },
              ]}
              action="Reproduce on mobile Safari and review the recent theme publish before shipping."
              deepLink="View sessions"
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default StoreHealthWorkspace;
