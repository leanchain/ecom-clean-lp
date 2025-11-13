import ClientLogos from "@/components/client-logos";
import { Comparison } from "@/components/comparison";
import { ComparisonTable } from "@/components/comparison-table";
import { Faq9 } from "@/components/faq9";
import { Feature284 } from "@/components/feature284";
import { Feature57 } from "@/components/feature57";
import { Gallery25 } from "@/components/gallery25";
import { Hero230 } from "@/components/hero230";
import HowItWorks from "@/components/sections/how-it-works";
import WhoItsFor from "@/components/sections/who-its-for";
import { Stats18 } from "@/components/stats18";

export default function Home() {
  return (
    <>
      <Hero230 />
      <Stats18 />
      <Feature57 />
      <Gallery25 />
      <HowItWorks />
      <WhoItsFor />
      <ComparisonTable />
      <ClientLogos />
      <Faq9 />
    </>
  );
}
