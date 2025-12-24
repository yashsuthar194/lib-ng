/**
 * Avatar Utility Functions
 *
 * Pure functions for avatar logic - no side effects, easily testable.
 */

/**
 * Generate initials from a name.
 * - Single word: First 2 characters ("John" → "JO")
 * - Two+ words: First letter of first two words ("John Doe" → "JD")
 *
 * @param name - User's display name
 * @returns Uppercase initials (max 2 characters)
 */
export function generateInitials(name: string | null | undefined): string {
  if (!name?.trim()) return '';

  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return '';
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Generate a consistent background color from a string.
 * Uses simple hash to ensure same name always gets same color.
 *
 * @param str - String to hash (typically user's name)
 * @returns CSS color value
 */
export function generateColorFromString(str: string | null | undefined): string {
  if (!str?.trim()) return 'var(--lib-color-neutral-400)';

  // Curated palette of accessible colors
  const colors = [
    'var(--lib-color-primary-500)',
    'var(--lib-color-info)',
    'var(--lib-color-success)',
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange
    '#6366f1', // indigo
  ];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

/**
 * Determine which content source to display.
 *
 * @param src - Image URL
 * @param name - User's name for initials
 * @param imageError - Whether image failed to load
 * @returns Content source type
 */
export function getAvatarSource(
  src: string | null | undefined,
  name: string | null | undefined,
  imageError: boolean
): 'image' | 'initials' | 'icon' {
  if (src && !imageError) return 'image';
  if (name?.trim()) return 'initials';
  return 'icon';
}
