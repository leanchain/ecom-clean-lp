"use client";

import {
  Camera,
  Video,
  FileText,
  Package,
  AudioLines,
  Mic,
  Plus,
  Settings2,
  Play,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import React from "react";

import CategoryBadge from "@/components/category-badge";

// Helper function to render text with styled @mentions
const renderWithMentions = (text: string) => {
  const parts = text.split(/(@[\w.]+)/g);
  return parts.map((part, index) => {
    if (part.startsWith("@")) {
      return (
        <span
          key={index}
          className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-md font-medium"
        >
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const features = [
  {
    id: "feature-1",
    title: "Professional Product Images",
    description:
      "Full coverage on-brand images: packshots, product on model, lifestyle, product in use, detail shots. All aligned with your narrative and user needs.",
    icon: Camera,
    type: "image" as const,
    media: "/images/hero/hero-1.png",
    width: 800,
    height: 600,
    bullets: [
      "On-brand packshots, lifestyle, and detail shots",
      "Product on model and in-use scenarios",
      "Aligned with narrative and user needs",
    ],
  },
  {
    id: "feature-2",
    title: "Engaging Product Videos",
    description:
      "On-brand AI videos auto-built from your brandbook, aligned with narrative and user needs. No more generic clips disconnected from your story.",
    icon: Video,
    type: "video" as const,
    media: "/videos/hero/hero-video-1.mp4",
    bullets: [
      "Auto-built from brandbook and style guide",
      "Aligned with product narrative",
      "Consistent brand lighting, style & tone",
    ],
  },
  {
    id: "feature-3",
    title: "Deep Product Context for AI",
    description:
      "LLM-optimized narrative text with deep product context. Optimized for GEO (ChatGPT, Perplexity, Google AI Overviews) and SEO. Drive 3-5× higher AI search visibility.",
    icon: FileText,
    type: "interactive" as const,
    bullets: [
      "Optimized for GEO and SEO visibility",
      "Deep context: benefits, FAQs, use cases",
      "3-5× higher AI search recommendations",
    ],
  },
];

const Feature57 = () => {
  const [selection, setSelection] = useState(0);
  const [promptValue, setPromptValue] = useState(
    "Show @model wearing @outfit in a minimalist studio setting with soft natural lighting and neutral beige background"
  );

  const handleSelection = (index: number) => {
    setSelection(index);
    // Set default prompt based on feature type
    const defaultPrompts = {
      0: "Show @model wearing @outfit in a minimalist studio setting with soft natural lighting and neutral beige background",
      1: "Create a smooth 360° rotation of @model wearing @outfit following @styleguide color palette",
      2: "Generate complete PDP content for @template.sweater with benefits, objections, FAQs, use cases, and comparisons using @styleguide.writing",
    };
    setPromptValue(defaultPrompts[index as keyof typeof defaultPrompts] || "");
  };

  const handlePromptClick = (promptText: string) => {
    setPromptValue(promptText);
  };

  return (
    <section id="ai-media-studio" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center md:mb-12">
          <div className="mb-3 flex justify-center">
            <CategoryBadge
              label="AI Media Studio"
              icon={<Package className="h-4 w-4" />}
            />
          </div>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            The Perfect Product Detail Pages
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:mt-4 md:text-base">
            Images + Videos + AI Search Optimization = Product pages that look
            amazing, engage deeply, and get discovered in AI search engines.
          </p>
        </div>
        <div>
          <div className="mx-auto max-w-6xl">
            {/* Tab Navigation - Move above content */}
            <div className="mb-8 flex justify-center gap-3">
              {features.map((feature, i) => {
                const isSelected = selection === i;
                return (
                  <button
                    key={i}
                    className={`group relative flex cursor-pointer items-center gap-2 rounded-3xl border px-4 py-3 transition-all duration-300 ${
                      isSelected
                        ? "border-border bg-accent shadow-sm"
                        : "hover:border-border hover:bg-accent/30 border-transparent"
                    }`}
                    onClick={() => handleSelection(i)}
                    aria-label={feature.title}
                  >
                    <div
                      className={`flex aspect-square w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <feature.icon className="size-4" />
                    </div>
                    <span
                      className={`hidden md:block text-sm font-medium transition-colors ${
                        isSelected ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {feature.title}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-16">
              {/* Text Section - Left Side */}
              <div className="md:w-1/2 lg:w-2/5">
                <div className="flex h-full flex-col justify-center">
                  {features.map((feature, i) => {
                    const isSelected = selection === i;
                    return (
                      <div
                        key={feature.id}
                        className={`transition-all duration-500 ${
                          isSelected
                            ? "opacity-100"
                            : "pointer-events-none absolute opacity-0"
                        }`}
                      >
                        <div className="flex items-start gap-4 mb-6">
                          <div className="bg-primary text-primary-foreground flex aspect-square w-12 shrink-0 items-center justify-center rounded-lg">
                            <feature.icon className="size-6" />
                          </div>
                          <div>
                            <h3 className="text-foreground text-2xl font-bold md:text-3xl lg:text-4xl mb-3">
                              {feature.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                          {feature.description}
                        </p>
                        <ul className="space-y-3">
                          {feature.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="bg-primary/10 text-primary flex aspect-square w-5 shrink-0 items-center justify-center rounded-full mt-0.5">
                                <svg
                                  className="size-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-muted-foreground text-sm md:text-base">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Media Block - Right Side */}
              <div className="relative md:w-1/2 lg:w-3/5">
                {features.map((feature, i) => {
                  const isSelected = selection === i;
                  return (
                    <div
                      key={feature.id}
                      className={`transition-all duration-500 ${
                        isSelected
                          ? "opacity-100"
                          : "pointer-events-none absolute opacity-0"
                      }`}
                    >
                      {/* Unified Product Card */}
                      <div className="border-border overflow-hidden rounded-3xl border shadow-sm bg-background">
                        {/* Media Section (Top Half) */}
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          {feature.type === "video" ? (
                            <video
                              src={feature.media}
                              className="h-full w-full object-cover"
                              muted
                              playsInline
                              autoPlay
                              loop
                            />
                          ) : feature.type === "image" ? (
                            <Image
                              src={feature.media}
                              alt={feature.title}
                              width={feature.width}
                              height={feature.height}
                              className="h-full w-full object-cover object-center"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center p-8">
                              <div className="space-y-4 text-center">
                                <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
                                <p className="text-lg font-semibold">
                                  AI-Generated Product Copy
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Optimized for search engines and conversion
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Chat Interface (Bottom Half) */}
                        <div className="p-4">
                          <div className="bg-muted rounded-3xl w-full px-4 py-3">
                            {/* Prompt Display/Input Area */}
                            <div className="min-h-[60px] mb-2">
                              {promptValue ? (
                                <div className="text-sm leading-relaxed py-2">
                                  {renderWithMentions(promptValue)}
                                </div>
                              ) : (
                                <textarea
                                  value={promptValue}
                                  onChange={(e) =>
                                    setPromptValue(e.target.value)
                                  }
                                  placeholder={
                                    feature.type === "image"
                                      ? "Show @model wearing @outfit in..."
                                      : feature.type === "video"
                                        ? "Create video of @model in @outfit..."
                                        : "Generate PDP content for @template.sweater using @styleguide.writing..."
                                  }
                                  rows={2}
                                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground resize-none py-2"
                                />
                              )}
                            </div>

                            {/* Bottom Controls */}
                            <div className="flex h-8 w-full items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Plus className="size-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
                                <span className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                  <Settings2 className="size-4" />
                                  Tools
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mic className="size-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" />
                                <span className="bg-foreground/10 hover:bg-foreground/20 flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors">
                                  <AudioLines className="size-3.5" />
                                </span>
                                <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex size-7 items-center justify-center rounded-full transition-colors">
                                  <Play className="size-3.5 fill-current" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {(feature.type === "image"
                              ? [
                                  {
                                    label: "Current image",
                                    prompt:
                                      "Show @model wearing @outfit in a minimalist studio setting with soft natural lighting and neutral beige background",
                                  },
                                  {
                                    label: "Urban scene",
                                    prompt:
                                      "Place @model wearing @outfit in an urban street setting with modern architecture following @styleguide",
                                  },
                                  {
                                    label: "Lifestyle shot",
                                    prompt:
                                      "Show @model wearing @outfit in a cozy café interior with warm lighting matching @styleguide aesthetic",
                                  },
                                ]
                              : feature.type === "video"
                                ? [
                                    {
                                      label: "360° showcase",
                                      prompt:
                                        "Create a smooth 360° rotation of @model wearing @outfit following @styleguide color palette",
                                    },
                                    {
                                      label: "Styling demo",
                                      prompt:
                                        "Generate a video showing @model styling @outfit with different accessories per @styleguide",
                                    },
                                    {
                                      label: "Movement video",
                                      prompt:
                                        "Show @model walking and moving naturally in @outfit with cinematic lighting from @styleguide",
                                    },
                                  ]
                                : [
                                    {
                                      label: "Full PDP content",
                                      prompt:
                                        "Generate complete PDP content for @template.sweater with benefits, objections, FAQs, use cases, and comparisons using @styleguide.writing",
                                    },
                                    {
                                      label: "Deep narrative",
                                      prompt:
                                        "Create LLM-optimized narrative text for @template.sweater with structured benefits, 'best for', howto, and why sections per @styleguide.writing",
                                    },
                                    {
                                      label: "GEO optimization",
                                      prompt:
                                        "Optimize @template.sweater for ChatGPT and Perplexity with deep product context following @styleguide.writing tone",
                                    },
                                  ]
                            ).map((item, index) => (
                              <span
                                key={index}
                                onClick={() => handlePromptClick(item.prompt)}
                                className="bg-muted hover:bg-muted-foreground/20 text-muted-foreground inline-block cursor-pointer rounded-full px-3 py-1 text-xs transition-colors"
                              >
                                {item.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* End moved Tab Navigation */}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature57 };
