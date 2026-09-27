import { getSeoMetadata } from "@/components/seo/metadata";
import { IndexPage } from "@/components/seo/index-page";
import { indexPages } from "@/components/seo/index-pages";

const page = indexPages.bandingkan;

export const metadata = getSeoMetadata(page);

export default function BandingkanIndexPage() {
  return <IndexPage page={page} />;
}
