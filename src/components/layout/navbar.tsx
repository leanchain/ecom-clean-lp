"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronRight,
  FileText,
  HelpCircle,
  Layers,
  Mail,
  Menu,
  Search,
  TestTube,
  TrendingUp,
  Users,
  Wand2,
  X,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavbarLogo from "@/components/ui/navbar-logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Product menu items - mirrors the 3-layer architecture
const productItems = [
  {
    id: "audit",
    title: "PDP Audit",
    description: "Analyze your product pages across 8 dimensions. Free.",
    href: "https://app.beseam.com/analyze",
    icon: Search,
    badge: {
      label: "Free",
      className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
  },
  {
    id: "optimize",
    title: "AI Optimization",
    description: "Generate images, videos, copy, and structured data.",
    href: "/#how-it-works",
    icon: Wand2,
    badge: {
      label: "Soon",
      className: "bg-primary/10 text-primary",
    },
  },
  {
    id: "conversion",
    title: "Conversion Suite",
    description: "Size recommendations, styleguides, tryouts, personalization.",
    href: "/#conversion-suite",
    icon: TrendingUp,
    badge: {
      label: "Add-on",
      className: "bg-secondary/10 text-secondary",
    },
  },
  {
    id: "testing",
    title: "Live testing",
    description: "Live testing on Google, ChatGpt, Perplexity etc",
    href: "/#how-it-works",
    icon: TestTube,
    badge: {
      label: "Soon",
      className: "bg-primary/10 text-primary",
    },
  },
];

const productLinks = [
  {
    id: "how-it-works",
    title: "How it Works",
    description: "Our 3-step process: Audit → Optimize → Convert",
    href: "/#how-it-works",
    icon: Layers,
  },
  {
    id: "results",
    title: "See Results",
    description: "Before/after examples and case studies",
    href: "/#gallery",
    icon: BarChart3,
  },
];

// Resources menu items
const resourceItems = [
  {
    id: "blog",
    title: "Blog",
    description: "Insights on AI search and PDP optimization",
    href: "/blog",
    icon: BookOpen,
  },
  {
    id: "docs",
    title: "Documentation",
    description: "Guides and API reference",
    href: "#",
    icon: FileText,
    badge: {
      label: "Soon",
      className: "bg-primary/10 text-primary",
    },
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Common questions answered",
    href: "/#faq",
    icon: HelpCircle,
  },
];

const resourceLinks = [
  {
    id: "contact",
    title: "Contact Sales",
    description: "Talk to our team about enterprise needs",
    href: "/demo",
    icon: Mail,
  },
  {
    id: "partners",
    title: "Partners",
    description: "Agency and technology partnerships",
    href: "/demo",
    icon: Users,
  },
];

// Reusable Menu Content Component
interface MenuItem {
  title: string;
  description?: string;
  href: string;
  icon: React.ElementType;
  badge?: {
    label: string;
    className: string;
  };
}

interface MenuContentProps {
  mainItems: MenuItem[];
  footerItems?: MenuItem[];
}

const MenuContent = ({ mainItems, footerItems }: MenuContentProps) => (
  <div className="w-max bg-background p-3">
    <div className="grid grid-cols-2 gap-2 mb-2">
      {mainItems.map((item, idx) => (
        <NavigationMenuLink
          key={idx}
          href={item.href}
          className="group flex w-[310px] items-start gap-4 rounded-xl p-3.5 transition-all hover:bg-accent bg-muted/40 dark:bg-muted/10 border border-border/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background border border-border/50 text-primary group-hover:bg-primary transition-all duration-200">
            <item.icon className="h-5 w-5 group-hover:text-white" />
          </div>

          <div className="flex-1 pt-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-foreground">
                {item.title}
              </span>

              {item.badge && (
                <span
                  className={`rounded-lg px-1.5 py-0.5 text-[8px] font-bold ${item.badge.className}`}
                >
                  {item.badge.label}
                </span>
              )}
            </div>

            {item.description && (
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        </NavigationMenuLink>
      ))}
    </div>

    {footerItems && footerItems.length > 0 && (
      <div className="grid grid-cols-2 gap-2 p-2 mt-2 border-t border-border/40 bg-muted/20 dark:bg-muted/5 rounded-b-xl">
        {footerItems.map((item, idx) => (
          <NavigationMenuLink
            key={idx}
            href={item.href}
            className="group flex w-[250px] items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-accent border border-transparent hover:border-border/50"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border/50 group-hover:bg-primary group-hover:border-primary transition-all">
              <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-white" />
            </div>

            <span className="text-[11px] font-bold text-foreground/90 group-hover:text-foreground">
              {item.title}
            </span>
          </NavigationMenuLink>
        ))}
      </div>
    )}
  </div>
);

const ProductMenu = () => (
  <MenuContent mainItems={productItems} footerItems={productLinks} />
);

const ResourcesMenu = () => (
  <MenuContent mainItems={resourceItems} footerItems={resourceLinks} />
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="relative z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center lg:w-[300px]">
            <Link href="/" className="flex items-center space-x-2">
              <NavbarLogo className="text-primary" />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-0">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {/* Product dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent">
                    Product
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2">
                    <ProductMenu />
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing - direct link styled like nav item */}
                <NavigationMenuItem>
                  <Link
                    href="https://app.beseam.com/pricing"
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground no-underline")}
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>

                {/* Resources dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2">
                    <ResourcesMenu />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end gap-3 lg:w-[300px]">
            <ThemeToggle />

            <Button
              variant="outline"
              className="hidden md:inline-flex rounded-lg px-6 transition-all font-bold"
              asChild
            >
              <Link href="https://app.beseam.com/login">Log In</Link>
            </Button>

            <Link
              href="https://app.beseam.com/login"
              className="hidden items-center justify-center rounded-lg bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex min-w-[140px] whitespace-nowrap shadow-sm"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Main Menu"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Content */}

      {mobileMenuOpen && (
        <div className="fixed right-0 top-0 z-50 h-[100dvh] w-[300px] sm:w-[400px] max-w-[90vw] lg:hidden animate-in slide-in-from-right duration-300 border-l border-border shadow-2xl bg-background">
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}

            <div className="flex h-14 items-center justify-between px-6 border-b border-border/50">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Menu
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {activeSubmenu ? (
                <div className="animate-in slide-in-from-right-5 duration-200">
                  <button
                    onClick={() => setActiveSubmenu(null)}
                    className="mb-6 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  {activeSubmenu === "product" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                          Platform
                        </p>

                        {productItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="group flex items-start gap-4 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary transition-all">
                              <item.icon className="h-5 w-5 group-hover:text-white" />
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold">
                                  {item.title}
                                </span>

                                {item.badge && (
                                  <span
                                    className={`rounded-lg px-2 py-0.5 text-[9px] font-bold ${item.badge.className}`}
                                  >
                                    {item.badge.label}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                          Learn More
                        </p>

                        <div className="grid grid-cols-1 gap-2">
                          {productLinks.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="group flex items-center gap-3 rounded-lg bg-muted/30 p-3 hover:bg-accent transition-colors"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border/50 group-hover:bg-primary group-hover:border-primary transition-colors">
                                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-white" />
                              </div>

                              <span className="text-sm font-bold">
                                {item.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSubmenu === "resources" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                          Resources
                        </p>

                        {resourceItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="group flex items-center gap-4 rounded-lg p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary transition-all">
                              <item.icon className="h-5 w-5 group-hover:text-white" />
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">
                                {item.title}
                              </span>

                              {item.badge && (
                                <span
                                  className={`rounded-lg px-1.5 py-0.5 text-[9px] font-bold ${item.badge.className}`}
                                >
                                  {item.badge.label}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                          Connect
                        </p>

                        <div className="grid grid-cols-1 gap-2">
                          {resourceLinks.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="group flex items-center gap-3 rounded-lg bg-muted/30 p-3 hover:bg-accent transition-colors"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border/50 group-hover:bg-primary group-hover:border-primary transition-colors">
                                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-white" />
                              </div>

                              <span className="text-sm font-bold">
                                {item.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Product */}

                  <button
                    onClick={() => setActiveSubmenu("product")}
                    className="flex w-full items-center justify-between rounded-lg p-4 text-left hover:bg-accent transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary transition-all">
                        <Layers className="h-5 w-5 group-hover:text-white" />
                      </div>

                      <span className="text-lg font-bold">Product</span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>

                  {/* Pricing */}

                  <Link
                    href="https://app.beseam.com/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-between rounded-lg p-4 text-left hover:bg-accent transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/5 text-secondary group-hover:bg-secondary transition-all">
                        <BarChart3 className="h-5 w-5 group-hover:text-white" />
                      </div>

                      <span className="text-lg font-bold">Pricing</span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>

                  {/* Resources */}

                  <button
                    onClick={() => setActiveSubmenu("resources")}
                    className="flex w-full items-center justify-between rounded-lg p-4 text-left hover:bg-accent transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary transition-all">
                        <BookOpen className="h-5 w-5 group-hover:text-white" />
                      </div>

                      <span className="text-lg font-bold">Resources</span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>

                  {/* CTAs */}

                  <div className="pt-8 space-y-4">
                    <Button
                      variant="outline"
                      className="w-full rounded-lg p-5 text-base font-bold border-primary/20"
                      asChild
                    >
                      <Link
                        href="https://app.beseam.com/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                    </Button>

                    <Link
                      href="https://app.beseam.com/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center rounded-lg bg-primary p-5 text-base font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
