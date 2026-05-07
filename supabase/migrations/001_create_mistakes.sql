create extension if not exists pgcrypto;

create table if not exists public.mistakes (
  id uuid primary key default gen_random_uuid(),
  text varchar(120) not null,
  created_at timestamp not null default now(),
  visible_until timestamp not null
);

create index if not exists mistakes_visible_until_created_at_idx
  on public.mistakes (visible_until, created_at desc);
