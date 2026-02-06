"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Star, Check, Zap, CheckCircle2, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "Beseam" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 pt-24 pb-24">
        {/* Page Header - Styled like Hero */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-foreground mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Book Your <span className="text-primary">Beseam Demo</span>
            </h1>
            <p className="text-muted-foreground/80 mx-auto mt-6 max-w-2xl text-lg md:text-xl">
              See how Beseam transforms your product pages for AI search engines
              like ChatGPT, Perplexity, and Google AI Overviews.
            </p>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8"
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-1 text-sm font-medium text-foreground">
                4.9/5 rating
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" />
                No strings attached
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" />
                Expert-led session
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Cal.com Embed - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-3xl border bg-card p-2 shadow-2xl ring-1 ring-border/50 overflow-hidden"
          >
            <Cal
              namespace="Beseam"
              calLink="pankaj.kumar/Beseam"
              style={{ width: "100%", height: "600px", overflow: "auto" }}
              config={{ layout: "month_view" }}
            />
          </motion.div>

          {/* Value Props - Now Below the Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12"
          >
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold">
                  What to expect
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  A 30-minute deep dive into your catalog's AI potential.
                </p>

                <ul className="mt-6 space-y-4">
                  {[
                    {
                      title: "AI Media Studio Demo",
                      desc: "Generate AI images, videos, and descriptions live.",
                      icon: Zap,
                    },
                    {
                      title: "AI Search Insights",
                      desc: "See how Perplexity and ChatGPT rank your brand.",
                      icon: CheckCircle2,
                    },
                    {
                      title: "Personalized Roadmap",
                      desc: "A step-by-step plan for your catalog scale-up.",
                      icon: Calendar,
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                        <item.icon className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="rounded-2xl border bg-muted/30 p-8">
                <h3 className="text-sm font-bold">Trusted by 500+ brands</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Join the fast-growing ecosystem of brands and agencies
                  building the future of AI commerce.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-xs font-bold text-primary"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    +12 new brands this week
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
