"use client";

import { useState, useEffect, useCallback } from "react";
import type { Story } from "@/lib/types";
import { GENRES } from "@/lib/types";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    }),
    [password]
  );

  const fetchStories = useCallback(async () => {
    const res = await fetch("/api/stories?limit=100");
    const data = await res.json();
    setStories(data.stories ?? []);
  }, []);

  const handleLogin = () => {
    if (password.length >= 4) {
      setAuthed(true);
      fetchStories();
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = genreFilter
        ? `/api/generate-story?genre=${genreFilter}`
        : "/api/generate-story";
      const res = await fetch(url, { headers: headers() });
      const data = await res.json();
      if (data.success) {
        setMessage(`✓ Histoire générée : "${data.story.title}"`);
        fetchStories();
      } else {
        setMessage(`✗ Erreur : ${data.error}`);
      }
    } catch (err: any) {
      setMessage(`✗ ${err.message}`);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer « ${title} » ?`)) return;
    try {
      await fetch("/api/delete-story", {
        method: "DELETE",
        headers: headers(),
        body: JSON.stringify({ id }),
      });
      setStories((prev) => prev.filter((s) => s.id !== id));
      setMessage(`✓ Supprimée : "${title}"`);
    } catch (err: any) {
      setMessage(`✗ ${err.message}`);
    }
  };

  const handleRevalidate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: headers(),
      });
      const data = await res.json();
      setMessage(data.success ? "✓ Pages revalidées" : `✗ ${data.error}`);
    } catch (err: any) {
      setMessage(`✗ ${err.message}`);
    }
    setLoading(false);
  };

  // ── Login screen ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-card shadow-card p-8 w-full max-w-sm">
          <h1 className="font-display text-2xl font-bold mb-6 text-center">
            Admin
          </h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-border rounded-card px-4 py-3 mb-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-accent text-white font-sans font-semibold py-3 rounded-card hover:bg-accent/90 transition-colors"
          >
            Connexion
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="max-w-page mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard Admin</h1>
        <span className="text-sm text-muted font-sans">
          {stories.length} histoires
        </span>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-card shadow-card p-6 mb-8 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-sans font-semibold text-muted mb-1 uppercase tracking-wider">
            Genre (optionnel)
          </label>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="border border-border rounded-card px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="">Aléatoire</option>
            {GENRES.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-accent text-white px-6 py-2 rounded-card font-sans font-semibold text-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Génération…" : "Générer une histoire"}
        </button>

        <button
          onClick={handleRevalidate}
          disabled={loading}
          className="bg-ink text-white px-6 py-2 rounded-card font-sans font-semibold text-sm hover:bg-ink/80 transition-colors disabled:opacity-50"
        >
          Revalider les pages
        </button>
      </div>

      {message && (
        <div className="bg-white rounded-card shadow-card px-6 py-3 mb-6 font-sans text-sm">
          {message}
        </div>
      )}

      {/* Stories table */}
      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted uppercase tracking-wider">
              <th className="px-6 py-3">Titre</th>
              <th className="px-6 py-3 hidden md:table-cell">Genre</th>
              <th className="px-6 py-3 hidden md:table-cell">Date</th>
              <th className="px-6 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {stories.map((s) => (
              <tr
                key={s.id}
                className="border-b border-border/50 hover:bg-surface/50 transition-colors"
              >
                <td className="px-6 py-3">
                  <a
                    href={`/story/${s.id}`}
                    target="_blank"
                    rel="noopener"
                    className="text-ink hover:text-accent transition-colors font-medium"
                  >
                    {s.title}
                  </a>
                </td>
                <td className="px-6 py-3 hidden md:table-cell text-muted">
                  {s.genre}
                </td>
                <td className="px-6 py-3 hidden md:table-cell text-muted">
                  {new Date(s.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleDelete(s.id, s.title)}
                    className="text-danger hover:text-danger/70 text-xs font-semibold transition-colors"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {stories.length === 0 && (
          <p className="text-center text-muted py-12">Aucune histoire.</p>
        )}
      </div>
    </div>
  );
}
