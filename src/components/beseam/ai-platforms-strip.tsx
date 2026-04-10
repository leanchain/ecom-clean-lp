"use client";

import Image from "next/image";

import { motion } from "framer-motion";

const platforms = [
  { name: "ChatGPT", logo: "/images/ai-platforms/chatgpt.svg" },
  { name: "Google", logo: "/images/ai-platforms/google.svg" },
  { name: "Gemini", logo: "/images/ai-platforms/gemini.svg" },
  { name: "AI Mode", logo: "/images/ai-platforms/ai-mode.svg" },
  { name: "Perplexity", logo: "/images/ai-platforms/perplexity.svg" },
];

export default function AiPlatformsStrip() {
  return (
    <section className="border-y bg-[var(--card)] px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          The AI shopping surfaces merchants care about first
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5"
        >
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
                <Image
                  alt={platform.name}
                  className="h-full w-full object-contain"
                  src={platform.logo}
                  width={56}
                  height={56}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {platform.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
