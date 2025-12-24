/**
 * Badge Utilities
 */

/**
 * Format badge content with max value cap
 * @param value - The numeric value to format
 * @param maxValue - Maximum value before showing "+"
 * @returns Formatted string (e.g., "99+", "1k+")
 */
export function formatBadgeValue(value: number, maxValue: number = 99): string {
  if (value <= maxValue) {
    return value.toString();
  }

  // Handle 1000+ formatting
  if (value >= 1000 && maxValue >= 1000) {
    const k = Math.floor(value / 1000);
    return k >= maxValue / 1000 ? `${Math.floor(maxValue / 1000)}k+` : `${k}k`;
  }

  return `${maxValue}+`;
}

/**
 * Check if badge should be hidden based on value
 * @param content - Badge content
 * @param hideZero - Whether to hide when zero
 */
export function shouldHideBadge(
  content: string | number | null,
  hideZero: boolean
): boolean {
  if (content === null || content === '') return false; // Dot badge - always visible
  if (typeof content === 'number' && content === 0 && hideZero) return true;
  if (content === '0' && hideZero) return true;
  return false;
}
