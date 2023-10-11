import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBuilderComponent } from './tool-builder.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { toolBuilderRoutes } from './tool-builder.routing';
import { RankingCardsModule } from '../ranking-cards/ranking-cards.module';
import { ProductBoxModule } from '../product-box/product-box.module';
import { ComparisonMatrixModule } from '../comparison-matrix/comparison-matrix.module';
import { ComparisonTableModule } from '../comparison-table/comparison-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LinkSelectorModule } from '../link-selector/link-selector.module';
import { AddLinkModule } from '../add-link/add-link.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TopThreeModule } from '../top-three/top-three.module';
import { VersusBoxModule } from '../versus-box/versus-box.module';
import { SummaryBoxModule } from '../summary-box/summary-box.module';
import { ProductSliderModule } from '../product-slider/product-slider.module';
import { ProductCollageModule } from '../product-collage/product-collage.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ToolBuilderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(toolBuilderRoutes),
    ComponentsModule,
    ReactiveFormsModule,
    LinkSelectorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    AddLinkModule,
    RankingCardsModule,
    ComparisonMatrixModule,
    ComparisonTableModule,
    TopThreeModule,
    VersusBoxModule,
    ProductBoxModule,
    SummaryBoxModule,
    ProductSliderModule,
    ProductCollageModule,
    MatIconModule,
  ],
})
export class ToolBuilderModule {}
