import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { seoPages } from "@/components/seo/seo-pages";

const page = seoPages.posKasirCafe;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function PosKasirCafePage() {
  return <SeoLandingPage page={page} />;
}
