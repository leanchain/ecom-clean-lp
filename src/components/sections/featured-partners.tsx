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

export default function FeaturedPartners({ showCTA = true }: { showCTA?: boolean }) {
  return (
    <section id="featured-partners" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-foreground text-3xl md:text-5xl">
            Featured Partners
          </h2>
          <p className="mt-3 text-muted-foreground text-sm md:text-base">
            Earn 30% commission for 12 months.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {PARTNER_LOGOS.map((logo) => (
            <motion.div
              key={logo.name}
              whileHover={{ opacity: 1, scale: 1.05, filter: "grayscale(0%)" }}
              className="opacity-40 grayscale transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={140}
                height={32}
                className="h-7 w-auto object-contain md:h-8"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {/* Innovation Partners */}
          <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="relative aspect-[4/3] bg-background">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />

              <div className="absolute inset-x-6 top-6 flex items-center justify-between z-10">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  You
                </span>
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                  Your client
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
                <div className="w-full max-w-sm rounded-3xl border bg-background/85 p-5 shadow-sm backdrop-blur sm:p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Partner playbook
                    </p>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                      Catalog-scale
                    </span>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        You deliver
                      </p>
                      <ul className="mt-3 space-y-2">
                        {[
                          "PDP audit + roadmap",
                          "AI-ready assets",
                          "Structured context",
                          "Deploy + reporting",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 rounded-xl bg-muted/40 px-2.5 py-1.5 text-[11px] font-medium text-foreground ring-1 ring-border/50"
                          >
                            <Zap className="size-3 text-primary shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                        Client gets
                      </p>
                      <ul className="mt-3 space-y-2">
                        {[
                          "AI-searchable PDPs",
                          "Faster launches",
                          "Higher conversion",
                          "Lower return risk",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 rounded-xl bg-muted/40 px-2.5 py-1.5 text-[11px] font-medium text-foreground ring-1 ring-border/50"
                          >
                            <CheckCircle2 className="size-3 text-secondary shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-1.5">
                    {["CRO", "SEO/GEO", "Store builds", "Optimization"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full border bg-background px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-card-foreground text-lg font-semibold">
                Agency & Implementation Partners
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Deliver AI-ready PDPs as a service—faster, cheaper, and at
                catalog scale.
              </p>
            </div>
          </div>

          {/* Content Partners */}
          <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="relative aspect-[4/3] bg-background">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
              <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
                {/* Mobile: keep it simple to avoid overflow */}
                <div className="w-full max-w-sm sm:hidden">
                  <div className="rounded-3xl border bg-background/95 p-6 shadow-xl backdrop-blur ring-1 ring-border/50">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-secondary" />
                        <p className="text-sm font-bold text-card-foreground">
                          Affiliate & Community
                        </p>
                      </div>
                      <span className="rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-bold text-secondary">
                        30% / 12mo
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      Teach AI search, share your partner link, and earn
                      recurring commission as your audience adopts Beseam.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {["Newsletter", "Course", "Community"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted/60 px-3 py-1 text-[11px] font-medium text-muted-foreground border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop/tablet: layered "partner flywheel" */}
                <div className="relative hidden h-full w-full max-w-md sm:block">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    whileHover={{ y: -5, rotate: 0, zIndex: 20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 top-8 w-[75%] -rotate-2 rounded-2xl border bg-background/90 p-4 shadow-xl backdrop-blur ring-1 ring-border/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Share2 className="size-3.5 text-primary" />
                        <p className="text-xs font-bold text-card-foreground">
                          Newsletter / creator
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        Partner link
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      Teach AI search → drive trials → earn commission.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Issue", "Video", "Thread"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/40"
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
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute right-0 top-24 w-[65%] rotate-2 rounded-2xl border bg-background/90 p-4 shadow-xl backdrop-blur ring-1 ring-border/50"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="size-3.5 text-secondary" />
                      <p className="text-xs font-bold text-card-foreground">
                        Community / marketplace
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-1.5">
                      {[
                        { label: "Clicks", value: "↑" },
                        { label: "Trials", value: "↑" },
                        { label: "MRR", value: "↑" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl bg-muted/50 px-2 py-1.5 text-center border border-border/40"
                        >
                          <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                            {stat.label}
                          </p>
                          <p className="mt-0.5 text-xs font-black text-card-foreground">
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
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute bottom-10 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border bg-background/90 p-4 shadow-2xl backdrop-blur ring-2 ring-primary/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="size-3.5 text-secondary" />
                        <p className="text-xs font-bold text-card-foreground">
                          Recurring commission
                        </p>
                      </div>
                      <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary">
                        30% / 12mo
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                      <span>Audience</span>
                      <ArrowRight className="size-2 text-muted-foreground/30" />
                      <span>Trial</span>
                      <ArrowRight className="size-2 text-muted-foreground/30" />
                      <span>Paid</span>
                      <ArrowRight className="size-2 text-muted-foreground/30" />
                      <span>Payout</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-card-foreground text-lg font-semibold">
                Affiliate & Community Partners
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Educate the market on AI search and earn recurring commission
                when your audience adopts Beseam.
              </p>
            </div>
          </div>
        </div>

        {showCTA && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/demo">Partners</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8"
            >
              <Link href="/demo">Apply to be partner</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
