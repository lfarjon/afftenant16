import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockEmailFields: FormlyFieldConfig[] = [
  {
    key: 'label',
    type: 'input',
    templateOptions: {
      label: 'Email Label',
      required: true,
    },
  },
];

export const blockEmailModel = {
  label: '',
};
