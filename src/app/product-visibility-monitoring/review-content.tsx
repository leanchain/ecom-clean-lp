"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Reveal from "@/components/beseam/reveal";
import useAnalytics from "@/hooks/useAnalytics";
import {
  getMarketingProperties,
  getUtmValues,
} from "@/lib/marketing-analytics";

const DETAILS = [
  {
    title: "Who it is for",
    items: [
      "Ecommerce founders and leads with a growing product catalog",
      "Teams responsible for product content, feeds, search, and merchandising",
      "Brands that need to know when an important product disappears from view",
    ],
  },
  {
    title: "What we monitor",
    items: [
      "The catalog record and customer-facing product pages",
      "Shopping feeds, search results, and product recommendations",
      "Product presence, price, availability, description, and source freshness",
    ],
  },
  {
    title: "During 20 minutes",
    items: [
      "Choose the store and products you cannot afford to lose from view",
      "Define where customers should find those products",
      "Agree the baseline, monitoring cadence, alerts, and pilot scope",
    ],
  },
  {
    title: "What you receive",
    items: [
      "A product-level monitoring baseline for the agreed scope",
      "Change alerts with the previous state and source evidence",
      "A clear owner, proposed fix, and recovery check",
    ],
  },
];

function ReviewDetails() {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-2">
      {DETAILS.map((detail) => (
        <section key={detail.title} className="bg-panel p-7 md:p-8">
          <h2 className="editorial-label text-primary">{detail.title}</h2>
          <ul className="mt-4 divide-y divide-rule border-t border-rule">
            {detail.items.map((item) => (
              <li
                key={item}
                className="py-3 text-[14.5px] leading-relaxed text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ContactFallback() {
  const { trackEvent } = useAnalytics();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    store: "",
    message: "",
    website: "",
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "product_visibility_monitoring",
          utm: getUtmValues(),
        }),
      });

      if (!response.ok)
        throw new Error("The monitoring request could not be sent.");

      trackEvent({
        action: "product_visibility_monitoring_submitted",
        category: "marketing",
        ...getMarketingProperties("review_fallback_form", "/api/lead"),
      });
      setSubmitted(true);
    } catch {
      setError(
        "We could not send your request. Please email pankaj@beseam.com instead.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-rule bg-panel p-8 text-center"
      >
        <p className="editorial-label text-primary">Request received</p>
        <h2 className="editorial-subheading mt-3 text-ink">
          We&rsquo;ll be in touch.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-foreground">
          We&rsquo;ll use the details you shared to prepare the product
          baseline and monitoring scope for your store.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 min-h-11 w-full rounded-lg border border-rule bg-panel px-3.5 py-2.5 text-[15px] text-ink outline-none placeholder:text-muted-foreground focus:border-primary";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-rule bg-background p-6 md:p-8"
    >
      <p className="editorial-label text-muted-foreground">
        Calendar not convenient? Send the essentials
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-[13px] font-medium text-foreground">
          Name
          <input
            required
            autoComplete="name"
            maxLength={100}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className={inputClass}
          />
        </label>
        <label className="text-[13px] font-medium text-foreground">
          Work email
          <input
            required
            type="email"
            autoComplete="email"
            maxLength={200}
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            className={inputClass}
          />
        </label>
        <label className="text-[13px] font-medium text-foreground sm:col-span-2">
          Store URL
          <input
            required
            inputMode="url"
            autoComplete="url"
            maxLength={300}
            value={form.store}
            onChange={(event) =>
              setForm({ ...form, store: event.target.value })
            }
            className={inputClass}
            placeholder="yourstore.com"
          />
        </label>
        <label className="text-[13px] font-medium text-foreground sm:col-span-2">
          Message <span className="text-muted-foreground">(optional)</span>
          <textarea
            rows={3}
            maxLength={2000}
            value={form.message}
            onChange={(event) =>
              setForm({ ...form, message: event.target.value })
            }
            className={inputClass}
            placeholder="Which products matter most, and where should customers find them?"
          />
        </label>
        <label className="sr-only" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) =>
              setForm({ ...form, website: event.target.value })
            }
          />
        </label>
      </div>
      {error ? (
        <p role="alert" className="mt-4 text-[13px] text-destructive">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? "Sending…" : "Send monitoring request"}
      </button>
    </form>
  );
}

export default function ReviewContent() {
  const { trackEvent } = useAnalytics();
  const trackedOpen = useRef(false);
  const [calConfig, setCalConfig] = useState<Record<string, string>>({
    layout: "month_view",
  });

  const track = useCallback(
    (action: string, placement: string, destination: string) => {
      trackEvent({
        action,
        category: "marketing",
        ...getMarketingProperties(placement, destination),
      });
    },
    [trackEvent],
  );

  useEffect(() => {
    if (!trackedOpen.current) {
      trackedOpen.current = true;
      track(
        "product_visibility_monitoring_opened",
        "monitoring_setup_page",
        "/product-visibility-monitoring",
      );
    }

    setCalConfig({ layout: "month_view", ...getUtmValues() });

    void (async () => {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi({ namespace: "Beseam" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () =>
          track(
            "calendar_booking_completed",
            "review_calendar",
            "https://cal.com/pankaj.kumar/Beseam",
          ),
      });
    })();
  }, [track]);

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="editorial-eyebrow text-primary">
            20-minute monitoring setup
          </p>
          <h1 className="editorial-hero mt-5 text-ink">
            Choose the products you cannot afford to lose from view.
          </h1>
          <p className="editorial-body mt-6 max-w-2xl text-foreground">
            We define the products and discovery paths to monitor, establish
            the first baseline, and agree how your team should receive and act
            on visibility-change alerts.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ReviewDetails />
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <section aria-labelledby="choose-a-time">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="editorial-eyebrow text-muted-foreground">
                  Choose a time
                </p>
                <h2
                  id="choose-a-time"
                  className="editorial-subheading mt-2 text-ink"
                >
                  Book directly with the founder.
                </h2>
              </div>
              <p className="text-[14px] text-muted-foreground">20 minutes</p>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl border border-rule bg-panel p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
              <div className="max-w-xl">
                <h3 className="text-[20px] font-semibold tracking-tight text-ink">
                  Choose a time to set up product visibility monitoring.
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                  Pick a 20-minute slot. Bring your store URL, the products
                  that matter most, and the places where customers should find them.
                </p>
              </div>
              <button
                type="button"
                data-cal-namespace="Beseam"
                data-cal-link="pankaj.kumar/Beseam"
                data-cal-config={JSON.stringify(calConfig)}
                onClick={() =>
                  track(
                    "calendar_booking_started",
                    "review_calendar",
                    "https://cal.com/pankaj.kumar/Beseam",
                  )
                }
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]"
              >
                Open booking calendar
              </button>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-10 max-w-2xl">
          <ContactFallback />
        </Reveal>
      </div>
    </div>
  );
}
