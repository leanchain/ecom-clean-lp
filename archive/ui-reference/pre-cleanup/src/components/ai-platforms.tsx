"use client";

import Image from "next/image";

const platforms = [
  {
    name: "ChatGPT",
    logo: "/images/ai-platforms/chatgpt.svg",
  },
  {
    name: "Claude",
    logo: "/images/ai-platforms/claude.svg",
  },
  {
    name: "Perplexity",
    logo: "/images/ai-platforms/perplexity.svg",
  },
  {
    name: "Gemini",
    logo: "/images/ai-platforms/gemini.svg",
  },
  {
    name: "AI Overviews",
    logo: "/images/ai-platforms/google.svg",
  },
  {
    name: "AI Mode",
    logo: "/images/ai-platforms/ai-mode.svg",
  },
  {
    name: "Meta AI",
    logo: "/images/ai-platforms/meta.svg",
  },
];

const AiPlatforms = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h3 className="text-muted-foreground mb-8 text-center text-sm font-semibold uppercase tracking-wider">
          We Help Your Product Rank Higher In
        </h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-7">
          {platforms.map((platform) => (
            <div key={platform.name} className="space-y-2 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center">
                <Image
                  alt={platform.name}
                  className="h-full w-full object-contain"
                  src={platform.logo}
                  width={64}
                  height={64}
                />
              </div>
              <h3 className="text-foreground text-sm font-semibold">
                {platform.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { AiPlatforms };
