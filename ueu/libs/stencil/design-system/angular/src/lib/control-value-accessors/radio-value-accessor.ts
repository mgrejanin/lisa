import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'apollo-radio',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RadioValueAccessorDirective,
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: RadioValueAccessorDirective,
            multi: true,
        },
    ],
})
export class RadioValueAccessorDirective extends ValueAccessor {
    input: HTMLApolloRadioElement;

    constructor(injector: Injector, el: ElementRef) {
        super(injector, el);
        this.input = this.el.nativeElement as HTMLApolloRadioElement;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    writeValue() {}

    @HostListener('apolloChange', ['$event'])
    handleValueChange(el: CustomEvent<string>) {
        this.handleChangeEvent(el.target as HTMLElement, el.detail);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        this.input.checked = control.value === this.input.value;
        this.handleValidate(control, this.input);
        return null;
    }
}
