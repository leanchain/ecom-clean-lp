export type ComparisonRow = {
  criterion: string;
  competitor: string;
  beseam: string;
};

export type ComparisonWorkflowStep = {
  step: string;
  competitor: string;
  beseam: string;
};

export type ComparisonFaq = {
  question: string;
  answer: string;
};

export type ComparisonSource = {
  label: string;
  url: string;
};

export type Comparison = {
  slug: string;
  name: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  competitorSummary: string;
  beseamSummary: string;
  useTogetherSummary: string;
  chooseCompetitorWhen: string[];
  chooseBeseamWhen: string[];
  notAReplacementFor: string;
  rows: ComparisonRow[];
  workflow: ComparisonWorkflowStep[];
  evidence: {
    src: string;
    alt: string;
    caption: string;
  };
  faqs: ComparisonFaq[];
  sources: ComparisonSource[];
  lastReviewed: string;
};

export const COMPARISONS: Comparison[] = [
  {
    slug: "google-analytics",
    name: "Google Analytics",
    category: "Web analytics",
    metaTitle: "Beseam vs Google Analytics: Revenue intelligence beyond reporting",
    metaDescription:
      "Compare Beseam and Google Analytics. See where GA4 is stronger, where Beseam differs, and why commerce teams often use both.",
    headline: "Google Analytics reports the journey. Beseam decides what should change.",
    intro:
      "GA4 is a broad measurement system for acquisition, events, engagement, and conversions. Beseam works above the commerce stack to connect storefront, catalog, AI discovery, campaigns, behavior, reliability, and booked revenue—then ranks the issue that deserves action.",
    competitorSummary:
      "Choose Google Analytics for broad traffic, acquisition, event, and conversion reporting with a widely supported ecosystem.",
    beseamSummary:
      "Choose Beseam when the problem is not missing reports, but deciding which cross-system revenue leak to investigate and what commerce object should change.",
    useTogetherSummary:
      "Keep GA4 as the measurement source your analysts already use. Run Beseam alongside it to rank cross-system commerce issues, assign the next action, and verify the result from Beseam's connected evidence.",
    chooseCompetitorWhen: [
      "You need a standard traffic and acquisition reporting layer.",
      "Your team already has analysts who turn events and reports into decisions.",
      "Broad ecosystem compatibility matters more than a commerce-specific action loop.",
    ],
    chooseBeseamWhen: [
      "The same revenue problem appears across storefront, catalog, campaigns, behavior, and order data.",
      "Teams need one commercially ranked issue rather than another dashboard.",
      "You need the finding, owner, approval, change, and verification to stay connected.",
    ],
    notAReplacementFor:
      "Beseam is not a general-purpose replacement for GA4's acquisition reports, event exploration, or the many systems that already consume Google Analytics data.",
    rows: [
      {
        criterion: "Primary job",
        competitor: "Measure acquisition, events, engagement, and conversions across websites and apps.",
        beseam: "Find and rank revenue leakage across commerce systems, then coordinate and verify the change.",
      },
      {
        criterion: "Data scope",
        competitor: "Instrumented web and app activity, campaign parameters, and configured events.",
        beseam: "Storefront, catalog, customer journeys, AI answers, campaign readiness, incidents, and booked commerce data.",
      },
      {
        criterion: "What the team receives",
        competitor: "Reports, explorations, audiences, and attribution views.",
        beseam: "A specific issue tied to a product, page, query, journey, or channel, with evidence and an owner.",
      },
      {
        criterion: "Action and verification",
        competitor: "Usually handled in another workflow or platform.",
        beseam: "The proposed change, approval, execution state, and equivalent-period verification remain attached to the finding.",
      },
      {
        criterion: "Best relationship",
        competitor: "System of record for analytics and acquisition reporting.",
        beseam: "Commerce decision and action layer that can sit alongside GA4 without replacing it.",
      },
    ],
    workflow: [
      {
        step: "Detect the drop",
        competitor: "A report or alert shows a change in traffic, engagement, or conversion.",
        beseam: "The same change is connected to affected products, pages, campaigns, incidents, and order windows.",
      },
      {
        step: "Decide what matters",
        competitor: "An analyst investigates reports and builds a hypothesis.",
        beseam: "Evidence is ranked by commercial consequence and confidence, with one issue promoted for action.",
      },
      {
        step: "Make the change",
        competitor: "The team moves into a CMS, commerce platform, ad platform, or ticketing tool.",
        beseam: "The affected commerce object, proposed change, owner, and approval boundary remain explicit.",
      },
      {
        step: "Verify",
        competitor: "The analyst returns to reporting and interprets the result.",
        beseam: "Beseam rechecks the original signal and keeps booked, attributed, observed, and modeled money separate.",
      },
    ],
    evidence: {
      src: "/images/product-live/revenue-analytics.webp",
      alt: "Beseam revenue analytics workspace showing commerce metrics for the Dancing Queens store",
      caption:
        "Real Beseam revenue analytics for Dancing Queens. Beseam uses measurement as evidence inside a larger issue-to-action trace.",
    },
    faqs: [
      {
        question: "Does Beseam replace Google Analytics?",
        answer:
          "Usually not. GA4 can remain the analytics system of record. Beseam adds cross-system commerce diagnosis, prioritization, ownership, and verification above it.",
      },
      {
        question: "Can Beseam work without GA4?",
        answer:
          "Yes. Beseam can use commerce, storefront, catalog, campaign, AI visibility, and other connected evidence. The exact coverage depends on the products and integrations enabled for the store.",
      },
      {
        question: "What is the main difference?",
        answer:
          "GA4 is designed to measure and explore behavior. Beseam is designed to decide which commerce issue deserves attention, connect it to an action, and verify what changed.",
      },
    ],
    sources: [
      {
        label: "Google Analytics: user acquisition vs traffic acquisition",
        url: "https://support.google.com/analytics/answer/14731736?hl=en",
      },
      {
        label: "Google Analytics developer documentation",
        url: "https://developers.google.com/analytics",
      },
    ],
    lastReviewed: "2026-07-25",
  },
  {
    slug: "hotjar",
    name: "Hotjar",
    category: "Behavior analytics",
    metaTitle: "Beseam vs Hotjar: From behavior evidence to revenue action",
    metaDescription:
      "Compare Beseam and Hotjar. See when heatmaps and recordings are the better tool, and when commerce teams need cross-system prioritization and action.",
    headline: "Hotjar shows the session. Beseam ranks the revenue issue behind it.",
    intro:
      "Hotjar is built for visual behavior evidence through heatmaps, recordings, and feedback. Beseam's Behavior product treats behavior as one part of a broader commerce decision that also includes products, pages, AI visibility, campaigns, incidents, and booked revenue.",
    competitorSummary:
      "Choose Hotjar when your team needs fast visual evidence of clicks, scroll depth, hesitation, and individual sessions.",
    beseamSummary:
      "Choose Beseam when behavior evidence must be connected to a product, page, campaign, commercial consequence, owner, and verified change.",
    useTogetherSummary:
      "Keep Hotjar for replay and heatmaps. Use Beseam to decide which behavior pattern matters commercially and move the issue through action and verification.",
    chooseCompetitorWhen: [
      "Watching individual sessions is central to how your team diagnoses experience problems.",
      "You need heatmaps or on-site feedback quickly.",
      "The immediate question is what visitors clicked, ignored, or struggled with on a page.",
    ],
    chooseBeseamWhen: [
      "The team already has behavior evidence but lacks a reliable way to prioritize it.",
      "The issue must be connected to product, catalog, campaign, or revenue context.",
      "You want the proposed change and verification to remain attached to the original evidence.",
    ],
    notAReplacementFor:
      "Beseam is not a one-for-one replacement for Hotjar's replay library, heatmap interface, or survey and feedback workflows.",
    rows: [
      {
        criterion: "Primary job",
        competitor: "Reveal how visitors use a site through heatmaps, recordings, and feedback.",
        beseam: "Combine behavior with the rest of commerce evidence and rank the issue that should be acted on.",
      },
      {
        criterion: "Evidence depth",
        competitor: "Strong visual and qualitative context for pages and sessions.",
        beseam: "Cross-system context tied to products, pages, queries, channels, incidents, and revenue periods.",
      },
      {
        criterion: "Prioritization",
        competitor: "Teams interpret recordings, maps, and feedback to decide what matters.",
        beseam: "Revenue-sensitive issues rise above operational noise using evidence and commercial consequence.",
      },
      {
        criterion: "Action",
        competitor: "Changes happen in another tool after the insight is found.",
        beseam: "The affected commerce object, owner, approval, and action state remain part of the same trace.",
      },
      {
        criterion: "Best relationship",
        competitor: "Qualitative behavior source.",
        beseam: "Decision layer that can turn behavior evidence into a governed commerce action.",
      },
    ],
    workflow: [
      {
        step: "Observe friction",
        competitor: "A heatmap or recording reveals hesitation, rage clicks, or abandonment.",
        beseam: "Behavior is connected to the affected product, page, segment, order window, and other live signals.",
      },
      {
        step: "Rank the issue",
        competitor: "The team reviews sessions and decides which pattern is meaningful.",
        beseam: "The issue is ranked alongside AI visibility, catalog, campaign, and reliability evidence.",
      },
      {
        step: "Change the experience",
        competitor: "The finding is handed to design, product, or engineering.",
        beseam: "The commerce object and recommended change remain explicit, with approval where customer-facing content is involved.",
      },
      {
        step: "Learn from the result",
        competitor: "The team revisits recordings or heatmaps after release.",
        beseam: "The original signal is rechecked and the verified outcome improves the next prioritization decision.",
      },
    ],
    evidence: {
      src: "/images/product-live/product-workflow.gif",
      alt: "Real Beseam product workflow for a Dancing Queens commerce product",
      caption:
        "A real Beseam product workflow. The product, issue, proposed change, and evidence remain connected instead of becoming a detached insight.",
    },
    faqs: [
      {
        question: "Does Beseam include session replay?",
        answer:
          "Beseam Behavior is not positioned as a replacement for a replay-first platform. Teams can keep Hotjar when individual replay and heatmap workflows are important.",
      },
      {
        question: "Can Hotjar and Beseam be used together?",
        answer:
          "Yes. Hotjar can provide qualitative behavior evidence while Beseam connects the issue to commerce context, prioritizes it, and follows the action through verification.",
      },
      {
        question: "What does Beseam add beyond a heatmap?",
        answer:
          "Beseam connects observed friction to the affected commerce object, other systems, commercial consequence, ownership, and the result after a change is made.",
      },
    ],
    sources: [
      {
        label: "Hotjar documentation: What is Hotjar?",
        url: "https://help.hotjar.com/hc/en-us/articles/36820019634961-What-is-Hotjar",
      },
      {
        label: "Hotjar Heatmaps",
        url: "https://www.hotjar.com/product/heatmaps/",
      },
    ],
    lastReviewed: "2026-07-25",
  },
  {
    slug: "contentsquare",
    name: "Contentsquare",
    category: "Experience analytics",
    metaTitle: "Beseam vs Contentsquare: Commerce decisions beyond experience analytics",
    metaDescription:
      "Compare Beseam and Contentsquare across journey analytics, behavior evidence, commercial prioritization, action, and verification.",
    headline: "Contentsquare explains the digital experience. Beseam connects it to the rest of commerce.",
    intro:
      "Contentsquare offers deep digital experience analytics, including journeys, zoning, replay, funnels, and impact analysis. Beseam is narrower in experience analytics and broader in commerce scope: it connects experience evidence with catalog, AI discovery, campaigns, reliability, actions, and booked revenue.",
    competitorSummary:
      "Choose Contentsquare for mature experience analytics, journey exploration, zoning, replay, and large-scale digital experience programs.",
    beseamSummary:
      "Choose Beseam when the decision must cross experience, catalog, discovery, advertising, operations, and revenue—and end in an owned, verified action.",
    useTogetherSummary:
      "Use Contentsquare for deep experience analysis and Beseam for the wider commerce decision. A qualified finding can move into Beseam's issue, ownership, and verification model without pretending the products are interchangeable.",
    chooseCompetitorWhen: [
      "Digital experience analytics is the main program and requires deep journey, zoning, replay, and friction analysis.",
      "A specialized experience team needs broad qualitative and quantitative exploration.",
      "Enterprise experience governance and analysis depth are the primary buying criteria.",
    ],
    chooseBeseamWhen: [
      "The problem crosses experience, catalog, AI visibility, campaigns, reliability, and orders.",
      "The team needs one commercially ranked decision rather than a larger analysis workspace.",
      "The issue must move into ownership, approval, execution, and outcome verification.",
    ],
    notAReplacementFor:
      "Beseam does not replace Contentsquare's full experience analytics suite, its depth of journey and zoning analysis, or its large replay program capabilities.",
    rows: [
      {
        criterion: "Primary job",
        competitor: "Analyze digital journeys, page elements, sessions, friction, and experience impact.",
        beseam: "Connect commerce evidence across systems and decide which issue should move into action.",
      },
      {
        criterion: "Experience depth",
        competitor: "Deep journey, zoning, replay, funnel, and frustration analysis.",
        beseam: "Behavior is one product inside a broader revenue intelligence portfolio.",
      },
      {
        criterion: "Commerce breadth",
        competitor: "Strong digital experience and impact context.",
        beseam: "Storefront, catalog, AI discovery, behavior, campaigns, incidents, actions, and booked revenue.",
      },
      {
        criterion: "Operating model",
        competitor: "Teams explore evidence and route findings through their existing processes.",
        beseam: "Finding, commercial consequence, owner, approval, execution, and verification share one trace.",
      },
      {
        criterion: "Best relationship",
        competitor: "Specialist experience analytics platform.",
        beseam: "Commerce decision layer that can incorporate experience findings with other systems.",
      },
    ],
    workflow: [
      {
        step: "Find an experience problem",
        competitor: "Journeys, zoning, replay, or friction analysis reveals a digital experience issue.",
        beseam: "The issue is connected with product, campaign, discovery, reliability, and order evidence.",
      },
      {
        step: "Quantify consequence",
        competitor: "Impact analysis connects experience quality to business metrics.",
        beseam: "Booked, observed, attributed, and modeled values retain separate methods and confidence.",
      },
      {
        step: "Prioritize",
        competitor: "Experience teams determine which opportunity enters the roadmap.",
        beseam: "The issue competes against other commerce leaks and is ranked for the next action.",
      },
      {
        step: "Verify the change",
        competitor: "Experience evidence is revisited after release.",
        beseam: "The original signal, action state, and equivalent-period outcome remain connected.",
      },
    ],
    evidence: {
      src: "/images/product-live/revenue-overview.webp",
      alt: "Real Beseam revenue overview for the Dancing Queens commerce store",
      caption:
        "Real Beseam revenue overview. Experience evidence is evaluated alongside the rest of the store rather than in isolation.",
    },
    faqs: [
      {
        question: "Is Beseam a Contentsquare replacement?",
        answer:
          "Not for teams buying the full depth of enterprise experience analytics. Beseam serves a different job: cross-system commerce prioritization and action with experience evidence as one input.",
      },
      {
        question: "When would a team use both?",
        answer:
          "Use Contentsquare for deep journey, zoning, replay, and friction analysis. Use Beseam when those findings must be ranked against catalog, discovery, campaign, reliability, and revenue issues.",
      },
      {
        question: "How is Beseam broader?",
        answer:
          "Beseam covers commerce objects and systems beyond the digital experience, including AI visibility, catalog readiness, advertising, actions, impact, and reliability.",
      },
    ],
    sources: [
      {
        label: "Contentsquare Experience Analytics",
        url: "https://contentsquare.com/platform/experience-analytics/",
      },
      {
        label: "Contentsquare product offerings",
        url: "https://support.contentsquare.com/hc/en-us/articles/37271708114577-Product-offerings",
      },
    ],
    lastReviewed: "2026-07-25",
  },
  {
    slug: "amplitude",
    name: "Amplitude",
    category: "Product analytics",
    metaTitle: "Beseam vs Amplitude: Product analytics or commerce revenue intelligence?",
    metaDescription:
      "Compare Beseam and Amplitude across product analytics, commerce scope, experimentation, prioritization, and action.",
    headline: "Amplitude answers product questions. Beseam prioritizes commerce decisions.",
    intro:
      "Amplitude is designed for product analytics: funnels, retention, cohorts, journeys, replay, experimentation, and product growth workflows. Beseam is designed around commerce objects and revenue leakage across storefront, catalog, AI discovery, campaigns, reliability, behavior, and orders.",
    competitorSummary:
      "Choose Amplitude when product teams need self-serve behavioral analytics, cohorts, retention, experimentation, and product development workflows.",
    beseamSummary:
      "Choose Beseam when the unit of work is a commerce product, page, query, campaign, or store issue—and the decision must include revenue consequence and action ownership.",
    useTogetherSummary:
      "Amplitude can remain the product analytics and experimentation environment. Beseam can surface the commerce issue that deserves analysis or an experiment and verify the result across the wider stack.",
    chooseCompetitorWhen: [
      "Product adoption, retention, cohorts, and feature behavior are the central questions.",
      "Product managers need self-serve event analysis and experimentation.",
      "The organization is building digital products beyond commerce storefront operations.",
    ],
    chooseBeseamWhen: [
      "The issue crosses product data, storefront content, AI discovery, advertising, behavior, incidents, and orders.",
      "The team needs a commerce-specific priority and owner, not only an analytical finding.",
      "The outcome must reconcile commerce money and improve the next agent decision.",
    ],
    notAReplacementFor:
      "Beseam does not replace Amplitude's general product analytics, retention and cohort analysis, feature analytics, or broad product experimentation workflows.",
    rows: [
      {
        criterion: "Primary job",
        competitor: "Understand product behavior, engagement, retention, journeys, and feature impact.",
        beseam: "Find and act on revenue leakage across commerce systems and objects.",
      },
      {
        criterion: "Core object",
        competitor: "Users, accounts, events, cohorts, funnels, and features.",
        beseam: "Stores, products, pages, queries, customer journeys, campaigns, incidents, and revenue periods.",
      },
      {
        criterion: "Experimentation",
        competitor: "Integrated product and feature experimentation with behavioral cohorts and metrics.",
        beseam: "Optimization is one possible intervention after a commerce issue has been identified and ranked.",
      },
      {
        criterion: "Decision output",
        competitor: "Charts, cohorts, dashboards, replay, and experiment results.",
        beseam: "A commercially ranked issue with evidence, affected object, owner, approval, action, and verification.",
      },
      {
        criterion: "Best relationship",
        competitor: "Product analytics and experimentation system.",
        beseam: "Commerce revenue agent that can send a well-defined opportunity into product analysis or experimentation.",
      },
    ],
    workflow: [
      {
        step: "Ask a product question",
        competitor: "Teams explore funnels, retention, journeys, cohorts, and replay.",
        beseam: "The agent observes commerce systems continuously and promotes the strongest revenue-sensitive issue.",
      },
      {
        step: "Build a hypothesis",
        competitor: "Product teams interpret behavior and define a test or product change.",
        beseam: "The issue already includes the affected commerce object, evidence, consequence, and proposed next move.",
      },
      {
        step: "Run the intervention",
        competitor: "Amplitude Experiment or another delivery system runs the test or rollout.",
        beseam: "Beseam keeps ownership and approval explicit and can use the existing platform for execution.",
      },
      {
        step: "Learn",
        competitor: "Experiment and analytics results inform the product roadmap.",
        beseam: "Verified commerce outcomes improve how the agent ranks the next issue.",
      },
    ],
    evidence: {
      src: "/images/product-live/optimization.webp",
      alt: "Real Beseam optimization workspace for Dancing Queens",
      caption:
        "Real Beseam optimization workspace. An experiment is one governed intervention inside the wider revenue issue trace.",
    },
    faqs: [
      {
        question: "Does Beseam replace Amplitude?",
        answer:
          "No for teams that need broad product analytics, cohorts, retention, and feature experimentation. Beseam focuses on commerce-specific cross-system decisions and actions.",
      },
      {
        question: "Can Beseam and Amplitude work together?",
        answer:
          "Yes. Beseam can identify and rank the commerce opportunity; Amplitude can support deeper behavioral analysis or experimentation where appropriate.",
      },
      {
        question: "How is Beseam's data model different?",
        answer:
          "Amplitude centers users, events, cohorts, funnels, and features. Beseam centers stores, products, pages, queries, campaigns, incidents, actions, and revenue periods.",
      },
    ],
    sources: [
      {
        label: "Amplitude Analytics documentation",
        url: "https://amplitude.com/docs/analytics",
      },
      {
        label: "Amplitude Session Replay documentation",
        url: "https://amplitude.com/docs/analytics/session-replay",
      },
      {
        label: "Amplitude Feature Experimentation",
        url: "https://www.amplitude.com/amplitude-experiment",
      },
    ],
    lastReviewed: "2026-07-25",
  },
  {
    slug: "vwo",
    name: "VWO",
    category: "Experimentation",
    metaTitle: "Beseam vs VWO: Opportunity discovery before experimentation",
    metaDescription:
      "Compare Beseam and VWO. See where experimentation and feature delivery win, and where Beseam adds cross-system commerce opportunity discovery.",
    headline: "VWO runs the experiment. Beseam finds what deserves one.",
    intro:
      "VWO is built for testing, feature delivery, rollouts, personalization, and experiment measurement. Beseam starts earlier: it observes the commerce stack, finds the revenue-sensitive issue, and decides whether the right intervention is an experiment, a catalog fix, a campaign change, a content update, or an operational response.",
    competitorSummary:
      "Choose VWO when the main job is designing, targeting, delivering, and measuring experiments, feature flags, rollouts, or personalization.",
    beseamSummary:
      "Choose Beseam when the main problem is deciding what deserves intervention across commerce systems before committing traffic or engineering effort to a test.",
    useTogetherSummary:
      "Beseam can identify and rank the opportunity. VWO can run the experiment or rollout. The result can return to Beseam as verified evidence for the next decision.",
    chooseCompetitorWhen: [
      "Experiment design, targeting, feature flags, progressive rollout, or personalization is the immediate need.",
      "Your team already has a reliable experimentation backlog.",
      "Engineering and product teams need controlled feature delivery across web, mobile, or backend systems.",
    ],
    chooseBeseamWhen: [
      "The experimentation backlog is driven by opinion rather than cross-system commercial evidence.",
      "The right intervention may be a catalog, campaign, content, reliability, or product change—not necessarily an A/B test.",
      "You want the result to improve how the next commerce issue is prioritized.",
    ],
    notAReplacementFor:
      "Beseam does not replace VWO's full experimentation engine, feature flag SDKs, progressive rollouts, statistical testing methods, or personalization delivery.",
    rows: [
      {
        criterion: "Primary job",
        competitor: "Run web and feature experiments, rollouts, flags, and personalization.",
        beseam: "Discover, rank, and govern commerce interventions across systems.",
      },
      {
        criterion: "Starting point",
        competitor: "A team arrives with a feature, hypothesis, audience, and metric to test.",
        beseam: "The agent observes the stack and identifies the issue, affected object, evidence, and commercial consequence.",
      },
      {
        criterion: "Intervention range",
        competitor: "Experiments, feature delivery, rollouts, and personalization.",
        beseam: "Catalog, content, campaign, product, experience, reliability, or experiment actions.",
      },
      {
        criterion: "Outcome",
        competitor: "Experiment or rollout performance with statistical and operational controls.",
        beseam: "Verified commercial evidence that remains attached to the original issue and improves future prioritization.",
      },
      {
        criterion: "Best relationship",
        competitor: "Experiment and delivery system.",
        beseam: "Opportunity and decision system that can hand a qualified intervention to VWO.",
      },
    ],
    workflow: [
      {
        step: "Find the opportunity",
        competitor: "A product, growth, or optimization team supplies the hypothesis.",
        beseam: "The agent identifies a revenue-sensitive issue from commerce evidence.",
      },
      {
        step: "Choose the intervention",
        competitor: "The issue is framed as an experiment, feature flag, rollout, or personalization rule.",
        beseam: "Beseam decides whether the issue needs an experiment or a different commerce change.",
      },
      {
        step: "Deliver safely",
        competitor: "VWO manages targeting, traffic, flags, rollout, rollback, and experiment execution.",
        beseam: "Beseam keeps the issue, owner, approval, and commercial context attached while the existing platform executes.",
      },
      {
        step: "Use the result",
        competitor: "The winning variation or rollout result informs delivery decisions.",
        beseam: "The verified result changes how the self-improving agent ranks the next opportunity.",
      },
    ],
    evidence: {
      src: "/images/product-live/optimization.webp",
      alt: "Real Beseam optimization workspace showing an experiment for Dancing Queens",
      caption:
        "Real Beseam optimization evidence. Beseam treats experimentation as one intervention—not the default answer to every issue.",
    },
    faqs: [
      {
        question: "Does Beseam replace VWO?",
        answer:
          "No. VWO is stronger when the primary requirement is experimentation, feature flags, progressive rollout, or personalization delivery. Beseam identifies and ranks the commerce issue before choosing the intervention.",
      },
      {
        question: "Can Beseam send work to VWO?",
        answer:
          "That is the intended relationship conceptually: Beseam can identify a qualified opportunity and preserve its evidence while the existing experimentation platform runs the test or rollout. Integration availability depends on the contracted setup.",
      },
      {
        question: "Why not test every Beseam recommendation?",
        answer:
          "Some issues are factual catalog errors, broken campaign prerequisites, incorrect AI claims, or reliability incidents. Those may require correction or operational response rather than traffic allocation to an experiment.",
      },
    ],
    sources: [
      {
        label: "VWO Feature Experimentation",
        url: "https://vwo.com/feature-experimentation/",
      },
      {
        label: "VWO Feature Experimentation overview",
        url: "https://help.vwo.com/hc/en-us/articles/56698846927385-Overview-of-Feature-Experimentation-FE",
      },
    ],
    lastReviewed: "2026-07-25",
  },
  {
    slug: "triple-whale",
    name: "Triple Whale",
    category: "Commerce analytics",
    metaTitle: "Beseam vs Triple Whale: Commerce measurement or revenue action?",
    metaDescription:
      "Compare Beseam and Triple Whale across attribution, commerce analytics, revenue diagnosis, action, and verification.",
    headline: "Triple Whale measures commerce. Beseam turns the evidence into action.",
    intro:
      "Triple Whale brings ecommerce analytics, attribution, marketing performance, website conversion, retention, and portfolio reporting together. Beseam uses measurement as evidence inside a wider agent loop that also covers catalog, storefront, AI discovery, behavior, reliability, campaigns, actions, and verified outcomes.",
    competitorSummary:
      "Choose Triple Whale when unified ecommerce reporting, attribution, marketing performance, retention, and portfolio analytics are the central buying need.",
    beseamSummary:
      "Choose Beseam when the problem is deciding which cross-system revenue issue should be acted on, who owns it, what should change, and whether the change worked.",
    useTogetherSummary:
      "Use Triple Whale for commerce measurement and attribution and Beseam for cross-system prioritization and action. Where the contracted setup connects the data, the evidence can remain attached to the relevant product, page, campaign, or revenue period.",
    chooseCompetitorWhen: [
      "Paid media attribution and ecommerce reporting are the main priorities.",
      "The team needs unified dashboards for acquisition, conversion, retention, or multiple stores.",
      "Marketing performance analysis is the primary workflow.",
    ],
    chooseBeseamWhen: [
      "The issue extends beyond attribution into product, catalog, AI discovery, experience, campaign readiness, or reliability.",
      "The team needs one prioritized action with ownership and evidence.",
      "Measurement must be connected to the actual commerce object and verified change.",
    ],
    notAReplacementFor:
      "Beseam does not replace Triple Whale's full attribution, marketing mix, ecommerce dashboard, retention, or portfolio reporting workflows.",
    rows: [
      {
        criterion: "Primary job",
        competitor: "Unify ecommerce analytics, marketing attribution, conversion, retention, and portfolio reporting.",
        beseam: "Find, rank, and act on revenue leakage across the full commerce stack.",
      },
      {
        criterion: "Measurement depth",
        competitor: "Strong marketing and ecommerce measurement, including attribution and business reporting.",
        beseam: "Keeps booked, observed, attributed, and modeled values distinct while using each as evidence.",
      },
      {
        criterion: "Commerce object",
        competitor: "Dashboards and analysis across orders, marketing, customers, products, and stores.",
        beseam: "The exact product, page, query, campaign, journey, or incident attached to the issue and action.",
      },
      {
        criterion: "Action model",
        competitor: "Teams use reporting to make decisions in their operating tools.",
        beseam: "The decision, owner, approval, execution state, and verification remain connected.",
      },
      {
        criterion: "Best relationship",
        competitor: "Commerce analytics and attribution source.",
        beseam: "Revenue decision and action layer that can incorporate the measurement.",
      },
    ],
    workflow: [
      {
        step: "Measure performance",
        competitor: "Dashboards show acquisition, attribution, conversion, retention, and business performance.",
        beseam: "Measurement is combined with catalog, storefront, AI discovery, behavior, campaign, and reliability evidence.",
      },
      {
        step: "Find the cause",
        competitor: "Teams investigate the relevant reports and channels.",
        beseam: "The issue is attached to the affected commerce object and ranked against other leaks.",
      },
      {
        step: "Act",
        competitor: "The team moves into advertising, commerce, content, or product systems.",
        beseam: "The action retains its evidence, owner, approval requirements, and commercial context.",
      },
      {
        step: "Reconcile the result",
        competitor: "Marketing and commerce reports show subsequent performance.",
        beseam: "Beseam verifies the original signal while preserving the meaning and source of each money metric.",
      },
    ],
    evidence: {
      src: "/images/product-live/revenue-overview.webp",
      alt: "Real Beseam revenue overview for the Dancing Queens commerce store",
      caption:
        "Real Beseam revenue overview. Measurement is the beginning of the decision trace, not the end of the workflow.",
    },
    faqs: [
      {
        question: "Does Beseam replace Triple Whale?",
        answer:
          "Not when the main requirement is deep ecommerce attribution, marketing reporting, retention analytics, or portfolio reporting. Beseam adds cross-system issue prioritization and action.",
      },
      {
        question: "Can Beseam use attribution data?",
        answer:
          "Beseam's metric model can preserve attributed values as attributed evidence rather than presenting them as booked revenue. The exact connected sources depend on the store's setup.",
      },
      {
        question: "What does Beseam add after the dashboard?",
        answer:
          "Beseam connects the evidence to a specific product, page, query, campaign, journey, or incident, assigns the next action, and verifies the original signal after the change.",
      },
    ],
    sources: [
      {
        label: "Triple Whale ecommerce analytics",
        url: "https://www.triplewhale.com/analytics",
      },
      {
        label: "Triple Whale Web Analytics",
        url: "https://kb.triplewhale.com/en/articles/8048283-web-analytics",
      },
      {
        label: "Triple Whale Portfolio Attribution",
        url: "https://kb.triplewhale.com/en/articles/10290427-portfolio-attribution",
      },
    ],
    lastReviewed: "2026-07-25",
  },
];

export const COMPARISON_SLUGS = COMPARISONS.map((comparison) => comparison.slug);

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((comparison) => comparison.slug === slug);
}
