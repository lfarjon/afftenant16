import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { DynamicSection } from 'src/app/core/models/dynamic-section';

@Component({
  selector: 'block-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent implements AfterViewInit {
  @Input() content!: string;
  @Input() section!: DynamicSection;

  constructor(private cd: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
