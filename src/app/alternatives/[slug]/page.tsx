import { compileMDX } from "next-mdx-remote/rsc";

import { AlternativeArticle } from "@/components/alternative-article";
import {
  getAllAlternatives,
  getAlternativeBySlug,
  getAlternativeSlugs,
} from "@/lib/alternatives";

export async function generateStaticParams() {
  const slugs = getAlternativeSlugs();
  if (slugs.length === 0) return [{ slug: "coming-soon" }];
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx$/, "") }));
}

export default async function AlternativeDoc({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const slugs = getAlternativeSlugs();
  if (slugs.length === 0) {
    return (
      <section className="hero-padding-margin container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
          <p className="text-lg text-muted-foreground">
            We&apos;re publishing detailed alternative docs across monitoring,
            measurement, and e-commerce ops tools.
          </p>
        </div>
      </section>
    );
  }

  const doc = getAlternativeBySlug(slug);
  const { content } = await compileMDX({
    source: doc.content,
  });

  const categorySlug = (doc.frontmatter.category || "Other")
    .toLowerCase()
    .replace(/\s+/g, "-");
  const comparisonUrl = `/compare#${categorySlug}`;

  const related = getAllAlternatives()
    .filter(
      (d) =>
        d.slug !== doc.slug &&
        (d.frontmatter.category ?? "Other") ===
          (doc.frontmatter.category ?? "Other"),
    )
    .slice(0, 6)
    .map((d) => ({
      slug: d.slug,
      name: d.frontmatter.name,
      description: d.frontmatter.description,
    }));

  return (
    <AlternativeArticle
      name={doc.frontmatter.name}
      description={doc.frontmatter.description}
      website={doc.frontmatter.website}
      docsUrl={doc.frontmatter.docsUrl}
      shopifyAppUrl={doc.frontmatter.shopifyAppUrl}
      category={doc.frontmatter.category}
      comparisonUrl={comparisonUrl}
      pricing={doc.frontmatter.pricing}
      pricingDetails={doc.frontmatter.pricingDetails}
      freeTrial={doc.frontmatter.freeTrial}
      bestFor={doc.frontmatter.bestFor}
      headline={doc.frontmatter.headline}
      subheadline={doc.frontmatter.subheadline}
      whySectionHeading={doc.frontmatter.whySectionHeading}
      whySectionSubheading={doc.frontmatter.whySectionSubheading}
      whySwitch={doc.frontmatter.whySwitch}
      beseamDoesDifferently={doc.frontmatter.beseamDoesDifferently}
      quickComparison={doc.frontmatter.quickComparison}
      strengths={doc.frontmatter.strengths}
      weaknesses={doc.frontmatter.weaknesses}
      whatToLookFor={doc.frontmatter.whatToLookFor}
      getStartedSteps={doc.frontmatter.getStartedSteps}
      faqs={doc.frontmatter.faqs}
      related={related}
    >
      {content}
    </AlternativeArticle>
  );
}
