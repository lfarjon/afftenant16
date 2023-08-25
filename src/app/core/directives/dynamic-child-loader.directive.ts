import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicChildLoader]',
})
export class DynamicChildLoaderDirective {
  @Input('dynamicChildLoader') blockType!: string;

  constructor(public viewContainerRef: ViewContainerRef) {}
}
