"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, FileText, ImageIcon, PlayCircle } from "lucide-react";

import AnimatedBorderButton from "@/components/animated-border-button";
import { TypingAnimation } from "@/components/typing-animation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Hero230 = () => {
  const phoneScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = phoneScrollRef.current;
    if (!el) return;

    let frameId: number;
    let direction = 1;

    const animate = () => {
      if (!el) return;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;

      el.scrollTop += direction * 0.35;

      if (el.scrollTop <= 0) {
        direction = 1;
      } else if (el.scrollTop >= maxScroll) {
        direction = -1;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const media = [
    // Images - now using local paths
    {
      type: "image" as const,
      src: "/images/hero/hero-1.png",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-2.jpg",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-3.png",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-4.png",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-5.png",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-6.jpg",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-7.jpeg",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-8.jpg",
      width: 800,
      height: 600,
    },
    {
      type: "video" as const,
      src: "/videos/hero/hero-video-1.mp4",
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-9.jpg",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-10.jpeg",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-11.jpeg",
      width: 800,
      height: 600,
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-12.jpeg",
      width: 800,
      height: 600,
    },
    // Videos
    {
      type: "video" as const,
      src: "/videos/hero/hero-video-2.mp4",
    },
    {
      type: "image" as const,
      src: "/images/hero/hero-13.jpg",
      width: 800,
      height: 600,
    },
    {
      type: "video" as const,
      src: "/videos/hero/hero-video-3.mp4",
    },
    {
      type: "video" as const,
      src: "/videos/hero/hero-video-4.mp4",
    },
  ] as const;

  // Use the media array directly without shuffling to avoid hydration mismatch
  const shuffledMedia = media;
  return (
    <section className="pt-20">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-heading text-foreground max-w-4xl text-4xl md:text-5xl">
          Boost Your Sales with High-Converting Product Pages that get
          Recommended by
          <br />{" "}
          <span className="block md:inline">
            <TypingAnimation
              words={["ChatGPT", "Perplexity", "Claude", "Google AI Overviews"]}
              typingSpeed={100}
              deletingSpeed={50}
              delayBetweenWords={2000}
            />
          </span>
        </h1>
        <p className="text-muted-foreground/80 mt-3 max-w-xl">
          Create scroll-stopping on-brand product visuals and deep product
          context to ensure your products are found in AI search and convert
          browsers into buyers.
        </p>
        <div className="mb-12 mt-8">
          <AnimatedBorderButton
            asChild
            className="cursor-pointer [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
          >
            <Link href="/demo">
              Get Started <ArrowRight />
            </Link>
          </AnimatedBorderButton>
        </div>
      </div>

      {/* Scrolling Image Bar - Full Width */}
      <div className="relative w-full px-4 flex items-center justify-center">
        <Carousel
          plugins={[Autoplay({ delay: 1500 })]}
          opts={{ loop: true, align: "start" }}
        >
          <CarouselContent>
            {shuffledMedia.map((item, index) => (
              <CarouselItem
                key={index}
                className="translate-y-18 relative flex basis-1/2 cursor-grab justify-center active:cursor-grabbing sm:basis-1/4 md:basis-1/3 lg:basis-1/5"
              >
                <div className="easeOut hover:-translate-y-18 mt-auto w-full overflow-hidden rounded-t-3xl border transition-all">
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt="Product showcase"
                      width={item.width}
                      height={item.height}
                      className="h-full w-full object-cover"
                      priority={index < 3} // Priority for first 3 images
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {/* PDP preview showing images, video and copy together (temporarily hidden) */}
      {false && (
        <div className="container mt-16 grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-4 text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              PDP Preview
            </p>
            <h2 className="font-heading text-foreground text-3xl md:text-4xl">
              See images, video & copy working together on your PDP
            </h2>
            <p className="text-muted-foreground/80 max-w-xl text-sm md:text-base">
              Fieson generates on-brand product images, short-form video and
              AI-written descriptions that slot straight into your product
              detail page.
            </p>
            <dl className="mt-6 grid gap-3 text-xs sm:grid-cols-3">
              <div className="bg-muted/60 flex items-start gap-3 rounded-3xl border px-4 py-3">
                <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                  <ImageIcon className="h-4 w-4" />
                </span>
                <div>
                  <dt className="font-medium text-foreground">AI Images</dt>
                  <dd className="text-muted-foreground">
                    Packshots, lifestyle & detail crops.
                  </dd>
                </div>
              </div>
              <div className="bg-muted/60 flex items-start gap-3 rounded-3xl border px-4 py-3">
                <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                  <PlayCircle className="h-4 w-4" />
                </span>
                <div>
                  <dt className="font-medium text-foreground">AI Video</dt>
                  <dd className="text-muted-foreground">
                    PDP-ready loops & explainers.
                  </dd>
                </div>
              </div>
              <div className="bg-muted/60 flex items-start gap-3 rounded-3xl border px-4 py-3">
                <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <dt className="font-medium text-foreground">AI Copy</dt>
                  <dd className="text-muted-foreground">
                    Descriptions tuned for AI search.
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-3xl">
            {/* Glow behind device */}
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-linear-to-br from-primary/25 via-primary/0 to-violet-500/30 blur-2xl" />

            {/* MacBook-style frame */}
            <div className="relative mx-auto flex h-[420px] w-full max-w-3xl flex-col rounded-[2.5rem] border border-border bg-background shadow-2xl md:h-[520px]">
              {/* Top bar with window controls */}
              <div className="flex items-center justify-between px-6 pt-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="h-1.5 w-16 rounded-full bg-muted-foreground/40" />
              </div>

              {/* Scrollable Shopify-style PDP inside device */}
              <div
                ref={phoneScrollRef}
                className="mt-3 flex-1 overflow-y-auto px-6 pb-6"
              >
                {/* Media gallery */}
                <div className="relative overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src="/images/hero/hero-3.png"
                    alt="Shopify product page visual"
                    width={800}
                    height={1000}
                    className="h-72 w-full object-cover md:h-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <PlayCircle className="h-10 w-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1">
                    <span className="h-1.5 w-6 rounded-full bg-white" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  </div>
                </div>

                {/* Buy box & summary */}
                <div className="mt-4 space-y-3 text-[11px]">
                  <p className="text-muted-foreground uppercase tracking-[0.2em]">
                    Aurora Bottle Co • Shopify
                  </p>
                  <h3 className="text-foreground text-sm font-semibold">
                    Aurora Thermal Bottle 750ml
                  </h3>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-foreground text-base font-semibold">
                      €39.00
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <div className="flex items-center gap-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/50" />
                      </div>
                      <span>4.8 (128)</span>
                    </div>
                  </div>

                  {/* Variant pills */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["Black", "Sand", "Ocean"].map((variant) => (
                      <button
                        key={variant}
                        className="border-border bg-background hover:bg-muted text-foreground inline-flex items-center rounded-full border px-2.5 py-1 text-[10px]"
                        type="button"
                      >
                        {variant}
                      </button>
                    ))}
                  </div>

                  {/* Key PDP highlights */}
                  <ul className="mt-3 space-y-1.5 text-[10px] text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>
                        AI-crafted images, video and copy for this SKU.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>
                        Optimised layout for AI search and human conversion.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>
                        Ships as a Shopify-ready PDP section in minutes.
                      </span>
                    </li>
                  </ul>

                  {/* Add to cart / buy area */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>In stock • Free shipping over €50</span>
                      <span className="text-emerald-500">AI by Fieson</span>
                    </div>
                    <button
                      type="button"
                      className="w-full rounded-full bg-foreground px-4 py-2 text-[11px] font-medium text-background"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>

                {/* Included in this AI PDP */}
                <div className="mt-6 border-t border-border/40 pt-4 text-[10px]">
                  <p className="text-muted-foreground uppercase tracking-[0.2em]">
                    INCLUDED IN THIS AI PDP
                  </p>
                  <div className="mt-3 grid gap-2">
                    <div className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <p className="text-foreground font-medium">
                          Visual set
                        </p>
                        <p className="text-muted-foreground">
                          Packshot, lifestyle, detail crops and PDP hero video.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <p className="text-foreground font-medium">Narrative</p>
                        <p className="text-muted-foreground">
                          Benefits, use cases, objections and AI search-friendly
                          copy.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-2xl bg-muted/60 p-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <p className="text-foreground font-medium">Structure</p>
                        <p className="text-muted-foreground">
                          Schema, sections and attributes aligned with AI
                          engines.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual story blocks */}
                <div className="mt-5 space-y-2 text-[10px]">
                  <p className="text-foreground font-medium">Visual story</p>
                  <p className="text-muted-foreground">
                    A mix of packshot, lifestyle and in-use visuals designed to
                    feel complete to both shoppers and AI.
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-600" />
                    <div className="h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-300 dark:from-emerald-900 dark:to-emerald-700" />
                    <div className="h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-300 dark:from-indigo-900 dark:to-indigo-700" />
                  </div>
                </div>

                {/* How Fieson builds this PDP */}
                <div className="mt-6 rounded-2xl bg-muted/60 p-3 text-[10px]">
                  <p className="mb-2 text-foreground font-medium">
                    How Fieson builds this PDP
                  </p>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-background text-[9px] font-semibold">
                        1
                      </span>
                      <p className="text-muted-foreground">
                        Ingests your feed + existing imagery for Aurora.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-background text-[9px] font-semibold">
                        2
                      </span>
                      <p className="text-muted-foreground">
                        Generates on-brand images, PDP video and narrative
                        blocks.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-background text-[9px] font-semibold">
                        3
                      </span>
                      <p className="text-muted-foreground">
                        Outputs a Shopify-ready PDP section you can review and
                        ship.
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Search score snapshot */}
                <div className="mt-4 rounded-2xl border bg-background/80 p-3 text-[10px]">
                  <p className="mb-2 text-foreground font-medium">
                    AI Search score snapshot
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        AI Search Score
                      </span>
                      <span className="text-foreground font-semibold">
                        92/100
                      </span>
                    </div>
                    <div className="flex h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="w-[80%] bg-emerald-500" />
                      <div className="w-[20%] bg-muted" />
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Media coverage</span>
                      <span>5 / 5</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Time saved vs manual</span>
                      <span>70%</span>
                    </div>
                  </div>
                </div>

                {/* FAQ & comparison */}
                <div className="mt-6 text-[10px]">
                  <p className="text-muted-foreground uppercase tracking-[0.2em]">
                    FAQ &amp; COMPARISON
                  </p>
                </div>

                <div className="mt-3 space-y-1 rounded-2xl border bg-muted/40 p-3 text-[10px]">
                  <p className="font-medium text-foreground">
                    What does this Aurora PDP actually include?
                  </p>
                  <p className="text-muted-foreground">
                    Everything Fieson recommends for AI-ready PDPs: visuals,
                    deep narrative, FAQs, comparisons and schema for this
                    product.
                  </p>
                </div>

                <div className="mt-3 space-y-2 rounded-2xl border bg-muted/40 p-3 text-[10px]">
                  <p className="font-medium text-foreground">
                    How is this better than our current PDP?
                  </p>
                  <p className="text-muted-foreground">
                    High-level view of Fieson PDP AI vs traditional PDPs for
                    Aurora:
                  </p>
                  <div className="mt-2 overflow-hidden rounded-xl border bg-background/80 text-[9px]">
                    <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-muted/60">
                      <div className="px-2 py-1.5"></div>
                      <div className="px-2 py-1.5 text-center font-semibold">
                        Fieson PDP AI
                      </div>
                      <div className="px-2 py-1.5 text-center text-muted-foreground">
                        Traditional PDP
                      </div>
                    </div>
                    <div className="grid grid-cols-[1.1fr_1fr_1fr] border-t">
                      <div className="px-2 py-1.5 font-medium">
                        AI search visibility
                      </div>
                      <div className="bg-emerald-500/5 px-2 py-1.5">
                        <span>3–5× higher, GEO + SEO ready</span>
                      </div>
                      <div className="px-2 py-1.5 text-muted-foreground">
                        <span>Weak / unstructured</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1.1fr_1fr_1fr] border-t">
                      <div className="px-2 py-1.5 font-medium">
                        Deep product context
                      </div>
                      <div className="bg-emerald-500/5 px-2 py-1.5">
                        <span>
                          Narrative, FAQs, comparisons and best-for all aligned.
                        </span>
                      </div>
                      <div className="px-2 py-1.5 text-muted-foreground">
                        <span>Generic, shallow copy</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1.1fr_1fr_1fr] border-t">
                      <div className="px-2 py-1.5 font-medium">
                        Scale &amp; time
                      </div>
                      <div className="bg-emerald-500/5 px-2 py-1.5">
                        <span>Minutes per SKU, synced to your store.</span>
                      </div>
                      <div className="px-2 py-1.5 text-muted-foreground">
                        <span>Manual per product</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 mb-4 space-y-1 rounded-2xl border bg-muted/40 p-3 text-[10px]">
                  <p className="font-medium text-foreground">
                    Will it match our brand and Shopify theme?
                  </p>
                  <p className="text-muted-foreground">
                    Yes. Fieson learns your brand book and collection rules so
                    Aurora PDPs stay consistent with your theme, typography and
                    tone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { Hero230 };
