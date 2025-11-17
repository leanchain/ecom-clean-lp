"use client";

import React from "react";
import { Package } from "lucide-react";
import CategoryBadge from "@/components/category-badge";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import Image from "next/image";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TypingAnimation } from "@/components/typing-animation";

interface StatItem {
  title: string;
  description: string;
}

const statsData: StatItem[] = [
  {
    title: "91%",
    description: "AI Search Score",
  },
  {
    title: "3.5x",
    description: "Increase in Visibility",
  },
  {
    title: "137%",
    description: "Increase in conversion",
  },
];

const platforms = [
  {
    name: "ChatGPT",
    logo: "/images/ai-platforms/chatgpt.svg",
  },
  {
    name: "Claude",
    logo: "/images/ai-platforms/claude.svg",
  },
  {
    name: "Perplexity",
    logo: "/images/ai-platforms/perplexity.svg",
  },
  {
    name: "Gemini",
    logo: "/images/ai-platforms/gemini.svg",
  },
  {
    name: "AI Overviews",
    logo: "/images/ai-platforms/google.svg",
  },
  {
    name: "AI Mode",
    logo: "/images/ai-platforms/ai-mode.svg",
  },
  {
    name: "Meta AI",
    logo: "/images/ai-platforms/meta.svg",
  },
];

const Stats18 = () => {
  return (
    <section id="fieson-pdp-ai" className="overflow-hidden py-32">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <CategoryBadge
              label="Fieson PDP AI"
              icon={<Package className="h-4 w-4" />}
            />
          </div>
          <h2 className="relative py-2 text-center font-sans text-4xl font-semibold tracking-tighter lg:text-5xl">
            Get your products recommended by <br />{" "}
            <TypingAnimation
              words={["ChatGPT", "Perplexity", "Claude", "Google AI Overviews"]}
              typingSpeed={100}
              deletingSpeed={50}
              delayBetweenWords={2000}
            />
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl px-5 text-center text-sm lg:text-base">
            Fieson PDP AI optimizes your product page content from deep
            contextual text to AI optimised images and videos for maximum
            visibility across all major AI search platforms.
          </p>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Video Section - 1/3 width */}
          <div className="flex flex-col lg:w-1/3">
            <div className="overflow-hidden rounded-3xl">
              <video className="h-auto w-full" autoPlay loop muted playsInline>
                <source src="/videos/ai-discovery-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Chart Section - 2/3 width */}
          <div className="flex flex-col items-center justify-center lg:w-2/3">
            {/* Chart with Legend on Right */}
            <div className="relative mb-1 flex h-[500px] w-full items-center justify-center">
              <div className="h-full w-full">
                <ChartRadarDots />
              </div>
              {/* Legend positioned on the right */}
              <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#64748b] dark:bg-[#d5d7de]" />
                  <span className="text-muted-foreground text-sm">Before</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff6041] dark:bg-[#ff6041]" />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#ff6041" }}
                  >
                    Fieson PDP AI
                  </span>
                </div>
              </div>
            </div>

            {/* Score Cards - Smaller */}
            <div className="grid w-full max-w-2xl grid-cols-3 gap-6">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="bg-popover flex min-h-20 flex-row items-center gap-3 rounded-3xl px-3 py-2.5"
                >
                  <div className="flex h-full items-center">
                    <div className="flex flex-col items-start gap-1">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span
                          key={i}
                          className="bg-primary block h-0.5 w-4 rounded"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-start justify-center gap-0.5">
                    <h2
                      className="text-2xl font-bold tracking-tighter md:text-3xl"
                      style={{ color: "#ff6041" }}
                    >
                      {stat.title}
                    </h2>
                    <p className="text-muted-foreground text-[10px] font-medium leading-tight md:text-xs">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Platforms logos at bottom */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-muted-foreground text-sm md:text-base">
            Our platform analyzes your product page content for a comprehensive
            score that predicts AI search visibility. Our Fieson PDP AI then
            optimises and generates all images, videos and deep text structured
            for both human conversion and AI search.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <h3 className="text-muted-foreground mb-8 text-center text-sm font-semibold uppercase tracking-wider">
            We Optimise Your Product Page Content For
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-7">
            {platforms.map((platform) => (
              <div key={platform.name} className="space-y-2 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center">
                  <Image
                    alt={platform.name}
                    className="h-full w-full object-contain"
                    src={platform.logo}
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-foreground text-sm font-semibold">
                  {platform.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const chartData = [
  { dimension: "Image Quality", before: 55, after: 98 },
  { dimension: "Video Content", before: 37, after: 88 },
  { dimension: "Deep Context", before: 26, after: 95 },
  { dimension: "AI Friendly Version ", before: 10, after: 90 },
  { dimension: "FAQ based on AI Search", before: 10, after: 94 },
  { dimension: "Product in use Content", before: 31, after: 87 },
];

const chartConfig = {
  before: {
    label: "Before",
    theme: {
      light: "#64748b",
      dark: "#d5d7de",
    },
  },
  after: {
    label: "After Fieson",
    theme: {
      light: "#ff6041",
      dark: "#ff6041",
    },
  },
} satisfies ChartConfig;

const ChartRadarDots = () => {
  return (
    <ChartContainer config={chartConfig} className="mx-auto h-full w-full">
      <RadarChart
        data={chartData}
        margin={{ top: 20, right: 60, bottom: 20, left: 20 }}
      >
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fontSize: 13 }}
          tickLine={false}
        />
        <PolarGrid gridType="polygon" stroke="#e5e7eb" strokeWidth={1} />
        <Radar
          dataKey="after"
          fill="var(--color-after)"
          fillOpacity={0.4}
          stroke="var(--color-after)"
          strokeWidth={2}
          dot={{
            r: 5,
            fillOpacity: 1,
          }}
        />
        <Radar
          dataKey="before"
          fill="var(--color-before)"
          fillOpacity={0.5}
          stroke="var(--color-before)"
          strokeWidth={2}
          dot={{
            r: 4,
            fillOpacity: 1,
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
};

export { Stats18 };
