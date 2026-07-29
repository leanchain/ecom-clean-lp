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
