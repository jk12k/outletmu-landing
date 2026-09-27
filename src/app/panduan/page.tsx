import { getSeoMetadata } from "@/components/seo/metadata";
import { IndexPage } from "@/components/seo/index-page";
import { indexPages } from "@/components/seo/index-pages";

const page = indexPages.panduan;

export const metadata = getSeoMetadata(page);

export default function PanduanIndexPage() {
  return <IndexPage page={page} />;
}
