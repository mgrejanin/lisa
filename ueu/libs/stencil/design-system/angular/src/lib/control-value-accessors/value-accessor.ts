import { ElementRef, HostListener, Injectable, Injector, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Injectable()
export class ValueAccessor implements ControlValueAccessor, Validator, OnDestroy {
    sub: Subscription;
    helperText = false;
    helperTextDefault: string;

    private onChange: (value: unknown) => void = () => {
        /**/
    };
    private onTouched: () => void = () => {
        /**/
    };

    constructor(protected injector: Injector, protected el: ElementRef) {}

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

    writeValue(value: unknown) {
        this.el.nativeElement.value = value || '';
    }

    handleChangeEvent(el: HTMLElement, value: unknown) {
        if (el === this.el.nativeElement) {
            this.onChange(value);
        }
    }

    @HostListener('apolloBlur', ['$event.target'])
    handleBlurEvent(el: Element) {
        if (el === this.el.nativeElement) {
            this.onTouched();
        }
    }

    registerOnChange(fn: (value: unknown) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.el.nativeElement.disabled = isDisabled;
    }

    /**
     * Validation
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(control: AbstractControl): ValidationErrors | null {
        return null;
    }

    protected errorMessage(control: AbstractControl) {
        if (control) {
            return Object.entries(control.errors).map(([validatorName, validatorValue]) =>
                this.getValidatorErrorMessage({ validatorName, validatorValue }),
            );
        }
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected handleValidate(control: AbstractControl, input: any): ValidationErrors | null {
        /**
         * Nesse cenário é melhor forçar o unsubscribe do que usar o operador `take(1)`
         * por causa do fluxo de informações que podem vir de fora do escopo do Angular
         */
        this.sub?.unsubscribe();
        this.sub = control.statusChanges.subscribe(status => {
            input.invalid = status === 'INVALID';
            if (this.helperText) {
                input.helperText =
                    status === 'INVALID'
                        ? this.errorMessage(control)[0] || 'Dado inválido'
                        : this.helperTextDefault || '';
            }
        });
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getValidatorErrorMessage(params: { validatorName: string; validatorValue: any }): string {
        const config = {
            required: 'Este campo é requerido!',
            email: 'Este campo deve conter um e-mail válido!',
            password: 'A senha deve contar no mínimo 6 caracteres e um número!',
            brtelephone: 'Este campo deve conter um telefone válido! (DDD) X XXXX-XXXX',
            max: `O valor máximo deve ser ${params?.validatorValue.max}!`,
            min: `O valor mínimo deve ser ${params?.validatorValue.min}!`,
            alphanumeric: 'Este campo deve conter apenas letras e numeros!',
            numeric: 'Este campo deve conter apenas números!',
            minlength: `O tamanho mínimo deve ser ${params?.validatorValue.requiredLength} caracteres!`,
            maxlength: `O tamanho máximo deve ser ${params?.validatorValue.requiredLength} caracteres!`,
            cnpj: 'Este campo deve conter um CNPJ válido!',
            invalidDate: 'Data inválida!',
            matDatepickerParse: 'Data inválida!',
            matDatepickerRange: 'Intervalo de datas inválido!',
            dateEnd: 'Data inválida!',
            valueEnd: 'Valor final menor!',
            customMessage: params?.validatorValue.message,
        };

        return config[params?.validatorName];
    }
}
