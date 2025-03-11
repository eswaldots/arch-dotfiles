import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom configuration for tailwind-merge
 * This allows for better handling of class conflicts and custom class patterns
 * based on the project's tailwind.config.js
 */
const twMerge = extendTailwindMerge({
  // Extend the default tailwind-merge configuration
  extend: {
    classGroups: {
      "bg-color": ["bg-primary",  "bg-neutral-100", "bg-neutral-200", "bg-neutral-300", "bg-neutral-400", "bg-neutral-500", "bg-neutral-600", "bg-neutral-700", "bg-neutral-800", "bg-neutral-900", "bg-neutral-950"],
      "text-color": ["text-primary", "text-neutral-100", "text-neutral-200", "text-neutral-300", "text-neutral-400", "text-neutral-500", "text-neutral-600", "text-neutral-700", "text-neutral-800", "text-neutral-900", "text-neutral-950"],
      "border-color": ["border-primary", "border-neutral-100", "border-neutral-200", "border-neutral-300", "border-neutral-400", "border-neutral-500", "border-neutral-600", "border-neutral-700", "border-neutral-800", "border-neutral-900", "border-neutral-950"],
      "ring-color": ["ring-primary", "ring-neutral-100", "ring-neutral-200", "ring-neutral-300", "ring-neutral-400", "ring-neutral-500", "ring-neutral-600", "ring-neutral-700", "ring-neutral-800", "ring-neutral-900", "ring-neutral-950"],
    }
  },
});

/**
 * Combines multiple class values into a single string using clsx and tailwind-merge
 * This helps resolve conflicts between Tailwind classes
 * 
 * @param classes - Array of class values to be merged
 * @returns A string of merged class names
 * 
 * @example
 * // Basic usage
 * cn("text-red-500", "bg-blue-500")
 * 
 * // With conditional classes
 * cn("text-white", isActive && "bg-blue-500", !isActive && "bg-gray-500")
 * 
 * // With object syntax
 * cn({ "text-red-500": isError, "text-green-500": isSuccess })
 * 
 * // Custom colors from tailwind.config.js
 * cn("text-primary", "bg-neutral-100", "border-neutral-900")
 * 
 * // Custom animations from tailwind.config.js
 * cn("animate-openSelect", "keyframes-slideInRight")
 * 
 * // Motion plugin classes
 * cn("motion-safe:hover:animate-openSelect", "motion-duration-300")
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}