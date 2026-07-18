"use client";

import { useState, type FormEvent } from "react";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import useAnalytics from "@/hooks/useAnalytics";
import { getMarketingProperties } from "@/lib/marketing-analytics";
import { normalizeStoreDomain } from "@/lib/store-url";

export default function ScanForm() {
  const { trackEvent } = useAnalytics();
  const [store, setStore] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = normalizeStoreDomain(store);

    if (result.error || !result.domain) {
      setError(result.error || "Enter a Shopify store domain.");
      return;
    }

    const destination =
      "https://app.beseam.com/store?shop=" + encodeURIComponent(result.domain);
    setError("");
    setSubmitting(true);
    trackEvent({
      action: "scanner_tool_clicked",
      category: "marketing",
      ...getMarketingProperties("scanner_form", destination),
    });
    window.location.assign(destination);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-10 flex flex-col gap-2 rounded-2xl border border-rule bg-panel p-2 sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="scanner-store-domain">
          Shopify store domain
        </label>
        <input
          id="scanner-store-domain"
          value={store}
          onChange={(event) => {
            setStore(event.target.value);
            if (error) setError("");
          }}
          placeholder="yourstore.myshopify.com"
          aria-invalid={Boolean(error)}
          aria-describedby="scanner-help"
          className="h-12 flex-1 rounded-xl bg-transparent px-4 text-[15px] text-ink outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={submitting}
          className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-70"
        >
          {submitting ? "Opening scan…" : "Run scan"}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </form>
      <p
        id="scanner-help"
        role={error ? "alert" : undefined}
        className={
          "mt-2 px-2 text-[13px] " +
          (error ? "text-destructive" : "text-muted-foreground")
        }
      >
        {error || "The scan opens in the Beseam application."}
      </p>
      <div className="mt-14 border-t border-rule pt-8">
        <p className="text-[15px] text-foreground">
          Need ongoing visibility and purchase-health monitoring with evidence
          and prioritized issues?
        </p>
        <Link
          href="/store-health-review"
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold hover:underline"
        >
          Book a Store Health Review
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
