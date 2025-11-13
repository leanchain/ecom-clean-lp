"use client";

import React from "react";
import { Upload, Sparkles, Zap, CheckCircle2 } from "lucide-react";
import AnimatedBorderButton from "@/components/animated-border-button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Upload,
    title: "Upload Your Product Data",
    description:
      "Simply upload your product information, images, or connect your store. Fieson works with any product catalog.",
  },
  {
    number: "2",
    icon: Sparkles,
    title: "AI Builds Your Persuasion Graph",
    description:
      "Our AI analyzes your product and creates a deep narrative structure with benefits, FAQs, use cases, and positioning.",
  },
  {
    number: "3",
    icon: Zap,
    title: "Generate Complete PDPs",
    description:
      "Fieson creates images, videos, copy, and schema—all from one unified narrative. Everything is on-brand and AI-optimized.",
  },
  {
    number: "4",
    icon: CheckCircle2,
    title: "Publish & Get Discovered",
    description:
      "Review, customize, and publish to your store. Watch your AI visibility score soar and get recommended 3-5× more often.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-muted/30 py-20 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            How It Works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            From product data to AI-optimized PDPs in minutes—no design skills
            needed
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto mb-12 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col items-start rounded-3xl bg-background p-6 shadow-sm transition-all hover:shadow-md md:p-8"
              >
                {/* Step Number Badge */}
                <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-primary mb-4">
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  {step.description}
                </p>

                {/* Connector Line (hidden on mobile, shown on desktop between cards) */}
                {index < steps.length - 1 && (
                  <div className="bg-border absolute -right-4 top-1/2 hidden h-0.5 w-8 lg:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <AnimatedBorderButton className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5">
            Get Started <ArrowRight />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

