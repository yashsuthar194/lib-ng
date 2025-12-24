/**
 * Breadcrumb Public API
 *
 * Re-exports all public components, services, and types.
 */

// Components
export { BreadcrumbComponent } from './components/breadcrumb.component';
export { BreadcrumbItemComponent } from './components/breadcrumb-item.component';

// Services
export { BreadcrumbService } from './services/breadcrumb.service';

// Types
export type {
  BreadcrumbItem,
  BreadcrumbSize,
  BreadcrumbSeparator,
  BreadcrumbClickEvent,
  RouteBreadcrumb,
  RouteBreadcrumbConfig,
  BreadcrumbResolver,
  BreadcrumbOverrideMode,
} from './types/breadcrumb.types';
