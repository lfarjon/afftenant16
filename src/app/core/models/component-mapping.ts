import { Type } from '@angular/core';
import { ButtonsComponent } from 'src/app/modules/theme/blocks/buttons/buttons.component';
import { CollapsibleRowComponent } from 'src/app/modules/theme/blocks/collapsible-row/collapsible-row.component';
import { ColumnComponent } from 'src/app/modules/theme/blocks/column/column.component';
import { CtaComponent } from 'src/app/modules/theme/blocks/cta/cta.component';
import { HeadingComponent } from 'src/app/modules/theme/blocks/heading/heading.component';
import { SlideComponent } from 'src/app/modules/theme/blocks/slide/slide.component';
import { SubHeadingComponent } from 'src/app/modules/theme/blocks/sub-heading/sub-heading.component';
import { TextComponent } from 'src/app/modules/theme/blocks/text/text.component';
import { CollapsibleRowsComponent } from 'src/app/modules/theme/sections/collapsible-rows/collapsible-rows.component';
import { ContactFormComponent } from 'src/app/modules/theme/sections/contact-form/contact-form.component';
import { EmailSignupComponent } from 'src/app/modules/theme/sections/email-signup/email-signup.component';
import { FooterComponent } from 'src/app/modules/theme/sections/footer/footer.component';
import { InnerFooterComponent } from 'src/app/modules/theme/sections/inner-footer/inner-footer.component';
import { HeaderComponent } from 'src/app/modules/theme/sections/header/header.component';
import { ImageBannerComponent } from 'src/app/modules/theme/sections/image-banner/image-banner.component';
import { ImageTextComponent } from 'src/app/modules/theme/sections/image-text/image-text.component';
import { MultiColumnComponent } from 'src/app/modules/theme/sections/multi-column/multi-column.component';
import { RichTextComponent } from 'src/app/modules/theme/sections/rich-text/rich-text.component';
import { SlideshowComponent } from 'src/app/modules/theme/sections/slideshow/slideshow.component';
import { NavigationComponent } from 'src/app/modules/theme/sections/navigation/navigation.component';
import { AnnouncementBarComponent } from 'src/app/modules/theme/sections/announcement-bar/announcement-bar.component';
import { LogoComponent } from 'src/app/modules/theme/blocks/logo/logo.component';
import { MenuComponent } from 'src/app/modules/theme/blocks/menu/menu.component';
import { SocialComponent } from 'src/app/modules/theme/blocks/social/social.component';
import { SearchComponent } from 'src/app/modules/theme/blocks/search/search.component';
import { SideMenuComponent } from 'src/app/modules/theme/blocks/side-menu/side-menu.component';
import { ImageComponent } from 'src/app/modules/theme/blocks/image/image.component';
import { DrawerComponent } from 'src/app/modules/theme/sections/drawer/drawer.component';
import { SidenavComponent } from 'src/app/modules/theme/sections/sidenav/sidenav.component';
import { ButtonComponent } from 'src/app/modules/theme/blocks/button/button.component';
import { SecondaryMenuComponent } from 'src/app/modules/theme/blocks/secondary-menu/secondary-menu.component';
import { AnnouncementComponent } from 'src/app/modules/theme/blocks/announcement/announcement.component';
import { FooterEmailComponent } from 'src/app/modules/theme/blocks/footer-email/footer-email.component';
import { CopyrightComponent } from 'src/app/modules/theme/blocks/copyright/copyright.component';
import { RankingCardsComponent } from 'src/app/modules/ranking-cards/ranking-cards.component';
import { ComparisonTableComponent } from 'src/app/modules/comparison-table/comparison-table.component';
import { ComparisonMatrixComponent } from 'src/app/modules/comparison-matrix/comparison-matrix.component';
import { ProductBoxComponent } from 'src/app/modules/product-box/product-box.component';
import { TopThreeComponent } from 'src/app/modules/top-three/top-three.component';
import { SummaryBoxComponent } from 'src/app/modules/summary-box/summary-box.component';
import { VersusBoxComponent } from 'src/app/modules/versus-box/versus-box.component';
import { ProductSliderComponent } from 'src/app/modules/product-slider/product-slider.component';
import { ProductCollageComponent } from 'src/app/modules/product-collage/product-collage.component';
import { TextViewerComponent } from 'src/app/modules/quill-viewer/quill-view.component';

export const componentTypeMapping: Record<
  string,
  { component: Type<any>; icon: string; name: string }
> = {
  'theme-header': {
    component: HeaderComponent,
    icon: '',
    name: 'Header',
  },
  'theme-navigation': {
    component: NavigationComponent,
    icon: '',
    name: 'Navigation',
  },
  'theme-announcement-bar': {
    component: AnnouncementBarComponent,
    icon: '',
    name: 'Announcement Bar',
  },
  'theme-footer': {
    component: FooterComponent,
    icon: '',
    name: 'Footer',
  },
  'theme-drawer': {
    component: DrawerComponent,
    icon: '',
    name: 'Drawer',
  },
  'theme-inner-footer': {
    component: InnerFooterComponent,
    icon: '',
    name: 'Inner footer',
  },
  'theme-sidenav': {
    component: SidenavComponent,
    icon: '',
    name: 'Sidenav',
  },
  'theme-image-banner': {
    component: ImageBannerComponent,
    icon: '',
    name: 'Image banner',
  },
  'theme-image-text': {
    component: ImageTextComponent,
    icon: '',
    name: 'Image text',
  },
  'theme-contact-form': {
    component: ContactFormComponent,
    icon: 'contact_mail',
    name: 'Contact form',
  },
  'theme-email-signup': {
    component: EmailSignupComponent,
    icon: 'mail',
    name: 'Email signup',
  },
  'theme-collapsible-rows': {
    component: CollapsibleRowsComponent,
    icon: 'expand_all',
    name: 'Collapsible rows',
  },
  'theme-multi-column': {
    component: MultiColumnComponent,
    icon: 'view_column',
    name: 'Multi column',
  },
  'theme-rich-text': {
    component: RichTextComponent,
    icon: 'article',
    name: 'Rich text',
  },
  'theme-slideshow': {
    component: SlideshowComponent,
    icon: 'wallpaper_slideshow',
    name: 'Slideshow',
  },
};

export const textTypeMapping: Record<
  string,
  { component: Type<any>; icon: string; name: string }
> = {
  'text-quill-view': {
    component: TextViewerComponent,
    icon: 'text',
    name: 'Paragraph',
  },
};
export const blockTypeMapping: Record<
  string,
  { component: Type<any>; icon: string }
> = {
  'block-buttons': {
    component: ButtonsComponent,
    icon: '',
  },
  'block-heading': {
    component: HeadingComponent,
    icon: '',
  },
  'block-text': { component: TextComponent, icon: '' },
  'block-cta': { component: CtaComponent, icon: '' },
  'block-sub-heading': {
    component: SubHeadingComponent,
    icon: '',
  },
  'block-column': {
    component: ColumnComponent,
    icon: '',
  },
  'block-collapsible-row': {
    component: CollapsibleRowComponent,
    icon: '',
  },
  'block-slide': { component: SlideComponent, icon: '' },
  'block-logo': { component: LogoComponent, icon: '' },
  'block-menu': { component: MenuComponent, icon: '' },
  'block-social': {
    component: SocialComponent,
    icon: '',
  },
  'block-search': {
    component: SearchComponent,
    icon: '',
  },
  'block-side-menu': {
    component: SideMenuComponent,
    icon: '',
  },
  'block-image': { component: ImageComponent, icon: '' },
  'block-button': {
    component: ButtonComponent,
    icon: '',
  },
  'block-secondary-menu': {
    component: SecondaryMenuComponent,
    icon: '',
  },
  'block-announcement': {
    component: AnnouncementComponent,
    icon: '',
  },
  'block-email-signup': {
    component: FooterEmailComponent,
    icon: '',
  },
  'block-copyright': {
    component: CopyrightComponent,
    icon: '',
  },
};

export const affiliateToolMapping: Record<
  string,
  { component: Type<any>; icon: string; name: string }
> = {
  'aff-ranking-cards': {
    component: RankingCardsComponent,
    icon: 'cards',
    name: 'Ranking cards',
  },
  'aff-comparison-table': {
    component: ComparisonTableComponent,
    icon: 'table',
    name: 'Comparison table',
  },
  'aff-comparison-matrix': {
    component: ComparisonMatrixComponent,
    icon: 'data_table',
    name: 'Comparison matrix',
  },
  'aff-product-box': {
    component: ProductBoxComponent,
    icon: 'category',
    name: 'Product box',
  },
  'aff-top-three': {
    component: TopThreeComponent,
    icon: 'trophy',
    name: 'Top 3 products',
  },
  'aff-summary-box': {
    component: SummaryBoxComponent,
    icon: 'summarize',
    name: 'Summary box',
  },
  'aff-versus-box': {
    component: VersusBoxComponent,
    icon: 'compare',
    name: 'Versus',
  },
  'aff-product-slider': {
    component: ProductSliderComponent,
    icon: 'wallpaper_slideshow',
    name: 'Product slider',
  },
  'aff-product-collage': {
    component: ProductCollageComponent,
    icon: 'browse',
    name: 'Product collage',
  },
};

export const sectionTypeMappingArray: {
  key: string;
  component: Type<any>;
  icon: string;
  name: string;
}[] = Object.entries(componentTypeMapping).map(
  ([key, { component, icon, name }]) => ({ key, component, icon, name })
);

export const blockTypeMappingArray: {
  key: string;
  component: Type<any>;
  icon: string;
}[] = Object.entries(blockTypeMapping).map(([key, { component, icon }]) => ({
  key,
  component,
  icon,
}));

export const affiliateToolMappingArray: {
  key: string;
  component: Type<any>;
  icon: string;
  name: string;
}[] = Object.entries(affiliateToolMapping).map(
  ([key, { component, icon, name }]) => ({
    key,
    component,
    icon,
    name,
  })
);
