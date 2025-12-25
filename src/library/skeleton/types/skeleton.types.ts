/**
 * Skeleton Type Definitions
 *
 * Provides comprehensive type safety for Skeleton component configuration.
 * Organized by category for easy discovery and usage.
 */

// ============================================================================
// SHAPE VARIANTS
// ============================================================================

/**
 * Skeleton shape variants
 * - text: Single line text placeholder
 * - circle: Circular shape (avatars, icons)
 * - rectangle: Standard rectangular block
 * - rounded: Rectangle with rounded corners
 * - square: Equal width/height square
 * - custom: User-defined dimensions
 */
export type SkeletonVariant =
  | 'text'
  | 'circle'
  | 'rectangle'
  | 'rounded'
  | 'square'
  | 'custom';

// ============================================================================
// ANIMATIONS
// ============================================================================

/**
 * Animation types - ALL GPU-accelerated
 * - shimmer: Wave of light moving across (uses transform)
 * - pulse: Subtle fade in/out (uses opacity)
 * - wave: Softer shimmer with fade (uses transform + opacity)
 * - none: Static placeholder, no animation
 */
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'wave' | 'none';

/** Animation speed presets */
export type SkeletonSpeed = 'slow' | 'normal' | 'fast';

// ============================================================================
// SIZES
// ============================================================================

/** Predefined size presets */
export type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/** Height mapping for text/rectangle variants */
export const SKELETON_SIZE_MAP: Record<SkeletonSize, string> = {
  xs: '0.5rem', // 8px
  sm: '0.75rem', // 12px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '2.5rem', // 40px
  full: '100%',
} as const;

/** Circle/Avatar size presets */
export const SKELETON_CIRCLE_SIZES: Record<SkeletonSize, string> = {
  xs: '1.5rem', // 24px
  sm: '2rem', // 32px
  md: '2.5rem', // 40px
  lg: '3rem', // 48px
  xl: '4rem', // 64px
  '2xl': '5rem', // 80px
  full: '100%',
} as const;

/** Animation duration by speed */
export const SKELETON_SPEED_MAP: Record<SkeletonSpeed, string> = {
  slow: '2s',
  normal: '1.5s',
  fast: '1s',
} as const;

// ============================================================================
// LAYOUT PRESETS
// ============================================================================

/**
 * Layout presets for common UI patterns
 * Organized by category for easy discovery
 */
export type SkeletonPreset =
  // Content Cards
  | 'card' // Basic card with image + text
  | 'card-horizontal' // Horizontal media card
  | 'card-compact' // Minimal card (title + meta)
  | 'product-card' // E-commerce product
  | 'article-card' // Blog/news article

  // Lists & Items
  | 'list-item' // Single list item
  | 'list-item-avatar' // List with avatar
  | 'list-item-media' // List with thumbnail
  | 'list-item-action' // List with action button

  // Tables & Data
  | 'table-row' // Standard table row
  | 'table-row-actions' // Table row with action column
  | 'data-grid' // Multi-column data grid

  // Social & Feed
  | 'social-post' // Social media post
  | 'comment' // Comment with avatar
  | 'feed-item' // Timeline/feed item
  | 'notification' // Notification item

  // Profile & User
  | 'profile-header' // User profile header
  | 'user-card' // User summary card
  | 'avatar-text' // Avatar with name/description
  | 'contact-card' // Contact information

  // Media
  | 'image' // Image placeholder
  | 'video' // Video player placeholder
  | 'gallery-grid' // Image gallery grid
  | 'carousel-item' // Carousel/slider item

  // Navigation
  | 'sidebar-item' // Sidebar nav item
  | 'menu-item' // Menu dropdown item
  | 'breadcrumb' // Breadcrumb trail
  | 'tab-bar' // Tab navigation

  // Forms & Input
  | 'form-field' // Label + input field
  | 'form-group' // Multiple form fields
  | 'search-bar' // Search input

  // Dashboard
  | 'stat-card' // Statistics card
  | 'chart' // Chart placeholder
  | 'widget' // Dashboard widget
  | 'kpi-card' // KPI metric card

  // Complex Layouts
  | 'hero-section' // Hero/banner section
  | 'pricing-card' // Pricing table card
  | 'testimonial' // Testimonial/review
  | 'feature-item'; // Feature list item

// ============================================================================
// HEADING LEVELS
// ============================================================================

/** Heading level for text skeleton */
export type SkeletonHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/** Heading size mapping */
export const SKELETON_HEADING_SIZES: Record<SkeletonHeadingLevel, string> = {
  h1: '2.25rem', // 36px
  h2: '1.875rem', // 30px
  h3: '1.5rem', // 24px
  h4: '1.25rem', // 20px
  h5: '1.125rem', // 18px
  h6: '1rem', // 16px
} as const;

// ============================================================================
// LAYOUT
// ============================================================================

/** Layout direction for skeleton groups */
export type SkeletonLayout = 'horizontal' | 'vertical';

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

/** Default skeleton configuration */
export const DEFAULT_SKELETON_CONFIG = {
  variant: 'text' as SkeletonVariant,
  animation: 'shimmer' as SkeletonAnimation,
  size: 'md' as SkeletonSize,
  speed: 'normal' as SkeletonSpeed,
  count: 1,
  borderRadius: null as string | null,
  animated: true,
} as const;

/** Default text skeleton configuration */
export const DEFAULT_TEXT_SKELETON_CONFIG = {
  lines: 1,
  heading: false,
  headingLevel: 'h2' as SkeletonHeadingLevel,
  lastLineWidth: 75,
  randomize: false,
  spacing: 'sm' as SkeletonSize,
  fullWidth: false,
} as const;

/** Default group skeleton configuration */
export const DEFAULT_GROUP_SKELETON_CONFIG = {
  layout: 'vertical' as SkeletonLayout,
  gap: 'md' as SkeletonSize,
  repeat: 1,
  stagger: true,
  staggerDelay: 100,
  columns: 4,
} as const;
