"use client";

import { useEffect } from "react";

import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-24 pt-24">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
              Paid next step
            </p>
            <h1 className="font-heading text-foreground mx-auto max-w-4xl text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Book your{" "}
              <span className="text-primary italic">
                AI visibility fix sprint
              </span>
            </h1>
            <p className="text-muted-foreground/80 mx-auto mt-6 max-w-2xl text-lg md:text-xl">
              Bring one Shopify product page or a scan report. We will review
              the blockers, prioritize the highest-impact fixes, and map the
              fastest implementation path.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8"
          >
            {[
              "30-minute working session",
              "No store connection required to start",
              "Focused on one live PDP",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="overflow-hidden rounded-3xl border bg-card p-2 shadow-2xl ring-1 ring-border/50"
          >
            <Cal
              namespace="Beseam"
              calLink="pankaj.kumar/Beseam"
              style={{ width: "100%", height: "600px", overflow: "auto" }}
              config={{ layout: "month_view" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12"
          >
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl tracking-tight">
                  What to expect
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  A practical working session for merchants who want the fastest
                  path from scan to fix.
                </p>

                <ul className="mt-6 space-y-4">
                  {[
                    {
                      title: "Scan review",
                      desc: "We walk through what AI shoppers can and cannot read on the page today.",
                      icon: Search,
                    },
                    {
                      title: "Fix sprint plan",
                      desc: "We prioritize the highest-leverage fixes across schema, content, reviews, shipping, and trust signals.",
                      icon: Wrench,
                    },
                    {
                      title: "Implementation path",
                      desc: "Choose done-with-you or done-for-you support. Connect your store only if we need it.",
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
                <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-xl">
                  <ShieldCheck className="text-primary h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold">
                  Best for Shopify teams that want a fast answer
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  If the free scan finds real issues, this session turns that
                  report into a practical fix plan you can ship this week.
                </p>
                <div className="mt-6 space-y-3 text-sm text-foreground">
                  <p>Founders and e-commerce leads</p>
                  <p>Shopify teams with a key PDP to improve</p>
                  <p>Agencies helping merchants move quickly</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
