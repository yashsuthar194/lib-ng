import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appLibHeader]',
  standalone: true,
})
export class LibHeaderDirective {
  constructor(public template: TemplateRef<any>) {}
}
