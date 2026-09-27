import type { Metadata } from "next";
import { siteUrl } from "./seo-pages";

type MetadataPage = {
  path: string;
  title: string;
  description: string;
};

function buildMetadata(page: MetadataPage, type: "website" | "article"): Metadata {
  const canonical = new URL(page.path, siteUrl).toString();

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: "Outletmu",
      locale: "id_ID",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export function getSeoMetadata(page: MetadataPage): Metadata {
  return buildMetadata(page, "website");
}

export function getArticleMetadata(page: MetadataPage): Metadata {
  return buildMetadata(page, "article");
}
