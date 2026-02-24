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
      "Beseam is a revenue-guardrailed PDP ops platform. It audits your product pages, generates AI-powered upgrade playbooks (FAQs, narratives, schema, meta descriptions), and deploys changes safely — versioned, monitored, and reversible. Think of it as the infrastructure layer that makes PDP changes safe, no matter who makes them.",
  },
  {
    question: "Does Beseam replace our agency?",
    answer:
      "No — Beseam complements your agencies. Your SEO agency brings the strategy. Your dev team builds the theme. Beseam provides the guardrails. We also offer AI-powered recommendations that agencies can use or build on. Everyone who touches your PDPs — agencies, internal teams, and Beseam's AI — ships through the same safe pipeline.",
  },
  {
    question: "How is this different from an A/B testing tool?",
    answer:
      "A/B testing tools help you compare two variants. Beseam is a full operational loop: it audits your PDPs, generates recommendations, deploys changes safely with versioning, monitors KPIs after deployment, explains regressions, and guides rollback. It's the infrastructure layer that makes PDP changes safe — not just measurable.",
  },
  {
    question: "What KPIs does Beseam monitor?",
    answer:
      "After every deployment we track revenue per session, checkout-start rate, and conversion rate. When any metric regresses beyond a threshold, the system triggers an incident linking the regression to the specific change and its source.",
  },
  {
    question: "What happens when a regression is detected?",
    answer:
      "Beseam's Diagnosis Agent links the regression to a specific change diff (e.g., 'agency theme publish removed FAQ module'). It identifies who made the change, recommends an action (keep, rollback, holdout test, or iterate), and lets you rollback with one click.",
  },
  {
    question: "What platforms do you integrate with?",
    answer:
      "Beseam integrates with Shopify natively, with WooCommerce and other platforms coming soon. Changes are applied through theme blocks, metafields, and structured content — ensuring compatibility with your existing theme, agency workflows, and tech stack.",
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
