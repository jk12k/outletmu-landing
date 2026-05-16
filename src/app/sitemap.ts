import type { MetadataRoute } from "next";
import { guidePageEntries } from "@/components/seo/guide-pages";
import { seoPageEntries } from "@/components/seo/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://outletmu.store";
  const lastModified = new Date("2026-05-16T00:00:00.000Z");

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/harga`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.92,
    },
    ...seoPageEntries.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...guidePageEntries.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ];
}
