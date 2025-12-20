import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLibColumn]',
  standalone: true,
})
export class LibColumnDirective {
  constructor(public template: TemplateRef<any>) {}
}
