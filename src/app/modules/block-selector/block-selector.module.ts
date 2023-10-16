import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockSelectorComponent } from './block-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [BlockSelectorComponent],
  imports: [CommonModule, MatIconModule, ComponentsModule],
  exports: [BlockSelectorComponent],
})
export class BlockSelectorModule {}
