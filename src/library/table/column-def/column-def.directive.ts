import { Directive, TemplateRef, input, contentChild } from '@angular/core';

/**
 * Directive to define a column in the table.
 * Usage:
 * <ng-container libColumnDef="name" [sortable]="true">
 *   <ng-template #header>Name</ng-template>
 *   <ng-template #cell let-row>{{ row.name }}</ng-template>
 * </ng-container>
 */
@Directive({
  selector: '[libColumnDef]',
  standalone: true,
})
export class ColumnDefDirective {
  /** Column key - must match a property on the row data */
  readonly name = input.required<string>({ alias: 'libColumnDef' });

  /** Whether the column is sortable */
  readonly sortable = input(false);

  /** Fixed width for the column */
  readonly width = input<string>();

  /** CSS class to apply to cells in this column */
  readonly cellClass = input<string>();

  /** Header template reference */
  readonly headerTemplate = contentChild<TemplateRef<any>>('header');

  /** Cell template reference */
  readonly cellTemplate = contentChild<TemplateRef<any>>('cell');
}
