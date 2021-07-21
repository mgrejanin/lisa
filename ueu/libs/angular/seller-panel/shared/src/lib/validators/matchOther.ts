import { FormGroup } from '@angular/forms';

export function matchOtherValidator(controlName: string, matchingControlName: string, fieldName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmPasswordValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ matchOther: true, label: fieldName });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
