import { X } from "lucide-react";

const rankscaleFeatures = [
  "Limited AI search optimization",
  "Generic templates with little customization",
  "Manual content updates required",
  "Basic image generation only",
  "Higher per-product costs",
  "Limited scalability for large catalogs",
  "No deep narrative structure",
  "Slower content creation process",
];

const beseamFeatures = [
  {
    emoji: "🎯",
    text: "Advanced AI search optimization with 3-5× better visibility",
  },
  {
    emoji: "🎨",
    text: "Fully customizable persuasion graphs for unique branding",
  },
  {
    emoji: "⚡",
    text: "Automated content sync across 1-100k+ SKUs in minutes",
  },
  {
    emoji: "🖼️",
    text: "AI-generated images, copy, and structured narratives",
  },
  {
    emoji: "💰",
    text: "$1-10 per PDP vs traditional $100s-$1000s costs",
  },
  {
    emoji: "📈",
    text: "Enterprise-scale automation for unlimited products",
  },
  {
    emoji: "🧠",
    text: "Deep persuasion architecture with FAQs and objections",
  },
  {
    emoji: "🚀",
    text: "Lightning-fast content generation and deployment",
  },
];

const CompareRankscale = () => {
  return (
    <section id="compare-rankscale" className="py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Beseam vs Rankscale: The Clear Winner for AI-Powered PDPs
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
            While Rankscale offers basic AI tools, Beseam delivers comprehensive
            PDP optimization that drives real results. See why leading brands
            choose Beseam for their AI search strategy.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* VS badge */}
          <div className="bg-background absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-sm font-semibold shadow-lg md:flex">
            VS
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Rankscale */}
            <div className="bg-muted/70 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <span className="text-sm font-semibold text-muted-foreground">
                    R
                  </span>
                </div>
                <h3 className="text-xl font-semibold md:text-2xl">Rankscale</h3>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                Basic AI tools with limited depth and scalability for modern
                e-commerce needs.
              </p>

              <ul className="mt-6 space-y-3 text-sm md:text-base">
                {rankscaleFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 text-destructive shrink-0">
                      <X className="size-4" />
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beseam */}
            <div className="relative">
              <div className="bg-card/95 rounded-3xl border-2 border-primary p-6 md:p-8 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm font-semibold text-primary-foreground">
                      B
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold md:text-2xl">Beseam</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm">
                  Complete AI-powered PDP solution engineered for AI search
                  dominance and conversion optimization.
                </p>

                <ul className="mt-6 space-y-3 text-sm md:text-base">
                  {beseamFeatures.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-lg shrink-0">{item.emoji}</span>
                      <span className="font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Winner badge */}
                <div className="mt-6 flex justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold">
                    🏆 Clear Winner
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            Ready to leave Rankscale behind? Join the brands choosing Beseam for superior AI-powered PDPs.
          </p>
        </div>
      </div>
    </section>
  );
};

export { CompareRankscale };