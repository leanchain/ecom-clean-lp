"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import LeadCaptureForm from "@/components/beseam/lead-capture-form";

export default function ScanForm() {
  return (
    <>
      <div className="mt-10">
        <LeadCaptureForm
          mode="store-domain"
          source="ai_visibility_scan"
          placement="scanner_form"
          storeLabel="Shopify store domain"
          storePlaceholder="yourstore.myshopify.com"
          buttonLabel="Run scan"
          helpText="We send the findings to your email and open the scan in the Beseam application."
          storeFieldId="scanner-store-domain"
        />
      </div>
      <div className="mt-14 border-t border-rule pt-8">
        <p className="text-[15px] text-foreground">
          Need ongoing visibility and purchase-health monitoring with evidence
          and prioritized issues?
        </p>
        <Link
          href="/product-visibility-monitoring"
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold hover:underline"
        >
          Book a 20-minute commerce review
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
