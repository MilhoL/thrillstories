import { notFound } from "next/navigation";
import { getStoriesByGenre } from "@/lib/db";
import { buildMeta } from "@/lib/seo";
import { GENRES } from "@/lib/types";
import StoryCard from "@/components/StoryCard";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 600;

interface Props {
  params: { genre: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = GENRES.find((g) => g.slug === params.genre);
  if (!info) return {};
  return buildMeta({
    title: `Histoires ${info.label}`,
    description: `Découvrez nos histoires de type ${info.label.toLowerCase()} : tension, suspense et émotions fortes.`,
    path: `/genre/${params.genre}`,
  });
}

export async function generateStaticParams() {
  return GENRES.map((g) => ({ genre: g.slug }));
}

export default async function GenrePage({ params }: Props) {
  const info = GENRES.find((g) => g.slug === params.genre);
  if (!info) notFound();

  const stories = await getStoriesByGenre(params.genre);

  return (
    <div className="max-w-page mx-auto px-6 py-12">
      <nav className="text-sm font-sans text-muted mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-accent transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <span>{info.label}</span>
      </nav>

      <header className="mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
          Histoires{" "}
          <span style={{ color: info.color }}>{info.label}</span>
        </h1>
        <p className="text-muted font-body text-lg">
          Plongez dans l&apos;univers du {info.label.toLowerCase()}.
        </p>
      </header>

      <AdSlot position="top" />

      {stories.length === 0 ? (
        <p className="text-center text-muted font-sans py-20">
          Aucune histoire dans cette catégorie pour le moment.
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
