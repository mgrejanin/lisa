import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'apollo-checkbox,apollo-switch-toggle,apollo-icon-button',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: BooleanValueAccessorDirective,
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: BooleanValueAccessorDirective,
            multi: true,
        },
    ],
})
export class BooleanValueAccessorDirective extends ValueAccessor {
    input: HTMLApolloCheckboxElement | HTMLApolloSwitchToggleElement | HTMLApolloIconButtonElement;

    constructor(injector: Injector, el: ElementRef) {
        super(injector, el);
        this.input = this.el.nativeElement;
    }

    @HostListener('apolloChange', ['$event'])
    handleValueChange(el: CustomEvent<boolean>) {
        this.handleChangeEvent(el.target as HTMLElement, el.detail);
    }

    writeValue(value) {
        this.el.nativeElement.checked = !!value || false;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        this.input.checked = control.value;
        this.handleValidate(control, this.input);
        return null;
    }
}
