import OpenAI from "openai";
import { Genre, GENRES } from "./types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function pickRandomGenre(): Genre {
  const genres: Genre[] = GENRES.map((g) => g.slug);
  return genres[Math.floor(Math.random() * genres.length)];
}

const GENRE_LABELS: Record<Genre, string> = {
  thriller: "thriller psychologique",
  drama: "drame intense",
  toxic: "relation toxique et manipulatrice",
  misterio: "mystère sombre",
  suspense: "suspense haletant",
};

export async function generateStory(forceGenre?: Genre) {
  const genre = forceGenre ?? pickRandomGenre();
  const genreLabel = GENRE_LABELS[genre];

  const prompt = `Tu es un écrivain de fiction talentueux.
Génère une histoire originale de type "${genreLabel}".

Contraintes :
- Entre 800 et 2000 mots
- Style immersif, dynamique, fluide
- Tension progressive
- Twist surprenant à la fin
- Dialogues naturels entre guillemets
- Structure claire en paragraphes (sépare chaque paragraphe par une ligne vide)

Retourne UNIQUEMENT le texte de l'histoire, sans commentaire, sans titre, sans préambule.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.92,
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = completion.choices[0]?.message?.content?.trim() ?? "";

  // Split into paragraphs
  const paragraphs = raw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // Generate title + summary
  const metaPrompt = `Voici une histoire :
---
${raw.slice(0, 600)}
---
Génère un JSON avec exactement cette structure (sans markdown, sans backticks) :
{"title":"Titre accrocheur court (max 10 mots)","summary":"Résumé captivant en 1-2 phrases (max 200 caractères)"}`;

  const metaCompletion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.7,
    max_tokens: 300,
    messages: [{ role: "user", content: metaPrompt }],
  });

  let title = "Histoire sans titre";
  let summary = "Une histoire captivante à découvrir.";

  try {
    const metaRaw = metaCompletion.choices[0]?.message?.content?.trim() ?? "{}";
    const cleaned = metaRaw.replace(/```json|```/g, "").trim();
    const meta = JSON.parse(cleaned);
    if (meta.title) title = meta.title;
    if (meta.summary) summary = meta.summary;
  } catch {
    // fallback: use first sentence as title
    const firstSentence = paragraphs[0]?.split(/[.!?]/)[0];
    if (firstSentence && firstSentence.length < 80) title = firstSentence;
  }

  return {
    title,
    genre,
    summary,
    content: paragraphs.map((p) => ({ paragraph: p })),
  };
}
