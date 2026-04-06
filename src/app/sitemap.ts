import { getAllStories } from "@/lib/db";
import { GENRES } from "@/lib/types";
import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://storyforge.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getAllStories(500);

  const storyUrls = stories.map((s) => ({
    url: `${BASE}/story/${s.id}`,
    lastModified: new Date(s.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const genreUrls = GENRES.map((g) => ({
    url: `${BASE}/genre/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...genreUrls,
    ...storyUrls,
  ];
}
