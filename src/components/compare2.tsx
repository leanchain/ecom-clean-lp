import Image from "next/image";

import { Check, X } from "lucide-react";

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

const Compare2 = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            How we turn "invisible" PDPs into AI-recommended best-sellers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
            AI search engines don't rank keywords, they rank clarity, specific
            use case completeness, and multi-modal content. If your PDPs aren't
            AI-ready, your products won't be recommended. Fisca fixes that, at
            scale.
          </p>
        </div>

        <div className="mt-10 relative">
          {/* VS badge */}
          <div className="bg-background absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-semibold md:flex">
            VS
          </div>

          <div className="grid items-center gap-6 sm:grid-cols-2">
            {/* Current PDPs */}
            <div className="bg-muted/70 rounded-3xl p-6 md:p-8">
              <h3 className="text-lg font-semibold md:text-xl">
                Your current product page
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Typical PDPs are built for catalog maintenance, not AI search or
                conversion.
              </p>

              {/* Before image */}
              <div className="relative mt-6 overflow-hidden rounded-3xl">
                <div className="aspect-4/3">
                  <Image
                    src="/images/compare/before-pdp.webp"
                    alt="Current PDP example"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-start bg-gradient-to-t from-background/80 via-background/40 to-transparent p-4">
                  <span className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
                    Current PDP
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm md:text-base">
                {currentPdpBullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 text-destructive">
                      <X className="size-4" />
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fisca PDP AI */}
            <div className="relative">
              <div className="bg-card/95 rounded-3xl border-2 border-primary p-6 md:p-8">
                <h3 className="text-lg font-semibold md:text-xl">
                  With Fisca PDP AI
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  One persuasion graph powers all copy, schema, and media so
                  your PDPs work in AI search and for humans.
                </p>

                {/* After video */}
                <div className="relative mt-6 overflow-hidden rounded-3xl">
                  <div className="aspect-4/3">
                    <video
                      src="/videos/compare/after-pdp.mp4"
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-start bg-gradient-to-t from-background/80 via-background/40 to-transparent p-4">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                      Fisca PDP AI
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-2 text-sm md:text-base">
                  {FiscaPdpBullets.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">
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
      </div>
    </section>
  );
};

export { Compare2 };
