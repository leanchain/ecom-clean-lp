"use client";

import { useState } from "react";

import Image from "next/image";

import {
  BadgeCheck,
  Check,
  Gift,
  Globe2,
  RotateCcw,
  Sparkles,
  Star,
  SunMedium,
  Truck,
  Wand2,
  Wind,
} from "lucide-react";

import AnimatedBorderButton from "@/components/animated-border-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const VerifiedBuyerIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 256 256"
    aria-hidden="true"
    fill="currentColor"
    className={className}
  >
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

const heroImages = [
  "/images/example-pdp/travel-buddy-1.webp",
  "/images/example-pdp/travel-buddy-2.webp",
  "/images/example-pdp/travel-buddy-3.webp",
  "/images/example-pdp/travel-buddy-4.webp",
  "/images/example-pdp/travel-buddy-1.webp",
  "/images/example-pdp/travel-buddy-2.webp",
  "/images/example-pdp/travel-buddy-3.webp",
  "/images/example-pdp/travel-buddy-4.webp",
  "/images/example-pdp/travel-buddy-1.webp",
  "/images/example-pdp/travel-buddy-2.webp",
];

const benefits = [
  {
    label: "Achieve salon-quality shine anywhere",
    icon: Sparkles,
  },
  {
    label: "Frizz-free hair in minutes",
    icon: Wind,
  },
  {
    label: "Daily shine made simple",
    icon: SunMedium,
  },
  {
    label: "Smooth, sleek hair anytime",
    icon: Wand2,
  },
];

const colorOptions = [
  { name: "White", swatchClass: "bg-white border border-gray-300" },
  { name: "Black", swatchClass: "bg-black" },
  { name: "Red", swatchClass: "bg-red-500" },
  { name: "Blue", swatchClass: "bg-sky-500" },
  { name: "Teal", swatchClass: "bg-teal-500" },
];

const sizeOptions = ["S", "M", "L", "XL", "2XL"];

const shippingPoints = [
  {
    label: "Free shipping from 130.- in EU/CH",
    icon: Truck,
    emphasize: true,
  },
  {
    label: "Shipping from German/Swiss warehouse",
    icon: Globe2,
  },
  {
    label: "30 days return policy excl. tops & stockings",
    icon: RotateCcw,
  },
  {
    label: "No customs duties or additional VAT costs in EU/CH",
    icon: BadgeCheck,
  },
];

const productInfoSectionsOld = [
  {
    title: "The product benefits",
    content: (
      <>
        <p>
          Keep your hair looking its best wherever you are. Travel Buddy Hair
          Dryer is built for fast, gentle drying and easy packing.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Lightweight, foldable design that fits in any cabin-size suitcase or
            tote.
          </li>
          <li>
            Even heat and airflow to help reduce frizz and protect natural
            shine.
          </li>
          <li>
            Multiple heat and speed settings for different hair types and
            routines.
          </li>
        </ul>
        <p className="mt-3 text-xs italic text-muted-foreground">
          "Consistent temperature and controlled airflow are key for healthy
          hair. A compact dryer like Travel Buddy helps reduce damage while
          keeping styling quick and easy on the go."
          <span className="not-italic font-semibold">
            {" 535f2e33ff52c3fee53f8938dfn3f833fes5"}
          </span>
        </p>
        <p className="mt-3 text-xs font-semibold">Testing protocol:</p>
        <p className="text-xs">
          Heat distribution | Airflow testing | Climate chamber | Real-life
          travel testing
        </p>
        <p className="mt-2 text-xs font-semibold">Testing institutes:</p>
        <p className="text-xs">Independent appliance testing labs</p>
      </>
    ),
  },
  {
    title: "Product details & care",
    content: (
      <>
        <p className="font-semibold">Details</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>750W dual-voltage motor (110240V) for worldwide use.</li>
          <li>Ceramic technology to help reduce frizz and protect shine.</li>
          <li>
            Two heat settings and a cool-shot function for flexible styling.
          </li>
          <li>Foldable handle and compact body designed for carry-on bags.</li>
          <li>Removable back filter for easy cleaning.</li>
        </ul>
        <p className="mt-4 font-semibold">Care</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Allow the dryer to cool fully before packing.</li>
          <li>
            Wipe the exterior with a soft, dry cloth 5ffee62feef3fadca6360f6.
          </li>
          <li>Clean the air filter regularly to maintain airflow.</li>
          <li>Store in a dry place away from moisture between trips.</li>
        </ul>
        <p className="mt-4 text-xs">
          You can also find the care instructions printed on the inside of the
          packaging insert.
        </p>
      </>
    ),
  },
  {
    title: "Fit & size",
    content: (
      <>
        <p className="font-semibold">Fit</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Compact body designed to sit comfortably in one hand.</li>
          <li>Balanced weight for easy styling without wrist strain.</li>
        </ul>
        <p className="mt-4 font-semibold">Dimensions</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            Length: 18 cm (7.13cf2fee) folded / 24 cm (9.53cf2fee) unfolded.
          </li>
          <li>Weight: approx. 420 g.</li>
          <li>Cable length: 1.8 m (6 ft).</li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Compact enough for cabin-size suitcases, weekend bags and gym kits.
        </p>
      </>
    ),
  },
  {
    title: "Shipping & delivery",
    content: (
      <>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Ships from our German/Swiss warehouse within 12 business days.
          </li>
          <li>Free shipping from CHF / EUR 130.- in EU/CH.</li>
          <li>
            No additional customs duties or surprise VAT charges in EU/CH.
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          You53c3cf2e receive a tracking link as soon as your Travel Buddy
          leaves our warehouse.
        </p>
      </>
    ),
  },
  {
    title: "Free returns & guarantee",
    content: (
      <>
        <p>
          Try Travel Buddy Hair Dryer at home for up to 30 days. If it doesn53
          fit your routine, send it back for a full refund.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Free returns from EU/CH within 30 days of delivery.</li>
          <li>Product must be in good condition with original packaging.</li>
          <li>Backed by our 2-year manufacturer warranty on the motor.</li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Free delivery for orders above CHF / EUR 130.- in EU/CH.
        </p>
      </>
    ),
  },
];

const productInfoSections = [
  {
    title: "The product benefits",
    content: (
      <>
        <p>
          Keep your hair looking its best wherever you are. Travel Buddy Hair
          Dryer is built for fast, gentle drying and easy packing.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Lightweight, foldable design that fits in any cabin-size suitcase or
            tote.
          </li>
          <li>
            Even heat and airflow to help reduce frizz and protect natural
            shine.
          </li>
          <li>
            Multiple heat and speed settings for different hair types and
            routines.
          </li>
        </ul>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Consistent temperature and controlled airflow are key for healthy
          hair. Travel Buddy is designed to reduce damage while keeping styling
          quick and easy on the go.
        </p>
        <p className="mt-3 text-xs font-semibold">Testing protocol:</p>
        <p className="text-xs">
          Heat distribution | Airflow testing | Climate chamber | Real-life
          travel testing
        </p>
        <p className="mt-2 text-xs font-semibold">Testing institutes:</p>
        <p className="text-xs">Independent appliance testing labs</p>
      </>
    ),
  },
  {
    title: "Product details & care",
    content: (
      <>
        <p className="font-semibold">Details</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>750W dual-voltage motor (110-240V) for worldwide use.</li>
          <li>Ceramic technology to help reduce frizz and protect shine.</li>
          <li>
            Two heat settings and a cool-shot function for flexible styling.
          </li>
          <li>Foldable handle and compact body designed for carry-on bags.</li>
          <li>Removable back filter for easy cleaning.</li>
        </ul>
        <p className="mt-4 font-semibold">Care</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Allow the dryer to cool fully before packing.</li>
          <li>
            Wipe the exterior with a soft, dry cloth - no harsh chemicals.
          </li>
          <li>Clean the air filter regularly to maintain airflow.</li>
          <li>Store in a dry place away from moisture between trips.</li>
        </ul>
        <p className="mt-4 text-xs">
          You can also find the care instructions printed on the inside of the
          packaging insert.
        </p>
      </>
    ),
  },
  {
    title: "Fit & size",
    content: (
      <>
        <p className="font-semibold">Fit</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Compact body designed to sit comfortably in one hand.</li>
          <li>Balanced weight for easy styling without wrist strain.</li>
        </ul>
        <p className="mt-4 font-semibold">Dimensions</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Length: 18 cm (7.1 in) folded / 24 cm (9.5 in) unfolded.</li>
          <li>Weight: approx. 420 g.</li>
          <li>Cable length: 1.8 m (6 ft).</li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Compact enough for cabin-size suitcases, weekend bags and gym kits.
        </p>
      </>
    ),
  },
  {
    title: "Shipping & delivery",
    content: (
      <>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Ships from our German/Swiss warehouse within 1-2 business days.
          </li>
          <li>Free shipping from CHF / EUR 130.- in EU/CH.</li>
          <li>
            No additional customs duties or surprise VAT charges in EU/CH.
          </li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          You'll receive a tracking link as soon as your Travel Buddy leaves our
          warehouse.
        </p>
      </>
    ),
  },
  {
    title: "Free returns & guarantee",
    content: (
      <>
        <p>
          Try Travel Buddy Hair Dryer at home for up to 30 days. If it doesn't
          fit your routine, send it back for a full refund.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Free returns from EU/CH within 30 days of delivery.</li>
          <li>Product must be in good condition with original packaging.</li>
          <li>Backed by our 2-year manufacturer warranty on the motor.</li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Free delivery for orders above CHF / EUR 130.- in EU/CH.
        </p>
      </>
    ),
  },
];

const imageWithTextSections = [
  {
    title: "Always Look Your Best, No Matter Where You Are",
    description:
      "A lightweight, dual-voltage dryer built for carry-ons and weekend bags.",
    bullets: [
      "Fits neatly into any cabin-size suitcase or tote",
      "Dual voltage works seamlessly on international trips",
      "Quick-dry airflow for fast morning routines",
    ],
    image: heroImages[0],
  },
  {
    title: "Salon-Quality Results in the Comfort of Home",
    description: "Create salon-level blowouts without leaving your bathroom.",
    bullets: [
      "Ceramic technology helps reduce frizz and boost shine",
      "Multiple heat settings for different hair types",
      "Precision nozzle for targeted, smooth styling",
    ],
    image: heroImages[3],
  },
];

const imageWithBenefits = {
  title: "Simple Hair Care While Traveling",
  subtitle:
    "Experience stress-free styling on the go with this compact dryer that fits perfectly in your travel bag, ensuring your hair looks salon-fresh anywhere.",
  image: heroImages[1],
  items: [
    {
      emoji: "✨",
      title: "Compact",
      content: "Fits easily into your luggage, saving space.",
    },
    {
      emoji: "⚡",
      title: "Quick Dry",
      content: "Dries hair faster so you can enjoy your trip.",
    },
    {
      emoji: "🔌",
      title: "Dual Voltage",
      content: "Use worldwide without hassle, no converters needed.",
    },
    {
      emoji: "💇‍♀️",
      title: "Frizz-Free",
      content: "Keep hair smooth and shiny on any adventure.",
    },
  ],
};

const comparisonRows = [
  "Compact",
  "Super-Fast",
  "Dual Voltage",
  "Frizz-Free",
  "Affordable",
];

const percentageStats = [
  { value: 97, text: "reported smoother hair on trips" },
  { value: 96, text: "noticed faster drying time" },
  { value: 98, text: "said it fits in their carry-on" },
];

const faqs = [
  {
    q: "Is the hair dryer travel-friendly?",
    a: "Absolutely! It's compact, lightweight, and has dual voltage, making it perfect for travel.",
  },
  {
    q: "How does dual voltage work?",
    a: "Dual voltage allows the dryer to adapt to different electrical systems, so you can use it worldwide without a converter.",
  },
  {
    q: "Will it fit in my carry-on?",
    a: "Yes, its foldable design ensures it fits easily in any carry-on or travel bag.",
  },
  {
    q: "Does it reduce frizz?",
    a: "Definitely! The anion technology minimizes frizz and enhances shine with each use.",
  },
  {
    q: "Is it powerful enough for thick hair?",
    a: "Yes, with 750W of power, it dries even thick hair quickly and efficiently.",
  },
];

const reviews = [
  {
    name: "Susan B.",
    text: "I love traveling light, and this hair dryer is a game changer!!! It fits perfectly in my carry-on, and I can do my hair super quick. I prefer this one instead of my dyson because it's super easy to use.",
    avatar: "/images/example-pdp/susan-b.webp",
  },
  {
    name: "Ava",
    text: "Compact and easy to pack. 👍",
    avatar: "/images/example-pdp/ava.webp",
  },
  {
    name: "Abigail",
    text: "It's lightweight and foldable, making it ideal for my busy travel schedule. I don't have to sacrifice style for convenience anymore!",
    avatar: "/images/example-pdp/abigail.webp",
  },
  {
    name: "Mia",
    text: "Game changer! 🔥",
    avatar: "/images/example-pdp/mia.webp",
  },
  {
    name: "Zoe",
    text: "I was skeptical about a travel dryer, but this one surprised me with its power and convenience. It's a must-have for any frequent traveler.",
    avatar: "/images/example-pdp/zoe.webp",
  },
  {
    name: "Grace",
    text: "This dryer keeps my hair shiny and smooth even on long trips. It's the perfect travel companion for anyone who wants salon-quality results on the go.",
    avatar: "/images/example-pdp/grace.webp",
  },
  {
    name: "Charlotte",
    text: "This dryer is a lifesaver on the road! I travel a lot for work, and it's so convenient to have something that fits in my bag and works everywhere. It's powerful enough to handle my thick hair, leaving it shiny and frizz-free every time. Can't recommend it enough!",
  },
  {
    name: "Lily",
    text: "Fits in my carry-on, no problem!",
  },
  {
    name: "Hannah",
    text: "The dual voltage is a lifesaver! I took it on my European trip and it worked perfectly everywhere. So happy with this purchase.",
  },
  {
    name: "Alyssa",
    text: "My hair looks better than ever, whether I'm at home or on the road. It's light, efficient, and a real space saver.",
  },
  {
    name: "Lillian",
    text: "I never imagined a travel dryer could work so well. It fits right into my suitcase and leaves my hair looking salon-ready.",
  },
  {
    name: "Chloe",
    text: "So handy! 😊",
  },
  {
    name: "Sophia",
    text: "Amazing product!",
  },
  {
    name: "Olivia",
    text: "Dries hair fast, love it!",
  },
  {
    name: "Natalie",
    text: "I use this every time I travel. It's compact, reliable, and keeps my hair looking great without any fuss.",
  },
];

const recommendedProducts = [
  {
    title: "Product 1",
    price: "$19.95",
    compareAt: "$29.95",
    image: "/images/layout/placeholders/product_1.webp",
  },
  {
    title: "Product 2",
    price: "$24.95",
    image: "/images/layout/placeholders/product_2.webp",
  },
  {
    title: "Product 3",
    price: "$15.95",
    compareAt: "$25.95",
    image: "/images/layout/placeholders/product_3.webp",
  },
  {
    title: "Product 4",
    price: "$29.95",
    compareAt: "$39.95",
    image: "/images/layout/placeholders/product_4.webp",
  },
  {
    title: "Product 5",
    price: "$22.95",
    image: "/images/layout/placeholders/product_5.webp",
  },
];

const combineWithProducts = recommendedProducts.slice(0, 4);

const HeroSection = () => {
  const [quantity, setQuantity] = useState(1);
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);

  const handleDecreaseQty = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const toggleUpgrade = (title: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
    setShowUpgrades(true);
  };

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="2xl:sticky 2xl:top-24">
            <div className="flex flex-col items-center gap-6">
              <div className="relative aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl bg-muted">
                <Image
                  src={heroImages[0]}
                  alt="Travel Buddy Hair Dryer"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="grid w-full max-w-[520px] grid-cols-5 gap-3">
                {heroImages.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white"
                  >
                    <Image
                      src={src}
                      alt="Product thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col gap-4 md:gap-5">
            <div className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-balance text-2xl font-semibold md:text-3xl">
                  Travel Buddy Hair Dryer
                </h1>
                <p className="text-muted-foreground text-base">
                  Dry and style your hair on the go with this compact travel
                  essential.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  4.8 • 387 Reviews
                </p>
              </div>

              <p className="text-2xl font-semibold">$79.90</p>

              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.label}
                      className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span>{benefit.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-px w-full bg-slate-100" />

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold uppercase tracking-wide">Color</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <Button
                      key={color.name}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="inline-flex items-center rounded-2xl border px-3 py-1 text-sm text-muted-foreground hover:border-black"
                    >
                      <span
                        className={`mr-2 inline-block h-4 w-4 rounded-full ${color.swatchClass}`}
                      />
                      <span>{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold uppercase tracking-wide">Size</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-2xl border px-3 py-1 text-sm text-muted-foreground hover:border-black"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <Accordion
                type="single"
                collapsible
                value={showUpgrades ? "combine-with" : undefined}
                onValueChange={(val) => setShowUpgrades(val === "combine-with")}
              >
                <AccordionItem
                  value="combine-with"
                  className="bg-muted rounded-3xl border-b-0 py-1 transition-colors hover:bg-card data-[state=open]:bg-card"
                >
                  <AccordionTrigger className="px-4 text-left text-sm">
                    <span className="flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      <span>Combine with</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-0">
                    <p className="text-xs text-muted-foreground">
                      Get CHF/EUR 20.- when you buy combine it with one of the
                      below items.
                    </p>
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {combineWithProducts.map((item) => {
                        const isSelected = selectedUpgrades.includes(
                          item.title
                        );
                        return (
                          <label
                            key={item.title}
                            className={`relative flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-card text-left transition-colors ${
                              isSelected
                                ? "ring-1 ring-black"
                                : "hover:bg-muted"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="absolute left-3 top-3 z-10 h-4 w-4 cursor-pointer accent-black"
                              checked={isSelected}
                              onChange={() => toggleUpgrade(item.title)}
                            />
                            <div className="relative aspect-4/3 w-full">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-0.5 p-3">
                              <p className="text-sm font-medium leading-tight">
                                {item.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.price}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold">
                Hurry, only 8 items left in stock!
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-2/3 rounded-full bg-black" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="inline-flex h-14 items-center rounded-full border px-2 text-base">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-full px-0"
                  onClick={handleDecreaseQty}
                  aria-label="Decrease quantity"
                >
                  -
                </Button>
                <div className="w-8 text-center font-medium">{quantity}</div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-full px-0"
                  onClick={handleIncreaseQty}
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>

              <div className="flex-1">
                <AnimatedBorderButton
                  buttonSize="lg"
                  fullWidth
                  className="justify-center text-sm font-semibold"
                >
                  Add To Cart
                </AnimatedBorderButton>
              </div>
            </div>

            <div className="mt-2 space-y-1.5 text-sm">
              {shippingPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-2">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <p
                      className={
                        index === 0 ? "font-semibold" : "text-muted-foreground"
                      }
                    >
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 space-y-1 text-sm">
              {productInfoSections.map((section) => (
                <details
                  key={section.title}
                  className="border-b border-slate-200 py-3"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3">
                    <p className="font-semibold uppercase tracking-wide">
                      {section.title}
                    </p>
                    <span className="text-lg text-muted-foreground">+</span>
                  </summary>
                  <div className="pt-2 space-y-3 text-sm text-muted-foreground">
                    {section.content}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImageWithTextSection = ({
  section,
  reverse,
}: {
  section: (typeof imageWithTextSections)[number];
  reverse?: boolean;
}) => {
  const layout = reverse ? "md:flex-row-reverse" : "md:flex-row";
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className={`flex flex-col items-center gap-10 ${layout}`}>
          <div className="flex-1">
            <div className="mx-auto max-w-xl space-y-6">
              <h2 className="text-balance text-2xl font-semibold md:text-3xl">
                {section.title}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                {section.description}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-0.5 text-base">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-4">
                Add To Cart
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-3xl bg-muted">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImageWithBenefitsSection = () => {
  const left = imageWithBenefits.items.slice(0, 2);
  const right = imageWithBenefits.items.slice(2);
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-balance text-2xl font-semibold md:text-3xl">
            {imageWithBenefits.title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {imageWithBenefits.subtitle}
          </p>
        </div>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-8">
            {left.map((item) => (
              <div
                key={item.title}
                className="space-y-2 text-center md:text-left"
              >
                <div className="text-3xl">{item.emoji}</div>
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-full bg-muted">
              <Image
                src={imageWithBenefits.image}
                alt={imageWithBenefits.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="space-y-8">
            {right.map((item) => (
              <div
                key={item.title}
                className="space-y-2 text-center md:text-left"
              >
                <div className="text-3xl">{item.emoji}</div>
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  return (
    <section className="bg-muted/40 py-10 md:py-16">
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-balance text-2xl font-semibold md:text-3xl">
            What Makes Travel Buddy Hair Dryer Special
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Unlike others, Travel Buddy Hair Dryer offers compact design, dual
            voltage, and fast drying for travelers.
          </p>
          <Button size="lg">Add To Cart</Button>
        </div>
        <div className="mx-auto w-full max-w-md space-y-4">
          <div className="grid grid-cols-4 text-sm font-semibold">
            <div className="col-span-2" />
            <div className="text-center">Travel Buddy Hair Dryer</div>
            <div className="text-center">Others</div>
          </div>
          <div className="overflow-hidden rounded-3xl bg-white">
            <div className="grid grid-cols-4 text-sm">
              <div className="col-span-2 bg-[#606c75] text-white">
                {comparisonRows.map((row) => (
                  <div
                    key={row}
                    className="flex h-14 items-center justify-center border-b border-white/15"
                  >
                    {row}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center">
                {comparisonRows.map((row) => (
                  <div
                    key={row}
                    className="flex h-14 items-center justify-center"
                  >
                    <span className="text-xl text-green-500">✔</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center">
                {comparisonRows.map((row) => (
                  <div
                    key={row}
                    className="flex h-14 items-center justify-center"
                  >
                    <span className="text-xl">✕</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PercentageSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-full bg-muted">
            <Image
              src={heroImages[2]}
              alt="Transform your travel hair routine"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-balance text-2xl font-semibold md:text-3xl">
            Transform Your Travel Hair Routine
          </h2>
          <div className="space-y-5">
            {percentageStats.map((stat) => {
              const angle = (stat.value / 100) * 360;

              return (
                <div
                  key={stat.text}
                  className="flex items-center gap-4 border-b border-gray-300 pb-5 last:border-0 last:pb-0"
                >
                  <div className="relative h-20 w-20">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(var(--color-primary) ${angle}deg, var(--color-muted) ${angle}deg 360deg)`,
                      }}
                    />
                    <div className="absolute inset-2 flex items-center justify-center rounded-full bg-card text-lg font-semibold">
                      <span>{stat.value}%</span>
                    </div>
                  </div>
                  <p className="text-base">{stat.text}</p>
                </div>
              );
            })}
          </div>
          <Button size="lg">Add To Cart</Button>
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  return (
    <section className="py-32">
      <div className="container">
        <h2 className="mb-8 text-balance text-2xl font-semibold md:text-3xl">
          FAQs
        </h2>
        <Accordion type="multiple">
          {faqs.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`faq-${index}`}
              className="bg-muted mb-2 rounded-3xl border-b-0 px-5 py-2 md:mb-4 transition-colors hover:bg-card data-[state=open]:bg-card"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const GuaranteeSection = () => {
  const items = [
    "Try Travel Buddy at home on your next trips, completely risk-free.",
    "Free returns from EU/CH within 30 days if it is not a match.",
    "2-year manufacturer warranty on the motor.",
    "No extra customs duties or surprise VAT charges in EU/CH.",
  ];

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="bg-card flex flex-col items-start justify-between gap-8 rounded-3xl px-6 py-10 md:flex-row md:px-10">
          <div className="md:w-1/2 space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              Free returns &amp; guarantee
            </p>
            <h2 className="text-balance text-2xl font-semibold md:text-3xl">
              Risk-free travel hair care for 30 days.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Take Travel Buddy Hair Dryer on your next trip and style as usual.
              If you do not love it, send it back within 30 days for a full
              refund.
            </p>
            <AnimatedBorderButton
              buttonSize="lg"
              fullWidth={false}
              className="mt-4 gap-2 text-sm font-semibold"
            >
              Add To Cart
            </AnimatedBorderButton>
          </div>
          <div className="md:w-2/5">
            <ul className="flex flex-col space-y-2 text-sm md:text-base text-muted-foreground">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            What Customers Are Saying About This Must-Have
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Real Users Share Their Experiences
          </p>
        </div>
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="mb-6 break-inside-avoid flex flex-col gap-3 rounded-3xl bg-card p-5 text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-semibold">
                  {review.avatar ? (
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{review.name[0]}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <VerifiedBuyerIcon className="h-3.5 w-3.5 text-[#2A92F1]" />
                    <span>Verified buyer</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecommendedSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container space-y-8">
        <h2 className="text-center text-2xl font-semibold md:text-3xl">
          Recommended Products
        </h2>
        <div className="grid gap-6 md:grid-cols-5">
          {recommendedProducts.map((product) => (
            <div key={product.title} className="space-y-2 text-sm">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-muted">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="font-medium">{product.title}</p>
                <div className="flex items-baseline gap-2">
                  <span>{product.price}</span>
                  {product.compareAt && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.compareAt}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExamplePdp = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <ImageWithTextSection section={imageWithTextSections[0]} />
      <ImageWithBenefitsSection />
      <ComparisonSection />
      <PercentageSection />
      <ImageWithTextSection section={imageWithTextSections[1]} />
      <FaqSection />
      <GuaranteeSection />
      <ReviewsSection />
      <RecommendedSection />
    </div>
  );
};

export { ExamplePdp };
