/**
 * Avatar Group Component
 *
 * Displays a stack of avatars with overlap and overflow indicator.
 * Supports expandable functionality with hover, click, or external control.
 *
 * @example
 * <!-- Default: Expand on hover -->
 * <lib-avatar-group [max]="3">
 *   <lib-avatar name="John Doe" src="..."></lib-avatar>
 *   <lib-avatar name="Jane Smith" src="..."></lib-avatar>
 *   <lib-avatar name="Bob Wilson" src="..."></lib-avatar>
 *   <lib-avatar name="Alice Brown" src="..."></lib-avatar>
 * </lib-avatar-group>
 *
 * <!-- Click to expand/collapse -->
 * <lib-avatar-group [max]="3" expandTrigger="click">
 *   ...
 * </lib-avatar-group>
 *
 * <!-- Disabled expansion (always collapsed) -->
 * <lib-avatar-group [max]="3" [expandable]="false">
 *   ...
 * </lib-avatar-group>
 *
 * <!-- Controlled expansion -->
 * <lib-avatar-group [max]="3" [expanded]="isExpanded" (expandedChange)="onExpandedChange($event)">
 *   ...
 * </lib-avatar-group>
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  contentChildren,
  computed,
  effect,
  signal,
  output,
} from '@angular/core';
import { AvatarComponent } from './avatar.component';
import type { AvatarSize, AvatarExpandTrigger } from '../types/avatar.types';

@Component({
  selector: 'lib-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lib-avatar-group',
    '[class.lib-avatar-group--xs]': 'size() === "xs"',
    '[class.lib-avatar-group--sm]': 'size() === "sm"',
    '[class.lib-avatar-group--md]': 'size() === "md"',
    '[class.lib-avatar-group--lg]': 'size() === "lg"',
    '[class.lib-avatar-group--xl]': 'size() === "xl"',
    '[class.lib-avatar-group--2xl]': 'size() === "2xl"',
    '[class.lib-avatar-group--expanded]': 'isExpanded()',
    '[class.lib-avatar-group--expandable]': 'expandable() && overflowCount() > 0',
    '[attr.role]': '"group"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-expanded]': 'expandable() ? isExpanded() : null',
    '[attr.tabindex]': 'expandable() && overflowCount() > 0 ? 0 : null',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(click)': 'handleClick()',
    '(keydown)': 'handleKeydown($event)',
    '(blur)': 'handleBlur()',
  },
  template: `
    <div class="lib-avatar-group__container">
      <ng-content></ng-content>
    </div>
    @if (overflowCount() > 0) {
      <span
        class="lib-avatar-group__overflow"
        [attr.aria-label]="overflowCount() + ' more users'"
        [attr.aria-hidden]="isExpanded()"
      >
        +{{ overflowCount() }}
      </span>
    }
  `,
  styleUrl: './avatar-group.component.css',
})
export class AvatarGroupComponent {
  /** Maximum avatars to display before showing "+N" */
  readonly max = input<number>(5);

  /** Size for the overflow indicator */
  readonly size = input<AvatarSize>('md');

  /** Enable/disable expansion functionality */
  readonly expandable = input<boolean>(true);

  /** What triggers expansion: 'hover' or 'click' */
  readonly expandTrigger = input<AvatarExpandTrigger>('hover');

  /** Control expanded state externally */
  readonly expanded = input<boolean>(false);

  /** Emits when expanded state changes */
  readonly expandedChange = output<boolean>();

  /** Query all child avatar components */
  readonly avatars = contentChildren(AvatarComponent);

  /** Internal expanded state */
  private readonly _isExpandedInternal = signal<boolean>(false);

  /** Combined expansion state (internal + external) */
  readonly isExpanded = computed(() => {
    if (!this.expandable()) return false;
    // External control takes precedence if set to true
    return this.expanded() || this._isExpandedInternal();
  });

  /** Count of hidden avatars */
  readonly overflowCount = computed(() => {
    const total = this.avatars().length;
    const max = this.max();
    return total > max ? total - max : 0;
  });

  /** Accessible label */
  readonly ariaLabel = computed(() => {
    const count = this.avatars().length;
    const expandedState = this.isExpanded() ? 'expanded' : 'collapsed';
    const overflow = this.overflowCount();
    if (overflow > 0 && this.expandable()) {
      return `Group of ${count} user${count !== 1 ? 's' : ''}, ${expandedState}`;
    }
    return `Group of ${count} user${count !== 1 ? 's' : ''}`;
  });

  constructor() {
    // Effect to manage hidden class and z-index on avatars based on expansion state
    effect(() => {
      const avatarList = this.avatars();
      const maxVisible = this.max();
      const expanded = this.isExpanded();
      const total = avatarList.length;

      avatarList.forEach((avatar, index) => {
        const hostElement = avatar.elementRef?.nativeElement as HTMLElement | undefined;
        if (hostElement) {
          // Set z-index for proper stacking (first avatar on top)
          hostElement.style.setProperty('--avatar-index', String(index));
          hostElement.style.zIndex = String(total - index);

          // Manage hidden class
          if (index >= maxVisible && !expanded) {
            hostElement.classList.add('lib-avatar--hidden');
          } else {
            hostElement.classList.remove('lib-avatar--hidden');
          }
        }
      });
    });
  }

  /** Handle mouse enter for hover trigger */
  handleMouseEnter(): void {
    if (!this.canExpand()) return;
    if (this.expandTrigger() === 'hover') {
      this.setExpanded(true);
    }
  }

  /** Handle mouse leave for hover trigger */
  handleMouseLeave(): void {
    if (!this.canExpand()) return;
    if (this.expandTrigger() === 'hover') {
      this.setExpanded(false);
    }
  }

  /** Handle click for click trigger */
  handleClick(): void {
    if (!this.canExpand()) return;
    if (this.expandTrigger() === 'click') {
      this.setExpanded(!this.isExpanded());
    }
  }

  /** Handle keyboard navigation */
  handleKeydown(event: KeyboardEvent): void {
    if (!this.canExpand()) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.setExpanded(!this.isExpanded());
    } else if (event.key === 'Escape' && this.isExpanded()) {
      event.preventDefault();
      this.setExpanded(false);
    }
  }

  /** Handle blur for click trigger - collapse when focus is lost */
  handleBlur(): void {
    if (!this.canExpand()) return;
    if (this.expandTrigger() === 'click' && this.isExpanded()) {
      // Small delay to allow click on avatars within the group
      setTimeout(() => {
        this.setExpanded(false);
      }, 150);
    }
  }

  /** Check if expansion is allowed */
  private canExpand(): boolean {
    return this.expandable() && this.overflowCount() > 0;
  }

  /** Update expanded state and emit change */
  private setExpanded(value: boolean): void {
    if (this._isExpandedInternal() !== value) {
      this._isExpandedInternal.set(value);
      this.expandedChange.emit(value);
    }
  }
}
