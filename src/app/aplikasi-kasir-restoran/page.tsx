import { getSeoMetadata } from "@/components/seo/metadata";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoPages } from "@/components/seo/seo-pages";

const page = seoPages.aplikasiKasirRestoran;

export const metadata = getSeoMetadata(page);

export default function AplikasiKasirRestoranPage() {
  return <SeoLandingPage page={page} />;
}
