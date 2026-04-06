import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-page mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted font-sans">
        <p>&copy; {new Date().getFullYear()} StoryForge. Toutes les histoires sont générées par IA.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-ink transition-colors">
            Politique de confidentialité
          </Link>
          <Link href="/sitemap.xml" className="hover:text-ink transition-colors">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
