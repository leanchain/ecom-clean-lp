import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Beseam?",
    answer:
      "Beseam is a revenue-guardrailed PDP ops platform. Whether changes come from your SEO agency, dev team, or Beseam's own AI recommendations — every update is versioned, deployed safely, monitored for revenue impact, and reversible. Think of it as the infrastructure layer that makes PDP changes safe, no matter who makes them.",
  },
  {
    question: "How do agencies use Beseam?",
    answer:
      "Agencies (SEO, GEO, dev, creative) use Beseam as the deployment pipeline for their PDP work. Instead of pushing changes directly to your store, they deploy through Beseam — so every change is versioned, KPIs are monitored post-deploy, and regressions are caught automatically. It helps agencies prove ROI and gives brands confidence to let agencies move faster.",
  },
  {
    question: "Does Beseam replace our agency?",
    answer:
      "No — Beseam complements your agencies. Your SEO agency brings the strategy. Your dev team builds the theme. Beseam provides the guardrails. We also offer AI-powered recommendations (content, schema, FAQs) that agencies can use or build on. The platform is designed so that everyone who touches your PDPs — agencies, internal teams, and Beseam's AI — ships through the same safe pipeline.",
  },
  {
    question: "What AI recommendations does Beseam provide?",
    answer:
      "Beseam audits your PDPs and generates upgrade playbooks: AI-optimized FAQs, product narratives, schema markup, meta descriptions, and more. These are recommendations — you can apply them directly, hand them to your agency to refine, or use them as a starting point. Every recommendation deployed goes through the same guardrails as any other change.",
  },
  {
    question: "How is this different from an A/B testing tool?",
    answer:
      "A/B testing tools help you compare two variants. Beseam is a full operational loop: it audits your PDPs, generates recommendations, deploys changes safely (from any source) with versioning, monitors KPIs after deployment, explains regressions, and guides rollback. It's the infrastructure layer that makes PDP changes safe — not just measurable.",
  },
  {
    question: "What KPIs does Beseam monitor?",
    answer:
      "After every deployment — whether from your agency, your team, or Beseam's AI — we track revenue per session, checkout-start rate, and conversion rate. When any metric regresses beyond a threshold, the system triggers an incident linking the regression to the specific change and its source.",
  },
  {
    question: "What happens when a regression is detected?",
    answer:
      "Beseam's Diagnosis Agent links the regression to a specific change diff (e.g., 'agency theme publish removed FAQ module'). It identifies who made the change, recommends an action (keep, rollback, holdout test, or iterate), and lets you rollback with one click. Your agency gets the same visibility so they can fix forward.",
  },
  {
    question: "How does versioning work?",
    answer:
      "Every PDP change gets a version number, full diff, and source attribution (agency, internal, or AI-generated). Changes are isolated per PDP and won't affect other pages. You can compare any two versions side-by-side and roll back to any previous version instantly. The system maintains a complete change history with impact data.",
  },
  {
    question: "What platforms do you integrate with?",
    answer:
      "Beseam integrates with Shopify natively, with WooCommerce and other platforms coming soon. Changes are applied through theme blocks, metafields, and structured content — ensuring compatibility with your existing theme, agency workflows, and tech stack.",
  },
  {
    question: "What's included now vs what's coming later?",
    answer:
      "Phase 1 (available now): PDP audit + AI recommendations, safe deployment with versioning, KPI monitoring + alerts, rollback workflows, and source attribution for all changes. Phase 2 (coming soon): always-on detection for changes from any source (agencies, apps, theme updates), advanced blame ranking, automated rollback, and cross-platform support.",
  },
];

const Faq9 = () => {
  const midpoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midpoint);
  const rightColumn = faqs.slice(midpoint);

  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-primary mb-4 text-sm font-medium uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Everything you need to know
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Common questions about how Beseam upgrades and protects your product
            pages.
          </p>
        </div>

        {/* Two Column FAQ Grid */}
        <div className="grid gap-0 md:grid-cols-2 md:gap-12">
          <Accordion type="multiple" className="divide-y divide-border">
            {leftColumn.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`left-${index}`}
                className="border-0 py-0"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5 gap-4 [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion
            type="multiple"
            className="divide-y divide-border border-t md:border-t-0"
          >
            {rightColumn.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`right-${index}`}
                className="border-0 py-0"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5 gap-4 [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Faq9 };
