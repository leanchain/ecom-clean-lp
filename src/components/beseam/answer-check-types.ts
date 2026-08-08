export type StepState = "pending" | "active" | "done" | "failed" | "skipped";

export type Step = {
  key: string;
  label: string;
  state: StepState;
  detail: string | null;
};

export type Finding = {
  code: string;
  title: string;
  detail: string;
  product: string | null;
  /** Present on deterministic page-audit findings only. */
  severity?: "blocker" | "high" | "medium" | "low" | "info";
  domain?: string;
  url?: string;
  evidence?: string[];
  fix_complexity?: string;
  source?: "page_audit";
};

/** Deterministic verdict for one sampled product page. No LLM involved. */
export type PageAudit = {
  url: string;
  title: string | null;
  ok: boolean;
  error: string | null;
  score: number | null;
  grade: string | null;
  /** Share of emitted checks that actually ran; a score only claims this much. */
  coverage: number;
  degraded: boolean;
  domain_scores: Record<string, number>;
  checks_evaluated: number;
  checks_failed: number;
  checks_unevaluated: number;
  findings: Finding[];
};

export type ShownProduct = {
  title: string;
  merchant: string | null;
  price: string | null;
  image_url: string | null;
  url: string | null;
  ours: boolean;
  /** False when the page the assistant linked to no longer resolves. */
  link_live?: boolean;
};

export type Answer = {
  question: string | null;
  channel_label: string | null;
  mentioned: boolean | null;
  competitors: string[];
  products?: ShownProduct[];
  error: string | null;
};

export type BrandEvidenceProduct = {
  title: string;
  url: string | null;
  price: string | null;
  currency: string | null;
  available: boolean | null;
  attributes: string[];
};

export type BrandEvidence = {
  market: string | null;
  sources: string[];
  products: BrandEvidenceProduct[];
  catalog_signals: Array<{
    title: string | null;
    detail: string | null;
    product: string | null;
  }>;
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
  brand_evidence?: BrandEvidence;
  page_audits?: PageAudit[];
};
