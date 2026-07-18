export const STORE_HEALTH_FAQS = [
  {
    question: "What is Beseam Store Health?",
    answer:
      "Beseam Store Health is an evidence-backed workspace for Shopify discoverability, purchase health and monitoring coverage. It shows what needs attention, which source supports the issue and who should investigate it.",
  },
  {
    question: "What does Purchase Health observe?",
    answer:
      "Purchase Health uses supported storefront and Shopify commerce signals across product views, add-to-cart, cart, checkout and purchase. It can also use observed JavaScript, resource, HTTP, form and friction signals, with affected context such as session, page pattern, product, browser or device where available.",
  },
  {
    question: "Does Discoverability Health include AI visibility (GEO)?",
    answer:
      "Yes. Alongside Search Console and Shopify catalog signals, Discoverability Health tracks AI-crawler access (whether ChatGPT, Perplexity, Gemini and other answer-engine bots can read your store), brand protection against suspect or impersonating domains, and which sources those answer engines cite for your product queries—plus ranking movement across AI shopping answers—kept as connected evidence, not a separate score.",
  },
  {
    question: "Does Beseam detect every storefront failure?",
    answer:
      "No. Store Health currently combines observed real-user signals and existing product evidence. It does not yet synthetically reproduce every browser, market, product and payment path. Missing or stale evidence is shown as a coverage problem instead of being labelled healthy.",
  },
  {
    question: "How is Beseam different from an uptime monitor or an SEO tool?",
    answer:
      "An uptime monitor answers whether a page responds. An SEO tool usually focuses on search and page signals. Beseam connects discoverability, the purchase journey and the freshness of the monitoring sources so teams can investigate one evidence-backed issue list.",
  },
  {
    question: "What do stale, failed and not configured mean?",
    answer:
      "Stale means the latest data is older than the source-specific freshness window. Failed or disconnected means the connection cannot currently support an answer. Not configured means Beseam has no trustworthy data record for that source yet.",
  },
  {
    question: "Does Beseam replace our SEO team, developers or Shopify agency?",
    answer:
      "No. Beseam provides the technical monitoring and evidence layer beneath their work. SEO and content teams see affected products and technical evidence; ecommerce teams see prioritized health concerns; developers and agencies receive a clearer investigation path.",
  },
  {
    question: "How do conversion-monitor alerts work?",
    answer:
      "Where a conversion monitor is configured, it runs hourly and compares current performance with an earlier baseline window. It creates an alert when the configured threshold is crossed. Optional email notification is available. This is a statistical signal and still requires investigation.",
  },
  {
    question: "What happens in a Store Health Review?",
    answer:
      "The 30-minute review looks at your Shopify setup, current monitoring coverage and the problems your team most needs to detect. You leave with identified blind spots, the first checks to prioritize and a recommended pilot scope.",
  },
] as const;
