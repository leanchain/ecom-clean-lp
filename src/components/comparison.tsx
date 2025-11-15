import { X } from "lucide-react";
import React from "react";

import { Separator } from "@/components/ui/separator";

const traditionalApproach = [
  "Manual photoshoots requiring expensive equipment and studios.",
  "Weeks of back-and-forth with designers and photographers.",
  "Generic stock photos that don't match your brand identity.",
  "Limited variations - stuck with what you shot.",
  "Missing structured data and schema markup for AI discovery.",
  "No optimization for AI search engines like ChatGPT.",
  "Inconsistent quality and messaging across product catalog.",
  "Time-consuming content creation that delays launches.",
];

const fiesonApproach = [
  {
    emoji: "🎨",
    text: "AI-generated visuals perfectly matched to your brand.",
  },
  {
    emoji: "⚡",
    text: "Create stunning product images and videos in minutes.",
  },
  {
    emoji: "🤖",
    text: "Automatically optimized for AI search with schema markup.",
  },
  {
    emoji: "🎯",
    text: "Unlimited variations for A/B testing and optimization.",
  },
  {
    emoji: "📊",
    text: "Built-in benefit bullets and FAQs for better discovery.",
  },
  { emoji: "💰", text: "Fraction of the cost of traditional photoshoots." },
  { emoji: "🔄", text: "Update product visuals and content instantly." },
  { emoji: "✨", text: "Consistent, on-brand quality across all products." },
];

const Comparison = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-6 text-center md:gap-12">
          <h2 className="mb-2 text-3xl font-bold md:text-5xl">
            Fieson PDP AI vs Traditional Product Pages
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Fieson PDP AI creates deep narrative product page content engineered
            for both AI Search and human conversion. Get recommended 3-5× more
            often in AI results, driving impressions, clicks, and sales.
          </p>
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-0">
          <div className="bg-muted rounded-3xl p-6 lg:rounded-r-none lg:p-12">
            <h3 className="text-2xl font-medium">Traditional PDP Pages</h3>
            <ul className="mt-9 space-y-3">
              {traditionalApproach.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2">
                    <X className="text-muted-foreground my-1.5 size-4 shrink-0" />
                    <li className="text-sm">{feature}</li>
                  </div>
                  {idx !== traditionalApproach.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-y p-6 lg:rounded-l-none lg:border-l-0 lg:p-12">
            <h3 className="text-2xl font-medium">Fieson PDP AI</h3>
            <ul className="mt-9 space-y-3">
              {fiesonApproach.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{feature.emoji}</span>
                    {feature.text}
                  </li>
                  {idx !== fiesonApproach.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Comparison };
