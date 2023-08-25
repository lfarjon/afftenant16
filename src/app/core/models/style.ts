import { FormlyFieldConfig } from '@ngx-formly/core';

export const themeFields: FormlyFieldConfig[] = [
  {
    key: 'primary',
    type: 'input',
    templateOptions: {
      label: 'Primary Color',
      type: 'color',
      required: true,
    },
  },
  {
    key: 'secondary',
    type: 'input',
    templateOptions: {
      label: 'Secondary Color',
      type: 'color',
      required: true,
    },
  },
  {
    key: 'accent',
    type: 'input',
    templateOptions: {
      label: 'Accent Color',
      type: 'color',
      required: true,
    },
  },
  {
    key: 'neutral',
    type: 'input',
    templateOptions: {
      label: 'Neutral Color',
      type: 'color',
      required: true,
    },
  },
  {
    key: 'info',
    type: 'input',
    templateOptions: {
      label: 'Info Color',
      type: 'color',
      required: true,
    },
  },
  {
    key: 'success',
    type: 'input',
    templateOptions: {
      label: 'Success Color',
      type: 'color',
      required: true,
    },
  },
  {
    key: 'warning',
    type: 'input',
    templateOptions: {
      label: 'Warning Color',
      type: 'color',
      required: true,
    },
  },
  {
    key: 'error',
    type: 'input',
    templateOptions: {
      label: 'Error Color',
      type: 'color',
      required: true,
    },
  },
];

export const themeModel = {
  primary: '#b5e585',
  secondary: '#f9b895',
  accent: '#b24c35',
  neutral: '#23212b',
  info: '#468dc3',
  success: '#77eea3',
  warning: '#d97708',
  error: '#ee3e1b',
};
