export const FIELD_REVIEW_DATE = "2026-07-25";

export const RESOURCE_CATEGORIES = [
  "Agent skills and protocols",
  "Commerce platforms and storefronts",
  "Catalog, feeds and structured data",
  "Discovery, SEO and GEO",
  "Analytics and attribution",
  "Testing, crawling and performance",
  "Accessibility, security and privacy",
  "Observability and incident response",
] as const;

export const RESOURCE_KINDS = [
  "Open-source project",
  "Open standard",
  "Primary reference",
  "Community specification",
  "Beseam project",
] as const;

export const RESOURCE_MATURITIES = [
  "Stable",
  "Reference",
  "Emerging",
  "Experimental",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];
export type ResourceKind = (typeof RESOURCE_KINDS)[number];
export type ResourceMaturity = (typeof RESOURCE_MATURITIES)[number];

export type EcosystemResource = {
  slug: string;
  name: string;
  kind: ResourceKind;
  category: ResourceCategory;
  maturity: ResourceMaturity;
  maintainer: string;
  license: string;
  url: string;
  summary: string;
  useCases: string[];
  tags: string[];
  reviewedAt: string;
};

export const FIELD_TYPES = [
  {
    title: "Problems",
    href: "/resources/problems",
    description:
      "Start with the symptom your team is seeing, then narrow the evidence and the first investigation path.",
  },
  {
    title: "Agent skills",
    href: "/resources/skills",
    description:
      "Reusable, evidence-aware workflows for Claude, coding agents, other assistants, or a human operator.",
  },
  {
    title: "Projects and references",
    href: "/resources/projects",
    description:
      "Open-source tools, standards, primary documentation, and Beseam projects that support practical commerce work.",
  },
] as const;

export const ECOSYSTEM_RESOURCES: EcosystemResource[] = [
  {
    slug: "anthropic-agent-skills",
    name: "Anthropic Agent Skills",
    kind: "Open-source project",
    category: "Agent skills and protocols",
    maturity: "Emerging",
    maintainer: "Anthropic and contributors",
    license: "Mixed: Apache-2.0 examples and source-available document skills",
    url: "https://github.com/anthropics/skills",
    summary:
      "Public examples, templates, and the reference structure for reusable SKILL.md-based agent capabilities.",
    useCases: [
      "Designing versioned commerce skills",
      "Reviewing skill packaging and boundaries",
    ],
    tags: ["Agent skills", "Claude", "SKILL.md"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "agent-skills-specification",
    name: "Agent Skills specification",
    kind: "Primary reference",
    category: "Agent skills and protocols",
    maturity: "Emerging",
    maintainer: "Agent Skills maintainers",
    license: "Published specification; see repository terms",
    url: "https://agentskills.io/specification",
    summary:
      "The published structure and metadata model for portable folders of agent instructions, scripts, and resources.",
    useCases: [
      "Validating public skill packages",
      "Keeping skills portable across compatible agents",
    ],
    tags: ["Specification", "Agent skills", "Portability"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "shopify-ai-toolkit",
    name: "Shopify AI Toolkit",
    kind: "Open-source project",
    category: "Agent skills and protocols",
    maturity: "Emerging",
    maintainer: "Shopify",
    license: "MIT",
    url: "https://github.com/Shopify/shopify-ai-toolkit",
    summary:
      "Shopify-aware agent plugins, skills, documentation lookup, schema validation, and CLI-assisted store workflows.",
    useCases: [
      "Shopify development with current platform context",
      "GraphQL, Liquid, and extension validation",
    ],
    tags: ["Shopify", "Agent skills", "Validation"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "model-context-protocol",
    name: "Model Context Protocol",
    kind: "Open standard",
    category: "Agent skills and protocols",
    maturity: "Emerging",
    maintainer: "Model Context Protocol project",
    license: "MIT",
    url: "https://github.com/modelcontextprotocol/modelcontextprotocol",
    summary:
      "An open protocol and schema for connecting AI applications to tools, data sources, and contextual services.",
    useCases: [
      "Connecting commerce agents to approved systems",
      "Separating tool contracts from model prompts",
    ],
    tags: ["MCP", "Agents", "Integrations"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "promptfoo",
    name: "Promptfoo",
    kind: "Open-source project",
    category: "Agent skills and protocols",
    maturity: "Stable",
    maintainer: "Promptfoo and contributors",
    license: "MIT",
    url: "https://github.com/promptfoo/promptfoo",
    summary:
      "A framework for evaluating prompts, agents, and model behavior with repeatable test cases and assertions.",
    useCases: [
      "AI answer regression checks",
      "Commerce-agent workflow evaluation",
    ],
    tags: ["AI evaluation", "GEO", "Agents"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "saleor-mcp",
    name: "Saleor MCP",
    kind: "Open-source project",
    category: "Agent skills and protocols",
    maturity: "Experimental",
    maintainer: "Saleor",
    license: "AGPL-3.0",
    url: "https://github.com/saleor/saleor-mcp",
    summary:
      "An ecommerce-specific MCP server for exploring how agents can interact with a composable commerce platform.",
    useCases: [
      "Agent-to-commerce experiments",
      "Studying scoped commerce tools",
    ],
    tags: ["Saleor", "MCP", "Agentic commerce"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "shopify-ucp-quickstart",
    name: "Shopify Universal Commerce Protocol quickstart",
    kind: "Primary reference",
    category: "Agent skills and protocols",
    maturity: "Emerging",
    maintainer: "Shopify",
    license: "Official developer documentation",
    url: "https://shopify.dev/docs/agents/get-started/quickstart",
    summary:
      "Shopify's current walkthrough for agent-driven product discovery, cart creation, checkout conversion, and order tracking.",
    useCases: [
      "Tracking agentic-commerce capabilities",
      "Separating preview workflows from stable storefront behavior",
    ],
    tags: ["Shopify", "UCP", "Agentic commerce"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "medusa",
    name: "Medusa",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Medusa and contributors",
    license: "MIT",
    url: "https://github.com/medusajs/medusa",
    summary:
      "Composable commerce modules for product, cart, order, inventory, fulfillment, and integration workflows.",
    useCases: [
      "Headless commerce references",
      "Catalog and order integration experiments",
    ],
    tags: ["Commerce platform", "Headless", "Catalog"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "vendure",
    name: "Vendure",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Vendure and contributors",
    license: "GPL-3.0",
    url: "https://github.com/vendurehq/vendure",
    summary:
      "A TypeScript and GraphQL headless commerce framework with channel, catalog, order, and localization primitives.",
    useCases: [
      "Channel-aware catalog patterns",
      "TypeScript commerce integrations",
    ],
    tags: ["Commerce platform", "GraphQL", "TypeScript"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "saleor",
    name: "Saleor Core",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Saleor and contributors",
    license: "BSD-3-Clause",
    url: "https://github.com/saleor/saleor",
    summary:
      "A composable GraphQL commerce API for products, channels, checkout, orders, apps, and multi-market operations.",
    useCases: [
      "Composable commerce architecture",
      "GraphQL catalog and checkout references",
    ],
    tags: ["Commerce platform", "GraphQL", "Composable"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Automattic and contributors",
    license: "GPL-3.0-or-later",
    url: "https://github.com/woocommerce/woocommerce",
    summary:
      "The open-source WordPress commerce platform and a major reference for plugin-driven storefront operations.",
    useCases: [
      "WordPress commerce investigations",
      "Plugin and theme interaction patterns",
    ],
    tags: ["Commerce platform", "WordPress", "Plugins"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "sylius",
    name: "Sylius",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Sylius and contributors",
    license: "MIT",
    url: "https://github.com/Sylius/Sylius",
    summary:
      "A Symfony-based headless ecommerce framework for highly customized commerce applications and integrations.",
    useCases: [
      "Custom commerce-domain modeling",
      "PHP and API-led storefront references",
    ],
    tags: ["Commerce platform", "Symfony", "Headless"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "spree",
    name: "Spree Commerce",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Spree Commerce and contributors",
    license: "BSD-3-Clause",
    url: "https://github.com/spree/spree",
    summary:
      "A headless ecommerce platform with REST APIs, a TypeScript SDK, and a Next.js storefront.",
    useCases: [
      "Cross-border and B2B patterns",
      "Storefront and backend reference implementations",
    ],
    tags: ["Commerce platform", "REST API", "Next.js"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "bagisto",
    name: "Bagisto",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Webkul and contributors",
    license: "MIT",
    url: "https://github.com/bagisto/bagisto",
    summary:
      "A Laravel ecommerce platform with marketplace, multi-tenant, mobile, and headless extension patterns.",
    useCases: [
      "Laravel commerce references",
      "Marketplace and multi-tenant experiments",
    ],
    tags: ["Commerce platform", "Laravel", "Marketplace"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "prestashop",
    name: "PrestaShop",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "PrestaShop and contributors",
    license: "OSL-3.0",
    url: "https://github.com/PrestaShop/PrestaShop",
    summary:
      "An established open-source ecommerce platform with modules, themes, product, order, and internationalization workflows.",
    useCases: [
      "Module-driven commerce investigations",
      "International catalog references",
    ],
    tags: ["Commerce platform", "PHP", "Modules"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "magento-open-source",
    name: "Magento Open Source",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Adobe, Magento community, and contributors",
    license: "OSL-3.0; repository also includes other license files",
    url: "https://github.com/magento/magento2",
    summary:
      "A large modular ecommerce codebase for catalog, pricing, inventory, checkout, indexing, and extension workflows.",
    useCases: [
      "Enterprise commerce architecture references",
      "Indexing and extension investigations",
    ],
    tags: ["Commerce platform", "PHP", "Enterprise"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "shopify-hydrogen",
    name: "Shopify Hydrogen",
    kind: "Open-source project",
    category: "Commerce platforms and storefronts",
    maturity: "Stable",
    maintainer: "Shopify and contributors",
    license: "MIT",
    url: "https://github.com/Shopify/hydrogen",
    summary:
      "Shopify's open-source stack and libraries for building dynamic headless storefronts with React Router.",
    useCases: [
      "Shopify headless storefronts",
      "Storefront API and performance patterns",
    ],
    tags: ["Shopify", "Headless", "React"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "schema-org",
    name: "Schema.org",
    kind: "Open standard",
    category: "Catalog, feeds and structured data",
    maturity: "Reference",
    maintainer: "Schema.org community",
    license:
      "Vocabulary and supporting software published for reuse; see terms",
    url: "https://schema.org/",
    summary:
      "The shared structured-data vocabulary used to describe products, offers, organizations, reviews, and web entities.",
    useCases: [
      "Product and Offer markup",
      "Merchant and organization identity",
    ],
    tags: ["Structured data", "SEO", "Catalog"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "google-product-structured-data",
    name: "Google Product structured-data documentation",
    kind: "Primary reference",
    category: "Catalog, feeds and structured data",
    maturity: "Reference",
    maintainer: "Google Search Central",
    license: "Official documentation",
    url: "https://developers.google.com/search/docs/appearance/structured-data/product",
    summary:
      "Google's requirements and guidance for Product snippets and merchant-listing structured data in Search.",
    useCases: ["Merchant-listing eligibility", "Product and Offer validation"],
    tags: ["Structured data", "Google Search", "Product"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "google-merchant-product-data-spec",
    name: "Google Merchant Center product data specification",
    kind: "Primary reference",
    category: "Catalog, feeds and structured data",
    maturity: "Reference",
    maintainer: "Google Merchant Center",
    license: "Official documentation",
    url: "https://support.google.com/merchants/answer/7052112?hl=en",
    summary:
      "The attribute, formatting, identifier, availability, price, and landing-page requirements for Merchant Center data.",
    useCases: ["Feed validation", "Feed-to-landing-page parity"],
    tags: ["Merchant feeds", "Google Shopping", "Catalog"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "gs1-digital-link",
    name: "GS1 Digital Link standard",
    kind: "Open standard",
    category: "Catalog, feeds and structured data",
    maturity: "Reference",
    maintainer: "GS1",
    license: "GS1 standard; usage subject to GS1 terms",
    url: "https://www.gs1.org/standards/gs1-digital-link",
    summary:
      "A standard for expressing GS1 identifiers in web-addressable links that connect physical products to digital information.",
    useCases: [
      "Product identity resolution",
      "Connecting GTINs to web resources",
    ],
    tags: ["GS1", "Product identity", "Standards"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "json-ld-11",
    name: "JSON-LD 1.1",
    kind: "Open standard",
    category: "Catalog, feeds and structured data",
    maturity: "Reference",
    maintainer: "W3C",
    license: "W3C Recommendation",
    url: "https://www.w3.org/TR/json-ld11/",
    summary:
      "The W3C recommendation for expressing linked data in JSON, commonly used to publish product structured data.",
    useCases: [
      "Structured-data serialization",
      "Validating context and graph behavior",
    ],
    tags: ["JSON-LD", "W3C", "Structured data"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "shopify-storefront-api",
    name: "Shopify Storefront API",
    kind: "Primary reference",
    category: "Catalog, feeds and structured data",
    maturity: "Reference",
    maintainer: "Shopify",
    license: "Official API documentation",
    url: "https://shopify.dev/docs/api/storefront",
    summary:
      "The official Shopify API surface for public products, collections, carts, customer accounts, and storefront experiences.",
    useCases: [
      "Catalog source-of-truth checks",
      "Headless storefront integration review",
    ],
    tags: ["Shopify", "GraphQL", "Storefront API"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "google-merchant-api",
    name: "Google Merchant API",
    kind: "Primary reference",
    category: "Catalog, feeds and structured data",
    maturity: "Reference",
    maintainer: "Google",
    license: "Official API documentation",
    url: "https://developers.google.com/merchant/api",
    summary:
      "Google's current API documentation for programmatic merchant accounts, products, data sources, and diagnostics.",
    useCases: [
      "Merchant diagnostics integrations",
      "Programmatic product-data workflows",
    ],
    tags: ["Merchant Center", "API", "Catalog"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "robots-exclusion-protocol",
    name: "Robots Exclusion Protocol: RFC 9309",
    kind: "Open standard",
    category: "Discovery, SEO and GEO",
    maturity: "Reference",
    maintainer: "Internet Engineering Task Force",
    license: "Internet Standards Track",
    url: "https://www.rfc-editor.org/rfc/rfc9309.html",
    summary:
      "The standards-track definition of robots.txt retrieval, matching, errors, and caching for automated clients.",
    useCases: [
      "Crawler-access reviews",
      "Separating crawl controls from authorization",
    ],
    tags: ["Crawling", "SEO", "Web standards"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "sitemaps-protocol",
    name: "Sitemaps protocol",
    kind: "Open standard",
    category: "Discovery, SEO and GEO",
    maturity: "Reference",
    maintainer: "Sitemaps.org participants",
    license: "Protocol published for implementation",
    url: "https://www.sitemaps.org/protocol.html",
    summary:
      "The XML sitemap format and submission rules used to communicate canonical URLs and update metadata to crawlers.",
    useCases: [
      "Catalog URL discovery",
      "Sitemap completeness and freshness checks",
    ],
    tags: ["Sitemaps", "Crawling", "SEO"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "google-search-essentials",
    name: "Google Search Essentials",
    kind: "Primary reference",
    category: "Discovery, SEO and GEO",
    maturity: "Reference",
    maintainer: "Google Search Central",
    license: "Official documentation",
    url: "https://developers.google.com/search/docs/essentials",
    summary:
      "Google's technical requirements, spam policies, and core best practices for eligibility and performance in Search.",
    useCases: [
      "Technical SEO acceptance criteria",
      "Checking third-party SEO recommendations",
    ],
    tags: ["Google Search", "SEO", "Policies"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "google-generative-ai-search-guide",
    name: "Google guide to generative AI features in Search",
    kind: "Primary reference",
    category: "Discovery, SEO and GEO",
    maturity: "Emerging",
    maintainer: "Google Search Central",
    license: "Official documentation",
    url: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
    summary:
      "Google's current guidance on AI Overviews, AI Mode, SEO fundamentals, measurement, and claims around AEO and GEO tactics.",
    useCases: [
      "Grounding GEO recommendations",
      "Avoiding unsupported AI-search shortcuts",
    ],
    tags: ["Generative search", "GEO", "Google Search"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "indexnow",
    name: "IndexNow",
    kind: "Open standard",
    category: "Discovery, SEO and GEO",
    maturity: "Stable",
    maintainer: "IndexNow sponsors and participating search engines",
    license: "CC BY-SA 4.0 specification",
    url: "https://www.indexnow.org/documentation",
    summary:
      "A protocol for notifying participating search engines when URLs are added, updated, or deleted.",
    useCases: ["Faster change notification", "Catalog URL update workflows"],
    tags: ["Indexing", "Search engines", "Protocol"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "shopify-agents-md",
    name: "Shopify agents.md and llms.txt templates",
    kind: "Primary reference",
    category: "Discovery, SEO and GEO",
    maturity: "Emerging",
    maintainer: "Shopify",
    license: "Official developer documentation",
    url: "https://shopify.dev/docs/storefronts/themes/architecture/templates/agents-md-liquid",
    summary:
      "Shopify's canonical agent-discovery document, template behavior, UCP metadata, and fallback relationship with llms.txt routes.",
    useCases: [
      "Shopify agent-discovery reviews",
      "Avoiding stale hardcoded agent endpoints",
    ],
    tags: ["Shopify", "agents.md", "Agent discovery"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "llms-txt-proposal",
    name: "llms.txt proposal",
    kind: "Community specification",
    category: "Discovery, SEO and GEO",
    maturity: "Experimental",
    maintainer: "Jeremy Howard and community contributors",
    license: "Community proposal; see site terms",
    url: "https://llmstxt.org/",
    summary:
      "A community proposal for serving a concise Markdown index intended to help language models use a website at inference time.",
    useCases: [
      "Tracking agent-discovery experiments",
      "Comparing proposals with platform-native implementations",
    ],
    tags: ["llms.txt", "GEO", "Proposal"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "web-bot-auth",
    name: "Web Bot Auth",
    kind: "Primary reference",
    category: "Discovery, SEO and GEO",
    maturity: "Emerging",
    maintainer: "IETF draft authors and implementers",
    license: "IETF drafts and implementation documentation",
    url: "https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/",
    summary:
      "A cryptographic request-signing approach for identifying automated bots and agents to participating web infrastructure.",
    useCases: [
      "Verified-agent access design",
      "Separating authenticated agents from anonymous crawling",
    ],
    tags: ["Agents", "Bot identity", "HTTP signatures"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "google-analytics-ecommerce",
    name: "Google Analytics ecommerce measurement",
    kind: "Primary reference",
    category: "Analytics and attribution",
    maturity: "Reference",
    maintainer: "Google Analytics",
    license: "Official developer documentation",
    url: "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce",
    summary:
      "The recommended GA4 ecommerce events, item model, currency handling, purchase identifiers, promotions, and refunds.",
    useCases: [
      "Event-contract reviews",
      "Revenue and item-level measurement reconciliation",
    ],
    tags: ["GA4", "Ecommerce events", "Measurement"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "shopify-web-pixels-api",
    name: "Shopify Web Pixels API",
    kind: "Primary reference",
    category: "Analytics and attribution",
    maturity: "Reference",
    maintainer: "Shopify",
    license: "Official developer documentation",
    url: "https://shopify.dev/docs/api/web-pixels-api",
    summary:
      "Shopify's controlled browser APIs and customer-event subscriptions for analytics and marketing measurement in sandboxed pixels.",
    useCases: [
      "Customer-event instrumentation",
      "Consent-aware Shopify measurement",
    ],
    tags: ["Shopify", "Measurement", "Customer events"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "snowplow-javascript-tracker",
    name: "Snowplow JavaScript Tracker",
    kind: "Open-source project",
    category: "Analytics and attribution",
    maturity: "Stable",
    maintainer: "Snowplow and contributors",
    license: "Apache-2.0",
    url: "https://github.com/snowplow/snowplow-javascript-tracker",
    summary:
      "A browser event-tracking SDK for structured first-party behavioral data and custom ecommerce measurement designs.",
    useCases: [
      "First-party event pipelines",
      "Comparing observed events with booked orders",
    ],
    tags: ["Analytics", "First-party data", "Events"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "lighthouse",
    name: "Lighthouse",
    kind: "Open-source project",
    category: "Testing, crawling and performance",
    maturity: "Stable",
    maintainer: "Google Chrome team and contributors",
    license: "Apache-2.0",
    url: "https://github.com/GoogleChrome/lighthouse",
    summary:
      "Automated audits for performance, accessibility, best practices, SEO, and evolving web-platform checks.",
    useCases: ["Storefront performance baselines", "Repeatable page audits"],
    tags: ["Performance", "SEO", "Accessibility"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "playwright",
    name: "Playwright",
    kind: "Open-source project",
    category: "Testing, crawling and performance",
    maturity: "Stable",
    maintainer: "Microsoft and contributors",
    license: "Apache-2.0",
    url: "https://github.com/microsoft/playwright",
    summary:
      "Cross-browser automation for Chromium, Firefox, and WebKit, useful for repeatable storefront and purchase-path verification.",
    useCases: ["Product-page checks", "Cart and checkout verification"],
    tags: ["Testing", "Purchase journey", "Automation"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "crawlee",
    name: "Crawlee",
    kind: "Open-source project",
    category: "Testing, crawling and performance",
    maturity: "Stable",
    maintainer: "Apify and contributors",
    license: "Apache-2.0",
    url: "https://github.com/apify/crawlee",
    summary:
      "A web crawling and browser-automation library for collecting repeatable evidence across catalogs and storefronts.",
    useCases: ["Catalog crawling", "Rendered-page evidence at scale"],
    tags: ["Crawling", "Catalog", "Evidence"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "axe-core",
    name: "axe-core",
    kind: "Open-source project",
    category: "Testing, crawling and performance",
    maturity: "Stable",
    maintainer: "Deque Systems and contributors",
    license: "MPL-2.0",
    url: "https://github.com/dequelabs/axe-core",
    summary:
      "An accessibility testing engine that can be integrated into automated storefront and component tests.",
    useCases: [
      "Automated accessibility regression tests",
      "Product-page usability evidence",
    ],
    tags: ["Accessibility", "Testing", "Compliance"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "web-vitals",
    name: "web-vitals",
    kind: "Open-source project",
    category: "Testing, crawling and performance",
    maturity: "Stable",
    maintainer: "Google Chrome team and contributors",
    license: "Apache-2.0",
    url: "https://github.com/GoogleChrome/web-vitals",
    summary:
      "A small library for measuring Core Web Vitals and attribution data from real storefront sessions.",
    useCases: [
      "Real-user performance measurement",
      "Diagnosing LCP, INP, and CLS regressions",
    ],
    tags: ["Core Web Vitals", "RUM", "Performance"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "k6",
    name: "Grafana k6",
    kind: "Open-source project",
    category: "Testing, crawling and performance",
    maturity: "Stable",
    maintainer: "Grafana Labs and contributors",
    license: "AGPL-3.0",
    url: "https://github.com/grafana/k6",
    summary:
      "A scriptable load-testing tool for APIs, storefront services, and performance-sensitive commerce workflows.",
    useCases: [
      "Checkout-service load tests",
      "Pre-release capacity verification",
    ],
    tags: ["Load testing", "Performance", "Reliability"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "wcag-22",
    name: "Web Content Accessibility Guidelines 2.2",
    kind: "Open standard",
    category: "Accessibility, security and privacy",
    maturity: "Reference",
    maintainer: "W3C Web Accessibility Initiative",
    license: "W3C Recommendation",
    url: "https://www.w3.org/TR/WCAG22/",
    summary:
      "The W3C recommendation for accessible content, navigation, input, authentication, and target sizing across purchase journeys.",
    useCases: [
      "Accessibility acceptance criteria",
      "Human verification beyond automated checks",
    ],
    tags: ["Accessibility", "Compliance", "UX"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "owasp-wstg",
    name: "OWASP Web Security Testing Guide",
    kind: "Open standard",
    category: "Accessibility, security and privacy",
    maturity: "Reference",
    maintainer: "OWASP Foundation and contributors",
    license: "CC BY-SA 4.0",
    url: "https://owasp.org/www-project-web-security-testing-guide/",
    summary:
      "A structured guide for testing web applications, authentication, authorization, sessions, input handling, and client-side security.",
    useCases: [
      "Storefront and account security reviews",
      "Defining authorized security-test coverage",
    ],
    tags: ["Security", "Testing guide", "OWASP"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "owasp-asvs",
    name: "OWASP Application Security Verification Standard",
    kind: "Open standard",
    category: "Accessibility, security and privacy",
    maturity: "Reference",
    maintainer: "OWASP Foundation and contributors",
    license: "CC BY-SA 4.0",
    url: "https://owasp.org/www-project-application-security-verification-standard/",
    summary:
      "A verification standard for defining and assessing application security controls at explicit assurance levels.",
    useCases: [
      "Security acceptance criteria",
      "Scoping commerce application controls",
    ],
    tags: ["Security", "Verification", "OWASP"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "opentelemetry-js",
    name: "OpenTelemetry JavaScript",
    kind: "Open-source project",
    category: "Observability and incident response",
    maturity: "Stable",
    maintainer: "OpenTelemetry community",
    license: "Apache-2.0",
    url: "https://github.com/open-telemetry/opentelemetry-js",
    summary:
      "Vendor-neutral instrumentation for traces, metrics, and logs across commerce applications and supporting services.",
    useCases: ["Checkout-service tracing", "Incident and reliability evidence"],
    tags: ["Observability", "Reliability", "Tracing"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "sentry-javascript",
    name: "Sentry JavaScript SDKs",
    kind: "Open-source project",
    category: "Observability and incident response",
    maturity: "Stable",
    maintainer: "Sentry and contributors",
    license: "MIT",
    url: "https://github.com/getsentry/sentry-javascript",
    summary:
      "Open-source browser and server SDKs for error capture, tracing, performance context, and debugging workflows.",
    useCases: [
      "Storefront error evidence",
      "Release and transaction diagnostics",
    ],
    tags: ["Errors", "Tracing", "JavaScript"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "prometheus",
    name: "Prometheus",
    kind: "Open-source project",
    category: "Observability and incident response",
    maturity: "Stable",
    maintainer: "Prometheus community and CNCF",
    license: "Apache-2.0",
    url: "https://github.com/prometheus/prometheus",
    summary:
      "A monitoring and alerting system built around dimensional time-series metrics and a flexible query language.",
    useCases: [
      "Commerce-service health metrics",
      "Alerting on operational regressions",
    ],
    tags: ["Metrics", "Monitoring", "Alerts"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "opentelemetry-semantic-conventions",
    name: "OpenTelemetry semantic conventions",
    kind: "Open standard",
    category: "Observability and incident response",
    maturity: "Reference",
    maintainer: "OpenTelemetry community",
    license: "Apache-2.0 specification repository",
    url: "https://opentelemetry.io/docs/specs/semconv/",
    summary:
      "Shared naming and attribute conventions that make telemetry comparable across services, frameworks, and vendors.",
    useCases: [
      "Consistent commerce telemetry",
      "Cross-service trace and metric review",
    ],
    tags: ["Telemetry", "Conventions", "Observability"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
  {
    slug: "beseam-ai-visibility-scan",
    name: "Beseam AI Discovery Scan",
    kind: "Beseam project",
    category: "Discovery, SEO and GEO",
    maturity: "Emerging",
    maintainer: "Beseam",
    license: "Hosted tool; not presented as open source",
    url: "/tools/ai-discovery-scan",
    summary:
      "A live scan for observing how products are represented across AI shopping and answer surfaces at a point in time.",
    useCases: [
      "Initial AI product recommendation review",
      "Starting evidence for a product-answer investigation",
    ],
    tags: ["AI recommendations", "Product discovery", "Beseam"],
    reviewedAt: FIELD_REVIEW_DATE,
  },
];

export function getResource(slug: string) {
  return ECOSYSTEM_RESOURCES.find((resource) => resource.slug === slug);
}

export const FEATURED_RESOURCES = [
  "anthropic-agent-skills",
  "schema-org",
  "shopify-hydrogen",
  "playwright",
  "google-generative-ai-search-guide",
  "wcag-22",
]
  .map(getResource)
  .filter((resource): resource is EcosystemResource => Boolean(resource));
