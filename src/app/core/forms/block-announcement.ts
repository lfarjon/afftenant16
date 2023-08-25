import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockAnnouncementField: FormlyFieldConfig[] = [
  {
    key: 'announcement',
    type: 'input',
    templateOptions: {
      label: 'Text',
      required: true,
    },
  },
];

export const blockAnnouncementModel = {
  announcement: 'Experience the best services we offer',
};

export const styleFields: FormlyFieldConfig[] = [
  {
    key: 'height',
    type: 'slider',
    templateOptions: {
      label: 'Height',
      required: true,
      step: 2,
      max: 96,
      min: 0,
    },
  },
];

export const styleBlocks = {
  height: 8,
};
