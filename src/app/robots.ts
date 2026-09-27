import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Outletmu MENGIZINKAN crawling AI (mendorong sitasi & rekomendasi di AI search).
// Ringkasan: /llms.txt · Versi lengkap: /llms-full.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: semua bot boleh crawl.
      { userAgent: "*", allow: "/" },
      // AI search-augmented crawlers (mendorong sitasi).
      { userAgent: "PerplexityBot", allow: "/" },
      // AI training & browsing crawlers.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      // Scraper agresif.
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
