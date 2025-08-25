import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateStableUUID(seed: string): string {
  // Create a simple hash from the seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert hash to a UUID format
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const randomPart = Math.abs(hash * 1234567).toString(16).padStart(8, '0');
  const timePart = Math.abs(hash * 9876543).toString(16).padStart(8, '0');
  
  return `${hex.slice(0, 8)}-${hex.slice(0, 4)}-4${randomPart.slice(0, 3)}-8${randomPart.slice(3, 6)}-${timePart.slice(0, 12)}`;
}

export function sanitizeText(text: string) {
  return text.replace("<has_function_call>", "");
}
