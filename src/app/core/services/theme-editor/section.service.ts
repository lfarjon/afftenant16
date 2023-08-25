import { Injectable, QueryList, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DynamicChildLoaderDirective } from '../../directives/dynamic-child-loader.directive';
import { componentTypeMapping } from '../../models/component-mapping';
import {
  availableSections,
  DynamicSection,
} from '../../models/dynamic-section';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private _sections = new Map<string, BehaviorSubject<DynamicSection[]>>();

  constructor() {}

  loadSectionsComponents(
    dynamicChildren: QueryList<DynamicChildLoaderDirective>,
    sections: DynamicSection[] | undefined,
    inputs?: any
  ) {
    // Check that we have the same number of directives as components
    if (dynamicChildren.length !== sections?.length) {
      console.warn(
        'Mismatch between number of components and dynamicChild directives.'
      );
      return;
    }
    sections?.forEach((section: DynamicSection, index: number) => {
      const component = componentTypeMapping[section.type];
      if (component) {
        this.loadComponent(
          component,
          dynamicChildren.toArray()[index],
          inputs,
          section
        );
      } else {
        console.warn(`Unknown component type: ${section.type}`);
      }
    });
  }

  loadComponent(
    component: Type<any>,
    dynamicChild: DynamicChildLoaderDirective,
    inputs: any,
    section: DynamicSection
  ) {
    dynamicChild.viewContainerRef.clear();
    const componentRef =
      dynamicChild.viewContainerRef.createComponent(component);
    const componentInstance: any = componentRef.instance;
    componentInstance.section = section;
    if (
      section.type === 'theme-navigation' ||
      section.type === 'theme-sidenav'
    ) {
      componentInstance.drawer = inputs;
    }
  }

  getAvailableSectionsForTemplatePart(templatePart: string): string[] {
    return availableSections[templatePart] || [];
  }
}
