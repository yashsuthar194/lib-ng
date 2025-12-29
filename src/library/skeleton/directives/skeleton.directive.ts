/**
 * Skeleton Directive
 *
 * Structural directive for conditional skeleton/content rendering.
 * Shows skeleton placeholder while loading, then reveals actual content.
 *
 * @example
 * <!-- Basic usage -->
 * <div *libSkeleton="isLoading">
 *   Actual content appears when loading is false
 * </div>
 *
 * <!-- With preset -->
 * <div *libSkeleton="loading; preset: 'card'">
 *   <app-card [data]="cardData" />
 * </div>
 *
 * <!-- With custom skeleton template -->
 * <img *libSkeleton="loading; skeleton: customSkel" [src]="imageUrl" />
 * <ng-template #customSkel>
 *   <lib-skeleton variant="rectangle" width="100%" height="200px" />
 * </ng-template>
 */

import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
  untracked,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { SkeletonPreset, SkeletonAnimation } from '../types/skeleton.types';
import { SkeletonComponent } from '../components/skeleton.component';
import { SkeletonGroupComponent } from '../components/skeleton-group.component';

/**
 * Internal component for rendering skeleton placeholder
 */
@Component({
  selector: 'lib-skeleton-placeholder',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, SkeletonGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (preset) {
      <lib-skeleton-group [preset]="preset" [animation]="animation" />
    } @else if (customTemplate) {
      <ng-container [ngTemplateOutlet]="customTemplate" />
    } @else {
      <lib-skeleton [animation]="animation" />
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
})
export class SkeletonPlaceholderComponent {
  preset: SkeletonPreset | null = null;
  customTemplate: TemplateRef<unknown> | null = null;
  animation: SkeletonAnimation = 'shimmer';
}

@Directive({
  selector: '[libSkeleton]',
  standalone: true,
})
export class SkeletonDirective<T> {
  private readonly templateRef = inject(TemplateRef<T>);
  private readonly viewContainer = inject(ViewContainerRef);

  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Loading state - shows skeleton when true, content when false */
  readonly libSkeleton = input.required<boolean>();

  /** Custom skeleton template */
  readonly libSkeletonSkeleton = input<TemplateRef<unknown> | null>(null);

  /** Preset to use if no custom template provided */
  readonly libSkeletonPreset = input<SkeletonPreset | null>(null);

  /** Animation type */
  readonly libSkeletonAnimation = input<SkeletonAnimation>('shimmer');

  // ============================================================================
  // PRIVATE STATE
  // ============================================================================

  private hasView = false;
  private hasSkeletonView = false;

  constructor() {
    // Use effect to react to loading state changes
    effect(() => {
      const isLoading = this.libSkeleton();
      const customTemplate = this.libSkeletonSkeleton();
      const preset = this.libSkeletonPreset();
      const animation = this.libSkeletonAnimation();

      untracked(() => {
        if (isLoading) {
          this.showSkeleton(customTemplate, preset, animation);
        } else {
          this.showContent();
        }
      });
    });
  }

  /**
   * Show skeleton placeholder
   */
  private showSkeleton(
    customTemplate: TemplateRef<unknown> | null,
    preset: SkeletonPreset | null,
    animation: SkeletonAnimation
  ): void {
    // Remove content view if exists
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }

    // Create skeleton view if not exists
    if (!this.hasSkeletonView) {
      if (customTemplate) {
        // Use custom template
        this.viewContainer.createEmbeddedView(customTemplate);
      } else if (preset) {
        // Use preset-based skeleton
        const componentRef = this.viewContainer.createComponent(SkeletonGroupComponent);
        componentRef.setInput('preset', preset);
        componentRef.setInput('animation', animation);
      } else {
        // Use default skeleton
        const componentRef = this.viewContainer.createComponent(SkeletonComponent);
        componentRef.setInput('animation', animation);
      }
      this.hasSkeletonView = true;
    }
  }

  /**
   * Show actual content
   */
  private showContent(): void {
    // Remove skeleton view if exists
    if (this.hasSkeletonView) {
      this.viewContainer.clear();
      this.hasSkeletonView = false;
    }

    // Create content view if not exists
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  /**
   * Static context guard for type narrowing in templates
   */
  static ngTemplateContextGuard<T>(
    _dir: SkeletonDirective<T>,
    _ctx: unknown
  ): _ctx is { $implicit: T } {
    return true;
  }
}
