import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes conditionally
 * without duplicate or conflicting styles.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into an editorial readable format
 * e.g., "October 2026" or "14 Oct 2026"
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(d);
}

/**
 * Formats numbers into a clean studio display format
 * e.g., 1200 -> "1,200+"
 */
export function formatStatCount(count: number, suffix: string = "+"): string {
  return `${new Intl.NumberFormat("en-US").format(count)}${suffix}`;
}
