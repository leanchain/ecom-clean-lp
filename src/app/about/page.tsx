import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, ExternalLink, Shield, TrendingUp, Zap, Server, Database, ShoppingBag, GraduationCap } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "About Beseam | Our Founder & Advisor",
  description: "Beseam is an AI-native PDP ops layer built by veterans from Google and Amazon to protect and grow e-commerce revenue.",
};

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-20 pb-20 pt-32">
      {/* Hero Section */}
      <section className="container text-center">
        <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-primary">
          Our Story
        </Badge>
        <h1 className="font-heading mb-6 text-4xl font-bold md:text-6xl">
          Scale-Grade Reliability <br />
          <span className="text-primary">for Modern Commerce</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed">
          Beseam is an AI-native PDP ops layer. We help brands improve product pages for 
          AI discovery and human conversion, while adding the observability needed to ensure 
          changes don&apos;t quietly leak revenue.
        </p>
      </section>

      {/* Founder Section */}
      <section className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading mb-2 text-3xl font-bold md:text-4xl">Pankaj Kumar</h2>
              <p className="text-xl font-medium text-primary">Founder & CEO, Beseam</p>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Pankaj spent over a decade building some of the world&apos;s most complex data 
                and personalization pipelines. At <strong>Google (YouTube)</strong>, he led teams 
                responsible for processing global traffic—architecting systems that handled 
                <strong> 10+ PiB/day</strong> and supported <strong>400M+ QPS</strong>.
              </p>
              <p>
                From co-developing YouTube&apos;s real-time view-count feature to building ultra-low 
                latency distributed caches, his career has been defined by the pursuit of 
                reliability at massive scale. 
              </p>
              <p>
                Now, he&apos;s applying that same measurement mindset to e-commerce. After seeing 
                how often PDP changes are made blindly, he founded Beseam to provide 
                brands with the guardrails they need to innovate safely.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 rounded-xl border p-4 bg-muted/20">
                <Server className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">10yr Google/Amazon Veteran</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border p-4 bg-muted/20">
                <Database className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold">Scale-Grade Infrastructure</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full px-8">
                <Link href="https://linkedin.com/in/pankaj4u4m" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full px-8">
                <Link href="mailto:pankaj@beseam.com">
                  <Mail className="mr-2 h-4 w-4" />
                  pankaj@beseam.com
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted lg:h-[600px] border shadow-xl">
            <Image 
              src="/images/about/pankaj-kumar.jpg" 
              alt="Pankaj Kumar" 
              fill 
              className="object-cover object-center"
              priority
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-black/70 p-6 backdrop-blur-md border border-white/20">
              <p className="text-sm italic font-medium text-white text-center">
                &quot;Bringing the same obsession with reliability and measurement that powers 
                the world&apos;s largest platforms to protect your store&apos;s revenue.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Loop Section */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-heading mb-4 text-3xl font-bold">The Beseam Core Loop</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We apply a closed-loop engineering approach to Product Detail Pages.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["Audit", "Enhance", "Safe Deploy", "Detect", "Explain", "Rollback/Fix", "Learn"].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg">
                  {step}
                </div>
                {i < 6 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor Section - Scaled down to differentiate from Founder */}
      <section className="container py-12">
        <div className="mx-auto max-w-5xl rounded-3xl border bg-muted/20 p-8 md:p-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted lg:h-[320px] shadow-lg">
              <Image 
                src="/images/about/bettina-gimenez.jpg" 
                alt="Bettina Gimenez" 
                fill 
                className="object-cover object-center"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2 rounded-full px-3 py-0.5 text-[10px] uppercase tracking-wider">
                  Strategic Advisor
                </Badge>
                <h2 className="font-heading mb-1 text-2xl font-bold md:text-3xl">Bettina Gimenez</h2>
                <p className="text-lg font-medium text-secondary">E-commerce Expert & DTC Founder</p>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Bettina brings over 15 years of deep operational and strategic e-commerce experience. 
                  As the <strong>Co-Founder of Dancing Queens</strong> and an <strong>E-commerce Examination Expert</strong> at Handelsverband.swiss, 
                  she bridges the gap between high-scale tech and high-growth commerce.
                </p>
                <p>
                  Her previous executive leadership roles include <strong>Co-Managing Director at HelloFresh Suisse</strong> and 
                  Business Owner at <strong>Zürcher Kantonalbank</strong>. She ensures Beseam remains 
                  laser-focused on the real-world needs of DTC founders and growth teams.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Button variant="link" asChild className="h-auto p-0 text-secondary hover:text-secondary/80">
                  <Link href="https://www.linkedin.com/in/bettina-gimenez-a6315655/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    View LinkedIn
                  </Link>
                </Button>
                
                <div className="flex gap-4 border-l pl-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <ShoppingBag className="h-4 w-4 text-secondary" />
                    <span>DTC Operator</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <GraduationCap className="h-4 w-4 text-secondary" />
                    <span>Handelsverband Expert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed History Cards */}
      <section className="container bg-card/50 rounded-3xl border p-8 md:p-12">
        <h2 className="font-heading mb-12 text-center text-3xl font-bold">Deep Technical Roots</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Google Card */}
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-blue-600/5 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">YouTube Data & Infrastructure</CardTitle>
                <Badge variant="outline" className="border-blue-200 text-blue-700">Google</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 text-sm text-muted-foreground space-y-3">
              <p>• Architected metadata merge systems processing <strong>10+ PiB/day</strong>.</p>
              <p>• Built distributed caches reducing latency from 500µs to <strong>10µs</strong>.</p>
              <p>• Designed log-based models reducing infrastructure costs by <strong>90%</strong>.</p>
              <p>• Led real-time view-count feature (latency down from 4hrs to 10s).</p>
            </CardContent>
          </Card>

          {/* Amazon Card */}
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-orange-600/5 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Next-Gen Transportation</CardTitle>
                <Badge variant="outline" className="border-orange-200 text-orange-700">Amazon</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 text-sm text-muted-foreground space-y-3">
              <p>• Developed scalable distributed systems for package sortation.</p>
              <p>• Built heuristics for labor management and defect detection.</p>
              <p>• Leveraged AWS at massive scale for transportation logistics.</p>
              <p>• Reduced package sorting costs by <strong>500%</strong>.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container text-center">
        <div className="rounded-3xl bg-primary px-8 py-16 text-primary-foreground shadow-2xl">
          <h2 className="font-heading mb-6 text-3xl font-bold md:text-5xl">
            Ready to upgrade your PDP ops?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="rounded-full px-10">
              <Link href="https://app.beseam.com/register">
                Start Free Audit
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-transparent px-10 text-white hover:bg-white/10" asChild>
              <Link href="/demo">Talk to the Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default AboutPage;
