import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @description
 * A validator that returns an error map with the `invalidJson` property if the current AbstractControl value is an invalid JSON,
 * otherwise returns `null`.
 *
 * @usageNotes
 * ```
 * const control = new FormControl(null, validJson());
 *
 * console.log(control.errors); // { invalidJson: true }
 * ```
 */
export function validJson(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const invalid: ValidationErrors = { invalidJson: true };

        try {
            JSON.parse(control.value);
        } catch (e) {
            return invalid;
        }

        return null;
    };
}
