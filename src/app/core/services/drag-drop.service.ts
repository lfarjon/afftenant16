import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Block } from '../models/block';
import { DynamicSection } from '../models/dynamic-section';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  private componentsSubject = new BehaviorSubject<DynamicSection[]>([]);
  components$ = this.componentsSubject.asObservable();

  constructor() {}

  drop(
    event: CdkDragDrop<string[]>,
    components: DynamicSection[]
  ): Observable<DynamicSection[]> {
    const newComponents = [...components];
    moveItemInArray(newComponents, event.previousIndex, event.currentIndex);
    newComponents.forEach((component, index) => {
      console.log(index);
      component.order = index + 1;
    });
    return of(newComponents);
  }

  dropBlock(
    event: CdkDragDrop<string[]>,
    components: Block[]
  ): Observable<Block[]> {
    const newComponents = [...components];
    moveItemInArray(newComponents, event.previousIndex, event.currentIndex);
    newComponents.forEach((component, index) => {
      component.order = index + 1;
    });
    return of(newComponents);
  }

  onDragStart() {
    document.body.style.cursor = 'grabbing';
  }

  onDragEnd() {
    document.body.style.cursor = 'default';
  }
}
