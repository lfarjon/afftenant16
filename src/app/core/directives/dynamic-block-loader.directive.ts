import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicBlockLoader]',
})
export class DynamicBlockLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
