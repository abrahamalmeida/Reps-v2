# Reps v2 — Gym Tracker

Reconstrucción desde cero de la app **Reps** (V1: `abrahamalmeida/Reps`).

## Stack

- **Vite 8** + **React 19** + **TypeScript 6** (strict)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **TanStack Query v5** (data fetching) · **Zustand v5** (estado UI)
- **react-router-dom v7** (rutas lazy + code-splitting)
- **Supabase** (auth, base de datos, RLS) · **Zod** (validación)
- **Vitest** + **Testing Library** · **oxlint** · **Prettier**
- **framer-motion** · **lucide-react** · **vite-plugin-pwa**

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run typecheck` | TypeScript `tsc -b` |
| `npm run lint` | oxlint |
| `npm run test` | Vitest (una pasada) |
| `npm run test:watch` | Vitest (watch) |
| `npm run test:coverage` | Vitest con cobertura v8 |
| `npm run build` | Typecheck + build de producción |
| `npm run format` | Prettier (escribe) |
| `npm run format:check` | Prettier (solo verifica) |

## Configuración

1. `cp .env.example .env` y completa los valores (ver Supabase Dashboard → Project Settings → API).
2. Instala la Supabase CLI global: `npm i -g supabase` y ejecuta `supabase login` una vez.

## Migraciones de base de datos

Se gestionan con la Supabase CLI (`supabase/`). Flujo típico:

```sh
supabase login
supabase link --project-ref pgidddbhnuwmfinymzax
supabase db push
```

## Estructura

```
src/
  app/        # providers, router, layout global
  features/   # módulos por dominio (auth, workouts, exercises, …)
  lib/        # clientes (supabase, api), utilidades
  test/       # setup y helpers de tests
public/
  exercises/  # data + media de ejercicios (bundle estático versionado, cache immutable)
  media/      # GIFs convertidos a MP4/WebP
```

## Notas de seguridad

- `VITE_*` solo contiene valores **públicos** (publishable key, URLs). Nunca pongas la service role key en el cliente.
- Toda la data de usuario se protege con **RLS** en Supabase.
