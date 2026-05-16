import { notFound } from "next/navigation";
import { GuidePage } from "@/components/seo/guide-page";
import { getGuidePageByPath, guidePageEntries } from "@/components/seo/guide-pages";
import { getArticleMetadata } from "@/components/seo/metadata";

type GuideSlugPageProps = {
  params: Promise<{ guideSlug: string }>;
};

export function generateStaticParams() {
  return guidePageEntries.map((page) => ({ guideSlug: page.path.split("/").at(-1) ?? "" }));
}

export async function generateMetadata({ params }: GuideSlugPageProps) {
  const { guideSlug } = await params;
  const page = getGuidePageByPath(`/panduan/${guideSlug}`);

  if (!page) return {};

  return getArticleMetadata(page);
}

export default async function GuideSlugPage({ params }: GuideSlugPageProps) {
  const { guideSlug } = await params;
  const page = getGuidePageByPath(`/panduan/${guideSlug}`);

  if (!page) notFound();

  return <GuidePage page={page} />;
}
