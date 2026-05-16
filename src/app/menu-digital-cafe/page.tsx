import { getSeoMetadata } from "@/components/seo/metadata";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoPages } from "@/components/seo/seo-pages";

const page = seoPages.menuDigitalCafe;

export const metadata = getSeoMetadata(page);

export default function MenuDigitalCafePage() {
  return <SeoLandingPage page={page} />;
}
