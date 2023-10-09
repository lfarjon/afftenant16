import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Feature } from 'src/app/core/models/feature';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-comparison-matrix',
  templateUrl: './comparison-matrix.component.html',
  styleUrls: ['./comparison-matrix.component.scss'],
})
export class ComparisonMatrixComponent {
  @Input() products!: Product[];
  @Input() features!: Feature[];
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
