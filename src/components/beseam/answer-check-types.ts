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
  severity?: "blocker" | "high" | "medium" | "low" | "info";
  domain?: string;
  url?: string;
  evidence?: string[];
  fix_complexity?: string;
  source?: "catalog" | "catalog_sample" | "page_audit";
};

export type PageAudit = {
  url: string;
  title: string | null;
  ok: boolean;
  error: string | null;
  score: number | null;
  grade: string | null;
  report_id?: number | null;
  coverage: number;
  degraded: boolean;
  domain_scores: Record<string, number>;
  domain_counts?: Record<string, { evaluated: number; failed: number; unevaluated: number }>;
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
  link_live?: boolean;
};

export type Answer = {
  question: string | null;
  channel_label: string | null;
  observation_method?:
    | "probe"
    | "live_serp"
    | "consumer_sample"
    | "derived"
    | "fallback"
    | null;
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

export type SiteInventory = {
  urls_discovered: number;
  urls_capped: boolean;
  /** Raw URL counts, including locale/market copies. */
  page_types: Record<string, number>;
  /** Merchant-facing entities with locale copies collapsed. */
  entity_page_types?: Record<string, number>;
  localized_url_copies?: number;
  hosts: Record<string, number>;
  robots: {
    status: "rules_found" | "open" | "unavailable" | "not_measured" | string;
    crawl_delay_seconds: number | null;
    blocked_urls: number | null;
  };
  sitemap: {
    status: "found" | "declared" | "not_found" | string;
    directives: string[];
    sources: string[];
    urls_from_sitemap: number;
    dated_urls: number;
    image_entries: number;
  };
  locales: string[];
  search_crawlers: {
    status: string;
    allowed: number;
    blocked: number;
    total: number;
    blocked_names: string[];
  };
  assistant_crawlers: {
    status: string;
    allowed: number;
    blocked: number;
    total: number;
    blocked_names: string[];
  };
  discovery_files?: Record<
    string,
    { present: boolean | null; status_code: number | null; content_type: string | null }
  >;
  internal_reach?: {
    status: string;
    scope?: string;
    internal_links?: number;
    product_links?: number;
    collection_links?: number;
    content_links?: number;
    orphan_products?: string;
    reason?: string | null;
  };
};

export type CatalogInventory = {
  products_checked: number;
  products_capped: boolean;
  products_with_gaps: number;
  total_variants: number;
  multi_variant_products: number;
  unavailable_products: number;
  missing_product_types: number;
  placeholder_vendors: number;
  default_only_options: number;
  variant_option_gaps?: number;
  missing_descriptions: number;
  thin_descriptions: number;
  missing_images: number;
  missing_tags: number;
  missing_identifiers: number;
  variant_identifier_gaps: number;
  identifier_conflicts: number;
  identifier_conflict_products?: number;
  duplicate_description_products: number;
  collections_status?: string;
  collections_checked?: number;
  collections_capped?: boolean;
  collection_titles?: string[];
  product_type_count?: number;
  top_product_types?: Array<{ name: string; products: number }>;
  option_dimensions?: Array<{ name: string; products: number }>;
  describability: { strong: number; thin: number; very_thin: number };
  collection_membership?: { status: string; reason?: string | null };
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
  page_audits_status?: "not_started" | "queued" | "running" | "complete" | "failed" | string;
  site_inventory?: SiteInventory;
  catalog_inventory?: CatalogInventory;
};
