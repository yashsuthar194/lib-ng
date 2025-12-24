/**
 * Tooltip Types
 */

import type { TemplateRef } from '@angular/core';

/** Tooltip placement */
export type TooltipPosition = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

/** Tooltip variant for semantic coloring */
export type TooltipVariant = 'default' | 'info' | 'warning' | 'error';

/** Trigger events */
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

/** Tooltip content type */
export type TooltipContent = string | TemplateRef<unknown>;

/** Defaults */
export const DEFAULT_TOOLTIP_CONFIG = {
  position: 'top' as TooltipPosition,
  variant: 'default' as TooltipVariant,
  showDelay: 200,
  hideDelay: 0,
  showArrow: true,
  offset: 8,
} as const;

/** Animation timing */
export const TOOLTIP_ANIMATION = {
  duration: 150,
} as const;
