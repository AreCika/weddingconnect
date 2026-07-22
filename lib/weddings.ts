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