"use client";

import React from "react";
import { Star, Quote, BarChart2, Clock, Ruler } from "lucide-react";

interface CaseStudy {
  id: number;
  category: string;
  partnerType: string;
  problem: string;
  solution: string;
  impact: string;
  timeframe: string;
  measurement: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    category: "DTC Brand · Multi-Agency Stack",
    partnerType: "Design Partner",
    problem:
      "Multiple vendors pushing PDP changes with no centralized tracking. Impossible to attribute conversion drops to specific updates.",
    solution:
      "All change sources (SEO agency, dev shop, internal) routed through Beseam with full diff tracking and per-change KPI windows.",
    impact: "Attribution-ready pipeline across 3 teams",
    timeframe: "2-week rollout",
    measurement: "Change attribution tied to session KPIs",
    quote:
      "Before Beseam, we had no way to know which change caused a conversion drop. Now every update is tracked, monitored, and reversible. Our agency actually loves it because they can prove their work drives results.",
    author: "Sarah Chen",
    role: "Head of E-commerce",
    company: "Nordic Outdoor Co.",
    rating: 5,
  },
  {
    id: 2,
    category: "SEO Agency · 12 Client Accounts",
    partnerType: "Agency Partner",
    problem:
      "Clients questioning whether SEO changes hurt conversion. No rollback capability created liability and threatened client relationships.",
    solution:
      "Beseam used as the agency's deployment layer. Every PDP change versioned, KPIs monitored post-deploy, instant rollback available.",
    impact: "First regression caught and rolled back within same sprint",
    timeframe: "3 clients live in week 1",
    measurement: "Rev/session vs. 14-day pre-change baseline",
    quote:
      "Our biggest challenge was proving that PDP changes didn't hurt conversion. Now we deploy through Beseam - changes are versioned, KPIs are monitored, and if anything dips we can pinpoint and roll back instantly.",
    author: "Marcus Rodriguez",
    role: "Founder",
    company: "Altitude Digital (SEO Agency)",
    rating: 5,
  },
  {
    id: 3,
    category: "Beauty DTC Brand · ~200 PDPs",
    partnerType: "Design Partner",
    problem:
      "Theme change broke FAQ modules across 200 PDPs. No way to isolate root cause - revenue was silently dropping.",
    solution:
      "AI-upgraded PDPs with FAQs and schema via Beseam. When theme change caused regression, Beseam pinpointed the cause and guided rollback.",
    impact: "Regression detected in 3.8h → rolled back → baseline recovered same day",
    timeframe: "Single incident",
    measurement: "Rev/session vs. 7-day rolling baseline",
    quote:
      "When our agency pushed a theme change that broke FAQ modules, Beseam caught the revenue dip in 4 hours, pinpointed the cause, and rolled it back. That one save paid for the whole year.",
    author: "Emma Thompson",
    role: "Founder & CEO",
    company: "Luxe Beauty Lab",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Customer Evidence
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Real Outcomes from Early Customers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Design partners and pilot customers using Beseam as the guardrailed
            pipeline for every PDP change.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {caseStudies.map((t) => (
            <div
              key={t.id}
              className="group relative flex flex-col rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              {/* Category + Partner type */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {t.category}
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {t.partnerType}
                </span>
              </div>

              {/* Problem */}
              <div className="mb-4">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Problem
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {t.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-5">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  What changed
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {t.solution}
                </p>
              </div>

              {/* KPI stats */}
              <div className="mb-6 space-y-2">
                <div className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
                  <BarChart2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Impact
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {t.impact}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-start gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Timeframe
                      </p>
                      <p className="text-xs font-semibold text-foreground">
                        {t.timeframe}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
                    <Ruler className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Measured by
                      </p>
                      <p className="text-xs font-semibold text-foreground">
                        {t.measurement}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="flex-1 border-t pt-6">
                <Quote className="mb-2 h-5 w-5 text-primary/20" />
                <blockquote className="mb-4 text-sm text-foreground/70 leading-relaxed italic">
                  &quot;{t.quote}&quot;
                </blockquote>

                {/* Stars */}
                <div className="mb-3 flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
