import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display text-6xl font-bold text-accent mb-4">404</h1>
      <p className="text-muted font-body text-lg mb-8">
        Cette histoire n&apos;existe pas… ou pas encore.
      </p>
      <Link
        href="/"
        className="bg-accent text-white px-6 py-3 rounded-card font-sans font-semibold text-sm hover:bg-accent/90 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
