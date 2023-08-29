import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { TenantModule } from '../tenant/tenant.module';
import { HomeModule } from '../home/home.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    TenantModule,
    HomeModule,
    ComponentsModule,
  ],
  exports: [PublicComponent],
})
export class PublicModule {}
