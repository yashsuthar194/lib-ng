/**
 * DatePicker Example Component
 *
 * Showcases all DatePicker variants and features.
 */

import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  DatePickerComponent,
  CalendarComponent,
  DateRangePickerComponent,
  TimePickerComponent,
  DateTimePickerComponent,
  MonthYearPickerComponent,
  type DateRange,
} from '../../../library/datepicker';

@Component({
  selector: 'app-datepicker-example',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePickerComponent,
    CalendarComponent,
    DateRangePickerComponent,
    TimePickerComponent,
    DateTimePickerComponent,
    MonthYearPickerComponent,
  ],
  template: `
    <div class="example-page">
      <h1>DatePicker Examples</h1>
      <p class="subtitle">Flexible date & time selection components with smooth animations</p>

      <!-- Date Picker -->
      <section class="example-section">
        <h2>Date Picker</h2>
        <p>Input field with calendar dropdown. Supports smart parsing and relative display.</p>

        <div class="example-demo">
          <lib-date-picker placeholder="Select a date" (dateChange)="onDateChange($event)" />
        </div>
      </section>

      <!-- Date Range Picker -->
      <section class="example-section">
        <h2>Date Range Picker</h2>
        <p>Select start and end dates with preset shortcuts.</p>

        <div class="example-demo">
          <lib-date-range-picker
            placeholder="Select date range"
            [showPresets]="true"
            [showDayCount]="true"
            (valueChange)="onRangeChange($event)"
          />
        </div>
      </section>

      <!-- Time Picker -->
      <section class="example-section">
        <h2>Time Picker</h2>
        <p>Hour and minute selection with 12h/24h format support.</p>

        <div class="example-demo example-demo--row">
          <div>
            <label class="example-label">12-hour format</label>
            <lib-time-picker format="12h" placeholder="Select time" />
          </div>
          <div>
            <label class="example-label">24-hour format</label>
            <lib-time-picker format="24h" placeholder="Select time" />
          </div>
          <div>
            <label class="example-label">15-min steps</label>
            <lib-time-picker format="12h" [minuteStep]="15" placeholder="Select time" />
          </div>
        </div>
      </section>

      <!-- DateTime Picker -->
      <section class="example-section">
        <h2>DateTime Picker</h2>
        <p>Combined date and time selection in a single component.</p>

        <div class="example-demo">
          <lib-datetime-picker placeholder="Select date and time" format="12h" />
        </div>
      </section>

      <!-- Month/Year Picker -->
      <section class="example-section">
        <h2>Month/Year Picker</h2>
        <p>Select month and year only (no day selection).</p>

        <div class="example-demo">
          <lib-month-year-picker placeholder="Select month" />
        </div>
      </section>

      <!-- Inline Calendar -->
      <section class="example-section">
        <h2>Inline Calendar</h2>
        <p>Standalone calendar without dropdown.</p>

        <div class="example-demo">
          <lib-calendar [selected]="inlineDate()" (dateSelect)="onInlineDateSelect($event)" />
        </div>

        <p class="example-value">
          Selected: {{ inlineDate() ? formatDate(inlineDate()!) : 'None' }}
        </p>
      </section>

      <!-- With FormControl -->
      <section class="example-section">
        <h2>Forms Integration</h2>
        <p>All pickers implement ControlValueAccessor for Angular Forms.</p>

        <div class="example-demo">
          <lib-date-picker [formControl]="dateControl" placeholder="Form-bound date" />
        </div>

        <p class="example-value">
          Form value: {{ dateControl.value ? formatDate(dateControl.value) : 'null' }}
        </p>
      </section>
    </div>
  `,
  styles: `
    .example-page {
      max-width: 800px;
      padding: var(--lib-spacing-6, 24px);
    }

    h1 {
      font-size: var(--lib-font-size-2xl, 24px);
      font-weight: var(--lib-font-weight-bold, 700);
      margin-bottom: var(--lib-spacing-2, 8px);
      color: var(--lib-color-neutral-900, #18181b);
    }

    .subtitle {
      color: var(--lib-color-neutral-500, #71717a);
      margin-bottom: var(--lib-spacing-8, 32px);
    }

    h2 {
      font-size: var(--lib-font-size-lg, 18px);
      font-weight: var(--lib-font-weight-semibold, 600);
      margin-bottom: var(--lib-spacing-2, 8px);
    }

    .example-section {
      margin-bottom: var(--lib-spacing-8, 32px);
      padding: var(--lib-spacing-5, 20px);
      border: 1px solid var(--lib-color-neutral-200, #e4e4e7);
      border-radius: var(--lib-border-radius-lg, 8px);
    }

    .example-section > p {
      color: var(--lib-color-neutral-600, #52525b);
      font-size: var(--lib-font-size-sm, 14px);
      margin-bottom: var(--lib-spacing-4, 16px);
    }

    .example-demo {
      margin-bottom: var(--lib-spacing-4, 16px);
    }

    .example-demo--row {
      display: flex;
      gap: var(--lib-spacing-4, 16px);
      flex-wrap: wrap;
    }

    .example-label {
      display: block;
      font-size: var(--lib-font-size-xs, 12px);
      font-weight: var(--lib-font-weight-medium, 500);
      color: var(--lib-color-neutral-600, #52525b);
      margin-bottom: var(--lib-spacing-1, 4px);
    }

    .example-value {
      font-family: var(--lib-font-family-mono, monospace);
      font-size: var(--lib-font-size-xs, 12px);
      color: var(--lib-color-neutral-500, #71717a);
      padding: var(--lib-spacing-2, 8px);
      background: var(--lib-color-neutral-100, #f4f4f5);
      border-radius: var(--lib-border-radius-md, 6px);
    }

    .example-hint {
      font-size: var(--lib-font-size-xs, 12px);
      color: var(--lib-color-primary-600, #2563eb);
      font-style: italic;
    }
  `,
})
export class DatePickerExampleComponent {
  // Inline calendar
  readonly inlineDate = signal<Date | null>(null);

  // FormControl integration
  readonly dateControl = new FormControl<Date | null>(null);

  onDateChange(event: { date: Date | null }): void {
    console.log('Date selected:', event.date);
  }

  onRangeChange(range: DateRange | null): void {
    console.log('Range selected:', range);
  }

  onInlineDateSelect(date: Date): void {
    this.inlineDate.set(date);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
