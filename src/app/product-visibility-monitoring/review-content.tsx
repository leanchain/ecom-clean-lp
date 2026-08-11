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
      "Ecommerce founders and leads with products that should win specific buying questions",
      "Teams responsible for product content, merchandising, feeds, and structured data",
      "Brands that want evidence when an assistant recommends someone else",
    ],
  },
  {
    title: "What we test",
    items: [
      "The buying questions that matter for your products",
      "The products and competitors named in the observed answer",
      "The product and storefront evidence you can actually change",
    ],
  },
  {
    title: "During 20 minutes",
    items: [
      "Choose the products and questions worth testing first",
      "Review an observed answer and the evidence attached to it",
      "Agree what a useful first change and re-check would look like",
    ],
  },
  {
    title: "What you receive",
    items: [
      "The question and observed answer kept with the product",
      "Competing products and supporting evidence when available",
      "A proposed product-data change and the same-question re-check",
    ],
  },
];

function ReviewDetails() {
  return (
    <div className="grid gap-px border border-black/18 bg-black/18 md:grid-cols-2">
      {DETAILS.map((detail) => (
        <section key={detail.title} className="bg-[#f6f6f6] p-7 md:p-8">
          <h2 className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-[#b8441d]">
            {detail.title}
          </h2>
          <ul className="mt-4 divide-y divide-black/16 border-t border-black/18">
            {detail.items.map((item) => (
              <li
                key={item}
                className="py-3 text-[14.5px] leading-relaxed text-black/66"
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
        throw new Error("The recommendation review request could not be sent.");

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
        className="border border-black/18 bg-[#f6f6f6] p-8 text-center"
      >
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-[#b8441d]">
          Request received
        </p>
        <h2 className="mt-3 font-display text-[32px] font-normal tracking-[-0.02em] text-[#111318]">
          We&rsquo;ll be in touch.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-black/66">
          We&rsquo;ll use the details you shared to prepare the products and
          buying questions we should review with you.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 min-h-11 w-full border border-black/30 bg-white px-3.5 py-2.5 text-[15px] text-[#111318] outline-none placeholder:text-black/52 focus:border-[#b8441d]";

  return (
    <form
      onSubmit={onSubmit}
      className="border border-black/18 bg-white p-6 md:p-8"
    >
      <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-black/62">
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
        className="mt-5 inline-flex min-h-11 items-center justify-center bg-[#111318] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#b8441d] disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? "Sending…" : "Send review request"}
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
    <div className="bg-[#fafafa] text-[#151515]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                20-minute recommendation review
              </p>
              <h1 className="mt-7 max-w-[18ch] font-display text-[clamp(2.8rem,6.2vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em] text-[#111318]">
                Bring the products AI should be recommending.
              </h1>
            </div>
            <p className="max-w-[64ch] text-[19px] leading-[1.72] text-black/66">
              We choose the buying questions that matter, look at the products
              the assistant actually named, and agree what product evidence is
              worth changing and testing again.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#f6f6f6]">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <ReviewDetails />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="choose-a-time">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-10 border-b border-black/22 pb-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-black/62">
                Choose a time · 20 minutes
              </p>
              <h2
                id="choose-a-time"
                className="mt-5 max-w-[16ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111318]"
              >
                Book directly with the founder.
              </h2>
            </div>
            <div className="flex flex-col gap-6 self-end border border-black/18 bg-[#f6f6f6] p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
              <div className="max-w-xl">
                <h3 className="text-[20px] font-semibold text-[#111318]">
                  Review one recommendation problem with us.
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-black/66">
                  Bring your store URL, the products that matter most, and the
                  buying questions you want those products to win.
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
                className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#111318] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#b8441d]"
              >
                Open booking calendar
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mx-auto mt-12 max-w-2xl">
            <ContactFallback />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
