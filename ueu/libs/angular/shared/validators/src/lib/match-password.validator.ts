import { FormGroup, Validators } from '@angular/forms';

/**
 * @description
 * Validator that returns if one control value matches another control value
 *
 *
 * @usageNotes
 *
 * ```typescript
 * form = new FormControl({
 *    password: [''],
 *    passwordConfirmation: ['']
 * }, { validators: passwordMatchValidator(password, passwordConfirmation) })
 *
 * console.log(form.errors); // { mismatch: true }
 * ```
 *
 *
 * @returns A validator function that returns an error map with the
 * `mismatch` property if the validation check fails, otherwise `null`.
 *
 *
 */

export function passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): Validators => {
        const firstControl = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (firstControl.value && matchingControl.value) {
            if (firstControl.value !== matchingControl.value) {
                matchingControl.setErrors({ mismatch: true });
                return { mismatch: true };
            }
        }

        return null;
    };
}
