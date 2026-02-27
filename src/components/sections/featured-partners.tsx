"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Zap,
  ArrowRight,
  Share2,
  Users,
  CreditCard,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const PARTNER_LOGOS = [
  { name: "Shopify", src: "/logos/integrations/shopify.svg" },
  { name: "BigCommerce", src: "/logos/integrations/bigcommerce.svg" },
  { name: "Salesforce Commerce Cloud", src: "/logos/integrations/sfcc.svg" },
  { name: "WooCommerce", src: "/logos/integrations/woocommerce.svg" },
  { name: "Adobe Commerce", src: "/logos/integrations/adobe-commerce.svg" },
  { name: "Google Merchant", src: "/logos/integrations/google-merchant.svg" },
];

export default function FeaturedPartners({
  showCTA = true,
}: {
  showCTA?: boolean;
}) {
  return (
    <section
      id="featured-partners"
      className="relative overflow-hidden py-24 md:py-32 bg-background"
    >
      {/* Background glow effects */}
      <div className="absolute -left-24 top-1/3 -z-10 h-[500px] w-[500px] bg-secondary/5 blur-[120px] rounded-full hidden sm:block" />
      <div className="absolute -right-24 bottom-1/3 -z-10 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full hidden sm:block" />

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

        <div className="grid max-w-6xl gap-10 sm:gap-12 md:gap-16 mx-auto md:grid-cols-2">
          {/* Innovation Partners */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group flex flex-col overflow-hidden rounded-[2.5rem] border bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1 mb-10 sm:mb-0"
          >
            <div className="relative aspect-[4/3] bg-muted/20">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl hidden sm:block" />

              <div className="absolute inset-x-8 top-8 flex items-center justify-between z-10">
                <span className="rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Agency Partner
                </span>
                <span className="rounded-full bg-secondary/10 border border-secondary/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
                  Your client
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-10">
                <div className="w-full max-w-md rounded-3xl border bg-background/90 p-6 shadow-2xl backdrop-blur-md sm:p-8 ring-1 ring-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      Partner playbook
                    </p>
                    <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-500/20">
                      LIVE MONITORING
                    </span>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-4">
                        You deliver
                      </p>
                      <ul className="space-y-3">
                        {[
                          "PDP audit + roadmap",
                          "Upgrade assets + copy",
                          "Structured schema",
                          "Deploy + KPI reporting",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-3 py-2 text-[11px] font-semibold text-foreground border border-border/40"
                          >
                            <div className="size-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Zap className="size-2.5 text-primary" />
                            </div>
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-secondary mb-4">
                        Client gets
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Discoverable PDPs",
                          "Faster iteration",
                          "Higher conversion",
                          "Revenue protection",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-3 py-2 text-[11px] font-semibold text-foreground border border-border/40"
                          >
                            <div className="size-4 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="size-2.5 text-secondary" />
                            </div>
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <h3 className="font-heading text-card-foreground text-2xl font-bold mb-3">
                Dev & Implementation Agencies
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Deliver PDP upgrades as a service—with versioning, monitoring,
                and rollback built in. Build a recurring high-margin service on
                top of Beseam.
              </p>
            </div>
          </motion.div>

          {/* Content Partners */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex flex-col overflow-hidden rounded-[2.5rem] border bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-2xl hover:border-secondary/20 hover:-translate-y-1 mb-10 sm:mb-0"
          >
            <div className="relative aspect-[4/3] bg-muted/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
              <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl hidden sm:block" />

              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-10">
                {/* Mobile: keep it simple to avoid overflow */}
                <div className="w-full max-w-sm sm:hidden">
                  <div className="rounded-3xl border bg-background/95 p-8 shadow-2xl backdrop-blur ring-1 ring-border/50">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Users className="size-5 text-secondary" />
                        <p className="text-base font-bold text-card-foreground">
                          SEO/GEO agency
                        </p>
                      </div>
                      <span className="rounded-full bg-secondary/10 px-4 py-1.5 text-[11px] font-black text-secondary border border-secondary/20 uppercase tracking-wider">
                        {process.env.NEXT_PUBLIC_RELEASE_GUARD === "true"
                          ? "Partner"
                          : "30% PAYOUT"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ship schema, FAQs, and on-page improvements—with
                      guardrails that catch regressions and guide rollback.
                    </p>
                  </div>
                </div>

                {/* Desktop/tablet: layered "partner flywheel" */}
                <div className="relative hidden h-full w-full max-w-lg sm:block">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    whileHover={{ y: -5, rotate: 0, zIndex: 20 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 top-10 w-[78%] -rotate-2 rounded-2xl border bg-background/95 p-5 shadow-xl backdrop-blur-md ring-1 ring-border/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Share2 className="size-4 text-primary" />
                        <p className="text-[13px] font-bold text-card-foreground">
                          SEO/GEO Agency
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black text-primary uppercase border border-primary/20">
                        CHANGE SET
                      </span>
                    </div>
                    <p className="mt-3 text-[12px] text-muted-foreground leading-snug">
                      Ship schema + FAQs → measure impact → stay revenue-safe.
                      Built for AI discovery.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Schema", "FAQs", "Narratives"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted/60 px-3 py-1 text-[10px] font-bold text-muted-foreground border border-border/40 uppercase tracking-tighter"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    whileHover={{ y: -5, rotate: 0, zIndex: 20 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute right-0 top-28 w-[68%] rotate-2 rounded-2xl border bg-background/95 p-5 shadow-2xl backdrop-blur-md ring-1 ring-border/50"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <Activity className="size-4 text-secondary" />
                      <p className="text-[13px] font-bold text-card-foreground">
                        KPI Guardrails
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Rev/s", value: "↑8%" },
                        { label: "Check", value: "↑12%" },
                        { label: "Conv", value: "↑5%" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl bg-muted/50 p-2.5 text-center border border-border/40"
                        >
                          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                            {stat.label}
                          </p>
                          <p className="mt-1 text-xs font-black text-emerald-600">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    whileHover={{ y: -8, zIndex: 20 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="absolute bottom-12 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl border bg-background p-5 shadow-2xl ring-2 ring-primary/20 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <Share2 className="size-4 text-secondary" />
                        <p className="text-[13px] font-bold text-card-foreground">
                          AI Search Readiness
                        </p>
                      </div>
                      <span className="rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-black text-secondary border border-secondary/20 uppercase tracking-wider">
                        OPTIMIZED
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-black uppercase tracking-tighter">
                      <span>SCHEMA</span>
                      <ArrowRight className="size-2 text-muted-foreground/40" />
                      <span>CONTEXT</span>
                      <ArrowRight className="size-2 text-muted-foreground/40" />
                      <span>MEDIA</span>
                      <ArrowRight className="size-2 text-muted-foreground/40" />
                      <span className="text-primary">VISIBLE</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <h3 className="font-heading text-card-foreground text-2xl font-bold mb-3">
                SEO/GEO Agencies
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Deliver on-page upgrades and structured data with confidence.
                Beseam versions every change and monitors KPIs to protect your
                clients&apos; revenue.
              </p>
            </div>
          </motion.div>
        </div>

        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 flex flex-col items-center justify-center gap-5 sm:gap-8 sm:flex-row"
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
