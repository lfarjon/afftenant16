import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockHeadingField: FormlyFieldConfig[] = [
  {
    key: 'headingText',
    type: 'input',
    templateOptions: {
      label: 'Heading Text',
      required: true,
    },
  },
];

export const blockHeadingModel = {
  headingText: 'Welcome to Our Website!',
};
