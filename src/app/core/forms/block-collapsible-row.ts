import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockCollapsibleRowFields: FormlyFieldConfig[] = [
  {
    key: 'icon',
    type: 'input',
    templateOptions: {
      label: 'Icon',
      required: true,
    },
  },
  {
    key: 'title',
    type: 'input',
    templateOptions: {
      label: 'Title',
      required: true,
    },
  },
  {
    key: 'content',
    type: 'textarea',
    templateOptions: {
      label: 'Content',
      required: true,
      autosize: true,
      autosizeMaxRows: 15,
    },
  },
];

export const blockCollapsibleRowModel = {
  icon: 'Learn more',
  title: 'Title',
  content:
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
};
