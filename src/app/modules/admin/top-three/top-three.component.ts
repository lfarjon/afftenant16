import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-top-three',
  templateUrl: './top-three.component.html',
  styleUrls: ['./top-three.component.scss'],
})
export class TopThreeComponent {
  @Input() products!: Product[];
  @Output() editProduct = new EventEmitter<any>();
  @Output() deleteProduct = new EventEmitter<any>();

  edit(data: any, index: number) {
    this.editProduct.emit({
      data: data,
      index: index,
    });
  }

  delete(data: any, index: number) {
    this.deleteProduct.emit({
      data: data,
      index: index,
    });
  }
}
