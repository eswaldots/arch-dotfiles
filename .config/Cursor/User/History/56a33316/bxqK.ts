import { type Config } from 'tailwind-merge';

/**
 * Custom configuration for tailwind-merge
 * This extends the default configuration with custom classes from tailwind.config.js
 */
export const tailwindMergeConfig = {
  cacheSize: 500,
  classGroups: {
    // Add animation classes from tailwind.config.js
    animate: [
      ['openSelect', 'slideInRight', 'slideOutRight']
    ],
    // Add any other custom class groups here
  },
};

/**
 * Helper function to create class name values from strings
 * @param classNames Array of class names
 * @returns Array of ClassNameValue objects
 */
export function createClassNameValues(classNames: string[]): ClassNameValue[] {
  return classNames.map(className => ({ className }));
} 