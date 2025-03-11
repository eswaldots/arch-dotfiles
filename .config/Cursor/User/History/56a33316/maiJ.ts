import { type ClassNameValue, type Config } from 'tailwind-merge';

/**
 * Custom configuration for tailwind-merge
 * This extends the default configuration with custom classes from tailwind.config.js
 */
export const tailwindMergeConfig: Config = {
  cacheSize: 500,
  theme: {},
  classGroups: {
    // Add animation classes from tailwind.config.js
    animate: [
      { animate: ['openSelect', 'slideInRight', 'slideOutRight'] }
    ],
    // Add any other custom class groups here
  },
  // Define which class groups should conflict with each other
  conflictingClassGroups: {},
};

/**
 * Helper function to create class name values from strings
 * @param classNames Array of class names
 * @returns Array of ClassNameValue objects
 */
export function createClassNameValues(classNames: string[]): ClassNameValue[] {
  return classNames.map(className => ({ className }));
} 