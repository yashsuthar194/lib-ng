import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  computed,
  contentChildren,
  inject,
  effect,
  AfterContentInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { StepComponent } from './step.component';
import { StepperService } from '../services/stepper.service';
import type {
  StepperOrientation,
  StepperAnimation,
  StepperLabelPosition,
  StepChangeEvent,
} from '../types/stepper.types';
import { DEFAULT_STEPPER_CONFIG } from '../types/stepper.types';

/**
 * Stepper Component
 *
 * Multi-step workflow component with unique animations,
 * programmatic control, and full disable support.
 *
 * @example
 * ```html
 * <lib-stepper #stepper [(activeStepIndex)]="currentStep" [linear]="true">
 *   <lib-step label="Account">Step 1 content</lib-step>
 *   <lib-step label="Profile" [disabled]="!step1Valid()">Step 2 content</lib-step>
 *   <lib-step id="confirm" label="Confirm">Step 3 content</lib-step>
 * </lib-stepper>
 *
 * <button (click)="stepper.next()">Next</button>
 * <button (click)="stepper.goToStepById('confirm')">Go to Confirm</button>
 * ```
 */
@Component({
  selector: 'lib-stepper',
  standalone: true,
  imports: [NgTemplateOutlet],
  providers: [StepperService],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.lib-stepper]': 'true',
    '[class.lib-stepper--horizontal]': 'orientation() === "horizontal"',
    '[class.lib-stepper--vertical]': 'orientation() === "vertical"',
    '[class.lib-stepper--linear]': 'linear()',
    '[class.lib-stepper--alternative-label]': 'alternativeLabel()',
    '[class.lib-stepper--animating]': 'stepperService.isAnimating()',
    '[attr.data-animation]': 'animation()',
    '[attr.role]': '"tablist"',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class StepperComponent implements AfterContentInit {
  readonly stepperService = inject(StepperService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // ========== Inputs ==========

  /** Horizontal or vertical layout */
  readonly orientation = input<StepperOrientation>(DEFAULT_STEPPER_CONFIG.orientation);

  /** Animation style for content transitions */
  readonly animation = input<StepperAnimation>(DEFAULT_STEPPER_CONFIG.animation);

  /** Animation duration in ms */
  readonly animationDuration = input(DEFAULT_STEPPER_CONFIG.animationDuration);

  /** Linear mode: must complete current step to proceed */
  readonly linear = input(DEFAULT_STEPPER_CONFIG.linear);

  /** Label position (horizontal only) */
  readonly labelPosition = input<StepperLabelPosition>(DEFAULT_STEPPER_CONFIG.labelPosition);

  /** Show connector lines between steps */
  readonly showConnector = input(DEFAULT_STEPPER_CONFIG.showConnector);

  /** Alternative label layout (labels below icons) */
  readonly alternativeLabel = input(DEFAULT_STEPPER_CONFIG.alternativeLabel);

  /** Active step index (two-way bindable) */
  readonly activeStepIndex = model(0);

  // ========== Outputs ==========

  /** Emits when step changes */
  readonly stepChange = output<StepChangeEvent>();

  /** Emits just the new index */
  readonly selectionChange = output<number>();

  /** Emits when content animation completes */
  readonly animationDone = output<void>();

  // ========== Content ==========

  readonly steps = contentChildren(StepComponent);

  // ========== Computed ==========

  readonly activeStep = computed(() => this.steps()?.[this.stepperService.activeIndex()] ?? null);

  readonly animationClass = computed(() => {
    const dir = this.stepperService.animationDirection();
    const anim = this.animation();
    if (anim === 'none') return '';
    return `lib-stepper__content--${anim}-${dir}`;
  });

  constructor() {
    // Sync model with service (effect auto-cleans up)
    effect(() => {
      const idx = this.activeStepIndex();
      if (this.stepperService.activeIndex() !== idx) {
        this.stepperService.goToStep(idx);
      }
    });

    // Sync input-based disabled steps (effect auto-cleans up)
    effect(() => {
      const allSteps = this.steps();
      allSteps.forEach((step, i) => {
        if (step.disabled()) {
          this.stepperService.disableStep(i);
        }
      });
    });

    // Sync service with model (callback, not subscription)
    this.stepperService.onStepChange(event => {
      this.activeStepIndex.set(event.currentIndex);
      this.stepChange.emit(event);
      this.selectionChange.emit(event.currentIndex);
    });
  }

  ngAfterContentInit(): void {
    const allSteps = this.steps();
    allSteps.forEach((step, i) => step.setIndex(i));

    // Register step IDs and count
    this.stepperService.setStepCount(allSteps.length);
    this.stepperService.registerStepIds(allSteps.map(s => s.effectiveId));
    this.stepperService.setLinear(this.linear());

    // Sync input-based disabled to service
    allSteps.forEach((step, i) => {
      if (step.disabled()) {
        this.stepperService.disableStep(i);
      }
    });

    // Set initial active step
    const initial = this.activeStepIndex();
    if (initial > 0 && initial < allSteps.length) {
      this.stepperService.goToStep(initial);
    }
  }

  // ========== Public API: Navigation ==========

  /** Go to next step */
  next(): boolean {
    return this.stepperService.next();
  }

  /** Go to previous step */
  previous(): boolean {
    return this.stepperService.previous();
  }

  /** Go to step by index */
  goToStep(index: number): boolean {
    return this.stepperService.goToStep(index);
  }

  /** Go to step by custom ID */
  goToStepById(id: string): boolean {
    return this.stepperService.goToStepById(id);
  }

  // ========== Public API: Step State ==========

  /** Mark a step as completed */
  completeStep(index?: number): void {
    this.stepperService.completeStep(index);
  }

  /** Complete current step and advance */
  completeCurrentStep(): void {
    this.stepperService.completeStep();
  }

  /** Set error on a step */
  setStepError(index: number, message?: string): void {
    this.stepperService.setStepError(index, message);
  }

  /** Clear error from a step */
  clearStepError(index: number): void {
    this.stepperService.clearStepError(index);
  }

  // ========== Public API: Disable Control ==========

  /** Disable a step by index */
  disableStep(index: number): void {
    this.stepperService.disableStep(index);
  }

  /** Enable a step by index */
  enableStep(index: number): void {
    this.stepperService.enableStep(index);
  }

  /** Disable a step by ID */
  disableStepById(id: string): void {
    this.stepperService.disableStepById(id);
  }

  /** Enable a step by ID */
  enableStepById(id: string): void {
    this.stepperService.enableStepById(id);
  }

  /** Disable multiple steps */
  disableSteps(indices: number[]): void {
    this.stepperService.disableSteps(indices);
  }

  /** Enable all disabled steps */
  enableAll(): void {
    this.stepperService.enableAll();
  }

  // ========== Public API: Reset ==========

  /** Reset stepper to first step */
  reset(): void {
    this.stepperService.reset();
  }

  // ========== Template Helpers ==========

  isStepCompleted(index: number): boolean {
    return this.stepperService.isStepCompleted(index);
  }

  isStepDisabled(index: number): boolean {
    return this.stepperService.isStepDisabled(index) || this.steps()[index]?.disabled();
  }

  /** Check if step can be navigated to (considers linear mode) */
  isStepReachable(index: number): boolean {
    if (this.isStepDisabled(index)) return false;

    const current = this.stepperService.activeIndex();

    // Active step is always reachable
    if (index === current) return true;

    // In non-linear mode, all non-disabled steps are reachable
    if (!this.linear()) return true;

    // In linear mode: can go backwards freely
    if (index < current) return true;

    // In linear mode: can only go to next step if current is completed
    if (index === current + 1 && this.isStepCompleted(current)) return true;

    return false;
  }

  getStepError(index: number): string | undefined {
    return this.stepperService.getStepError(index);
  }

  // ========== Event Handlers ==========

  onStepHeaderClick(step: StepComponent, index: number): void {
    if (this.isStepDisabled(index)) return;
    if (!step.editable() && this.isStepCompleted(index)) return;
    this.stepperService.goToStep(index);
  }

  onAnimationEnd(): void {
    this.stepperService.endAnimation();
    this.animationDone.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('lib-stepper__step-header')) return;

    const isHorizontal = this.orientation() === 'horizontal';

    switch (event.key) {
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          this.focusPreviousStep();
        }
        break;
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          this.focusNextStep();
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          this.focusPreviousStep();
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          this.focusNextStep();
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusStep(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusStep(this.steps().length - 1);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const focusedIdx = this.getFocusedStepIndex();
        if (focusedIdx >= 0 && !this.isStepDisabled(focusedIdx)) {
          this.stepperService.goToStep(focusedIdx);
        }
        break;
      }
    }
  }

  private focusNextStep(): void {
    const allSteps = this.steps();
    const current = this.getFocusedStepIndex();
    for (let i = 1; i <= allSteps.length; i++) {
      const next = (current + i) % allSteps.length;
      if (!this.isStepDisabled(next)) {
        this.focusStep(next);
        break;
      }
    }
  }

  private focusPreviousStep(): void {
    const allSteps = this.steps();
    const current = this.getFocusedStepIndex();
    for (let i = 1; i <= allSteps.length; i++) {
      const prev = (current - i + allSteps.length) % allSteps.length;
      if (!this.isStepDisabled(prev)) {
        this.focusStep(prev);
        break;
      }
    }
  }

  private focusStep(index: number): void {
    const headers = this.elementRef.nativeElement.querySelectorAll('.lib-stepper__step-header');
    (headers[index] as HTMLElement)?.focus();
  }

  private getFocusedStepIndex(): number {
    const headers = this.elementRef.nativeElement.querySelectorAll('.lib-stepper__step-header');
    return Array.from(headers).indexOf(document.activeElement as Element);
  }

  trackByStep = (_: number, step: StepComponent) => step.internalId;
}
