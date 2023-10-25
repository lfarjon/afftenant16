import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockSelectorComponent } from './block-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DynamicChildLoaderDirective } from 'src/app/core/directives/dynamic-child-loader.directive';

@NgModule({
  declarations: [BlockSelectorComponent],
  imports: [CommonModule, MatIconModule, ComponentsModule, DragDropModule],
  exports: [BlockSelectorComponent],
})
export class BlockSelectorModule {}
