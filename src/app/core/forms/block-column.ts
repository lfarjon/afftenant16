import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockColumnField: FormlyFieldConfig[] = [
  {
    key: 'columnTitle',
    type: 'input',
    templateOptions: {
      label: 'Column title',
      required: true,
    },
  },
  {
    key: 'columnText',
    type: 'input',
    templateOptions: {
      label: 'Column Text',
      required: true,
    },
  },
  {
    key: 'columnButtonText',
    type: 'input',
    templateOptions: {
      label: 'Button Text',
      required: true,
    },
  },
];

export const blockColumnModel = {
  columnTitle: 'Column',
  columnText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum.',
  columnButtonText: 'Click me',
};
