import {
  Component,
  ChangeDetectionStrategy,
  input,
  contentChildren,
  contentChild,
  computed,
  output,
  TemplateRef,
  Signal,
  isSignal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ColumnDefDirective } from '../column-def';
import { SortState, RowContext } from '../types/table.types';

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends object> {
  //#region Inputs
  /** Data source - accepts array or Signal<T[]> */
  readonly dataSource = input.required<T[] | Signal<T[]>>();

  /** Custom trackBy function */
  readonly trackBy = input<(index: number, item: T) => any>();

  /** Show loading state */
  readonly loading = input(false);

  /** Message to show when table is empty */
  readonly emptyMessage = input('No data available');

  /** Enable row hover effect */
  readonly hoverable = input(true);

  /** Enable striped rows */
  readonly striped = input(false);

  /** Table density: 'compact' | 'normal' | 'comfortable' */
  readonly density = input<'compact' | 'normal' | 'comfortable'>('normal');

  //#endregion Inputs

  //#region Outputs
  /** Emitted when sort changes */
  readonly sortChange = output<SortState>();

  /** Emitted when a row is clicked */
  readonly rowClick = output<{ item: T; index: number }>();
  //#endregion Outputs

  //#region Content Queries
  /** Column definitions from content */
  readonly columnDefs = contentChildren(ColumnDefDirective);

  /** Custom row template (legacy support) */
  readonly rowTemplate = contentChild<TemplateRef<RowContext<T>>>('tableRow');

  /** Empty state template */
  readonly emptyTemplate = contentChild<TemplateRef<void>>('empty');

  /** Loading state template */
  readonly loadingTemplate = contentChild<TemplateRef<void>>('loading');
  //#endregion Content Queries

  /** Data resolved from the data source (array or signal) */
  protected readonly data = computed(() => {
    const source = this.dataSource();
    // If it's a signal, unwrap it; otherwise return the array directly
    if (isSignal(source)) {
      return source();
    }
    return source;
  });

  protected readonly isEmpty = computed(() => this.data()?.length === 0);
  protected readonly isLoading = computed(() => this.loading());

  //#region Methods
  /** Default trackBy function */
  protected defaultTrackBy = (index: number, _item: T): number => index;

  /** Get the active trackBy function */
  protected getTrackBy(): (index: number, item: T) => any {
    return this.trackBy() ?? this.defaultTrackBy;
  }

  /** Handle row click */
  protected onRowClick(item: T, index: number): void {
    this.rowClick.emit({ item, index });
  }

  /** Get row context for template */
  protected getRowContext(item: T, index: number): RowContext<T> {
    const data = this.data();
    return {
      $implicit: item,
      index,
      first: index === 0,
      last: index === data.length - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
    };
  }
}
