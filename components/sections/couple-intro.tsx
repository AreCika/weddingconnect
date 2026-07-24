import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";
import { readNestedContentString, type WeddingContent } from "@/lib/content";

type CoupleIntroProps = {
  brideName: string;
  groomName: string;
  content: WeddingContent;
};

export function CoupleIntro({ brideName, groomName, content }: CoupleIntroProps) {
  const brideBio = readNestedContentString(content, ["couple", "bride", "bio"], { trim: true });
  const groomBio = readNestedContentString(content, ["couple", "groom", "bio"], { trim: true });

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
