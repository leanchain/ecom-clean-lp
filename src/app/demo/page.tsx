"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function DemoPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "fieson" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="font-accent mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Book a Demo
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
          See how Fieson can transform your product page content for AI search
          and conversion
        </p>
      </div>

      {/* Cal.com Embed - Clean without card wrapper */}
      <div className="mx-auto max-w-4xl">
        <Cal
          namespace="fieson"
          calLink="bart-rosier/fieson"
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view" }}
        />
      </div>

      {/* Additional Info */}
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="bg-muted/50 rounded-xl p-8">
          <h2 className="mb-4 text-2xl font-semibold">What to Expect</h2>
          <ul className="text-muted-foreground space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                <strong>Personalized walkthrough</strong> of Fieson's AI Media
                Studio and PDP AI features
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                <strong>Demo</strong> of AI image generation,
                video creation, and content enrichment
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                <strong>AI search optimization insights</strong> for ChatGPT,
                Claude, Perplexity, and Google AI Overviews
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                <strong>Q&A session</strong> to address your specific use cases
                and requirements
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              <span>
                <strong>Custom recommendations</strong> for optimizing your
                product catalog
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
