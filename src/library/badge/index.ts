/**
 * Badge Module Exports
 */

// Components
export { BadgeComponent } from './components/badge.component';

// Directives
export { BadgeDirective } from './directives/badge.directive';

// Types
export type {
  BadgeVariant,
  BadgeAppearance,
  BadgeSize,
  BadgeShape,
  BadgePosition,
  BadgeStatus,
  BadgeContent,
} from './types/badge.types';

export { DEFAULT_BADGE_CONFIG, BADGE_ANIMATION } from './types/badge.types';

// Utils
export { formatBadgeValue, shouldHideBadge } from './utils/badge-utils';
