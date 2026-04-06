import type { Metadata } from "next";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "StoryForge";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://storyforge.app";

export function buildMeta(opts: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${opts.path ?? ""}`;
  return {
    title: `${opts.title} — ${SITE_NAME}`,
    description: opts.description,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      images: opts.image ? [{ url: opts.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    alternates: { canonical: url },
  };
}
