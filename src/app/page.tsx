import ClientLogos from "@/components/client-logos";
import { Comparison } from "@/components/comparison";
import { ComparisonTable } from "@/components/comparison-table";
import { Faq9 } from "@/components/faq9";
import { Feature284 } from "@/components/feature284";
import { Feature57 } from "@/components/feature57";
import { Gallery25 } from "@/components/gallery25";
import { Hero230 } from "@/components/hero230";
import { Stats18 } from "@/components/stats18";

export default function Home() {
  return (
    <>
      <Hero230 />
      <Gallery25 />
      <Feature57 />
      <Feature284 />
      <Comparison />
      <Stats18 />
      <ComparisonTable />
      <ClientLogos />
      <Faq9 />
    </>
  );
}
