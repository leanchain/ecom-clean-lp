"use client";

import React from "react";
import { Shield, Lock, Clock, Award, RefreshCw, Headphones } from "lucide-react";

const allBadges = [
  {
    icon: Shield,
    title: "SOC 2 Compliant",
    description: "Enterprise-grade security",
  },
  {
    icon: Lock,
    title: "Data Encrypted",
    description: "256-bit SSL encryption",
  },
  {
    icon: RefreshCw,
    title: "Money-Back Guarantee",
    description: "30-day full refund",
    releaseOnly: true,
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    description: "Reliable infrastructure",
    releaseOnly: true,
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Always here to help",
  },
  {
    icon: Award,
    title: "GDPR Compliant",
    description: "Privacy-first approach",
  },
];

const TrustBadges = () => {
  const isGuarded = process.env.NEXT_PUBLIC_RELEASE_GUARD === "true";
  const badges = isGuarded
    ? allBadges.filter((b) => !b.releaseOnly)
    : allBadges;

  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container">
        <div className={`grid grid-cols-2 gap-6 md:grid-cols-3 ${isGuarded ? "lg:grid-cols-4" : "lg:grid-cols-6"}`}>
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {badge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
