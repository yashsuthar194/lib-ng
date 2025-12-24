/**
 * Card Types
 */

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export const DEFAULT_CARD_CONFIG = {
  variant: 'elevated' as CardVariant,
  clickable: false,
} as const;
