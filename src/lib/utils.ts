import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts Devanagari digits (०-९) to standard English digits (0-9).
 * Robustly handles strings, arrays of strings, and null/undefined values.
 */
export function toEnglishDigits(input: string | string[] | any): string {
  if (input === null || input === undefined) return "";

  // If input is an array, process each item and join with a space
  if (Array.isArray(input)) {
    return input.map(item => toEnglishDigits(item)).join(' ');
  }

  // Ensure we are working with a string
  const str = String(input);
  if (!str) return str;

  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  
  return str.split('').map(char => {
    const index = devanagariDigits.indexOf(char);
    return index !== -1 ? index.toString() : char;
  }).join('');
}
