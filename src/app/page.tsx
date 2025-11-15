import ClientLogos from "@/components/client-logos";
import { Compare2 } from "@/components/compare2";
import { Comparison } from "@/components/comparison";
import { Faq9 } from "@/components/faq9";
import { Feature57 } from "@/components/feature57";
import { Gallery25 } from "@/components/gallery25";
import { Hero230 } from "@/components/hero230";
import { Integration1 } from "@/components/integration1";
import HowItWorks from "@/components/sections/how-it-works";
import WhoItsFor from "@/components/sections/who-its-for";
import { Stats18 } from "@/components/stats18";

export default function Home() {
  return (
    <>
      <Hero230 />
      <ClientLogos />
      <Stats18 />
      <HowItWorks />
      <Feature57 />
      <Gallery25 />
      <Comparison />
      <Compare2 />
      <WhoItsFor />
      <Integration1 />
      <Faq9 />
    </>
  );
}
