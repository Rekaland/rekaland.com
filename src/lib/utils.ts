
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}M`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}jt`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}rb`;
  } else {
    return value.toString();
  }
}

export function getCategoryPath(category: string): string {
  switch(category) {
    case 'empty_lot':
      return 'kavling-kosongan';
    case 'semi_finished':
      return 'kavling-setengah-jadi';
    case 'ready_to_occupy':
      return 'kavling-siap-huni';
    default:
      return category;
  }
}

export function getCategoryLabel(category: string): string {
  switch(category) {
    case 'empty_lot':
    case 'kavling-kosongan':
      return 'Kavling Kosongan';
    case 'semi_finished':
    case 'kavling-setengah-jadi':
      return 'Kavling Bangunan';
    case 'ready_to_occupy':
    case 'kavling-siap-huni':
      return 'Kavling Siap Huni';
    default:
      return 'Semua Kavling';
  }
}
