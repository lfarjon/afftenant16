import { Type } from '@angular/core';
import { ButtonsComponent } from 'src/app/modules/admin/theme/blocks/buttons/buttons.component';
import { CollapsibleRowComponent } from 'src/app/modules/admin/theme/blocks/collapsible-row/collapsible-row.component';
import { ColumnComponent } from 'src/app/modules/admin/theme/blocks/column/column.component';
import { CtaComponent } from 'src/app/modules/admin/theme/blocks/cta/cta.component';
import { HeadingComponent } from 'src/app/modules/admin/theme/blocks/heading/heading.component';
import { SlideComponent } from 'src/app/modules/admin/theme/blocks/slide/slide.component';
import { SubHeadingComponent } from 'src/app/modules/admin/theme/blocks/sub-heading/sub-heading.component';
import { TextComponent } from 'src/app/modules/admin/theme/blocks/text/text.component';
import { CollapsibleRowsComponent } from 'src/app/modules/admin/theme/sections/collapsible-rows/collapsible-rows.component';
import { ContactFormComponent } from 'src/app/modules/admin/theme/sections/contact-form/contact-form.component';
import { EmailSignupComponent } from 'src/app/modules/admin/theme/sections/email-signup/email-signup.component';
import { FooterComponent } from 'src/app/modules/admin/theme/sections/footer/footer.component';
import { InnerFooterComponent } from 'src/app/modules/admin/theme/sections/inner-footer/inner-footer.component';
import { HeaderComponent } from 'src/app/modules/admin/theme/sections/header/header.component';
import { ImageBannerComponent } from 'src/app/modules/admin/theme/sections/image-banner/image-banner.component';
import { ImageTextComponent } from 'src/app/modules/admin/theme/sections/image-text/image-text.component';
import { MultiColumnComponent } from 'src/app/modules/admin/theme/sections/multi-column/multi-column.component';
import { RichTextComponent } from 'src/app/modules/admin/theme/sections/rich-text/rich-text.component';
import { SlideshowComponent } from 'src/app/modules/admin/theme/sections/slideshow/slideshow.component';
import { NavigationComponent } from 'src/app/modules/admin/theme/sections/navigation/navigation.component';
import { AnnouncementBarComponent } from 'src/app/modules/admin/theme/sections/announcement-bar/announcement-bar.component';
import { LogoComponent } from 'src/app/modules/admin/theme/blocks/logo/logo.component';
import { MenuComponent } from 'src/app/modules/admin/theme/blocks/menu/menu.component';
import { SocialComponent } from 'src/app/modules/admin/theme/blocks/social/social.component';
import { SearchComponent } from 'src/app/modules/admin/theme/blocks/search/search.component';
import { SideMenuComponent } from 'src/app/modules/admin/theme/blocks/side-menu/side-menu.component';
import { ImageComponent } from 'src/app/modules/admin/theme/blocks/image/image.component';
import { DrawerComponent } from 'src/app/modules/admin/theme/sections/drawer/drawer.component';
import { SidenavComponent } from 'src/app/modules/admin/theme/sections/sidenav/sidenav.component';
import { ButtonComponent } from 'src/app/modules/admin/theme/blocks/button/button.component';
import { SecondaryMenuComponent } from 'src/app/modules/admin/theme/blocks/secondary-menu/secondary-menu.component';
import { AnnouncementComponent } from 'src/app/modules/admin/theme/blocks/announcement/announcement.component';
import { FooterEmailComponent } from 'src/app/modules/admin/theme/blocks/footer-email/footer-email.component';
import { CopyrightComponent } from 'src/app/modules/admin/theme/blocks/copyright/copyright.component';
import { RankingCardsComponent } from 'src/app/modules/admin/ranking-cards/ranking-cards.component';
import { ComparisonTableComponent } from 'src/app/modules/admin/comparison-table/comparison-table.component';
import { ComparisonMatrixComponent } from 'src/app/modules/admin/comparison-matrix/comparison-matrix.component';
import { ProductBoxComponent } from 'src/app/modules/admin/product-box/product-box.component';
import { TopThreeComponent } from 'src/app/modules/admin/top-three/top-three.component';
import { SummaryBoxComponent } from 'src/app/modules/admin/summary-box/summary-box.component';
import { VersusBoxComponent } from 'src/app/modules/admin/versus-box/versus-box.component';
import { ProductSliderComponent } from 'src/app/modules/admin/product-slider/product-slider.component';
import { ProductCollageComponent } from 'src/app/modules/admin/product-collage/product-collage.component';

export const componentTypeMapping: Record<string, Type<any>> = {
  'theme-header': HeaderComponent,
  'theme-navigation': NavigationComponent,
  'theme-announcement-bar': AnnouncementBarComponent,
  'theme-footer': FooterComponent,
  'theme-drawer': DrawerComponent,
  'theme-image-banner': ImageBannerComponent,
  'theme-image-text': ImageTextComponent,
  'theme-contact-form': ContactFormComponent,
  'theme-email-signup': EmailSignupComponent,
  'theme-inner-footer': InnerFooterComponent,
  'theme-collapsible-rows': CollapsibleRowsComponent,
  'theme-multi-column': MultiColumnComponent,
  'theme-rich-text': RichTextComponent,
  'theme-slideshow': SlideshowComponent,
  'theme-sidenav': SidenavComponent,
  // Add more mappings as necessary...
};

export const blockTypeMapping: Record<string, Type<any>> = {
  'block-buttons': ButtonsComponent,
  'block-heading': HeadingComponent,
  'block-text': TextComponent,
  'block-cta': CtaComponent,
  'block-sub-heading': SubHeadingComponent,
  'block-column': ColumnComponent,
  'block-collapsible-row': CollapsibleRowComponent,
  'block-slide': SlideComponent,
  'block-logo': LogoComponent,
  'block-menu': MenuComponent,
  'block-social': SocialComponent,
  'block-search': SearchComponent,
  'block-side-menu': SideMenuComponent,
  'block-image': ImageComponent,
  'block-button': ButtonComponent,
  'block-secondary-menu': SecondaryMenuComponent,
  'block-announcement': AnnouncementComponent,
  'block-email-signup': FooterEmailComponent,
  'block-copyright': CopyrightComponent,
};

export const affiliateToolMapping: Record<string, Type<any>> = {
  'aff-ranking-cards': RankingCardsComponent,
  'aff-comparison-table': ComparisonTableComponent,
  'aff-comparison-matrix': ComparisonMatrixComponent,
  'aff-product-box': ProductBoxComponent,
  'aff-top-3-box': TopThreeComponent,
  'aff-summary-box': SummaryBoxComponent,
  'aff-versus-box': VersusBoxComponent,
  'aff-product-slider': ProductSliderComponent,
  'aff-product-collage': ProductCollageComponent,
};
