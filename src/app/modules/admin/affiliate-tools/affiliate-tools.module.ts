import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffiliateToolsComponent } from './affiliate-tools.component';
import { RouterModule } from '@angular/router';
import { affiliateToolsRoutes } from './affiliate-tools.routing';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [AffiliateToolsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(affiliateToolsRoutes),
    ComponentsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class AffiliateToolsModule {}
