"use client";

import { Fragment, useState } from "react";
import Link from "next/link";

import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  Book,
  Camera,
  ChevronRight,
  DollarSign,
  FileImage,
  Globe,
  Globe2,
  Image as ImageIcon,
  Lightbulb,
  Menu,
  Newspaper,
  Package,
  Palette,
  Phone,
  Play,
  PlayCircle,
  Pyramid,
  Rocket,
  Search,
  Sparkles,
  Users,
  Wand2,
  X,
  Zap,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import NavbarLogo from "@/components/ui/navbar-logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// AI Media Studio sections
const aiMediaStudioSections = [
  {
    id: "image",
    title: "Image",
    description: "AI-powered product image generation and enhancement.",
    href: "#ai-media-studio",
    icon: Camera,
    features: [
      { title: "AI Image Generator", href: "#ai-media-studio" },
      {
        title: "Image Optimisation for AI & Conversion",
        href: "#ai-media-studio",
      },
      { title: "Image Editor & Upscaler", href: "#ai-media-studio" },
    ],
    imageTypes: [
      { title: "Product detailed shots", href: "#ai-media-studio" },
      { title: "Packshots", href: "#ai-media-studio" },
      { title: "Lifestyle images", href: "#ai-media-studio" },
      { title: "Product in use images", href: "#ai-media-studio" },
      { title: "Painpoint images", href: "#ai-media-studio" },
      { title: "Benefits images", href: "#ai-media-studio" },
    ],
  },
  {
    id: "video",
    title: "Video",
    description: "Bring products to life with automated video creation.",
    href: "#ai-media-studio",
    icon: Play,
    features: [
      { title: "AI Video Generator", href: "#ai-media-studio" },
      {
        title: "Video Optimisation for AI & Conversion",
        href: "#ai-media-studio",
      },
    ],
    videoTypes: [
      { title: "Product 360° Spins", href: "#ai-media-studio" },
      { title: "Product Demonstrations", href: "#ai-media-studio" },
      { title: "Lifestyle Videos", href: "#ai-media-studio" },
      { title: "Product in Use Videos", href: "#ai-media-studio" },
      { title: "AR Previews", href: "#ai-media-studio" },
      { title: "Unboxing Videos", href: "#ai-media-studio" },
    ],
  },
  {
    id: "ai-search-content",
    title: "AI Search Content",
    description:
      "Ensure your products are found in ChatGPT, Perplexity, and other AI search engines.",
    href: "#ai-media-studio",
    icon: Search,
    contentTypes: [
      { title: "Conversion optimised title", href: "#ai-media-studio" },
      { title: "Description", href: "#ai-media-studio" },
      { title: "Product benefits", href: "#ai-media-studio" },
      { title: "Why this product", href: "#ai-media-studio" },
      { title: "Product features", href: "#ai-media-studio" },
      { title: "Product use cases", href: "#ai-media-studio" },
      { title: "For who is this product", href: "#ai-media-studio" },
      { title: "FAQ based on actual prompts", href: "#ai-media-studio" },
      { title: "LLM optimised", href: "#ai-media-studio" },
    ],
  },
];

// Fieson PDP AI features
const fiesonPdpFeatures = [
  {
    id: "analysis",
    title: "Content Analysis",
    description: "Comprehensive scoring across 6 critical dimensions.",
    href: "#fieson-pdp-ai",
    icon: Lightbulb,
  },
  {
    id: "optimization",
    title: "AI Optimization",
    description: "Automated optimization for AI search visibility.",
    href: "#fieson-pdp-ai",
    icon: Sparkles,
  },
  {
    id: "generation",
    title: "Media Generation",
    description: "Generate all images, videos and structured content.",
    href: "#fieson-pdp-ai",
    icon: Wand2,
  },
];

// Archive - AI Solutions data (moved from main nav)
const aiSolutions = [
  {
    id: "solution-1",
    title: "Product Photography",
    description: "AI-powered product image generation and enhancement.",
    href: "#",
    subpages: [
      {
        id: "subpage-1",
        title: "Background Removal",
        href: "#",
        icon: Wand2,
      },
      {
        id: "subpage-2",
        title: "Scene Generation",
        href: "#",
        icon: Palette,
      },
      {
        id: "subpage-3",
        title: "Image Enhancement",
        href: "#",
        icon: Sparkles,
      },
      {
        id: "subpage-4",
        title: "Batch Processing",
        href: "#",
        icon: Zap,
      },
      {
        id: "subpage-5",
        title: "Style Transfer",
        href: "#",
        icon: ImageIcon,
      },
    ],
  },
  {
    id: "solution-2",
    title: "SEO Optimization",
    description: "AI Search optimized content for better visibility.",
    href: "#",
    subpages: [
      {
        id: "subpage-6",
        title: "Image SEO",
        href: "#",
        icon: Search,
      },
      {
        id: "subpage-7",
        title: "Alt Text Generation",
        href: "#",
        icon: FileImage,
      },
      {
        id: "subpage-8",
        title: "Metadata Optimization",
        href: "#",
        icon: Package,
      },
    ],
  },
  {
    id: "solution-3",
    title: "Content Creation",
    description: "Automated visual content for product pages.",
    href: "#",
    subpages: [
      {
        id: "subpage-9",
        title: "Lifestyle Images",
        href: "#",
        icon: Camera,
      },
      {
        id: "subpage-10",
        title: "Product Variants",
        href: "#",
        icon: Palette,
      },
      {
        id: "subpage-11",
        title: "360° Views",
        href: "#",
        icon: Globe,
      },
      {
        id: "subpage-12",
        title: "Video Content",
        href: "#",
        icon: PlayCircle,
      },
      {
        id: "subpage-13",
        title: "AR Previews",
        href: "#",
        icon: Globe2,
      },
    ],
  },
  {
    id: "solution-4",
    title: "Enterprise Scale",
    description: "Scale your visual content across your organization.",
    href: "#",
    subpages: [
      {
        id: "subpage-14",
        title: "Advanced Analytics",
        href: "#",
        icon: Lightbulb,
      },
      {
        id: "subpage-15",
        title: "Brand Controls",
        href: "#",
        icon: Package,
      },
      {
        id: "subpage-16",
        title: "Custom Workflows",
        href: "#",
        icon: ArrowRightLeft,
      },
    ],
  },
];

const solutionTechnologies = [
  {
    id: "technology-1",
    title: "AI Image Engine",
    href: "#",
    icon: Sparkles,
  },
  {
    id: "technology-2",
    title: "Cloud Processing",
    href: "#",
    icon: Zap,
  },
  {
    id: "technology-3",
    title: "API Access",
    href: "#",
    icon: AppWindow,
  },
];

// Product categories
const productCategories = [
  {
    title: "Core Products",
    products: [
      {
        id: "product-1",
        title: "AI Studio Pro",
        description: "Professional AI media creation suite.",
        href: "#",
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      },
      {
        id: "product-2",
        title: "PDP Optimizer",
        description: "Optimize product detail pages for AI search.",
        href: "#",
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      },
      {
        id: "product-3",
        title: "Visual Generator",
        description: "Generate product visuals at scale.",
        href: "#",
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      },
    ],
  },
  {
    title: "Enterprise Features",
    products: [
      {
        id: "product-4",
        title: "Team Collaboration",
        description: "Collaborate on visual content with your team.",
        href: "#",
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      },
      {
        id: "product-5",
        title: "Brand Management",
        description: "Maintain brand consistency across all visuals.",
        href: "#",
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
      },
    ],
  },
];

// Company features
const companyFeatures = [
  {
    title: "About Fieson",
    features: [
      {
        id: "feature-1",
        title: "Our Mission",
        description: "Revolutionizing e-commerce with AI-powered visuals.",
        href: "/archive/about",
        icon: Rocket,
      },
      {
        id: "feature-2",
        title: "Technology",
        description: "Cutting-edge AI technology for product imagery.",
        href: "#",
        icon: Sparkles,
      },
      {
        id: "feature-3",
        title: "Global Reach",
        description: "Serving e-commerce brands worldwide.",
        href: "#",
        icon: Globe2,
      },
    ],
  },
  {
    title: "Business",
    features: [
      {
        id: "feature-4",
        title: "Pricing",
        description: "Flexible plans for businesses of all sizes.",
        href: "/archive/pricing",
        icon: Package,
      },
      {
        id: "feature-5",
        title: "Case Studies",
        description: "See how brands succeed with Fieson.",
        href: "#",
        icon: Lightbulb,
      },
      {
        id: "feature-6",
        title: "Contact Sales",
        description: "Get in touch with our sales team.",
        href: "/contact",
        icon: Users,
      },
    ],
  },
];

// Resources
const resources = [
  {
    id: "resource-1",
    title: "Blog",
    description: "Latest insights on AI and e-commerce.",
    href: "#",
    icon: Newspaper,
  },
  {
    id: "resource-2",
    title: "Video Tutorials",
    description: "Learn how to use Fieson effectively.",
    href: "#",
    icon: PlayCircle,
  },
  {
    id: "resource-3",
    title: "Documentation",
    description: "Comprehensive guides and API docs.",
    href: "#",
    icon: Book,
  },
  {
    id: "resource-4",
    title: "Success Stories",
    description: "How brands achieve results with Fieson.",
    href: "#",
    icon: Lightbulb,
  },
];

const topicGroups = [
  {
    title: "Learning & Support",
    topics: [
      {
        id: "topic-1",
        title: "Getting Started",
        href: "#",
        icon: Rocket,
      },
      {
        id: "topic-2",
        title: "Best Practices",
        href: "#",
        icon: Pyramid,
      },
      {
        id: "topic-3",
        title: "Integrations",
        href: "#",
        icon: ArrowRightLeft,
      },
      {
        id: "topic-4",
        title: "API Documentation",
        href: "#",
        icon: AppWindow,
      },
      {
        id: "topic-5",
        title: "Community Forum",
        href: "#",
        icon: Play,
      },
    ],
  },
];

// AI Media Studio Menu Component
const AiMediaStudioMenu = () => (
  <div className="grid gap-8 md:grid-cols-3">
    {aiMediaStudioSections.map((section) => (
      <div key={section.id} className="border-border rounded-md border p-5">
        <div className="border-border border-b pb-4">
          <a href={section.href} className="group flex flex-col text-left">
            <div className="mb-3 flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg">
                <section.icon className="size-5" />
              </div>
              <div className="flex items-center">
                <strong className="text-sm font-medium">{section.title}</strong>
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {section.description}
            </p>
          </a>
        </div>
        <menu className="mt-6 grid gap-y-4">
          {section.features && (
            <>
              {section.features.map((feature, idx) => (
                <NavigationMenuLink
                  key={idx}
                  href={feature.href}
                  className="text-foreground/85 hover:text-foreground group flex flex-row items-center justify-between text-left"
                >
                  <div className="flex-1 text-sm font-medium">
                    {feature.title}
                  </div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
              {section.imageTypes && (
                <div className="border-border mt-4 border-t pt-4">
                  <p className="text-muted-foreground mb-3 text-xs font-medium uppercase tracking-wider">
                    Image Types
                  </p>
                  {section.imageTypes.map((type, idx) => (
                    <NavigationMenuLink
                      key={idx}
                      href={type.href}
                      className="text-foreground/70 hover:text-foreground group mb-2 flex flex-row items-center justify-between text-left text-xs"
                    >
                      <div className="flex-1">{type.title}</div>
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1 lg:hidden" />
                    </NavigationMenuLink>
                  ))}
                </div>
              )}
            </>
          )}
          {section.videoTypes && (
            <>
              {section.videoTypes.map((type, idx) => (
                <NavigationMenuLink
                  key={idx}
                  href={type.href}
                  className="text-foreground/85 hover:text-foreground group flex flex-row items-center justify-between text-left"
                >
                  <div className="flex-1 text-sm font-medium">{type.title}</div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
            </>
          )}
          {section.contentTypes && (
            <>
              {section.contentTypes.map((type, idx) => (
                <NavigationMenuLink
                  key={idx}
                  href={type.href}
                  className="text-foreground/85 hover:text-foreground group flex flex-row items-center justify-between text-left"
                >
                  <div className="flex-1 text-sm font-medium">{type.title}</div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
            </>
          )}
        </menu>
      </div>
    ))}
  </div>
);

// Fieson PDP AI Menu Component
const FiesonPdpAiMenu = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {fiesonPdpFeatures.map((feature) => (
      <NavigationMenuLink
        key={feature.id}
        href={feature.href}
        className="border-border bg-accent lg:bg-background group flex flex-col space-y-4 rounded-md border p-6 text-left transition-all hover:shadow-md"
      >
        <div className="bg-primary text-primary-foreground flex aspect-square w-12 shrink-0 items-center justify-center rounded-lg">
          <feature.icon className="size-6" />
        </div>
        <div>
          <h3 className="text-foreground mb-2 text-base font-semibold">
            {feature.title}
          </h3>
          <p className="text-muted-foreground text-sm">{feature.description}</p>
        </div>
        <div className="flex items-center text-xs font-medium">
          Learn more
          <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </NavigationMenuLink>
    ))}
  </div>
);

// Archive - Solutions Menu Component (moved from main nav)
const SolutionsMenu = () => (
  <div className="grid gap-8 sm:grid-cols-2">
    <a
      href="#"
      className="bg-primary text-primary-foreground group relative flex h-full flex-row overflow-hidden rounded-lg px-0 pt-8 lg:rounded-xl lg:px-6"
    >
      <div className="relative flex w-full flex-col space-y-12 text-left md:space-y-8 lg:w-full lg:flex-row lg:justify-between lg:space-x-6 lg:space-y-0 xl:space-x-8">
        <div className="relative flex flex-col px-6 lg:mb-6 lg:px-0">
          <span className="mb-6 text-xs font-medium uppercase tracking-wider md:mb-8">
            AI-Powered Solutions
          </span>
          <div className="mt-auto flex items-center space-x-1 text-xs">
            Explore Our Platform
            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
          </div>
          <p className="text-primary-foreground/85 mt-2 text-xs">
            Transform your product visuals with cutting-edge AI technology.
          </p>
        </div>
        <div className="aspect-2/1 relative overflow-clip rounded-t pl-6 lg:max-w-64 lg:pl-0 xl:max-w-96">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="Fieson AI Solutions"
            className="aspect-2/1 h-full w-full translate-y-px object-cover object-center"
          />
        </div>
      </div>
    </a>

    <div className="order-last mt-3 sm:order-none sm:mt-0 sm:py-2 md:p-6">
      <div className="mb-4 text-left leading-none md:col-span-2 lg:col-span-4 lg:mb-6">
        <strong className="text-muted-foreground text-left text-xs font-medium uppercase tracking-wider">
          Technology Platform
        </strong>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {solutionTechnologies.map((technology) => (
          <NavigationMenuLink
            key={technology.id}
            href={technology.href}
            className="group flex flex-row items-center gap-4"
          >
            <technology.icon className="size-4" />
            <div className="flex-1 text-sm font-medium">{technology.title}</div>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
          </NavigationMenuLink>
        ))}
      </div>
    </div>
    <div className="col-span-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {aiSolutions.map((solution) => (
        <div key={solution.id} className="border-border rounded-md border p-5">
          <div className="border-border border-b pb-4">
            <a href={solution.href} className="group flex flex-col text-left">
              <div className="flex items-center">
                <strong className="text-sm font-medium">
                  {solution.title}
                </strong>
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                {solution.description}
              </p>
            </a>
          </div>
          <menu className="mt-6 grid gap-y-4">
            {solution.subpages.map((subpage) => (
              <NavigationMenuLink
                key={subpage.id}
                href={subpage.href}
                className="text-foreground/85 hover:text-foreground group flex flex-row items-center space-x-4 text-left lg:space-x-4 lg:border-0"
              >
                <subpage.icon className="size-4" />
                <div className="flex-1 text-sm font-medium">
                  {subpage.title}
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

// Products Menu Component
const ProductsMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <a
        href="/archive/pricing"
        className="text-primary-foreground group relative flex h-full flex-row overflow-hidden rounded-lg px-0 lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col text-left">
          <div className="aspect-2/1 relative flex max-h-[11rem] w-full flex-1 justify-center">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="Enterprise Solutions"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="bg-primary relative z-20 flex flex-col rounded-b-xl p-6">
            <div className="flex items-center space-x-1 text-xs">
              Enterprise Solutions
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-primary-foreground/70 mt-2 text-xs">
              Scale your visual content with enterprise-grade features.
            </p>
          </div>
        </div>
      </a>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {productCategories.map((category) => (
        <div key={category.title} className="grid gap-y-2 lg:gap-y-6">
          <div className="border-border text-left lg:border-b lg:pb-3">
            <strong className="text-muted-foreground text-left text-xs font-medium uppercase tracking-wider">
              {category.title}
            </strong>
          </div>
          <menu className="grid md:grid-cols-3 md:gap-x-5 lg:gap-y-7">
            {category.products.map((product) => (
              <NavigationMenuLink
                key={product.id}
                href={product.href}
                className="border-border group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2"
              >
                <div className="relative flex aspect-square w-6 shrink-0 items-center justify-center overflow-clip rounded md:size-9 md:p-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-foreground/85 group-hover:text-foreground text-sm font-medium">
                    {product.title}
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground mt-1 text-xs">
                    {product.description}
                  </p>
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

// Regions data for Company menu
const regions = [
  {
    title: "Asia-Pacific",
    locations: [
      { title: "China", href: "#", icon: "🇨🇳" },
      { title: "India", href: "#", icon: "🇮🇳" },
      { title: "Japan", href: "#", icon: "🇯🇵" },
      { title: "Thailand", href: "#", icon: "🇹🇭" },
    ],
  },
  {
    title: "Europe",
    locations: [
      { title: "Italy", href: "#", icon: "🇮🇹" },
      { title: "Germany", href: "#", icon: "🇩🇪" },
      { title: "Poland", href: "#", icon: "🇵🇱" },
      { title: "United Kingdom", href: "#", icon: "🇬🇧" },
    ],
  },
  {
    title: "Americas",
    locations: [
      { title: "Brazil", href: "#", icon: "🇧🇷" },
      { title: "Canada", href: "#", icon: "🇨🇦" },
      { title: "Mexico", href: "#", icon: "🇲🇽" },
      { title: "United States", href: "#", icon: "🇺🇸" },
    ],
  },
  {
    title: "Middle East/Africa",
    locations: [
      { title: "Egypt", href: "#", icon: "🇸🇦" },
      { title: "Nigeria", href: "#", icon: "🇳🇬" },
      { title: "Türkiye", href: "#", icon: "🇹🇷" },
      { title: "United Arab Emirates", href: "#", icon: "🇦🇪" },
    ],
  },
];

// Company Menu Component
const CompanyMenu = () => (
  <div>
    <div className="space-y-6 lg:flex lg:space-x-8 lg:space-y-0">
      <div className="w-full shrink-0 lg:max-w-[18rem]">
        <a
          href="#"
          className="text-primary-foreground group relative flex h-full flex-row overflow-hidden rounded-lg p-0 lg:rounded-xl"
        >
          <div className="relative z-10 flex w-full flex-col-reverse text-left lg:flex-col">
            <div className="aspect-4/3 relative flex max-h-[18rem] w-full flex-1 justify-center">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="Enterprise Solutions"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="bg-primary relative z-20 flex flex-col rounded-b-xl p-6">
              <div className="flex items-center space-x-1 text-xs">
                Enterprise Solutions
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-primary-foreground/85 mt-2 text-xs">
                Scale your business with enterprise-grade features and support.
              </p>
            </div>
          </div>
        </a>
      </div>
      <div className="grid w-full gap-y-12 lg:gap-y-6">
        {companyFeatures.map((category) => (
          <div key={category.title} className="grid gap-y-2 lg:gap-y-6">
            <div className="border-border text-left lg:border-b lg:pb-3">
              <strong className="text-muted-foreground text-left text-xs font-medium uppercase tracking-wider">
                {category.title}
              </strong>
            </div>
            <menu className="grid md:grid-cols-3 md:gap-x-6 lg:gap-y-6">
              {category.features.map((feature) => (
                <NavigationMenuLink
                  key={feature.id}
                  href={feature.href}
                  className="border-border group flex flex-row items-center space-x-4 border-b py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                >
                  <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                    <feature.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground/85 group-hover:text-foreground text-sm font-medium">
                      {feature.title}
                    </div>
                    <p className="text-muted-foreground group-hover:text-foreground mt-1 text-xs">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-8">
      <div className="border-border mb-6 pb-1 text-left lg:border-b">
        <strong className="text-muted-foreground text-left text-xs font-medium uppercase tracking-wider">
          Popular Locations
        </strong>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {regions.map((region) => (
          <div
            key={region.title}
            className="border-border space-y-6 rounded-md border p-6 lg:border-0 lg:p-0"
          >
            <div className="text-muted-foreground text-left text-xs">
              {region.title}
            </div>
            <menu className="border-border grid gap-y-3 border-t pt-6 lg:border-0 lg:pt-0">
              {region.locations.map((location) => (
                <NavigationMenuLink
                  key={location.title}
                  href={location.href}
                  className="text-foreground/85 hover:text-foreground group flex flex-row items-center space-x-4 text-left lg:space-x-4 lg:border-0 lg:py-0"
                >
                  <div className="flex size-4 items-center justify-center">
                    {location.icon}
                  </div>
                  <div className="flex-1 text-sm font-medium">
                    {location.title}
                  </div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Resources Menu Component
const ResourcesMenu = () => (
  <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4 lg:gap-6">
    <div className="col-span-1">
      <a
        href="#"
        className="bg-primary text-primary-foreground group relative flex h-full flex-row overflow-hidden rounded-lg p-0 lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col-reverse text-left">
          <div className="relative z-20 flex flex-col px-6 pb-[14rem] pt-6 md:pb-6 md:pt-40">
            <div className="mt-auto flex items-center space-x-1 text-xs">
              Resource Center
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-2 text-xs">
              Access guides, tutorials, and best practices to maximize your
              success.
            </p>
          </div>
          <div className="absolute inset-0">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
              alt="Resource Center"
              className="h-full w-full object-cover object-center invert"
            />
          </div>
          <div className="absolute inset-x-0 top-0 z-10 h-[60%] bg-[linear-gradient(hsl(var(--color-primary))_50%,transparent)] md:bottom-[-10%] md:top-auto md:h-[50%] md:bg-[linear-gradient(transparent,hsl(var(--color-primary))_50%)]"></div>
        </div>
      </a>
    </div>
    <div className="lg:col-span-2 lg:flex lg:flex-col">
      <div>
        <div className="border-border mb-4 pb-3 text-left md:mb-6 lg:border-b">
          <strong className="text-muted-foreground text-left text-xs font-medium uppercase tracking-wider">
            Featured Resources
          </strong>
        </div>
      </div>
      <menu className="grid gap-y-4 lg:h-full lg:grid-cols-2 lg:gap-6">
        {resources.map((resource) => (
          <NavigationMenuLink
            key={resource.id}
            href={resource.href}
            className="border-border bg-accent lg:bg-background group flex flex-row items-center space-x-4 rounded-md px-6 py-5 text-left md:space-x-5 lg:border lg:p-5"
          >
            <resource.icon className="size-6 sm:size-7" />
            <div className="ml-4 flex-1">
              <div className="text-foreground/85 group-hover:text-foreground text-sm font-medium">
                {resource.title}
              </div>
              <p className="text-muted-foreground group-hover:text-foreground mt-1 text-xs">
                {resource.description}
              </p>
            </div>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
          </NavigationMenuLink>
        ))}
      </menu>
    </div>
    <div className="col-span-1 md:col-span-2 lg:col-span-1">
      {topicGroups.map((group) => (
        <Fragment key={group.title}>
          <div className="border-border mb-4 pb-3 text-left md:col-span-2 md:mb-7 lg:border-b">
            <strong className="text-muted-foreground text-left text-xs font-medium uppercase tracking-wider">
              Learning & Support
            </strong>
          </div>
          <menu className="mb-7 grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-1 lg:gap-x-0">
            {group.topics.map((topic) => (
              <NavigationMenuLink
                key={topic.id}
                href={topic.href}
                className="border-border group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-8 lg:space-x-4 lg:border-0 lg:py-0"
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                  <topic.icon className="size-5" />
                </div>
                <div className="text-foreground/85 group-hover:text-foreground flex-1 text-xs font-medium md:text-sm">
                  {topic.title}
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </Fragment>
      ))}
    </div>
  </div>
);

// Archive Menu Component - combines all old menu items
const ArchiveMenu = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-muted-foreground mb-4 text-xs font-medium uppercase tracking-wider">
        Solutions Archive
      </h3>
      <SolutionsMenu />
    </div>
    <div className="border-t pt-8">
      <h3 className="text-muted-foreground mb-4 text-xs font-medium uppercase tracking-wider">
        Products Archive
      </h3>
      <ProductsMenu />
    </div>
    <div className="border-t pt-8">
      <h3 className="text-muted-foreground mb-4 text-xs font-medium uppercase tracking-wider">
        Company Archive
      </h3>
      <CompanyMenu />
    </div>
    <div className="border-t pt-8">
      <h3 className="text-muted-foreground mb-4 text-xs font-medium uppercase tracking-wider">
        Resources Archive
      </h3>
      <ResourcesMenu />
    </div>
  </div>
);

const navigationMenuItems = [
  {
    key: "ai-media-studio",
    label: "AI Media Studio",
    component: AiMediaStudioMenu,
  },
  {
    key: "fieson-pdp-ai",
    label: "Fieson PDP AI",
    component: FiesonPdpAiMenu,
  },
  {
    key: "archive",
    label: "Archive",
    component: ArchiveMenu,
  },
] as const;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center lg:w-[200px]">
            <Link href="/" className="flex items-center space-x-2">
              <NavbarLogo />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-8">
            <NavigationMenu className="[&>div:last-child]:left-auto">
              <NavigationMenuList className="hidden gap-0 lg:flex">
                {navigationMenuItems.map((item) => (
                  <NavigationMenuItem key={item.key}>
                    <NavigationMenuTrigger className="text-xs xl:text-sm">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[calc(100vw-4rem)] p-12 2xl:min-w-[calc(1400px-4rem)] ml-8">
                      <item.component />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Pricing Link */}
            <Link
              href="/pricing"
              className="text-sm transition-colors hover:text-primary"
            >
              Pricing
            </Link>

            {/* Demo Link */}
            <Link
              href="/demo"
              className="text-sm transition-colors hover:text-primary"
            >
              Demo
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end gap-2 lg:w-[200px]">
            <ThemeToggle />

            <Link
              href="/archive/pricing"
              className="hidden rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              aria-label="Main Menu"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background lg:hidden">
          <div className="container mx-auto h-full overflow-y-auto px-4 py-6">
            {activeSubmenu ? (
              <div>
                <button
                  onClick={() => setActiveSubmenu(null)}
                  className="mb-6 flex items-center gap-2 text-sm font-medium"
                >
                  <ArrowLeft className="size-4" />
                  Go back
                </button>
                {navigationMenuItems
                  .find((item) => item.key === activeSubmenu)
                  ?.component()}
              </div>
            ) : (
              <div className="space-y-4">
                {navigationMenuItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSubmenu(item.key)}
                    className="flex w-full items-center justify-between rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="size-5" />
                  </button>
                ))}

                <Link
                  href="/pricing"
                  className="flex w-full items-center justify-between rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-medium">Pricing</span>
                </Link>

                <Link
                  href="/demo"
                  className="flex w-full items-center justify-between rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-medium">Demo</span>
                </Link>

                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/pricing">Get Started</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
