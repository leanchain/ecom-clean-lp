"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
// Button handled via AnimatedBorderButton overlay
import AnimatedBorderButton from "@/components/animated-border-button";
import {
  Play,
  Shirt,
  Home,
  Sparkles,
  Smartphone,
  UtensilsCrossed,
  Watch,
  Dumbbell,
  Baby,
} from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Gallery25 = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", icon: Sparkles },
    { name: "Fashion & Apparel", icon: Shirt },
    { name: "Home & Furniture", icon: Home },
    { name: "Beauty & Cosmetics", icon: Sparkles },
    { name: "Electronics & Tech", icon: Smartphone },
    { name: "Food & Beverage", icon: UtensilsCrossed },
    { name: "Jewelry & Watches", icon: Watch },
    { name: "Sports & Fitness", icon: Dumbbell },
    { name: "Baby & Kids", icon: Baby },
  ];

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

  const column1Images = [
    {
      src: "/images/gallery/gallery-1.jpeg",
      alt: "Gallery Image 1",
      height: "23rem",
      width: 600,
      imgHeight: 800,
    },
    {
      src: "/images/gallery/gallery-2.jpg",
      alt: "Gallery Image 2",
      height: "28rem",
      width: 600,
      imgHeight: 900,
    },
    {
      src: "/images/gallery/gallery-3.jpeg",
      alt: "Gallery Image 3",
      height: "12rem",
      width: 600,
      imgHeight: 400,
    },
  ];

  const column2Images = [
    {
      src: "/images/gallery/gallery-4.jpg",
      alt: "Gallery Image 4",
      height: "13rem",
      width: 600,
      imgHeight: 450,
    },
    {
      src: "/images/gallery/gallery-5.jpeg",
      alt: "Gallery Image 5",
      height: "32rem",
      width: 600,
      imgHeight: 1000,
    },
    {
      src: "/images/gallery/gallery-6.jpg",
      alt: "Gallery Image 6",
      height: "18rem",
      width: 600,
      imgHeight: 600,
    },
  ];

  const column3Images = [
    {
      src: "/images/gallery/gallery-7.jpg",
      alt: "Gallery Image 7",
      height: "32rem",
      width: 600,
      imgHeight: 1000,
    },
    {
      src: "/images/gallery/gallery-8.jpg",
      alt: "Gallery Image 8",
      height: "32rem",
      width: 600,
      imgHeight: 1000,
    },
  ];

  const column4Images = [
    {
      src: "/images/hero/hero-2.jpg",
      alt: "Gallery Image 9",
      height: "13rem",
      width: 600,
      imgHeight: 450,
    },
    {
      src: "/images/hero/hero-11.jpeg",
      alt: "Gallery Image 10",
      height: "22.5rem",
      width: 600,
      imgHeight: 750,
    },
    {
      src: "/images/hero/hero-12.jpeg",
      alt: "Gallery Image 11",
      height: "22rem",
      width: 600,
      imgHeight: 700,
    },
  ];

  const column5Images = [
    {
      src: "/images/hero/hero-1.png",
      alt: "Gallery Image 12",
      height: "28rem",
      width: 600,
      imgHeight: 900,
    },
    {
      src: "/images/hero/hero-3.png",
      alt: "Gallery Image 13",
      height: "18rem",
      width: 600,
      imgHeight: 600,
    },
    {
      src: "/images/hero/hero-4.png",
      alt: "Gallery Image 14",
      height: "17rem",
      width: 600,
      imgHeight: 550,
    },
  ];

  // Videos used in the Hero
  const heroVideos = [
    {
      type: "video" as const,
      src: "/videos/gallery/gallery-video-1.mp4",
      height: "18rem",
    },
    {
      type: "video" as const,
      src: "/videos/gallery/gallery-video-2.mp4",
      height: "22rem",
    },
    {
      type: "video" as const,
      src: "/videos/gallery/gallery-video-3.mp4",
      height: "28rem",
    },
    {
      type: "video" as const,
      src: "/videos/gallery/gallery-video-4.mp4",
      height: "32rem",
    },
  ];

  // Extra requested video
  const extraVideo = {
    type: "video" as const,
    src: "/videos/gallery/gallery-video-5.mp4",
    height: "20rem",
  };

  // Build per-column mixed media arrays with fixed placement (no randomness)
  const toImage = (item: {
    src: string;
    alt: string;
    height: string;
    width: number;
    imgHeight: number;
  }) => ({
    type: "image" as const,
    ...item,
  });

  // Place some videos at the very top of their columns
  const col1 = [
    toImage(column1Images[0]),
    heroVideos[0],
    ...column1Images.slice(1).map(toImage),
  ];
  const col3 = [heroVideos[1], ...column3Images.map(toImage)];
  const col5 = [
    toImage(column5Images[0]),
    heroVideos[2],
    ...column5Images.slice(1).map(toImage),
  ];
  const col2 = [heroVideos[3], ...column2Images.map(toImage)];
  const col4 = [extraVideo, ...column4Images.map(toImage)];

  const handleGenerate = (item: { type: "image" | "video"; src: string }) => {
    // TODO: wire up to real generation action
    console.log("Generate clicked:", item);
  };

  return (
    <section className="pb-32">
      {/* Logo Bar Section */}
      <div className="container mt-12 mb-6">
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

      <div className="w-full px-4">
        {/* Category Filter Row */}
        <div className="container mb-8">
          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 whitespace-nowrap
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col1.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-3xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                    fill
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate{" "}
                      <Play
                        className="fill-white text-white"
                        style={{ stroke: "none" }}
                      />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col2.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-3xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                    fill
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate{" "}
                      <Play
                        className="fill-white text-white"
                        style={{ stroke: "none" }}
                      />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col3.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-3xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                    fill
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate{" "}
                      <Play
                        className="fill-white text-white"
                        style={{ stroke: "none" }}
                      />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col4.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-3xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                    fill
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate{" "}
                      <Play
                        className="fill-white text-white"
                        style={{ stroke: "none" }}
                      />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Decorative spacer removed to keep tight masonry spacing */}
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col5.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-3xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                    fill
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate{" "}
                      <Play
                        className="fill-white text-white"
                        style={{ stroke: "none" }}
                      />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery25 };
