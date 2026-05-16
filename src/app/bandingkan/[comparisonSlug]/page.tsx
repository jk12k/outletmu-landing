import { notFound } from "next/navigation";
import { getSeoMetadata } from "@/components/seo/metadata";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPageByPath, seoPageEntries } from "@/components/seo/seo-pages";

type ComparisonPageProps = {
  params: Promise<{ comparisonSlug: string }>;
};

export function generateStaticParams() {
  return seoPageEntries
    .filter((page) => page.path.startsWith("/bandingkan/"))
    .map((page) => ({ comparisonSlug: page.path.split("/").at(-1) ?? "" }));
}

export async function generateMetadata({ params }: ComparisonPageProps) {
  const { comparisonSlug } = await params;
  const page = getSeoPageByPath(`/bandingkan/${comparisonSlug}`);

  if (!page) return {};

  return getSeoMetadata(page);
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { comparisonSlug } = await params;
  const page = getSeoPageByPath(`/bandingkan/${comparisonSlug}`);

  if (!page) notFound();

  return <SeoLandingPage page={page} />;
}
