import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Block } from '../models/block';
import { DynamicSection } from '../models/dynamic-section';
import { Article } from '../models/article';
import { AnyAaaaRecord } from 'dns';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  private componentsSubject = new BehaviorSubject<DynamicSection[]>([]);
  components$ = this.componentsSubject.asObservable();

  constructor(private blogService: BlogService) {}

  drop(
    event: CdkDragDrop<any>,
    components: DynamicSection[]
  ): Observable<DynamicSection[]> {
    let newComponents = [...components];
    console.log(event.currentIndex);

    newComponents.map((s, i) => (s.order = i + 1));

    return of(newComponents);
  }

  dropSection(event: CdkDragDrop<any>) {
    const article = this.blogService.article$;
    let currentSections = [...article.value.templateSections];
    moveItemInArray(currentSections, event.previousIndex, event.currentIndex);

    // currentSections.pop();
    console.log(currentSections);
    currentSections.map((s, i) => (s.order = i + 1));

    //update article
    article.next({
      ...article.value,
      templateSections: currentSections,
    });
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
    console.log('started');
    document.body.style.cursor = 'grabbing';
  }

  onDragEnd() {
    document.body.style.cursor = 'default';
  }
}
