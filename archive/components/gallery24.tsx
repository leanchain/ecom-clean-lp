"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

import { useIsMobile } from "@/hooks/use-mobile";

import AnimatedBorderButton from "@/components/animated-border-button";
import { Button } from "@/components/ui/button";

const images = [
  {
    id: 1,
    src: "/images/products/product-1.jpeg",
    title: "Summer Collection",
    code: "#0031",
    width: 800,
    height: 1000,
  },
  {
    id: 2,
    src: "/images/products/product-2.jpeg",
    title: "The Music Festival",
    code: "#0030",
    width: 800,
    height: 1000,
  },
  {
    id: 3,
    src: "/images/products/product-3.jpeg",
    title: "Winter Special",
    code: "#0032",
    width: 800,
    height: 1000,
  },
  {
    id: 4,
    src: "/images/products/product-4.jpeg",
    title: "Spring Edition",
    code: "#0033",
    width: 800,
    height: 1000,
  },
  {
    id: 5,
    src: "/images/products/product-5.jpeg",
    title: "Spring Edition",
    code: "#0033",
    width: 800,
    height: 1000,
  },
  {
    id: 6,
    src: "/images/products/product-6.jpeg",
    title: "Spring Edition",
    code: "#0033",
    width: 800,
    height: 1000,
  },
  {
    id: 7,
    src: "/images/products/product-7.jpeg",
    title: "Spring Edition",
    code: "#0033",
    width: 800,
    height: 1000,
  },
  {
    id: 8,
    src: "/images/products/product-8.jpeg",
    title: "Spring Edition",
    code: "#0033",
    width: 800,
    height: 1000,
  },
];

const Gallery24 = () => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <section className="py-32">
      <div className="container relative overflow-x-clip">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-accent max-w-xl text-center text-5xl md:text-6xl">
            We don&apos;t Believe in talk
          </h1>
          <p className="text-md my-10 max-w-lg text-center opacity-50">
            we deliver Results Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt.
          </p>

          <div className="flex w-full items-center justify-center gap-1">
            {images
              .slice(0, useIsMobile() ? 4 : images.length)
              .map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative cursor-pointer overflow-hidden rounded-3xl border"
                  initial={{ width: "2.5rem", height: "20rem" }}
                  animate={{
                    width: activeImage === index ? "24rem" : "5rem",
                    height: activeImage === index ? "24rem" : "24rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => setActiveImage(index)}
                  onHoverStart={() => setActiveImage(index)}
                >
                  <AnimatePresence>
                    {activeImage === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute h-full w-full bg-gradient-to-t from-black/80 to-transparent"
                      />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {activeImage === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute flex h-full w-full flex-col items-end justify-end px-4 pb-10"
                      >
                        <p className="text-left text-xs text-white/50">
                          {image.code}
                        </p>
                        <h3 className="w-42 text-right text-3xl font-bold text-white lg:w-fit lg:whitespace-nowrap">
                          {image.title.split(" ")[0]}
                          <span className="font-accent">
                            {" "}
                            {image.title.split(" ")[1]}{" "}
                          </span>
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-32 rounded-full text-xs"
                        >
                          Add to Cart <ShoppingCart size={14} />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Image
                    src={image.src}
                    className="size-full object-cover"
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    priority={image.id === 1}
                  />
                </motion.div>
              ))}
          </div>
          <AnimatedBorderButton
            wrapperClassName="mt-10"
            className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
          >
            Contact Us <ArrowRight />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};

export { Gallery24 };
