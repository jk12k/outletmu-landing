import { notFound } from "next/navigation";
import { getSeoMetadata } from "@/components/seo/metadata";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { getSeoPageByPath, seoPageEntries } from "@/components/seo/seo-pages";

type SeoSlugPageProps = {
  params: Promise<{ seoSlug: string }>;
};

const staticSingleSegmentPages = new Set([
  "/website-kasir-otomatis",
  "/pos-kasir-cafe",
  "/qr-order-meja",
  "/menu-digital-cafe",
  "/aplikasi-kasir-restoran",
  "/sistem-kasir-umkm",
]);

export function generateStaticParams() {
  return seoPageEntries
    .filter(
      (page) =>
        page.path.split("/").filter(Boolean).length === 1 &&
        !staticSingleSegmentPages.has(page.path),
    )
    .map((page) => ({ seoSlug: page.path.slice(1) }));
}

export async function generateMetadata({ params }: SeoSlugPageProps) {
  const { seoSlug } = await params;
  const page = getSeoPageByPath(`/${seoSlug}`);

  if (!page) return {};

  return getSeoMetadata(page);
}

export default async function SeoSlugPage({ params }: SeoSlugPageProps) {
  const { seoSlug } = await params;
  const page = getSeoPageByPath(`/${seoSlug}`);

  if (!page) notFound();

  return <SeoLandingPage page={page} />;
}
