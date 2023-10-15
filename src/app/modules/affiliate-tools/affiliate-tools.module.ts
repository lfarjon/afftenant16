import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffiliateToolsComponent } from './affiliate-tools.component';
import { RouterModule } from '@angular/router';
import { affiliateToolsRoutes } from './affiliate-tools.routing';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddLinkModule } from '../add-link/add-link.module';
import { LinkSelectorModule } from '../link-selector/link-selector.module';

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
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AddLinkModule,
    LinkSelectorModule,
  ],
})
export class AffiliateToolsModule {}
