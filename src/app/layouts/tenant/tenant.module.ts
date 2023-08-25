import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantComponent } from './tenant.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TenantComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [TenantComponent],
})
export class TenantModule {}
