import { Component } from '@angular/core';

@Component({
  selector: 'app-tool-builder',
  templateUrl: './tool-builder.component.html',
  styleUrls: ['./tool-builder.component.scss'],
})
export class ToolBuilderComponent {
  tools: string[] = [
    'comparison table',
    'product box',
    'top 3 box',
    'pros & cons box',
    'rating box',
    'versus box',
    'product slider',
  ];
  selectedTool: string = ''; // This will be bound to the mat-select
}
