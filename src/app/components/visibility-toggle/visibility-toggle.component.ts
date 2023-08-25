import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';

@Component({
  selector: 'app-visibility-toggle',
  templateUrl: './visibility-toggle.component.html',
  styleUrls: ['./visibility-toggle.component.scss'],
})
export class VisibilityToggleComponent implements OnInit {
  @Input() component!: DynamicSection | Block;
  @Output() toggler = new EventEmitter<DynamicSection | Block>();

  constructor() {}

  ngOnInit(): void {}

  toggle(component: DynamicSection | Block) {
    this.toggler.emit(component);
  }
}
