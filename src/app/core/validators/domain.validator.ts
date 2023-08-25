import { AbstractControl, ValidatorFn } from '@angular/forms';

export function domainValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const valid = domainRegex.test(control.value);
    return valid ? null : { invalidDomain: { value: control.value } };
  };
}
