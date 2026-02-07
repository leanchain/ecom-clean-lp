"use client";

import React from "react";
import { Sparkles, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const aiPlatforms = [
  {
    name: "ChatGPT",
    status: "not_mentioned",
    icon: "🔴",
  },
  {
    name: "Claude",
    status: "not_mentioned",
    icon: "🔴",
  },
  {
    name: "Perplexity",
    status: "not_mentioned",
    icon: "🔴",
  },
  {
    name: "Google AI",
    status: "partial",
    icon: "🟡",
  },
];

const sampleIssues = [
  {
    section: "FAQs with Schema",
    status: "missing",
    priority: "AI Priority",
    gain: "+18 points",
  },
  {
    section: "Technical Specifications",
    status: "missing",
    priority: "AI Priority",
    gain: "+15 points",
  },
  {
    section: "Comparison Table",
    status: "missing",
    priority: "AI Priority",
    gain: "+12 points",
  },
  {
    section: "Hero Media Gallery",
    status: "incomplete",
    priority: "Urgent",
    gain: "+10 points",
  },
  {
    section: "Product Story",
    status: "incomplete",
    priority: "AI Priority",
    gain: "+10 points",
  },
];

const AiTestPreview = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              Live AI Visibility Testing
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Is Your Product Visible to AI Search Engines?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We test your PDPs against ChatGPT, Claude, Perplexity, and Google AI Overviews
              to see if your products actually get recommended.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* AI Test Results Card */}
            <div className="rounded-3xl border bg-card p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Live AI Test Results</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Query: &quot;Best travel hair dryer under $100&quot;
              </p>

              <div className="space-y-3">
                {aiPlatforms.map((platform) => (
                  <div
                    key={platform.name}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                      platform.status === "not_mentioned"
                        ? "bg-red-50 dark:bg-red-950/30"
                        : platform.status === "partial"
                          ? "bg-amber-50 dark:bg-amber-950/30"
                          : "bg-green-50 dark:bg-green-950/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{platform.icon}</span>
                      <span className={`text-sm font-medium ${
                        platform.status === "not_mentioned"
                          ? "text-red-700 dark:text-red-400"
                          : platform.status === "partial"
                            ? "text-amber-700 dark:text-amber-400"
                            : "text-green-700 dark:text-green-400"
                      }`}>
                        {platform.name}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold ${
                      platform.status === "not_mentioned"
                        ? "text-red-600 dark:text-red-400"
                        : platform.status === "partial"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-green-600 dark:text-green-400"
                    }`}>
                      {platform.status === "not_mentioned"
                        ? "Not Mentioned"
                        : platform.status === "partial"
                          ? "Partially Visible"
                          : "Recommended"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Your product is invisible to 75% of AI search engines</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Missing FAQ schema, comparison data, and structured specifications that AI needs to recommend your products.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Issues Breakdown Card */}
            <div className="rounded-3xl border bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Top Issues to Fix</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">+65</p>
                  <p className="text-xs text-muted-foreground">points possible</p>
                </div>
              </div>

              <div className="space-y-3">
                {sampleIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between rounded-xl border p-3 ${
                      issue.status === "missing"
                        ? "border-red-200 dark:border-red-900"
                        : "border-amber-200 dark:border-amber-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {issue.status === "missing" ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{issue.section}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {issue.priority === "AI Priority" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                              <Sparkles className="h-2.5 w-2.5" />
                              AI Priority
                            </span>
                          )}
                          {issue.priority === "Urgent" && (
                            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                              URGENT
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600">
                      {issue.gain}
                    </span>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full mt-6 rounded-full" size="lg">
                <Link href="https://staging.beseam.com/analyze">
                  Get Your Full Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiTestPreview;
