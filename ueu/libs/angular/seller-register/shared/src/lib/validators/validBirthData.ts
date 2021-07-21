import { AbstractControl, Validators } from '@angular/forms';
import { returnDateParse } from './validDate';

/**
 * @description
 * Validator that returns if the Current Control Summary value for a birth data greater than 18 and less than 120
 *
 * @usageNotes
 *
 *
 * ```typescript
 * const control = new FormControl('00/00/0000', isValidBirth());
 *
 * console.log(control.errors); // { invalidBirth: true }
 * ```
 *
 *
 * @returns A validator function that returns an error map with the
 * `invalidBirth` property if the validation check fails, otherwise `null`.
 *
 * @param minAge I set the min age value, by default it is 18
 * @param maxAge I set the max age value, by default it is 120
 *
 */
export function isValidBirth(minAge: number = 18, maxAge: number = 120) {
    function calculateAge(birth: Date, today: Date = new Date()): number {
        return Math.floor(Math.ceil(Math.abs(birth.getTime() - today.getTime()) / (1000 * 3600 * 24)) / 365.25);
    }

    return (control: AbstractControl): Validators => {
        const birthDate = new Date(returnDateParse(control.value));

        if (calculateAge(birthDate) < minAge || calculateAge(birthDate) > maxAge) {
            return {
                invalidBirth: true,
            };
        }

        return null;
    };
}
