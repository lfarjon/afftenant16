import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantComponent } from './tenant.component';
import { RouterModule } from '@angular/router';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import { TemplatePanelComponent } from './template-panel/template-panel.component';
import { FooterPanelComponent } from './footer-panel/footer-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    TenantComponent,
    HeaderPanelComponent,
    FooterPanelComponent,
    TemplatePanelComponent,
  ],
  imports: [CommonModule, RouterModule, MatExpansionModule, ComponentsModule],
  exports: [TenantComponent],
})
export class TenantModule {}
