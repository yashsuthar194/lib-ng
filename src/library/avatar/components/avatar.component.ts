/**
 * Avatar Component
 *
 * Displays user profile images with smart fallback system.
 * Prioritizes: Image → Initials → Generic Icon
 *
 * @example
 * <!-- Basic with image -->
 * <lib-avatar src="https://..." name="John Doe"></lib-avatar>
 *
 * <!-- Initials fallback -->
 * <lib-avatar name="Jane Smith"></lib-avatar>
 *
 * <!-- With presence indicator -->
 * <lib-avatar
 *   name="John Doe"
 *   [showPresence]="true"
 *   presence="online"
 * ></lib-avatar>
 *
 * <!-- Custom presence color -->
 * <lib-avatar
 *   name="Admin"
 *   [showPresence]="true"
 *   presenceColor="#8b5cf6"
 * ></lib-avatar>
 *
 * <!-- Clickable avatar -->
 * <lib-avatar
 *   src="https://..."
 *   [clickable]="true"
 *   (avatarClick)="openProfile()"
 * ></lib-avatar>
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  ElementRef,
  inject,
} from '@angular/core';
import type { AvatarSize, AvatarShape, AvatarPresence } from '../types/avatar.types';
import { DEFAULT_AVATAR_CONFIG } from '../types/avatar.types';
import {
  generateInitials,
  generateColorFromString,
  getAvatarSource,
} from '../utils/avatar-utils';

@Component({
  selector: 'lib-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lib-avatar',
    // Size classes
    '[class.lib-avatar--xs]': 'size() === "xs"',
    '[class.lib-avatar--sm]': 'size() === "sm"',
    '[class.lib-avatar--md]': 'size() === "md"',
    '[class.lib-avatar--lg]': 'size() === "lg"',
    '[class.lib-avatar--xl]': 'size() === "xl"',
    '[class.lib-avatar--2xl]': 'size() === "2xl"',
    // Shape classes
    '[class.lib-avatar--circle]': 'shape() === "circle"',
    '[class.lib-avatar--rounded]': 'shape() === "rounded"',
    '[class.lib-avatar--square]': 'shape() === "square"',
    // State classes
    '[class.lib-avatar--clickable]': 'clickable()',
    '[class.lib-avatar--loading]': 'isLoading()',
    // Custom colors
    '[style.--avatar-bg]': 'computedBgColor()',
    '[style.--avatar-text]': 'textColor()',
    // Accessibility
    '[attr.role]': 'clickable() ? "button" : "img"',
    '[attr.tabindex]': 'clickable() ? 0 : null',
    '[attr.aria-label]': 'ariaLabel()',
    // Events
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)',
    '(keydown.space)': 'handleClick($event)',
  },
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  /** Element reference for parent components (e.g., AvatarGroup) to access */
  readonly elementRef = inject(ElementRef);

  // ========================================
  // Inputs - Core
  // ========================================

  /** Image source URL */
  readonly src = input<string | null>(null);

  /** User's name for initials fallback and aria-label */
  readonly name = input<string | null>(null);

  /** Alt text for image (falls back to name) */
  readonly alt = input<string>('');

  /** Size variant */
  readonly size = input<AvatarSize>(DEFAULT_AVATAR_CONFIG.size);

  /** Shape variant */
  readonly shape = input<AvatarShape>(DEFAULT_AVATAR_CONFIG.shape);

  /** Image loading strategy */
  readonly loading = input<'lazy' | 'eager'>(DEFAULT_AVATAR_CONFIG.loading);

  // ========================================
  // Inputs - Presence Indicator
  // ========================================

  /** Show presence indicator */
  readonly showPresence = input<boolean>(false);

  /** Presence status type */
  readonly presence = input<AvatarPresence>('online');

  /** Custom presence indicator color (overrides status color) */
  readonly presenceColor = input<string | null>(null);

  // ========================================
  // Inputs - Styling
  // ========================================

  /** Custom background color for initials */
  readonly bgColor = input<string | null>(null);

  /** Custom text color for initials */
  readonly textColor = input<string | null>(null);

  // ========================================
  // Inputs - Interaction
  // ========================================

  /** Make avatar clickable */
  readonly clickable = input<boolean>(false);

  // ========================================
  // Outputs
  // ========================================

  /** Emitted when clickable avatar is clicked */
  readonly avatarClick = output<MouseEvent | KeyboardEvent>();

  // ========================================
  // Internal State (Signals - no subscriptions = no memory leaks)
  // ========================================

  /** Image failed to load */
  readonly imageError = signal(false);

  /** Whether image has finished loading (success or error) */
  private readonly imageLoaded = signal(false);

  // ========================================
  // Computed Properties (derived from signals)
  // ========================================

  /** 
   * Loading state - only true when:
   * 1. There's an image src provided
   * 2. The image hasn't finished loading yet
   * 3. There hasn't been an error
   * 
   * For initials/icon fallback, this is always false (no loading needed)
   */
  readonly isLoading = computed(() => {
    const hasSrc = !!this.src();
    const hasLoaded = this.imageLoaded();
    const hasError = this.imageError();
    return hasSrc && !hasLoaded && !hasError;
  });

  /** Current display source: image, initials, or icon */
  readonly displaySource = computed(() =>
    getAvatarSource(this.src(), this.name(), this.imageError())
  );

  /** Generated initials from name */
  readonly initials = computed(() => generateInitials(this.name()));

  /** Background color (custom or auto-generated from name) */
  readonly computedBgColor = computed(() =>
    this.bgColor() || generateColorFromString(this.name())
  );

  /** Accessible label for screen readers */
  readonly ariaLabel = computed(() => {
    const alt = this.alt();
    const name = this.name();
    return alt || name || 'User avatar';
  });

  /** Computed presence indicator color */
  readonly computedPresenceColor = computed(() => {
    // Custom color takes priority
    if (this.presenceColor()) return this.presenceColor();

    // Otherwise use semantic color based on status
    switch (this.presence()) {
      case 'online':
        return '#22c55e'; // green
      case 'offline':
        return 'var(--lib-color-neutral-400)';
      case 'busy':
        return 'var(--lib-color-error)';
      case 'away':
        return 'var(--lib-color-warning)';
      default:
        return '#22c55e';
    }
  });

  // ========================================
  // Event Handlers
  // ========================================

  /** Handle click on clickable avatar */
  handleClick(event: MouseEvent | KeyboardEvent): void {
    if (this.clickable()) {
      this.avatarClick.emit(event);
    }
  }

  /** Handle successful image load */
  handleImageLoad(): void {
    this.imageLoaded.set(true);
    this.imageError.set(false);
  }

  /** Handle image load error - triggers fallback */
  handleImageError(): void {
    this.imageLoaded.set(true);
    this.imageError.set(true);
  }
}
