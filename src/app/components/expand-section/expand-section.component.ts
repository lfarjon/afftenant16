import { Component, Input, OnInit } from '@angular/core';
import { DynamicSection } from 'src/app/core/models/dynamic-section';

@Component({
  selector: 'app-expand-section',
  templateUrl: './expand-section.component.html',
  styleUrls: ['./expand-section.component.scss'],
})
export class ExpandSectionComponent implements OnInit {
  @Input() component!: DynamicSection;
  @Input() isSelected!: string;
  constructor() {}

  ngOnInit(): void {}
}
