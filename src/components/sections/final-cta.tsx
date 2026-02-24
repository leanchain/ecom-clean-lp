"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Play, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedBorderButton from "@/components/animated-border-button";

const FinalCta = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-36 bg-primary border-y border-primary-800">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 bg-white/10 blur-[100px] rounded-full" />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading mb-8 text-4xl font-bold text-white md:text-5xl lg:text-7xl tracking-tight drop-shadow-sm">
              Ready to upgrade your PDPs <span className="italic text-white/90">without the risk?</span>
            </h2>

            <p className="mb-12 text-lg text-white/90 md:text-xl max-w-2xl mx-auto leading-relaxed">
              Get a free baseline audit, see your upgrade playbook, and deploy
              improvements with built-in guardrails.
            </p>
          </motion.div>

          {/* Email Capture Form */}
          {!isSubmitted ? (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onSubmit={handleSubmit} 
              className="mb-10 mx-auto max-w-lg"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-16 pl-14 pr-4 rounded-full bg-white border-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-white/30 shadow-2xl transition-all text-lg"
                  />
                </div>
                <AnimatedBorderButton
                  asChild
                  buttonSize="lg"
                  fullWidth={false}
                  borderColor="white"
                  className="h-16 px-10 text-lg font-black bg-secondary text-white hover:bg-secondary/90 shadow-2xl border-none"
                  wrapperClassName="sm:w-auto"
                >
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Starting..." : "Get Started"}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </button>
                </AnimatedBorderButton>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-10 mx-auto max-w-lg rounded-3xl bg-white p-10 shadow-2xl border border-white/20"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="font-heading text-2xl font-bold text-card-foreground">
                  Check your email!
                </p>
                <p className="text-muted-foreground text-lg">
                  We&apos;ve sent your access link to <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Feature Checklist */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {[
              "Free PDP audit",
              "No credit card required",
              "Hands-on onboarding",
              "Built-in rollback",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-white font-semibold"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-inner">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-sm md:text-base tracking-wide">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Alternative CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <span className="text-sm font-semibold text-white/80">
              Prefer a demo?
            </span>
            <Button
              asChild
              variant="link"
              className="text-white font-black text-lg hover:no-underline hover:text-white/80 p-0 h-auto underline underline-offset-4 decoration-white/30"
            >
              <Link href="/demo" className="flex items-center gap-2">
                <Play className="h-5 w-5 fill-current" />
                Book a Demo
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
