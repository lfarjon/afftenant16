import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockSubHeadingField: FormlyFieldConfig[] = [
  {
    key: 'subHeadingText',
    type: 'input',
    templateOptions: {
      label: 'Text',
      required: true,
    },
  },
];

export const blockSubHeadingModel = {
  subHeadingText: 'Subheadig Caption goes here',
};
