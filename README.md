# StoryForge

**Site automatisé de génération et publication d'histoires thriller / drama / relations toxiques par IA.**

Chaque jour, une nouvelle histoire est générée par GPT-4.1 mini, enregistrée dans Supabase, et publiée automatiquement sur un site Next.js 14 optimisé SEO.

---

## Architecture

```
┌─────────────┐    cron 06:00 UTC     ┌──────────────┐
│  Vercel Cron │ ──────────────────▶   │  /api/generate│
└─────────────┘                        │    -story     │
                                       └──────┬───────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │   OpenAI GPT-4.1   │
                                    │   mini             │
                                    └─────────┬─────────┘
                                              │ JSON
                                    ┌─────────▼─────────┐
                                    │    Supabase DB     │
                                    │  (PostgreSQL)      │
                                    └─────────┬─────────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │  Next.js 14 SSG    │
                                    │  + ISR pages       │
                                    └───────────────────┘
```

## Stack technique

| Couche     | Technologie             |
|------------|-------------------------|
| Frontend   | Next.js 14 (App Router) |
| Langage    | TypeScript              |
| Style      | TailwindCSS             |
| Base       | Supabase (PostgreSQL)   |
| IA         | OpenAI GPT-4.1 mini     |
| Déploiement| Vercel                  |
| Cron       | Vercel Cron Jobs        |

---

## Installation

### 1. Cloner le repo

```bash
git clone <your-repo-url> storyforge
cd storyforge
npm install
```

### 2. Configurer Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Aller dans **SQL Editor** et exécuter le contenu de `supabase/migration.sql`
3. Récupérer les clés dans **Settings → API** :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configurer OpenAI

1. Créer une clé API sur [platform.openai.com](https://platform.openai.com)
2. Récupérer `OPENAI_API_KEY`

### 4. Variables d'environnement

Copier le template et remplir :

```bash
cp .env.local.example .env.local
```

Remplir toutes les valeurs :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
OPENAI_API_KEY=sk-...
ADMIN_PASSWORD=votre-mot-de-passe-admin
CRON_SECRET=un-secret-aleatoire-long
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_SITE_NAME=StoryForge
```

### 5. Lancer en local

```bash
npm run dev
```

Le site est sur `http://localhost:3000`.

### 6. Tester la génération

```bash
curl -H "Authorization: Bearer votre-mot-de-passe-admin" \
  http://localhost:3000/api/generate-story
```

---

## Déploiement Vercel

### 1. Connecter le repo

```bash
npx vercel
```

Ou connecter via le dashboard Vercel.

### 2. Variables d'environnement

Ajouter toutes les variables de `.env.local` dans **Settings → Environment Variables** sur Vercel.

### 3. Activer le Cron Job

Le fichier `vercel.json` configure automatiquement un cron à 06:00 UTC chaque jour :

```json
{
  "crons": [
    {
      "path": "/api/generate-story",
      "schedule": "0 6 * * *"
    }
  ]
}
```

> **Important** : Vercel injecte automatiquement le header `Authorization: Bearer <CRON_SECRET>` pour les crons. Assurez-vous que `CRON_SECRET` est défini.

### 4. Déployer

```bash
npx vercel --prod
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Accueil — grille de toutes les histoires |
| `/story/[id]` | Page individuelle d'une histoire |
| `/genre/[genre]` | Filtre par genre (thriller, drama, toxic, misterio, suspense) |
| `/admin` | Dashboard admin (protégé par mot de passe) |
| `/privacy` | Politique de confidentialité |
| `/sitemap.xml` | Sitemap automatique |
| `/robots.txt` | Robots.txt |

## Endpoints API

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/generate-story` | Bearer token | Génère et sauvegarde une histoire |
| `GET` | `/api/stories` | — | Liste les histoires |
| `DELETE` | `/api/delete-story` | Bearer token | Supprime une histoire |
| `POST` | `/api/publish` | Bearer token | Revalide le cache ISR |

---

## Dashboard Admin

Accéder à `/admin` et entrer le mot de passe (`ADMIN_PASSWORD`).

Fonctionnalités :
- Voir toutes les histoires publiées
- Générer manuellement une histoire (avec choix du genre)
- Supprimer une histoire
- Revalider les pages (forcer la mise à jour du cache)

---

## Configuration SEO

Le SEO est automatique :

- **Balises meta** : titre + résumé générés par l'IA pour chaque histoire
- **OpenGraph** : images et descriptions pour le partage social
- **Sitemap** : `/sitemap.xml` auto-généré avec toutes les pages
- **Robots.txt** : bloque `/admin` et `/api/`
- **URLs propres** : `/story/uuid` et `/genre/slug`
- **ISR** : pages mises à jour automatiquement sans rebuild complet

---

## Publicité (préparation)

Des composants `<AdSlot />` sont placés à 4 emplacements stratégiques :

1. **Top** — sous le titre (page histoire)
2. **Mid** — au milieu du texte
3. **Bottom** — fin du texte
4. **Sidebar** — colonne droite (desktop)

Pour activer les pubs :

1. Ouvrir `src/components/AdSlot.tsx`
2. Remplacer le contenu par votre script Adsense/Ezoic/Mediavine
3. Supprimer la condition `process.env.NODE_ENV === "production"`

---

## Évolutions futures (préparées)

### Génération d'images de couverture

La colonne `cover_image_url` existe déjà dans la base. Pour intégrer DALL·E / Flux :

1. Dans `src/lib/generate.ts`, après la génération du texte, appeler l'API image :
```ts
const image = await openai.images.generate({
  model: "dall-e-3",
  prompt: `Couverture dramatique pour : ${title}`,
  size: "1792x1024",
});
// Uploader l'image sur Supabase Storage
// Ajouter l'URL dans cover_image_url
```

2. Le composant `StoryCard` affiche déjà l'image si `cover_image_url` est défini.

### Notes utilisateurs

La colonne `rating` est prête. Ajouter un composant de notation côté client.

### Traduction automatique

La colonne `lang` est prête. Ajouter un appel de traduction après la génération :
```ts
// Traduire en anglais, espagnol, etc.
// Sauvegarder comme nouvelle entrée avec lang = 'en'
```

### Suggestions similaires

Implémenter via :
- Matching par genre
- Ou embeddings OpenAI pour similarité sémantique

---

## Structure du projet

```
storyforge/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout racine
│   │   ├── page.tsx            # Accueil
│   │   ├── not-found.tsx       # 404
│   │   ├── globals.css         # Styles globaux
│   │   ├── sitemap.ts          # Sitemap dynamique
│   │   ├── robots.ts           # Robots.txt
│   │   ├── story/[id]/page.tsx # Page histoire
│   │   ├── genre/[genre]/page.tsx # Page genre
│   │   ├── admin/page.tsx      # Dashboard admin
│   │   ├── privacy/page.tsx    # Politique vie privée
│   │   └── api/
│   │       ├── generate-story/route.ts
│   │       ├── publish/route.ts
│   │       ├── stories/route.ts
│   │       └── delete-story/route.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── StoryCard.tsx
│   │   ├── StoryBody.tsx
│   │   ├── GenrePill.tsx
│   │   ├── AdSlot.tsx
│   │   └── Sidebar.tsx
│   └── lib/
│       ├── supabase.ts         # Clients Supabase
│       ├── types.ts            # Types TypeScript
│       ├── generate.ts         # Logique de génération IA
│       ├── db.ts               # Helpers base de données
│       └── seo.ts              # Helpers SEO
├── supabase/
│   └── migration.sql           # Schéma de la base
├── public/                     # Assets statiques
├── vercel.json                 # Config Vercel + Cron
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local.example
```

---

## Licence

Projet privé. Tous droits réservés.
