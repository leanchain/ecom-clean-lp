"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyCTA = () => {
  const [scrollPast, setScrollPast] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPast(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = scrollPast && !isDismissed;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="bg-background/95 backdrop-blur-lg border-t shadow-2xl">
        <div className="container py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Ready to make PDP improvements safely at scale?
                </p>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Free audit · No credit card · Built-in rollback
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link href="https://app.beseam.com/analyze" target="_blank" rel="noopener noreferrer">
                  Try Free Audit
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                <Link href="/demo" className="flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <button
                onClick={() => setIsDismissed(true)}
                className="ml-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
