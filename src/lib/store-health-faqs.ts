export const STORE_HEALTH_FAQS = [
  {
    question: "What do I need to connect to get started?",
    answer:
      "Start with your domain. Add commerce, analytics, search, behavior, or customer data only when it improves the evidence or gives Beseam permission to support a change.",
  },
  {
    question: "How does Beseam decide what to fix first?",
    answer:
      "Beseam keeps shopper signals and relevant evidence together, separates observed facts from possible explanations, and prioritizes the opportunities most likely to matter commercially. The reason for every decision stays attached.",
  },
  {
    question: "What can Beseam actually change?",
    answer:
      "With the right access, Beseam can support changes to product data, content, merchandising, onsite search, recommendations, and other editable store experiences. Execution depends on the connected system and the approval rules you choose.",
  },
  {
    question: "What needs approval before it goes live?",
    answer:
      "You choose the rules. Today, Beseam prepares supported customer-facing changes and executes them after the required approval for your store. Judgment-heavy or unsupported changes stop for review. Where rollback is supported, the previous state and audit trail are retained.",
  },
  {
    question: "How does Beseam measure whether a change helped?",
    answer:
      "Beseam rechecks the original shopper signal and measures the relevant behavior, conversion, order, or revenue signals afterward. The before-and-after stays attached to the action, while correlation and causation remain clearly separated.",
  },
] as const;
