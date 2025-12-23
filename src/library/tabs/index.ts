/**
 * Tabs Component Public API
 */

// Components
export { TabsComponent } from './core/tabs.component';
export { TabComponent } from './tab/tab.component';

// Service (for advanced usage)
export { TabsService } from './services/tabs.service';

// Types
export type {
  TabChangeEvent,
  TabAnimation,
  TabOrientation,
  TabPosition,
  AnimationDirection,
  TabsConfig,
} from './types/tabs.types';

export { DEFAULT_TABS_CONFIG } from './types/tabs.types';
