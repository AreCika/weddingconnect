import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";

type GiftProps = {
  content: Record<string, unknown>;
};

function readQrCodeUrl(content: Record<string, unknown>): string | null {
  const value = content.qrCodeUrl;
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function Gift({ content }: GiftProps) {
  const qrCodeUrl = readQrCodeUrl(content);
  if (!qrCodeUrl) return null;

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
      </Reveal>
    </section>
  );
}
