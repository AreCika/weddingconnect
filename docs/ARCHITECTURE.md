# Architecture

Quick orientation for picking this project back up after time away.

## Two-tier trust model

There are two separate access patterns, and they use different Supabase clients on purpose:

- **Admin (`/admin/*`)** — a real login. `proxy.ts` gates every admin route by verifying a Supabase session (`getClaims()`), and Row Level Security policies (`admin_full_access`) require `auth.role() = 'authenticated'`. Admin pages use the cookie-based server client (`lib/supabase/server.ts`), so RLS is the actual enforcement.
- **Guests and couples** — no login at all. The guest page (`guest_access_token`) and the couple's dashboard (`dashboard_access_token`) are resolved by an unguessable token in the URL. These routes use the service-role client (`lib/supabase/admin.ts`), which bypasses RLS entirely — so the token check in application code (`lib/weddings.ts`) *is* the access control. There is no RLS policy backing this up; if that token check is ever removed or weakened, the data is exposed. Same reasoning applies to the server actions (`submitRsvp`, `submitWish`): since there's no authenticated guest, all validation happens there, not at the database layer.

Don't confuse the two: adding an RLS policy for guests would do nothing (service-role bypasses it), and reusing the service-role client on an admin route would silently skip the login check.

## Why guests self-register instead of pre-loaded links

Early design considered generating one unique link per invited guest. Rejected in favor of one shared `guest_access_token` link per wedding (sent once, via WhatsApp) with guests entering their own name and phone number on the RSVP form. Phone number is a soft identity key — resubmitting with the same number updates the existing RSVP (`upsert` on `wedding_id, phone_number`) instead of creating a duplicate. This trades perfect guest-identity tracking for a much simpler send flow: the couple shares one link, not a spreadsheet of per-guest URLs.

## Archival policy

A wedding's `status` becomes `archived` at some point after the event. This only retires the **public guest-facing page** (`getWeddingPageData` 404s on archived) — it's about not hosting a stale RSVP page indefinitely, not about deleting or hiding data. The couple's dashboard (`getDashboardData`) deliberately does *not* 404 on archived weddings, since they should always be able to see their final numbers and wishes.

## Permission model

This is freelance/agency-style: there is exactly one admin account (created directly in the Supabase dashboard, no sign-up flow), and the admin is the only editor. Couples get a read-only dashboard, never edit access — all wedding data (dates, venue, content) is managed by the admin on their behalf. Guests never authenticate at all. If this ever needs to become self-serve (couples editing their own weddings), that's a real auth model addition, not a config toggle.
