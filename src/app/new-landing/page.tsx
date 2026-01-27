"use client";

import { Compare2 } from "@/components/compare2";
import { CompareClaid } from "@/components/compare-claid";
import { CompareCreati } from "@/components/compare-creati";
import { CompareProductshots } from "@/components/compare-productshots";
import { CompareRankscale } from "@/components/compare-rankscale";
import { CompareWeshop } from "@/components/compare-weshop";
import { Comparison } from "@/components/comparison";
import { Faq9 } from "@/components/faq9";
import { Feature57 } from "@/components/feature57";
import { Gallery25 } from "@/components/gallery25";
import { Integration1 } from "@/components/integration1";
import AuditTryout from "@/components/sections/audit-tryout";
import HowItWorks from "@/components/sections/how-it-works";
import WhoItsFor from "@/components/sections/who-its-for";
import { Stats18 } from "@/components/stats18";
import ImprovedHero from "./Hero";
import { SectionNavigation } from "./SectionNavigation";
import StickyCTA from "./StickyCTA";
import { useEffect } from "react";

export default function NewLanding() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <ImprovedHero />
      <SectionNavigation />
      <Stats18 />
        <AuditTryout />
        <HowItWorks />
        <Feature57 />
        <Gallery25 />
        <Compare2 />
        <Comparison />
        <WhoItsFor />
        <Integration1 />
        <Faq9 />
        <CompareRankscale />
        <CompareProductshots />
        <CompareClaid />
        <CompareWeshop />
        <CompareCreati />
      <StickyCTA />
    </>
  );
}
