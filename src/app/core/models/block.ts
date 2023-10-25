import { DynamicSection } from './dynamic-section';
import { v4 as uuid } from 'uuid';
import { blockButtonModel } from '../forms/block-button-form';
import {
  blockHeadingField,
  blockHeadingModel,
} from '../forms/block-heading-form';
import { blockButtonsModel } from '../forms/block-buttons-form';
import { blockTextModel } from '../forms/block-text';
import { blockSubHeadingModel } from '../forms/block-sub-heading';
import { blockColumnModel } from '../forms/block-column';
import { blockCollapsibleRowModel } from '../forms/block-collapsible-row';
import { blockSlideModel } from '../forms/block-slide';
import { blockMenuModel, blockSecondaryMenuModel } from '../forms/block-menu';
import { blockSocialModel } from '../forms/block-social';
import { blockSearchModel } from '../forms/block-search';
import { blockImageModel } from '../forms/block-image';
import { blockAnnouncementModel } from '../forms/block-announcement';
import { blockEmailModel } from '../forms/block-email-signup';
import { blockCopyrightModel } from '../forms/block-copyright';
import { FormlyFieldConfig } from '@ngx-formly/core';
export interface Block extends DynamicSection {
  blockId: string;
  model: any;
  fields: FormlyFieldConfig[];
}

export interface InitialBlock {
  block: string;
  order: number;
}

export const availableBlocks: Record<string, string[]> = {
  'theme-email-signup': ['block-text', 'block-heading'],
  'theme-image-banner': [
    'block-image',
    'block-heading',
    'block-text',
    'block-buttons',
  ],
  'theme-image-text': [
    'block-image',
    'block-heading',
    'block-text',
    'block-button',
  ],
  'theme-rich-text': [
    'block-heading',
    'block-sub-heading',
    'block-text',
    'block-buttons',
  ],
  'theme-multi-column': ['block-column'],
  'theme-collapsible-rows': [
    'block-collapsible-row',
    'block-buttons',
    'block-button',
  ],
  'theme-slideshow': ['block-slide'],
  'theme-navigation': [
    'block-logo',
    'block-menu',
    'block-cta',
    'block-search',
    'block-secondary-menu',
  ],
  'theme-inner-footer': [
    'block-logo',
    'block-menu',
    'block-social',
    'block-email-signup',
    'block-copyright',
  ],
  'theme-sidenav': ['block-side-menu', 'block-logo', 'block-cta'],
  'theme-announcement-bar': ['block-announcement'],
};

export const initialBlocks: Record<string, InitialBlock[]> = {
  'theme-navigation': [
    { block: 'block-logo', order: 1 },
    { block: 'block-menu', order: 2 },
    { block: 'block-search', order: 3 },
    { block: 'block-cta', order: 4 },
    { block: 'block-secondary-menu', order: 5 },
  ],
  'theme-sidenav': [
    { block: 'block-logo', order: 1 },
    { block: 'block-side-menu', order: 2 },
    { block: 'block-cta', order: 3 },
  ],
  'theme-inner-footer': [
    { block: 'block-email-signup', order: 0 },
    { block: 'block-logo', order: 1 },
    { block: 'block-social', order: 2 },
    { block: 'block-menu', order: 3 },
    { block: 'block-copyright', order: 4 },
  ],
  'theme-announcement-bar': [
    { block: 'block-announcement', order: 1 },
    { block: 'block-announcement', order: 2 },
    { block: 'block-announcement', order: 3 },
  ],
  'theme-email-signup': [
    { block: 'block-heading', order: 1 },
    { block: 'block-text', order: 2 },
  ],
  'theme-image-banner': [
    { block: 'block-image', order: 0 },
    { block: 'block-heading', order: 1 },
    { block: 'block-text', order: 2 },
    { block: 'block-buttons', order: 3 },
  ],
  'theme-image-text': [
    { block: 'block-image', order: 0 },
    { block: 'block-heading', order: 1 },
    { block: 'block-text', order: 2 },
    { block: 'block-button', order: 3 },
  ],
  'theme-rich-text': [
    { block: 'block-heading', order: 1 },
    { block: 'block-sub-heading', order: 2 },
    { block: 'block-text', order: 3 },
    { block: 'block-buttons', order: 4 },
  ],
  'theme-multi-column': [
    { block: 'block-column', order: 1 },
    { block: 'block-column', order: 2 },
    { block: 'block-column', order: 3 },
  ],
  'theme-collapsible-rows': [
    { block: 'block-collapsible-row', order: 1 },
    { block: 'block-collapsible-row', order: 2 },
    { block: 'block-collapsible-row', order: 3 },
  ],
  'theme-slideshow': [
    { block: 'block-slide', order: 1 },
    { block: 'block-slide', order: 2 },
    { block: 'block-slide', order: 3 },
  ],
};

export const blocks: Block[] = [
  {
    blockId: uuid(),
    type: 'block-image',
    title: 'Image',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockImageModel,
    allowHide: false,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-search',
    title: 'Search',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockSearchModel,
    allowHide: true,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-social',
    title: 'Social',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockSocialModel,
    allowHide: true,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-logo',
    title: 'Logo',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockImageModel,
    allowHide: true,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-buttons',
    title: 'Buttons',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockButtonsModel,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-heading',
    title: 'Heading',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: { ...blockHeadingModel },
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
    fields: [...blockHeadingField],
  } as Block,
  {
    blockId: uuid(),
    type: 'block-text',
    title: 'Text',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockTextModel,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-cta',
    title: 'CTA',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockButtonModel,
    allowHide: true,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-sub-heading',
    title: 'Sub heading',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockSubHeadingModel,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-column',
    title: 'Column',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockColumnModel,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-collapsible-row',
    title: 'Collapsible row',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockCollapsibleRowModel,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-slide',
    title: 'Slide',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockSlideModel,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-menu',
    title: 'Menu',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockMenuModel,
    allowHide: false,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-side-menu',
    title: 'Side menu',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockMenuModel,
    allowHide: false,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-secondary-menu',
    title: 'Secondary menu',
    visible: false,
    dragDisabled: false,
    expanded: false,
    model: blockSecondaryMenuModel,
    allowHide: true,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-button',
    title: 'Button',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockButtonModel,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-announcement',
    title: 'Announcement',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockAnnouncementModel,
    allowHide: true,
    allowDrag: true,
    allowDelete: true,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-email-signup',
    title: 'Email Signup',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockEmailModel,
    allowHide: true,
    allowDrag: false,
    allowDelete: false,
  } as Block,
  {
    blockId: uuid(),
    type: 'block-copyright',
    title: 'Copyright',
    visible: true,
    dragDisabled: false,
    expanded: false,
    model: blockCopyrightModel,
    allowHide: false,
    allowDrag: false,
    allowDelete: false,
  } as Block,
];
