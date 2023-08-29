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
