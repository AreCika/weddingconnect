import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";

type CoupleIntroProps = {
  brideName: string;
  groomName: string;
  content: Record<string, unknown>;
};

function readBio(content: Record<string, unknown>, person: "bride" | "groom"): string | null {
  const couple = content.couple;
  if (typeof couple !== "object" || couple === null) return null;

  const entry = (couple as Record<string, unknown>)[person];
  if (typeof entry !== "object" || entry === null) return null;

  const bio = (entry as Record<string, unknown>).bio;
  return typeof bio === "string" && bio.trim().length > 0 ? bio : null;
}

export function CoupleIntro({ brideName, groomName, content }: CoupleIntroProps) {
  const brideBio = readBio(content, "bride");
  const groomBio = readBio(content, "groom");

  if (!brideBio && !groomBio) return null;

  return (
    <section className="px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">The Happy Couple</h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2">
        <Reveal index={0}>
          <div className="flex h-full flex-col items-center gap-3">
            <h3 className="font-script text-3xl text-primary">{brideName}</h3>
            {brideBio && (
              <p className="font-serif text-base leading-relaxed text-foreground">
                {brideBio}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="flex h-full flex-col items-center gap-3">
            <h3 className="font-script text-3xl text-primary">{groomName}</h3>
            {groomBio && (
              <p className="font-serif text-base leading-relaxed text-foreground">
                {groomBio}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
