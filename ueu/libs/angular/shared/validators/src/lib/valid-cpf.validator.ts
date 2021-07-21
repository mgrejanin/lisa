import { AbstractControl, Validators } from '@angular/forms';

/**
 * @description
 * Validator that that returns if the current AbstractControl value is a valid CPF
 *
 * @usageNotes
 *
 *
 * ```typescript
 * const control = new FormControl('000.000.000-00', isValidCpf());
 *
 * console.log(control.errors); // { cpfNotValid: true }
 * ```
 *
 *
 * @returns A validator function that returns an error map with the
 * `cpfNotValid` property if the validation check fails, otherwise `null`.
 *
 *
 */
export function isValidCpf() {
    // tslint:disable-next-line: cyclomatic-complexity
    return (control: AbstractControl): Validators => {
        const cpf = control.value.replace(/[^\w\s]/gi, '');
        if (cpf) {
            let numbers: { charAt(arg0: number): number };
            let digits: string;
            let sum: number;
            let i: number;
            let result: number;
            let equalDigits = 1;

            if (cpf.length < 11) {
                return null;
            }

            // tslint:disable-next-line: no-increment-decrement
            for (i = 0; i < cpf.length - 1; i++) {
                if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                    equalDigits = 0;
                    break;
                }
            }

            if (!equalDigits) {
                numbers = cpf.substring(0, 9);
                digits = cpf.substring(9);
                sum = 0;
                // tslint:disable-next-line: no-increment-decrement
                for (i = 10; i > 1; i--) {
                    sum += numbers.charAt(10 - i) * i;
                }

                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                if (result !== Number(digits.charAt(0))) {
                    return { cpfNotValid: true };
                }
                numbers = cpf.substring(0, 10);
                sum = 0;

                // tslint:disable-next-line: no-increment-decrement
                for (i = 11; i > 1; i--) {
                    sum += numbers.charAt(11 - i) * i;
                }
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                if (result !== Number(digits.charAt(1))) {
                    return { cpfNotValid: true };
                }

                return null;
            }

            return { cpfNotValid: true };
        }
        return null;
    };
}
