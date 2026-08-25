import { Code2, Search, ShoppingCart } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";

const ROLES = [
  {
    role: "Product content and merchandising",
    icon: Search,
    body: "See where products are hard to find or choose, then inspect the product and merchandising evidence worth changing.",
  },
  {
    role: "Ecommerce and operations",
    icon: ShoppingCart,
    body: "Connect shopper behavior, store friction, approved actions, and measured outcomes around the same commercial question.",
  },
  {
    role: "Developers and agencies",
    icon: Code2,
    body: "Start with supported evidence, affected scope, and a narrower implementation path instead of a generic issue report.",
  },
];

export default function TeamsSection() {
  return (
    <section
      id="teams"
      className="scroll-mt-24 border-b border-black/18 bg-ground"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal className="grid gap-10 border-b border-black/22 pb-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <h2 className="max-w-[16ch] font-display text-[clamp(2.25rem,3.4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ink-deep">
            Built for the people who own ecommerce growth.
          </h2>
          <p className="max-w-[64ch] self-end text-[17px] leading-[1.65] text-black/66">
            Discovery, merchandising, store behavior, conversion, and
            implementation cross team boundaries. Beseam keeps the evidence,
            decision, action, and measurement connected in one operating record.
          </p>
        </Reveal>

        <div>
          {ROLES.map((item, index) => (
            <Reveal
              key={item.role}
              delay={index * 0.04}
              className="grid gap-4 border-b border-black/18 py-7 sm:grid-cols-[2.5rem_minmax(12rem,0.7fr)_minmax(0,1fr)] sm:items-center"
            >
              <item.icon
                className="h-5 w-5 text-signal-ink"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <h3 className="text-[17px] font-semibold text-ink-deep">
                {item.role}
              </h3>
              <p className="text-[15px] leading-relaxed text-black/64">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
