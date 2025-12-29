import { Injectable, signal, computed } from '@angular/core';
import type { StepChangeEvent } from '../types/stepper.types';

/**
 * StepperService - Signal-based state management
 *
 * No subscriptions = No memory leaks
 * Uses pure signals and function callbacks only.
 */
@Injectable()
export class StepperService {
  // ========== Private State (no subscriptions = no leaks) ==========
  private readonly _activeIndex = signal(0);
  private readonly _stepCount = signal(0);
  private readonly _stepIds = signal<string[]>([]);
  private readonly _disabledSteps = signal<Set<number>>(new Set());
  private readonly _completedSteps = signal<Set<number>>(new Set());
  private readonly _errorSteps = signal<Map<number, string>>(new Map());
  private readonly _linear = signal(true);
  private readonly _isAnimating = signal(false);
  private readonly _animationDirection = signal<'next' | 'prev'>('next');

  // ========== Public Readonly Signals ==========
  readonly activeIndex = this._activeIndex.asReadonly();
  readonly stepCount = this._stepCount.asReadonly();
  readonly isAnimating = this._isAnimating.asReadonly();
  readonly animationDirection = this._animationDirection.asReadonly();
  readonly disabledSteps = this._disabledSteps.asReadonly();
  readonly completedSteps = this._completedSteps.asReadonly();

  // ========== Computed (no subscriptions) ==========
  readonly isFirst = computed(() => this._activeIndex() === 0);
  readonly isLast = computed(() => this._activeIndex() === this._stepCount() - 1);
  readonly progress = computed(() => {
    const count = this._stepCount();
    if (count <= 1) return 100;
    return Math.round((this._activeIndex() / (count - 1)) * 100);
  });

  // Callback (function reference, not Observable)
  private _onChangeCallback?: (event: StepChangeEvent) => void;

  // ========== Configuration ==========

  setStepCount(count: number): void {
    this._stepCount.set(count);
  }

  registerStepIds(ids: string[]): void {
    this._stepIds.set(ids);
  }

  setLinear(linear: boolean): void {
    this._linear.set(linear);
  }

  // ========== Step State Queries ==========

  isStepDisabled(index: number): boolean {
    return this._disabledSteps().has(index);
  }

  isStepCompleted(index: number): boolean {
    return this._completedSteps().has(index);
  }

  getStepError(index: number): string | undefined {
    return this._errorSteps().get(index);
  }

  // ========== Navigation ==========

  goToStep(index: number): boolean {
    const current = this._activeIndex();
    if (index === current) return false;
    if (index < 0 || index >= this._stepCount()) return false;
    if (this.isStepDisabled(index)) return false;

    // Linear mode: can only go to next step or previous steps
    if (this._linear() && index > current) {
      if (!this.isStepCompleted(current)) return false;
      if (index > current + 1) return false;
    }

    this._animationDirection.set(index > current ? 'next' : 'prev');
    this._isAnimating.set(true);
    this._activeIndex.set(index);

    const ids = this._stepIds();
    this._onChangeCallback?.({
      previousIndex: current,
      currentIndex: index,
      previousStepId: ids[current],
      currentStepId: ids[index],
    });

    return true;
  }

  goToStepById(id: string): boolean {
    const index = this._stepIds().indexOf(id);
    if (index === -1) return false;
    return this.goToStep(index);
  }

  next(): boolean {
    return this.goToStep(this._activeIndex() + 1);
  }

  previous(): boolean {
    return this.goToStep(this._activeIndex() - 1);
  }

  // ========== Step State Mutations ==========

  completeStep(index?: number): void {
    const idx = index ?? this._activeIndex();
    this._completedSteps.update(set => new Set(set).add(idx));
    // Clear any error on completion
    if (this._errorSteps().has(idx)) {
      this._errorSteps.update(map => {
        const newMap = new Map(map);
        newMap.delete(idx);
        return newMap;
      });
    }
  }

  setStepError(index: number, message?: string): void {
    this._errorSteps.update(map => new Map(map).set(index, message ?? 'Error'));
  }

  clearStepError(index: number): void {
    this._errorSteps.update(map => {
      const newMap = new Map(map);
      newMap.delete(index);
      return newMap;
    });
  }

  // ========== Disable Control ==========

  disableStep(index: number): void {
    this._disabledSteps.update(set => new Set(set).add(index));
  }

  enableStep(index: number): void {
    this._disabledSteps.update(set => {
      const newSet = new Set(set);
      newSet.delete(index);
      return newSet;
    });
  }

  disableStepById(id: string): void {
    const index = this._stepIds().indexOf(id);
    if (index !== -1) this.disableStep(index);
  }

  enableStepById(id: string): void {
    const index = this._stepIds().indexOf(id);
    if (index !== -1) this.enableStep(index);
  }

  disableSteps(indices: number[]): void {
    this._disabledSteps.update(set => {
      const newSet = new Set(set);
      indices.forEach(i => newSet.add(i));
      return newSet;
    });
  }

  enableAll(): void {
    this._disabledSteps.set(new Set());
  }

  // ========== Animation & Reset ==========

  endAnimation(): void {
    this._isAnimating.set(false);
  }

  onStepChange(callback: (event: StepChangeEvent) => void): void {
    this._onChangeCallback = callback;
  }

  reset(): void {
    this._activeIndex.set(0);
    this._completedSteps.set(new Set());
    this._errorSteps.set(new Map());
    // Note: disabled steps NOT reset (intentional)
  }
}
