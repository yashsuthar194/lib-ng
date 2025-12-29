import { Signal, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { TableDataSource, FormRowContext } from '../types/table.types';

/**
 * Data source that wraps a FormArray<FormGroup>.
 * Provides FormGroup context for each row for inline editing.
 */
export class FormArrayDataSource<T> implements TableDataSource<T> {
  readonly data: Signal<T[]>;
  readonly formGroups: Signal<FormGroup[]>;
  readonly loading = signal(false);
  readonly totalCount: Signal<number>;

  constructor(private readonly formArray: FormArray<FormGroup>) {
    // Convert FormArray value changes to signal
    this.formGroups = toSignal(
      this.formArray.valueChanges.pipe(
        startWith(this.formArray.controls),
        map(() => this.formArray.controls as FormGroup[])
      ),
      { initialValue: this.formArray.controls as FormGroup[] }
    );

    // Extract raw values as data
    this.data = computed(() => this.formGroups().map(fg => fg.getRawValue() as T));

    this.totalCount = computed(() => this.data().length);
  }

  /**
   * Get the row context including FormGroup for template binding
   */
  getRowContext(index: number): FormRowContext<T> {
    const data = this.data();
    return {
      $implicit: data[index],
      index,
      first: index === 0,
      last: index === data.length - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
      formGroup: this.formGroups()[index],
    };
  }

  /**
   * Add a new FormGroup to the FormArray
   */
  add(formGroup: FormGroup): void {
    this.formArray.push(formGroup);
  }

  /**
   * Remove a FormGroup at the specified index
   */
  removeAt(index: number): void {
    this.formArray.removeAt(index);
  }

  /**
   * Get FormGroup at the specified index
   */
  getFormGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }
}
