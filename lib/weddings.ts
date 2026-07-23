import { cache } from "react";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export type WeddingPageData = {
  id: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  venue_name: string | null;
  venue_address: string | null;
  content: Record<string, unknown>;
};

/**
 * Resolves the public wedding page by the wedding's shared guest_access_token.
 * Unlike the earlier per-guest version, this no longer resolves a specific
 * guest — guests aren't known until they submit the RSVP form themselves.
 *
 * Uses the service-role client for the same reason as before: there's no
 * logged-in user on this route, so the token itself (verified here, in
 * trusted server code) is the access control.
 */
export const getWeddingPageData = cache(
  async (weddingToken: string): Promise<WeddingPageData> => {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("weddings")
      .select(
        "id, bride_name, groom_name, wedding_date, venue_name, venue_address, content, status"
      )
      .eq("guest_access_token", weddingToken)
      .single();

    if (error || !data || data.status === "archived") {
      notFound();
    }

    return data;
  }
);

export type Wish = {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
};

/**
 * Fetches the wish wall for a wedding, newest first. Unlike the wedding
 * lookup above, a fetch failure here shouldn't 404 the whole page — the
 * wall is a nice-to-have, not the trust boundary — so it just logs and
 * returns an empty list.
 */
export const getWishes = cache(async (weddingId: string): Promise<Wish[]> => {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("wishes")
    .select("id, guest_name, message, created_at")
    .eq("wedding_id", weddingId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch wishes:", error);
    return [];
  }

  return data;
});

/**
 * Resolves the couple's private read-only dashboard by dashboard_access_token.
 * Same trust model as the guest page — no login, the token itself (checked
 * here in trusted server code) is the access control, so this uses the
 * service-role client rather than an admin session.
 *
 * Unlike the guest page, this deliberately does NOT 404 on an archived
 * wedding: archiving only retires the public guest-facing page, it was
 * never meant to cut the couple off from their own final numbers.
 */
export const getDashboardData = cache(async (dashboardToken: string) => {
  const supabase = createAdminClient();

  const { data: wedding, error } = await supabase
    .from("weddings")
    .select("id, bride_name, groom_name, wedding_date, venue_name, venue_address, status")
    .eq("dashboard_access_token", dashboardToken)
    .single();

  if (error || !wedding) {
    notFound();
  }

  const { data: guests } = await supabase
    .from("guests")
    .select("name, phone_number, rsvp_status, headcount, responded_at")
    .eq("wedding_id", wedding.id)
    .order("responded_at", { ascending: false });

  const { data: wishes } = await supabase
    .from("wishes")
    .select("guest_name, message, created_at")
    .eq("wedding_id", wedding.id)
    .order("created_at", { ascending: false });

  return { wedding, guests: guests ?? [], wishes: wishes ?? [] };
});