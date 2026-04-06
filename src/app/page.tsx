import { getAllStories } from "@/lib/db";
import StoryCard from "@/components/StoryCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import { GENRES } from "@/lib/types";

export const revalidate = 600; // ISR: re-generate every 10 min

export default async function HomePage() {
  const stories = await getAllStories(30);

  return (
    <div className="max-w-page mx-auto px-6 py-12">
      {/* Hero */}
      <section className="mb-16 text-center max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
          Des histoires qui vous{" "}
          <span className="text-accent italic">hantent</span>
        </h1>
        <p className="text-muted font-body text-lg leading-relaxed">
          Thrillers psychologiques, drames intenses, relations toxiques — une
          nouvelle histoire captivante chaque jour, générée par intelligence
          artificielle.
        </p>

        {/* Genre filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {GENRES.map((g) => (
            <Link
              key={g.slug}
              href={`/genre/${g.slug}`}
              className="text-sm font-sans font-semibold px-4 py-2 rounded-full border border-border hover:border-accent hover:text-accent transition-all"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </section>

      <AdSlot position="top" />

      {/* Stories grid */}
      {stories.length === 0 ? (
        <p className="text-center text-muted font-sans py-20">
          Aucune histoire pour le moment. La première arrivera bientôt…
        </p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </section>
      )}

      <AdSlot position="bottom" />
    </div>
  );
}
