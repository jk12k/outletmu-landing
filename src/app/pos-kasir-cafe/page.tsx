import { getSeoMetadata } from "@/components/seo/metadata";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoPages } from "@/components/seo/seo-pages";

const page = seoPages.posKasirCafe;

export const metadata = getSeoMetadata(page);

export default function PosKasirCafePage() {
  return <SeoLandingPage page={page} />;
}
