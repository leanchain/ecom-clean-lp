import Reveal from "@/components/beseam/reveal";

const ROLES = [
  {
    role: "SEO and content",
    body: "Technical issues, affected products and pages, source freshness and evidence—not another generic score.",
  },
  {
    role: "Ecommerce and operations",
    body: "Prioritized health concerns, purchase friction and the monitoring gaps that make a confident answer impossible.",
  },
  {
    role: "Developers and agencies",
    body: "Reproducible context, affected paths and direct investigation links instead of an unspecific conversion alert.",
  },
];

export default function TeamsSection() {
  return (
    <section
      id="teams"
      className="scroll-mt-20 border-t border-rule bg-surface"
    >
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <Reveal className="max-w-5xl">
          <h2 className="editorial-heading text-ink">
            Beseam does not replace your SEO team. It gives them better
            evidence.
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-foreground">
            Your SEO team improves visibility. Your content team improves the
            message. Your developers ship changes. Beseam watches whether those
            changes damage discoverability or purchasing.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-rule">
          {ROLES.map((item, index) => (
            <Reveal
              key={item.role}
              delay={index * 0.05}
              className="grid gap-3 border-b border-rule py-7 md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] md:gap-12"
            >
              <h3 className="text-[18px] font-semibold text-ink">
                {item.role}
              </h3>
              <p className="max-w-2xl text-[15px] leading-relaxed text-foreground">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
