-- Aigentic Systems leads table
-- Run this in the Supabase SQL editor (octfeldswnvdiqmsrdtw)

create table if not exists as_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business_name text,
  message text,
  status text not null default 'new',   -- new | contacted | qualified | closed
  source text not null default 'manual', -- website_form | manual
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at current
create or replace function as_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists as_leads_updated_at on as_leads;
create trigger as_leads_updated_at
  before update on as_leads
  for each row execute procedure as_set_updated_at();

-- Allow public inserts (website form) and reads/updates (dashboard via anon key)
alter table as_leads enable row level security;

create policy "Public can insert leads"
  on as_leads for insert
  with check (true);

create policy "Anon can read leads"
  on as_leads for select
  using (true);

create policy "Anon can update leads"
  on as_leads for update
  using (true);

create policy "Anon can delete leads"
  on as_leads for delete
  using (true);
