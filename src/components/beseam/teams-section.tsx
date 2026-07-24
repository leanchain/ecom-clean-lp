import { Code2, Search, ShoppingCart } from "lucide-react";

import Reveal from "@/components/beseam/reveal";

const ROLES = [
  {
    role: "SEO, GEO, and content",
    icon: Search,
    body: "See answers, citations, competitors, and affected products.",
  },
  {
    role: "Ecommerce and operations",
    icon: ShoppingCart,
    body: "Know what buyers can find and where the purchase journey breaks.",
  },
  {
    role: "Developers and agencies",
    icon: Code2,
    body: "Start with reproducible evidence and a clear investigation path.",
  },
];

export default function TeamsSection() {
  return (
    <section
      id="teams"
      className="scroll-mt-20 border-t border-rule bg-surface"
    >
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <Reveal className="max-w-4xl">
          <p className="text-[14px] font-semibold text-primary">
            For your team
          </p>
          <h2 className="editorial-heading mt-4 text-ink">
            Built for the people who own ecommerce growth.
          </h2>
        </Reveal>

        <div className="mt-10 border-t border-rule">
          {ROLES.map((item, index) => (
            <Reveal
              key={item.role}
              delay={index * 0.04}
              className="grid gap-4 border-b border-rule py-6 sm:grid-cols-[2rem_minmax(12rem,0.7fr)_minmax(0,1fr)] sm:items-center"
            >
              <item.icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
              <h3 className="text-[17px] font-semibold text-ink">
                {item.role}
              </h3>
              <p className="text-[15px] leading-relaxed text-foreground">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
