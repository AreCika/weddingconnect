# WeddingConnect

A wedding invitation platform: each couple gets a shareable guest page (RSVP,
wishes wall, photo gallery, event timeline, venue map) at its own token URL,
plus a private read-only dashboard for checking responses. An internal admin
tool manages the list of weddings.

## Stack

- [Next.js](https://nextjs.org) (App Router) + React
- [Supabase](https://supabase.com) — Postgres database and auth (admin login only; guests and couples never authenticate, their pages are gated by unguessable tokens)
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com)
- [Motion](https://motion.dev) for animation
- Hosted on [Netlify](https://www.netlify.com) (`@netlify/plugin-nextjs`)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your Supabase project's values:

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```

3. Apply the database schema in `supabase/migrations/` to your Supabase project, and create the one admin account directly in the Supabase dashboard (there is no public sign-up).

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/[weddingToken]` — public guest page (RSVP, wishes, gallery, etc.)
- `/dashboard/[weddingToken]` — couple's private read-only dashboard
- `/admin` — internal tool for managing weddings (requires admin login)
