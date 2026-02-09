import Image from "next/image";
import Link from "next/link";
import { Check, X, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const currentPdpBullets = [
  "Invisible to ChatGPT, Perplexity, and AI Overviews.",
  "Generic descriptions that don't answer real buyer questions.",
  "Missing FAQs, comparisons, and use-case context AI needs.",
  "Few images, no video, inconsistent brand presentation.",
  "Manual updates that can't scale across your catalog.",
];

const isGuarded = process.env.NEXT_PUBLIC_RELEASE_GUARD === "true";

const BeseamPdpBullets = [
  isGuarded
    ? "Significantly higher recommendation rate in AI search engines."
    : "3-5× higher recommendation rate in AI search engines.",
  "Deep narrative with benefits, objections, and comparisons.",
  "Complete visual coverage: packshots, lifestyle, video, detail shots.",
  "Schema.org structured data for maximum AI extraction.",
  isGuarded
    ? "Scale across your catalog without scaling your team or budget."
    : "Scale to 100k+ SKUs without scaling your team or budget.",
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
            AI-ready, your products won't be recommended. Beseam fixes that, at
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

            {/* Beseam PDP AI */}
            <div className="relative">
              <div className="bg-card/95 rounded-3xl border-2 border-primary p-6 md:p-8">
                <h3 className="text-lg font-semibold md:text-xl">
                  With Beseam PDP AI
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
                      Beseam PDP AI
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-2 text-sm md:text-base">
                  {BeseamPdpBullets.map((item, idx) => (
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

          {/* Results Metrics */}
          {process.env.NEXT_PUBLIC_RELEASE_GUARD !== "true" && (
            <div className="mt-12 rounded-3xl border bg-card p-8">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <TrendingUp className="h-4 w-4" />
                  Average Results After Beseam Optimization
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary md:text-4xl">3.2x</p>
                  <p className="mt-1 text-sm text-muted-foreground">AI Search Visibility</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary md:text-4xl">+47%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Click-Through Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary md:text-4xl">+27%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Conversion Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary md:text-4xl">-23%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Return Rate</p>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/demo">
                    See How Your PDPs Compare
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            )}
        </div>
      </div>
    </section>
  );
};

export { Compare2 };
