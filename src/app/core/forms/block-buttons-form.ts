import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockButtonsField: FormlyFieldConfig[] = [
  {
    key: 'buttonOneText',
    type: 'input',
    templateOptions: {
      label: 'Button One Text',
      required: true,
    },
  },
  {
    key: 'buttonTwoText',
    type: 'input',
    templateOptions: {
      label: 'Button Two Text',
      required: false,
    },
  },
];

export const blockButtonsModel = {
  buttonOneText: 'Learn more',
  buttonTwoText: 'Do more',
};
