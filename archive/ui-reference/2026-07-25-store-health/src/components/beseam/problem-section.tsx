import { Bot, Globe, Layers, ShoppingBag } from "lucide-react";

const CHANGE_PATHS = [
  {
    icon: Layers,
    area: "Store health",
    change: "Theme or app change",
    quietEffect:
      "Rendered product markup, JavaScript, or the add-to-cart handler changes.",
    evidence:
      "Rendered-page verification, storefront errors, and affected sessions.",
  },
  {
    icon: ShoppingBag,
    area: "Store health",
    change: "Catalog or purchase-path change",
    quietEffect:
      "A product identifier disappears or one shopper segment encounters friction.",
    evidence:
      "Shopify state, funnel stage, source freshness, and affected scope.",
  },
  {
    icon: Bot,
    area: "AI visibility",
    change: "Answer-engine ranking shift",
    quietEffect:
      "A competitor starts appearing above your product for a high-intent question.",
    evidence:
      "Prompt, answer, product-card position, competing result, and run time.",
  },
  {
    icon: Globe,
    area: "AI visibility",
    change: "Citation or merchant-control loss",
    quietEffect:
      "AI still describes the product, but cites another source or credits a reseller.",
    evidence:
      "Cited URLs, merchant attribution, product facts, and channel-specific trend.",
  },
];

export default function ProblemSection() {
  return (
    <section className="border-t border-rule bg-surface">
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <h2 className="editorial-heading text-ink">
              A store can look fine while conversion or AI visibility quietly
              degrades.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground">
              The failure may happen inside the storefront or outside it, in an
              AI answer a buyer sees first. Beseam keeps both evidence paths
              visible.
            </p>
          </div>

          <div className="grid border-t border-rule sm:grid-cols-2">
            {CHANGE_PATHS.map((path, index) => (
              <article
                key={path.change}
                className={
                  "border-b border-rule py-7 sm:px-6 " +
                  (index % 2 === 1 ? "sm:border-l" : "sm:pl-0")
                }
              >
                <div className="flex items-center gap-3">
                  <path.icon
                    className="h-5 w-5 text-primary"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="text-[12px] font-semibold text-primary">
                    {path.area}
                  </span>
                </div>
                <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.015em] text-ink">
                  {path.change}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground">
                  {path.quietEffect}
                </p>
                <p className="mt-4 border-t border-dashed border-rule pt-3 text-[13px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-ink">Evidence: </span>
                  {path.evidence}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
