export const STORE_HEALTH_FAQS = [
  {
    question: "What does Beseam do?",
    answer:
      "Beseam checks the storefront, catalog, customer journeys, AI discovery, campaigns, and order data together. It attaches each issue to the affected product, page, query, journey, channel, or store; ranks the issues by commercial evidence; recommends the next action; and verifies the original signal after the team acts.",
  },
  {
    question: "What is the first-month promise?",
    answer:
      "During an agreed pilot, if Beseam does not identify at least one material revenue leak, show the evidence behind it, and propose a specific fix within the first 30 days, you owe us nothing and the engagement ends. The promise assumes the agreed store and data access are available. It covers the diagnosis and proposed fix, not a guaranteed revenue result.",
  },
  {
    question: "Does Beseam replace Shopify, our CMS, analytics, or advertising tools?",
    answer:
      "No. Beseam connects to the systems already in place. Shopify or another commerce platform remains the order and catalog source. Analytics tools keep their own observations. Google and Meta keep channel attribution. Beseam connects the evidence and the work without rewriting those source records.",
  },
  {
    question: "Which Beseam products can we use?",
    answer:
      "Every active contract includes Foundation for store state, authoritative revenue, Actions, Impact, and connection health. AI Visibility, Commerce Readiness, Advertising, Analytics, Behavior, Optimization, Reliability, and Creative Studio can be enabled independently for each store. Analytics, Behavior, Optimization, Reliability, and Creative Studio remain marked Beta while each product completes production validation.",
  },
  {
    question: "How does Beseam identify a revenue leak?",
    answer:
      "Beseam groups evidence that refers to the same product, page, query, journey, campaign, or store. It shows what is wrong, why the issue outranks the others, whether the value is booked, observed, attributed, or modeled, the source, the freshness of the evidence, and the confidence behind any estimate. Unknown values remain unknown rather than becoming zero.",
  },
  {
    question: "Can Beseam change content for different visitors?",
    answer:
      "Behavior and Optimization support experiments and personalization proposals based on intent, friction, navigation, engagement, and commerce signals. The proposal includes the audience, hypothesis, expected outcome, approval state, and measurement plan. Customer-facing changes follow the product access and approval rules set for the store.",
  },
  {
    question: "Can Beseam publish changes or campaigns without approval?",
    answer:
      "Beseam can automate monitoring, evidence collection, prioritization, and approved low-risk workflows. Google or Meta publishing, budget changes, and material customer-facing changes keep explicit roles, preflight checks, approval, and audit history. Campaign approval and publishing are Admin-only actions.",
  },
  {
    question: "How do contracts, product access, and credits work?",
    answer:
      "Foundation is included with every active Beseam contract. Other products are enabled per tenant and store. Contract pricing covers the scheduled checks included in the agreement. Creative Studio and some on-demand generation or analysis show an estimate before credits are reserved. Google and Meta bill advertising spend directly; Beseam does not mix media spend with software or generation charges.",
  },
  {
    question: "How does Beseam report revenue after a change?",
    answer:
      "Beseam keeps booked, observed, attributed, and modeled values separate. Booked revenue comes from authoritative commerce orders. Channel attribution keeps the channel method and window. Modeled opportunity includes its method and confidence. Impact compares equivalent periods and records freshness, completeness, currency, and outside influences.",
  },
] as const;
