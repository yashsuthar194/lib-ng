/**
 * Card Image Directive
 */

import { Directive, input } from '@angular/core';

@Directive({
  selector: 'img[libCardImage]',
  standalone: true,
  host: { 
    'class': 'lib-card-image',
    '[style.height.px]': 'height()',
    '[style.object-fit]': '"cover"',
    '[style.width]': '"100%"',
    '[style.display]': '"block"',
  },
})
export class CardImageDirective {
  /** Fixed height for the image */
  readonly height = input<number | null>(null);
}
