"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ─── Star helper ──────────────────────────────────────────────── */
function Stars({
  count = 5,
  size = 12,
  className,
  color = "text-[#FBBC04]",
}: {
  count?: number;
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <span className={cn("inline-flex gap-0.5", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </span>
  );
}

/* ─── ChatGPT icon ─────────────────────────────────────────────── */
function ChatGPTIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ─── Gemini sparkle SVG (reusable) ────────────────────────────── */
function GeminiSparkle({ id }: { id: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 0C14 7.732 7.732 14 0 14c7.732 0 14 6.268 14 14 0-7.732 6.268-14 14-14-7.732 0-14-6.268-14-14z"
        fill={`url(#${id})`}
      />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Gemini sparkle (four-color variant) ──────────────────────── */
function GeminiSparkle4({ id }: { id: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 0C14 7.732 7.732 14 0 14c7.732 0 14 6.268 14 14 0-7.732 6.268-14 14-14-7.732 0-14-6.268-14-14z"
        fill={`url(#${id})`}
      />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#4285F4" />
          <stop offset="0.33" stopColor="#9B72CB" />
          <stop offset="0.66" stopColor="#D96570" />
          <stop offset="1" stopColor="#FBBC04" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Perplexity citation badge ────────────────────────────────── */
function PplxCite({ n }: { n: number }) {
  return (
    <span className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-sm bg-[#20808D]/10 text-[9px] font-bold text-[#20808D]">
      {n}
    </span>
  );
}

/* ─── Product data for the ChatGPT carousel cards ──────────────── */
const products = [
  {
    title: "Blue Summer Dress",
    merchant: "MyStore",
    price: "$49.99",
    oldPrice: "$65.00",
    rating: 4.8,
    reviews: 2340,
    badge: "Most Popular",
    badgeColor: "bg-[#10A37F]/10 text-[#10A37F]",
    inStock: true,
    shipping: "Free shipping · 2–3 days",
    image: "bg-gradient-to-br from-sky-200 via-sky-100 to-blue-100",
    emoji: "👗",
  },
  {
    title: "Linen Blend Midi Skirt",
    merchant: "NordStyle",
    price: "$38.00",
    oldPrice: null,
    rating: 4.6,
    reviews: 891,
    badge: "Highly Rated",
    badgeColor: "bg-amber-50 text-amber-700",
    inStock: true,
    shipping: "Free shipping over $50",
    image: "bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50",
    emoji: "👔",
  },
  {
    title: "Cotton Wrap Dress",
    merchant: "Everlane",
    price: "$55.00",
    oldPrice: "$72.00",
    rating: 4.9,
    reviews: 1204,
    badge: null,
    badgeColor: "",
    inStock: true,
    shipping: "Free shipping · 1–2 days",
    image: "bg-gradient-to-br from-emerald-100 via-green-50 to-teal-50",
    emoji: "👚",
  },
  {
    title: "Floral Maxi Dress",
    merchant: "Anthropologie",
    price: "$89.00",
    oldPrice: null,
    rating: 4.7,
    reviews: 567,
    badge: null,
    badgeColor: "",
    inStock: true,
    shipping: "Free shipping · 3–5 days",
    image: "bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50",
    emoji: "🌸",
  },
];

/* ─── ChatGPT comparison table data ────────────────────────────── */
const comparisonAttrs = [
  { label: "Price", values: ["$49.99", "$38.00", "$55.00"] },
  { label: "Rating", values: ["4.8 ★", "4.6 ★", "4.9 ★"] },
  {
    label: "Material",
    values: ["100% Cotton", "Linen Blend", "Organic Cotton"],
  },
  { label: "Fit", values: ["Relaxed", "Slim", "Wrap"] },
  { label: "Sizes", values: ["XS–XXL", "S–XL", "XS–XL"] },
  {
    label: "Shipping",
    values: ["Free · 2–3 days", "Free over $50", "Free · 1–2 days"],
  },
  { label: "Returns", values: ["30-day free", "14-day free", "30-day free"] },
];

/* ─── ChatGPT sub-tabs ────────────────────────────────────────── */
type ChatGPTTab = "before" | "carousel" | "comparison";

const chatgptTabs: { id: ChatGPTTab; label: string }[] = [
  { id: "before", label: "Before" },
  { id: "carousel", label: "Product Cards" },
  { id: "comparison", label: "Comparison" },
];

/* ─── ChatGPT: Before panel ───────────────────────────────────── */
function ChatGPTBeforePanel() {
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10A37F]">
          <ChatGPTIcon className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-[#0D0D0D]">ChatGPT</span>
      </div>
      <div className="space-y-3 text-[14px] leading-relaxed text-[#0D0D0D]">
        <p>
          I found a few options for summer dresses under $80. Here are some
          general recommendations:
        </p>
        <ul className="ml-4 list-disc space-y-1.5 text-[#4D5156]">
          <li>
            <strong>MyStore</strong> has a Blue Summer Dress, though I
            couldn&apos;t confirm pricing or availability from their product
            page.
          </li>
          <li>
            <strong>NordStyle</strong> and <strong>Everlane</strong> both carry
            linen and cotton options. You may want to visit their sites directly
            for current inventory.
          </li>
          <li>
            Try searching for &ldquo;lightweight cotton summer dress&rdquo; on
            these sites for the best results.
          </li>
        </ul>
        <p className="text-[13px] text-[#6E6E80]">
          I wasn&apos;t able to extract detailed product information like
          pricing, reviews, or stock status from these stores. Visiting the
          sites directly would give you the most accurate details.
        </p>
      </div>
      <div className="mt-5 space-y-2 border-t border-[#E5E5E5] pt-4">
        {[
          "No product images — users can't visually browse",
          "No prices or ratings — can't compare options",
          "No merchant or shipping info — low purchase confidence",
          "Generic text response — gets skipped by shoppers",
        ].map((issue) => (
          <div key={issue} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-[9px] text-red-600">
              ✕
            </span>
            <span className="text-[12px] text-red-700/80">{issue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ChatGPT: Product carousel panel ─────────────────────────── */
function ChatGPTCarouselPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10A37F]">
            <ChatGPTIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-[#0D0D0D]">ChatGPT</span>
        </div>
        <p className="text-[14px] leading-relaxed text-[#0D0D0D]">
          Here are the best summer dresses under $80 based on reviews, price,
          and shipping speed:
        </p>
      </div>

      <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 scrollbar-hide">
        {products.map((product) => (
          <div
            key={product.title}
            className="w-[220px] shrink-0 cursor-pointer rounded-xl border border-[#E5E5E5] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              className={cn(
                "relative flex h-[140px] items-center justify-center rounded-t-xl",
                product.image,
              )}
            >
              <span className="text-4xl">{product.emoji}</span>
              {product.badge && (
                <span
                  className={cn(
                    "absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold",
                    product.badgeColor,
                  )}
                >
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-[13px] font-semibold leading-tight text-[#0D0D0D]">
                {product.title}
              </p>
              <p className="mt-0.5 text-[11px] text-[#6E6E80]">
                {product.merchant}
              </p>
              <div className="mt-1.5 flex items-center gap-1">
                <Stars count={5} size={10} />
                <span className="text-[10px] text-[#6E6E80]">
                  {product.rating} ({product.reviews.toLocaleString()})
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#0D0D0D]">
                  {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-[11px] text-[#6E6E80] line-through">
                    {product.oldPrice}
                  </span>
                )}
              </div>
              <div className="mt-2 space-y-0.5">
                <p className="text-[10px] text-[#6E6E80]">
                  {product.inStock ? "✓ In Stock" : "Out of Stock"} ·{" "}
                  {product.shipping}
                </p>
              </div>
              <div className="mt-3 flex gap-1.5">
                <button className="flex-1 rounded-lg bg-[#0D0D0D] px-2.5 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#2D2D2D]">
                  View Product
                </button>
                <button className="rounded-lg border border-[#E5E5E5] px-2.5 py-1.5 text-[10px] font-medium text-[#6E6E80] transition-colors hover:bg-[#F7F7F8]">
                  Ask about this
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#E5E5E5] bg-[#F7F7F8] p-4 shadow-sm">
        <p className="text-[13px] font-semibold text-[#0D0D0D]">
          AI Review Summary
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[#4D5156]">
          Customers love the <strong>Blue Summer Dress</strong> for its
          lightweight feel and relaxed fit. Popular for beach trips and casual
          outings. Some note sizing runs slightly large — consider ordering one
          size down.
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            "Source: 2,340 reviews",
            "Reddit",
            "The Verge",
            "GoodDresses.com",
          ].map((source) => (
            <span
              key={source}
              className="rounded-full border border-[#E5E5E5] bg-white px-2 py-0.5 text-[9px] font-medium text-[#6E6E80]"
            >
              {source}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ChatGPT: Comparison table panel ─────────────────────────── */
function ChatGPTComparisonPanel() {
  const topProducts = products.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10A37F]">
            <ChatGPTIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-[#0D0D0D]">ChatGPT</span>
        </div>
        <p className="text-[14px] leading-relaxed text-[#0D0D0D]">
          Here&apos;s a side-by-side comparison of the top 3 options:
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-sm">
        <div className="grid grid-cols-[100px_1fr_1fr_1fr] border-b border-[#E5E5E5] bg-[#F7F7F8]">
          <div className="p-3" />
          {topProducts.map((p) => (
            <div
              key={p.title}
              className="border-l border-[#E5E5E5] p-3 text-center"
            >
              <div
                className={cn(
                  "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg",
                  p.image,
                )}
              >
                <span className="text-xl">{p.emoji}</span>
              </div>
              <p className="text-[11px] font-semibold leading-tight text-[#0D0D0D]">
                {p.title}
              </p>
              <p className="text-[9px] text-[#6E6E80]">{p.merchant}</p>
              {p.badge && (
                <span
                  className={cn(
                    "mt-1 inline-block rounded-full px-1.5 py-0.5 text-[8px] font-bold",
                    p.badgeColor,
                  )}
                >
                  {p.badge}
                </span>
              )}
            </div>
          ))}
        </div>
        {comparisonAttrs.map((attr, i) => (
          <div
            key={attr.label}
            className={cn(
              "grid grid-cols-[100px_1fr_1fr_1fr]",
              i < comparisonAttrs.length - 1 && "border-b border-[#F0F0F0]",
            )}
          >
            <div className="flex items-center p-3 text-[11px] font-semibold text-[#0D0D0D]">
              {attr.label}
            </div>
            {attr.values.map((val, j) => (
              <div
                key={`${attr.label}-${j}`}
                className="flex items-center justify-center border-l border-[#F0F0F0] p-3 text-center text-[11px] text-[#4D5156]"
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#10A37F]/20 bg-[#10A37F]/5 p-4 shadow-sm">
        <p className="text-[13px] font-semibold text-[#0D0D0D]">
          💡 ChatGPT&apos;s Pick
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[#4D5156]">
          The <strong>Cotton Wrap Dress</strong> from Everlane offers the best
          balance of quality (4.9★), fastest shipping (1–2 days), and organic
          cotton material. The <strong>Blue Summer Dress</strong> is the most
          popular choice with 2,340 reviews if social proof matters most.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Supporting platform data
   ═══════════════════════════════════════════════════════════════════ */

interface SupportingPlatform {
  id: string;
  label: string;
  logo: string;
  before: { content: ReactNode; issues: string[] };
  after: { content: ReactNode; wins: string[] };
}

const supportingPlatforms: SupportingPlatform[] = [
  /* ══ GOOGLE SEARCH ═══════════════════════════════════════════════
     Before: plain blue-link snippet, no enrichments
     After:  shopping module — enriched listing + product image strip
     ════════════════════════════════════════════════════════════════ */
  {
    id: "google",
    label: "Google",
    logo: "/images/ai-platforms/google.svg",

    before: {
      content: (
        <div className="rounded-lg border border-[#DADCE0] bg-white p-4">
          <p className="text-xs text-[#4D5156]">
            www.mystore.com &rsaquo; products &rsaquo; blue-summer-dress
          </p>
          <p className="mt-1 text-lg font-medium text-[#1A0DAB] underline decoration-[#1A0DAB]/30">
            Blue Summer Dress &mdash; MyStore
          </p>
          <p className="mt-1 text-sm leading-snug text-[#4D5156]">
            Buy Blue Summer Dress at MyStore. Wide selection of summer dresses
            available online. Shop now.
          </p>
        </div>
      ),
      issues: [
        "Plain blue link — no images, stars, or price in SERP",
        "Generic meta description gets ignored by shoppers",
        "Zero structured data — invisible to Shopping Graph",
      ],
    },

    after: {
      content: (
        <div className="space-y-2.5">
          {/* Enhanced search listing */}
          <div className="rounded-lg border border-[#DADCE0] bg-white p-4">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#F1F3F4]">
                <span className="text-[9px] font-bold text-[#5F6368]">M</span>
              </div>
              <div>
                <span className="font-medium text-[#202124]">MyStore</span>
                <span className="text-[#4D5156]">
                  {" "}
                  &rsaquo; products &rsaquo; summer-dresses
                </span>
              </div>
            </div>
            <p className="mt-1.5 cursor-pointer text-[18px] font-medium leading-tight text-[#1A0DAB] hover:underline">
              Summer Dresses Collection &mdash; MyStore
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <Stars color="text-[#E8710A]" size={13} />
              <span className="text-xs text-[#70757A]">
                4.8 (2,340) · $38–$89 · In stock
              </span>
            </div>
            <p className="mt-1 text-[13px] leading-snug text-[#4D5156]">
              Lightweight cotton &amp; linen summer dresses. Free shipping over
              $50. 30-day returns. Rated 4.8/5 from 2,340 verified reviews.
            </p>
          </div>

          {/* Shopping product strip */}
          <div className="overflow-hidden rounded-lg border border-[#DADCE0] bg-white">
            <div className="flex items-center justify-between border-b border-[#F0F0F0] px-3.5 py-2">
              <span className="text-[12px] font-medium text-[#202124]">
                Popular products
              </span>
              <span className="cursor-pointer text-[11px] text-[#1A73E8] hover:underline">
                View all
              </span>
            </div>
            <div className="flex divide-x divide-[#F0F0F0]">
              {[
                {
                  emoji: "👗",
                  title: "Blue Summer Dress",
                  merchant: "MyStore",
                  price: "$49.99",
                  rating: "4.8",
                  shipping: "Free shipping",
                  bg: "from-sky-100 to-blue-50",
                  colors: ["bg-sky-300", "bg-rose-300", "bg-amber-200"],
                },
                {
                  emoji: "👔",
                  title: "Linen Midi Skirt",
                  merchant: "NordStyle",
                  price: "$38.00",
                  rating: "4.6",
                  shipping: "Free over $50",
                  bg: "from-amber-100 to-orange-50",
                  colors: ["bg-stone-300", "bg-slate-700"],
                },
                {
                  emoji: "👚",
                  title: "Cotton Wrap Dress",
                  merchant: "Everlane",
                  price: "$55.00",
                  rating: "4.9",
                  shipping: "Free shipping",
                  bg: "from-emerald-100 to-teal-50",
                  colors: ["bg-emerald-300", "bg-sky-200", "bg-rose-200"],
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="w-1/3 shrink-0 cursor-pointer p-3 transition-colors hover:bg-[#F8F9FA]"
                >
                  <div
                    className={cn(
                      "mb-2 flex h-[72px] items-center justify-center rounded-lg bg-gradient-to-br",
                      p.bg,
                    )}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                  </div>
                  <p className="line-clamp-2 text-[11px] font-medium leading-tight text-[#202124]">
                    {p.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#70757A]">
                    {p.merchant}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <Stars color="text-[#E8710A]" size={8} />
                    <span className="text-[9px] text-[#70757A]">
                      {p.rating}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] font-semibold text-[#202124]">
                    {p.price}
                  </p>
                  <p className="text-[9px] text-[#70757A]">{p.shipping}</p>
                  {/* Color swatches */}
                  <div className="mt-1.5 flex gap-1">
                    {p.colors.map((c, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-3 w-3 rounded-full border border-[#DADCE0]",
                          c,
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      wins: [
        "Shopping module with product images — 3× higher CTR",
        "Price range, variants & stock visible before the click",
        "Multi-product strip captures comparison shoppers",
      ],
    },
  },

  /* ══ AI OVERVIEW ═════════════════════════════════════════════════
     Before: vague summary + empty product card
     After:  answer-first block + inline citations + source pills
             + optional "best options" chip row — NOT a shopping app
     ════════════════════════════════════════════════════════════════ */
  {
    id: "google-ai",
    label: "AI Overview",
    logo: "/images/ai-platforms/ai-mode.svg",

    before: {
      content: (
        <div className="rounded-lg border border-[#C2D7F5] bg-[#E8F0FE] p-4">
          <div className="mb-3 flex items-center gap-2">
            <GeminiSparkle id="aiBefore" />
            <span className="text-sm font-semibold text-[#202124]">
              AI Overview
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#202124]">
            I found several summer dresses from various stores. MyStore appears
            to carry a Blue Summer Dress, though I couldn&apos;t confirm pricing
            or reviews from their product page.
          </p>
          <div className="mt-3 rounded-lg border border-[#DADCE0] bg-white px-3 py-2.5">
            <p className="text-xs font-medium text-[#202124]">
              Blue Summer Dress — MyStore
            </p>
            <p className="text-[11px] text-[#70757A]">
              Price unavailable · No reviews
            </p>
          </div>
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
            <GeminiSparkle id="aiAfter" />
            <span className="text-sm font-semibold text-[#202124]">
              AI Overview
            </span>
          </div>

          {/* Answer-first summary with inline citations */}
          <div className="text-[14px] leading-relaxed text-[#202124]">
            <p>
              The <strong>Blue Summer Dress from MyStore</strong> is a top-rated
              lightweight cotton option at{" "}
              <strong>$49.99</strong>.{" "}
              <span className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#1A73E8]/10 text-[9px] font-bold text-[#1A73E8]">
                1
              </span>{" "}
              It holds a 4.8/5 rating from 2,340 reviews, with customers citing
              its relaxed fit and breathable material.{" "}
              <span className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#1A73E8]/10 text-[9px] font-bold text-[#1A73E8]">
                2
              </span>{" "}
              Free shipping over $50 with 30-day returns.{" "}
              <span className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#1A73E8]/10 text-[9px] font-bold text-[#1A73E8]">
                3
              </span>
            </p>
          </div>

          {/* Best options chip row */}
          <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
            {[
              {
                emoji: "👗",
                title: "Blue Summer Dress",
                detail: "$49.99 · MyStore",
              },
              {
                emoji: "👚",
                title: "Cotton Wrap Dress",
                detail: "$55.00 · Everlane",
              },
              {
                emoji: "👔",
                title: "Linen Midi Skirt",
                detail: "$38.00 · NordStyle",
              },
            ].map((opt) => (
              <div
                key={opt.title}
                className="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-[#DADCE0] bg-white px-3 py-1.5 transition-shadow hover:shadow-sm"
              >
                <span className="text-base">{opt.emoji}</span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-[#202124]">
                    {opt.title}
                  </p>
                  <p className="text-[10px] text-[#70757A]">{opt.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Source pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              "mystore.com",
              "nordstyle.com",
              "2,340 verified reviews",
            ].map((s) => (
              <div
                key={s}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#D2E3FC] bg-white/80 px-2.5 py-1 transition-colors hover:bg-[#D2E3FC]/50"
              >
                <div className="h-3 w-3 rounded-full bg-[#1A73E8]/20" />
                <span className="text-[10px] font-medium text-[#1A73E8]">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      wins: [
        "Cited in AI-generated summary — highest trust position",
        "Source pills drive verified traffic from answer boxes",
        "Product chips below answer capture purchase-intent clicks",
      ],
    },
  },

  /* ══ PERPLEXITY ══════════════════════════════════════════════════
     Before: text-only paragraph with one citation
     After:  visual product recommendation cards with "why" reasoning
     ════════════════════════════════════════════════════════════════ */
  {
    id: "perplexity",
    label: "Perplexity",
    logo: "/images/ai-platforms/perplexity.svg",

    before: {
      content: (
        <div className="rounded-lg border border-[#E8E6DF] bg-[#FBFAF4] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-md bg-[#F0EDE6] px-2 py-1">
              <div className="h-3.5 w-3.5 rounded-sm bg-[#D4D0C8]" />
              <span className="text-[10px] text-[#6B6860]">mystore.com</span>
            </div>
          </div>
          <p className="text-[14px] leading-relaxed text-[#091717]">
            I found a page for a Blue Summer Dress on mystore.com, but limited
            details are available.{" "}
            <PplxCite n={1} /> The page meta description says &ldquo;Buy Blue
            Summer Dress at MyStore. Shop now.&rdquo; I&apos;d recommend
            checking the site directly for current pricing.
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
          {/* Source chips */}
          <div className="mb-3 flex items-center gap-2">
            {[
              { name: "mystore.com", active: true },
              { name: "nordstyle.com", active: false },
              { name: "+2 sources", active: false },
            ].map((s) => (
              <div
                key={s.name}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors",
                  s.active
                    ? "cursor-pointer bg-[#20808D]/10 hover:bg-[#20808D]/20"
                    : "bg-[#F0EDE6]",
                )}
              >
                <div
                  className={cn(
                    "h-3.5 w-3.5 rounded-sm",
                    s.active ? "bg-[#20808D]/30" : "bg-[#D4D0C8]",
                  )}
                />
                <span
                  className={cn(
                    "text-[10px]",
                    s.active
                      ? "font-medium text-[#20808D]"
                      : "text-[#6B6860]",
                  )}
                >
                  {s.name}
                </span>
              </div>
            ))}
          </div>

          {/* Intro text */}
          <p className="text-[14px] leading-relaxed text-[#091717]">
            Based on reviews, pricing, and shipping policies, here are the best
            summer dresses under $80:
          </p>

          {/* Product recommendation cards */}
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {[
              {
                emoji: "👗",
                title: "Blue Summer Dress",
                price: "$49.99",
                merchant: "MyStore",
                rating: "4.8",
                reviews: "2,340",
                bg: "from-sky-100 to-blue-50",
                why: "Top-rated for comfort, fast shipping, and best value in cotton dresses.",
                cite: 1,
              },
              {
                emoji: "👚",
                title: "Cotton Wrap Dress",
                price: "$55.00",
                merchant: "Everlane",
                rating: "4.9",
                reviews: "1,204",
                bg: "from-emerald-100 to-teal-50",
                why: "Highest rating. Organic cotton, 1–2 day shipping. Runs true to size.",
                cite: 2,
              },
              {
                emoji: "👔",
                title: "Linen Midi Skirt",
                price: "$38.00",
                merchant: "NordStyle",
                rating: "4.6",
                reviews: "891",
                bg: "from-amber-100 to-orange-50",
                why: "Lowest price. Versatile linen blend, good for warm climates.",
                cite: 3,
              },
              {
                emoji: "🌸",
                title: "Floral Maxi Dress",
                price: "$89.00",
                merchant: "Anthropologie",
                rating: "4.7",
                reviews: "567",
                bg: "from-pink-100 to-rose-50",
                why: "Premium quality. Statement piece for events. Free returns.",
                cite: 4,
              },
            ].map((p) => (
              <div
                key={p.title}
                className="cursor-pointer rounded-xl border border-[#E8E6DF] bg-white p-3 transition-shadow hover:shadow-sm"
              >
                <div
                  className={cn(
                    "mb-2 flex h-[56px] items-center justify-center rounded-lg bg-gradient-to-br",
                    p.bg,
                  )}
                >
                  <span className="text-xl">{p.emoji}</span>
                </div>
                <p className="text-[12px] font-semibold text-[#091717]">
                  {p.title}
                </p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-[12px] font-bold text-[#091717]">
                    {p.price}
                  </span>
                  <span className="text-[10px] text-[#6B6860]">
                    · {p.merchant}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <Stars color="text-[#FBBC04]" size={9} />
                  <span className="text-[9px] text-[#6B6860]">
                    {p.rating} ({p.reviews})
                  </span>
                </div>
                {/* Why recommended */}
                <p className="mt-2 text-[10px] leading-snug text-[#20808D]">
                  <PplxCite n={p.cite} /> {p.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
      wins: [
        "Visual product cards with images, prices & ratings",
        "Source-backed 'why' reasoning builds shopper confidence",
        "4-product grid outperforms text-only competitors",
      ],
    },
  },

  /* ══ CLAUDE ══════════════════════════════════════════════════════
     Before: generic "visit the store" paragraph
     After:  research memo — structured findings, considerations, sources
     ════════════════════════════════════════════════════════════════ */
  {
    id: "claude",
    label: "Claude",
    logo: "/images/ai-platforms/claude.svg",

    before: {
      content: (
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
        "Vague mention instead of a confident recommendation",
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

          {/* Research intro */}
          <p className="font-serif text-[14px] leading-relaxed text-[#3D3929]">
            I&apos;ve compared pricing, reviews, and return policies across
            several stores for lightweight summer dresses under $80. Here&apos;s
            what I found:
          </p>

          {/* Structured findings */}
          <div className="mt-3 space-y-2.5">
            {/* Best Overall */}
            <div className="rounded-lg bg-[#EDECE7] px-3.5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#AE5630]">
                Best Overall
              </p>
              <p className="mt-1 font-serif text-[13px] font-semibold text-[#3D3929]">
                Blue Summer Dress — MyStore · $49.99
              </p>
              <p className="mt-0.5 font-serif text-[12px] leading-snug text-[#6B6356]">
                Highest-rated at 4.8/5 from 2,340 reviews. Lightweight cotton,
                relaxed fit. Free shipping over $50 with 30-day returns.
              </p>
            </div>

            {/* Best Value */}
            <div className="rounded-lg bg-[#EDECE7] px-3.5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#AE5630]">
                Best Value
              </p>
              <p className="mt-1 font-serif text-[13px] font-semibold text-[#3D3929]">
                Linen Blend Midi Skirt — NordStyle · $38.00
              </p>
              <p className="mt-0.5 font-serif text-[12px] leading-snug text-[#6B6356]">
                Lowest price with strong 4.6/5 rating (891 reviews). Linen
                blend, versatile styling. Ships free over $50.
              </p>
            </div>

            {/* Key Considerations */}
            <div className="px-0.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B6356]">
                Key Considerations
              </p>
              <ul className="mt-1.5 space-y-1 font-serif text-[12px] text-[#3D3929]">
                <li>&bull; MyStore dress runs slightly large — consider sizing down</li>
                <li>&bull; NordStyle ships free only on orders over $50</li>
                <li>&bull; Both stores accept returns within 14–30 days</li>
              </ul>
            </div>
          </div>

          {/* Sources */}
          <div className="mt-3 border-t border-[#E5E3DD] pt-3">
            <p className="text-[10px] font-medium text-[#6B6356]">Sources</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {[
                "mystore.com product page",
                "2,340 verified reviews",
                "NordStyle catalog",
              ].map((s) => (
                <span
                  key={s}
                  className="cursor-pointer rounded-full bg-[#EDECE7] px-2 py-0.5 text-[9px] text-[#AE5630] transition-colors hover:bg-[#E5E3DD]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
      wins: [
        "Research memo with Best Overall / Best Value structure",
        "Key considerations help shoppers decide confidently",
        "Source references build trust with research-oriented buyers",
      ],
    },
  },

  /* ══ GEMINI ══════════════════════════════════════════════════════
     Before: vague text, can't extract anything
     After:  comparison table + "where to buy" merchant rows
     ════════════════════════════════════════════════════════════════ */
  {
    id: "gemini",
    label: "Gemini",
    logo: "/images/ai-platforms/gemini.svg",

    before: {
      content: (
        <div className="rounded-lg border border-[#E0E0E0] bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <GeminiSparkle4 id="geminiBefore" />
            <span className="text-sm font-semibold text-[#202124]">Gemini</span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#202124]">
            I found a reference to a Blue Summer Dress from MyStore. However, I
            wasn&apos;t able to pull detailed product information like pricing or
            customer ratings from the listing. You might want to check the
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
            <GeminiSparkle4 id="geminiAfter" />
            <span className="text-sm font-semibold text-[#202124]">Gemini</span>
          </div>

          {/* Conversational intro */}
          <p className="text-[14px] leading-relaxed text-[#202124]">
            I compared 3 popular summer dresses under $80 across price, quality,
            and shipping:
          </p>

          {/* Comparison table */}
          <div className="mt-3 overflow-hidden rounded-lg border border-[#E0E0E0]">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-[#F8F9FA]">
                  <th className="px-2.5 py-2 text-left font-medium text-[#5F6368]" />
                  <th className="px-2.5 py-2 text-center font-medium text-[#202124]">
                    Blue Summer Dress
                  </th>
                  <th className="px-2.5 py-2 text-center font-medium text-[#202124]">
                    Linen Midi Skirt
                  </th>
                  <th className="px-2.5 py-2 text-center font-medium text-[#202124]">
                    Cotton Wrap Dress
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Price",
                    a: "$49.99",
                    b: "$38.00",
                    c: "$55.00",
                  },
                  {
                    label: "Rating",
                    a: "4.8 ★ (2,340)",
                    b: "4.6 ★ (891)",
                    c: "4.9 ★ (1,204)",
                  },
                  {
                    label: "Material",
                    a: "100% Cotton",
                    b: "Linen Blend",
                    c: "Organic Cotton",
                  },
                  {
                    label: "Shipping",
                    a: "Free · 2–3 days",
                    b: "Over $50 · 3–5 days",
                    c: "Free · 1–2 days",
                  },
                  {
                    label: "Returns",
                    a: "30-day",
                    b: "14-day",
                    c: "30-day",
                  },
                  {
                    label: "Best for",
                    a: "Everyday wear",
                    b: "Budget pick",
                    c: "Premium quality",
                  },
                ].map((row, i, arr) => (
                  <tr
                    key={row.label}
                    className={cn(
                      i < arr.length - 1 && "border-b border-[#F0F0F0]",
                    )}
                  >
                    <td className="px-2.5 py-2 font-medium text-[#5F6368]">
                      {row.label}
                    </td>
                    <td className="px-2.5 py-2 text-center text-[#202124]">
                      {row.a}
                    </td>
                    <td className="px-2.5 py-2 text-center text-[#202124]">
                      {row.b}
                    </td>
                    <td className="px-2.5 py-2 text-center text-[#202124]">
                      {row.c}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Where to buy */}
          <div className="mt-3">
            <p className="mb-2 text-[12px] font-medium text-[#202124]">
              Where to buy
            </p>
            <div className="space-y-1.5">
              {[
                {
                  name: "MyStore",
                  product: "Blue Summer Dress",
                  price: "$49.99",
                  shipping: "Free · 2–3 days",
                },
                {
                  name: "Everlane",
                  product: "Cotton Wrap Dress",
                  price: "$55.00",
                  shipping: "Free · 1–2 days",
                },
                {
                  name: "NordStyle",
                  product: "Linen Midi Skirt",
                  price: "$38.00",
                  shipping: "Free over $50",
                },
              ].map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between rounded-lg bg-[#F8F9FA] px-3 py-2 transition-colors hover:bg-[#F1F3F4]"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-[#E0E0E0]">
                      <span className="text-[8px] font-bold text-[#5F6368]">
                        {m.name[0]}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-[#202124]">
                        {m.name}
                      </span>
                      <span className="ml-1 text-[10px] text-[#5F6368]">
                        · {m.product}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-[#202124]">
                      {m.price}
                    </span>
                    <span className="hidden text-[10px] text-[#5F6368] sm:inline">
                      {m.shipping}
                    </span>
                    <span className="cursor-pointer text-[10px] font-medium text-[#1A73E8] hover:underline">
                      Visit &rsaquo;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      wins: [
        "Comparison table lets shoppers decide at a glance",
        "Where-to-buy rows drive traffic directly to your store",
        "Multi-merchant pricing shows your competitive advantage",
      ],
    },
  },
];

/* ─── Platform tab definitions (ChatGPT first, then supporting) ── */
const platformTabs = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    logo: "/images/ai-platforms/chatgpt.svg",
    featured: true,
  },
  ...supportingPlatforms.map((p) => ({
    id: p.id,
    label: p.label,
    logo: p.logo,
    featured: false,
  })),
];

/* ─── Supporting platform: Before/After side-by-side ──────────── */
function SupportingPlatformView({
  platform,
}: {
  platform: SupportingPlatform;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Before */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="text-sm font-semibold text-white/80">
            Without Beseam
          </span>
        </div>
        <div className="px-4 pb-3 pt-4">{platform.before.content}</div>
        <div className="border-t border-red-500/10 bg-red-500/[0.04] px-4 py-3">
          <ul className="space-y-2">
            {platform.before.issues.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/15">
                  <X className="h-2.5 w-2.5 text-red-400" />
                </span>
                <span className="text-[12px] leading-snug text-red-300/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* After */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-semibold text-white/80">
            After Beseam
          </span>
        </div>
        <div className="px-4 pb-3 pt-4">{platform.after.content}</div>
        <div className="border-t border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-3">
          <ul className="space-y-2">
            {platform.after.wins.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                  <Check className="h-2.5 w-2.5 text-emerald-400" />
                </span>
                <span className="text-[12px] leading-snug text-emerald-300/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────── */
export default function BeforeAfterAISection() {
  const [activePlatform, setActivePlatform] = useState("chatgpt");
  const [chatgptTab, setChatgptTab] = useState<ChatGPTTab>("carousel");

  const isChatGPT = activePlatform === "chatgpt";
  const currentSupporting = supportingPlatforms.find(
    (p) => p.id === activePlatform,
  );

  return (
    <section className="relative bg-[#0D0D0D] px-4 py-20 sm:px-6 md:py-32">
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,163,127,0.08),transparent_70%)]"
        aria-hidden
      />

      <div className="container relative max-w-6xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#10A37F]">
            AI Product Discovery
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
            How AI sees your products{" "}
            <span className="bg-linear-to-r from-[#10A37F] to-[#1A73E8] bg-clip-text text-transparent">
              before &amp; after
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            Without structured data, AI engines show your products as generic
            text mentions. With Beseam, they appear as rich, shoppable cards
            with images, prices, reviews, and side-by-side comparisons — across
            every major AI platform.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mb-8 flex flex-wrap items-center justify-center gap-2"
        >
          {platformTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePlatform(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                activePlatform === tab.id
                  ? "border-white/20 bg-white text-[#0D0D0D] shadow-sm"
                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white",
              )}
            >
              <Image
                src={tab.logo}
                alt={tab.label}
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
              />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.featured && activePlatform === tab.id && (
                <span className="hidden rounded-full bg-[#10A37F]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#10A37F] sm:inline">
                  Featured
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* ChatGPT sub-tabs (only when ChatGPT is active) */}
        <AnimatePresence mode="wait">
          {isChatGPT && (
            <motion.div
              key="chatgpt-subtabs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mx-auto mb-8 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
                {chatgptTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setChatgptTab(tab.id)}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-medium transition-all",
                      chatgptTab === tab.id
                        ? "bg-white text-[#0D0D0D] shadow-sm"
                        : "text-white/60 hover:text-white",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content area */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <AnimatePresence mode="wait">
            {isChatGPT ? (
              <motion.div
                key={`chatgpt-${chatgptTab}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="mx-auto max-w-4xl"
              >
                {chatgptTab === "before" && <ChatGPTBeforePanel />}
                {chatgptTab === "carousel" && <ChatGPTCarouselPanel />}
                {chatgptTab === "comparison" && <ChatGPTComparisonPanel />}
              </motion.div>
            ) : currentSupporting ? (
              <motion.div
                key={activePlatform}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <SupportingPlatformView platform={currentSupporting} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 grid gap-4 sm:grid-cols-4"
        >
          {[
            {
              stat: "Visual Cards",
              label: "Product images, prices & ratings shown inline",
            },
            {
              stat: "Comparisons",
              label: "Side-by-side with specs, pros & cons",
            },
            {
              stat: "AI Reviews",
              label: "Summarized from Reddit, blogs & review sites",
            },
            {
              stat: "1-Click Buy",
              label: "Instant Checkout via Stripe for eligible products",
            },
          ].map((item) => (
            <div
              key={item.stat}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center"
            >
              <p className="text-sm font-bold text-white">{item.stat}</p>
              <p className="mt-1 text-[11px] leading-snug text-white/40">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center text-sm text-white/40"
        >
          Stores with complete structured data are{" "}
          <span className="font-semibold text-white/70">
            up to 3× more likely to appear as rich product cards
          </span>{" "}
          in ChatGPT, Perplexity, Google AI, and other AI shopping assistants.
        </motion.p>
      </div>
    </section>
  );
}
