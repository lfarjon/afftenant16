import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockTextField: FormlyFieldConfig[] = [
  {
    key: 'text',
    type: 'textarea',
    templateOptions: {
      label: 'Content',
      required: true,
      autosize: true,
      autosizeMaxRows: 15,
    },
  },
];

export const blockTextModel = {
  text: 'Experience the best services we offer',
};
