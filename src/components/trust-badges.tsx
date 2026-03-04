"use client";

import React from "react";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  FileText,
  Users,
  CheckCircle2,
  Server,
} from "lucide-react";

const TrustBadges = () => {
  return (
    <section className="py-20 md:py-28 border-y bg-muted/20">
      <div className="container max-w-5xl">
        <div className="mb-12 text-center">
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Security & Trust
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Built for teams that take revenue seriously
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            We only access what we need — and we&apos;re transparent about how.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* What we access */}
          <div className="rounded-2xl border bg-card p-6">
            <Eye className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-3 font-semibold">What we access</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Product catalog & metadata",
                "Page performance metrics",
                "KPI signals (rev/session, conversion)",
                "PDP content & change history",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What we don't access */}
          <div className="rounded-2xl border bg-card p-6">
            <EyeOff className="mb-4 h-6 w-6 text-muted-foreground" />
            <h3 className="mb-3 font-semibold">What we never access</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Customer PII or payment data",
                "Checkout or cart contents",
                "Order history or financials",
                "Admin credentials",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-muted-foreground/40 inline-block" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Encryption */}
          <div className="rounded-2xl border bg-card p-6">
            <Lock className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-3 font-semibold">Encryption</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AES-256 encryption at rest. TLS 1.3 in transit. EU data residency
              supported by default.
            </p>
          </div>

          {/* GDPR */}
          <div className="rounded-2xl border bg-card p-6">
            <FileText className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-3 font-semibold">GDPR & DPA</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              GDPR-ready. Data Processing Agreement (DPA) available on request.
              EU data residency supported.
            </p>
          </div>

          {/* Roles */}
          <div className="rounded-2xl border bg-card p-6">
            <Users className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-3 font-semibold">Access Control</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Role-based access with Admin, Editor, and Viewer roles. Full audit
              log for all actions.
            </p>
          </div>

          {/* SOC 2 */}
          <div className="rounded-2xl border bg-card p-6">
            <Shield className="mb-4 h-6 w-6 text-primary" />
            <h3 className="mb-3 font-semibold">SOC 2 Type II</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SOC 2 Type II in progress — estimated Q3 2025. Security overview
              available on request.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Questions about security?{" "}
          <a
            href="/demo"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Request a security overview
          </a>
        </p>
      </div>
    </section>
  );
};

export default TrustBadges;
