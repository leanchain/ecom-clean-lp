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
            PDP Audit &amp; Baseline
          </div>
          <h2 className="font-heading text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
            Know exactly where your PDPs stand — <span className="text-indigo-300 italic">before</span> making changes.
          </h2>
          <p className="text-base text-indigo-100/90">
            Get a comprehensive baseline report for any product page. Understand
            AI visibility, conversion readiness, and performance gaps — so every
            improvement starts from solid ground.
          </p>
          <div className="grid gap-3 text-sm text-indigo-100/90">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-300" />
              AI visibility score across all major search platforms
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-300" />
              Conversion readiness assessment with prioritized fixes
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-300" />
              Performance baseline for monitoring regressions later
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://app.beseam.com/analyze"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
            >
              Get Your Baseline Report <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:-translate-y-0.5"
            >
              Book a Demo
            </Link>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between text-sm text-indigo-100">
            <span>PDP Quality Baseline</span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold">
              Real-time
            </span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between text-sm text-indigo-100">
              <span>AI Visibility</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-200">
                Good
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-[85%] rounded-full bg-emerald-400" />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-indigo-100">
              <span>Conversion Readiness</span>
              <span className="rounded-full bg-amber-500/15 px-2 py-1 text-amber-200">
                Needs Work
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-[55%] rounded-full bg-amber-400" />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-indigo-100">
              <span>Performance &amp; Structure</span>
              <span className="rounded-full bg-amber-500/15 px-2 py-1 text-amber-200">
                Gaps Found
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-[40%] rounded-full bg-amber-400" />
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-indigo-100">
              &quot;Add FAQ schema, improve product narrative depth, and
              optimize media coverage to reach 90+/100 baseline.&quot;
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-indigo-50">
            <div className="font-semibold text-white">Recommended Playbook</div>
            <div className="mt-2 space-y-2 text-xs text-indigo-100/80">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Generate FAQ section with schema.org markup
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Add deep product narrative (benefits, use cases, comparisons)
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Deploy with staged rollout — monitor for 48h before scaling
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditTryout;
