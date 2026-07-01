import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mystictarot.ai";

  // Static pages
  const staticPages = [
    "",
    "/features",
    "/pricing",
    "/about",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/blog",
    "/deck",
  ];

  // Reading type pages
  const readingTypes = [
    "single-card",
    "three-card",
    "celtic-cross",
    "love",
    "career",
    "finance",
    "health",
    "relationship",
    "soulmate",
    "yes-no",
    "past-present-future",
    "shadow-work",
    "decision",
    "past-life",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1.0 : 0.8,
  }));

  const readingEntries: MetadataRoute.Sitemap = readingTypes.map((type) => ({
    url: `${baseUrl}/readings/${type}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...readingEntries];
}
