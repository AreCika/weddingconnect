"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";
import { readContentString, type WeddingContent } from "@/lib/content";

type GiftProps = {
  content: WeddingContent;
};

export function Gift({ content }: GiftProps) {
  const qrCodeUrl = readContentString(content, "qrCodeUrl");
  const [isSaving, setIsSaving] = useState(false);

  if (!qrCodeUrl) return null;

  // Narrowed to a plain `string` const so handleSave's closure (a separate
  // function scope, which TS won't narrow across) sees a non-null type.
  const url = qrCodeUrl;

  async function handleSave() {
    setIsSaving(true);
    try {
      // A plain <a download> gets ignored by browsers for cross-origin
      // images (the Storage bucket is a different origin) — fetching the
      // bytes ourselves and downloading from a blob URL works around that.
      const response = await fetch(url);
      if (!response.ok) throw new Error("fetch failed");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "wedding-gift-qr.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // CORS or network failure — fall back to opening the image directly
      // so the guest can still save it via long-press / right-click.
      window.open(url, "_blank");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section id="gift" className="px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">A Small Note</h2>
        <SectionDivider className="mt-4" />
        <p className="mx-auto mt-6 max-w-sm font-serif text-base text-foreground">
          Your presence is the greatest gift. But if you&apos;d like to bless
          us further, a small token below is always appreciated.
        </p>

        <div className="relative mx-auto mt-8 aspect-square w-56 overflow-hidden rounded-2xl border border-primary/20 bg-background/70 p-4 shadow-sm">
          <Image
            src={qrCodeUrl}
            alt="Scan to send a gift"
            fill
            sizes="224px"
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 font-serif text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
        >
          <Download className="size-4" />
          {isSaving ? "Saving..." : "Save QR Code"}
        </button>
      </Reveal>
    </section>
  );
}
