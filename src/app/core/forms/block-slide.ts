import { FormlyFieldConfig } from '@ngx-formly/core';

export const blockSlideField: FormlyFieldConfig[] = [
  {
    key: 'title',
    type: 'input',
    templateOptions: {
      label: 'Slide title',
      required: true,
    },
  },
  {
    key: 'content',
    type: 'textarea',
    templateOptions: {
      label: 'Slide content',
      required: true,
      autosize: true,
    },
  },
  {
    key: 'button1',
    type: 'input',
    templateOptions: {
      label: 'Slide content',
      required: true,
    },
  },
  {
    key: 'button2',
    type: 'input',
    templateOptions: {
      label: 'Slide content',
      required: true,
    },
  },
];

export const blockSlideModel = {
  title: 'First slide label',
  content: 'Some representative placeholder content for the first slide.',
  button1: 'Learn more',
  button2: 'Contact us',
};
