/* eslint-disable no-prototype-builtins */
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[seller-register-field-validation]',
    templateUrl: './field-validation.component.html',
    styleUrls: ['./field-validation.component.scss'],
})
export class FieldValidationComponent {
    @Input() control: FormControl | AbstractControl;

    private defaultErrors = {
        required: 'Este campo é requerido!',
        email: 'Este campo deve conter um e-mail válido!',
    };

    getErrorMessage(): string | null {
        if (this.control) {
            for (const validatorName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(validatorName) && this.control.touched) {
                    return this.defaultErrors[validatorName] ?? this.returnCustomMessageErrors(validatorName);
                }
            }
        }

        return null;
    }

    private returnCustomMessageErrors(validator: string) {
        if (validator === 'customMessage') {
            const {
                customMessage: { message },
            } = this.control.errors;

            return message;
        }

        return null;
    }
}
