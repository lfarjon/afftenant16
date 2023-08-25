import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockSearchFields: FormlyFieldConfig[] = [
  {
    key: 'searchLabel',
    type: 'input',
    templateOptions: {
      label: 'Search Label',
      required: true,
    },
  },
];

export const blockSearchModel = {
  searchLabel: '',
};
