"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export type RsvpFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

type RsvpInput = {
  weddingId: string;
  name: string;
  phoneNumber: string;
  attending: "attending" | "not_attending";
  headcount: number;
};

/**
 * Submits or updates a guest's RSVP. Runs entirely server-side using the
 * admin client — same reasoning as the read path: there's no authenticated
 * guest, so this function itself, not RLS, is the trust boundary. Every
 * input is re-validated here, independent of whatever the form already
 * checked, because client-side validation can always be bypassed.
 */
export async function submitRsvp(input: RsvpInput): Promise<RsvpFormState> {
  const name = input.name.trim();
  const phoneNumber = input.phoneNumber.replace(/\D/g, ""); // digits only

  if (name.length < 1 || name.length > 100) {
    return { status: "error", message: "Please enter your name." };
  }

  if (phoneNumber.length < 8 || phoneNumber.length > 15) {
    return { status: "error", message: "Please enter a valid phone number." };
  }

  if (input.attending !== "attending" && input.attending !== "not_attending") {
    return { status: "error", message: "Please choose whether you're attending." };
  }

  // Never trust client-sent headcount blindly — clamp to sane bounds.
  const headcount =
    input.attending === "attending"
      ? Math.min(Math.max(Math.trunc(input.headcount), 1), 20)
      : 0;

  const supabase = createAdminClient();

  const { error } = await supabase.from("guests").upsert(
    {
      wedding_id: input.weddingId,
      name,
      phone_number: phoneNumber,
      rsvp_status: input.attending,
      headcount,
      responded_at: new Date().toISOString(),
    },
    { onConflict: "wedding_id,phone_number" }
  );

  if (error) {
    console.error("RSVP submission failed:", error);
    return {
      status: "error",
      message: "Something went wrong submitting your RSVP. Please try again.",
    };
  }

  return { status: "success" };
}