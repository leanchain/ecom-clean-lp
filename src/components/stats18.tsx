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
    description: "Increase in Conversion",
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
    <section id="beseam-pdp-ai" className="overflow-hidden pt-20 pb-32">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex justify-center">
            <CategoryBadge
              label="Beseam PDP AI"
              icon={<Package className="h-4 w-4" />}
            />
          </div>
          <h2 className="relative py-4 text-center font-heading text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl">
            Get your products recommended by <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              <TypingAnimation
                words={["ChatGPT", "Perplexity", "Claude", "Google AI Overviews"]}
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenWords={2000}
              />
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-3xl px-5 text-center text-lg leading-relaxed lg:text-xl">
            Transform your product pages into <strong className="text-foreground font-semibold">AI-first experiences</strong> with intelligent content optimization.
            Our AI analyzes, enhances, and generates everything from deep contextual descriptions to optimized visuals
            that dramatically boost visibility across all major AI search platforms.
          </p>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:gap-20">
          {/* Video Section - Enhanced */}
          <div className="flex flex-col lg:w-2/5">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 z-10" />
              <video className="h-auto w-full relative z-0" autoPlay loop muted playsInline>
                <source src="/videos/ai-discovery-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                  Live Demo
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">See AI Search in Action</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Watch how our AI transforms ordinary product pages into search-optimized experiences that get recommended by major AI platforms.
              </p>
            </div>
          </div>

          {/* Chart Section - Enhanced */}
          <div className="flex flex-col items-center justify-center lg:w-3/5">
            {/* Chart with Enhanced Legend */}
            <div className="relative mb-8 flex h-[500px] w-full items-center justify-center">
              <div className="h-full w-full">
                <ChartRadarDots />
              </div>
              {/* Enhanced Legend */}
              <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-4 rounded-2xl bg-background/80 backdrop-blur-sm p-4 border border-border/50 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-slate-400 dark:bg-slate-500 shadow-sm" />
                  <div>
                    <span className="text-muted-foreground text-sm font-medium">Before Beseam</span>
                    <p className="text-xs text-muted-foreground">Standard PDP</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-primary shadow-sm ring-2 ring-primary/30" />
                  <div>
                    <span className="text-sm font-bold text-primary">After Beseam</span>
                    <p className="text-xs text-muted-foreground">AI-Optimized</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Score Cards */}
            <div className="grid w-full max-w-4xl grid-cols-3 gap-8">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-background to-muted/30 border border-border/50 flex min-h-24 flex-row items-center gap-4 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex h-full items-center">
                    <div className="flex flex-col items-start gap-1">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span
                          key={i}
                          className="bg-primary block h-0.5 w-5 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-start justify-center gap-1">
                    <h2
                      className="text-3xl font-bold tracking-tight md:text-4xl"
                      style={{ color: "#ff6041" }}
                    >
                      {stat.title}
                    </h2>
                    <p className="text-muted-foreground text-sm font-medium leading-tight">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced AI Platforms Section */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">How Beseam PDP AI Works</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Our intelligent platform analyzes your existing product data and generates comprehensive,
              AI-optimized content including <strong className="text-foreground font-semibold">high-quality images</strong>,
              and <strong className="text-foreground font-semibold">deep narrative descriptions</strong> that maximize
              visibility across all major AI search platforms.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-muted-foreground mb-4 text-lg font-semibold uppercase tracking-wider">
              Optimized for Every AI Search Platform
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Your products get discovered and recommended by the world's most powerful AI assistants
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-7">
            {platforms.map((platform) => (
              <div key={platform.name} className="group space-y-4 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-muted/50 to-muted border border-border/50 group-hover:border-primary/30 transition-colors duration-300">
                  <Image
                    alt={platform.name}
                    className="h-12 w-12 object-contain group-hover:scale-110 transition-transform duration-300"
                    src={platform.logo}
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="text-foreground text-sm font-semibold group-hover:text-primary transition-colors duration-300">
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
  { dimension: "AI-Optimized Images", before: 55, after: 98 },
  { dimension: "Contextual Videos", before: 37, after: 88 },
  { dimension: "Deep Product Context", before: 26, after: 95 },
  { dimension: "AI-Friendly Schema", before: 10, after: 90 },
  { dimension: "Smart FAQ Generation", before: 10, after: 94 },
  { dimension: "Usage-Based Content", before: 31, after: 87 },
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
    label: "After Beseam",
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
