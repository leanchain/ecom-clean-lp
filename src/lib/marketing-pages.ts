import {
  Brain,
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
    eyebrow: "Find → Choose → Buy",
    headline:
      "Follow the buying decision from the first question to the purchase.",
    metaTitle: "Beseam Platform | Find, Choose, Buy",
    description:
      "Beseam connects where shoppers find products, what helps them choose, where purchases break, and what happens after a change using Observe, Understand, Act, Learn.",
    intro:
      "AI shopping is one place a buying decision begins. Beseam follows it further across onsite search, recommendations, product pages, sizing and fit, shopper behavior, checkout, conversion, actions, and impact so the evidence stays attached from the first question to what happened after a change.",
    proofLine:
      "The shopper path is Find, Choose, Buy. Beseam works across it with Observe, Understand, Act, Learn, keeping the evidence attached at every step.",
    observationsHeading: "Follow the shopper's decision",
    observationsIntro:
      "Beseam connects the moments where a product gets considered, chosen, purchased, and measured instead of treating each as a separate dashboard.",
    observations: [
      {
        title: "Finding",
        icon: Radar,
        detail:
          "AI answers, external search, onsite search, marketplaces, and other places that decide which products enter the shopper's consideration set.",
      },
      {
        title: "Choosing",
        icon: Store,
        detail:
          "Product pages, comparisons, recommendations, fit, reviews, price, and product facts that help a shopper decide which product is right.",
      },
      {
        title: "Buying",
        icon: Brain,
        detail:
          "Cart, delivery, checkout, payment, and shopper behavior that show where a decided shopper still moves forward or stops.",
      },
      {
        title: "Learning",
        icon: TrendingUp,
        detail:
          "Conversion, orders, revenue, and the original signals checked again after a change so the next decision starts with evidence.",
      },
    ],
    sections: [
      {
        title: "Understand what may be blocking the choice, not just the symptom.",
        icon: RefreshCw,
        body: "A visibility miss, search exit, product-page hesitation, checkout drop, or revenue change is a symptom. Beseam connects the surrounding product, store, shopper, competitor, and revenue evidence so the team can understand what may explain it without pretending a hypothesis is a fact.",
        points: [
          "Keep the original observation, source, affected scope, and time attached.",
          "Connect evidence from before the visit with what happened on the store and afterward.",
          "Separate observed facts from likely causes and hypotheses.",
        ],
      },
      {
        title: "Act on what matters. Learn from what changes.",
        icon: Sparkles,
        body: "Beseam helps the team choose the next move, then supported product data, content, merchandising, creative, campaign, or store changes can move through an approval path with the previous state retained. After the action, Beseam checks the relevant discovery, behavior, conversion, order, or revenue signals.",
        points: [
          "Tie the action to the affected product, page, journey, or opportunity.",
          "Keep control with explicit approval for supported store changes.",
          "Carry what was learned into the next action.",
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
          "Start with the store and one buying decision you want to understand: where shoppers overlook you, choose something else, or stop before purchase. Add sources only when they improve that understanding.",
      },
      {
        question: "How does Beseam work out what may be worth changing?",
        answer:
          "Beseam keeps the shopper signal and relevant evidence together, separates observed facts from possible explanations, and helps the team decide what deserves action without overstating certainty.",
      },
      {
        question: "Can Beseam make changes automatically?",
        answer:
          "Only supported changes under the approval rules agreed for the store. The previous state is retained so the action can be reviewed and reversed when the workflow supports it.",
      },
      {
        question: "How do I know whether a change helped?",
        answer:
          "Beseam checks the relevant shopper, store, conversion, order, or revenue signals after an action and keeps them connected to the decision that produced it. What changed becomes evidence for the next cycle without turning correlation into certainty.",
      },
    ],
    related: [
      { label: "How we work with brands", href: "/how-we-work" },
      { label: "AI shopping discovery", href: "/ai-visibility-monitoring" },
      { label: "See a buying decision", href: "/#decision-story" },
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
