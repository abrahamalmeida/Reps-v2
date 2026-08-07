-- 0001_init: esquema base de Reps v2 (auth + rutinas + tracking)
-- Los ejercicios NO viven en la BD: se referencian por exercise_slug
-- contra el bundle estático versionado (public/exercises).

-- ─── profiles (1:1 con auth.users) ──────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  fitness_goal text check (fitness_goal in ('perder_grasa', 'ganar_musculo', 'fuerza', 'resistencia', 'salud')),
  height_cm numeric(5, 2) check (height_cm is null or (height_cm > 50 and height_cm < 280)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Perfil de cada usuario (1:1 con auth.users).';

-- ─── workouts (plantillas de rutina) ────────────────────────────────────────
create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.workouts is 'Plantillas de rutina creadas por el usuario.';

create table public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references public.workouts (id) on delete cascade,
  exercise_slug text not null check (char_length(exercise_slug) between 1 and 200),
  position smallint not null check (position >= 1),
  target_sets smallint not null default 3 check (target_sets between 1 and 100),
  target_reps text,
  rest_seconds smallint check (rest_seconds is null or rest_seconds between 0 and 3600),
  notes text,
  unique (workout_id, position)
);

comment on table public.workout_exercises is 'Ejercicio dentro de una plantilla; exercise_slug referencia el bundle estático de ejercicios.';

-- ─── workout_sessions (entrenamientos registrados) ──────────────────────────
create table public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  workout_id uuid references public.workouts (id) on delete set null,
  name text not null,
  notes text,
  felt_rpe smallint check (felt_rpe is null or felt_rpe between 1 and 10),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  check (ended_at is null or ended_at >= started_at)
);

comment on table public.workout_sessions is 'Entrenamiento registrado (snapshot del plan ejecutado).';

-- ─── session_sets (series) ──────────────────────────────────────────────────
create table public.session_sets (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions (id) on delete cascade,
  exercise_slug text not null check (char_length(exercise_slug) between 1 and 200),
  exercise_name text not null,
  position smallint not null check (position >= 1),
  set_number smallint not null check (set_number >= 1),
  weight_kg numeric(6, 2) check (weight_kg is null or weight_kg >= 0),
  reps smallint check (reps is null or reps >= 0),
  rpe smallint check (rpe is null or rpe between 1 and 10),
  is_warmup boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.session_sets is 'Serie registrada con snapshot del ejercicio ejecutado.';

-- ─── Índices ────────────────────────────────────────────────────────────────
create index workouts_user_id_idx on public.workouts (user_id);
create index workout_exercises_workout_id_idx on public.workout_exercises (workout_id);
create index workout_sessions_user_started_idx on public.workout_sessions (user_id, started_at desc);
create index session_sets_session_idx on public.session_sets (session_id);

-- ─── Triggers ───────────────────────────────────────────────────────────────
create function public.handle_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username, full_name)
  values (new.id, null, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.handle_updated_at();

create trigger workouts_set_updated_at
before update on public.workouts
for each row execute procedure public.handle_updated_at();

-- ─── RLS ────────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.session_sets enable row level security;

-- El proyecto no auto-expone tablas nuevas: grants explícitos al rol autenticado.
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;

-- Políticas: profiles
create policy "profiles_select_own"
on public.profiles for select to authenticated
using (id = auth.uid());

create policy "profiles_insert_own"
on public.profiles for insert to authenticated
with check (id = auth.uid());

create policy "profiles_update_own"
on public.profiles for update to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Políticas: workouts
create policy "workouts_all_own"
on public.workouts for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Políticas: workout_exercises (vía propiedad del workout)
create policy "workout_exercises_all_own"
on public.workout_exercises for all to authenticated
using (
  exists (
    select 1 from public.workouts w
    where w.id = workout_id and w.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.workouts w
    where w.id = workout_id and w.user_id = auth.uid()
  )
);

-- Políticas: workout_sessions
create policy "workout_sessions_all_own"
on public.workout_sessions for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Políticas: session_sets (vía propiedad de la sesión)
create policy "session_sets_all_own"
on public.session_sets for all to authenticated
using (
  exists (
    select 1 from public.workout_sessions s
    where s.id = session_id and s.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.workout_sessions s
    where s.id = session_id and s.user_id = auth.uid()
  )
);
