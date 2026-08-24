"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  MessageSquareText,
  BarChart3,
} from "lucide-react";

const timeline = [
  {
    icon: ShieldCheck,
    title: "Revenue Guard",
    eta: "NOW",
    etaStyle: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    dotStyle: "bg-emerald-500",
    description:
      "24/7 detection of broken checkouts, failed payments, frozen UI, wrong prices - with instant alerts and revenue impact in euros.",
    active: true,
  },
  {
    icon: Target,
    title: "Buyer Intent Detection",
    eta: "Q3 2026",
    etaStyle: "bg-primary/10 text-primary border-primary/30",
    dotStyle: "bg-primary",
    description:
      "Know which visitors are about to buy - and which ones are about to leave. Trigger the right offer at the right moment.",
    active: false,
  },
  {
    icon: MessageSquareText,
    title: "Smart Engagement",
    eta: "Q4 2026",
    etaStyle: "bg-primary/10 text-primary border-primary/30",
    dotStyle: "bg-white/20",
    description:
      "Automatically re-engage high-intent visitors who hit a broken flow. Turn lost sessions into recovered revenue.",
    active: false,
  },
  {
    icon: BarChart3,
    title: "Revenue Intelligence",
    eta: "Q4 2026",
    etaStyle: "bg-primary/10 text-primary border-primary/30",
    dotStyle: "bg-white/20",
    description:
      "A live dashboard of everything affecting your revenue - broken flows, missed opportunities, recovery rate, and trend forecasts.",
    active: false,
  },
];

export default function PlatformVisionSection() {
  return (
    <section className="bg-[#0D0D0D] px-4 py-20 sm:px-6 md:py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            What&apos;s Next
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-linear-to-r from-secondary to-primary bg-clip-text text-transparent">
              Today we guard your revenue.
            </span>
            <span className="text-white/80"> Tomorrow we grow it.</span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-white/60">
            Built on the same real-time session data that catches what breaks -             we&apos;re building the layer that turns protection into growth.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative"
        >
          {/* Spine line - desktop only */}
          <div className="absolute left-5 top-6 hidden h-[calc(100%-3rem)] w-px bg-linear-to-b from-emerald-500/60 via-primary/30 to-white/5 md:block" />

          <div className="flex flex-col gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
                className={`relative flex gap-5 rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${
                  item.active
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-white/10 bg-white/[0.07] hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {/* Timeline dot */}
                <div className="relative z-10 mt-0.5 hidden shrink-0 flex-col items-center md:flex">
                  <div
                    className={`h-2.5 w-2.5 rounded-full border-2 border-[#0D0D0D] ${item.dotStyle}`}
                  />
                </div>

                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    item.active
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-white/10 bg-white/5 text-white/50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3
                      className={`text-base font-bold ${item.active ? "text-white" : "text-white/80"}`}
                    >
                      {item.title}
                    </h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${item.etaStyle}`}
                    >
                      {item.eta}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${item.active ? "text-white/60" : "text-white/40"}`}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center text-sm text-white/30"
        >
          Revenue guard first. Revenue generation next.
        </motion.p>
      </div>
    </section>
  );
}
