import { FormControl } from '@angular/forms';

export function dateValidator() {
    let thisControl: FormControl;

    const isValidDate = date => date instanceof Date && !isNaN(date.getTime());

    return function dateValidate(control: FormControl) {
        // Initializing the validator.
        if (!thisControl) {
            thisControl = control;
        }

        if (!thisControl.value) {
            return null;
        }

        if (!isValidDate(new Date(thisControl.value)) || thisControl.value.length < 6) {
            return {
                invalidDate: true,
            };
        }

        return null;
    };
}
