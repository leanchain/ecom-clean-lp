import {
  Brain,
  ListTodo,
  Radar,
  RefreshCw,
  Sparkles,
  Store,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";

import { buildPublicMetadata } from "@/lib/seo";

export type MarketingFaq = {
  question: string;
  answer: string;
};

export type MarketingPageData = {
  slug: string;
  eyebrow: string;
  headline: string;
  metaTitle: string;
  description: string;
  intro: string;
  proofLine: string;
  // Optional heading/intro override for the observations grid. Falls back to
  // "What Beseam uses" / evidence-source framing, which fits the single-topic
  // evidence pages but not a capability directory like /platform.
  observationsHeading?: string;
  observationsIntro?: string;
  observations: Array<{ title: string; detail: string; icon?: LucideIcon }>;
  sections: Array<{
    title: string;
    body: string;
    points: string[];
    icon?: LucideIcon;
  }>;
  limits: string[];
  faqs: MarketingFaq[];
  related: Array<{ label: string; href: string }>;
};

export const MARKETING_PAGES: Record<string, MarketingPageData> = {
  "ai-visibility-monitoring": {
    slug: "ai-visibility-monitoring",
    eyebrow: "AI shopping discovery",
    headline:
      "See when AI shopping answers leave your products out, then inspect what may be worth changing.",
    metaTitle: "AI Shopping Discovery Monitoring for Ecommerce | Beseam",
    description:
      "Observe real buying questions across AI assistants, keep the products and competitors named with the answer, and connect the result to evidence your team can investigate.",
    intro:
      "AI shopping discovery is one part of what Beseam sees before a shopper reaches the store. For each buying question, Beseam keeps the observed answer, products named, competitor context and relevant product evidence together so the team can decide whether a supported change is worth testing.",
    proofLine:
      "The result is an observed answer with traceable context, not a company-wide visibility score or a claim about hidden ranking logic.",
    observations: [
      {
        title: "The buying question",
        detail:
          "Branded, category, comparison, use-case, deal, shipping and where-to-buy questions define the exact decision you are testing.",
      },
      {
        title: "The observed answer",
        detail:
          "Keep the answer itself, the products it named, and whether your product appeared instead of reducing the run to one score.",
      },
      {
        title: "Competitors and sources",
        detail:
          "See which competing products appeared and which citations or supporting sources were exposed by the assistant when available.",
      },
      {
        title: "Product evidence you control",
        detail:
          "Connect the miss to supported product-page, catalog, structured-data or feed differences your team can inspect and change.",
      },
    ],
    sections: [
      {
        title: "Start with the answer, not an index.",
        body: "A merchant needs to know what happened on a specific buying question: what the assistant said, which products were recommended and whether the merchant's product was represented correctly. Beseam keeps that run-level evidence visible instead of turning the result into a detached visibility grade.",
        points: [
          "Keep the original question and observed answer together.",
          "Record the products and merchants named in that answer.",
          "Separate incorrect product facts from simple absence.",
        ],
      },
      {
        title: "Compare the winner with evidence you can change.",
        body: "Beseam does not claim access to an assistant's hidden ranking logic. It compares the observed answer with product and storefront evidence and surfaces supported differences or missing facts that are actionable for the merchant.",
        points: [
          "Inspect titles, descriptions, attributes, availability and structured product evidence.",
          "Keep competitor sightings attached to the exact question where they appeared.",
          "Treat a likely cause as a hypothesis unless the evidence can establish more.",
        ],
      },
      {
        title: "Make the change, then ask the same question again.",
        body: "With approval and store access, a supported product-data change can be published while the previous value is retained. Beseam then re-runs the same buying question so the team can compare the new observed answer with the old one.",
        points: [
          "Keep approval and the previous product value attached to the change.",
          "Re-run the same question instead of substituting a new prompt.",
          "Do not treat one changed answer as proof of guaranteed future placement.",
        ],
      },
    ],
    limits: [
      "AI answers are point-in-time observations and can change between runs.",
      "Beseam cannot see or control an assistant's hidden ranking logic.",
      "Competitor, citation and product-data differences do not automatically prove causation.",
      "No recommendation, ranking, traffic or revenue outcome is guaranteed.",
    ],
    faqs: [
      {
        question: "Is this AI visibility monitoring?",
        answer:
          "This page covers the observable part people often call AI visibility monitoring. Inside Beseam, those answers are one discovery signal that can be connected with product, store, behavior, conversion, and revenue evidence.",
      },
      {
        question: "Which AI assistants can Beseam test?",
        answer:
          "Configured targets can include assistants and shopping-answer surfaces such as ChatGPT, Gemini, Perplexity, Claude, Google AI experiences and Microsoft Copilot. Available coverage depends on the configured test surface.",
      },
      {
        question:
          "Can Beseam tell me exactly why a competitor ranked above me?",
        answer:
          "Not from hidden model logic. Beseam records the observed answer and compares it with product evidence you control, then separates supported facts from likely causes and hypotheses.",
      },
    ],
    related: [
      {
        label: "Try the free AI discovery scan",
        href: "/scan",
      },
    ],
  },
  platform: {
    slug: "platform",
    eyebrow: "Observe → Understand → Decide → Act → Learn",
    headline:
      "Keep the evidence connected from the first signal to the measured result.",
    metaTitle: "How Beseam Works | Observe, Understand, Decide, Act, Learn",
    description:
      "Beseam connects discovery, store, shopper behavior, conversion, orders, and revenue so teams can understand a commercial problem, decide what deserves action, make supported changes, and measure what changed afterward.",
    intro:
      "A product can lose demand before the visit, on the store, or during checkout while the evidence sits in different systems. Beseam keeps those signals attached to the product, page, journey, decision, and action so the team can see what is worth changing and what moved afterward.",
    proofLine:
      "The operating model is Observe, Understand, Decide, Act, Learn, with the source evidence and affected commercial scope carried through every step.",
    observationsHeading: "What Beseam observes",
    observationsIntro:
      "Beseam connects four parts of the same shopper and commercial path instead of treating each as a separate dashboard.",
    observations: [
      {
        title: "Discovery",
        icon: Radar,
        detail:
          "External search, AI shopping answers, feeds and other signals that show where products are found, absent or losing ground before the visit.",
      },
      {
        title: "Store",
        icon: Store,
        detail:
          "Onsite search, merchandising, product pages, recommendations and product data that shape what shoppers can find and choose.",
      },
      {
        title: "Behavior",
        icon: Brain,
        detail:
          "Journeys, friction and checkout evidence that show where shoppers hesitate, fail or move forward.",
      },
      {
        title: "Revenue",
        icon: TrendingUp,
        detail:
          "Conversion, orders, attribution and impact evidence used to measure what changed after an action.",
      },
    ],
    sections: [
      {
        title: "Understand the commercial problem, not just the symptom.",
        icon: RefreshCw,
        body: "A visibility miss, search exit, product-page hesitation, checkout drop, or revenue change is a symptom. Beseam connects the surrounding product, store, shopper, competitor, and revenue evidence so the team can understand what may explain it without pretending a hypothesis is a fact.",
        points: [
          "Keep the original observation, source, affected scope, and time attached.",
          "Connect evidence from before the visit with what happened on the store and afterward.",
          "Separate observed facts from likely causes and hypotheses.",
        ],
      },
      {
        title: "Decide what deserves action.",
        icon: ListTodo,
        body: "Beseam helps a team compare evidence, affected scope, urgency, and commercial consequence so the next action is tied to a specific product, page, journey, or opportunity rather than a generic score or backlog of findings.",
        points: [
          "Separate urgent breakage from worthwhile opportunities.",
          "Keep the decision specific to the affected product, page, or journey.",
          "Keep the reason for the decision attached to the evidence.",
        ],
      },
      {
        title: "Act with control. Learn from what changes.",
        icon: Sparkles,
        body: "Supported product data, content, merchandising, creative, campaign, or store changes can move through an approval path with the previous state retained. After the action, Beseam checks the relevant discovery, behavior, conversion, order, or revenue signals and carries the result into the next decision.",
        points: [
          "Keep control with explicit approval for supported store changes.",
          "Observe the signals relevant to the action afterward.",
          "Carry what was learned into the next decision.",
        ],
      },
    ],
    limits: [
      "Not every capability or source is enabled for every store.",
      "Beseam does not claim an exact cause when the evidence only supports a hypothesis or correlation.",
      "No single composite score replaces the underlying evidence and freshness state.",
      "Automated action stays limited to changes that are explicitly supported and approved.",
    ],
    faqs: [
      {
        question: "What do I need to connect first?",
        answer:
          "Start with the store and the evidence needed for the first commercial question you want to answer. Additional sources are useful when they improve that decision, not simply because they exist.",
      },
      {
        question: "How does Beseam move from observation to a decision?",
        answer:
          "Beseam keeps the relevant evidence together, separates observed facts from possible explanations, and helps the team decide what deserves action without overstating certainty.",
      },
      {
        question: "Can Beseam make changes automatically?",
        answer:
          "Only supported changes under the approval rules agreed for the store. The previous state is retained so the action can be reviewed and reversed when the workflow supports it.",
      },
      {
        question: "How does Beseam learn after an action?",
        answer:
          "Beseam observes the relevant signals after an action and keeps them connected to the decision that produced it. What changed becomes evidence for the next cycle without turning correlation into certainty.",
      },
    ],
    related: [
      { label: "How we work with brands", href: "/how-we-work" },
      { label: "AI shopping discovery", href: "/ai-visibility-monitoring" },
      { label: "See a connected trace", href: "/#proof" },
    ],
  },
};

export function getMarketingPage(slug: string): MarketingPageData {
  const page = MARKETING_PAGES[slug];
  if (!page) throw new Error("Unknown marketing page: " + slug);
  return page;
}

export function getMarketingMetadata(page: MarketingPageData): Metadata {
  return buildPublicMetadata({
    title: page.metaTitle,
    description: page.description,
    path: "/" + page.slug,
  });
}
