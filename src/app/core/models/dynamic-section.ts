import { Observable } from 'rxjs';
import { Block } from './block';
import { v4 as uuid } from 'uuid';
import { Product } from './product';
import { GlobalFeature } from './feature';
export interface DynamicSection {
  sectionId: string;
  type: string;
  order: number;
  title: string;
  dragDisabled: boolean;
  visible: boolean;
  expanded: boolean;
  allowHide: boolean;
  allowDrag: boolean;
  allowDelete: boolean;
  allowAddBlocks: boolean;
  isSelected: boolean;
  websiteId?: string;
  style?: {
    tailwind?: string;
    background?: string;
    color?: string;
  };
  blocks?: Observable<Block[]>;
  multiple?: boolean;
  updated_at?: Date;
  metafields?: {
    title: string;
    description: string;
  };
  globalFeatures?: GlobalFeature[];
  data?: Product | Product[];
}

export const availableSections: Record<string, string[]> = {
  FOOTER: ['theme-email-signup', 'theme-inner-footer'],
  SIDENAV: ['theme-email-signup', 'theme-inner-footer'],
  HEADER: ['theme-announcement-bar'],
  TEMPLATE: [
    'theme-image-banner',
    'theme-image-text',
    'theme-contact-form',
    'theme-email-signup',
    'theme-collapsible-rows',
    'theme-multi-column',
    'theme-rich-text',
    'theme-slideshow',
  ],
};

// SECTION TEMPLATES DO NOT DELETE EVER
export const templateSections: DynamicSection[] = [
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-slideshow',
    order: 0,
    title: 'Slideshow',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-multi-column',
    order: 1,
    title: 'Multi Column',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-image-banner',
    order: 1,
    title: 'Image banner',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-image-text',
    order: 2,
    title: 'Image with text',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-contact-form',
    order: 3,
    title: 'Contact form',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-email-signup',
    order: 4,
    title: 'Email signup',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-collapsible-rows',
    order: 5,
    title: 'Collapsible content',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-rich-text',
    order: 7,
    title: 'Rich Text',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
];

export const footerSections: DynamicSection[] = [
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-inner-footer',
    order: 2,
    title: 'Inner footer',
    visible: true,
    dragDisabled: true,
    expanded: true,
    allowHide: false,
    allowDrag: false,
    allowDelete: false,
    allowAddBlocks: false,
  },
];

export const headerSections: DynamicSection[] = [
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-announcement-bar',
    order: 0,
    title: 'Announcement bar',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    allowAddBlocks: true,
  },
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-navigation',
    order: 2,
    title: 'Navigation',
    visible: true,
    dragDisabled: true,
    expanded: false,
    allowHide: false,
    allowDrag: false,
    allowDelete: false,
    allowAddBlocks: false,
  },
];

export const sidenavSections: DynamicSection[] = [
  {
    sectionId: uuid(),
    isSelected: false,
    type: 'theme-sidenav',
    order: 2,
    title: 'Side Navigation',
    visible: true,
    dragDisabled: false,
    expanded: false,
    allowHide: false,
    allowDrag: false,
    allowDelete: false,
    allowAddBlocks: false,
  },
];
// SECTION TEMPLATES DO NOT DELETE EVER
