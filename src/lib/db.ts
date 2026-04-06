import { supabaseAdmin } from "./supabase";
import type { Story } from "./types";

const TABLE = "stories";

export async function insertStory(
  story: Omit<Story, "id" | "created_at">
): Promise<Story> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from(TABLE)
    .insert(story)
    .select()
    .single();

  if (error) throw new Error(`Insert failed: ${error.message}`);
  return data as Story;
}

export async function getAllStories(
  limit = 50,
  offset = 0
): Promise<Story[]> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);
  return (data ?? []) as Story[];
}

export async function getStoryById(id: string): Promise<Story | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Story;
}

export async function getStoriesByGenre(
  genre: string,
  limit = 50
): Promise<Story[]> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from(TABLE)
    .select("*")
    .eq("genre", genre)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as Story[];
}

export async function deleteStory(id: string): Promise<void> {
  const db = supabaseAdmin();
  const { error } = await db.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function countStories(): Promise<number> {
  const db = supabaseAdmin();
  const { count, error } = await db
    .from(TABLE)
    .select("*", { count: "exact", head: true });

  if (error) return 0;
  return count ?? 0;
}
