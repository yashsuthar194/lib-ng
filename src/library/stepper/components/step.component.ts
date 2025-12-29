import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  TemplateRef,
  contentChild,
  viewChild,
} from '@angular/core';

let stepUniqueId = 0;

/**
 * Step Component
 *
 * Individual step within a stepper. Supports custom ID,
 * disable input, icon/label templates, and content projection.
 *
 * @example
 * ```html
 * <lib-step id="payment" label="Payment" [disabled]="!hasItems()">
 *   <p>Payment form content...</p>
 * </lib-step>
 * ```
 */
@Component({
  selector: 'lib-step',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-template #content><ng-content></ng-content></ng-template>`,
})
export class StepComponent {
  readonly internalId = `lib-step-${++stepUniqueId}`;

  // ========== Inputs ==========

  /** Custom ID for programmatic access (e.g., goToStepById) */
  readonly id = input<string>();

  /** Step label text */
  readonly label = input.required<string>();

  /** Optional sublabel/description */
  readonly sublabel = input<string>();

  /** Icon (emoji, symbol, or icon character) */
  readonly icon = input<string>();

  /** Mark step as optional */
  readonly optional = input(false);

  /** Allow re-editing after completion */
  readonly editable = input(true);

  /** Disable this step (prevents navigation to it) */
  readonly disabled = input(false);

  // ========== Custom Templates ==========

  readonly iconTemplate = contentChild<TemplateRef<unknown>>('stepIcon');
  readonly labelTemplate = contentChild<TemplateRef<unknown>>('stepLabel');
  readonly contentTemplate = viewChild.required<TemplateRef<unknown>>('content');

  // ========== Internal State ==========

  private readonly _index = signal(-1);
  readonly index = this._index.asReadonly();

  /** Get effective ID (custom or auto-generated) */
  get effectiveId(): string {
    return this.id() ?? this.internalId;
  }

  /** Set index (called by parent stepper) */
  setIndex(idx: number): void {
    this._index.set(idx);
  }
}
