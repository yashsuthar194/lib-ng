/**
 * Skeleton Module Public API
 *
 * Provides flexible, GPU-accelerated skeleton loading components
 * for improved perceived performance during content loading.
 */

// ============================================================================
// COMPONENTS
// ============================================================================

export { SkeletonComponent } from './components/skeleton.component';
export { SkeletonTextComponent } from './components/skeleton-text.component';
export { SkeletonGroupComponent } from './components/skeleton-group.component';

// ============================================================================
// DIRECTIVES
// ============================================================================

export { SkeletonDirective } from './directives/skeleton.directive';

// ============================================================================
// TYPES
// ============================================================================

export type {
  SkeletonVariant,
  SkeletonAnimation,
  SkeletonSize,
  SkeletonSpeed,
  SkeletonPreset,
  SkeletonLayout,
  SkeletonHeadingLevel,
} from './types/skeleton.types';

// ============================================================================
// CONSTANTS
// ============================================================================

export {
  DEFAULT_SKELETON_CONFIG,
  DEFAULT_TEXT_SKELETON_CONFIG,
  DEFAULT_GROUP_SKELETON_CONFIG,
  SKELETON_SIZE_MAP,
  SKELETON_CIRCLE_SIZES,
  SKELETON_SPEED_MAP,
  SKELETON_HEADING_SIZES,
} from './types/skeleton.types';
