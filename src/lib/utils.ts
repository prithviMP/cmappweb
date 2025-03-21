import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateFilename(filename: string, maxLength: number = 20): string {
  if (filename.length <= maxLength) return filename;
  
  const extension = filename.split('.').pop() || '';
  const nameWithoutExt = filename.slice(0, filename.lastIndexOf('.'));
  
  if (nameWithoutExt.length <= maxLength - extension.length - 3) {
    return filename;
  }
  
  const truncatedName = nameWithoutExt.slice(0, maxLength - extension.length - 3);
  return `${truncatedName}...${extension}`;
}