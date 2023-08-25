import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockCopyrightField: FormlyFieldConfig[] = [
  {
    key: 'text',
    type: 'input',
    templateOptions: {
      label: 'Copyright Text',
      required: true,
    },
  },
];

export const blockCopyrightModel = {
  text: '© 2023, retailerhubtest Powered by Affit',
};
