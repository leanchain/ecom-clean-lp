"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";

import AnimatedBorderButton from "@/components/animated-border-button";
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

  // Use the media array directly without shuffling to avoid hydration mismatch
  const shuffledMedia = media;
  return (
    <section className="pt-20">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        {/* <Button variant="secondary" size="sm" className="group gap-3">
          <span className="bg-foreground size-2.5 rounded-full" />
          Flexible Plan customized for you
        </Button> */}
        <h1 className="font-heading text-foreground max-w-3xl text-4xl md:text-5xl">
          Improve Product Page Content to get recommended by AI search and
          improve Conversion.
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
    </section>
  );
};

export { Hero230 };
