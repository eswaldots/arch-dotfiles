import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom configuration for tailwind-merge
 * This allows for better handling of class conflicts and custom class patterns
 */
const twMerge = extendTailwindMerge({
  // Extend the default tailwind-merge configuration
  extend: {
    // Define custom class name matching patterns
    classGroups: {
      // Add custom animation classes from your tailwind config
      animate: ["openSelect", "slideInRight", "slideOutRight"],
      // Add any other custom class groups here
    },
    // Configure conflict resolution for specific class groups
    conflictingClassGroups: {
      // Example: Make text and bg colors conflict with their respective hover variants
      text: ["hover:text", "focus:text"],
      bg: ["hover:bg", "focus:bg"],
      // Add any other conflicting class groups here
    },
    // Configure which class groups should not be merged but replaced
    conflictingClassGroupModifiers: {
      // Example: 'hover:' modifiers should conflict with the same modifiers
      hover: ["hover"],
      focus: ["focus"],
      // Add any other conflicting modifiers here
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