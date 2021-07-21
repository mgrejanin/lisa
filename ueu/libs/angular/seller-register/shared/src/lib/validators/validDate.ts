import { AbstractControl, Validators } from '@angular/forms';

/**
 * @description
 * Validator that returns if the given date is valid
 *
 * @usageNotes
 *
 *
 * ```typescript
 * const control = new FormControl('00/00/0000', validDate());
 *
 * console.log(control.errors); // { invalidBirth: true }
 * ```
 *
 *
 * @returns A validator function that returns an error map with the
 * `invalidDate` property if the validation check fails, otherwise `null`.
 *
 *
 */
export function validDate() {
    const isValidDate = (date: Date) => date instanceof Date && !isNaN(date.getTime());

    return (control: AbstractControl): Validators => {
        const birthDate = new Date(returnDateParse(control.value));

        if (!isValidDate(birthDate)) {
            return {
                invalidDate: true,
            };
        }

        return null;
    };
}

export function returnDateParse(value: string) {
    const date = value.split('/');

    const year = date[2];
    const month = date[1];
    const day = date[0];

    return Date.parse(`${year}/${month}/${day}`);
}
