"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlightedAreas = [
  {
    label: "SEO & Structured Data",
    description:
      "Broken schema blocking rich results, missing meta tags, indexability issues hiding products from search.",
  },
  {
    label: "AI & LLM Discoverability",
    description:
      "Missing merchant info and context that AI shopping assistants need to surface your products.",
  },
  {
    label: "Security & Compliance",
    description:
      "Mixed content, unsafe scripts, and compliance gaps that erode customer trust and trigger browser warnings.",
  },
  {
    label: "Conversion & Content Quality",
    description:
      "Thin descriptions, weak above-the-fold clarity, and low-signal pages hurting conversion and ranking.",
  },
];

const allDomains = [
  "SEO",
  "AI Discoverability",
  "Shopping Feeds",
  "Security",
  "Accessibility",
  "Conversion (CRO)",
  "E-E-A-T",
  "International (i18n)",
  "Compliance",
  "Social / Open Graph",
  "Analytics",
  "Performance / PWA",
  "Geo Targeting",
  "Sustainability",
  "Hydration",
];

export default function SeoScanSection() {
  return (
    <section className="bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-primary/20 bg-card p-8 md:p-12"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left */}
            <div>
              <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
                Plus - Free Store Audit
              </p>
              <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                See everything costing you revenue.{" "}
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Free.
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every Beseam account includes a full audit of your product
                catalog - 118+ checks across 15 domains, from SEO and security
                to AI discoverability and international readiness.
              </p>

              <ul className="mt-6 space-y-4">
                {highlightedAreas.map((area) => (
                  <li key={area.label} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {area.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Screaming Frog
                </span>{" "}
                finds SEO problems.{" "}
                <span className="font-semibold text-foreground">Ahrefs</span>{" "}
                finds SEO problems. Beseam audits{" "}
                <span className="font-semibold text-foreground">
                  everything
                </span>{" "}
                and fixes it with one click.
              </p>

              <a
                href="https://app.beseam.com/store"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Scan my store <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right - domain tags */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                118+ checks across 15 domains
              </p>
              <div className="flex flex-wrap gap-2">
                {allDomains.map((domain) => (
                  <span
                    key={domain}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
                  >
                    {domain}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-border/60 bg-muted/40 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  What you get
                </p>
                {[
                  "Full health report with revenue impact estimate",
                  "AI-fixable vs. manual breakdown per issue",
                  "Push fixes directly to Shopify with rollback",
                  "Weekly re-scans to catch regressions",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 py-1.5 border-b border-border/40 last:border-0"
                  >
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
