import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[validation-message]',
    templateUrl: './validation-messages.component.html',
    styleUrls: ['./validation-messages.component.scss'],
})
export class ValidationMessagesComponent {
    @Input() control: FormControl;

    constructor(private decimalPipe: DecimalPipe) {}

    getErrorMessage(): string | null {
        if (this.control) {
            for (const validatorName in this.control.errors) {
                // eslint-disable-next-line no-prototype-builtins
                if (this.control.errors.hasOwnProperty(validatorName) && this.control.touched) {
                    return this.getMessageErrorByValidator({
                        validatorName,
                        validatorValue: this.control.errors[validatorName],
                        labelField: this.control.errors.label,
                    });
                }
            }
        }

        return null;
    }

    private getMessageErrorByValidator(params: {
        validatorName: string;
        validatorValue: { max: string | number; min: string | number; requiredLength: number; message: string };
        labelField: string;
    }): string {
        const config = {
            required: 'Este campo é requerido!',
            email: 'Este campo deve conter um e-mail válido!',
            password: 'A senha deve contar no mínimo 6 caracteres e um número!',
            brtelephone: 'Este campo deve conter um telefone válido! (DDD) X XXXX-XXXX',
            matchOther: `Os campos de ${params?.labelField} devem corresponder!`,
            max: `O valor máximo deve ser R$ ${this.decimalPipe.transform(params.validatorValue.max, '1.2-2')}!`,
            min: `O valor mínimo deve ser R$ ${this.decimalPipe.transform(params.validatorValue.min, '1.2-2')}!`,
            alphanumeric: 'Este campo deve conter apenas letras e numeros!',
            numeric: 'Este campo deve conter apenas números!',
            minlength: `O tamanho mínimo deve ser ${params.validatorValue.requiredLength} caracteres!`,
            maxlength: `O tamanho máximo deve ser ${params.validatorValue.requiredLength} caracteres!`,
            cnpj: 'Este campo deve conter um CNPJ válido!',
            cpfNotValid: 'CPF inválido!',
            invalidDate: 'Data inválida!',
            matDatepickerParse: 'Data inválida!',
            matDatepickerRange: 'Intervalo de datas inválido!',
            dateEnd: 'Data inválida!',
            valueEnd: 'Valor final menor!',
            customMessage: params.validatorValue.message,
        };

        return config[params.validatorName];
    }
}
