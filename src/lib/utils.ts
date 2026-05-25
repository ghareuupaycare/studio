import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts Devanagari digits (०-९) to standard English digits (0-9).
 * Used to ensure numerical consistency across the UI.
 */
export function toEnglishDigits(str: string): string {
  if (!str) return str;
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return str.split('').map(char => {
    const index = devanagariDigits.indexOf(char);
    return index !== -1 ? index.toString() : char;
  }).join('');
}
