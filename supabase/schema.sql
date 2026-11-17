-- =====================================================================
-- Real Estate Marathon - Supabase schema
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- =====================================================================
create extension if not exists "pgcrypto";

create sequence if not exists registration_ref_seq start 1001;
create sequence if not exists bib_number_seq start 21001;

do $$ begin
  create type registration_status as enum ('pending_payment', 'confirmed', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_status as enum ('created', 'paid', 'failed', 'refunded');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------- registrations
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null default ('REM-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('registration_ref_seq')::text, 5, '0')),
  access_token uuid not null default gen_random_uuid(),
  status registration_status not null default 'pending_payment',

  full_name text not null,
  gender text not null,
  date_of_birth date not null,
  blood_group text not null,
  nationality text not null,
  category text not null check (category in ('3k', '5k', '10k', '21k')),
  tshirt_size text not null,
  bib_name text,

  mobile text not null,
  alt_mobile text,
  email text not null,
  address_line1 text not null,
  society_name text,
  pincode text not null,
  city text not null,
  state text not null,

  emergency_name text not null,
  emergency_mobile text not null,
  emergency_relationship text not null,

  photo_path text not null,
  id_proof_path text not null,

  community jsonb,
  medical jsonb not null,
  running jsonb not null,
  declarations jsonb not null,

  bib_number int unique,
  amount_paise int not null check (amount_paise >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists registrations_email_idx on registrations (email);
create index if not exists registrations_status_idx on registrations (status);

-- ---------------------------------------------------------------- family members
create table if not exists family_members (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references registrations (id) on delete cascade,
  full_name text not null,
  relationship text not null,
  date_of_birth date not null,
  gender text not null,
  category text not null check (category in ('3k', '5k', '10k', '21k')),
  tshirt_size text not null,
  bib_name text,
  photo_path text,
  bib_number int unique,
  created_at timestamptz not null default now()
);
create index if not exists family_members_reg_idx on family_members (registration_id);

-- ---------------------------------------------------------------- payments
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references registrations (id) on delete cascade,
  provider text not null,
  provider_order_id text not null,
  provider_payment_id text,
  method text,
  amount_paise int not null,
  currency text not null default 'INR',
  status payment_status not null default 'created',
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  unique (provider, provider_order_id)
);
create index if not exists payments_reg_idx on payments (registration_id);

-- ---------------------------------------------------------------- enquiries & newsletter
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact','sponsor','expo_stall','volunteer','community_register','kit_sponsor','corporate_kit','merch_order')),
  name text not null,
  email text not null,
  phone text,
  organisation text,
  subject text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index if not exists enquiries_type_idx on enquiries (type, created_at desc);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- confirm + assign bib numbers atomically
create or replace function finalize_registration(p_id uuid)
returns int language plpgsql security definer set search_path = public as $$
declare v_bib int; m record;
begin
  update registrations
     set status = 'confirmed',
         bib_number = coalesce(bib_number, nextval('bib_number_seq')),
         updated_at = now()
   where id = p_id
   returning bib_number into v_bib;

  for m in select id from family_members where registration_id = p_id and bib_number is null order by created_at loop
    update family_members set bib_number = nextval('bib_number_seq') where id = m.id;
  end loop;
  return v_bib;
end $$;

revoke all on function finalize_registration(uuid) from public, anon, authenticated;

-- ---------------------------------------------------------------- security
-- All access goes through the Next.js server using the service-role key.
-- RLS is ON with NO policies, so anon/authenticated keys can read or write nothing.
alter table registrations enable row level security;
alter table family_members enable row level security;
alter table payments enable row level security;
alter table enquiries enable row level security;
alter table newsletter_subscribers enable row level security;

-- ---------------------------------------------------------------- private bucket for uploaded documents
insert into storage.buckets (id, name, public)
values ('registration-docs', 'registration-docs', false)
on conflict (id) do nothing;
