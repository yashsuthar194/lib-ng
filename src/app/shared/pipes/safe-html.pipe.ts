import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Pipe to bypass Angular's HTML sanitization for trusted content.
 * Use ONLY for trusted, developer-controlled content like SVG icons.
 *
 * @example
 * ```html
 * <span [innerHTML]="iconSvg | safeHtml"></span>
 * ```
 */
@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
