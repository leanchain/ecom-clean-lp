"use client";

import { CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing16 = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section className="bg-muted/50 py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <Badge variant="outline">Pricing</Badge>
          <h1 className="text-balance text-center text-4xl font-semibold sm:text-5xl lg:text-7xl">
            Simple pricing for everyone, start for free today
          </h1>
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
          <div className="mx-auto mt-4 grid w-full max-w-5xl gap-6 lg:grid-cols-3">
            <div className="bg-background w-full rounded-lg border p-8 shadow-sm lg:max-w-96">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Free</h3>
                <p className="text-muted-foreground text-sm">Free forever</p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-start font-semibold">
                <p className="text-xl">$</p>
                <p className="text-5xl leading-none">0</p>
              </div>
              <p className="text-muted-foreground text-sm">
                per user/month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              <Button variant="outline" className="mb-2 mt-4 w-full">
                Start for free
              </Button>
              <p className="text-muted-foreground text-center text-sm">
                No credit card required
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">Key features: </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Up to 5 projects</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Up to 5 users</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Up to 50 tasks</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Task management</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Analytics & reports</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-background w-full rounded-lg border p-8 shadow-sm lg:max-w-96">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Starter</h3>
                  <Badge className="flex items-center gap-1">
                    <Zap className="size-3" />
                    Popular
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  For small teams and startups
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-center gap-2">
                <div className="flex items-start font-semibold">
                  <p className="text-xl">$</p>
                  <p className="text-5xl leading-none">
                    {isMonthly ? "20" : "15"}
                  </p>
                </div>
                {!isMonthly && (
                  <div className="flex flex-col text-sm">
                    <p className="text-destructive font-semibold">25% off</p>
                    <p className="text-muted-foreground line-through">$20</p>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                per user/month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              <Button className="mb-2 mt-4 w-full">Try for 14 days</Button>
              <p className="text-muted-foreground text-center text-sm">
                No credit card required
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">Key features: </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Unlimited projects</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Unlimited users</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Unlimited tasks</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>File storage</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Customizable workflows</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-background w-full rounded-lg border p-8 shadow-sm lg:max-w-96">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Enterprise</h3>
                <p className="text-muted-foreground text-sm">
                  For large teams and enterprises
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-center gap-2">
                <div className="flex items-start font-semibold">
                  <p className="text-xl">$</p>
                  <p className="text-5xl leading-none">
                    {isMonthly ? "40" : "30"}
                  </p>
                </div>
                {!isMonthly && (
                  <div className="flex flex-col text-sm">
                    <p className="text-destructive font-semibold">25% off</p>
                    <p className="text-muted-foreground line-through">$40</p>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                per user/month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              <Button variant="outline" className="mb-2 mt-4 w-full">
                Try for 14 days
              </Button>
              <p className="text-muted-foreground text-center text-sm">
                No credit card required
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">Key features: </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Unlimited integrations</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Webhooks</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>API access</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>SAML authentication</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Dedicated support</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing16 };
