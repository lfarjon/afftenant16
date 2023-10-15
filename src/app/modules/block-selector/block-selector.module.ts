import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockSelectorComponent } from './block-selector.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BlockSelectorComponent],
  imports: [CommonModule, MatIconModule],
  exports: [BlockSelectorComponent],
})
export class BlockSelectorModule {}
