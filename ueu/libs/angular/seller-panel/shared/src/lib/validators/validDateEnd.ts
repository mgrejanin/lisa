import { FormControl } from '@angular/forms';

export function dateEndValidator(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function dateEndValidate(control: FormControl) {
        if (!control.parent) {
            return null;
        }

        // Initializing the validator.
        if (!thisControl) {
            thisControl = control;
            otherControl = control.parent.get(otherControlName) as FormControl;

            if (!otherControl) {
                throw new Error('Other control is not found in parent group');
            }

            otherControl.valueChanges.subscribe(() => {
                thisControl.updateValueAndValidity();
            });
        }

        if (!otherControl) {
            return null;
        }

        const thisDate = new Date(thisControl.value).getTime();
        const otherDate = new Date(otherControl.value).getTime();

        if (thisDate < otherDate) {
            return {
                dateEnd: true,
            };
        }

        return null;
    };
}
