import { AbstractControl, Validators } from '@angular/forms';

/**
 * @description
 * Validator that returns if the current AbstractControl value is a valid CNPJ
 *
 * @usageNotes
 *
 *
 * ```typescript
 * const control = new FormControl('00.000.000/0000-00', isValidCnpj());
 *
 * console.log(control.errors); // { cnpjNotValid: true }
 * ```
 *
 *
 * @returns A validator function that returns an error map with the
 * `cnpjNotValid` property if the validation check fails, otherwise `null`.
 *
 *
 */

export function isValidCnpj() {
    return (control: AbstractControl): Validators => {
        let cnpj = control.value;

        if (cnpj) {
            cnpj = cnpj.replace(/[^\d]+/g, '');

            if (cnpj === '') return { cnpjNotValid: true };

            if (cnpj.length !== 14) return { cnpjNotValid: true };

            // Elimina CNPJs inválidos conhecidos
            if (
                cnpj === '00000000000000' ||
                cnpj === '11111111111111' ||
                cnpj === '22222222222222' ||
                cnpj === '33333333333333' ||
                cnpj === '44444444444444' ||
                cnpj === '55555555555555' ||
                cnpj === '66666666666666' ||
                cnpj === '77777777777777' ||
                cnpj === '88888888888888' ||
                cnpj === '99999999999999'
            )
                return { cnpjNotValid: true };

            // Valida os dois dígitos verificadores
            let size = cnpj.length - 2;
            let numbers = cnpj.substring(0, size);
            const digits = cnpj.substring(size);
            let sum = 0;
            let post = size - 7;

            for (let i = size; i >= 1; i--) {
                sum += numbers.charAt(size - i) * post--;
                if (post < 2) post = 9;
            }

            let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
            if (result != digits.charAt(0)) return { cnpjNotValid: true };

            size = size + 1;
            numbers = cnpj.substring(0, size);
            sum = 0;
            post = size - 7;

            for (let i = size; i >= 1; i--) {
                sum += numbers.charAt(size - i) * post--;
                if (post < 2) post = 9;
            }

            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
            if (result != digits.charAt(1)) return { cnpjNotValid: true };

            return null;
        }

        return null;
    };
}
