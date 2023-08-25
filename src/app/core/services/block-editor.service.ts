import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BlockEditorService {
  fields = new BehaviorSubject<FormlyFieldConfig[]>([]);
  model = new BehaviorSubject<any>('');
  constructor() {}

  // getFields(blockType: string) {
  //   return blockFields[blockType] || [];
  // }

  // getModel(blockType: string) {
  //   return blockModels[blockType] || [];
  // }
}
