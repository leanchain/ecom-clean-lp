"use client";

import Link from "next/link";

const sections = [
  { id: "beseam-pdp-ai", label: "Beseam PDP AI" },
  { id: "audit-tryout", label: "AI Audit" },
  { id: "how-it-works", label: "How It Works" },
  { id: "ai-media-studio", label: "AI Media Studio" },
  { id: "gallery", label: "Gallery" },
  { id: "compare-rankscale", label: "Comparison vs brands" },
  { id: "who-its-for", label: "Who It's For" },
  { id: "integrations", label: "Integrations" },
  { id: "faq", label: "FAQ" },
];

const SectionNavigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export { SectionNavigation };