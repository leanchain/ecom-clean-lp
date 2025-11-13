"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import React, { useMemo } from "react";
import Image from "next/image";

import AnimatedBorderButton from "@/components/animated-border-button";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Hero230 = () => {
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

  const shuffledMedia = useMemo(() => {
    const arr = [...media];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);
  const baseLogos = [
    {
      id: "runway",
      description: "runway",
      image: "/logos/runway.svg",
      className: "h-6 w-auto shrink-0 object-contain max-w-[125px]",
    },
    {
      id: "google",
      description: "google",
      image: "/logos/google.svg",
      className: "h-6 w-auto shrink-0 object-contain max-w-[125px]",
    },
    {
      id: "minimax",
      description: "minimax",
      image: "/logos/minimax.svg",
      className: "h-6 w-auto shrink-0 object-contain max-w-[125px]",
    },
    {
      id: "kling",
      description: "kling",
      image: "/logos/kling.svg",
      className: "h-6 w-auto shrink-0 object-contain max-w-[125px]",
    },
    {
      id: "flux",
      description: "flux",
      image: "/logos/flux.svg",
      className: "h-6 w-auto shrink-0 object-contain max-w-[125px]",
    },
    {
      id: "chatgpt",
      description: "chatgpt",
      image: "/logos/chatgpt.svg",
      className: "h-6 w-auto shrink-0 object-contain max-w-[125px]",
    },
    {
      id: "elevenlabs",
      description: "elevenlabs",
      image: "/logos/elevenlabs.svg",
      className: "h-6 w-auto shrink-0 object-contain max-w-[125px]",
    },
  ];
  const logos = [...baseLogos, ...baseLogos, ...baseLogos];
  return (
    <section className="pt-20">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        {/* <Button variant="secondary" size="sm" className="group gap-3">
          <span className="bg-foreground size-2.5 rounded-full" />
          Flexible Plan customized for you
        </Button> */}
        <h1 className="font-heading text-foreground max-w-3xl text-4xl md:text-5xl">
          Optimise your Product Page Content for AI search & Conversion.
        </h1>
        <p className="text-muted-foreground/80 mt-3 max-w-xl">
          Create scroll-stopping on-brand product visuals and content to ensure
          your product pages are found in AI search.
        </p>
        <div className="mb-12 mt-8">
          <AnimatedBorderButton className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5">
            Get Started <ArrowRight />
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

      {/* Logo Bar - Below Image Bar */}
      <div className="container mt-12 mb-12">
        <h2 className="text-2xl md:text-4xl md:text-balance lg:text-5xl lg:leading-14 mb-6 md:mb-8 text-center mx-auto max-w-4xl">
          All the top GenAI models, orchestrated to perfectly fit your brand and
          products
        </h2>
        <div className="relative mx-auto w-full overflow-hidden">
          <Carousel
            plugins={[AutoScroll({ playOnInit: true })]}
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="h-15 lg:basis-1/9 relative mr-6 flex basis-1/2 justify-center pl-0 opacity-30 sm:basis-1/4 md:basis-1/3"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={logo.image}
                      alt={logo.description}
                      width={125}
                      height={24}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none z-10 from-background absolute inset-y-0 left-0 w-32 bg-gradient-to-r to-transparent"></div>
          <div className="pointer-events-none z-10 from-background absolute inset-y-0 right-0 w-32 bg-gradient-to-l to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Hero230 };
