import type { AnswerCheckResult } from "@/components/beseam/answer-check-types";

// A real scan of a live Shopify store, produced by the same endpoint this page
// calls. Kept verbatim so the example on the page is the product, not a mock-up.
export const SAMPLE_SCAN: AnswerCheckResult = {
  domain: "dancingqueens.ch",
  status: "ready",
  brand: "Dancing Queens",
  platform: "shopify",
  reject_reason: null,
  products_seen: 3,
  steps: [
    {
      key: "storefront",
      label: "Reading your storefront",
      state: "done",
      detail: "shopify",
    },
    {
      key: "catalog",
      label: "Checking product data and price parity",
      state: "done",
      detail: "0 issues found",
    },
    {
      key: "questions",
      label: "Writing the questions your buyers ask",
      state: "done",
      detail: "5 questions",
    },
    {
      key: "answers",
      label: "Asking ChatGPT and Google AI Mode",
      state: "done",
      detail: "10 answers recorded",
    },
  ],
  findings: [],
  questions: [
    "Which dance shoes are best for Latin social dancing and long practice nights?",
    "Do leather dance shoes run true to size or should I size up?",
    "What materials are glitter dance shoes made from and are they easy to clean?",
    "How much should I expect to spend on quality dance shoes?",
    "Will slim heel protectors fit 7 cm stiletto dance shoe heels?",
  ],
  answers: [
    {
      question:
        "Which dance shoes are best for Latin social dancing and long practice nights?",
      channel_label: "ChatGPT",
      mentioned: false,
      competitors: [
        "Bloch (US)",
        "Very Fine Dance Shoes (direct)",
        "Supadance (official)",
      ],
      error: null,
    },
    {
      question: "Do leather dance shoes run true to size or should I size up?",
      channel_label: "ChatGPT",
      mentioned: false,
      competitors: [
        "BLOCH Dance US",
        "Capezio",
        "Amazon / Linodes (marketplace)",
      ],
      error: null,
    },
    {
      question:
        "What materials are glitter dance shoes made from and are they easy to clean?",
      channel_label: "ChatGPT",
      mentioned: false,
      competitors: ["Amazon", "DanceWear Corner", "DanceAndSway"],
      error: null,
    },
    {
      question: "How much should I expect to spend on quality dance shoes?",
      channel_label: "ChatGPT",
      mentioned: false,
      competitors: ["Ballroom Shoes", "DanceShopper", "BLOCH Dance US"],
      error: null,
    },
    {
      question: "Will slim heel protectors fit 7 cm stiletto dance shoe heels?",
      channel_label: "ChatGPT",
      mentioned: false,
      competitors: ["GoGoHeel", "Amazon / XuQing-US", "Amazon / EverJoy Daily"],
      error: null,
    },
    {
      question:
        "Which dance shoes are best for Latin social dancing and long practice nights?",
      channel_label: "Google AI Mode",
      mentioned: false,
      competitors: [],
      error: null,
    },
    {
      question: "Do leather dance shoes run true to size or should I size up?",
      channel_label: "Google AI Mode",
      mentioned: false,
      competitors: ["Capezio"],
      error: null,
    },
    {
      question:
        "What materials are glitter dance shoes made from and are they easy to clean?",
      channel_label: "Google AI Mode",
      mentioned: true,
      competitors: ["Joheela", "DanceandSway"],
      error: null,
    },
    {
      question: "How much should I expect to spend on quality dance shoes?",
      channel_label: "Google AI Mode",
      mentioned: false,
      competitors: ["The Dance Shoppe"],
      error: null,
    },
    {
      question: "Will slim heel protectors fit 7 cm stiletto dance shoe heels?",
      channel_label: "Google AI Mode",
      mentioned: false,
      competitors: ["Adage Dance", "Fred Astaire Dance Store"],
      error: null,
    },
  ],
};
