import type { MetadataRoute } from "next";
import { seoPageEntries } from "@/components/seo/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://outletmu.store";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...seoPageEntries.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
