"use client";

import { useState, type FormEvent } from "react";

import { ArrowRight } from "lucide-react";

import useAnalytics from "@/hooks/useAnalytics";
import {
  getMarketingProperties,
  getUtmValues,
} from "@/lib/marketing-analytics";
import { normalizeStoreDomain } from "@/lib/store-url";

type Mode = "product-page" | "store-domain";

type LeadCaptureFormProps = {
  mode: Mode;
  source: "ai_visibility_scan" | "platform_audit";
  placement: string;
  storeLabel: string;
  storePlaceholder: string;
  buttonLabel: string;
  helpText: string;
  storeFieldId?: string;
};

function buildDestination(mode: Mode, value: string) {
  if (mode === "store-domain") {
    const result = normalizeStoreDomain(value);
    if (result.error || !result.domain) {
      return { error: result.error ?? "Enter your store domain." };
    }
    return {
      destination: `https://app.beseam.com/store?shop=${encodeURIComponent(result.domain)}`,
      store: result.domain,
    };
  }

  const cleaned = value.trim();
  if (!cleaned) return { error: "Paste one public product page URL." };

  const normalized = /^https?:\/\//i.test(cleaned)
    ? cleaned
    : `https://${cleaned}`;

  try {
    const url = new URL(normalized);
    if (!url.hostname.includes(".")) throw new Error("invalid host");
    return {
      destination: `https://app.beseam.com/scan?url=${encodeURIComponent(url.toString())}`,
      store: url.hostname,
    };
  } catch {
    return {
      error: "Use a full product page URL, like example.com/products/item.",
    };
  }
}

export default function LeadCaptureForm({
  mode,
  source,
  placement,
  storeLabel,
  storePlaceholder,
  buttonLabel,
  helpText,
  storeFieldId = "lead-store",
}: LeadCaptureFormProps) {
  const { trackEvent } = useAnalytics();
  const [store, setStore] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setFallback("");

    const result = buildDestination(mode, store);
    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }

    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      setError("Enter a valid work email so we can send the findings.");
      return;
    }

    const destination = result.destination as string;
    setSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          store: result.store,
          source,
          website,
          utm: getUtmValues(),
        }),
      });

      if (!response.ok)
        throw new Error(`lead capture failed: ${response.status}`);

      trackEvent({
        action: "lead_captured",
        category: "conversion",
        ...getMarketingProperties(placement, destination),
      });
      window.location.assign(destination);
    } catch {
      setSubmitting(false);
      setFallback(destination);
      setError(
        "We could not save your email. You can still open the scan below, or email pankaj@beseam.com.",
      );
    }
  };

  const inputClass =
    "h-12 w-full border border-black/22 bg-white px-4 text-[15px] text-[#151515] outline-none placeholder:text-black/38 focus:border-[#3154ff]";

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto]">
        <div>
          <label className="sr-only" htmlFor={storeFieldId}>
            {storeLabel}
          </label>
          <input
            id={storeFieldId}
            value={store}
            onChange={(event) => {
              setStore(event.target.value);
              if (error) setError("");
            }}
            placeholder={storePlaceholder}
            aria-invalid={Boolean(error)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor={`${storeFieldId}-email`}>
            Work email
          </label>
          <input
            id={`${storeFieldId}-email`}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError("");
            }}
            placeholder="you@yourbrand.com"
            aria-invalid={Boolean(error)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#111318] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#3154ff] disabled:opacity-70"
        >
          {submitting ? "Opening scan…" : buttonLabel}
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
        {error || helpText}
      </p>

      {fallback ? (
        <a
          href={fallback}
          className="mt-1 inline-flex items-center gap-2 text-[13px] font-semibold text-[#3154ff] underline underline-offset-4"
        >
          Open the scan anyway{" "}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </form>
  );
}
