"use client";

import React from "react";

const VideoDemo = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
              See It In Action
            </p>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Watch How Beseam Works
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {process.env.NEXT_PUBLIC_RELEASE_GUARD === "true"
                ? "See how we audit PDPs and generate AI-optimized content — this is what you'll get as a pilot partner."
                : "2-minute demo showing how to audit a PDP and generate AI-optimized content."}
            </p>
          </div>

          {/* Video Container */}
          <div className="relative">
            <div className="group relative aspect-video overflow-hidden rounded-3xl border bg-card shadow-2xl">
              <video
                src="/how-it-works.mp4"
                className="absolute inset-0 h-full w-full object-cover"
                muted
                loop
                autoPlay
                playsInline
                controls
              />

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
            </div>
          </div>

          {/* Features mentioned in video */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                time: "0:00",
                title: "Audit Your PDP",
                description: "Get scored across 8 dimensions: SEO, Content, Trust, UX, Conversion, Mobile, Performance, Accessibility",
              },
              {
                time: "0:45",
                title: "See What's Missing",
                description: "Prioritized issues with AI Priority tags and estimated point gains",
              },
              {
                time: "1:30",
                title: "Generate & Sync",
                description: "One-click generation of images, video, copy, and schema markup",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border bg-card p-4"
              >
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-mono text-primary">
                  {item.time}
                </span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
