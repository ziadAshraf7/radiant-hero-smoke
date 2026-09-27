create type public.app_role as enum ('admin','user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users see own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));

-- profiles: email + active flag
alter table public.profiles add column email text not null default '';
alter table public.profiles add column is_active boolean not null default true;
update public.profiles p set email = u.email from auth.users u where u.id = p.id;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), coalesce(new.email,''));
  return new;
end; $$;

create policy "Admins read all profiles" on public.profiles for select to authenticated
  using (public.has_role(auth.uid(),'admin'));
create policy "Admins update all profiles" on public.profiles for update to authenticated
  using (public.has_role(auth.uid(),'admin'));

-- testimonials
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  author_name text not null,
  project text not null default '',
  quote text not null,
  rating int not null default 5 check (rating between 1 and 5),
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "Public reads published" on public.testimonials for select to anon, authenticated using (status = 'published');
create policy "Owner reads own" on public.testimonials for select to authenticated using (user_id = auth.uid());
create policy "Owner inserts pending" on public.testimonials for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending' and featured = false);
create policy "Admins manage testimonials" on public.testimonials for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null default 'Residential',
  services text[] not null default '{}',
  location text not null default '',
  duration text not null default '',
  hero_image text not null default '',
  gallery text[] not null default '{}',
  before_images text[] not null default '{}',
  after_images text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "Public reads projects" on public.projects for select to anon, authenticated using (true);
create policy "Admins manage projects" on public.projects for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- services
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  description_en text not null default '',
  excerpt_en text not null default '',
  title_fr text not null default '',
  description_fr text not null default '',
  excerpt_fr text not null default '',
  image_url text not null default '',
  service_type text not null default 'interior',
  slug text not null unique,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.services to anon;
grant select, insert, update, delete on public.services to authenticated;
grant all on public.services to service_role;
alter table public.services enable row level security;
create policy "Public reads active services" on public.services for select to anon, authenticated using (is_active);
create policy "Admins manage services" on public.services for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- faqs
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null default '',
  category text not null default 'General',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.faqs to anon;
grant select, insert, update, delete on public.faqs to authenticated;
grant all on public.faqs to service_role;
alter table public.faqs enable row level security;
create policy "Public reads published faqs" on public.faqs for select to anon, authenticated using (is_published);
create policy "Admins manage faqs" on public.faqs for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));