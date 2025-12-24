/**
 * Breadcrumb Type Definitions
 *
 * Provides type safety for Breadcrumb component configuration.
 */

import type { ActivatedRouteSnapshot } from '@angular/router';
import type { Injector } from '@angular/core';
import type { Observable } from 'rxjs';

/** Breadcrumb item definition */
export interface BreadcrumbItem {
  /** Unique identifier (auto-generated from route path if not provided) */
  id?: string;
  /** Display label */
  label: string;
  /** Navigation link (string or commands array) */
  link?: string | any[];
  /** Optional icon identifier */
  icon?: string;
  /** Whether this is the current/active page */
  current?: boolean;
  /** Whether this item is disabled (no click, grey style) */
  disabled?: boolean;
  /** Custom data for templates */
  data?: Record<string, any>;
  /** Whether this is the ellipsis placeholder for collapsed items */
  isEllipsis?: boolean;
  /** Hidden items when this is an ellipsis (for dropdown) */
  hiddenItems?: BreadcrumbItem[];
}

/** Breadcrumb size variant */
export type BreadcrumbSize = 'sm' | 'md' | 'lg';

/** Built-in separator types */
export type BreadcrumbSeparator = 'chevron' | 'slash' | 'arrow' | 'dot';

/** Route data breadcrumb configuration */
export type RouteBreadcrumb = string | RouteBreadcrumbConfig;

/** Detailed route breadcrumb config */
export interface RouteBreadcrumbConfig {
  /** Custom ID for this breadcrumb item */
  id?: string;
  /** Static label or 'Loading...' placeholder for async */
  label: string;
  /** Icon identifier */
  icon?: string;
  /** Dynamic label resolver */
  resolver?: BreadcrumbResolver;
}

/** Resolver function for dynamic breadcrumb labels */
export type BreadcrumbResolver = (
  route: ActivatedRouteSnapshot,
  injector: Injector
) => string | Observable<string>;

/** Click event emitted when breadcrumb item is clicked */
export interface BreadcrumbClickEvent {
  /** The clicked item */
  item: BreadcrumbItem;
  /** Index in the trail */
  index: number;
  /** Original mouse event */
  event: MouseEvent;
}

/** Override mode for auto-generate + manual control */
export type BreadcrumbOverrideMode = 'none' | 'partial' | 'full';
