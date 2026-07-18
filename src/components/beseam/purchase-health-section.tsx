import Link from "next/link";

const STAGES = [
  { name: "Product page", signal: "View and page context" },
  { name: "Variant", signal: "Selection and interaction" },
  { name: "Add to cart", signal: "Success, error and friction" },
  { name: "Cart", signal: "Updates and removal" },
  { name: "Checkout", signal: "Checkout start and step" },
  { name: "Purchase", signal: "Server-side order event" },
];

const SIGNAL_GROUPS = [
  {
    label: "Commerce journey",
    values:
      "Product views, add-to-cart, cart updates, checkout starts and purchases",
  },
  {
    label: "Errors and friction",
    values:
      "JavaScript, resource, HTTP and form errors; rage clicks, dead clicks and abandonment",
  },
  {
    label: "Affected context",
    values:
      "Session, page pattern, product or variant, browser, device, market and funnel stage where available",
  },
];

export default function PurchaseHealthSection() {
  return (
    <section
      id="purchase-health"
      className="scroll-mt-20 border-t border-rule bg-surface"
    >
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
          <div>
            <p className="text-[14px] font-semibold text-primary">
              Purchase Health
            </p>
            <h2 className="editorial-heading mt-4 text-ink">
              See where the buying journey starts to degrade.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground">
              Beseam uses observed storefront and Shopify commerce signals to
              identify narrow purchase problems that an uptime check can miss.
              The evidence stays scoped to the stage and sessions where it was
              observed.
            </p>
            <Link
              href="/purchase-health"
              className="mt-7 inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline"
            >
              Explore Purchase Health →
            </Link>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              The observed purchase path
            </p>
            <ol className="mt-5 border-y border-rule md:grid md:grid-cols-6">
              {STAGES.map((stage, index) => (
                <li
                  key={stage.name}
                  className={
                    "relative grid grid-cols-[2.25rem_1fr] gap-3 border-b border-rule py-4 last:border-b-0 md:block md:min-h-40 md:border-b-0 md:border-l md:px-3 md:py-5 md:first:border-l-0 " +
                    (index === 2 ? "bg-primary-50 dark:bg-white/[0.04]" : "")
                  }
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-rule bg-panel text-[11px] font-semibold tabular-nums text-primary">
                    {index + 1}
                  </span>
                  <div className="md:mt-8">
                    <h3 className="text-[13px] font-semibold text-ink">
                      {stage.name}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-foreground">
                      {stage.signal}
                    </p>
                  </div>
                  {index < STAGES.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute bottom-[-1px] left-[1.05rem] h-4 w-px bg-brand md:bottom-auto md:left-auto md:right-[-0.3rem] md:top-[2.05rem] md:h-px md:w-2.5"
                    />
                  ) : null}
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-rule">
              {SIGNAL_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[minmax(9rem,0.42fr)_minmax(0,1fr)] sm:gap-8"
                >
                  <h3 className="text-[14px] font-semibold text-ink">
                    {group.label}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-foreground">
                    {group.values}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="bg-panel p-6 md:p-8">
            <h3 className="text-[18px] font-semibold text-ink">
              Configured conversion monitors
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground">
              Where a monitor is configured, Beseam checks hourly and compares
              current conversion performance with an earlier baseline window.
              Crossing the configured threshold creates an alert; email
              notification is optional.
            </p>
          </div>
          <div className="bg-surface p-6 md:p-8">
            <h3 className="text-[18px] font-semibold text-ink">
              What this evidence does not prove
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground">
              Real-user evidence depends on observed traffic. Beseam does not
              yet synthetically reproduce every storefront path, and a
              correlated change is not automatically a confirmed cause.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
