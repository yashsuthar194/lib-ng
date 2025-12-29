/**
 * TimePicker Component
 *
 * Hour and minute selection with 12h/24h format support.
 * Implements ControlValueAccessor for Angular Forms integration.
 *
 * Features:
 * - 12-hour and 24-hour formats
 * - Minute step configuration
 * - Keyboard navigation
 * - WCAG 2.1 AA accessible
 *
 * @example
 * <lib-time-picker [(value)]="selectedTime" />
 * <lib-time-picker [formControl]="timeControl" format="24h" [minuteStep]="15" />
 */

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  model,
  forwardRef,
  ElementRef,
  inject,
  DestroyRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { TimeValue, TimeFormat, DatePickerSize } from '../../types/datepicker.types';

@Component({
  selector: 'lib-time-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
  host: {
    class: 'lib-time-picker',
    '[class.lib-time-picker--open]': 'isOpen()',
    '[class.lib-time-picker--disabled]': 'disabled()',
  },
  template: `
    <!-- Input Field -->
    <div class="lib-time-picker__input-wrapper">
      <input
        type="text"
        class="lib-time-picker__input"
        [value]="displayValue()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'dialog'"
        readonly
        (click)="toggleDropdown()"
        (keydown)="onInputKeyDown($event)"
      />
      
      <button
        type="button"
        class="lib-time-picker__toggle"
        [disabled]="disabled()"
        [attr.aria-label]="isOpen() ? 'Close time picker' : 'Open time picker'"
        (click)="toggleDropdown()"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </button>
    </div>

    <!-- Dropdown -->
    @if (isOpen()) {
      <div
        class="lib-time-picker__dropdown"
        role="dialog"
        aria-modal="true"
        aria-label="Choose time"
        (keydown.escape)="closeDropdown()"
      >
        <div class="lib-time-picker__columns">
          <!-- Hours Column -->
          <div class="lib-time-picker__column" role="listbox" aria-label="Hours">
            @for (hour of hours(); track hour) {
              <button
                type="button"
                class="lib-time-picker__option"
                role="option"
                [class.lib-time-picker__option--selected]="hour === selectedHour()"
                [attr.aria-selected]="hour === selectedHour()"
                (click)="selectHour(hour)"
              >
                {{ formatHourDisplay(hour) }}
              </button>
            }
          </div>

          <!-- Minutes Column -->
          <div class="lib-time-picker__column" role="listbox" aria-label="Minutes">
            @for (minute of minutes(); track minute) {
              <button
                type="button"
                class="lib-time-picker__option"
                role="option"
                [class.lib-time-picker__option--selected]="minute === selectedMinute()"
                [attr.aria-selected]="minute === selectedMinute()"
                (click)="selectMinute(minute)"
              >
                {{ minute.toString().padStart(2, '0') }}
              </button>
            }
          </div>

          <!-- AM/PM Column (12h format only) -->
          @if (format() === '12h') {
            <div class="lib-time-picker__column lib-time-picker__column--period" role="listbox" aria-label="Period">
              <button
                type="button"
                class="lib-time-picker__option"
                role="option"
                [class.lib-time-picker__option--selected]="period() === 'AM'"
                [attr.aria-selected]="period() === 'AM'"
                (click)="selectPeriod('AM')"
              >
                AM
              </button>
              <button
                type="button"
                class="lib-time-picker__option"
                role="option"
                [class.lib-time-picker__option--selected]="period() === 'PM'"
                [attr.aria-selected]="period() === 'PM'"
                (click)="selectPeriod('PM')"
              >
                PM
              </button>
            </div>
          }
        </div>

        <!-- Footer -->
        <div class="lib-time-picker__footer">
          <button
            type="button"
            class="lib-time-picker__now-btn"
            (click)="selectNow()"
          >
            Now
          </button>
          <button
            type="button"
            class="lib-time-picker__ok-btn"
            (click)="confirmSelection()"
          >
            OK
          </button>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      --picker-width: 320px;
      display: inline-block;
      position: relative;
      width: var(--picker-width);
      font-family: var(--lib-font-family-base, system-ui, sans-serif);
    }

    .lib-time-picker__input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .lib-time-picker__input {
      width: 100%;
      height: 40px;
      padding: 0 var(--lib-spacing-3, 12px);
      padding-right: calc(var(--lib-spacing-3, 12px) * 2 + 16px);
      border: 1px solid var(--lib-color-neutral-300, #d4d4d8);
      border-radius: var(--lib-border-radius-md, 6px);
      background: var(--lib-color-neutral-0, #ffffff);
      color: var(--lib-color-neutral-900, #18181b);
      font-size: var(--lib-font-size-sm, 14px);
      font-weight: var(--lib-font-weight-medium, 500);
      letter-spacing: 0.02em;
      cursor: pointer;
      outline: none;
      transition: border-color var(--lib-transition-fast, 150ms ease);
    }

    .lib-time-picker__input:focus {
      border-color: var(--lib-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 3px var(--lib-color-primary-100, #dbeafe);
    }

    .lib-time-picker__toggle {
      position: absolute;
      right: var(--lib-spacing-3, 12px);
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--lib-color-neutral-500, #71717a);
      cursor: pointer;
    }

    .lib-time-picker__toggle svg {
      width: 16px;
      height: 16px;
    }

    .lib-time-picker__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--lib-z-index-dropdown, 1000);
      margin-top: var(--lib-spacing-1, 4px);
      width: var(--picker-width);
      padding: var(--lib-spacing-2, 8px);
      background: var(--lib-color-neutral-0, #ffffff);
      border: 1px solid var(--lib-color-neutral-200, #e4e4e7);
      border-radius: var(--lib-border-radius-lg, 8px);
      box-shadow: var(--lib-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
      animation: fadeIn 200ms ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .lib-time-picker__columns {
      display: flex;
      gap: var(--lib-spacing-1, 4px);
      max-height: 200px;
    }

    .lib-time-picker__column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow-y: auto;
      max-height: 200px;
      scrollbar-width: thin;
    }

    .lib-time-picker__column--period {
      flex: 0 0 auto;
      width: 48px;
    }

    .lib-time-picker__option {
      padding: var(--lib-spacing-2, 8px);
      border: none;
      border-radius: var(--lib-border-radius-sm, 4px);
      background: transparent;
      color: var(--lib-color-neutral-700, #3f3f46);
      font-size: var(--lib-font-size-sm, 14px);
      text-align: center;
      cursor: pointer;
      transition: background var(--lib-transition-fast, 150ms ease);
    }

    .lib-time-picker__option:hover {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }

    .lib-time-picker__option--selected {
      background: var(--lib-color-primary-500, #3b82f6);
      color: var(--lib-color-neutral-0, #ffffff);
    }

    .lib-time-picker__option--selected:hover {
      background: var(--lib-color-primary-600, #2563eb);
    }

    .lib-time-picker__footer {
      display: flex;
      justify-content: space-between;
      margin-top: var(--lib-spacing-2, 8px);
      padding-top: var(--lib-spacing-2, 8px);
      border-top: 1px solid var(--lib-color-neutral-200, #e4e4e7);
    }

    .lib-time-picker__now-btn,
    .lib-time-picker__ok-btn {
      padding: var(--lib-spacing-1, 4px) var(--lib-spacing-3, 12px);
      border: none;
      border-radius: var(--lib-border-radius-md, 6px);
      font-size: var(--lib-font-size-sm, 14px);
      cursor: pointer;
      transition: background var(--lib-transition-fast, 150ms ease);
    }

    .lib-time-picker__now-btn {
      background: transparent;
      color: var(--lib-color-primary-500, #3b82f6);
    }

    .lib-time-picker__now-btn:hover {
      background: var(--lib-color-neutral-100, #f4f4f5);
    }

    .lib-time-picker__ok-btn {
      background: var(--lib-color-primary-500, #3b82f6);
      color: var(--lib-color-neutral-0, #ffffff);
    }

    .lib-time-picker__ok-btn:hover {
      background: var(--lib-color-primary-600, #2563eb);
    }

    @media (prefers-reduced-motion: reduce) {
      .lib-time-picker__dropdown { animation: none; }
    }
  `,
})
export class TimePickerComponent implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Selected time value */
  readonly value = model<TimeValue | null>(null);

  /** Time format: 12h or 24h */
  readonly format = input<TimeFormat>('12h');

  /** Minute step (1, 5, 10, 15, 30) */
  readonly minuteStep = input<number>(1);

  /** Size variant */
  readonly size = input<DatePickerSize>('md');

  /** Placeholder text */
  readonly placeholder = input<string>('Select time');

  /** Aria label for input */
  readonly ariaLabel = input<string>('Time');

  /** Disabled state */
  readonly disabled = signal<boolean>(false);

  // ============================================================================
  // OUTPUTS
  // ============================================================================

  /** Emitted when value changes */
  readonly valueChange = output<TimeValue | null>();

  // ============================================================================
  // STATE
  // ============================================================================

  readonly isOpen = signal<boolean>(false);
  readonly selectedHour = signal<number>(12);
  readonly selectedMinute = signal<number>(0);
  readonly period = signal<'AM' | 'PM'>('AM');

  // ============================================================================
  // ControlValueAccessor
  // ============================================================================

  private onChange: (value: TimeValue | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: TimeValue | null): void {
    if (value) {
      this.value.set(value);
      if (this.format() === '12h') {
        this.selectedHour.set(value.hours % 12 || 12);
        this.period.set(value.hours >= 12 ? 'PM' : 'AM');
      } else {
        this.selectedHour.set(value.hours);
      }
      this.selectedMinute.set(value.minutes);
    } else {
      this.value.set(null);
    }
  }

  registerOnChange(fn: (value: TimeValue | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  readonly displayValue = computed(() => {
    const val = this.value();
    if (!val) return '';

    if (this.format() === '12h') {
      const hour12 = val.hours % 12 || 12;
      const periodStr = val.hours >= 12 ? 'PM' : 'AM';
      return `${hour12}:${val.minutes.toString().padStart(2, '0')} ${periodStr}`;
    } else {
      return `${val.hours.toString().padStart(2, '0')}:${val.minutes.toString().padStart(2, '0')}`;
    }
  });

  readonly hours = computed(() => {
    if (this.format() === '12h') {
      return Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
    }
    return Array.from({ length: 24 }, (_, i) => i);
  });

  readonly minutes = computed(() => {
    const step = this.minuteStep();
    return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
  });

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  constructor() {
    this.setupClickOutsideListener();
  }

  private setupClickOutsideListener(): void {
    const handler = (event: MouseEvent) => {
      if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
        this.closeDropdown();
      }
    };

    document.addEventListener('click', handler);
    this.destroyRef.onDestroy(() => {
      document.removeEventListener('click', handler);
    });
  }

  // ============================================================================
  // SELECTION
  // ============================================================================

  selectHour(hour: number): void {
    this.selectedHour.set(hour);
  }

  selectMinute(minute: number): void {
    this.selectedMinute.set(minute);
  }

  selectPeriod(p: 'AM' | 'PM'): void {
    this.period.set(p);
  }

  selectNow(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (this.format() === '12h') {
      this.selectedHour.set(hours % 12 || 12);
      this.period.set(hours >= 12 ? 'PM' : 'AM');
    } else {
      this.selectedHour.set(hours);
    }
    this.selectedMinute.set(minutes);
    
    // Also update the actual value so input reflects the change
    this.setValue({ hours, minutes });

    // Scroll to selected items after render
    requestAnimationFrame(() => this.scrollToSelectedItems());
  }

  confirmSelection(): void {
    let hours = this.selectedHour();
    const minutes = this.selectedMinute();

    if (this.format() === '12h') {
      if (this.period() === 'PM' && hours !== 12) {
        hours += 12;
      } else if (this.period() === 'AM' && hours === 12) {
        hours = 0;
      }
    }

    const timeValue: TimeValue = { hours, minutes };
    this.setValue(timeValue);
    this.closeDropdown();
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  formatHourDisplay(hour: number): string {
    if (this.format() === '12h') {
      return hour.toString();
    }
    return hour.toString().padStart(2, '0');
  }

  toggleDropdown(): void {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (!this.isOpen()) {
      this.onTouched();
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.onTouched();
  }

  onInputKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdown();
    } else if (event.key === 'Escape' && this.isOpen()) {
      event.preventDefault();
      this.closeDropdown();
    }
  }

  private setValue(time: TimeValue | null): void {
    this.value.set(time);
    this.onChange(time);
    this.valueChange.emit(time);
  }

  /** Scroll selected options into view in all columns */
  private scrollToSelectedItems(): void {
    const columns = this.elementRef.nativeElement.querySelectorAll('.lib-time-picker__column');
    columns.forEach((column: HTMLElement) => {
      const selected = column.querySelector('.lib-time-picker__option--selected');
      if (selected) {
        selected.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });
  }
}
