import AdSlot from "./AdSlot";
import Link from "next/link";
import { GENRES } from "@/lib/types";

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-72 shrink-0 space-y-8">
      <AdSlot position="sidebar" />

      {/* Genre quick links */}
      <div className="bg-white rounded-card shadow-card p-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-widest text-muted mb-4">
          Genres
        </h3>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <Link
              key={g.slug}
              href={`/genre/${g.slug}`}
              className="text-xs font-sans font-medium px-3 py-1.5 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Placeholder: similar stories (future) */}
      {/* <SimilarStories storyId={currentId} /> */}
    </aside>
  );
}
