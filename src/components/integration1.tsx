"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface IntegrationItem {
  id: number;
  logo: string;
  name: string;
  description: string;
  status?: "available" | "coming-soon";
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    id: 1,
    logo: "/logos/integrations/shopify.svg",
    name: "Shopify & Shopify Plus",
    description:
      "Sync large catalogs, metafields, and PDP layouts directly from Shopify.",
    status: "available",
  },
  {
    id: 2,
    logo: "/logos/integrations/woocommerce.svg",
    name: "WooCommerce",
    description:
      "Pull products and attributes from your WooCommerce store in a few clicks.",
    status: "available",
  },
  {
    id: 3,
    logo: "/logos/integrations/bigcommerce.svg",
    name: "BigCommerce",
    description:
      "Keep product content in sync across big catalogs without manual updates.",
    status: "coming-soon",
  },
  {
    id: 4,
    logo: "/logos/integrations/adobe-commerce.svg",
    name: "Adobe Commerce / Magento",
    description:
      "Connect complex catalogs and custom PDP templates from Adobe Commerce.",
    status: "coming-soon",
  },
  {
    id: 5,
    logo: "/logos/integrations/sfcc.svg",
    name: "Salesforce Commerce Cloud",
    description: "Enterprise-grade integration for global brands on SFCC.",
    status: "coming-soon",
  },
  {
    id: 6,
    logo: "/logos/integrations/google-merchant.svg",
    name: "Google Merchant & Feeds",
    description:
      "Plug in product feeds and custom exports without changing your stack.",
    status: "available",
  },
];

const FeatureIcon: React.FC<IntegrationItem> = ({
  name,
  description,
  logo,
  status,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="group relative flex h-16 w-32 items-center justify-center rounded-xl border border-border bg-card/50 px-4 transition-all hover:bg-accent/50 md:h-20 md:w-40">
          <Image
            src={logo}
            alt={name}
            width={100}
            height={40}
            className="h-7 w-auto object-contain opacity-90 transition-all group-hover:opacity-100 md:h-9"
          />
          {status === "coming-soon" && (
            <Badge
              variant="outline"
              className="absolute -top-2 -right-2 scale-75 whitespace-nowrap bg-background px-1.5 py-0 text-[10px] font-medium"
            >
              Soon
            </Badge>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="z-[100] max-w-xs p-3 text-center">
        <p className="text-sm font-semibold">{name}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Integration1 = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-background">
      {/* Background glow effects */}
      <div className="absolute left-1/4 top-1/2 -z-10 h-[400px] w-[400px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute right-1/4 top-1/2 -z-10 h-[400px] w-[400px] bg-secondary/5 blur-[120px] rounded-full" />

      <div className="container relative max-w-5xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-foreground mb-6 text-pretty text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Connect Beseam to the <span className="text-primary italic">platforms you already use</span>
            </h2>
            <p className="text-muted-foreground/90 text-lg md:text-xl leading-relaxed">
              Beseam plugs into your ecommerce platform and product feeds so
              AI-ready PDPs stay in sync automatically - no rebuild or custom CMS
              needed.
            </p>
          </motion.div>
        </div>

        <TooltipProvider delayDuration={0}>
          <div className="relative mt-12 w-full">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-48" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-48" />
            
            <div className="flex overflow-hidden">
              <motion.div
                className="flex w-max gap-8 py-8"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...INTEGRATIONS, ...INTEGRATIONS].map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${idx}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="transition-transform"
                  >
                    <FeatureIcon {...item} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </TooltipProvider>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <span className="text-muted-foreground font-medium">
            Have a tool you&apos;d like to integrate?
          </span>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-2 font-bold">
            <a href="/demo">Request an integration</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export { Integration1 };
