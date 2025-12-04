import { Check, X } from "lucide-react";
import React from "react";

const currentPdpBullets = [
  "Low AI visibility and weak conversion.",
  "Generic copy and thin product context.",
  "Little or no social proof, FAQs, or objections addressed.",
  "Manual, time-consuming updates for every PDP.",
  "High per-product content costs (shoots, design, copy).",
];

const FiscaPdpBullets = [
  "3–5× more visibility in AI search results (GEO, ChatGPT, Perplexity).",
  "Deep structured narrative that answers questions and drives conversion.",
  "On-brand images, video, and FAQs generated from one persuasion graph.",
  "Update 1–100k+ SKUs in minutes with templates and sync.",
  "$1–$10 per PDP instead of $X00s–$X000s in production costs.",
];

const ComparisonInline = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-3 text-2xl font-semibold md:text-4xl">
            Your current PDP pages vs Fisca PDP AI
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
            A quick side-by-side of what you get today versus what you unlock
            when your product pages are built for AI search and human conversion
            from day one.
          </p>
        </div>

        <div className="relative rounded-3xl bg-card/80 p-5 shadow-sm ring-1 ring-border md:p-8">
          {/* VS badge */}
          <div className="bg-background absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-semibold shadow-sm md:flex">
            VS
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Current PDP side */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold md:text-xl">
                  Your current product page
                </h3>
                <p className="text-muted-foreground text-sm">
                  Typical PDPs are built for catalog maintenance, not AI search
                  or conversion.
                </p>
              </div>

              {/* Placeholder preview card */}
              <div className="bg-muted/60 relative overflow-hidden rounded-3xl border">
                <div className="from-background/80 via-background/40 to-transparent pointer-events-none flex aspect-[4/3] items-end justify-start bg-gradient-to-t p-4">
                  <span className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
                    Current PDP
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-sm md:text-base">
                {currentPdpBullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[2px] text-destructive">
                      <X className="size-4" />
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fisca PDP AI side */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold md:text-xl">
                  With Fisca PDP AI
                </h3>
                <p className="text-muted-foreground text-sm">
                  One persuasion graph powers all copy, schema, and media so
                  your PDPs work in AI search and for humans.
                </p>
              </div>

              {/* Placeholder preview card */}
              <div className="bg-muted/60 relative overflow-hidden rounded-3xl border">
                <div className="from-primary/20 via-background/30 to-background pointer-events-none flex aspect-[4/3] items-end justify-start bg-gradient-to-t p-4">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                    Fisca PDP AI
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-sm md:text-base">
                {FiscaPdpBullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[2px] text-emerald-500">
                      <Check className="size-4" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ComparisonInline };
