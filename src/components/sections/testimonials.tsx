"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "We went from invisible in ChatGPT to being recommended for 40% of our product queries. Our organic traffic from AI sources tripled in 3 months.",
    author: "Sarah Chen",
    role: "Head of E-commerce",
    company: "Nordic Outdoor Co.",
    avatar: "/images/testimonials/avatar-1.jpg",
    metric: "3x AI traffic",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Beseam generated product content for 2,000 SKUs in a week. It would have taken our team 6 months. The quality is indistinguishable from human-written copy.",
    author: "Marcus Rodriguez",
    role: "VP of Digital",
    company: "HomeStyle Direct",
    avatar: "/images/testimonials/avatar-2.jpg",
    metric: "2,000 SKUs in 1 week",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The ROI was immediate. Our PDPs now answer every question customers have. Returns dropped 23% because buyers know exactly what they're getting.",
    author: "Emma Thompson",
    role: "Founder & CEO",
    company: "Luxe Beauty Lab",
    avatar: "/images/testimonials/avatar-3.jpg",
    metric: "23% fewer returns",
    rating: 5,
  },
];

const Testimonials = () => {
  if (process.env.NEXT_PUBLIC_RELEASE_GUARD === "true") return null;

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Customer Success
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Trusted by E-commerce Teams Worldwide
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            See how brands are using Beseam to dominate AI search and increase conversions.
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
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 border-t pt-6">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  {/* Placeholder avatar - replace with real images */}
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-semibold text-lg">
                    {testimonial.author.split(" ").map(n => n[0]).join("")}
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

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground mt-1">Brands trust Beseam</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">2M+</p>
            <p className="text-sm text-muted-foreground mt-1">PDPs optimized</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">4.9/5</p>
            <p className="text-sm text-muted-foreground mt-1">Customer rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">3.2x</p>
            <p className="text-sm text-muted-foreground mt-1">Avg. visibility lift</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
