import { Clock } from "lucide-react";

import { AnalyzerInput } from "@/components/sections/analyzer-input";
import { ReportsTable } from "@/components/reports-table";
import type { ReportEntry } from "@/components/reports-table";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8123";

async function getReports(): Promise<ReportEntry[]> {
  try {
    const res = await fetch(`${API_URL}/api/pdp/public/pdp-audit/latest/reports`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries || [];
  } catch (error) {
    console.error("Backend fetch failed:", error);
    return [];
  }
}

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute right-0 top-1/4 -z-10 h-[400px] w-[400px] bg-secondary/5 blur-[100px] rounded-full" />

      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-5xl mb-4">
            Recent Audits
          </h1>
          <p className="text-lg text-muted-foreground">
            Live feed of analyzed product pages.
          </p>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-6">
              <Clock className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            <p className="text-xl font-bold text-muted-foreground">Waiting for live audits...</p>
          </div>
        ) : (
          <ReportsTable reports={reports} />
        )}
      </div>

      <section className="py-24 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl tracking-tight text-foreground mb-4 md:text-4xl">
            Audit your own product
          </h2>
          <div className="max-w-2xl mx-auto">
            <AnalyzerInput />
          </div>
        </div>
      </section>
    </div>
  );
}
