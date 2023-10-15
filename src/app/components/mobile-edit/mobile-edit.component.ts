import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { TemplateService } from 'src/app/core/services/template.service';

@Component({
  selector: 'app-mobile-edit',
  templateUrl: './mobile-edit.component.html',
  styleUrls: ['./mobile-edit.component.scss'],
})
export class MobileEditComponent implements OnInit {
  @Input() drawer!: MatDrawer;
  @Input() section!: DynamicSection;
  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {}

  editSection() {
    if (!this.drawer.opened) this.drawer.open();
    this.templateService.isSelected.next(this.section.sectionId);
  }
}
