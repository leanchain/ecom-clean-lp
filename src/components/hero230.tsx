"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import React, { useMemo } from "react";

import AnimatedBorderButton from "@/components/animated-border-button";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Hero230 = () => {
  const media = [
    // Images
    {
      type: "image",
      src: "https://framerusercontent.com/images/PkU3Gw8pAzmi2niiMrnBcHuu8I.png",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/IIwrTUEKmVA8Bc0vqQYJIoYqps.jpg",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/tAX01Ow9zlh8EUCDGAfh3hpdQ0.png",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/qwVnKblygARf7tiZx5lUDJWpY.png",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/4ff2fkZLdJJzmP8U0NhfBfndxk.png",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/Sl9EJQTfoycU8fTKPQzTCSt7wI.jpg",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/D9TgLVUKJBPyEFgeH5cU1lj9W3A.jpeg",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/A3YTpd3ihmlKdXxeXm0pBEueA.jpg",
    },
    {
      type: "video",
      src: "https://cdn-front.freepik.com/home/anon-rvmp/features/designs/mockup-logo-hover.mp4",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/Tw5d4QXO8KrpmBh9B9bEy8oWm1g.jpg",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/jTk7xlHHF1IGEJbjQzmPMpmxz84.jpeg",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/IF4Acwwh9jwUUCkAQHXQyyXDiGM.jpeg",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/07lRVxK2iyJbSLDBNZxgTnhtlk.jpeg",
    },
    // Videos (replacing a few previous duplicates/images for variety)
    {
      type: "video",
      src: "https://framerusercontent.com/assets/XX4yEVUD0cQvRpu54Cu7ZwJwGZs.mp4",
    },
    {
      type: "image",
      src: "https://framerusercontent.com/images/grEtdsKRFf8M8oKPm7RzOw0uAfg.jpg",
    },
    {
      type: "video",
      src: "https://res.papir.cc/assets/v/nano_spinning_fall_0509.mp4",
    },
    {
      type: "video",
      src: "https://framerusercontent.com/assets/Vb7xAqRZpCMTPZp1kkCLENR7ooI.mp4",
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
          AI Media Studio for Product Detail Pages Optimised for AI Search.
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
                      className="block h-full w-full object-cover"
                      muted
                      playsInline
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt="scroller item"
                      className="block h-full w-full object-cover"
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
                    <img
                      src={logo.image}
                      alt={logo.description}
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
