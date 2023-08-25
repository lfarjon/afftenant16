export interface Confirmation {
  message: string;
  type: 'SNACKBAR' | 'DIALOG';
  action: 'SAVE' | 'DISMISS';
}
