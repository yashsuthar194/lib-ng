/**
 * Avatar Type Definitions
 *
 * Provides type safety for Avatar component configuration.
 */

/** Avatar sizes with responsive scaling */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Avatar shapes */
export type AvatarShape = 'circle' | 'rounded' | 'square';

/** Presence status types */
export type AvatarPresence = 'online' | 'offline' | 'busy' | 'away';

/** Avatar content source priority */
export type AvatarSource = 'image' | 'initials' | 'icon';

/** Avatar group expand trigger modes */
export type AvatarExpandTrigger = 'hover' | 'click';

/** Default configuration */
export const DEFAULT_AVATAR_CONFIG = {
  size: 'md' as AvatarSize,
  shape: 'circle' as AvatarShape,
  loading: 'lazy' as 'lazy' | 'eager',
} as const;

/** Size to CSS variable mapping */
export const AVATAR_SIZE_MAP: Record<AvatarSize, string> = {
  xs: '1.5rem', // 24px
  sm: '2rem', // 32px
  md: '2.5rem', // 40px
  lg: '3rem', // 48px
  xl: '3.5rem', // 56px
  '2xl': '4rem', // 64px
} as const;

/** Presence indicator position by avatar size */
export const PRESENCE_SIZE_MAP: Record<AvatarSize, string> = {
  xs: '0.375rem', // 6px
  sm: '0.5rem', // 8px
  md: '0.625rem', // 10px
  lg: '0.75rem', // 12px
  xl: '0.875rem', // 14px
  '2xl': '1rem', // 16px
} as const;
