import { FormGroup, FormControl } from "@angular/forms";

export class ValidateForm {

  constructor() { }

  static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        ValidateForm.validateAllFormFields(control);
      }
    });
  }

  static submitValidation(form) {
    if (form.valid) {
      return true; } else {
      this.validateAllFormFields(form);
      window.scroll(0, 500);
    }
  }

  static isFieldValid(form, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

}
