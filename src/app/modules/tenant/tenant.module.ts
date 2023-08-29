import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantComponent } from './tenant.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderModule } from 'src/app/modules/tenant/header/header.module';
import { FooterModule } from 'src/app/modules/tenant/footer/footer.module';
import { TemplateModule } from 'src/app/modules/tenant/template/template.module';
import { DrawerModule } from 'src/app/modules/tenant/drawer/drawer.module';
import { RouterModule } from '@angular/router';
import { routes } from './routing';

@NgModule({
  declarations: [TenantComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatSidenavModule,
    HeaderModule,
    FooterModule,
    TemplateModule,
    DrawerModule,
    ComponentsModule,
  ],
  exports: [TenantComponent],
})
export class TenantModule {}
