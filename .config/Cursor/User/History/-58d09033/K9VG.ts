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
    // Define custom class name matching patterns
    classGroups: {
      // Add custom animation classes from tailwind.config.js
      animate: [
        "openSelect", 
        "slideInRight", 
        "slideOutRight",
        { slideInRight: ["duration-[150ms]", "duration-[300ms]", "duration-[500ms]"] },
        { slideOutRight: ["duration-[150ms]", "duration-[300ms]", "duration-[500ms]"] }
      ],
      // Add custom color classes from tailwind.config.js
      'text-primary': [{ primary: [""] }],
      'bg-primary': [{ primary: [""] }],
      'border-primary': [{ primary: [""] }],
      // Add neutral color variants
      'text-neutral': [{ neutral: ["100", "300", "500", "700", "800", "900", "950"] }],
      'bg-neutral': [{ neutral: ["100", "300", "500", "700", "800", "900", "950"] }],
      'border-neutral': [{ neutral: ["100", "300", "500", "700", "800", "900", "950"] }],
    },
    // Theme-based class groups
    theme: {
      // Define animation durations based on the theme
      animation: {
        openSelect: "openSelect 0.1s ease-in-out",
        slideInRight: "slideInRight 0.3s ease-in-out",
        slideOutRight: "slideOutRight 0.3s ease-in-out"
      },
    },
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
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}