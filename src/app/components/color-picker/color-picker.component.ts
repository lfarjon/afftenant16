import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @Input() color: string = '';
  @Output() newColor = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  changeColor(color: string) {
    this.newColor.emit(color);
  }
}
