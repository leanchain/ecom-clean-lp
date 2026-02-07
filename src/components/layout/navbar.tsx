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
  Ruler,
  Search,
  Sparkles,
  TrendingUp,
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

// Product menu items - mirrors the 3-layer architecture
const productItems = [
  {
    id: "audit",
    title: "PDP Audit",
    description: "Analyze your product pages across 8 dimensions. Free.",
    href: "https://staging.beseam.com/analyze",
    icon: Search,
    badge: "Free",
  },
  {
    id: "optimize",
    title: "AI Optimization",
    description: "Generate images, videos, copy, and structured data.",
    href: "/#how-it-works",
    icon: Wand2,
  },
  {
    id: "conversion",
    title: "Conversion Suite",
    description: "Size recommendations, styleguides, tryouts, personalization.",
    href: "/#conversion-suite",
    icon: TrendingUp,
    badge: "Add-on",
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
    comingSoon: true,
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
  badge?: string;
  comingSoon?: boolean;
}

interface MenuContentProps {
  mainItems: MenuItem[];
  footerItems?: MenuItem[];
}

const MenuContent = ({ mainItems, footerItems }: MenuContentProps) => (
  <div className="w-max bg-background p-2">
    <div className="grid grid-cols-2 gap-1 mb-2">
      {mainItems.map((item, idx) => (
        <NavigationMenuLink
          key={idx}
          href={item.href}
          className="group flex w-[300px] items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-accent"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
            <item.icon className="h-5 w-5" />
          </div>

          <div className="flex-1 pt-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-foreground">
                {item.title}
              </span>

              {(item.badge || item.comingSoon) && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
                    item.badge === "Free"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : item.badge === "Add-on"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.badge || "Soon"}
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
      <div className="grid grid-cols-2 gap-1 p-1 mt-1 border-t border-border/40 bg-background">
        {footerItems.map((item, idx) => (
          <NavigationMenuLink
            key={idx}
            href={item.href}
            className="group flex w-[240px] items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all hover:bg-accent"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background border border-border/50 group-hover:border-primary/30 transition-colors">
              <item.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center lg:w-[220px]">
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
                    href="/pricing"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
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
          <div className="flex items-center justify-end gap-3 lg:w-[220px]">
            <ThemeToggle />

            <Link
              href="/demo"
              className="hidden items-center justify-center gap-2 rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex min-w-[140px] whitespace-nowrap shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
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
        <div className="fixed right-0 top-0 z-50 h-[100dvh] w-1/2 lg:hidden animate-in slide-in-from-right duration-300 border-l border-border shadow-2xl bg-background">
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
                            className="flex items-start gap-4 rounded-xl p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                              <item.icon className="h-5 w-5" />
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold">
                                  {item.title}
                                </span>

                                {item.badge && (
                                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                                    {item.badge}
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
                              className="flex items-center gap-3 rounded-lg bg-muted/30 p-3 hover:bg-accent transition-colors"
                            >
                              <item.icon className="h-4 w-4 text-muted-foreground" />

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
                            className="flex items-center gap-4 rounded-xl p-3 hover:bg-accent transition-colors"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                              <item.icon className="h-5 w-5" />
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">
                                {item.title}
                              </span>

                              {item.comingSoon && (
                                <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground font-bold">
                                  Soon
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
                              className="flex items-center gap-3 rounded-lg bg-muted/30 p-3 hover:bg-accent transition-colors"
                            >
                              <item.icon className="h-4 w-4 text-muted-foreground" />

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
                    className="flex w-full items-center justify-between rounded-xl p-4 text-left hover:bg-accent transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Layers className="h-5 w-5" />
                      </div>

                      <span className="text-lg font-bold">Product</span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>

                  {/* Pricing */}

                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-between rounded-xl p-4 text-left hover:bg-accent transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                        <BarChart3 className="h-5 w-5" />
                      </div>

                      <span className="text-lg font-bold">Pricing</span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>

                  {/* Resources */}

                  <button
                    onClick={() => setActiveSubmenu("resources")}
                    className="flex w-full items-center justify-between rounded-xl p-4 text-left hover:bg-accent transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <BookOpen className="h-5 w-5" />
                      </div>

                      <span className="text-lg font-bold">Resources</span>
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>

                  {/* CTAs */}

                  <div className="pt-8">
                    <Link
                      href="/demo"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary p-5 text-base font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
                    >
                      <Sparkles className="h-5 w-5" />
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
