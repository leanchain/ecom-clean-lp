"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";

const VideoDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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
              2-minute demo showing how to audit a PDP and generate AI-optimized content.
            </p>
          </div>

          {/* Video Container */}
          <div className="relative">
            {/* Video Thumbnail */}
            <div
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-3xl border bg-card shadow-2xl"
              onClick={() => setIsPlaying(true)}
            >
              {/* Placeholder - replace with actual thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    {/* Play Button */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform group-hover:scale-110">
                      <Play className="h-8 w-8 ml-1" fill="currentColor" />
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      Watch 2-min Demo
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
                2:14
              </div>
            </div>

            {/* Video Modal */}
            {isPlaying && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                <div className="relative w-full max-w-5xl">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute -top-12 right-0 flex items-center gap-2 text-white hover:text-primary"
                  >
                    <X className="h-6 w-6" />
                    Close
                  </button>
                  <div className="aspect-video overflow-hidden rounded-2xl bg-black">
                    {/* Replace with actual video embed */}
                    <div className="flex h-full items-center justify-center text-white">
                      <p className="text-center">
                        Video player will be embedded here.<br />
                        <span className="text-sm text-muted-foreground">
                          Add your demo video URL
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
