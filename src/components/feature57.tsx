"use client";

import { Camera, Video, Search, Package } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import CategoryBadge from "@/components/category-badge";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const features = [
  {
    id: "feature-1",
    title: "AI Image Generation",
    description:
      "Transform basic product photos into professional, on-brand visuals with background removal, scene generation, and style transfer. Create scroll-stopping lifestyle images at scale.",
    icon: Camera,
    image: "/images/features/feature-image.svg",
    width: 600,
    height: 400,
    bullets: [
      "Automatic background removal and replacement",
      "AI-powered scene generation and style transfer",
      "Batch processing for product catalogs",
    ],
  },
  {
    id: "feature-2",
    title: "AI Video Generation",
    description:
      "Bring products to life with automated video creation, 360° spins, and AR previews. Generate engaging video content optimized for every platform.",
    icon: Video,
    image: "/images/features/feature-video.svg",
    width: 600,
    height: 400,
    bullets: [
      "Automated product video creation from images",
      "360° product spins and AR-ready previews",
      "Platform-optimized video formats",
    ],
  },
  {
    id: "feature-3",
    title: "AI Search Enrichment",
    description:
      "Ensure your products are found in ChatGPT, Perplexity, and other AI search engines with AI-generated alt text, metadata, and semantic SEO optimization.",
    icon: Search,
    image: "/images/features/feature-search.svg",
    width: 600,
    height: 400,
    bullets: [
      "AI-generated alt text and metadata",
      "Semantic SEO optimization for AI engines",
      "Real-time AI search performance tracking",
    ],
  },
];

const Feature57 = () => {
  const [selection, setSelection] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const handleSelection = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setSelection(carouselApi.selectedScrollSnap());
    };
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

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

              {/* Image Block - Right Side */}
              <div className="relative md:w-1/2 lg:w-3/5">
                <div className="border-border overflow-hidden rounded-3xl border shadow-sm">
                  <Carousel
                    setApi={setCarouselApi}
                    className="aspect-4/5 md:aspect-3/4 lg:aspect-4/5 max-h-[500px] w-full [&>div]:h-full"
                    opts={{
                      loop: true,
                    }}
                  >
                    <CarouselContent className="mx-0 h-full w-full">
                      {features.map((feature) => (
                        <CarouselItem key={feature.id} className="px-0">
                          <div className="relative h-full w-full overflow-hidden">
                            <Image
                              src={feature.image}
                              alt={feature.title}
                              width={feature.width}
                              height={feature.height}
                              className="h-full w-full object-cover object-center transition-transform duration-500"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
            </div>

            {/* Tab Navigation - Centered Below Entire Section */}
            <div className="mt-8 flex justify-center gap-3">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature57 };
