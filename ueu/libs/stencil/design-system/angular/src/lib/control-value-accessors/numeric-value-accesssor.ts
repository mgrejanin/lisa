import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'apollo-textfield[type=number]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: NumericValueAccessorDirective,
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: NumericValueAccessorDirective,
            multi: true,
        },
    ],
})
export class NumericValueAccessorDirective extends ValueAccessor {
    helperTextDefault = '';
    helperText = true;
    input: HTMLApolloTextfieldElement;

    constructor(injector: Injector, el: ElementRef) {
        super(injector, el);
        this.input = this.el.nativeElement as HTMLApolloTextfieldElement;
        this.helperTextDefault = this.input.helperText;
    }

    @HostListener('apolloChange', ['$event'])
    handleValueChange(el: CustomEvent<string>) {
        this.handleChangeEvent(el.target as HTMLElement, el.detail);
    }

    registerOnChange(fn: (_: unknown) => void) {
        super.registerOnChange(value => {
            fn(value === '' ? null : value);
        });
    }

    /**
     * Validation
     */
    validate(control: AbstractControl): ValidationErrors | null {
        this.handleValidate(control, this.input);
        return null;
    }
}
