/**
 * Shared, defensive readers for a wedding's freeform `content` jsonb column.
 * Every field is optional and admin-supplied, so nothing here throws —
 * malformed or missing data just reads as empty.
 */

export type WeddingContent = Record<string, unknown>;

type ReadStringOptions = {
  trim?: boolean;
};

function isNonEmptyString(value: unknown, trim: boolean): value is string {
  if (typeof value !== "string") return false;
  return (trim ? value.trim() : value).length > 0;
}

/** Reads a top-level string field, e.g. content.qrCodeUrl or content.music_url. */
export function readContentString(
  content: WeddingContent,
  key: string,
  options: ReadStringOptions = {}
): string | undefined {
  const value = content[key];
  return isNonEmptyString(value, options.trim ?? false) ? value : undefined;
}

/** Reads a string nested under one or more object keys, e.g. ["couple", "bride", "bio"]. */
export function readNestedContentString(
  content: WeddingContent,
  path: string[],
  options: ReadStringOptions = {}
): string | undefined {
  let current: unknown = content;
  for (const key of path) {
    if (typeof current !== "object" || current === null) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return isNonEmptyString(current, options.trim ?? false) ? current : undefined;
}

/** Reads a top-level array of strings, e.g. content.gallery. */
export function readContentStringArray(content: WeddingContent, key: string): string[] {
  const value = content[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

/**
 * Reads a top-level array of objects, keeping only items where every key in
 * `requiredFields` is a string; `optionalFields` default to "" instead of
 * dropping the item when missing or non-string.
 */
export function readContentObjectArray<Req extends string, Opt extends string = never>(
  content: WeddingContent,
  key: string,
  requiredFields: readonly Req[],
  optionalFields: readonly Opt[] = []
): Array<Record<Req, string> & Record<Opt, string>> {
  const raw = content[key];
  if (!Array.isArray(raw)) return [];

  const results: Array<Record<Req, string> & Record<Opt, string>> = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) continue;
    const record = item as Record<string, unknown>;

    // Built untyped and cast once below — TS can't verify a generic key
    // assignment like `entry[field: Req] = value` is safe, even though it
    // is by construction (every field here is confirmed a string first).
    const entry: Record<string, string> = {};
    let valid = true;
    for (const field of requiredFields) {
      const value = record[field];
      if (typeof value !== "string") {
        valid = false;
        break;
      }
      entry[field] = value;
    }
    if (!valid) continue;

    for (const field of optionalFields) {
      const value = record[field];
      entry[field] = typeof value === "string" ? value : "";
    }

    results.push(entry as Record<Req, string> & Record<Opt, string>);
  }
  return results;
}
