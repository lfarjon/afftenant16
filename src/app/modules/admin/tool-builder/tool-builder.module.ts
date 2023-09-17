import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBuilderComponent } from './tool-builder.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { toolBuilderRoutes } from './tool-builder.routing';

@NgModule({
  declarations: [ToolBuilderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(toolBuilderRoutes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class ToolBuilderModule {}
