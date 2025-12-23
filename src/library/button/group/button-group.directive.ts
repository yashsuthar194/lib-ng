/**
 * Button Group Directive
 * 
 * @description
 * Groups multiple buttons together with connected styling.
 * 
 * @example
 * ```html
 * <div libButtonGroup>
 *   <button libButton variant="outline">Left</button>
 *   <button libButton variant="outline">Center</button>
 *   <button libButton variant="outline">Right</button>
 * </div>
 * ```
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[libButtonGroup]',
  standalone: true,
  host: {
    'class': 'lib-button-group',
    'role': 'group',
  },
})
export class ButtonGroupDirective {}
