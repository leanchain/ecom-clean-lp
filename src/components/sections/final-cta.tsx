"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Play, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBorderButton from "@/components/animated-border-button";

const FinalCta = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-primary/[0.9] border-y border-white/10">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-heading text-4xl text-white md:text-5xl lg:text-6xl drop-shadow-sm">
            Ready to upgrade your PDPs without the risk?
          </h2>

          <p className="mb-10 text-lg text-white/90 md:text-xl max-w-2xl mx-auto">
            Get a free baseline audit, see your upgrade playbook, and deploy
            improvements with built-in guardrails.
          </p>

          {/* Email Capture Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mb-8 mx-auto max-w-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 pl-12 pr-4 rounded-full bg-white border-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-white/30 shadow-2xl transition-all"
                  />
                </div>
                <AnimatedBorderButton
                  asChild
                  buttonSize="lg"
                  fullWidth={false}
                  borderColor="white"
                  className="h-14 px-8 text-lg font-bold bg-secondary text-white hover:bg-secondary/90 shadow-2xl border-none"
                  wrapperClassName="sm:w-auto"
                >
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Starting..." : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </AnimatedBorderButton>
              </div>
            </form>
          ) : (
            <div className="mb-8 mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-2xl border border-white/20">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="text-xl font-bold text-card-foreground">
                  Check your email!
                </p>
                <p className="text-muted-foreground">
                  We&apos;ve sent your access link to {email}
                </p>
              </div>
            </div>
          )}

          {/* Feature Checklist */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              "Free PDP audit",
              "No credit card required",
              "Hands-on onboarding",
              "Built-in rollback",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-white font-medium"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>

          {/* Alternative CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-sm font-medium text-white/80">
              Prefer a demo?
            </span>
            <Button
              asChild
              variant="link"
              className="text-white font-bold text-lg hover:no-underline hover:text-white/80 p-0 h-auto underline underline-offset-4 decoration-white/30"
            >
              <Link href="/demo" className="flex items-center gap-2">
                <Play className="h-5 w-5 fill-current" />
                Book a Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
