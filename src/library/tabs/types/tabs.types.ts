/**
 * Tab Component Types
 * 
 * Type definitions for the Tab component system.
 */

/**
 * Event emitted when active tab changes.
 */
export interface TabChangeEvent {
  /** Previous tab index */
  previousIndex: number;
  /** New tab index */
  currentIndex: number;
  /** Tab id if provided */
  tabId?: string;
}

/**
 * Tab animation type.
 */
export type TabAnimation = 'slide' | 'fade' | 'none';

/**
 * Tab orientation.
 */
export type TabOrientation = 'horizontal' | 'vertical';

/**
 * Tab position relative to content.
 */
export type TabPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Animation direction for slide animations.
 */
export type AnimationDirection = 'left' | 'right' | 'up' | 'down';

/**
 * Configuration for the Tabs component.
 */
export interface TabsConfig {
  /** Default animation type */
  animation?: TabAnimation;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Keep destroyed tabs in DOM */
  keepAlive?: boolean;
  /** Default orientation */
  orientation?: TabOrientation;
}

/**
 * Default configuration values.
 */
export const DEFAULT_TABS_CONFIG: TabsConfig = {
  animation: 'slide',
  animationDuration: 200,
  keepAlive: false,
  orientation: 'horizontal',
};
