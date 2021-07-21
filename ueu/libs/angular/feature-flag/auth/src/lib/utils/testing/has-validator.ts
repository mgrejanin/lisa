// Helper function used to know if
// a form control has any specific validor.

// angular
import { AbstractControl } from '@angular/forms';

// Useful for reactive & complex forms.
export const hasValidator = (control: AbstractControl, validator: string): boolean => {
    // Checks if control.validator exists.
    // If negative, the control doesn't have any validators.
    if (!control.validator) {
        return false;
    }

    // Returns true if the control has the validator.
    // eslint-disable-next-line no-prototype-builtins
    return !!control.validator(control).hasOwnProperty(validator);
};
