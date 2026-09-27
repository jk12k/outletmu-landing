import { getSeoMetadata } from "@/components/seo/metadata";
import { IndexPage } from "@/components/seo/index-page";
import { indexPages } from "@/components/seo/index-pages";

const page = indexPages.fitur;

export const metadata = getSeoMetadata(page);

export default function FiturIndexPage() {
  return <IndexPage page={page} />;
}
