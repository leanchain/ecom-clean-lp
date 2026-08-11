export const STORE_HEALTH_FAQS = [
  {
    question: "What does Beseam monitor?",
    answer:
      "Beseam monitors agreed products across the store catalog, product pages, shopping feeds, search results, and product recommendations. It keeps those sources attached to the same product record so each run can be compared with the previous state.",
  },
  {
    question: "How does Beseam know that product visibility changed?",
    answer:
      "The first monitoring run establishes a baseline for the agreed products and discovery paths. Later runs compare product presence, title, price, availability, description, structured data, language coverage, and other source evidence with that baseline and the most recent known state.",
  },
  {
    question: "What counts as a product visibility change?",
    answer:
      "Examples include a product leaving a shopping feed, disappearing from a tracked search or buying answer, being replaced by a competitor, or showing product facts that no longer agree with the store catalog. Beseam keeps the source and time of the change with the product.",
  },
  {
    question: "How does Beseam decide which alert matters first?",
    answer:
      "Beseam considers the commercial priority available for the product, the number and importance of affected discovery paths, the freshness and quality of the evidence, and the scope agreed with the store. High-selling or high-priority products can be placed ahead of minor catalog warnings.",
  },
  {
    question: "How often does Beseam check the catalog?",
    answer:
      "The monitoring cadence depends on the source and the agreed scope. Each result records when the source was checked and whether the evidence is fresh, stale, incomplete, or unavailable, so an old result does not appear current.",
  },
  {
    question: "Doesn’t Shopify already show AI channel performance?",
    answer:
      "Shopify remains the source of truth for your catalog and can report performance from supported AI sales channels. Beseam focuses on the individual buying answer: which products were named, which competitors appeared, what product evidence is connected to the miss, and whether the same question changes after an approved product update.",
  },
  {
    question: "What happens after Beseam raises an alert?",
    answer:
      "The alert includes the affected product, the previous and current state, the source evidence, the likely cause, and a proposed next step. The owner and approval stay attached to the product, and Beseam reruns the original check after the change.",
  },
  {
    question: "Can Beseam publish product changes without approval?",
    answer:
      "No material customer-facing change is published without the access and approval rules agreed for the store. Your team can approve, reject, or edit a proposed change before anything is published.",
  },
  {
    question: "What is the first-month promise?",
    answer:
      "During an agreed pilot, if Beseam cannot establish the product baseline, monitor the agreed discovery paths, identify a material visibility issue, and show the evidence and proposed fix within 30 days, you owe us nothing and the engagement ends. The agreed store and data access must remain available during the pilot.",
  },
] as const;
