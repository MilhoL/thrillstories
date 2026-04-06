import { buildMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMeta({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de StoryForge.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const siteName =
    process.env.NEXT_PUBLIC_SITE_NAME ?? "StoryForge";

  return (
    <div className="max-w-prose mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-bold mb-8">
        Politique de confidentialité
      </h1>

      <div className="space-y-6 text-muted font-body leading-relaxed text-base">
        <p>
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>

        <h2 className="font-display text-xl font-bold text-ink !mt-10">
          1. Collecte des données
        </h2>
        <p>
          {siteName} ne collecte aucune donnée personnelle identifiable
          directement. Les histoires affichées sur ce site sont générées par
          intelligence artificielle et ne contiennent aucune information réelle
          sur des personnes existantes.
        </p>

        <h2 className="font-display text-xl font-bold text-ink !mt-10">
          2. Cookies et publicité
        </h2>
        <p>
          Ce site peut utiliser des cookies tiers à des fins publicitaires
          (Google AdSense, Ezoic ou Mediavine). Ces services peuvent collecter
          des données de navigation anonymisées pour afficher des publicités
          personnalisées. Vous pouvez gérer vos préférences de cookies via les
          paramètres de votre navigateur.
        </p>

        <h2 className="font-display text-xl font-bold text-ink !mt-10">
          3. Google AdSense
        </h2>
        <p>
          Google, en tant que fournisseur tiers, utilise des cookies pour
          diffuser des annonces sur ce site. L&apos;utilisation du cookie DART
          permet à Google de diffuser des annonces en fonction de votre visite
          sur ce site et d&apos;autres sites sur Internet. Vous pouvez
          désactiver le cookie DART en visitant la page de politique de
          confidentialité de Google Ads.
        </p>

        <h2 className="font-display text-xl font-bold text-ink !mt-10">
          4. Analytiques
        </h2>
        <p>
          Nous pouvons utiliser des outils d&apos;analyse (Google Analytics ou
          équivalent) pour comprendre comment les visiteurs interagissent avec
          le site. Ces données sont anonymisées et agrégées.
        </p>

        <h2 className="font-display text-xl font-bold text-ink !mt-10">
          5. Contact
        </h2>
        <p>
          Pour toute question relative à cette politique, vous pouvez nous
          contacter via l&apos;adresse email indiquée sur le site.
        </p>
      </div>
    </div>
  );
}
