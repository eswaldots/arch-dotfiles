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
  theme: {
    colors: {
      primary: 'primary',
      neutral: ['100', '300', '500', '700', '800', '900', '950'],
    },
    animation: {
      openSelect: 'openSelect',
    },
    keyframes: {
      openSelect: 'openSelect',
      slideInRight: 'slideInRight',
      slideOutRight: 'slideOutRight',
    },
  },
}
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