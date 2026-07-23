"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function parseWeddingFields(formData: FormData) {
  const brideName = (formData.get("brideName") as string)?.trim();
  const groomName = (formData.get("groomName") as string)?.trim();
  const weddingDate = formData.get("weddingDate") as string;
  const venueName = (formData.get("venueName") as string)?.trim() || null;
  const venueAddress = (formData.get("venueAddress") as string)?.trim() || null;

  if (!brideName || !groomName) {
    throw new Error("Bride and groom names are required.");
  }
  if (!weddingDate || Number.isNaN(Date.parse(weddingDate))) {
    throw new Error("A valid wedding date is required.");
  }

  return { brideName, groomName, weddingDate, venueName, venueAddress };
}

export async function createWedding(formData: FormData) {
  const fields = parseWeddingFields(formData);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("weddings")
    .insert({
      bride_name: fields.brideName,
      groom_name: fields.groomName,
      wedding_date: fields.weddingDate,
      venue_name: fields.venueName,
      venue_address: fields.venueAddress,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error("Failed to create wedding.");
  }

  redirect("/admin");
}

export async function updateWedding(weddingId: string, formData: FormData) {
  const fields = parseWeddingFields(formData);
  const supabase = await createClient();

  const { error } = await supabase
    .from("weddings")
    .update({
      bride_name: fields.brideName,
      groom_name: fields.groomName,
      wedding_date: fields.weddingDate,
      venue_name: fields.venueName,
      venue_address: fields.venueAddress,
    })
    .eq("id", weddingId);

  if (error) {
    throw new Error("Failed to update wedding.");
  }

  redirect("/admin");
}

export async function archiveWedding(weddingId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("weddings")
    .update({ status: "archived", archived_at: new Date().toISOString() })
    .eq("id", weddingId);

  if (error) {
    throw new Error("Failed to archive wedding.");
  }

  redirect("/admin");
}

export async function unarchiveWedding(weddingId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("weddings")
    .update({ status: "active", archived_at: null })
    .eq("id", weddingId);

  if (error) {
    throw new Error("Failed to unarchive wedding.");
  }

  redirect("/admin");
}
