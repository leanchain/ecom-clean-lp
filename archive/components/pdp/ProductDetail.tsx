"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MediaGallery from "@/components/pdp/MediaGallery";
import PurchasePanel from "@/components/pdp/PurchasePanel";
import SpecificationsTable from "@/components/pdp/SpecificationsTable";
import productsData from "@/data/products.json";

type Product = (typeof productsData.products)[number];

export default function ProductDetail() {
  const products = productsData.products as Product[];

  // Treat the first 4 items as variants of one product for this archive page
  const variants = products.slice(0, 4);
  const [selectedId, setSelectedId] = React.useState<string>(variants[0].id);

  const selectedProduct =
    variants.find((p) => p.id === selectedId) ?? variants[0];

  // Build a gallery from variant images to mimic Shopify gallery behavior
  const gallery = variants.map((v) => ({ src: v.image, alt: v.name }));

  return (
    <section className="section-padding container space-y-10.5">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <MediaGallery
          images={gallery}
          selectedIndex={Math.max(
            0,
            variants.findIndex((v) => v.id === selectedId)
          )}
          onSelect={(idx) => setSelectedId(variants[idx]?.id ?? selectedId)}
        />

        <PurchasePanel
          title={selectedProduct.name}
          description={selectedProduct.description}
          price={selectedProduct.price}
          originalPrice={selectedProduct.originalPrice}
          variants={variants.map((v) => ({
            id: v.id,
            name: v.id
              .split("-")
              .slice(-1)[0]
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            image: v.image,
          }))}
          selectedVariantId={selectedId}
          onSelectVariant={setSelectedId}
        />
      </div>

      <Tabs defaultValue="description" className="mt-2">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none dark:prose-invert">
            <p>
              Engineered for clarity and impact, Hex+ combines premium
              components with a sleek design to deliver immersive sound wherever
              you listen. Enjoy crisp highs, rich mids, and deep bass in a
              compact form that fits any space.
            </p>
            <ul>
              <li>Powerful, room-filling audio with balanced tuning</li>
              <li>Reliable wireless connectivity and all-day battery life</li>
              <li>Lightweight and portable for listening on the go</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specs" className="mt-6">
          <SpecificationsTable
            sections={selectedProduct.specifications as any}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
