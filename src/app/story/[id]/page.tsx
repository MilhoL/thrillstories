import { notFound } from "next/navigation";
import { getStoryById, getAllStories } from "@/lib/db";
import { buildMeta } from "@/lib/seo";
import GenrePill from "@/components/GenrePill";
import StoryBody from "@/components/StoryBody";
import AdSlot from "@/components/AdSlot";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600; // ISR: 1 h

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await getStoryById(params.id);
  if (!story) return {};
  return buildMeta({
    title: story.title,
    description: story.summary,
    path: `/story/${story.id}`,
    image: story.cover_image_url ?? undefined,
  });
}

// Pre-render the latest stories at build time
export async function generateStaticParams() {
  const stories = await getAllStories(20);
  return stories.map((s) => ({ id: s.id }));
}

export default async function StoryPage({ params }: Props) {
  const story = await getStoryById(params.id);
  if (!story) notFound();

  const wordCount = story.content.reduce(
    (sum, p) => sum + p.paragraph.split(/\s+/).length,
    0
  );
  const readMin = Math.max(1, Math.round(wordCount / 230));
  const date = new Date(story.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="max-w-page mx-auto px-6 py-12">
      <div className="flex gap-12">
        {/* Main content */}
        <div className="flex-1 max-w-prose mx-auto lg:mx-0">
          {/* Breadcrumb */}
          <nav className="text-sm font-sans text-muted mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-accent transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link
              href={`/genre/${story.genre}`}
              className="hover:text-accent transition-colors"
            >
              {story.genre}
            </Link>
          </nav>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <GenrePill genre={story.genre} />
              <span className="text-sm text-muted font-sans">
                {readMin} min de lecture
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
              {story.title}
            </h1>
            <p className="text-lg text-muted font-body italic leading-relaxed">
              {story.summary}
            </p>
            <time className="block mt-3 text-sm text-muted/60 font-sans">
              Publié le {date}
            </time>
          </header>

          <AdSlot position="top" />

          {/* Story text */}
          <StoryBody content={story.content} />

          <AdSlot position="bottom" />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/"
              className="text-accent font-sans font-semibold text-sm hover:underline"
            >
              ← Toutes les histoires
            </Link>
          </div>
        </div>

        {/* Sidebar (desktop) */}
        <Sidebar />
      </div>
    </article>
  );
}
