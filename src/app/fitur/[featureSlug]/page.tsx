import { notFound } from "next/navigation";
import { getSeoMetadata } from "@/components/seo/metadata";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPageByPath, seoPageEntries } from "@/components/seo/seo-pages";

type FeaturePageProps = {
  params: Promise<{ featureSlug: string }>;
};

export function generateStaticParams() {
  return seoPageEntries
    .filter((page) => page.path.startsWith("/fitur/"))
    .map((page) => ({ featureSlug: page.path.split("/").at(-1) ?? "" }));
}

export async function generateMetadata({ params }: FeaturePageProps) {
  const { featureSlug } = await params;
  const page = getSeoPageByPath(`/fitur/${featureSlug}`);

  if (!page) return {};

  return getSeoMetadata(page);
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { featureSlug } = await params;
  const page = getSeoPageByPath(`/fitur/${featureSlug}`);

  if (!page) notFound();

  return <SeoLandingPage page={page} />;
}
