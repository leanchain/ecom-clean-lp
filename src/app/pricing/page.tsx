"use client";

import { CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PricingPage() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section className="bg-muted/50 py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <Badge variant="outline">Pricing</Badge>
          <h1 className="text-balance text-center text-4xl font-semibold sm:text-5xl lg:text-7xl">
            AI-Powered Product Pages for Every Business
          </h1>
          <p className="text-muted-foreground text-center text-lg max-w-2xl">
            Choose the perfect plan to transform your product catalog with
            AI-generated images, videos, and search optimization.
          </p>
          <Tabs
            value={isMonthly ? "monthly" : "yearly"}
            onValueChange={(value) => setIsMonthly(value === "monthly")}
            className="w-80"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Billed Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Billed Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="mx-auto mt-4 grid w-full max-w-7xl gap-6 lg:grid-cols-4">
            {/* Starter Plan */}
            <div className="bg-background w-full rounded-3xl border p-8 shadow-sm">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Starter</h3>
                <p className="text-muted-foreground text-sm">
                  Perfect for small businesses
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-start font-semibold">
                <p className="text-xl">$</p>
                <p className="text-5xl leading-none">
                  {isMonthly ? "49" : "39"}
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                per month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              {!isMonthly && (
                <p className="text-primary text-sm font-semibold mt-1">
                  Save $120/year
                </p>
              )}
              <Button variant="outline" className="mb-2 mt-4 w-full">
                Start Free Trial
              </Button>
              <p className="text-muted-foreground text-center text-sm">
                14-day free trial
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">Key features: </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">50 AI images per month</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">10 AI videos per month</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">AI Search optimization</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Background removal</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Basic analytics</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="bg-background w-full rounded-3xl border p-8 shadow-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Growth</h3>
                  <Badge className="flex items-center gap-1">
                    <Zap className="size-3" />
                    Popular
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  For growing e-commerce brands
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-center gap-2">
                <div className="flex items-start font-semibold">
                  <p className="text-xl">$</p>
                  <p className="text-5xl leading-none">
                    {isMonthly ? "149" : "119"}
                  </p>
                </div>
                {!isMonthly && (
                  <div className="flex flex-col text-sm">
                    <p className="text-primary font-semibold">20% off</p>
                    <p className="text-muted-foreground line-through">$149</p>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                per month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              {!isMonthly && (
                <p className="text-primary text-sm font-semibold mt-1">
                  Save $360/year
                </p>
              )}
              <Button className="mb-2 mt-4 w-full">Start Free Trial</Button>
              <p className="text-muted-foreground text-center text-sm">
                14-day free trial
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">
                  Everything in Starter, plus:{" "}
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">500 AI images per month</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">50 AI videos per month</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">360° product spins</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Advanced analytics</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Priority support</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-background w-full rounded-3xl border p-8 shadow-sm">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Professional</h3>
                <p className="text-muted-foreground text-sm">
                  For established brands
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-center gap-2">
                <div className="flex items-start font-semibold">
                  <p className="text-xl">$</p>
                  <p className="text-5xl leading-none">
                    {isMonthly ? "299" : "239"}
                  </p>
                </div>
                {!isMonthly && (
                  <div className="flex flex-col text-sm">
                    <p className="text-primary font-semibold">20% off</p>
                    <p className="text-muted-foreground line-through">$299</p>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                per month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              {!isMonthly && (
                <p className="text-primary text-sm font-semibold mt-1">
                  Save $720/year
                </p>
              )}
              <Button variant="outline" className="mb-2 mt-4 w-full">
                Start Free Trial
              </Button>
              <p className="text-muted-foreground text-center text-sm">
                14-day free trial
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">
                  Everything in Growth, plus:{" "}
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">2,000 AI images per month</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">200 AI videos per month</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Batch processing</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">API access</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Custom branding</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-background w-full rounded-3xl border p-8 shadow-sm">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Enterprise</h3>
                <p className="text-muted-foreground text-sm">
                  For large-scale operations
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-start font-semibold">
                <p className="text-4xl leading-none">Custom</p>
              </div>
              <p className="text-muted-foreground text-sm">
                Tailored pricing for your needs
              </p>
              <Button variant="outline" className="mb-2 mt-4 w-full">
                Contact Sales
              </Button>
              <p className="text-muted-foreground text-center text-sm">
                Custom onboarding included
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">
                  Everything in Professional, plus:{" "}
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Unlimited AI generation</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Dedicated account manager</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">Custom integrations</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">SLA guarantee</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                    <p className="text-sm">White-label options</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
