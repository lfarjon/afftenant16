import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockButtonField: FormlyFieldConfig[] = [
  {
    key: 'buttonText',
    type: 'input',
    templateOptions: {
      label: 'Button Text',
      required: true,
    },
  },
];

export const blockButtonModel = {
  buttonText: 'Learn more',
};
