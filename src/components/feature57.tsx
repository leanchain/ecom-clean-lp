"use client";

import {
  Camera,
  FileText,
  Package,
  AudioLines,
  Mic,
  Plus,
  Settings2,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
      1: "Generate complete PDP content for @template.sweater with benefits, objections, FAQs, use cases, and comparisons using @styleguide.writing",
    };
    setPromptValue(defaultPrompts[index as keyof typeof defaultPrompts] || "");
  };

  // Allow deep-linking from navbar hashes to specific tabs.
  useEffect(() => {
    const applyHashSelection = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (hash === "#ai-media-studio-video" || hash === "#videos") {
        setSelection(0); // Default to images since videos are removed
        setPromptValue(
          "Show @model wearing @outfit in a minimalist studio setting with soft natural lighting and neutral beige background",
        );
      } else if (
        hash === "#ai-media-studio-context" ||
        hash === "#deep-product-context"
      ) {
        setSelection(1);
        setPromptValue(
          "Generate complete PDP content for @template.sweater with benefits, objections, FAQs, use cases, and comparisons using @styleguide.writing",
        );
      } else if (hash === "#ai-media-studio" || hash === "#images") {
        setSelection(0);
        setPromptValue(
          "Show @model wearing @outfit in a minimalist studio setting with soft natural lighting and neutral beige background",
        );
      }
    };

    applyHashSelection();
    window.addEventListener("hashchange", applyHashSelection);
    return () => window.removeEventListener("hashchange", applyHashSelection);
  }, []);

  const handlePromptClick = (promptText: string) => {
    setPromptValue(promptText);
  };

  return (
    <section id="ai-media-studio" className="py-16 md:py-28 lg:py-36 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <CategoryBadge
              label="AI Media Studio"
              icon={<Package className="h-4 w-4" />}
            />
          </div>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl xl:text-7xl mb-6">
            Create the Perfect
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"> Images</span>
            <br />and Deep Context for Your PDPs
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-lg leading-relaxed md:text-xl lg:text-2xl">
            <strong className="text-foreground font-semibold">Images + AI Search Optimization</strong> = Product pages that look
            amazing, engage deeply, and get discovered in AI search engines.
          </p>
        </div>
        <div>
          <div className="mx-auto max-w-7xl">
            {/* Enhanced Tab Navigation */}
            <div className="mb-12 flex justify-center">
              <div className="flex flex-wrap justify-center gap-4 p-2 bg-muted/30 rounded-2xl border border-border/50 backdrop-blur-sm">
                {features.map((feature, i) => {
                  const isSelected = selection === i;
                  return (
                    <button
                      key={i}
                      className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border px-6 py-4 transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105"
                          : "hover:border-border hover:bg-background/80 border-transparent hover:shadow-md"
                      }`}
                      onClick={() => handleSelection(i)}
                      aria-label={feature.title}
                    >
                      <feature.icon
                        className={`size-5 transition-all duration-300 ${
                          isSelected
                            ? "text-primary scale-110"
                            : "text-muted-foreground group-hover:text-primary"
                        }`}
                      />
                      <span
                        className={`text-sm font-semibold transition-all duration-300 ${
                          isSelected
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {feature.title}
                      </span>
                      {isSelected && (
                        <div className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-20">
              {/* Enhanced Text Section - Left Side */}
              <div className="md:w-1/2 lg:w-2/5">
                <div className="flex h-full flex-col justify-center">
                  {features.map((feature, i) => {
                    const isSelected = selection === i;
                    return (
                      <div
                        key={feature.id}
                        className={`transition-all duration-500 ${
                          isSelected
                            ? "opacity-100 translate-y-0"
                            : "pointer-events-none absolute opacity-0 translate-y-4"
                        }`}
                      >
                        <div className="mb-8">
                          <h3 className="text-foreground text-3xl font-bold md:text-4xl lg:text-5xl mb-4 flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                              <feature.icon className="size-8 md:size-9 text-primary shrink-0" />
                            </div>
                            <span className="leading-tight">{feature.title}</span>
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
                          {feature.description}
                        </p>
                        <ul className="space-y-4">
                          {feature.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-4 group/item">
                              <div className="mt-1 p-1 rounded-full bg-primary/10 border border-primary/20 group-hover/item:bg-primary/20 transition-colors duration-200">
                                <svg
                                  className="size-4 text-primary shrink-0"
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
                              <span className="text-muted-foreground text-base md:text-lg leading-relaxed group-hover/item:text-foreground transition-colors duration-200">
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

              {/* Enhanced Media Block - Right Side */}
              <div className="relative md:w-1/2 lg:w-3/5">
                {features.map((feature, i) => {
                  const isSelected = selection === i;
                  return (
                    <div
                      key={feature.id}
                      className={`transition-all duration-500 ${
                        isSelected
                          ? "opacity-100 translate-y-0 scale-100"
                          : "pointer-events-none absolute opacity-0 translate-y-8 scale-95"
                      }`}
                    >
                      {/* Enhanced Product Card */}
                      <div className="border-border overflow-hidden rounded-3xl border bg-background shadow-2xl ring-1 ring-border/20">
                        {/* Enhanced Media Section (Top Half) */}
                        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                          {feature.type === "image" ? (
                            <Image
                              src={feature.media}
                              alt={feature.title}
                              width={feature.width}
                              height={feature.height}
                              className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-primary/10">
                              <div className="space-y-6 text-center">
                                <div className="p-4 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 inline-block">
                                  <FileText className="mx-auto h-16 w-16 text-primary" />
                                </div>
                                <div>
                                  <p className="text-xl font-bold text-foreground mb-2">
                                    AI-Generated Product Copy
                                  </p>
                                  <p className="text-base text-muted-foreground">
                                    Optimized for search engines and conversion
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-4 right-4 z-20">
                            <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                              {feature.type === "image" ? "AI Image" : "AI Content"}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Chat Interface (Bottom Half) */}
                        <div className="p-6">
                          <div className="bg-gradient-to-r from-muted/80 to-muted rounded-3xl w-full px-6 py-5 border border-border/50 shadow-inner">
                            {/* Enhanced Prompt Display/Input Area */}
                            <div className="min-h-[70px] mb-4">
                              {promptValue ? (
                                <div className="text-base leading-relaxed py-3 px-2 rounded-xl bg-background/50 border border-border/30">
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
                                      : "Generate PDP content for @template.sweater using @styleguide.writing..."
                                  }
                                  rows={3}
                                  className="w-full bg-background/50 text-base outline-none placeholder:text-muted-foreground resize-none py-3 px-4 rounded-xl border border-border/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                />
                              )}
                            </div>

                            {/* Enhanced Bottom Controls */}
                            <div className="flex h-10 w-full items-center justify-between">
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-background/80 transition-colors duration-200 group">
                                  <Plus className="size-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200 font-medium">Add</span>
                                </button>
                                <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-background/80 transition-colors duration-200 group">
                                  <Settings2 className="size-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200 font-medium">Tools</span>
                                </button>
                              </div>
                              <div className="flex items-center gap-3">
                                <button className="p-2 rounded-xl hover:bg-background/80 transition-colors duration-200 group">
                                  <Mic className="size-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                                </button>
                                <button className="bg-primary/10 hover:bg-primary/20 p-2 rounded-xl transition-colors duration-200 group border border-primary/20">
                                  <AudioLines className="size-4 text-primary" />
                                </button>
                                <Link
                                  href="/demo"
                                  className="bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-primary/25"
                                >
                                  <Play className="size-4 fill-current" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 flex flex-wrap gap-3">
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
                              <button
                                key={index}
                                onClick={() => handlePromptClick(item.prompt)}
                                className="bg-gradient-to-r from-muted/60 to-muted hover:from-primary/10 hover:to-primary/5 text-muted-foreground hover:text-primary border border-border/30 hover:border-primary/30 inline-block cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md hover:scale-105"
                              >
                                {item.label}
                              </button>
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
