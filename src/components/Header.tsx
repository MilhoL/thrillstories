import Link from "next/link";
import { GENRES } from "@/lib/types";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-page mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-display font-bold text-sm">
            S
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
            StoryForge
          </span>
        </Link>

        {/* Genre nav */}
        <nav className="hidden md:flex items-center gap-6">
          {GENRES.slice(0, 4).map((g) => (
            <Link
              key={g.slug}
              href={`/genre/${g.slug}`}
              className="text-sm font-sans font-medium text-muted hover:text-ink transition-colors"
            >
              {g.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
