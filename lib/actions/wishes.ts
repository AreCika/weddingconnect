"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export type WishFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

type WishInput = {
  weddingId: string;
  guestName: string;
  message: string;
};

/** No moderation (V1 scope) — visible immediately. Same trust boundary as submitRsvp: no authenticated guest, so this validation is what's enforced. */
export async function submitWish(input: WishInput): Promise<WishFormState> {
  const guestName = input.guestName.trim();
  const message = input.message.trim();

  if (guestName.length < 1 || guestName.length > 100) {
    return { status: "error", message: "Please enter your name." };
  }

  if (message.length < 1 || message.length > 500) {
    return {
      status: "error",
      message: "Please write a message between 1 and 500 characters.",
    };
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("wishes").insert({
    wedding_id: input.weddingId,
    guest_name: guestName,
    message,
  });

  if (error) {
    console.error("Wish submission failed:", error);
    return {
      status: "error",
      message: "Something went wrong submitting your wish. Please try again.",
    };
  }

  return { status: "success" };
}
