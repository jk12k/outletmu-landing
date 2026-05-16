import type { Metadata } from "next";
import { siteUrl } from "./seo-pages";

type MetadataPage = {
  path: string;
  title: string;
  description: string;
};

export function getSeoMetadata(page: MetadataPage): Metadata {
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
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export function getArticleMetadata(page: MetadataPage): Metadata {
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
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}
