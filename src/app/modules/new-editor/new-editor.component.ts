import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'app-new-editor',
  templateUrl: './new-editor.component.html',
  styleUrls: ['./new-editor.component.scss'],
})
export class NewEditorComponent {
  isSelected$: Observable<string> = this.sectionService.isSelected$;

  constructor(private sectionService: SectionService) {}

  clearSelection() {
    this.sectionService.isSelected$.next('');
  }
}
