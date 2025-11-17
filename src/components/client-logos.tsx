"use client";

import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const baseLogos = [
  {
    id: "google",
    name: "Google",
    image: "/logos/clients/google.svg",
  },
  {
    id: "amazon",
    name: "Amazon",
    image: "/logos/clients/amazon.svg",
  },
  {
    id: "ing",
    name: "ING Bank",
    image: "/logos/clients/ing.svg",
  },
  {
    id: "vodafone",
    name: "Vodafone",
    image: "/logos/clients/vodafone.svg",
  },
  {
    id: "frieslandcampina",
    name: "FrieslandCampina",
    image: "/logos/clients/frieslandcampina.svg",
  },
  {
    id: "arcadis",
    name: "Arcadis",
    image: "/logos/clients/arcadis.svg",
  },
  {
    id: "rsm",
    name: "RSM",
    image: "/logos/clients/rsm.svg",
  },
  {
    id: "gust",
    name: "Gust",
    image: "/logos/clients/gust.svg",
  },
  {
    id: "tue",
    name: "TU Eindhoven",
    image: "/logos/clients/tue.svg",
  },
  {
    id: "uu",
    name: "Utrecht University",
    image: "/logos/clients/uu.svg",
  },
  {
    id: "uva",
    name: "University of Amsterdam",
    image: "/logos/clients/uva.svg",
  },
  {
    id: "minibrew",
    name: "MiniBrew",
    image: "/logos/clients/minibrew.svg",
  },
  {
    id: "quatt",
    name: "Quatt",
    image: "/logos/clients/quatt.svg",
  },
];

// Triple the logos for smooth infinite scroll
const logos = [...baseLogos, ...baseLogos, ...baseLogos];

export default function ClientLogos() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-muted-foreground mb-8 text-center text-sm font-semibold uppercase tracking-wider">
          Clients we've worked with
        </h3>
        <Carousel
          plugins={[
            AutoScroll({
              playOnInit: true,
              speed: 1,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            loop: true,
            align: "start",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {logos.map((logo, index) => (
              <CarouselItem
                key={`${logo.id}-${index}`}
                className="h-15 lg:basis-1/9 relative mr-8 flex basis-1/2 items-center justify-center pl-0 sm:basis-1/4 md:basis-1/6"
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={140}
                  height={32}
                  className="h-8 w-auto shrink-0 object-contain"
                  style={{ maxHeight: "32px" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
