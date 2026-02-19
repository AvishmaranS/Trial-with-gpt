create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price numeric(10,2) not null check (price > 0),
  file_url text not null,
  preview_image_url text not null,
  difficulty_level text not null check (difficulty_level in ('Beginner', 'Intermediate', 'Advanced')),
  created_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  payment_id text not null unique,
  email text not null,
  created_at timestamptz not null default now()
);

create index if not exists purchases_product_email_idx on public.purchases(product_id, email);
