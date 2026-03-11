"use client";

import { useState, type FormEvent } from "react";
import { Check, Mail } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  "Free AI-readiness scan",
  "No credit card required",
  "AI fixes in one click",
  "Rollback protection",
];

export default function FinalCtaSection() {
  const [store, setStore] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = store.trim().replace(/^https?:\/\//, "");
    if (cleaned) {
      window.location.href = `https://app.beseam.com/store?shop=${encodeURIComponent(cleaned)}`;
    }
  };

  return (
    <section className="relative overflow-hidden border-y border-primary/20 bg-primary py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[100px]"
        aria-hidden
      />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl"
          >
            Get found in AI search.
            <span className="text-white/90 italic">
              {" "}
              Fix the gaps before they cost you.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl"
          >
            Enter your store URL and see how prepared your products are for
            ChatGPT, Perplexity, and Gemini. Free. No sign-up.
          </motion.p>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mt-10 flex max-w-lg flex-col gap-4 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  placeholder="yourstore.myshopify.com"
                  className="h-14 w-full rounded-full border-transparent bg-white pl-11 pr-5 text-base text-foreground shadow-2xl placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-white/30"
                />
              </div>
              <button
                type="submit"
                className="h-14 whitespace-nowrap rounded-full bg-secondary px-8 text-base font-semibold text-white transition-colors hover:bg-secondary/90 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Scan Free →
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-10 flex items-center justify-center gap-2 text-white"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <Check className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold">
                Redirecting to scan…
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {FEATURES.map((item) => (
              <div key={item} className="flex items-center gap-2 text-white">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium tracking-wide">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
