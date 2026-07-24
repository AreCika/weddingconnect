import { Phone, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";
import { readContentObjectArray, type WeddingContent } from "@/lib/content";

type ContactProps = {
  content: WeddingContent;
};

export function Contact({ content }: ContactProps) {
  const contacts = readContentObjectArray(content, "contacts", ["name", "relation", "phone"] as const);
  if (contacts.length === 0) return null;

  return (
    <section id="contact" className="px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-primary">Need Us? Just Ask</h2>
        <SectionDivider className="mt-4" />
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-sm flex-col gap-4">
        {contacts.map((contact, i) => (
          <Reveal key={i} index={i}>
            <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-background/70 px-5 py-4 shadow-sm">
              <div className="text-left">
                <p className="font-serif text-base text-foreground">{contact.name}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {contact.relation}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${contact.name}`}
                  className="flex size-9 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="size-4" />
                </a>
                <a
                  href={`tel:+${contact.phone}`}
                  aria-label={`Call ${contact.name}`}
                  className="flex size-9 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Phone className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
