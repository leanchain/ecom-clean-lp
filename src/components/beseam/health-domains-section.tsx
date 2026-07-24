import Link from "next/link";

import { Activity, Bot, Check } from "lucide-react";

const PRODUCTS = [
  {
    title: "AI Visibility",
    eyebrow: "Across AI answers",
    description:
      "See when your products appear, what gets cited, and which competitor takes the lead.",
    points: ["Buyer questions", "Product position", "Citation evidence"],
    href: "/ai-visibility-monitoring",
    link: "Explore AI Visibility",
    icon: Bot,
    className: "bg-brand text-brand-foreground",
    mutedClassName: "text-brand-foreground/72",
    ruleClassName: "border-brand-foreground/20",
    iconClassName: "text-brand-foreground",
  },
  {
    title: "Store Health",
    eyebrow: "Inside your store",
    description:
      "Catch the technical and purchase issues that make products harder to find or buy.",
    points: [
      "Purchase friction",
      "Search and catalog gaps",
      "Coverage failures",
    ],
    href: "/shopify-store-health",
    link: "Explore Store Health",
    icon: Activity,
    className: "bg-technical text-white",
    mutedClassName: "text-white/68",
    ruleClassName: "border-white/15",
    iconClassName: "text-brand",
  },
];

export default function HealthDomainsSection() {
  return (
    <section
      id="product"
      className="scroll-mt-20 border-t border-rule bg-surface"
    >
      <div className="section-pad-tight mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-[14px] font-semibold text-primary">Two products</p>
          <h2 className="editorial-heading mt-4 text-ink">
            Separate jobs. Equal focus.
          </h2>
        </div>

        <div className="mt-10 grid lg:grid-cols-2">
          {PRODUCTS.map((product) => (
            <article
              key={product.title}
              className={`flex min-h-[28rem] flex-col p-7 md:p-10 ${product.className}`}
            >
              <div className="flex items-center justify-between gap-4">
                <p
                  className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${product.mutedClassName}`}
                >
                  {product.eyebrow}
                </p>
                <product.icon
                  className={`h-5 w-5 ${product.iconClassName}`}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-8 max-w-sm text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                {product.title}
              </h3>
              <p
                className={`mt-5 max-w-md text-[16px] leading-relaxed ${product.mutedClassName}`}
              >
                {product.description}
              </p>

              <ul className={`mt-8 border-t ${product.ruleClassName}`}>
                {product.points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-center gap-3 border-b py-3 text-[14px] font-semibold ${product.ruleClassName}`}
                  >
                    <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href={product.href}
                className="mt-auto inline-flex min-h-11 items-end pt-8 font-semibold underline-offset-4 hover:underline"
              >
                {product.link} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
