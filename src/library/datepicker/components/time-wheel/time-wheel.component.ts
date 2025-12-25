/**
 * TimeWheel Component
 *
 * Touch-friendly wheel/scroll picker for mobile devices.
 * Similar to iOS time picker with smooth scroll behavior.
 *
 * Features:
 * - Touch scroll support
 * - Momentum scrolling
 * - 12h/24h format support
 * - Minute step configuration
 * - Haptic feedback ready
 *
 * @example
 * <lib-time-wheel [(value)]="time" format="12h" />
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
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { TimeValue, TimeFormat } from '../../types/datepicker.types';

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

@Component({
  selector: 'lib-time-wheel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeWheelComponent),
      multi: true,
    },
  ],
  host: {
    class: 'lib-time-wheel',
  },
  template: `
    <div class="lib-time-wheel__container">
      <!-- Hours Column -->
      <div
        #hoursWheel
        class="lib-time-wheel__column"
        (scroll)="onHoursScroll($event)"
        (touchend)="snapToNearest(hoursWheel, 'hours')"
        (mouseup)="snapToNearest(hoursWheel, 'hours')"
      >
        <div class="lib-time-wheel__spacer"></div>
        @for (hour of hours(); track hour) {
          <div
            class="lib-time-wheel__item"
            [class.lib-time-wheel__item--selected]="hour === selectedHour()"
            (click)="selectHour(hour)"
          >
            {{ formatHour(hour) }}
          </div>
        }
        <div class="lib-time-wheel__spacer"></div>
      </div>

      <div class="lib-time-wheel__separator">:</div>

      <!-- Minutes Column -->
      <div
        #minutesWheel
        class="lib-time-wheel__column"
        (scroll)="onMinutesScroll($event)"
        (touchend)="snapToNearest(minutesWheel, 'minutes')"
        (mouseup)="snapToNearest(minutesWheel, 'minutes')"
      >
        <div class="lib-time-wheel__spacer"></div>
        @for (minute of minutes(); track minute) {
          <div
            class="lib-time-wheel__item"
            [class.lib-time-wheel__item--selected]="minute === selectedMinute()"
            (click)="selectMinute(minute)"
          >
            {{ minute.toString().padStart(2, '0') }}
          </div>
        }
        <div class="lib-time-wheel__spacer"></div>
      </div>

      <!-- AM/PM Column (12h format only) -->
      @if (format() === '12h') {
        <div
          #periodWheel
          class="lib-time-wheel__column lib-time-wheel__column--period"
        >
          <div class="lib-time-wheel__spacer"></div>
          <div
            class="lib-time-wheel__item"
            [class.lib-time-wheel__item--selected]="period() === 'AM'"
            (click)="selectPeriod('AM')"
          >
            AM
          </div>
          <div
            class="lib-time-wheel__item"
            [class.lib-time-wheel__item--selected]="period() === 'PM'"
            (click)="selectPeriod('PM')"
          >
            PM
          </div>
          <div class="lib-time-wheel__spacer"></div>
        </div>
      }

      <!-- Selection highlight -->
      <div class="lib-time-wheel__highlight"></div>
    </div>
  `,
  styles: `
    :host {
      --wheel-height: ${ITEM_HEIGHT * VISIBLE_ITEMS}px;
      --item-height: ${ITEM_HEIGHT}px;
      display: block;
      font-family: var(--lib-font-family-base, system-ui, sans-serif);
    }

    .lib-time-wheel__container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: var(--wheel-height);
      background: var(--lib-color-neutral-50, #fafafa);
      border-radius: var(--lib-border-radius-lg, 8px);
      overflow: hidden;
    }

    .lib-time-wheel__column {
      height: 100%;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .lib-time-wheel__column::-webkit-scrollbar {
      display: none;
    }

    .lib-time-wheel__column--period {
      width: 60px;
    }

    .lib-time-wheel__spacer {
      height: calc(var(--wheel-height) / 2 - var(--item-height) / 2);
    }

    .lib-time-wheel__item {
      height: var(--item-height);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 var(--lib-spacing-4, 16px);
      font-size: var(--lib-font-size-lg, 18px);
      color: var(--lib-color-neutral-400, #a1a1aa);
      cursor: pointer;
      scroll-snap-align: center;
      transition: 
        color var(--lib-transition-fast, 150ms ease),
        transform var(--lib-transition-fast, 150ms ease);
    }

    .lib-time-wheel__item:hover {
      color: var(--lib-color-neutral-600, #52525b);
    }

    .lib-time-wheel__item--selected {
      color: var(--lib-color-neutral-900, #18181b);
      font-weight: var(--lib-font-weight-semibold, 600);
      transform: scale(1.1);
    }

    .lib-time-wheel__separator {
      font-size: var(--lib-font-size-xl, 20px);
      font-weight: var(--lib-font-weight-bold, 700);
      color: var(--lib-color-neutral-700, #3f3f46);
      padding: 0 var(--lib-spacing-2, 8px);
    }

    .lib-time-wheel__highlight {
      position: absolute;
      left: var(--lib-spacing-2, 8px);
      right: var(--lib-spacing-2, 8px);
      top: 50%;
      transform: translateY(-50%);
      height: var(--item-height);
      background: var(--lib-color-primary-100, #dbeafe);
      border-radius: var(--lib-border-radius-md, 6px);
      pointer-events: none;
      z-index: 0;
    }

    .lib-time-wheel__column {
      position: relative;
      z-index: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .lib-time-wheel__column {
        scroll-behavior: auto;
      }
      .lib-time-wheel__item {
        transition: none;
      }
    }
  `,
})
export class TimeWheelComponent implements ControlValueAccessor, AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('hoursWheel') private hoursWheel!: ElementRef<HTMLElement>;
  @ViewChild('minutesWheel') private minutesWheel!: ElementRef<HTMLElement>;
  @ViewChild('periodWheel') private periodWheel?: ElementRef<HTMLElement>;

  // ============================================================================
  // INPUTS
  // ============================================================================

  /** Selected time value */
  readonly value = model<TimeValue | null>(null);

  /** Time format: 12h or 24h */
  readonly format = input<TimeFormat>('12h');

  /** Minute step (1, 5, 10, 15, 30) */
  readonly minuteStep = input<number>(5);

  /** Disabled state */
  readonly disabled = signal<boolean>(false);

  // ============================================================================
  // OUTPUTS
  // ============================================================================

  readonly valueChange = output<TimeValue | null>();

  // ============================================================================
  // STATE
  // ============================================================================

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
      this.scrollToSelected();
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

  ngAfterViewInit(): void {
    // Scroll to initial values
    setTimeout(() => this.scrollToSelected(), 100);
  }

  // ============================================================================
  // SCROLL HANDLERS
  // ============================================================================

  onHoursScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const index = Math.round(el.scrollTop / ITEM_HEIGHT);
    const hours = this.hours();
    if (index >= 0 && index < hours.length) {
      this.selectedHour.set(hours[index]);
      this.emitChange();
    }
  }

  onMinutesScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const index = Math.round(el.scrollTop / ITEM_HEIGHT);
    const minutes = this.minutes();
    if (index >= 0 && index < minutes.length) {
      this.selectedMinute.set(minutes[index]);
      this.emitChange();
    }
  }

  snapToNearest(element: HTMLElement, type: 'hours' | 'minutes'): void {
    const scrollTop = element.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const targetScroll = index * ITEM_HEIGHT;
    element.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  // ============================================================================
  // SELECTION
  // ============================================================================

  selectHour(hour: number): void {
    this.selectedHour.set(hour);
    this.emitChange();
    this.scrollToHour(hour);
  }

  selectMinute(minute: number): void {
    this.selectedMinute.set(minute);
    this.emitChange();
    this.scrollToMinute(minute);
  }

  selectPeriod(p: 'AM' | 'PM'): void {
    this.period.set(p);
    this.emitChange();
    this.onTouched();
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  formatHour(hour: number): string {
    if (this.format() === '12h') {
      return hour.toString();
    }
    return hour.toString().padStart(2, '0');
  }

  private scrollToSelected(): void {
    const hourIndex = this.hours().indexOf(this.selectedHour());
    const minuteIndex = this.minutes().indexOf(this.selectedMinute());

    if (this.hoursWheel && hourIndex !== -1) {
      this.hoursWheel.nativeElement.scrollTop = hourIndex * ITEM_HEIGHT;
    }
    if (this.minutesWheel && minuteIndex !== -1) {
      this.minutesWheel.nativeElement.scrollTop = minuteIndex * ITEM_HEIGHT;
    }
  }

  private scrollToHour(hour: number): void {
    const index = this.hours().indexOf(hour);
    if (this.hoursWheel && index !== -1) {
      this.hoursWheel.nativeElement.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: 'smooth',
      });
    }
  }

  private scrollToMinute(minute: number): void {
    const index = this.minutes().indexOf(minute);
    if (this.minutesWheel && index !== -1) {
      this.minutesWheel.nativeElement.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: 'smooth',
      });
    }
  }

  private emitChange(): void {
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
    this.value.set(timeValue);
    this.onChange(timeValue);
    this.valueChange.emit(timeValue);
  }
}
