-- Wishes are left by any well-wisher, not just guests who've RSVP'd — the
-- wishes form only ever asked for a name, never a phone number, so there's
-- no reliable way to tie a wish to a guests row. Store the name directly.

alter table wishes drop column guest_id;
alter table wishes add column guest_name text not null check (char_length(guest_name) between 1 and 100);
