import { cache } from "react";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export type GuestPageData = {
  guest: {
    id: string;
    name: string;
    rsvp_status: "pending" | "attending" | "not_attending";
    headcount: number;
  };
  wedding: {
    id: string;
    bride_name: string;
    groom_name: string;
    wedding_date: string;
    venue_name: string | null;
    venue_address: string | null;
    content: Record<string, unknown>;
  };
};

/**
 * Resolves a guest's public wedding page by their unique access token.
 *
 * Wrapped in React's cache() so generateMetadata() (for WhatsApp/OG tags)
 * and the page component itself share one Supabase round trip per request
 * instead of fetching twice — both call this function, React dedupes it.
 *
 * Uses the service-role client deliberately: this route has no logged-in
 * user, so there's no auth.uid() for RLS to check against. The token itself
 * — verified here, in trusted server code — IS the access control. See
 * Phase 4 for why RLS alone can't enforce token-based sharing links.
 */
export const getGuestPageData = cache(
  async (guestToken: string): Promise<GuestPageData> => {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("guests")
      .select(
        `
        id, name, rsvp_status, headcount,
        wedding:weddings (
          id, bride_name, groom_name, wedding_date,
          venue_name, venue_address, content, status
        )
      `
      )
      .eq("access_token", guestToken)
      .single();

    // Deliberately one generic "not found" for every failure mode —
    // invalid token, deleted guest, archived wedding. Distinguishing
    // between them in the response would leak which case applied
    // (e.g. "wedding exists but guest doesn't" vs "wedding doesn't exist").
    if (
      error ||
      !data ||
      !data.wedding ||
      data.wedding.status === "archived"
    ) {
      notFound();
    }

    return { guest: data, wedding: data.wedding };
  }
);