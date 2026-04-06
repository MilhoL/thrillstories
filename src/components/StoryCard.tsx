import Link from "next/link";
import type { Story } from "@/lib/types";
import { GENRES } from "@/lib/types";
import GenrePill from "./GenrePill";

export default function StoryCard({ story }: { story: Story }) {
  const date = new Date(story.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Estimate reading time
  const wordCount = story.content.reduce(
    (sum, p) => sum + p.paragraph.split(/\s+/).length,
    0
  );
  const readMin = Math.max(1, Math.round(wordCount / 230));

  return (
    <Link href={`/story/${story.id}`} className="block card-hover">
      <article className="bg-white rounded-card shadow-card p-6 h-full flex flex-col">
        {/* Future: cover image placeholder */}
        {story.cover_image_url && (
          <div className="w-full h-44 rounded-card bg-border mb-4 overflow-hidden">
            {/* <Image src={story.cover_image_url} ... /> */}
          </div>
        )}

        <div className="flex items-center gap-3 mb-3">
          <GenrePill genre={story.genre} />
          <span className="text-xs text-muted font-sans">{readMin} min</span>
        </div>

        <h2 className="font-display text-xl font-bold leading-snug mb-2 text-ink">
          {story.title}
        </h2>
        <p className="text-sm text-muted font-body leading-relaxed flex-1">
          {story.summary}
        </p>

        <time className="block mt-4 text-xs text-muted/60 font-sans">
          {date}
        </time>
      </article>
    </Link>
  );
}
