"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingUp,
  Shield,
  Search,
  BarChart3,
  FileCode2,
  Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function FeaturedPartners({
  showCTA = false,
}: {
  showCTA?: boolean;
}) {
  return (
    <section
      id="featured-partners"
      className="relative overflow-hidden py-24 md:py-32 bg-background"
    >
      {/* Background glow effects */}
      <div className="absolute -left-24 top-1/3 -z-10 h-[500px] w-[500px] bg-secondary/5 blur-[120px] rounded-full" />
      <div className="absolute -right-24 bottom-1/3 -z-10 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-foreground text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {process.env.NEXT_PUBLIC_RELEASE_GUARD === "true"
                ? "Partner With Beseam"
                : "Built for the Commerce Ecosystem"}
            </h2>
            <p className="mt-6 text-muted-foreground/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              {process.env.NEXT_PUBLIC_RELEASE_GUARD === "true"
                ? "Agencies, creators, and platform teams help brands ship PDP improvements safely at scale."
                : "Earn 30% referral commission for 12 months by bringing teams who want guardrails for every PDP change."}
            </p>
          </motion.div>
        </div>

        <div className="grid max-w-5xl gap-6 mx-auto md:grid-cols-2">
          {/* Dev & Implementation Agencies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group flex flex-col rounded-2xl border bg-card shadow-sm transition-all hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
          >
            {/* Card header */}
            <div className="relative overflow-hidden p-6 md:p-8 border-b border-border/40 bg-muted/20">
              {/* Grid pattern background */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                  backgroundSize: "28px 28px",
                }}
              />
              {/* Glow blob */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />
              <div className="relative z-10">
                <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary mb-4">
                  Agency Partner
                </span>
                <h3 className="font-heading text-xl font-bold text-card-foreground mb-2">
                  Dev &amp; Implementation Agencies
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Deliver PDP upgrades as a service — with versioning,
                  monitoring, and rollback built in. Build a recurring
                  high-margin service on top of Beseam.
                </p>
              </div>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-0 flex-1">
              {/* You deliver */}
              <div className="p-6 md:p-8 border-r border-border/40">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                  You deliver
                </p>
                <ul className="space-y-3">
                  {[
                    { icon: Search, label: "PDP audit + roadmap" },
                    { icon: FileCode2, label: "Upgrade assets + copy" },
                    { icon: Layers, label: "Structured schema" },
                    { icon: BarChart3, label: "Deploy + KPI reporting" },
                  ].map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground leading-snug">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client gets */}
              <div className="p-6 md:p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-4">
                  Client gets
                </p>
                <ul className="space-y-3">
                  {[
                    { icon: Search, label: "Discoverable PDPs" },
                    { icon: Zap, label: "Faster iteration" },
                    { icon: TrendingUp, label: "Higher conversion" },
                    { icon: Shield, label: "Revenue protection" },
                  ].map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                        <CheckCircle2 className="h-3 w-3 text-secondary" />
                      </div>
                      <span className="text-xs font-medium text-foreground leading-snug">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card footer */}
            <div className="p-6 md:p-8 border-t border-border/40 bg-muted/20">
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4"
              >
                Apply as an Agency Partner
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* SEO / GEO Agencies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group flex flex-col rounded-2xl border bg-card shadow-sm transition-all hover:shadow-xl hover:border-secondary/20 hover:-translate-y-1"
          >
            {/* Card header */}
            <div className="relative overflow-hidden p-6 md:p-8 border-b border-border/40">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
              {/* Glow blob */}
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative z-10">
                <span className="inline-flex items-center rounded-full bg-secondary/10 border border-secondary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary mb-4">
                  SEO / GEO Partner
                </span>
                <h3 className="font-heading text-xl font-bold text-card-foreground mb-2">
                  SEO / GEO Agencies
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Deliver on-page upgrades and structured data with confidence.
                  Beseam versions every change and monitors KPIs to protect your
                  clients&apos; revenue.
                </p>
              </div>
            </div>

            {/* KPI metrics preview */}
            <div className="p-6 md:p-8 border-b border-border/40">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
                What your clients see after deploy
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Rev / Session",
                    value: "↑8%",
                    color: "text-emerald-600",
                  },
                  {
                    label: "Checkout rate",
                    value: "↑12%",
                    color: "text-emerald-600",
                  },
                  {
                    label: "Conversion",
                    value: "↑5%",
                    color: "text-emerald-600",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-muted/40 border border-border/40 p-3 text-center"
                  >
                    <p className={`text-base font-black ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-1 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What they ship */}
            <div className="p-6 md:p-8 flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-4">
                What you ship
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "FAQ Schema",
                  "Product Narratives",
                  "Structured Data",
                  "Meta Descriptions",
                  "AI Visibility Fixes",
                  "Conversion Copy",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted/60 border border-border/40 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card footer */}
            <div className="p-6 md:p-8 border-t border-border/40 bg-muted/20">
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:underline underline-offset-4"
              >
                Apply as an SEO Partner
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-primary/20"
            >
              <Link href="/demo">Partner Program</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-10 h-14 text-base font-bold border-2"
            >
              <Link href="/demo">Apply to be a Partner</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
