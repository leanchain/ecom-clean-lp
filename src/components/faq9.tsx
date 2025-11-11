import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do credits work, and how many generations do I get?",
    answer:
      "Credits are only used for AI generation features in Fieson (e.g., creating images, copy, or variations). Different tools may consume different amounts per generation, and a single request can yield one or multiple results. On monthly plans, credits reset each month. Annual plans receive credits upfront with a yearly reset. Unused credits don’t roll over, though you can purchase optional add‑on credits that are used after your plan’s included credits and expire after up to three years. Downloading your own outputs does not consume credits.",
  },
  {
    question: "Is my subscription automatically renewed?",
    answer:
      "Yes. Your subscription renews automatically at the end of each billing cycle to ensure uninterrupted access. You can cancel anytime in your account settings - your plan will remain active until the end of the current period.",
  },
  {
    question: "How many images or videos can I generate?",
    answer:
      "It depends on your plan and the models you use. Each plan includes an approximate number of generations per month - check the pricing table for model-specific details.",
  },
  {
    question: "How can I purchase extra credits?",
    answer:
      "If you need more credits, you can upgrade your plan for a higher monthly limit or buy credit packs to generate more media without changing your current subscription. Purchased credits are added instantly and can be used across all supported models.",
  },
  {
    question: "Can I change my subscription after purchase?",
    answer:
      "Yes. You can upgrade instantly at any time - the change takes effect immediately, and any credit difference is applied to your account. If you downgrade, the change will apply at the end of your current plan duration, and your existing plan will remain active until then.",
  },
];

const Faq9 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <h2 className="mb-12 mt-2 text-3xl font-bold md:text-6xl">FAQs</h2>
        <Accordion type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-muted mb-2 rounded-2xl border-b-0 px-5 py-2 md:mb-4 transition-colors hover:bg-card data-[state=open]:bg-card"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq9 };
