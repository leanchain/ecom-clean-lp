"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedBorderContainer from "@/components/ui/animated-border-container";
import { Input } from "@/components/ui/input";

interface MidPageCtaProps {
  headline?: string;
  subtext?: string;
}

export default function MidPageCta({
  headline = "Ready to see how AI reads your store?",
  subtext = "118 checks. 3 minutes. Just your store URL.",
}: MidPageCtaProps) {
  const [store, setStore] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = store.trim().replace(/^https?:\/\//, "");
    if (cleaned) {
      window.location.href = `https://app.beseam.com/store?shop=${encodeURIComponent(cleaned)}`;
    }
  };

  return (
    <section className="border-y border-border/40 bg-muted/20 px-4 py-14 sm:px-6 md:py-20">
      <div className="container max-w-2xl text-center">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-2xl font-bold tracking-tight md:text-3xl"
        >
          {headline}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mt-2 text-sm text-muted-foreground"
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mx-auto mt-6 w-full max-w-xl"
        >
          <AnimatedBorderContainer rounded="full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 rounded-[28px] border bg-background/95 p-2 shadow-md backdrop-blur sm:flex-row sm:items-center"
            >
              <Input
                type="text"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                placeholder="yourstore.myshopify.com"
                animate={false}
                className="h-12 flex-1 rounded-full border-0 bg-transparent px-5 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0"
              />
              <button
                type="submit"
                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95"
              >
                Scan Free
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </AnimatedBorderContainer>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-3 text-xs text-muted-foreground"
        >
          No credit card &middot; No app install &middot; Results in minutes
        </motion.p>
      </div>
    </section>
  );
}
