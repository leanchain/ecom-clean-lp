import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, ExternalLink, Shield, TrendingUp, Zap, Server, Database, ShoppingBag, GraduationCap } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "About Beseam | Our Founder & Advisors",
  description: "Beseam is an AI-native PDP ops layer built by veterans from Google and Amazon to protect and grow e-commerce revenue.",
};

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-20 pb-20 pt-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden container text-center">
        <div className="absolute -left-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />
        <Badge variant="outline" className="mb-4 rounded-full border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Our Story
        </Badge>
        <h1 className="font-heading mb-6 text-4xl tracking-tight md:text-6xl">
          Scale-Grade Reliability <br />
          <span className="text-primary italic">for Modern Commerce</span>
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
              <h2 className="font-heading mb-2 text-3xl tracking-tight md:text-4xl">Pankaj Kumar</h2>
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
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .907 5.387.907 12s4.96 12 11.573 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
                </svg>
                <span className="text-sm font-semibold">10yr Google Veteran</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border p-4 bg-muted/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#FF9900" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 12c0 5.12 3.58 9.43 8.57 10.95-.42-2.15-1.05-5.04 1.92-6.95 2.2-1.51 5.18-1.15 5.18-1.15s-.85.68-1.54 1.43c-.69.75-1.27 1.83-1.27 1.83s.57-.3 1.15-.3c.58 0 1.15.3 1.15.3s-.47-.65-.7-1.21c-.23-.56-.79-1.71-.79-1.71s.92.3 1.84-.15c.92-.45 1.38-1.5 1.38-1.5s-.68 2.1-1.61 2.4c-.93.3-1.84.15-1.84.15s.23-1.65-.77-2.55c-1-.9-2.41-.6-2.41-.6s-.31 1.5.15 2.1c.46.6 1.23.9 1.23.9s-.38-1.35-.38-2.25c0-.9.54-1.95 1.84-1.95s2.26 1.2 2.26 2.85c0 1.65-.92 3.16-1.38 3.16s-1.23-.9-1.23-.9-.46 1.35.15 2.47c.61 1.12 1.61 1.43 1.61 1.43s-.92-2.55-.92-4.5c0-1.95.77-3.31.77-3.31s1.38.15 2.26-.45c.88-.6 1.38-1.5 1.38-1.5s-.61 1.8.23 3.31c.84 1.51 2.03 1.65 2.03 1.65s-.69-2.85-1.84-4.5c-1.15-1.65-2.72-1.35-2.72-1.35s.23 1.8-1.15 2.78c-1.38.98-2.72.68-2.72.68s.69-2.55.69-3.6c0-1.05-.54-1.95-1.84-1.95-1.3 0-2.26 1.05-2.26 2.25 0 .9.46 1.65.46 1.65s-.77-1.35-.77-2.1c0-.75.46-1.43 1.38-1.43.92 0 1.84.75 1.84 2.1 0 1.35-1.15 2.55-1.15 2.55s.46-1.8.46-2.85c0-1.05-.69-1.8-1.84-1.8-1.15 0-2.41 1.05-2.41 2.55 0 1.5 1.23 2.63 1.23 2.63s-.54-1.35-.54-2.1c0-.75.69-1.43 1.61-1.43.92 0 2.03.68 2.03 2.25 0 1.57-1.23 3.01-1.23 3.01s.69-1.95.69-3.16c0-1.21-.77-1.95-1.84-1.95-1.07 0-2.26.98-2.26 2.55 0 1.57.92 2.63.92 2.63s-.46-1.2-.46-1.95c0-.75.61-1.43 1.61-1.43 1 0 2.03.6 2.03 1.8 0 1.2-.69 2.25-.69 2.25s.23-.9.23-1.65c0-.75-.38-1.43-1.38-1.43-1 0-1.84.6-1.84 1.8 0 1.2.61 2.25.61 2.25s-.23-.9-.23-1.65c0-.75.54-1.43 1.61-1.43 1.07 0 1.84.75 1.84 1.8 0 1.05-.69 2.1-.69 2.1s.38-.75.38-1.5c0-.75-.46-1.35-1.38-1.35-.92 0-1.61.6-1.61 1.65 0 1.05.61 2.1.61 2.1s-.31-.75-.31-1.5c0-.75.46-1.43 1.46-1.43 1 0 1.84.6 1.84 1.8z"/>
                </svg>
                <span className="text-sm font-semibold">Amazon Alumni</span>
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
            <h2 className="font-heading mb-4 text-3xl tracking-tight">The Beseam Core Loop</h2>
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

      {/* Advisors Section - Compact Grid Layout */}
      <section className="container py-12">
        <div className="mb-8 text-center">
          <h2 className="font-heading mb-2 text-2xl tracking-tight md:text-3xl">Our Advisors</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Strategic advisors guiding our vision
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Bettina Gimenez */}
          <div className="rounded-2xl border bg-muted/20 p-6">
            <div className="flex gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image 
                  src="/images/about/bettina-gimenez.jpg" 
                  alt="Bettina Gimenez" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Badge variant="secondary" className="mb-1 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider">
                  Advisor
                </Badge>
                <h3 className="font-heading text-lg font-bold truncate">Bettina Gimenez</h3>
                <p className="text-sm font-medium text-secondary truncate">E-commerce Expert & DTC Founder</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              Co-Founder of Dancing Queens & E-commerce Examination Expert at Handelsverband.swiss. 
              Former Co-Managing Director at HelloFresh Suisse.
            </p>
            <Button variant="link" asChild className="mt-2 h-auto p-0 text-secondary">
              <Link href="https://www.linkedin.com/in/bettina-gimenez-a6315655/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-1 h-3 w-3" />
                LinkedIn
              </Link>
            </Button>
          </div>

          {/* Fabrizio Metzler */}
          <div className="rounded-2xl border bg-muted/20 p-6">
            <div className="flex gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image 
                  src="/images/about/fabrizio-metzler.jpg" 
                  alt="Fabrizio Metzler" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Badge variant="secondary" className="mb-1 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider">
                  Advisor
                </Badge>
                <h3 className="font-heading text-lg font-bold truncate">Fabrizio Metzler</h3>
                <p className="text-sm font-medium text-secondary truncate">Founder & Entrepreneur</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              Founder of OLEYVO. Former Key Partner Growth Manager at Too Good To Go. 
              Lecturer in Start-up & Entrepreneurship at STF.
            </p>
            <Button variant="link" asChild className="mt-2 h-auto p-0 text-secondary">
              <Link href="https://www.linkedin.com/in/fabrizio-metzler/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-1 h-3 w-3" />
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Detailed History Cards */}
      <section className="container bg-card/50 rounded-3xl border p-8 md:p-12">
        <h2 className="font-heading mb-12 text-center text-3xl tracking-tight">Deep Technical Roots</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Google Card */}
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-blue-600/5 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">YouTube Data & Infrastructure</CardTitle>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .907 5.387.907 12s4.96 12 11.573 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
                </svg>
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
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#FF9900" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 12c0 5.12 3.58 9.43 8.57 10.95-.42-2.15-1.05-5.04 1.92-6.95 2.2-1.51 5.18-1.15 5.18-1.15s-.85.68-1.54 1.43c-.69.75-1.27 1.83-1.27 1.83s.57-.3 1.15-.3c.58 0 1.15.3 1.15.3s-.47-.65-.7-1.21c-.23-.56-.79-1.71-.79-1.71s.92.3 1.84-.15c.92-.45 1.38-1.5 1.38-1.5s-.68 2.1-1.61 2.4c-.93.3-1.84.15-1.84.15s.23-1.65-.77-2.55c-1-.9-2.41-.6-2.41-.6s-.31 1.5.15 2.1c.46.6 1.23.9 1.23.9s-.38-1.35-.38-2.25c0-.9.54-1.95 1.84-1.95s2.26 1.2 2.26 2.85c0 1.65-.92 3.16-1.38 3.16s-1.23-.9-1.23-.9-.46 1.35.15 2.47c.61 1.12 1.61 1.43 1.61 1.43s-.92-2.55-.92-4.5c0-1.95.77-3.31.77-3.31s1.38.15 2.26-.45c.88-.6 1.38-1.5 1.38-1.5s-.61 1.8.23 3.31c.84 1.51 2.03 1.65 2.03 1.65s-.69-2.85-1.84-4.5c-1.15-1.65-2.72-1.35-2.72-1.35s.23 1.8-1.15 2.78c-1.38.98-2.72.68-2.72.68s.69-2.55.69-3.6c0-1.05-.54-1.95-1.84-1.95-1.3 0-2.26 1.05-2.26 2.25 0 .9.46 1.65.46 1.65s-.77-1.35-.77-2.1c0-.75.46-1.43 1.38-1.43.92 0 1.84.75 1.84 2.1 0 1.35-1.15 2.55-1.15 2.55s.46-1.8.46-2.85c0-1.05-.69-1.8-1.84-1.8-1.15 0-2.41 1.05-2.41 2.55 0 1.5 1.23 2.63 1.23 2.63s-.54-1.35-.54-2.1c0-.75.69-1.43 1.61-1.43.92 0 2.03.68 2.03 2.25 0 1.57-1.23 3.01-1.23 3.01s.69-1.95.69-3.16c0-1.21-.77-1.95-1.84-1.95-1.07 0-2.26.98-2.26 2.55 0 1.57.92 2.63.92 2.63s-.46-1.2-.46-1.95c0-.75.61-1.43 1.61-1.43 1 0 2.03.6 2.03 1.8 0 1.2-.69 2.25-.69 2.25s.23-.9.23-1.65c0-.75-.46-1.35-1.38-1.35-.92 0-1.61.6-1.61 1.65 0 1.05.61 2.1.61 2.1s-.31-.75-.31-1.5c0-.75.46-1.43 1.46-1.43 1 0 1.84.6 1.84 1.8z"/>
                </svg>
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
        <div className="relative overflow-hidden rounded-[2.5rem] border bg-muted/10 px-8 py-16">
          <div className="absolute -left-24 top-1/2 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 top-1/2 z-0 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="font-heading mb-6 text-3xl tracking-tight md:text-5xl">
              Get found. Convert more.{" "}
              <span className="text-primary italic">Deploy without the risk.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-primary/20">
                <a href="https://app.beseam.com/analyze" target="_blank" rel="noopener noreferrer">
                  Start Free Audit
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-base font-bold border-2" asChild>
                <Link href="/demo">Talk to the Team</Link>
              </Button>
            </div>
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
