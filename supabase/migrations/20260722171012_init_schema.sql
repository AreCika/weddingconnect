-- Consolidated schema (replaces all previous migrations).
-- Guests self-register via one shared wedding link (no pre-loaded list).
-- Phone number is a soft identity key: resubmitting with the same number
-- updates the existing RSVP instead of creating a duplicate.

create extension if not exists "pgcrypto";

drop table if exists wishes cascade;
drop table if exists guests cascade;
drop table if exists weddings cascade;
drop type if exists rsvp_status;
drop type if exists wedding_status;

create type rsvp_status as enum ('attending', 'not_attending');
create type wedding_status as enum ('active', 'archived');

create table weddings (
  id uuid primary key default gen_random_uuid(),
  -- Private link: only the couple gets this, for their read-only dashboard.
  dashboard_access_token text not null unique
    default encode(gen_random_bytes(24), 'hex'),
  -- Public link: shared with everyone via WhatsApp for the guest page + RSVP.
  guest_access_token text not null unique
    default encode(gen_random_bytes(24), 'hex'),
  bride_name text not null,
  groom_name text not null,
  wedding_date date not null,
  venue_name text,
  venue_address text,
  content jsonb not null default '{}'::jsonb,
  status wedding_status not null default 'active',
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

create table guests (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references weddings(id) on delete cascade,
  name text not null,
  phone_number text not null,
  rsvp_status rsvp_status not null,
  headcount int not null default 1 check (headcount >= 0),
  responded_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (wedding_id, phone_number)
);

create index idx_guests_wedding_id on guests(wedding_id);

create table wishes (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references guests(id) on delete cascade,
  wedding_id uuid not null references weddings(id) on delete cascade,
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);

create index idx_wishes_wedding_id on wishes(wedding_id);

alter table weddings enable row level security;
alter table guests  enable row level security;
alter table wishes  enable row level security;

-- Deliberately no anon policy: RLS default-denies anything not explicitly
-- allowed. Guest/couple access bypasses RLS entirely via the service-role
-- key + token check in application code (see lib/weddings.ts).
create policy "admin_full_access" on weddings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_full_access" on guests
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_full_access" on wishes
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');