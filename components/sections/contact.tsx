import { Phone, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionDivider } from "@/components/decor/ornaments";

type ContactProps = {
  content: Record<string, unknown>;
};

type ContactEntry = {
  name: string;
  relation: string;
  phone: string;
};

function readContacts(content: Record<string, unknown>): ContactEntry[] {
  const raw = content.contacts;
  if (!Array.isArray(raw)) return [];

  const contacts: ContactEntry[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) continue;
    const { name, relation, phone } = item as Record<string, unknown>;
    if (typeof name !== "string" || typeof relation !== "string" || typeof phone !== "string") continue;
    contacts.push({ name, relation, phone });
  }
  return contacts;
}

export function Contact({ content }: ContactProps) {
  const contacts = readContacts(content);
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
