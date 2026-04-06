-- ============================================
-- StoryForge — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Stories table
create table if not exists public.stories (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  genre       text not null default 'thriller',
  summary     text not null default '',
  content     jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),

  -- Future columns (prepared)
  cover_image_url text,
  rating          real,
  lang            text default 'fr'
);

-- Indexes for fast lookups
create index if not exists idx_stories_genre      on public.stories (genre);
create index if not exists idx_stories_created_at on public.stories (created_at desc);

-- Row Level Security
alter table public.stories enable row level security;

-- Public read access (anon key can read)
create policy "Public read access"
  on public.stories for select
  using (true);

-- Service role can do everything (inserts, deletes via backend)
create policy "Service role full access"
  on public.stories for all
  using (auth.role() = 'service_role');
