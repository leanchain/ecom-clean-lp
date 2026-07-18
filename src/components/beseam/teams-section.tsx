import { Code2, Search, ShoppingCart } from "lucide-react";

import Reveal from "@/components/beseam/reveal";

const ROLES = [
  {
    role: "SEO and content",
    icon: Search,
    body: "Technical issues, affected products and pages, source freshness and evidence—not another generic score.",
  },
  {
    role: "Ecommerce and operations",
    icon: ShoppingCart,
    body: "Prioritized health concerns, purchase friction and the monitoring gaps that make a confident answer impossible.",
  },
  {
    role: "Developers and agencies",
    icon: Code2,
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

        <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-3">
          {ROLES.map((item, index) => (
            <Reveal
              key={item.role}
              delay={index * 0.05}
              className="bg-panel p-7 shadow-[0_1px_2px_rgba(23,23,27,0.04),0_8px_24px_-16px_rgba(23,23,27,0.18)]"
            >
              <item.icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
              <h3 className="mt-5 text-[18px] font-semibold text-ink">
                {item.role}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
