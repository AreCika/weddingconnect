# WeddingConnect

Codebase name for **KadJemput** (the browser-tab/product name) — a wedding
invitation platform: each couple gets a shareable guest page at its own
human-readable link (e.g. `siti-ahmad-a3f9c2d1`) — hero with countdown and
calendar download, couple intro, photo gallery, wedding details, venue map,
event timeline, contacts, a gift/QR section, RSVP, and a wishes wall — plus
a private read-only dashboard for checking responses. An internal admin
tool manages the list of weddings (create, edit, archive, guest list, CSV
export).

## Stack

- [Next.js](https://nextjs.org) (App Router) + React
- [Supabase](https://supabase.com) — Postgres database and auth (admin login only; guests and couples never authenticate, their pages are gated by unguessable tokens)
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com)
- [Motion](https://motion.dev) for animation (curtain-reveal invitation gate, scroll reveals, swipeable gallery)
- Hosted on [Netlify](https://www.netlify.com) (`@netlify/plugin-nextjs`)

Per-wedding content (bios, gallery photos, timeline, contacts, gift QR,
background music) lives in one flexible `content` jsonb column rather than
dedicated tables — each guest-page section reads its own slice defensively
via shared helpers in `lib/content.ts` and simply renders nothing if that
data isn't set. See `docs/ARCHITECTURE.md` for the reasoning behind this and
the rest of the trust model.

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

3. Apply the migrations in `supabase/migrations/` to your Supabase project, and create the one admin account directly in the Supabase dashboard (there is no public sign-up).

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/[weddingToken]` — public guest page
- `/dashboard/[weddingToken]` — couple's private read-only dashboard
- `/api/calendar/[weddingToken]` — downloads a `.ics` file for "Save the Date"
- `/admin` — weddings list (requires admin login, enforced by `proxy.ts`)
- `/admin/login` · `/admin/new` · `/admin/weddings/[id]` · `/admin/weddings/[id]/edit` · `/admin/weddings/[id]/export` — admin auth and per-wedding management, including a CSV guest-list export

## Structure

- `components/sections/` — guest-page sections (Hero, Gallery, Timeline, Contact, Gift, RSVP, Wishes, etc.), each self-contained and self-hiding based on `content`
- `components/guest/` — the guest-page shell (invitation gate, bottom nav, the page assembly component)
- `components/decor/`, `components/shared/`, `components/ui/` — ornaments/animation, small reusable widgets (e.g. the countdown), and shadcn primitives
- `hooks/` — cross-cutting stateful behavior not tied to one component (`useMusicPlayer`, `useAutoScroll`)
- `lib/actions/` — server actions (RSVP, wishes, admin wedding CRUD)
- `lib/supabase/` — the three Supabase client variants (browser, server/cookie-based, service-role admin) plus the proxy session helper
- `lib/content.ts` — shared defensive readers for the wedding's jsonb `content` field
