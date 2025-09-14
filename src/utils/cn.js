import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function for conditionally joining class names together.
 * It uses `clsx` and `tailwind-merge` to handle conditional classes and merge Tailwind CSS classes without conflicts.
 *
 * @param {...(string | null | undefined | {[key: string]: boolean})} inputs - The class names to join.
 * @returns {string} The merged class names.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}