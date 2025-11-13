import { HelpCircleIcon, Package } from "lucide-react";
import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { GlowingEffect } from "@/components/aceternity/glowing-effect";
import CategoryBadge from "@/components/category-badge";

const featureData = [
  {
    desc: "Generate stunning product images with AI that are optimized for discovery in ChatGPT, Claude, and other AI platforms.",
    img: "/images/features/ai-image-gen.jpg",
    title: "AI Image Generation",
    badgeTitle: "Image Studio",
    gridClass: "md:col-span-1",
    width: 600,
    height: 800,
  },
  {
    desc: "Create engaging product videos automatically. From 360° spins to lifestyle demonstrations, our AI generates videos that convert and rank in AI search.",
    img: "/images/features/ai-video-gen.jpg",
    title: "AI Video Creation",
    badgeTitle: "Video Studio",
    gridClass: "lg:col-span-2",
    width: 800,
    height: 600,
  },
  {
    desc: "Optimize every aspect of your product pages for AI search engines. Get discovered when customers ask ChatGPT, Claude, or Perplexity for product recommendations.",
    img: "/images/features/ai-search-opt.jpg",
    title: "AI Search Optimization",
    badgeTitle: "Search Ready",
    gridClass: "md:col-span-1 lg:row-span-2",
    width: 600,
    height: 1200,
  },
  {
    desc: "Transform your product catalog with AI-powered enrichment. Generate SEO-optimized titles, descriptions, features, and FAQs that AI platforms love.",
    img: "/images/features/content-enrichment.jpg",
    title: "Content Enrichment",
    badgeTitle: "AI Content",
    gridClass: "lg:col-span-2",
    width: 800,
    height: 600,
  },
  {
    desc: "Track your product's visibility across all major AI platforms. Monitor rankings, optimize performance, and stay ahead of the competition.",
    img: "/images/features/analytics.jpg",
    title: "AI Discovery Analytics",
    badgeTitle: "Insights",
    gridClass: "md:col-span-1",
    width: 600,
    height: 800,
  },
];

const Feature284 = () => {
  return (
    <section className="h-full overflow-hidden py-32">
      <div className="container flex h-full w-full flex-col items-center justify-center">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-3">
            <CategoryBadge
              label="AI Media Studio"
              icon={<Package className="h-4 w-4" />}
            />
          </div>
          <h2 className="font-accent mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            AI Media Studio
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            Everything you need to create, optimize, and track AI-discoverable
            product content across all platforms
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid w-full max-w-6xl grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 lg:h-[800px] lg:grid-cols-4">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col gap-2 rounded-3xl border p-4",
                feature.gridClass
              )}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="flex w-full items-center justify-between">
                <p className="text-muted-foreground">{feature.badgeTitle}</p>
                <HelpCircleIcon className="text-muted-foreground size-4" />
              </div>
              <div
                className={cn(
                  "bg-muted relative w-full flex-1 overflow-hidden rounded-3xl"
                )}
              >
                <Image
                  src={feature.img}
                  alt={feature.title}
                  width={feature.width}
                  height={feature.height}
                  className="pointer-events-none h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature284 };
