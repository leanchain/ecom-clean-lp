"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const RoiCalculator = () => {
  const [skuCount, setSkuCount] = useState(500);
  const [avgOrderValue, setAvgOrderValue] = useState(75);

  if (process.env.NEXT_PUBLIC_RELEASE_GUARD === "true") return null;

  // Calculate ROI metrics
  const manualCostPerPdp = 150; // Average cost to manually optimize a PDP
  const beseamCostPerPdp = 2; // Beseam cost per PDP
  const visibilityLift = 3.2; // Average visibility increase
  const conversionLift = 0.27; // 27% conversion increase

  const manualCost = skuCount * manualCostPerPdp;
  const beseamCost = skuCount * beseamCostPerPdp;
  const savings = manualCost - beseamCost;
  const additionalRevenue = skuCount * avgOrderValue * conversionLift * 12; // Annual
  const totalValue = savings + additionalRevenue;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Calculator className="h-4 w-4" />
              ROI Calculator
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              See Your Potential ROI
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Estimate how much Beseam can save you and generate in additional revenue.
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Inputs */}
            <div className="rounded-3xl border bg-card p-8">
              <h3 className="mb-6 text-lg font-semibold">Your Catalog</h3>

              {/* SKU Count Slider */}
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium">Number of Products</label>
                  <span className="text-2xl font-bold text-primary">
                    {skuCount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={skuCount}
                  onChange={(e) => setSkuCount(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>50</span>
                  <span>10,000</span>
                </div>
              </div>

              {/* AOV Slider */}
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium">Average Order Value</label>
                  <span className="text-2xl font-bold text-primary">
                    ${avgOrderValue}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="5"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>$20</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Assumptions */}
              <div className="rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">Assumptions:</p>
                <ul className="space-y-1">
                  <li>• Manual PDP optimization: ~$150/product</li>
                  <li>• Average AI visibility lift: 3.2x</li>
                  <li>• Average conversion increase: 27%</li>
                </ul>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-3xl border-2 border-primary bg-card p-8">
              <h3 className="mb-6 text-lg font-semibold">Your Potential Returns</h3>

              <div className="space-y-6">
                {/* Savings */}
                <div className="flex items-start gap-4 rounded-2xl bg-emerald-500/10 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Content Creation Savings</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {formatCurrency(savings)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      vs. manual optimization
                    </p>
                  </div>
                </div>

                {/* Additional Revenue */}
                <div className="flex items-start gap-4 rounded-2xl bg-primary/10 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Additional Annual Revenue</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(additionalRevenue)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      from improved conversions
                    </p>
                  </div>
                </div>

                {/* Time Saved */}
                <div className="flex items-start gap-4 rounded-2xl bg-blue-500/10 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Saved</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round(skuCount * 2 / 160)} months
                    </p>
                    <p className="text-xs text-muted-foreground">
                      of manual work eliminated
                    </p>
                  </div>
                </div>

                {/* Total Value */}
                <div className="mt-4 rounded-2xl bg-foreground p-6 text-center">
                  <p className="text-sm text-muted">Estimated Total First-Year Value</p>
                  <p className="text-4xl font-bold text-background">
                    {formatCurrency(totalValue)}
                  </p>
                </div>

                {/* CTA */}
                <Button asChild className="w-full rounded-full" size="lg">
                  <Link href="/demo">
                    Get Your Custom ROI Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
