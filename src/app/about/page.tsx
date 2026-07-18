import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Linkedin, Mail } from "lucide-react";

import BookReviewCta from "@/components/beseam/book-review-cta";
import Reveal from "@/components/beseam/reveal";
import TeamsSection from "@/components/beseam/teams-section";

export const metadata = {
  title: { absolute: "About | Beseam" },
  description:
    "Beseam is store health for Shopify — built by an engineer who spent his career making large systems measurable and reliable, now applied to Shopify discoverability and purchase health. Book a Store Health Review.",
};

const ADVISORS = [
  {
    name: "Bettina Gimenez",
    role: "E-commerce expert & DTC founder",
    image: "/images/about/bettina-gimenez.jpg",
    bio: "Co-Founder of Dancing Queens and e-commerce examination expert at Handelsverband.swiss. Former Co-Managing Director at HelloFresh Suisse.",
    linkedin: "https://www.linkedin.com/in/bettina-gimenez-a6315655/",
  },
  {
    name: "Fabrizio Metzler",
    role: "Founder & entrepreneur",
    image: "/images/about/fabrizio-metzler.jpg",
    bio: "Founder of OLEYVO. Former Key Partner Growth Manager at Too Good To Go. Lecturer in start-up and entrepreneurship at STF.",
    linkedin: "https://www.linkedin.com/in/fabrizio-metzler/",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero — why Beseam exists */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <Reveal>
            <p className="editorial-eyebrow text-primary">Why we exist</p>
            <h1 className="editorial-hero mt-5 text-ink">
              Store health should be something you can measure not something you
              hope for.
            </h1>
            <p className="editorial-body mt-6 max-w-2xl text-foreground">
              Beseam makes Shopify stores measurable, showing the moment
              discoverability slips or the purchase experience degrades, with
              the evidence to act.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Founder story — qualitative framing, real background, no inflated metrics */}
      <section className="border-t border-rule bg-surface">
        <div className="section-pad mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
            <Reveal>
              <p className="editorial-eyebrow text-primary">The founder</p>
              <h2 className="editorial-heading mt-5 text-ink">
                Built with the reliability mindset behind large-scale systems.
              </h2>
              <div className="editorial-body mt-6 space-y-5 text-foreground">
                <p>
                  Beseam was founded by Pankaj Kumar, a former Google and Amazon
                  engineer focused on measurement, reliability and data
                  infrastructure.
                </p>
                <p>
                  A Shopify store is the same problem at another scale: it can
                  look fine on the surface while its technical discoverability
                  quietly erodes or its purchase experience degrades.
                </p>
                <p>
                  He founded Beseam after watching too many changes ship blind,
                  to give teams the evidence to see what changed, why it
                  matters, and how to verify the fix.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href="https://linkedin.com/in/pankaj4u4m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
                <a
                  href="mailto:pankaj@beseam.com"
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  pankaj@beseam.com
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="overflow-hidden rounded-2xl border border-rule bg-surface">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/about/pankaj-kumar.jpg"
                    alt="Pankaj Kumar, founder of Beseam"
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <figcaption className="border-t border-rule px-5 py-4">
                  <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
                    Pankaj Kumar
                  </p>
                  <p className="editorial-label mt-1 text-muted-foreground">
                    Founder, Beseam
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Advisors — real people, preserved and re-skinned */}
      <section className="border-t border-rule bg-surface">
        <div className="section-pad mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <p className="editorial-eyebrow text-primary">Advisors</p>
            <h2 className="editorial-heading mt-5 text-ink">
              People who help keep Beseam grounded in real commerce.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-2">
            {ADVISORS.map((advisor, i) => (
              <Reveal
                key={advisor.name}
                delay={i * 0.08}
                className="flex h-full gap-5 bg-panel p-7 md:p-8"
              >
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] shrink-0 rounded-xl border border-rule object-cover"
                />
                <div className="min-w-0">
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink">
                    {advisor.name}
                  </h3>
                  <p className="editorial-label mt-1 text-primary">
                    {advisor.role}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-foreground">
                    {advisor.bio}
                  </p>
                  <a
                    href={advisor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How Beseam works with your team — reuse the homepage teams section */}
      <TeamsSection />

      {/* 5. Closing CTA — the single conversion, contact preserved */}
      <section className="border-t border-rule bg-surface">
        <div className="section-pad mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="editorial-eyebrow text-primary">Talk to us</p>
            <h2 className="editorial-heading mt-5 text-ink">
              See what Beseam finds in your store.
            </h2>
            <p className="editorial-body mx-auto mt-5 max-w-2xl text-foreground">
              A Store Health Review looks at your real Shopify setup, your
              monitoring coverage and the issues you most need to catch.
            </p>
            <div className="mt-8 flex justify-center">
              <BookReviewCta variant="primary" location="about_footer" />
            </div>
            <p className="mt-6 text-[14px] text-muted-foreground">
              Questions first?{" "}
              <a
                href="mailto:pankaj@beseam.com"
                className="font-semibold text-primary hover:underline"
              >
                pankaj@beseam.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
