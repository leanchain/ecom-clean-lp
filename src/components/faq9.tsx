import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ComparisonTable } from "@/components/comparison-table";

const faqs = [
  {
    question:
      "What is “AI Search Optimization” and why does it matter for my product pages?",
    answer: (
      <div className="space-y-3 text-sm md:text-base">
        <p>
          AI search optimization is the process of making your products
          discoverable and recommendable inside AI engines like ChatGPT,
          Perplexity, Gemini, Claude, Google AI Overviews, and upcoming “AI
          Mode” search layers.
        </p>
        <p>
          These engines don’t rely on keywords or backlinks. They rely on
          structured clarity: images, videos, deep product context, FAQs,
          comparisons, benefits, and schema.
        </p>
        <p>
          If your PDP isn’t complete enough for an AI to confidently answer a
          shopper’s question, your product simply won’t be shown. AI Search
          Optimization makes sure it is.
        </p>
      </div>
    ),
  },
  {
    question: "What’s the difference between SEO, GEO, AEO, and AIO?",
    answer: (
      <div className="space-y-3 text-sm md:text-base">
        <ul className="space-y-1">
          <li>
            <span className="font-semibold">SEO →</span> Traditional search
            engines (keywords, backlinks, metadata).
          </li>
          <li>
            <span className="font-semibold">
              GEO (Generative Engine Optimization) →
            </span>{" "}
            Optimizing for generative search engines like ChatGPT and
            Perplexity.
          </li>
          <li>
            <span className="font-semibold">
              AEO (Answer Engine Optimization) →
            </span>{" "}
            Making your content structured enough to be chosen as the answer in
            AI-powered results.
          </li>
          <li>
            <span className="font-semibold">AIO (AI Optimization) →</span>{" "}
            Umbrella term for optimizing content for AI and with AI.
          </li>
        </ul>
        <p>
          Bottom line: AI engines don’t rank keywords—they rank clarity,
          completeness, and helpfulness. Beseam builds PDP content that scores
          extremely high on those signals.
        </p>
      </div>
    ),
  },
  {
    question: "Why do AI engines prefer deep narrative PDPs?",
    answer: (
      <div className="space-y-3 text-sm md:text-base">
        <p>
          Because large language models need rich context to make confident
          product recommendations.
        </p>
        <p>They have to understand things like:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>What the product is.</li>
          <li>Who it’s for.</li>
          <li>How it’s used.</li>
          <li>What problems it solves.</li>
          <li>How it compares to alternatives.</li>
          <li>Why a shopper should choose it.</li>
        </ul>
        <p>Typical PDPs only provide 10–20% of this.</p>
        <p>
          A deep narrative PDP gives AI engines the full semantic picture—
          benefits, objections, FAQs, comparisons, ingredients/materials, use
          cases, fitting notes, and instructions. The richer the context, the
          more confident the engine is to select your product as the answer.
        </p>
      </div>
    ),
  },
  {
    question: "How does Beseam improve my AI visibility score?",
    answer: (
      <div className="space-y-3 text-sm md:text-base">
        <p>
          Beseam automatically generates and structures everything AI needs:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            On-brand packshots, lifestyle images, model shots, and videos
            tailored to each product.
          </li>
          <li>
            LLM-optimized product narratives with benefits, objections,
            comparisons, FAQs, “best for”, and use cases.
          </li>
          <li>Complete schema.org structured data for every PDP.</li>
          <li>Category-level context and smart cross-linking.</li>
          <li>PDP layouts built specifically for AI-first engines.</li>
        </ul>
        <p>
          This combination gives AI engines maximum confidence to showcase your
          product when customers ask buying questions.
        </p>
      </div>
    ),
  },
  {
    question: "How does the AI Search Score work?",
    answer: (
      <div className="space-y-3 text-sm md:text-base">
        <p>
          The AI Search Score measures how likely your product is to be
          recommended by AI engines.
        </p>
        <p>It evaluates every PDP across six key dimensions:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <span className="font-semibold">Visual Completeness</span>{" "}
            (packshots, on-model, lifestyle, detail, in-use, video).
          </li>
          <li>
            <span className="font-semibold">Narrative Depth</span> (benefits,
            objections, FAQs, use cases, comparisons).
          </li>
          <li>
            <span className="font-semibold">Clarity &amp; Structure</span>{" "}
            (readability, hierarchy, clear claims, scannability).
          </li>
          <li>
            <span className="font-semibold">AI-Friendly Format</span>{" "}
            (schema.org, clean attributes, structured sections).
          </li>
          <li>
            <span className="font-semibold">Brand Consistency</span> (styling,
            tone, lighting, colors).
          </li>
          <li>
            <span className="font-semibold">Relevance for AI Search</span> (does
            the PDP answer real shopper questions?).
          </li>
        </ul>
        <p>
          The higher your score across these dimensions, the more often AI
          engines will surface your product as the recommended answer inside
          ChatGPT, Gemini, Perplexity, AI Overviews, and other AI search
          platforms.
        </p>
      </div>
    ),
  },
  {
    question: "Why do images matter so much for AI visibility?",
    answer: (
      <div className="space-y-3 text-sm md:text-base">
        <p>
          AI engines now evaluate multi-modal signals, not just text. Images
          dramatically improve a product’s visibility because they tell the
          model things like:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>The category (“this is a dress”).</li>
          <li>The style (“flowy, summer, A-line”).</li>
          <li>The use case (“casual daywear”, “gym performance”, “hiking”).</li>
          <li>The quality (materials, details, finishes).</li>
          <li>The fit (on-model shots, body representation).</li>
        </ul>
        <p>
          Most PDPs have too few images, inconsistent style, or lack context
          (“in use” shots).
        </p>
        <p>AI engines tend to boost products with:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Clean packshots.</li>
          <li>Model shots.</li>
          <li>Lifestyle shots.</li>
          <li>Product-in-use moments.</li>
          <li>Detail/macro shots.</li>
        </ul>
        <p>
          A single studio photoshoot can’t practically scale this across
          thousands of SKUs. Beseam generates consistent, on-brand, context-rich
          images and video that match what AI search engines look for, so your
          catalog feels complete to both shoppers and models.
        </p>
      </div>
    ),
  },
  {
    question: "What does a good AI-ready PDP look like?",
    answer: (
      <div className="space-y-3 text-sm md:text-base">
        <p>
          An AI-ready PDP is complete, structured, and multi-modal. It combines
          strong visuals, deep product text, and an AI-friendly format.
        </p>
        <div>
          <p className="font-semibold">Images &amp; Video</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Packshot.</li>
            <li>On-model shot.</li>
            <li>Lifestyle context.</li>
            <li>Product-in-use.</li>
            <li>Detail/macro shots.</li>
            <li>Short video clip or 360° view.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Deep Product Text</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Clear benefits and problems solved.</li>
            <li>Use cases and real scenarios.</li>
            <li>Comparisons and alternatives.</li>
            <li>“Best for” segmentation.</li>
            <li>FAQs and objections.</li>
            <li>Materials/ingredients.</li>
            <li>Instructions or care guidelines.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">AI-Friendly Structure</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Schema.org and clean metadata.</li>
            <li>Consistent brand tone.</li>
            <li>Category-level context.</li>
            <li>Clear alignment between image, copy, and video.</li>
          </ul>
        </div>
        <p>
          This is the kind of PDP format AI engines prefer because it gives them
          a complete, accurate understanding of your product.
        </p>
      </div>
    ),
  },
  {
    question:
      "Do AI engines really reward complete PDPs that include FAQs, comparisons, and “best for” sections?",
    answer: (
      <div className="space-y-3 text-sm md:text-base">
        <p>
          Yes. Modern AI engines surface products that feel helpful and
          complete, not minimal.
        </p>
        <p>
          Extra structured sections—FAQs, use cases, comparisons, “best for”,
          objections, instructions, model shots, in-use videos, and more—give
          LLMs the context they need to confidently recommend one product over
          another.
        </p>
        <p>
          Beseam builds all of these sections automatically, integrated with the
          merchant’s brandbook and product attributes.
        </p>
      </div>
    ),
  },
  {
    question: "How does Beseam PDP AI compare to traditional product pages?",
    answer: (
      <div className="space-y-4 text-sm md:text-base">
        <p>
          Beseam PDP AI analyses your existing product content and online search
          behavior, and creates deep context with narrative product page text,
          images, and video content engineered for both AI search and human
          conversion. This deep context allows AIs to address the long tail of
          personalised needs inside AI search and results in your product
          getting recommended 3–5× more often, driving impressions, clicks, and
          sales.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>AI search visibility and schema-first GEO optimization.</li>
          <li>
            Deep, structured product context powering images, video, and copy.
          </li>
          <li>
            Catalog-wide control so 10–100k+ SKUs stay consistent and up to
            date.
          </li>
        </ul>
        <ComparisonTable />
      </div>
    ),
  },
  {
    question: "How do credits work, and how many generations do I get?",
    answer:
      "Credits are only used for AI generation features in Beseam (e.g., creating images, copy, or variations). Different tools may consume different amounts per generation, and a single request can yield one or multiple results. On monthly plans, credits reset each month. Annual plans receive credits upfront with a yearly reset. Unused credits don’t roll over, though you can purchase optional add‑on credits that are used after your plan’s included credits and expire after up to three years. Downloading your own outputs does not consume credits.",
  },
  {
    question: "Is my subscription automatically renewed?",
    answer:
      "Yes. Your subscription renews automatically at the end of each billing cycle to ensure uninterrupted access. You can cancel anytime in your account settings - your plan will remain active until the end of the current period.",
  },
  {
    question: "How many images or videos can I generate?",
    answer:
      "It depends on your plan and the models you use. Each plan includes an approximate number of generations per month - check the pricing table for model-specific details.",
  },
  {
    question: "How can I purchase extra credits?",
    answer:
      "If you need more credits, you can upgrade your plan for a higher monthly limit or buy credit packs to generate more media without changing your current subscription. Purchased credits are added instantly and can be used across all supported models.",
  },
  {
    question: "Can I change my subscription after purchase?",
    answer:
      "Yes. You can upgrade instantly at any time - the change takes effect immediately, and any credit difference is applied to your account. If you downgrade, the change will apply at the end of your current plan duration, and your existing plan will remain active until then.",
  },
];

const Faq9 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <h2 className="mb-12 mt-2 text-3xl font-bold md:text-6xl">FAQs</h2>
        <Accordion type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-muted mb-2 rounded-3xl border-b-0 px-5 py-2 md:mb-4 transition-colors hover:bg-card data-[state=open]:bg-card"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq9 };
