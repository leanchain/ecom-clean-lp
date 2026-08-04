"use client";

import { useState, type FormEvent } from "react";

import { Mail } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import Reveal from "@/components/beseam/reveal";
import useAnalytics from "@/hooks/useAnalytics";
import {
  getMarketingProperties,
  getUtmValues,
} from "@/lib/marketing-analytics";

const inputClass =
  "mt-1.5 min-h-11 w-full border border-black/30 bg-white px-3.5 py-2.5 text-[15px] text-[#111318] outline-none placeholder:text-black/52 focus:border-[#b8441d]";

function ContactForm() {
  const { trackEvent } = useAnalytics();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "contact",
          utm: getUtmValues(),
        }),
      });

      if (!response.ok) throw new Error("The message could not be sent.");

      trackEvent({
        action: "contact_form_submitted",
        category: "marketing",
        ...getMarketingProperties("contact_page", "/api/lead"),
      });
      setSubmitted(true);
    } catch {
      setError(
        "We could not send your message. Please email pankaj@beseam.com instead.",
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
          Message received
        </p>
        <h2 className="mt-3 font-display text-[32px] font-normal tracking-[-0.02em] text-[#111318]">
          We&rsquo;ll reply within one business day.
        </h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-black/18 bg-white p-6 md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
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
          Message
          <textarea
            required
            rows={4}
            maxLength={2000}
            value={form.message}
            onChange={(event) =>
              setForm({ ...form, message: event.target.value })
            }
            className={inputClass}
            placeholder="What can we help with?"
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
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default function ContactContent() {
  return (
    <div className="bg-[#fafafa] text-[#151515]">
      <section className="border-b border-black/18">
        <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#b8441d]">
                Contact
              </p>
              <h1 className="mt-7 max-w-[16ch] font-display text-[clamp(2.8rem,6.2vw,4.5rem)] font-normal leading-[1] tracking-[-0.02em] text-[#111318]">
                Questions before you commit?
              </h1>
            </div>
            <p className="max-w-[64ch] text-[19px] leading-[1.72] text-black/66">
              Email directly, book a 20-minute call, or send the essentials
              below and we&rsquo;ll reply within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/18 bg-[#f6f6f6]">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal className="flex flex-col gap-6 border border-black/18 bg-white p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
            <a
              href="mailto:pankaj@beseam.com"
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-[#111318] hover:text-[#b8441d]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              pankaj@beseam.com
            </a>
            <BookReviewCta location="contact_page" />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-black/62">
              Or send a message
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,2.6vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#111318]">
              We read every message.
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
