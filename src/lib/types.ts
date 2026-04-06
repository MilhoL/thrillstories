export interface StoryParagraph {
  paragraph: string;
}

export interface Story {
  id: string;
  title: string;
  genre: string;
  summary: string;
  content: StoryParagraph[];
  created_at: string;
  // Future fields (prepared)
  cover_image_url?: string | null;
  rating?: number | null;
  lang?: string;
}

export type Genre = "thriller" | "drama" | "toxic" | "misterio" | "suspense";

export const GENRES: { slug: Genre; label: string; color: string }[] = [
  { slug: "thriller", label: "Thriller", color: "#7E57C2" },
  { slug: "drama", label: "Drama", color: "#EF4444" },
  { slug: "toxic", label: "Relations Toxiques", color: "#F59E0B" },
  { slug: "misterio", label: "Mystère", color: "#3B82F6" },
  { slug: "suspense", label: "Suspense", color: "#10B981" },
];
