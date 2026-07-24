import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "Siti Nurhaliza" -> "siti-nurhaliza". Lowercases, replaces runs of
 * non-alphanumeric characters with a single hyphen, and trims stray
 * leading/trailing hyphens. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
