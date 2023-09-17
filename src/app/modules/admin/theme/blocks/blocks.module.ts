import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons/buttons.component';
import { HeadingComponent } from './heading/heading.component';
import { TextComponent } from './text/text.component';
import { CtaComponent } from './cta/cta.component';
import { SubHeadingComponent } from './sub-heading/sub-heading.component';
import { ColumnComponent } from './column/column.component';
import { CollapsibleRowComponent } from './collapsible-row/collapsible-row.component';
import { SlideComponent } from './slide/slide.component';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';
import { SocialComponent } from './social/social.component';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ImageComponent } from './image/image.component';
import { ButtonComponent } from './button/button.component';
import { SecondaryMenuComponent } from './secondary-menu/secondary-menu.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { FooterEmailComponent } from './footer-email/footer-email.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSliderModule } from '@angular/material/slider';
import { ColorPickerComponent } from 'src/app/components/color-picker/color-picker.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ButtonsComponent,
    HeadingComponent,
    TextComponent,
    CtaComponent,
    SubHeadingComponent,
    ColumnComponent,
    CollapsibleRowComponent,
    SlideComponent,
    LogoComponent,
    MenuComponent,
    SocialComponent,
    SearchComponent,
    SideMenuComponent,
    ImageComponent,
    ButtonComponent,
    SecondaryMenuComponent,
    AnnouncementComponent,
    FooterEmailComponent,
    CopyrightComponent,
    ColorPickerComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormlyModule.forChild({}),
    FormlyMatSliderModule,
    MatPaginatorModule,
    MatSliderModule,
    FormlyMaterialModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ComponentsModule,
    ColorPickerModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  exports: [
    SlideComponent,
    MenuComponent,
    LogoComponent,
    SocialComponent,
    CtaComponent,
    SearchComponent,
    SideMenuComponent,
    ImageComponent,
    ButtonComponent,
    SecondaryMenuComponent,
    AnnouncementComponent,
    FooterEmailComponent,
    CopyrightComponent,
    ColorPickerComponent,
  ],
  providers: [],
})
export class BlocksModule {}
