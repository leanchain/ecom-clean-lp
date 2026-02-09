import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const FeatureCard: React.FC<IntegrationItem> = ({
  name,
  description,
  logo,
  status,
}) => {
  return (
    <Card className="bg-background text-foreground w-full border-border px-4 py-3 md:px-5 md:py-4">
      <CardHeader className="flex flex-row items-center space-x-4 p-0">
        <Image
          src={logo}
          alt={name}
          width={80}
          height={32}
          className="h-8 w-auto shrink-0 object-contain md:h-9"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold md:text-lg">
              {name}
            </CardTitle>
            {status === "coming-soon" && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Coming Soon
              </span>
            )}
          </div>
          <CardDescription className="text-xs text-muted-foreground md:text-sm">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

const Integration1 = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container max-w-5xl">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="font-heading text-foreground mb-4 text-pretty text-3xl md:text-4xl lg:text-5xl">
            Connect Beseam to the platforms you already use
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {process.env.NEXT_PUBLIC_RELEASE_GUARD === "true"
              ? "Beseam is designed to plug into your ecommerce platform and product feeds so AI-ready PDPs stay in sync automatically — no rebuild or custom CMS needed."
              : "Beseam plugs into your ecommerce platform and product feeds so AI-ready PDPs stay in sync automatically - no rebuild or custom CMS needed."}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:mt-4 lg:mt-8">
          {INTEGRATIONS.map((item) => (
            <FeatureCard key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-10 flex flex-row items-center justify-center gap-x-4 text-sm md:text-base">
          <span className="text-muted-foreground">
            Have a tool you'd like to integrate?
          </span>
          <Button asChild size="sm" className="rounded-full px-4">
            <a href="/demo">Request an integration</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Integration1 };
