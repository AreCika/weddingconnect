import { Reveal } from "@/components/ui/reveal";
import { HibiscusIcon } from "@/components/decor/ornaments";

type ClosingProps = {
  brideName: string;
  groomName: string;
};

export function Closing({ brideName, groomName }: ClosingProps) {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <Reveal>
        <HibiscusIcon className="mx-auto size-7 text-primary/60" />
        <p className="mt-4 font-serif text-sm text-muted-foreground">
          With love and gratitude,
        </p>
        <p className="mt-1 font-script text-3xl text-primary">
          {brideName} &amp; {groomName}
        </p>
      </Reveal>
    </footer>
  );
}
