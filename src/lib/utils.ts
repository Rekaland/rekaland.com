
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency
 * @param number The number to format
 * @returns Formatted string (e.g., 1,000,000)
 */
export function formatCurrency(number: number | string | undefined): string {
  if (number === undefined) return "0";
  
  const num = typeof number === "string" ? parseFloat(number) : number;
  
  // Format number with thousand separators
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Get category path from category ID
 * @param category The category ID
 * @returns The path for the category
 */
export function getCategoryPath(category: string): string {
  switch (category) {
    case 'empty_lot':
      return 'kavling-kosongan';
    case 'semi_finished':
      return 'kavling-setengah-jadi';
    case 'ready_to_occupy':
      return 'kavling-siap-huni';
    default:
      return 'all';
  }
}

/**
 * Parse URL category to database category
 * @param urlCategory The category from URL
 * @returns Database category
 */
export function parseUrlCategory(urlCategory?: string): string | undefined {
  if (!urlCategory || urlCategory === 'all') return undefined;
  
  if (urlCategory === 'kavling-kosongan') {
    return 'empty_lot';
  } else if (urlCategory === 'kavling-setengah-jadi') {
    return 'semi_finished';
  } else if (urlCategory === 'kavling-siap-huni') {
    return 'ready_to_occupy';
  }
  
  return undefined;
}
