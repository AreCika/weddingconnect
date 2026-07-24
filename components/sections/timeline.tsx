import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";
import { readContentObjectArray, type WeddingContent } from "@/lib/content";

type TimelineProps = {
  content: WeddingContent;
};

export function Timeline({ content }: TimelineProps) {
  const events = readContentObjectArray(
    content,
    "timeline",
    ["time", "title"] as const,
    ["description"] as const
  );
  if (events.length === 0) return null;

  return (
    <section className="px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">Order of Events</h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="mx-auto mt-12 max-w-md text-left">
        {events.map((event, i) => (
          <Reveal key={i} index={i}>
            <div className="relative pb-10 pl-8 last:pb-0">
              {i < events.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[5px] top-3 w-px bg-primary/25"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 size-3 rounded-full bg-primary"
              />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {event.time}
              </p>
              <h3 className="mt-1 font-serif text-lg text-foreground">
                {event.title}
              </h3>
              {event.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.description}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
