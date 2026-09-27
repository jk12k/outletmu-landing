import { getSeoMetadata } from "@/components/seo/metadata";
import { IndexPage } from "@/components/seo/index-page";
import { indexPages } from "@/components/seo/index-pages";

const page = indexPages.solusi;

export const metadata = getSeoMetadata(page);

export default function SolusiIndexPage() {
  return <IndexPage page={page} />;
}
