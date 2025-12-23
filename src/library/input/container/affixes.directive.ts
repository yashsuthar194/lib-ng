import { Directive } from '@angular/core';

/**
 * Directive to mark content as a prefix inside lib-form-field.
 * 
 * @example
 * ```html
 * <lib-form-field label="Email">
 *   <svg libPrefix><!-- icon --></svg>
 *   <input libInput type="email" />
 * </lib-form-field>
 * ```
 */
@Directive({
  selector: '[libPrefix]',
  standalone: true,
  host: {
    'class': 'lib-form-field__prefix-content',
  },
})
export class PrefixDirective {}

/**
 * Directive to mark content as a suffix inside lib-form-field.
 * 
 * @example
 * ```html
 * <lib-form-field label="Password">
 *   <input libInput type="password" />
 *   <button libSuffix (click)="toggleVisibility()">👁️</button>
 * </lib-form-field>
 * ```
 */
@Directive({
  selector: '[libSuffix]',
  standalone: true,
  host: {
    'class': 'lib-form-field__suffix-content',
  },
})
export class SuffixDirective {}
