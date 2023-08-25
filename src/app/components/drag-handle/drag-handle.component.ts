import { Component, Input, OnInit } from '@angular/core';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';

@Component({
  selector: 'app-drag-handle',
  templateUrl: './drag-handle.component.html',
  styleUrls: ['./drag-handle.component.scss'],
})
export class DragHandleComponent implements OnInit {
  @Input() component!: DynamicSection;
  @Input() block!: Block;
  @Input() panel: boolean = false;
  @Input() show!: boolean;
  panelClasses: string = 'cursor-move z-20 flex items-center justify-center';
  classes: string =
    'absolute bottom-0 right-0 transform  cursor-move text-white z-10 flex items-center justify-center';
  constructor() {}

  ngOnInit(): void {}
}
