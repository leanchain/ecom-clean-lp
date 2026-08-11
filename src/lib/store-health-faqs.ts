export const STORE_HEALTH_FAQS = [
  {
    question: "What exactly does Beseam test?",
    answer:
      "Beseam runs buying questions against configured AI assistants and keeps the observed answer, products named, competitors, citations or supporting evidence when available, and the time of the run. The same question can be run again after a product change.",
  },
  {
    question: "How do you know why another product was recommended?",
    answer:
      "Beseam does not pretend to know an assistant's hidden ranking logic. It compares the observed answer with product and storefront evidence you control, then identifies supported differences or missing facts that are actionable. A suspected cause stays separate from a confirmed fact.",
  },
  {
    question: "What can Beseam actually change?",
    answer:
      "With your approval and store access, Beseam can propose and publish supported product-data changes such as titles, descriptions, attributes, or other editable product fields. Customer-facing changes are not published without the approval rules agreed for the store, and the previous value is kept for revert.",
  },
  {
    question: "Doesn’t Shopify already show AI channel performance?",
    answer:
      "Shopify remains the source of truth for your catalog and can report performance from supported AI sales channels. Beseam focuses on the individual buying answer: which products were named, which competitors appeared, what product evidence is connected to the miss, and whether the same question changes after an approved product update.",
  },
  {
    question: "Can Beseam guarantee my product will be recommended?",
    answer:
      "No. Beseam cannot control an AI assistant's recommendation. It records what happened, helps you change product evidence you control, and re-runs the same question so you can see whether the observed answer changed.",
  },
] as const;
