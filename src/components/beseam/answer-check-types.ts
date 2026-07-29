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

export type Answer = {
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
