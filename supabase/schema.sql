-- Supabase SQL schema for Geon Oh Kim Research

-- Enable extensions if needed
-- Create tables with UUID primary keys

create extension if not exists "pgcrypto";

-- helper function for admin check (placeholder)
create function public.is_admin(p_user_id uuid) returns boolean language sql stable as $$
  select exists(select 1 from public.admin_users where id = p_user_id and is_active = true);
$$;

-- admin_users
create table if not exists public.admin_users (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  is_active boolean default true
);

-- companies
create table if not exists public.companies (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  ticker text,
  description text,
  website text,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- analysis_posts
create table if not exists public.analysis_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  author_id uuid references public.admin_users(id) on delete set null,
  company_id uuid references public.companies(id) on delete set null,
  excerpt text,
  published boolean default false,
  published_at timestamptz,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- documents
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  bucket text not null,
  path text not null,
  filename text not null,
  mime_type text,
  size bigint,
  owner_id uuid references public.admin_users(id) on delete set null,
  company_id uuid references public.companies(id) on delete set null,
  analysis_post_id uuid references public.analysis_posts(id) on delete set null,
  public boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- thesis_updates (audit/history for editorial notes)
create table if not exists public.thesis_updates (
  id uuid default gen_random_uuid() primary key,
  analysis_post_id uuid references public.analysis_posts(id) on delete cascade,
  author_id uuid references public.admin_users(id) on delete set null,
  note text,
  created_at timestamptz default now()
);

-- stock_snapshots (cached snapshots)
create table if not exists public.stock_snapshots (
  id uuid default gen_random_uuid() primary key,
  ticker text not null,
  snapshot jsonb not null,
  snapshot_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Enable Row Level Security and example policies
alter table public.companies enable row level security;
alter table public.analysis_posts enable row level security;
alter table public.documents enable row level security;
alter table public.admin_users enable row level security;

-- Public read policy for companies
create policy "public_select_companies" on public.companies
  for select using (true);

-- Public select for published posts only
create policy "public_select_published_posts" on public.analysis_posts
  for select using (published = true);

-- Admin full access (requires authenticated user and is in admin_users)
create policy "admin_full_access_analysis" on public.analysis_posts
  for all using (
    auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)
  ) with check (
    auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)
  );

create policy "admin_full_access_documents" on public.documents
  for all using (
    auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)
  ) with check (
    auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)
  );

-- Admin access to admin_users table
create policy "admin_manage_admins" on public.admin_users
  for all using (
    auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)
  ) with check (
    auth.role() = 'authenticated' and public.is_admin(auth.uid()::uuid)
  );

-- Note: When deploying to Supabase, you may refine policies to check email or other attributes.
