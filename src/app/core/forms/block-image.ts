import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockImageFields: FormlyFieldConfig[] = [
  {
    key: 'fileUrl',
    type: 'file',
    templateOptions: {
      label: 'Select Image',
      required: true,
      accept: '.png, .jpeg, .jpg, .svg', // Define the allowed file types
    },
  },
];

export const blockImageModel = {
  fileUrl: '',
};
