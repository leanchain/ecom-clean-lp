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
      "Observe real buying questions across AI assistants, connect each answer to product and store evidence, propose supported changes, and recheck what changes.",
    intro:
      "AI shopping discovery is one signal in Beseam's continuous commerce loop. For each buying question, Beseam keeps the observed answer, products named, competitor context, and relevant product evidence together, then surfaces the strongest opportunity and proposes a supported change for brand-owner approval.",
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
          "Connect the miss to supported product-page, catalog, structured-data, or feed differences Beseam can inspect and prepare for approval.",
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
    eyebrow: "Platform",
    headline:
      "Everything that helps a shopper choose you, connected.",
    metaTitle: "Beseam Platform | Connected Ecommerce Growth",
    description:
      "Beseam continuously connects discovery, product evidence, shopper behavior, and revenue, finds what is worth improving, applies supported changes under your rules, and measures what changed.",
    intro:
      "Beseam connects what shoppers see before the visit, what they find on the store, what they do next, and what happened after a change. It turns that evidence into prioritized changes and keeps improvement moving through one continuous loop instead of leaving another dashboard to manage.",
    proofLine:
      "Discovery, products, behavior, changes, and results stay attached to the same buying decision.",
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
        title:
          "Understand what may be blocking the choice, not just the symptom.",
        icon: RefreshCw,
        body: "A visibility miss, search exit, product-page hesitation, checkout drop, or revenue change is a symptom. Beseam connects the surrounding product, store, shopper, competitor, and revenue evidence so likely explanations stay grounded without pretending a hypothesis is a fact.",
        points: [
          "Keep the original observation, source, affected scope, and time attached.",
          "Connect evidence from before the visit with what happened on the store and afterward.",
          "Separate observed facts from likely causes and hypotheses.",
        ],
      },
      {
        title: "Act on what matters. Learn from what changes.",
        icon: Sparkles,
        body: "Beseam turns the strongest evidence into a prioritized change to product data, content, merchandising, creative, campaigns, or the store, carries supported changes through approval and application, then checks the relevant discovery, behavior, conversion, order, or revenue signals afterward.",
        points: [
          "Tie each action to the observed opportunity and affected product, page, or journey.",
          "Keep the evidence, affected scope, approval, and verification plan attached.",
          "Carry what was learned into the next action.",
        ],
      },
    ],
    limits: [
      "Not every capability or source is enabled for every store.",
      "Beseam does not claim an exact cause when the evidence only supports a hypothesis or correlation.",
      "No single composite score replaces the underlying evidence and freshness state.",
      "Customer-facing publishing requires explicit brand-owner approval before the change is applied.",
    ],
    faqs: [
      {
        question: "What do I need to connect first?",
        answer:
          "Connect the store first. Beseam keeps watching where shoppers overlook you, choose something else, or stop before purchase, and adds connected sources when they improve the evidence.",
      },
      {
        question: "How does Beseam work out what may be worth changing?",
        answer:
          "Beseam keeps the shopper signal and relevant evidence together, separates observed facts from possible explanations, and ranks what deserves action without overstating certainty.",
      },
      {
        question: "How are changes approved and published?",
        answer:
          "The brand owner approves every supported customer-facing change before Beseam applies it. Beseam keeps the action and audit trail attached, and retains the previous state where the workflow supports rollback.",
      },
      {
        question: "How do I know whether a change helped?",
        answer:
          "Beseam checks the relevant shopper, store, conversion, order, or revenue signals after an action and keeps them connected to the decision that produced it. What changed becomes evidence for the next cycle without turning correlation into certainty.",
      },
    ],
    related: [
      { label: "How Beseam works", href: "/how-we-work" },
      { label: "AI shopping discovery", href: "/ai-visibility-monitoring" },
      { label: "See Beseam work", href: "/#proof" },
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
