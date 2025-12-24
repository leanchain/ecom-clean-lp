import { Sparkles, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const AuditTryout = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#0b1221] to-[#0a0f1d] py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,119,198,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.3),transparent_30%)]" />
      <div className="container relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
            <Sparkles className="h-3 w-3" />
            AI Visibility Audit
          </div>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            See how ChatGPT & Gemini read your PDP — then view the optimized version.
          </h2>
          <p className="text-base text-indigo-100/90">
            Paste any product URL and get a real LLM visibility score, gaps, and a ready-to-ship optimized draft
            (copy, FAQ, schema). No mock data—real scrape, real model output.
          </p>
          <div className="grid gap-3 text-sm text-indigo-100/90">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-300" />
              PII-scrubbed before scoring and model calls
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-300" />
              JSON-LD Product + Offer + FAQ + Rating emitted by the model
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-300" />
              Public endpoint uses tenant 1 with Gemini by default
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ai-visibility-audit"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
            >
              Run free audit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:-translate-y-0.5"
            >
              See plans
            </Link>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between text-sm text-indigo-100">
            <span>LLM Visibility Score</span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold">Real-time</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between text-sm text-indigo-100">
              <span>Title / H1</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-200">Good</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-[90%] rounded-full bg-emerald-400" />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-indigo-100">
              <span>Schema</span>
              <span className="rounded-full bg-amber-500/15 px-2 py-1 text-amber-200">Needs</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-[40%] rounded-full bg-amber-400" />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-indigo-100">
              <span>FAQs / Q&A</span>
              <span className="rounded-full bg-amber-500/15 px-2 py-1 text-amber-200">Needs</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-[30%] rounded-full bg-amber-400" />
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-indigo-100">
              “Add Product + Offer + FAQ schema, 3 more FAQ entries, and alt text for 2 images to reach 90+/100.”
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-indigo-50">
            <div className="font-semibold text-white">Optimized JSON-LD</div>
            <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-black/40 p-3 text-[11px] leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nimbus Trail Runner",
  "offers": { "@type": "Offer", "price": "149.00", "priceCurrency": "USD" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "164" }
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditTryout;
