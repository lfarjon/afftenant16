import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteEditorComponent } from './website-editor.component';
import { RouterModule } from '@angular/router';
import { routes } from './routing';
import { ThemeModule } from '../theme/theme.module';
import { TemplateModule } from '../theme/sections/template/template.module';

@NgModule({
  declarations: [WebsiteEditorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TemplateModule],
})
export class WebsiteEditorModule {}
