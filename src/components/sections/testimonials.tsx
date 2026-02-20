"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "We work with an SEO agency and a dev shop — both pushing PDP changes constantly. Before Beseam, we had no way to know which change caused a conversion drop. Now every update is tracked, monitored, and reversible. Our agency actually loves it because they can prove their work drives results.",
    author: "Sarah Chen",
    role: "Head of E-commerce",
    company: "Nordic Outdoor Co.",
    metric: "Agency + internal, one pipeline",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "We recommend Beseam to every client. As an SEO agency, our biggest challenge was proving that our PDP changes didn't hurt conversion. Now we deploy through Beseam — changes are versioned, KPIs are monitored, and if anything dips, we can pinpoint and roll back instantly. It makes us look more professional.",
    author: "Marcus Rodriguez",
    role: "Founder",
    company: "Altitude Digital (SEO Agency)",
    metric: "Agency-recommended",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Beseam's AI recommendations upgraded 200 PDPs with FAQs and schema. But the real value? When our agency pushed a theme change that broke FAQ modules, Beseam caught the revenue dip in 4 hours, pinpointed the cause, and rolled it back. That one save paid for the whole year.",
    author: "Emma Thompson",
    role: "Founder & CEO",
    company: "Luxe Beauty Lab",
    metric: "Revenue regression caught in 4h",
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
            Early Feedback
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Trusted by Brands and the Agencies They Work With
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            See how e-commerce teams and their agencies use Beseam as the
            guardrailed pipeline for every PDP change.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative flex flex-col rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />

              {/* Metric Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {testimonial.metric}
                </span>
              </div>

              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-8 flex-1 text-foreground/90 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 border-t pt-6">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-semibold text-lg">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
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
