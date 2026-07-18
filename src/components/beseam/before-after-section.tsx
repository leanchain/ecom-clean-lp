"use client";

import { useState, type ReactNode } from "react";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ─── Star helper ──────────────────────────────────────────────── */
function Stars({
  count = 5,
  className = "h-3 w-3",
  color = "text-[#FBBC04]",
}: {
  count?: number;
  className?: string;
  color?: string;
}) {
  return (
    <div className="flex">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className={cn(className, color)}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Platform data ────────────────────────────────────────────── */

interface Platform {
  id: string;
  label: string;
  logo: string;
  before: { content: ReactNode; issues: string[] };
  after: { content: ReactNode; wins: string[] };
}

const platforms: Platform[] = [
  /* ── Google Search (rich results) ─────────────────────────────── */
  {
    id: "google",
    label: "Google",
    logo: "/images/ai-platforms/google.svg",
    before: {
      content: (
        <div className="rounded-lg border border-border bg-white p-4">
          <p className="text-xs text-[#4D5156]">
            www.mystore.com &rsaquo; products &rsaquo; blue-summer-dress
          </p>
          <p className="mt-1 text-lg font-medium text-[#1A0DAB] underline decoration-[#1A0DAB]/30">
            Blue Summer Dress , MyStore
          </p>
          <p className="mt-1 text-sm leading-snug text-[#4D5156]">
            Buy Blue Summer Dress at MyStore. Wide selection of summer dresses
            available online. Shop now.
          </p>
        </div>
      ),
      issues: [
        "No Product structured data — no rich snippet",
        "Missing review schema — no star rating in SERP",
        "Price not declared — users scroll past",
      ],
    },
    after: {
      content: (
        <div className="rounded-lg border border-border bg-white p-4">
          <p className="text-xs text-[#4D5156]">
            <span className="text-[#202124]">mystore.com</span> &rsaquo;
            products &rsaquo; blue-summer-dress
          </p>
          <p className="mt-1 cursor-pointer text-lg font-medium text-[#1A0DAB] underline decoration-[#1A0DAB]/30 hover:decoration-[#1A0DAB]">
            Blue Summer Dress , MyStore
          </p>
          {/* Stars row — Google's orange #E8710A */}
          <div className="mt-1 flex items-center gap-1.5">
            <Stars color="text-[#E8710A]" className="h-3.5 w-3.5" />
            <span className="text-xs text-[#70757A]">4.8 (127 reviews)</span>
          </div>
          <p className="mt-1 text-sm leading-snug text-[#4D5156]">
            A lightweight cotton summer dress in sky blue, designed for comfort.
            Available in 5 sizes. Free shipping over $50.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm font-semibold text-[#202124]">$49.99</span>
            <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
              In Stock
            </span>
          </div>
          {/* Merchant / shipping / returns — Google grey metadata row */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[#70757A]">
            <span>
              Sold by <strong className="text-[#202124]">MyStore</strong>
            </span>
            <span aria-hidden>·</span>
            <span>Free shipping over $50</span>
            <span aria-hidden>·</span>
            <span>30-day returns</span>
          </div>
        </div>
      ),
      wins: [
        "Rich snippet with orange stars — up to 30% more clicks",
        "Price, merchant & shipping visible before the click",
        "Return policy shown — reduces purchase hesitation",
      ],
    },
  },

  /* ── ChatGPT Shopping ─────────────────────────────────────────── */
  {
    id: "chatgpt",
    label: "ChatGPT",
    logo: "/images/ai-platforms/chatgpt.svg",
    before: {
      content: (
        /* ChatGPT: white bg, Soehne/sans-serif, #0D0D0D text, green #10A37F accent */
        <div className="rounded-lg border border-[#E5E5E5] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10A37F]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#0D0D0D]">
              ChatGPT
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#0D0D0D]">
            I found a page for a &ldquo;Blue Summer Dress&rdquo; on mystore.com,
            but the product page doesn&apos;t include structured details I can
            extract. You may want to visit the site directly to check pricing
            and availability.
          </p>
        </div>
      ),
      issues: [
        "No structured data — ChatGPT can't extract product info",
        "Missing price — excluded from shopping comparisons",
        'No reviews — skipped in "best of" recommendations',
      ],
    },
    after: {
      content: (
        <div className="rounded-lg border border-[#E5E5E5] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10A37F]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#0D0D0D]">
              ChatGPT
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#0D0D0D]">
            Here&apos;s a great option:
          </p>
          {/* ChatGPT product card — rounded, subtle shadow, image placeholder */}
          <div className="mt-3 cursor-pointer rounded-xl border border-[#E5E5E5] bg-[#F7F7F8] p-3 transition-shadow hover:shadow-md">
            <div className="flex gap-3">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-sky-100">
                <span className="text-2xl">👗</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#0D0D0D]">
                  Blue Summer Dress
                </p>
                <p className="text-xs text-[#6E6E80]">MyStore</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <Stars color="text-[#FBBC04]" className="h-3 w-3" />
                  <span className="text-xs text-[#6E6E80]">4.8 (127)</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0D0D0D]">
                    $49.99
                  </span>
                  <span className="rounded-full bg-[#10A37F]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10A37F]">
                    In Stock
                  </span>
                </div>
                {/* Merchant + shipping + returns */}
                <div className="mt-1.5 space-y-0.5">
                  <p className="text-[11px] text-[#6E6E80]">
                    🏪 Sold by{" "}
                    <strong className="text-[#0D0D0D]">MyStore</strong>
                  </p>
                  <p className="text-[11px] text-[#6E6E80]">
                    🚚 Free shipping · 2–3 business days
                  </p>
                  <p className="text-[11px] text-[#6E6E80]">
                    ↩ 30-day free returns
                  </p>
                </div>
              </div>
            </div>
            {/* Product link */}
            <div className="mt-2.5 flex items-center justify-between border-t border-[#E5E5E5] pt-2.5">
              <span className="text-[11px] text-[#6E6E80]">
                mystore.com/products/blue-summer-dress
              </span>
              <span className="text-[11px] font-semibold text-[#10A37F]">
                View product &rsaquo;
              </span>
            </div>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-[#0D0D0D]">
            Lightweight cotton, 5 sizes, free shipping over $50. Rated 4.8/5
            from 127 reviews.
          </p>
        </div>
      ),
      wins: [
        "Product card with price, rating & merchant inline",
        "Shipping speed & return policy build purchase confidence",
        "Eligible for ChatGPT Instant Checkout",
      ],
    },
  },

  /* ── Perplexity ──────────────────────────────────────────────── */
  {
    id: "perplexity",
    label: "Perplexity",
    logo: "/images/ai-platforms/perplexity.svg",
    before: {
      content: (
        /* Perplexity: warm paper #FBFAF4 bg, Inter, turquoise #20808D accent, inline citations */
        <div className="rounded-lg border border-[#E8E6DF] bg-[#FBFAF4] p-4">
          {/* Source chips — faded */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md bg-[#F0EDE6] px-2 py-1">
              <div className="h-3.5 w-3.5 rounded-sm bg-[#D4D0C8]" />
              <span className="text-[10px] text-[#6B6860]">mystore.com</span>
            </div>
          </div>
          <p className="text-[14px] leading-relaxed text-[#091717]">
            I found a page for a Blue Summer Dress on mystore.com, but limited
            details are available.{" "}
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#20808D]/10 text-[9px] font-bold text-[#20808D]">
              1
            </span>{" "}
            The page meta description says &ldquo;Buy Blue Summer Dress at
            MyStore. Shop now.&rdquo; I&apos;d recommend checking the site
            directly for current pricing.
          </p>
        </div>
      ),
      issues: [
        "Generic meta description — nothing useful to cite",
        "No price, rating, or stock in source data",
        "Ranked below competitors with richer structured data",
      ],
    },
    after: {
      content: (
        <div className="rounded-lg border border-[#E8E6DF] bg-[#FBFAF4] p-4">
          {/* Source chips — rich, with product page link */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex cursor-pointer items-center gap-1.5 rounded-md bg-[#20808D]/10 px-2 py-1 transition-colors hover:bg-[#20808D]/20">
              <div className="h-3.5 w-3.5 rounded-sm bg-[#20808D]/30" />
              <span className="text-[10px] font-medium text-[#20808D]">
                mystore.com
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-[#F0EDE6] px-2 py-1">
              <div className="h-3.5 w-3.5 rounded-sm bg-[#D4D0C8]" />
              <span className="text-[10px] text-[#6B6860]">+3 sources</span>
            </div>
          </div>
          <p className="text-[14px] leading-relaxed text-[#091717]">
            The{" "}
            <span className="cursor-pointer font-semibold text-[#20808D] underline decoration-[#20808D]/30 hover:decoration-[#20808D]">
              Blue Summer Dress from MyStore ($49.99)
            </span>{" "}
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#20808D]/10 text-[9px] font-bold text-[#20808D]">
              1
            </span>{" "}
            is a top-rated lightweight cotton dress with a{" "}
            <strong>4.8/5 rating</strong>{" "}
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#20808D]/10 text-[9px] font-bold text-[#20808D]">
              2
            </span>{" "}
            from 127 reviews. Available in 5 sizes with free shipping over $50.
            Ships within 2–3 days. 30-day returns accepted.{" "}
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#20808D]/10 text-[9px] font-bold text-[#20808D]">
              3
            </span>
          </p>
        </div>
      ),
      wins: [
        "Rich citation: price, rating, shipping & returns cited",
        "Sourced recommendation beats competitors with less data",
        "Footnotes build trust — users click confident sources",
      ],
    },
  },

  /* ── Google AI Overview ──────────────────────────────────────── */
  {
    id: "google-ai",
    label: "AI Overview",
    logo: "/images/ai-platforms/ai-mode.svg",
    before: {
      content: (
        /* Google AI Overview: light blue #E8F0FE bg, Google Sans, Gemini sparkle */
        <div className="rounded-lg border border-[#C2D7F5] bg-[#E8F0FE] p-4">
          <div className="mb-3 flex items-center gap-2">
            {/* Gemini sparkle four-pointed star */}
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 0C14 7.732 7.732 14 0 14c7.732 0 14 6.268 14 14 0-7.732 6.268-14 14-14-7.732 0-14-6.268-14-14z"
                fill="url(#geminiGrad)"
              />
              <defs>
                <linearGradient id="geminiGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#4285F4" />
                  <stop offset="0.5" stopColor="#9B72CB" />
                  <stop offset="1" stopColor="#D96570" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-semibold text-[#202124]">
              AI Overview
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#202124]">
            I found several summer dresses from various stores. MyStore appears
            to carry a Blue Summer Dress, though I couldn&apos;t confirm pricing
            or reviews from their product page.
          </p>
          {/* Product card — faded */}
          <div className="mt-3 rounded-lg border border-[#DADCE0] bg-white px-3 py-2.5">
            <p className="text-xs font-medium text-[#202124]">
              Blue Summer Dress — MyStore
            </p>
            <p className="text-[11px] text-[#70757A]">
              Price unavailable · No reviews
            </p>
          </div>
          {/* Source chip */}
          <div className="mt-3 flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-[#DADCE0]" />
            <span className="text-[11px] text-[#70757A]">mystore.com</span>
          </div>
        </div>
      ),
      issues: [
        "Listed without price — users skip incomplete cards",
        "No reviews — loses to competitors in AI Overview",
        "Vague mention — not confidently recommended",
      ],
    },
    after: {
      content: (
        <div className="rounded-lg border border-[#C2D7F5] bg-[#E8F0FE] p-4">
          <div className="mb-3 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 0C14 7.732 7.732 14 0 14c7.732 0 14 6.268 14 14 0-7.732 6.268-14 14-14-7.732 0-14-6.268-14-14z"
                fill="url(#geminiGrad2)"
              />
              <defs>
                <linearGradient id="geminiGrad2" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#4285F4" />
                  <stop offset="0.5" stopColor="#9B72CB" />
                  <stop offset="1" stopColor="#D96570" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-semibold text-[#202124]">
              AI Overview
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#202124]">
            For lightweight summer dresses, the{" "}
            <strong>Blue Summer Dress from MyStore</strong> is highly rated.
            It&apos;s priced at $49.99 and currently in stock.
          </p>
          {/* Product card — rich, clickable */}
          <div className="mt-3 cursor-pointer rounded-lg border border-[#DADCE0] bg-white px-3 py-2.5 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-[#202124]">
                Blue Summer Dress — MyStore
              </p>
              <Stars color="text-[#E8710A]" className="h-2.5 w-2.5" />
            </div>
            <p className="text-[11px] text-[#70757A]">
              $49.99 · In Stock · Free shipping over $50
            </p>
            <p className="text-[11px] text-[#70757A]">
              Sold by MyStore · 30-day returns
            </p>
          </div>
          {/* Source chip — links to product page */}
          <div className="mt-3 flex cursor-pointer items-center gap-1.5 rounded-full border border-[#D2E3FC] bg-[#E8F0FE] px-2.5 py-1 transition-colors hover:bg-[#D2E3FC] w-fit">
            <div className="h-3.5 w-3.5 rounded-full bg-[#1A73E8]" />
            <span className="text-[11px] font-medium text-[#1A73E8]">
              mystore.com/products/blue-summer-dress
            </span>
          </div>
        </div>
      ),
      wins: [
        "Product card shows price, merchant & return policy",
        "Confidently recommended over incomplete competitors",
        "Source link highlighted — drives direct traffic",
      ],
    },
  },

  /* ── Claude ──────────────────────────────────────────────────── */
  {
    id: "claude",
    label: "Claude",
    logo: "/images/ai-platforms/claude.svg",
    before: {
      content: (
        /* Claude: cream #F5F5F0 bg, serif body, terracotta #AE5630 accent, warm tones */
        <div className="rounded-lg border border-[#E5E3DD] bg-[#F5F5F0] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#AE5630]">
              <span className="text-[10px] font-bold text-white">C</span>
            </div>
            <span className="text-sm font-semibold text-[#3D3929]">Claude</span>
          </div>
          <p className="font-serif text-[14px] leading-relaxed text-[#3D3929]">
            I found a product listing for a Blue Summer Dress on mystore.com,
            but I don&apos;t have detailed information about its pricing,
            available sizes, or customer reviews. I&apos;d suggest visiting the
            store directly for the most current details.
          </p>
        </div>
      ),
      issues: [
        "No structured data to extract — generic response",
        "Can't provide price or availability specifics",
        "Your product gets a vague mention instead of a recommendation",
      ],
    },
    after: {
      content: (
        <div className="rounded-lg border border-[#E5E3DD] bg-[#F5F5F0] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#AE5630]">
              <span className="text-[10px] font-bold text-white">C</span>
            </div>
            <span className="text-sm font-semibold text-[#3D3929]">Claude</span>
          </div>
          <p className="font-serif text-[14px] leading-relaxed text-[#3D3929]">
            The{" "}
            <span className="cursor-pointer font-semibold text-[#AE5630] underline decoration-[#AE5630]/30 hover:decoration-[#AE5630]">
              Blue Summer Dress from MyStore
            </span>{" "}
            looks like a strong option. Here&apos;s what I can tell you:
          </p>
          <ul className="mt-2 space-y-1 font-serif text-[14px] text-[#3D3929]">
            <li>
              &bull; <strong>Price:</strong> $49.99 , currently in stock
            </li>
            <li>
              &bull; <strong>Rating:</strong> 4.8/5 from 127 reviews
            </li>
            <li>
              &bull; <strong>Material:</strong> Lightweight cotton, 5 sizes
            </li>
            <li>
              &bull; <strong>Brand:</strong> MyStore
            </li>
            <li>
              &bull; <strong>Shipping:</strong> Free over $50 · arrives in 2–3
              days
            </li>
            <li>
              &bull; <strong>Returns:</strong> 30-day free returns, no questions
              asked
            </li>
          </ul>
          <p className="mt-3 font-serif text-[13px] text-[#6B6356]">
            You can find it at{" "}
            <span className="cursor-pointer text-[#AE5630] underline decoration-[#AE5630]/30 hover:decoration-[#AE5630]">
              mystore.com/products/blue-summer-dress
            </span>
          </p>
        </div>
      ),
      wins: [
        "Brand, price, rating & sizes all extracted precisely",
        "Shipping speed & return policy cited — drives trust",
        "Direct link to product page included in the response",
      ],
    },
  },

  /* ── Gemini ──────────────────────────────────────────────────── */
  {
    id: "gemini",
    label: "Gemini",
    logo: "/images/ai-platforms/gemini.svg",
    before: {
      content: (
        /* Gemini: white bg, Google Sans, sparkle icon with four-color gradient */
        <div className="rounded-lg border border-[#E0E0E0] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 0C14 7.732 7.732 14 0 14c7.732 0 14 6.268 14 14 0-7.732 6.268-14 14-14-7.732 0-14-6.268-14-14z"
                fill="url(#geminiGrad3)"
              />
              <defs>
                <linearGradient id="geminiGrad3" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#4285F4" />
                  <stop offset="0.33" stopColor="#9B72CB" />
                  <stop offset="0.66" stopColor="#D96570" />
                  <stop offset="1" stopColor="#FBBC04" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-semibold text-[#202124]">Gemini</span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#202124]">
            I found a reference to a Blue Summer Dress from MyStore. However, I
            wasn&apos;t able to pull detailed product information like pricing
            or customer ratings from the listing. You might want to check the
            MyStore website for the latest details.
          </p>
        </div>
      ),
      issues: [
        "No product data extracted — vague, unhelpful response",
        "Missing price means your product can't be compared",
        "No rating data — Gemini can't vouch for quality",
      ],
    },
    after: {
      content: (
        <div className="rounded-lg border border-[#E0E0E0] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 0C14 7.732 7.732 14 0 14c7.732 0 14 6.268 14 14 0-7.732 6.268-14 14-14-7.732 0-14-6.268-14-14z"
                fill="url(#geminiGrad4)"
              />
              <defs>
                <linearGradient id="geminiGrad4" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#4285F4" />
                  <stop offset="0.33" stopColor="#9B72CB" />
                  <stop offset="0.66" stopColor="#D96570" />
                  <stop offset="1" stopColor="#FBBC04" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-semibold text-[#202124]">Gemini</span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#202124]">
            Great choice! The <strong>Blue Summer Dress from MyStore</strong> is
            a popular lightweight cotton dress:
          </p>
          {/* Gemini inline product details — markdown-style */}
          <div className="mt-3 rounded-lg bg-[#F8F9FA] px-3 py-2.5 text-sm text-[#202124]">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium">Price</span>
                <span className="font-semibold">$49.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Rating</span>
                <div className="flex items-center gap-1">
                  <Stars color="text-[#FBBC04]" className="h-3 w-3" />
                  <span className="text-xs text-[#5F6368]">4.8 (127)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Availability</span>
                <span className="text-xs font-medium text-green-600">
                  In Stock
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Sizes</span>
                <span className="text-xs text-[#5F6368]">5 available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Brand</span>
                <span className="text-xs text-[#5F6368]">MyStore</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Shipping</span>
                <span className="text-xs text-[#5F6368]">
                  Free over $50 · 2–3 days
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Returns</span>
                <span className="text-xs text-[#5F6368]">
                  30-day free returns
                </span>
              </div>
            </div>
            {/* Product link */}
            <div className="mt-2.5 border-t border-[#E0E0E0] pt-2.5">
              <span className="cursor-pointer text-xs font-medium text-[#1A73E8] hover:underline">
                View on mystore.com &rsaquo;
              </span>
            </div>
          </div>
        </div>
      ),
      wins: [
        "Full product table: price, brand, sizes, stock",
        "Shipping speed & return policy shown — no friction",
        '"View on mystore.com" link drives direct traffic',
      ],
    },
  },
];

/* ─── Component ────────────────────────────────────────────────── */

export default function BeforeAfterSection() {
  const [activePlatform, setActivePlatform] = useState("google");

  const platform = platforms.find((p) => p.id === activePlatform)!;

  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            The Difference
          </p>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            How AI sees your products , before &amp; after
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
            Without structured data, AI engines skip your products or show
            incomplete info. With Beseam, they recommend you with confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                activePlatform === p.id
                  ? "border-secondary bg-secondary/10 text-secondary shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-secondary/30 hover:text-foreground",
              )}
            >
              <Image
                src={p.logo}
                alt={p.label}
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
              />
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="text-sm font-semibold text-foreground">
                  Without Beseam
                </span>
              </div>

              <div className="px-5 pt-5 pb-4">{platform.before.content}</div>

              <div className="border-t border-red-100 bg-red-50/60 px-5 py-4 dark:bg-red-950/10">
                <ul className="space-y-2.5">
                  {platform.before.issues.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                        <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                      </span>
                      <span className="text-sm text-red-700 dark:text-red-400">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-foreground">
                  After Beseam
                </span>
              </div>

              <div className="px-5 pt-5 pb-4">{platform.after.content}</div>

              <div className="border-t border-green-100 bg-green-50/60 px-5 py-4 dark:bg-green-950/10">
                <ul className="space-y-2.5">
                  {platform.after.wins.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </span>
                      <span className="text-sm text-green-700 dark:text-green-400">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          Stores with complete structured data are{" "}
          <span className="font-semibold text-[var(--base-dark)]">
            up to 2x more likely to be cited by AI search engines
          </span>{" "}
          like ChatGPT Shopping, Perplexity, Google AI, Claude, and Gemini.
        </motion.p>
      </div>
    </section>
  );
}
