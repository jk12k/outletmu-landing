import { notFound } from "next/navigation";
import { getSeoMetadata } from "@/components/seo/metadata";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { ComparisonPage } from "@/components/seo/comparison-page";
import { getComparisonPageBySlug, comparisonPages } from "@/components/seo/comparison-pages";
import { getSeoPageByPath, seoPageEntries } from "@/components/seo/seo-pages";

type ComparisonPageProps = {
  params: Promise<{ comparisonSlug: string }>;
};

const seoComparisonEntries = seoPageEntries.filter((page) =>
  page.path.startsWith("/bandingkan/"),
);

export function generateStaticParams() {
  const slugs = [
    ...comparisonPages.map((page) => page.slug),
    ...seoComparisonEntries.map((page) => page.path.split("/").at(-1) ?? ""),
  ];

  return slugs.map((comparisonSlug) => ({ comparisonSlug }));
}

export async function generateMetadata({ params }: ComparisonPageProps) {
  const { comparisonSlug } = await params;

  const comparison = getComparisonPageBySlug(comparisonSlug);
  if (comparison) {
    return getSeoMetadata({
      path: `/bandingkan/${comparison.slug}`,
      title: comparison.title,
      description: comparison.description,
    });
  }

  const page = getSeoPageByPath(`/bandingkan/${comparisonSlug}`);
  if (!page) return {};

  return getSeoMetadata(page);
}

export default async function ComparisonSlugPage({ params }: ComparisonPageProps) {
  const { comparisonSlug } = await params;

  const comparison = getComparisonPageBySlug(comparisonSlug);
  if (comparison) {
    return <ComparisonPage page={comparison} />;
  }

  const page = getSeoPageByPath(`/bandingkan/${comparisonSlug}`);
  if (!page) notFound();

  return <SeoLandingPage page={page} />;
}
