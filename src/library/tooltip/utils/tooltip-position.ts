/**
 * Tooltip Position Utilities
 *
 * Smart positioning logic with viewport boundary detection and auto-flip.
 */

import type { TooltipPosition } from '../types/tooltip.types';

export interface PositionResult {
  x: number;
  y: number;
  actualPosition: TooltipPosition;
  arrowX?: number;
  arrowY?: number;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** Get opposite position for flipping */
function getOpposite(position: TooltipPosition): TooltipPosition {
  const map: Record<string, TooltipPosition> = {
    top: 'bottom',
    'top-start': 'bottom-start',
    'top-end': 'bottom-end',
    bottom: 'top',
    'bottom-start': 'top-start',
    'bottom-end': 'top-end',
    left: 'right',
    'left-start': 'right-start',
    'left-end': 'right-end',
    right: 'left',
    'right-start': 'left-start',
    'right-end': 'left-end',
  };
  return map[position] || 'top';
}

/** Calculate position coordinates */
function getCoords(
  trigger: Rect,
  tooltip: Rect,
  position: TooltipPosition,
  offset: number
): { x: number; y: number } {
  const base = position.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';
  const align = position.split('-')[1] as 'start' | 'end' | undefined;

  let x = 0;
  let y = 0;

  switch (base) {
    case 'top':
      y = trigger.top - tooltip.height - offset;
      x = getCenterX(trigger, tooltip, align);
      break;
    case 'bottom':
      y = trigger.top + trigger.height + offset;
      x = getCenterX(trigger, tooltip, align);
      break;
    case 'left':
      x = trigger.left - tooltip.width - offset;
      y = getCenterY(trigger, tooltip, align);
      break;
    case 'right':
      x = trigger.left + trigger.width + offset;
      y = getCenterY(trigger, tooltip, align);
      break;
  }

  return { x, y };
}

function getCenterX(trigger: Rect, tooltip: Rect, align?: string): number {
  if (align === 'start') return trigger.left;
  if (align === 'end') return trigger.left + trigger.width - tooltip.width;
  return trigger.left + (trigger.width - tooltip.width) / 2;
}

function getCenterY(trigger: Rect, tooltip: Rect, align?: string): number {
  if (align === 'start') return trigger.top;
  if (align === 'end') return trigger.top + trigger.height - tooltip.height;
  return trigger.top + (trigger.height - tooltip.height) / 2;
}

/** Check if position fits in viewport */
function fitsInViewport(
  x: number,
  y: number,
  tooltip: Rect,
  viewport: { width: number; height: number }
): boolean {
  return (
    x >= 0 && y >= 0 && x + tooltip.width <= viewport.width && y + tooltip.height <= viewport.height
  );
}

/** Clamp value between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Main positioning function */
export function calculateTooltipPosition(
  triggerEl: HTMLElement,
  tooltipEl: HTMLElement,
  preferredPosition: TooltipPosition,
  offset: number = 8
): PositionResult {
  const triggerRect = triggerEl.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();

  const trigger: Rect = {
    top: triggerRect.top + window.scrollY,
    left: triggerRect.left + window.scrollX,
    width: triggerRect.width,
    height: triggerRect.height,
  };

  const tooltip: Rect = {
    top: 0,
    left: 0,
    width: tooltipRect.width,
    height: tooltipRect.height,
  };

  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Try preferred position
  let coords = getCoords(trigger, tooltip, preferredPosition, offset);
  let actualPosition = preferredPosition;

  // Check viewport fit, try opposite if needed
  const viewX = coords.x - window.scrollX;
  const viewY = coords.y - window.scrollY;

  if (!fitsInViewport(viewX, viewY, tooltip, viewport)) {
    const opposite = getOpposite(preferredPosition);
    const oppositeCoords = getCoords(trigger, tooltip, opposite, offset);
    const oppViewX = oppositeCoords.x - window.scrollX;
    const oppViewY = oppositeCoords.y - window.scrollY;

    if (fitsInViewport(oppViewX, oppViewY, tooltip, viewport)) {
      coords = oppositeCoords;
      actualPosition = opposite;
    } else {
      // Clamp to viewport as fallback
      coords.x = window.scrollX + clamp(viewX, 8, viewport.width - tooltip.width - 8);
      coords.y = window.scrollY + clamp(viewY, 8, viewport.height - tooltip.height - 8);
    }
  }

  // Calculate arrow position
  const base = actualPosition.split('-')[0];
  let arrowX: number | undefined;
  let arrowY: number | undefined;

  if (base === 'top' || base === 'bottom') {
    arrowX = trigger.left + trigger.width / 2 - coords.x;
  } else {
    arrowY = trigger.top + trigger.height / 2 - coords.y;
  }

  return {
    x: coords.x,
    y: coords.y,
    actualPosition,
    arrowX,
    arrowY,
  };
}
