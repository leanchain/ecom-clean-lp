import { Globe, Layers, Tag } from "lucide-react";

const CHANGE_PATHS = [
  {
    icon: Layers,
    change: "Theme or app change",
    quietEffect:
      "Rendered product markup, JavaScript or the add-to-cart handler changes.",
    evidence:
      "Rendered-page verification, storefront errors and affected sessions.",
  },
  {
    icon: Tag,
    change: "Catalog or metadata change",
    quietEffect:
      "A product identifier, structured field or channel requirement disappears.",
    evidence:
      "Shopify catalog state, channel gap and the affected product record.",
  },
  {
    icon: Globe,
    change: "Browser, market or payment-path change",
    quietEffect:
      "Only a narrow group of shoppers encounters friction while the store still loads.",
    evidence:
      "Funnel stage, browser or device context, event cluster and last observed time.",
  },
];

export default function ProblemSection() {
  return (
    <section className="border-t border-rule bg-surface">
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-20">
          <div>
            <h2 className="editorial-heading text-ink">
              A store can look fine while one change quietly degrades it.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground">
              Most regressions are not total outages. They begin as a narrow
              failure, an incomplete source or a technical change that no single
              dashboard can explain.
            </p>
          </div>

          <div className="border-t border-rule">
            {CHANGE_PATHS.map((path, index) => (
              <article
                key={path.change}
                className="grid gap-4 border-b border-rule py-7 sm:grid-cols-[2.4rem_minmax(0,0.8fr)_minmax(0,1fr)] sm:gap-6"
              >
                <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start sm:gap-4">
                  <path.icon
                    className="h-5 w-5 text-primary"
                    strokeWidth={1.6}
                  />
                  <span className="text-[12px] font-semibold tabular-nums text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-ink">
                    {path.change}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground">
                    {path.quietEffect}
                  </p>
                </div>
                <div className="border-t border-dashed border-rule pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Evidence Beseam can attach
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink">
                    {path.evidence}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
