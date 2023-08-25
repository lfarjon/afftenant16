import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { InnerFooterComponent } from './inner-footer.component';
import { BlocksModule } from '../../blocks/blocks.module';

@NgModule({
  declarations: [InnerFooterComponent],
  imports: [CommonModule, ComponentsModule, BlocksModule],
  exports: [InnerFooterComponent],
})
export class InnerFooterModule {}
